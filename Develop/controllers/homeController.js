// controllers/homeController.js
module.exports = {
    index: (req, res) => {
      res.render('home', { email: req.session.email });
    }
  };