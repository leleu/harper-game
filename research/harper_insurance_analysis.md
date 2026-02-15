# Harper Insurance (harperinsure.com) -- Research Synthesis

**Date**: 2026-02-14
**Purpose**: Ground the training game in what Harper actually does vs. what we guessed
**Sources**: YC directory, YC Launch page, Optimist VC investor memo, Lobster Capital
investor memo, Agentic podcast (Ep 6), Lobster Talks podcast, George Bandarian X thread,
Crunchbase, harperinsure.com, welcome.harperinsure.com

---

## 1. What Harper Actually Is

Harper is NOT a SaaS tool sold to insurance agencies. It IS a fully autonomous,
AI-native commercial insurance **brokerage** -- they are the broker. This is the single
most important distinction. The founders explicitly said that selling AI tools to
insurance agencies failed. Brokerages do not buy software. The breakthrough came when
they asked: "Why are we selling insurance on behalf of agencies when we could just get
licensed ourselves?"

**Business model**: Standard brokerage commissions on premiums placed. No SaaS fees.
They make money the same way every broker does -- they just operate at dramatically lower
cost per policy.

**Market focus**: Excess & Surplus (E&S) lines -- the market for risks too complex,
specialized, or unusual for standard/admitted carriers. E&S has grown 250% since 2018 to
over $135B in gross written premium. This covers industries like trucking, cannabis,
construction, armed security, restaurants with late-night operations, and tech companies
needing E&O without AI exclusions.

**Key insight**: A towing company in Michigan with 20 trucks does not merit a dedicated
relationship manager at Marsh or Aon, but they still need complex insurance and still
comparison-shop on price and service quality. Harper serves them at a fraction of the
cost with faster turnaround.

---

## 2. Harper Hub -- What It Actually Does

Harper Hub is their **internal** platform (not sold externally) that orchestrates the
full brokerage lifecycle:

### Workflow stages covered:
1. **Prospecting** -- identifying and qualifying potential clients
2. **Quoting** -- gathering information, completing applications, obtaining quotes
3. **Binding** -- selecting carriers, finalizing coverage, binding policies
4. **Post-bind support** -- servicing, renewals, certificates, endorsements

### Specific automation capabilities:
- **AI-driven form auto-completion**: Eliminates manual data entry on carrier
  applications. Aggregates data across phone calls, emails, and broker-AI agent
  conversations to pre-fill forms.
- **Automated carrier and underwriter selection**: Uses market-wide data to identify
  optimal carriers for each risk profile. As volumes increase, the matching gets better
  (network effect / data flywheel).
- **Integrated client communication management**: Manages the back-and-forth between
  clients, carriers, and underwriters.
- **Voice AI**: Runs quotes and handles initial client interactions by phone. This is a
  distinctive capability -- AI agents handle voice conversations.
- **Real-time decisioning**: Instant carrier matching and automated workflows.

### What it automates away:
- Manual submission prep (filling out carrier-specific application forms)
- Quote comparison and normalization
- Service tasks (COIs, endorsements, routine communications)
- These tasks consume over 40% of a traditional broker's time

### What humans still do:
- Licensed brokers bind policies (regulatory requirement)
- Relationship building with clients
- Complex underwriting judgment calls
- Their tagline: "Harper leads with human expertise -- AI just amplifies their abilities"

### Performance claims:
- Application time reduced by more than 50%
- 85% success rate for companies traditional brokers deem "uninsurable"
- 100% placement success for tech E&O policies without AI exclusions
- Revenue per work hour grew from $6 in October 2024 to $71 by February 2025

---

## 3. Founders and Origin Story

### Tushar Nair (Co-Founder & CTO)
- ~9 years at Goldman Sachs, led ML/AI engineering teams automating services for the
  commodities desk
- Also worked at Carlyle and Coatue
- Co-founded Poolit with Dakotah (fintech, scaled to $100M AUM)

### Dakotah Rice (Co-Founder & CEO)
- Goldman Sachs, Technology/Media/Telecom Investment Banking team
- Also at Carlyle and Coatue
- Family history in insurance and entrepreneurship
- Co-founded Poolit with Tushar

### The pivot story (from the Agentic podcast and X thread):
1. They started by building AI tools to SELL to insurance agencies
2. This failed -- insurance brokerages do not buy software
3. The breakthrough: "Why are we selling insurance on behalf of agencies when we could
   just get licensed ourselves?"
4. They got licensed as a brokerage and became the AI-native broker themselves
5. Key metaphor from George Bandarian: "It takes UNH 50 steps to process insurance
   claims. Harper is building an AI Agent to do it in 5."

### What they say about the problem:
- Commercial insurance is drowning in operational inefficiency
- Antiquated systems create terrible customer experiences
- Traditional brokerages cannot scale because every new client requires proportional
  human labor
- The E&S market is especially ripe because policy approval and underwriting was
  previously deeply labor-intensive and slow
- New risk categories (climate change, supply chain uncertainty, autonomous vehicles,
  AI agents) are breaking old regulatory structures

---

## 4. Demo Videos, UI, and Visual Evidence

**No public product screenshots, demo videos, or blog posts showing their actual UI
have been found.** This is consistent with the product being an internal platform (Harper
Hub is their operational tool, not a customer-facing SaaS product).

What IS publicly visible:
- **harperinsure.com** -- their main website with "Smarter. Faster. Cheaper." tagline
- **welcome.harperinsure.com** -- a restaurant-specific landing page showing
  vertical-specific marketing (bars, restaurants, pubs)
- **harperinsure.com/industries** -- an industries page (content not scraped but the
  URL exists)
- **harperinsure.com/about** -- about page

The restaurant landing page claims 20-40% savings on comprehensive packages bundling
liability, general liability, property coverage, and workers' comp. They highlight
handling "challenging" restaurant cases: late-night operations, entertainment/DJs/
security staff, previous claims, multi-location concepts, and risks declined or
overpriced elsewhere.

---

## 5. Competitive Landscape

Harper occupies a fundamentally different position than the tools typically mentioned as
competitors. The comparison is not apples-to-apples:

### Harper vs. Indio Technologies (now Applied Systems/Indio)
- **Indio**: A SaaS tool that digitizes insurance application forms. White-label
  platform with "smart forms" that map communal data points across 10,000+ forms.
  E-signature, activity tracking. Sold TO brokers and agencies.
- **Harper**: IS the broker. Does not sell software to agencies. Uses AI internally.
- **Key difference**: Indio helps existing brokers digitize their paperwork. Harper
  replaces the broker's operational labor entirely and IS the brokerage.

### Harper vs. Bold Penguin
- **Bold Penguin**: Comparative rating platform for small commercial. Enter quote info
  once, get quotes from multiple carriers in real time. Focused on speed for small
  commercial and E&S.
- **Harper**: Does similar carrier matching but as part of being the broker, not as a
  tool sold to brokers. Harper also targets mid-market complex risks, not just small
  commercial.

### Harper vs. Tarmika (by Applied Systems)
- **Tarmika**: Commercial lines comparative rater. Dominant in CL quoting platforms.
  Built specifically for small business commercial quoting.
- **Harper**: Goes beyond quoting to the entire lifecycle (prospecting through
  post-bind servicing). And again -- IS the broker, not a rater.

### Harper vs. Semsee
- **Semsee**: CL rating tool known for ease of use and carrier relationships. Another
  quoting-stage tool.
- **Harper**: Covers the full lifecycle, not just the quoting stage.

### The structural distinction:
All four competitors (Indio, Bold Penguin, Tarmika, Semsee) are **tools sold to
brokers**. Harper IS the broker. The competitors help existing brokerages be more
efficient at specific stages. Harper built a brokerage from scratch with AI at every
stage, claiming per-FTE efficiency unit economics that surpass century-old companies
like Gallagher, Aon, and Marsh.

### Who Harper actually competes with:
- Traditional E&S brokerages (Marsh, Aon, Gallagher, regional wholesalers)
- Other AI-native insurance startups (though none were identified as direct competitors
  in the E&S brokerage space specifically)

---

## 6. Go-To-Market Strategy

### They are NOT replacing existing brokerages or augmenting existing agents.
They ARE an alternative brokerage that businesses can choose instead of a traditional
broker.

**Target customer**: Mid-sized businesses with complex insurance needs across industries
like trucking, tech, construction, consulting, restaurants, cannabis, armed security,
drone operations, etc.

**Customer acquisition**:
- Vertical-specific landing pages (e.g., welcome.harperinsure.com for restaurants)
- Adding 100+ customers per week (as of mid-2025)
- 98% retention rate
- Coverage across 35 states

**Value proposition to the business owner (the insured)**:
1. Faster -- automated workflows cut weeks from traditional timeline
2. Cheaper -- 20-40% savings claimed for restaurant vertical
3. Better coverage -- 85% success rate for "uninsurable" risks
4. Simpler -- reduced back-and-forth, fewer forms to fill out manually

**Revenue model**: Standard brokerage commissions (same as traditional brokers)

**Unit economics**: Revenue per work hour went from $6 to $71 in ~5 months. This is
the core advantage -- same commission revenue per policy but dramatically less labor
cost to service each policy.

---

## 7. Traction and Metrics

| Metric | Value | Date |
|--------|-------|------|
| First customer | October 2024 | Oct 2024 |
| ARR | $1.1M+ | ~March 2025 (5 months post-launch) |
| Annualized premiums written | $6M+ | ~March 2025 |
| States covered | 35 | ~March 2025 |
| Customer growth | 100+ per week | Mid-2025 |
| Retention | 98%+ | Mid-2025 |
| Revenue per work hour | $6 -> $71 | Oct 2024 -> Feb 2025 |
| Team size | 25 | YC W25 batch |
| Funding | $1M+ (YC) | W25 |
| Investors | Optimist VC, Lobster Capital, YC | 2024-2025 |

---

## 8. Implications for the Training Game

### What we got RIGHT in the current game:
- The Harper Hub concept as a tool that automates broker tasks (good)
- ACORD form auto-filling (confirmed -- they do AI-driven form auto-completion)
- Quote comparison and carrier matching (confirmed -- automated carrier selection)
- COI issuance (confirmed -- post-bind support is part of their lifecycle)
- Renewal processing (confirmed -- post-bind support)
- Follow-up email drafting (confirmed -- client communication management)
- The industry mix: trucking, tech, construction, restaurants, cannabis, etc.
  (confirmed -- these are exactly the E&S verticals Harper serves)
- The "uninsurable" framing (confirmed -- 85% success rate for hard-to-place risks)
- E&O without AI exclusions for tech (confirmed -- 100% placement success claimed)

### What we should VERIFY or ADJUST:
1. **Framing**: The game correctly shows the player as a broker using Harper tools. But
   Harper's real model is that the PLAYER would be a Harper employee -- they are the
   brokerage. The game should probably frame the player as a new broker at Harper, not
   as an independent agent adopting Harper's tools.
2. **Voice AI**: Harper uses voice AI to run quotes and handle initial client
   interactions. The game has no voice/phone simulation. Consider whether a "Discovery
   Call" task could reference this.
3. **Carrier submission**: The game has a CarrierSubmission task. This maps well to
   Harper's automated submission prep capability.
4. **The unlock moment**: The game's "Harper Hub unlocking" mechanic is a creative
   dramatization. In reality, Harper built everything on AI from day one -- there was no
   "before Harper" for their brokers. But as a game mechanic showing the contrast
   between manual and AI-assisted work, it effectively communicates the value prop.
5. **Smart Applications label**: The game calls it "Smart Applications" -- Harper's
   language is "AI-driven form auto-completion." Both work.
6. **Instant Quote Comparison**: Good match to Harper's "automated carrier and
   underwriter selection."
7. **Auto-COI**: Good match to Harper's post-bind support capabilities.
8. **Renewal Autopilot**: Good match to Harper's lifecycle coverage.
9. **Smart Follow-ups**: Good match to "integrated client communication management."

### Things we are MISSING that could strengthen accuracy:
- The pivot story (selling tools failed, becoming the broker worked) could be
  incorporated into game narrative/intro
- The E&S market framing -- the game should emphasize these are risks standard carriers
  won't touch
- The 50% application time reduction metric could appear in the game's endgame stats
- The revenue-per-hour improvement ($6 to $71) is a compelling stat for the game's
  scoring/results screen
- Voice AI capability is a differentiator not represented in the game

---

## Sources

- [YC Company Page](https://www.ycombinator.com/companies/harper)
- [YC Launch Page](https://www.ycombinator.com/launches/Mul-harper-ai-native-commercial-insurance-brokerage)
- [Optimist VC: Why We Invested in Harper](https://www.optimist.vc/why-we-invested-in-harper)
- [Lobster Capital: Why We Invested in Harper](https://lobstercap.substack.com/p/why-we-invested-in-harper)
- [Agentic Podcast Ep 6: How AI Agents Cut Insurance Costs by 90%](https://podcasts.apple.com/nz/podcast/how-ai-agents-cut-insurance-costs-by-90-agentic-ep-06/id1778509009?i=1000684287224)
- [Lobster Talks Podcast: Building the AI Insurance Giant From Scratch](https://podcasts.apple.com/us/podcast/building-the-ai-insurance-giant-from-scratch/id1733495120?i=1000716352314)
- [George Bandarian X Thread](https://x.com/georgeb/status/1879993834840752433)
- [harperinsure.com](https://www.harperinsure.com/)
- [welcome.harperinsure.com (Restaurant vertical)](https://welcome.harperinsure.com/)
- [Fondo: Harper Launches](https://www.fondo.com/blog/harper-launches)
- [PromptLoop: What Does Harper Do?](https://www.promptloop.com/directory/what-does-harperinsure-com-do)
