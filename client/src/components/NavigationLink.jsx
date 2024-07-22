import React from 'react'
import { Link } from 'react-router-dom'

const NavigationLink = ({ to, bg, text, textColor }) => {
    return (
        <Link to={to} style={{ background: bg, color: textColor }} className='nav-link'>
            {text}
        </Link>
    )
}

export default NavigationLink
