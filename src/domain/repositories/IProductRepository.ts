import Product from 'domain/entities/Product';

export interface IProductRepository {
  findAll(): Promise<Product[]>;

  findById(id: string): Promise<Product>;

  save(product: Product): Promise<void>;

  updateById(id: string, product: Product): Promise<Product>;

  deleteById(id: string): Promise<void>;
}
