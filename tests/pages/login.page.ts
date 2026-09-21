import { expect, Locator, Page } from '@playwright/test';

import { loginData } from '../data/login.data';

export class LoginPage {
	readonly page: Page;
	readonly emailInput: Locator;
	readonly passwordInput: Locator;
	readonly submitButton: Locator;
	readonly forgotPasswordButton: Locator;
	readonly signupLink: Locator;
	readonly dialog: Locator;

	constructor(page: Page) {
		this.page = page;
		this.emailInput = page.getByPlaceholder(loginData.placeholders.email);
		this.passwordInput = page.getByPlaceholder(loginData.placeholders.password);
		this.submitButton = page.getByRole('button', { name: loginData.buttons.submit });
		this.forgotPasswordButton = page.getByRole('button', { name: loginData.buttons.forgotPassword });
		this.signupLink = page.getByRole('link', { name: loginData.links.signup });
		this.dialog = page.getByRole('dialog');
	}

	async goto(): Promise<void> {
		await this.page.goto(loginData.urls.login);
	}

	async expectLoaded(): Promise<void> {
		await expect(this.page).toHaveURL(loginData.urls.login);
		await expect(this.page.getByRole('heading', { name: loginData.headings.login, level: 1 })).toBeVisible();
	}

	async fillCredentials(email: string, password: string): Promise<void> {
		await this.emailInput.fill(email);
		await this.passwordInput.fill(password);
	}

	async submit(): Promise<void> {
		await this.submitButton.click();
	}

	async expectInvalidCredentialsError(): Promise<void> {
		await expect(this.dialog).toBeVisible();
		await expect(this.dialog.getByRole('heading', { name: loginData.headings.error, level: 2 })).toBeVisible();
		await expect(this.dialog).toContainText(loginData.messages.invalidCredentials);
		await expect(this.dialog.getByRole('button', { name: loginData.buttons.dismissError })).toBeVisible();
	}

	async dismissError(): Promise<void> {
		await this.dialog.getByRole('button', { name: loginData.buttons.dismissError }).click();
		await expect(this.dialog).toBeHidden();
	}

	async openPasswordRecovery(): Promise<void> {
		await this.forgotPasswordButton.click();
	}

	async openSignup(): Promise<void> {
		await this.signupLink.click();
	}
}