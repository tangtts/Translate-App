# 一个可以进行文字转换的 应用

示例(![微信截图_20220524213844.png](https://s2.loli.net/2022/05/24/8nMi5Wwo3YRZ7js.png)

> 如图所示 有以下几个功能<br>

1. 可以选择对应的语言，输入文字，点击 `Translate Text` 进行转换
2. 点击 左侧或者右侧 的 `复制图标` 进行 复制对应侧输入的文字;使用的是`navigator.clipboard.writeText `
3. 点击 左侧或者右侧 的 `朗读图标` 进行 朗读输入的文字;使用的是`new SpeechSynthesisUtterance ` Api

---

_note:使用的是 `https://api.mymemory.translated.net/get?`接口进行转化;[insertAdjacentHTML](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/insertAdjacentHTML)_
