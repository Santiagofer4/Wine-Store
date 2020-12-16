const server = require('express').Router();
const { User, Order, OrderList } = require('../db.js');
//const cartRouter = require('./cart.js');

//server.use('/:id/cart', cartRouter);

// Listar todos los USERS

server.get('/', (req, res, next) => {
    console.log('GET a USERS');
  
    User.findAll()
    .then((user) => {
     return res.status(200).send(user);
    })
    .catch(next);
  });

  //Agregar un USER

  server.post('/', (req, res, next) => {
    let { firstName, lastName, email, birthdate, cellphone, role, password  } = req.body;

    console.log('Creo o modifico USER');

    if(!email) return res.status(400);

    User.findOrCreate({
        where: {
          email,
        },
        defaults: {
            firstName, 
            lastName, 
            email, 
            birthdate, 
            cellphone, 
            role, 
            password
        },
      }).then((user) => {
        return res.status(200).send(`El usuario ha sido creado`);
      })
      .catch((err)=>{
       return  console.log(err)
      })
    
  });

//Editar un USER by ID

  server.put('/:id', (req, res) => {
    let { id } = req.params;
    let { firstName, lastName, email, birthdate, cellphone, role, password  } = req.body;
    let oldInfo;
  
    console.log('modifico USER');
    if (!id) return res.status(400).send('El usuario no existe');
  
    User.findByPk(id).then (User.update( {firstName, lastName, email, birthdate, cellphone, role, password}, { where: { id } })
    ).then(() => {
     return res.status(200).send('Se ha modificado el usuario');
      }); 

    })
 
//Borrar un USER by ID

    server.delete('/:id', (req, res) => {
        let { id } = req.params;
      
        console.log('voy a eliminar un usuario');
      
        if(!id) return res.status(400).send('No se encontró el usuario a eliminar');

        User.destroy({
            where: {
              id,
            },
          }).then(() => {
            console.log('destroy OK');
            return res.status(200).send(`Usuario ${id} borrado`);
          });
       
      });

      server.get('/:id/orders', (req,res)=>{
        const {id}=req.params;
          Order.findAll({
            where:{ userId : id}
          })
          .then((list)=>{
            res.json(list)
          })
          .catch(err =>{
            console.log(err)
          })
      })

      server.get('/:id/cart', (req, res) => {
        console.log('GET a CART');
       // res.status(200).send("Entré al carrito");
         Order.findAll({
             where: {status: 'cart'}
         }).then(order => {
            return res.status(200).send(order)
            //! Falta hacer que devuelva TODOS los productos de la orden
         })
     
      });


      server.post('/:id/cart', (req, res) => {
        let { id } = req.params;
        let { productId, quantity, price } = req.body
        let fullOrder;
       // console.log('ID', id, productId)
  
           if (!productId || !id)
           return res.status(400).send('No se puede agregar el producto al carrito');

           /*               ORDER LIST                                ORDER
PK     orderId    productId   quantity  price         PK     userId    total    status
1         1           3           2       22           1        4        65       cart 
2         1           4           1       21           2        1        21       cart
3         2           3           2       20                                          */
  
        Order.findAll({
           where: { userId: id, status: "cart" } 
        }).then(order => {
          fullOrder = order;
             OrderList.findOrCreate({
              where: {
                 productId: productId,
                 orderId : fullOrder.id              
              }, defaults : {
                  productId,
                  quantity,
                  price                  
              }
          }).then(() => {
             fullOrder.addOrder(order.id)
             console.log('instance', instance);
             console.log('wasCreated', wasCreated);
              // console.log('RESULT', result)
              // const [instance, wasCreated] = result;
          })
  
  
         
        })
        //con esta orden ir a buscar el orderId
      res.status(200).send("Entré a agregar item al carrito");
      
    })

module.exports = server