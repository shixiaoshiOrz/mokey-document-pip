import { createApp } from "vue";
import { GM_registerMenuCommand } from "$";
import App from "./App.vue";
import "element-plus/dist/index.css"; // 注意引入ElementPlus样式

console.log("=========油猴脚本已加载=========");

GM_registerMenuCommand("📢 启用画中画功能", () => {
  if (!("documentPictureInPicture" in window)) {
    alert("⚠️ 当前浏览器不支持 PiP 功能！");
  } else {
    const container = document.createElement("div");
    container.id = "webpack-monkey-app";
    document.body.appendChild(container);
    // 挂载Vue应用
    const app = createApp(App);
    app.mount(container);
  }
});
