import express from 'express'

import IndexController from '../controllers/indexController.js'

const router = express.Router()
// router.get('/',IndexController.allstudents)
router.post('/',IndexController.addstudent)
router.get('/edit/:id',IndexController.editstudent)
router.post('/update/:id',IndexController.updateStudent)
// router.get('/delete/:id',IndexController.deleteStudent)

export default router
