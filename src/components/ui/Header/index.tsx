import { NavLink } from 'react-router-dom'

import { Scroll, Timer } from 'phosphor-react'
import { HeaderContainer } from './styles'

import igniteLogo from '@/assets/logo-ignite.svg'

export default function Header() {
    return (
        <HeaderContainer>
            <span>
                <img src={igniteLogo} alt='Ignite Logo' />
            </span>
            <nav>
                <NavLink to='/' title='Timer'>
                    <Timer size={24} />
                </NavLink>
                <NavLink to='/history' title='History'>
                    <Scroll size={24} />
                </NavLink>
            </nav>
        </HeaderContainer>
    )
}
