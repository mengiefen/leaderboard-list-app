import { Fireworks } from 'fireworks-js';

const showFireworks = () => {
  const container = document.getElementById('canvas');

  const fireworks = new Fireworks(container, {
    hue: 120,
    startDelay: 1,
    minDelay: 20,
    maxDelay: 30,
    speed: 4,
    acceleration: 1.05,
    friction: 0.98,
    gravity: 1,
    particles: 500,
    trace: 3,
    explosion: 5,
    boundaries: {
      top: 50,
      bottom: container.clientHeight,
      left: 50,
      right: container.clientWidth,
    },
    sound: {
      enable: true,
      list: ['explosion0.mp3', 'explosion1.mp3', 'explosion2.mp3'],
      min: 4,
      max: 100,
    },
  });
  const showCongrats = document.querySelector('.submit-error');
  showCongrats.classList.toggle('congratulations');
  showCongrats.textContent = 'Congratulations. You Won a Medal!';
  fireworks.start();

  setTimeout(() => {
    fireworks.stop();
    showCongrats.classList.toggle('congratulations');
  }, 10000);
};

export default showFireworks;
