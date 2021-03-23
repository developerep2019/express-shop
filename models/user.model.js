const getDb = require('../utilities/database').getDb;
const { ObjectId } = require('bson');

class User {
    constructor(username, email, cart, id) {
        this.name = username;
        this.email = email;
        this.cart = cart; // {items : []}
        this._id = id;
    }
    save() {
        const db = getDb();
        db.collection('users').insertOne(this)
    }
    static findById(userId) {
        const db = getDb();
        return db.collection('users')
            .findOne({ _id: new ObjectId(userId) })
            .then(user => {
                console.log(user)
                return user;
            })
            .catch(err => console.log(err))
    }

    addToCart(product) {
        // const cartProduct = this.cart.items.findIndex(cp => cp._id === product._id);
        const updatedCart = { items: [{ ...product, quantity: 1 }] };
        const db = getDb();
        return db
            .collection('users')
            .updateOne(
                { _id: new ObjectId(this._id) },
                { $set: { cart: updatedCart } }
            );
    }
};


module.exports = User;