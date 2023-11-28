import CardSkeleton from './cardSkeleton'
import Transition from '../Transition'
export default ({ leng = 3 }) => {
  return Array.from({ length: leng }).map((_, i) => {
    return <CardSkeleton key={i} />
  })
}
