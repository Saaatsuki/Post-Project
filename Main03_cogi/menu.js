document.addEventListener('DOMContentLoaded', function() {
    let postsData = [];
  
    // 投稿データを取得して左側メニューを生成
    fetch('http://localhost:3000/posts')
      .then(response => response.json())
      .then(posts => {
        postsData = posts;
        const menuListContainer = document.querySelector('.menu-list');
        menuListContainer.innerHTML = ''; // 初期の固定内容をクリア
  
        // 各投稿ごとにメニュー項目を生成
        posts.forEach((post) => {
          const menuDiv = document.createElement('div');
          menuDiv.className = 'menu';
          menuDiv.innerHTML = `
            <div class="id-number"><p>${post.id}</p></div>
            <h3>${post.title}</h3>
          `;
          // クリック時に詳細を表示する
          menuDiv.addEventListener('click', () => displayPost(post));
          menuListContainer.appendChild(menuDiv);
        });
  
        // 最初の投稿を初期表示
        if (postsData.length > 0) {
          displayPost(postsData[0]);
        }
      })
      .catch(error => console.error('Error fetching posts:', error));
  
    // 投稿詳細を表示する関数
    function displayPost(post) {
      // 左側の固定部分（ID、タイトル、著者、画像）を更新
      document.getElementById('id') && (document.getElementById('id').textContent = post.id);
      document.getElementById('title') && (document.getElementById('title').textContent = post.title);
      // HTML内の ID が "auther"（※typoですがHTMLに合わせています）
      document.getElementById('auther') && (document.getElementById('auther').textContent = post.author);
      document.getElementById('image').src = post.postImg;
  
      // 右側の詳細部分を更新
      document.getElementById('detailTitle').textContent = post.title;
      document.getElementById('detailAuthor').textContent = post.author;
      document.getElementById('content').textContent = post.content;
  
      // コメントも更新（postIdが一致するもの）
      fetch('http://localhost:3000/comments')
        .then(response => response.json())
        .then(comments => {
          const postComments = comments.filter(comment => comment.postId == post.id);
          const commentsList = document.querySelector('.comments-list');
          commentsList.innerHTML = ''; // 既存コメントをクリア
  
          if (postComments.length > 0) {
            postComments.forEach(comment => {
              const commentDiv = document.createElement('div');
              commentDiv.className = 'com';
              commentDiv.innerHTML = `
                <div class="author"><p>${comment.author}</p></div>
                <div class="comments-msg"><p>${comment.content}</p></div>
              `;
              commentsList.appendChild(commentDiv);
            });
          } else {
            commentsList.innerHTML = '<div class="comments-msg"><p>コメントはありません</p></div>';
          }
        })
        .catch(error => console.error('Error fetching comments:', error));
    }
  });

