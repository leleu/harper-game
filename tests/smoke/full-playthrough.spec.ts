import { test, expect } from '@playwright/test'
import { GameAPI } from '../helpers/game-api'
import { solveActiveTask } from '../helpers/task-solver'

test.describe('Full Playthrough', () => {
  test('completes entire game loop at 20x speed', async ({ page }) => {
    test.setTimeout(120_000)
    const game = new GameAPI(page)

    await page.goto('/')
    await page.waitForSelector('[data-testid="start-button"]', { timeout: 10_000 })
    await game.skipCinematics()
    await page.locator('[data-testid="start-button"]').click()
    await page.locator('[data-testid="welcome-dismiss"]').click()
    await game.setSpeed(20)

    // Phase 1: Solve a few tasks in tutorial/ramp to build up stats
    for (let i = 0; i < 8; i++) {
      try {
        await game.waitForTask(5000)
        const taskId = await game.getFirstTaskId()
        await page.locator(`[data-testid="task-card-${taskId}"]`).click()
        await page.waitForTimeout(300)
        await solveActiveTask(page)
        await page.waitForTimeout(500)
      } catch {
        break
      }
    }

    // Phase 2: Skip to overwhelm to trigger more task pressure
    await game.skipToPhase('overwhelm')
    await page.waitForTimeout(1000)

    // Dismiss any overlay
    await game.tryDismissOverlay()
    await page.waitForTimeout(500)

    // Phase 3: Let it naturally reach harper phase via time progression
    // At 20x speed, overwhelm→harper is ~3s wall clock
    // Wait for harper welcome card (shows when WelcomeCard 2 appears)
    const harperWelcome = page.locator('[data-testid="welcome-dismiss"]')
    await harperWelcome.waitFor({ state: 'visible', timeout: 15_000 }).catch(() => {})
    if (await harperWelcome.isVisible().catch(() => false)) {
      await harperWelcome.click()
    }
    await page.waitForTimeout(500)

    // Dismiss cinematic if it appears
    const cinematic = page.locator('[data-testid="cinematic-dismiss"]')
    await cinematic.waitFor({ state: 'visible', timeout: 10_000 }).catch(() => {})
    if (await cinematic.isVisible().catch(() => false)) {
      await cinematic.click()
    }

    // Phase 4: Wait for game to end naturally
    await game.waitForScreen('end', 60_000)

    // Verify end of day screen
    const state = await game.getState()
    expect(state.screen).toBe('end')
    expect(state.harperUnlocked).toBe(true)
    expect(Number(state.tasksCompleted)).toBeGreaterThan(3)

    // Verify scorecard is visible
    await expect(page.locator('[data-testid="learn-more-link"]')).toBeVisible({ timeout: 5000 })
    await expect(page.locator('[data-testid="play-again-button"]')).toBeVisible()
  })
})
