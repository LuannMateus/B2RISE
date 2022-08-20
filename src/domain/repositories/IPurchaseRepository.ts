import PurchaseOrder from '../entities/PurchaseOrder';
import PurchaseOrderItem from '../entities/PurchaseOrderItem';

export type Purchase = {
  id: string | undefined;
  user_id: string;
  product_id: string;
  quantity: number;
};

export interface IPurchaseRepository {
  findAll(): Promise<PurchaseOrderItem[]>;

  findById(id: string): Promise<PurchaseOrderItem>;

  findPurchaseHistory(userId: string): Promise<PurchaseOrder[]>;

  save(purchase: PurchaseOrderItem): Promise<void>;

  savePurchaseOrder(purchaseOrder: PurchaseOrder): Promise<PurchaseOrder>;

  updateById(id: string, purchase: Purchase): Promise<PurchaseOrderItem>;

  deleteById(id: string): Promise<void>;
}
