const mongoose = require("mongoose");

const connect = () => {
  mongoose
    .connect(
      "mongodb+srv://applecoco:applecoco@cluster0.pqqngbq.mongodb.net/sap_mall"
    )
    .then(() => {
      console.log("완료");
    })
    .catch((err) => console.log(err));
};

mongoose.connection.on("error", (err) => {
  console.error("몽고디비 연결 에러", err);
});

module.exports = connect;
