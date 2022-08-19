import Product from '../../entities/Product';
import {
  IProductRepository,
  ProductFilterProperties,
} from '../../repositories/IProductRepository';

export class FindProductsByFilter {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(filter: ProductFilterProperties): Promise<Product[]> {
    if (!filter.page) filter.page = 1;
    if (!filter.limit) filter.limit = 10;

    return await this.productRepository.findManyByFilter(filter);
  }
}
