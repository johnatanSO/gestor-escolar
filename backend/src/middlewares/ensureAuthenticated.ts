import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
import { AppError } from '../errors/AppError'
import { UsersRepository } from '../repositories/Users/UsersRepository'
dotenv.config()

export async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization
  if (!authHeader) throw new AppError('Token não informado', 401)

  const [, token] = authHeader.split(' ')
  const { sub: userId } = jwt.verify(token, process.env.SECRET)

  const usersRepository = new UsersRepository()
  const user = await usersRepository.findById(userId.toString())
  if (!user) throw new AppError('Usuário inválido')

  req.user = {
    _id: userId.toString(),
  }

  next()
}
