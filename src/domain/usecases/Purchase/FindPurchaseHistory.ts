import PurchaseOrder from '../../../domain/entities/PurchaseOrder';
import { IPurchaseRepository } from '../../repositories/IPurchaseRepository';

export class FindPurchaseHistory {
  constructor(private readonly purchaseRepository: IPurchaseRepository) {}

  async execute(userId: string): Promise<PurchaseOrder[]> {
    return await this.purchaseRepository.findPurchaseHistory(userId);
  }
}
