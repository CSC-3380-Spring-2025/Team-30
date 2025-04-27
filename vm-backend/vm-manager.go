package main

import (
    //"net/http"
    "os/exec"
    "strconv"

    //"github.com/gin-gonic/gin" // Makes building a REST API easier
    "gopkg.in/ini.v1"          // For reading QEMU parameters
)
import . "vm-manager/bootdev"

type vm struct {
    Name       string
    BootDevice BootDev
    Arch       string
    Memory     int
}

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
    cmd := exec.Command("qemu-system-" + virt.Arch,
                        "-m", memToArg(virt.Memory),
	                "-display", "vnc=127.0.0.1:0",
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
    }

    switch {
    case s.HasKey("cdrom"):
        virt.BootDevice = CDROM(imgPath+ s.Key("cdrom").String())
    case s.HasKey("floppy"):
        virt.BootDevice = Floppy(imgPath + s.Key("floppy").String())
    case s.HasKey("hard drive"):
        virt.BootDevice = HardDrive(imgPath + s.Key("hard drive").String())
    default:
        virt.BootDevice = CDROM(imgPath + "systemrescue.iso")
    }

    return virt
}

func main() {
    cfg, err := ini.Load("virt.ini")
    if err != nil {
        cfg = ini.Empty()
    }

    //rescue := initVM("rescue", cfg)
    //tomsrtbt := initVM("tomsrtbt", cfg)
    undefined := initVM("kali", cfg)

    bootVM(undefined)
}
