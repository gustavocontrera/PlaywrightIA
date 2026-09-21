export const loginData = {
  urls: {
    login: 'https://www.laboratoriodetesting.com/auth/login',
    home: 'https://www.laboratoriodetesting.com/',
    signup: 'https://www.laboratoriodetesting.com/auth/signup',
  },
  titles: {
    home: 'Laboratorio de Testing | Home',
    signup: 'Laboratorio de Testing | Signup',
  },
  headings: {
    login: 'Inicia Sesión',
    error: 'Error',
    recovery: 'Ingresa tu dirección email',
  },
  placeholders: {
    email: 'Ingresa tu email',
    password: 'Ingresa tu contraseña',
  },
  buttons: {
    submit: 'Iniciar Sesión',
    forgotPassword: '¿Olvidaste tu contraseña?',
    dismissError: 'Volver',
    recoverPassword: 'Recuperar contraseña',
  },
  links: {
    signup: '¿No tienes una cuenta? Crea una',
  },
  credentials: {
    valid: {
      email: 'arcadisweb@gmail.com',
      password: 'libreroloco',
    },
    invalid: {
      email: 'invalido@test.com',
      password: 'ClaveFalsa123',
    },
    invalidEmail: 'email-no-valido',
    shortPassword: '123',
    validTestPassword: 'PasswordValida123',
  },
  messages: {
    invalidCredentials: 'No pudimos iniciar sesión con estas credenciales. Intenta de nuevo.',
    invalidEmail: 'Email inválido',
    shortPassword: 'La contraseña debe tener al menos 8 caracteres',
  },
} as const;