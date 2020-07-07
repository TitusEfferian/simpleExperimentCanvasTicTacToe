const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let totalMove = 0;

const fieldMap = ['', '', '', '', '', '', '', '', ''];

const drawO = (x, y) => {
    ctx.beginPath();
    ctx.arc(x + 30, y + 30, 30, 0, Math.PI * 2, false);
    ctx.stroke();
    ctx.closePath();
}

const drawX = (x, y) => {
    ctx.beginPath();
    ctx.moveTo(x, y);
    /**
     * dynamic cross pattern \
     */
    ctx.lineTo(x + 60, y + 60);
    ctx.stroke();
    ctx.closePath();
    /**
     * dynamic cross pattern /
     */
    ctx.beginPath();
    ctx.moveTo(x + 60, y);
    ctx.lineTo(x, y + 60);
    ctx.stroke();
    ctx.closePath();
}

const drawHandler = (x, y, zoneRegion) => {
    if (totalMove % 2 === 0) {
        fieldMap[zoneRegion] = 'x';
        drawX(x, y);
    } else {
        fieldMap[zoneRegion] = 'o';
        drawO(x, y);
    }
}

const gameOver = () => {
    return totalMove >= 9;
}

const horizontalCheckWinningCondition = (value) => {
    if (fieldMap[0] === value && fieldMap[1] === value && fieldMap[2] === value) {
        alert(`${value} win`)
    }
    if (fieldMap[3] === value && fieldMap[4] === value && fieldMap[5] === value) {
        alert(`${value} win`)
    }
    if (fieldMap[6] === value && fieldMap[7] === value && fieldMap[8] === value) {
        alert(`${value} win`)
    }
}

const verticalCheckWinningCondition = (value) => {
    if (fieldMap[0] === value && fieldMap[3] === value && fieldMap[6] === value) {
        alert(`${value} win`)
    }
    if (fieldMap[1] === value && fieldMap[4] === value && fieldMap[7] === value) {
        alert(`${value} win`)
    }
    if (fieldMap[2] === value && fieldMap[5] === value && fieldMap[8] === value) {
        alert(`${value} win`)
    }
}

const diagonalCHeckWinningCondition = (value) => {
    if (fieldMap[0] === value && fieldMap[4] === value && fieldMap[8] === value) {
        alert(`${value} win`)
    }
    if (fieldMap[2] === value && fieldMap[4] === value && fieldMap[8] === value) {
        alert(`${value} win`)
    }
}

const winningCondition = () => {
    horizontalCheckWinningCondition('x')
    horizontalCheckWinningCondition('o')
    verticalCheckWinningCondition('x')
    verticalCheckWinningCondition('o')
    diagonalCHeckWinningCondition('x');
    diagonalCHeckWinningCondition('o');
}

/**
 * draw | |
 */
for (let a = 1; a < canvas.clientWidth / 100; a++) {
    ctx.beginPath();
    ctx.moveTo(a * 100, 0);
    ctx.lineTo(a * 100, canvas.clientHeight);
    ctx.stroke();
    ctx.closePath();
}

/**
 * draw -
 *      _
 */
for (let a = 1; a < canvas.clientHeight / 100; a++) {
    ctx.beginPath();
    ctx.moveTo(0, a * 100);
    ctx.lineTo(canvas.clientWidth, a * 100);
    ctx.stroke();
    ctx.closePath();
}



const positionDrawer = (x, y) => {
    /**
     * boundary region
     * [
     *    [20,20],[120,20],[220,20],
     *    [20,120],[120,120],[220,120],
     *    [20,220],[120,220],[220,220],
     * ]
     */
    if (x >= 0 && x <= 100 && y >= 0 && y <= 100) {
        drawHandler(20, 20, 0);
    }
    if (x >= 100 && x <= 200 && y >= 0 && y <= 100) {
        drawHandler(120, 20, 1);
    }
    if (x >= 200 && x <= 300 && y >= 0 && y <= 100) {
        drawHandler(220, 20, 2);
    }
    if (x >= 0 && x <= 100 && y >= 100 && y <= 200) {
        drawHandler(20, 120, 3);
    }
    if (x >= 100 && x <= 200 && y >= 100 && y <= 200) {
        drawHandler(120, 120, 4);
    }
    if (x >= 200 && x <= 300 && y >= 100 && y <= 200) {
        drawHandler(220, 120, 5);
    }
    if (x >= 0 && x <= 100 && y >= 200 && y <= 300) {
        drawHandler(20, 220, 6);
    }
    if (x >= 100 && x <= 200 && y >= 200 && y <= 300) {
        drawHandler(120, 220, 7);
    }
    if (x >= 200 && x <= 300 && y >= 200 && y <= 300) {
        drawHandler(220, 220, 8);
    }
}

canvas.addEventListener('mouseenter', () => {
    canvas.style.cursor = 'pointer';
});

canvas.addEventListener('click', (event) => {
    const clientRect = canvas.getBoundingClientRect();
    const x = event.clientX - clientRect.left;
    const y = event.clientY - clientRect.top;
    if (gameOver()) {
        alert('game over')
    }
    else {
        positionDrawer(x, y);
    }
    winningCondition();
    totalMove++;
})

