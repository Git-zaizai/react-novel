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

export const waitTime = (time = 1000) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}
