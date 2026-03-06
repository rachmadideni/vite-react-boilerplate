/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENABLE_DEVTOOLS: string
  // Add other VITE_ prefixed environment variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
