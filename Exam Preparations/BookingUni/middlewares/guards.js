function hasUser() {
    return (req, res, next) => {
        if(req.user) {
            next();
        } else {
            res.redirect('/login');
        };
    };
}

function isGuest() {
    return (req, res, next) => {
        if(req.user) {
            res.redirect('/'); // TODO check assignment for correct redirect
        } else {
            next();
        };
    };
}

module.exports = {
    hasUser,
    isGuest
}