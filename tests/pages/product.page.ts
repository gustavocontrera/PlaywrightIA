import { expect, Locator, Page } from '@playwright/test';
import { cartData } from '../data/cart.data';

export class ProductPage {
  readonly page: Page;
  readonly productTitle: Locator;
  readonly productPrice: Locator;
  readonly quantityDisplay: Locator;
  readonly incrementQuantityBtn: Locator;
  readonly decrementQuantityBtn: Locator;
  readonly addToCartBtn: Locator;
  readonly cartOpenerBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productTitle = page.getByRole('heading', { level: 1 });
    this.productPrice = page.locator('p.text-2xl.font-bold');
    this.incrementQuantityBtn = page.locator('[data-at="increment-quantity"]');
    this.decrementQuantityBtn = page.locator('[data-at="decrement-quantity"]');
    this.quantityDisplay = this.incrementQuantityBtn.locator('..').locator('span');
    this.addToCartBtn = page.locator('[data-at="add-to-cart"]');
    this.cartOpenerBtn = page.locator('[data-at="cart-opener"]');
  }

  async goto(): Promise<void> {
    await this.page.goto(cartData.urls.product);
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(cartData.urls.product);
    await expect(this.productTitle).toHaveText(cartData.product.name);
    await expect(this.productPrice).toContainText(cartData.product.unitPrice);
  }

  async incrementQuantity(): Promise<void> {
    await this.incrementQuantityBtn.click();
  }

  async decrementQuantity(): Promise<void> {
    await this.decrementQuantityBtn.click();
  }

  async addToCart(): Promise<void> {
    await this.addToCartBtn.click();
  }

  async openCart(): Promise<void> {
    await this.cartOpenerBtn.click();
    await expect(this.page.getByRole('complementary')).toBeVisible();
    await expect(this.page.getByRole('complementary')).not.toHaveClass(/translate-x-full/);
  }
}
