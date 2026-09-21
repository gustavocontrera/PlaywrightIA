# Análisis de Elementos Interactivos - Laboratorio de Testing

## Información General
- **URL analizada:** [https://www.laboratoriodetesting.com/](https://www.laboratoriodetesting.com/)
- **Título de la página:** `Laboratorio de Testing | Home`
- **Fecha del análisis:** 13 de Septiembre de 2026
- **Archivos de captura asociados:**
  - Captura del Viewport inicial: `../.playwright-mcp/page-2026-09-13T23-14-59-604Z.png`
  - Captura de Página Completa (Full Page): `../.playwright-mcp/page-2026-09-13T23-15-28-600Z.png`
  - Snapshot de Accesibilidad / Árbol DOM: `../.playwright-mcp/page-2026-09-13T23-14-23-640Z.yml`

---

## Resumen Ejecutivo
La página principal de **Laboratorio de Testing** es una aplicación web tipo e-commerce deportivo orientada a la práctica de testing manual y automatizado. Presenta múltiples componentes interactivos organizados en:
1. Barra de navegación fija / superior con autenticación y carrito.
2. Banner principal (Hero) con llamada a la acción (CTA).
3. Tarjetas de categorías destacadas y promociones.
4. Grillas y carruseles de productos con acciones de navegación y adición al carrito.
5. Panel lateral deslizante (Drawer) para gestión del carrito de compras.
6. Pie de página (Footer) con enlaces institucionales, páginas de práctica y recursos externos.

---

## Detalle de Elementos Interactivos por Sección

### 1. Barra de Navegación (Header)
Ubicada en la parte superior (`<nav>`). Permanece accesible para la navegación principal.

| Elemento | Tipo | Selector Accesible Playwright | Destino / Acción |
| :--- | :--- | :--- | :--- |
| **Logo / Nombre** | Enlace (`<a>`) | `page.getByRole('link', { name: 'Laboratorio De Testing' })` | Redirige al inicio (`/`) |
| **Inicio** | Enlace (`<a>`) | `page.getByRole('link', { name: 'Inicio' })` | Redirige al inicio (`/`) |
| **Acceder** | Enlace (`<a>`) | `page.getByRole('link', { name: 'Acceder' })` | Redirige a login (`/auth/login`) |
| **Registrarse** | Enlace (`<a>`) | `page.getByRole('link', { name: 'Registrarse' })` | Redirige a registro (`/auth/signup`) |
| **Icono Carrito** | Botón / Enlace | `page.locator('nav').getByRole('link', { name: '#' })` o botón contenedor | Abre el panel lateral del carrito |

---

### 2. Banner Principal (Hero Section)
Sección superior de bienvenida con imagen destacada de ciclismo deportivo.

| Elemento | Tipo | Selector Accesible Playwright | Destino / Acción |
| :--- | :--- | :--- | :--- |
| **Ir de compras →** | Enlace (`<a>` botón) | `page.getByRole('link', { name: 'Ir de compras →' })` | Salto de ancla a productos destacados (`#featured`) |

---

### 3. Tarjetas de Categorías y Promociones

#### Bloque Principal de Promociones
| Sección | Elemento | Tipo | Selector Accesible Playwright | Destino |
| :--- | :--- | :--- | :--- | :--- |
| **Deportivos (Hasta 50%)** | Ir de compras | Enlace | `page.locator('div').filter({ hasText: /^Deportivos/ }).getByRole('link', { name: 'Ir de compras' })` | Ancla `#sports` |
| **Marcas Seleccionadas (Hasta 30%)** | Ir de compras | Enlace | `page.locator('div').filter({ hasText: /^Marcas Seleccionadas/ }).getByRole('link', { name: 'Ir de compras' })` | Ancla `#brands` |

#### Tarjetas de Categorías Secundarias
| Categoría | Elemento | Tipo | Selector Accesible Playwright | Destino |
| :--- | :--- | :--- | :--- | :--- |
| **Aire Libre** | COMPRAR | Enlace | `page.getByRole('link', { name: 'COMPRAR' }).nth(0)` | Ancla `#outsiders` |
| **Musculación** | COMPRAR | Enlace | `page.getByRole('link', { name: 'COMPRAR' }).nth(1)` | Ancla `#muscles` |
| **Acuáticos** | COMPRAR | Enlace | `page.getByRole('link', { name: 'COMPRAR' }).nth(2)` | Enlace `#` |

---

### 4. Sección "Productos Destacados"
Tarjetas tipo *article* con imagen, precio, descripción y acciones directas.

| Producto | Elemento | Tipo | Selector Accesible Playwright | Acción |
| :--- | :--- | :--- | :--- | :--- |
| **Bandas Elásticas de Resistencia** ($350.00) | Card / Enlace | `<a>` | `page.getByRole('link', { name: /Bandas Elásticas de Resistencia/ })` | Navega a `/products/bandas-elasticas-de-resistencia` |
| | Añadir al carrito | Botón | `page.locator('article').filter({ hasText: 'Bandas Elásticas' }).getByRole('button', { name: 'Añadir al carrito' })` | Añade producto al carrito |
| **Set de Pesas Ajustables** ($2,500.00) | Card / Enlace | `<a>` | `page.getByRole('link', { name: /Set de Pesas Ajustables/ })` | Navega a `/products/set-de-pesas-ajustables` |
| | Añadir al carrito | Botón | `page.locator('article').filter({ hasText: 'Set de Pesas Ajustables' }).getByRole('button', { name: 'Añadir al carrito' })` | Añade producto al carrito |
| **Mancuernas Recubiertas de Neopreno** ($800.00) | Card / Enlace | `<a>` | `page.getByRole('link', { name: /Mancuernas Recubiertas/ })` | Navega a `/products/mancuernas-recubiertas-de-neopreno` |
| | Añadir al carrito | Botón | `page.locator('article').filter({ hasText: 'Mancuernas Recubiertas' }).getByRole('button', { name: 'Añadir al carrito' })` | Añade producto al carrito |
| **Press de Banca Plegable** ($6,500.00) | Card / Enlace | `<a>` | `page.getByRole('link', { name: /Press de Banca Plegable/ })` | Navega a `/products/press-de-banca-plegable` |
| | Añadir al carrito | Botón | `page.locator('article').filter({ hasText: 'Press de Banca Plegable' }).getByRole('button', { name: 'Añadir al carrito' })` | Añade producto al carrito |

---

### 5. Secciones Temáticas y Catálogo Completo

#### Categorías adicionales presentes en la página:
- **Deportivos:** Chaqueta Deportiva para Correr, Camiseta de Licra Dama, Camiseta de Licra Hombre, Camiseta Deportiva Gris.
- **Marcas Seleccionadas:** Medias Ortopédicas de Compresión, Medias Tobilleras Oscuras, Medias Tobilleras Fluorescentes, Gafas de Natación.
- **Musculación:** Balón de Fútbol Profesional, Raquetas de Pádel, Pesas de Alto Rendimiento, Tapete de Yoga.
- **Aire Libre (Catálogo extendido con carrusel):**
  - Controles de carrusel: Botón de flecha previa y flecha siguiente (`generic [cursor=pointer]`).
  - Tarjetas de producto adicionales: Reloj Deportivo GPS, Guantes para Levantamiento, Rodilleras Deportivas, etc.
  - Cada tarjeta incluye su respectivo botón **`Añadir al carrito`**.

---

### 6. Panel Lateral del Carrito (Off-canvas Drawer)
Panel que se despliega al interactuar con el carrito.

| Elemento | Tipo | Selector Accesible Playwright | Acción |
| :--- | :--- | :--- | :--- |
| **Cerrar Carrito** | Botón | `page.locator('aside button').first()` | Oculta el panel lateral |
| **Ir al checkout** | Botón | `page.getByRole('button', { name: 'Ir al checkout' })` | Redirige a la pantalla `/checkout` |
| **Limpiar** | Botón | `page.getByRole('button', { name: 'Limpiar' })` | Vacía todos los ítems agregados al carrito |

---

### 7. Pie de Página (Footer)
Ubicado en el tag `<footer>` / `contentinfo`.

| Sección | Elemento | Selector Accesible Playwright | Destino |
| :--- | :--- | :--- | :--- |
| **Logo Footer** | Laboratorio De Testing | `page.locator('footer').getByRole('link', { name: 'Laboratorio De Testing' })` | `/` |
| **Enlaces De Interés** | Inicio | `page.locator('footer').getByRole('link', { name: 'Inicio' })` | `/` |
| | Checkout | `page.locator('footer').getByRole('link', { name: 'Checkout' })` | `/checkout` |
| | Login Page | `page.locator('footer').getByRole('link', { name: 'Login Page' })` | `/auth/login` |
| | Signup Page | `page.locator('footer').getByRole('link', { name: 'Signup Page' })` | `/auth/signup` |
| | Formulario de práctica | `page.locator('footer').getByRole('link', { name: 'Formulario de práctica' })` | `/form-practice` |
| **Otros Recursos** | Curso de Udemy | `page.getByRole('link', { name: 'Curso de Udemy' })` | URL externa de Udemy |
| | Preparación ISTQB | `page.getByRole('link', { name: 'Preparación ISTQB' })` | Enlace `#` |
| | Certificaciones | `page.getByRole('link', { name: 'Certificaciones' })` | Enlace `#` |

---

## Recomendaciones para Automatización de Pruebas (Playwright)

1. **Priorizar Localizadores Orientados al Usuario:**
   - Usar `page.getByRole('button', { name: '...' })` y `page.getByRole('link', { name: '...' })`.
   - Para elementos de productos repetitivos, filtrar por contenedor:
     ```typescript
     const productCard = page.locator('article').filter({ hasText: 'Set de Pesas Ajustables' });
     await productCard.getByRole('button', { name: 'Añadir al carrito' }).click();
     ```
2. **Validaciones de Estado:**
   - Verificar contador o contenido del carrito tras pulsar `Añadir al carrito`.
   - Probar flujo de autenticación navegando desde `Acceder` y `Registrarse`.
   - Testear formularios interactivos en `/form-practice`.

---

# [19 de Septiembre de 2026] - Inventario Exhaustivo de Elementos Interactivos (playwright-cli)

## Información de la Ejecución
- **Fecha:** 19 de Septiembre de 2026 (20:26:44 -03:00)
- **Método de exploración:** Ejecución directa desde terminal mediante `playwright-cli` (sin MCP).
- **Comando inicial:** `playwright-cli open https://laboratoriodetesting.com`
- **Archivos de snapshot generados:**
  - `.playwright-cli/page-2026-09-19T22-40-05-945Z.yml`
  - `.playwright-cli/page-2026-09-19T22-42-18-066Z.yml`
- **Total de elementos interactivos:** **88** (55 enlaces `<a>`, 33 botones `<button>`, 0 inputs directos en home).

---

## Inventario Detallado de Elementos Interactivos

### 1. Panel Lateral del Carrito (`<aside>` / Drawer) - 3 elementos
| # | Tag | Texto / Icono Accesible | Selector / Atributos clave | Función / Destino |
|---|-----|-------------------------|----------------------------|--------------------|
| 1 | `<button>` | Icono Cerrar (*"X"*) | `class="hover:scale-105 duration-200"` | Cierra el panel lateral del carrito |
| 2 | `<button>` | `"Ir al checkout"` | `button:has-text("Ir al checkout")` | Redirige al proceso de checkout |
| 3 | `<button>` | `"Limpiar"` | `button:has-text("Limpiar")` | Vacía los artículos del carrito |

### 2. Barra de Navegación / Encabezado (`<nav>`) - 8 elementos
| # | Tag | Texto / Icono Accesible | Selector / Atributos clave | Función / Destino |
|---|-----|-------------------------|----------------------------|--------------------|
| 4 | `<a>` | `"LABORATORIO DE TESTING"` | `href="/"`, logo header | Navega a la página de inicio |
| 5 | `<a>` | `"Inicio"` | `href="/"` | Enlace de navegación Inicio |
| 6 | `<a>` | `"Acceder"` | `href="/auth/login"` | Enlace a la página de login |
| 7 | `<a>` | `"Registrarse"` | `href="/auth/signup"` | Enlace a la página de registro |
| 8 | `<a>` | Icono Favoritos (*Corazón*) | `href="#"`, `class="hidden xl:flex"` | Enlace a lista de favoritos (Desktop) |
| 9 | `<button>` | Icono Carrito (*Desktop*) | `data-at="cart-opener"`, `class="hidden xl:flex"` | Despliega el panel lateral del carrito |
| 10 | `<a>` | Icono Carrito (*Mobile*) | `href="#"`, `class="navbar-burger xl:hidden"` | Enlace / menú para vista móvil |
| 11 | `<button>` | Icono Carrito (*Mobile*) | `data-at="cart-opener-mobile"`, `class="xl:hidden"` | Despliega el carrito en vista móvil |

### 3. Hero y Banners Promocionales - 6 elementos
| # | Tag | Texto Accesible | Destino (`href`) | Bloque / Contexto |
|---|-----|-----------------|------------------|-------------------|
| 12 | `<a>` | `"Ir de compras →"` | `#featured` | Hero Banner principal (*"Déjate llevar por el camino"*) |
| 13 | `<a>` | `"Ir de compras"` | `#sports` | Banner *Deportivos (Hasta 50%)* |
| 14 | `<a>` | `"Ir de compras"` | `#brands` | Banner *Marcas Seleccionadas (Hasta 30%)* |
| 15 | `<a>` | `"COMPRAR"` | `#outsiders` | Mini Banner *Aire Libre* |
| 16 | `<a>` | `"COMPRAR"` | `#muscles` | Mini Banner *Musculación* |
| 17 | `<a>` | `"COMPRAR"` | `#` | Mini Banner *Acuáticos* |

### 4. Sección "Productos destacados" - 8 elementos
Cada producto contiene un enlace a su página de detalle y un botón de adición directa:

| # | Producto | Enlace a Detalle (`<a>`) | Botón de Compra (`<button>`) |
|---|----------|--------------------------|------------------------------|
| 18-19 | **Bandas Elásticas de Resistencia** ($350.00) | `href="/products/bandas-elasticas-de-resistencia"` | `"AÑADIR AL CARRITO"` |
| 20-21 | **Set de Pesas Ajustables** ($2,500.00) | `href="/products/set-de-pesas-ajustables"` | `"AÑADIR AL CARRITO"` |
| 22-23 | **Mancuernas Recubiertas de Neopreno** ($800.00) | `href="/products/mancuernas-recubiertas-de-neopreno"` | `"AÑADIR AL CARRITO"` |
| 24-25 | **Press de Banca Plegable** ($6,500.00) | `href="/products/press-de-banca-plegable"` | `"AÑADIR AL CARRITO"` |

### 5. Vitrinas de Categorías Intermedias - 12 elementos
Enlaces a productos por categoría:

#### Deportivos
| # | Elemento | Destino (`href`) |
|---|----------|------------------|
| 26 | `<a>` Chaqueta Deportiva para Correr ($1,500.00) | `/products/chaqueta-deportiva-para-correr` |
| 27 | `<a>` Camiseta de Licra Deportiva para Dama ($600.00) | `/products/camiseta-de-licra-deportiva-para-dama` |
| 28 | `<a>` Camiseta de Licra Deportiva para Hombre ($650.00) | `/products/camiseta-de-licra-deportiva-para-hombre` |
| 29 | `<a>` Camiseta Deportiva Gris para Hombre ($700.00) | `/products/camiseta-deportiva-gris-para-hombre` |

#### Marcas Seleccionadas
| # | Elemento | Destino (`href`) |
|---|----------|------------------|
| 30 | `<a>` Medias Ortopédicas de Compresión ($400.00) | `/products/medias-ortopedicas-de-compresion` |
| 31 | `<a>` Medias Tobilleras Oscuras ($200.00) | `/products/medias-tobilleras-oscuras` |
| 32 | `<a>` Medias Tobilleras Fluorescentes ($250.00) | `/products/medias-tobilleras-fluorescentes` |
| 33 | `<a>` Gafas de Natación recubiertas ($700.00) | `/products/gafas-de-natacion-recubiertas` |

#### Musculación
| # | Elemento | Destino (`href`) |
|---|----------|------------------|
| 34 | `<a>` Balón de Fútbol Profesional ($1,200.00) | `/products/balon-de-futbol-profesional` |
| 35 | `<a>` Raquetas de Pádel con Mango Suave ($3,500.00) | `/products/raquetas-de-padel-con-mango-suave` |
| 36 | `<a>` Pesas de Alto Rendimiento ($3,000.00) | `/products/pesas-de-alto-rendimiento` |
| 37 | `<a>` Tapete de Yoga Antideslizante ($500.00) | `/products/tapete-de-yoga-antideslizante` |

### 6. Catálogo Completo / Carrusel ("Aire Libre") - 42 elementos
- **Controles del carrusel:**
  - `[#78]` `<button data-at="left-arrow-carousel">`: Flecha Izquierda (Anterior)
  - `[#79]` `<button data-at="right-arrow-carousel">`: Flecha Derecha (Siguiente)
- **Tarjetas de producto (20 pares de enlace + botón "AÑADIR AL CARRITO"):**
  1. `[#38-#39]` Bandas Elásticas de Resistencia (`/products/bandas-elasticas-de-resistencia`) + Botón
  2. `[#40-#41]` Set de Pesas Ajustables (`/products/set-de-pesas-ajustables`) + Botón
  3. `[#42-#43]` Mancuernas Recubiertas de Neopreno (`/products/mancuernas-recubiertas-de-neopreno`) + Botón
  4. `[#44-#45]` Press de Banca Plegable (`/products/press-de-banca-plegable`) + Botón
  5. `[#46-#47]` Chaqueta Deportiva para Correr (`/products/chaqueta-deportiva-para-correr`) + Botón
  6. `[#48-#49]` Camiseta de Licra Deportiva para Dama (`/products/camiseta-de-licra-deportiva-para-dama`) + Botón
  7. `[#50-#51]` Camiseta de Licra Deportiva para Hombre (`/products/camiseta-de-licra-deportiva-para-hombre`) + Botón
  8. `[#52-#53]` Camiseta Deportiva Gris para Hombre (`/products/camiseta-deportiva-gris-para-hombre`) + Botón
  9. `[#54-#55]` Medias Ortopédicas de Compresión (`/products/medias-ortopedicas-de-compresion`) + Botón
  10. `[#56-#57]` Medias Tobilleras Oscuras (`/products/medias-tobilleras-oscuras`) + Botón
  11. `[#58-#59]` Medias Tobilleras Fluorescentes (`/products/medias-tobilleras-fluorescentes`) + Botón
  12. `[#60-#61]` Gafas de Natación recubiertas (`/products/gafas-de-natacion-recubiertas`) + Botón
  13. `[#62-#63]` Balón de Fútbol Profesional (`/products/balon-de-futbol-profesional`) + Botón
  14. `[#64-#65]` Raquetas de Pádel con Mango Suave (`/products/raquetas-de-padel-con-mango-suave`) + Botón
  15. `[#66-#67]` Pesas de Alto Rendimiento (`/products/pesas-de-alto-rendimiento`) + Botón
  16. `[#68-#69]` Tapete de Yoga Antideslizante (`/products/tapete-de-yoga-antideslizante`) + Botón
  17. `[#70-#71]` Reloj Deportivo GPS (`/products/reloj-deportivo-gps`) + Botón
  18. `[#72-#73]` Guantes para Levantamiento de Pesas (`/products/guantes-para-levantamiento-de-pesas`) + Botón
  19. `[#74-#75]` Rodilleras Deportivas (`/products/rodilleras-deportivas`) + Botón
  20. `[#76-#77]` Banda Elástica de Resistencia (`/products/banda-elastica-de-resistencia`) + Botón

### 7. Pie de Página (`<footer>`) - 9 elementos
| # | Tag | Texto | Destino (`href`) | Grupo |
|---|-----|-------|------------------|-------|
| 80 | `<a>` | `"LABORATORIO DE TESTING"` | `/` | Brand / Inicio |
| 81 | `<a>` | `"Inicio"` | `/` | Enlaces De Interés |
| 82 | `<a>` | `"Checkout"` | `/checkout` | Enlaces De Interés |
| 83 | `<a>` | `"Login Page"` | `/auth/login` | Enlaces De Interés |
| 84 | `<a>` | `"Signup Page"` | `/auth/signup` | Enlaces De Interés |
| 85 | `<a>` | `"Formulario de práctica"` | `/form-practice` | Enlaces De Interés |
| 86 | `<a>` | `"Curso de Udemy"` | URL externa Udemy | Otros Recursos |
| 87 | `<a>` | `"Preparación ISTQB"` | `#` *(ancla vacía)* | Otros Recursos |
| 88 | `<a>` | `"Certificaciones"` | `#` *(ancla vacía)* | Otros Recursos |

---

## Hallazgos Clave para Automatización
1. **Selectores de testing dedicados (`data-at`):**
   - Abridores del carrito: `button[data-at="cart-opener"]` (desktop) y `button[data-at="cart-opener-mobile"]` (mobile).
   - Flechas del carrusel: `button[data-at="left-arrow-carousel"]` y `button[data-at="right-arrow-carousel"]`.
2. **Duplicación de botones de acción:**
   - Hay 24 botones con el texto exacto `"AÑADIR AL CARRITO"`. Es fundamental encadenar los localizadores con filtros semánticos (por ejemplo: `page.locator('article').filter({ hasText: 'Set de Pesas' }).getByRole('button', { name: 'Añadir al carrito' })`).
3. **Ausencia de elementos de formulario directos en el Home:**
   - La página principal es puramente de catálogo/navegación; los campos `<input>`, `<select>`, y `<textarea>` se concentran en `/auth/login`, `/auth/signup`, `/checkout` y `/form-practice`.

---

# [19 de Septiembre de 2026] - Prueba de Autenticación con Credenciales Inválidas en Login (playwright-cli)

## Información de la Ejecución
- **Fecha:** 19 de Septiembre de 2026 (20:31:00 -03:00)
- **Herramienta:** `playwright-cli` desde terminal (sin MCP).
- **Ruta evaluada:** `https://www.laboratoriodetesting.com/auth/login`
- **Comando ejecutado:**
  ```bash
  playwright-cli open https://www.laboratoriodetesting.com/auth/login; playwright-cli run-code "async (page) => {
    await page.getByPlaceholder('Ingresa tu email').fill('invalido@test.com');
    await page.getByPlaceholder('Ingresa tu contraseña').fill('ClaveFalsa123');
    await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
    await page.waitForTimeout(2500);
    await page.screenshot({ path: '.playwright-cli/login-error.png', fullPage: true });
  }"; playwright-cli snapshot
  ```
- **Evidencias generadas:**
  - Snapshot de accesibilidad: `.playwright-cli/page-2026-09-19T23-31-18-960Z.yml`
  - Captura de pantalla de la modal de error: `.playwright-cli/login-error.png`

---

## Mensajes de Error Capturados

### 1. Mensaje de Error Exacto por Credenciales Inválidas (Modal / Diálogo Servidor)
Al enviar credenciales válidas en estructura sintáctica pero no registradas en la base de datos (por ejemplo: `invalido@test.com` / `ClaveFalsa123`), se despliega una ventana modal (`<dialog>`) con los siguientes elementos:

- **Título del Diálogo:** `Error`
- **Mensaje de Error Exacto:**
  > `"No pudimos iniciar sesión con estas credenciales. Intenta de nuevo."`
- **Icono / Gráfico:** Símbolo de admiración (`!`)
- **Acción disponible:** Botón `"Volver"` (cierra la ventana modal para permitir reintentar).

#### Representación en Árbol de Accesibilidad (Snapshot YAML):
```yaml
dialog:
  - heading "Error" [level=2]
  - generic: No pudimos iniciar sesión con estas credenciales. Intenta de nuevo.
  - text: "!"
  - button "Volver" [active] [cursor=pointer]
```

---

### 2. Mensajes de Validación Previa en Cliente (Formato de Campos)
Se identificaron además las siguientes validaciones en línea (`inline errors`) que se muestran dinámicamente antes del envío:

| Campo | Condición probada | Mensaje de error exacto | Efecto en el formulario |
|---|---|---|---|
| **Email** | Entrada sin formato email (ej: `email-no-valido`) | `"Email inválido"` | Muestra texto de advertencia debajo del campo |
| **Contraseña** | Longitud menor a 8 caracteres (ej: `123`) | `"La contraseña debe tener al menos 8 caracteres"` | Muestra texto de advertencia debajo del campo |
| **Botón Enviar** | Campos vacíos o con errores de formato | N/A | El botón `"Iniciar Sesión"` permanece bloqueado (`disabled`) |


