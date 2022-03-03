import '../css/styles.css';
import { renderPage } from './render-page.js';
import { fetchScores, sendScore } from './api.js';

const submitError = document.querySelector('.error');

const sendFormData = async () => {
  const user = document.querySelector('#user').value;
  const score = document.querySelector('#score').value;
  const regex = /^[0-9]+$/;
  if (user !== '' && score !== '' && score.match(regex)) {
    const formData = { user, score };
    await sendScore(formData);
    await fetchScores().then((data) => {
      renderPage(data.result);
    });
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
  sendFormData().then((result) => {
    if (result) {
      submitError.style.display = 'none';
      form.reset();
    } else {
      submitError.style.display = 'block';
    }
  });
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
