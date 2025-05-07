package main

import (
    "net/http"
    "os/exec"
    "strconv"
    //"fmt"
    "math/rand/v2"
    "sync"

    "github.com/gin-gonic/gin" // Makes building a REST API easier
    "gopkg.in/ini.v1"          // For reading QEMU parameters
    "github.com/google/uuid"
)
import . "vm-manager/bootdev"

type vm struct {
    Name       string
    BootDevice BootDev
    Arch       string
    Memory     int
    Accel      string

    ID         string  `json:id`
    Port       int     `json:port`
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

func bootVM(virt vm) {
    portnum := virt.Port - 5900
    port := strconv.Itoa(portnum)

    cmd := exec.Command("qemu-system-" + virt.Arch,
                        "-m", memToArg(virt.Memory),
	                "-display", "vnc=127.0.0.1:" + port,
                        "-accel", virt.Accel,
			virt.BootDevice.Arg(), virt.BootDevice.File())
    cmd.Run()
}

func initVM(id string, cfg *ini.File) vm {

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

    virt.ID = uuid.NewString()
    virt.Port = rand.IntN(3000) + 5900

    return virt
}

func getStarted(c *gin.Context) {
    c.IndentedJSON(http.StatusOK, vms.List)
}

func makeVM(c *gin.Context) {

}

func killVM(c *gin.Context) {

}

func main() {
    cfg, err := ini.Load("virt.ini")
    if err != nil {
        cfg = ini.Empty()
    }

    router := gin.Default()
    router.GET("/api/vm", getStarted)
    router.POST("/api/vm/create/:id", makeVM)
    router.POST("/api/vm/kill/:id", killVM)

    go router.Run("localhost:1701")

    def := initVM("tomsrtbt", cfg)
    
    for {
        if false {
            go bootVM(def)
        }
    }
}
