import { ScoreTracker } from "score_tracker";

export function updateScoreView(scoreTracker: ScoreTracker) {
  const scoreElement = document.getElementById("score");
  if (scoreElement) {
    scoreElement.innerText = scoreTracker.numberGotRight + "/" + scoreTracker.total;
  } else {
    showError("Could not update the score.");
  }
}

export function setGameImage(src: string) {
  let gameImage = document.getElementById("game-image") as HTMLImageElement;
  if (!gameImage) {
    showError("Could not find the game image element.");
    return;
  }
  gameImage.src = src;
}

export function showError(message: string) {
  // mtodo
}

export function showSuccessModal() {
  // mtodo: I shouldn't have to keep finding this
  const successModal = document.getElementById('success-modal');
  if (successModal) {
    successModal.classList.add("fadeinout");
  }
}

export function showFailureModal() {
  const modal = document.getElementById('failure-modal');
  if (modal) {
    modal.classList.add("fadeinout");
  }
}

export function onPigLinkClick(callback: (e: Event) => any) {
  const pigLink = document.getElementById("pig-link");
  if (pigLink) {
    pigLink.addEventListener('click', callback);
  } else {
    showError("Something went wrong when setting up the page. Please refresh.");
  }
}

export function onAintNoPigLinkClick(callback: (e: Event) => any) {
  const aintNoPigLink = document.getElementById("aint-no-pig-link");
  if (aintNoPigLink) {
    aintNoPigLink.addEventListener('click', callback);
  } else {
    showError("Something went wrong when setting up the page. Please refresh.");
  }
}

export function onSuccessModalFinishedAnimating(callback: (this: HTMLElement, ev: AnimationEvent) => any) {
  const successModal = document.getElementById("success-modal");
  if (successModal) {
    successModal.addEventListener('animationend', callback);
  } else {
    showError("Something went wrong when setting up the page. Please refresh.");
  }
}

export function onFailureModalFinishedAnimating(callback: (this: HTMLElement, ev: AnimationEvent) => any) {
  const modal = document.getElementById("failure-modal");
  if (modal) {
    modal.addEventListener('animationend', callback);
  } else {
    showError("Something went wrong when setting up the page. Please refresh.");
  }
}

export function removeSuccessModal() {
  const modal = document.getElementById('success-modal');
  if (modal) {
    modal.classList.remove("fadeinout");
  }
}

export function removeFailureModal() {
  const modal = document.getElementById('failure-modal');
  if (modal) {
    modal.classList.remove("fadeinout");
  }
}




