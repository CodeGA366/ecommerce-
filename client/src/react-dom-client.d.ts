declare module 'react-dom/client' {
  import { ReactNode } from 'react';
  import { Root } from 'react-dom';

  interface RootOptions {
    hydrate?: boolean;
    hydrationOptions?: {
      onHydrated?: (suspenseInstance: Comment) => void;
      onDeleted?: (suspenseInstance: Comment) => void;
    };
  }

  function createRoot(container: Element | DocumentFragment, options?: RootOptions): Root;
  function hydrateRoot(container: Element | DocumentFragment, initialChildren: ReactNode, options?: RootOptions): Root;
}