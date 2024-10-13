const user = require("../models/user.model");
const bcrypt = require("bcrypt");
const APIError = require("../utils/errors");
const Response = require("../utils/response");
const {createToken} = require("../middlewares/auth")

const login = async (req, res) => {
  const {email, password} = req.body
  
  const userInfo = await user.findOne({email})

  if(!userInfo) {
    throw new APIError('Böyle bir kullanıcı bulunmamaktadır.', 401)
  }

  const comparePassword = await bcrypt.compare(password, userInfo.password)
  
  if(!comparePassword)
    throw new APIError('Şifreniz hatalıdır.', 401)
  
  createToken(userInfo, res)
};

const register = async (req, res) => {
  const { email } = req.body;
  const userCheck = await user.findOne({ email });

  if (userCheck) {
    throw new APIError("Girmiş olduğunuz mail kullanılmda", 401);
  }

  req.body.password = await bcrypt.hash(req.body.password, 10);

  console.log("hash şifre: ", req.body.password);

  const userSave = new user(req.body);

  await userSave
    .save()
    .then((data) => {
      return new Response(data, "Kayıt başarıyla yapıldı").created(res);
    })
    .catch((err) => {
      throw new APIError("Kullanıcı kayıt edilirken bir hatayla karşılandı!", 400)
    });
};

module.exports = { login, register };
