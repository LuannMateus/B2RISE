import { Prisma } from '@prisma/client';
import PurchaseOrderItem from 'domain/entities/PurchaseOrderItem';

import { IProductRepository } from '../../../domain/repositories/IProductRepository';
import {
  IPurchaseRepository,
  Purchase,
} from '../../../domain/repositories/IPurchaseRepository';

export class SavePurchase {
  constructor(
    private readonly purchaseRepository: IPurchaseRepository,
    private readonly productRepository: IProductRepository
  ) {}

  async execute(purchase: Purchase): Promise<void> {
    const { price } = await this.productRepository.findById(
      purchase.product_id
    );

    const { id: purchaseOrderId } =
      await this.purchaseRepository.savePurchaseOrder({
        user_id: purchase.user_id,
      });

    const purchaseOrderItem = {
      id: undefined,
      product_id: purchase.product_id,
      quantity: purchase.quantity,
      purchase_order_id: purchaseOrderId,
      price: (+price * purchase.quantity) as unknown as Prisma.Decimal,
    } as PurchaseOrderItem;

    return await this.purchaseRepository.save(purchaseOrderItem);
  }
}
