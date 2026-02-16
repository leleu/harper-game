import type { Page } from '@playwright/test'

/**
 * Reads the active task type from game state and clicks through to completion.
 * Uses data-testid selectors exclusively.
 */
export async function solveActiveTask(page: Page): Promise<boolean> {
  const taskType = await page.evaluate(() => {
    const state = window.__HARPER_GAME__?.getState()
    if (!state) return null
    const active = (state as Record<string, unknown>).activeTask as { type: string; harperAssisted: boolean } | null
    return active ? { type: active.type, harperAssisted: active.harperAssisted } : null
  })

  if (!taskType) return false

  try {
    switch (taskType.type) {
      case 'acord-form':
        return await solveACORDForm(page, taskType.harperAssisted)
      case 'carrier-submission':
        return await solveCarrierSubmission(page, taskType.harperAssisted)
      case 'quote-comparison':
        return await solveQuoteComparison(page)
      case 'coi-issuance':
        return await solveCOIIssuance(page, taskType.harperAssisted)
      case 'follow-up-email':
        return await solveFollowUpEmail(page, taskType.harperAssisted)
      case 'renewal-processing':
        return await solveRenewalProcessing(page, taskType.harperAssisted)
      case 'discovery-call':
        return await solveDiscoveryCall(page)
      case 'proposal-presentation':
        return await solveProposalPresentation(page)
      default:
        return false
    }
  } catch {
    // Task may have expired or been removed during solve attempt
    return false
  }
}

async function solveACORDForm(page: Page, harperAssisted: boolean): Promise<boolean> {
  if (harperAssisted) {
    // Only need to fill the last field (address) and submit
    const sticky = page.locator('[data-testid="sticky-address"]')
    if (await sticky.isVisible()) await sticky.click()
    const field = page.locator('[data-testid="field-address"]')
    if (await field.isVisible()) await field.click()
  } else {
    // Click each sticky then matching field
    const fields = ['businessName', 'ein', 'revenue', 'employees', 'sicCode', 'address']
    for (const key of fields) {
      const sticky = page.locator(`[data-testid="sticky-${key}"]`)
      if (await sticky.isEnabled({ timeout: 1000 }).catch(() => false)) {
        await sticky.click()
        await page.locator(`[data-testid="field-${key}"]`).click()
      }
    }
  }

  const submit = page.locator('[data-testid="acord-submit"]')
  await submit.waitFor({ state: 'visible', timeout: 5000 })
  if (await submit.isEnabled()) {
    await submit.click()
  }
  return true
}

async function solveCarrierSubmission(page: Page, harperAssisted: boolean): Promise<boolean> {
  if (harperAssisted) {
    const submitAll = page.locator('[data-testid="carrier-submit-all"]')
    await submitAll.waitFor({ state: 'visible', timeout: 5000 })
    await submitAll.click()
  } else {
    // Fill each portal's fields, then submit each portal
    for (let pi = 0; pi < 3; pi++) {
      for (let fi = 0; fi < 3; fi++) {
        const field = page.locator(`[data-testid="carrier-field-${pi}-${fi}"]`)
        if (await field.isEnabled({ timeout: 1000 }).catch(() => false)) {
          await field.click()
        }
      }
      const submit = page.locator(`[data-testid="carrier-portal-submit-${pi}"]`)
      if (await submit.isEnabled({ timeout: 1000 }).catch(() => false)) {
        await submit.click()
      }
    }
  }
  return true
}

async function solveQuoteComparison(page: Page): Promise<boolean> {
  // Click the first quote card (use force in case of animation instability)
  const card0 = page.locator('[data-testid="quote-card-0"]')
  await card0.waitFor({ state: 'visible', timeout: 5000 })
  await card0.click({ force: true })
  await page.waitForTimeout(200)
  const confirm = page.locator('[data-testid="quote-confirm"]')
  await confirm.waitFor({ state: 'visible', timeout: 5000 })
  await confirm.click({ force: true })
  return true
}

async function solveCOIIssuance(page: Page, harperAssisted: boolean): Promise<boolean> {
  if (!harperAssisted) {
    const fields = ['businessName', 'coiHolder', 'coiEmail', 'address']
    for (const key of fields) {
      const field = page.locator(`[data-testid="coi-field-${key}"]`)
      if (await field.isEnabled({ timeout: 1000 }).catch(() => false)) {
        await field.click()
      }
    }
  }
  const send = page.locator('[data-testid="coi-send"]')
  await send.waitFor({ state: 'visible', timeout: 5000 })
  if (await send.isEnabled()) {
    await send.click()
  }
  return true
}

async function solveFollowUpEmail(page: Page, harperAssisted: boolean): Promise<boolean> {
  if (!harperAssisted) {
    for (let i = 0; i < 3; i++) {
      const blank = page.locator(`[data-testid="email-blank-${i}"]`)
      if (await blank.isVisible({ timeout: 1000 }).catch(() => false)) {
        await blank.click()
      }
    }
  }
  const send = page.locator('[data-testid="email-send"]')
  await send.waitFor({ state: 'visible', timeout: 5000 })
  if (await send.isEnabled()) {
    await send.click()
  }
  return true
}

async function solveRenewalProcessing(page: Page, harperAssisted: boolean): Promise<boolean> {
  if (harperAssisted) {
    // Skip to send step
    const send = page.locator('[data-testid="renewal-send"]')
    await send.waitFor({ state: 'visible', timeout: 5000 })
    await send.click()
  } else {
    // Click all 3 tabs
    for (let i = 0; i < 3; i++) {
      const tab = page.locator(`[data-testid="renewal-tab-${i}"]`)
      if (await tab.isEnabled({ timeout: 2000 }).catch(() => false)) {
        await tab.click()
      }
    }
    // Flag gap
    const flag = page.locator('[data-testid="renewal-flag"]')
    await flag.waitFor({ state: 'visible', timeout: 5000 })
    await flag.click()
    // Send notice
    const send = page.locator('[data-testid="renewal-send"]')
    await send.waitFor({ state: 'visible', timeout: 5000 })
    await send.click()
  }
  return true
}

async function solveDiscoveryCall(page: Page): Promise<boolean> {
  // Click the first option (may or may not be correct, that's fine for automation)
  await page.locator('[data-testid="discovery-option-0"]').click()
  // Wait for auto-complete (1.5s delay + 0.6s)
  await page.waitForTimeout(2500)
  return true
}

async function solveProposalPresentation(page: Page): Promise<boolean> {
  // Select first option
  await page.locator('[data-testid="proposal-option-0"]').click()
  // Click present
  const present = page.locator('[data-testid="proposal-present"]')
  await present.waitFor({ state: 'visible', timeout: 5000 })
  await present.click()
  return true
}
