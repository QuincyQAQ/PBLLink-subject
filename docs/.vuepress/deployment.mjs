// Raw HTML links bypass VuePress router links, so prepend the deployment base.
export function withDeploymentBase(html, base) {
  if (base === '/') return html
  return html.replace(/\b(href)=(['"])(\/(?!\/)[^'"]*)\2/g,
    (match, attribute, quote, path) => path.startsWith(base)
      ? match
      : `${attribute}=${quote}${base}${path.slice(1)}${quote}`)
}

export default function deploymentPlugin(base) {
  return {
    name: 'manual-deployment-base',
    extendsMarkdown(md) {
      for (const name of ['html_block', 'html_inline', 'link_open']) {
        const render = md.renderer.rules[name]
        md.renderer.rules[name] = (...args) => withDeploymentBase(
          render ? render(...args) : args[4].renderToken(args[0], args[1], args[2]), base)
      }
    },
  }
}
