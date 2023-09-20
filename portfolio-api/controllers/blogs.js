// const mongoose = require('mongoose');
const slugify = require('slugify');
const Blog = require('../db/models/blog');
const uniqueSlug = require('unique-slug');

// exports.getBlogs = async (req, res) => {
//   const blogs = await Blog.find({status: 'published'}).sort({createdAt: -1});
//   return res.json(blogs);
// }

exports.getBlogs = async (req, res) => {
  const blogs = await Blog.find({status: 'published'}).sort({createdAt: -1});
  // const { access_token } = await getAccessToken();
  const blogsWithUsers = [];
  const authors = {};

  for (let blog of blogs) {
    const author = { name: "Denis Osipov", user_id: "google-oauth2|118097200051766570711"}
    authors[author.user_id] = author;
    blogsWithUsers.push({blog, author});
  }


  return res.json(blogsWithUsers);
}


exports.getBlogById = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  return res.json(blog);
}

// exports.getBlogBySlug = async (req, res) => {
//   const blog = await Blog.findOne({slug: req.params.slug})
//   return res.json(blog);
// }

exports.getBlogBySlug = async (req, res) => {
  const blog = await Blog.findOne({slug: req.params.slug})
  const author = { name: "Denis Osipov", user_id: "google-oauth2|118097200051766570711", picture: "https://gravatar.com/avatar/03bc45d659056629719a4fb761887ec2?s=400&d=robohash&r=x"}


  return res.json({blog, author});
}


exports.getBlogsByUser = async (req, res) => {
  const userId = req.user.sub;
  const blogs = await Blog.find({
    userId,
    status: { $in: ['draft', 'published']}
  });
  return res.json(blogs);
}

exports.createBlog = async (req, res) => {
  const blogData = req.body;
  blogData.userId = req.user.sub;
  blogData.slug += `-${uniqueSlug()}`;
  const blog = new Blog(blogData);
  

  try {
    const createdBlog = await blog.save();
    return res.json(createdBlog);
  } catch(e) {
    return res.status(422).send(e.message);
  }
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