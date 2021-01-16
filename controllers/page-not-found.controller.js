module.exports = (req, res, next) => {
    res.status(404).render('page-not-found' , {docTitle : "404 :: Not Found" , path : "/not-found"})
};