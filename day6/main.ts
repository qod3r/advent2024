const text = await Deno.readTextFile("input.txt");
// const text = await Deno.readTextFile("example.txt");

const guardI = text.replaceAll("\n", "").indexOf("^");
const matrix = text.split("\n").map((t) => t.split(""));

const HEIGHT = matrix.length
const WIDTH = matrix[0].length
console.log(HEIGHT, WIDTH)

const MAX_TRIES = 1000;
const DIR = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
];
const GUARD = [
    "^",
    ">",
    "v",
    "<"
]

let dir = 0;
let STOP = false

let visitstep = 0;
let i = Math.floor(guardI / HEIGHT), j = guardI % WIDTH;

function nextDir() {
    dir = (dir + 1) % 4;
    matrix[i][j] = GUARD[dir]
}

function mark() {
    if (matrix[i][j] !== GUARD[dir]) visitstep++;
    else visitstep = 0;

    matrix[i][j] = "X";
}

function move() {
    const ii = i + DIR[dir][0];
    const jj = j + DIR[dir][1];
    if (ii >= HEIGHT || jj >= WIDTH || ii < 0 || jj < 0) {
        STOP = true
        matrix[i][j] = "X"
        return;
    }

    const next = matrix[ii][jj];
    if (next === "#") nextDir();
    else {
        i = ii, j = jj;
        matrix[i][j] = GUARD[dir]
    }
}

while (!STOP && (visitstep < MAX_TRIES)) {
    // console.clear()
    // console.log(visitstep)
    // matrix.forEach((r) => {
    //     console.log(r.join(""));
    // });
    
    mark()
    move()
    
    // await new Promise(resolve => setTimeout(resolve, 1000))
}

// console.clear()
matrix.forEach((r) => {
    console.log(r.join(""));
});
console.log("Part 1:", matrix.reduce((racc, row) => {
    return racc + row.join('').split("X").length - 1
}, 0))