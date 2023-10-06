import express from 'express'
const router = express.Router()

import mainController from '../controllers/main.controllers.js'

router.get('/', mainController.fetchData)

export default router
