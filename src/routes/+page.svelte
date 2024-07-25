<script>
  import DefaultExport from "react-youtube";
  let YouTube = DefaultExport.default || DefaultExport  
  /* Client imports dist/YouTube.esm.js but the Server imports dist/YouTube.js from react-youtube. above ⬆️ fix is to make sure this wont break server code.
   * Alternatively, we can disable SSR in this case, see the detail: https://github.com/bfanger/svelte-preprocess-react/issues/40#issuecomment-2223535203
  */

</script>
<react:YouTube videoId="AdNJ3fydeao" />
<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
