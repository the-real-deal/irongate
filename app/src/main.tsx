import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Home from './pages/Home.tsx'
import { extendTheme, CssBaseline, CssVarsProvider } from '@mui/joy'

const theme = extendTheme()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <Home />
    </CssVarsProvider>
  </StrictMode>,
)
