// (function () {
//   const wrapper = document.getElementById("searchWrapper");
//   const toggle = document.getElementById("searchToggle");
//   const form = document.getElementById("searchForm");
//   const input = document.getElementById("searchInput");

//   function openSearch() {
//     wrapper.classList.add("active");
//     toggle.setAttribute("aria-expanded", "true");
//     // small delay to ensure form is visible before focusing
//     requestAnimationFrame(() => input.focus());
//   }

//   function closeSearch() {
//     wrapper.classList.remove("active");
//     toggle.setAttribute("aria-expanded", "false");
//     input.value = "";
//   }

//   // toggle by clicking icon
//   toggle.addEventListener("click", (e) => {
//     e.stopPropagation(); // prevent the document click handler from immediately closing it
//     if (wrapper.classList.contains("active")) {
//       closeSearch();
//       toggle.focus(); // return focus to toggle
//     } else {
//       openSearch();
//     }
//   });

//   // submit - replace the console.log with your product search call
//   form.addEventListener("submit", (e) => {
//     e.preventDefault();
//     const q = input.value.trim();
//     if (!q) {
//       // If empty, just collapse (no search)
//       closeSearch();
//       return;
//     }

//     // TODO: plug in your store search logic here (API call / in-memory filter)
//     console.log("SEARCH QUERY →", q);

//     // collapse after searching (as requested)
//     closeSearch();
//   });

//   // click outside closes (only when active)
//   document.addEventListener("click", (e) => {
//     if (wrapper.classList.contains("active") && !wrapper.contains(e.target)) {
//       closeSearch();
//     }
//   });

//   // close on ESC
//   document.addEventListener("keydown", (e) => {
//     if (e.key === "Escape" && wrapper.classList.contains("active")) {
//       closeSearch();
//       toggle.focus();
//     }
//   });

//   // Optional: handle touchstart for mobile first-tap focus behavior
//   // (keeps UX snappy on touch devices)
//   toggle.addEventListener("touchstart", (e) => e.stopPropagation());
//   form.addEventListener("touchstart", (e) => e.stopPropagation());
// })();
