import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { QueryClient,QueryClientProvider } from '@tanstack/react-query'
import { AppContextProvider } from './context/AppContext.tsx'
import {SearchContextProvider} from './context/SearchContext.tsx'


const queryClient = new QueryClient
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient} >
    <AppContextProvider>
      <SearchContextProvider>
        <App /> 
      </SearchContextProvider>
    </AppContextProvider>
    </QueryClientProvider>
  </StrictMode>,
)
