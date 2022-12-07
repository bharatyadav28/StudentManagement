import express from 'express'

import AuthController from '../controllers/authController.js'

const router = express.Router()
router.get('/signup',AuthController.signup)
router.post('/signup',AuthController.adduser)


router.get('/',AuthController.login)
router.post('/',AuthController.loginauth)


export default router
