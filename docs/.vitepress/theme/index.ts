import DefaultTheme from 'vitepress/theme'
import type { App } from 'vue'
import CrystalViewer from './components/CrystalViewer.vue'
import PracticeCard from './components/PracticeCard.vue'
import PracticeProgress from './components/PracticeProgress.vue'
import 'katex/dist/katex.min.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }: { app: App }) {
    app.component('CrystalViewer', CrystalViewer)
    app.component('PracticeCard', PracticeCard)
    app.component('PracticeProgress', PracticeProgress)
  }
}
