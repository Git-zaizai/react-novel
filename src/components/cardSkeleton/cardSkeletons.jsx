import { useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import CardSkeleton from './cardSkeleton'
import Transition from '../Transition'
export default ({ show = true, leng = 4, children }) => {
  const nodeRef = useRef(null)
  // setTimeout(()=</>)
  const setShowButton = () => (show = !show)
  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={show}
      timeout={500}
      classNames='alert'
      onEnter={() => setShowButton(false)}
      onExited={() => setShowButton(true)}
    >
      {show ? (
        <div ref={nodeRef}>
          {Array.from({ length: leng }).map((_, i) => {
            return <CardSkeleton key={i} />
          })}
        </div>
      ) : (
        <div ref={nodeRef}>{children}</div>
      )}
    </CSSTransition>
  )
}
