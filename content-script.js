const searchText = document.querySelector("input[class='gLFyf gsfi']");
const searchButton = document.querySelectorAll(".Tg7LZd")[0];

chrome.storage.sync.set({ inputText: searchText.value });

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "input") {
    searchText.value = message.text;
    searchButton.click();
  } else {
    const findString = (str) => {
      if (str !== "") {
        strFound = window.find(str);
        searchText.value = str;
        // if (!strFound) alert("String '" + str + "' not found!");
      }
    };
    findString(message.text);
  }
});
