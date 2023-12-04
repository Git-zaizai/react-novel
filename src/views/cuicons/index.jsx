import CuIcon, { cuicons } from '@/components/cuIcon'
import styles from './css.module.css'
import { getStore } from '@/store'

export default () => {
  const store = getStore()
  const copyfun = (str) => {
    navigator.clipboard.writeText(str).then(
      function () {
        window.$message.success('复制成功')
      },
      function () {
        window.$message.error('复制失败')
      }
    )
  }

  return (
    <>
      <div className={styles.iconview}>
        {cuicons.map((v) => (
          <div
            className={styles.icondiv}
            onClick={() => copyfun(v)}
            key={v}
          >
            <CuIcon
              key={v}
              icon={v}
              size='32'
              color={
                store.theme ? `var(--text-color-3)` : `var(--success-color)`
              }
            ></CuIcon>
            <span>{v}</span>
          </div>
        ))}
      </div>
    </>
  )
}
