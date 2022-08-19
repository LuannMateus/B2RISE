import { NotFoundError as PrismaNotFoundError } from '@prisma/client/runtime';

import Product from '../../domain/entities/Product';
import { IProductRepository } from '../../domain/repositories/IProductRepository';
import { prisma } from '../../infra/database/prisma';
import {
  BadRequestError,
  NotFoundError,
  ServerError,
} from '../../presentation/errors';

export class ProductRepository implements IProductRepository {
  async findAll(): Promise<Product[]> {
    try {
      return await prisma.product.findMany();
    } catch (error) {
      if (error instanceof PrismaNotFoundError) {
        throw new NotFoundError();
      } else if (error instanceof BadRequestError) {
        throw new BadRequestError();
      } else {
        throw new ServerError();
      }
    }
  }

  async findById(id: string): Promise<Product> {
    try {
      return await prisma.product.findUniqueOrThrow({
        where: { id },
      });
    } catch (error) {
      if (error instanceof PrismaNotFoundError) {
        throw new NotFoundError();
      } else if (error instanceof BadRequestError) {
        throw new BadRequestError();
      } else {
        throw new ServerError();
      }
    }
  }

  save(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  updateById(): Promise<Product> {
    throw new Error('Method not implemented.');
  }
  deleteById(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
