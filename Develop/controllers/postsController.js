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
      res.render('post', { post, isLoggedIn: req.session.isLoggedIn  });
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
  },

  editForm: async (req, res) => {
    try {
      const postId = req.params.id;
      const post = await db.Post.findByPk(postId);
      if (!post) {
        return res.status(404).send('Post not found');
      }
      res.render('edit', { post, isLoggedIn: req.session.isLoggedIn  });
    } catch (err) {
      console.error('Error fetching blog post:', err);
      res.status(500).send('Internal Server Error');
    }
  },

  update: async (req, res) => {
    try {
      const postId = req.params.id;
      const { title, content } = req.body;
      const post = await db.Post.findByPk(postId);
      if (!post) {
        return res.status(404).send('Post not found');
      }
      await post.update({ title, content });
      res.redirect('/dashboard');
    } catch (err) {
      console.error('Error updating blog post:', err);
      res.status(500).send('Internal Server Error');
    }
  },

  delete: async (req, res) => {
    try {
      const postId = req.params.id;
      const post = await db.Post.findByPk(postId);
      if (!post) {
        return res.status(404).send('Post not found');
      }
      await post.destroy();
      res.redirect('/dashboard');
    } catch (err) {
      console.error('Error deleting blog post:', err);
      res.status(500).send('Internal Server Error');
    }
  }
};
