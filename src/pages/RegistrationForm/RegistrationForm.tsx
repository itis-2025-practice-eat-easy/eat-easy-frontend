import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from "formik";
import {NavLink, useNavigate} from 'react-router-dom';
import { useCreateUser } from "../../hooks/useCreateUser.ts";
import type { UserRequestDto } from "../../types/users.ts";
import { registerSchema } from "../../utils/validation/registerSchema.ts";
import './registration.css'
import Button from "../../components/Button/Button.tsx";


interface RegisterFormValues {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    role: string;
}

export default function RegistrationForm() {
    const navigate = useNavigate();
    const { create, loading, error: createError } = useCreateUser();
    const [generalError, setGeneralError] = useState<string | null>(null);

    const initialValues: RegisterFormValues = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        role: 'USER',
    };

    const handleSubmit = async (
        values: RegisterFormValues,
        helpers: FormikHelpers<RegisterFormValues>
    ) => {
        setGeneralError(null);
        helpers.setSubmitting(true);
        try {
            const payload: UserRequestDto = {
                username: values.username,
                email: values.email,
                password: values.password,
                firstName: values.firstName,
                lastName: values.lastName,
                role: values.role,
            };
            await create(payload);
            navigate('/login');
        } catch (err: any) {
            const msg = createError || err.response?.data?.message || err.message || 'Ошибка при регистрации';
            setGeneralError(msg);

            if (err.response?.data?.errors && typeof err.response.data.errors === 'object') {
                const errorsObj = err.response.data.errors as Record<string, string>;
                Object.entries(errorsObj).forEach(([field, message]) => {
                    helpers.setFieldError(field, message);
                });
            }
        } finally {
            helpers.setSubmitting(false);
        }
    };

    return (
        <div className="registration-container">
                <Formik
                    initialValues={initialValues}
                    validationSchema={registerSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <h1 className="registration-title">Sign Up</h1>
                            <div className="registration-field-group">
                                <label htmlFor="username" className="registration-label">Username</label>
                                <Field
                                    id="username"
                                    name="username"
                                    type="text"
                                    placeholder="Username"
                                    className="registration-input"
                                />
                                <ErrorMessage name="username">
                                    {msg => <div className="registration-error-message">{msg}</div>}
                                </ErrorMessage>
                            </div>

                            <div className="registration-field-group">
                                <label htmlFor="email" className="registration-label">Email</label>
                                <Field
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="email@example.com"
                                    className="registration-input"
                                />
                                <ErrorMessage name="email">
                                    {msg => <div className="registration-error-message">{msg}</div>}
                                </ErrorMessage>
                            </div>

                            <div className="registration-field-group">
                                <label htmlFor="password" className="registration-label">Password</label>
                                <Field
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="••••••••"
                                    className="registration-input"
                                />
                                <ErrorMessage name="password">
                                    {msg => <div className="registration-error-message">{msg}</div>}
                                </ErrorMessage>
                            </div>

                            <div className="registration-field-group">
                                <label htmlFor="confirmPassword" className="registration-label">Confirm Password</label>
                                <Field
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="••••••••"
                                    className="registration-input"
                                />
                                <ErrorMessage name="confirmPassword">
                                    {msg => <div className="registration-error-message">{msg}</div>}
                                </ErrorMessage>
                            </div>

                            <div className="registration-field-group">
                                <label htmlFor="firstName" className="registration-label">First Name</label>
                                <Field
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    placeholder="First Name"
                                    className="registration-input"
                                />
                                <ErrorMessage name="firstName">
                                    {msg => <div className="registration-error-message">{msg}</div>}
                                </ErrorMessage>
                            </div>

                            <div className="registration-field-group">
                                <label htmlFor="lastName" className="registration-label">Last Name</label>
                                <Field
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    placeholder="Last Name"
                                    className="registration-input"
                                />
                                <ErrorMessage name="lastName">
                                    {msg => <div className="registration-error-message">{msg}</div>}
                                </ErrorMessage>
                            </div>

                            {generalError && <div className="registration-error-message">{generalError}</div>}


                                <Button type='submit'
                                        className={`registration-submit-button${(isSubmitting || loading) ? ' registration-loading' : ''}`}>
                                    {isSubmitting || loading ? 'Registering...' : 'Create account'}
                                </Button>
                                <NavLink to='/login' className='link_login'>Have an account?  Sign in</NavLink>

                        </Form>
                    )}
                </Formik>
        </div>
    );
}
