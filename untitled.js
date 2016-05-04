
function animateDotCSS(dot, color, delay, onComplete, index) {
    const toUpdate = Array.isArray(dot) ? dot : [dot];

    toUpdate.forEach((oneDot) => {
        oneDot.style.transitionTimingFunction = `cubic-bezier(0.45, 0.05, 0.55, 0.95)`;
        oneDot.style.transitionDelay = `${delay}ms`;
        oneDot.style.transitionDuration = `${DURATION}ms`;
        oneDot.style.backgroundColor = color;
    })

    if (!startTime) startTime = delay;

    let dur = (delay) - startTime;
    let fin = (delay + DURATION) - startTime;

    dur += plusExtra;
    fin += plusExtra;

    toUpdate.forEach((oneToUpdate) => {
        const name = oneToUpdate.classList[1];
        animationSteps.push({
            name, color,
            start: round(dur),
            end: round(fin),
        });

        console.log('', index, '    Start:', round(dur), '    ', 'End:', round(fin));
    });

    onComplete();
    // setTimeout(onComplete, delay + DURATION);
}