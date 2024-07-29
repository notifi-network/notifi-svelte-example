<script>
  import DefaultExport from "react-youtube";
  import {
  NotifiContextProvider,
  NotifiCardModal,
  } from "@notifi-network/notifi-react";
  import "@notifi-network/notifi-react/dist/index.css";
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
<react:YouTube videoId="AdNJ3fydeao" />
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
<react:NotifiContextProvider notifiContextProvider
    tenantId="4zfoga0vjqh90ahg8apd"
    env="Production"
    walletBlockchain="ETHEREUM"
    walletPublicKey="0xc8451882B5ec5A532cDcA3E07A311274f6C897ad"
    signMessage={() => new Uint8Array([])}
    cardId="90f9ac3f674a4a79955204afc1142a39"
  >
  <react:NotifiCardModal darkMode />
</react:NotifiContextProvider>
<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
