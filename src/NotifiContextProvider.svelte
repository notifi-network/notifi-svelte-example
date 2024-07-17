<script lang="ts">
  import type { Uint8SignMessageFunction } from "@notifi-network/notifi-frontend-client";
  import {
  NotifiContextProvider
  } from "@notifi-network/notifi-react";
  export let walletPublicKey: string;
  export let walletBlockchain: string;
  export let tenantId: string;
  export let cardId: string;
  export let env: string;
  export let signMessage: Uint8SignMessageFunction;
</script>
<react:NotifiContextProvider
    tenantId={tenantId}
    env={env}
    walletBlockchain={walletBlockchain}
    walletPublicKey={walletPublicKey}
    signMessage={signMessage}
    cardId= {cardId}
  >
  <slot />
</react:NotifiContextProvider>
