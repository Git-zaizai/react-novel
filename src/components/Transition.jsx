import { CSSTransition, SwitchTransition } from 'react-transition-group'

export default props => {
  const { show, children, ...Remaining } = props
  window.logComponents('Transition')

  return (
    <>
      <SwitchTransition mode="out-in">
        <CSSTransition
          key={show}
          timeout={props?.timeout ?? 300}
          classNames={props?.name ?? 'fade'}
          {...Remaining}
        >
          {children.type === 'div' ? children : <div>{children}</div>}
        </CSSTransition>
      </SwitchTransition>
    </>
  )
}
