export default class User {
  public id: string;

  public email: string;

  public username: string;

  public password: string;

  public first_name: string;

  public last_name: string;

  constructor(
    id: string,
    email: string,
    username: string,
    password: string,
    first_name: string,
    last_name: string
  ) {
    this.id = id;
    this.email = email;
    this.username = username;
    this.password = password;
    this.first_name = first_name;
    this.last_name = last_name;
  }
}
