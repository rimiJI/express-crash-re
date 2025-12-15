const output = document.querySelector("#output"); //태그가져오기
const button = document.querySelector("#get-posts-btn");
const form = document.querySelector("#add-post-form");

//포스트 목록 가져와서 화면에 뿌리기
const showPosts = async () => {
  try {
    const res = await fetch("/api/posts"); //💥await fetch("http://localhost:8000/api/posts"); //💥오타: 800으로 됨
    if (!res.ok) {
      throw new Error("Failed to fetch posts");
    }

    const posts = await res.json();
    // 처음은 빈문자열로 설정
    output.innerHTML = "";

    posts.forEach((post) => {
      const postElement = document.createElement("div");
      postElement.textContent = post.title;
      output.appendChild(postElement);
    });
  } catch (err) {
    console.error("Error fetching posts");
  }
};

// 버튼 클릭-실행
button.addEventListener("click", showPosts); //💥오타: showPosts 라인안에 있었음. 라인 밖으로 뺌
