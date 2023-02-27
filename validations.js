import { body } from 'express-validator';

export const registerValidation = [
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5 }),
  body('name', 'Укажите имя').isLength({ min: 3 }),
  body('avatarURL', 'Неверная ссылка на аватарку').optional().isString(),
];

export const loginValidation = [body('email', 'Неверный формат почты').isEmail()];

export const postValidation = [
  body('title', 'Введите заголовок статьи').isLength({ min: 3 }).isString(),
  body('body', 'Введите текст статьи').isLength({ min: 10 }).isString(),
  body('tags', 'Неверный формат тэгов').optional().isString(),
  body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),
];
