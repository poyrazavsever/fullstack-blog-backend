const APIError = require('../utils/errors');

const errorHandlerMiddleware = (err, req, res, next) => {
    console.error('Error occurred:', err); // Hata mesajını logla
    
    if (err instanceof APIError) {
        return res.status(err.statusCode || 400).json({
            success: false,
            message: err.message,
        });
    }

    return res.status(500).json({
        success: false,
        message: "Bir hatayla karşılaştık, lütfen apinizi kontrol ediniz.",
    });
};

module.exports = errorHandlerMiddleware;
