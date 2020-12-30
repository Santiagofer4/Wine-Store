const extractDigitsFromString = (str) => {
  //* func que recibe la string del search input y devuelve un objeto
  //* que contiene un array de palabras y un array de numeros
  //* str<String> => <{digits:null|[...],words:null|[...]}>
  if (typeof str !== 'string') return null;
  let words, digits;
  let search = {
    digits: null,
    words: null,
  };
  const digitPattern = /(\d+)/g;
  const letterPattern = /(\D+)/g;

  digits = str.match(digitPattern, str);
  if (digits) {
    search.digits = digits.map((number) => Number(number));
  }

  words = str.match(letterPattern, '');
  if (words) {
    search.words = words
      .map((word) => {
        let w = word.trim();
        if (w.length > 0) return w;
      })
      .filter((word) => !!word);
  }

  return search;
};

exports.extractDigitsFromString = extractDigitsFromString;
