import { Router } from 'express'
import { readAll, readById, create, updateById, deleteById } from './user.controllers'

const router = Router()

router.get('/', readAll)
router.get('/:id', readById)
router.post('/', create)
router.put('/:id', updateById)
router.delete('/:id', deleteById)

export default router