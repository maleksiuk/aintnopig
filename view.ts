import { ScoreTracker } from "score_tracker";

export class View {
  private scoreElement: HTMLElement;
  private successModal: HTMLElement;
  private failureModal: HTMLElement;
  private pigLink: HTMLElement;
  private aintNoPigLink: HTMLElement;

  static build() {
    let scoreElement = document.getElementById("score");
    let successModal = document.getElementById("success-modal");
    let failureModal = document.getElementById("failure-modal");
    let pigLink = document.getElementById("pig-link");
    let aintNoPigLink = document.getElementById("aint-no-pig-link");

    if (scoreElement && successModal && failureModal && pigLink && aintNoPigLink) {
      return new View(scoreElement, successModal, failureModal, pigLink, aintNoPigLink);
    } else {
      // mtodo: catch and show error
      throw "Could not find element needed for building the view.";
    }
  }

  constructor(scoreElement: HTMLElement, successModal: HTMLElement, failureModal: HTMLElement, pigLink: HTMLElement, aintNoPigLink: HTMLElement) {
    this.scoreElement = scoreElement;
    this.successModal = successModal;
    this.failureModal = failureModal;
    this.pigLink = pigLink;
    this.aintNoPigLink = aintNoPigLink;
  }

  updateScore(scoreTracker: ScoreTracker) {
    this.scoreElement.innerText = scoreTracker.numberGotRight + "/" + scoreTracker.total;
  }

  setGameImage(src: string) {
    let gameImage = document.getElementById("game-image") as HTMLImageElement;
    if (!gameImage) {
      this.showError("Could not find the game image element.");
      return;
    }
    gameImage.src = src;
  }

  showError(message: string) {
    // mtodo
  }

  showSuccessModal() {
    this.successModal.classList.add("fadeinout");
  }

  showFailureModal() {
    this.failureModal.classList.add("fadeinout");
  }

  onPigLinkClick(callback: (e: Event) => any) {
    this.pigLink.addEventListener('click', callback);
  }

  onAintNoPigLinkClick(callback: (e: Event) => any) {
    this.aintNoPigLink.addEventListener('click', callback);
  }

  onSuccessModalFinishedAnimating(callback: (this: HTMLElement, ev: AnimationEvent) => any) {
    this.successModal.addEventListener('animationend', callback);
  }

  onFailureModalFinishedAnimating(callback: (this: HTMLElement, ev: AnimationEvent) => any) {
    this.failureModal.addEventListener('animationend', callback);
  }

  removeSuccessModal() {
    this.successModal.classList.remove("fadeinout");
  }

  removeFailureModal() {
    this.failureModal.classList.remove("fadeinout");
  }

}


