import { Router, Request, Response } from 'express'
import Spider from './covid'
const data = require('./current.json')

const router = Router()

router.get('/', (req: Request, res: Response) => {
  res.send('hello world')
})

router.get('/getData', (req: Request, res: Response) => {
  new Spider()
  res.send(JSON.stringify(data))
})

export default router
