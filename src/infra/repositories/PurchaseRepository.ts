import {
  NotFoundError as PrismaNotFoundError,
  PrismaClientKnownRequestError,
  PrismaClientValidationError as PrismaBadRequestError,
} from '@prisma/client/runtime';
import PurchaseOrder from 'domain/entities/PurchaseOrder';

import PurchaseOrderItem from '../../domain/entities/PurchaseOrderItem';
import {
  IPurchaseRepository,
  Purchase,
} from '../../domain/repositories/IPurchaseRepository';
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

  async save(purchase: PurchaseOrderItem): Promise<void> {
    try {
      await prisma.purchaseOrderItem.create({
        data: purchase,
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

  async savePurchaseOrder(
    purchaseOrder: PurchaseOrder
  ): Promise<PurchaseOrder> {
    try {
      return await prisma.purchaseOrder.create({
        data: purchaseOrder,
      });
    } catch (error) {
      if (error instanceof PrismaNotFoundError) {
        throw new NotFoundError();
      } else if (error instanceof PrismaBadRequestError) {
        throw new BadRequestError();
      } else if (error instanceof PrismaClientKnownRequestError) {
        switch (error.code) {
          case 'P2003':
            throw new BadRequestError('Invalid Foreign Key');
          default:
            throw new ServerError();
        }
      } else {
        throw new ServerError();
      }
    }
  }

  updateById(id: string, purchase: Purchase): Promise<PurchaseOrderItem> {
    throw new Error('Method not implemented.');
  }

  deleteById(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
