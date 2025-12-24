function submitTopic() {
  const topicInput = document.getElementById("topicInput");
  const topic = topicInput.value.trim();

  if (topic === "") {
    alert("Please enter a topic before proceeding");
    return;
  }

  document.getElementById("topicSection").style.display = "none";
  document.getElementById("appContent").style.display = "block";
  document.getElementById("topicTitle").textContent = topic;
}

function addItem(type) {
  const input = document.getElementById("itemInput");
  const text = input.value.trim();
  if (text === "") return;

  renderItem(text, type);
  input.value = "";
  updateScore();
}

function renderItem(text, type) {
  const li = document.createElement("li");
  li.textContent = text;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete-btn");

  deleteBtn.onclick = () => {
    li.remove();
    updateScore();
  };

  li.appendChild(deleteBtn);
  document.getElementById(type + "List").appendChild(li);
}

function updateScore() {
  const prosCount = document.getElementById("prosList").children.length;
  const consCount = document.getElementById("consList").children.length;

  let verdict = "Let's Decide";
  if (prosCount > consCount) verdict = "Pros Win!";
  else if (consCount > prosCount) verdict = "Cons Win!";
  else verdict = "It's a tie";

  document.getElementById("scoreboard").innerHTML =
    `Pros: ${prosCount} | Cons: ${consCount}<br>${verdict}`;
}
