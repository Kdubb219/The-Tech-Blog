const db = require('../models');

module.exports = {
  index: async (req, res) => {
    try {
      const posts = await db.Post.findAll();
      res.render('dashboard', { posts, email: req.session.email, isLoggedIn: req.session.isLoggedIn });
    } catch (err) {
      console.error('Error retrieving posts:', err);
    }
  },
  };