// Get references to the input and list elements
const itemInput = document.getElementById("itemInput");
const addButton = document.getElementById("addButton");
const list = document.getElementById("list");

// Get the list from localstorage, or initialize it as an empty array if it doesn't exist
let items = []
chrome.storage.local.get(["items"]).then((result) => {
  console.log("Value currently is " + result.items);
  items = result.items ? JSON.parse(result.items) : [];
  updateList();
});

// Update the list display
function updateList() {
  list.innerHTML = "";
  for (const item of items) {
    const itemElement = document.createElement("div");
    itemElement.innerHTML = item;
    itemElement.addEventListener("click", (event) => {
      const index = items.indexOf(item);
      items.splice(index, 1);
      chrome.storage.local.set({ "items": JSON.stringify(items) })
      updateList();
    });
    list.appendChild(itemElement);
  }
}

// Add an item to the list
addButton.addEventListener("click", () => {
  items.push(itemInput.value);
  // localStorage.setItem("items", JSON.stringify(items));
  chrome.storage.local.set({ "items": JSON.stringify(items) })
  itemInput.value = "";
  updateList();
});

// Update the list display when the popup is first loaded
updateList();
