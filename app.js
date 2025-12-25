const inbox = document.getElementById("inbox");
const workbench = document.getElementById("workbench");
const output = document.getElementById("outputBox");

document.getElementById("btnAdd").onclick = () => {
  const type = document.getElementById("type").value;
  const content = document.getElementById("content").value.trim();
  if (!content) return;

  const card = document.createElement("div");
  card.className = "card";
  card.draggable = true;
  card.textContent = `[${type}] ${content}`;

  card.ondragstart = e => e.dataTransfer.setData("text", card.textContent);

  inbox.appendChild(card);
  document.getElementById("content").value = "";
};

workbench.ondragover = e => e.preventDefault();
workbench.ondrop = e => {
  e.preventDefault();
  const text = e.dataTransfer.getData("text");
  const el = document.createElement("div");
  el.className = "card";
  el.textContent = text;
  workbench.appendChild(el);
};

document.querySelectorAll(".tools button").forEach(btn => {
  btn.onclick = () => {
    output.textContent =
      `선택된 카드들로 "${btn.dataset.tool}" 결과 생성 (Mock)`;
  };
});
