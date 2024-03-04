/**
 * Styles
 */
import { GlobalStyles } from './styles/global-styles'
import { ThemeProvider } from 'styled-components'
import { darkTheme } from './styles/themes/dark'
/**
 * Router
 */
import { BrowserRouter } from 'react-router-dom'
import { Router } from '@/Router'
import { CyclesContextProvider } from '@/context/cycles-context'

export default function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <BrowserRouter>
                <CyclesContextProvider>
                    <Router />
                </CyclesContextProvider>
            </BrowserRouter>

            <GlobalStyles />
        </ThemeProvider>
    )
}
