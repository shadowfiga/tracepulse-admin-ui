import { create } from "zustand";
import { isNil } from "lodash";

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
