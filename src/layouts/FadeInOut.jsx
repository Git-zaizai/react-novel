import React, { useState, useEffect } from 'react'
import './FadeInOut.css' // 导入包含动画效果的 CSS 文件

const FadeInOut = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true) // 组件加载后设置 isVisible 为 true，触发淡入动画
  }, [])

  return (
    <div className={`fade-in-out ${isVisible ? 'visible' : ''}`}>
      {children}
    </div>
  )
}

export default FadeInOut
