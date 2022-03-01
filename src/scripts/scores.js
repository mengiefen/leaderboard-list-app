class SCORE {
  constructor(name, score) {
    this.name = name;
    this.score = score;
  }

  sendScores() {
    this.requestScores();
    this.scores.push({
      id: Date.now(),
      name: this.name,
      score: this.score,
    });
    this.storeScoreSessionStorage();
  }

  storeScoreSessionStorage() {
    sessionStorage.setItem('scores', JSON.stringify(this.scores));
  }

  requestScores() {
    this.scores = JSON.parse(sessionStorage.getItem('scores')) || [];
  }
}

export default SCORE;
