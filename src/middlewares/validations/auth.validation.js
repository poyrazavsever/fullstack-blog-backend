const joi = require('joi');
const APIError = require('../../utils/errors')

class AuthValidation {
    constructor() {}
    static register = async (req, res, next) => {
        try {
            
            await joi.object({
                name: joi.string().trim().min(3).max(24).required().messages({
                    "string.base": "İsim Alanı Normal Metin Olmalıdır",
                    "string.empyt": "İsim alanı boş olamaz!",
                    "string.min": "İsim alanı minimum 3 karakter olmalıdır.",
                    "string.max": "İsim alanı 24 karakteri aşamaz.",
                    "string.required": "İsim alanı zorunludur."
                }),
                lastname: joi.string().trim().min(3).max(24).required().messages({
                    "string.base": "Soyad Alanı Normal Metin Olmalıdır",
                    "string.empyt": "Soyad alanı boş olamaz!",
                    "string.min": "Soyad alanı minimum 3 karakter olmalıdır.",
                    "string.max": "Soyad alanı 24 karakteri aşamaz.",
                    "string.required": "Soyad alanı zorunludur."
                }),
                email: joi.string().email().trim().min(3).max(64).required().messages({
                    "string.base": "Email Alanı Normal Metin Olmalıdır",
                    "string.email" : "Lütfen doğru formatta email giriniz",
                    "string.empyt": "Email alanı boş olamaz!",
                    "string.min": "Email alanı minimum 3 karakter olmalıdır.",
                    "string.max": "Email alanı 64 karakteri aşamaz.",
                    "string.required": "Email alanı zorunludur."
                }),
                password: joi.string().trim().min(6).max(36).required().messages({
                    "string.base": "Şifre Alanı Normal Metin Olmalıdır",
                    "string.empyt": "Şifre alanı boş olamaz!",
                    "string.min": "Şifre alanı minimum 6 karakter olmalıdır.",
                    "string.max": "Şifre alanı en fazla 36 karakter olmalıdır.",
                    "string.required": "Şifre alanı zorunludur."
                })
                
            }).validateAsync(req.body)

        } catch (error) {
            if (error.details && error?.details[0].message) 
                throw new APIError(error.details[0].message, 400)
            else throw new APIError("Lütfen Validasyon Kullarına Uyun", 400)
        }
        next()
    }
}

module.exports = AuthValidation