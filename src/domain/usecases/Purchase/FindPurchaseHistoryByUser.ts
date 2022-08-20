import PurchaseOrder from '../../entities/PurchaseOrder';
import {
  IPurchaseRepository,
  PurchaseFilter,
} from '../../repositories/IPurchaseRepository';

export class FindPurchaseHistoryByUser {
  constructor(private readonly purchaseRepository: IPurchaseRepository) {}

  async execute(
    userId: string,
    filter: PurchaseFilter
  ): Promise<PurchaseOrder[]> {
    return await this.purchaseRepository.findPurchaseHistoryByUser(
      userId,
      filter
    );
  }
}
