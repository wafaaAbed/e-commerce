import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve:{
    alias:{
      "@assets": path.resolve(__dirname,"./src/assets"),
      "@Components": path.resolve(__dirname,"./src/Components"),
      "@hooks": path.resolve(__dirname,"./src/hooks"),
      "@layout": path.resolve(__dirname,"./src/layout"),
      "@pages": path.resolve(__dirname,"./src/pages"),
      "@routes": path.resolve(__dirname,"./src/routes"),
      "@services": path.resolve(__dirname,"./src/services"),
      "@store": path.resolve(__dirname,"./src/store"),
      "@styles": path.resolve(__dirname,"./src/styles"),
      "@types": path.resolve(__dirname,"./src/types"),
      "@validation": path.resolve(__dirname,"./src/validation"),
      "@util": path.resolve(__dirname,"./src/util"),

    }
  },
  plugins: [react(),svgr()],
})
