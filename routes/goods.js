//express 라는 라이브러리를 받아서  변수 express에 넣음.
const express = require("express");

//받아온 라이브러리의 Router 함수를 사용해 그 결과값을 router에 넣음
const router = express.Router();

// /routes/goods.js
const goods = [
  {
    goodsId: 4,
    name: "상품 4",
    thumbnailUrl:
      "https://cdn.pixabay.com/photo/2016/09/07/02/11/frogs-1650657_1280.jpg",
    category: "drink",
    price: 0.1,
  },
  {
    goodsId: 3,
    name: "상품 3",
    thumbnailUrl:
      "https://cdn.pixabay.com/photo/2016/09/07/02/12/frogs-1650658_1280.jpg",
    category: "drink",
    price: 2.2,
  },
  {
    goodsId: 2,
    name: "상품 2",
    thumbnailUrl:
      "https://cdn.pixabay.com/photo/2014/08/26/19/19/wine-428316_1280.jpg",
    category: "drink",
    price: 0.11,
  },
  {
    goodsId: 1,
    name: "상품 1",
    thumbnailUrl:
      "https://cdn.pixabay.com/photo/2016/09/07/19/54/wines-1652455_1280.jpg",
    category: "drink",
    price: 6.2,
  },
];

//localhost:3000/api/ GET
//___ 맨뒤에 슬레시 까먹지 말기.
//req는   res는 응답의 약자..
// router.get("/", (req, res) => {
//   //어떤식으로 반환값을 반환하는지.
//   res.send("defalt url for goods.js GET Method");
// });

//localhost:3000/api/about GET
// router.get("/about", (req, res) => {
//   res.send("goods.js about PATH");
// });

router.get("/goods", (req, res) => {
  // res.status(200).json({ goods: goods });
  res.status(200).json({ goods }); //키와값의 이름이 같기때문에 가능
});

router.get("/goods/:goodsId", (req, res) => {
  // const params = req.params;
  // console.log("params", params); //params { goodsId: '2' }
  const { goodsId } = req.params;
  // console.log(goodsId); //2;
  let result = null;
  // for (const good of goods) {
  //   if (Number(goodsId) === good.goodsId) {
  //     result = good;
  //   }
  // }

  result = goods.filter((good) => good.goodsId === Number(goodsId));

  res.status(200).json({ datail: result });
});

const Cart = require("../schemas/cart.js");
router.post("/goods/:goodsId/cart", async (req, res) => {
  //라우터 매개 변수에 대한 정보가 담긴 객체입니다.
  const { goodsId } = req.params;
  const { quantity } = req.body;
  console.log(goodsId, quantity);
  const existsCarts = await Cart.find({ goodsId: Number(goodsId) });
  console.log(existsCarts);
  if (existsCarts.length) {
    return res.status(400).json({
      success: false,
      errorMessage: "이미 장바구니에 해당하는 상품이 존재합니다.",
    });
  }

  await Cart.create({ goodsId: Number(goodsId), quantity: Number(quantity) });

  res.json({ result: "success" });
});

//라우터에 있는거 수정해보기.
router.put("/goods/:goodsId/cart", async (req, res) => {
  const { goodsId } = req.params;
  const { quantity } = req.body;

  const existsCarts = await Cart.find({ goodsId });
  //existsCarts가 값이 존재할때
  if (existsCarts.length) {
    //ubdateOne __ 왼쪽이 값을 찾는애, 오른쪽이 수정할 데이터
    await Cart.updateOne(
      { goodsId: goodsId },
      { $set: { quantity: quantity } } //quantity를 quantity 변수에 있는 값으로 수정할꺼임.
    );
  }
  //이렇게 하면 장바구니에 해당하는 값이 존재 하던 안하던 success 가 됨.
  res.status(200).json({ success: true });
});

//라우터에 있는거 삭제하기. 데이터 삭제.__ 특정한 아이디가 필요 없음 단순 삭제이기 때문.
router.delete("/goods/:goodsId/cart", async (req, res) => {
  const { goodsId } = req.params;
  const existsCarts = await Cart.find({ goodsId: Number(goodsId) });

  if (existsCarts.length) {
    await Cart.deleteOne({ goodsId });
  }
  res.json({ result: "success" });
});

const Goods = require("../schemas/goods.js");
router.post("/goods/", async (req, res) => {
  const { goodsId, name, thumbnailUrl, category, price } = req.body;

  const goods = await Goods.find({ goodsId });

  //goodsId는 하나만 있어야 함 _ unique이기 때문에.
  if (goods.length) {
    return res.status(400).json({
      success: false,
      errorMessage: "이미 존재하는 GoodsID 입니다",
    });
  }
  const createdGoods = await Goods.create({
    goodsId,
    name,
    thumbnailUrl,
    category,
    price,
  });
  res.json({ goods: createdGoods });
});

module.exports = router;
