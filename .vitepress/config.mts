import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: "zh-CN",
  title: "LCPU Getting Started",
  description: "The Missing Semester refreshed by PKU Linux Club",
  lastUpdated: true,
  cleanUrls: true,
  srcExclude: [ 'README.md' ],
  rewrites: {

  },
  markdown: {
    container: {
      tipLabel: '提示',
      warningLabel: '警告',
      dangerLabel: '危险',
      infoLabel: '信息',
      detailsLabel: '详细信息'
    },
    math: true
  },
  themeConfig: {
    i18nRouting: false,
    sidebar: {
      '/': [
        {
          text: '基础部分',
          items: [
            { text: '1. 简介', link: '/basic/01-introduction' },
            { text: '2. 搜索和知识获取', link: '/basic/02-searching-and-question'},
            { text: '3. 计算机基本知识概览 I: 软硬件和操作系统', link: '/basic/03-computer-basic-knowledge-1'},
            { text: '4. 用好你的电脑 I: 环境配置，常用软件选择、安装与卸载', link: '/basic/04-drive-your-computer-1'},
            { text: '5. 用好你的电脑 II: 版本控制，Git和文件备份', link: '/basic/05-drive-your-computer-2'},
            { text: '6. 用好你的电脑 III: 小知识串讲，网络资源获取 ', link: '/basic/06-drive-your-computer-3'},
            { text: '7. 用好你的电脑 IV: 网络安全', link: '/basic/07-drive-your-computer-4'},
            { text: '8. 用好你的电脑 V: 操作系统和编程语言', link: '/basic/08-drive-your-computer-5'},
            { text: '09. Linux 基础知识：Linux 101', link: '/basic/09-linux-basic-1'},
            { text: '10. Linux 基础知识: 虚拟机安装和常用操作', link: '/basic/10-linux-basic-2'},
            { text: '11. 文本编辑: Markdown, LaTeX, Typst 和 Beamer', link: '/basic/11-text-editing'},
          ]
        }
      ],
    },
    outline: {
      label: '目录',
      level: [2, 4],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/lcpu-club' }
    ],
    footer: {
      message: '由北京大学学生 Linux 俱乐部所著',
      copyright: '© 2024 LCPU Club, licensed under CC BY-SA 4.0'
    },
    docFooter: {
      prev: '上一节',
      next: '下一节'
    },
    lastUpdated: {
      text: '更新于',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium',
        forceLocale: true
      }
    },
    editLink: {
      pattern: 'https://github.com/lcpu-club/getting-started/edit/main/:path',
      text: '在GitHub上更新本页'
    },
    darkModeSwitchLabel: "颜色选择",
    lightModeSwitchTitle: "切换至亮色模式",
    darkModeSwitchTitle: "切换至暗色模式", 
    sidebarMenuLabel: "目录",
    returnToTopLabel: "回到顶部",
    externalLinkIcon: true,
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索',
                buttonAriaLabel: '搜索'
              },
              modal: {
                displayDetails: '显示详细列表',
                resetButtonTitle: '重置搜索',
                backButtonTitle: '关闭搜索',
                noResultsText: '没有结果',
                footer: {
                  selectText: '选择',
                  selectKeyAriaLabel: '输入',
                  navigateText: '导航',
                  navigateUpKeyAriaLabel: '上箭头',
                  navigateDownKeyAriaLabel: '下箭头',
                  closeText: '关闭',
                  closeKeyAriaLabel: 'esc'
                }
              }
            }
          }
        }
      }
    },
  }
})
