package main

import (
    //"fmt"
    //"net/http"
    "os/exec"

    //"github.com/gin-gonic/gin" // Makes building a REST API easier
    //"gopkg.in/ini.v1"          // For reading QEMU parameters
)

func bootISO(iso string) {
    cmd := exec.Command("qemu-system-x86_64",
	                "-display", "vnc=127.0.0.1:0",
                        "-cdrom", iso)
    cmd.Run()
}

func main() {
    bootISO("/home/cam/os/systemrescue.iso")
}
