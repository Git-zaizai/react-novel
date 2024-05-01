// 第一个参数是需要进行防抖处理的函数，第二个参数是延迟时间，默认为1秒钟
// 这里多传一个参数，immediate用来决定是否要第一次立即执行, 默认为false
export function debounce(fn, delay = 200, immediate = false, resultCb) {
  // 实现防抖函数的核心是使用setTimeout
  // time变量用于保存setTimeout返回的Id
  let time = null
  // isImmediateInvoke变量用来记录是否立即执行, 默认为false
  let isImmediateInvoke = false

  // 将回调接收的参数保存到args数组中
  function _debounce(...args) {
    // 如果time不为0，也就是说有定时器存在，将该定时器清除
    if (time !== null) {
      clearTimeout(time)
    }

    // 当是第一次触发，并且需要触发第一次事件
    if (!isImmediateInvoke && immediate) {
      // 将函数的返回值保存到result中
      const result = fn.apply(this, args)
      if (typeof resultCb === 'function') {
        // 当用户传递了resultCb函数时，执行该函数，并将结果以参数传递出去。
        resultCb(result)
      }
      // 将isImmediateInvoke设置为true，这样不会影响到后面频繁触发的函数调用
      isImmediateInvoke = true
    }

    time = setTimeout(() => {
      // 使用apply改变fn的this，同时将参数传递给fn
      fn.apply(this, args)
      // 当定时器里的函数执行时，也就是说是频繁触发事件的最后一次事件
      // 将isImmediateInvoke设置为false，这样下一次的第一次触发事件才能被立即执行
      isImmediateInvoke = false
    }, delay)
  }

  // 防抖函数会返回另一个函数，该函数才是真正被调用的函数
  return _debounce
}

export function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

export function exportJsonFile(list) {
  const strlist = []
  list.forEach(item => {
    strlist.push(JSON.stringify(item))
    strlist.push(',')
  })
  const blob = new Blob(['[', ...strlist, ']'], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const el = document.createElement('a')
  el.download = 'export.json'
  el.href = url
  el.id = 'download'
  document.body.appendChild(el)
  el.click()
  setTimeout(() => {
    document.querySelector('#download').remove()
    URL.revokeObjectURL(url)
  }, 1000)
}

export function copyText(data, callback) {
  console.log('🚀 ~ copyText ~ data:', data)
  console.log('🚀 ~ copyText ~ navigator.clipboard:', navigator.clipboard)
  if (navigator.clipboard) {
    navigator.clipboard.writeText(data).then(
      function () {
        callback && callback('复制成功')
      },   
      function () {
        copy2(data)
      }
    )
  } else {
    copy2(data)
  }

  function copy2(text) {
    const input = document.createElement('input')
    document.body.appendChild(input)
    input.value = text
    if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
      input.setSelectionRange(0, text.length)
      input.focus()
    } else {
      input.select()
    }
    if (document.execCommand('copy')) {
      callback && callback('复制成功')
    } else {
      callback && callback('复制失败')
    }
    input.blur()
  }
}
