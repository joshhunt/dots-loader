const $ = document.querySelector.bind(document);

function seconds(number) { return number * 1000 };

const DURATION = seconds(1.5) / 2;
const DELAY = seconds(0.2) / 2;

const COLOR_INACTIVE = "#282D30";
const COLOR_ACTIVE = "#E8E8E8";

const NEXT_COLOR = {
    [COLOR_INACTIVE]: COLOR_ACTIVE,
    [COLOR_ACTIVE]: COLOR_INACTIVE,
};

const dot1A = $('.dot1A');
const dot1B = $('.dot1B');
const dot1C = $('.dot1C');
const dot2A = $('.dot2A');
const dot2B = $('.dot2B');
const dot2C = $('.dot2C');
const dot3A = $('.dot3A');
const dot3B = $('.dot3B');
const dot3C = $('.dot3C');

const animationStyles = {
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
}

const dotArray = animationStyles.diagonal;

function animateDot(dot, color, delay, onComplete) {
    const toStyles = {
        backgroundColor: color,
    };

    const options = {
        duration: DURATION,
        delay: delay,
        complete: onComplete,
    };

    Velocity(dot, toStyles, options);
}

function cycleColors() {
    const nextColor = NEXT_COLOR[currentColor];
    currentColor = nextColor;

    dotArray.forEach((dot, index) => {
        const delay = DELAY * index;
        let completion = () => { };

        if (dotArray.length - 1 == index) {
            completion = cycleColors;
        }

        animateDot(dot, nextColor, delay, completion);
    })
}

let currentColor = COLOR_INACTIVE;

animationStyles.classic.forEach((dot, index) => {
    dot.style.backgroundColor = currentColor;
});

cycleColors();



