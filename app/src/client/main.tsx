import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import GlobalContextProvider from './context/GlobalContextProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalContextProvider context={{
      x: "hello, world"
    }}>
      <App />
    </GlobalContextProvider>
  </StrictMode>,
)
