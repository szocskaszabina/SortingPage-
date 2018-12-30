const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const controller = require('./controller/itemcontroller');
const repo = require('./repository/items');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: './uploads',
    filename: function(req, file, cb) {
        cb(null, new Date().toDateString() +' '+ file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(null, false)
    }
    
};



const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024*1024*5
    },
    fileFilter: fileFilter
    
});

var cpUpload = upload.fields([{ name: 'image', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])

app.use(express.static(path.join(__dirname, "public")));

app.use(express.static(path.join(__dirname, "uploads")));

app.use(express.static(path.join(__dirname, "views")));

app.post('/', (req,res) => {
    res.send(200)
});



app.post('/list', bodyParser.json(), cpUpload, (req,res) => {
    const gallery = req.files['gallery'].map((item) => item.filename);
    
    const itemToSave = new controller.Item(
        req.body['name'],
        req.body['type'],
        req.body['gender'],
        req.body['color'],
        Number(req.body['price']),
        req.body['available'],
        req.body['size'],
        req.body['description'],
        req.files.image[0].filename,
        gallery
        
        
    );
    
    
   try {
       
       
       new controller.Save(repo.save)
       .save(itemToSave)
       .then((result) => res.send(result))
       .catch((err) => {
        res.send({error: err.message}, 404)
    })
   } 
    catch (err) {
        res.send({error: err.message}, 404)
    }
    
});

app.get('/', (req, res) => {
    
    try {
        res.sendFile(path.join(__dirname, './public', 'index.html'));
    } catch (err) {
        res.send({error: err.message}, 404)
    }
})


app.get('/list', (req,res) => {
    try {
        
        new controller.GetList(repo.list)
        .renderResults()
        .then((results) => {
            console.log(results);
            res.send(results)
        })
        
        
    } catch (err) {
        
        res.send({error: err.message}, 404)
        
    }
    
    
});

app.set('view engine', 'ejs');

app.get('/:id', (req,res) =>{
    try {
        const id = req.params.id;
        
        new controller.GetItem(repo.details)
        .getDetails(id)
        .then((item) => {
            console.log(item)
            res.render('detailed-item', {item: item})
        })
        .catch((err) => res.send({error: err.message}, 404))
        
        
    }
    catch (err) {
        
        res.send({error: err.message}, 404)
        
    }   
    
})

app.put('/:id', bodyParser.json(), cpUpload, (req,res) => {
    
    try {
        const id = req.params.id;
        console.log(req.files)
        const gallery = req.files['gallery'].map((item) => item.filename);
        const item = {
        name: req.body['name'],
        type: req.body['type'],
        gender: req.body['gender'],
        color: req.body['color'],
        price: Number(req.body['price']),
        available:req.body['available'],
        size: req.body['size'],
        description: req.body['description'],
        image: req.files.image[0].filename,
        gallery: gallery};
        
        console.log(item);
        
        new controller.UpdateItem(repo.update)
        .update(id, item)
        .then((result) => {
            console.log(result);
            res.send(result)})
        .catch((err) => {
        res.send({error: err.message}, 404)
    })
        
        
    } catch (err) {
         res.send({error: err.message}, 404)
        
    }
    
});

app.delete('/:id', (req,res) => {
    const id = req.params.id;
    
    try {
        new controller.DeleteItem(repo.del)
        .delete(id)
        .then((result) => {
            console.log(result);
            res.send(result)})
        .catch((err) => {
        res.send({error: err.message}, 404)
    })
               }
    catch (err) {
    res.send({error: err.message}, 404)
                }
    
})







app.listen(80);