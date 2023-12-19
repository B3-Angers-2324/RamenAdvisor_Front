import './app.scss'
import App from './App.svelte'

//Load the API URL from the .env file
export let API_URL = import.meta.env.VITE_API_URL

export function isConnected() {
  return localStorage.getItem("token") !== null
}


const app = new App({
  target: document.getElementById('app'),
})

export default app