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
  let message = {
    type: "button",
    text: inputText.value,
  };
  chrome.tabs.sendMessage(currentTab.id, message);
});

inputText.addEventListener("input", async (e) => {
  chrome.tabs.sendMessage(currentTab.id, {
    type: "input",
    text: e.target.value,
  });
});
