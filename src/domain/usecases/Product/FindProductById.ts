import Product from 'domain/entities/Product';
import { IProductRepository } from 'domain/repositories/IProductRepository';

export class FindProductById {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(id: string): Promise<Product> {
    return await this.productRepository.findById(id);
  }
}
