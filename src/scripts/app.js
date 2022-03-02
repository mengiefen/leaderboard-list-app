import '../css/styles.css';
import { renderPage, addChild } from './render-page.js';
import { fetchScores, sendScore } from './api.js';

const sendFormData = () => {
  const user = document.querySelector('#user');
  const score = document.querySelector('#score');
  if (user.value !== '' && score.value !== '') {
    const formData = { user: user.value, score: score.value };
    sendScore(formData);
    addChild(formData);
    return true;
  }
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
  sendFormData();
  form.reset();
});

eventHandler('click', '#btn-refresh', () => {
  fetchScores().then((data) => {
    renderPage(data.result);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  fetchScores().then((data) => {
    renderPage(data.result);
  });
});
