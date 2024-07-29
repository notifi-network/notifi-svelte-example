// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import { Buffer as BufferPolyfill } from "buffer";
declare global {
  interface Buffer extends BufferPolyfill {}
  interface Window {
    ethereum: any; // TODO: Define the type (Could use ether.js). Use any for now for now for simplicity
  }
  namespace App {}
}

export {};
