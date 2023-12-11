import CardSkeleton from './cardSkeleton'
import Transition from '../Transition'
export default ({ show = true, leng = 4, children }) => {
  const cardkels = Array.from({ length: leng }).map((_, i) => (
    <CardSkeleton key={i} />
  ))
  return (
    <Transition show={show}>
      <div>{show ? cardkels : children}</div>
    </Transition>
  )
}
