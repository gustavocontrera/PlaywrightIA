import { expect, Locator, Page } from '@playwright/test';
import { cartData } from '../data/cart.data';

export class CheckoutPage {
  readonly page: Page;
  readonly main: Locator;
  readonly heading: Locator;

  // Buyer Info
  readonly nameInput: Locator;
  readonly lastnameInput: Locator;
  readonly emailInput: Locator;
  readonly addressInput: Locator;
  readonly countrySelect: Locator;

  // Payment Info
  readonly nameHolderInput: Locator;
  readonly cardNumberInput: Locator;
  readonly expiryDateInput: Locator;
  readonly securityCodeInput: Locator;
  readonly completePaymentBtn: Locator;

  // Confirmation Modal
  readonly dialog: Locator;
  readonly orderCreatedHeading: Locator;
  readonly orderCreatedMessage: Locator;
  readonly goToAccountBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.main = page.getByRole('main');
    this.heading = this.main.getByRole('heading', { name: 'Checkout', level: 1 });

    this.nameInput = this.main.getByPlaceholder('John', { exact: true });
    this.lastnameInput = this.main.getByPlaceholder('Doe', { exact: true });
    this.emailInput = this.main.getByPlaceholder('mail@domain.com');
    this.addressInput = this.main.getByPlaceholder('1234 Calle Primavera');
    this.countrySelect = this.main.locator('select#country');

    this.nameHolderInput = this.main.getByPlaceholder('John Doe', { exact: true });
    this.cardNumberInput = this.main.getByPlaceholder('1234 5678 9012 3456');
    this.expiryDateInput = this.main.locator('input[name="expiryDate"]');
    this.securityCodeInput = this.main.locator('input[name="securityCode"]');
    this.completePaymentBtn = this.main.getByRole('button', { name: 'Completar Pago' });

    this.dialog = page.getByRole('dialog');
    this.orderCreatedHeading = this.dialog.getByRole('heading', { name: cartData.messages.orderCreatedTitle, level: 2 });
    this.orderCreatedMessage = this.dialog.getByText(cartData.messages.orderCreatedBody);
    this.goToAccountBtn = this.dialog.getByRole('button', { name: 'Ir a mi cuenta' });
  }

  async goto(): Promise<void> {
    await this.page.goto(cartData.urls.checkout);
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(cartData.urls.checkout);
    await expect(this.heading).toBeVisible();
  }

  async fillBuyerInfo(buyer: typeof cartData.buyer): Promise<void> {
    await this.nameInput.fill(buyer.name);
    await this.lastnameInput.fill(buyer.lastname);
    await this.emailInput.fill(buyer.email);
    await this.addressInput.fill(buyer.address);
    await this.countrySelect.selectOption(buyer.country);
  }

  async fillPaymentInfo(
    cardHolder: string,
    cardNumber: string,
    expiryDate: string,
    securityCode: string
  ): Promise<void> {
    await this.nameHolderInput.fill(cardHolder);
    await this.cardNumberInput.fill(cardNumber);
    await this.expiryDateInput.fill(expiryDate);
    await this.securityCodeInput.fill(securityCode);
  }

  async expectOrderSummary(productName: string, quantity: number, total: string): Promise<void> {
    await expect(this.main.getByText('Resumen de Orden')).toBeVisible();
    await expect(this.main.getByText(productName)).toBeVisible();
    await expect(this.main.getByText(`Cantidad: ${quantity}`)).toBeVisible();
    await expect(this.main.getByText(total).first()).toBeVisible();
  }

  async expectPaymentButtonDisabled(): Promise<void> {
    await expect(this.completePaymentBtn).toBeDisabled();
  }

  async expectPaymentButtonEnabled(): Promise<void> {
    await expect(this.completePaymentBtn).toBeEnabled();
  }

  async submitPayment(): Promise<void> {
    await this.completePaymentBtn.click();
  }

  async expectOrderConfirmation(): Promise<void> {
    await expect(this.dialog).toBeVisible();
    await expect(this.orderCreatedHeading).toBeVisible();
    await expect(this.orderCreatedMessage).toBeVisible();
    await expect(this.goToAccountBtn).toBeVisible();
  }
}
