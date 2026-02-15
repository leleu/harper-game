# Commercial Insurance Broker Tools & Systems Landscape

Research compiled for Harper training game design. Covers the actual software products, workflows, and daily realities of commercial insurance brokers and Account Executives.

---

## 1. Agency Management Systems (AMS)

The AMS is the central nervous system of an insurance agency. Every client record, policy, document, communication log, and accounting entry lives here. Agents live in their AMS all day long.

### Top Products (by market share)

**Applied Epic** (Applied Systems)
- The dominant enterprise-grade AMS, especially for mid-to-large independent agencies
- Browser-based (cloud) application
- Interface: Navigation areas include Home (dashboard), Accounts, Locate (search), and Policies. The Home screen is a customizable "Homebase" where agents see their task queue, upcoming renewals, open activities, and pipeline
- Client records contain: contact info, all policies (current and historical), claims history, documents (attached PDFs, emails), activity notes, accounting/billing
- Steep learning curve; extensive customization of fields and workflows. New hires often need weeks of training
- Integrates with Ivans for carrier downloads, ACORD form generation, and comparative raters
- Won 7 awards in G2's Winter 2025 reports
- More expensive; suited for agencies with complex commercial books

**Vertafore AMS360**
- The other major enterprise AMS, competing directly with Applied Epic
- Cleaner, more logical layout than Epic; easier for new team members to learn basics
- Strong reporting capabilities; integrates tightly with other Vertafore products (PL Rating, Commercial Submissions)
- Suitable for startups through enterprise
- Robust accounting module
- Support includes email, phone, live support, training, and ticketing

**HawkSoft**
- Popular with small-to-mid-size agencies
- Known for exceptional ease of use and customer support
- Covers: client/policy management, document storage, e-signatures, quoting, reporting, task tracking
- Users especially love the activity notes and workflow features
- Good for agencies that handle both personal and commercial lines
- Strong ACORD form integration: pre-fills forms from stored client/policy data

**EZLynx**
- Strong for personal-lines-heavy agencies (built-in comparative rater for auto/home)
- Management system includes: embedded PL rater, commercial submission tool, marketing automation, pipeline management, client portal
- Recent enhancements combine manual entry, rating tools, and carrier portals into a single interface
- Now delivers real-time quotes for simple commercial lines (BOP, WC, GL)
- Weaker for complex commercial account management compared to Epic or AMS360

**Other Notable AMS Products:**
- **AgencyZoom** (now Vertafore): Sales and automation focused
- **NowCerts**: Cloud-based, lower cost
- **QQCatalyst** (Vertafore): Smaller agency play
- **Nexsure**: Mid-market option

### What Agents Actually Do in the AMS

1. **Start of day**: Open AMS, check dashboard for tasks, renewal alerts, follow-ups due
2. **Client lookup**: Search for a client, open their account, see all policies, open items, notes
3. **Log activity**: After every call/email, create an activity note (date-stamped, categorized)
4. **Process endorsements**: Client calls to add a vehicle or change a location; agent updates the policy record, generates change request
5. **Renewals**: AMS flags policies expiring in 60-90 days; agent reviews, re-markets if needed
6. **Generate documents**: Print ACORD forms, proposals, certificates of insurance directly from the AMS
7. **Accounting**: Premium invoicing, commission tracking, reconciliation

---

## 2. Carrier Portals & the Submission Process

This is one of the biggest pain points in commercial insurance. Each carrier has its own proprietary web portal, and agents must interact with multiple portals daily.

### The Core Problem

Agents re-enter the same client data into each carrier's portal. If marketing a commercial account to 5 carriers, the agent historically had to key in the same business name, address, operations description, payroll, revenue, loss history, etc. into 5 separate websites. Each portal has different layouts, different questions, and different workflows.

Research confirms: the most frustrating aspect of submissions for brokers is the need to rekey data into multiple applications and online portals. Every submission to a portal means re-keying all the same information, increasing opportunities for errors.

McKinsey found that 30-40% of underwriters' time is spent on administrative tasks like data entry rather than core underwriting work.

### Major Carrier Portals

**The Hartford -- Electronic Business Center (EBC)**
- Their primary agent portal for quoting, submissions, and account management
- Recently launched digital submission APIs and portal options for midsize and large accounts
- Agents can submit, quote, and sell multiple solutions (GL, auto, property, WC) through the online platform
- Offers transparency into account status in one centralized location

**Travelers**
- Major carrier with independent agent distribution
- Has its own portal for agent submissions and policy management
- Specific portal details are less publicly documented

**AIG -- myAIG Portal**
- Producer Management Portal for appointment and submission management
- Agents access myAIG for submission-related workflows
- More complex for specialty/excess lines

**Hiscox**
- Known for small commercial; has a streamlined online quoting portal
- Agents can get quick-turn quotes for smaller risks

**Other Common Carrier Portals:**
- Progressive Commercial
- Chubb
- CNA
- Liberty Mutual
- Nationwide
- Zurich
- Markel (specialty)

### How Submissions Actually Work

**Traditional Process (still common):**
1. Agent gathers client information (in-person, phone, or email)
2. Agent fills out ACORD 125 (and supplemental forms) in their AMS
3. Agent logs into Carrier A's portal, re-enters or uploads data, attaches loss runs and supplemental apps
4. Repeats for Carrier B, C, D, E
5. Waits for quotes (hours to weeks depending on complexity)
6. Tracks status via email and phone follow-ups
7. Compiles quotes for client presentation

**Digital Submission Platforms (emerging):**
- **Ivans** -- The industry's connectivity network. Ivans Download automates exchange of policy/claims information between AMS and carriers. Supports commercial lines including BOP, auto, GL, property, WC, umbrella, crime, inland marine
- **Highwing** -- Open data platform for commercial insurance. Enables brokers to digitally submit to multiple markets from a single entry point. Tracks submission status in real time. Eliminates manual tracking via email
- **Vertafore Commercial Submissions** -- Access to 25+ carriers across 5 commercial lines with pre-fill and dynamic questions
- **Tarmika** (by Applied Systems) -- Single-entry commercial quoting for 35+ carriers

### The Reality Check

Despite the digital tools, many mid-market and large commercial submissions still involve:
- Emailing a PDF ACORD application plus supplemental documents to an underwriter's inbox
- Phone calls to discuss the risk
- Back-and-forth via email for additional information (loss runs, financial statements, safety programs)
- The underwriter manually reviews and prices the risk
- Submission tracking is often a constant game of email and phone tag

---

## 3. ACORD Forms

ACORD (Association for Cooperative Operations Research and Development) creates standardized forms used across the entire insurance industry.

### What They Really Are

ACORD forms are the universal language of insurance data exchange. They are standardized documents that capture specific types of insurance information in a consistent format. There are hundreds of ACORD forms covering different lines of business and functions.

### Key Commercial Forms

**ACORD 125 -- Commercial Insurance Application**
The master application form for commercial insurance. Sections include:
- **Agency Information**: Agency name, code, National Producer Number, State Producer License
- **Applicant Information**: Business name, DBA, mailing address, contact info, FEIN
- **Business Details**: Type of entity (corporation, LLC, partnership, etc.), SIC/NAICS code, years in business, nature of operations
- **Lines of Business Requested**: Checkboxes for GL, property, auto, umbrella, BOP, WC, crime, inland marine, boiler & machinery
- **Prior Insurance**: Current/prior carriers, policy numbers, premium, expiration dates
- **Loss History**: All claims in the past 3-5 years regardless of fault -- date, type, amount paid, amount reserved
- **Business Questions**: Bankruptcy in last 5 years? Any policy declined/cancelled/non-renewed in last 3 years? Other business ventures?
- **Signature**: Producer and applicant signatures (required at binding, not quoting)

**ACORD 126 -- Commercial General Liability Section**
Supplements the 125 with GL-specific details: premises/operations, products/completed ops, classification codes, exposure bases

**ACORD 130 -- Workers Compensation Application**
Detailed payroll by class code, experience modification factor, prior WC carrier history

**ACORD 140 -- Property Section**
Building details, construction type, square footage, values, protection class, sprinkler info

**ACORD 25 -- Certificate of Liability Insurance**
Not an application but a proof-of-coverage document. Shows policy numbers, coverage limits, and effective dates. Issued to third parties who need proof the insured has coverage. Agencies issue hundreds of these daily.

**ACORD 27/28 -- Evidence of Property Insurance**
Similar to ACORD 25 but for property coverage

### Digital vs. Paper in 2025

ACORD forms exist in three formats:
1. **Printable PDFs** -- The original format. Still used for email submissions
2. **Fillable PDFs** -- Interactive fields with on-screen help, prompts, and instruction links. Can be filled, saved, emailed, printed, or faxed
3. **eForms (embedded in AMS)** -- The modern approach. The AMS auto-populates ACORD forms from stored client/policy data. Agent reviews, supplements any missing fields, and exports as PDF for submission

In practice: most agents generate ACORD forms from their AMS (pre-filled with client data), review them, then either submit digitally through a carrier portal or email the PDF to an underwriter. Pure paper forms are rare but not extinct in some niches.

---

## 4. Rating & Quoting Tools

How agents actually get and compare quotes differs dramatically between personal lines and commercial lines.

### Personal Lines Comparative Raters

These are mature, real-time tools. Enter client info once, get instant quotes from dozens of carriers side by side.

**EZLynx Rating Engine**
- Real-time quotes from 330+ carriers across 48 states
- Enter data once, see auto/home quotes from all appointed carriers
- Integrated into EZLynx AMS

**Vertafore PL Rating**
- Standardized workflow for personal lines quoting
- Pre-populates from AMS data for renewals
- "Interview-style" data entry flow

**TurboRater** (by ITC)
- Popular standalone personal lines rater
- Quick auto and home quoting

**Applied Epic Quotes**
- Integrated into Applied Epic AMS
- Pre-fills from existing client data

### Commercial Lines Quoting (The Harder Problem)

Commercial lines quoting is fundamentally different from personal lines. Commercial risks are more complex, more varied, and harder to standardize. True real-time comparative rating exists only for simple commercial (BOP, WC, simple GL).

**Tarmika** (Applied Systems)
- The leading commercial lines rater
- Single-entry solution: enter data once, get quotes from 35+ carriers
- Supports: BOP, Commercial Package, Workers' Comp, Commercial Auto, GL, Cyber, Professional Liability
- Uses API integrations with carriers for real-time or near-real-time quotes
- Biggest time-saver for small commercial accounts

**Vertafore Commercial Submissions**
- 25+ carriers, 5 commercial lines
- Pre-fill and dynamic questions eliminate duplicate entry
- Interview-style workflow

**Applied Epic Quotes -- Commercial Lines**
- Single-entry, multi-insurer comparative rating within the AMS

**CompareQuoteHQ** (IronPoint)
- Commercial rater for independent agents
- Delivers real quotes from multiple markets from a single submission

### How Quote Comparison Actually Happens

**For simple commercial (small BOP, WC):**
- Increasingly done through comparative raters (Tarmika, etc.)
- Agent sees a side-by-side comparison screen with premiums, coverages, deductibles

**For mid-market and complex commercial:**
- Still largely manual. Agent receives quote proposals from carriers (PDFs or emails), then:
  - Creates a spreadsheet (Excel/Google Sheets) comparing coverages, limits, deductibles, premiums, exclusions
  - Or uses the AMS proposal tool to build a comparison document
  - Or uses newer AI tools like Patra Quote Compare (extracts and compares with 99%+ accuracy)
- The traditional "spread sheet" (literally spreading quotes across a table for comparison) remains standard practice for complex accounts

**For large/specialty commercial:**
- Almost entirely manual. Underwriters price these individually
- Broker receives bespoke quote documents
- Comparison is a detailed, manual exercise reviewing forms, exclusions, and sub-limits

---

## 5. CRM Tools

The CRM landscape in insurance is fragmented. Many agencies rely on their AMS for basic CRM functions, while others layer a dedicated CRM on top.

### Insurance-Specific CRMs

**AgencyBloc**
- Built for life and health insurance specifically
- Commission tracking, policy management, agent assignment
- Starts at ~$109/user/month
- Closest to an all-in-one for life/health agencies

**Radiusbob**
- Focused on health/Medicare insurance sales
- Built-in Medicare plan comparison and quoting
- Email marketing, texting, phone calling built in
- Starts at ~$34/user/month

**Insureio**
- Life insurance focused
- Lead management, quoting, e-applications

**HawkSoft CRM Module**
- Built into the HawkSoft AMS
- Activity tracking, pipeline management, follow-up workflows

### General CRMs Adapted for Insurance

**Salesforce Financial Services Cloud**
- The heavyweight option. Became generally available for insurance brokerages in February 2025
- Modules for: Commissions Management, Employee Benefits Servicing, Property & Casualty Industry Servicing
- P&C module gives brokers a unified view of client property details and policy information across carriers
- Adopted by large brokerages like The Baldwin Group and AssuredPartners
- 60% of insurers are adopting new technology tools per industry data
- The challenge: insurance brokerages use 3+ systems to service clients, and Salesforce aims to unify them

**HubSpot**
- Used by some agencies for marketing automation and sales pipeline
- Free tier makes it accessible to small agencies
- Not insurance-specific, but customizable with deal pipelines and task management

**Zoho CRM**
- Affordable, customizable
- Some agencies add custom fields for policies, carriers, license dates

### The Reality

Most independent P&C agencies do NOT use a standalone CRM. Their AMS (Applied Epic, AMS360, HawkSoft) serves as a de facto CRM with client records, activity tracking, and some pipeline features. Dedicated CRMs are more common at:
- Large brokerages with enterprise sales teams
- Life/health agencies (where AgencyBloc and Radiusbob dominate)
- Agencies with heavy outbound sales/marketing operations

---

## 6. Certificate of Insurance (COI) Platforms

Certificates are a high-volume, repetitive task. Commercial clients constantly need proof of insurance for contracts, leases, permits, and vendor requirements.

### How COI Issuance Works

1. Client (or their customer/landlord/GC) requests proof of insurance
2. Agent opens the AMS, pulls up the client's policies
3. Agent generates an ACORD 25 (Certificate of Liability Insurance) from the AMS, pre-filled with policy data
4. Agent adds the certificate holder's name and address, any special requirements (additional insured, waiver of subrogation)
5. Agent reviews, signs (electronically), and sends via email or through a COI platform
6. Agencies issue hundreds of certificates daily

### COI Tracking Platforms (for certificate holders/risk managers)

These are used by the parties who REQUIRE certificates (general contractors, property managers, large companies managing vendor compliance), not typically by the issuing agents:

**myCOI**
- AI-powered COI tracking and compliance management
- Operating since 2009; 15+ years in insurance tech
- Launched "illumend" in May 2025 -- AI-powered compliance feedback and document uploads
- Used by companies to track that their vendors/subcontractors maintain required coverage

**Certificial (CERTUS)**
- Smart COI technology with real-time policy monitoring
- Catches mid-term cancellations, coverage reductions within seconds
- Only accepts submissions from verified insurance agents (prevents vendor fraud)
- Real-time tracking is the key differentiator

**TrustLayer**
- Strong for small-to-medium businesses
- Focuses on simplifying certificate verification through automation

**EvidentID**
- Insurance verification and risk management platform

**SmartCompliance**
- COI tracking and compliance automation

**Jones (GetJones)**
- COI collection and compliance

### Agent-Side COI Tools

On the agent side, COI issuance is typically handled directly within the AMS:
- Applied Epic generates ACORD 25s from policy data
- HawkSoft has built-in ACORD form generation
- Some agencies use **GravityCerts** or similar tools for self-service certificate delivery (client can request and receive certificates 24/7 without calling the agent)

---

## 7. Email & Communication Patterns

Email dominates commercial insurance communication. This is both a workflow reality and a major pain point.

### Communication Channel Breakdown

**Email: The Primary Channel (~60-70% of communication)**
- Submission documents sent to underwriters via email
- Quote proposals received via email
- Client correspondence (policy questions, certificate requests, endorsement requests)
- Internal team communication
- Follow-ups on open submissions
- Loss run requests
- Renewal marketing

**Phone: Still Essential (~20-25%)**
- Complex risk discussions with underwriters
- Client relationship building and consultative selling
- Claim reporting and follow-up
- Quoting over the phone (some agents prefer this because they get a yes/no on the spot, saving follow-up time)
- Morning voicemail review is a universal daily ritual

**Carrier Portals (~5-10%)**
- Submission entry (when not emailing)
- Policy checking, endorsement requests
- Commission statements
- Download retrieval

**Text/Chat (Growing but still small)**
- Clients increasingly prefer text or email over phone
- Some agencies use texting platforms for quick client communications
- Not standard for carrier communication

### Daily Communication Rhythm

Based on research into producer daily schedules:
- **Early morning**: Review voicemails and emails (30 minutes). Some agents check email only 3x/day (10am, 1pm, 4pm) to avoid constant interruption
- **Mid-morning**: Outbound calls to prospects, clients, and underwriters
- **Midday**: Administrative work, submissions, renewals
- **Afternoon**: Client meetings, follow-up calls, preparing next-day activities
- **End of day**: Final email check, update AMS activity logs

### Key Pain Point

Submission tracking across carriers is described as "a constant game of email and phone tag." There is no universal status-tracking system. Agents must individually follow up with each underwriter via email or phone to learn where their submission stands.

---

## 8. Comparative Raters -- Deep Dive

Comparative raters are the "magic tool" that saves agents from visiting individual carrier websites one by one. They are much more mature for personal lines than commercial.

### How They Work (Personal Lines)

1. Agent enters client data once into the rater (or it pre-fills from the AMS)
2. The rater sends the data simultaneously to all the agent's appointed carriers via APIs or carrier rating connections
3. Within seconds, real-time quotes appear side-by-side
4. Agent sees: carrier name, premium, coverage limits, deductibles -- all in a comparison grid
5. Agent selects the best option and can often bind directly from the rater

**Key PL Raters:**
- EZLynx Rating Engine (330+ carriers, 48 states)
- Vertafore PL Rating
- TurboRater (ITC)
- Applied Epic Quotes

### How They Work (Commercial Lines)

Commercial comparative rating is newer and limited to simpler risks:

1. Agent enters business information into the commercial rater (or it pre-fills from AMS)
2. The rater uses API connections to submit to multiple carriers simultaneously
3. For simple risks (small BOP, WC, simple GL), quotes return in minutes
4. For more complex risks, the submission is sent but quotes may take hours or days
5. Agent sees returned quotes in a comparison view

**Key Commercial Raters:**
- **Tarmika**: 35+ carriers. Supports BOP, Commercial Package, WC, Commercial Auto, GL, Cyber, Professional Liability. The most widely adopted commercial rater
- **Vertafore Commercial Submissions**: 25+ carriers, 5 commercial lines. Interview-style workflow with dynamic questions
- **EZLynx Commercial**: Real-time quotes for BOP, WC, GL
- **CompareQuoteHQ (IronPoint)**: Multi-market commercial quoting

### What Comparative Raters Cannot Do

- Complex commercial risks (large property schedules, excess/umbrella, specialty lines) cannot be quoted through raters
- Manuscript policies and highly customized coverages require manual underwriting
- Large accounts with complex loss histories need human underwriter review
- The rater only works with carriers the agent is appointed with

### The SEMCI Concept

SEMCI = Single Entry, Multiple Company Interface. This is the industry term for the core comparative rater value proposition: enter data once, send to many carriers. It is the holy grail of insurance technology, fully realized for personal lines but still evolving for commercial.

---

## Summary: The Agent's Daily Tech Stack

A typical commercial insurance agent/AE interacts with these systems daily:

| System | Product Examples | Time Spent |
|--------|-----------------|------------|
| AMS (home base) | Applied Epic, AMS360, HawkSoft | 40-50% of day |
| Email | Outlook, Gmail | 20-30% of day |
| Carrier portals | Hartford EBC, Travelers, AIG myAIG | 10-15% of day |
| Phone/voicemail | Desk phone, softphone | 10-15% of day |
| Rater/quoting tools | Tarmika, EZLynx, PL Rating | 5-10% of day |
| COI generation | AMS-built-in, GravityCerts | As needed |
| CRM (if separate) | Salesforce, HubSpot | Varies |
| ACORD form tools | AMS-generated or fillable PDFs | Part of AMS time |

### Key Takeaways for Game Design

1. **The AMS is everything.** Any realistic training simulation must center on an AMS-like interface. Client records, policy details, activity notes, task queues -- this is where agents live
2. **Data re-entry is the universal pain.** The submission process of re-entering data across carrier portals is the #1 inefficiency. A game that simulates this teaches the real frustration
3. **ACORD forms are the common language.** Even with digital tools, the ACORD 125 fields define what information matters for commercial insurance
4. **Quote comparison for commercial is manual.** Unlike personal lines, commercial brokers still build spreadsheet comparisons for anything beyond simple small business
5. **Email is the connective tissue.** An enormous amount of commercial insurance workflow happens through email -- submissions, follow-ups, quote delivery, certificate requests
6. **Certificates are high-volume grunt work.** COI issuance is repetitive, but errors have real consequences (coverage gaps, contract non-compliance)
7. **The tech is fragmented.** Agents juggle 5-10 different systems daily. There is no single unified platform

---

## Sources

- [Brightway AMS Guide 2025](https://www.brightway.com/news/best-agency-management-systems-ams-platforms-for-insurance-agencies-2025)
- [Applied Epic - Applied Systems](https://www1.appliedsystems.com/en-us/solutions/for-agents/agency-management-system/applied-epic/)
- [Applied Epic Reviews - Software Advice](https://www.softwareadvice.com/insurance/applied-epic-profile/)
- [Applied Epic Reviews - SelectHub](https://www.selecthub.com/p/insurance-agency-management-systems/applied-epic/)
- [AMS360 vs Applied Epic - SelectHub](https://www.selecthub.com/insurance-agency-management-systems/ams360-vs-applied-epic/)
- [EZLynx Management System](https://www.ezlynx.com/products/management-system/)
- [EZLynx AI and Commercial Tools - IIReporter](https://iireporter.com/ezlynx-adds-ai-and-commercial-tools-to-agency-management-system/)
- [HawkSoft ACORD Forms](https://www.hawksoft.com/agency-management-system/tour/acord-forms.html)
- [Hartford Digital Submission Capabilities - ProgramBusiness](https://programbusiness.com/news/hartford-launches-new-digital-agency-submission-capabilities-for-midsize-and-large-accounts/)
- [Ivans Download for Agents](https://www.ivans.com/for-agents/products/ivans-download/)
- [4 Pain Points of Commercial Submissions - Ivans Blog](https://blog.ivansinsurance.com/posts/2021/how-to-solve-4-pain-points-commercial-submissions)
- [Submissions Simplified - Highwing](https://www.highwing.io/insights/submissions-simplified)
- [5 Critical Pain Points - Patra](https://www.patracorp.com/resources/blogs/5-critical-pain-points-crushing-insurance-process/)
- [ACORD Forms](https://www.acord.org/forms-pages/acord-forms)
- [How to Complete ACORD 125 - TotalCSR](https://totalcsr.com/insurance-agency-blog/how-to-complete-the-acord-125/)
- [ACORD 125 Explained - Infrrd](https://www.infrrd.ai/blog/acord-125)
- [How to Complete ACORD 25 - TotalCSR](https://totalcsr.com/insurance-agency-blog/how-to-complete-the-acord-25-certificate-of-liability/)
- [Tarmika Commercial Quoting](https://www.tarmika.com/)
- [Tarmika Services](https://www.tarmika.com/services/)
- [Vertafore PL Rating](https://www.vertafore.com/products/insurance-comparative-rater/pl-rating)
- [Vertafore Commercial Submissions](https://www.vertafore.com/products/commercial-rater/commercial-submissions)
- [EZLynx Rating Engine](https://www.ezlynx.com/products/rating-engine/)
- [Patra AI Quote Comparison](https://www.patracorp.com/insurance-outsourcing-services/insurance-quote-comparison/)
- [Best Insurance CRM Software - CRM.org](https://crm.org/crmland/best-insurance-crm)
- [Salesforce Financial Services Cloud for Insurance Brokerages](https://www.salesforce.com/financial-services/insurance-brokerage-management-software/)
- [Salesforce FSC for Insurance Brokerages Announcement](https://www.salesforce.com/news/stories/financial-services-cloud-for-insurance-brokerages/)
- [myCOI Tracking Software](https://mycoitracking.com/)
- [Certificial COI Platform](https://www.certificial.com/)
- [Best COI Tracking Software 2025 - BCS](https://www.getbcs.com/blog/best-coi-tracking-software-in-2025-bcs-vs.-mycoi-getjones-trustlayer-smartcompliance)
- [ASNOA Independent Agent Toolkit](https://asnoa.com/2025/the-independent-agents-toolkit-must-have-platforms-for-modern-insurance-agencies/)
- [Insurance Agent Daily Routine - Insurance Forums](https://www.insurance-forums.com/community/threads/daily-routine-for-insurance-agent.20971/)
- [Producer Daily Activity Schedule - Agency Performance Partners](https://www.agencyperformancepartners.com/blog/a-winning-formula-insurance-producer-daily-activity-schedule/)
- [Carrier Submission Management Guide - Catalyit](https://catalyit.com/guides/carrier-submission-mgmt)
