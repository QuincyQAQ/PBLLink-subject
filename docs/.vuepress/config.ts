import { defaultTheme } from '@vuepress/theme-default'
// import { docsearchPlugin } from '@vuepress/plugin-docsearch'
// import { googleAnalyticsPlugin } from '@vuepress/plugin-google-analytics'
import { pwaPlugin } from '@vuepress/plugin-pwa'
import { tocPlugin } from '@vuepress/plugin-toc'
import { sitemapPlugin } from "@vuepress/plugin-sitemap"
import { defineUserConfig } from '@vuepress/cli'
import { viteBundler } from '@vuepress/bundler-vite'
import ProcessExitPlugin from './components/vite-plugin-vue-process-exit'
import { runtimeCaching } from './cache.mjs'
import siteSearchPlugin from './search.mjs'

const ogprefix = 'og: http://ogp.me/ns#'
const title = '港科广手册'
const description = 'Online manual for HKUST(GZ)'
const color = '#005a87'
const author = 'hkust-gz.online'

export default defineUserConfig({
    bundler: viteBundler({
        viteOptions: {
            ssr: {
                noExternal: [],
            },
        },
    }),
    locales: {
        '/': {
            title: title,
            lang: 'zh-CN',
            description: description,
        }
    },
    head: [
        ['link', { rel: 'icon', href: `/logo-assets/touch/homescreen192.png` }],
        ['meta', { name: 'theme-color', content: color }],
        ['link', { rel: 'manifest', href: '/manifest.webmanifest' }],
        ['meta', { prefix: ogprefix, property: 'og:type', content: 'article' }],
        ['meta', {
            prefix: ogprefix,
            property: 'og:image',
            content: '/assets/og-image.png'
        }],
        ['meta', { prefix: ogprefix, property: 'og:article:author', content: author }],
        ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
        ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
        ['link', { rel: 'apple-touch-icon', href: '/logo-assets/touch/homescreen168.png' }],
        ['meta', { name: 'msapplication-TileImage', content: '/logo-assets/touch/homescreen144.png' }],
        ['meta', { name: 'msapplication-TileColor', content: color }],
        ['script', { src: '/wx_helper.js' }],
        ['script', { src: 'https://res.wx.qq.com/open/js/jweixin-1.6.0.js' }],
    ],
    plugins: [
        siteSearchPlugin(),
        // [
        //   '@vuepress/plugin-search',
        //   {
        //     locales: {
        //       '/': {
        //         placeholder: 'Search',
        //       },
        //       '/zh/': {
        //         placeholder: '搜索',
        //       },
        //     },
        //   },
        // ],
        // [
        //     '@vuepress/plugin-docsearch',
        //     {
        //         apiKey: '…',
        //         indexName: 'hkust-gz',
        //         locales: {
        //             '/': {
        //                 placeholder: '搜索手册',
        //             },
        //         },
        //     },
        // ],
        // 港科广手册暂无 Algolia DocSearch 索引，待提供凭证后启用。
        // docsearchPlugin({
        //     appId: '…',
        //     apiKey: '…',
        //     indexName: 'hkust-gz',
        //     locales: {
        //         '/': {
        //             placeholder: '搜索手册',
        //             translations: {
        //                 button: {
        //                     buttonText: '搜索手册',
        //                     buttonAriaLabel: '搜索手册',
        //                 },
        //                 modal: {
        //                     searchBox: {
        //                         resetButtonTitle: '清除查询条件',
        //                         resetButtonAriaLabel: '清除查询条件',
        //                         cancelButtonText: '取消',
        //                         cancelButtonAriaLabel: '取消',
        //                     },
        //                     startScreen: {
        //                         recentSearchesTitle: '搜索历史',
        //                         noRecentSearchesText: '没有搜索历史',
        //                         saveRecentSearchButtonTitle: '保存至搜索历史',
        //                         removeRecentSearchButtonTitle: '从搜索历史中移除',
        //                         favoriteSearchesTitle: '收藏',
        //                         removeFavoriteSearchButtonTitle: '从收藏中移除',
        //                     },
        //                     errorScreen: {
        //                         titleText: '无法获取结果',
        //                         helpText: '你可能需要检查你的网络连接',
        //                     },
        //                     footer: {
        //                         selectText: '选择',
        //                         navigateText: '切换',
        //                         closeText: '关闭',
        //                         searchByText: '搜索提供者',
        //                     },
        //                     noResultsScreen: {
        //                         noResultsText: '无法找到相关结果',
        //                         suggestedQueryText: '你可以尝试查询',
        //                         reportMissingResultsText: '你认为该查询应该有结果？',
        //                         reportMissingResultsLinkText: '点击反馈',
        //                     },
        //                 },
        //             },
        //         },
        //     },
        // }),
        // googleAnalyticsPlugin({
        //     // we have multiple deployments, which would use different id
        //     id: 'G-1BQBXDGY3R',
        // }),
        pwaPlugin({
            maxSize: 512,
            generateSWConfig: {
                runtimeCaching,
                skipWaiting: true,
                clientsClaim: true,
                cleanupOutdatedCaches: true,
            },
        }),
        sitemapPlugin({
            hostname: "https://hkust-gz.online/",
        }),
        tocPlugin(),
        ProcessExitPlugin(),
    ],
    theme: defaultTheme({
        navbar: [
            { text: '主页', link: '/' },
            { text: '邮箱汇总', link: '/contact/emails/' },
            { text: '官网', link: 'https://www.hkust-gz.edu.cn/' },
            { text: '门户', link: 'https://myportal.hkust-gz.edu.cn/' },
            { text: '关于', link: '/about/' },
            { text: '站点帮助', link: '/site-help/' },
        ],
        repo: 'QuincyQAQ/PBLLink-subject',
        repoLabel: '在GitHub上查看',
        docsRepo: 'QuincyQAQ/PBLLink-subject',
        docsDir: 'docs',
        editLinkText: '一起完善这本手册！',
        lastUpdatedText: '上次更新',
        contributorsText: '贡献者',
        contributors: false,
        editLink: true,
        docsBranch: 'main',
        themePlugins: {
            activeHeaderLinks: false,
        },
        // 本地化
        // custom containers
        tip: '提示',
        warning: '注意',
        danger: '警告',
        // 404 page
        notFound: [
            '这里什么都没有',
            '我们怎么到这来了？',
            '这是一个 404 页面',
            '看起来我们进入了错误的链接',
        ],
        backToHome: '返回首页',
        // a11y
        openInNewWindow: '在新窗口打开',
        toggleColorMode: '切换夜间模式',
        toggleSidebar: '切换侧边栏',
        sidebarDepth: 2,
        shouldPrefetch: false,
        sidebar: [
            {
                text: '📚港科广手册',
                link: '/',
                children: [
                    { text: '📮邮箱汇总', link: '/contact/emails/' },
                ],
            },
            '/facility/',
            '/contact/',
            '/service/',
            '/life/',
            '/study/',
            '/canteen/',
            {
                text: '🚄交通',
                link: '/transport/',
                children: [
                    // SidebarItem
                    {
                        text: '🚌校园交通',
                        link: '/transport/',
                        children: [],
                    },
                ],
            },
            '/surroundings/'
        ]
    }),
})
