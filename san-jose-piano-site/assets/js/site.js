document.addEventListener("DOMContentLoaded", () => {
  const dialog = document.querySelector("[data-gallery-dialog]");
  if (!dialog) return;

  const image = dialog.querySelector("img");
  const caption = dialog.querySelector("[data-dialog-caption]");

  document.querySelectorAll("[data-gallery-image]").forEach((button) => {
    button.addEventListener("click", () => {
      image.src = button.dataset.galleryImage;
      image.alt = button.dataset.galleryAlt || "";
      caption.textContent = button.dataset.galleryCaption || "";
      dialog.showModal();
    });
  });

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
});
