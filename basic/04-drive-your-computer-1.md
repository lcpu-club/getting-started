# 前言

随着信息技术的快速发展，电脑已经成为学习和生活中最重要的工具之一。无论你是不是计算机相关专业的学生，电脑都是学习、娱乐中必不可少的伙伴。正因为如此，我们希望大家能够真正掌握电脑的使用技巧，充分发挥它的潜力。

本文的主题是“Drive Your Computer”，旨在帮助大家深入了解电脑的更多功能和使用技巧。我们将带领大家探索从基本操作到高级应用的各个方面，提升你们在学习和生活中的效率和生产力。不论你是刚刚接触电脑的新手，还是已经有一定基础的使用者，我们相信本指南都能为你提供有益的帮助。

通过本文以及接下来的文章，你将接触一些好用的软件，知晓文件到底是什么，熟悉工作环境的安装配置；进而学会高效管理文件，运用版本控制工具，分析解决常见的故障；寻找自己所需的各类资源，并在此过程中规避常见的网络攻击。希望大家通过掌握这些技能，可以如意地使用电脑，让它成为自己的左膀右臂。

**注**：本文主要由(@decmofofs)[https://github.com/decmofofs]编写。非常感谢(@leavelet)[https://github.com/leavelet]和(@李尚泽)[https://github.com/LSZ2005]的帮助。

**注**：本文版权属于LCPU（Linux Club of Peking University），用作LCPU Getting Started项目，转载请注明出处。联系方式：linuxclub@pku.edu.cn

# 1. 基本环境配置

近些年，基本的编程技能成为各个大学的必修课。在繁多的编程语言中，C、C++、Python这三门语言是北京大学的基础编程课中涉及较多的三门。然而，对初学者而言，如何让代码“跑起来”是一道不小的难题——写下第一个"Hello World"，却花费数个小时查阅资料、配好环境、让它运行，确实是一件较费心力的事。因此，我们希望提供一套简单易操作的流程，帮助大家配置好用、舒心的编程环境。

我们在此假设Linux使用者已经有相关基础，因此主要提供Windows与MacOS的配置流程。在后续的文档中，我们将为Linux系统的使用作更加详尽的介绍。

## 1.0 程序编写的过程

从你的想法开始，到可执行文件，最终到一个满意的程序，有如下几个步骤。

![process](/assets/basic/04-drive-your-computer-1/processOfCoding.png)

**注**：python等**解释型**语言，只有解释器。

读者要尤其注意“编辑”与“编译”的区别，“编辑”是我们常说的“敲代码”的过程，而“编译”是编译器将代码**翻译**成计算机能理解的二进制01101010......（也就是常说的可执行文件，如Windows中的`.exe`文件）的过程，“编辑”发生在“编译”之前的。理解这两个概念对于“编程”是至关重要的。


## 1.1 C++环境配置——与课程评测系统保持一致

在这部分中，我们希望尽量帮助大家获得与北京大学目前的C++课程在线测评、考试系统所用的环境一致的编程环境，方便大家适应学校的教学。


### 1.1.1 一些前置问题

#### 什么是GCC/MinGW？

GCC（GNU Compiler Collection）是一类编译器集合。其中，gcc/g++分别是GCC下的C/C++编译器。GCC 目前是 Linux 中最常用的编译器，也是大多数开源项目的首选编译器。

MinGW是一种编译器系统，建立在GCC和binutils项目上。MinGW提供了一套简单方便的<u>Windows</u>下的基于GCC程序开发环境，是一套GNU工具集合。

#### 什么是Clang/LLVM？

Clang 是 C、C++、Objective-C 和 Objective-C++ 编程语言的编译器，基于 LLVM 实现，支持将代码编译到多架构、多平台。macOS 上，默认编辑器是基于 Clang 的 Apple Clang，请注意，Apple Clang 的特性与 GCC 或者标准 Clang 有所不同。macOS 上的 gcc 命令本质上也是 clang，所以我们推荐在 macOS 上安装和使用 gcc，具体可以参考 1.1.3 节

#### 什么是MSVC 和 Visual Studio？

MSVC（Microsoft Visual C/C++）是微软开发的一套Windows下的C/C++编译器。Visual Studio是微软的一款集成开发环境（IDE），其中包含了MSVC编译器。

#### 上面这几种编译器怎么选？

根据实际测试，学校相关课程的自动测评中使用GCC编译器，且默认使用C++17标准。学校机房内 IDE 环境提供的是 Visual Studio。因此，我们推荐使用 GCC 编译器，并且在编译时指定 C++17 标准，同时注意一些关于 Visual Studio 的特例。

由于不同编译器的实现略有区别，且头文件不同（例如GCC下部分函数须引用algorithm头文件，而MSVC下无需），因此，本文档推荐在Windows下使用MinGW，在MacOS下使用 brew 来配置 GCC 编译环境。

​	**注**：可能有同学知道GCC中有头文件 <bits/stdc++.h>，但是我们不推荐使用。这样做会引入所有的标准库，使代码不具有移植性，增加编译时间，降低编译效率，只适合做题时使用。**但是你上大学又不是来做题的**。

<p align="center">
  <img src="/assets/basic/04-drive-your-computer-1/stdcpp.png" alt="北大学生不是做题家" width="200"/>
  转自2021年计算概论课程群
</p>

####  Visual Studio, XCode, Dev-C++, VS Code是什么？怎么选？

前三款软件是IDE（集成开发环境）。其中，Visual Studio，XCode分别是微软、苹果推出的IDE，体量较大；Dev-C++是较老的C++ IDE。VS Code 是一款可拓展的文本编辑器，其功能丰富，体量较轻。


一个趁手的编译环境能够让你专心于实现自己的想法，减少工具的束缚。总的来说，我们想要实现这些目标：

1. 代码书写流畅，支持高亮和自动补全
2. 拥有开放的插件生态和丰富的插件体系
3. 对编译器和调试器有一定的内嵌支持

综合考虑以上要求，我们在这里推荐使用VS Code来构建你的编程环境。但我们推荐你在编程上机课使用机房的 Visual Studio，应对考试需求。


### 1.1.2 Windows环境配置——以Windows10、11为例

以下分几个部分介绍Windows下的环境配置。

#### 什么是环境变量？Path是什么？

环境变量是包含关于系统及当前登录用户的<u>**环境信息**</u>的字符串,一些软件程序使用此信息确定在何处放置、使用文件。环境变量的产生可以这样理解。如果你新写了一个程序，需要放到陌生的环境运行。这时候，就需要从系统获取一些和当前环境有关的信息，这就是环境变量。Windows终端也是这样一个程序，如果在终端中输入`cmd`，这并非完整路径，终端需要负责找到实际的程序位置，那么终端又怎么知道去哪些地方寻找呢？它会读取`Path`这个环境变量，从`Path`指示的路径中寻找。如果`Path`中有一条是C:\Windows\System32\，终端就会从中找到cmd.exe，于是实际执行了C:\Windows\System32\cmd.exe。

#### 如何下载安装VS Code？

请前往这个网址——[Visual Studio Code](https://code.visualstudio.com/)，下载对应系统的安装文件并安装到所需目录。

#### 如何获取合适版本的MinGW，并添加到环境变量？


1. 前往[谷雨同学的预编译 MinGW 下载](https://gytx.lanzoui.com/b01bpa41i)（提取码 cgzy），下载`gytx_x86_64-14.1.0-win32-seh-ucrt.7z`文件。这是基于GCC 14.1.0的MinGW64预编译二进制，GCC默认标准为 C++17），解压到某个目录（这里以C:\mingw64_14.1.0为例）。

2. 点击任务栏的Windows徽标，搜索“环境变量”，找到“编辑系统环境变量”，点击进入，找到界面右下角的“环境变量(N)..."按钮，进入后，在**<u>系统变量</u>**栏找到**<u>Path</u>**，双击后，点击"新建(N)"，键入引号<u>**里面**</u>的内容： "C:\mingw64_14.1.0\bin" , 然后依次对三个窗口点击确定。

（请确定"C:\mingw64_14.1.0\bin"是真实存在的路径，其中包括`g++.exe`如果不是，请根据实际情况修改）

#### 如何在VS Code中安装合适的插件？

请打开VS Code，在左侧边栏找到扩展模块，进入后搜索并下载插件。

我们推荐如下插件：`C/C++`，`C/C++ Extension Pack`，`C/C++ Themes`，`Python`，`Python Debugger`，`Pylance`。

**注意**：需要使用简体中文界面的同学，请搜索 “简体中文”，找到 “Chinese (Simplified)(简体中文) Language Pack for Visual Studio Code”，安装后右下角会自动提示重启VS Code并更换显示语言。

#### VS Code的工作逻辑是什么？

`vscode`分为全局和工作区两部分组成，结构如下图所示。每次打开`vscode`都会新建一个窗口，叫做“工作区”。工作区中包含一个或多个文件夹，可以拥有与全局不同的设置。

如果工作区只有一个文件夹，配置会被放在该文件夹下`.vscode`文件夹中。如果有多文件夹，工作区配置会用一个`code-workspace`结尾的文件保存。

![workspace](/assets/basic/04-drive-your-computer-1/workspace.png)

#### VS Code如何打开文件夹、将工作设置保存到工作区便于取用？

1. 点击左侧边栏第一个按钮，点击打开文件夹，浏览到想要得到位置打开。
2. 点击界面上方的“文件”按钮，找到“另存为工作区”，选择一个位置来保存工作区设置。
3. 点击界面上方的“文件”按钮，点击“从文件打开工作区”，浏览到刚才保存的文件，打开它。
4. 如果想在这个工作区添加不同文件夹，如"C++""Python"来便于管理作业，请点击界面上方的“文件”按钮，点击”将文件夹添加到工作区“。
5. 以后每次打开VS Code后，请从刚才保存的文件打开工作区。这个文件会保存各类设置，包括下文提到的内容。

#### VS Code中的C/C++ Configuration UI配置指南：设定编译器路径、默认语法检查C++标准

设定好前文所述的环境后，我们还需要调整C/C++插件的编译器路径和语法检查标准，与我们使用的gcc相匹配。这样，不会出现引用头文件却报错的情况。

1. 请在VS Code界面最上方搜索栏键入 ">C/C++"，找到"C/C++编辑配置(UI)"。
2. 找到想要用来写C++程序的文件夹，点击它。
3. 找到编译器路径，点击下拉按钮，应该会自动检测到如下路径："C:/mingw64_14.1.0/bin/g++.exe"，选择它。否则，请你复制此路径，粘贴到框内。
4. 下拉，找到C标准和C++标准，**选择你的课程测评网站使用的标准**。例如，两者分别选择c17和c++17。
5. 在**刚才所选的文件夹**内创建".cpp"后缀的文件，编写你的C++程序。你会发现语法检查、include路径检查都使用了相应环境。

![UI](/assets/basic/04-drive-your-computer-1/UI.png)

#### 编译运行你的C++程序——使用终端PowerShell

在VS Code编写完程序后，我们可以按如下步骤运行程序。

1. 使用组合键"Ctrl+\`"打开终端（有些时候是"Ctrl+Shift+\`"）。这里使用PowerShell。
2. cd到程序所在子目录（请自行查找cd命令用法）
3. 使用g++命令编译程序。如:`g++ .\test.cpp`(寻找文件时可以用Tab快捷键)。
4. 上述命令默认生成"a.exe".请输入命令`.\a.exe`执行生成的exe文件。

效果如下图所示：

![Run](/assets/basic/04-drive-your-computer-1/Run.png)

### 1.1.3 MacOS环境配置——以M系列芯片为例

MacOS的基本配置与上述流程类似，区别在于GCC的安装方法。我们推荐MacOS用户使用brew来做环境管理。

#### 什么是brew?

brew全称Homebrew，是 MacOS 上一个免费的开源软件包管理器。它简化了MacOS用户安装软件的过程。

#### 安装brew

打开终端，执行如下命令。这里我们使用清华大学镜像站的brew源。

```
export HOMEBREW_BREW_GIT_REMOTE="https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/brew.git"
export HOMEBREW_CORE_GIT_REMOTE="https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-core.git"
export HOMEBREW_INSTALL_FROM_API=1
echo 'export HOMEBREW_API_DOMAIN="https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles/api"' >> ~/.zprofile
echo 'export HOMEBREW_BOTTLE_DOMAIN="https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles"' >> ~/.zprofile
export HOMEBREW_API_DOMAIN="https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles/api"
export HOMEBREW_BOTTLE_DOMAIN="https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles"
export HOMEBREW_PIP_INDEX_URL="https://mirrors.tuna.tsinghua.edu.cn/pypi/web/simple"

git clone --depth=1 https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/install.git brew-install
/bin/bash brew-install/install.sh
rm -rf brew-install
```

这里如果执行`git`时，提示需要安装`Xcode Command Line Tools`，请按照提示安装。

**非常值得注意的是：**M1及以后芯片的MacBook上，brew安装目录是`/opt/Homebrew`，在后续的环境配置中需要用到。

安装完成后**重启终端**，通过在终端输入`brew -v`，可以查看homebrew版本。如果正确输出版本信息，表示成功安装。实际使用时，使用brew指令即可。

推荐参考[基本开发环境配置（终端与brew）](https://macguide.leavelet.io/Advanced/developmentEnvFromScratch.html)，完整配置MacOS的开发环境。


#### brew的基本使用以及GCC的安装方法

- **查看brew版本**：`brew -v`
- **查看brew已安装的包列表**： `brew list`
- **查看某个包的信息**：`brew info`。如查看`xz`的信息：`brew info xz`
- **安装包**：`brew install`。如`brew install python3`
- **更新包**：`brew upgrade`。使用方法同上。
- **卸载包**：``brew uninstall`。使用方法同上
- **更新brew**：`brew update`

安装GCC时，使用`brew install gcc`即可。安装程序会自动进行，在电脑上安装适配的最新版本。等待安装完成后，键入`brew info gcc`查看是否安装完成。例如，在笔者的电脑上，显示如下结果：

![gccinfo](/assets/basic/04-drive-your-computer-1/gccinfo.png)

#### MacBook上的C/C++ Configuration UI配置

此处配置与前文所述的Windows配置方法大致相同。**但是**，VS Code无法自动检测到brew安装的GCC编译器路径，因此需要手动输入。

如上一张图片的其中两行所示：

```
Installed
/opt/homebrew/Cellar/gcc/14.1.0 (1,560 files, 422.7MB) *
```

`/opt/homebrew/Cellar/gcc/14.1.0`就是安装路径。我们在后面添加`/bin/g++-14`，最终得到：

`/opt/homebrew/Cellar/gcc/14.1.0/bin/g++-14`，这就是需要填入“编译器路径”栏的值。

不同使用者的具体情况有别。请根据自己的`brew info gcc`显示的路径来调整。

然后，再设置需要的C/C++语法检查标准即可。

**注意**：与Windows不同，这里的g++-14就是MacOS上g++编译器的**可执行文件**，它没有`.exe`后缀，且命名不同。

#### 在MacOS上运行C++程序

这一部分大体上也与Windows类似：直接在VS Code打开终端，编译，然后执行。区别在于：

- g++编译器产生的可执行文件以`.out`结尾，例如`a.out`。

- Mac上不要直接使用`g++`命令。

**<u>请一定要注意第二点！</u>** 这是因为，MacOS上的Apple Clang编译器在环境中注册了`g++/gcc`这两个命令。实际上，它们都指向Apple Clang编译器，与`clang`命令**完全一致**。因此，如果直接输入`g++`，实际调用的是Apple Clang来编译，而不是我们安装的GCC。

**解决方法有如下几种**：

- 每次使用g++-14命令来编译程序。
- 在终端配置文件中，添加：`alias g++='g++-14'`和`alias gcc='gcc-14'`来永久替换`g++`和`gcc`命令。这一步所述的配置文件将在后文[终端环境配置](#TerminalEnvironmentConfiguration)中提及。



## 1.2 Python环境配置

Python也是北京大学课程教学中常用的一门语言，例如数据结构与算法和各类AI相关课程。本文中，我们来探讨一下Python环境的配置方法。


### 1.2.1 Conda是什么？

Conda是在Windows、macOS和Linux上运行的开源软件包管理系统和环境管理系统。**Conda可以快速安装、运行和更新软件包及其依赖项**。

使用Conda配置Python环境，有一个**巨大的好处**：它可以同时存储各个不同版本的Python，每个版本具有独立的包和库；使用时，可以用命令很方便地切换要使用的版本（这使用虚拟环境来实现）。

在教学、工作中，我们常常会用到不同版本的Python，每门课程用到的包的版本也不同。因此，为了避免不同版本的Python和它们安装的包相互混淆、干扰，我们推荐使用`Conda`来做管理。

我们对于所有系统，都推荐 Miniforge，这是一个精简版的Conda，不含Anaconda的一些不必要的包，体积更小，更适合个人使用，而且其中的`mamba`命令速度极快。

具体安装方式如下：

先访问[miniforge网页](https://github.com/conda-forge/miniforge)，下载所需的安装包。这里以Windows为例，下载`Miniforge3-Windows-x86_64.exe`。

然后双击安装包，按照提示安装即可。安装完成后，打开终端，输入`conda -V`，如果显示版本号，表示安装成功。

#### Conda的基本使用

使用前先换源，保证网络连接性。在`~/.condarc`文件中添加如下内容即可。这里的`~`表示用户目录，Windows 上是`C:\Users\用户名`，macOS 上是`/Users/用户名`。注意，Windows先执行 `conda config --set show_channel_urls yes`生成`.condarc`文件，然后再修改会比较方便。

```
channels:
    - defaults
show_channel_urls: true
default_channels:
    - https://mirrors.pku.edu.cn/anaconda/pkgs/main
    - https://mirrors.pku.edu.cn/anaconda/pkgs/r
custom_channels:
    conda-forge: https://mirrors.pku.edu.cn/anaconda/cloud
    pytorch: https://mirrors.pku.edu.cn/anaconda/cloud
    bioconda: https://mirrors.pku.edu.cn/anaconda/cloud
```

使用时，有下面几个常用命令：

（`mamba`是`conda`的加速版，速度更快，也可以直接使用 `conda` 命令，效果相同）

- `mamba env list`：查看已安装环境。刚安装好Conda时，会显示`base`这个环境。
- `mamba list`：查看当前环境下安装的所有包的名称。
- `mamba -V`：查看Conda的版本号。
- `mamba create`：创建环境。参数`-n`指定环境名称，参数`python=`指定python版本。此处推荐安装好环境后再安装它的包，不要在这里指定。例如：`mamba create -n AIHomework python=3.10.11`，创建了一个名为AIHomework的环境，它的python版本是3.10.11。
- `mamba activate`：激活环境。例如，`mamba activate test`会在当前终端激活test这个环境，激活成功后会有如下显示：

![activate](/assets/basic/04-drive-your-computer-1/activate.png)

​	**注意**：windows下安装`conda`后第一次使用虚拟环境时，要先输入`mamba init`。弹出授权窗口，选是，然后**关闭终端重新打开**。

- `mamba deactivate`：退出虚拟环境。如`conda deactivate test`，会**完全退出**conda，此后终端使用系统环境。直接输入`conda deactivate`会切换到`base`环境。

#### 虚拟环境内包的安装

我们推荐先进行换源，保证网络的连接性，执行以下命令，可使用北京大学镜像站。

```
pip config set global.index-url https://mirrors.pku.edu.cn/pypi/web/simple
```

以下是pip的常用命令，可以按需安装包：

- `pip show`：查看包的具体信息。例如`pip show pip`。

- `pip list`：查看已经安装的包。
- `pip install`：安装指定的包。后面要接包名。
- `pip freeze > requirements.txt`：把包列表输出到文本文件。
- `pip install -r requirements.txt`：根据文本文件批量安装包。
- `pip uninstall`：卸载包。
- `pip install --upgrade 包名称==版本号`：更新包。
- `python -m pip install --upgrade pip`：更新pip。

如果要使用conda来管理包，命令类似。


## 1.3 终端环境配置

在上面提到的步骤中，**终端（Terminal）**始终贯穿全文。终端，就是一种提供各类Shell访问的应用程序。在这个部分中，我们来了解一下怎么配置合适的终端环境，以便我们通过命令行的方式来操控电脑。


### 1.3.1 Windows终端配置

在Windows平台上，我们极力推荐使用<u>**PowerShell**</u>。这是近几年新兴的一种命令行工具，由微软基于`.NET`开发，与系统连接紧密，功能极其强大，且命令语言符合直觉。

#### 更改脚本执行策略

要定制PowerShell，第一步就是更改脚本执行策略。在Windows11中，微软为了增强系统的安全性，默认禁止了一切脚本的执行（也就是通过一份文件来批量运行命令）。然而，不巧的是，微软甚至把**终端配置文件**也算在了脚本之中，因此在默认条件下，我们对终端配置文件作的任何修改都是无效的。所以，配置终端环境的第一步就是更改脚本执行策略。

请在VS Code中打开终端，或者按`Win+R`输入powershell回车。打开终端后，输入如下命令：

```
Set-ExecutionPolicy PolicyYouWant
```

这里的`PolicyYouWant`有如下几种选择：

- `Allsigned`。这个策略要求所有脚本具有可信的签名，安全性很高。
- `Bypass`。这个策略默认允许所有脚本执行。没有安全性。而且执行时没有任何警告。
- `Remotesigned`。这个策略要求从 Internet 下载的脚本和配置文件具有受信任的签名。安全性适中。
- `Restricted`。这个策略只允许单个命令执行，禁止脚本。安全性极高。
- `Unrestricted`。允许未签名脚本执行。安全性很低。
- `Default`。根据设置，采取`Remotesigned`和`Restricted`之一。

为了**兼顾安全性和易用性**，我们建议使用`Remotesigned`策略。

#### 更改终端配置文件和美化终端

我们可以在powershell中输入`start $PROFILE`来打开配置文件进行编辑。

**注意**：使用`code $PROFILE`从VS Code打开配置文件可能会出现问题，表现为显示未保存的空文件。此时如果保存，那么配置文件会变为空文件。

具体的配置和美化过程较复杂，且需求因人而异。读者可以在网上查找相关资料来定制自己的终端。例如，可以查阅如下网站：https://zhuanlan.zhihu.com/p/352882990


### <span id="TerminalEnvironmentConfiguration">1.3.2</span> MacOS终端配置与美化

MacOS终端提供了几种不同的shell，比如bash和zsh。修改这些shell的配置文件时，无需像Windows一样更改脚本执行策略。如果要修改zsh的配置文件，可以用文本编辑器打开它。例如，用VS Code打开：在VS Code内，按  Ctrl+\`打开终端，然后输入 `code ~/.zshrc` 。

**注意**：没有打开VS Code的情况下，直接在系统终端输入如上命令可能发生同样的情况（显示未保存的空文件，此时如果保存，那么配置文件会变为空文件）。

笔者在此推荐一种配置，目前正在使用：

```zsh
# 开启自定义颜色
autoload -U colors && colors
#显示git分支
function parse_git_branch(){
    git branch 2> /dev/null | sed -n -e 's/^\* \(.*\)/[\1]/p'
}
setopt PROMPT_SUBST
#配置提示符颜色
export PROMPT='%F{green}%n@%m:%F{cyan}%~%F{green}$(parse_git_branch)%F{white}> '
#设置别名
alias g++='g++-14'
alias gcc='gcc-14'
alias cc='gcc-14'
alias c++='c++-14'
```

这个配置让终端显示了当前所在目录的全名、登录账户名、设置了前文所述的编译器别名，且个人觉得颜色在VS Code中比较好看。效果如下：

![zsh](/assets/basic/04-drive-your-computer-1/zsh.png)

在设置好配置文件后，保存重启终端即可。

此外，笔者还推荐一种系统终端主题：打开系统终端，在电脑的最上边栏选择终端按钮，下拉栏中选择设置，在左边栏找到Pro主题设为默认。如果使用此主题，那么颜色会和上面的图片一样。


### 1.3.3 常用快捷键和一些指令

在课程中，我们会经常和终端打交道。这里介绍一些常用快捷键：

- `Ctrl+Shift+C/V`：终端中的复制和粘贴。注意，它与常用的复制粘贴快捷键不同。在Windows中，你也可以直接选中文本，然后右键复制。
- `Ctrl+C`：强制终止程序并释放内存。
- `Ctrl+Z`：强制暂停程序，不释放内存。

其它快捷键：

- `Ctrl+A`：全选代码，方便快速复制提交。
- 按住滚轮，上下滑动：扩展光标所在行数，可以批量在很多行代码前面加Tab或者删空格，便于控制缩进。

还有一些指令非常好用：

- `./a.out < in > out`：在Linux和MacOS中，此指令可以从`in`读取输入，传递给程序`a.out`作为输入，然后把输出传到文件`out`中。这在做一些题目时非常有效，尤其是<u>程序设计实习的魔兽世界大作业</u>这类输出以MB来计数的题目。

  **注意**：这会删除out文件中原本的内容。

  获取输出后，可以用VS Code的**对比功能**对比自己的输出和评测系统的输出，来修正程序。

- `get-content in | .\a.exe > out `这个命令功能与上述命令相同，但它在Windows PowerShell中使用。因为PowerShell中 '<' 字符是保留字，所以必须使用这种写法。

- `cd`：更改终端所在目录。使用时，输入cd后按Tab键，可以快捷遍历当前目录下的子目录。或者，也可以直接输入全路径。

在后续的文档（Drive Your Computer III）中，我们会提到更多的快捷键。


# 2. 文件和文本

在使用电脑的过程中，我们常常听到一个名词——文件。安装软件用到的安装包、前文提到的`exe`可执行文件、提交作业时常用的`word`文档、拍照后生成的`jpg`和`jpeg`格式图片，都是文件。虽然我们每天都在使用文件，但我们可能不太了解它。在本节，我们简要了解一下到底什么是文件、文件系统、如何创建文件，文件和文本的区别，从而对文件有更深入的认识。


## 2.1 文件的本质

不同操作系统（如Windows，Linux，MacOS，Android）都有文件的概念，而且它们对于文件的处理方式有些不同。但是，在各个操作系统中，我们都可以把文件理解为一堆二进制数据的集合——它是计算机存储系统中的基本单位，用于存储数据和信息。

无论文件的类型或内容是什么，计算机存储和处理的所有数据最终都表示为**二进制形式**，即由0和1组成的比特序列。例如，Windows中常用的`txt`文件，它在打开时虽然显示为文字，但在底层，这些字符是通过字符编码（如ASCII或UTF-8）表示为二进制数据的。例如，字符`A`在ASCII编码中表示为二进制的`01000001`。打开文件时，选用的不同种字符编码，实际上就是告诉计算机用什么**标准**去读取文件，并按对应的规则显示为字符。


## 2.2 文件的后缀

常用Windows的读者或许会发现，基本上每个文件都有自己的后缀；如果改变某个文件的后缀，系统会弹出警告，提示可能会导致文件不可用。现在，我们来了解一下文件后缀。

实际上，文件的后缀是文件**命名**的一部分，在各个操作系统中一般用`.`来区分：文件名从左到右的第一个`.`右边就是文件后缀。因此，文件后缀与文件的**具体内容**无关，改变它并不会改变文件的内容——归根结底，它只是名字的一部分而已。

虽然文件后缀不影响文件内容，但在现代操作系统中，它有很大的作用。前文提到，在计算机眼里，文件的内容本质是一个二进制序列，不同的文件即使差别很大，但在二进制的世界里，也就是某些位不同而已。由于文件有许多类别（例如文本文件、照片、视频、可执行文件），计算机需要知道用什么方式（应用程序）来打开指定的文件（这些程序会根据它的设计目的，按照某种固定的**标准**，使用文件中存储的数据。比如，相册打开`bmp`文件时，会将文件开头的固定长度作为**文件头**，从中读取照片大小、长宽等信息，并按照这些信息在后文中读取像素数据，渲染成图片）；但这又难以从文件内容直接看出来。所以，**后缀**应运而生——它可以告诉计算机用哪一类应用程序来读取文件。如果随意修改后缀，可能会导致计算机用错误的程序打开文件，或者压根不认识这个后缀，我们就无法看到想要的内容。而实际上所有文件都可以用记事本打开，只不过可能是乱码罢了。

下面介绍一下常见的后缀：

- **文本和文档**：`.txt`、`.doc`、`.docx`、`.xls`、`.xlsx`、`.ppt`、`.pptx`。前者是记事本文件，后面则是Word、Excel、PowerPoint软件的文件格式。

- **源代码**：C++：`.cpp`、`.cc`、`.cxx`、`.hpp`、`.hxx`

  ​		C：`.h`、`.c`

  ​		Python：`.py`

  源代码文件都可以用记事本打开。它们的本质都是文本。

- **视频文件**：`.mp4`、`.avi`、`.mkv`、`.ts`、`.m3u8`等。

- **图片**：`.jpg/.jpeg`、`.png`、`.gif`、`.bmp`、`.webp`、`.svg`等。

- **压缩文件**：`.zip`、`.rar`、`.7z`等。常用于Linux系统的有：`.tar.gz`、`.tar.xz`。常用于MacOS系统的有：`.dmg`（用于分发软件）。用于光盘，或虚拟光盘的为：`.iso`，可用来存放系统镜像。

- **可执行文件**：Windows：`.exe`；Linux/Unix：无；MacOS：无，或`.app`；Java程序：`.jar`

- **脚本文件**：Windows：`.bat`、`.cmd`、`.ps1`；Linux/Unix：`.sh`


## 2.3 文件系统

我们都知道，文件存储在硬盘等实体介质中。为了便于管理文件，人们发明了“文件系统”，用于管理和组织存储设备（如硬盘、SSD、光盘等）上的文件。下面是文件系统上的一些概念：

- **目录（文件夹）**：是包含文件和子目录的特殊文件，用于组织和管理文件。
- **文件路径**：
  - **绝对路径**：从根目录开始的完整路径，例如 `/home/user/document.txt`。
  - **相对路径**：相对于当前工作目录的路径，例如 `document.txt`。
- **元数据**：文件系统存储文件和目录的元数据，包括**文件名**、**大小**、**创建时间**、**修改时间**、**权限**等。

文件系统的部分功能如下：

- **管理文件权限**：
  - 文件系统管理文件和目录的访问权限，通常包括读取、写入和执行权限。
  - 在类Unix系统中，文件权限由所有者、所属组和其他用户的权限组成。
- **文件操作**：
  - 文件系统提供基本的文件操作，如创建、删除、读取、写入、重命名、复制等。
- **挂载和卸载**：
  - 文件系统可以挂载到操作系统的目录树中，使其内容可访问。卸载文件系统会断开这种连接。

我们来看一些常见的文件系统：

- **FAT32**：一种较老的文件系统，广泛用于USB闪存驱动器和存储卡。
- **NTFS**：是Windows操作系统的默认文件系统，支持大文件和高级功能。
- **ext4**：Linux操作系统常用的文件系统，支持大文件和高性能。
- **APFS**：苹果公司为macOS和iOS开发的文件系统，支持加密和快照。


## 2.4 文本

文本是一类特殊的文件，由于源代码文件也属于文本，且我们日常接触较多文本类文件，这里着重提及。

我们首先来看**纯文本**，在各类系统中可以使用`txt`后缀来区分，打开它时会调用系统自带的纯文本编辑器，例如Windows上的记事本。这类文本基本只有单纯的显示字符的功能，没有其他额外功能。实际上，各类后缀的**源代码**本质也是此类文本。

### 文本的编码

上述文本的保存和显示需要用到**编码**。前文提到，所谓编码，就是**将字符转换为二进制数据的规则**，它是一种字符与二进制数据的对应关系，可以理解为数学上的双射。保存文本文件和打开文本文件时，分别需要选择一种编码格式。如果这两种编码格式不匹配，打开时就可能显示乱码，例如常见的**锟斤拷烫烫烫**。如果编码A是编码B的子集，那么，用A保存、用B打开也是可以的。下面这张图展示了常见编码之间的关系：

![encode](/assets/basic/04-drive-your-computer-1/encode.webp)

图中可以看到，ASCII编码是图中其他编码的子集，因此用它保存的文本，用其他编码都可以打开。（UTF-16，UTF-32等除外）。

**注意**：我们常用的可以显示中文字符的编码是**UTF8**。

记事本和VS Code都会在当前界面的右下角显示目前使用的编码格式。通常，这类文本编辑器会自行检测打开的文件使用的编码，如果检测失败，可以手动切换。

### 文本的字体

除了编码和文本显示有关系，字体也会影响文本的显示方式。选择一种心仪的字体对于完成文本类工作是非常重要的。

下面是一些常见字体：

- **微软雅黑**：一种由微软公司开发的中文无衬线字体，专为简体中文用户设计。版权归属方正集团。
- **宋体**：是中文字体中最常见的一种衬线字体，广泛用于各种正式和非正式的文档中。有思源宋体、方正宋体、方正仿宋等变种，它们都可以免费商用。
- **黑体**：一种无衬线字体，字形端正，笔画横平竖直，笔迹全部一样粗细。思源黑体可以免费商用。
- **Consolas**：一种等宽字体，推荐用于编程。

**注意**：部分字体不可以免费商用，需要购买许可。



下面介绍VS Code更改字体的方法。依次选中文件->首选项->设置，搜索字体，在Font Size和Font Family中更改字体大小和字体系列。逗号分隔字体，系统会依次搜索可以使用于当前文本的字体。



### 各类文本和文档

除了纯文本，还有许多种文档被广泛使用。下面列举其中的一部分：

- **Word文本**
- **Excel表格**
- **PowerPoint幻灯片**
- **PDF**：是Adobe开发的文件格式，广泛用于公文、电子书、论文等正式文档，较为安全。
- **Markdown**：一种轻量级标记语言，旨在以简洁易读的纯文本格式编写文档，同时能够转换为结构化的HTML等格式。
- **LaTeX**：是基于 TeX 的文档排版系统，提供高级命令和宏包，简化了复杂文档特别是包含数学公式的技术和科学文档的编写和排版。可以编译生成PDF文档。

我们会在第11讲涉及到文本编辑的更多内容。

## 2.5 创建文件

在Windows上，要创建一份文件，可以在右键菜单中选择创建文本文档，然后根据需要修改名称和后缀。

在MacOS上，系统没有直接在右键菜单中提供类似的选项。可以用下面几种方式：

- **利用软件**：打开VS Code等软件，在相应目录右键，点击新建文件
- **利用终端**：打开终端，定位到需要创建文件的目录，输入命令`touch filename`，创建名为filename的文件。

在Linux/MacOS中，第二种方法比较常见。


# 3. 软件的安装和卸载

安装卸载软件听起来是很简单的事——但其中其实有很多门道。有一则笑话：“我熟练掌握PS、AE、Word、Excel、PowerPoint等软件的安装和卸载“，听起来很好笑，但许多软件的安装和卸载本身也是有难度的。在这一部分中，我们来了解一下如何正确地安装、卸载软件，打造一个干净的电脑环境。

## 3.1 软件的安装

### 定位官网

常用的免费/付费软件都会有一个官网。然而，由于近年来搜索引擎广告严重，许多官网难以找到，甚至人们在寻找官网的时候被带到“xx软件园”等流氓网站。因此，找到官网也成了一门技术活。

![steam](/assets/basic/04-drive-your-computer-1/steam.png)

如上图，在百度中搜索steam，第一个结果就不是官网。一般来说，搜索引擎以蓝色小块标注官网的，就是官网。

![steam2](/assets/basic/04-drive-your-computer-1/steam2.png)

如上图，我们采用必应搜索引擎搜索steam，此时第一个结果就是官网。选择一个好的搜索引擎对于找到软件官网很有帮助——我们推荐使用必应，有条件的可以使用谷歌，来寻找需要的软件。相信大家在第二讲中已经有所体会了。

### 下载软件

进入官网后，一般来说软件下载按钮会出现在主页。但有时候需要耐心寻找。例如steam的安装按钮就很小：

![steaminstall](/assets/basic/04-drive-your-computer-1/steaminstall.png)

找到按钮，进入下载网页后，网站一般会根据电脑类型自动判断需要的**安装包**。此时，我们只需点击下载按钮，等待下载完成后打开即可；在保护比较严格的电脑上，可能会弹出风险提示，**在确认确实是要下载的软件，且软件安全后**，选是即可。如果网站没有根据电脑自动选择安装包，如下图：

![qq](/assets/basic/04-drive-your-computer-1/qq.png)

请根据自己电脑的类型来选择。例如，电脑是Windows，点进去后是如下的画面：

![qq2](/assets/basic/04-drive-your-computer-1/qq2.png)

这里要**尤为注意**自己电脑的情况。一般来说，64位Windows就用默认下载按钮；而**Surface**这类**Arm**架构的Windows电脑要选择**Arm版本下载**。如果是MacBook，也要注意**Intel和Apple芯片的区别**，否则无法正常安装。

### GitHub上软件的下载

第一次在GitHub下载软件的时候，可能有许多人会被它的命名方式困扰。首先，我们需要进入一个项目的Releases界面：

（在搜索引擎上搜索你要的软件名，后面加上 GitHub，一般可以搜到它的GitHub主页）

![clv](/assets/basic/04-drive-your-computer-1/clv.png)

然后找到它的Assets部分：

![assets](/assets/basic/04-drive-your-computer-1/assets.png)

通常来讲，我们用的电脑是Arm64/amd64（x64）架构。常见的轻薄本、游戏本、台式机都是amd64（x64）架构，我们要找到对应的架构，以及后缀为`.exe`或者`.msi`的文件来安装。Linux则要找到自己的架构，且后缀为`.deb`、`.tar.gz`等的文件；MacOS用户，如果是Apple芯片，则要找到`aarch64`、`arm64`架构，`.dmg`后缀的文件来安装。如果是Intel芯片，则要找`x64`架构，`.dmg`后缀文件安装。

### 安装软件

打开安装包后，就可以开始安装了。

在Windows电脑上：请一定仔细检查所谓**极速安装/快速安装**这些按钮。出现这些按钮后，建议点击详情，它们一般会默认安装到C盘；这时，需要的话，可以点击浏览，安装到其他盘（尤其是对于**原神**这类大型游戏，几个就把C盘占满了）。不需要更改目录的话，也请查看是否有**捆绑软件**默认勾选。

安装完成后，强烈建议**查看整个界面**，是否有捆绑软件勾选，再点击完成。


对于MacOS电脑，情况有所不同。一般来说，下载到的是`.dmg`文件。双击运行，把软件图标拖到Application文件夹即可安装。安装完成后，会发现Apps中出现这个软件。但有时候，打开软件会提示App已损坏。这是Apple的过强的安全策略造成的。

由于篇幅限制，请针对每个软件出现的问题，搜索相应的解决办法（因为每个软件的包名不同）。下面给出两个网站，介绍了相关问题的通用解决办法：

[最新｜解决Mac安装软件的“已损坏，无法打开。 您应该将它移到废纸篓”问题 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/135948430)

[无法打开App的可能解决方法 - Mac 指北 (leavelet.io)](https://macguide.leavelet.io/Bike/appnotopen.html)



## 3.2 卸载软件

### Windows

一般来说，Windows上的软件在安装后会提供卸载程序。

**注意**：直接把桌面上的软件图标移动到回收站是不可行的！！！

**注意**：直接把桌面上的软件图标移动到回收站是不可行的！！！

**注意**：直接把桌面上的软件图标移动到回收站是不可行的！！！

重要的事情说三遍。现在，请到设置的如图部分：

![uninstall](/assets/basic/04-drive-your-computer-1/uninstall.png)

点击后，搜索你要卸载的软件，然后点卸载。

### MacOS

在MacBook上删除软件比Windows复杂得多。虽然，在访达->Application文件夹，把软件移到废纸篓，或者在启动台长按，点×删除，可以删除软件主体；**但是**，这样做并不能删除软件在系统各处创建的配置文件等等琐碎的小文件，也就是**软件残留**。

因此，可以选择用**brew**这样的工具来管理软件。或者，对于具体的软件，搜索其相应残留位置手动删除。


## 3.3 规避流氓、病毒软件

流氓软件多如牛毛，相应的规避方法也不完全相同。在安装软件时（尤其是Windows），要注意：

- 不要去任何软件园下载软件。
- 不要去下载未经确认安全的盗版资源。这种时候，下载完了可以用Windows Defender之类的杀毒软件扫一扫。但也不一定安全。
- 与直觉相反，360软件管家下载的软件一般是安全的，例如可以下载到正版steam。（笔者最近在网上冲浪时发现了这一点，非常震惊）~~但这种方法有不菲的代价，比如电脑上留了个大流氓~~
- 安装的时候，安装程序的**每一个界面**都要留意，例如修改浏览器主页、勾选捆绑软件等行为。甚至有**不要取消勾选你不想要的软件**这种神奇操作。
- 可以多去GitHub下载开源软件。但要注意，开源软件也不一定安全。

总之，没有任何方法能彻底避免流氓、病毒软件。这是一个魔高一尺道高一丈的过程。我们能做的，也就是擦亮眼睛，开动脑筋，用我们的火眼金睛去发现问题、规避问题。


## 3.4 获取正版软件

北京大学为大家提供了许多正版软件，方便大家的学习、工作。首先，我们**登录门户**，找到**正版软件**并进入：

![software](/assets/basic/04-drive-your-computer-1/software.png)

然后在网站中找到想要的软件来下载。激活过程可能需要校园网环境。

- **Adobe**：现在，请前往[Adobe Creative Cloud Download](https://creativecloud.adobe.com/zh-Hans/apps/download/creative-cloud)直接下载Creative Cloud，下载时输入学号邮箱（xxx@stu.pku.edu.cn)，会自动跳转到门户登录，登录后就会获得授权。
- **VMWare**：现在已经免费。请直接去官网下载。
- **Office**：可按照网站要求，申请学生订阅。或者直接下载软件包，用校园网环境激活。
- **MATLAB**：可直接下载离线包，用学校邮箱登录来安装。



# 4. 常用软件推荐

这一部分，我们来了解一下不同领域的常用软件，希望能对你有所帮助。我们尽量推荐免费、开源、功能强的软件，从而保持良好、干净的电脑环境。


## 4.1 压缩软件推荐

由于各类网络资源都会使用压缩文件的方式进行发布，寻找一款好用且**不流氓**的压缩软件很有必要。下面推荐一些常用的压缩软件：

- Windows：
  - `7-zip`或者其变种`7-zip-zstd`：老牌压缩软件，能满足大部分需求。官方网站：https://www.7-zip.org/download.html；`7-zip-zstd`官方网站：[GitHub - mcmilk/7-Zip-zstd: 7-Zip with support for Brotli, Fast-LZMA2, Lizard, LZ4, LZ5 and Zstandard](https://github.com/mcmilk/7-Zip-zstd)
  - 老版`Bandizip`：请不要升级。新版本有广告。[Bandizip - 下载 Bandizip 6.x (bandisoft.com)](https://www.bandisoft.com/bandizip/old/6/)
  - `WinRAR`：老牌压缩软件。优点是可以生成RAR文件，且功能较全、界面不错。**请注意**：若要使用此软件，有如下注意事项：
    - 必须从英文官网下载：[WinRAR download free and support: WinRAR (win-rar.com)](https://www.win-rar.com/start.html?&L=0)中文版无论是否购买正版都有广告，而英文版无论是否购买正版都没有广告，也不会有弹窗。30天试用期不会减少。
    - **版本号必须大于7.0.0！！！**这是因为，以前的版本有一个重要**高危漏洞**，可以无需以`.exe`后缀存放文件，执行恶意代码。
    - 可以参考如下网站进行**个人学习**：[GitHub - bitcookies/winrar-keygen: Principle of WinRAR key generation.](https://github.com/bitcookies/winrar-keygen?tab=readme-ov-file)请参考此网站的README的**6.3**节。
- MacOS：
  - `MacZip`：第三方压缩软件。官网：[MacZip - 专为 macOS 而设计的压缩软件！](https://maczip.cn/?locale=zh-CN)安装后，请自行更改默认的压缩包打开方式。使用此软件，有如下优点：
    - 安装后，设置内默认勾选压缩、提取文件忽略`.DS_STORE`文件。如果需要多平台传输压缩文件，这一特性很不错。
    - 支持的压缩包种类全，且支持加密压缩。


## 4.2 播放器推荐

- 所有平台：
  - `VLC`：一款开源播放器。官网：[官方下载：VLC media player，最棒的开源播放器 - VideoLAN](https://www.videolan.org/vlc/index.zh_CN.html)

- Windows：
  - `Potplayer`：一款老牌的播放器，功能强大。官网：https://potplayer.tv/?lang=zh_CN
  
- MacOS：
  - `IINA`：VLC的重新封装，界面美观


## 4.3 下载器推荐

- Windows：
  - `Internet Download Manager`：功能强大的一款下载器。同网络环境下，相比于浏览器自带下载功能，提速明显，且可以从网页中下载视频、图片。但是收费。

- MacOS：
  - `Free Download Manager`：官网[Free Download Manager for Mac | Download](https://www.freedownloadmanager.org/zh/download-fdm-for-mac.htm)

`Aria2`是一款不错的下载器。多个平台都有，但是使用门槛较高。官网：[GitHub - aria2/aria2: aria2 is a lightweight multi-protocol & multi-source, cross platform download utility operated in command-line. It supports HTTP/HTTPS, FTP, SFTP, BitTorrent and Metalink.](https://github.com/aria2/aria2)



## 4.4 杀毒软件推荐

主要针对Windows。

- `火绒`：轻量小巧，~~用于关闭Windows Defender~~，且有许多实用功能。但杀毒能力不强。

- `Windows Defender`：杀毒能力强，默认自带。但是容易误杀，需要花点时间摸清楚配置。愿意挨个设置白名单的话，还是很好用的。


## 4.5 杂项

- 浏览器插件：
  - `Tampermonkey`：可以在网页上执行脚本。这里推荐一个脚本：[GitHub - zhuozhiyongde/PKU-Art: 一个北大教学网的美化样式](https://github.com/zhuozhiyongde/PKU-Art)。更多脚本可以在下面的网站找到：[Greasy Fork - 安全且实用的用户脚本站](https://greasyfork.org/zh-CN)

- `Localsend`：多平台局域网文件传输软件。实用，且界面美观。iOS和Mac可以在App Store找到。Android可以在Google Play找到。各平台的安装包也可以在下面的网站找到：[GitHub - localsend/localsend: An open-source cross-platform alternative to AirDrop](https://github.com/localsend/localsend)

- `Magpie`：一款可以使画面清晰度提高的软件。例如，它可以使陈年老游戏的清晰度提升很多。工作原理为重采样，对显卡性能需求较高。官网：[GitHub - Blinue/Magpie: An all-purpose window upscaler for Windows 10/11.](https://github.com/Blinue/Magpie)
- `Geek`：Windows上的一款卸载软件，可以卸载各个软件的残留。官网：[Geek Uninstaller - the best FREE uninstaller](https://geekuninstaller.com/)
- `Snipaste`：多平台通用的截图软件。功能强大，非常推荐。免费版即可。官网：https://zh.snipaste.com/
- `Everything`：文件搜索工具，搜索速度快。官网：https://www.voidtools.com/zh-cn/support/everything/

- `FileConverter`：可以在很多文件格式间互转。官网：https://github.com/Tichau/FileConverter
- `Calibre`：电子书管理器，也可以支持电子书格式转换。官网：https://calibre-ebook.com/zh_CN
- `Croc`：也是一款文件互传软件。官网：https://github.com/schollz/croc。优点在于可以自动打洞，不局限于局域网。
- [convertio](https://convertio.co)：也用于文件转换，是一个网站。
- `wiztree`：磁盘空间分析工具。官网：https://www.diskanalyzer.com/
-  `WallpaperEngine`：可以找到Steam创意工坊上的很多壁纸。建议从Steam购买并下载。
-  `OBS`：一款免费录屏软件，适配多平台。有虚拟摄像头等功能。官网：[Open Broadcaster Software | OBS (obsproject.com)](https://obsproject.com/)
-  `Notepad++`：一款轻量文本编辑器。有非技术性的黑历史，介意者请跳过此条。官网：[Downloads | Notepad++ (notepad-plus-plus.org)](https://notepad-plus-plus.org/downloads/)，需要较好的网络环境。
-  `Typora`：一款轻量的Markdown文件编辑器。支持部分LaTeX语法和全功能Markdown语法。收费。官网：[Typora 官方中文站 (typoraio.cn)](https://typoraio.cn/)，可能需要较好的网络环境。

欢迎补充更多好用的软件！