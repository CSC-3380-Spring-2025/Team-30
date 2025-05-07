package main

import (
    "net/http"
    "os/exec"
    "os"
    "strconv"
    "fmt"
    "math/rand/v2"
    "sync"
    "time"

    "github.com/gin-gonic/gin" // Makes building a REST API easier
    "gopkg.in/ini.v1"          // For reading QEMU parameters
    "github.com/google/uuid"
)
import . "vm-manager/bootdev"

type vmBlob struct {
    Name string
    ID   string
    Port int
}

type vm struct {
    Name       string
    BootDevice BootDev
    Arch       string
    Memory     int
    Accel      string
    Port       int

    Process    *exec.Cmd

    Blob       vmBlob
}

type vmList struct {
    List []vm
    Lock sync.Mutex
}
var vms = vmList { List: make([]vm, 0) }

func memToArg(mem int) string {
    gbFlag := false

    if mem == 0 {
        mem = 256
    }
    if mem >= 1024 {
        mem >>= 10
	gbFlag = true
    }

    arg := strconv.Itoa(mem)
    if gbFlag {
        return arg + "G"
    } else {
        return arg
    }
}

func selectPort() int {
    port := rand.IntN(3000) + 5900

    for _, virt := range vms.List {
        if virt.Port == port {
            return selectPort()
        }
    }

    return port
}

func makeVMProcess(virt vm) *exec.Cmd {
    portnum := virt.Port - 5900
    port := strconv.Itoa(portnum)

    cmd := exec.Command("qemu-system-" + virt.Arch,
                        "-m", memToArg(virt.Memory),
	                "-display", "vnc=127.0.0.1:" + port,
                        "-accel", virt.Accel,
			virt.BootDevice.Arg(), virt.BootDevice.File())

    return cmd
}

func bootVM(virt vm) {
    err := virt.Process.Start()
    if err != nil {
        fmt.Fprintln(os.Stderr, err)
    }

    <-time.After(1 * time.Minute)
    err = virt.Process.Process.Kill()
    if err != nil {
        fmt.Fprintln(os.Stderr, err)
    }
}

func initVM(id string) vm {
    cfg, err := ini.Load("virtfile")
    if err != nil {
        cfg = ini.Empty()
    }

    s := cfg.Section(id)

    imgPath := cfg.Section("").Key("image path").String()
    if imgPath != "" {
        imgPath += "/"
    }

    virt := vm {
        Name: id,
        Arch: s.Key("arch").In("x86_64", []string{"x86_64", "i386"}),
        Memory: s.Key("memory").RangeInt(1024, 256, 65536),
        Accel: s.Key("accel").In("tcg", []string{"tcg", "kvm", "xen", "nvmm"}),
        Port: selectPort(),
    }

    switch {
    case s.HasKey("cdrom"):
        virt.BootDevice = CDROM(imgPath+ s.Key("cdrom").String())
    case s.HasKey("floppy"):
        virt.BootDevice = Floppy(imgPath + s.Key("floppy").String())
    case s.HasKey("hard drive"):
        virt.BootDevice = HardDrive(imgPath + s.Key("hard drive").String())
    default:
        virt.BootDevice = CDROM(imgPath + "kali.iso")
    }

    virt.Blob = vmBlob{ Name: id, ID: uuid.NewString(), Port: virt.Port }
    virt.Process = makeVMProcess(virt)

    return virt
}

func makeVM(c *gin.Context) {
    name := c.Param("name")
    virt := initVM(name)

    vms.Lock.Lock()
    vms.List = append(vms.List, virt)
    vms.Lock.Unlock()

    go bootVM(virt)

    c.IndentedJSON(http.StatusOK, virt.Blob)
}

func killVM(c *gin.Context) {
    id := c.Param("id")

    for _, virt := range vms.List {
        if virt.Blob.ID == id {
            err := virt.Process.Process.Kill()
            if err != nil {
                fmt.Fprintln(os.Stderr, err)
            }
        }
    }

    c.IndentedJSON(http.StatusOK, id)
}

func main() {
    router := gin.Default()
    router.GET("/api/vm/create/:name", makeVM)
    router.GET("/api/vm/kill/:id", killVM)

    router.Run("localhost:1701")
}
