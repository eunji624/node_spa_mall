const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  goodsId: {
    //얘네보고 스키마 라고 함.
    type: Number, //타입은 넘버임,
    required: true, //값은 무조건 존재해야만 함
    unique: true, //중복값이면 허용 안할거임
  },
  quantity: {
    type: Number,
    required: true,
  },
});

//Defaults 라는 모델 명으로 defaultSchema 를 사용할거라는 말.
module.exports = mongoose.model("Cart", cartSchema);
