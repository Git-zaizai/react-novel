export default ({ active = true }) => {
  return (
    <div
      className={'flex'}
      style={{
        flexDirection: 'column',
        padding: '0 10px',
        marginBottom: '30px'
      }}
    >
      <Skeleton.Input block active={active} />

      <div className='flex-jusp mt-10'>
        <Skeleton.Button active={active} />
        <Skeleton.Button active={active} />
        <Skeleton.Button active={active} />
        <Skeleton.Button active={active} />
        <Skeleton.Button active={active} />
      </div>
      <div className='flex-fdc-aic-juc mt-10'>
        <Skeleton.Input
          style={{ height: '20px' }}
          size='small'
          block
          active={active}
        />
        <Skeleton.Input size='large' block active={active} className='mt-5' />
      </div>
    </div>
  )
}
