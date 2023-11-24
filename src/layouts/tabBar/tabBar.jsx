import './tabBar.css'
import { useState } from 'react'
export default function TabBar() {
    const [index, setIndex] = useState(0)

    function isIndex(index, active) {
        if (index === active) return 'tabBar-item-active'
        return ''
    }

    return (
        <>
            <div className='tabBar flex-ai-c el-transition'>
                <div className={ 'tabBar-item flex ' + isIndex(index, 0) } onClick={ () => setIndex(0) }>
                    <i className='cuIcon-global'></i>
                    <span>0.0</span>
                </div>
                <div className={ 'tabBar-item flex ' + isIndex(index, 1) } onClick={ () => setIndex(1) }>
                    <i className='cuIcon-global'></i>
                    <span>0.0</span>
                </div>
                <div className={ 'tabBar-item flex ' + isIndex(index, 2) } onClick={ () => setIndex(2) }>
                    <i className='cuIcon-global'></i>
                    <span>0.0</span>
                </div>
            </div>
        </>
    )
}