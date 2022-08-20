import PurchaseOrderItem from '../../entities/PurchaseOrderItem';
import { IPurchaseRepository } from '../../repositories/IPurchaseRepository';

export class FindAllPurchases {
  constructor(private readonly purchaseRepository: IPurchaseRepository) {}

  async execute(): Promise<PurchaseOrderItem[]> {
    return await this.purchaseRepository.findAll();
  }
}
