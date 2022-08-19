import { IProductRepository } from '../../../domain/repositories/IProductRepository';

export class DeleteProductById {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(id: string): Promise<void> {
    await this.productRepository.deleteById(id);
  }
}
