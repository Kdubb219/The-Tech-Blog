// controllers/postsController.js
const db = require('../models');

module.exports = {
  index: async (req, res) => {
    try {
      const posts = await db.Post.findAll();
      res.render('home', { posts });
    } catch (err) {
      console.error('Error retrieving posts:', err);
    }
  },

  show: async (req, res) => {
    const postId = req.params.id;
    try {
      const post = await db.Post.findByPk(postId);
      res.render('post', { post });
    } catch (err) {
      console.error('Error retrieving post:', err);
    }
  },

  create: async (req, res) => {
    const { title, content } = req.body;
    try {
      await db.Post.create({ title, content });
      res.redirect('/');
    } catch (err) {
      console.error('Error creating post:', err);
    }
  }
};
