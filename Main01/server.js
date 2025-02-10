const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json()); // JSONデータを受け取る

const dbFilePath = 'db.json';

// 投稿データを更新するAPI
app.post('/updatePost', (req, res) => {
    const { id, title, author, content, postImg } = req.body;

    fs.readFile(dbFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to read file.' });
        }

        const dbData = JSON.parse(data);

        // posts 配列から ID が一致するものを探す
        const postIndex = dbData.posts.findIndex(post => post.id == id);

        if (postIndex !== -1) {
            // 既存の投稿を更新
            dbData.posts[postIndex] = { id, title, author, content, postImg };
            res.json({ message: 'Post updated successfully' });
        } else {
            // 新規投稿を追加
            const newPost = { id, title, author, content, postImg };
            dbData.posts.push(newPost);
            res.json({ message: 'Post added successfully' });
        }

        // 更新したデータを db.json に書き込む
        fs.writeFile(dbFilePath, JSON.stringify(dbData, null, 2), 'utf8', (err) => {
            if (err) {
                return res.status(500).json({ message: 'Failed to save file.' });
            }
        });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
