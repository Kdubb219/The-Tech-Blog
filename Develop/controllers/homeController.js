// controllers/homeController.js
const db = require('../models');

module.exports = {
    index: async (req, res) => {
      try {
        const posts = await db.Post.findAll();
        res.render('home', { posts, email: req.session.email, isLoggedIn: req.session.isLoggedIn });
      } catch (err) {
        console.error('Error retrieving posts:', err);
      }
    }
  };