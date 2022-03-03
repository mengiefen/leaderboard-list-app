const createScoreRow = (score, index) => {
  const listRow = document.createElement('div');
  const nameHolder = document.createElement('p');
  const scoreHolder = document.createElement('p');
  const serialNo = document.createElement('span');
  const classLists = ['serial-number', 'score-list-row', 'score-list-name', 'score-list-score'];

  [serialNo, listRow, nameHolder, scoreHolder].forEach((element, index) => {
    element.setAttribute('class', classLists[index]);
  });
  serialNo.textContent = index + 1;

  nameHolder.textContent = score.user;
  scoreHolder.textContent = score.score;

  listRow.append(serialNo, nameHolder, scoreHolder);

  return listRow;
};

const alternatBackground = () => {
  const rows = [...document.querySelectorAll('.score-list-row')];
  rows.forEach((row, index) => {
    if (index % 2 === 0) row.style.backgroundColor = 'rgba(121, 20, 99, 0.2)';
  });
};

const sortScores = (scores) => {
  scores.sort((a, b) => (Number(a.score) < Number(b.score) ? 1 : -1));
};

const addChild = (score) => {
  const leaderList = document.querySelector('.score-list-box');
  leaderList.appendChild(createScoreRow(score));
  alternatBackground();
};

const renderPage = (scores) => {
  const leaderList = document.querySelector('.score-list-box');
  const error = document.querySelector('.fetch-error');
  leaderList.innerHTML = '';
  if (scores.length > 0) {
    sortScores(scores);
    scores.forEach((score, index) => {
      leaderList.appendChild(createScoreRow(score, index));
    });
    alternatBackground();
  } else {
    error.style.display = 'block';
    error.textContent = 'Unable to fetch scores! Please try again later.';
    leaderList.appendChild(error);
  }
};

export { renderPage, addChild };
