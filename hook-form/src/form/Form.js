import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import styles from './form.module.css';

const Form = () => {
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string()
            .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Invalid email format')
            .required('Email is required'),
        password: Yup.string()
            .min(5, 'Password must be at least 5 characters')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Please confirm your password'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <div className={styles.formContainer}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <h2>Register with</h2>

                <div className={styles.formGroup}>
					<label className={styles.label}>Name</label>
                    <input
                        type="text"
                        placeholder="Your full name"
                        {...register('name')}
                    />
                    {errors.name && <p className={styles.error}>{errors.name.message}</p>}
                </div>

                <div className={styles.formGroup}>
					<label className={styles.label}>Email</label>
                    <input
                        type="email"
                        placeholder="Your email"
                        {...register('email')}
                    />
                    {errors.email && <p className={styles.error}>{errors.email.message}</p>}
                </div>

                <div className={styles.formGroup}>
					<label className={styles.label}>Password</label>
                    <input
                        type="password"
                        placeholder="Your password"
                        {...register('password')}
                    />
                    {errors.password && <p className={styles.error}>{errors.password.message}</p>}
                </div>

                <div className={styles.formGroup}>
					<label className={styles.label}>Re-enter password</label>
                    <input
                        type="password"
                        placeholder="Your password"
                        {...register('confirmPassword')}
                    />
                    {errors.confirmPassword && <p className={styles.error}>{errors.confirmPassword.message}</p>}
                </div>

                <button type="submit" className={styles.submitButton}>
                    CONTINUE
                </button>
            </form>
        </div>
    );
};

export default Form;
