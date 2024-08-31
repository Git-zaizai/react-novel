import { CSSTransition, SwitchTransition } from 'react-transition-group'

export default memo(props => {
  const { show, children, ...Remaining } = props
  window.logComponents('Transition')

  return (
    <>
      <SwitchTransition mode="out-in">
        <CSSTransition
          key={show}
          timeout={props?.timeout ?? 100}
          classNames={props?.name ?? 'fade'}
          {...Remaining}
        >
          {children}
        </CSSTransition>
      </SwitchTransition>
    </>
  )
})
