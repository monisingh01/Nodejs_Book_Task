import express from 'express';
import { createUser, getUserById , getAllUsers} from '../controller/userController.js'


const router = express.Router()

router.post('/users', createUser)

router.get('/users/:id',getUserById)

router.get('/getAllusers',getAllUsers)



export default router