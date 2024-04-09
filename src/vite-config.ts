import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import svgr from "@svgr/webpack";

export default defineConfig({
  plugins: [reactRefresh(), svgr],
});
