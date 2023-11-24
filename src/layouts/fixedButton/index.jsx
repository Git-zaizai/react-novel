import './fixedButton.css'
import { state, setTheme } from '@/store/useCssVars.js'

export default function FixedButton() {
    return (
        <div className='fixed-button-view flex-fdc-aic-juc'>
            <i className='cuIcon-global fb-i global-theme'
               onClick={ () => {
                   setTheme(!state.value)
               } }></i>
        </div>
    )
}