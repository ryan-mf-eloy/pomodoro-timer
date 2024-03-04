import { Outlet } from 'react-router-dom'
/**
 * Styles
 */
import { LayoutContainer } from './styles'
/**
 * Default components
 */
import Header from '@/components/ui/Header'

export default function DefaultLayout() {
    return (
        <LayoutContainer>
            <Header />
            <Outlet />
        </LayoutContainer>
    )
}
