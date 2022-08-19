import { IProductRepository } from 'domain/repositories/IProductRepository';

export class FindAllProducts {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute() {
    return await this.productRepository.findAll();
  }
}
