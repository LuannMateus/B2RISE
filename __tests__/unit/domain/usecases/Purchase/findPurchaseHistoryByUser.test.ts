import PurchaseOrder from '../../../../../src/domain/entities/PurchaseOrder';
import { PurchaseFilter } from '../../../../../src/domain/repositories/IPurchaseRepository';
import { FindPurchaseHistoryByUser } from '../../../../../src/domain/usecases/Purchase/FindPurchaseHistoryByUser';
import { PurchaseRepository } from '../../../../../src/infra/repositories/PurchaseRepository';
import { ServerError } from '../../../../../src/presentation/errors';

describe('Find Purchase History By User', () => {
  const makeSut = () => {
    const purchaseRepository = new PurchaseRepository();
    return new FindPurchaseHistoryByUser(purchaseRepository);
  };

  const sut = makeSut();

  const returnedValue = [
    {
      id: '',
      user_id: '',
      date: new Date(),
    },
  ] as PurchaseOrder[];

  const mockUserId = 'VALID USER ID';

  const validFilter = {
    category: '',
  } as PurchaseFilter;

  it('Should find purchase history by user when success', async () => {
    jest
      .spyOn(PurchaseRepository.prototype, 'findPurchaseHistoryByUser')
      .mockResolvedValue(returnedValue);

    const purchaseHistory = await sut.execute(mockUserId, validFilter);

    expect(purchaseHistory).toEqual(returnedValue);
  });

  it('Should throw a error when failed', async () => {
    jest
      .spyOn(PurchaseRepository.prototype, 'findPurchaseHistoryByUser')
      .mockImplementation(() => {
        throw new ServerError();
      });

    expect(sut.execute(mockUserId, validFilter)).rejects.toThrow(
      new ServerError()
    );
  });
});
