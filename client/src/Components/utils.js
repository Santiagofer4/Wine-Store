const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const formatArrayToOption = (array, propName) =>{
console.log('utils',array)
  return Array.isArray(array) && array.length >0
    ? array.map((element) => {
        if (typeof element === 'object') {
          return {
            label: capitalize(element[propName]),
            value: element[propName],
          };
        } else {
          return {
            label: capitalize(element),
            value: element,
          };
        }
      })
    : null;}


// export const makeInitialValues = (labels, edit, reset) => {
//   //* Recibe un array de `labels` y devuelve un objeto.
//   //* Si recibe edit como parametro (debe ser un array), el objeto devuelto, contiene los
//   if (typeof labels === 'undefined' || !Array.isArray(labels)) return null;
//   typeof edit === 'undefined' || !Array.isArray(edit) ? (edit = false) : edit;
//   typeof reset === 'undefined' ? (reset = false) : true;
//   labels.map(label);
// };
