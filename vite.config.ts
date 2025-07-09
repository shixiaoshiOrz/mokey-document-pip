import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import monkey, { cdn, util } from "vite-plugin-monkey";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    monkey({
      entry: "src/main.ts",
      userscript: {
        name: "任意元素实现画中画",
        description:
          "注册右键菜单;脚本运行后,鼠标hover到元素上时,出现切换画中画提示",
        icon: "https://vitejs.dev/logo.svg",
        namespace: "npm/vite-plugin-monkey",
        license: "MIT",
        match: ["*://*/*"],
        noframes: true,
      },
      build: {
        externalGlobals: {
          vue: cdn
            .jsdelivr("Vue", "dist/vue.global.prod.js")
            .concat(util.dataUrl(";window.Vue=Vue;")),
          "element-plus": cdn.jsdelivr("ElementPlus", "dist/index.full.min.js"),
        },
        externalResource: {
          "element-plus/dist/index.css": cdn.jsdelivr(),
        },
      },
    }),
  ],
});
