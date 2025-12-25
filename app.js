const filesEl = document.querySelector(".files");
const addBtn = document.getElementById("addFile");
const actions = document.querySelectorAll(".action");

let files = [];
let selected = new Set();

/* 파일 추가 */
addBtn.onclick = () => {
  const name = prompt("파일 이름 입력");
  if (!name) return;

  files.push({
    id: Date.now(),
    name
  });
  render();
};

/* 렌더 */
function render() {
  filesEl.innerHTML = "";

  files.forEach(file => {
    const el = document.createElement("div");
    el.className = "file";
    el.draggable = true;

    if (selected.has(file.id)) el.classList.add("selected");

    el.innerHTML = `
      <div class="icon">📁</div>
      <div class="name">${file.name}</div>
    `;

    el.onclick = () => {
      selected.has(file.id)
        ? selected.delete(file.id)
        : selected.add(file.id);
      render();
    };

    el.ondragstart = e => {
      if (!selected.has(file.id)) {
        selected.clear();
        selected.add(file.id);
        render();
      }
      e.dataTransfer.setData("text/plain", "files");
    };

    filesEl.appendChild(el);
  });

  filesEl.appendChild(addBtn);
}

/* 액션 드롭 처리 */
actions.forEach(action => {
  action.ondragover = e => {
    e.preventDefault();
    action.classList.add("dragover");
  };

  action.ondragleave = () => {
    action.classList.remove("dragover");
  };

  action.ondrop = e => {
    e.preventDefault();
    action.classList.remove("dragover");

    if (selected.size === 0) return;

    const names = files
      .filter(f => selected.has(f.id))
      .map(f => f.name)
      .join(", ");

    alert(`"${names}" → ${action.dataset.action} 생성 (Mock)`);

    selected.clear();
    render();
  };
});
