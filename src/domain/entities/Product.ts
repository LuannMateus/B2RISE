import { Decimal } from '@prisma/client/runtime';

export default class Product {
  public id: string | undefined;

  public title: string;

  public price: Decimal;

  public description: string;

  public category: string;

  public image: string;

  constructor(
    id: string | undefined,
    title: string,
    price: Decimal,
    description: string,
    category: string,
    image: string
  ) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.description = description;
    this.category = category;
    this.image = image;
  }
}
