import { expect, Locator, Page } from '@playwright/test';
import { cartData } from '../data/cart.data';

export class CartPage {
  readonly page: Page;
  readonly aside: Locator;
  readonly closeBtn: Locator;
  readonly emptyCartBtn: Locator;
  readonly checkoutBtn: Locator;
  readonly totalText: Locator;
  readonly emptyMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.aside = page.getByRole('complementary');
    this.closeBtn = this.aside.locator('button').first();
    this.emptyCartBtn = this.aside.getByRole('button', { name: 'Limpiar' });
    this.checkoutBtn = this.aside.getByRole('button', { name: 'Ir al checkout' });
    this.totalText = this.aside.locator('p:has-text("Total:")');
    this.emptyMessage = this.aside.getByText(cartData.messages.emptyCart);
  }

  async expectOpen(): Promise<void> {
    await expect(this.aside).toBeVisible();
    await expect(this.aside).not.toHaveClass(/translate-x-full/);
  }

  async expectEmpty(): Promise<void> {
    await expect(this.emptyMessage).toBeVisible();
    await expect(this.totalText).toContainText('$0.00');
  }

  async emptyCartIfNotEmpty(): Promise<void> {
    if (await this.emptyCartBtn.isEnabled()) {
      await this.emptyCartBtn.click();
      await expect(this.emptyMessage).toBeVisible();
    }
  }

  async close(): Promise<void> {
    await this.closeBtn.click();
    await expect(this.aside).toHaveClass(/translate-x-full/);
  }

  async goToCheckout(): Promise<void> {
    await this.checkoutBtn.click();
  }

  async expectProductInCart(name: string, quantity: number, price: string): Promise<void> {
    await expect(this.aside.getByText(name)).toBeVisible();
    await expect(this.aside.getByText(String(quantity), { exact: true })).toBeVisible();
    await expect(this.aside.getByText(price, { exact: true })).toBeVisible();
  }

  async expectTotal(total: string): Promise<void> {
    await expect(this.totalText).toContainText(total);
  }
}
