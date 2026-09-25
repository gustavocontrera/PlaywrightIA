# Plan de pruebas - Login y autenticación

## Application Overview

Plan de pruebas funcionales y de validación para el flujo de autenticación de **laboratoriodetesting.com**, derivado de la historia de usuario documentada en `docs/historia-login.md`.

- **Actor:** Usuario registrado en laboratoriodetesting.com.
- **URL de inicio:** https://laboratoriodetesting.com/auth/login
- **Objetivo:** Iniciar sesión con email y contraseña para acceder a la cuenta, garantizando retroalimentación clara ante credenciales incorrectas, validaciones en línea para formatos de correo inválidos y bloqueo de envíos con formularios vacíos.
- **Componentes clave:**
  - Formulario de login: Campo Email (`input[placeholder="Ingresa tu email"]`), Campo Contraseña (`input[placeholder="Ingresa tu contraseña"]`).
  - Botón de acción: `Iniciar Sesión` (`button[data-at="submit-login"]`).
  - Notificaciones / Diálogos: Modal de error (`role="dialog"`) con mensaje y botón de cierre (`Volver`).
  - Validaciones inline: Mensaje de error de formato (`Email inválido`).

---

## Test Scenarios

### 1. Autenticación - Login

**Seed:** `test/seed.spec.ts`

#### 1.1. Login exitoso con credenciales válidas

**File:** `test/login/login-success.spec.ts`

**Steps:**
  1. Navegar a https://laboratoriodetesting.com/auth/login.
     - expect: La URL debe ser https://laboratoriodetesting.com/auth/login.
     - expect: Debe mostrarse el encabezado "Inicia Sesión".
     - expect: Los campos de Email y Contraseña deben encontrarse visibles y vacíos.
  2. Ingresar email registrado válido "arcadisweb@gmail.com" en el campo Email.
     - expect: El campo Email debe reflejar exactamente el texto ingresado.
  3. Ingresar contraseña correspondiente "libreroloco" en el campo Contraseña.
     - expect: El campo Contraseña debe aceptar el valor ingresado y mantener atributo type="password".
  4. Verificar que el botón "Iniciar Sesión" esté habilitado y hacer clic en él.
     - expect: El botón "Iniciar Sesión" debe estar habilitado.
     - expect: El formulario se envía sin advertencias ni bloqueos del cliente.
  5. Esperar la resolución de la autenticación y la redirección.
     - expect: La URL debe cambiar a https://laboratoriodetesting.com/.
     - expect: El título de la página debe ser "Laboratorio de Testing | Home".
     - expect: No debe desplegarse ningún diálogo modal de error.

#### 1.2. Login rechazado con credenciales incorrectas

**File:** `test/login/login-invalid-credentials.spec.ts`

**Steps:**
  1. Navegar a https://laboratoriodetesting.com/auth/login.
     - expect: Debe cargarse el formulario de autenticación.
  2. Ingresar "usuario.invalido@test.com" en el campo Email.
     - expect: El campo Email debe contener el valor ingresado sin errores sintácticos.
  3. Ingresar una contraseña incorrecta "PasswordErronea123" en el campo Contraseña.
     - expect: El campo Contraseña debe contener el valor ingresado.
  4. Hacer clic en el botón "Iniciar Sesión".
     - expect: La solicitud debe ser rechazada por el servicio de autenticación.
     - expect: La URL debe permanecer en https://laboratoriodetesting.com/auth/login.
  5. Inspeccionar el mensaje de retroalimentación de error.
     - expect: Debe desplegarse un diálogo modal (`role="dialog"`).
     - expect: El diálogo debe incluir el encabezado "Error".
     - expect: Debe mostrarse el mensaje claro: "No pudimos iniciar sesión con estas credenciales. Intenta de nuevo.".
     - expect: Debe existir el botón "Volver".
  6. Hacer clic en el botón "Volver".
     - expect: El diálogo modal de error debe cerrarse.
     - expect: El usuario debe permanecer en la página de login disponible para un nuevo intento.

#### 1.3. Validación de email con formato inválido

**File:** `test/login/login-invalid-email-format.spec.ts`

**Steps:**
  1. Navegar a https://laboratoriodetesting.com/auth/login.
     - expect: Debe mostrarse el formulario de inicio de sesión con campos vacíos.
  2. Ingresar el email con formato inválido "usuario@dominio" (sin extensión de dominio/TLD) en el campo Email.
     - expect: El campo Email debe reflejar el valor "usuario@dominio".
  3. Ingresar una contraseña con longitud suficiente (ej. "PasswordValida123") en el campo Contraseña.
     - expect: El campo Contraseña debe recibir el valor.
  4. Comprobar la validación visual del campo Email.
     - expect: Debe mostrarse el mensaje de validación "Email inválido" visible bajo el campo correspondiente.
  5. Reemplazar el valor por un email con formato correcto (ej. "arcadisweb@gmail.com").
     - expect: El mensaje de validación "Email inválido" debe desaparecer automáticamente de la interfaz.

#### 1.4. Prevención de envío con campos vacíos

**File:** `test/login/login-empty-fields.spec.ts`

**Steps:**
  1. Navegar a https://laboratoriodetesting.com/auth/login sin interactuar con ningún campo.
     - expect: El campo Email debe tener valor vacío.
     - expect: El campo Contraseña debe tener valor vacío.
  2. Comprobar el estado del botón "Iniciar Sesión".
     - expect: El botón "Iniciar Sesión" debe encontrarse deshabilitado (estado disabled).
  3. Intentar accionar el envío mediante teclado presionando la tecla "Enter" en el formulario.
     - expect: El formulario no debe enviarse.
     - expect: La URL debe mantenerse fija en https://laboratoriodetesting.com/auth/login.
     - expect: No debe aparecer el diálogo modal de error de credenciales, ya que la validación en el cliente previene la solicitud al servidor.
