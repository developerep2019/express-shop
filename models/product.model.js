const fs = require('fs');
const path = require('path');

const p = path.join(process.mainModule.path, 'data', 'products.json');

const getProductFromFile = (cb) => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            console.log(err)
        } else {
            cb(JSON.parse(fileContent));
        }
    })
}

module.exports = class Product {
    constructor(title, imageUrl, description, price) {
        this.title = title;
        this.imgUrl = imageUrl;
        this.description = description;
        this.price = price;

    };
    save() {
        this.id = Math.random().toString();
        fs.readFile(p, (err, fileContent) => {
            let products = [];
            if (!err) {
                products = JSON.parse(fileContent);
            }
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), err => {
                if (err) {
                    console.log(err)
                }
            })
        })

    };
    static fetchAll(cb) {
        getProductFromFile(cb)
    };

    //For getting a single product with product id
    static findById(id, cb) {
       getProductFromFile(products => {
           const singleProduct = products.find(p => p.id === id);
           cb(singleProduct)
       })
    }
};