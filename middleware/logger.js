import colors from "colors";

const methodColors = {
  GET: "green",
  POST: "blue",
  PUT: "yellow",
  DELETE: "red",
};
//미들웨어 Logger만들기
const logger = (req, res, next) => {
  //인증,로그,권한 체크는 req
  const color = methodColors[req.method] || "white";
  // next는 마지막에 호출 후 다음 미들웨어/라우트로 흐름 보냄
  console.log(
    colors[color](
      //이부분 고침
      `${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`
    )
  );
  next();
};

export default logger;
