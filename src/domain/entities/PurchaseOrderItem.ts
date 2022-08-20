import { Decimal } from '@prisma/client/runtime';

export default class PurchaseOrderItem {
  public id: string;

  public product_id: string;

  public purchase_order_id: string;

  public quantity: number;

  public price: Decimal;

  constructor(
    id: string,
    product_id: string,
    purchase_order_id: string,
    quantity: number,
    price: Decimal
  ) {
    this.id = id;
    this.product_id = product_id;
    this.purchase_order_id = purchase_order_id;
    this.quantity = quantity;
    this.price = price;
  }
}
