const createScoreRow = (score) => {
  const listRow = document.createElement('div');
  const nameHolder = document.createElement('p');
  const scoreHolder = document.createElement('p');
  const classLists = ['story-list-row', 'story-list-name', 'story-list-score'];

  [listRow, nameHolder, scoreHolder].forEach((element, index) => {
    element.setAttribute('class', classLists[index]);
  });

  nameHolder.textContent = score.name;
  scoreHolder.textContent = score.score;

  listRow.append(nameHolder, scoreHolder);

  return listRow;
};

const alternatBackground = () => {
  const rows = [...document.querySelectorAll('.story-list-row')];
  rows.forEach((row, index) => {
    if (index % 2 === 0) row.style.backgroundColor = '#ddd';
  });
};

const addChild = (score) => {
  const leaderList = document.querySelector('.story-list-box');
  leaderList.appendChild(createScoreRow(score));
  alternatBackground();
};

const renderPage = () => {
  const leaderList = document.querySelector('.story-list-box');
  const scores = JSON.parse(sessionStorage.getItem('scores'));
  scores.forEach((score) => {
    leaderList.appendChild(createScoreRow(score));
  });

  alternatBackground();
};

export { renderPage, addChild };
