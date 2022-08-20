import {
  NotFoundError as PrismaNotFoundError,
  PrismaClientKnownRequestError,
  PrismaClientValidationError as PrismaBadRequestError,
} from '@prisma/client/runtime';

import PurchaseOrderItem from '../../domain/entities/PurchaseOrderItem';
import { IPurchaseRepository } from '../../domain/repositories/IPurchaseRepository';
import { prisma } from '../../infra/database/prisma';
import {
  BadRequestError,
  NotFoundError,
  ServerError,
} from '../../presentation/errors';

export class PurchaseRepository implements IPurchaseRepository {
  async findAll(): Promise<PurchaseOrderItem[]> {
    try {
      return await prisma.purchaseOrderItem.findMany();
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
  async findById(id: string): Promise<PurchaseOrderItem> {
    throw new Error('Method not implemented.');
  }
  async save(product: PurchaseOrderItem): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async updateById(
    id: string,
    product: PurchaseOrderItem
  ): Promise<PurchaseOrderItem> {
    throw new Error('Method not implemented.');
  }
  async deleteById(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
