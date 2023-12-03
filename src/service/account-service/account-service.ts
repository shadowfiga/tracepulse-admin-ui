import { LoginDto } from "@/service/account-service/dto/login-dto.ts";
import Account from "@/service/account-service/model/account.ts";
import fetcher from "@/utils/fetcher.ts";
import { processResponse } from "@/utils/process-response.ts";
import { AccountDto } from "@/service/account-service/dto/account-dto.ts";

class AccountService {
  public async login(dto: LoginDto): Promise<void> {
    await fetcher.post("account/login", {
      json: dto,
    });
  }

  public async my(): Promise<Account> {
    const accountDto = await processResponse<AccountDto>(() =>
      fetcher.get("account/my"),
    );
    return Account.fromDto(accountDto);
  }

  public async logout(): Promise<void> {
    await fetcher.delete("account/logout");
  }
}
const accountService = new AccountService();
export default accountService;
