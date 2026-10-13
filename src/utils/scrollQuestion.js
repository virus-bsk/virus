// Scroll the expanded question's header to the top of the viewport so the
// answer always starts in view (minus the fixed navbar height).
// Targets the single `.active` item — question ids repeat across categories,
// so an id-based lookup could hit the wrong element.
export function scrollActiveQuestionIntoView(itemSelector, headerSelector) {
  requestAnimationFrame(() => {
    const header = document.querySelector(`${itemSelector}.active ${headerSelector}`);
    if (!header) return;
    const NAV_OFFSET = 90;
    const top = header.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
    window.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });
  });
}
