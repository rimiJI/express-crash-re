const errorHandler = (err, req, res, next) => {
  if (err.status) {
    //상태 정의되어 있으면
    res.status(err.status).json({ msg: err.message });
  } //정의안되어있음
  else {
    res.status(500).json({ msg: err.message });
  }
  // res.status(500).json({ msg: "Error" });
  //이거 "msg":"A post with the id of 100 was not found" 이렇게 바꿔주지도 않았는데
  //왜 { msg: "Error" }이거 안뜨고 정상적으로 뜨지?
};

export default errorHandler;
