const express=require('express');
function routes(Category){
    const categoriesRouter=express.Router();
    categoriesRouter.route('/categories').post((req, res) => {

        const category = new Category(req.body);
        category.save();
        return res.status(201).json(category);
      
      }).get((req, res) => {
        
        
        Category.find((err, categories) => {
          if (err) {
            return res.send(err);
          }
      
          return res.json(categories);
      
        })
      
      });
      return categoriesRouter;
    }
    module.exports=routes;