import express from 'express'
const router = express.Router()

import mainControllers from '../controllers/main.controllers.js'

router.get('/', mainControllers.fetchData)

export default router
