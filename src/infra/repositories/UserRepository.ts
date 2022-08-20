import {
  NotFoundError as PrismaNotFoundError,
  PrismaClientKnownRequestError,
  PrismaClientValidationError as PrismaBadRequestError,
} from '@prisma/client/runtime';

import User from '../../domain/entities/User';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { prisma } from '../../infra/database/prisma';
import {
  BadRequestError,
  NotFoundError,
  ServerError,
} from '../../presentation/errors';

export class UserRepository implements IUserRepository {
  async findAll(): Promise<User[]> {
    try {
      return await prisma.user.findMany();
    } catch (error) {
      if (error instanceof PrismaNotFoundError) {
        throw new NotFoundError();
      } else if (error instanceof PrismaBadRequestError) {
        throw new BadRequestError();
      } else {
        throw new ServerError();
      }
    }
  }

  async findById(id: string): Promise<User> {
    try {
      return await prisma.user.findUniqueOrThrow({
        where: { id },
      });
    } catch (error) {
      if (error instanceof PrismaNotFoundError) {
        throw new NotFoundError();
      } else if (error instanceof PrismaBadRequestError) {
        throw new BadRequestError();
      } else {
        throw new ServerError();
      }
    }
  }
  async save(user: User): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async updateById(id: string, user: User): Promise<User> {
    throw new Error('Method not implemented.');
  }
  async deleteById(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
