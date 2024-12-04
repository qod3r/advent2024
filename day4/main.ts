const text = await Deno.readTextFile('input.txt');
const texts = text.split('\n');

function part1() {
  const SEQUENCE = ['X', 'M', 'A', 'S'];

  const DIRECTIONS = [
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
    [-1, -1],
    [-1, 0],
    [-1, 1],
  ];

  const matrix = texts.map((t) => t.split(''));
  // matrix.forEach((r) => {
  //   console.log(r.join(''));
  // });

  const mask = matrix.map((r) => Array(r.length).fill(false));

  let counter = 0;
  matrix.forEach((r, i) => {
    r.forEach((c, j) => {
      if (c == SEQUENCE[0]) {
        for (const direction of DIRECTIONS) {
          if (traverse(i, j, 0, direction)) {
            counter += 1;
            // console.log(i, j, direction, traverse(i, j, 0, direction))
          }
        }
      }
    });
  });
  console.log('result:', counter);
  matrix.forEach((r, i) => {
    console.log(r.map((char, j) => (mask[i][j] ? char : '.')).join(''));
  });

  function check(nc: [number, number], currIdx: number) {
    if (!matrix[nc[0]] || !matrix[nc[0]][nc[1]]) return false;
    if (matrix[nc[0]][nc[1]] == SEQUENCE[currIdx + 1]) {
      return true;
    } else {
      return false;
    }
  }

  function traverse(
    i: number,
    j: number,
    currIdx: number,
    direction: number[]
  ): boolean {
    if (currIdx == SEQUENCE.length - 1) {
      mask[i][j] = true;
      return true;
    }

    const nc: [number, number] = [i + direction[0], j + direction[1]];
    if (check(nc, currIdx)) {
      const res = traverse(nc[0], nc[1], currIdx + 1, direction);
      if (res) {
        mask[i][j] = true;
      }
      return res;
    } else {
      return false;
    }
  }
}

function part2() {
  const matrix = texts.map((t) => t.split(''));
  const mask = matrix.map((r) => Array(r.length).fill(false));

  function check(nc: [number, number], char: string) {
    if (!matrix[nc[0]] || !matrix[nc[0]][nc[1]]) return false;
    if (matrix[nc[0]][nc[1]] == char) {
      return true;
    } else {
      return false;
    }
  }

  function mark(nc: [number, number]) {
    mask[nc[0]][nc[1]] = true
  }

  let counter = 0
  // жижа
  matrix.forEach((r, i) => {
    r.forEach((c, j) => {
      if (c != 'A') return
      if (
        (check([i + 1, j + 1], 'S') && // M . M
         check([i + 1, j - 1], 'S') && // . A .
         check([i - 1, j + 1], 'M') && // S . S
         check([i - 1, j - 1], 'M'))
        || 
        (check([i + 1, j + 1], 'M') && // S . M
         check([i + 1, j - 1], 'S') && // . A .
         check([i - 1, j + 1], 'M') && // S . M
         check([i - 1, j - 1], 'S'))
        ||
        (check([i + 1, j + 1], 'M') && // S . S
         check([i + 1, j - 1], 'M') && // . A .
         check([i - 1, j + 1], 'S') && // M . M
         check([i - 1, j - 1], 'S'))
        ||
        (check([i + 1, j + 1], 'S') && // M . S
         check([i + 1, j - 1], 'M') && // . A .
         check([i - 1, j + 1], 'S') && // M . S
         check([i - 1, j - 1], 'M'))
      ) {
        counter += 1

        mark([i + 1, j + 1])
        mark([i + 1, j - 1])
        mark([i - 1, j + 1])
        mark([i - 1, j - 1])
        mark([i, j])
      }
    });
  });

  console.log('result:', counter)
  matrix.forEach((r, i) => {
    console.log(r.map((char, j) => (mask[i][j] ? char : '.')).join(''));
  });
}

// part1();
part2();
