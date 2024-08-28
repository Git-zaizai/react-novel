import styles from './HeaderNavigate.module.css'
import { LeftOutlined } from '@ant-design/icons'
import { useMatches } from 'react-router-dom'

export default function HeaderNavigate({ onClick, title, className, style }) {
  const navigate = useNavigate()
  let Matches = useMatches()

  let newTitle = title ?? Matches.at(0)?.handle?.title ?? ''

  function bandNavigateClick() {
    if (typeof onClick === 'function') {
      onClick()
    } else {
      navigate(-1)
    }
  }

  return (
    <>
      <div className={className ?? `${styles.HeaderNavigate} flex-ai-c`} style={style ?? {}}>
        <LeftOutlined onClick={bandNavigateClick} className='ml-10' style={{ color: 'var(--primary-color)', fontSize: '1.3rem' }} />
        <h3 className='ml-10'>{newTitle}</h3>
      </div>
    </>
  )
}
