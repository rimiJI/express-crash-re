let posts = [
  { id: 1, title: "Post One" },
  { id: 2, title: "Post Two" },
  { id: 3, title: "Post Three" },
];

// @desc    Get all posts
// @route   GET /api/posts
export const getPosts = (req, res, next) => {
  const limit = parseInt(req.query.limit); //postman에 http://localhost:8000/api/posts?limit=2 이런식으로 제한 확인 가능

  if (!isNaN(limit) && limit > 0) {
    return res.status(200).json(posts.slice(0, limit));
  }
  // 제한 없을 때 _전체 목록
  res.status(200).json(posts);
};

// @desc    Get single post
// @route   GET /api/posts/:id
export const getPost = (req, res, next) => {
  ///:id에 슬래시가 있어야 라우팅 동작함
  //경로 중복 않기 위해 :id로 변경
  const id = parseInt(req.params.id); //문자열 ->숫자로 //parseInt 오타 주의
  const post = posts.find((p) => p.id === id);

  //존재하지 않을 떄
  if (!post) {
    const error = new Error(`A post with the id of ${id} was not found`);
    error.status = 404;
    return next(error);
  }
  // 존재할때 _단일 게시글
  res.status(200).json(post);
  //   res.status(200).json(posts.filter((p) => p.id === id)); //위에 posts 객체의 id가 여기 전달된 id와 같은지 유무 확인
  //   console.log(req.params.id);
  //   res.json(posts);
};

// @desc    Create new post
// @route   POST /api/posts
export const createPost = (req, res, next) => {
  // console.log(req.body); // { title: '...'} 형태
  console.log("BODY: ", req.body); //뭐지 이거 추가하니까 갑자기 POST에 Brads입력 됨

  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
  };

  if (!newPost.title) {
    const error = new Error(`Please indclude a title`);
    error.status = 400;
    return next(error);
  }
  posts.push(newPost); //post로 오타났었음. 배열추가한단
  res.status(201).json(posts); //게시물 넣고 전달 계속
};

// @desc    Update post
// @route   PUT /api/posts/:id //클릭 후 선택목록 리스트에서 PUT 선택 뒤 주소넣기 (localhost:8000/api/posts/:id)
export const updatePost = (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find((p) => p.id === id); //각 게시글 id 유효성 확인
  if (!post) {
    //id가 아니면
    const error = new Error(`A post with the id of ${id} was not found`);
    error.status = 404;
    return next(error);
  }
  post.title = req.body.title; //제목을 요청해서 가져옴
  res.status(200).json(post);
};

// @desc    Delete post
// @route   DELETE /api/posts/:id
export const deletePost = (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find((p) => p.id === id); //각 게시글 id 유효성 확인
  if (!post) {
    //id가 아니면
    const error = new Error(`A post with the id of ${id} was not found`);
    error.status = 404;
    return next(error);
  }
  posts = posts.filter((post) => post.id !== id); //post id가 존재하는데, filter 로 해당 id를 제외한 새 배열을 만들고 posts에 다시 할당
  res.status(200).json(post); //삭제 후 남은 posts 객체배열 변수를 응답
};
