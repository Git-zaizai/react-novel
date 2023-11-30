import { CSSTransition, SwitchTransition } from 'react-transition-group'

export default (props) => {
  const { show, children, ...Remaining } = props
  return (
    <>
      <SwitchTransition mode='out-in'>
        <CSSTransition
          key={show}
          timeout={props?.timeout ?? 300}
          classNames={props?.name ?? 'fade'}
          {...Remaining}
        >
          {children}
        </CSSTransition>
      </SwitchTransition>
    </>
  )
}
