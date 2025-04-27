package main

import (
    //"fmt"
    //"net/http"
    "os/exec"
    "strconv"

    //"github.com/gin-gonic/gin" // Makes building a REST API easier
    //"gopkg.in/ini.v1"          // For reading QEMU parameters
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

func main() {
    rescue := vm{
        Name: "rescue",
        //BootDevice: CDROM("/home/cam/os/systemrescue.iso"),
	BootDevice: Floppy("/home/cam/os/tomsrtbt.img"),
	Arch: "i386",
	Memory: 1024,
    }
    bootVM(rescue)
}
