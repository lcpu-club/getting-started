# Linux与服务器介绍与基本使用 II

## Linux 安装和使用

### Linux简介

Linux，一般指GNU/Linux，是一种自由和开放源码的类 UNIX 操作系统内核。其英文解释为 Linux is not Unix。Linux 的内核由林纳斯·托瓦兹（Linus Torvalds）于1991年10月5日首次发布。它主要受到Minix和Unix思想的启发，是一个基于POSIX的多用户、多任务、支持多线程和多CPU的操作系统内核。它支持非常丰富的硬件，能运行主要的Unix工具软件、应用程序和网络协议。
	
Linux 遵循 GNU 通用公共许可证（GPL），任何个人和机构都可以自由地使用 Linux 的所有底层源代码，也可以自由地修改和再发布。因此Linux有上百种不同的发行版，目前主流的Linux版本有：Debian系（包括Ubuntu、Linux Mint等）、EL系（包括及Red Hat Enterprise Linux、Fedora, CentOS）、openSUSE等。

### Linux安装

我们以在x86-64架构的windows下安装Debian双系统为例进行介绍。

#### 1. 准备工作

需要的硬件：U盘（备份好内部数据）

##### a. 镜像的下载
- 前往你所选择的发行版的官网下载镜像，同一发行版的镜像会拥有不同版本，根据需要选择适合的版本。以下我会简略说明各版本的区别。
- 有条件尽量前往官网下载，大部分发行版的官网国内都可以直连。也可以到各高校镜像站的“ISO下载”一栏下载，速度较快。

- 64位与32位：指的是CPU通用寄存器的数据宽度，常见的32位架构为x86，64位架构为AMD64/x64/x86_64。32位架构逐渐被淘汰，我们选择版本时应选择64位的操作系统（即带有后三者之一标识的镜像）。

- 正式版与测试版：对于初学者来说应选择正式版，如果想为体验新功能并为其纠错等可以选择测试版系统。测试版系统的生命周期会远低于正式版系统，需要及时更新以获得软件支持，一般官方网站也会提供相应的测试版下载渠道。特别地，Ubuntu系统还有着长期支持版（LTS），在每个偶数年的4月一更，相比其他版本生命周期更长。

<img src="/assets/basic/10-linux-basic-2/image-20240831200902600.png" alt="image-20240831200902600" style="zoom:50%;" />

(如图，20年发布的Ubuntu 20.04 LTS至今仍在提供更新，而非LTS版最早只支持到23年发布的Ubuntu 23.10)


- 桌面版、服务器版与其他版本：同一个发行版会根据用途来分为不同子版本，功能有所差异，如服务器版很多不带有图形界面。用于日常使用建议下载桌面版(desktop)，用于部署服务器则考虑Server版，其他情况应按需选择。

![image-20240831201200824](/assets/basic/10-linux-basic-2/image-20240831201200824.png)

- 镜像的种类（安装方式）：以debian 12.x为例，官方提供了两种安装方式：较小的网络安装包与完整的离线安装包，前者需要联网进行安装，后者安装过程无需联网。由于官网连接速度不稳定所以一般选择下载完整的安装映像（这里的iso文件的链接表示直接下载镜像文件，torrent种子需用第三方下载器来下载镜像文件）

<img src="/assets/basic/10-linux-basic-2/image-20240831201443388.png" alt="image-20240831201443388" style="zoom: 50%;" />

##### b. U盘的刻录

加载映像文件并运行安装程序需要系统重新引导，一般的处理方式为将其刻录至U盘中，再让电脑启动这个U盘中的安装文件。一般使用第三方镜像刻录软件完成这一步骤。这里笔者使用rufus（也可以使用UltraISO，不过这个是收费软件）来进行刻录（[下载链接](https://rufus.ie/zh/)）

<img src="/assets/basic/10-linux-basic-2/image-20240831202651295.png" alt="image-20240831202651295" style="zoom:33%;" />

如图，在第一栏“设备”处选择你的U盘，然后点击“选择”并选择指定安装镜像，然后点击下面的“开始”即可完成刻录。注意刻录会将U盘内原有数据清空，请注意备份数据。U盘大小只要足够装得下镜像文件即可。

##### c. 磁盘分区

若机器原本没有系统或不想保留原有操作系统则跳过这一步骤（操作同后文虚拟机安装时的步骤）。

对初学者而言尽量在windows下预留出空闲空间后再安装系统，以免在linux下操作时误删分区，以下简述windows下预留空间的具体方法~~（若能在linux下完成这一步骤则可跳过）~~

使用windows系统自带的“创建并格式化硬盘分区”功能可以看到你的磁盘分区情况，若没有空闲空间则可在剩余容量较多的分区右键选择“压缩卷”以获得空闲空间，linux系统一般需求的磁盘空间不多。若剩余容量较多的分区在逻辑卷内或有其他复杂情况可以使用diskgenius等分区软件（正版已经够用，也可使用[图吧工具箱](https://www.tbtool.cn/)内的版本)进行处理。

##### d. 启动引导

由于需要从刻录好镜像文件的U盘启动，需要关闭windows的快速启动功能。

打开控制面板->硬件和声音->电源选项，找到左边的“选择电源按钮的功能”，进入这个界面。有的电脑在关机设置这里会有一个“启用快速启动”选项打勾，若有这个选项我们需要将其关闭，先点击“更改当前不可用的设置”来获取管理员权限，然后再将其取消勾选。有的机型的快速启动设置还会在BIOS中的Boot中，需要进入BIOS修改。

<img src="/assets/basic/10-linux-basic-2/image-20240831204242101.png" alt="image-20240831204242101" style="zoom: 33%;" />

BIOS的进入：开启电脑时出现电脑品牌图标的时候按F2键或Delete键会进入BIOS（部分电脑可能会是F1、F12或Esc键）。有的BIOS厂商做了图形界面，可以直接图形化显示引导项，将刻录好的U盘拖拽到第一项即可。若没有图形化界面，则在Boot栏中调整启动顺序，使U盘为第一引导项。

#### 2. 安装系统

这里以debian 12.x的安装为例进行说明，我们使用北京大学镜像站，加速下载。在选择镜像时，请选择“指定镜像”并选择你所在地区的镜像站。

进入后会出现几个选项，这里是在选择安装类型，简单起见这里选择第一项，使用图形界面安装

<img src="/assets/basic/10-linux-basic-2/image-20240831205318293.png" alt="image-20240831205318293" style="zoom: 80%;" />

语言、键盘配置与地区选择、用户名的设置可按照自己的偏好来选，主机名、域名等也可自行设置。

<img src="/assets/basic/10-linux-basic-2/image-20240831205502046.png" alt="image-20240831205502046" style="zoom:80%;" />

在linux系统中root账户拥有最高权限，你所选择的发行版在安装时可能会要求设置root账户密码。如果没有这一选项可以在安装系统后在终端使用passwd命令设置。

若使用虚拟机或想直接安装在整个磁盘（即覆盖原有数据）可选择"使用整个磁盘"，否则需选择"手动"并找到空闲空间。

<img src="/assets/basic/10-linux-basic-2/image-20240831205556924.png" alt="image-20240831205556924" style="zoom:80%;" />

如图，这里的21.5GB即为空闲空间，我们就要在这块空间上安装系统。

<img src="/assets/basic/10-linux-basic-2/image-20240831205619702.png" alt="image-20240831205619702" style="zoom:80%;" />

若对分区操作不熟或者没有特殊需求的可以选择“对空闲区间进行自动分区”来自动完成操作。这里debian系统预留了三种分区方案可供选择。

<img src="/assets/basic/10-linux-basic-2/image-20240831205713350.png" alt="image-20240831205713350" style="zoom:80%;" />

<img src="/assets/basic/10-linux-basic-2/image-20240831205748850.png" alt="image-20240831205748850" style="zoom:80%;" />

如果有着自己的需求也可以在上一项选择“创建新分区”手动在其上建立新分区。主分区需采用Ext4文件系统并挂载在”/”根目录下，还需要分配空间给交换空间(swap)等，如果还想建立其他分区来挂载到其余位置可以继续操作。

最后选择“完成分区操作并将修改写入磁盘”来结束操作并将改动写入磁盘，注意操作后会将所使用的磁盘空间格式化，装双系统时为避免linux系统下操作出现失误建议先在windows下清理出空闲空间再进行操作。

<img src="/assets/basic/10-linux-basic-2/image-20240831205920758.png" alt="image-20240831205920758" style="zoom:80%;" />

若使用网络安装则可能会有选择镜像源的选项，举例所使用的Debian12系统中自带了多个软件源来选择，一般换用国内源速度较快。如果某些发行版安装过程中没有选项则可以在安装完成后自行更换。

<img src="/assets/basic/10-linux-basic-2/image-20240831210031979.png" alt="image-20240831210031979" style="zoom:80%;" />

下一步选择的是安装的软件集。Debian桌面环境与标准系统工具是需要安装的，web Server、SSH Server这些服务器组件按需安装。GNOME、Xfce、KDE、cinnamon、MATE、LXDE、LXQt则是Linux的桌面环境（可以理解为图形界面），一般选择默认的GNOME，剩余的按照喜好勾选。

<img src="/assets/basic/10-linux-basic-2/image-20240831210119209.png" alt="image-20240831210119209" style="zoom:80%;" />

接下来即可顺利完成安装。等到系统安装完成，重启过程中显示“请移除安装介质后ENTER”或已经重启完毕后再拔掉U盘，然后即可进入系统。若是双系统则也可按照喜好更改GRUB引导方式。

### Linux使用

#### 环境的配置

##### root权限的配置

root用户是超级用户，拥有着linux系统内最高的权限，在终端内使用`su`命令即可以超级用户开启终端，root用户的权限最高，而其他账户则可能会有以能以超级用户身份执行命令的授权（可以类比windows中的管理员权限），但即使是拥有授权的账户在终端输入的命令也不会以超级用户身份执行，如果需要以超级用户的身份运行则需要在此命令前加sudo。

第一种情况，如果你所选择的发行版在安装过程中没有设置root密码的环节（如Ubuntu），则新创建的用户会拥有管理员权限，一般不需要使用 root 账户，直接使用 sudo 命令即可。

第二种情况，如果你所选择的发行版在安装过程中已经设置了root密码，但是自己的账户并没有管理员权限（如Debian），为了用起来方便一般会用root账户给自己的账户添加管理员权限，具体操作如下（\$号后的为输入的命令）：

```
yourusername@yourcomputer$ su
root@yourcomputer$ /usr/sbin/usermod -aG sudo yourusername
```

前者表示切换至root账户，后者表示为你指定的账户添加管理员权限

##### 软件源的配置

如果你的系统在安装的时候已经选择过了国内源则忽略，否则默认源来自于国外。从国外的服务器更新软件包会很慢，可以根据自己系统的版本自行搜索匹配的源并更换。具体参考[北京大学镜像站帮助](https://mirrors.pku.edu.cn/Help)

以采用apt包管理器为例，更新源后需要重新更新软件索引，请执行以下操作：

```bash
sudo apt-get update
sudo apt-get upgrade # 如果需要升级软件包
```

#### 基本命令

在这之前，我们想先聊一聊 Linux 的中心--文件。从 Unix 时代，文件就是操作系统的核心抽象，甚至有“一切皆文件”的说法。在 Linux 中，文件是一切的基础，包括硬件设备、目录、文件、套接字、管道等等，都是文件。Linux 中的文件系统是一个树状结构，根目录为 /，所有文件都是从根目录开始的。
对系统的使用其实是对文件的操作，所以我们先来看看 Linux 中的文件操作。

##### 常用命令

```
cd [dirName]
```

- ```dirName```：要切换的目标目录，可以是相对路径或绝对路径。

这个命令表示切换到目标路径。```dirName```中如果是以```/```,```~```开头则表示绝对路径，```/```表示的是根目录，如```/etc/apt```表示切换至根目录下etc文件夹内的apt文件夹内。```~```表示的是当前用户的home目录，即```/home/yourusername```

否则表示的是相对路径，会进入当前路径下名为dirName的文件夹。```..```表示当前目录位置的上一层目录。

特殊地，```.```表示当前目录，比如```time.txt```与```./time.txt```都可以表示当前目录下名为```time.txt```的文件。但如果文件名为```time```则会默认执行名为```time```的命令而不是文件本身，这时可以使用```./```来避免歧义。

```
dir [options] [Directory] [Files]
ls [options] [Directory]
```

二者都可以展示当前目录下的所有文件。```dir```在windows的cmd中也可用，不过在linux中不常用。```ls```在powershell和linux的终端中被广泛运用。在linux中```ls```命令除可用颜色区分文件类型外还可加入其他参数（也可不加任何参数）。```ls```命令还可使用通配符来显示所有满足要求的文件。

```
ls -l           # 以长格式显示当前目录中的文件和目录
ls -a           # 显示当前目录中的所有文件和目录，包括隐藏文件
ls -lh          # 以人类可读的方式显示当前目录中的文件和目录大小
ls -t           # 按照修改时间排序显示当前目录中的文件和目录
ls -R           # 递归显示当前目录中的所有文件和子目录
ls -l /etc/passwd     # 显示/etc/passwd文件的详细信息
```


```
pwd [--help] [--version]
```

显示当前的目录，一般是在程序中用（实际上就是终端中光标左边的目录）

```
mkdir [-p] dirName
```

- ```-p``` 确保目录名称存在，不存在的就建一个。

在当前目录下新建文件夹，后面的```dirName```可以是个目录下的文件夹（即```dir1/dir2```的形式表示在当前目录的dir1文件夹下建立它的子文件夹dir2）。如果加入```-p```选项会一直沿着```dirName```指定的目录建立（即若不存在dir1则先建立dir1直到指定位置），不加入```-p```若目录不存在则会报错。

```
touch [-acfm][-d<日期时间>][-r<参考文件或目录>][-t<日期时间>][--help][--version] [文件或目录]
```

在当前目录下创建文件（实际使用时前面的参数经常不指定，可直接加文件名，如```touch file.txt```）

```
cp [options] source dest
```

前者表示源文件，后者表示目标文件，表示将指定源文件复制到目标文件位置。若目标文件不存在则会新建一个（此时作用相当于备份），若目标文件存在则会替换（此时相当于替换）
```
-a：此选项通常在复制目录时使用，它保留链接、文件属性，并复制目录下的所有内容。其作用等于 dpR 参数组合。
-d：复制时保留链接。这里所说的链接相当于 Windows 系统中的快捷方式。
-r 或 --recursive：用于复制目录及其所有的子目录和文件，如果要复制目录，需要使用该选项。
-i 或 --interactive：在复制前提示确认，如果目标文件已存在，则会询问是否覆盖，回答 y 时目标文件将被覆盖。。
-u 或 --update：仅复制源文件中更新时间较新的文件。
-v 或 --verbose：显示详细的复制过程。
-p 或 --preserve：保留源文件的权限、所有者和时间戳信息。
-f 或 --force：强制复制，即使目标文件已存在也会覆盖，而且不给出提示。
-l：不复制文件，只是生成链接文件。
```

```
mv [options] source dest
```

前者表示源文件，后者表示目标文件，表示将指定源文件移动到目标文件位置。```cp```与```mv```操作的文件路径都可以是相对路径或绝对路径

```
-b: 当目标文件或目录存在时，在执行覆盖前，会为其创建一个备份。
-i: 如果指定移动的源目录或文件与目标的目录或文件同名，则会先询问是否覆盖旧文件，输入 y 表示直接覆盖，输入 n 表示取消该操作。
-f: 如果指定移动的源目录或文件与目标的目录或文件同名，不会询问，直接覆盖旧文件。
-n: 不要覆盖任何已存在的文件或目录。
-u：当源文件比目标文件新或者目标文件不存在时，才执行移动操作。
```

```
ps [options] [--help]
```

用于显示当前进程的状态，类似于windows的任务管理器。参数过多故不再一一列举，建议使用```--help```来查看具体用法。

```
--help 查看帮助
-A 列出所有的进程
-au 显示较详细的资讯
-aux 显示所有包含其他使用者的进程
```

查找指定进程的格式：

```
ps -ef | grep 进程关键字
```

##### 解压缩

.tar:

```
解包：tar -xvf FileName.tar
打包：tar -cvf FileName.tar DirName
```

.gz:

```
解压1：gunzip FileName.gz
解压2：gzip -d FileName.gz
压缩：gzip FileName
```

.tar.gz 和 .tgz

```
解压：tar -zxvf FileName.tar.gz
压缩：tar -zcvf FileName.tar.gz DirName
```

.bz2

```
解压1：bzip2 -d FileName.bz2
解压2：bunzip2 FileName.bz2
压缩： bzip2 -z FileName
```

.tar.bz2

```
解压：tar -jxvf FileName.tar.bz2
压缩：tar -jcvf FileName.tar.bz2 DirName
```

.zip

```
解压：unzip FileName.zip
压缩：zip FileName.zip DirName
```

.rar

```
解压：rar -x FileName.rar
压缩：rar -a FileName.rar DirName 
```

##### 其他常用命令

```
sudo COMMAND
```

用在其余命令前，表示用超级用户权限执行此命令

```
time COMMAND
```

用在其余命令前，完成后续的命令后会返回运行的时间

```
COMMAND < file 表示将指定文件作为执行命令中的输入
COMMAND > file 表示将命令输出至指定文件而非终端
```

表示将命令输出至指定文件而非终端，二者可以连用，比如：```./a.out < test.in > test.out```表示将```test.in```作为程序的读入，```test.out```作为程序的输出。

还有一些其他命令如```rm```,```cat```,```systemctl```,```grep```等也较为常用，因篇幅有限不再展开叙述。

#### 软件的安装

下述以debian系的软件安装为例：

1. 使用```apt```包管理器安装（推荐）安装简单，便于接收持续更新

```
sudo apt update 列出所有可更新的软件清单
sudo apt upgrade 升级软件包
sudo apt install <package_name> 安装指定的软件包
sudo apt remove <package_name> 删除指定软件包
sudo apt autoremove 清理不再使用的依赖和库文件
apt list --upgradeable 列出可更新的软件包及版本信息
```

部分软件可能会需要自行添加源，需要按照安装指示进行操作

2. (.deb文件)直接使用```dpkg```安装

```
dpkg --help 显示帮助
sudo dpkg -i file.deb 安装指定的软件包
```

3. 软件带有安装程序

软件带有如```.sh```文件、```.pl```文件这类的安装程序。一般可在终端加上```sudo```直接运行，若没有开始运行可能是未添加可执行权限，可通过这个命令手动添加：

```
sudo chmod +x file.txt 给指定文件添加可执行权限
```

#### 文本编辑

这里简单介绍命令行模式下的常用文本编辑器:vi/vim

vi: 文书编辑器，所有的类Unix系统中都内建有vi
vim: 由vi发展出来的文本编辑器。拥有代码补全、编译及错误跳转的功能。

vi/vim 分为三种模式：命令模式（普通模式）、输入模式、命令行模式（底线命令模式）

直接在命令行输入```vi```/```vim```则会进入命令模式，以下是几个常用命令：

```
i  -- 切换到输入模式，在光标当前位置开始输入文本。
x  -- 删除当前光标所在处的字符。
:  -- 切换到底线命令模式，以在最底一行输入命令。
dd -- 剪切当前行。
yy -- 复制当前行。
p  -- 粘贴剪贴板内容到光标下方。
P  -- 粘贴剪贴板内容到光标上方。
u  -- 撤销上一次操作。
Ctrl+r -- 重做上一次撤销的操作。
```

输入模式通过在命令模式按'i'进入，按Esc则返回普通模式，输入模式下可以完成文本编辑工作，与日常使用的文本编辑器区别不大。

底线命令模式在命令模式下按':'进入，最常用的是如下命令：

```
:w  -- 保存文件。
:q  -- 退出 Vim 编辑器。
:wq -- 保存修改并退出 Vim 编辑器。
:q! -- 不保存修改强制退出 Vim 编辑器。
```

除了直接按vi/vim以外还可以通过后接文件名的方式来直接打开指定文件，
如```sudo vi /etc/apt/sources.list```

## 虚拟机的配置及使用

### 虚拟机的介绍

虚拟机（Virtual Machine）指通过软件模拟的具有完整硬件系统功能的、运行在一个完全隔离环境中的完整计算机系统。在实体计算机中能够完成的工作在虚拟机中都能够实现。在计算机中创建虚拟机时，需要将实体机的部分硬盘和内存容量作为虚拟机的硬盘和内存容量。每个虚拟机都有独立的CMOS、硬盘和操作系统，可以像使用实体机一样对虚拟机进行操作。

常用虚拟机软件：
- VMware Workstation Pro / VMware Fusion Pro : 前者支持windows/linux系统，后者支持mac系统，是最常用的虚拟机软件，各项功能齐全，性能强大。
- Oracle VM Virtualbox : 支持windows/mac/linux系统，是一个免费开源的虚拟机软件~~（前最强免费虚拟机软件）~~
- Parallels Desktop : 仅支持mac系统的收费虚拟机软件。
- Hyper-V : windows自带的虚拟机软件，性能一般。但是Hyper-V开启后会与很多其他虚拟化软件冲突（如各大安卓模拟器与VMware，前期版本勾选hyper-V后就无法打开，即使后续版本不再完全冲突也会显著降低性能），开启方式是在"启用或关闭Windows功能"中勾选Hyper-V虚拟机平台。


windows下还有一些其他的软件或功能，它们并不算虚拟机但是可以完成虚拟化工作：WSL、WSA（已经宣布停止支持）、windows沙盒（基于Hyper-V，可以在隔离状态下运行应用程序）。


### linux,mac下的虚拟化解决方案

#### mac

Parallels Desktop: mac下的首选虚拟化软件，优点是安装虚拟机非常简便快捷，设计风格与操作流程非常符合mac的设计习惯。由于它兼具性能强、价格贵的特点，是否使用需要你自己衡量。

VMware Fusion Pro: 功能也十分全面，目前对个人用户免费，是不想购买Parallels Desktop的最优选择。

Virtualbox: 老牌虚拟机软件，在VMware对个人免费之前是mac下最好用的免费虚拟机软件，不过现在功能更强大的VMware Fusion Pro免费后不太推荐。

#### linux

VMware Workstaion Pro/Virtualbox : 一般linux下使用完整的虚拟机会在二者中选择其一，不过一般linux下很少有需求需要用到完整独立的windows环境，如果想要运行某些windows应用或者使用一部分windows环境可以使用下面的方法：

wine : 是一个Windows兼容层，允许你在类Unix操作系统（如Linux）上运行Windows应用程序，而无需安装双系统或虚拟机。

qemu : 是纯软件实现的虚拟化模拟器，几乎可以模拟任何硬件设备，也能够模拟一台能够独立运行操作系统的虚拟机。常与KVM搭配使用，KVM用于CPU和内存的虚拟化，qemu用于I/O的虚拟化，二者一同完成虚拟化操作。

### WSL的使用

#### WSL的定义

WSL，全称为适用于Linux的Windows子系统 (Windows Subsystem on Linux)是一个可以在Windows计算机上同时访问Windows和Linux的强大功能。可以安装Linux发行版并直接在Windows上使用Linux应用程序、实用程序和Bash命令行工具，不用进行任何修改，也无需承担传统虚拟机或双启动设置的费用。

#### WSL的安装

首先打开"启用或关闭Windows功能"（可以在开始菜单搜索到这个程序），勾选"```适用于Linux的Windows子系统```"与"```虚拟机平台```"这两项，然后重新启动。

<img src="https://i-blog.csdnimg.cn/blog_migrate/9adfae8d83fc709621871e08476e5651.png" alt="Windows 功能" style="zoom: 50%;" />

（有的电脑没有"```虚拟机平台```"的选项，这时应勾选```Virtual Machine Platform```）

<img src="/assets/basic/10-linux-basic-2/image-20240901105227418.png" alt="image-20240901105227418" style="zoom:33%;" />

注意"```虚拟机平台```"一项实际上就是Hyper-V，勾选后会导致其余虚拟化软件性能下降。如果不勾选这一选项也可以安装WSL，但是只能使用WSL1，具体的区别会在后续说明。

其中一种安装方法是微软在WSL的官方说明中所写的，这种方法会默认安装Ubuntu发行版，可以自行阅读档案，这里讲解另一种方法：

去Microsoft Store中搜索你想要的Linux发行版及其版本号，随后点击"安装"，安装后点击"打开"，会弹出一个命令行窗口，需要配置一段时间。接下老会让你设置初始账户的名称与密码，然后WSL就安装完成了。

<img src="/assets/basic/10-linux-basic-2/image-20240901110107708.png" alt="image-20240901110107708" style="zoom: 25%;" />

#### WSL的版本与配置

与正常的linux发行版相同，WSL也需要设置root账户密码/更换源等操作，方法如上所述。

WSL有两个版本：WSL1与WSL2，功能有着细微差别，各有优缺：
##### WSL 1
WSL1是一个轻量级的Linux兼容性层，它会将Linux系统调用转换为Windows NT内核调用来实现Linux应用程序的运行，但不支持完整的Linux内核功能。

相比WSL2也有着其优势：首先WSL1不需要开启hyper-V（即选项"```虚拟机平台```"或"```Virtual Machine Platform```"），可以与其他虚拟机软件一同使用。第二点在于WSL1由于实际上调用还是Windows的内核，所以资源的调用速度与Windows上的相差不大，不会因为文件存放的位置影响调用。

WSL1在不使用远程桌面连接形成图形化界面的情况下相当于一个Linux命令行，如果运行的代码不需要Linux内核的情况下没有必要使用WSL2，WSL1就已经足够（大部分情况下没有使用WSL2的必要）。

##### WSL 2

WSL2使用真正的Linux内核，并且支持Docker等其他高级功能。

除去完整linux内核的优势外，相比WSL1，WSL2有着完全的系统调用兼容性，一些linux的软件在运行后可以直接在windows中以图形化界面的形式打开，还能在安装后直接显示在windows的开始菜单上，从开始菜单就可以直接启动WSL中的软件。

但是WSL2也有缺点，除去Hyper-V开启导致其他虚拟化软件的性能下降问题外，WSL2虽然由于拥有完整linux内核所以linux文件系统性能得到了提升，但是linux文件系统外的文件（即挂载到```/mnt```目录中的文件）需要将指令传给windows系统再传回linux系统，这一过程极为缓慢，同理WSL2中windows系统读取linux文件的速度也非常缓慢。如果文件必须存储在windows系统中或文件需要在windows与linux系统间交叉编译等情况还是选择WSL1更优。

##### WSL的命令

（均为在windows下的终端进行操作）

> wsl -l -v

这个命令可以查看当前的WSL的状态

<img src="/assets/basic/10-linux-basic-2/image-20240901112412132.png" alt="image-20240901112412132" style="zoom:50%;" />

如图，NAME表示linux系统名，VERSION表示使用的是WSL1或2，STATE表示当前是否在运行

```
wsl --shutdown
```

这个命令会关闭所有正在运行的WSL发行版与WSL2虚拟机

```
wsl --set-version <Distribution Name> <VERSION>
```

这个命令可以转换指定linux系统的WSL版本（需要关机状态下）

```
wsl --set-default <Distribution Name>
```

这个命令是设置默认启动的发行版，因为你可以选择安装多个linux发行版
（甚至可以WSL1,2各留一个应对不同情况）

后续的几个命令一般连用，可以将原本放在C盘指定位置的WSL文件导出到其他盘。

```
wsl --export <Distribution Name> <FileName>
```

将指定分发版的快照导出为新的分发文件，默认为tar格式。FileName可以带有路径来以放在其他盘，如

```
wsl --export Ubuntu D:\WSL\Ubuntu.tar
```

```
wsl --unregister <Distribution Name>
```

从WSL取消注册该发行版（相当于卸载该发行版）。子系统内部的所有数据、设置和软件将永久丢失，从Store重新安装会安装分发版的干净副本。如果想要保留数据，未经过导出操作不要使用这个命令。

```
wsl --unregister Ubuntu
```

```
wsl --import <Distribution Name> <InstallLocation> <FileName>
```

导入指定的tar文件作为新的分发版（可在后面添加--version 1/2表示WSL的版本号）。如果用于改变WSL的安装位置，则FileName与先前所填的相同，InstallLocation填写新的WSL安装目录，如：

```
wsl --import Ubuntu D:\WSL\Ubuntu D:\WSL\Ubuntu.tar --version 2
```


### windows下虚拟机的安装

#### 1. 准备工作

1. 下载对应发行版的镜像（ISO文件）

2. VMware的安装：
最新版Vmware Workstation 17已对个人用户免费，有条件可直接前往VMware官网下载，或自行寻找可信的国内源下载。（注意软件名称为VMware Workstation Pro）
在安装完成后激活时选择“将VMware Workstation 17用于个人用途”即可免费完成激活。

3. 需要进入BIOS开启虚拟化功能，有关该功能的选项一般在BIOS中的```Configuration```选项中。若是Intel的CPU则名为```VT-x``` (或写为```Intel Virtualization Technology```)，若是AMD的CPU则是```AMD-V```，将其改为```Enable```即可开启。

#### 2. 安装过程

注：VMware的自动安装功能不够完善，安装某些特殊发行版时会出现问题，且可选项有限。接下来我将演示手动安装虚拟机的步骤（以使用VMware安装Debian虚拟机为例）

##### 2.1 虚拟机的创建

首先，如图点击“创建新的虚拟机”

<img src="/assets/basic/10-linux-basic-2/image-20240901002126326.png" alt="image-20240901002126326" style="zoom: 33%;" />

然后在新建虚拟机向导中选择“自定义”。

<img src="/assets/basic/10-linux-basic-2/image-20240901002156060.png" alt="image-20240901002156060" style="zoom: 33%;" />

硬件兼容性可以不做更改直接采用默认选项。

<img src="/assets/basic/10-linux-basic-2/image-20240901002224900.png" alt="image-20240901002224900" style="zoom:33%;" />

注意下一步的安装来源这里需要选择“稍后安装操作系统”，否则VMware会自动安装镜像文件中的系统。

<img src="/assets/basic/10-linux-basic-2/image-20240901002317606.png" alt="image-20240901002317606" style="zoom:33%;" />

在下一步中选择你想要安装的系统的版本，以这个镜像为例需要选择Debian 12.x 64位，具体需要根据你下载的镜像决定（这个选项主要需要把64位或32位看清楚，其余的不是特别重要）

<img src="/assets/basic/10-linux-basic-2/image-20240901002358587.png" alt="image-20240901002358587" style="zoom: 67%;" />

<img src="/assets/basic/10-linux-basic-2/image-20240901002422584.png" alt="image-20240901002422584" style="zoom: 33%;" />

命名虚拟机中的虚拟机名称与位置可以自行修改。

因虚拟机占用空间较大，故建议放在空间较为充足的磁盘。

<img src="/assets/basic/10-linux-basic-2/image-20240901002516660.png" alt="image-20240901002516660" style="zoom:33%;" />

处理器配置这里的"处理器数量"指分配的核心数量，"每个处理器的内核数量"指给每个核心分配的线程数，总共给虚拟机分配的线程数为二者乘积。

若安装的系统对性能要求不高且不运行大项目则无需太多核心，2x2或4x1乃至2x1就已经很够了，不要分配太多以免主机卡顿，分配前请计算自己CPU的核心数量（如大小核需要~~鸡兔同笼~~特别计算）。

<img src="/assets/basic/10-linux-basic-2/image-20240901002603682.png" alt="image-20240901002603682" style="zoom:33%;" />

给虚拟机分配内存也是同理，不要超过主机内存的一半，如果是linux等对内存需求不高的4GB也够用，Windows可能会需要8GB及以上，内存和核心分配的具体数值可以等安装虚拟机后使用软件查看利用情况后再另行调整。

<img src="/assets/basic/10-linux-basic-2/image-20240901002654446.png" alt="image-20240901002654446" style="zoom:33%;" />

网络类型如无特殊需求可直接选用默认的网络地址转换（NAT）

<img src="/assets/basic/10-linux-basic-2/image-20240901002716229.png" alt="image-20240901002716229" style="zoom:33%;" />

I/O控制器类型与磁盘类型也可直接采用推荐选项。

<img src="/assets/basic/10-linux-basic-2/image-20240901002730501.png" alt="image-20240901002730501" style="zoom:25%;" />

<img src="/assets/basic/10-linux-basic-2/image-20240901002740664.png" alt="image-20240901002740664" style="zoom:25%;" />

选择磁盘时，如果有既有的虚拟机磁盘（如转移其他版本或其他软件上的虚拟机）则可选择"使用现有虚拟磁盘"一栏并直接导入。

否则选择"创建新虚拟磁盘"。具体的磁盘大小根据你的用途决定，正常情况下推荐的大小就够用了。

<img src="/assets/basic/10-linux-basic-2/image-20240901002844318.png" alt="image-20240901002844318" style="zoom: 33%;" />

如果不勾选"立即分配磁盘空间"则会根据该虚拟磁盘储存数据多少来动态占用磁盘空间（较为推荐）。

将虚拟磁盘存储为单个文件会导致转移时需要分卷转移或使用较大的移动硬盘，还对磁盘的格式有限制（如U盘常用的FAT32格式单个文件最大支持4GB）

<img src="/assets/basic/10-linux-basic-2/image-20240901002910526.png" alt="image-20240901002910526" style="zoom:33%;" />

##### 2.2 虚拟机的安装

创建完虚拟机后可在虚拟机位置右键点击设置，可以修改先前所选的一部分内容

<img src="/assets/basic/10-linux-basic-2/image-20240901003303914.png" alt="image-20240901003303914" style="zoom:33%;" />

选择设置里的硬件->CD/DVD->连接选项，改为"使用ISO映像文件"并选择你下载的发行版安装镜像。

<img src="/assets/basic/10-linux-basic-2/image-20240901003803015.png" alt="image-20240901003803015" style="zoom:33%;" />

当CD/DVD一栏显示正在使用…(你的ISO文件路径)的时候即可启动虚拟机，然后与正常linux系统的安装方法相同直到进入桌面。

原本的"移除安装介质"（即拔掉U盘）的环节，可以右键VMware窗口右下角的光驱图标并选择"断开连接"来达到相同效果，原本的断网操作也可以右键网络图标并断开连接，等到安装完成后再右键连接。

<img src="/assets/basic/10-linux-basic-2/image-20240901003954815.png" alt="image-20240901003954815" style="zoom:50%;" />

##### 2.3 VMware tools的安装

如果刚装好虚拟机你可能会发现有几个问题：分辨率锁死无法调节、拖拽和共享文件夹无法使用、3D加速无法开启等诸多问题，这是因为VMware tools没有安装（你可以将其理解需要在虚拟机内安装VMware的驱动）

首先需要加载VMware tools的镜像，在**系统安装完成后**如果出现了下面这个黄条就点击"安装Tools"按钮。

![image-20240901102457715](/assets/basic/10-linux-basic-2/image-20240901102457715.png)

如果没有这个黄条也可以在VMware的菜单栏中选择虚拟机->安装VMware Tools（第一次安装没有"重新"二字，如果你已经安装过VMware Tools了就会显示重新安装，可以根据上述功能是否正常工作判断是否需要重新安装）

<img src="/assets/basic/10-linux-basic-2/image-20240901102849649.png" alt="image-20240901102849649" style="zoom:33%;" />

然后你的虚拟机系统内就会以光驱的形式挂载VMware Tools的安装镜像（如果安装的是非linux虚拟机可以直接按步骤操作不在赘述，这里拿debian演示linux下的安装方式），打开这个光驱，找到VMware tools的压缩文件（即```VMwareTools-版本号.tar.gz```格式的文件）

<img src="/assets/basic/10-linux-basic-2/image-20240901103304129.png" alt="image-20240901103304129" style="zoom:33%;" />

在空白位置右键选择在终端中打开（如无图形界面可用命令行打开目录```/media/cdrom0```）。在下一步操作前要保证当前账户拥有```sudo```权限。

<img src="/assets/basic/10-linux-basic-2/image-20240901103513942.png" alt="image-20240901103513942" style="zoom:33%;" />

然后将这个压缩文件拷贝到一个其他位置，如自己的主目录（因为原位置只读），然后再进入该目录并将其解压。

<img src="/assets/basic/10-linux-basic-2/image-20240901104405772.png" alt="image-20240901104405772" style="zoom: 50%;" />

然后进入解压出来的文件夹(```./vmware-tools-distrib```)，用**sudo(管理员权限)**运行```vmware-install.pl```文件

<img src="/assets/basic/10-linux-basic-2/image-20240901104554049.png" alt="image-20240901104554049" style="zoom:50%;" />

然后在如图所示第一个选项（默认选择为no）输入yes，其余的选项直接狂按Enter键走默认选项就可以，随后安装成功。

<img src="/assets/basic/10-linux-basic-2/image-20240901104740639.png" alt="image-20240901104740639" style="zoom:33%;" />

##### 2.4 虚拟机的设置

虚拟机与主机的信息交换方式常用三种，最简单的是将下面的“拖放”与“复制粘贴”开启。

<img src="/assets/basic/10-linux-basic-2/image-20240901003411492.png" alt="image-20240901003411492" style="zoom:33%;" />

或者也可以采取共享文件夹的方法，为保护主机数据建议将主机路径设置到一个独立的空文件夹内或开启只读。共享文件夹一般挂载到'```/mnt/hgfs/```'下。

<img src="/assets/basic/10-linux-basic-2/image-20240901003446957.png" alt="image-20240901003446957" style="zoom:33%;" />

<img src="/assets/basic/10-linux-basic-2/image-20240901003459605.png" alt="image-20240901003459605" style="zoom:33%;" />

快照功能是虚拟机相比直接装系统的一大优势，相当于将虚拟机存档。（WSL也有快照功能，不过用起来没有虚拟机的方便）。VMware菜单上三个时钟图样的表示的就是快照功能，使用"快照管理器"可以用时间轴的方式直观地展示各快照的关系并随时添加快照。

<img src="/assets/basic/10-linux-basic-2/image-20240901114423930.png" alt="image-20240901114423930" style="zoom: 33%;" />

还有USB的接入功能，这个功能允许直接将连在主机上的设备直接接入虚拟系统。如图，在虚拟机->可移动设备中可以找到能直接接入虚拟机的设备，若选择"连接"则会将该设备断开与主机的连接并直接接入虚拟机（比如正常模式下的键盘默认按```ctrl+alt```会将焦点移出虚拟机，无法按出linux的终端快捷键```ctrl+alt+T```，而直接连接后则可以正常使用该快捷键），常用的直接连接的设备如键盘、鼠标、移动硬盘等。

<img src="/assets/basic/10-linux-basic-2/image-20240901114741910.png" alt="image-20240901114741910" style="zoom:33%;" />

## 远程连接与远程文件传输

### SSH

#### SSH的介绍

SSH全称Secure Shell，是一种网络协议，用于加密两台计算机之间的通信，并且支持各种身份验证机制。它主要用于保证远程登录和远程通信的安全，任何网络服务都可以用这个协议来加密。

SSH 的软件架构是服务器-客户端模式（Server-Client）。在这个架构中，SSH软件分成两个部分：向服务器发出请求的部分，称为客户端（client），OpenSSH 的实现为 ```ssh```；接收客户端发出的请求的部分，称为服务器（server），OpenSSH 的实现为 ```sshd```。

#### SSH的安装

若你所使用的linux发行版使用```apt```包管理器，可通过以下命令安装：

```
sudo apt install openssh-client openssh-server
```

若使用的是```yum```包管理器，则是

```
sudo yum -y install openssh-clients openssh-server
```

查看SSH服务是否正在运行：```systemctl status sshd```

#### 如何查看IP

在windows中只需要在命令提示符中输入```ipconfig```即可查看自己的IP

在linux系统中有多种方式查看IP，除了使用图形化界面外还可使用```ifconfig```和```ip```等命令

ifconfig: 使用方式为在终端输入```ifconfig```或```sudo ifconfig```
在某些linux发行版中没有```ifconfig```命令，可以使用```sudo apt install net-tools```安装

ip: 使用方式为在终端输入```ip addr```

<img src="/assets/basic/10-linux-basic-2/image-20240901190226341.png" alt="image-20240901190226341" style="zoom:25%;" />

如图的红框内即为IPv4地址（第一个的127.0.0.1为本机地址），同理```inet6```项对应的即为IPv6地址

#### SSH的用法

查看openSSH安装版本：```ssh -V```

使用ssh登录服务器的命令：

```
ssh hostname
```

```hostname```: 主机名，可以是域名、IP地址或局域网内部的主机名。不指定用户名的情况下，将使用客户端的当前用户名，作为远程服务器的登录用户名，也可以用以下两种方式指定用户名：

```
ssh username@hostname
ssh -l username hostname
```

ssh除了使用```-l```参数指定用户名外还可以使用```-p```指定端口（默认连接22端口）

```
ssh username@hostname -p 22
```

以使用ssh从windows系统（作为客户端）连接至刚安装好的debian虚拟机（作为服务端）为例，主机名与用户名与安装过程中所设的相同（若忘记可查看linux系统中终端）

第一次连接会出现这样的提示：

```
The authenticity of host 'hostname(server IP)' can't be established.
ECDSA key fingerprint is SHA256: ...
Are you sure you want to continue connecting (yes/no)? 
```

这段文字告诉用户，这台服务器的指纹是陌生的，让用户选择是否要继续连接。选择yes即可与该服务器建立连接，输入需要登录的账户的密码后即可登录远程服务器的shell。

使用这个语句可以在SSH登录成功后立刻执行接下来的命令。但是若该命令需要互动式的shell环境则会报错。可以加入```-t```参数来解决这个问题

```
ssh [-t] username@hostname COMMAND
```

若是用来连接主机，```hostname```也可换为IP地址

### scp/sftp

#### scp

scp是SSH提供的一个客户端程序，用来在两台主机之间加密传送文件（即复制文件）。它的底层是SSH协议且默认端口也为22，相当于先使用ssh命令登录远程主机，然后再执行拷贝操作。

scp的操作与cp类似，但是可以
```
scp source destination 
```
其中```source```与```destination```都可以是本地目录或远程目录。本地目录与正常调用目录相同，绝对路径和相对路径都可以。而远程目录则类比linux终端中的使用方式，为```username@hostname:path```的形式（可以打开终端看一眼显示的字符就理解了）。

<img src="/assets/basic/10-linux-basic-2/image-20240901194111878.png" alt="image-20240901194111878" style="zoom:33%;" />

如图即为将windows系统下的文件传送至虚拟机下的示例，同理也可将远程系统的文件传送至本机或是在多个远程系统间进行复制。

同理ssh操作，scp也可以指定端口，但需要的参数是```-P```（大写）。若是传送目录可以添加```-r```表示以递归方式复制目录。

#### sftp

sftp是SSH提供的一个客户端应用程序，主要用来安全地访问FTP。使用下面的命令连接FTP主机：

```
sftp username@hostname 
```

<img src="/assets/basic/10-linux-basic-2/image-20240901194931485.png" alt="image-20240901194931485" style="zoom:33%;" />

如图，出现```sftp>```这个提示符就表示连接成功了

用法同FTP，支持的命令大致与linux的终端操作相同，注意```put```与```get```的使用。

```
ls [directory]               : 列出一个远程目录的内容。如果没有指定目标目录，则默认列出当前目录。
cd directory                 : 从当前目录改到指定目录。
mkdir directory              : 创建一个远程目录。
rmdir path                   : 删除一个远程目录。
put localfile [remotefile]   : 本地文件传输到远程主机。
get remotefile [localfile]   : 远程文件传输到本地。
help                         : 显示帮助信息。
bye / quit / exit            : 退出 sftp。
```

sftp内默认连接至远程主机主目录（即```~```），且远程主机的路径无法识别```~```

下图是一个使用sftp传送文件的示例

<img src="/assets/basic/10-linux-basic-2/image-20240901200012668.png" alt="image-20240901200012668" style="zoom:33%;" />

### SSH的密钥登录

SSH默认采用密码登录，有着不安全且麻烦的缺点。密钥登录是比密码登录更好的解决方案。

- 密钥（key）是一个非常大的数字，通过加密算法得到。对称加密只需要一个密钥，而SSH密钥采用的非对称加密需要两个密钥成对使用，分为公钥和私钥。每个用户通过自己私密保存的私钥登录。而公钥则是公开对外发送的。公钥和私钥是一一对应的，每一个私钥都有且仅有一个对应的公钥，反之亦然。
- 如果数据使用公钥加密，那么只有使用对应的私钥才能解密，其他密钥都不行；反过来，如果使用私钥加密（这个过程一般称为"签名"），也只有使用对应的公钥解密。

使用密钥登录有着如下流程：

1. 手动将客户端的公钥放入远程服务器的指定位置。
2. 客户端向服务器发起SSH登录的请求。
3. 服务器收到用户SSH登录的请求，发送一些随机数据给用户，要求用户证明自己的身份。
4. 客户端收到服务器发来的数据，使用私钥对数据进行签名，然后再发还给服务器。
5. 服务器收到客户端发来的加密签名后，使用对应的公钥解密，然后跟原始数据比较。如果一致，就允许用户登录。

#### 生成密钥

使用```ssh-keygen```程序，直接在终端输入```ssh-keygen```即可生成密钥，如下是一次生成密钥的过程。

```
lsz@debian:~$ ssh-keygen
Generating public/private rsa key pair.
Enter file in which to save the key (/home/lsz/.ssh/id_rsa):
Created directory '/home/lsz/.ssh'.
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /home/lsz/.ssh/id_rsa
Your public key has been saved in /home/lsz/.ssh/id_rsa.pub
The key fingerprint is:
SHA256:pIgUUsvjS+NgxWpVDBILelQKOWp/jTzr1xEOVWxjN/c lsz@debian
```

第一个问题询问的是生成的密钥（私钥）保存的文件位置及文件名，linux下默认是```~/.ssh/id_rsa```这个文件，对应的公钥文件为```~/.ssh/id_rsa.pub```（若采取不同的加密算法则文件名会有所区别）

第二个问题询问的是是否为私钥设置密码保护(passphrase)

生成密钥后为了安全可以修改权限

```
chmod 600 ~/.ssh/id_rsa
chmod 600 ~/.ssh/id_rsa.pub 
```

```ssh-keygen```还有着很多参数，如```-t dsa```表示以dsa算法进行加密。

#### 上传公钥

用户公钥保存在服务器```~/.ssh/authorized_keys```文件，将公钥手动添加进去即可完成上传服务器的过程。

若SSH服务器拒绝读取该文件可能是权限设置不对，可以使用```chmod 644 ~/.ssh/authorized_keys ```将权限改为只有文件所有者可写。

可以使用如下格式上传（```user```与```host```填写用户名与主机名，第一个文件位置对应着刚生成的公钥位置）

```
cat ~/.ssh/id_rsa.pub | ssh user@host "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys" 
```

或使用```ssh-copy-id```命令自动上传公钥。

windows下可以使用PuTTY，也可以使用后续介绍的VSCode

### VSCode的相关插件

#### 使用WSL扩展连接到WSL子系统

首先使用VSCode下载并安装扩展"WSL"，然后选择左侧边栏的"远程资源管理器"，展开"WSL目标"，找到你的linux发行版并点击右边的右箭头"在当前窗口中连接"。

<img src="/assets/basic/10-linux-basic-2/image-20240901210637302.png" alt="image-20240901210637302" style="zoom:33%;" />

然后即可连接至WSL，VSCode的打开文件夹将直接打开到linux子系统对应的文件夹（若文件在windows文件系统上则会被挂载至```/mnt/盘符/...```中调用），终端也会直接调用子系统的终端

#### 使用Remote-SSH扩展进行SSH连接

首先使用VSCode下载并安装扩展"Remote-SSH"

<img src="/assets/basic/10-linux-basic-2/image-20240901204654164.png" alt="image-20240901204654164" style="zoom:33%;" />

然后选择左侧边栏的"远程资源管理器"，展开"远程(隧道/SSH)"，点击"SSH"右边的设置键

<img src="/assets/basic/10-linux-basic-2/image-20240901205237955.png" alt="image-20240901205237955" style="zoom:33%;" />

然后选择第一项配置文件。

<img src="/assets/basic/10-linux-basic-2/image-20240901205346758.png" alt="image-20240901205346758" style="zoom:33%;" />

然后写入如下内容（尖括号内为自己远程连接的设备信息，Port为连接的端口号）：

```
Host <hostname>
  HostName <hostname/IP>
  Port 22
  User <username>
```

保存config文件后按"远程(隧道/SSH)"右边的刷新按钮。

然后按下```F1```或```Ctrl+Shift+P```键，输入```ssh connect```，选择"将当前窗口连接到主机"。并选择刚创建好的配置并按照要求登录。初次登录可能会占用时间设置服务器，最后若右下角可以显示SSH的目标主机表示设置成功。

<img src="/assets/basic/10-linux-basic-2/image-20240901211038298.png" alt="image-20240901211038298" style="zoom: 33%;" />

如图，远程系统的文件与命令行可以正常地在VSCode中显示。

VSCode也支持通过公钥私钥配对的方式免密登录，再次打开先前的config文件，加入新的一行：

```
Host ...
  HostName ...
  Port ...
  User ...
  IdentityFile <ssh key path>
```

其中```<ssh key path>```即为存放私钥的路径。

## 结尾

本文主要由@lsz编写，非常感谢@decmofofs提供的第三部分的大纲及全文的修改建议，联系方式：

- aililsz2005@outlook.com [github主页](https://github.com/LSZ2005)

- decmofofs@gmail.com [github主页](https://github.com/decmofofs)

**注**：本文版权属于LCPU（Linux Club of Peking University），用作LCPU Getting Started项目，转载请注明出处。联系方式：linuxclub@pku.edu.cn
