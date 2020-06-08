import namor from "namor";
const moment = require("moment"); // require

const range = (len) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

// Manipulate here only for fake data object
const generateFlight = () => {
  // Aircraft Reg Probability
  const acRegChance = Math.random();
  // Random date generator
  function randomDate(start, end) {
    const genDate = new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
    return moment(genDate).format(); // String format: ISO 8601
  }

  return {
    id: namor.generate({ words: 0, numbers: 0, saltLength: 10 }),
    flightNo: namor
      .generate({ words: 0, numbers: 0, saltLength: 5 })
      .toUpperCase(),
    acReg:
      acRegChance > 0.66 ? "9M-SBO" : acRegChance > 0.33 ? "9M-SBA" : "9M-SBM",
    dateTime: randomDate(new Date(2020, 0, 1), new Date()),
    from: namor.generate({
      words: 2,
      numbers: 0,
      saltLength: 0,
      separator: " ",
    }),
    to: namor.generate({
      words: 2,
      numbers: 0,
      saltLength: 0,
      separator: " ",
    }),
    company: namor.generate({
      words: 1,
      numbers: 0,
      saltLength: 0,
    }),
  };
};

export default function makeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth];
    return range(len).map((d) => {
      return {
        ...generateFlight(),
        // subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      };
    });
  };

  return makeDataLevel();
}
