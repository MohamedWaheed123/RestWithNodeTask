const express=require('express');
function routes(Product){
    const productsRouter=express.Router();
    productsRouter.route('/products').post((req, res) => {

        const product = new Product(req.body);
        console.log(product);
        product.save();
        return res.status(201).json(product);
      
      }).get((req, res) => {
        const query={};
        if(req.query.cat_id){
          query.cat_id=req.query.cat_id;
        }
        Product.find(query,(err, products) => {
          if (err) {
            return res.send(err);
          }
      
          return res.json(products);
      
        })
      
      });
      
      productsRouter.use('/products/:productId',(req,res,next)=>{
        Product.findById(req.params.productId,(err, product) => {
            if (err) {
              return res.send(err);
            }
        if(product)
        {
            req.product=product;
            return next(); 
        }
            return res.sendStatus(404) ;
        
          })   
      })
      productsRouter.route('/products/:productId').get((req, res) => res.json(req.product))
      .put((req,res)=>{ 
       const {product}=req;
            product.name=req.body.name;
            product.price=req.body.price;
            product.quantity=req.body.quantity;
            product.image=req.body.image;
            product.cat_id=req.body.cat_id;
            req.product.save((err)=>{
                if(err){
                    return res.send(err);
                }
                return res.json(product);
            })
        
          }).patch((req,res)=>{
const {product}=req;
if(req.body._id){
    delete req.body._id;
}
Object.entries(req.body).forEach((item)=>{
    const key=item[0];
    const value=item[1];
    product[key]=value;
})
req.product.save((err)=>{
    if(err){
        return res.send(err);
    }
    return res.json(product);
})

          }).delete((req,res)=>{
            req.product.remove((err)=>{
                if(err){ 
                    return res.send(err);
                }
                return res.sendStatus(204);
            })
          });
    
      return productsRouter;
}
module.exports=routes;