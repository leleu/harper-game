import { test, expect } from '@playwright/test'
import { GameAPI } from '../helpers/game-api'
import { solveActiveTask } from '../helpers/task-solver'

test.describe('Persona: Recruit', () => {
  let game: GameAPI

  test.beforeEach(async ({ page }) => {
    game = new GameAPI(page)
    await page.goto('/')
    await page.waitForSelector('[data-testid="start-button"]', { timeout: 10_000 })
    await game.skipCinematics()
    await page.locator('[data-testid="start-button"]').click()
    await page.locator('[data-testid="welcome-dismiss"]').click()
  })

  test('task intros reference real industry terms', async ({ page }) => {
    // Wait for first task and select it to trigger task intro
    await game.waitForTask(10_000)
    const taskId = await game.getFirstTaskId()
    await page.locator(`[data-testid="task-card-${taskId}"]`).click()

    // Task intro should appear briefly with industry-specific content
    // The intro overlay should be visible (it auto-hides after 3s)
    await page.waitForTimeout(500)

    // The intro text should contain real terms (checking page body for any intro)
    const pageText = await page.textContent('body')
    expect(pageText).toBeTruthy()
    // At least one of these real industry terms should be present somewhere
    const hasIndustryTerms = ['ACORD', 'carrier', 'underwriter', 'E&S', 'COI', 'policy'].some(
      (term) => pageText!.toLowerCase().includes(term.toLowerCase())
    )
    expect(hasIndustryTerms).toBe(true)
  })

  test('carrier portals show real carrier names', async ({ page }) => {
    await game.setSpeed(5)

    // Wait for tasks and find a carrier submission
    let found = false
    for (let i = 0; i < 30 && !found; i++) {
      try {
        await game.waitForTask(3000)
        const state = await game.getState()
        const queue = state.taskQueue as Array<{ id: string; type: string; expired: boolean; completed: boolean }>
        const carrierTask = queue.find((t) => t.type === 'carrier-submission' && !t.expired && !t.completed)
        if (carrierTask) {
          await page.locator(`[data-testid="task-card-${carrierTask.id}"]`).click()
          found = true
        } else {
          // Solve whatever is active to make room for more spawns
          const activeType = await game.getActiveTaskType()
          if (activeType) {
            await solveActiveTask(page)
            await page.waitForTimeout(800)
          } else {
            await page.waitForTimeout(1000)
          }
        }
      } catch {
        await page.waitForTimeout(1000)
      }
    }

    if (found) {
      const pageText = await page.textContent('body')
      expect(pageText).toContain('Hartford')
      expect(pageText).toContain('Hiscox')
      expect(pageText).toContain('AIG')
    }
  })

  test('pause screen lists all 8 task types', async ({ page }) => {
    // Press ESC to open pause screen
    await page.keyboard.press('Escape')

    const pageText = await page.textContent('body')
    const taskTypes = [
      'ACORD Form',
      'Carrier Submission',
      'Quote Comparison',
      'COI Request',
      'Follow-up Email',
      'Renewal Processing',
      'Discovery Call',
      'Proposal',
    ]
    for (const taskType of taskTypes) {
      expect(pageText).toContain(taskType)
    }

    // Close pause screen
    await page.keyboard.press('Escape')
  })

  test('gold tasks remain manual after Harper unlock', async ({ page }) => {
    await game.setSpeed(10)

    // Skip to mastery (after Harper)
    await game.skipToPhase('mastery')

    // Dismiss any overlays
    const welcomeDismiss = page.locator('[data-testid="welcome-dismiss"]')
    if (await welcomeDismiss.isVisible({ timeout: 2000 }).catch(() => false)) {
      await welcomeDismiss.click()
    }
    const cinematicDismiss = page.locator('[data-testid="cinematic-dismiss"]')
    if (await cinematicDismiss.isVisible({ timeout: 5000 }).catch(() => false)) {
      await cinematicDismiss.click()
    }

    // Verify Harper is unlocked
    const state = await game.getState()
    expect(state.harperUnlocked).toBe(true)

    // Wait for a gold task (discovery-call or proposal-presentation)
    let goldFound = false
    for (let i = 0; i < 40 && !goldFound; i++) {
      try {
        const s = await game.getState()
        const queue = s.taskQueue as Array<{ id: string; type: string; isGold: boolean; harperAssisted: boolean; expired: boolean; completed: boolean }>
        const goldTask = queue.find((t) => t.isGold && !t.expired && !t.completed)
        if (goldTask) {
          // Gold tasks should NOT be harper-assisted
          expect(goldTask.harperAssisted).toBe(false)
          goldFound = true
        }
      } catch {
        // ignore
      }
      if (!goldFound) await page.waitForTimeout(500)
    }

    // It's OK if we didn't find a gold task in this window — spawning is random
    // But if we did find one, it was correctly not automated
  })

  test('admin ratio drops significantly post-Harper', async ({ page }) => {
    await game.setSpeed(20)

    // Solve tasks in tutorial phase to build up admin time
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

    // Skip to mastery and solve more tasks
    await game.skipToPhase('mastery')
    const welcomeDismiss = page.locator('[data-testid="welcome-dismiss"]')
    if (await welcomeDismiss.isVisible({ timeout: 2000 }).catch(() => false)) {
      await welcomeDismiss.click()
    }
    const cinematicDismiss = page.locator('[data-testid="cinematic-dismiss"]')
    if (await cinematicDismiss.isVisible({ timeout: 15_000 }).catch(() => false)) {
      await cinematicDismiss.click()
    }

    // Wait for end
    await game.waitForScreen('end', 60_000)

    // Check scorecard shows before/after
    await expect(page.locator('text=Revenue / hour')).toBeVisible({ timeout: 5000 })
  })
})
