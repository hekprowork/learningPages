import DefaultTheme from 'vitepress/theme'
import type { App } from 'vue'
import CrystalViewer from './components/CrystalViewer.vue'
import 'katex/dist/katex.min.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }: { app: App }) {
    app.component('CrystalViewer', CrystalViewer)
  }
}
