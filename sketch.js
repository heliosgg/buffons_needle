let screenSize = { w: 1000, h: 580 };

let lineStep = Math.floor(50);
let numOfLines = Math.floor(screenSize.h / lineStep) + 1;

let needleLength = (lineStep / 4 ) * 4;
let prevNeedles = [];

let tickCount = 0;
let hitCount = 0;

function setup()
{
    createCanvas(screenSize.w, screenSize.h);
    frameRate(60);
}

function draw()
{
    background('LightGreen');
    stroke('FireBrick');

    for (let i = 0; i < numOfLines + 1; i++)
    {
        let curLine = i * lineStep;
        line(0, curLine, screenSize.w, curLine);
    }

    let needle = { x1: 0, y1: 0, x2: 0, y2: 0 };

    needle.x1 = getRandomInt(0, screenSize.w);
    needle.y1 = getRandomInt(0, numOfLines * lineStep);
    needle.x2 = needle.x1 + needleLength;
    needle.y2 = needle.y1;

    let rotated = rotateRadians(needle.x1, needle.y1, needle.x2, needle.y2, getRandomFloat(0, PI));
    needle.x2 = rotated[0];
    needle.y2 = rotated[1];

    prevNeedles.push(needle);
    if (prevNeedles.length > 30)
    {
        prevNeedles.shift();
    }

    stroke('purple');    
    prevNeedles.forEach(n => { line(n.x1, n.y1, n.x2, n.y2); });
    line(needle.x1, needle.y1, needle.x2, needle.y2);

    tickCount++;

    if(checkHit(needle, lineStep))
    {
        hitCount++;
    }

    let curProb = hitCount / tickCount;

    fill(255);
    textSize(16);
    text('Probability: ' + curProb.toFixed(10), 20, 30);
    text('Current PI: ' + ((2 * needleLength) / (curProb * lineStep)).toFixed(10), 20, 46);
}

function checkHit(needle, step)
{
    for (let i = myRound(needle.y2); i <= needle.y1; i++)
    {
        if (i % step == 0)
        {
            return true;
        }
    }

    return false;
}

// if |fraction| < 0.5 => to higher
// else to lower

function myRound(value)
{
    let fraction = Math.abs(value % 1);

    if (fraction < 0.5)
    {
        return Math.round(value);
    }
    else
    {
        if (value > 0)
        {
            return value + (1 - fraction);
        }
        else
        {
            return value - (1 - fraction);
        }
    }
}

function getRandomInt(min, max)
{
    min = Math.ceil(min);
    max = Math.floor(max);
    
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFloat(min, max)
{
    return highlightedNumber = Math.random() * (max - min) + min;
};


function rotateRadians(cx, cy, x, y, radians)
{
    let cos = Math.cos(radians),
        sin = Math.sin(radians),
        nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
        ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
    return [nx, ny];
}