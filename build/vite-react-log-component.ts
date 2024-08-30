import type { HmrContext, ResolvedConfig } from 'vite'
import { readFile } from 'node:fs/promises'


function createlogFn() {
    return function createLogComponents() {
        const ComponentsMap = new Map()

        function randomHexColor() {
            //随机生成十六进制颜色
            var hex = Math.floor(Math.random() * 16777216).toString(16) //生成ffffff以内16进制数
            while (hex.length < 6) {
                //while循环判断hex位数，少于6位前面加0凑够6位
                hex = '0' + hex
            }
            return '#' + hex //返回‘#'开头16进制颜色
        }

        const logComponents = (...args: string[]): void => {

            let str = args.join()
            let color
            let backgroundColor
            if (ComponentsMap.has(str)) {
                let current = ComponentsMap.get(str)
                color = current.color
                backgroundColor = current.backgroundColor
            } else {
                color = randomHexColor()
                backgroundColor = randomHexColor()
                ComponentsMap.set(str, { color: color, backgroundColor: backgroundColor })
            }


            console.log(
                `%c REACT-NOVEL %c ${args.join()}`,
                `padding: 2px 1px; border-radius: 3px; color: #fff; background: ${backgroundColor}; font-weight: bold;`,
                `padding: 2px 1px; border-radius: 3px; color: #fff; background: ${backgroundColor}; font-weight: bold;margin: 0 10px;`
            )
        }

        // @ts-ignore
        if (!window.logComponents) {
            // @ts-ignore
            window.logComponents = logComponents
        }
    }
}

interface MyPluginContext {
    mode: string;
    // 可以添加其他上下文信息
}

export default (options?: {
    drop_console?: boolean
}) => {

    const { drop_console = true } = options || {}
    let MODE: string
    const regex = /(?:window\.)?\logComponents\(\s*(['"])[^'"]*\1\s*(?:\);?)/g;

    const logfn = createlogFn()
    let logCode = logfn.toString()
    logCode = `${logCode} \n \ncreateLogComponents();`

    return {
        name: 'vite-react-log-component',
        enforce: 'pre',
        configResolved(configEnv: ResolvedConfig) {
            MODE = configEnv.env.MODE
        },
        transform(fileStr: string, id: string) {
            if (MODE === 'development') {
                if (id.endsWith('main.jsx')) {
                    let code = fileStr + `\n\n ${logCode}`
                    return {
                        code,
                        map: { mappings: '' }
                    }
                }
            }
            if (MODE === 'production' && drop_console) {
                return {
                    // @ts-ignore
                    code: fileStr.replaceAll(regex, ''),
                    map: { mappings: '' }
                }
            }
        },
        async handleHotUpdate(ctx: HmrContext) {
            const { file } = ctx
            if (file.endsWith('main.jsx')) {
                let code = await readFile(file, 'utf-8')
                ctx.read = () => code + `\n\n ${logCode}`
            }
        }
    }
}