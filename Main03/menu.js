document.addEventListener("DOMContentLoaded", async function () {
    // JSONデータを取得
    const response = await fetch("posts.json"); // JSONファイルのパスを適宜変更
    const data = await response.json();

    const posts = data.posts;
    const menuList = document.querySelector(".menu-list");
    const postTitle = document.querySelector(".right_title h1");
    const postAuthor = document.querySelector(".right_author h3");
    const postContent = document.querySelector(".post-contents p");
    const postImage = document.querySelector(".post-img img");

    // メニューリストの生成
    menuList.innerHTML = "";
    posts.forEach((post) => {
        const menuItem = document.createElement("div");
        menuItem.classList.add("menu");
        menuItem.innerHTML = `
            <div class="id-number"><p>${post.id}</p></div>
            <h3>${post.title}</h3>
        `;
        menuItem.addEventListener("click", () => {
            displayPost(post);
        });
        menuList.appendChild(menuItem);
    });

    // 初期表示（最初の投稿）
    if (posts.length > 0) {
        displayPost(posts[0]);
    }

    // 投稿の詳細を表示する関数
    function displayPost(post) {
        postTitle.textContent = post.title;
        postAuthor.textContent = post.author;
        postContent.textContent = post.content;
        postImage.src = post.postImg || "placeholder.png"; // 画像がない場合のデフォルト画像
    }
});
