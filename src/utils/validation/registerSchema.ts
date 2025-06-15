import * as Yup from 'yup';

const emailRegex = /^[\w\-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

export const registerSchema = Yup.object({
    username: Yup.string()
        .min(3, 'Логин должен содержать минимум 3 символа')
        .max(50, 'Логин должен содержать не более 50 символов')
        .required('Обязательное поле'),
    email: Yup.string()
        .matches(emailRegex, 'Неверный формат email')
        .required('Обязательное поле'),
    password: Yup.string()
        .matches(passwordRegex, 'Пароль должен быть минимум 8 символов, включать цифры, строчные и заглавные буквы')
        .required('Обязательное поле'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Пароли должны совпадать')
        .required('Обязательное поле'),
    firstName: Yup.string()
        .min(2, 'Имя должно содержать минимум 2 символа')
        .max(20, 'Имя должно содержать не более 20 символов')
        .required('Обязательное поле'),
    lastName: Yup.string()
        .min(2, 'Фамилия должна содержать минимум 2 символа')
        .max(30, 'Фамилия должна содержать не более 30 символов')
        .required('Обязательное поле'),
    role: Yup.string()
        .oneOf(['USER', 'ADMIN'], 'Некорректная роль')
        .required('Обязательное поле'),
});
