<script>
  import DefaultExport from "react-youtube";
  import "@notifi-network/notifi-react/dist/index.css";
  import NotifiContextProvider from "../NotifiContextProvider.svelte";
  import NotifiCardModal from "../NotifiCardModal.svelte";
  import { MetaMaskStore } from "$lib";
  import { onMount } from "svelte";
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
</script>

<h1>Welcome to Notifi Card Modal example powered by SvelteKit</h1>
<p>Visit <a href="https://docs.notifi.network/docs">notifi.network</a> to read the documentation</p>

<react:YouTube videoId="uH6aRpwTEF0" />

{#if $loaded}
  {#if $isMetaMaskPresent}
    {#if Boolean($walletState.account)}
      <p>{$walletState.account}</p>
      <button on:click={ ()=>signArbitrary("Sign a test message")} >sign message</button>
    {:else}
      <button on:click={connect}>Connect Metamask Wallet</button>
    {/if}
  {:else}
    <p>Please install MetaMask</p>
  {/if}
{:else}
  <p>Loading...</p>
{/if}

<h2>NotifiCardModal react component integration example</h2>

<div class="notifi-card-modal">
  <NotifiContextProvider>
    <NotifiCardModal darkMode={true} />
  </NotifiContextProvider>
</div>

<style>
  .notifi-card-modal {
    font-family: 'Arial', sans-serif;
    width: 23rem;
  }
</style>
