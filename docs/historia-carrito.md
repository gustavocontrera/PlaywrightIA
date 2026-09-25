## Historia de usuario — Carrito y checkout

**Actor:** Usuario autenticado en laboratoriodetesting.com

**Acción:** Agregar el producto "Bandas Elásticas de 
Resistencia" al carrito y proceder al pago.

**Resultado esperado:**
- Producto aparece en el carrito con nombre, precio ($350) 
  y cantidad 1
- El total del carrito se actualiza correctamente
- El checkout muestra el resumen del pedido
- No se puede hacer checkout con carrito vacío
- Se ingresa información de datos personales al azar
- Se ingresa información de tarjeta de crédito y se hace el pago
- Se verifica que la orden ha sido creada

**Datos de prueba:**
- Producto: Bandas Elásticas de Resistencia
- Precio unitario: $350
- Cantidad: 2 unidades
- Num de tarjeta: 4301822375925071
- Fecha expiración tarjeta: 09-2029
- CVV: 668
- URL producto: /products/bandas-elasticas-de-resistencia

**Nota para el agente:** 
Este flujo requiere autenticación previa. 
Hacer login antes de navegar al producto.
URL login: https://laboratoriodetesting.com/auth/login