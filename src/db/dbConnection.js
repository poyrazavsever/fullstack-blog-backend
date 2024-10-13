const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DB_URL)
    .then(() => console.log('Veri tabanına bağlanıldı.'))
    .catch(err => console.log("Veri tabanı hatası: ", err))