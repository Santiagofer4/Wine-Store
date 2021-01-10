import tokenManager from './tokenManager';
import { persistUserLogin } from '../../slices/userSlice';
import store from '../../store';

function THROW(msg) {
  throw new Error(msg);
}

const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const formatArrayToOption = (array, propName) => {
  //*func que devuelve un array preparado para ser usado como `options` de un select/radio field
  //* => [{label:`propName|PROP_CHECK`,value:`ID`},...]
  //* recibe 2 parametros, siendo el segundo opcional:
  //* array<array|object> puede ser un objeto o un array de objetos
  //* propName?<string> si es pasado como parametro, se utiliza como parametros para buscar,
  //* si no, se utilizan los valores `default` de `PROP_CHECK`
  //! Asume que todos los objetos dentro del array son de la misma estructura
  //! en caso de error devuelve `EMPTY_OPTION`
  const EMPTY_OPTION = [{ label: 'EMPTY', value: '' }];

  if (!Array.isArray(array) || !(array.length > 0)) return EMPTY_OPTION;

  const PROP_CHECK = ['name', 'value'];
  const TYPE = typeof array[0];
  let arrayKeys = [];
  let arrayIdProp = false;

  //*si recibe un objeto armamos un array con todas las propiedades propias del obj,
  //* y verificamos si existe una con nombre `id`
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

  //*si NO recibe segundo parametro verificamos contra la lista `default` de `PROP_CHECK`
  if (typeof propName === 'undefined') {
    propName = PROP_CHECK.find((prop) =>
      PROP_CHECK.includes(prop.toLowerCase())
    );
  }

  //* Si se recibe `propName` y no se encuentra ninguna propiedad con ese nombre se devuelve `EMPTY_OPTION`
  if (!arrayKeys.includes(propName)) {
    return EMPTY_OPTION;
  }

  try {
    //* segun de que este compuesto el array:
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

export function sliceTime(str) {
  return str.slice(8, 10) + '/' + str.slice(5, 7) + '/' + str.slice(0, 4);
}

export const total = (arr) => {
  let x = 0;
  arr.forEach((p) => {
    x = x + p.price * p.quantity;
  });
  return x;
};

export const search = (id, array) => {
  let index = array.findIndex((e) => id === e.productId);
  return index === -1 ? true : false;
};

export const isLogged = () => {
  let token = tokenManager.getToken();
  let refresh_token;
  if (!token) {
    const persistLogin = async () => {
      refresh_token = await tokenManager.getRefreshedToken();
      const { user } = refresh_token;
      store.dispatch(persistUserLogin(user));
    };
    persistLogin();
    return refresh_token ? true : false;
  }
  return token;
};

export const average = (array) => {
  for (let i = 0, total = 0; i <= array.length; i++) {
    total = total + array[i].points;
    return total / array.length;
  }
};

export const functionCartGuest = (payload, decrement, erase) => {
  console.log('DECREMENT', decrement);
  let storageSTRG = localStorage.getItem('cart');
  if (storageSTRG) {
    let storage = JSON.parse(storageSTRG);

    let index = storage.findIndex((product) => product.id === payload.id);

    if (decrement) {
      // decrement es true cuando se envía desde el botón (-)
      console.log('ENTRÉ A DECREMENT', storage[index].quantity);
      storage[index].quantity--;
    } else if (!erase) {
      if (index === -1) {
        // para aumentar o agregar
        storage.push(payload);
      } else {
        storage[index].quantity++;
      }
    } else if (erase) {
      // Elimino el producto. MANDAR SOLO EL ID por payload
      storage = storage.filter((product) => product.id !== payload);
      localStorage.removeItem('cart');
      localStorage.setItem('cart', JSON.stringify(storage));
    }
    localStorage.setItem('cart', JSON.stringify(storage));
  } else {
    localStorage.setItem('cart', JSON.stringify([payload]));
  }
};
