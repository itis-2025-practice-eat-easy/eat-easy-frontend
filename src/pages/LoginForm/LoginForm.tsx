import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from 'formik';
import { NavLink, useNavigate } from 'react-router-dom';
import { loginSchema } from "../../utils/validation/loginSchema.ts";
import './login.css'
import Button from "../../components/Button/Button.tsx";
import {useAuth} from "../../context/AuthApi.tsx";

    interface LoginFormValues {
        email: string;
        password: string;
    }

    export default function LoginForm() {
        const navigate = useNavigate();
        const { login, loading } = useAuth();
        const [generalError, setGeneralError] = useState<string | null>(null);

        const initialValues: LoginFormValues = { email: '', password: '' };

        const handleSubmit = async (
            { email, password }: LoginFormValues,
            helpers: FormikHelpers<LoginFormValues>
        ) => {
            setGeneralError(null);
            helpers.setSubmitting(true);
            try {
                const fingerprint = crypto.randomUUID();
                await login(email, password, fingerprint);
                navigate("/");
            } catch (err: any) {
                const msg = err.response?.data?.error || err.message || 'Ошибка при входе';
                setGeneralError(msg);
            } finally {
                helpers.setSubmitting(false);
            }
        };

        return (
            <div className="login-container">
                <div className="login-card">
                    <h2 className="login-title">Sign In</h2>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={loginSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <div className="login-field-group">
                                    <label htmlFor="email" className="login-label">Email</label>
                                    <Field id="email" name="email" type="text" placeholder="user@example.com" className="login-input"
                                    />
                                    <ErrorMessage name="email">
                                    {msg => <div className="login-error-message">{msg}</div>}
                                </ErrorMessage>
                                </div>

                                <div className="login-field-group">
                                    <label htmlFor="password" className="login-label">Password</label>
                                    <Field
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="••••••••"
                                        className="login-input"
                                    />
                                    <ErrorMessage name="password">
                                        {msg => <div className="login-error-message">{msg}</div>}
                                    </ErrorMessage>
                                </div>

                                {generalError && <div className="login-error-message">{generalError}</div>}
                                <div className='reg__btn'>
                                    <Button
                                        type="submit"
                                        className="login-submit-button"
                                    >
                                        {isSubmitting || loading ? 'Signing in...' : "Let's go!"}
                                    </Button>
                                    <NavLink to='/registration' className='link_login'>Sign up</NavLink>
                                </div>
                            </Form>
                            )}
                    </Formik>
                </div>
            </div>
    );
    }
