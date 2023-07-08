import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BASE_URL } from './constants'

async function main() {
  if (process.env.REACT_APP_ENV === 'msw') {
    if (window.location.pathname === BASE_URL) {
      window.location.pathname += '/'
      return
    }

    const { worker } = require('./msw/worker')

    await worker.start({
      serviceWorker: {
        url: BASE_URL + '/mockServiceWorker.js',
      },
    })
  }

  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
  )
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
}

main()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
