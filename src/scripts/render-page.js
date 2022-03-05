const createScoreRow = (score, index) => {
  const listRow = document.createElement('div');
  const nameHolder = document.createElement('p');
  const scoreHolder = document.createElement('p');
  const serialNo = document.createElement('span');
  const medalImage = document.createElement('img');
  const classLists = [
    'serial-number',
    'medal-image',
    'score-list-row',
    'score-list-name',
    'score-list-score',
  ];

  [serialNo, medalImage, listRow, nameHolder, scoreHolder].forEach(
    (element, index) => {
      element.setAttribute('class', classLists[index]);
    },
  );

  serialNo.textContent = index + 1;

  nameHolder.textContent = score.user;
  scoreHolder.textContent = score.score;
  listRow.append(serialNo, medalImage, nameHolder, scoreHolder);
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
  return scores;
};

const storeData = (key, value) => {
  sessionStorage.setItem(key, JSON.stringify(sortScores(value)));
};

const getData = (key) => JSON.parse(sessionStorage.getItem(key)) || [];

// NOTE: celerebration using Firework

const checkforTopThree = (value) => {
  const previous = JSON.parse(sessionStorage.getItem('top')).slice(1);
  const top = previous.some((val) => value >= Number(val));
  if (top) return true;
  return false;
};

// if (checkforTopThree()) {
//   setTimeout(() => {
//     canvas.style.display = 'block';
//   }, 2000);
//   canvas.remove();
// }

const topThreeScores = (scores) => {
  const topThree = [];
  topThree.push(scores.length);
  scores.slice(0, 3).forEach((element) => {
    topThree.push(element.score);
  });

  storeData('top', topThree);
};

const renderPage = (scores) => {
  const leaderList = document.querySelector('.score-list-box');
  const error = document.querySelector('.fetch-error');
  leaderList.innerHTML = '';
  if (scores.length > 0) {
    scores.forEach((score, index) => {
      leaderList.appendChild(createScoreRow(score, index));
    });
    topThreeScores(scores);
    alternatBackground();
  } else {
    error.style.display = 'block';
    error.textContent = 'The list is empty! Please add more scores.';
    leaderList.appendChild(error);
  }
};

export {
  renderPage,
  getData,
  storeData,
  sortScores,
  checkforTopThree,
};