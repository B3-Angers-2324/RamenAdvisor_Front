import './app.scss'
import App from './App.svelte'

export let API_URL = ''

if (process.env.NODE_ENV === 'development') {
  API_URL = 'http://localhost:3000/api/v1'
}else if (process.env.NODE_ENV === 'production') {
  API_URL = ''
}


const app = new App({
  target: document.getElementById('app'),
})

export default app
