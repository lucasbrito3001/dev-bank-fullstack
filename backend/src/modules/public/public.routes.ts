import { Router } from 'express'
import { tryLogin } from './public.controllers'

const router = Router()

router.get('/', (req, res) => res.status(200).send('Hello world! Welcome to the DevBank API...'))
router.post('/login', tryLogin)

export default router