import { Router } from 'express'
import { tryLogin } from './public.controllers'
import { checkMissingRequiredData, checkUserExistence } from './public.middleware'

const router = Router()

router.post('/login', checkMissingRequiredData, checkUserExistence,tryLogin)

export default router