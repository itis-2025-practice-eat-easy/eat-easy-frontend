import { useState } from 'react';
import Header from '../../components/Header/Header.tsx';
import Footer from '../../components/Footer/Footer.tsx';
import Button from '../../components/Button/Button.tsx';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
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

const MOCK_USER = {
    firstName: 'Энже',
    lastName:  'Ашрафуллина',
    email:     'enzhe.ashrafullina@mail.ru',
};

export default function ProfilePage() {
    const [savedData, setSavedData] = useState<ProfileFormValues | null>(null);

    const initialValues: ProfileFormValues = savedData || MOCK_USER;

    const handleSubmit = async (values: ProfileFormValues) => {
        setSavedData(values);
        console.log('Сохранено локально:', values);
    };

    return (
        <>
            <Header />

            <main className="profile-container">
                <div className="profile-card">
                    <div className="profile-avatar">
                        <img
                            src="./src/assets/icon-user.png"
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
                                        <label htmlFor="firstName">First name: </label>
                                        <Field id="firstName" name="firstName" className="profile-field"  />
                                        <ErrorMessage name="firstName" component="div" className="field-error" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="lastName">Last name: </label>
                                        <Field id="lastName" name="lastName" className="profile-field"  />
                                        <ErrorMessage name="lastName" component="div" className="field-error" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email">Email: </label>
                                        <Field id="email" name="email" type="email" className="profile-field"  />
                                        <ErrorMessage name="email" component="div" className="field-error" />
                                    </div>

                                    <div className="buttons-row">
                                        <Button
                                            type="submit"
                                            className="save-btn"
                                        >
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
