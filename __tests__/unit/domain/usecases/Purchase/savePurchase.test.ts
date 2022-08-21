import { Prisma, Product } from '@prisma/client';

import PurchaseOrder from '../../../../../src/domain/entities/PurchaseOrder';
import { Purchase } from '../../../../../src/domain/repositories/IPurchaseRepository';
import { SavePurchase } from '../../../../../src/domain/usecases/Purchase/SavePurchase';
import { ProductRepository } from '../../../../../src/infra/repositories/ProductRepository';
import { PurchaseRepository } from '../../../../../src/infra/repositories/PurchaseRepository';
import { ServerError } from '../../../../../src/presentation/errors';

describe('Save Purchase', () => {
  const makeSut = () => {
    const purchaseRepository = new PurchaseRepository();
    const productRepository = new ProductRepository();

    return new SavePurchase(purchaseRepository, productRepository);
  };

  const sut = makeSut();

  const validPurchase = {
    id: '',
    product_id: '',
    quantity: 0,
    user_id: '',
  } as Purchase;

  const validPurchaseOrder = {
    id: '',
    user_id: '',
    date: new Date(),
  } as PurchaseOrder;

  const validProduct = {
    id: '',
    title: '',
    description: '',
    category: '',
    price: new Prisma.Decimal(0),
    image: '',
  } as Product;

  it('Should save a purchase when success', async () => {
    jest
      .spyOn(ProductRepository.prototype, 'findById')
      .mockResolvedValue(validProduct);

    jest
      .spyOn(PurchaseRepository.prototype, 'savePurchaseOrder')
      .mockResolvedValue(validPurchaseOrder);

    jest.spyOn(PurchaseRepository.prototype, 'save').mockImplementation(() => {
      return Promise.resolve();
    });

    expect(sut.execute(validPurchase)).resolves.not.toThrow();
  });

  it('Should throw an error when failed', async () => {
    jest.spyOn(PurchaseRepository.prototype, 'save').mockImplementation(() => {
      throw new ServerError();
    });

    expect(sut.execute(validPurchase)).rejects.toThrow(new ServerError());
  });
});
