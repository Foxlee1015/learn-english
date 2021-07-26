export const randomProperty = (obj) => {
  const keys = Object.keys(obj);
  const randomIndex = (keys.length * Math.random()) << 0;
  return keys[randomIndex];
};

export const randomElement = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

export const replaceText = (srcText, target, replaceTo) => {
  return srcText.replace(target, replaceTo);
};

export const randomArrayShuffle = (array) => {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};
