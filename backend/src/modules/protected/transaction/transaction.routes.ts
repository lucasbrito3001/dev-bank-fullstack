import { Router } from 'express'
import { create, deleteById, readAll, readById, updateById } from './transaction.controllers'
import { checkMissingRequiredData, checkTransactionExistence } from './transaction.middlewares'

const router = Router()

router.get('/', readAll)
router.get('/:id', checkTransactionExistence, readById)
router.post('/', checkMissingRequiredData, create)
router.put('/:id', checkTransactionExistence, updateById)
router.delete('/:id', checkTransactionExistence, deleteById)

export default router