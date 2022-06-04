const req = require("express/lib/request");
const res = require("express/lib/response");
const { User } = require("../models/User");

let auth = (req, res, next) => {
  //인증 처리 하는곳

  // 클라이언트 쿠키에서 토큰을 가져온다
  let token = req.cookies.x_auth;
  // 토큰을 복호화 후 유저 찾음
  User.findByToken(token, (error, user) => {
    if (error) throw error;
    if (!user) return res.json({ isAuth: false, error: true });

    req.token = token;
    req.user = user;
    next(); //다할거했으면 next를해야 다음으로 넘어감
  });
};
// 유저가 있으면 인증 okay

// 유저가 없으면 인증 No
module.exports = { auth };
