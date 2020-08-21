
/*

- Images should be numbered starting at 1. (pig1.jpg, pig2.jpg) (notapig1.jpg, notapig2.jpg)
- All images should be jpg.

*/

import { updateScoreView, showError, setGameImage, showSuccessModal, showFailureModal, onPigLinkClick, onAintNoPigLinkClick, onSuccessModalFinishedAnimating, removeSuccessModal, removeFailureModal, onFailureModalFinishedAnimating } from "view";
import { ScoreTracker } from "score_tracker";

require(['domReady'], function(domReady: any) {
  domReady(function() {
    setThingsUp();
  });
});


interface Config {
  numberOfPigPictures: number;
  numberOfNotPigPictures: number;
}

interface GameState {
  showingPig: boolean;
  currentImageNumber: number;

  isAlreadyShowing(pig: boolean, num: number): boolean;
}

let config : Config = {
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

let gameState : GameState = { 
  showingPig: false, 
  currentImageNumber: 0,
  isAlreadyShowing: function(pig: boolean, num: number): boolean {
    return (this.showingPig == pig && this.currentImageNumber == num);
  }
};

function setThingsUp() {
  onPigLinkClick(handleChoosingPig);
  onAintNoPigLinkClick(handleChoosingAintNoPig);
  onSuccessModalFinishedAnimating(handleSuccessModalFinishedAnimating);
  onFailureModalFinishedAnimating(handleFailureModalFinishedAnimating);

  updateScoreView(scoreTracker);
  presentNewImage();
}

function getRandomInt(max: number): number {
  return Math.floor(Math.random() * Math.floor(max));
}

function presentNewImage() {
  let getPigPicture = getRandomInt(100) > 50;
  if (getPigPicture) {
    let numberToGet = null;

    do {
      numberToGet = getRandomInt(config.numberOfPigPictures) + 1;
    } while (config.numberOfPigPictures != 1 && gameState.isAlreadyShowing(true, numberToGet));

    gameState.showingPig = true;
    gameState.currentImageNumber = numberToGet;
    setGameImage(`game_images/pig${numberToGet}.jpg`);
  } else {
    let numberToGet = null;

    do {
      numberToGet = getRandomInt(config.numberOfNotPigPictures) + 1;
    } while (config.numberOfNotPigPictures != 1 && gameState.isAlreadyShowing(false, numberToGet));

    gameState.showingPig = false;
    gameState.currentImageNumber = numberToGet;
    setGameImage(`game_images/notapig${numberToGet}.jpg`);
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

function handleChoosingPig(event: Event) {
  event.preventDefault();
  onChoosing('pig');
}

function handleChoosingAintNoPig(event: Event) {
  event.preventDefault();
  onChoosing('notapig');
}

function handleSuccessModalFinishedAnimating(event: Event) {
  removeSuccessModal();

  updateScoreView(scoreTracker);
  presentNewImage();
}

function handleFailureModalFinishedAnimating(event: Event) {
  removeFailureModal();

  // mtodo: remove duplication
  updateScoreView(scoreTracker);
  presentNewImage();
}




