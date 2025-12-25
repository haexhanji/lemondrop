const files = document.querySelectorAll(".file");
const overlay = document.getElementById("overlay");

/* 파일 드래그 시작 */
files.forEach(file => {
  file.addEventListener("dragstart", e => {
    // 🔑 이 한 줄이 핵심
    e.dataTransfer.setData("text/plain", "file");

    file.classList.add("dragging");
    overlay.classList.add("active");
  });

  file.addEventListener("dragend", () => {
    file.classList.remove("dragging");
    overlay.classList.remove("active");
  });
});

/* 오버레이 클릭 → 닫기 (설명용) */
overlay.addEventListener("click", () => {
  overlay.classList.remove("active");
  files.forEach(f => f.classList.remove("dragging"));
});

/* 액션 클릭 시 Mock 동작 */
document.querySelectorAll(".action").forEach(action => {
  action.addEventListener("click", e => {
    e.stopPropagation();
    alert(`${action.innerText} 실행 (설명용 목업)`);
    overlay.classList.remove("active");
    files.forEach(f => f.classList.remove("dragging"));
  });
});
