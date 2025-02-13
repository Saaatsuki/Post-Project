// document.querySelector("button[type='submit']").addEventListener("click", function(event) {
//     event.preventDefault();  // フォームが送信されるのを防ぐ
    
//     // フォームの入力内容を取得
//     const formData = {
//         id: document.getElementById("formId").value,
//         author: document.getElementById("formAuthor").value,
//         title: document.getElementById("formTitle").value,
//         content: document.getElementById("forContent").value,
//         postImg: document.getElementById("formImage").value
//     };
    
//     // データをJSON形式で送信
//     fetch('http://localhost:3000/posts', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//     })
//     .then(response => response.json())
//     .then(data => {
//         alert("データが送信されました！");
//         window.location.href = 'post.html';  // データ送信後、投稿ページに遷移
//     })
//     .catch(error => {
//         console.error("送信エラー:", error);
//     });
// });
