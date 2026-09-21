# Plan de pruebas - Flujo de login

## Application Overview

Plan de pruebas funcionales para el flujo de autenticación de laboratoriodetesting.com, basado en la historia de usuario: "Como usuario registrado, quiero poder ingresar con mi email y password. Si las credenciales son invalidas, quiero ver un mensaje de error claro". La pantalla de login se encuentra en https://www.laboratoriodetesting.com/auth/login y contiene campos Email y Contraseña, botón Iniciar Sesión, enlace de registro y acción de recuperación de contraseña. Credenciales válidas confirmadas durante la exploración: arcadisweb@gmail.com / libreroloco. Cada escenario parte de un estado limpio y debe ejecutarse de forma independiente.

## Test Scenarios

### 1. Autenticación - Login

**Seed:** `test/login.spec.ts`

#### 1.1. Login exitoso con credenciales válidas

**File:** `test/login/login-success.spec.ts`

**Steps:**
  1. Navegar a https://www.laboratoriodetesting.com/auth/login.
    - expect: La URL debe ser https://www.laboratoriodetesting.com/auth/login.
    - expect: Debe mostrarse el encabezado "Inicia Sesión".
  2. Ingresar "arcadisweb@gmail.com" en el campo con placeholder "Ingresa tu email".
    - expect: El campo Email debe mostrar el valor ingresado.
  3. Ingresar "libreroloco" en el campo con placeholder "Ingresa tu contraseña".
    - expect: El campo Contraseña debe aceptar el valor sin mostrarlo en texto plano.
  4. Verificar que el botón "Iniciar Sesión" esté habilitado y hacer clic en él.
    - expect: El formulario debe enviarse sin mostrar errores de validación.
  5. Esperar la navegación y observar la página resultante.
    - expect: La URL debe cambiar a https://www.laboratoriodetesting.com/.
    - expect: El título debe ser "Laboratorio de Testing | Home".
    - expect: No debe mostrarse un diálogo de error de autenticación.

#### 1.2. Login rechazado con credenciales inválidas

**File:** `test/login/login-invalid-credentials.spec.ts`

**Steps:**
  1. Navegar a https://www.laboratoriodetesting.com/auth/login.
    - expect: Debe mostrarse el formulario de login y el encabezado "Inicia Sesión".
  2. Ingresar "invalido@test.com" en Email y "ClaveFalsa123" en Contraseña.
    - expect: Ambos campos deben contener los valores ingresados.
  3. Hacer clic en "Iniciar Sesión".
    - expect: La aplicación debe permanecer en la pantalla de login.
  4. Inspeccionar el diálogo de error.
    - expect: Debe mostrarse un diálogo con encabezado "Error".
    - expect: Debe mostrarse el mensaje "No pudimos iniciar sesión con estas credenciales. Intenta de nuevo.".
    - expect: Debe mostrarse el botón "Volver".
  5. Hacer clic en "Volver".
    - expect: El diálogo debe cerrarse.
    - expect: El formulario debe quedar disponible para volver a intentarlo.

#### 1.3. Validación de formato de email

**File:** `test/login/login-email-validation.spec.ts`

**Steps:**
  1. Navegar a https://www.laboratoriodetesting.com/auth/login.
    - expect: El botón "Iniciar Sesión" debe estar deshabilitado mientras el formulario esté vacío.
  2. Ingresar "email-no-valido" en el campo Email y una contraseña de al menos 8 caracteres en Contraseña.
    - expect: Debe mostrarse el mensaje de validación "Email inválido".
    - expect: El botón "Iniciar Sesión" debe permanecer deshabilitado.
    - expect: No debe enviarse una solicitud de autenticación.
  3. Reemplazar el email por "arcadisweb@gmail.com".
    - expect: El mensaje "Email inválido" debe desaparecer.
    - expect: El formulario debe quedar listo para continuar si la contraseña también es válida.

#### 1.4. Validación de longitud mínima de contraseña

**File:** `test/login/login-password-validation.spec.ts`

**Steps:**
  1. Navegar a https://www.laboratoriodetesting.com/auth/login.
    - expect: Debe mostrarse el formulario vacío.
  2. Ingresar un email válido y "123" en el campo Contraseña.
    - expect: Debe mostrarse el mensaje "La contraseña debe tener al menos 8 caracteres".
    - expect: El botón "Iniciar Sesión" debe permanecer deshabilitado.
    - expect: No debe iniciarse el envío del formulario.
  3. Reemplazar la contraseña por "libreroloco".
    - expect: El mensaje de longitud mínima debe desaparecer.
    - expect: El botón "Iniciar Sesión" debe habilitarse si el email es válido.

#### 1.5. Prevención de envío con campos vacíos

**File:** `test/login/login-empty-fields.spec.ts`

**Steps:**
  1. Navegar a https://www.laboratoriodetesting.com/auth/login sin completar ningún campo.
    - expect: Los campos Email y Contraseña deben estar vacíos.
    - expect: El botón "Iniciar Sesión" debe estar deshabilitado.
  2. Intentar activar el envío usando el teclado o haciendo clic en el botón si estuviera disponible.
    - expect: No debe producirse navegación.
    - expect: No debe mostrarse un diálogo de credenciales inválidas, porque la validación del cliente debe impedir el envío.

#### 1.6. Acceso a recuperación de contraseña

**File:** `test/login/login-forgot-password.spec.ts`

**Steps:**
  1. Navegar a https://www.laboratoriodetesting.com/auth/login.
    - expect: Debe mostrarse el botón "¿Olvidaste tu contraseña?".
  2. Hacer clic en "¿Olvidaste tu contraseña?".
    - expect: Debe abrirse el flujo o pantalla de recuperación de contraseña.
    - expect: La aplicación no debe generar un error inesperado ni dejar el control sin respuesta.

#### 1.7. Navegación a registro desde login

**File:** `test/login/login-signup-link.spec.ts`

**Steps:**
  1. Navegar a https://www.laboratoriodetesting.com/auth/login.
    - expect: Debe mostrarse el enlace "¿No tienes una cuenta? Crea una".
  2. Hacer clic en el enlace de registro.
    - expect: La URL debe cambiar a https://www.laboratoriodetesting.com/auth/signup.
    - expect: Debe mostrarse la pantalla de creación de cuenta.
