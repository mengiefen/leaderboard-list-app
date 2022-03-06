import anime from 'animejs';

const btn = anime.timeline({
  easing: 'easeOutExpo',
  duration: 750,
  loop: true,
});

btn
  .add({
    targets: 'span:nth-child(1)',
    translateX: '110%',
    width: '100%',
    duration: 1000,
  })

  .add({
    targets: 'span:nth-child(2)',
    translateY: '110%',
    height: '100%',
    duration: 1000,
  })

  .add({
    targets: 'span:nth-child(3)',
    translateX: '-110%',
    width: '100%',
    duration: 1000,
  })

  .add({
    targets: 'span:nth-child(4)',
    translateY: '-110%',
    height: '100%',
    duration: 1000,
  });
