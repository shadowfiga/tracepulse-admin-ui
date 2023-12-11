import { AccountDto } from "@/service/account-service/schema/account-schema.ts";

export default class Account implements AccountDto {
  public readonly id: string;
  public readonly email: string;

  protected constructor(obj: AccountDto) {
    const { email, id } = obj;
    this.id = id;
    this.email = email;
  }

  public static create(obj: AccountDto): Account {
    return new Account(obj);
  }

  public static fromDto(dto: AccountDto): Account {
    return Account.create(dto);
  }
}
