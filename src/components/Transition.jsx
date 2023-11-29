import { CSSTransition, SwitchTransition } from 'react-transition-group'

export default (props) => {
  const { show, nodeRef, children, onEnter, onEntered, ...Remaining } = props

  return (
    <>
      <SwitchTransition mode='out-in'>
        <CSSTransition
          key={show}
          timeout={props?.timeout ?? 300}
          classNames={props?.name ?? 'fade'}
          nodeRef={nodeRef}
          onEnter={onEnter}
          onEntered={onEntered}
          {...Remaining}
        >
          {children}
        </CSSTransition>
      </SwitchTransition>
    </>
  )
}
