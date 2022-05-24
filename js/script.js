const fromText = document.querySelector(".from-text"),
  toText = document.querySelector(".to-text"),
  exchageIcon = document.querySelector(".exchange"),
  // 是个类数组  获取 [select,select]
  selectTag = document.querySelectorAll("select"),
  icons = document.querySelectorAll(".row i");

translateBtn = document.querySelector("button"),

  selectTag.forEach((tag, id) => {
    for (let country_code in countries) {
      // 究极 3目 id == 0 ? xx : 另一个条件 ? yy : 
      let selected = id == 0 ? country_code == "en-GB" ? "selected" : "" : country_code == "hi-IN" ? "selected" : "";
      let option = `<option ${selected} value="${country_code}">${countries[country_code]}</option>`;
      /**
       * 
       * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Element/insertAdjacentHTML
       */
      tag.insertAdjacentHTML("beforeend", option);
    }
  });

exchageIcon.addEventListener("click", () => {
  let tempText = fromText.value,
    tempLang = selectTag[0].value;
  // 交换位置
  fromText.value = toText.value;
  toText.value = tempText;
  selectTag[0].value = selectTag[1].value;
  selectTag[1].value = tempLang;
});

fromText.addEventListener("keyup", () => {
  if (!fromText.value) {
    toText.value = "";
  }
});

translateBtn.addEventListener("click", () => {
  let text = fromText.value.trim(),
    translateFrom = selectTag[0].value,
    translateTo = selectTag[1].value;
  if (!text) return;
  toText.setAttribute("placeholder", "Translating...");
  let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
  fetch(apiUrl).then(res => res.json()).then(data => {
    toText.value = data.responseData.translatedText;
    data.matches.forEach(data => {
      if (data.id === 0) {
        toText.value = data.translation;
      }
    });
    toText.setAttribute("placeholder", "Translation");
  });
});

icons.forEach(icon => {
  icon.addEventListener("click", ({ target }) => {
    if (!fromText.value || !toText.value) return;
    if (target.classList.contains("fa-copy")) {
      if (target.id == "from") {
        navigator.clipboard.writeText(fromText.value);
      } else {
        navigator.clipboard.writeText(toText.value);
      }
    } else {
      let utterance;
      if (target.id == "from") {
        /**
         * 
         * @see https://developer.mozilla.org/zh-CN/docs/Web/API/SpeechSynthesis
         */
        utterance = new SpeechSynthesisUtterance(fromText.value);
        utterance.lang = selectTag[0].value;
      } else {
        utterance = new SpeechSynthesisUtterance(toText.value);
        utterance.lang = selectTag[1].value;
      }
      speechSynthesis.speak(utterance);
    }
  });
});