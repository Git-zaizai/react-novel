import { LeftOutlined } from '@ant-design/icons'
import { useMatches } from 'react-router-dom'

export default function HeaderNavigate({ path, onClick, title, className, style }) {
  const navigate = useNavigate()
  let Matches = useMatches()
  let newTitle = title ?? Matches.at(-1).handle?.title
  function bandNavigateClick() {
    if (typeof onClick === 'function') {
      onClick()
    } else {
      navigate(path ?? -1)
    }
  }

  return (
    <>
      <header
        className={className ?? `flex-ai-c`}
        style={{
          position: 'fixed',
          inset: '0',
          width: '100%',
          height: 'var(--Header-Navigate)',
          backgroundColor: 'var(--base-color)',
          borderBottom: '1px solid var(--input-color)',
          zIndex: '1',
          ...style,
        }}
      >
        <LeftOutlined
          onClick={bandNavigateClick}
          className="ml-10"
          style={{ color: 'var(--primary-color)', fontSize: '1.3rem' }}
        />
        <h3 className="ml-10">{newTitle}</h3>
      </header>
    </>
  )
}
