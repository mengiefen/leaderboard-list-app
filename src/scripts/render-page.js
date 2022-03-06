import gold from '../images/gold.png';
import silver from '../images/silver.png';
import bronze from '../images/bronze.png';

const createScoreRow = (score, index) => {
  const listRow = document.createElement('div');
  const nameHolder = document.createElement('p');
  const scoreHolder = document.createElement('p');
  const serialNo = document.createElement('span');
  const medalImage = document.createElement('img');
  const serialImageHolder = document.createElement('div');
  const nameScoreHolder = document.createElement('div');
  const imageHolder = document.createElement('div');
  const classLists = [
    'serial-number',
    'image-holder',
    'medal-image',
    'score-list-row',
    'score-list-name',
    'score-list-score',
    'wrapper-serial-image',
    'wrapper-name-score',
  ];

  [
    serialNo,
    imageHolder,
    medalImage,
    listRow,
    nameHolder,
    scoreHolder,
    serialImageHolder,
    nameScoreHolder,
  ].forEach((element, index) => {
    element.setAttribute('class', classLists[index]);
  });

  if (index === 0) {
    medalImage.src = gold;
    medalImage.classList.add('medal');
  } else if (index === 1) {
    medalImage.src = silver;
    medalImage.classList.add('medal');
  } else if (index === 2) {
    medalImage.src = bronze;
    medalImage.classList.add('medal');
  }

  serialNo.textContent = index + 1;
  nameHolder.textContent = score.user;
  scoreHolder.textContent = score.score;

  imageHolder.appendChild(medalImage);

  serialImageHolder.append(serialNo, imageHolder);
  nameScoreHolder.append(nameHolder, scoreHolder);
  listRow.append(serialImageHolder, nameScoreHolder);
  return listRow;
};

const alternatBackground = () => {
  const rows = [...document.querySelectorAll('.score-list-row')];
  rows.forEach((row, index) => {
    if (index % 2 === 0) {
      row.style.backgroundColor = 'rgba(121, 20, 99, 0.2)';
    }
  });
};

const sortScores = (scores) => {
  scores.sort((a, b) => (Number(a.score) < Number(b.score) ? 1 : -1));
  return scores;
};

const storeData = (key, value) => {
  sessionStorage.setItem(key, JSON.stringify(sortScores(value)));
};

const getData = (key) =>
  JSON.parse(sessionStorage.getItem(key)) || [];

const checkforTopThree = (value) => {
  const previous = JSON.parse(sessionStorage.getItem('top')) || [];
  const top = previous.some((val) => value >= Number(val));
  return top;
};

const topThreeScores = (scores) => {
  const topThree = [];
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
    error.textContent = 'The List is Empty! Please Add More Scores.';
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
