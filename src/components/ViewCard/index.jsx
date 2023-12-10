import styles from './index.module.css'

export function CardExtra({ extrah }) {
  return <h4 className={styles.cardExtra + ' ml-10'}>{extrah ?? ''}</h4>
}

export default props => {
  const { className, style, extrah } = props
  return (
    <Card
      className={styles.viewcard + ' mb-20 ' + className}
      style={style}
      bordered={false}
      hoverable
      title={props.title}
      extra={props.extra ?? <CardExtra extrah={extrah} />}
    >
      {props.children}
    </Card>
  )
}
