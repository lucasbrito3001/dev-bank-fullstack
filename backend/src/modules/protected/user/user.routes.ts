import { Router } from 'express'
import { readAll, readById, create, updateById, deleteById } from './user.controllers'
import { checkUserExistence, checkEmailDuplication, checkMissingRequiredData } from './user.middlewares'

const router = Router()

router.get('/', readAll)
router.get('/:id', checkUserExistence, readById)
router.post('/', checkMissingRequiredData, checkEmailDuplication, create)
router.put('/:id', checkUserExistence, checkEmailDuplication, updateById)
router.delete('/:id', checkUserExistence, deleteById)

export default router