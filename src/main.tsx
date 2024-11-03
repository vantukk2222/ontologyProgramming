import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ContextProvider from './contexts/configContext.tsx'
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')!).render(
    <>
        <ContextProvider>
            <App />
        </ContextProvider>
        <ToastContainer />
    </>
)
