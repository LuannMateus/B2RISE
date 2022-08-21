import PurchaseOrder from '../../../../../src/domain/entities/PurchaseOrder';
import { SavePurchaseOrder } from '../../../../../src/domain/usecases/Purchase/SavePurchaseOrder';
import { PurchaseRepository } from '../../../../../src/infra/repositories/PurchaseRepository';
import { ServerError } from '../../../../../src/presentation/errors';
describe('Save Purchase Order', () => {
  const makeSut = () => {
    const purchaseRepository = new PurchaseRepository();
    return new SavePurchaseOrder(purchaseRepository);
  };

  const sut = makeSut();

  const validPurchaseOrder = {
    id: '',
    user_id: '',
    date: new Date(),
  } as PurchaseOrder;

  it('Should save a purchase when success', async () => {
    jest
      .spyOn(PurchaseRepository.prototype, 'savePurchaseOrder')
      .mockResolvedValue(validPurchaseOrder);

    expect(sut.execute(validPurchaseOrder)).resolves.not.toThrow();
  });

  it('Should throw an error when failed', async () => {
    jest
      .spyOn(PurchaseRepository.prototype, 'savePurchaseOrder')
      .mockImplementation(() => {
        throw new ServerError();
      });

    expect(sut.execute(validPurchaseOrder)).rejects.toThrow(new ServerError());
  });
});
