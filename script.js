throw new Error('Nope. Not doing anything')

const $ = document.querySelector.bind(document);

const animationStyleEle = $('.animationStyle');
let iterations = 0;

function round(num) { return Math.floor(num / 10) * 10; }
function roundToDigits(num) { return Math.floor(num * 100) / 100; }

const animationSteps = [];

const DURATION = 750;
const DELAY = 100;

console.log('Duration:', DURATION);
console.log('Delay:   ', DELAY);

const COLOR_INACTIVE = "#282D30";
const COLOR_ACTIVE = "#E8E8E8";

const NEXT_COLOR = {
    [COLOR_INACTIVE]: COLOR_ACTIVE,
    [COLOR_ACTIVE]: COLOR_INACTIVE,
};

const dot1A = 'dot1A';
const dot1B = 'dot1B';
const dot1C = 'dot1C';
const dot2A = 'dot2A';
const dot2B = 'dot2B';
const dot2C = 'dot2C';
const dot3A = 'dot3A';
const dot3B = 'dot3B';
const dot3C = 'dot3C';

const animationStyles = {
    snakeDown: [
        dot1A,
        dot1B,
        dot1C,

        dot2C,
        dot2B,
        dot2A,

        dot3A,
        dot3B,
        dot3C,
    ],

    classic: [
        dot1A,
        dot1B,
        dot1C,

        dot2A,
        dot2B,
        dot2C,

        dot3A,
        dot3B,
        dot3C,
    ],

    spiral: [
        dot1A,
        dot1B,
        dot1C,
        dot2C,
        dot3C,
        dot3B,
        dot3A,
        dot2A,
        dot2B,
    ],

    diagonal: [
        dot1A,
        [dot2A, dot1B],
        [dot3A, dot2B, dot1C],
        [dot3B, dot2C],
        dot3C,
    ],

    diagonalReverse: [
        dot3C,
        [dot3B, dot2C],
        [dot3A, dot2B, dot1C],
        [dot2A, dot1B],
        dot1A,
    ],

    topToBottom: [
        [dot1A, dot1B, dot1C],
        [dot2C, dot2B, dot2A],
        [dot3A, dot3B, dot3C],
    ],

    rightToLeft: [
        [dot1C, dot2C, dot3C],
        [dot1B, dot2B, dot3B],
        [dot1A, dot2A, dot3A],
    ],

    bottomToTop: [
        [dot3A, dot3B, dot3C],
        [dot2C, dot2B, dot2A],
        [dot1A, dot1B, dot1C],
    ],

    leftToRight: [
        [dot1A, dot2A, dot3A],
        [dot1B, dot2B, dot3B],
        [dot1C, dot2C, dot3C],
    ],
};

const animationStyleKeys = Object.keys(animationStyles);
let dotArray;

let plusExtra = 0;

function calculateShit(dot, color, delay, index) {
    const toUpdate = Array.isArray(dot) ? dot : [dot];

    let dur = (index * DELAY) + plusExtra;
    let fin = dur + DURATION;

    toUpdate.forEach((oneToUpdate) => {
        const name = oneToUpdate;
        animationSteps.push({
            name, color,
            start: round(dur),
            end: round(fin),
        });

        console.log('', index, '    Start:', round(dur), '    ', 'End:', round(fin));
    });
}


function cycleColors() {
    console.log('--------');
    if (animationSteps.length) {
        plusExtra = animationSteps[animationSteps.length - 1].end;
        console.log('Setting plus extra to ', plusExtra);
    }

    animationStyleEle.parentNode.style.opacity = 1;
    const nextColor = NEXT_COLOR[currentColor];
    currentColor = nextColor;

    dotArray.forEach((dot, index) => {
        const delay = DELAY * index;
        calculateShit(dot, nextColor, delay, index)
    })
}

function makeInner(step) {
    const start = roundToDigits((step.start / totalDur) * 100);
    const end = roundToDigits((step.end / totalDur) * 100);
    return [
        `${start}% { background: ${NEXT_COLOR[step.color]} }`,
        `${end}% { background: ${step.color} }`,
    ].join('\n');
};

let totalDur;

function allDone() {
    totalDur = animationSteps[animationSteps.length - 1].end;

    const stepsByDot = animationSteps.reduce((acc, step) => {
        if (!acc[step.name]) {
            acc[step.name] = [];
        }

        acc[step.name].push(step);
        return acc;
    }, {});

    let steps;
    const styles = [];

    for (dotName in stepsByDot) {
        const innerStyles = stepsByDot[dotName].map(makeInner).join('\n');
        const animationName = `${ANIMATION_NAME}-${dotName}`;
        styles.push(`.${dotName} { animation: ${animationName} ${totalDur}ms infinite }`);
        styles.push(`@keyframes ${animationName} { ${innerStyles} }`);
    }

    const finalStyles = styles.join('\n')
    window.finalStyles = finalStyles;

    console.log();
    console.log('Styles set in window.finalStyles');
};

let currentColor = COLOR_INACTIVE;
const ANIMATION_NAME = 'classic';

dotArray = animationStyles[ANIMATION_NAME];

let startTime;
cycleColors();
cycleColors();
allDone();