const mongoose = require("mongoose");
const bcyrpt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});
//user 정보를 저장하기 전에 10강 참고
userSchema.pre("save", function (next) {
  var user = this; //this는 위에 schema 의미함
  if (user.isModified("password")) {
    //비밀번호 암호화 시킨다
    bcyrpt.genSalt(saltRounds, function (error, salt) {
      if (error) return next(error); //에러가 나면 index.js의 user.save로 돌려보냄

      bcyrpt.hash(user.password, salt, function (error, hash) {
        if (error) return next(error); //에러가 나면 index.js의 user.save로 돌려보냄
        user.password = hash;
        next(); //완성이 되면 돌아간다
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
  //plainPassword 123456과 암호화된 비밀번호가 일치하는지 봐야함
  bcyrpt.compare(plainPassword, this.password, function (error, isMatch) {
    if (error) return cb(error); //이거세미콜론 원래콤마였음
    cb(null, isMatch);
  });
};

userSchema.methods.generateToken = function (cb) {
  var user = this;

  //jsonwebtoken을 이용해서 token을 생성하기

  var token = jwt.sign(user._id.toHexString(), "secretToken");

  user.token = token;
  user.save(function (error, user) {
    if (error) return cb(error);
    cb(null, user);
  });
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
