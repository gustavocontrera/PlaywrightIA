# Guía de Agentes, Arquitectura y Flujos de Automatización

Este documento centraliza la arquitectura del framework, la configuración de agentes de Inteligencia Artificial (GitHub Copilot y Google Antigravity), y las mejores prácticas para el desarrollo y mantenimiento de pruebas de extremo a extremo (E2E) con Playwright.

---

## 1. Arquitectura General del Proyecto

El proyecto está estructurado como un framework moderno de automatización sobre **Playwright + TypeScript**:

* **Patrón de Diseño**: Page Object Model (POM) estricto.
* **Separación de Responsabilidades**:
  * `tests/pages/`: Clases de interfaz de usuario (encapsulan selectores y métodos de interacción).
  * `tests/data/`: Datos de prueba externos centralizados (`.data.ts`), desacoplados de la lógica de prueba.
  * `tests/e2e/`: Especificaciones ejecutables (`.spec.ts`) organizadas por módulo o funcionalidad.

---

## 2. Los Tres Agentes de Playwright (`.github/agents/`)

En el directorio `.github/agents/` se encuentran definidos los 3 roles estandarizados para el ciclo de vida de las pruebas:

### 1. `playwright-test-planner`
* **Objetivo**: Explorar la aplicación web, mapear flujos críticos y diseñar planes de prueba detallados (Happy Paths, Edge Cases, validaciones negativas).
* **Herramientas**: MCP de navegador (`browser_click`, `browser_snapshot`, `browser_navigate`, `planner_setup_page`, `planner_save_plan`).
* **Salida esperada**: Documento Markdown con escenarios detallados, pasos reproducibles y criterios de aceptación.

### 2. `playwright-test-generator`
* **Objetivo**: Transformar los escenarios del plan de prueba en código TypeScript ejecutable para Playwright.
* **Herramientas**: Automatización interactiva en tiempo real y generación estructurada de código (`generator_write_test`, etc.).
* **Convenciones**:
  * Genera pruebas atómicas y descriptivas.
  * Incluye comentarios descriptivos previos a cada interacción.
  * Respeta la estructura de Page Objects y datos externos.

### 3. `playwright-test-healer`
* **Objetivo**: Diagnosticar y reparar de forma autónoma pruebas rotas o inestables (*flaky*).
* **Ciclo de trabajo**:
  1. Ejecución del test fallido (`test_run` / `npx playwright test`).
  2. Diagnóstico del fallo (inspección de errores, trazas, snapshots de pantalla y DOM).
  3. Corrección de selectores (priorizando roles accesibles y locators resilientes) o ajuste de aserciones.
  4. Verificación re-ejecutando el test hasta confirmar que pasa en verde.

---

## 3. Integración y Complementación: Copilot vs Antigravity

Ambas herramientas conviven armónicamente sobre el mismo repositorio sin interferencias ni conflicto de tokens:

| Característica | GitHub Copilot | Google Antigravity |
| :--- | :--- | :--- |
| **Punto fuerte** | Interfaz dedicada con menú desplegable para los agentes de Playwright (`@playwright`). Autocompletado inline rápido mientras escribes. | Agente de ciclo completo con ejecución de comandos de terminal, lectura y edición directa de archivos en caliente. |
| **Gestión de Contexto** | Memoria local del chat de Copilot. | Memoria y herramientas de Antigravity (Skills, Rules en `.agents/`). |
| **Gasto de Tokens** | Consume suscripción/tokens de GitHub Copilot. | Consume cuota independiente de Google Antigravity. |
| **Sincronización** | **Comparten el sistema de archivos**: cualquier archivo generado por uno queda guardado en disco para el otro. |

### Flujo de trabajo sugerido:
1. **Día a día**: Usa el menú desplegable de GitHub Copilot para invocar al *Planner*, *Generator* o *Healer* directamente.
2. **Segunda opinión o refactorizaciones amplias**: Invoca a Antigravity en el chat lateral cuando requieras auditorías completas, configuración de scripts/CI o si Copilot se traba con un caso complejo.

---

## 4. VS Code vs Aplicación de Escritorio de Antigravity

* **En VS Code**: Es el entorno ideal para desarrollo diario. Tienes tu código, GitHub Copilot y Antigravity en la misma ventana, viendo diffs y cambios en tiempo real.
* **En la App de Escritorio**: Si abres esta misma carpeta en la app de Antigravity, **está 100% sincronizada** porque lee el mismo disco local. Úsala principalmente para ejecuciones en segundo plano o monitoreo de múltiples proyectos independientes.

---

## 5. Documentos Relacionados

* [Análisis de Elementos Interactivos](file:///d:/DRIVE/15-WORKSPACE%20-%20ESTUDIO%20-%20DATOS/IdeaProjects/PlaywrightIA/docs/analysis_results.md)
* [Agentes de GitHub Copilot](file:///d:/DRIVE/15-WORKSPACE%20-%20ESTUDIO%20-%20DATOS/IdeaProjects/PlaywrightIA/.github/agents)
* [Reglas de Comportamiento Autónomo](file:///d:/DRIVE/15-WORKSPACE%20-%20ESTUDIO%20-%20DATOS/IdeaProjects/PlaywrightIA/.agents/rules/behavior.md)

