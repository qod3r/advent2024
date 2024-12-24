const text = await Deno.readTextFile("input.txt");
// const text = await Deno.readTextFile("example.txt");

let [rules, pages] = text.split("\n\n");

rules = rules.split("\n").map((s) => s.split("|").map(Number));
pages = pages.split("\n").map((s) => s.split(",").map(Number));

const ruleMap: { number: number } = {};
rules.forEach((rule: [number, number]) => {
    if (!ruleMap[rule[0]]) {
        ruleMap[rule[0]] = [rule[1]];
    } else {
        ruleMap[rule[0]].push(rule[1]);
    }
});

for (const key of Object.keys(ruleMap)) {
    ruleMap[key].sort((a, b) => a - b);
}

const correct = []
const incorrect = []
pages.forEach((row: number[], i) => {
    for (const key of Object.keys(ruleMap)) {
        const idx = row.findIndex((v) => v === +key);
        if (idx != -1) {
            const keyCorrect = row.slice(0, idx).every((n) => !ruleMap[key].includes(n))
            if (!keyCorrect)    {
                incorrect.push(row)
                return // console.log(row, idx, key, ruleMap[key]);
            }
        } else {
            continue;
        }
    }
    correct.push(row)
});

console.log("part 1", correct.reduce((acc, val) => {
    return acc + val[val.length / 2 | 0]
}, 0))

function swap(arr: number[], ia: number, ib: number) {
    [arr[ia], arr[ib]] = [arr[ib], arr[ia]]
}

incorrect.forEach((row: number[]) => {
    for (let i = 1; i < row.length; i++) {
        const rule = ruleMap[row[i]]
        if (!rule) continue
        
        for (let j = 0; j < i; j++) {
            if (rule.includes(row[j])) {
                // console.log(row)
                // console.log('swapping', i, j)
                swap(row, i, j)
                // console.log(row)
                i = 1
                j = 0
            }
        }
    }
})

console.log("part 2", incorrect.reduce((acc, val) => {
    return acc + val[val.length / 2 | 0]
}, 0))