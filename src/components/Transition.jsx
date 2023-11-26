import { CSSTransition, SwitchTransition } from 'react-transition-group'

export default ({
  show,
  timeout = 200,
  name,
  appear = true,
  children,
  ...props
}) => {
  const getkey = () => {
    if (typeof show === 'boolean') {
      return show ? 'show' : 'hidden'
    }
    return show
  }

  return (
    <>
      <SwitchTransition mode='out-in'>
        <CSSTransition
          key={getkey()}
          timeout={timeout}
          classNames={name ?? 'fade'}
          appear={appear}
          unmountOnExit
          {...props}
        >
          {children}
        </CSSTransition>
      </SwitchTransition>
    </>
  )
}
