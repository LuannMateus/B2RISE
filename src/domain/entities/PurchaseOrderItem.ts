import { Prisma } from '@prisma/client';

export default class PurchaseOrderItem {
  public id: string | undefined;

  public product_id: string;

  public quantity: number;

  public purchase_order_id: string;

  public price: Prisma.Decimal;

  constructor(
    id: string | undefined,
    product_id: string,
    quantity: number,
    purchase_order_id: string,
    price: Prisma.Decimal
  ) {
    this.id = id;
    this.product_id = product_id;
    this.purchase_order_id = purchase_order_id;
    this.quantity = quantity;
    this.price = price;
  }
}
