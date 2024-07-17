<script>
  import { useNotifiFrontendClientContext, useNotifiHistoryContext } from "@notifi-network/notifi-react";
  import { hooks } from "svelte-preprocess-react";
  export const ssr = false;
  export const notifiContextStore = hooks(() => {
  const { frontendClientStatus } = useNotifiFrontendClientContext();
  const { unreadCount} = useNotifiHistoryContext();
  return { frontendClientStatus, unreadCount };
});
</script>

<div>You have {$notifiContextStore?.unreadCount} unread message</div>