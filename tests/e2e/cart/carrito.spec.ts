import { test, expect } from '@playwright/test';

import { loginData } from '../../data/login.data';
import { cartData } from '../../data/cart.data';
import { LoginPage } from '../../pages/login.page';
import { ProductPage } from '../../pages/product.page';
import { CartPage } from '../../pages/cart.page';
import { CheckoutPage } from '../../pages/checkout.page';

test.describe('Carrito y Checkout', () => {
  let loginPage: LoginPage;
  let productPage: ProductPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    // Autenticación previa requerida para todos los flujos
    await loginPage.goto();
    await loginPage.expectLoaded();
    await loginPage.fillCredentials(loginData.credentials.valid.email, loginData.credentials.valid.password);
    await loginPage.submit();
    await expect(page).toHaveURL(loginData.urls.home);

    // Asegurar aislamiento de estado vaciando el carrito si tuviera elementos previos
    await productPage.goto();
    await productPage.openCart();
    await cartPage.emptyCartIfNotEmpty();
    await cartPage.close();
  });

  test('Validación de carrito vacío y restricción de pago', async () => {
    // 1. Abrir carrito y verificar estado vacío inicial
    await productPage.openCart();
    await cartPage.expectEmpty();
    await cartPage.close();

    // 2. Navegar a checkout con carrito vacío
    await checkoutPage.goto();
    await checkoutPage.expectLoaded();

    // 3. Completar información del comprador y datos de pago
    await checkoutPage.fillBuyerInfo(cartData.buyer);
    await checkoutPage.fillPaymentInfo(
      cartData.buyer.cardHolder,
      cartData.card.number,
      cartData.card.expiry,
      cartData.card.cvv
    );

    // 4. Verificar que no es posible procesar el pago cuando el carrito está vacío
    await checkoutPage.expectPaymentButtonDisabled();
  });

  test('Agregar producto al carrito y verificar precio unitario (1 unidad)', async () => {
    // 1. Navegar a la página del producto y verificar datos de visualización
    await productPage.goto();
    await productPage.expectLoaded();
    await expect(productPage.quantityDisplay).toHaveText('1');

    // 2. Añadir 1 unidad del producto al carrito
    await productPage.addToCart();

    // 3. Abrir el carrito y verificar el producto, cantidad y total inicial ($350.00)
    await productPage.openCart();
    await cartPage.expectOpen();
    await cartPage.expectProductInCart(cartData.product.name, cartData.product.quantity1, cartData.product.total1Unit);
    await cartPage.expectTotal(cartData.product.total1Unit);
  });

  test('Actualizar cantidad a 2 unidades y verificar recálculo dinámico del total ($700.00)', async () => {
    // 1. Navegar a la página del producto
    await productPage.goto();
    await productPage.expectLoaded();

    // 2. Añadir dos unidades al carrito
    await productPage.addToCart();
    await productPage.addToCart();

    // 3. Abrir carrito y validar que la cantidad sea 2 y el total se recalcule a $700.00
    await productPage.openCart();
    await cartPage.expectOpen();
    await cartPage.expectProductInCart(cartData.product.name, cartData.product.quantity2, cartData.product.total2Units);
    await cartPage.expectTotal(cartData.product.total2Units);
  });

  test('Flujo completo de compra: checkout con resumen, datos de pago y orden creada', async ({ page }) => {
    // 1. Navegar al producto y agregar 2 unidades
    await productPage.goto();
    await productPage.expectLoaded();
    await productPage.addToCart();
    await productPage.addToCart();

    // 2. Abrir carrito y proceder al checkout
    await productPage.openCart();
    await cartPage.expectOpen();
    await cartPage.expectTotal(cartData.product.total2Units);
    await cartPage.goToCheckout();

    // 3. Validar carga de checkout y resumen de la orden
    await checkoutPage.expectLoaded();
    await checkoutPage.expectOrderSummary(
      cartData.product.name,
      cartData.product.quantity2,
      cartData.product.total2Units
    );

    // 4. Completar datos personales del comprador
    await checkoutPage.fillBuyerInfo(cartData.buyer);

    // 5. Completar datos de la tarjeta de crédito
    await checkoutPage.fillPaymentInfo(
      cartData.buyer.cardHolder,
      cartData.card.number,
      cartData.card.expiry,
      cartData.card.cvv
    );

    // 6. Verificar que el botón de pago se habilite
    await checkoutPage.expectPaymentButtonEnabled();

    // 7. Enviar pago y verificar confirmación de orden creada
    await checkoutPage.submitPayment();
    await checkoutPage.expectOrderConfirmation();
  });
});
