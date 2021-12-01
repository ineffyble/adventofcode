import fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf-8');

const measurements = input.split("\n").map(i => parseInt(i));

const part1 = measurements.reduce((data, measurement) => {
  if (data.last && (measurement > data.last)) {
    data.increases++;
  }
  return {
    last: measurement,
    increases: data.increases
  }
}, { last: null, increases: 0 });

console.log(`Part 1 Answer: ${part1.increases}`);

const add = arr => arr.reduce((total, num) => total + num, 0);

const part2 = measurements.reduce((data, measurement) => {
  const window = [measurement, ...data.previous.slice(0,2)];
  const prevWindow = data.previous.slice(0, 3);
  if (window.length === 3 && prevWindow.length === 3) {
    if (add(window) > add(prevWindow)) {
      data.increases++;
    }
  }
  return {
    previous: [measurement, ...data.previous],
    increases: data.increases
  }
}, { previous: [], increases: 0 });

console.log(`Part 2 Answer: ${part2.increases}`);
