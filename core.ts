
/*

- Images should be numbered starting at 1. (pig1.jpg, pig2.jpg) (notapig1.jpg, notapig2.jpg)
- All images should be jpg.

*/


interface ScoreTracker {
  numberGotRight: number;
  total: number;

  gotItRight(): void;
  gotItWrong(): void;
}

interface Config {
  imageHost: string;
  numberOfPigPictures: number;
  numberOfNotPigPictures: number;
}

interface GameState {
  showingPig: boolean;
  currentImageNumber: number;
}

let config : Config = {
  imageHost: "",
  numberOfPigPictures: 7,
  numberOfNotPigPictures: 7
};

let scoreTracker : ScoreTracker = { 
  numberGotRight: 0, 
  total: 0,
  gotItRight: function() {
    this.numberGotRight += 1;
    this.total += 1;
  },
  gotItWrong: function() {
    this.total += 1;
  }
};

let gameState : GameState = { showingPig: false, currentImageNumber: 0 };

function showError(message: string) {
  // mtodo
}

function updateScoreView() {
  const scoreElement = document.getElementById("score");
  if (scoreElement) {
    scoreElement.innerText = scoreTracker.numberGotRight + "/" + scoreTracker.total;
  } else {
    showError("Could not update the score.");
  }
}

function setThingsUp() {
  const pigLink = document.getElementById("pig-link");
  const aintNoPigLink = document.getElementById("aint-no-pig-link");
  const successModal = document.getElementById("success-modal");
  const failureModal = document.getElementById("failure-modal");

  if (pigLink && aintNoPigLink && successModal && failureModal) {
    pigLink.addEventListener('click', onChoosingPig);
    aintNoPigLink.addEventListener('click', onChoosingAintNoPig);
    successModal.addEventListener('animationend', onSuccessModalFinishedAnimating);
    failureModal.addEventListener('animationend', onFailureModalFinishedAnimating);

    updateScoreView();
    presentNewImage();
  } else {
    showError("Something went wrong when setting up the page. Please refresh.");
  }
}

function getRandomInt(max: number): number {
  return Math.floor(Math.random() * Math.floor(max));
}

function presentNewImage() {
  let gameImage = document.getElementById("game-image") as HTMLImageElement;
  if (!gameImage) {
    showError("Could not find the game image element.");
    return;
  }

  let getPigPicture = getRandomInt(100) > 50;
  if (getPigPicture) {
    gameState.showingPig = true;
    let numberToGet = getRandomInt(config.numberOfPigPictures) + 1;
    gameImage.src = `game_images/pig${numberToGet}.jpg`;
    gameState.currentImageNumber = numberToGet;
  } else {
    gameState.showingPig = false;
    let numberToGet = getRandomInt(config.numberOfNotPigPictures) + 1;
    gameImage.src = `game_images/notapig${numberToGet}.jpg`;
    gameState.currentImageNumber = numberToGet;
  }
}

function onChoosing(choice: string) {
  if ((choice == 'pig' && gameState.showingPig) ||
      (choice == 'notapig' && !gameState.showingPig)) {
    scoreTracker.gotItRight();
    showSuccessModal();
  } else {
    scoreTracker.gotItWrong();
    showFailureModal();
  }
}

function showSuccessModal() {
  // mtodo: I shouldn't have to keep finding this
  const successModal = document.getElementById('success-modal');
  if (successModal) {
    successModal.classList.add("fadeinout");
  }
}

function showFailureModal() {
  const modal = document.getElementById('failure-modal');
  if (modal) {
    modal.classList.add("fadeinout");
  }
}

function onChoosingPig(event: Event) {
  event.preventDefault();
  onChoosing('pig');
}

function onChoosingAintNoPig(event: Event) {
  event.preventDefault();
  onChoosing('notapig');
}

function onSuccessModalFinishedAnimating(event: Event) {
  const modal = document.getElementById('success-modal');
  if (modal) {
    modal.classList.remove("fadeinout");
  }

  updateScoreView();
  presentNewImage();
}

function onFailureModalFinishedAnimating(event: Event) {
  const modal = document.getElementById('failure-modal');
  if (modal) {
    modal.classList.remove("fadeinout");
  }

  // mtodo: remove duplication
  updateScoreView();
  presentNewImage();
}




