const hero = document.getElementById('heroSection');

function setBgImage(url) {
  hero.style.backgroundImage = `url('${url}')`;
  localStorage.setItem('heroBgImage', url);

  // Highlight the active card
  document.querySelectorAll('.theme-option').forEach(card => {
    const img = card.querySelector('img');
    if (img && img.getAttribute('src') === url) {
      card.classList.add('active');
    } else {
      card.classList.remove('active');
    }
  });
}

function uploadCustomBg(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const imageUrl = e.target.result;
    hero.style.backgroundImage = `url('${imageUrl}')`;
    localStorage.setItem('heroBgImage', imageUrl);

    // Remove .active from all cards (custom upload)
    document.querySelectorAll('.theme-option').forEach(card => {
      card.classList.remove('active');
    });
  };
  reader.readAsDataURL(file);
}

window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('heroBgImage');
  if (saved) {
    hero.style.backgroundImage = `url('${saved}')`;

    // Highlight correct card if exists
    document.querySelectorAll('.theme-option').forEach(card => {
      const img = card.querySelector('img');
      if (img && (img.src === saved || img.getAttribute('src') === saved)) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });
  }
});



document.addEventListener("DOMContentLoaded", function () {
  const profileImages = document.querySelectorAll(".profileImage");
  const fileInput = document.getElementById("profileUpload");

  // Restore saved image from localStorage
  const savedImage = localStorage.getItem("profileImage");
  if (savedImage) {
    profileImages.forEach(img => img.src = savedImage);
  }

  // On click any image => trigger file input
  profileImages.forEach(img => {
    img.addEventListener("click", () => {
      if (fileInput) fileInput.click();
    });
  });

  // On file select => preview and store
  fileInput.addEventListener("change", function (e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      const imageDataUrl = e.target.result;
      profileImages.forEach(img => img.src = imageDataUrl);
      localStorage.setItem("profileImage", imageDataUrl);
    };
    reader.readAsDataURL(file);
  });
});

