//express 라는 라이브러리를 받아서  변수 express에 넣음.
const express = require("express");

//받아온 라이브러리의 Router 함수를 사용해 그 결과값을 router에 넣음
const router = express.Router();

const Cart = require("../schemas/cart.js");
const Goods = require("../schemas/goods.js");

//localhost:3000/api/carts GET Method로 호출될때.
router.get("/carts", async (req, res) => {
  // Cart에 대한 모든 정보를 가지고 올건데
  const carts = await Cart.find({});
  //여기서 find({})는 스키마에서 사용되는 find이다.

  //cart의 goodsId만 모아서 담음.
  const goodsIds = carts.map((cart) => {
    return cart.goodsId;
  });

  //Goods에 대한 모든 정보를 가지고 올건데,
  //그중에서 goodsId 라는 속성이 goodsIds 에 해당하는 값인 애들만 조회.
  const goods = await Goods.find({ goodsId: goodsIds });

  const results = carts.map((cart) => {
    return {
      quantity: cart.quantity,
      goods: goods.find((item) => item.goodsId === cart.goodsId),
      //커멘드 누르고 find 누르면 어디서 온 문법인지 볼 수 있다. 이번꺼는 배열에서 쓰이는 js 문법
    };
  });

  res.json({
    carts: results,
  });
});

module.exports = router;
