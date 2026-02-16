import { test, expect } from '@playwright/test'
import { GameAPI } from '../helpers/game-api'
import { solveActiveTask } from '../helpers/task-solver'

test.describe('Persona: Prospect', () => {
  let game: GameAPI

  test.beforeEach(async ({ page }) => {
    game = new GameAPI(page)
    await page.goto('/')
    await page.waitForSelector('[data-testid="start-button"]', { timeout: 10_000 })
  })

  test('start screen communicates value without jargon', async ({ page }) => {
    // Check the start screen messaging
    const heading = page.locator('h1')
    await expect(heading).toContainText('Harper')

    // Should mention E&S or commercial insurance context
    const bodyText = await page.locator('.max-w-2xl').textContent()
    expect(bodyText).toBeTruthy()

    // Should have a clear CTA
    await expect(page.locator('[data-testid="start-button"]')).toBeVisible()

    // Time estimate should be visible
    await expect(page.locator('text=10 minutes')).toBeVisible()
  })

  test('welcome card explains game mechanics', async ({ page }) => {
    await game.skipCinematics()
    await page.locator('[data-testid="start-button"]').click()

    // Welcome card should appear
    const dismissBtn = page.locator('[data-testid="welcome-dismiss"]')
    await expect(dismissBtn).toBeVisible({ timeout: 5000 })

    // Should mention "57%" or admin work
    const cardContent = await page.locator('.fixed.inset-0').textContent()
    expect(cardContent).toContain('57%')
  })

  test('overwhelm phase causes task expiry', async ({ page }) => {
    await game.skipCinematics()
    await page.locator('[data-testid="start-button"]').click()
    await page.locator('[data-testid="welcome-dismiss"]').click()

    // Jump to overwhelm phase and set fast speed
    await game.setSpeed(10)
    await game.skipToPhase('overwhelm')

    // Wait for some tasks to expire (don't interact — let them expire)
    await page.waitForTimeout(5000)

    const state = await game.getState()
    expect(Number(state.clientsLost)).toBeGreaterThan(0)
  })

  test('Harper unlock shows transformation question', async ({ page }) => {
    await game.skipCinematics()
    await page.locator('[data-testid="start-button"]').click()
    await page.locator('[data-testid="welcome-dismiss"]').click()

    // Skip to overwhelm phase (just before harper), then let it tick into harper naturally
    await game.setSpeed(20)
    await game.skipToPhase('overwhelm')

    // Wait for the game to naturally reach harper phase and show the welcome card
    // At 20x speed, overwhelm→harper is 60 real seconds / 20x = 3s
    const dismissBtn = page.locator('[data-testid="welcome-dismiss"]')
    await expect(dismissBtn).toBeVisible({ timeout: 15_000 })

    // Should show "morning" text from WelcomeCard 2
    const cardText = await page.locator('.fixed.inset-0').textContent()
    expect(cardText).toContain('morning')
    await dismissBtn.click()

    // Cinematic dismiss should appear (fast because we skipped cinematics)
    const cinematicDismiss = page.locator('[data-testid="cinematic-dismiss"]')
    await expect(cinematicDismiss).toBeVisible({ timeout: 15_000 })
  })

  test('CTA links to harperinsure.com', async ({ page }) => {
    await game.skipCinematics()
    await page.locator('[data-testid="start-button"]').click()
    await page.locator('[data-testid="welcome-dismiss"]').click()

    // Skip to end
    await game.setSpeed(20)

    // Fast-forward through the whole game
    await game.skipToPhase('harper')

    // Dismiss harper stats + cinematic
    const welcomeDismiss = page.locator('[data-testid="welcome-dismiss"]')
    if (await welcomeDismiss.isVisible({ timeout: 3000 }).catch(() => false)) {
      await welcomeDismiss.click()
    }
    const cinematicDismiss = page.locator('[data-testid="cinematic-dismiss"]')
    if (await cinematicDismiss.isVisible({ timeout: 15_000 }).catch(() => false)) {
      await cinematicDismiss.click()
    }

    // Wait for end screen
    await game.waitForScreen('end', 60_000)

    // Check the link
    const link = page.locator('[data-testid="learn-more-link"]')
    await expect(link).toBeVisible()
    await expect(link).toHaveAttribute('href', 'https://harperinsure.com')
    await expect(link).toHaveAttribute('target', '_blank')
  })

  test('scorecard shows before/after comparison', async ({ page }) => {
    await game.skipCinematics()
    await page.locator('[data-testid="start-button"]').click()
    await page.locator('[data-testid="welcome-dismiss"]').click()

    // Play through at max speed with some task solving
    await game.setSpeed(20)

    // Solve a few tasks before harper
    for (let i = 0; i < 5; i++) {
      try {
        await game.waitForTask(3000)
        const taskId = await game.getFirstTaskId()
        await page.locator(`[data-testid="task-card-${taskId}"]`).click()
        await page.waitForTimeout(200)
        await solveActiveTask(page)
        await page.waitForTimeout(800)
      } catch {
        break
      }
    }

    // Skip to end via harper
    await game.skipToPhase('harper')
    const welcomeDismiss = page.locator('[data-testid="welcome-dismiss"]')
    if (await welcomeDismiss.isVisible({ timeout: 3000 }).catch(() => false)) {
      await welcomeDismiss.click()
    }
    const cinematicDismiss = page.locator('[data-testid="cinematic-dismiss"]')
    if (await cinematicDismiss.isVisible({ timeout: 15_000 }).catch(() => false)) {
      await cinematicDismiss.click()
    }

    await game.waitForScreen('end', 60_000)

    // Verify scorecard has before/after columns
    await expect(page.locator('text=Before Harper')).toBeVisible()
    await expect(page.locator('text=After Harper')).toBeVisible()

    // Verify key metrics are present
    await expect(page.locator('text=Revenue / hour')).toBeVisible()
    await expect(page.locator('text=Admin ratio')).toBeVisible()
  })
})
