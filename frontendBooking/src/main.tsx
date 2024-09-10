import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { QueryClient,QueryClientProvider } from '@tanstack/react-query'
import { AppContextProvider } from './context/AppContext.tsx'
import { ThemeProvider } from "@material-tailwind/react";


const queryClient = new QueryClient
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient} >
    <AppContextProvider>
    <ThemeProvider>
      <App /> 
      </ThemeProvider>
    </AppContextProvider>
    </QueryClientProvider>
  </StrictMode>,
)
