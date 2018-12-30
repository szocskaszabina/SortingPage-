const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const controller = require('../controller/itemcontroller');

const schema = new Schema(
    {   
      
      name: String,
      type: String,
      gender: String,
      color: Array,
      price: Number,
      available: String,
      size: Array,
      description: String,
      image: String,
      gallery: Array
    }
);

const Item = mongoose.model('Item', schema);

function getConnection() {
  mongoose.connect(
      'mongodb://<dbuser>:<dbpassword>@ds123224.mlab.com:23224/clothes-teszt',
      {useNewUrlParser: true}
  );

  const db = mongoose.connection;

  db.on('error', (err) => {
    console.log("Hiba: ", err);
  });

  return db;
};

function save(item) {
    const db = getConnection();
    return new Item(item)
    .save()
    .then((saved) => {
        db.close();
        
        return new controller.SavedItem(
            saved._id,
            saved.name,
            saved.type,
            saved.gender,
            saved.color,
            saved.price,
            saved.available,
            saved.size,
            saved.description,
            saved.image,
            saved.gallery
        )
        
    })
    
};

function list() {
    const db = getConnection();
    return Item.find()
    .then((items) => {
        db.close();
        console.log(items);
        return items.map((item) => {
            return new controller.SavedItem(
            item._id,
            item.name,
            item.type,
            item.gender,
            item.color,
            item.price,
            item.available,
            item.size,
            item.description,
            item.image,
            item.gallery
            
            
            )
        })
    })    
};

function details(id) {
    const db = getConnection();
   return Item.findById(id)
    .then((result) => {
        
        db.close();
    
        return result
    })
    
}


function update(id, options) {
    
    const db = getConnection();
    return Item.findOneAndUpdate({_id: id}, {$set: options})
    .then((updated) => {
        db.close();
        
        return new controller.SavedItem(
        updated._id,
            options.name,
            options.type,
            options.gender,
            options.color,
            options.price,
            options.available,
            options.size,
            options.description,
            options.image,
            options.gallery
        
        
        )
    })
    
    
};

function del (id) {
    const db = getConnection();
    return Item.findOneAndDelete({_id: id})
    .then((result) => {
        db.close();
        return result._id
        
    })
    
}


module.exports = {
    save : save,
    list: list,
    update: update,
    del: del,
    details: details
}