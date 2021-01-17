import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allProductsCartSelector } from "../../../selectors";

export default function MercadoPago(props) {
  console.log("props", props);
  const orderDetails = useSelector(allProductsCartSelector);

  useEffect(() => {
    const script = document.createElement("script"); //Crea un elemento html script

    const attr_data_preference = document.createAttribute("data-preference-id"); //Crea un nodo atribute
    attr_data_preference.value = props.data.id; //Le asigna como valor el id que devuelve MP

    //Agrega atributos al elemento script
    script.src =
      "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
    script.setAttributeNode(attr_data_preference);

    //Agrega el script como nodo hijo del elemento form
    document.getElementById("form1").appendChild(script);
    return () => {
      //Elimina el script como nodo hijo del elemento form
      document.getElementById("form1").removeChild(script);
    };
  }, [props.data]);

  return (
    <div>
      <form id="form1">
        <h4>Checkout MercadoPago</h4>
        <div>
          {orderDetails.map((product, i) => {
            return (
              <div key={i}>
                <ul>
                  <li>{product.name}</li>
                  <li>{"$" + product.price}</li>
                  <li>{product.quantity}</li>
                </ul>
              </div>
            );
          })}
        </div>
      </form>
    </div>
  );
}
