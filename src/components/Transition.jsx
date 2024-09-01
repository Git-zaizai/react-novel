import { CSSTransition, SwitchTransition } from 'react-transition-group'

export default ({ show, children, timeout, name, ...Remaining }) => {
  window.logComponents('Transition')

  return (
    <>
      <SwitchTransition mode="out-in">
        <CSSTransition
          key={show}
          timeout={timeout ?? 300}
          classNames={name ?? 'fade'}
          {...Remaining}
        >
          {children}
        </CSSTransition>
      </SwitchTransition>
    </>
  )
}
