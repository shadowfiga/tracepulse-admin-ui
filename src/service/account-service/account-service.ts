import { LoginDto } from "@/service/account-service/schema/login-schema.ts";
import Account from "@/service/account-service/model/account.ts";
import fetcher from "@/utils/fetcher.ts";
import { processResponse } from "@/utils/process-response.ts";
import { AccountDto } from "@/service/account-service/schema/account-schema.ts";
import { ForgotPasswordDto } from "@/service/account-service/schema/forgot-password-schema.ts";
import { ResetPasswordDto } from "@/service/account-service/schema/reset-password-schema.ts";

class AccountService {
  public async login(dto: LoginDto): Promise<void> {
    await fetcher.post("account/login", {
      json: dto,
    });
  }

  public async forgotPassword(dto: ForgotPasswordDto): Promise<void> {
    await fetcher.post("account/forgot-password", {
      json: dto,
    });
  }

  public async resetPassword(dto: ResetPasswordDto): Promise<void> {
    await fetcher.post("account/reset-password", {
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
