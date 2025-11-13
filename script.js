// --- Flip desktop ---
const rightPage = document.querySelector('.page.right');
const leftPage = document.querySelector('.page.left.back');
const behindPage = document.querySelector('.page.left.front-behind'); // image derrière

let flipped = false;
let isScrolling = false;

function flipPage() {
  if (!flipped) {
    // ouverture
    rightPage.style.transform = 'rotateY(-180deg)';
    rightPage.style.zIndex = 0; // droite passe derrière
    leftPage.style.transform = 'rotateY(0deg)';
    leftPage.style.zIndex = 1;

    behindPage.style.zIndex = 0; // reste toujours derrière

    flipped = true;
  } else {
    // fermeture
    rightPage.style.transform = 'rotateY(0deg)';
    rightPage.style.zIndex = 2; // droite revient devant
    leftPage.style.transform = 'rotateY(180deg)';
    leftPage.style.zIndex = 0;

    behindPage.style.zIndex = 1; // jamais devant la droite

    flipped = false;
  }
}

// Clic pour tourner la page
rightPage.addEventListener('click', flipPage);

// Scroll pour tourner la page
window.addEventListener('wheel', e => {
  if (isScrolling) return;
  isScrolling = true;
  setTimeout(() => isScrolling = false, 1000);

  if (e.deltaY > 0 && !flipped) flipPage();
  else if (e.deltaY < 0 && flipped) flipPage();
});

// --- Détection orientation mobile ---
function checkOrientation() {
  if (window.innerWidth < window.innerHeight) {
    // Portrait
    document.body.classList.add('portrait');
    document.body.classList.remove('landscape');
  } else {
    // Paysage
    document.body.classList.add('landscape');
    document.body.classList.remove('portrait');
  }
}

window.addEventListener('load', checkOrientation);
window.addEventListener('resize', checkOrientation);
