export default class Product {
  public id: string;

  public title: string;

  public price: number;

  public description: string;

  public category: string;

  public image: string;

  constructor(
    id: string,
    title: string,
    price: number,
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
