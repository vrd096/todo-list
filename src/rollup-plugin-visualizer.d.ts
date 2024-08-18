declare module 'rollup-plugin-visualizer' {
  import { Plugin } from 'rollup';

  interface VisualizerOptions {
    filename?: string;
    open?: boolean;
    gzipSize?: boolean;
    brotliSize?: boolean;
    sourcemap?: string | boolean;
  }

  export function visualizer(options?: VisualizerOptions): Plugin;
}
