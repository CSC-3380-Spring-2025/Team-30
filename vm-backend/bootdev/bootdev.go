package bootdev

// ======== MAIN INTERFACE ========

type BootDev interface {
    Arg()  string
    File() string
}

// ======== CDROM ========

type cdrom struct {
    arg  string
    file string
}

func (disk *cdrom)Arg() string {
    return disk.arg
}

func (disk *cdrom)File() string {
    return disk.file
}

func CDROM(file string) BootDev {
    return &cdrom{"-cdrom", file}
}

// ======== Floppy Disk ========

type floppy struct {
    arg  string
    file string
}

func (disk *floppy)Arg() string {
    return disk.arg
}

func (disk *floppy)File() string {
    return disk.file
}

func Floppy(file string) BootDev {
    return &floppy{"-fda", file}
}

// ======== Hard Drive ========

type harddrive struct {
    arg  string
    file string
}

func (disk *harddrive)Arg() string {
    return disk.arg
}

func (disk *harddrive)File() string {
    return disk.file
}

func HardDrive(file string) BootDev {
    return &harddrive{"-hda", file}
}
