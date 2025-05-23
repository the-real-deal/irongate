import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { DBManager } from './api/core/db'
import GlobalContextProvider from './context/GlobalContext'

const db = new DBManager()
await db.testConnection()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalContextProvider
      db={db}>
      <App />
    </GlobalContextProvider>
  </StrictMode>,
)
