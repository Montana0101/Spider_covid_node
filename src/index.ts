// const express = require('express')
import express, { Response, Request } from 'express'
import router from './router'
import Spider from './covid'
const app = express()
app.use(router)

app.listen(7001, () => {
  new Spider()
  console.log('server is running')
})
