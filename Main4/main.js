// main.js

document.addEventListener("DOMContentLoaded", () => {
    // JSONデータを取得
    fetch('http://localhost:3000/posts')
        .then(response => response.json())  // JSONをパース
        .then(posts => {
            const menuList = document.querySelector('.menu-list');  // メニューを表示する場所を取得
            
            posts.forEach(post => {
                const menuElement = document.createElement('div');
                menuElement.classList.add('menu');
                
                // IDを追加
                const idElement = document.createElement('div');
                idElement.classList.add('id');
                idElement.innerHTML = `<h2>${post.id}</h2>`;
                
                // タイトルを追加
                const titleElement = document.createElement('div');
                titleElement.classList.add('title');
                titleElement.innerHTML = `<h2>${post.title}</h2>`;
                
                // クリック時に詳細ページに移動するリンクを追加
                menuElement.onclick = () => {
                    window.location.href = `post.html?id=${post.id}`;  // 詳細ページにidを渡す
                };

                // メニューにIDとタイトルを追加
                menuElement.appendChild(idElement);
                menuElement.appendChild(titleElement);
                
                // メニューリストに追加
                menuList.appendChild(menuElement);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});
