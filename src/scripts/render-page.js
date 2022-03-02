const createScoreRow = (score) => {
  const listRow = document.createElement('div');
  const nameHolder = document.createElement('p');
  const scoreHolder = document.createElement('p');
  const classLists = ['score-list-row', 'score-list-name', 'score-list-score'];

  [listRow, nameHolder, scoreHolder].forEach((element, index) => {
    element.setAttribute('class', classLists[index]);
  });

  nameHolder.textContent = score.user;
  scoreHolder.textContent = score.score;

  listRow.append(nameHolder, scoreHolder);

  return listRow;
};

const alternatBackground = () => {
  const rows = [...document.querySelectorAll('.score-list-row')];
  rows.forEach((row, index) => {
    if (index % 2 === 0) row.style.backgroundColor = 'rgba(0,0,0,0.1)';
  });
};

const addChild = (score) => {
  const leaderList = document.querySelector('.score-list-box');
  leaderList.appendChild(createScoreRow(score));
  alternatBackground();
};

const renderPage = (scores) => {
  const leaderList = document.querySelector('.score-list-box');
  leaderList.innerHTML = '';
  scores.forEach((score) => {
    leaderList.appendChild(createScoreRow(score));
  });

  alternatBackground();
};

export { renderPage, addChild };
