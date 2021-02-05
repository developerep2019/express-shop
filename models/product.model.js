const Cart = require('./cart.model');
const db = require('../utilities/database');
const { static } = require('express');


module.exports = class Product {
    constructor(id, title, imageUrl, description, price) {
        this.id = id;
        this.title = title;
        this.imgUrl = imageUrl;
        this.description = description;
        this.price = price;

    };
    save() {
        return db.execute('INSERT INTO products (title, price, description, imgUrl) VALUES (?,?,?,?)', 
        [this.title , this.price, this.description , this.imgUrl]);
    };
    static deleteById(id) {

    }
    static fetchAll() {
        return db.execute('SELECT * FROM products')
    };

    //For getting a single product with product id
    static findById(id) {
        return db.execute('SELECT * FROM products WHERE products.id = ?' , [id]);
    }
};