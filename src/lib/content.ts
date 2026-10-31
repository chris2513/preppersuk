export const SUPPORT_FALLBACK = 'support@your-domain.co.uk';

export const modules = [
	{ n: '01', t: 'Official Guidance vs. Reality', d: 'The UK "Be Ready" 72-hour checklist, what it leaves out, and real UK precedents.' },
	{ n: '02', t: 'Water Security & Filtration', d: 'Storage, hidden safe sources in your home and a 2-stage filtration method.' },
	{ n: '03', t: 'The "Quiet Pantry" Food System', d: '14 days of normal supermarket food, low-fuel rations and the freezer drill.' },
	{ n: '04', t: 'Power Cuts, Heating & Safe Cooking', d: 'The gas boiler trap, lighting, stoves and carbon monoxide safety.' },
	{ n: '05', t: 'Comms, Power & Cash', d: 'Mobile mast failure, Digital Voice landlines, power banks and cash on hand.' },
	{ n: '06', t: 'Medical, Hygiene & Household', d: 'First aid, babies, pets and the off-grid emergency toilet protocol.' },
	{ n: '07', t: 'Home Infrastructure & Grab Bags', d: 'Know your shut-offs, shelter vs. evacuate, the 72-hour grab bag.' },
	{ n: '08', t: 'Step-by-Step Implementation', d: 'The 4-week "zero-overwhelm" budget action plan: £12–£15 a week.' }
];

export const drills = [
	{ n: '01', t: 'The 15-Minute Pre-Crisis Home Audit', preview: false },
	{ n: '02', t: 'Sudden Mains Water Loss or Power Cut', preview: true },
	{ n: '03', t: 'The Fridge & Freezer Blackout Protocol', preview: false },
	{ n: '04', t: 'Sudden Winter Blackout & Heating Loss', preview: true },
	{ n: '05', t: 'Communications & Digital Blackout Protocol', preview: false },
	{ n: '06', t: 'The "Twin-Liner" Off-Grid Toilet Drill', preview: false },
	{ n: '07', t: '5-Minute Emergency Home Evacuation', preview: false }
];

export const compare = [
	{
		topic: 'Gas boiler & heating',
		gov: 'Not covered in detail',
		hb: 'Why most gas combi boilers stop the moment electricity does, and how to stay warm safely'
	},
	{
		topic: 'Toilets when water stops',
		gov: 'Store drinking water',
		hb: 'The unflushable-toilet crisis and the "Twin-Liner" drill, without wasting drinking water'
	},
	{
		topic: 'Phones & communications',
		gov: 'Battery radio and power bank',
		hb: 'Mobile masts and Digital Voice landlines can fail fast in a regional power cut: offline contact plan'
	},
	{
		topic: 'Food',
		gov: '3 days of ready-to-eat food',
		hb: 'The "Quiet Pantry": 14 days of normal food, rotated so nothing is wasted'
	},
	{
		topic: 'Water',
		gov: 'Bottled water for 3 days',
		hb: 'Hidden safe vs. unsafe water sources in a British home plus 2-stage filtration'
	}
];

export const faqs = [
	{
		q: 'What is on the official UK government "Be Ready" checklist?',
		a: 'The Cabinet Office guidance at beready.campaign.gov.uk encourages households to prepare for at least 72 hours of disruption: a battery or wind-up radio, torch and spare batteries, power banks, bottled water, ready-to-eat food, a basic first aid kit, key medication, copies of important documents and a household emergency plan. Beyond 72 Hours turns that list into drills, quantities and a staged plan for up to 14 days.'
	},
	{
		q: 'Do gas boilers work in a power cut in the UK?',
		a: 'In almost all cases, no. Modern gas combi and system boilers rely on mains electricity for the fan, pump, ignition and controls, so heating and hot water stop when the power does. The handbook covers how to stay warm and cook safely, including carbon monoxide rules.'
	},
	{
		q: 'How much water should I store per person in the UK?',
		a: 'A common planning figure is at least 3 litres per person per day for drinking and basic hygiene, with more for children, pregnancy, hot weather or medical needs. For 14 days that is around 42 litres each. Module 02 explains storage, rotation and filtering sources so you do not need to store it all.'
	},
	{
		q: 'How can I prepare on a tight budget in a small flat?',
		a: 'The 4-week action plan is designed around £12–£15 a week added to your normal Aldi or Tesco shop, using flat-friendly storage ideas. No bunker, no specialist gear, no panic buying.'
	},
	{
		q: 'How do I receive the PDF after paying?',
		a: 'Instantly. After Stripe Checkout you land on a confirmation page with one-click download of the PDF handbook. A backup download link is also emailed to you.'
	},
	{
		q: 'Is there a refund policy?',
		a: 'Yes. See our Terms of Sale for the digital product refund policy. If something is wrong with your file, contact us and we will fix it quickly.'
	}
];

export const includes = [
	'20-page A4 PDF field manual (8 modules)',
	'7 Immediate Action Drills (IADs)',
	'Printable Master Household Audit checklist',
	'Tear-out Cupboard Emergency Reference Sheet',
	'Fill-in Family Emergency Plan',
	'4-week £12–£15/wk budget action plan'
];

export const budgetWeeks = [
	{ w: 'Week 1', t: 'Water & the 15-minute home audit', c: '£12' },
	{ w: 'Week 2', t: 'Quiet Pantry basics & low-fuel food', c: '£14' },
	{ w: 'Week 3', t: 'Light, warmth, power banks & radio', c: '£15' },
	{ w: 'Week 4', t: 'Hygiene, first aid, grab bag & plan', c: '£13' }
];

export type GuideBlock = { h?: string; html: string };
export type Guide = {
	slug: string;
	title: string;
	description: string;
	h1: string;
	published: string;
	updated: string;
	readMins: number;
	blocks: GuideBlock[];
};

export const guides: Guide[] = [
	{
		slug: 'uk-government-be-ready-72-hour-checklist-explained',
		title: 'UK Government 72-Hour "Be Ready" Checklist Explained (And What It Leaves Out)',
		h1: 'The Official UK Government 72-Hour "Be Ready" Checklist Explained (And What It Leaves Out)',
		description:
			'What is on the UK government 72-hour emergency checklist, how to build it on a budget, and the gaps that matter when disruption lasts longer than three days.',
		published: '2026-10-01',
		updated: '2026-10-31',
		readMins: 7,
		blocks: [
			{
				html: `<p>The UK government's <strong>"Be Ready"</strong> preparedness advice asks households to be able to cope for around <strong>72 hours</strong> without normal services. It is sensible, calm advice and a great starting line. But three days is a <em>planning baseline</em>, not a promise that help will arrive on day four.</p>
<div class="callout-amber"><strong>Prepared, not panicked.</strong> You do not need a bunker. You need a short list of boring items, a few habits and a plan the whole household understands.</div>`
			},
			{
				h: 'What is on the official 72-hour checklist?',
				html: `<p>In summary, the guidance encourages you to have:</p>
<ul>
<li><strong>Information:</strong> a battery or wind-up radio, spare batteries, and a plan for where to find official updates.</li>
<li><strong>Light &amp; power:</strong> torches and fully charged power banks.</li>
<li><strong>Water &amp; food:</strong> bottled water and ready-to-eat food that needs no cooking.</li>
<li><strong>Health:</strong> a first aid kit, regular medication, and baby, pet and hygiene supplies.</li>
<li><strong>Documents:</strong> copies of important papers and contact numbers on paper.</li>
<li><strong>A household plan:</strong> who does what, who to contact, and where you would go if you had to leave.</li>
</ul>
<p>Always check the current wording on the official <a href="https://www.gov.uk/prepare" rel="noopener">GOV.UK</a> pages: the list is updated over time.</p>`
			},
			{
				h: 'What the 72-hour list leaves out',
				html: `<h3>1. The gas boiler trap</h3>
<p>Most UK homes have a gas combi or system boiler. They need electricity for the fan, pump and controls, so when the grid fails your "gas heating" fails too. Winter storms such as Storm Arwen left some homes without power for many days.</p>
<h3>2. Toilets when the water stops</h3>
<p>Stored drinking water disappears quickly if you flush with it. Without a plan, day one of a water outage becomes a sanitation problem.</p>
<h3>3. Phones don't work like they used to</h3>
<p>Mobile masts have limited battery back-up, and many broadband "Digital Voice" landlines need home power. Write down numbers and agree a meeting point <em>before</em> you need one.</p>
<h3>4. Food without waste</h3>
<p>Buying a pile of emergency rations that expire is how people give up on preparing. A rotating "quiet pantry" of food you already eat is cheaper and more sustainable.</p>
<h3>5. Longer outages</h3>
<p>Disruption from storms or burst mains can last well beyond three days. Planning for <strong>14 days</strong> in stages is realistic for most households.</p>`
			},
			{
				h: 'A budget way to build it',
				html: `<p>Add <strong>£12–£15 a week</strong> to your normal shop for four weeks: week one water, week two food, week three light and power, week four hygiene and your written plan. That is a household ready for a fortnight for roughly the cost of one takeaway.</p>`
			}
		]
	},
	{
		slug: 'do-uk-gas-boilers-work-in-a-power-cut',
		title: 'Do Gas Boilers Work in a Power Cut? Keep Your UK Home Warm Off-Grid',
		h1: 'Do Gas Boilers Work in a Power Cut? How to Keep Your UK Home Warm Off-Grid',
		description:
			'Why UK gas boilers stop in a power cut, and safe, practical ways to stay warm: room choice, layers, insulation and carbon monoxide rules.',
		published: '2026-10-05',
		updated: '2026-10-31',
		readMins: 6,
		blocks: [
			{
				html: `<p><strong>Short answer: almost never.</strong> Even though the fuel is gas, modern boilers use mains electricity for the fan, circulation pump, ignition and control board. No electricity means no heating and no hot water.</p>
<div class="callout-red"><strong>Safety first:</strong> never use a barbecue, camping stove, patio heater or gas cooker to heat a room. These can produce lethal <strong>carbon monoxide</strong>. Fit a working CO alarm and test it today.</div>`
			},
			{
				h: 'Why boilers fail in a blackout',
				html: `<ul>
<li><strong>Fan &amp; flue:</strong> modern boilers use a fan to exhaust gases safely.</li>
<li><strong>Pump:</strong> the central heating pump needs power to circulate hot water.</li>
<li><strong>Ignition &amp; controls:</strong> electronic ignition and thermostats stop working.</li>
<li><strong>Thermostats &amp; smart controls:</strong> also dependent on power and wi-fi.</li>
</ul>`
			},
			{
				h: 'How to stay warm safely',
				html: `<h3>Shrink the space</h3>
<p>Choose one small, interior room, ideally with no external walls and few windows, and live there together. Close doors and block draughts with towels or rolled blankets.</p>
<h3>Layer up and insulate yourself</h3>
<p>Wool or thermal layers, hats and socks, sleeping bags rated for cold, and a rug or mat under you. Heat is lost fast to cold floors.</p>
<h3>Use warmth you already have</h3>
<p>Keep curtains shut at night and open on sunny days. Eat regularly and have warm food or drinks if you can cook them safely.</p>
<h3>Safe backup heat</h3>
<p>If you buy any device, make sure it is explicitly rated for indoor use, follow the manual and ventilate. Never leave it running while you sleep unless it is specifically designed for it.</p>
<h3>Look after vulnerable people</h3>
<p>Babies, older people and those with health conditions are at greater risk. Check on neighbours and know when to call 111 or 999.</p>`
			},
			{
				h: 'Prepare before winter',
				html: `<p>A tested plan beats an improvised one at 2am. Drill 04 in the handbook, <em>Sudden Winter Blackout &amp; Heating Loss</em>, walks through the first hour, the first night and the next day step by step.</p>`
			}
		]
	},
	{
		slug: 'emergency-water-storage-uk-homes-flats',
		title: 'Emergency Water Storage & Filtration for UK Homes and Flats: The Complete Guide',
		h1: 'Emergency Water Storage & Filtration for UK Homes and Flats: The Complete Guide',
		description:
			'How much water to store per person in the UK, where to store it in a small flat, the safe sources already in your home and how to filter and treat water.',
		published: '2026-10-10',
		updated: '2026-10-31',
		readMins: 8,
		blocks: [
			{
				html: `<p>A burst main, a freeze-thaw event or a treatment-works fault can leave a UK town without tap water for days or longer. The good news is that water is the cheapest and easiest part of preparing.</p>`
			},
			{
				h: 'How much water per person?',
				html: `<p>Plan on <strong>at least 3 litres per person per day</strong> for drinking and basic hygiene, more for children, pregnancy, hot weather or medical needs.</p>
<table class="w-full border-collapse my-4 text-left text-sm">
<thead><tr class="bg-camo-mid text-white"><th class="p-2">Household</th><th class="p-2">3 days</th><th class="p-2">14 days</th></tr></thead>
<tbody>
<tr class="border-b"><td class="p-2">1 person</td><td class="p-2">9 L</td><td class="p-2">42 L</td></tr>
<tr class="border-b"><td class="p-2">2 people</td><td class="p-2">18 L</td><td class="p-2">84 L</td></tr>
<tr class="border-b"><td class="p-2">Family of 4</td><td class="p-2">36 L</td><td class="p-2">168 L</td></tr>
</tbody></table>
<p>You do not need to store all of it. Combine stored water with the safe sources and filtration below.</p>`
			},
			{
				h: 'Where to store water in a flat',
				html: `<ul>
<li>Sealed bottles under beds and at the bottom of wardrobes.</li>
<li>Food-grade 10&ndash;20 L containers in a cupboard or hallway.</li>
<li>Clean bottles filled from the tap <em>before</em> a forecast outage; rotate every 6 months.</li>
<li>Keep stored water away from sunlight and chemicals.</li>
</ul>`
			},
			{
				h: 'Hidden safe sources in a British home',
				html: `<p>If you know a water cut is coming, fill the bath, sinks and pans (for flushing and washing). Your <strong>kitchen cold tap</strong> is usually direct from the mains and the best source while pressure lasts. A hot-water cylinder can hold a significant amount, but ask a professional or check guidance before drinking from it, as it may be unsuitable. <strong>Never</strong> drink from the central heating system or toilet cistern.</p>`
			},
			{
				h: 'Two-stage purification',
				html: `<ol>
<li><strong>Filter:</strong> remove sediment through a clean cloth or a purpose-made filter.</li>
<li><strong>Disinfect:</strong> boil at a rolling boil for at least 1 minute, or use purification tablets following the maker's instructions.</li>
</ol>
<div class="callout-amber">Storing water for hygiene? Use the "Twin-Liner" toilet method in the handbook so your drinking water is never spent on flushing.</div>`
			}
		]
	}
];

export const getGuide = (slug: string) => guides.find((g) => g.slug === slug);
