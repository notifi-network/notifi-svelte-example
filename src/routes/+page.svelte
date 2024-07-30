<script lang="ts">
  import DefaultExport from "react-youtube";
  import "@notifi-network/notifi-react/dist/index.css";
  import NotifiContextProvider from "../NotifiContextProvider.svelte";
  import NotifiCardModal from "../NotifiCardModal.svelte";
  import { MetaMaskStore } from "$lib";
  import { onMount } from "svelte";
  import { Buffer } from 'buffer'
  import NotifiUnreadCount from "../NotifiUnreadCount.svelte";
  import { PUBLIC_TENANT_ID ,PUBLIC_ENV,PUBLIC_CARD_ID } from '$env/static/public';

  globalThis.Buffer = Buffer
  // @ts-ignore
  let YouTube = DefaultExport.default || DefaultExport; 
  /* Client imports dist/YouTube.esm.js but the Server imports dist/YouTube.js from react-youtube. above ⬆️ fix is to make sure this wont break server code.
   * Alternatively, we can disable SSR in this case, see the detail: https://github.com/bfanger/svelte-preprocess-react/issues/40#issuecomment-2223535203
  */
  const { walletState, isMetaMaskPresent, connect, loaded, init, signArbitrary } =
    MetaMaskStore();

  onMount(() => {
    init();
  });

  // const account = $walletState.account;
  const signMessage = async (message: Uint8Array): Promise<Uint8Array> => {
    const messageString = Buffer.from(message).toString('utf8');
    const result = await signArbitrary(
      messageString,
    );
    return getBytes(result);
  };

  const getBytes = (value: `0x${string}`): Uint8Array => {
        const result = new Uint8Array((value.length - 2) / 2);
        let offset = 2;
        for (let i = 0; i < result.length; i++) {
            result[i] = parseInt(value.substring(offset, offset + 2), 16);
            offset += 2;
        }
        return result;
  };
</script>

<h1>Welcome to Notifi Card Modal example powered by SvelteKit</h1>
<p>Visit <a href="https://docs.notifi.network/docs">notifi.network</a> to read the documentation</p>

<react:YouTube videoId="uH6aRpwTEF0" />

<h2>NotifiCardModal react component integration example</h2>
{#if $loaded}
  {#if $isMetaMaskPresent}
    {#if Boolean($walletState.account)}
      <p>User wallet: {$walletState.account}</p>
      <div class="notifi-card-modal">
        <NotifiContextProvider signMessage={ signMessage}  walletPublicKey={$walletState.account} walletBlockchain={"ETHEREUM"} tenantId={PUBLIC_TENANT_ID} cardId={PUBLIC_CARD_ID} env={PUBLIC_ENV}>
          <NotifiUnreadCount />
          <NotifiCardModal darkMode={true} />
        </NotifiContextProvider>
      </div>
    {:else}
      <button on:click={connect}>Connect Metamask Wallet</button>
    {/if}
  {:else}
    <p>Please install MetaMask</p>
  {/if}
{:else}
  <p>Loading...</p>
{/if}


<style>
  .notifi-card-modal {
    font-family: 'Arial', sans-serif;
    width: 23rem;
  }
</style>
