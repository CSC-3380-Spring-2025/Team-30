package main

import (
    //"fmt"
    //"net/http"
    "os/exec"

    //"github.com/gin-gonic/gin" // Makes building a REST API easier
    //"gopkg.in/ini.v1"          // For reading QEMU parameters
)
import . "vm-manager/bootdev"

type vm struct {
    Name       string
    BootDevice BootDev
}

func bootVM(virt vm) {
    cmd := exec.Command("qemu-system-x86_64",
	                "-display", "vnc=127.0.0.1:0",
			virt.BootDevice.Arg(), virt.BootDevice.File())
    cmd.Run()
}

func main() {
    rescue := vm{ Name: "rescue", BootDevice: CDROM("/home/cam/os/systemrescue.iso") }
    bootVM(rescue)
}
