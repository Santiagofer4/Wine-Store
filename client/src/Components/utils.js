function THROW(msg) {
  throw new Error(msg);
}

const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const formatArrayToOption = (array, propName) => {
  const EMPTY_OPTION = [{ label: 'EMPTY', value: '' }];
  if (!Array.isArray(array) || !(array.length > 0)) return EMPTY_OPTION;

  const PROP_CHECK = ['name', 'value'];
  const TYPE = typeof array[0];
  let arrayKeys = [];
  let arrayIdProp = false;

  if (TYPE === 'object') {
    for (const prop in array[0]) {
      if (Object.hasOwnProperty.call(array[0], prop)) {
        let key = prop.toLowerCase();
        arrayKeys.push(key);
        if (key === 'id') {
          arrayIdProp = key;
        }
      }
    }
  }

  if (typeof propName === 'undefined') {
    propName = PROP_CHECK.find((prop) =>
      PROP_CHECK.includes(prop.toLowerCase())
    );
  }

  if (!arrayKeys.includes(propName)) {
    return EMPTY_OPTION;
  }

  try {
    switch (TYPE) {
      case 'string':
        return array.map((element) => {
          return {
            label: capitalize(element),
            value: element,
          };
        });
      case 'object':
        if (!!arrayIdProp) {
          return array.map((element) => {
            return {
              label: capitalize(element[propName]),
              value: element[arrayIdProp] || THROW('Objetos NO equivalentes'),
            };
          });
        } else {
          return array.map((element) => {
            return {
              label: capitalize(element[propName]),
              value: element[propName],
            };
          });
        }
      default:
        return EMPTY_OPTION;
    }
  } catch (error) {
    return EMPTY_OPTION;
  }
};

// export const makeInitialValues = (labels, edit, reset) => {
//   //* Recibe un array de `labels` y devuelve un objeto.
//   //* Si recibe edit como parametro (debe ser un array), el objeto devuelto, contiene los
//   if (typeof labels === 'undefined' || !Array.isArray(labels)) return null;
//   typeof edit === 'undefined' || !Array.isArray(edit) ? (edit = false) : edit;
//   typeof reset === 'undefined' ? (reset = false) : true;
//   labels.map(label);
// };
