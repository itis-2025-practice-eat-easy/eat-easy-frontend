import Header from '../../components/Header/Header.tsx';
import Footer from '../../components/Footer/Footer.tsx';
import Button from '../../components/Button/Button.tsx';
import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useAuth } from "../../context/AuthApi.tsx";
import { updateUser } from "../../api/userApi";
import './profile_page.css';

interface ProfileFormValues {
    firstName: string;
    lastName: string;
    email: string;
}

const ProfileSchema = Yup.object().shape({
    firstName: Yup.string().required('Обязательное поле'),
    lastName:  Yup.string().required('Обязательное поле'),
    email:     Yup.string().email('Неверный формат').required('Обязательное поле'),
});

export default function ProfilePage() {
    const { user, userId, setUser, email: contextEmail, setEmail } = useAuth();

    if (!userId) {
        return <div className="profile-container">Пожалуйста, войдите</div>;
    }
    if (!user) {
        return <div className="profile-container">Loading user...</div>;
    }

    const initialValues: ProfileFormValues = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
    };

    const handleSubmit = async (
        values: ProfileFormValues,
        helpers: FormikHelpers<ProfileFormValues>
    ) => {
        helpers.setSubmitting(true);
        try {
            const updated = await updateUser(userId, values);
            setUser(updated);
            if (updated.email !== contextEmail) {
                setEmail(updated.email);
                localStorage.setItem('userEmail', updated.email);
            }
        } catch (err: any) {
            if (err.response?.data?.errors) {
                const errorsObj = err.response.data.errors as Record<string, string>;
                Object.entries(errorsObj).forEach(([field, message]) => {
                    let formField = field;
                    if (field === 'first_name') formField = 'firstName';
                    else if (field === 'last_name') formField = 'lastName';
                    else if (field === 'email') formField = 'email';
                    helpers.setFieldError(formField, message);
                });
            } else {
                console.error('Ошибка обновления профиля', err);
            }
        } finally {
            helpers.setSubmitting(false);
        }
    };

    return (
        <>
            <Header />
            <main className="profile-container">
                <div className="profile-card">
                    <div className="profile-avatar">
                        <img
                            src="./src/assets/profile/icon-user.png"
                            alt="Avatar"
                            className="profile-avatar-img"
                        />
                    </div>
                    <div className="profile-details">
                        <Formik
                            enableReinitialize
                            initialValues={initialValues}
                            validationSchema={ProfileSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting }) => (
                                <Form className="profile-form">
                                    <div className="form-group">
                                        <label htmlFor="firstName">First name:</label>
                                        <Field id="firstName" name="firstName" className="profile-field" />
                                        <ErrorMessage name="firstName" component="div" className="field-error" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="lastName">Last name:</label>
                                        <Field id="lastName" name="lastName" className="profile-field" />
                                        <ErrorMessage name="lastName" component="div" className="field-error" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email">Email:</label>
                                        <Field id="email" name="email" type="email" className="profile-field" />
                                        <ErrorMessage name="email" component="div" className="field-error" />
                                    </div>

                                    <div className="buttons-row">
                                        <Button type="submit" className="save-btn" >
                                            {isSubmitting ? 'Saving...' : 'Save'}
                                        </Button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
                <div className="orders-history">
                    <span className="orders-history__title">Orders History</span>
                </div>
            </main>
            <Footer />
        </>
    );
}
