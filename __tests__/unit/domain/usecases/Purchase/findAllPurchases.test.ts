import { Prisma, PurchaseOrderItem } from '@prisma/client';

import { FindAllPurchases } from '../../../../../src/domain/usecases/Purchase/FindAllPurchases';
import { PurchaseRepository } from '../../../../../src/infra/repositories/PurchaseRepository';
import { ServerError } from '../../../../../src/presentation/errors';

describe('Find All Purchases', () => {
  const makeSut = () => {
    const purchaseRepository = new PurchaseRepository();
    return new FindAllPurchases(purchaseRepository);
  };

  const sut = makeSut();

  const returnedValue = [
    {
      id: '',
      product_id: '',
      purchase_order_id: '',
      price: new Prisma.Decimal(0),
      quantity: 0,
    },
  ] as PurchaseOrderItem[];

  it('Should find all purchases when success', async () => {
    jest
      .spyOn(PurchaseRepository.prototype, 'findAll')
      .mockResolvedValue(returnedValue);

    const purchases = await sut.execute();

    expect(purchases).toEqual(returnedValue);
  });

  it('Should throw a error when failed', async () => {
    jest
      .spyOn(PurchaseRepository.prototype, 'findAll')
      .mockImplementation(() => {
        throw new ServerError();
      });

    expect(sut.execute()).rejects.toThrow(new ServerError());
  });
});
