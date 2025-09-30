import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { HelmetProvider } from '@dr.pogodin/react-helmet'
import { store } from './store/index.js'
import { updateHTMLMetadata } from './utils/htmlMetadata.js'
import './index.css'
import App from './App.jsx'

// Update HTML metadata with portfolioData
updateHTMLMetadata();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </Provider>
  </StrictMode>,
)
