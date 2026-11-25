// E2 (Lecture 2): array methods, destructuring, closures. No for loops!

export const averageBy = (records, key) => {
  // TODO: { AWP: 8.33, DB: 7.33, SE: 8.5 } for key "course"
  //       use reduce, round to 2 decimals
};

export const topN = (records, n = 3) => {
  // TODO: [ 'Era Leka (9.67)', 'Ana Hoxha (8.5)' ] for n = 2
  //       reuse averageBy, then toSorted + slice + map
};

export const coursesOf = (records, student) => {
  // TODO: unique course names of one student, sorted (use a Set)
};

export const failing = (records, { min = 5 } = {}) => {
  // TODO: [ 'Dea Muka - DB' ]  grade <= min, destructure in the callbacks
};

export function makeIdGenerator(prefix, start = 1) {
  // TODO: return a function: "ORD-001", "ORD-002", ...
}
