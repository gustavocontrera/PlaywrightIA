---
name: playwright-pom
description: "Use when creating, refactoring, reviewing, or extending Playwright end-to-end tests in this project. Always apply Page Object Model, external test data, maintainable locators, isolated scenarios, and Playwright best practices."
---

# Playwright POM Project Skill

## Required Project Structure

Use this structure for browser tests:

```text
Pages/
  <page-name>.page.ts
Data/
  <feature-name>.data.ts
Fixtures/
  <fixture-name>.fixture.ts
tests/
  e2e/
    <feature>/
      <feature>.spec.ts
```

Preserve the repository's existing folder casing when extending an established structure. In this project, browser tests use `tests/e2e/`, Page Objects use `tests/pages/`, and test data uses `tests/data/`.

## Page Object Model

- Create one Page Object per application page or meaningful page component.
- Keep locators and UI interaction methods inside the Page Object.
- Use `readonly` Locator properties for controls reused by tests.
- Expose business-level methods such as `login`, `submit`, `openPasswordRecovery`, or `expectInvalidCredentialsError`.
- Keep assertions about page state in Page Objects when they describe reusable page behavior.
- Do not place test data, credentials, or scenario-specific expectations in a Page Object.
- Do not use raw selectors in specs when the Page Object can expose the interaction.
- Prefer accessible locators: `getByRole`, `getByLabel`, `getByPlaceholder`, and `getByText`.
- Use stable dedicated attributes such as `data-testid` or `data-at` when accessible locators are not sufficient.
- Avoid CSS classes, generated ids, positional selectors, and `nth()` unless no stable alternative exists.

## Test Data

- Store URLs, credentials, labels, messages, and other reusable values in separate data modules.
- Import data into Page Objects and specs instead of duplicating string literals.
- Never hardcode credentials directly inside test scenarios.
- Keep secrets out of source control when they are environment-specific; use environment variables or a local secret mechanism for real credentials.
- Use descriptive nested objects such as `credentials.valid`, `credentials.invalid`, `messages`, and `urls`.
- Keep test data immutable with `as const` where appropriate.

## Spec Organization

- Group all scenarios for the same page or functionality in one spec file under `tests/e2e/<feature>/`.
- Use one `test.describe` per page or feature and descriptive test titles.
- Do not create one spec file per scenario when scenarios belong to the same page or workflow.
- Keep specs focused on business intent: arrange the page, call Page Object methods, and assert outcomes.
- Do not duplicate locators or UI implementation details across tests.
- Leave old scenario files empty only temporarily during migration; remove them when filesystem deletion is available.
- Every test must be independently executable and must establish its own initial state.

## Playwright Best Practices

- Use `test` and `expect` from `@playwright/test`.
- Prefer web-first assertions such as `toBeVisible`, `toBeEnabled`, `toBeDisabled`, `toHaveValue`, `toHaveURL`, and `toHaveTitle`.
- Let Playwright auto-wait; do not use `page.waitForTimeout()`.
- Do not use `page.waitForNavigation()` or `page.waitForLoadState()` as synchronization mechanisms; assert the resulting URL or UI state instead.
- Avoid `page.evaluate()` unless the test explicitly requires browser-context behavior that cannot be expressed through user-facing actions.
- Avoid arbitrary sleeps and force clicks. Fix the locator or wait for the observable state instead.
- Keep tests deterministic, independent, and safe to run in parallel.
- Reset or isolate shared state between tests and avoid depending on execution order.
- Validate both the user-visible result and the relevant URL or title when navigation is part of the behavior.
- Use dialogs and accessible roles for modal assertions instead of implementation-specific selectors.
- Keep comments limited to the numbered business steps required by the test plan.

## Generation and Review Checklist

Before considering a Playwright test complete, verify:

- The relevant Page Object exists under `Pages/`.
- Reusable values are externalized under `data/` or the project's established data folder.
- All scenarios for the same page or feature are consolidated in one spec.
- The spec contains no duplicated selectors or hardcoded credentials.
- Locators are user-facing and stable.
- Assertions describe observable behavior and use Playwright's auto-retrying expectations.
- No fixed waits, navigation waits, or unnecessary `evaluate` calls are present.
- Each test starts from a known state and can run independently.
- The focused test command has been executed after changes.
