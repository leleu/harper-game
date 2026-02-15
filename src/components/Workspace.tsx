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
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <p className="text-harper-muted text-lg">Select a task from the queue</p>
          <p className="text-harper-muted/60 text-sm mt-1">Click a card on the left to begin</p>
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
          <div className="bg-white rounded-xl shadow-sm border border-harper-muted/20 p-8 max-w-2xl w-full">
            <p className="text-harper-teal font-semibold">
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
