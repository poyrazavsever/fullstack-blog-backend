const user = require("../models/user.model");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  console.log(req.body);
  return res.json(req.body);
};

const register = async (req, res) => {
  const { email } = req.body;
  const userCheck = await user.findOne({ email });

  if (userCheck) {
    console.log("Girmiş olduğunuz mail kullanılmda", email);
  }

  req.body.password = await bcrypt.hash(req.body.password, 10);

  console.log("hash şifre: ", req.body.password);

  try {
    const userSave = new user(req.body);

    await userSave
      .save()
      .then((response) => {
        // Burada 'response' adını kullandık
        return res.status(201).json({
          success: true,
          data: response,
          message: "Kayıt başarıyla yapıldı",
        });
      })
      .catch((err) => {
        console.log("Hata var: ", err);
        return res.status(500).json({
          success: false,
          message: "Kayıt işlemi sırasında bir hata oluştu",
        });
      });
  } catch (error) {
    console.log(error);
  }

  console.log(req.body);
};

module.exports = { login, register };
