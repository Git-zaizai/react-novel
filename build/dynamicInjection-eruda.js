import fs from 'node:fs'
import path from 'path'

const injectionScript = `
    <!-- eustia -->
    <link rel="stylesheet" href="https://xiaoheizishiba.top/js/eustia.min.css">
    <script src="https://xiaoheizishiba.top/js/eustia.min.js"></script>
    <!-- eustia -->
`
const ph = path.join(import.meta.dirname, '../index.html')

const dynamicInjection = ENV => {
  const indexHTML = fs.readFileSync(ph).toString()
  const find = indexHTML.indexOf('<head>') + '<head>'.length
  if (ENV.NODE_ENV === 'test') {
    const html = indexHTML.slice(0, find) + injectionScript + indexHTML.slice(find)
    fs.writeFileSync(ph, html)
  } else {
    
  }
}
dynamicInjection({ NODE_ENV: 'test' })
