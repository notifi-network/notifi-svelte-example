<script>
  import {
  NotifiContextProvider
  } from "@notifi-network/notifi-react";
</script>
<react:NotifiContextProvider
    tenantId="4zfoga0vjqh90ahg8apd"
    env="Production"
    walletBlockchain="ETHEREUM"
    walletPublicKey="0xc8451882B5ec5A532cDcA3E07A311274f6C897ad"
    signMessage={() => new Uint8Array([])}
    cardId="90f9ac3f674a4a79955204afc1142a39"
  >
  <slot />
</react:NotifiContextProvider>
