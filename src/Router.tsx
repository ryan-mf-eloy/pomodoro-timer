import { Routes, Route } from 'react-router-dom'
/**
 * Pages
 */
import Home from '@/pages/home'
import History from '@/pages/history'
/**
 * Layouts
 */
import DefaultLayout from '@/pages/layouts/DefaultLayout'

export function Router() {
    return (
        <Routes>
            <Route path='/' element={<DefaultLayout />}>
                <Route path='/' element={<Home />} />
                <Route path='/history' element={<History />} />
            </Route>
        </Routes>
    )
}
