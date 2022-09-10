import { create } from '@modules/protected/user/user.controllers'
import { checkEmailDuplication } from '@modules/protected/user/user.middlewares'
import { Router } from 'express'
import { tryLogin } from './public.controllers'
import { checkMissingRequiredData, checkUserExistence } from './public.middleware'

const router = Router()

router.post('/users/login', checkMissingRequiredData, checkUserExistence,tryLogin)
router.post('/users', checkMissingRequiredData, checkEmailDuplication, create)

export default router