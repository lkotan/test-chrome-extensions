const button = document.querySelector("button");
const inputText = document.querySelector("input[type='text']");

let currentTab = null;
(async () => {
  let [activeTab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });
  currentTab = activeTab;
})();

chrome.storage.sync.get("inputText", (result) => {
  if (result.inputText !== undefined) inputText.value = result.inputText;
});

button.addEventListener("click", async () => {
  let url = currentTab.url;
  let query = url.split("q=")[1].split("&")[0].replaceAll("+", " ");
  let message = {
    type: "button",
    text: query,
  };
  inputText.value = message.text;
  chrome.tabs.sendMessage(currentTab.id, message);
});

inputText.addEventListener("input", async (e) => {
  chrome.tabs.sendMessage(currentTab.id, {
    type: "input",
    text: e.target.value,
  });
});
