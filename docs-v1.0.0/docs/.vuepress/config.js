module.exports = {
    head: [ // 注入到当前页面的 HTML <head> 中的标签
        // ['link', { rel: 'manifest', href: '/manifest.json' }],
        ['link', { rel: 'icon', href: '/images/favicon.ico' }], // 增加一个自定义的 favicon(网页标签的图标)
        ['link', { rel: 'apple-touch-icon', href: '/images/logo.png' }],
    ],
    serviceWorker: true, // 是否开启 PWA
    base: '/', // 这是部署到github相关的配置
    markdown: {
        lineNumbers: true // 代码块显示行号
    },
    locales: {
        // 键名是该语言所属的子路径
        // 作为特例，默认语言可以使用 '/' 作为其路径。
        '/': {
            lang: 'zh-CN',
            title: 'BiuServerAdmin',
            description: '基于Node Koa2的RESTful API 应用级Node服务器'
        },
        '/en/': {
            lang: 'en-US', // 将会被设置为 <html> 的 lang 属性
            title: 'VuePress',
            description: 'Vue-powered Static Site Generator'
        }
    },
    themeConfig: {
        locales: {
            '/': {
                smoothScroll: true, //启用页面滚动效果
                sidebarDepth: 2, //提取的侧边栏深度 6
                // 多语言下拉菜单的标题
                selectText: '选择语言',
                // 该语言在下拉菜单中的标签
                label: '简体中文',
                // 编辑链接文字
                editLinkText: '在 GitHub 上编辑此页',
                // Service Worker 的配置
                serviceWorker: {
                    updatePopup: {
                        message: "发现新内容可用.",
                        buttonText: "刷新"
                    }
                },
                // 当前 locale 的 algolia docsearch 选项
                algolia: {},
                nav: [
                    { text: '指南', link: '/zh/guide/' },
                    { text: '了解更多', link: 'https://google.com' },
                ],
                sidebar: [
                    ['/zh/guide/','简介'],
                    ['/zh/guide/install','安装'],
                    ['/zh/guide/directory-structure', '目录结构'],
                    ['/zh/guide/test', 'Test'],
                ]
            },
            '/en/': {
                selectText: 'Languages',
                label: 'English',
                ariaLabel: 'Languages',
                editLinkText: 'Edit this page on GitHub',
                serviceWorker: {
                    updatePopup: {
                        message: "New content is available.",
                        buttonText: "Refresh"
                    }
                },
                algolia: {}
            }
        }
    },
    plugins: ['autobar']
}
