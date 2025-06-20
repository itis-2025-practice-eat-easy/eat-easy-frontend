import * as Yup from 'yup';

const emailRegex = /^[\w\-.]+@([\w-]+\.)+[\w-]{2,4}$/;

export const loginSchema = Yup.object({
    login: Yup.string()
        .matches(emailRegex, 'Неверный формат email')
        .required('Обязательное поле'),
    password: Yup.string()
        .min(8, 'Пароль должен быть минимум 8 символов')
        .required('Обязательное поле'),
});
