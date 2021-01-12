import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress, Container, Button } from "@material-ui/core";
import { Formik, Form } from "formik";
import FormField from "../../FormComponents/FormField";
import { formatArrayToOption } from "../../utils/index";
import { userSelector, userStatusSelector, userOrdersSelector } from "../../../selectors/index";
import { userPromote, allUsers } from "../../../slices/userSlice";

function PromoteUser() {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const userStatus = useSelector(userStatusSelector);
  const users = useSelector(userOrdersSelector);
  const [usersOption, setUsersOption] = useState([]);

  const handleSubmit = (values, onSubmitProps) => {
    let user = values.usersToPromote;
    dispatch(userPromote({ user, formik: onSubmitProps }));
  };

  const initialValues = {
    usersToPromote: "",
  };

  let content;

  useEffect(() => {
    dispatch(allUsers());
    console.log('USER', user)
    console.log('USERS STATUS', userStatus)
    console.log('USERS', users)
    if (userStatus === "succeded") {
        console.log('USERS 2', users)
        setUsersOption(formatArrayToOption(users, 'firstName'));
    }
    /*     if (userStatus === "succeded") {
      alert("El usuario ha sido promovido a Admin");
    } */
  }, []);

  if (userStatus === "loading") {
    //* si loading renderizamos `Cargando...`
    content = (
      <>
        <h2>Cargando....</h2>
        <CircularProgress />
      </>
    );
  } else if (userStatus === "succeded") {
    //* Si success renderizamos un dropdown con todas las categorias
    content = (
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {(formik) => (
          <Container>
            <Form>
              <FormField
                fieldType="select"
                label="Listado de usuarios"
                name="usersToPromote"
                options={usersOption}
                required
              />

              <br></br>
              <Container>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={!formik.isValid}
                  type="submit"
                >
                  Promover
                </Button>
              </Container>
            </Form>
          </Container>
        )}
      </Formik>
    );
  }

  return <>{content}</>;
}

export default PromoteUser;
