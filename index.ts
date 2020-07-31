import dotenv from 'dotenv'
import App from './src'

dotenv.config()

App.listen(process.env.API_PORT, () => { console.log('Mask Indict API, online!') })
