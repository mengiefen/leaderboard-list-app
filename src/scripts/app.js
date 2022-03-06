import '../css/styles.css';
import './btn-animate.js';
import {
  renderPage,
  getData,
  storeData,
  sortScores,
  checkforTopThree,
} from './render-page.js';
import { fetchScores, sendScore } from './api.js';
import showFireworks from './celebrate.js';

const submitError = document.querySelector('.submit-error');

const sendFormData = () => {
  const user = document.querySelector('#user').value;
  const score = document.querySelector('#score').value;
  const regex = /^[0-9]+$/;
  if (score.length < 8) {
    if (user !== '' && score !== '' && score.match(regex)) {
      const formData = {
        user,
        score,
      };
      sendScore(formData);
      if (checkforTopThree(Number(score))) {
        showFireworks();
      }
      const scores = getData('scores');
      scores.push(formData);
      storeData('scores', scores);
      renderPage(scores);
      return true;
    }
    return false;
  }
  submitError.textContent = 'Maximum Allowable Score is 9999999';
  return false;
};

const eventHandler = (eventType, selector, callback) => {
  document.addEventListener(eventType, (e) => {
    if (e.target.matches(selector) && true) callback(e);
  });
};

eventHandler('click', '#score-submit', (e) => {
  e.preventDefault();
  const form = document.querySelector('.score-submit-form');
  const nameInput = document.querySelector('#user');
  const scoreInput = document.querySelector('#score');
  if (sendFormData()) {
    submitError.classList.remove('error');
    form.reset();
    nameInput.focus();
  } else {
    submitError.textContent = 'Please Enter All the Require Fields.';
    submitError.classList.add('error');
    scoreInput.focus();
  }
});

eventHandler('click', '#btn-refresh', () => {
  document.location.reload();
});

document.addEventListener('DOMContentLoaded', () => {
  fetchScores().then((data) => {
    renderPage(sortScores(data.result));
    storeData('scores', data.result);
  });
});
