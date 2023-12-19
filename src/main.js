import './app.scss'
import App from './App.svelte'

//Load the API URL from the .env file
export let API_URL = import.meta.env.VITE_API_URL

export function isConnected() {
  return localStorage.getItem("token") !== null
}

export function setTokentWithExpiry(token) {
  // with 2 hour margin
  const now = new Date()
  const expiry = now.getTime() + 1000 * 60 * 60 * 2
  const item = {
    value: token,
    expiry: expiry,
  }
  localStorage.setItem('token', JSON.stringify(item))
}

export function getTokenWithExpiry() {
  const itemStr = localStorage.getItem('token')
  if (!itemStr) {
    return null
  }
  const item = JSON.parse(itemStr)
  const now = new Date()
  if (now.getTime() > item.expiry) {
    localStorage.removeItem('token')
    return null
  }
  return item.value
}


const app = new App({
  target: document.getElementById('app'),
})

export default app