
const adminAuth = (req, res, next) => {
    if(req.session.user && req.session.admin){
        next();
    }else{
        res.render('404.ejs', {
            url: req.url
        });
    }
};

module.exports = {adminAuth};