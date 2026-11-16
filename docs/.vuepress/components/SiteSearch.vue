<script setup>
import { computed, ref } from 'vue'
import { RouteLink } from 'vuepress/client'
import pages from '@temp/site-search/index.js'
import { searchPages } from '../search.mjs'

const query = ref('')
const results = computed(() => searchPages(pages, query.value))
const limit = ref(10)
const resetLimit = () => { limit.value = 10 }
</script>

<template>
  <section class="site-search" aria-label="全站搜索">
    <label for="manual-search">搜索全站内容</label>
    <div class="site-search-input">
      <input id="manual-search" v-model="query" type="search" placeholder="输入关键词，例如：图书馆、宿舍、VPN" autocomplete="off" @input="resetLimit" />
      <button v-if="query" type="button" @click="query = ''; resetLimit()">清除</button>
    </div>
    <p v-if="!query.trim()" class="search-hint">搜索手册中的标题和正文，点击结果前往对应页面。多个关键词用空格分隔。</p>
    <template v-else>
      <p class="search-hint" role="status" aria-live="polite">{{ results.length ? `找到 ${results.length} 个相关页面` : '未找到相关内容，请尝试其他关键词。' }}</p>
      <ul v-if="results.length" class="search-results">
        <li v-for="result in results.slice(0, limit)" :key="result.path">
          <RouteLink :to="result.path">{{ result.title }}</RouteLink>
          <p>{{ result.excerpt }}</p>
        </li>
      </ul>
      <button v-if="results.length > limit" class="search-more" type="button" @click="limit += 10">显示更多结果</button>
    </template>
  </section>
</template>

<style scoped>
.site-search { margin: 1.5rem 0; padding: 1.2rem; border: 1px solid var(--vp-c-divider, #ccc); border-radius: 10px; }
label { display: block; margin-bottom: .6rem; font-size: 1.1rem; font-weight: 600; }
.site-search-input { display: flex; gap: .5rem; }
input { box-sizing: border-box; width: 100%; min-width: 0; padding: .75rem; border: 1px solid var(--vp-c-divider, #999); border-radius: 6px; background: var(--vp-c-bg, transparent); color: inherit; font: inherit; }
input:focus-visible, button:focus-visible { outline: 2px solid var(--vp-c-accent, #005a87); outline-offset: 2px; }
button { flex-shrink: 0; padding: .5rem .75rem; border: 1px solid var(--vp-c-divider, #999); border-radius: 6px; background: transparent; color: inherit; cursor: pointer; font: inherit; }
.search-hint { margin: .65rem 0 0; font-size: .9rem; color: var(--vp-c-text-mute, inherit); }
.search-results { list-style: none; padding: 0; margin: .8rem 0 0; }
.search-results li { padding: .85rem 0; border-top: 1px solid var(--vp-c-divider, #ccc); }
.search-results a { font-weight: 600; }
.search-results p { margin: .35rem 0 0; font-size: .9rem; overflow-wrap: anywhere; }
.search-more { margin-top: .5rem; }
</style>
