import { defineClientConfig } from 'vuepress/client'
import WeatherSpan from './components/weather-span.vue'
import SiteSearch from './components/SiteSearch.vue'

export default defineClientConfig({
  enhance({ app }) {
    app.component("WeatherSpan", WeatherSpan)
    app.component('SiteSearch', SiteSearch)
  },
})
