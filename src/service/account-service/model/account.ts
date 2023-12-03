import { AccountDto } from "@/service/account-service/dto/account-dto.ts";

export default class Account implements AccountDto {
  public readonly email: string;

  protected constructor(obj: AccountDto) {
    const { email } = obj;
    this.email = email;
  }

  public static create(obj: AccountDto): Account {
    return new Account(obj);
  }

  public static fromDto(dto: AccountDto): Account {
    return Account.create(dto);
  }
}
