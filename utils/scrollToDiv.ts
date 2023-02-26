export function scrollToDiv(divId: string) {
  const element = document.getElementById(divId);
  if (element) {
    // Offset for the navbar
    const offset = document.getElementById("navbar")?.getBoundingClientRect().height || 0;
    // Scroll to the top of the div
    const y = element.getBoundingClientRect().top + window.pageYOffset - offset;
    // Smooth scroll to the div
    window.scrollTo({ top: y, behavior: "smooth" });
  }
}
