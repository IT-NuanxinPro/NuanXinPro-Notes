import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/NuanXinPro-Notes/',
  title: "NuanXinPro Notes",
  description: "Record daily front-end knowledge",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '个人成长', link: '/column/vue/index' }
    ],

    sidebar: [
      {
        text: 'Vue2',
        items: [
          { text: 'options', link: '/column/vue/options' },
          { text: 'computed', link: '/column/vue/computed' },
          { text: 'watch', link: '/column/vue/watch' }
        ]
      },
      {
        text: 'Vue3',
        items: [
          { text: 'composition-api', link: '/column/vue3/composition-api' },
          { text: 'reactive', link: '/column/vue3/reactive' }
        ]
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/IT-NuanxinPro/NuanXinPro-Notes' }
    ]
  }
})
