export const cartData = {
  urls: {
    product: 'https://www.laboratoriodetesting.com/products/bandas-elasticas-de-resistencia',
    checkout: 'https://www.laboratoriodetesting.com/checkout',
    home: 'https://www.laboratoriodetesting.com/',
  },
  product: {
    name: 'Bandas Elásticas de Resistencia',
    unitPrice: '$350.00',
    unitPriceNumeric: 350,
    total1Unit: '$350.00',
    total2Units: '$700.00',
    quantity1: 1,
    quantity2: 2,
  },
  card: {
    number: '4301822375925071',
    expiry: '2029-09',
    cvv: '668',
  },
  buyer: {
    name: 'Carlos',
    lastname: 'Gómez',
    email: 'carlos.gomez.qa@example.com',
    address: 'Av. Corrientes 1234',
    country: 'Argentina',
    cardHolder: 'Carlos Gómez',
  },
  messages: {
    emptyCart: 'No tienes elementos en el carrito',
    orderCreatedTitle: 'Orden creada',
    orderCreatedBody: 'Tu orden se ha creado con éxito, podrás ver tu historial en tu cuenta',
  },
  screenshots: {
    step1Login: 'docs/screenshots/01-login-exitoso.png',
    step2EmptyCart: 'docs/screenshots/02-carrito-vacio-y-bloqueo.png',
    step3ProductPage: 'docs/screenshots/03-pagina-producto.png',
    step4Cart1Unit: 'docs/screenshots/04-carrito-una-unidad.png',
    step5Cart2Units: 'docs/screenshots/05-carrito-dos-unidades.png',
    step6CheckoutSummary: 'docs/screenshots/06-checkout-resumen-pedido.png',
    step7CheckoutFilled: 'docs/screenshots/07-checkout-datos-completados.png',
    step8OrderCreated: 'docs/screenshots/08-confirmacion-orden-creada.png',
  },
} as const;
