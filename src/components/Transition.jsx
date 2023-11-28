import { CSSTransition, SwitchTransition } from 'react-transition-group'

export default ({ show, nodeRef, children, ...props }) => {
  return (
    <>
      <SwitchTransition mode='out-in'>
        <CSSTransition
          key={show}
          timeout={props?.timeout ?? 300}
          classNames={props?.name ?? 'fade'}
          nodeRef={nodeRef}
          {...props}
        >
          {children}
        </CSSTransition>
      </SwitchTransition>
    </>
  )
}
