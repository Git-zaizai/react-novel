module.exports = {
  // 一行最多多少个字符
  printWidth: 120,
  // 指定每个缩进级别的空格数
  tabWidth: 2,
  // 使用制表符而不是空格缩进行
  useTabs: false,
  // 在语句末尾打印分号
  semi: false,
  // 使用单引号而不是双引号
  singleQuote: true,
  // 更改引用对象属性的时间 可选值"<as-needed|consistent|preserve>"
  quoteProps: 'as-needed',
  // 在JSX中使用单引号而不是双引号
  jsxSingleQuote: false,
  // 多行时尽可能打印尾随逗号。（例如，单行数组永远不会出现逗号结尾。） 可选值"<none|es5|all>"，默认none
  trailingComma: 'es5',
  // 在对象文字中的括号之间打印空格
  bracketSpacing: true,
  // jsx 标签的反尖括号需要换行
  jsxBracketSameLine: false,
  // 在jsx中把'>' 是否单独放一行
  bracketSameLine: false,
  // 在单独的箭头函数参数周围包括括号 always：(x) => x \ avoid：x => x
  arrowParens: 'avoid',
  // 指定要使用的解析器，不需要写文件开头的 @prettier
  requirePragma: false,
  // 不需要自动在文件开头插入 @prettier
  insertPragma: false,
  // 使用默认的折行标准 always\never\preserve
  proseWrap: 'preserve',
  // 指定HTML文件的全局空格敏感度 css\strict\ignore
  htmlWhitespaceSensitivity: 'css',
  // Vue文件脚本和样式标签缩进
  vueIndentScriptAndStyle: false,
  // 换行符使用 lf 结尾是 可选值"<auto|lf|crlf|cr>"
  endOfLine: 'lf',
  // 在 HTML、Vue 和 JSX 中每行强制执行单个属性。
  singleAttributePerLine: true,
}
