import { defineClientConfig } from 'vuepress/client'
import WeatherSpan from './components/weather-span.vue'

export default defineClientConfig({
  enhance({ app }) {
    app.component("WeatherSpan", WeatherSpan)
  },
})
