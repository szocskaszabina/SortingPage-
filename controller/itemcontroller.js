class Item {
    constructor(name, type, gender, color, price, available, size, description, image, gallery){
        this.name = name;
        this.type = type;
        this.gender = gender;
        this.color = color;
        this.price = price;
        this.available = available;
        this.size = size;
        this.description = description;
        this.image = image;
        this.gallery = gallery
    }
};

class SavedItem {
    constructor(id, name, type, gender, color, price, available, size, description, image, gallery){
        this.id = id,
        this.name = name;
        this.type = type;
        this.gender = gender;
        this.color = color;
        this.price = price;
        this.available = available;
        this.size = size;
        this.description = description;
        this.image = image;
        this.gallery = gallery
    }
};

const possibleTypes = ['coat', 'jeans', 'shirt'];


class SaveValidation  {
    constructor(saver) {
    this.saver = saver;
  }
    save(item) {
        
        if (!this.isTypeValid(item.type)) {
            throw new Error('invalid type');
        };
        
        if (item.gender !== "women" && item.gender !== "men") {
            throw new Error('invalid gender');
        }
        if (item.available !== "true" && item.available !== "false") {
            throw new Error('Availability information is required!');
        }
        
        if (typeof item.price !== "number") {
            throw new Error('Price is not a number!');
        }
        
        
        return this.saver(item)
    }
    
    isTypeValid(type) {
        
        return possibleTypes.includes(type)
    } 
    
};

class GetList {
  constructor(lister) {
    this.lister = lister;
  }

  renderResults() {
    return this.lister()
        .then(items => {
          return items.map(item =>  {
              return {
              id: item.id,
              name: item.name,
              type: item.type,
              gender: item.gender,
              color: item.color,
              price: item.price,
              available: item.available,
              size: item.size,
              image: item.image}
              
          });
        })
  }
};

class GetItem {
    constructor (finder) {
        this.finder = finder;
    }
    getDetails(id) {
    return this.finder(id)
    
  }
    
    
    
};

class UpdateItem {
    constructor(updater) {
        this.updater = updater;
    }
    update(id, options) {
        if (!this.isTypeValid(options.type)) {
            throw new Error('invalid type');
        };
        if (!this.isSizeValid(options.size)) {
            throw new Error('invalid size');
        };
        
        if (options.gender !== "women" && options.gender !== "men") {
            throw new Error('invalid gender');
        }
        if (options.available !== "true" && options.available !== "false") {
            throw new Error('Availability information is required!');
        }
        
        if (typeof options.price !== "number") {
            throw new Error('Price is not a number!');
        }
        
        
        return this.updater(id, options)
    }
    
    isTypeValid(type) {
        
        return possibleTypes.includes(type)
    } 

        
        
                
    } ;

class DeleteItem {
    constructor(deleter) {
        this.deleter = deleter;
    }
    
    delete(id) {
        return this.deleter(id)
        
    }
    
    
    
    
    
    
}
    
    


module.exports = {
    Item: Item,
    Save: SaveValidation,
    SavedItem: SavedItem,
    GetList: GetList,
    UpdateItem: UpdateItem,
    DeleteItem: DeleteItem,
    GetItem: GetItem
    
}
