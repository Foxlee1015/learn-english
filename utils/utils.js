export const randomProperty = (obj) => {
  const keys = Object.keys(obj);
  const randomIndex = (keys.length * Math.random()) << 0;
  return keys[randomIndex];
};

export const randomElement = (array) => {
  array[Math.floor(Math.random() * array.length)];
  return array;
};

export const replaceText = (srcText, target, replaceTo) => {
  return srcText.replace(target, replaceTo);
};
