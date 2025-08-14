// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './style.css'

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    // 客户端渲染 Mermaid
    if (typeof window !== 'undefined') {
      // 动态导入 mermaid
      import('mermaid').then(({ default: mermaid }) => {
        // 初始化 mermaid
        mermaid.initialize({
          startOnLoad: false,
          theme: 'default',
          themeVariables: {
            primaryColor: '#646cff',
            primaryTextColor: '#fff',
            primaryBorderColor: '#646cff',
            lineColor: '#646cff'
          }
        })

        // 渲染函数
        const renderMermaid = () => {
          // 查找所有包含mermaid代码的元素
          const allCodeBlocks = document.querySelectorAll('code')
          const mermaidElements = Array.from(allCodeBlocks).filter(code => {
            const content = code.textContent.trim()
            return content.startsWith('graph ') ||
              content.startsWith('sequenceDiagram') ||
              content.startsWith('classDiagram') ||
              content.startsWith('gantt') ||
              content.startsWith('pie ') ||
              content.startsWith('gitgraph') ||
              content.startsWith('mindmap') ||
              content.startsWith('flowchart')
          })

          mermaidElements.forEach((element, index) => {
            if (element.dataset.processed) return // 避免重复处理

            const graphDefinition = element.textContent
            const graphId = `mermaid-${Date.now()}-${index}`

            // 创建容器
            const container = document.createElement('div')
            container.className = 'mermaid-container'
            container.style.textAlign = 'center'
            container.style.margin = '1rem 0'
            container.style.padding = '1rem'
            container.style.border = '1px solid var(--vp-c-divider)'
            container.style.borderRadius = '8px'
            container.style.backgroundColor = 'var(--vp-c-bg-soft)'

            // 渲染图表
            try {
              mermaid.render(graphId, graphDefinition).then(({ svg }) => {
                container.innerHTML = svg
                element.parentElement.replaceWith(container)
              }).catch(error => {
                console.error('Mermaid rendering error:', error)
                container.innerHTML = `<p style="color: red;">Mermaid渲染错误: ${error.message}</p>`
                element.parentElement.replaceWith(container)
              })
            } catch (error) {
              console.error('Mermaid rendering error:', error)
              container.innerHTML = `<p style="color: red;">Mermaid渲染错误: ${error.message}</p>`
              element.parentElement.replaceWith(container)
            }

            element.dataset.processed = 'true'
          })
        }

        // 初始渲染
        setTimeout(renderMermaid, 100)

        // 路由变化时重新渲染
        if (router && typeof router.afterEach === 'function') {
          router.afterEach(() => {
            setTimeout(renderMermaid, 100)
          })
        } else {
          // 如果router不可用，使用其他方式监听路由变化
          const observer = new MutationObserver(() => {
            setTimeout(renderMermaid, 100)
          })
          observer.observe(document.body, { childList: true, subtree: true })
        }
      }).catch(error => {
        console.error('Failed to load mermaid:', error)
      })
    }
  }
}
