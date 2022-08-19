import {
  NotFoundError as PrismaNotFoundError,
  PrismaClientKnownRequestError,
  PrismaClientValidationError as PrismaBadRequestError,
} from '@prisma/client/runtime';

import Product from '../../domain/entities/Product';
import {
  IProductRepository,
  ProductFilterProperties,
} from '../../domain/repositories/IProductRepository';
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
      } else if (error instanceof PrismaBadRequestError) {
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
      } else if (error instanceof PrismaBadRequestError) {
        throw new BadRequestError();
      } else {
        throw new ServerError();
      }
    }
  }

  async findManyByFilter(filter: ProductFilterProperties): Promise<Product[]> {
    try {
      return await prisma.product.findMany({
        where: {
          category: filter.category || undefined,
          title: filter.title || undefined,
        },
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

  async save(product: Product): Promise<void> {
    try {
      await prisma.product.create({ data: product });
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

  async updateById(id: string, product: Product): Promise<Product> {
    try {
      return await prisma.product.update({
        data: product,
        where: { id },
      });
    } catch (error) {
      if (error instanceof PrismaNotFoundError) {
        throw new NotFoundError();
      } else if (error instanceof PrismaBadRequestError) {
        throw new BadRequestError();
      } else if (error instanceof PrismaClientKnownRequestError) {
        switch (error.code) {
          case 'P2025':
            throw new NotFoundError('Product does not exists!');
          default:
            throw new ServerError();
        }
      } else {
        throw new ServerError();
      }
    }
  }

  async deleteById(id: string): Promise<void> {
    try {
      await prisma.product.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof PrismaNotFoundError) {
        throw new NotFoundError();
      } else if (error instanceof PrismaBadRequestError) {
        throw new BadRequestError();
      } else if (error instanceof PrismaClientKnownRequestError) {
        switch (error.code) {
          case 'P2025':
            throw new NotFoundError('Product does not exists!');
          default:
            throw new ServerError();
        }
      } else {
        throw new ServerError();
      }
    }
  }
}
