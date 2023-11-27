import './index.css'
// import Card from '@/components/Card/Card.jsx'
import CardItem from '@/components/CardItem/index.jsx'

export default function Index() {
  return (
    <>
      {/* <Card>
        <CardItem />
      </Card> */}
      <Card title='Card title' bordered={false} style={{ width: 300 }}>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
      <h1>askjdhalsk </h1>
    </>
  )
}
