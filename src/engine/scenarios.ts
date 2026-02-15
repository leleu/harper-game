export interface ClientScenario {
  clientName: string
  businessName: string
  industry: string
  ein: string
  revenue: string
  employees: string
  sicCode: string
  address: string
  coverageNeeds: string[]
  // Quote comparison data
  quotes?: QuoteOption[]
  // Discovery call data
  discoveryQuestion?: string
  discoveryOptions?: { label: string; correct: boolean; explanation: string }[]
  // Proposal data
  proposalPriority?: string
  proposalOptions?: { label: string; correct: boolean }[]
  // COI data
  coiHolder?: string
  coiEmail?: string
  // Follow-up context
  followUpContext?: string
  // Renewal flags
  renewalGap?: string
}

export interface QuoteOption {
  carrier: string
  premium: string
  premiumAnnual: number
  deductible: string
  coverageLimit: string
  isBest: boolean
}

export const scenarios: ClientScenario[] = [
  {
    clientName: 'Maya Chen',
    businessName: 'NeuralPath AI',
    industry: 'AI Startup',
    ein: '47-2839156',
    revenue: '$2.4M',
    employees: '12',
    sicCode: '7372',
    address: '401 Congress Ave, Austin TX 78701',
    coverageNeeds: ['GL', 'E&O', 'Cyber', 'D&O'],
    quotes: [
      { carrier: 'Hiscox', premium: '$2,100/mo', premiumAnnual: 25200, deductible: '$5,000', coverageLimit: '$2M', isBest: false },
      { carrier: 'Hartford', premium: '$24,000/yr', premiumAnnual: 24000, deductible: '$2,500', coverageLimit: '$2M', isBest: true },
      { carrier: 'Chubb', premium: '$2,450/mo', premiumAnnual: 29400, deductible: '$10,000', coverageLimit: '$5M', isBest: false },
      { carrier: 'AIG', premium: '$2.2K/mo', premiumAnnual: 26400, deductible: '$5,000', coverageLimit: '$2M', isBest: false },
    ],
    discoveryQuestion: 'Maya runs an AI startup. What specialty coverage does she need?',
    discoveryOptions: [
      { label: 'E&O with no AI exclusions', correct: true, explanation: 'Tech E&O without AI exclusions is critical — most carriers exclude AI-related claims.' },
      { label: 'Product Liability', correct: false, explanation: 'Product Liability covers physical products, not software services.' },
      { label: 'Marine Cargo', correct: false, explanation: 'Marine Cargo covers goods in transit — not relevant here.' },
    ],
    proposalPriority: 'speed',
    proposalOptions: [
      { label: 'Fastest binding — Hartford, $24K/yr, binds today', correct: true },
      { label: 'Cheapest — negotiate Hiscox down 10%', correct: false },
      { label: 'Highest limits — Chubb $5M, $29.4K/yr', correct: false },
    ],
    coiHolder: 'Sequoia Capital',
    coiEmail: 'legal@sequoiacap.com',
    followUpContext: 'Waiting on loss runs from prior carrier',
    renewalGap: 'Cyber policy missing ransomware rider',
  },
  {
    clientName: 'James Torres',
    businessName: 'Sunshine Kids Daycare',
    industry: 'Daycare',
    ein: '84-3927561',
    revenue: '$680K',
    employees: '8',
    sicCode: '8351',
    address: '1523 Pearl St, Denver CO 80202',
    coverageNeeds: ['GL', 'Property', 'WC', 'Abuse & Molestation'],
    discoveryQuestion: 'James runs a daycare center. What specialty coverage is essential?',
    discoveryOptions: [
      { label: 'Abuse & Molestation liability', correct: true, explanation: 'A&M coverage is required for all childcare operations — standard GL excludes it.' },
      { label: 'Garage Keepers insurance', correct: false, explanation: 'Garage Keepers covers vehicles in your custody — for auto businesses.' },
      { label: 'Inland Marine', correct: false, explanation: 'Inland Marine covers equipment in transit — not the primary need here.' },
    ],
    coiHolder: 'Denver Public Schools',
    coiEmail: 'vendors@dps.org',
    followUpContext: 'Need employee headcount verification',
    renewalGap: 'Property coverage missing flood endorsement',
  },
  {
    clientName: 'Sarah Kim',
    businessName: 'Emerald Leaf Dispensary',
    industry: 'Cannabis',
    ein: '93-1847265',
    revenue: '$1.8M',
    employees: '15',
    sicCode: '5912',
    address: '2847 NW Thurman St, Portland OR 97210',
    coverageNeeds: ['GL', 'Property', 'Product Liability', 'Crop'],
    discoveryQuestion: 'Sarah runs a cannabis dispensary. What makes placement unique?',
    discoveryOptions: [
      { label: 'Surplus lines — most admitted carriers exclude cannabis', correct: true, explanation: 'Cannabis is federally illegal, so most standard carriers won\'t touch it. Surplus lines markets are required.' },
      { label: 'Standard BOP covers it', correct: false, explanation: 'Standard BOPs explicitly exclude cannabis operations.' },
      { label: 'D&O insurance', correct: false, explanation: 'D&O protects directors — not the primary concern for a dispensary.' },
    ],
    coiHolder: 'Oregon Cannabis Commission',
    coiEmail: 'compliance@occ.state.or.us',
    followUpContext: 'Carrier requesting product testing certifications',
  },
  {
    clientName: 'Marcus Brown',
    businessName: 'Brown\'s Towing & Recovery',
    industry: 'Tow Truck',
    ein: '58-6193724',
    revenue: '$1.2M',
    employees: '22',
    sicCode: '7549',
    address: '890 Peachtree Industrial, Atlanta GA 30341',
    coverageNeeds: ['Commercial Auto', 'GL', 'WC', 'Garage Keepers'],
    discoveryQuestion: 'Marcus operates a tow truck company. What coverage protects vehicles in his custody?',
    discoveryOptions: [
      { label: 'Garage Keepers liability', correct: true, explanation: 'Garage Keepers covers damage to customers\' vehicles while in your care, custody, or control.' },
      { label: 'Inland Marine', correct: false, explanation: 'Inland Marine covers YOUR equipment in transit, not customers\' vehicles.' },
      { label: 'Umbrella policy', correct: false, explanation: 'Umbrella adds limits but doesn\'t create coverage that doesn\'t exist in underlying policies.' },
    ],
    coiHolder: 'City of Atlanta',
    coiEmail: 'procurement@atlantaga.gov',
    followUpContext: 'Fleet schedule needs updating — added 3 trucks',
  },
  {
    clientName: 'Priya Patel',
    businessName: 'AeroPrecision Manufacturing',
    industry: 'Aerospace',
    ein: '48-7291563',
    revenue: '$12M',
    employees: '85',
    sicCode: '3728',
    address: '4500 S Oliver St, Wichita KS 67210',
    coverageNeeds: ['GL', 'Product Liability', 'Aviation', 'WC', 'Cyber'],
    quotes: [
      { carrier: 'AIG', premium: '$8,200/mo', premiumAnnual: 98400, deductible: '$25,000', coverageLimit: '$10M', isBest: true },
      { carrier: 'Zurich', premium: '$102K/yr', premiumAnnual: 102000, deductible: '$50,000', coverageLimit: '$10M', isBest: false },
      { carrier: 'Chubb', premium: '$9.1K/mo', premiumAnnual: 109200, deductible: '$25,000', coverageLimit: '$15M', isBest: false },
    ],
    proposalPriority: 'coverage-breadth',
    proposalOptions: [
      { label: 'Broadest coverage — Chubb $15M limits', correct: true },
      { label: 'Cheapest — AIG $98.4K/yr', correct: false },
      { label: 'Lowest deductible — negotiate Zurich down', correct: false },
    ],
    coiHolder: 'Boeing Supplier Portal',
    coiEmail: 'suppliers@boeing.com',
    followUpContext: 'Waiting on FAA compliance documentation',
    renewalGap: 'Aviation liability sublimit too low for new contract',
  },
  {
    clientName: 'David Liu',
    businessName: 'Golden Dragon Restaurant Group',
    industry: 'Restaurant Group',
    ein: '36-8274159',
    revenue: '$4.2M',
    employees: '60',
    sicCode: '5812',
    address: '1 N State St, Chicago IL 60602',
    coverageNeeds: ['BOP x3', 'Liquor Liability', 'WC', 'EPLI', 'Umbrella'],
    quotes: [
      { carrier: 'Hartford', premium: '$3,800/mo', premiumAnnual: 45600, deductible: '$5,000', coverageLimit: '$3M', isBest: true },
      { carrier: 'Progressive', premium: '$48K/yr', premiumAnnual: 48000, deductible: '$10,000', coverageLimit: '$3M', isBest: false },
      { carrier: 'Travelers', premium: '$4.3K/mo', premiumAnnual: 51600, deductible: '$5,000', coverageLimit: '$5M', isBest: false },
    ],
    coiHolder: 'Chicago Department of Business Affairs',
    coiEmail: 'licenses@chicago.gov',
    followUpContext: 'Third location lease requires additional insured',
    renewalGap: 'EPLI missing for location #3',
  },
  {
    clientName: 'Rachel Adams',
    businessName: 'Adams Consulting Partners',
    industry: 'Consulting',
    ein: '13-5928471',
    revenue: '$3.8M',
    employees: '30',
    sicCode: '7389',
    address: '350 5th Ave, New York NY 10118',
    coverageNeeds: ['E&O', 'Cyber', 'D&O', 'EPLI'],
    quotes: [
      { carrier: 'Hiscox', premium: '$1,800/mo', premiumAnnual: 21600, deductible: '$2,500', coverageLimit: '$2M', isBest: true },
      { carrier: 'CNA', premium: '$23.5K/yr', premiumAnnual: 23500, deductible: '$5,000', coverageLimit: '$2M', isBest: false },
      { carrier: 'Beazley', premium: '$2.1K/mo', premiumAnnual: 25200, deductible: '$5,000', coverageLimit: '$3M', isBest: false },
    ],
    coiHolder: 'JPMorgan Chase',
    coiEmail: 'vendorrisk@jpmc.com',
    followUpContext: 'Client expanding to EU — needs GDPR coverage confirmation',
  },
  {
    clientName: 'Omar Hassan',
    businessName: 'Hassan General Contracting',
    industry: 'Construction',
    ein: '86-4715293',
    revenue: '$8.5M',
    employees: '45',
    sicCode: '1522',
    address: '3200 E Camelback Rd, Phoenix AZ 85018',
    coverageNeeds: ['GL', 'WC', 'Builders Risk', 'Commercial Auto', 'Umbrella', 'Inland Marine'],
    quotes: [
      { carrier: 'Travelers', premium: '$6,100/mo', premiumAnnual: 73200, deductible: '$10,000', coverageLimit: '$5M', isBest: false },
      { carrier: 'Liberty Mutual', premium: '$68K/yr', premiumAnnual: 68000, deductible: '$10,000', coverageLimit: '$5M', isBest: true },
      { carrier: 'Zurich', premium: '$6.5K/mo', premiumAnnual: 78000, deductible: '$25,000', coverageLimit: '$10M', isBest: false },
    ],
    proposalPriority: 'value',
    proposalOptions: [
      { label: 'Best value — Liberty Mutual, $68K, strong WC program', correct: true },
      { label: 'Highest limits — Zurich $10M', correct: false },
      { label: 'Lowest monthly — Travelers $6.1K/mo', correct: false },
    ],
    coiHolder: 'Arizona DOT',
    coiEmail: 'contractors@azdot.gov',
    followUpContext: 'New project requires Builders Risk for $2M structure',
    renewalGap: 'Inland Marine schedule missing new excavator',
  },
  {
    clientName: 'Lisa Park',
    businessName: 'Park Veterinary Clinic',
    industry: 'Veterinary',
    ein: '72-5183946',
    revenue: '$920K',
    employees: '11',
    sicCode: '0742',
    address: '815 SE Hawthorne Blvd, Portland OR 97214',
    coverageNeeds: ['GL', 'Professional Liability', 'Property', 'WC'],
    coiHolder: 'Hawthorne Plaza LLC',
    coiEmail: 'leasing@hawthorneplaza.com',
    followUpContext: 'Adding boarding services — needs coverage amendment',
  },
  {
    clientName: 'Robert Graves',
    businessName: 'Graves Security Solutions',
    industry: 'Armed Security',
    ein: '61-8392745',
    revenue: '$3.1M',
    employees: '38',
    sicCode: '7382',
    address: '2600 Travis St, Houston TX 77006',
    coverageNeeds: ['GL', 'Professional Liability', 'WC', 'Commercial Auto', 'Umbrella'],
    discoveryQuestion: 'Robert\'s company provides armed security. What\'s the critical coverage concern?',
    discoveryOptions: [
      { label: 'Use-of-force liability with trained personnel requirements', correct: true, explanation: 'Armed security carries extreme liability. Carriers require documented training programs and often have per-incident sublimits.' },
      { label: 'Cyber Liability', correct: false, explanation: 'Cyber is secondary — the primary risk is bodily injury from armed operations.' },
      { label: 'Product Liability', correct: false, explanation: 'Security firms provide services, not products.' },
    ],
    coiHolder: 'Marathon Oil Corporation',
    coiEmail: 'facilities@marathonoil.com',
    followUpContext: 'New contract requires $5M umbrella — currently at $3M',
  },
  {
    clientName: 'Elena Vasquez',
    businessName: 'Vasquez Trucking LLC',
    industry: 'Freight/Trucking',
    ein: '45-6729183',
    revenue: '$5.6M',
    employees: '28',
    sicCode: '4213',
    address: '1900 S Industrial Blvd, Dallas TX 75207',
    coverageNeeds: ['Commercial Auto', 'GL', 'Cargo', 'WC'],
    quotes: [
      { carrier: 'Progressive', premium: '$4,500/mo', premiumAnnual: 54000, deductible: '$5,000', coverageLimit: '$3M', isBest: true },
      { carrier: 'GEICO Commercial', premium: '$58K/yr', premiumAnnual: 58000, deductible: '$10,000', coverageLimit: '$3M', isBest: false },
      { carrier: 'National General', premium: '$5.2K/mo', premiumAnnual: 62400, deductible: '$5,000', coverageLimit: '$5M', isBest: false },
    ],
    coiHolder: 'Amazon Freight Partners',
    coiEmail: 'carrier-compliance@amazon.com',
    followUpContext: 'DOT audit coming — needs current fleet schedule',
  },
  {
    clientName: 'Michael Chen',
    businessName: 'Skyline Drone Services',
    industry: 'Drone Operations',
    ein: '33-9184726',
    revenue: '$780K',
    employees: '6',
    sicCode: '4581',
    address: '100 Aerospace Blvd, Huntsville AL 35801',
    coverageNeeds: ['Aviation/Drone Liability', 'GL', 'E&O', 'Inland Marine'],
    discoveryQuestion: 'Michael operates commercial drones. What specialized coverage is needed?',
    discoveryOptions: [
      { label: 'Aviation liability with drone-specific endorsements', correct: true, explanation: 'Standard GL excludes aircraft. Drone operators need aviation liability policies with specific hull and liability coverage.' },
      { label: 'Standard General Liability', correct: false, explanation: 'Standard GL has an aircraft exclusion — drones are classified as aircraft by the FAA.' },
      { label: 'Workers Compensation only', correct: false, explanation: 'WC covers employees but not third-party property damage from drone operations.' },
    ],
    coiHolder: 'Alabama Power',
    coiEmail: 'procurement@alabamapower.com',
    followUpContext: 'FAA Part 107 waiver documentation needed',
  },
  {
    clientName: 'Angela Martinez',
    businessName: 'Martinez Family Dental',
    industry: 'Dental Practice',
    ein: '76-2918354',
    revenue: '$1.5M',
    employees: '14',
    sicCode: '8021',
    address: '4420 N Central Ave, Phoenix AZ 85012',
    coverageNeeds: ['Professional Liability', 'GL', 'Property', 'Cyber', 'WC'],
    coiHolder: 'Delta Dental Network',
    coiEmail: 'credentialing@deltadental.com',
    followUpContext: 'Adding second dentist — malpractice update needed',
    renewalGap: 'Cyber policy doesn\'t cover patient data breach notification costs',
  },
  {
    clientName: 'Kevin Wright',
    businessName: 'Wright Craft Brewery',
    industry: 'Brewery',
    ein: '52-7384916',
    revenue: '$2.1M',
    employees: '18',
    sicCode: '2082',
    address: '1635 Platte St, Denver CO 80202',
    coverageNeeds: ['GL', 'Property', 'Product Liability', 'Liquor Liability', 'WC'],
    coiHolder: 'Denver Arts District',
    coiEmail: 'events@denverarts.org',
    followUpContext: 'Taproom expansion — needs property coverage update',
    renewalGap: 'Product recall coverage missing',
  },
  {
    clientName: 'Diane Foster',
    businessName: 'Foster Home Health',
    industry: 'Home Health Care',
    ein: '64-8271593',
    revenue: '$3.4M',
    employees: '52',
    sicCode: '8082',
    address: '500 N Michigan Ave, Chicago IL 60611',
    coverageNeeds: ['Professional Liability', 'GL', 'WC', 'Commercial Auto', 'EPLI'],
    discoveryQuestion: 'Diane\'s company sends caregivers to patients\' homes. What\'s the key liability concern?',
    discoveryOptions: [
      { label: 'Professional liability for care in uncontrolled environments', correct: true, explanation: 'Home health workers operate without facility supervision. Professional liability must cover in-home care decisions and medication management.' },
      { label: 'Property insurance for the office', correct: false, explanation: 'Office property is standard — the unique risk is liability in patients\' homes.' },
      { label: 'Garage Keepers', correct: false, explanation: 'Garage Keepers is for auto businesses, not healthcare.' },
    ],
    coiHolder: 'Medicare/Medicaid Services',
    coiEmail: 'enrollment@cms.gov',
    followUpContext: 'State licensing renewal requires updated proof of coverage',
  },
  {
    clientName: 'Tony Russo',
    businessName: 'Russo Marine Services',
    industry: 'Marine/Boat Repair',
    ein: '59-3847216',
    revenue: '$1.9M',
    employees: '16',
    sicCode: '3732',
    address: '42 Marina Blvd, San Diego CA 92101',
    coverageNeeds: ['GL', 'Marine Liability', 'Property', 'WC', 'Inland Marine'],
    coiHolder: 'San Diego Unified Port District',
    coiEmail: 'tenants@portofsandiego.org',
    followUpContext: 'New boat lift installation needs equipment coverage',
  },
  {
    clientName: 'Jennifer Walsh',
    businessName: 'Walsh Event Productions',
    industry: 'Event Planning',
    ein: '41-6829375',
    revenue: '$1.1M',
    employees: '7',
    sicCode: '7999',
    address: '800 Convention Center Blvd, New Orleans LA 70130',
    coverageNeeds: ['GL', 'Professional Liability', 'Event Cancellation', 'Equipment'],
    coiHolder: 'Morial Convention Center',
    coiEmail: 'events@mccno.com',
    followUpContext: 'Large wedding — needs event-specific policy',
  },
  {
    clientName: 'Andre Williams',
    businessName: 'Williams Auto Body',
    industry: 'Auto Body Shop',
    ein: '68-4917283',
    revenue: '$890K',
    employees: '9',
    sicCode: '7532',
    address: '3300 MLK Jr Blvd, Oakland CA 94609',
    coverageNeeds: ['GL', 'Garage Keepers', 'Property', 'WC', 'Commercial Auto'],
    discoveryQuestion: 'Andre runs an auto body shop. What protects the customers\' cars while being repaired?',
    discoveryOptions: [
      { label: 'Garage Keepers liability', correct: true, explanation: 'Garage Keepers specifically covers damage to customers\' vehicles while in your care, custody, or control for service.' },
      { label: 'Commercial Auto', correct: false, explanation: 'Commercial Auto covers YOUR business vehicles, not customers\' vehicles in your shop.' },
      { label: 'General Liability', correct: false, explanation: 'GL covers third-party injury/property damage but typically excludes vehicles in your care.' },
    ],
    coiHolder: 'State Farm Insurance (DRP)',
    coiEmail: 'drp-compliance@statefarm.com',
    followUpContext: 'Adding paint booth — fire suppression cert needed',
  },
  {
    clientName: 'Samantha Reed',
    businessName: 'Reed Physical Therapy',
    industry: 'Physical Therapy',
    ein: '73-5182946',
    revenue: '$1.3M',
    employees: '10',
    sicCode: '8049',
    address: '2200 Westlake Ave, Seattle WA 98121',
    coverageNeeds: ['Professional Liability', 'GL', 'Property', 'WC'],
    coiHolder: 'Swedish Medical Center',
    coiEmail: 'credentialing@swedish.org',
    followUpContext: 'New therapist starting — needs individual professional liability',
  },
  {
    clientName: 'Carlos Mendez',
    businessName: 'Mendez Landscaping',
    industry: 'Landscaping',
    ein: '87-2946183',
    revenue: '$650K',
    employees: '13',
    sicCode: '0782',
    address: '9100 S Eastern Ave, Las Vegas NV 89123',
    coverageNeeds: ['GL', 'Commercial Auto', 'WC', 'Inland Marine'],
    coiHolder: 'MGM Resorts International',
    coiEmail: 'vendors@mgmresorts.com',
    followUpContext: 'Seasonal crew increase — WC payroll audit adjustment',
  },
]

let scenarioIndex = 0

export function getNextScenario(): ClientScenario {
  const scenario = scenarios[scenarioIndex % scenarios.length]
  scenarioIndex++
  return scenario
}

export function resetScenarioIndex() {
  scenarioIndex = 0
}
