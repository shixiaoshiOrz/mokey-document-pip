// 复制计算后的样式
export function applyComputedStyles(source: HTMLElement, target: HTMLElement) {
  const computedStyle: CSSStyleDeclaration = window.getComputedStyle(source);
  for (let prop of computedStyle) {
    (target.style as any)[prop] = computedStyle.getPropertyValue(prop);
  }
  // 递归处理子元素
  Array.from(source.children).forEach((child, index) => {
    applyComputedStyles(
      child as HTMLElement,
      target.children[index] as HTMLElement
    );
  });
}

// 引入页面的 CSS 样式表
export function importPageStyles(doc: any) {
  document.querySelectorAll("link[rel='stylesheet']").forEach((link: any) => {
    const newLink = doc.createElement("link");
    newLink.rel = "stylesheet";
    newLink.href = link.href;
    doc.head.appendChild(newLink);
  });

  document.querySelectorAll("style").forEach((style) => {
    const newStyle = doc.createElement("style");
    newStyle.textContent = style.textContent;
    doc.head.appendChild(newStyle);
  });
}
