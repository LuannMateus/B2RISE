import PurchaseOrder from '../../../domain/entities/PurchaseOrder';
import { IPurchaseRepository } from '../../repositories/IPurchaseRepository';

export class SavePurchase {
  constructor(private readonly purchaseRepository: IPurchaseRepository) {}

  async execute(purchaseOrder: PurchaseOrder): Promise<PurchaseOrder> {
    return await this.purchaseRepository.savePurchaseOrder(purchaseOrder);
  }
}
