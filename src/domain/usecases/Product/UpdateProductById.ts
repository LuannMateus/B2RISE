import Product from '../../entities/Product';
import { IProductRepository } from '../../repositories/IProductRepository';

export class UpdateProductById {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(id: string, product: Product): Promise<Product> {
    return this.productRepository.updateById(id, product);
  }
}
