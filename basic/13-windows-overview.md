# Windows 入门指南

::: info 本文信息
作者：[The Only Ethene](https://github.com/ZangXuanyi)

状态：尚未审阅
:::

虽然我们 LCPU 并不推荐使用 Windows 作为我们的开发工具，但是 Windows 目前依然具有以下的优势：

- 占有了目前计算机系统市场的最大份额
- 与其配套的 Microsoft Office 系列更是目前比 LaTeX 使用更广泛的办公软件
- 目前使用最广泛的游戏编程语言是微软的 `C#`，而 `C#` 跨平台做得很一般，导致开发几乎不得不用 Windows
- ~~Linux 和 Mac 不太能打游戏~~

因此我经过深思熟虑还是写了这一章。

由于 Windows 版本繁多，我们在这里讲述的是 Windows 11 23H2 及其更高版本系统。

## Windows 的大小姐脾气

### 找不到路的迷宫症候群

Windows 的注册表就像大小姐的日记本，记录着系统最私密的配置信息。但随意修改就像用马克笔在她日记上涂鸦——可能让系统直接崩溃。

与之类似的还有另一个迷宫“环境变量”：虽然 Windows 安装软件只需要鼠标点点点就可以解决问题，但是装完以后你在 `Powershell` 里面把命令行一打，哇，

```plain
The term 'conda' is not recognized as the name of a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is correct and try again.
```

虽然很离谱且抽象，但是这就是事实：装完软件以后，大多数情况下，大小姐根本不知道从闺房去拿这个工具应该怎么走。

### 强制更新的茶话会

大小姐会在你最需要专注时突然宣布：“我要更新啦！”，并擅自决定 15 分钟后重启你的工作现场。这种强制更新在温良的 `Win7` 小姐那里还可以轻松地商量着关闭，但是在刁蛮的 `Win11` 那里这是不能碰的话题。

我那么大一只 “不接受更新” 哪里去了哼啊啊啊啊！

这可太酸爽了，如果误用 Arch Linux 这类滚动更新系统当生产服务器的同学们应该深有体会罢。话不多说，还是让我们看看远方的 2024 年 7 月 19 日，全球多地同时发生的超大蓝屏事件吧。

### 你的权限呢？

Windows 大小姐永远极为关心自己的权限问题。

用户账户控制（UAC）和 Defender 防病毒构成了双重枷锁。开发者编译程序要穿越证书签名、SmartScreen 过滤、Defender 误报三重关卡，其严格程度堪比过境海关。这种安全策略本质是微软对自家闺女衣服打的补丁——Windows 拥有全球最高的 43.2% 漏洞占比（CVE 2023 数据）。当然，这一套管理机制虽然牺牲了自由度，但是确实显著增加了 Windows 系统的安全性。

这种“大小姐脾气”与开源生态形成鲜明对比：Linux 默认相信用户是系统的真正主人，所有组件都可审查、可修改、可替代。

::: warning 警告

不要执行下面代码块的命令！你的 Linux 必然会在执行以下命令后坏掉！

:::

```plain
> sudo rm -rf /
> Password: ********
然后你苦苦养的女儿就坏掉了，而且是接受你的命令后不带一丝迟疑自毁的（悲）

一个更经典但是不那么常见的例子：
> sudo pacman -Rc python
> Password: ********
（我初学Linux时电脑就是这么坏掉的）（大悲）
```

实际上当你被迫在 Windows 上开发时，本质上是在微软划定的游乐场里玩沙盒游戏——看似自由，实则每个操作都受限于 invisible wall（隐形墙）的约束。（其实 Mac 也一样，但是 Mac 比 Windows 舒服多了，这我认为应该是因为 Windows 做得太差而不是 Mac 做得太好导致的）

---

Windows 其实还有不少别的大小姐脾气，足见其不好用，尤其是开发上。那我们这些管理员的目的，当然就是把这位大小姐调教为能正常上岗的社畜；不求能像 Linux 一样完美契合工作，至少也得能用吧……

## 第一步：获取真正的 `Administrator` 权限

::: warning 警告

**对于小白，一定不要随便开 Admin。常规使用下，普通管理员基本足够。**

这和 Linux 老手也不会随便用 `root` 的原因完全一样：权限太高、自由度太高、安全度太低且几乎毫无容错。Windows 系统有很多防呆设计都藏在 UAC 中，而 Admin 会凭借自身的超高权限，力大砖飞地绕过去，然后…… 咳咳，大概率就造成 `sudo rm -rf /` 一样严重的错误了。

即使是 Linux，非 `sudo` 情况下上述命令也属于危险命令，不会让你执行。但是对于权限甚至高于系统的`root`，有没有`sudo`都一个样，那就很酸爽了。

:::

我们知道，在 Linux 和 Mac 上，最高管理员是 `root`，他是真正的最高权限者，其所有权限默认为 `sudo` 的；对于其他管理员而言，只需要一句轻描淡写的 `sudo`，就可以获得 `root` 的力量。而 Windows 虽然也有 `sudo`，但是并不好用。

~~当然我自己都忘了全新的 Windows 上有没有 `sudo` 了，反正我电脑有，要是没有那就是我自己装的~~

我们在 Windows 使用常规手段创建用户的时候，可以看到普通用户和管理员两个选项。一般情况下，你在电脑店购入一台全新的 Windows 机器，所提供的初始账户就是这个普通管理员账户。

不过，在 Windows 的庄园中，普通管理员虽说也是管家，但只不过是穿着燕尾服的实习管家罢了。他虽然名为管理员，大小姐的许多房间他依然无权进入：

- 普通管理员执行敏感操作时会触发 UAC（用户账户控制）弹窗，这种设计相当于大小姐要求管家每次触碰银餐具都必须当面请示；
- 试图修改 `C:\Windows\System32` 这类核心目录时，普通管理员会被大小姐的贴身护卫 Defender 提着后领子踹出去（错误 `0x80070005`）；
- 创建系统级自动化任务时，普通管理员只能设置早八自动播放起床铃声这种小事，这实在是微不足道了；
- 当需要修改 `HKEY_LOCAL_MACHINE` 这个象征最高权限的注册表分支时，普通管理员只能在外围的 `HKEY_CURRENT_USER` 花园散步，剩下的啥都改不了。

::: warning 警告

`HKLM` 是 Windows 注册表的核心根键之一。对于会调注册表的人而言，该注册表可以调优系统启动项或者其他性能参数。

<strong>对于小白，我建议你永远不要动这个东西。</strong>如果一个教程说要修改`HKLM`项目，如可能，请试着寻找其他替代手段。

直接修改 `HKLM` 可能导致系统崩溃或软件故障，操作前务必备份注册表并创建系统还原点——无论你能不能事先确认该修改是否正确。

:::

而真正的超级大管家 `Administrator` 却从不露面；我们要完成不少工作，都不得不请求他的首肯。对于以上问题，`Administrator` 静默提权、随意替换系统文件、随意修改系统时间同步规则，随便按需修改注册表……实在是太轻松啦！

既然如此，那么我们为什么不直接穿上他的衣服，变成超级大管家呢？那么就打开计算机管理面板：

> 开始 > 计算机管理 > 本地用户和组 > 用户

你会看到 `Administrator` 正静静地躺在那里。点开他，解除他的封印（把 “账户已禁用” 关掉）。

一个更简单的办法是命令行（必须以管理员身份运行！）

```bash
net user administrator /active:yes
```

然后切换用户到他身上即可，是不是感觉你的力量无穷无尽如同群星呢？

不过我依然要给你泼盆冷水：虽然这实际上是 Windows 中我们能够访问的最高权限账户，但是他的权限实际上依然比不上 Linux 中的 `root` 。即使强悍如 `Administrator`，也没办法真正地接近大小姐本人：即使开启 `Administrator`，修改 `TrustedInstaller` 保护的文件仍需施展 “夺取所有权” 的仪式；涉及安全启动或 BitLocker 的操作，即使大管家也要被大小姐踹飞。

::: warning 警告

最后提醒一遍：**如非需要，切勿随意使用这个账户**。

:::

~~呜呜我们 Linux 小姐还是太温柔了~~

## 第二步：让大小姐认识路

Windows 大小姐的庄园错综复杂，连她本人都只能堪堪记住系统自带房间的路。而在庄园里开辟新的房间的时候（指安装新的软件），她几乎从不知道自己应该怎么去到那个房间。如果我们对她做出命令“Windows，移动”，她大概率无动于衷，并一口气给你爆三行红色警告。而这并不是因为她生性懒惰：她只是不知道罢了。那么，当务之急就是让她知道怎么走。

我们以 GCC 为例。增加这个系统变量也有两个手段：视窗操作和命令行操作。

在视窗环境下：

> 系统 > 高级系统设置 > 环境变量 > Path (系统变量)

然后把新的 Path 手动加进去，例如 `C:\Program Files\mingw64\bin`。然后一路确定即可。

或者直接使用更简单的命令行（管理员权限！）

```bash
$env:Path += ";C:\Program Files\mingw64\bin"
```

这个分号一定要打半角分号，否则后果不堪设想！

然后给终端 `$PROFILE` 一下（或者开一个新的也行），输入 `gcc`，你发现 Win 小姐终于识别出来这玩意了！！！

可喜可贺可喜可贺，不过一想到 Linux 直接 `sudo pacman -Sy gcc` 之后就解决一切问题以后，我突然笑不出来了。

~~呜呜我们 Linux 小姐还是太温柔了~~

## 第三步：给大小姐换套工作服

对于 Linux 用户而言，Terminal 是不可不用的一个东西，而它也是 Linux 小姐最喜欢的工作服。而 Win 小姐的默认终端是 `cmd`（命令提示符），这玩意极其难用。~~而 B 站竟然还有一堆低质量营销号教人怎么用 bat 脚本，思之令人发笑~~

都 5202 年了，这 CMD 还在遵从 1981 年的祖训：批量处理依赖批处理脚本这种活字印刷术，调试循环变量堪比在迷宫找出口，操作注册表要忍受 reg add 参数里反人类的斜杠森林……还沉浸在过往之中吗？这种又难看又难穿的旧式晚礼服早该被扔掉了好吧？！

好在微软已经看不下去了，亲自下场给 Win 小姐做了一套新的衣服：Windows PowerShell（不少地方简称 PowerShell，甚至直接使用 `pwsh` 或者更简洁的 `PS` 代替了）。但是，当 Win 小姐被随着新电脑打包运送到我们手里的时候，这件衣服却不在包裹里面，搞半天原来要自己去下载。

下载反而比预想的简单许多，直接找官网，下载安装一气呵成。一个好消息是默认情况下这玩意会被直接添加到环境变量中去。

这太爽了。比方说你要给一大堆东西重命名，你在 CMD 要写一大堆的 `*.bat` 去批，或者死记硬背 `ren` 要咋用。但是你在 PS 只需要把 `ren` 打进去，然后跟着下面的交互式命令行一步步走下去，岂不美哉？

```plaintext
这是CMD的ren：

C:\Users\Administrator>ren
The syntax of the command is incorrect.

---------------

这是PS的ren：

> ren

cmdlet Rename-Item at command pipeline position 1
Supply values for the following parameters:
Path: rename.txt
NewName: powershell_is_good.txt
```

PS 不仅是一个终端，它还是一门完备的语言。因此它能做到的事情比你想象的更多，且能对系统进行非常深度的控制。

但是现在的问题就变成，PS 很差的一点在于用惯 Linux 的人根本不会玩这玩意。对于简单操作而言，其命令的繁琐程度令人汗颜。同样是创建文件，Linux 简简单单 `touch`，CMD 就得用 `echo >`, PS 更得用 `New-Item`……我有点想掀桌。

其实这倒也无可厚非，因为 PS 是基于 `.NET` 框架的，命令行 `C#` 化也不是不可理解。但是现在的问题是你几乎是被逼着用这个，因为 PS 根本没有竞品 （CMD：我到底是不是竞品啊）， Linux 上面广受欢迎的 `fish` 和 `zsh` 在 Windows 上都查无此人。

不过 git 等第三方命令倒是无所谓，这个在哪里都一样。所以这种情况我还是用 PS 吧，至少比 CMD 强。谁叫这是 Win 小姐呢。

对于喜欢给 Win 小姐化妆的管理员们，我推荐一个比较好的终端美化工具：Oh My Posh，有兴趣的可以自己去了解。而且这玩意在 Linux 上也可以用。

~~呜呜我们 Linux 小姐还是太温柔了~~

## 第四步：大小姐的自动化管理

最终我们还是厌倦了手动下载安装软件包，其配环境等过程实在是依托答辩。我们想到，Linux 有著名的 `apt`、`pacman`、`yay` 等包管理器，Mac 也有 `Homebrew`。那么能否在 Windows 下使用同样的手段安装和管理包呢？

有的，兄弟，有的。下面请让我隆重介绍微软为大小姐钦定的包管理器 `winget`。

winget 是 Windows 10/11 内置的包管理工具，专司软件安装与更新，如同为大小姐整理梳妆台：

- **一键安装**：`winget install VSCode` 直接召唤 Visual Studio Code，免去浏览器搜索之苦；
- **批量管理**：`winget upgrade --all` 可同时更新所有软件，避免“逐个点击更新按钮”的繁琐；
- **仓库生态**：对接微软官方及第三方软件源，如同从贵族集市采购正版货物。

如果拿上一章的 Oh My Posh 举例子的话：

```bash
winget install JanDeDobbeleer.OhMyPosh -s winget
```

过一会你就会发现 Win 小姐自动给你安装好了 Oh My Posh！这确实很好用，这使得它非常适用于安装一些比较底层的包，例如 `Node.js` 等。

不过这个 `winget` 有一个很巨大的问题：因为它是微软钦定的包管理器，所以自然极为依赖微软本身，导致它**只能安装**微软钦定的包！像 `yay` 一样从 GitHub 上面下载包然后给你直接 build 了那更是不可能的！

而更搞笑的事情在于，对于部分包而言，它甚至是直接把安装用的 exe 给你拉下来然后自动运行的。这种事情很抽象，不过既然是 Win 小姐，那也正常。

于是我们发现这个除了在全新 Windows 机器上批量安装开发工具链以外，实在是用处有限。

```bash
winget install Python Nodejs Git
```

这导致我个人还是不太喜欢这玩意。和它的 Linux 亲戚相比，它实在是太没趣了；虽然它确实比从网上一个个地下载东西方便的多了！

~~呜呜我们 Linux 小姐还是太温柔了~~

## 第五步

> 咕咕咕，后面有再加，欢迎去[LCPU Getting Started](https://github.com/lcpu-club/getting-started)提 Issue！
>
> 目前计划：磁盘管理（尤其是 Anaconda），注册表

## 结语

结语我竟然不知道写些什么，令人感叹。

或许 Windows 就是这么令人又爱又恨：不要看 Windows 有这么多缺陷，但是你要是作为一个新手玩 Linux 那更有你受的了，把系统搞坏几次是 Linux 新手的常态。而对于一些非常简单的工作而言，用 Linux 更是有杀鸡焉用牛刀之嫌疑，此时 Windows 则成为一种良好的替代。

当然，最好的使用方式当然是“都强都带”，因地制宜地使用对应的系统才是王道。
