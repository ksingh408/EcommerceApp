import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider} from "react-redux"
import store from "./Components/Redux/store"
import { Auth0Provider } from '@auth0/auth0-react';

console.log("Redirect URI:", window.location.origin);

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Auth0Provider
    domain="dev-lfc7njf26v471pgk.us.auth0.com"
    clientId="i3mlvzvCWhHCGkVHuOvBNDnILynOZbtQ"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
   

  <App />
  </Auth0Provider>
</Provider>,
)
