import '../css/styles.css';
import SCORE from './scores.js';
import { renderPage, addChild } from './render-page.js';

const getFormData = () => {
  const name = document.querySelector('#name');
  const score = document.querySelector('#score');
  if (name.value !== '' && score.value !== '') {
    const Score = new SCORE(name.value, score.value);
    Score.sendScores();
    addChild({ name: name.value, score: score.value });
    return true;
  }
  return false;
};

const eventHandler = (eventType, selector, callback) => {
  document.addEventListener(eventType, (e) => {
    if (e.target.matches(selector) && true) callback(e);
  });
};

eventHandler('click', '#story-submit', (e) => {
  e.preventDefault();
  const form = document.querySelector('.story-submit-form');
  if (getFormData()) {
    form.reset();
  }
});

document.addEventListener('DOMContentLoaded', renderPage);
