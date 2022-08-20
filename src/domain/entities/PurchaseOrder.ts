export default class PurchaseOrder {
  public id?: string | undefined;

  public user_id: string;

  public date?: Date | undefined;

  constructor(id: string, user_id: string, date: Date) {
    this.id = id;
    this.user_id = user_id;
    this.date = date;
  }
}
