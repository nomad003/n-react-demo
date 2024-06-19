const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

const postsDirectory = path.join(__dirname, 'posts');

app.use(cors());
app.use(bodyParser.json());

// Get a single blog post
app.get('/api/posts/:id', (req, res) => {
  const postId = req.params.id;
  const postFilePath = path.join(postsDirectory, `${postId}.md`);
  fs.readFile(postFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading post file:', err);
      res.status(404).send('Post not found');
      return;
    }
    res.json({ content: data });
  });
});

app.get('/api/posts-summary', (req, res) => {
  fs.readdir(postsDirectory, (err, files) => {
    if (err) {
      console.error('Error reading posts directory:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    const posts = [];
    files.forEach(file => {
      const filePath = path.join(postsDirectory, file);
      const content = fs.readFileSync(filePath, 'utf8');
      posts.push({ title: file.replace('.md', ''), summary: content });
    });
    res.json(posts);
  });
});

// Get all blog posts
app.get('/api/posts', (req, res) => {
  fs.readdir(postsDirectory, (err, files) => {
    if (err) {
      console.error('Error reading posts directory:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    const posts = [];
    files.forEach(file => {
      const filePath = path.join(postsDirectory, file);
      //const content = fs.readFileSync(filePath, 'utf8');
      //posts.push({ title: file.replace('.md', ''), content });
      posts.push({ title: file.replace('.md', '')});
    });
    res.json(posts);
  });
});

app.get('/api/time', (req, res) => {
  const currentTime = new Date().toLocaleString();
  res.json({ time: currentTime });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

/*
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

let blogPosts = [
  {
    title: 'Hello World',
    content: '# Welcome to my blog!\n\nThis is my first blog post.'
  },
  {
    title: 'Introduction to Express.js',
    content: '# What is Express.js?\n\nExpress.js is a web application framework for Node.js.'
  }
];

app.use(cors());
app.use(bodyParser.json());

// Get all blog posts
app.get('/api/posts', (req, res) => {
  res.json(blogPosts);
});

// Get a single blog post
app.get('/api/posts/:id', (req, res) => {
  const id = req.params.id;
  if (id >= 0 && id < blogPosts.length) {
    res.json(blogPosts[id]);
  } else {
    res.status(404).send('Post not found');
  }
});

// Add a new blog post
app.post('/api/posts', (req, res) => {
  const { title, content } = req.body;
  const newPost = { title, content };
  blogPosts.push(newPost);
  res.status(201).send('Blog post added successfully');
});

// Delete a blog post
app.delete('/api/posts/:id', (req, res) => {
  const id = req.params.id;
  blogPosts.splice(id, 1);
  res.send('Blog post deleted successfully');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

/*

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

let blogPosts = [];

app.use(cors());
app.use(bodyParser.json());

// Get all blog posts
app.get('/api/posts', (req, res) => {
  res.json(blogPosts);
});

// Add a new blog post
app.post('/api/posts', (req, res) => {
  const { title, content } = req.body;
  const newPost = { title, content };
  blogPosts.push(newPost);
  res.status(201).send('Blog post added successfully');
});

// Delete a blog post
app.delete('/api/posts/:id', (req, res) => {
  const id = req.params.id;
  blogPosts.splice(id, 1);
  res.send('Blog post deleted successfully');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
*/
/*
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

let todos = [];

app.use(cors());
app.use(bodyParser.json());

// Get all todos
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

// Add a todo
app.post('/api/todos', (req, res) => {
  const { text } = req.body;
  todos.push(text);
  res.status(201).send('Todo added successfully');
  console.log('Todo added successfully')
});

// Delete a todo
app.delete('/api/todos/:id', (req, res) => {
  const id = req.params.id;
  todos.splice(id, 1);
  res.send('Todo deleted successfully');
  console.log('Todo deleted successfully')
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

*/