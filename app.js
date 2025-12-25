const files = document.querySelectorAll(".file");
const overlay = document.getElementById("overlay");

/* 파일 드래그 시작 → 오버레이 표시 */
files.forEach(file => {
  file.addEventListener("dragstart", () => {
    overlay.classList.add("active");
  });
});

/* 오버레이 클릭 시 닫기 (설명용) */
overlay.addEventListener("click", () => {
  overlay.classList.remove("active");
});

/* 액션 클릭 시 설명용 알림 */
document.querySelectorAll(".action").forEach(action => {
  action.addEventListener("click", e => {
    e.stopPropagation();
    alert(`"${action.innerText}" 실행 (설명용 목업)`);
    overlay.classList.remove("active");
  });
});
