"# SortingPage-" 

This is a web app that was built for my own purposes, to practice my NodeJs, Epress, npm packages, MongoDb, and Javascript skills. 
With this you can store your webshop items ,for example, in a MongoDB database. I used Postman to create, update and delete items of this collection. Obviously, it does not work with a valid MongoDB user, password, and collection.
The index.js file contains the settings of the Express package and multer. I used multer package to handle file uploads, with which you can upload image and gallery files.
The controller/controller.js contains some business logic and input validation. After that the provided datas are given to the repository/items.js file which contains the mongoose package settings. Finally, the result will be handled by the index.js file.
The client has access only to the "READ" operations. A list of items is provided via an AJAX request, which can be sorted and filtered according to some viewpoints. The client can also get the unique properties of a selected item.
Please note, that designing the project was not a main priority. :)

