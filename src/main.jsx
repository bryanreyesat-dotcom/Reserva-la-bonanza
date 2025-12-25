import React from 'react'
import ReactDOM from 'react-dom/client'
// CORRECCIÓN: Asegúrate de que App.jsx esté en la misma carpeta 'src'
import App from './App.jsx'
// CORRECCIÓN: Asegúrate de que index.css esté en la misma carpeta 'src'
import './index.css' 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)