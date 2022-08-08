/// <reference types="vite/client" />
import 'pinia'

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv {
  readonly VITE_APP_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
