<script setup lang="ts">
import { ElMessage, ElNotification } from "element-plus";
import { onMounted } from "vue";
import { applyComputedStyles, importPageStyles } from "./utils";

// * 鼠标hove的元素
let highlightedElement: any = null;
// * 画中画的窗口
let pipWindow: any = null;

// & 注册事件监听器 
const registerListener = () => {
  // 移除hover元素的样式
  const removeHighlightedElementStyle = () => {
    if (highlightedElement) {
      highlightedElement.classList.remove("tm-hover-highlight");
    }
  };

  // 高亮hover元素
  const highlighElement = (event: MouseEvent) => {
    removeHighlightedElementStyle();
    // 排除Element的ElNotification组件
    if ((event.target as HTMLElement)?.closest(".tm-notification")) {
      return;
    }
    highlightedElement = event.target;
    highlightedElement.classList.add("tm-hover-highlight");
  };

  const click = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  // ! 激活画中画
  const activePip = async (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (pipWindow) {
      pipWindow.close();
      pipWindow = null;
      return;
    }
    if (!highlightedElement) {
      return ElMessage.error("⚠️ 未选择有效的元素！");
    }
    removeHighlightedElementStyle();
    const clonedElement = highlightedElement.cloneNode(true);
    applyComputedStyles(highlightedElement, clonedElement);

    // 打开一个窗口
    pipWindow = await (window as any).documentPictureInPicture.requestWindow({
      width: highlightedElement.clientWidth + 20,
      height: highlightedElement.clientHeight + 20,
    });

    const doc = pipWindow.document;
    doc.body.appendChild(clonedElement);
    importPageStyles(doc);

    pipWindow.addEventListener("pagehide", () => {
      pipWindow = null;
    });
    pipWindow.addEventListener("resize", () => {
      console.log(pipWindow.innerWidth, pipWindow.innerHeight);
    });
    document.removeEventListener("mouseout", removeHighlightedElementStyle);
    document.removeEventListener("mouseover", highlighElement);
    document.removeEventListener("click", click, true);
    document.removeEventListener("dblclick", activePip, true);
  };

  document.addEventListener("mouseover", highlighElement);
  document.addEventListener("mouseout", removeHighlightedElementStyle);
  // 避免双击触发元素点击事件
  document.addEventListener("click", click, true);
  document.addEventListener("dblclick", activePip, true);
};

onMounted(() => {
  ElNotification({
    title: "画中画脚本",
    message: "双击任意激活区域可开启画中画功能",
    type: "success",
    duration: 1500,
    showClose: true,
    customClass: "tm-notification",
  });
  registerListener();
});
</script>

<style lang="less">
.webpack-monkey-container {
  position: fixed;
  top: 80px;
  left: 60px;
  z-index: 9999;
}

.tm-hover-highlight {
  outline: 2px solid rgba(0, 123, 255, 0.7);
  background-color: rgba(0, 123, 255, 0.1) !important;
  border-radius: 4px;
  transition: all 0.2s ease;
  z-index: 9999999;
  box-shadow: 6px 6px 8px 2px#D1D9E6;
  cursor: pointer;
}

.dark-mode {
  filter: invert(0.9) hue-rotate(180deg);
  background: #111 !important;
}
</style>
