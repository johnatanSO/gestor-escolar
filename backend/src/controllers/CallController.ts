import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { FinalizeCallService } from '../useCases/Call/FinalizeCall/FinalizeCallService.service'
import { GetCallByDateService } from '../useCases/Call/GetCallByDate/GetCallByDateService.service'

export class CallController {
  async getCallByDate(req: Request, res: Response): Promise<Response> {
    const { date } = req.params

    const getCallByDateService = container.resolve(GetCallByDateService)
    const call = await getCallByDateService.execute(date)

    return res.status(200).json({
      success: true,
      message: 'Busca de chamada feita com sucesso',
      item: call,
    })
  }

  async finalizeCall(req: Request, res: Response): Promise<Response> {
    const { students } = req.body

    const finalizeCallService = container.resolve(FinalizeCallService)
    const call = await finalizeCallService.execute(students)

    return res.status(200).json({
      success: true,
      message: 'Chamada finalizada com sucesso',
      item: call,
    })
  }
}
