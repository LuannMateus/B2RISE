import PurchaseOrder from '../entities/PurchaseOrder';
import PurchaseOrderItem from '../entities/PurchaseOrderItem';

export type Purchase = {
  id: string | undefined;
  user_id: string;
  product_id: string;
  quantity: number;
};

export type PurchaseFilter = {
  category: string;
  title: string;
};

export interface IPurchaseRepository {
  findAll(): Promise<PurchaseOrderItem[]>;

  findById(id: string): Promise<PurchaseOrderItem>;

  findPurchaseHistoryByUser(
    userId: string,
    filter: PurchaseFilter
  ): Promise<PurchaseOrder[]>;

  save(purchase: PurchaseOrderItem): Promise<void>;

  savePurchaseOrder(purchaseOrder: PurchaseOrder): Promise<PurchaseOrder>;

  updateById(id: string, purchase: Purchase): Promise<PurchaseOrderItem>;

  deleteById(id: string): Promise<void>;
}
