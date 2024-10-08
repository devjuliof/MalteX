import React from 'react';
import InputWithLabel from '../components/InputWithLabel';
import GreenButton from '../components/GreenButton';
import fonts from '../fonts/fonts.module.css';
import BackArrow from '../assets/back_arrow.svg';
import styles from './css/SignUpAndSignIn.module.css';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errors, setErrors] = React.useState({ email: '', password: '' });

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validatePassword = (password) => {
    if (!password) return 'A senha é obrigatória.';
    if (password.length < 8) return 'A senha deve ter pelo menos 8 caracteres.';
    return '';
  };

  const handleChangeEmail = ({ target }) => {
    const value = target.value;
    setEmail(value);
    const emailError = value
      ? validateEmail(value)
        ? ''
        : 'O e-mail deve ser válido.'
      : 'O e-mail é obrigatório.';
    setErrors((prevErrors) => ({ ...prevErrors, email: emailError }));
  };

  const handleChangePassword = ({ target }) => {
    const value = target.value;
    setPassword(value);
    const passwordError = validatePassword(value);
    setErrors((prevErrors) => ({ ...prevErrors, password: passwordError }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailError = email
      ? validateEmail(email)
        ? ''
        : 'O e-mail deve ser válido.'
      : 'O e-mail é obrigatório.';
    const passwordError = validatePassword(password);

    setErrors({ email: emailError, password: passwordError });

    if (!emailError && !passwordError) {
      const url = 'https://maltex-back-production.up.railway.app/clients';
      const data = {
        email: email,
        uf: '',
        city: '',
        neighborhood: '',
        road: '',
        number_house: '',
        complement: '',
        password: password,
      };

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data);
        });
    }
  };

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <img onClick={handleBackClick} src={BackArrow} alt="Back Arrow" />
        <h2 className={fonts.poppinsRegular}>Criar nova conta</h2>
      </header>
      <form className={styles.form} onSubmit={handleSubmit}>
        <InputWithLabel
          onChange={handleChangeEmail}
          inputClass={`${styles.input} ${
            errors.email ? styles.errorInput : ''
          }`}
          labelClass={styles.label}
          labelText={'Email:'}
          inputType={'email'}
          htmlFor={'createAccountEmailInput'}
        />
        {errors.email && (
          <p
            style={{ color: 'red' }}
            className={`${styles.errorText} ${fonts.robotoRegular}`}
          >
            {errors.email}
          </p>
        )}

        <InputWithLabel
          onChange={handleChangePassword}
          inputClass={`${styles.input} ${
            errors.password ? styles.errorInput : ''
          }`}
          labelClass={styles.label}
          labelText={'Senha:'}
          inputType={'current-password'}
          htmlFor={'createAccountPasswordInput'}
        />
        {errors.password && (
          <p
            style={{ color: 'red' }}
            className={`${styles.errorText} ${fonts.robotoRegular}`}
          >
            {errors.password}
          </p>
        )}

        <GreenButton
          classButton={styles.button}
          text={'Criar conta'}
          type="submit"
        />
      </form>
    </section>
  );
};

export default SignUpPage;
