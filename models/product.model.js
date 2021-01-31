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
    constructor(id, title, imageUrl, description, price) {
        this.id = id;
        this.title = title;
        this.imgUrl = imageUrl;
        this.description = description;
        this.price = price;

    };
    save() {
        getProductFromFile(products => {
            if (this.id) {
                const existingProductIndex = products.findIndex(prod => prod.id === this.id);
                const updatedProducts = [...products];
                updatedProducts[existingProductIndex] = this;
                fs.writeFile(p, JSON.stringify(updatedProducts), err => {
                    if (err) {
                        console.log(err)
                    }
                })
            } else {
                this.id = Math.random().toString();
                products.push(this);
                fs.writeFile(p, JSON.stringify(products), err => {
                    if (err) {
                        console.log(err)
                    }
                })
            }
        })
    };
    static deleteById(id) {
        getProductFromFile(products => {
          const updatedProducts = products.filter(prod => prod.id !== id);
          fs.writeFile(p, JSON.stringify(updatedProducts), err => {
            if (!err) {
              // Cart.deleteProduct(id, product.price);
            }
          });
        });
      }
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