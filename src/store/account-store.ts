import { create } from "zustand";
import { isNil } from "lodash";
import Account from "@/service/account-service/model/account.ts";

interface AccountStore {
  _account?: unknown;
  computed: {
    get isLoggedIn(): boolean;
    get account(): unknown;
  };
  setAccount(account?: unknown): void;
}

class UnathenticatedException extends Error {}

const useAccountStore = create<AccountStore>((setState, getState) => ({
  _account: Account.fromDto({
    email: "john.doe@example.com",
    id: "1234",
  }),
  computed: {
    get isLoggedIn() {
      const { _account } = getState();
      return !isNil(_account);
    },
    get account() {
      const { _account } = getState();
      if (!_account) {
        throw new UnathenticatedException();
      }
      return _account;
    },
  },
  setAccount(account?: unknown) {
    setState({ _account: account });
  },
}));
export default useAccountStore;
