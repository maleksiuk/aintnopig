interface ScoreTracker {
  numberGotRight: number;
  total: number;
}

interface Config {
  imageHost: string;
}

let config : Config = {
  imageHost: "hello"
};

let scoreTracker : ScoreTracker = { numberGotRight: 0, total: 0 };

function showError(message: string) {
  // mtodo
}

function updateScore() {
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

  if (pigLink && aintNoPigLink) {
    pigLink.addEventListener('click', event => {
      event.preventDefault();
      scoreTracker.numberGotRight += 1;
      scoreTracker.total += 1;
      updateScore();
      console.log('clicked on pig link');
    });

    aintNoPigLink.addEventListener('click', event => {
      event.preventDefault();
      scoreTracker.total += 1;
      updateScore();
      console.log('clicked on aint no pig link');
    });

    updateScore();
  } else {
    showError("Something went wrong when setting up the page. Please refresh.");
  }
}




