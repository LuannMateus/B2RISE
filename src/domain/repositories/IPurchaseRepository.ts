import PurchaseOrderItem from '../entities/PurchaseOrderItem';

export interface IPurchaseRepository {
  findAll(): Promise<PurchaseOrderItem[]>;

  findById(id: string): Promise<PurchaseOrderItem>;

  save(product: PurchaseOrderItem): Promise<void>;

  updateById(
    id: string,
    product: PurchaseOrderItem
  ): Promise<PurchaseOrderItem>;

  deleteById(id: string): Promise<void>;
}
