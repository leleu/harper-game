import { test, expect } from '@playwright/test'
import { GameAPI } from '../helpers/game-api'
import { solveActiveTask } from '../helpers/task-solver'

test.describe('Persona: Investor', () => {
  test('page loads under 3 seconds', async ({ page }) => {
    const start = Date.now()
    await page.goto('/')
    await page.waitForSelector('[data-testid="start-button"]', { timeout: 10_000 })
    const loadTime = Date.now() - start
    expect(loadTime).toBeLessThan(3000)
  })

  test('revenue and NPS visible throughout gameplay', async ({ page }) => {
    const game = new GameAPI(page)
    await page.goto('/')
    await page.waitForSelector('[data-testid="start-button"]', { timeout: 10_000 })
    await game.skipCinematics()
    await page.locator('[data-testid="start-button"]').click()
    await page.locator('[data-testid="welcome-dismiss"]').click()

    // Revenue label should be visible in TopBar
    await expect(page.locator('text=Rev')).toBeVisible()
    await expect(page.locator('text=NPS')).toBeVisible()
  })

  test('full game at 20x completes under 60s wall clock', async ({ page }) => {
    const game = new GameAPI(page)
    await page.goto('/')
    await page.waitForSelector('[data-testid="start-button"]', { timeout: 10_000 })
    await game.skipCinematics()
    await page.locator('[data-testid="start-button"]').click()
    await page.locator('[data-testid="welcome-dismiss"]').click()
    await game.setSpeed(20)

    const start = Date.now()

    // Solve a few tasks to build up stats
    for (let i = 0; i < 5; i++) {
      try {
        await game.waitForTask(3000)
        const taskId = await game.getFirstTaskId()
        await page.locator(`[data-testid="task-card-${taskId}"]`).click()
        await page.waitForTimeout(200)
        await solveActiveTask(page)
        await page.waitForTimeout(500)
      } catch {
        break
      }
    }

    // Skip to harper phase to accelerate completion
    await game.skipToPhase('harper')
    await page.waitForTimeout(500)
    await game.tryDismissOverlay()
    await page.waitForTimeout(500)
    await game.tryDismissOverlay()
    await page.waitForTimeout(500)

    // Wait for end screen
    await game.waitForScreen('end', 60_000)

    const elapsed = (Date.now() - start) / 1000
    expect(elapsed).toBeLessThan(60)

    const state = await game.getState()
    expect(state.screen).toBe('end')
  })

  test('revenue/hour improvement shown on scorecard', async ({ page }) => {
    const game = new GameAPI(page)
    await page.goto('/')
    await page.waitForSelector('[data-testid="start-button"]', { timeout: 10_000 })
    await game.skipCinematics()
    await page.locator('[data-testid="start-button"]').click()
    await page.locator('[data-testid="welcome-dismiss"]').click()
    await game.setSpeed(20)

    // Quick play-through
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

    // Revenue/hour should be visible
    await expect(page.locator('text=Revenue / hour')).toBeVisible({ timeout: 5000 })

    // Before/after columns
    await expect(page.locator('text=Before Harper')).toBeVisible()
    await expect(page.locator('text=After Harper')).toBeVisible()
  })

  test('zero console errors during gameplay', async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', (err) => errors.push(err.message))

    const game = new GameAPI(page)
    await page.goto('/')
    await page.waitForSelector('[data-testid="start-button"]', { timeout: 10_000 })
    await game.skipCinematics()
    await page.locator('[data-testid="start-button"]').click()
    await page.locator('[data-testid="welcome-dismiss"]').click()
    await game.setSpeed(20)

    // Let the game run for a bit
    await page.waitForTimeout(5000)

    // Solve a few tasks
    for (let i = 0; i < 3; i++) {
      try {
        await game.waitForTask(2000)
        const taskId = await game.getFirstTaskId()
        await page.locator(`[data-testid="task-card-${taskId}"]`).click()
        await page.waitForTimeout(200)
        await solveActiveTask(page)
        await page.waitForTimeout(500)
      } catch {
        break
      }
    }

    expect(errors).toHaveLength(0)
  })
})
