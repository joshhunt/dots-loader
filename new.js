const makePercentage = (value, max) => Math.floor((value / max) * 100 * 100) / 100;

const DURATION = 750;
const DELAY = 100;
const KEYFRAME_PREFIX = 'diagonal-';

const COLOR_INACTIVE = "#282D30";
const COLOR_ACTIVE = "#E8E8E8";

const dotsArray = [
  'dot1A',
  'dot1B',
  'dot1C',
  'dot2A',
  'dot2B',
  'dot2C',
  'dot3A',
  'dot3B',
  'dot3C',
];

const totalSteps = dotsArray.length - 1;
const extraRound    = (totalSteps * DELAY ) + DURATION;
const totalDuration = extraRound * 2;

var styles = '';

dotsArray.forEach((dot, index) => {
  const animationName = KEYFRAME_PREFIX + dot;
  const startDelay = index * DELAY;
  const startDuration = startDelay + DURATION;

  const endDelay = startDelay + extraRound;
  const endDuration = startDuration + extraRound;

  styles += `
    .${dot} { animation-name: ${animationName} }
    @keyframes ${animationName} {
      ${makePercentage(startDelay, totalDuration)}% { background: ${COLOR_INACTIVE} }
      ${makePercentage(startDuration, totalDuration)}% { background: ${COLOR_ACTIVE} }

      ${makePercentage(endDelay, totalDuration)}% { background: ${COLOR_ACTIVE} }
      ${makePercentage(endDuration, totalDuration)}% { background: ${COLOR_INACTIVE} }
    }
    `;
});

console.log(styles);