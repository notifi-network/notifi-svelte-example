// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  interface Window {
    ethereum: any; // TODO: Define the type (Could use ether.js). Use any for now for now for simplicity
  }
  namespace App {}
}

export {};
