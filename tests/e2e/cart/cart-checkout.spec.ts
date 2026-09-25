import { test, expect } from '@playwright/test';

import { loginData } from '../../data/login.data';
import { cartData } from '../../data/cart.data';
import { LoginPage } from '../../pages/login.page';
import { ProductPage } from '../../pages/product.page';
import { CartPage } from '../../pages/cart.page';
import { CheckoutPage } from '../../pages/checkout.page';

test.describe('Carrito y Checkout - Flujo Completo E2E', () => {
  test('Flujo completo: Login, validación carrito vacío, adición de producto, actualización de cantidad y pago', async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // ==========================================
    // PASO 1: Autenticación de usuario
    // ==========================================
    await loginPage.goto();
    await loginPage.expectLoaded();
    await loginPage.fillCredentials(loginData.credentials.valid.email, loginData.credentials.valid.password);
    await loginPage.submit();
    await expect(page).toHaveURL(loginData.urls.home);
    await page.screenshot({ path: cartData.screenshots.step1Login });

    // ==========================================
    // PASO 2: Validación de carrito vacío y bloqueo de pago
    // ==========================================
    await productPage.goto();
    await productPage.expectLoaded();
    await productPage.openCart();
    await cartPage.emptyCartIfNotEmpty();
    await cartPage.expectEmpty();
    await page.screenshot({ path: 'docs/screenshots/02-carrito-vacio-drawer.png' });
    await cartPage.close();

    // Navegar a checkout con carrito vacío para verificar que el pago está deshabilitado
    await checkoutPage.goto();
    await checkoutPage.expectLoaded();
    await checkoutPage.fillBuyerInfo(cartData.buyer);
    await checkoutPage.fillPaymentInfo(
      cartData.buyer.cardHolder,
      cartData.card.number,
      cartData.card.expiry,
      cartData.card.cvv
    );
    await checkoutPage.expectPaymentButtonDisabled();
    await page.screenshot({ path: cartData.screenshots.step2EmptyCart });

    // ==========================================
    // PASO 3: Navegación al producto y verificación de detalles
    // ==========================================
    await productPage.goto();
    await productPage.expectLoaded();
    await expect(productPage.quantityDisplay).toHaveText('1');
    await page.screenshot({ path: cartData.screenshots.step3ProductPage });

    // ==========================================
    // PASO 4: Agregar producto al carrito (1 unidad)
    // ==========================================
    await productPage.addToCart();
    await productPage.openCart();
    await cartPage.expectOpen();
    await cartPage.expectProductInCart(cartData.product.name, cartData.product.quantity1, cartData.product.total1Unit);
    await cartPage.expectTotal(cartData.product.total1Unit);
    await page.screenshot({ path: cartData.screenshots.step4Cart1Unit });

    // ==========================================
    // PASO 5: Actualización de cantidad a 2 unidades y verificación de total ($700.00)
    // ==========================================
    await cartPage.close();
    // Añadimos una segunda unidad del producto
    await productPage.addToCart();
    await productPage.openCart();
    await cartPage.expectOpen();
    await cartPage.expectProductInCart(cartData.product.name, cartData.product.quantity2, cartData.product.total2Units);
    await cartPage.expectTotal(cartData.product.total2Units);
    await page.screenshot({ path: cartData.screenshots.step5Cart2Units });

    // ==========================================
    // PASO 6: Navegar al checkout y verificar resumen del pedido
    // ==========================================
    await cartPage.goToCheckout();
    await checkoutPage.expectLoaded();
    await checkoutPage.expectOrderSummary(
      cartData.product.name,
      cartData.product.quantity2,
      cartData.product.total2Units
    );
    await page.screenshot({ path: cartData.screenshots.step6CheckoutSummary });

    // ==========================================
    // PASO 7: Completar datos personales y de tarjeta de crédito
    // ==========================================
    await checkoutPage.fillBuyerInfo(cartData.buyer);
    await checkoutPage.fillPaymentInfo(
      cartData.buyer.cardHolder,
      cartData.card.number,
      cartData.card.expiry,
      cartData.card.cvv
    );
    await checkoutPage.expectPaymentButtonEnabled();
    await page.screenshot({ path: cartData.screenshots.step7CheckoutFilled });

    // ==========================================
    // PASO 8: Ejecutar el pago y verificar la confirmación de la orden creada
    // ==========================================
    await checkoutPage.submitPayment();
    await checkoutPage.expectOrderConfirmation();
    await page.screenshot({ path: cartData.screenshots.step8OrderCreated });
  });
});
