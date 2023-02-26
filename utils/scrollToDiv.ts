export function scrollToDiv(divId: string) {
  const element = document.getElementById(divId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}
