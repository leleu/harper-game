import { useGameStore } from '../state/gameStore'
import { ACORDForm } from '../tasks/ACORDForm'
import { CarrierSubmission } from '../tasks/CarrierSubmission'
import { QuoteComparison } from '../tasks/QuoteComparison'
import { COIIssuance } from '../tasks/COIIssuance'
import { FollowUpEmail } from '../tasks/FollowUpEmail'
import { RenewalProcessing } from '../tasks/RenewalProcessing'
import { DiscoveryCall } from '../tasks/DiscoveryCall'
import { ProposalPresentation } from '../tasks/ProposalPresentation'

export function Workspace() {
  const activeTask = useGameStore((s) => s.activeTask)
  const harperUnlocked = useGameStore((s) => s.harperUnlocked)
  const unlockedTools = useGameStore((s) => s.unlockedTools)

  if (!activeTask) {
    return (
      <div className="flex-1 flex items-center justify-center noise-bg">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full bg-slate-700/40 flex items-center justify-center mx-auto mb-4">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-mist/40">
              <path d="M3 5h14M3 10h14M3 15h10" strokeLinecap="round"/>
            </svg>
          </div>
          <p className="text-mist/60 text-sm font-medium">Select a task from the inbox</p>
          <p className="text-mist/30 text-xs mt-1">Click a card on the left to begin</p>
        </div>
      </div>
    )
  }

  const isHarperAssisted = harperUnlocked && unlockedTools.includes(getToolForTask(activeTask.type))

  switch (activeTask.type) {
    case 'acord-form':
      return <ACORDForm harperAssisted={isHarperAssisted} />
    case 'carrier-submission':
      return <CarrierSubmission harperAssisted={isHarperAssisted} />
    case 'quote-comparison':
      return <QuoteComparison harperAssisted={isHarperAssisted} />
    case 'coi-issuance':
      return <COIIssuance harperAssisted={isHarperAssisted} />
    case 'follow-up-email':
      return <FollowUpEmail harperAssisted={isHarperAssisted} />
    case 'renewal-processing':
      return <RenewalProcessing harperAssisted={isHarperAssisted} />
    case 'discovery-call':
      return <DiscoveryCall />
    case 'proposal-presentation':
      return <ProposalPresentation />
    default:
      return (
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="card-elevated rounded-xl p-8 max-w-2xl w-full">
            <p className="text-pearl font-semibold">
              Active: {activeTask.type} — {activeTask.clientName}
            </p>
          </div>
        </div>
      )
  }
}

function getToolForTask(taskType: string): string {
  const mapping: Record<string, string> = {
    'acord-form': 'smart-applications',
    'carrier-submission': 'smart-applications',
    'quote-comparison': 'instant-quote',
    'coi-issuance': 'auto-coi',
    'follow-up-email': 'smart-followups',
    'renewal-processing': 'renewal-autopilot',
  }
  return mapping[taskType] || ''
}
