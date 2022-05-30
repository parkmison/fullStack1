const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const config = require("./config/key");

const { User } = require("./models/User");

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//application/json
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI, {
    //useNewUrlParser: true,      useUnifiedTopology: true,      useCreateIndex: true,      useFindAndModify: false
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((error) => console.log(error));

app.get("/", (req, res) => res.send("Hello, Worldddd!"));

app.post("/register", (req, res) => {
  //회원 가입때 필요한 정보들을 client에서 가져오면
  //그것들을 database에 넣어준다..

  const user = new User(req.body);

  user.save((error, userInfo) => {
    if (error) return res.json({ success: false, error });
    return res.status(200).json({
      success: true,
    });
  });
});

app.post("/login", (req, res) => {
  //요청한 이메일을 데이터베이스에서 있는지 찾는다.
  User.findOne({ email: req.body.email }, (error, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일과 일치하는 사용자가 없습니다.",
      });
    }
    //ㅅㅂ 여기 괄호닫혀있었음
    //이메일이 있다면 비밀번호가 같은지 확인
    user.comparePassword(req.body.password, (error, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀립니다",
        });
      //비밀번호가 맞다면 토큰을 생성
      user.generateToken((error, user) => {
        if (error) return res.status(400).send(error);

        //토큰을 저장한다. 어디에? 쿠키에cookie-parser
        res
          .cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
      });
    });
  });
});
app.listen(port, () => console.log(`example app listening on port ${port}`));
