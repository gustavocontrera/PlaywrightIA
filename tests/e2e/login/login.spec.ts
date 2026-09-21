import { test, expect } from '@playwright/test';

import { loginData } from '../../data/login.data';
import { LoginPage } from '../../pages/login.page';

test.describe('Autenticación - Login', () => {
  test('Login exitoso con credenciales válidas', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.expectLoaded();

    await loginPage.fillCredentials(loginData.credentials.valid.email, loginData.credentials.valid.password);
    await expect(loginPage.emailInput).toHaveValue(loginData.credentials.valid.email);
    await expect(loginPage.passwordInput).toHaveAttribute('type', 'password');

    await expect(loginPage.submitButton).toBeEnabled();
    await loginPage.submit();
    await expect(page).toHaveURL(loginData.urls.home);
    await expect(page).toHaveTitle(loginData.titles.home);
    await expect(page.getByRole('dialog')).toBeHidden();
  });

  test('Login rechazado con credenciales inválidas', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.expectLoaded();

    await loginPage.fillCredentials(loginData.credentials.invalid.email, loginData.credentials.invalid.password);
    await loginPage.submit();
    await expect(page).toHaveURL(loginData.urls.login);
    await loginPage.expectInvalidCredentialsError();
    await loginPage.dismissError();
  });

  test('Validación de formato de email', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await expect(loginPage.submitButton).toBeDisabled();

    await loginPage.fillCredentials(loginData.credentials.invalidEmail, loginData.credentials.validTestPassword);
    await expect(page.getByText(loginData.messages.invalidEmail)).toBeVisible();
    await expect(loginPage.submitButton).toBeEnabled();
    await expect(page).toHaveURL(loginData.urls.login);

    await loginPage.emailInput.fill(loginData.credentials.valid.email);
    await expect(page.getByText(loginData.messages.invalidEmail)).toBeHidden();
  });

  test('Validación de longitud mínima de contraseña', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await expect(loginPage.emailInput).toHaveValue('');
    await expect(loginPage.passwordInput).toHaveValue('');

    await loginPage.fillCredentials(loginData.credentials.valid.email, loginData.credentials.shortPassword);
    await expect(page.getByText(loginData.messages.shortPassword)).toBeVisible();
    await expect(loginPage.submitButton).toBeDisabled();
    await expect(page).toHaveURL(loginData.urls.login);

    await loginPage.passwordInput.fill(loginData.credentials.valid.password);
    await expect(page.getByText(loginData.messages.shortPassword)).toBeHidden();
    await expect(loginPage.submitButton).toBeEnabled();
  });

  test('Prevención de envío con campos vacíos', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await expect(loginPage.emailInput).toHaveValue('');
    await expect(loginPage.passwordInput).toHaveValue('');
    await expect(loginPage.submitButton).toBeDisabled();

    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(loginData.urls.login);
    await expect(page.getByRole('dialog')).toBeHidden();
  });

  test('Acceso a recuperación de contraseña', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await expect(loginPage.forgotPasswordButton).toBeVisible();

    await loginPage.openPasswordRecovery();
    await expect(loginPage.dialog).toBeVisible();
    await expect(loginPage.dialog.getByRole('heading', { name: loginData.headings.recovery, level: 2 })).toBeVisible();
    await expect(loginPage.dialog.getByRole('button', { name: loginData.buttons.recoverPassword })).toBeVisible();
  });

  test('Navegación a registro desde login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await expect(loginPage.signupLink).toBeVisible();

    await loginPage.openSignup();
    await expect(page).toHaveURL(loginData.urls.signup);
    await expect(page).toHaveTitle(loginData.titles.signup);
  });
});