import { writable } from "svelte/store";

const getMetaMaskPresent = () =>
  typeof window !== "undefined" && typeof window.ethereum !== "undefined";

const getLocalStorageState = () => {
  // if not in browser, return empty object
  if (typeof window === "undefined") {
    return {};
  }

  return JSON.parse(localStorage.getItem("walletState") || "{}");
};

export function MetaMaskStore() {
  const loaded = writable(false);
  const isMetaMaskPresent = writable(getMetaMaskPresent());
  const walletState = writable(getLocalStorageState());

  const handleAccountsChanged = (newAccounts: any) => {
    if (
      Array.isArray(newAccounts) &&
      newAccounts.length > 0 &&
      newAccounts[0] !== undefined
    ) {
      const account = newAccounts[0];
      walletState.set({ account });
    } else {
      walletState.set({});
    }
  };

  /**
   * The `init` function checks if MetaMask is present and connected, and if so, automatically connects
   * to it, otherwise it waits for the user to click connect.
   * @returns The function `init` returns nothing.
   */
  const init = async () => {
    // if metamask is not present, do nothing
    if (!getMetaMaskPresent()) {
      return;
    }

    // if we have an account in local storage, we can assume the user left the page with metamask connected last time
    // so we can connect to metamask automatically
    if (getLocalStorageState().account) {
      const accountResponse = await window.ethereum?.request({
        method: "eth_requestAccounts",
      });

      if (accountResponse && accountResponse.length && accountResponse[0]) {
        const account = accountResponse[0];
        walletState.set({ account });

        // watch for account changes from the extension
        window.ethereum?.on("accountsChanged", handleAccountsChanged);
      }
    }

    // if metamask is present, but not connected previously, we will wait for the user to click connect. For now, we will just set loaded to true
    setTimeout(() => {
      // delay to allow a flashing screen and layout shift
      loaded.set(true);
    }, 500);

    // any time the wallet state changes, we will update local storage
    walletState.subscribe((state) => {
      if (typeof window !== "undefined") {
        window.localStorage.setItem("walletState", JSON.stringify(state));
      }
    });
  };

  const connect = async () => {
    // if metamask is not present, do nothing
    if (!getMetaMaskPresent()) {
      return;
    }

    // if metamask is present, but not connected, connect
    const accountResponse = await window.ethereum?.request({
      method: "eth_requestAccounts",
    });

    if (accountResponse && accountResponse.length && accountResponse[0]) {
      const account = accountResponse[0];
      walletState.set({ account });
      // watch for account changes from the extension
      window.ethereum?.on("accountsChanged", handleAccountsChanged);
    }
  };

  const signArbitrary = async (message: string): Promise<`0x${string}`> => {
    if (!window.ethereum) throw new Error("MetaMask not present");
    const accountResponse = await window.ethereum?.request({
      method: "eth_requestAccounts",
    });
    if (accountResponse && accountResponse.length && accountResponse[0]) {
      const account = accountResponse[0];
      const signature = await window.ethereum.request({
        method: "personal_sign",
        params: [message, account],
      });
      return signature;
    }
    throw new Error("No account found");
  };

  return {
    isMetaMaskPresent,
    walletState,
    loaded,
    connect,
    init,
    signArbitrary,
  };
}

// Reference: https://github.com/GuiBibeau/metamask-sveltekit-example
