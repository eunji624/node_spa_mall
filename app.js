//express 라이브러리를 가지고 와서 변수에 담는다.
const express = require("express");
//익스프레스 실행해서 app 객체 생성
const app = express();
const port = 3000;

//goods.js 에서 어떤 파일을 가져옴
// const goodsRouter = require("./routes/goods.js");
const goodsRouter = require("./routes/goods");
// const { request } = require("http");

//cart.js
const cartsRouter = require("./routes/carts.js");

//index.js 에서 어떤 파일을 가져옴
// const connect = require("./schemas/index.js");
const connect = require("./schemas");
connect();

//모든 코드에 express.json() 미들웨어를 이용해 파싱 하겟다는 의미.
app.use(express.json());

// app.post("/", (req, res) => {
//   console.log(req.body);
//   //{ key123: '안녕하세요 key123 입니다.' }
//   res.send("기본 URI에 POST 메소드가 정상적으로 실행되었습니다.");
// });

//| URI= 식별자, URL=식별자+위치

// app.get("/", (req, res) => {
//   console.log(req.query);
//   // console.log(req.params);
//   // console.log(req.body);
//   const obj = {
//     KeyKey: "value 입니다",
//     이릅입니다: "이름일까요???",
//   };

//   // res.send("정상적으로 반환되었습니다.");
//   // res.status(400).json(obj);
//   res.json(obj);
// });

// req.params: 라우터 매개 변수에 대한 정보가 담긴 객체입니다.
//이 말은. 기본url 주소에서 뒤에 오는 애들은 다 아이디 값으로 전달한다는 말. :id 이렇게 적었으니깐.
// app.get("/:id", (req, res) => {
//   console.log(req.params); //{ id: 'helloworld' }

//   res.send(":id URI에 정상적으로 반환 되었습니다.");
// });

// api 실행하도록 도와줌
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

//api라는 경로가 추가될 경우에, goodesRouter로 모두 이동!
// 그리고 /과 /about 이 있으니, 그중 해당하는 경우 출력이 그에 맞게 나온다.

//app.use 라는 말은 모든 미들웨어가 이곳을 통과하도록 할거 라는 말.
//즉 /api 라는 주소값이 있을 경우에만 goodsRouter를 실행하도록 한것이고,
//goods.js 파일으 그제서야 실행됨

//바디에 데이터가 들어 왔을때, 그 데이터를 사용 할 수 있도록 만들어줌
app.use(express.json());

app.use("/api", [goodsRouter, cartsRouter]);
//이 use는 전역 미들웨어.
//이런식으로도 사용 할 수 있다.
// app.use("/api", [goodsRouter, appRouter])  이렇게 배열형식으로도 가능.

app.get("/", (req, res) => {
  res.send("hello world");
});

// 실제로 서버가 실행되는 부분.
app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸어요!");
});
