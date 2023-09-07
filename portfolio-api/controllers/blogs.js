// const mongoose = require('mongoose');
const slugify = require('slugify');
const Blog = require('../db/models/blog');
const uniqueSlug = require('unique-slug');

exports.getBlogs = async (req, res) => {
  const blogs = await Blog.find({status: 'published'}).sort({createdAt: -1});
  return res.json(blogs);
}

exports.getBlogById = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  return res.json(blog);
}

exports.getBlogBySlug = async (req, res) => {
  const blog = await Blog.findOne({slug: req.params.slug})
  return res.json(blog);
}

exports.getBlogsByUser = async (req, res) => {
  const userId = req.user.sub;
  const blogs = await Blog.find({userId});
  return res.json(blogs);
}

exports.createBlog = async (req, res) => {
  const blogData = req.body;
  blogData.userId = req.user.sub;
  const blog = new Blog(blogData);

  try {
    const createdBlog = await blog.save();
    return res.json(createdBlog);
  } catch(e) {
    return res.status(422).send(e);
  }
}


exports.updateBlog1 = async (req, res) => {
  const { body, params: {id}} = req;
  console.log(id)
  Blog.findById(id, async (err, blog) => {
    if (err) {
      return res.status(422).send(err.message);
    }



    if (body.status && body.status === 'published' && !blog.slug) {
      blog.slug = slugify(blog.title, {
        replacement: '-',
        lower: true
      });
    }


    blog.set(body);
    blog.updateAt = new Date();

    try {
      const updatedBlog = await blog.save();
      return res.json(updatedBlog);
    } catch(err) {
      return res.status(422).send(err.message);
    }
  });
}


const _saveBlog = async blog => {
  try {
    const createdBlog = await blog.save();
    return createdBlog;
  } catch(e) {
    if (e.code === 11000 && e.keyPattern && e.keyPattern.slug) {
      blog.slug += `-${uniqueSlug()}`;
      return _saveBlog(blog);
    }

    throw(e);
  }
}

exports.updateBlog = async (req, res) => {
  try {
    const { body, params: { id } } = req;

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ error: 'Блог не найден' });
    }

    // TODO: Проверьте, если пользователь публикует блог,
    // и если пользователь публикует, то создайте SLUG

    blog.set(body);
    blog.updatedAt = new Date();

    
    const updatedBlog = await _saveBlog(blog);
    return res.json(updatedBlog);
  } catch (err) {
    return res.status(422).json({ error: err.message });
  }
};