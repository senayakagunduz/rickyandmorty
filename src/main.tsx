import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import "./styles/styles.scss"
import 'bootstrap/dist/css/bootstrap.min.css';


import { Provider as StoreProvider } from 'react-redux'
import {store} from './store/store.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  
  <React.StrictMode >
    <StoreProvider store={store}>
       <App />
    </StoreProvider>
  </React.StrictMode>,
)
