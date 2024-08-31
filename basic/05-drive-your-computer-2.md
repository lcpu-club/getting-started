# Drive Your Computer II

## 版本控制概览

版本控制系统（Version Control System, VCS）用来管理和追踪一个软件的源文件版本的系统，同时也可以提供协作、备份等功能。其可以分为中心化和去中心化两种工作方式。

### 中心化版本控制

中心化的工作方式必须有一个服务器，储存所有的版本记录，客户端只负责拉取某个版本，进行修改，并推送回去。代表作有SVN。

### 去中心化的版本控制

而去中心化的工作方式中，每个人都有完整的版本记录，可以存在中心服务器用于交换各个客户端的提交，但是即使服务器下线或者不存在，两个人之间也可以通过互相交换信息来完成版本同步。代表作有Git。请注意，Git和GitHub，GitLab并不是同一个东西，前者是VCS，后者是使用Git作为VCS的代码托管平台。

## Git的使用

在介绍Git使用之前，我们先讲一点故事。当时Linux内核开发完全依赖于Linus一个人手工检查并合并全世界发来的补丁，这样工作量非常大。于是，Linus的一个朋友介绍了BitMover公司开发的商业VCS软件BitKeeper免费授权给Linux开发团队使用。此举招致了FSF的RMS等人的批评，认为在自由软件开发中使用非自由软件是“道德上有污点”的行为，但是作为实用主义者的Linus并不在意这些事情，BitKeeper作为去中心化的VCS，满足了Linus的需求。然而好景不长，有Linux内核开发者逆向了BitKeeper的协议，致使BitMover公司决定收回其授权。Git就是在这种条件下诞生的，据说第一版Git是Linus利用1周休假时间完成的。

下面我们分步介绍Git的使用方法

### 初始化仓库

我们使用init子命令来初始化一个仓库。打开你的shell，执行：
```shell
mkdir git-example
cd git-example
git init
```
你可能会看到以下内容：
```
提示： 使用 'master' 作为初始分支的名称。这个默认分支名称可能会更改。要在新仓库中
提示： 配置使用初始分支名，并消除这条警告，请执行：
提示：
提示：  git config --global init.defaultBranch <名称>
提示：
提示： 除了 'master' 之外，通常选定的名字有 'main'、'trunk' 和 'development'。
提示： 可以通过以下命令重命名刚创建的分支：
提示：
提示：  git branch -m <name>
已初始化空的 Git 仓库于 /path/to/example/git-example/.git/
```
这说明一个空的git仓库已经创建好了。我们可能需要对仓库进行一些配置

### 配置Git

配置Git只需要用到config子命令。如果需要修改全局设置，可以加上``` --global ```参数，如果需要打开配置文件进行编辑，可以加上``` --edit ```参数。现在我们修改一下全局参数，执行：
```shell
git config --global --edit
```
然后你的终端应该会打开一个文本编辑器（可能是vim，在Windows上也可能是记事本之类的），然后在``` [user] ```模块下找到``` name = xxx ```和 ```email = xxx@xxx ```，将两者修改为自己的信息。如果这两行不存在，你可以在``` [user] ```后另起一行，加上这两行信息，如果``` [user] ```也不存在，你可以在文件末尾另起一行加上。很多代码托管平台，比如GitHub，使用提交的邮箱判断提交的作者。

由于众所周知的原因，你可能需要使用代理。请在文件末尾另起一行，填写以下内容，其中链接需要填写你自己的链接：
```
[http]
    proxy = http://127.0.0.1:7890（请更改为你自己的链接）
[https]
    proxy = http://127.0.0.1:7890（同上）
```

有时候对于某些repo，你想使用其他的名称或者邮箱进行提交，这时你可以在repo目录中执行：
```shell
git config --edit
```
用和全局配置类似的方法，配置你的用户名和邮箱。

### 暂存你的更改

使用add子命令可以暂存某一个文件的更改，以便后续提交。先试着在目录中创建一个文件，内容是Hello, world!，然后暂存：
```shell
echo Hello, world! > example1.txt
git add .
```

使用``` . ```指示所有未被忽略的文件，你也可以写出具体的文件路径进行暂存。

执行：
```shell
git status
```
查看当前分支的状态，如果你前面操作全部正确，你应该看到如下内容：
```
位于分支 master

尚无提交

要提交的变更：
  （使用 "git rm --cached <文件>..." 以取消暂存）
        新文件：   example1.txt
```

### 提交你的更改

使用commit子命令来提交你的更改。执行：
```shell
git commit
```
会弹出文本编辑器，请在第一行写你的提交信息，比如``` My first commit ```，然后退出编辑器。或者你也可以执行：
```shell
git commit -m "My first commit
```
达到同样的效果。此时你应该能看到如下信息：
```
[master（根提交） 7a6ab77] My first commit
 1 file changed, 1 insertion(+)
 create mode 100644 example1.txt
```
这个时候我们再执行一遍：
```shell
git status
```
你会发现目前处于“干净的工作区”
```
位于分支 master
无文件要提交，干净的工作区
```

总结一下，git整体的工作流程就是修改-暂存-提交-下一轮修改-……这样一直进行。

如果你觉得暂存操作比较麻烦，可以加上``` -a ```参数，此参数会在提交前自动暂存修改过和删除的文件，但是新的文件不会被包括进来。

有时候上一个提交还没有完成，你可以使用``` --amend ```参数修订上一个提交。

### 查看并回退到指定历史版本

在开始讲解之前，我们再建立一个提交，方便后续讲解。执行：
```shell
echo Hello, Git! > example1.txt
git commit -am "My second commit"
```
如果你之前都是按照教程完成的，你应该可以看到：
```
[master 37f7d83] My second commit
 1 file changed, 1 insertion(+), 1 deletion(-)
```
然后我们使用log子命令，执行：
```shell
git log
```
你应该可以看到类似以下内容：
```
commit 37f7d83baa4f765071daad0a316b8ec380fcedb3 (HEAD -> master)
Author: 000lbh <73009215+000lbh@users.noreply.github.com>
Date:   Wed Aug 28 14:41:19 2024 +0800

    My second commit

commit 7a6ab774caa62ba9d0a091a2c1dc3e96af04ffa7
Author: 000lbh <73009215+000lbh@users.noreply.github.com>
Date:   Wed Aug 28 14:28:30 2024 +0800

    My first commit
```

其中
commit后面跟着的编号（实际上是散列值）、日期会不同，作者和邮箱信息应该是你刚刚设置的。

此时我们想检查第一个提交，这个时候我们可以使用多种方式来完成，我们先使用checkout子命令：
```shell
git checkout 7a6ab774caa62ba9d0a091a2c1dc3e96af04ffa7
```
此时该提交被检出，当前工作区应该回到上一个提交的状态，显示：
```
注意：正在切换到 '7a6ab774caa62ba9d0a091a2c1dc3e96af04ffa7'。

您正处于分离头指针状态。您可以查看、做试验性的修改及提交，并且您可以在切换
回一个分支时，丢弃在此状态下所做的提交而不对分支造成影响。

如果您想要通过创建分支来保留在此状态下所做的提交，您可以通过在 switch 命令
中添加参数 -c 来实现（现在或稍后）。例如：

  git switch -c <新分支名>

或者撤销此操作：

  git switch -

通过将配置变量 advice.detachedHead 设置为 false 来关闭此建议

HEAD 目前位于 7a6ab77 My first commit

```
你可以使用
```shell
cat example1.txt
```
检查文件内容。

事实上，使用散列值指定提交时，若无歧义，写前5个字符即可。

如果你想回到最新的提交，执行：
```shell
git checkout master
```
即可。

如果你想回退到当前提交，可以使用
```shell
git reset --hard 7a6ab
```
此命令将签出并将头指针指向指定提交。后续提交除非你知道提交的散列值，否则你无法找回提交。可以使用垃圾回收（gc子命令）清除未被引用的提交。

### 排除掉特定的文件

有时候一些文件不应该被版本管理系统追踪，如编译生成的目标文件，可执行文件，一些敏感配置等等。我们可以使用``` .gitignore ```文件来排除指定文件和文件夹。执行以下内容：
```shell
mkdir confidential
echo Password is not a good password > confidential/password.txt
echo This is pretend to be a object file > main.o
git status
```
应该可以看到以下内容：
```
位于分支 master
未跟踪的文件:
  （使用 "git add <文件>..." 以包含要提交的内容）
        confidential/
        main.o

提交为空，但是存在尚未跟踪的文件（使用 "git add" 建立跟踪）
```
我们再执行：
```shell
echo confidential\n\*.o > .gitignore
git status
```
应该可以看到
```
位于分支 master
未跟踪的文件:
  （使用 "git add <文件>..." 以包含要提交的内容）
        .gitignore

提交为空，但是存在尚未跟踪的文件（使用 "git add" 建立跟踪）

```
可以发现``` credential ```目录和所有的``` .o ```文件都被忽略了。

最后我们执行
```shell
git add .
git commit -m "add .gitignore"
```
将这一修改纳入VCS进行管理，完成这一节。

### 分支管理

有时候我们会想同时开发新功能，并且调优以前的代码，这样可能就需要两条线进行开发，此时分支相关的功能就会很有帮助。接下来的例子，我们将演示如何创建分支、合并分支，变基分支以及冲突解决。

首先我们执行：
```shell
git log
```
查看目前分支的记录，参考结果如下：
```
commit 714d500c7f5f15445bfa59a0d04d01e177602db5 (HEAD -> master)
Author: 000lbh <73009215+000lbh@users.noreply.github.com>
Date:   Wed Aug 28 15:18:36 2024 +0800

    add .gitignore

commit 37f7d83baa4f765071daad0a316b8ec380fcedb3
Author: 000lbh <73009215+000lbh@users.noreply.github.com>
Date:   Wed Aug 28 14:41:19 2024 +0800

    My second commit

commit 7a6ab774caa62ba9d0a091a2c1dc3e96af04ffa7
Author: 000lbh <73009215+000lbh@users.noreply.github.com>
Date:   Wed Aug 28 14:28:30 2024 +0800

    My first commit

```

#### 创建分支

我们想以第二个提交为根节点，向上延伸分支，我们可以执行：
```shell
git checkout -b update-example 37f7d
```
以上等价于执行
```shell
git branch update-example 37f7d
git checkout update-example
```
然后我们将文件``` example1.txt ```改为``` Hello, Git2! ```，执行：
```shell
git commit -am "Branch!"
```
提交更改。

#### 变基分支

接着我们将刚刚创建的提交变到主线上，如下图所示：
```
A-----B-----C (master)
       \                  A-----B-----C-----D  (update_example)
        \            ===>         (master)
         D    (update-example)
```
只需执行
```
git rebase master
git checkout master
```
分支update-example将重新以master的最新提交为根基。
请注意，rebase会使得移动的全部提交的散列值被重新计算！因为git提交的散列值与上一个提交的散列值有关。

#### 合并分支与冲突解决

我们将master的HEAD设置到刚刚rebase后的分支的顶部，然后我们新建一个分支：
```shell
git checkout -b merge-example
echo Lorem ipsum > example2.txt
echo Hello, Git6! > example1.txt
git add example2.txt
git commit -m "Prepare to merge"
```
然后我们检出master，然后执行：
```
git merge merge-example
```

如果不出意外，你应该看到：
```
自动合并 example1.txt
冲突（内容）：合并冲突于 example1.txt
自动合并失败，修正冲突然后提交修正的结果。
```

我们打开``` example1.txt ```查看内容：
```
<<<<<<< HEAD
Hello, Git2!
=======
Hello, Git6!
>>>>>>> merge-example

```

如果你使用VSCode等IDE，应该已经自动显示修正冲突的选项。我们在这里把结果修正为：
```
Hello, Git8!
```
然后我们运行：
```shell
git add .
git merge --continue
```
应该会弹出一个文本编辑器，编辑合并提交的消息，然后退出即可。

### Git服务器与多人合作

到这里你已经完成了Git大部分基础功能的学习！下面我们看看如何用Git进行多人合作：

#### 克隆仓库

克隆就是把别人的代码仓库复制一份过来。一般来说，执行：
```shell
git clone url://path/to/be/cloned
```
就可以了。在当前工作目录下会新建克隆项目名字的文件夹，一般http(s)和ssh协议是常见的clone协议。对于后者，你可能需要本地生成ssh密钥对，并将公钥上传到服务器。

#### 拉取代码

有时候远端代码库已经更新，你需要更新本地代码，这时候用pull子命令。
```shell
git pull
```

如果本地有远端不存在的提交，则拉取代码不能以默认的“fast-forward”方式进行，因此需要指定``` --no-ff ```参数进行合并拉取或者指定``` --rebase ```进行变基拉取。在特别有必要时，也可以用``` --force ```参数强制让本地代码库和远端代码库一致。

#### 推送代码

在工作完成，提交完成之后，可以用这个子命令将修改推送至远端。若有远端有本地没有的提交，需要先进行拉取，才能推送，或者``` --force ```强制推送，此时不一致的提交会被本地提交代替。

#### 图形化工具的使用

1. VSCode

    VSCode自带Git管理功能，可以使用该功能进行可视化编辑和提交

2. gitg

    Gnome桌面的git管理软件

3. kommit

    KDE桌面的git管理软件

#### 附加：对提交签名

多人合作中，验证你的提交来自于你是很重要的，因此你可以对提交签名以确保这一点（具体操作暂略）
