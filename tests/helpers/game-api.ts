import type { Page } from '@playwright/test'

type GamePhase = 'start' | 'tutorial' | 'ramp' | 'overwhelm' | 'harper' | 'mastery' | 'winddown' | 'end'

/**
 * Wraps window.__HARPER_GAME__ for Playwright test automation.
 * All methods use page.evaluate to interact with the game's Zustand store.
 */
export class GameAPI {
  constructor(private page: Page) {}

  async getState(): Promise<Record<string, unknown>> {
    return this.page.evaluate(() => {
      const state = window.__HARPER_GAME__?.getState()
      if (!state) throw new Error('Game bridge not available')
      // Strip functions and Sets for serialization
      const clean: Record<string, unknown> = {}
      for (const [k, v] of Object.entries(state)) {
        if (typeof v === 'function') continue
        if (v instanceof Set) {
          clean[k] = [...v]
          continue
        }
        clean[k] = v
      }
      return clean
    })
  }

  async setSpeed(n: number): Promise<void> {
    await this.page.evaluate((speed) => {
      window.__HARPER_GAME__?.setSpeedMultiplier(speed)
    }, n)
  }

  async skipCinematics(): Promise<void> {
    await this.page.evaluate(() => {
      window.__HARPER_SKIP_CINEMATICS__ = true
    })
  }

  async startGame(): Promise<void> {
    await this.page.evaluate(() => {
      window.__HARPER_GAME__?.startGame()
    })
  }

  async resetGame(): Promise<void> {
    await this.page.evaluate(() => {
      window.__HARPER_GAME__?.resetGame()
    })
  }

  async setPaused(paused: boolean): Promise<void> {
    await this.page.evaluate((p) => {
      window.__HARPER_GAME__?.setPaused(p)
    }, paused)
  }

  async skipToPhase(phase: GamePhase): Promise<void> {
    await this.page.evaluate((p) => {
      window.__HARPER_GAME__?.skipToPhase(p as GamePhase)
    }, phase)
  }

  async waitForPhase(phase: string, timeoutMs = 90_000): Promise<void> {
    await this.page.waitForFunction(
      (p) => {
        const state = window.__HARPER_GAME__?.getState()
        return state && (state as Record<string, unknown>).gamePhase === p
      },
      phase,
      { timeout: timeoutMs },
    )
  }

  async waitForScreen(screen: 'start' | 'game' | 'end', timeoutMs = 90_000): Promise<void> {
    await this.page.waitForFunction(
      (s) => {
        const state = window.__HARPER_GAME__?.getState()
        return state && (state as Record<string, unknown>).screen === s
      },
      screen,
      { timeout: timeoutMs },
    )
  }

  async waitForTask(timeoutMs = 30_000): Promise<void> {
    await this.page.waitForFunction(
      () => {
        const state = window.__HARPER_GAME__?.getState()
        if (!state) return false
        const queue = (state as Record<string, unknown>).taskQueue as Array<{ expired: boolean; completed: boolean }>
        return queue.some((t) => !t.expired && !t.completed)
      },
      undefined,
      { timeout: timeoutMs },
    )
  }

  async getFirstTaskId(): Promise<string> {
    return this.page.evaluate(() => {
      const state = window.__HARPER_GAME__?.getState()
      if (!state) throw new Error('Game bridge not available')
      const queue = (state as Record<string, unknown>).taskQueue as Array<{ id: string; expired: boolean; completed: boolean }>
      const task = queue.find((t) => !t.expired && !t.completed)
      if (!task) throw new Error('No active tasks in queue')
      return task.id
    })
  }

  async getActiveTaskType(): Promise<string | null> {
    return this.page.evaluate(() => {
      const state = window.__HARPER_GAME__?.getState()
      if (!state) return null
      const active = (state as Record<string, unknown>).activeTask as { type: string } | null
      return active?.type ?? null
    })
  }

  async getTaskQueueLength(): Promise<number> {
    return this.page.evaluate(() => {
      const state = window.__HARPER_GAME__?.getState()
      if (!state) return 0
      const queue = (state as Record<string, unknown>).taskQueue as Array<{ expired: boolean; completed: boolean }>
      return queue.filter((t) => !t.expired && !t.completed).length
    })
  }

  /**
   * Try to dismiss any overlay (welcome card or cinematic) using direct DOM click.
   * Returns the type of overlay dismissed, or null if none found.
   * This bypasses Playwright's animation-sensitive visibility checks.
   */
  async tryDismissOverlay(): Promise<string | null> {
    return this.page.evaluate(() => {
      const welcomeBtn = document.querySelector('[data-testid="welcome-dismiss"]') as HTMLElement
      if (welcomeBtn) {
        welcomeBtn.click()
        return 'welcome'
      }
      const cinematicBtn = document.querySelector('[data-testid="cinematic-dismiss"]') as HTMLElement
      if (cinematicBtn) {
        cinematicBtn.click()
        return 'cinematic'
      }
      return null
    })
  }
}
