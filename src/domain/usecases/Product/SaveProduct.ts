import { IProductRepository } from '../../../domain/repositories/IProductRepository';
import Product from '../../entities/Product';

export class SaveProduct {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(product: Product): Promise<void> {
    await this.productRepository.save(product);
  }
}
