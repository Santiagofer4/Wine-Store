const server = require("express").Router();
const { User } = require("../db.js");
const jwt = require("jsonwebtoken");


// Ruta ME

server.get("/me", async (req, res, next) => {
    try {
      if (req.user) {
        const { id } = req.user;
        const result = await User.findByPk(id);
        res.json(result);
      } else res.sendStatus(401);
    } catch (error) {
      next(error);
    }
  });

  // Ruta para desloguearse (Habría que probarla a ver si anda)

  server.get("/logout",(req,res)=>{
    req.logout();
    res.redirect('/');
   })

//Ruta para Registrarse

  server.post("/register", async function (req, res, next) {
    try {
      const user = await User.create(req.body);
      const { id, firstName, lastName, email, birthdate, cellphone, role, password } = user;
      return res.send(
        jwt.sign(
          {
            id,
            firstName, 
            lastName, 
            email, 
            birthdate, 
            cellphone, 
            role, 
            password
          },
          "secret word"
        )
      );
    } catch (error) {
      res.sendStatus(500).send(error);
    }
  });

//Ruta para Loguearse

  server.post("/login", async function (req, res, next) {
    const {password, email} = req.body
    if (!password || !email) { res.sendStatus(400).send('Tienes que ingresar Email y Password') }
    try {
      User.findOne({
        where: {email}
      }).then (correctUser => {
        const prueba = correctUser.compare(password)
       // console.log(prueba)
       if (correctUser.compare(password)) {
         res.send({
           firstName: correctUser.firstName, 
           lastName: correctUser.lastName , 
           id: correctUser.id,       
           email: correctUser.email,      
          }) // en el front, si recibe 200, guardar el user en el Store.
       } else {
         res.sendStatus(401) // si recibe 401, rechazar la conexión???
       }
      }) 
    }
    catch (error) {
      res.send(error);
    }
  });


  // Hacer admin a un user (promote User)

  server.put('/:id', (req, res) => {
    let { id } = req.params;
    if (!id) return res.status(400).send('El usuario no existe');
  
    User.findByPk(id)
      .then(
        User.update(
          { isAdmin: true },
          { where: { id } }
        )
      )
      .then(() => {
        return res.status(200).send('Se ha modificado el usuario');
      });
  });
  
 

module.exports = server;