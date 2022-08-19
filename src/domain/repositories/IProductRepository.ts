import Product from 'domain/entities/Product';

export type ProductFilterProperties = {
  category: string;
  title: string;
} & ProductPaginationProperties;

type ProductPaginationProperties = {
  page: number;
  limit: number;
};
export interface IProductRepository {
  findAll(): Promise<Product[]>;

  findManyByFilter(filter: ProductFilterProperties): Promise<Product[]>;

  findById(id: string): Promise<Product>;

  save(product: Product): Promise<void>;

  updateById(id: string, product: Product): Promise<Product>;

  deleteById(id: string): Promise<void>;
}
