const mongoConnect = require('../utilities/database');

class ProductModel {
    constructor(title, price, description, imageUrl) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
    }


    save() {
        const db = mongoConnect.getDb();
        return db.collection('products')
            .insertOne(this)
            .then(result => {
                console.log(result)
            })
            .catch(err => {
                console.log(err)
            });
    }
}

// const ProductModel = sequelize.define('product', {
//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true
//     },
//     title: Sequelize.STRING,
//     price: {
//         type: Sequelize.DOUBLE,
//         allowNull: false
//     },
//     imgUrl: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     description: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
// });

module.exports = ProductModel;