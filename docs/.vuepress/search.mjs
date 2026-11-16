export function plainText(html) {
  return html
    .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&#(x[\da-f]+|\d+);/gi, (_, value) => {
      const code = value[0].toLowerCase() === 'x' ? parseInt(value.slice(1), 16) : Number(value)
      return code <= 0x10ffff ? String.fromCodePoint(code) : ' '
    })
    .replace(/&(amp|lt|gt|quot|apos|nbsp);/g, (_, name) => ({ amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' })[name])
    .replace(/\s+/g, ' ').trim()
}

export function searchPages(pages, query) {
  const terms = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean)
  if (!terms.length) return []
  return pages.flatMap(page => {
    const title = page.title.toLocaleLowerCase()
    const body = page.text.toLocaleLowerCase()
    if (!terms.every(term => title.includes(term) || body.includes(term))) return []
    const position = body.indexOf(terms.find(term => body.includes(term)) ?? '')
    const start = Math.max(0, position - 45)
    const excerpt = `${start ? '…' : ''}${page.text.slice(start, start + 160)}${page.text.length > start + 160 ? '…' : ''}`
    const score = terms.reduce((sum, term) => sum + (title.includes(term) ? 10 : 1), 0)
    return [{ ...page, excerpt, score }]
  }).sort((a, b) => b.score - a.score || a.path.localeCompare(b.path))
}

export default function siteSearchPlugin() {
  const writeIndex = async app => {
    const pages = app.pages.filter(page => page.path !== '/404.html').map(page => ({
      title: page.title || page.path,
      path: page.path,
      text: plainText(page.contentRendered),
    }))
    await app.writeTemp('site-search/index.js', `export default ${JSON.stringify(pages)}`)
  }
  return {
    name: 'manual-site-search',
    onPrepared: writeIndex,
  }
}
