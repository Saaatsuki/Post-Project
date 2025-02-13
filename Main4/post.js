document.addEventListener("DOMContentLoaded", function() {
    // URLのクエリパラメータからIDを取得
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');  // ?id=1 などのIDを取得

    console.log("URLから取得したID:", postId);  // デバッグ用

    // 投稿データを取得
    fetch('http://localhost:3000/posts')
    .then(response => response.json())  // JSONデータをパース
    .then(posts => {
        console.log("取得した投稿データ:", posts);  // デバッグ用

        // IDに一致する投稿を探す
        const post = posts.find(post => post.id == postId);  // 型を無視して比較


        console.log("一致する投稿:", post);  // デバッグ用

        if (post) {
            // 該当する投稿が見つかった場合
            const postContainer = document.querySelector(".post");  // 投稿を表示する場所を取得

            const postElement = document.createElement("div");
            postElement.classList.add("margin");

            // HTMLの構造を動的に生成
            postElement.innerHTML = `
                <div class="author"><p>${post.author}</p></div>
                <div class="image"><img src="${post.postImg}" alt="Post Image" /></div>
                <div class="Title_and_Comment">
                    <div class="Title"><h3>${post.title}</h3></div>
                    <div class="Comments-Button"><img src="hukidashi.png" alt="Comments" /></div>
                </div>
                <div class="content">
                    <p>${post.content}</p>
                </div>
            `;

            // 作成した投稿要素を親要素に追加
            postContainer.appendChild(postElement);
        } else {
            // 投稿が見つからない場合のエラーメッセージ
            const postContainer = document.querySelector(".post");
            postContainer.innerHTML = "<p>投稿が見つかりませんでした。</p>";
        }
    })
    .catch(error => {
        console.error("データの取得エラー:", error);
    });
});
