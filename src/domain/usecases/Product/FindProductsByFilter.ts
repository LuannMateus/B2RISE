import Product from '../../entities/Product';
import {
  IProductRepository,
  ProductFilterProperties,
} from '../../repositories/IProductRepository';

export class FindProductsByFilter {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(filter: ProductFilterProperties): Promise<Product[]> {
    return await this.productRepository.findManyByFilter(filter);
  }
}
