import namor from "namor";

const range = (len) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

// Randomise year only
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

// Manipulate here only for fake data object
const newFlight = () => {
  // Aircraft Reg Probability
  const acRegChance = Math.random();
  // Random dates
  const day = Math.floor(Math.random() * 30);
  const month = Math.floor(Math.random() * 12);
  const year = Math.floor(getRandomArbitrary(0.999, 1) * 2022);
  // Random times
  const hour = Math.floor(Math.random() * 23);
  const minute = Math.floor(Math.random() * 59);

  return {
    id: namor.generate({ words: 0, numbers: 0, saltLength: 10 }),
    flightNo: namor
      .generate({ words: 0, numbers: 0, saltLength: 5 })
      .toUpperCase(),
    acReg:
      acRegChance > 0.66 ? "9M-SBO" : acRegChance > 0.33 ? "9M-SBA" : "9M-SBM",
    date: `${day}-${month}-${year}`,
    time: `${hour}:${minute}`,
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
        ...newFlight(),
        // subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      };
    });
  };

  return makeDataLevel();
}
