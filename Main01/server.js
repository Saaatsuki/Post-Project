const express = require('express');
const bodyParser = require('body-parser');
const { Low, JSONFile } = require('lowdb');

// Expressの設定
const app = express();
const port = 3000;

// DB設定
const db = new Low(new JSONFile('db.json'));
db.data = db.data || { posts: [] };

// BodyParserの設定
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 投稿データを取得するAPI
app.get('/posts', (req, res) => {
    res.json(db.data.posts);
});

// 投稿データを更新するAPI
app.post('/updatePost', async (req, res) => {
    const { id, title, author, content } = req.body;

    // IDが一致する投稿を探して更新
    const postIndex = db.data.posts.findIndex(post => post.id === id);
    if (postIndex !== -1) {
        db.data.posts[postIndex] = { id, title, author, content };
        await db.write();
        res.status(200).json({ message: 'Post updated successfully!' });
    } else {
        res.status(404).json({ message: 'Post not found' });
    }
});

// サーバー起動
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
