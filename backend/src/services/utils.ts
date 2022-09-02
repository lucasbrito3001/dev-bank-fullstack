import { Request, Response } from "express"

function responser(req: Request, res: Response) {
    let status = req.method === 'POST' ? 201 : 200

    if(res.locals.error) {
        status = 400
    }

    res.status(status).send(res.locals)
}

export {
    responser
}