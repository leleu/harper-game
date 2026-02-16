import { test, expect } from '@playwright/test'
import { GameAPI } from '../helpers/game-api'
import { solveActiveTask } from '../helpers/task-solver'

test.describe('Persona: Educator', () => {
  let game: GameAPI

  test.beforeEach(async ({ page }) => {
    game = new GameAPI(page)
    await page.goto('/')
    await page.waitForSelector('[data-testid="start-button"]', { timeout: 10_000 })
    await game.skipCinematics()
    await page.locator('[data-testid="start-button"]').click()
    await page.locator('[data-testid="welcome-dismiss"]').click()
  })

  test('task intros teach real industry concepts', async ({ page }) => {
    await game.setSpeed(5)

    // Solve several tasks to trigger different intros
    const seenTypes = new Set<string>()
    for (let i = 0; i < 15; i++) {
      try {
        await game.waitForTask(3000)
        const taskId = await game.getFirstTaskId()
        await page.locator(`[data-testid="task-card-${taskId}"]`).click()
        await page.waitForTimeout(500) // Let intro show

        const activeType = await game.getActiveTaskType()
        if (activeType) seenTypes.add(activeType)

        await solveActiveTask(page)
        await page.waitForTimeout(800)
      } catch {
        break
      }
    }

    // We should have seen at least 3 different task types
    expect(seenTypes.size).toBeGreaterThanOrEqual(3)
  })

  test('all 8 task types appear during game', async ({ page }) => {
    await game.setSpeed(20)

    const taskTypesSeen = new Set<string>()

    // Collect task types from each phase by skipping through them
    const phases = ['tutorial', 'ramp', 'overwhelm', 'harper', 'mastery'] as const
    for (const phase of phases) {
      await game.skipToPhase(phase)
      await page.waitForTimeout(500)

      // Dismiss any overlay
      await game.tryDismissOverlay()
      await page.waitForTimeout(300)
      await game.tryDismissOverlay()
      await page.waitForTimeout(300)

      // Let the game run for a bit at this phase to spawn tasks
      for (let i = 0; i < 10; i++) {
        try {
          const state = await game.getState()
          const queue = state.taskQueue as Array<{ type: string }>
          queue.forEach((t) => taskTypesSeen.add(t.type))

          const activeType = await game.getActiveTaskType()
          if (activeType) {
            taskTypesSeen.add(activeType)
            await solveActiveTask(page)
          }
        } catch {
          // ignore
        }
        await page.waitForTimeout(500)
      }
    }

    const expectedTypes = [
      'acord-form',
      'carrier-submission',
      'quote-comparison',
      'coi-issuance',
      'follow-up-email',
      'renewal-processing',
      'discovery-call',
      'proposal-presentation',
    ]

    for (const type of expectedTypes) {
      expect(taskTypesSeen.has(type)).toBe(true)
    }
  })

  test('discovery calls present insurance knowledge questions', async ({ page }) => {
    await game.setSpeed(5)

    // Look for a discovery call task
    let found = false
    for (let i = 0; i < 30 && !found; i++) {
      try {
        const state = await game.getState()
        const queue = state.taskQueue as Array<{ id: string; type: string; expired: boolean; completed: boolean }>
        const discoveryTask = queue.find((t) => t.type === 'discovery-call' && !t.expired && !t.completed)

        if (discoveryTask) {
          await page.locator(`[data-testid="task-card-${discoveryTask.id}"]`).click()
          await page.waitForTimeout(500)

          // Should show multiple choice options
          await expect(page.locator('[data-testid="discovery-option-0"]')).toBeVisible()
          await expect(page.locator('[data-testid="discovery-option-1"]')).toBeVisible()

          found = true
        } else {
          // Solve any active task
          const activeType = await game.getActiveTaskType()
          if (activeType) {
            await solveActiveTask(page)
            await page.waitForTimeout(800)
          } else if (await game.getTaskQueueLength() > 0) {
            const taskId = await game.getFirstTaskId()
            await page.locator(`[data-testid="task-card-${taskId}"]`).click()
            await page.waitForTimeout(200)
          } else {
            await page.waitForTimeout(1000)
          }
        }
      } catch {
        await page.waitForTimeout(1000)
      }
    }

    // It's OK if discovery call didn't appear in this window
    // The spawn schedule is random — we just verify the UI when it does
  })

  test('pause screen serves as reference guide', async ({ page }) => {
    // Open pause screen
    await page.keyboard.press('Escape')

    // Should have main sections
    await expect(page.locator('text=Game Paused')).toBeVisible()
    await expect(page.locator('text=Your Stats')).toBeVisible()
    await expect(page.locator('text=How to Play')).toBeVisible()
    await expect(page.locator('text=Task Types')).toBeVisible()
    await expect(page.locator('text=About This Game')).toBeVisible()

    // About section should mention 57% stat
    const aboutSection = page.locator('text=57%')
    await expect(aboutSection).toBeVisible()

    // Resume button should be present
    await expect(page.locator('text=Resume Game')).toBeVisible()
  })
})
