/* =====================================================================
   SEASIDE HAVEN STUDIOS — template collection
   Every template below is an original design rendered from this data.
   To add one, copy an entry, change its copy and colors, and it shows
   up in the gallery automatically, together with its generated
   variations (see PRESET_PALS, FONT_PAIRS and tplVariants below).
   ===================================================================== */
const TEMPLATES = [
  {
    id: "harbor", name: "Harbor", industry: "Home services", cat: "Home & trades",
    blurb: "Upfront pricing, service-area pages and online booking for handymen, cleaners and home-repair crews.",
    fh: "'Bricolage Grotesque',sans-serif", fb: "'Outfit',sans-serif", hw: 800, r: 14, layout: "split",
    pal: [
      { bg: "#F7F4EE", fg: "#0B2540", mu: "#5B6B7C", ac: "#0B2540", acfg: "#FFFFFF", sf: "#FFFFFF", hi: "#E2A24A" },
      { bg: "#EEF4F7", fg: "#12303A", mu: "#557079", ac: "#1E7A8C", acfg: "#FFFFFF", sf: "#FFFFFF", hi: "#F2B544" },
      { bg: "#14202B", fg: "#F2EDE4", mu: "#9BA8B3", ac: "#E2A24A", acfg: "#14202B", sf: "#1C2A37", hi: "#E2A24A" }
    ],
    art: { kind: "arch", c: ["#0B2540", "#E2A24A", "#C9D6DF"] },
    brand: "Harbor Home Co.", nav: ["Services", "Pricing", "Areas", "Reviews"], cta: "Book a visit",
    kicker: "Licensed · Insured · Same-week visits",
    title: "Your home's to-do list, <em>handled.</em>",
    sub: "Repairs, installs and seasonal upkeep with upfront prices and a real person who shows up on time.",
    b1: "Book a visit", b2: "See pricing",
    stats: [["4.9★", "380+ reviews"], ["48 hr", "Average wait"], ["$0", "Trip charge"]],
    feats: [["Upfront pricing", "See the price before you book. No surprise invoices."], ["Background-checked pros", "Every tech is vetted, trained and insured."], ["1-year guarantee", "If it's not right, we come back free."]],
    secTitle: "Popular services", items: "cards",
    list: [["Handyman hour", "Small fixes, mounting, assembly", "From $89"], ["Gutter cleaning", "Single and two-story homes", "From $149"], ["Pressure washing", "Driveways, decks and siding", "From $199"]],
    quote: ["They fixed three things in one visit and the price was exactly what the site said.", "Dana R., homeowner"],
    ctaT: "Get your weekend back.", ctaS: "Pick a time online in under a minute."
  },
  {
    id: "ember", name: "Ember", industry: "Café & coffee", cat: "Food & drink",
    blurb: "A loud, playful café brand with a full menu, mobile ordering and a rewards sign-up.",
    fh: "'Archivo Black',sans-serif", fb: "'Outfit',sans-serif", hw: 400, r: 18, layout: "center", up: true,
    pal: [
      { bg: "#FFD9A8", fg: "#3B1F0E", mu: "#7A4E2E", ac: "#3B1F0E", acfg: "#FFD9A8", sf: "#FFE8C9", hi: "#E4572E" },
      { bg: "#D8F0E3", fg: "#123A2A", mu: "#3F6B58", ac: "#123A2A", acfg: "#D8F0E3", sf: "#EAF8F0", hi: "#F2994A" },
      { bg: "#2A140A", fg: "#FFE3BF", mu: "#C89F78", ac: "#FF8A3D", acfg: "#2A140A", sf: "#3A1D10", hi: "#FF8A3D" }
    ],
    art: { kind: "glow", c: ["#7A3B17", "#E4572E", "#FFC37A"] },
    brand: "EMBER COFFEE", nav: ["Menu", "Beans", "Rewards", "Find us"], cta: "Order ahead",
    kicker: "Roasted in-house every Tuesday",
    title: "Skip the line.<br>Not the coffee.",
    sub: "Order on your phone, grab it off the counter, and earn a free drink every ten cups.",
    b1: "Order ahead", b2: "View menu",
    stats: [["3 min", "Avg. pickup"], ["12", "Single origins"], ["10th", "Cup is free"]],
    feats: [["Order ahead", "Skip the line from your phone."], ["Rewards built in", "Points on every cup, no app needed."], ["Beans to go", "Fresh bags shipped every two weeks."]],
    secTitle: "On the menu", items: "menu",
    list: [["Maple oat latte", "Espresso, oat milk, maple", "$5.25"], ["Cold brew", "18-hour steep, served black", "$4.00"], ["Chai fog", "Spiced chai, vanilla foam", "$5.50"], ["Cortado", "Equal parts espresso and milk", "$4.25"], ["Brown butter scone", "Baked every morning", "$3.75"], ["Breakfast sando", "Egg, cheddar, chili jam", "$8.50"]],
    quote: ["Best cortado in town, and I'm in and out in two minutes.", "Marcus T., regular"],
    ctaT: "First drink's on us.", ctaS: "Join rewards and get a free coffee today."
  },
  {
    id: "velvet", name: "Velvet", industry: "Boutique shop", cat: "Shops & creative",
    blurb: "An editorial online store with elegant serif type, product collections and a full cart.",
    fh: "'Cormorant Garamond',serif", fb: "'Outfit',sans-serif", hw: 500, r: 0, layout: "editorial",
    pal: [
      { bg: "#FBF7F1", fg: "#2B2420", mu: "#7D7066", ac: "#2B2420", acfg: "#FBF7F1", sf: "#F2EBE1", hi: "#A9714B" },
      { bg: "#F3F1EC", fg: "#1D2B24", mu: "#66726B", ac: "#1D2B24", acfg: "#F3F1EC", sf: "#E8E5DC", hi: "#8C9A6E" },
      { bg: "#1D1916", fg: "#F2E9DD", mu: "#A69888", ac: "#F2E9DD", acfg: "#1D1916", sf: "#28221E", hi: "#C99B72" }
    ],
    art: { kind: "soft", c: ["#C8A98A", "#8C6A4F", "#E9DCCB"] },
    brand: "Velvet & Oak", nav: ["New in", "Home", "Table", "Journal"], cta: "Bag (2)",
    kicker: "The autumn edit",
    title: "Slow living, <em>beautifully</em> made.",
    sub: "Hand-finished home goods from small makers. Free shipping over $75.",
    b1: "Shop the edit", b2: "Our makers",
    stats: [["40+", "Independent makers"], ["Free", "Shipping over $75"], ["30 day", "Easy returns"]],
    feats: [["Made by hand", "Every piece is small-batch and signed."], ["Gift wrapping", "Wrapped in linen, ready to give."], ["Carbon-neutral shipping", "Offset on every order."]],
    secTitle: "New this week", items: "products",
    list: [["Linen throw", "Oatmeal", "$86"], ["Stoneware set", "Moss glaze", "$64"], ["Beeswax tapers", "Set of four", "$22"], ["Walnut board", "Large", "$118"]],
    quote: ["Everything arrived wrapped like a gift. It's my go-to for presents now.", "Elise M., customer"],
    ctaT: "Get 10% off your first order.", ctaS: "Join the list for new arrivals and maker stories."
  },
  {
    id: "pulse", name: "Pulse", industry: "Gym & fitness", cat: "Health & wellness",
    blurb: "High-energy studio site with a live class schedule, coach bios and membership checkout.",
    fh: "'Anton',sans-serif", fb: "'Space Grotesk',sans-serif", hw: 400, r: 8, layout: "full", up: true,
    pal: [
      { bg: "#0E0E0E", fg: "#FFFFFF", mu: "#9A9A9A", ac: "#D4FF3A", acfg: "#111111", sf: "#181818", hi: "#D4FF3A" },
      { bg: "#0B0E1A", fg: "#FFFFFF", mu: "#9198B0", ac: "#FF3D7F", acfg: "#FFFFFF", sf: "#141933", hi: "#FF3D7F" },
      { bg: "#F4F4F0", fg: "#0E0E0E", mu: "#5C5C5C", ac: "#0E0E0E", acfg: "#D4FF3A", sf: "#FFFFFF", hi: "#7A9A00" }
    ],
    art: { kind: "stripes", c: ["#1A1A1A", "#D4FF3A", "#3A3A3A"] },
    brand: "PULSE", nav: ["Classes", "Coaches", "Memberships", "Studio"], cta: "First class free",
    kicker: "Small-group strength · HIIT · Ride",
    title: "Sweat <em>together.</em><br>Get strong forever.",
    sub: "Coached classes capped at 12 people. Book a spot in seconds.",
    b1: "Claim free class", b2: "See schedule",
    stats: [["12", "People per class"], ["42", "Classes a week"], ["6", "Certified coaches"]],
    feats: [["Coached, not crowded", "Every rep gets eyes on it."], ["Track your lifts", "Progress logged after every session."], ["Freeze anytime", "Travel or rest without losing your rate."]],
    secTitle: "Today's schedule", items: "schedule",
    list: [["6:00 AM", "Strength", "Coach Ria · 4 spots"], ["12:15 PM", "HIIT 45", "Coach Dev · 3 spots"], ["5:30 PM", "Ride", "Coach Sam · Full"], ["7:00 PM", "Mobility", "Coach Ria · 8 spots"]],
    quote: ["Down 30 pounds and deadlifting twice my body weight. The coaches are the real deal.", "Jordan K., member"],
    ctaT: "Your first class is free.", ctaS: "No contracts. Cancel anytime."
  },
  {
    id: "counsel", name: "Counsel", industry: "Law firm", cat: "Professional",
    blurb: "A classic, trustworthy firm site with practice areas, attorney bios and a secure intake form.",
    fh: "'DM Serif Display',serif", fb: "'Outfit',sans-serif", hw: 400, r: 4, layout: "dash", widget: "form",
    pal: [
      { bg: "#13201A", fg: "#F4EEDF", mu: "#A9B2A6", ac: "#C9A45C", acfg: "#13201A", sf: "#1B2B23", hi: "#C9A45C" },
      { bg: "#101827", fg: "#EEF1F6", mu: "#9AA6B8", ac: "#C9A45C", acfg: "#101827", sf: "#182236", hi: "#C9A45C" },
      { bg: "#F7F4EC", fg: "#1B2620", mu: "#5F6A63", ac: "#1B2620", acfg: "#F7F4EC", sf: "#FFFFFF", hi: "#9C7A35" }
    ],
    art: { kind: "lines", c: ["#1B2B23", "#C9A45C", "#2A3D33"] },
    brand: "Hale & Whitfield", nav: ["Practice areas", "Attorneys", "Results", "Insights"], cta: "Free consultation",
    kicker: "Business · Estate · Real estate law",
    title: "Steady counsel when it matters most.",
    sub: "Clear advice, honest flat fees and a direct line to your attorney, not a call center.",
    b1: "Book a consultation", b2: "Our practice areas",
    stats: [["30+", "Years in practice"], ["2,400", "Clients served"], ["48 hr", "Response time"]],
    feats: [["Flat-fee options", "Know the cost before we begin."], ["Direct access", "Your attorney's cell, not a switchboard."], ["Secure portal", "Share documents safely online."]],
    secTitle: "Practice areas", items: "cards",
    list: [["Business law", "Formation, contracts and disputes", "Flat fee available"], ["Estate planning", "Wills, trusts and probate", "From $1,200"], ["Real estate", "Closings, leases and title", "Flat fee available"]],
    quote: ["They made a stressful process feel manageable and were honest about every cost.", "R. Patel, client"],
    ctaT: "Talk to an attorney this week.", ctaS: "Free 30-minute consultation, in person or by video."
  },
  {
    id: "lumen", name: "Lumen", industry: "Dental & medical", cat: "Health & wellness",
    blurb: "A calm, clean practice site with online booking, insurance info and digital patient forms.",
    fh: "'Outfit',sans-serif", fb: "'Outfit',sans-serif", hw: 700, r: 20, layout: "dash", widget: "booking", bookSub: "Dr. Lee · Cleaning & exam",
    pal: [
      { bg: "#F4FAFA", fg: "#0F2A2E", mu: "#55706F", ac: "#14B8A6", acfg: "#FFFFFF", sf: "#FFFFFF", hi: "#14B8A6" },
      { bg: "#F5F7FF", fg: "#1A2250", mu: "#5E6690", ac: "#4F6BFF", acfg: "#FFFFFF", sf: "#FFFFFF", hi: "#4F6BFF" },
      { bg: "#FFF7F3", fg: "#3A1E1A", mu: "#7E625C", ac: "#E0705A", acfg: "#FFFFFF", sf: "#FFFFFF", hi: "#E0705A" }
    ],
    art: { kind: "orb", c: ["#BFEDE6", "#14B8A6", "#E7F6F4"] },
    brand: "Lumen Dental", nav: ["Services", "Our team", "Insurance", "New patients"], cta: "Book online",
    kicker: "New patients welcome",
    title: "Care that fits your schedule.",
    sub: "Book cleanings online, fill out forms from your phone and see real open times.",
    b1: "Book a visit", b2: "Check insurance",
    stats: [["4.9", "860 patient reviews"], ["Same week", "New patient visits"], ["20+", "Plans accepted"]],
    feats: [["Online booking", "Real open times, 24/7."], ["Digital forms", "No clipboards in the waiting room."], ["Gentle care", "Sedation options for anxious patients."]],
    secTitle: "How we help", items: "cards",
    list: [["Cleanings & exams", "Twice-yearly checkups", "Most plans covered"], ["Whitening", "In-office or take-home", "From $249"], ["Invisalign", "Free consultation", "From $3,400"]],
    quote: ["I booked at 11pm on a Sunday and was in the chair Tuesday morning.", "Alyssa P., patient"],
    ctaT: "Your smile, on your schedule.", ctaS: "Book in under a minute."
  },
  {
    id: "keystone", name: "Keystone", industry: "Real estate", cat: "Professional",
    blurb: "A refined agent or brokerage site with listing search, neighborhood guides and lead capture.",
    fh: "'Fraunces',serif", fb: "'Geist',sans-serif", hw: 500, r: 6, layout: "full", widget: "search", searchF: ["City, neighborhood or ZIP", "Any price", "3+ beds"],
    pal: [
      { bg: "#FFFFFF", fg: "#161616", mu: "#6B6B6B", ac: "#161616", acfg: "#FFFFFF", sf: "#F5F3EF", hi: "#B08D57" },
      { bg: "#F4F1EA", fg: "#20302B", mu: "#68736E", ac: "#20302B", acfg: "#F4F1EA", sf: "#FFFFFF", hi: "#B4693E" },
      { bg: "#121416", fg: "#F2F0EB", mu: "#9A9C9E", ac: "#B08D57", acfg: "#121416", sf: "#1C1F22", hi: "#B08D57" }
    ],
    art: { kind: "house", c: ["#8EA3B5", "#D9C6A5", "#4C5E6C"] },
    brand: "KEYSTONE REALTY", nav: ["Buy", "Sell", "Neighborhoods", "About"], cta: "Get a home value",
    kicker: "Coastal Virginia homes",
    title: "Find the place you'll want to stay.",
    sub: "Local agents, honest advice and every listing in one place.",
    b1: "Search homes", b2: "What's my home worth?",
    stats: [["$420M", "Homes sold"], ["19 days", "Avg. time to contract"], ["101%", "Of list price"]],
    feats: [["Every listing", "Updated every 15 minutes."], ["Neighborhood guides", "Schools, commutes and coffee shops."], ["Instant home value", "Get an estimate in seconds."]],
    secTitle: "Featured listings", items: "listings",
    list: [["412 Bayview Ln", "4 bd · 3 ba · 2,640 sqft", "$649,000"], ["18 Marsh Hawk Ct", "3 bd · 2 ba · 1,880 sqft", "$489,000"], ["7 Dune Ridge Rd", "5 bd · 4 ba · 3,920 sqft", "$1,120,000"]],
    quote: ["We had three offers in the first weekend. They priced it perfectly.", "The Nguyens, sellers"],
    ctaT: "What's your home worth today?", ctaS: "Free, no-pressure valuation from a local agent."
  },
  {
    id: "bloom", name: "Bloom", industry: "Salon & spa", cat: "Health & wellness",
    blurb: "Soft, luxurious salon site with a service menu, stylist profiles and online booking.",
    fh: "'Fraunces',serif", fb: "'Outfit',sans-serif", hw: 400, r: 28, layout: "center",
    pal: [
      { bg: "#FCEFEA", fg: "#4A1F3D", mu: "#8A6479", ac: "#4A1F3D", acfg: "#FCEFEA", sf: "#FFF7F3", hi: "#D6869B" },
      { bg: "#EFF3EC", fg: "#2D3B2A", mu: "#6B7867", ac: "#2D3B2A", acfg: "#EFF3EC", sf: "#F8FBF6", hi: "#A7B98F" },
      { bg: "#2B1724", fg: "#FBE9E6", mu: "#C2A0B2", ac: "#F2B8C6", acfg: "#2B1724", sf: "#3A2131", hi: "#F2B8C6" }
    ],
    art: { kind: "petal", c: ["#F2C4CE", "#D6869B", "#FFF1EC"] },
    brand: "Bloom Studio", nav: ["Services", "Stylists", "Gift cards", "Visit"], cta: "Book now",
    kicker: "Hair · Skin · Nails",
    title: "Leave feeling like <em>yourself,</em> only more.",
    sub: "A calm, light-filled studio with stylists who listen first.",
    b1: "Book an appointment", b2: "View services",
    stats: [["11", "Stylists & artists"], ["4.9", "Google rating"], ["Clean", "Vegan product line"]],
    feats: [["Book 24/7", "Choose your stylist and time online."], ["Gift cards", "Sent by email in seconds."], ["Loyalty perks", "Every fifth visit is 20% off."]],
    secTitle: "Service menu", items: "menu",
    list: [["Signature cut & style", "Includes wash and blowout", "$75"], ["Balayage", "Hand-painted color", "$210"], ["Hydrating facial", "60 minutes", "$120"], ["Gel manicure", "Long-lasting shine", "$45"], ["Brow shaping", "Wax and tint", "$35"], ["Bridal trial", "Hair and makeup", "$160"]],
    quote: ["I've never felt so listened to in a salon chair. My color is perfect.", "Kayla S., client"],
    ctaT: "Treat yourself this week.", ctaS: "New clients get 15% off their first visit."
  },
  {
    id: "ironclad", name: "Ironclad", industry: "Construction", cat: "Home & trades",
    blurb: "A bold contractor site with a project portfolio, service list and a fast quote request.",
    fh: "'Archivo Black',sans-serif", fb: "'Space Grotesk',sans-serif", hw: 400, r: 2, layout: "full", up: true,
    pal: [
      { bg: "#111111", fg: "#F2F2F2", mu: "#9C9C9C", ac: "#FFC21A", acfg: "#111111", sf: "#1B1B1B", hi: "#FFC21A" },
      { bg: "#0F1B2A", fg: "#F0F3F7", mu: "#93A2B5", ac: "#FF7A1A", acfg: "#0F1B2A", sf: "#172638", hi: "#FF7A1A" },
      { bg: "#F2EFE8", fg: "#151515", mu: "#5E5E5E", ac: "#151515", acfg: "#FFC21A", sf: "#FFFFFF", hi: "#D49A00" }
    ],
    art: { kind: "grid", c: ["#2A2A2A", "#FFC21A", "#555555"] },
    brand: "IRONCLAD BUILD", nav: ["Services", "Projects", "Process", "Careers"], cta: "Get a quote",
    kicker: "Residential & commercial · Since 2004",
    title: "Built right.<br><em>Built once.</em>",
    sub: "Additions, remodels and light commercial builds, on schedule and on budget.",
    b1: "Request a quote", b2: "View projects",
    stats: [["600+", "Projects completed"], ["98%", "On-time finish"], ["10 yr", "Workmanship warranty"]],
    feats: [["Fixed-price bids", "Line-item quotes, no allowances."], ["Weekly updates", "Photos and progress every Friday."], ["One crew", "Same team from demo to walkthrough."]],
    secTitle: "Recent projects", items: "cards",
    list: [["Lakeside addition", "640 sqft primary suite", "Completed 2026"], ["Downtown retail fit-out", "3,200 sqft commercial", "Completed 2026"], ["Craftsman kitchen", "Full gut remodel", "Completed 2025"]],
    quote: ["They finished two days early and the final bill matched the bid to the dollar.", "Tom & Ellen W."],
    ctaT: "Have a project in mind?", ctaS: "Free on-site estimate within 5 business days."
  },
  {
    id: "frame", name: "Frame", industry: "Photographer", cat: "Shops & creative",
    blurb: "A minimal, image-first portfolio for photographers, artists and creative studios.",
    fh: "'Syne',sans-serif", fb: "'Geist',sans-serif", hw: 700, r: 0, layout: "editorial",
    pal: [
      { bg: "#F2F0EC", fg: "#111111", mu: "#6E6E6E", ac: "#111111", acfg: "#F2F0EC", sf: "#E8E5DF", hi: "#111111" },
      { bg: "#0D0D0D", fg: "#F2F0EC", mu: "#8A8A8A", ac: "#F2F0EC", acfg: "#0D0D0D", sf: "#171717", hi: "#F2F0EC" },
      { bg: "#EDE7DD", fg: "#3A2A20", mu: "#7A6A5E", ac: "#3A2A20", acfg: "#EDE7DD", sf: "#E2DACD", hi: "#B5562B" }
    ],
    art: { kind: "photo", c: ["#6B7A86", "#C9B8A0", "#2C3238"] },
    brand: "NORA VALE", nav: ["Weddings", "Portraits", "Journal", "Inquire"], cta: "Check dates",
    kicker: "Photographer · Virginia & beyond",
    title: "Honest pictures of real days.",
    sub: "Documentary wedding and portrait photography for people who'd rather not pose.",
    b1: "Check my dates", b2: "See the work",
    stats: [["200+", "Weddings"], ["6 wk", "Gallery delivery"], ["Worldwide", "Travel"]],
    feats: [["Unposed", "Real moments, gently directed."], ["Full galleries", "Every keeper, edited by hand."], ["Heirloom albums", "Printed and bound in Italy."]],
    secTitle: "Selected work", items: "gallery",
    list: [["Outer Banks", "", ""], ["Shenandoah", "", ""], ["Richmond", "", ""], ["Chesapeake", "", ""], ["Blue Ridge", "", ""], ["Norfolk", "", ""]],
    quote: ["We cried looking at the gallery. She caught moments we didn't even know happened.", "Priya & Sam"],
    ctaT: "Booking 2027 now.", ctaS: "Tell me about your day."
  },
  {
    id: "tide", name: "Tide", industry: "Auto detailing", cat: "Local services",
    blurb: "A sleek, high-gloss site for detailers and mobile services with package pricing and booking.",
    fh: "'Space Grotesk',sans-serif", fb: "'Outfit',sans-serif", hw: 700, r: 12, layout: "split",
    pal: [
      { bg: "#060B18", fg: "#E8F0FF", mu: "#8C9AB8", ac: "#3B82F6", acfg: "#FFFFFF", sf: "#0E1628", hi: "#60A5FA" },
      { bg: "#0B0B0B", fg: "#F5F5F5", mu: "#9A9A9A", ac: "#E11D48", acfg: "#FFFFFF", sf: "#161616", hi: "#FB7185" },
      { bg: "#F1F5FB", fg: "#0A1A33", mu: "#5A6A85", ac: "#0A1A33", acfg: "#FFFFFF", sf: "#FFFFFF", hi: "#2563EB" }
    ],
    art: { kind: "gloss", c: ["#0E1B3A", "#3B82F6", "#9CC3FF"] },
    brand: "TIDE DETAIL CO.", nav: ["Packages", "Ceramic", "Gallery", "Areas"], cta: "Book a detail",
    kicker: "Mobile detailing · We come to you",
    title: "Showroom shine in your driveway.",
    sub: "Hand washes, paint correction and ceramic coatings done at your home or office.",
    b1: "Book a detail", b2: "Compare packages",
    stats: [["5★", "1,100+ details"], ["We come", "To you"], ["5 yr", "Ceramic warranty"]],
    feats: [["Fully mobile", "Water and power on board."], ["Pro-grade products", "pH-safe, swirl-free methods."], ["Maintenance plans", "Stay clean every month."]],
    secTitle: "Packages", items: "cards",
    list: [["Express", "Hand wash, wheels, interior vac", "$79"], ["Signature", "Clay, sealant, full interior", "$189"], ["Ceramic", "Paint correction + 5-yr coating", "$899"]],
    quote: ["My 8-year-old truck looks better than the day I bought it.", "Chris D., customer"],
    ctaT: "Your car deserves this.", ctaS: "Book online, pay after the detail."
  },
  {
    id: "grove", name: "Grove", industry: "Landscaping", cat: "Home & trades",
    blurb: "An earthy, trustworthy site for landscapers and lawn crews with seasonal plans and quotes.",
    fh: "'Fraunces',serif", fb: "'Outfit',sans-serif", hw: 600, r: 16, layout: "split",
    pal: [
      { bg: "#F1EFE4", fg: "#1F3A2B", mu: "#5F6E5F", ac: "#1F3A2B", acfg: "#F1EFE4", sf: "#FFFFFF", hi: "#8DB255" },
      { bg: "#F6F1E7", fg: "#3B2E1E", mu: "#7A6B58", ac: "#6B7F3A", acfg: "#FFFFFF", sf: "#FFFFFF", hi: "#C98B3A" },
      { bg: "#14231B", fg: "#EEF0E2", mu: "#9FAE9F", ac: "#A8CF6A", acfg: "#14231B", sf: "#1C3024", hi: "#A8CF6A" }
    ],
    art: { kind: "leaf", c: ["#2F5A3D", "#8DB255", "#D6E3B8"] },
    brand: "Grove & Co. Landscapes", nav: ["Services", "Plans", "Our work", "About"], cta: "Free estimate",
    kicker: "Design · Install · Maintain",
    title: "A yard you'll actually <em>use.</em>",
    sub: "Patios, plantings and weekly care from a local crew that treats it like their own.",
    b1: "Get a free estimate", b2: "Seasonal plans",
    stats: [["15 yrs", "Family owned"], ["1,400", "Yards cared for"], ["Weekly", "Same crew"]],
    feats: [["Design visits", "3D plans before we dig."], ["Seasonal plans", "Mowing to leaf cleanup, one price."], ["Native plantings", "Low-water, pollinator-friendly."]],
    secTitle: "Seasonal plans", items: "cards",
    list: [["Essentials", "Weekly mow, edge and blow", "$45/visit"], ["Full care", "Plus beds, shrubs and mulch", "$189/mo"], ["Estate", "Everything, plus seasonal color", "$349/mo"]],
    quote: ["Our backyard went from mud pit to the place everyone wants to hang out.", "The Brooks family"],
    ctaT: "Spring books up fast.", ctaS: "Get on the schedule with a free estimate."
  },
  {
    id: "gather", name: "Gather", industry: "Church & nonprofit", cat: "Local services",
    blurb: "A warm, welcoming site for churches and nonprofits with events, giving and volunteer sign-ups.",
    fh: "'Playfair Display',serif", fb: "'Outfit',sans-serif", hw: 600, r: 12, layout: "center",
    pal: [
      { bg: "#FFF8EF", fg: "#3A2A1E", mu: "#7B6858", ac: "#C2562F", acfg: "#FFFFFF", sf: "#FFFFFF", hi: "#C2562F" },
      { bg: "#F2F5F9", fg: "#1D2A44", mu: "#5D6A83", ac: "#2F5BD3", acfg: "#FFFFFF", sf: "#FFFFFF", hi: "#2F5BD3" },
      { bg: "#1E1A16", fg: "#F7EEE2", mu: "#B5A595", ac: "#E7A15A", acfg: "#1E1A16", sf: "#29231E", hi: "#E7A15A" }
    ],
    art: { kind: "sun", c: ["#F2B57A", "#C2562F", "#FFE7C9"] },
    brand: "Harbor Light Community", nav: ["Visit", "Events", "Serve", "Give"], cta: "Plan a visit",
    kicker: "Sundays at 9 & 11 · All are welcome",
    title: "There's a seat saved for you.",
    sub: "A neighborhood community that eats together, serves together and shows up for each other.",
    b1: "Plan your visit", b2: "Give online",
    stats: [["1,200", "Meals served monthly"], ["40+", "Volunteer teams"], ["Since 1962", "In the neighborhood"]],
    feats: [["Kids & youth", "Safe, check-in secured programs."], ["Give online", "One-time or recurring, in seconds."], ["Serve locally", "Sign up for a team in one click."]],
    secTitle: "Upcoming events", items: "schedule", schedBtn: "Details",
    list: [["Sun 9:00", "Morning gathering", "Main hall · Coffee at 8:30"], ["Wed 6:30", "Community dinner", "Fellowship hall · Free"], ["Sat 10:00", "Food pantry", "Volunteers needed"], ["Fri 7:00", "Youth night", "Ages 12–18"]],
    quote: ["We moved here knowing no one. Within a month it felt like family.", "The Alvarez family"],
    ctaT: "Come as you are.", ctaS: "We'll save you a seat and a coffee."
  },
  {
    id: "northbound", name: "Northbound", industry: "Software & startup", cat: "Professional",
    blurb: "A product-led startup site with gradient type, a live dashboard preview and trial signup.",
    fh: "'Bricolage Grotesque',sans-serif", fb: "'Geist',sans-serif", hw: 700, r: 12, layout: "dash", widget: "dash",
    pal: [
      { bg: "#0B1020", fg: "#E7ECF7", mu: "#8C97B3", ac: "#FFFFFF", acfg: "#0B1020", sf: "#131A30", hi: "#8B7CFF" },
      { bg: "#FAFAFC", fg: "#111325", mu: "#5F6380", ac: "#111325", acfg: "#FFFFFF", sf: "#FFFFFF", hi: "#6D5BFF" },
      { bg: "#04140F", fg: "#E4F5EE", mu: "#82A699", ac: "#34D399", acfg: "#04140F", sf: "#0B2219", hi: "#34D399" }
    ],
    art: { kind: "mesh", c: ["#5B6CFF", "#8B7CFF", "#2EC5E0"] },
    brand: "Northbound", nav: ["Product", "Customers", "Pricing", "Docs"], cta: "Start free",
    kicker: "New · AI dispatch is here",
    title: "Every job, every crew, <em>one live dashboard.</em>",
    sub: "Scheduling, dispatch and reporting software for growing field teams.",
    b1: "Start free trial", b2: "Book a demo",
    stats: [["3,000+", "Teams"], ["31%", "More jobs per week"], ["SOC 2", "Type II"]],
    feats: [["Smart dispatch", "Routes crews automatically."], ["Live reporting", "Revenue and utilization in real time."], ["Integrates", "QuickBooks, Stripe, Google."]],
    secTitle: "Simple pricing", items: "cards",
    list: [["Starter", "Up to 5 users", "$29/mo"], ["Team", "Up to 25 users", "$99/mo"], ["Scale", "Unlimited users", "Let's talk"]],
    quote: ["We replaced three tools and a whiteboard. Our crews finally know where to be.", "M. Ortiz, Ops lead"],
    ctaT: "Try it free for 14 days.", ctaS: "No credit card required."
  },
  {
    id: "saltwater", name: "Saltwater", industry: "Restaurant", cat: "Food & drink",
    blurb: "A moody, coastal restaurant site with reservations, a seasonal menu and private events.",
    fh: "'Playfair Display',serif", fb: "'Outfit',sans-serif", hw: 500, r: 999, layout: "full",
    pal: [
      { bg: "#0F1D24", fg: "#F3EDE2", mu: "#A2ABAA", ac: "#F08A5D", acfg: "#0F1D24", sf: "#16272F", hi: "#F08A5D" },
      { bg: "#1A120E", fg: "#F2E8DC", mu: "#B7A894", ac: "#E8B26A", acfg: "#1A120E", sf: "#24190F", hi: "#E8B26A" },
      { bg: "#F5EFE6", fg: "#11262E", mu: "#5E6E70", ac: "#11262E", acfg: "#F5EFE6", sf: "#FFFFFF", hi: "#D9643A" }
    ],
    art: { kind: "waves", c: ["#16323D", "#F08A5D", "#3E6B78"] },
    brand: "Saltwater", nav: ["Menu", "Raw bar", "Events", "Visit"], cta: "Reserve",
    kicker: "Dock-to-table seafood · Dinner nightly",
    title: "Caught this morning. <em>Served tonight.</em>",
    sub: "Oysters, wood-grilled fish and a sunset view of the bay.",
    b1: "Reserve a table", b2: "Tonight's menu",
    stats: [["Tonight", "Tables at 7:30"], ["24", "Oysters on ice"], ["4.8", "1,900 reviews"]],
    feats: [["Reserve in seconds", "Real-time table availability."], ["Private events", "Rehearsal dinners to buyouts."], ["Gift cards", "Delivered instantly."]],
    secTitle: "Tonight's menu", items: "menu",
    list: [["Local oysters", "Half dozen, mignonette", "$18"], ["Grilled rockfish", "Charred lemon, herbs", "$34"], ["Crab cakes", "Jumbo lump, remoulade", "$29"], ["Scallop crudo", "Citrus, chili, olive oil", "$19"], ["Lobster roll", "Brown butter, brioche", "$32"], ["Key lime pie", "Toasted meringue", "$11"]],
    quote: ["The oysters, the sunset, the service. Our new anniversary spot.", "Megan & Luis"],
    ctaT: "Your table's waiting.", ctaS: "Reserve online or call for parties of 8+."
  },
  {
    id: "crumb", name: "Crumb", industry: "Bakery", cat: "Food & drink",
    blurb: "A sweet, handmade bakery site with daily specials, custom cake orders and local pickup.",
    fh: "'Fraunces',serif", fb: "'Outfit',sans-serif", hw: 600, r: 22, layout: "split",
    pal: [
      { bg: "#FFF4EC", fg: "#4A2618", mu: "#8C6556", ac: "#C8553D", acfg: "#FFFFFF", sf: "#FFFFFF", hi: "#C8553D" },
      { bg: "#F4F7EE", fg: "#2F3A1F", mu: "#6B7559", ac: "#2F3A1F", acfg: "#F4F7EE", sf: "#FFFFFF", hi: "#D08C3A" },
      { bg: "#2A1A14", fg: "#FBEADF", mu: "#C3A595", ac: "#F2A97E", acfg: "#2A1A14", sf: "#36231B", hi: "#F2A97E" }
    ],
    art: { kind: "glow", c: ["#B5643F", "#F2B884", "#FFE4C7"] },
    brand: "Crumb & Co. Bakery", nav: ["Today's bake", "Cakes", "Wholesale", "Visit"], cta: "Order for pickup",
    kicker: "Baked from scratch at 4am",
    title: "Warm bread. <em>Sweet mornings.</em>",
    sub: "Sourdough, pastries and custom cakes made by hand every day. Order ahead and skip the line.",
    b1: "Order for pickup", b2: "Custom cakes",
    stats: [["4am", "Ovens on"], ["30+", "Daily bakes"], ["48 hr", "Cake notice"]],
    feats: [["Order ahead", "Reserve before it sells out."], ["Custom cakes", "Design yours online with a deposit."], ["Wholesale", "Fresh bread for cafés and restaurants."]],
    secTitle: "Today's bake", items: "products",
    list: [["Country sourdough", "Naturally leavened", "$9"], ["Almond croissant", "Twice-baked", "$5"], ["Cinnamon knot", "Cardamom sugar", "$4"], ["Lemon tart", "Torched meringue", "$6"]],
    quote: ["The sourdough sells out by 10, so I order ahead every Friday. Worth it.", "Hannah L., regular"],
    ctaT: "Something sweet this weekend?", ctaS: "Order online by 8pm for next-morning pickup."
  },
  {
    id: "ledger", name: "Ledger", industry: "Accounting & finance", cat: "Professional",
    blurb: "A sharp, confident site for accountants, bookkeepers and advisors with service plans and a client portal.",
    fh: "'Outfit',sans-serif", fb: "'Geist',sans-serif", hw: 600, r: 10, layout: "dash", widget: "form",
    pal: [
      { bg: "#F5F7FA", fg: "#0E1E3A", mu: "#5B6880", ac: "#1F4FD8", acfg: "#FFFFFF", sf: "#FFFFFF", hi: "#1F4FD8" },
      { bg: "#F3F6F2", fg: "#13291D", mu: "#5D6E63", ac: "#13291D", acfg: "#FFFFFF", sf: "#FFFFFF", hi: "#2E8B57" },
      { bg: "#0B1426", fg: "#E8EEF8", mu: "#8E9BB3", ac: "#5B8CFF", acfg: "#0B1426", sf: "#121E36", hi: "#5B8CFF" }
    ],
    art: { kind: "lines", c: ["#DCE5F5", "#1F4FD8", "#EEF2F9"] },
    brand: "Ledger & Lane CPAs", nav: ["Services", "Plans", "Industries", "Client portal"], cta: "Book a call",
    kicker: "Tax · Bookkeeping · Advisory",
    title: "Numbers you can <em>finally</em> trust.",
    sub: "Monthly bookkeeping, year-round tax planning and a real accountant who answers your texts.",
    b1: "Book a free call", b2: "See plans",
    stats: [["$2.1M", "Saved for clients last year"], ["450+", "Small businesses"], ["24 hr", "Reply time"]],
    feats: [["Flat monthly plans", "No hourly billing surprises."], ["Secure portal", "Upload receipts from your phone."], ["Tax planning", "Strategy all year, not just April."]],
    secTitle: "Plans", items: "cards",
    list: [["Bookkeeping", "Monthly books + reports", "$299/mo"], ["Books + Tax", "Plus business tax return", "$499/mo"], ["CFO Advisory", "Plus forecasting & strategy", "$999/mo"]],
    quote: ["They found $18,000 in deductions our last accountant missed.", "D. Morales, owner"],
    ctaT: "Stop dreading tax season.", ctaS: "Free 20-minute call to see where you stand."
  },
  {
    id: "paws", name: "Paws", industry: "Pet grooming", cat: "Local services",
    blurb: "A cheerful, friendly site for groomers, daycares and vets with booking and pet profiles.",
    fh: "'Bricolage Grotesque',sans-serif", fb: "'Outfit',sans-serif", hw: 800, r: 26, layout: "split",
    pal: [
      { bg: "#FFF6D9", fg: "#2D2A6E", mu: "#6B6896", ac: "#FF6B6B", acfg: "#FFFFFF", sf: "#FFFFFF", hi: "#2D2A6E" },
      { bg: "#E9F7FF", fg: "#103A5C", mu: "#58748C", ac: "#FF9F1C", acfg: "#103A5C", sf: "#FFFFFF", hi: "#103A5C" },
      { bg: "#F3EEFF", fg: "#35215E", mu: "#75689A", ac: "#35C28F", acfg: "#FFFFFF", sf: "#FFFFFF", hi: "#35215E" }
    ],
    art: { kind: "dots", c: ["#FFB4A2", "#FF6B6B", "#FFE08A"] },
    brand: "Paws & Suds", nav: ["Grooming", "Daycare", "Pricing", "Team"], cta: "Book a groom",
    kicker: "Fear-free certified groomers",
    title: "Happy pets. <em>Fresh fluff.</em>",
    sub: "Gentle grooming, daycare and baths in a calm, cage-free salon.",
    b1: "Book a groom", b2: "Meet the team",
    stats: [["5★", "640 reviews"], ["Cage-free", "Always"], ["Pickup", "Text alerts"]],
    feats: [["Fear-free", "Low-stress handling, every visit."], ["Photo updates", "Pics texted during the groom."], ["Puppy intro", "First groom half off."]],
    secTitle: "Grooming menu", items: "cards",
    list: [["Bath & brush", "Shampoo, dry, nails, ears", "From $45"], ["Full groom", "Bath plus breed haircut", "From $75"], ["Daycare day", "Play groups, nap time", "$32/day"]],
    quote: ["Our anxious rescue actually pulls us to the door now. That says it all.", "Jess & Biscuit"],
    ctaT: "Their best hair day awaits.", ctaS: "Book online in under a minute."
  }  ,
  /* ---------------- Home & trades ---------------- */
  {
    id: "flow", name: "Flow", industry: "Plumbing", cat: "Home & trades",
    blurb: "An emergency-ready plumber site with tap-to-call, upfront flat rates and same-day booking.",
    fh: "'Space Grotesk',sans-serif", fb: "'Outfit',sans-serif", hw: 700, r: 10, layout: "dash", widget: "form",
    pal: [
      { bg: "#F2F7FB", fg: "#0C2A4A", mu: "#567089", ac: "#1167D8", acfg: "#FFFFFF", sf: "#FFFFFF", hi: "#1167D8" },
      { bg: "#FFF8F0", fg: "#2A1B10", mu: "#7A6657", ac: "#E0531F", acfg: "#FFFFFF", sf: "#FFFFFF", hi: "#E0531F" },
      { bg: "#081726", fg: "#E9F2FB", mu: "#8FA5BC", ac: "#4DA3FF", acfg: "#081726", sf: "#10243A", hi: "#4DA3FF" }
    ],
    art: { kind: "orb", c: ["#BFD9F5", "#1167D8", "#E6F0FA"] },
    brand: "Flow Plumbing Co.", nav: ["Services", "Pricing", "Emergency", "Reviews"], cta: "Call now",
    kicker: "24/7 emergency service · Licensed & insured",
    title: "Leak today? <em>Fixed today.</em>",
    sub: "Flat-rate plumbing with a real arrival window, clean boots and no overtime surprises.",
    b1: "Book a plumber", b2: "See flat rates",
    stats: [["45 min", "Avg. arrival"], ["4.9★", "1,200 reviews"], ["$0", "After-hours fee"]],
    feats: [["Flat-rate pricing", "You approve the price before we start."], ["Stocked trucks", "Nine out of ten jobs done in one visit."], ["2-year warranty", "Parts and labor, in writing."]],
    secTitle: "Common jobs", items: "cards",
    list: [["Drain clearing", "Kitchen, bath and main lines", "From $129"], ["Water heaters", "Repair or same-day replacement", "From $189"], ["Leak repair", "Pipes, faucets and toilets", "From $99"]],
    quote: ["Called at 6am with a burst pipe. They were here by 7 and done by 8.", "Monica H., homeowner"],
    ctaT: "Water where it shouldn't be?", ctaS: "Call or book online. We answer day and night."
  },
  {
    id: "volt", name: "Volt", industry: "Electrician", cat: "Home & trades",
    blurb: "A bold, high-contrast electrician site with service menus, EV charger installs and instant quotes.",
    fh: "'Anton',sans-serif", fb: "'Space Grotesk',sans-serif", hw: 400, r: 6, layout: "split", up: true,
    pal: [
      { bg: "#101214", fg: "#F5F5F2", mu: "#9B9E9F", ac: "#FFD60A", acfg: "#101214", sf: "#1A1D20", hi: "#FFD60A" },
      { bg: "#F5F4EF", fg: "#14161A", mu: "#5F6266", ac: "#14161A", acfg: "#FFD60A", sf: "#FFFFFF", hi: "#B38F00" },
      { bg: "#0A1830", fg: "#EEF3FB", mu: "#90A0BA", ac: "#38BDF8", acfg: "#0A1830", sf: "#122444", hi: "#38BDF8" }
    ],
    art: { kind: "stripes", c: ["#181B1E", "#FFD60A", "#2C3035"] },
    brand: "VOLT ELECTRIC", nav: ["Services", "EV chargers", "Projects", "About"], cta: "Get a quote",
    kicker: "Master electricians · Residential & commercial",
    title: "Power, <em>done properly.</em>",
    sub: "Panel upgrades, rewiring, lighting and EV chargers installed safely and to code.",
    b1: "Get a free quote", b2: "Our services",
    stats: [["22 yrs", "In business"], ["5,000+", "Jobs wired"], ["100%", "Code compliant"]],
    feats: [["Same-week installs", "Most jobs scheduled within five days."], ["Permit handled", "We file, schedule and pass inspection."], ["Lifetime labor warranty", "If our work fails, we fix it free."]],
    secTitle: "What we do", items: "cards",
    list: [["Panel upgrades", "100 to 200 amp service", "From $1,800"], ["EV charger install", "Level 2, all brands", "From $649"], ["Lighting & fans", "Recessed, pendants, outdoor", "From $149"]],
    quote: ["They upgraded our panel and added a charger in one day. Spotless work.", "Greg A., homeowner"],
    ctaT: "Flickering lights? Full panel?", ctaS: "Send a photo and get a quote within the hour."
  },
  {
    id: "ridgeline", name: "Ridgeline", industry: "Roofing", cat: "Home & trades",
    blurb: "A sturdy roofing site with storm-damage inspections, financing and a before-and-after project gallery.",
    fh: "'Archivo Black',sans-serif", fb: "'Outfit',sans-serif", hw: 400, r: 4, layout: "full",
    pal: [
      { bg: "#F4F1EC", fg: "#22262B", mu: "#666B72", ac: "#B3391F", acfg: "#FFFFFF", sf: "#FFFFFF", hi: "#B3391F" },
      { bg: "#EEF2F4", fg: "#18242C", mu: "#5B6A74", ac: "#18242C", acfg: "#FFFFFF", sf: "#FFFFFF", hi: "#2E7D6B" },
      { bg: "#16191D", fg: "#F0EEEA", mu: "#9B9FA5", ac: "#E8623F", acfg: "#16191D", sf: "#20252B", hi: "#E8623F" }
    ],
    art: { kind: "house", c: ["#7F95A6", "#B3391F", "#3F4B55"] },
    brand: "Ridgeline Roofing", nav: ["Roofing", "Storm damage", "Financing", "Gallery"], cta: "Free inspection",
    kicker: "Shingle · Metal · Flat roofs",
    title: "A roof you never have to think about.",
    sub: "Replacements and repairs with photo reports, clear quotes and crews that clean up after themselves.",
    b1: "Book a free inspection", b2: "See financing",
    stats: [["3,100", "Roofs installed"], ["50 yr", "Shingle warranty"], ["1 day", "Most installs"]],
    feats: [["Drone inspections", "A full photo report, free."], ["Insurance help", "We meet your adjuster on site."], ["0% financing", "Pay over 18 months."]],
    secTitle: "Recent roofs", items: "cards",
    list: [["Architectural shingle", "2,400 sqft colonial", "Completed in 1 day"], ["Standing-seam metal", "Lake house re-roof", "Completed in 3 days"], ["Storm repair", "Hail damage, insurance claim", "Fully covered"]],
    quote: ["Insurance covered everything and Ridgeline handled every phone call.", "Pat & Linda S."],
    ctaT: "Storm roll through last night?", ctaS: "Free inspection and photo report within 48 hours."
  },
  {
    id: "zephyr", name: "Zephyr", industry: "Heating & cooling", cat: "Home & trades",
    blurb: "A fresh, friendly HVAC site with maintenance memberships, tune-up specials and 24/7 repair booking.",
    fh: "'Bricolage Grotesque',sans-serif", fb: "'Geist',sans-serif", hw: 700, r: 18, layout: "split",
    pal: [
      { bg: "#EEF8FB", fg: "#0D3442", mu: "#55737D", ac: "#0E9FBF", acfg: "#FFFFFF", sf: "#FFFFFF", hi: "#F26B3A" },
      { bg: "#FFF6EE", fg: "#3A2114", mu: "#80675A", ac: "#F26B3A", acfg: "#FFFFFF", sf: "#FFFFFF", hi: "#0E9FBF" },
      { bg: "#0A2028", fg: "#E6F5F9", mu: "#8BAAB3", ac: "#39C6E5", acfg: "#0A2028", sf: "#12303A", hi: "#FF9466" }
    ],
    art: { kind: "sun", c: ["#8FD6E8", "#0E9FBF", "#FFE2CF"] },
    brand: "Zephyr Heating & Air", nav: ["Repair", "Install", "Memberships", "Specials"], cta: "Schedule service",
    kicker: "Heating · Cooling · Air quality",
    title: "Comfortable in <em>every</em> season.",
    sub: "Fast repairs, honest replacement advice and tune-ups that keep small problems small.",
    b1: "Schedule service", b2: "Join the comfort club",
    stats: [["2 hr", "Arrival window"], ["12 yr", "Parts warranty"], ["$89", "Tune-up special"]],
    feats: [["Repair first", "We fix what can be fixed."], ["Comfort club", "Two tune-ups a year and priority visits."], ["Upfront options", "Good, better and best quotes."]],
    secTitle: "Services", items: "cards",
    list: [["AC repair", "All makes and models", "From $95"], ["Furnace tune-up", "21-point safety check", "$89"], ["New systems", "Heat pumps and central air", "From $79/mo"]],
    quote: ["They could have sold us a new unit. Instead they fixed ours for $140.", "Renee C., homeowner"],
    ctaT: "No heat? No cool? No problem.", ctaS: "Same-day service seven days a week."
  },
  {
    id: "gleam", name: "Gleam", industry: "Cleaning service", cat: "Home & trades",
    blurb: "A light, airy cleaning-company site with instant online quotes and recurring plans.",
    fh: "'Outfit',sans-serif", fb: "'Outfit',sans-serif", hw: 700, r: 24, layout: "dash", widget: "booking",
    pal: [
      { bg: "#F3FBF7", fg: "#103B2E", mu: "#5A7A6F", ac: "#17A673", acfg: "#FFFFFF", sf: "#FFFFFF", hi: "#17A673" },
      { bg: "#F6F5FF", fg: "#251F5C", mu: "#69658F", ac: "#6C5CE7", acfg: "#FFFFFF", sf: "#FFFFFF", hi: "#6C5CE7" },
      { bg: "#FFF9EC", fg: "#3B2C10", mu: "#7F7157", ac: "#F2A516", acfg: "#3B2C10", sf: "#FFFFFF", hi: "#D98C00" }
    ],
    art: { kind: "dots", c: ["#BFEBD9", "#17A673", "#E9F9F1"] },
    brand: "Gleam Home Cleaning", nav: ["Services", "Pricing", "Checklist", "Reviews"], cta: "Get instant quote",
    kicker: "Bonded · Insured · Supplies included",
    title: "Come home to <em>clean.</em>",
    sub: "Weekly, biweekly or one-time cleans by the same trusted team every visit.",
    b1: "Get my price", b2: "What's included",
    stats: [["60 sec", "To book online"], ["Same team", "Every visit"], ["100%", "Re-clean guarantee"]],
    feats: [["Instant pricing", "Pick your home size and see the price."], ["50-point checklist", "Nothing skipped, every time."], ["Easy changes", "Skip or reschedule by text."]],
    secTitle: "Cleaning plans", items: "cards",
    list: [["Standard clean", "Kitchens, baths, floors, dusting", "From $129"], ["Deep clean", "Baseboards, inside appliances", "From $249"], ["Move in / out", "Empty-home top to bottom", "From $299"]],
    quote: ["Walking into a clean house every other Friday is the best money I spend.", "Tasha B., client"],
    ctaT: "Take cleaning off your list.", ctaS: "Book in 60 seconds. Cancel anytime."
  },
  {
    id: "hauler", name: "Hauler", industry: "Moving company", cat: "Home & trades",
    blurb: "A confident movers site with a quote calculator, packing services and live crew tracking.",
    fh: "'Space Grotesk',sans-serif", fb: "'Outfit',sans-serif", hw: 700, r: 14, layout: "split",
    pal: [
      { bg: "#FFF3E6", fg: "#27180B", mu: "#7B6654", ac: "#F2660F", acfg: "#FFFFFF", sf: "#FFFFFF", hi: "#F2660F" },
      { bg: "#EDF3FF", fg: "#0E1F47", mu: "#5A6A91", ac: "#1E48C8", acfg: "#FFFFFF", sf: "#FFFFFF", hi: "#1E48C8" },
      { bg: "#1B140E", fg: "#FBEEDD", mu: "#B8A692", ac: "#FF8A3D", acfg: "#1B140E", sf: "#271D15", hi: "#FF8A3D" }
    ],
    art: { kind: "grid", c: ["#5A3B22", "#F2660F", "#FFD2AE"] },
    brand: "Hauler Moving Co.", nav: ["Local moves", "Long distance", "Packing", "Pricing"], cta: "Get a quote",
    kicker: "Local & long-distance · Fully insured",
    title: "Moving day, <em>minus the stress.</em>",
    sub: "Careful crews, padded trucks and a price that doesn't change when the last box comes off.",
    b1: "Get my moving quote", b2: "How pricing works",
    stats: [["9,400", "Moves completed"], ["99.2%", "Claim-free"], ["2 hr", "Minimum"]],
    feats: [["Guaranteed quotes", "The price we quote is the price you pay."], ["Full packing", "Boxes, wrap and labels handled."], ["Track your truck", "Live updates on moving day."]],
    secTitle: "Ways we help", items: "cards",
    list: [["Apartment move", "2 movers and a truck", "$129/hr"], ["House move", "3 to 4 movers, any size", "$189/hr"], ["Pack & move", "We box everything up first", "Custom quote"]],
    quote: ["Not a scratch on anything, and they finished an hour under the estimate.", "Devon M., customer"],
    ctaT: "Where are you headed?", ctaS: "Get a guaranteed quote in two minutes."
  },
  {
    id: "coat", name: "Coat", industry: "Painting", cat: "Home & trades",
    blurb: "A colorful painter site with a color-consult booking flow and a room-by-room project gallery.",
    fh: "'Fraunces',serif", fb: "'Geist',sans-serif", hw: 600, r: 30, layout: "center",
    pal: [
      { bg: "#FBF6EF", fg: "#2A2622", mu: "#756E66", ac: "#2F6F5E", acfg: "#FFFFFF", sf: "#FFFFFF", hi: "#D9773B" },
      { bg: "#F1F3FA", fg: "#1E2440", mu: "#636A88", ac: "#3E4FBF", acfg: "#FFFFFF", sf: "#FFFFFF", hi: "#E0607E" },
      { bg: "#232021", fg: "#F6EFE6", mu: "#ADA59B", ac: "#E9B44C", acfg: "#232021", sf: "#2F2B2C", hi: "#E9B44C" }
    ],
    art: { kind: "soft", c: ["#8FB7A9", "#D9773B", "#F3DEC6"] },
    brand: "Coat & Co. Painters", nav: ["Interior", "Exterior", "Cabinets", "Gallery"], cta: "Free estimate",
    kicker: "Interior · Exterior · Cabinet refinishing",
    title: "Fresh color. <em>Flawless</em> lines.",
    sub: "Tidy, careful painters who protect your floors, show up on time and finish when promised.",
    b1: "Get a free estimate", b2: "See our work",
    stats: [["1,800", "Homes painted"], ["3 yr", "Finish warranty"], ["Free", "Color consult"]],
    feats: [["Color help included", "A designer helps you choose."], ["Clean job sites", "Covered, taped and swept daily."], ["Written warranty", "Three years on every job."]],
    secTitle: "Recent rooms", items: "gallery",
    list: [["Sage kitchen", "", ""], ["Navy study", "", ""], ["Cream exterior", "", ""], ["Blush nursery", "", ""], ["Charcoal cabinets", "", ""], ["Coastal porch", "", ""]],
    quote: ["The lines are razor sharp and they finished a day early.", "Sofia G., homeowner"],
    ctaT: "Ready for a new look?", ctaS: "Free estimate and color consult this week."
  },

  /* ---------------- Food & drink ---------------- */
  {
    id: "slice", name: "Slice", industry: "Pizzeria", cat: "Food & drink",
    blurb: "A punchy pizzeria site with online ordering, deals and delivery tracking.",
    fh: "'Archivo Black',sans-serif", fb: "'Outfit',sans-serif", hw: 400, r: 16, layout: "split", up: true,
    pal: [
      { bg: "#FFF1DC", fg: "#2B1206", mu: "#7D5B48", ac: "#D62B1F", acfg: "#FFFFFF", sf: "#FFFFFF", hi: "#D62B1F" },
      { bg: "#12110F", fg: "#FFF1DC", mu: "#B5A691", ac: "#FFB703", acfg: "#12110F", sf: "#1E1C19", hi: "#FFB703" },
      { bg: "#E9F4E4", fg: "#18301A", mu: "#557058", ac: "#18301A", acfg: "#FFF1DC", sf: "#FFFFFF", hi: "#D62B1F" }
    ],
    art: { kind: "glow", c: ["#7A1F12", "#F2542D", "#FFD08A"] },
    brand: "SLICE HOUSE", nav: ["Menu", "Deals", "Catering", "Locations"], cta: "Order now",
    kicker: "Wood-fired · Open till midnight",
    title: "Hot pizza. <em>Fast.</em>",
    sub: "Hand-stretched dough, proper mozzarella and delivery in 30 minutes or less.",
    b1: "Start my order", b2: "See the menu",
    stats: [["30 min", "Delivery"], ["72 hr", "Slow-proofed dough"], ["2-for-1", "Tuesdays"]],
    feats: [["Order in three taps", "Saved favorites and reorders."], ["Track it live", "From oven to doorstep."], ["Party packs", "Feed ten from $69."]],
    secTitle: "Fan favorites", items: "menu",
    list: [["Margherita", "San Marzano, basil, fior di latte", "$14"], ["Hot honey pepperoni", "Cup-and-char pepperoni", "$17"], ["White truffle", "Ricotta, mushroom, truffle oil", "$19"], ["The garden", "Roasted veg, pesto", "$16"], ["Garlic knots", "Six, with marinara", "$7"], ["Tiramisu", "Made in-house", "$8"]],
    quote: ["Best crust in the city and it always shows up hot.", "Andre W., regular"],
    ctaT: "Hungry yet?", ctaS: "Order online and get free garlic knots on your first pie."
  },
  {
    id: "hopyard", name: "Hopyard", industry: "Brewery & taproom", cat: "Food & drink",
    blurb: "A craft brewery site with a live tap list, events calendar and can-release sign-ups.",
    fh: "'Bricolage Grotesque',sans-serif", fb: "'Space Grotesk',sans-serif", hw: 800, r: 8, layout: "full",
    pal: [
      { bg: "#1C1A14", fg: "#F6EDD8", mu: "#B4A88D", ac: "#E9A820", acfg: "#1C1A14", sf: "#27241C", hi: "#E9A820" },
      { bg: "#F3EBD8", fg: "#26301F", mu: "#69705B", ac: "#3C5A2A", acfg: "#F3EBD8", sf: "#FBF6EA", hi: "#B5651D" },
      { bg: "#101A1C", fg: "#E8F1EE", mu: "#8FA5A3", ac: "#6FCF97", acfg: "#101A1C", sf: "#182628", hi: "#6FCF97" }
    ],
    art: { kind: "glow", c: ["#4A3410", "#E9A820", "#FFE2A0"] },
    brand: "Hopyard Brewing", nav: ["On tap", "Events", "Cans", "Visit"], cta: "See what's on tap",
    kicker: "Small-batch beer · Dog-friendly patio",
    title: "Brewed here. <em>Poured fresh.</em>",
    sub: "Sixteen rotating taps, food trucks every weekend and a patio made for long afternoons.",
    b1: "See the tap list", b2: "Upcoming events",
    stats: [["16", "Rotating taps"], ["Fri–Sun", "Food trucks"], ["2019", "Brewing since"]],
    feats: [["Live tap list", "Updated the moment a keg kicks."], ["Can releases", "Reserve online, pick up Saturday."], ["Book the barrel room", "Private parties up to 60."]],
    secTitle: "On tap now", items: "menu",
    list: [["Dockside Lager", "Crisp, clean · 4.8%", "$7"], ["Hazy Harbor IPA", "Citra, Mosaic · 6.7%", "$8"], ["Night Tide Stout", "Coffee, cocoa · 7.2%", "$8"], ["Peach Farmhouse", "Tart, bright · 5.4%", "$8"], ["Low Tide Pils", "Noble hops · 5.0%", "$7"], ["Flight of four", "Pick any taps", "$12"]],
    quote: ["Great beer, better people. Our dog has a favorite bartender.", "Kelsey R., regular"],
    ctaT: "Pull up a stool.", ctaS: "Open Wednesday to Sunday. Trivia every Thursday."
  },
  {
    id: "curbside", name: "Curbside", industry: "Food truck", cat: "Food & drink",
    blurb: "A bright, mobile-first food truck site with this week's locations, the menu and catering requests.",
    fh: "'Bricolage Grotesque',sans-serif", fb: "'Outfit',sans-serif", hw: 800, r: 22, layout: "center",
    pal: [
      { bg: "#FFE94A", fg: "#1B1B1B", mu: "#5E5A2E", ac: "#1B1B1B", acfg: "#FFE94A", sf: "#FFF4A0", hi: "#E63946" },
      { bg: "#FDEDE4", fg: "#2A1620", mu: "#7C6470", ac: "#E63946", acfg: "#FFFFFF", sf: "#FFFFFF", hi: "#E63946" },
      { bg: "#12261E", fg: "#F2F7E6", mu: "#9BB3A6", ac: "#C6F432", acfg: "#12261E", sf: "#1B3429", hi: "#C6F432" }
    ],
    art: { kind: "dots", c: ["#FF8A5B", "#E63946", "#FFD166"] },
    brand: "Curbside Tacos", nav: ["Menu", "Find the truck", "Catering", "About"], cta: "Where today?",
    kicker: "Street tacos · Made to order",
    title: "Follow the truck. <em>Find the tacos.</em>",
    sub: "Fresh tortillas, slow-braised fillings and a new parking spot every day of the week.",
    b1: "Find us today", b2: "Book catering",
    stats: [["5", "Stops a week"], ["3 min", "Order to window"], ["150+", "Events catered"]],
    feats: [["Weekly schedule", "Always know where we're parked."], ["Order ahead", "Skip the lunch line."], ["We cater", "Weddings, offices and block parties."]],
    secTitle: "This week's stops", items: "schedule", schedBtn: "Map",
    list: [["Mon 11–2", "Harbor Park", "Corner of Bay & 3rd"], ["Wed 11–2", "Tech Center", "Lot B by the fountain"], ["Fri 5–9", "Hopyard Brewing", "Patio service"], ["Sat 10–2", "Farmers market", "Stall 14"]],
    quote: ["I plan my Wednesdays around this truck. The birria is unreal.", "Luis P., regular"],
    ctaT: "Feeding a crowd?", ctaS: "Catering from 25 to 500 guests. Get a quote today."
  },
  {
    id: "nightcap", name: "Nightcap", industry: "Cocktail bar", cat: "Food & drink",
    blurb: "A dark, intimate bar site with a seasonal cocktail list, reservations and private bookings.",
    fh: "'Instrument Serif',serif", fb: "'Geist',sans-serif", hw: 400, r: 2, layout: "editorial",
    pal: [
      { bg: "#120E12", fg: "#F3E9E2", mu: "#A8999A", ac: "#D98F6C", acfg: "#120E12", sf: "#1D171D", hi: "#D98F6C" },
      { bg: "#0D1512", fg: "#EAF0E8", mu: "#94A39A", ac: "#C9B46A", acfg: "#0D1512", sf: "#16211C", hi: "#C9B46A" },
      { bg: "#F4EDE4", fg: "#231A1D", mu: "#74666A", ac: "#231A1D", acfg: "#F4EDE4", sf: "#EBE1D5", hi: "#A4553A" }
    ],
    art: { kind: "glow", c: ["#3A1D2A", "#D98F6C", "#FFD9B8"] },
    brand: "Nightcap", nav: ["Cocktails", "Reserve", "Private events", "Visit"], cta: "Reserve",
    kicker: "Cocktails & small plates · Open late",
    title: "One more, <em>done right.</em>",
    sub: "Thirty seats, candlelight and a cocktail list that changes with the season.",
    b1: "Reserve a table", b2: "See the list",
    stats: [["30", "Seats"], ["Thu–Sat", "Live jazz"], ["2 am", "Last call"]],
    feats: [["Seasonal list", "New drinks every eight weeks."], ["Reserve online", "Tables held for fifteen minutes."], ["The back room", "Private parties up to twenty."]],
    secTitle: "This season", items: "menu",
    list: [["Smoked old fashioned", "Bourbon, demerara, cherry wood", "$16"], ["Garden gimlet", "Gin, basil, cucumber, lime", "$15"], ["Midnight espresso", "Vodka, cold brew, amaro", "$16"], ["Paper lantern", "Mezcal, yuzu, chili honey", "$17"], ["Zero-proof spritz", "Bitter orange, tonic", "$11"], ["Charred olives", "Citrus, rosemary", "$9"]],
    quote: ["The kind of bar you want to keep secret. Sorry, everyone.", "The Local Weekly"],
    ctaT: "Your seat at the bar.", ctaS: "Reservations open two weeks out."
  },
  {
    id: "scoop", name: "Scoop", industry: "Ice cream & desserts", cat: "Food & drink",
    blurb: "A sweet, pastel dessert-shop site with rotating flavors, cake pre-orders and party bookings.",
    fh: "'Bricolage Grotesque',sans-serif", fb: "'Outfit',sans-serif", hw: 800, r: 32, layout: "center",
    pal: [
      { bg: "#FFE9F0", fg: "#5A1E3A", mu: "#93627A", ac: "#F0508A", acfg: "#FFFFFF", sf: "#FFF6F9", hi: "#F0508A" },
      { bg: "#E6F7F5", fg: "#134A47", mu: "#5A8380", ac: "#18A999", acfg: "#FFFFFF", sf: "#F4FCFB", hi: "#FF8552" },
      { bg: "#FFF6D6", fg: "#4A3208", mu: "#8A7446", ac: "#4A3208", acfg: "#FFF6D6", sf: "#FFFBEA", hi: "#F0508A" }
    ],
    art: { kind: "petal", c: ["#FFC2D6", "#F0508A", "#FFF3F7"] },
    brand: "Scoop Shop", nav: ["Flavors", "Cakes", "Parties", "Visit"], cta: "Order a cake",
    kicker: "Small-batch ice cream · Made on site",
    title: "Life's short. <em>Get the double.</em>",
    sub: "Twenty-four flavors churned in-house, with new ones every Friday.",
    b1: "See today's flavors", b2: "Book a party",
    stats: [["24", "Flavors daily"], ["Fridays", "New drops"], ["Vegan", "Options always"]],
    feats: [["Flavor of the week", "Vote for what we churn next."], ["Ice cream cakes", "Order online, ready in 48 hours."], ["Party room", "Sundae bars for up to 20 kids."]],
    secTitle: "In the case today", items: "products",
    list: [["Salted honeycomb", "Best seller", "$5"], ["Strawberry shortcake", "Seasonal", "$5"], ["Dark chocolate sorbet", "Vegan", "$5"], ["Brown butter pecan", "Classic", "$5"]],
    quote: ["My kids ask to come here every single day. Honestly, so do I.", "Rachel N., parent"],
    ctaT: "Celebrate with a cake.", ctaS: "Custom ice cream cakes ready in 48 hours."
  },
  {
    id: "platter", name: "Platter", industry: "Catering", cat: "Food & drink",
    blurb: "A polished catering site with sample menus, event galleries and a guest-count quote form.",
    fh: "'Playfair Display',serif", fb: "'Geist',sans-serif", hw: 500, r: 6, layout: "dash", widget: "form",
    pal: [
      { bg: "#FAF6F0", fg: "#28231C", mu: "#746B5E", ac: "#7A5C2E", acfg: "#FFFFFF", sf: "#FFFFFF", hi: "#7A5C2E" },
      { bg: "#F0F4EE", fg: "#1F2B1F", mu: "#667263", ac: "#39532F", acfg: "#FFFFFF", sf: "#FFFFFF", hi: "#B8792E" },
      { bg: "#1A1714", fg: "#F5EDE0", mu: "#AA9F8E", ac: "#D8B679", acfg: "#1A1714", sf: "#25211C", hi: "#D8B679" }
    ],
    art: { kind: "soft", c: ["#B79A6C", "#7A5C2E", "#EFE3CF"] },
    brand: "Platter & Vine Catering", nav: ["Menus", "Weddings", "Corporate", "Gallery"], cta: "Request a quote",
    kicker: "Weddings · Corporate · Private dinners",
    title: "Food your guests will <em>talk about.</em>",
    sub: "Seasonal menus, calm service and a team that handles everything from rentals to cleanup.",
    b1: "Request a quote", b2: "View sample menus",
    stats: [["900+", "Events served"], ["10–1,000", "Guests"], ["Free", "Tastings"]],
    feats: [["Custom menus", "Built around your tastes and budget."], ["Full service", "Staff, bar, rentals and cleanup."], ["Dietary friendly", "Vegan, gluten-free and halal options."]],
    secTitle: "Popular packages", items: "cards",
    list: [["Cocktail reception", "Passed bites and stations", "From $38/guest"], ["Plated dinner", "Three courses, full service", "From $72/guest"], ["Office lunch", "Drop-off or buffet", "From $16/guest"]],
    quote: ["Guests are still asking about the short rib six months later.", "Amelia & Jon, wedding clients"],
    ctaT: "Tell us about your event.", ctaS: "Custom proposal within two business days."
  },

  /* ---------------- Health & wellness ---------------- */
  {
    id: "stillwater", name: "Stillwater", industry: "Yoga & pilates", cat: "Health & wellness",
    blurb: "A calm, minimal studio site with a class schedule, intro offer and membership sign-up.",
    fh: "'Cormorant Garamond',serif", fb: "'Outfit',sans-serif", hw: 500, r: 40, layout: "center",
    pal: [
      { bg: "#F4F1EA", fg: "#2F3A33", mu: "#6F7A72", ac: "#5E7A68", acfg: "#FFFFFF", sf: "#FBF9F4", hi: "#B98A5E" },
      { bg: "#F5EEF0", fg: "#3B2A33", mu: "#7B6972", ac: "#8A5A70", acfg: "#FFFFFF", sf: "#FCF7F8", hi: "#8A5A70" },
      { bg: "#1F2723", fg: "#EEF0E8", mu: "#9EA9A1", ac: "#C9D8B6", acfg: "#1F2723", sf: "#2A342F", hi: "#C9D8B6" }
    ],
    art: { kind: "sun", c: ["#C6D3C0", "#5E7A68", "#F5EBDD"] },
    brand: "Stillwater Yoga", nav: ["Classes", "Teachers", "Pricing", "Studio"], cta: "Try a class",
    kicker: "Yoga · Pilates · Breathwork",
    title: "Slow down. <em>Breathe deeper.</em>",
    sub: "Small, unhurried classes for every body, in a studio filled with morning light.",
    b1: "Start for $29", b2: "View schedule",
    stats: [["35", "Classes a week"], ["14", "Students max"], ["$29", "Two-week intro"]],
    feats: [["All levels", "Every pose has an option."], ["Book in the app", "Reserve or cancel in seconds."], ["Mats provided", "Just bring yourself."]],
    secTitle: "Today's classes", items: "schedule",
    list: [["6:30 AM", "Sunrise flow", "Maya · 60 min"], ["9:00 AM", "Reformer pilates", "Jo · 50 min"], ["12:00 PM", "Lunch reset", "Ines · 45 min"], ["6:00 PM", "Yin & restore", "Maya · 75 min"]],
    quote: ["The only hour of my day when my phone doesn't exist.", "Claire D., member"],
    ctaT: "Two weeks, unlimited, $29.", ctaS: "New students only. No commitment."
  },
  {
    id: "align", name: "Align", industry: "Chiropractic & physio", cat: "Health & wellness",
    blurb: "A clean, clinical site for chiropractors and physical therapists with booking and treatment guides.",
    fh: "'Space Grotesk',sans-serif", fb: "'Geist',sans-serif", hw: 700, r: 14, layout: "dash", widget: "booking",
    pal: [
      { bg: "#F3F7FA", fg: "#12283A", mu: "#5A6E7F", ac: "#1B6FA8", acfg: "#FFFFFF", sf: "#FFFFFF", hi: "#1B6FA8" },
      { bg: "#F2F8F4", fg: "#14301F", mu: "#5B7365", ac: "#2A8C5A", acfg: "#FFFFFF", sf: "#FFFFFF", hi: "#2A8C5A" },
      { bg: "#0E1A24", fg: "#E8F0F6", mu: "#8D9FAE", ac: "#5CC0F0", acfg: "#0E1A24", sf: "#172733", hi: "#5CC0F0" }
    ],
    art: { kind: "lines", c: ["#D4E4F0", "#1B6FA8", "#EDF4F9"] },
    brand: "Align Spine & Sport", nav: ["Treatments", "Conditions", "Team", "New patients"], cta: "Book a visit",
    kicker: "Chiropractic · Physical therapy · Massage",
    title: "Move without pain <em>again.</em>",
    sub: "Evidence-based care with a clear plan, one-on-one sessions and no endless visit packages.",
    b1: "Book an evaluation", b2: "What we treat",
    stats: [["45 min", "One-on-one visits"], ["8", "Avg. visits to discharge"], ["4.9", "600 reviews"]],
    feats: [["A plan with an end", "We aim to graduate you."], ["Direct billing", "Most insurers accepted."], ["Home program", "Video exercises on your phone."]],
    secTitle: "How we help", items: "cards",
    list: [["Back & neck pain", "Adjustments and rehab", "Most plans covered"], ["Sports injuries", "Return-to-play programs", "From $95"], ["Massage therapy", "30, 60 or 90 minutes", "From $60"]],
    quote: ["Three months of pain, gone in five visits. They gave me my runs back.", "Tom E., patient"],
    ctaT: "Feel better, sooner.", ctaS: "New patient evaluations available this week."
  },
  {
    id: "solace", name: "Solace", industry: "Therapy & counseling", cat: "Health & wellness",
    blurb: "A gentle, reassuring practice site with therapist matching, specialties and secure intake.",
    fh: "'Fraunces',serif", fb: "'Outfit',sans-serif", hw: 400, r: 20, layout: "split",
    pal: [
      { bg: "#F6F2EC", fg: "#2E3A40", mu: "#6C777C", ac: "#3F6C7A", acfg: "#FFFFFF", sf: "#FFFFFF", hi: "#C4855A" },
      { bg: "#F3F1F8", fg: "#2D2A45", mu: "#6E6B87", ac: "#5B5596", acfg: "#FFFFFF", sf: "#FFFFFF", hi: "#5B5596" },
      { bg: "#1D2629", fg: "#EEF0EC", mu: "#9CA8A9", ac: "#9FCBC4", acfg: "#1D2629", sf: "#273336", hi: "#9FCBC4" }
    ],
    art: { kind: "soft", c: ["#A9C3C6", "#C4855A", "#F0E4D6"] },
    brand: "Solace Counseling", nav: ["Therapists", "Specialties", "Fees", "Get started"], cta: "Book a free call",
    kicker: "Individual · Couples · Teens",
    title: "A quiet place to <em>figure things out.</em>",
    sub: "Licensed therapists, in person or online, matched to what you're going through.",
    b1: "Book a free 15-minute call", b2: "Meet our therapists",
    stats: [["12", "Licensed therapists"], ["This week", "Openings available"], ["In person", "Or online"]],
    feats: [["Thoughtful matching", "We pair you by need, not by calendar."], ["Private & secure", "HIPAA-compliant video and forms."], ["Insurance friendly", "Superbills and most major plans."]],
    secTitle: "What we help with", items: "cards",
    list: [["Anxiety & stress", "Tools that work in real life", "50-minute sessions"], ["Couples therapy", "Communication and repair", "75-minute sessions"], ["Teen counseling", "Ages 13 to 18", "Parent check-ins included"]],
    quote: ["I put this off for years. The first call made it feel possible.", "Client, age 34"],
    ctaT: "Take the first small step.", ctaS: "A free, no-pressure call to find the right fit."
  },
  {
    id: "aura", name: "Aura", industry: "Med spa & aesthetics", cat: "Health & wellness",
    blurb: "A luxe med-spa site with treatment menus, membership perks and consultation booking.",
    fh: "'Instrument Serif',serif", fb: "'Outfit',sans-serif", hw: 400, r: 999, layout: "editorial",
    pal: [
      { bg: "#F8F2EE", fg: "#33262A", mu: "#7E6E72", ac: "#33262A", acfg: "#F8F2EE", sf: "#F0E6E0", hi: "#B4836B" },
      { bg: "#EEF1EF", fg: "#22302B", mu: "#68756F", ac: "#22302B", acfg: "#EEF1EF", sf: "#E2E8E4", hi: "#7F9A8C" },
      { bg: "#191416", fg: "#F6EBE6", mu: "#AD9C9E", ac: "#E3BBA5", acfg: "#191416", sf: "#241D20", hi: "#E3BBA5" }
    ],
    art: { kind: "petal", c: ["#E8CFC2", "#B4836B", "#FBF3EE"] },
    brand: "Aura Aesthetics", nav: ["Treatments", "Memberships", "Results", "Book"], cta: "Book a consult",
    kicker: "Injectables · Skin · Laser",
    title: "Subtle work. <em>Radiant</em> results.",
    sub: "Physician-led treatments designed to make you look rested, never done.",
    b1: "Book a consultation", b2: "Explore treatments",
    stats: [["MD-led", "Every treatment"], ["15k+", "Treatments performed"], ["4.9", "Client rating"]],
    feats: [["Natural results", "Conservative plans, honest advice."], ["Glow membership", "Monthly facials and member pricing."], ["Free consults", "Meet your provider first."]],
    secTitle: "Signature treatments", items: "products",
    list: [["HydraGlow facial", "60 minutes", "$185"], ["Wrinkle relaxers", "Per area", "From $240"], ["Laser resurfacing", "Series of three", "$1,200"], ["Lip enhancement", "Half or full syringe", "From $350"]],
    quote: ["Nobody can tell what I had done. They just say I look well rested.", "Dana F., client"],
    ctaT: "Your skin, at its best.", ctaS: "Complimentary consultations, six days a week."
  },
  {
    id: "fade", name: "Fade", industry: "Barbershop", cat: "Health & wellness",
    blurb: "A sharp, old-school-meets-modern barbershop site with barber profiles and chair booking.",
    fh: "'Anton',sans-serif", fb: "'Outfit',sans-serif", hw: 400, r: 0, layout: "full", up: true,
    pal: [
      { bg: "#F1ECE2", fg: "#161412", mu: "#655F57", ac: "#161412", acfg: "#F1ECE2", sf: "#FFFFFF", hi: "#B3261E" },
      { bg: "#121212", fg: "#F1ECE2", mu: "#9F9A92", ac: "#C8A45A", acfg: "#121212", sf: "#1C1C1C", hi: "#C8A45A" },
      { bg: "#0F1E2E", fg: "#EEF2F6", mu: "#91A1B3", ac: "#E5484D", acfg: "#FFFFFF", sf: "#172A3E", hi: "#E5484D" }
    ],
    art: { kind: "stripes", c: ["#1B1917", "#B3261E", "#3A3632"] },
    brand: "FADE & CO.", nav: ["Services", "Barbers", "Shop", "Visit"], cta: "Book a chair",
    kicker: "Cuts · Fades · Hot towel shaves",
    title: "Look sharp. <em>Stay sharp.</em>",
    sub: "Walk-ins welcome, but the good chairs go fast. Book your barber online.",
    b1: "Book your cut", b2: "Meet the barbers",
    stats: [["7", "Barbers"], ["Open", "7 days"], ["15 yr", "On Main Street"]],
    feats: [["Pick your barber", "See real availability."], ["On-time chairs", "We run on schedule."], ["Members save", "Two cuts a month from $55."]],
    secTitle: "Services", items: "menu",
    list: [["Classic cut", "Scissor or clipper, hot towel finish", "$32"], ["Skin fade", "Detailed blend, line-up", "$38"], ["Cut & beard", "Shape, trim and oil", "$48"], ["Hot towel shave", "Straight razor", "$35"], ["Kids cut", "12 and under", "$22"], ["Beard trim", "Line-up included", "$18"]],
    quote: ["Same barber for six years. Wouldn't trust anyone else with a fade.", "Isaiah M., regular"],
    ctaT: "Next chair's yours.", ctaS: "Book online in thirty seconds."
  },
  {
    id: "fetch", name: "Fetch", industry: "Veterinary clinic", cat: "Health & wellness",
    blurb: "A warm, modern vet clinic site with online appointments, wellness plans and a pet-parent portal.",
    fh: "'Bricolage Grotesque',sans-serif", fb: "'Geist',sans-serif", hw: 700, r: 22, layout: "dash", widget: "booking",
    pal: [
      { bg: "#F1F8F6", fg: "#173B36", mu: "#5B7A75", ac: "#1F8A7A", acfg: "#FFFFFF", sf: "#FFFFFF", hi: "#F28C5A" },
      { bg: "#FFF5EA", fg: "#3C2413", mu: "#836A58", ac: "#F28C5A", acfg: "#3C2413", sf: "#FFFFFF", hi: "#1F8A7A" },
      { bg: "#10242A", fg: "#E7F3F1", mu: "#8CA8A6", ac: "#58D0BC", acfg: "#10242A", sf: "#193239", hi: "#FFAE85" }
    ],
    art: { kind: "dots", c: ["#B9E3DB", "#1F8A7A", "#FFE0CC"] },
    brand: "Fetch Veterinary Care", nav: ["Services", "Wellness plans", "Our vets", "Emergencies"], cta: "Book a visit",
    kicker: "Dogs · Cats · Small pets",
    title: "Care they'll <em>wag</em> about.",
    sub: "Same-day sick visits, gentle handling and vets who explain everything in plain English.",
    b1: "Book an appointment", b2: "Wellness plans",
    stats: [["Same day", "Sick visits"], ["Fear-free", "Certified team"], ["$39/mo", "Wellness plans"]],
    feats: [["Online booking", "Pick a time that works for you."], ["Text your vet", "Questions answered within hours."], ["Transparent estimates", "Costs explained before treatment."]],
    secTitle: "Services", items: "cards",
    list: [["Wellness exam", "Nose-to-tail checkup", "$65"], ["Vaccines", "Core and lifestyle", "From $28"], ["Dental cleaning", "With digital X-rays", "From $320"]],
    quote: ["They sat on the floor with our nervous dog for twenty minutes. That's care.", "Hannah & Moose"],
    ctaT: "New here? Welcome.", ctaS: "First exam is free for newly adopted pets."
  },

  /* ---------------- Professional ---------------- */
  {
    id: "summit", name: "Summit", industry: "Business consulting", cat: "Professional",
    blurb: "A confident consultancy site with service pillars, case studies and a discovery-call funnel.",
    fh: "'Fraunces',serif", fb: "'Geist',sans-serif", hw: 500, r: 8, layout: "split",
    pal: [
      { bg: "#F5F3EE", fg: "#18222D", mu: "#5F6A75", ac: "#18222D", acfg: "#FFFFFF", sf: "#FFFFFF", hi: "#C6672D" },
      { bg: "#EFF3F8", fg: "#14233F", mu: "#5B6883", ac: "#2B55C4", acfg: "#FFFFFF", sf: "#FFFFFF", hi: "#2B55C4" },
      { bg: "#12171D", fg: "#EEF0F2", mu: "#929BA6", ac: "#E98B4E", acfg: "#12171D", sf: "#1B222B", hi: "#E98B4E" }
    ],
    art: { kind: "arch", c: ["#18222D", "#C6672D", "#D5DCE3"] },
    brand: "Summit Advisory", nav: ["Services", "Case studies", "Approach", "About"], cta: "Book a call",
    kicker: "Strategy · Operations · Growth",
    title: "Clear plans for <em>complicated</em> problems.",
    sub: "Senior advisors who work alongside your team and stay until the numbers move.",
    b1: "Book a discovery call", b2: "Read case studies",
    stats: [["120+", "Engagements"], ["3.4×", "Avg. client ROI"], ["92%", "Repeat clients"]],
    feats: [["Senior team only", "No juniors learning on your dime."], ["Fixed-scope pricing", "Know the cost up front."], ["Results you can measure", "Every project has a scoreboard."]],
    secTitle: "Where we help", items: "cards",
    list: [["Growth strategy", "Pricing, positioning, new markets", "6 to 10 weeks"], ["Operations", "Process, systems and hiring plans", "8 to 12 weeks"], ["Fractional COO", "Hands-on leadership", "Monthly retainer"]],
    quote: ["They found $1.2M in margin we were leaving on the table in the first month.", "CEO, regional logistics firm"],
    ctaT: "What's the one thing in your way?", ctaS: "A 30-minute call. Useful either way."
  },
  {
    id: "atelier", name: "Atelier", industry: "Architecture & interiors", cat: "Professional",
    blurb: "A spare, gallery-style studio site that lets large project imagery do the talking.",
    fh: "'Syne',sans-serif", fb: "'Geist',sans-serif", hw: 700, r: 0, layout: "editorial",
    pal: [
      { bg: "#FFFFFF", fg: "#121212", mu: "#6F6F6F", ac: "#121212", acfg: "#FFFFFF", sf: "#F3F2EE", hi: "#121212" },
      { bg: "#EAE6DF", fg: "#2A2622", mu: "#746E66", ac: "#2A2622", acfg: "#EAE6DF", sf: "#DFDAD1", hi: "#9A5B3C" },
      { bg: "#111315", fg: "#EDEBE7", mu: "#8F9194", ac: "#EDEBE7", acfg: "#111315", sf: "#1A1D20", hi: "#C9B48F" }
    ],
    art: { kind: "house", c: ["#A9B4BC", "#D8CDBB", "#5D6870"] },
    brand: "ATELIER NORD", nav: ["Projects", "Studio", "Process", "Contact"], cta: "Start a project",
    kicker: "Architecture · Interiors · Landscape",
    title: "Quiet buildings for <em>loud</em> lives.",
    sub: "Residential and hospitality design rooted in light, material and place.",
    b1: "Start a project", b2: "View projects",
    stats: [["60+", "Built projects"], ["11", "Design awards"], ["Est.", "2009"]],
    feats: [["Design-led", "Every line has a reason."], ["Build partners", "Trusted contractors we know well."], ["Start to keys", "One team from sketch to move-in."]],
    secTitle: "Selected projects", items: "gallery",
    list: [["Dune House", "", ""], ["Marsh Pavilion", "", ""], ["Cedar Loft", "", ""], ["Harbor Hotel", "", ""], ["Courtyard Residence", "", ""], ["Studio Annex", "", ""]],
    quote: ["They listened for a month before drawing anything. The house fits us exactly.", "Residential client"],
    ctaT: "Have a site in mind?", ctaS: "We take on six new projects a year."
  },
  {
    id: "shield", name: "Shield", industry: "Insurance agency", cat: "Professional",
    blurb: "A trustworthy independent-agency site with quick quote forms, coverage guides and claims help.",
    fh: "'Outfit',sans-serif", fb: "'Outfit',sans-serif", hw: 700, r: 12, layout: "dash", widget: "form",
    pal: [
      { bg: "#F2F6FB", fg: "#0F2444", mu: "#58688A", ac: "#1D4ED8", acfg: "#FFFFFF", sf: "#FFFFFF", hi: "#1D4ED8" },
      { bg: "#F4F8F3", fg: "#16301E", mu: "#5E7365", ac: "#1F7A45", acfg: "#FFFFFF", sf: "#FFFFFF", hi: "#1F7A45" },
      { bg: "#0C162A", fg: "#E9EEF8", mu: "#8D9BB5", ac: "#7AA2FF", acfg: "#0C162A", sf: "#14213B", hi: "#7AA2FF" }
    ],
    art: { kind: "orb", c: ["#C5D6F5", "#1D4ED8", "#EBF1FB"] },
    brand: "Shield Insurance Group", nav: ["Home & auto", "Business", "Life", "Claims"], cta: "Get a quote",
    kicker: "Independent agency · 30+ carriers",
    title: "Better coverage. <em>Lower</em> premiums.",
    sub: "We shop more than thirty carriers so you get the right policy at the right price.",
    b1: "Compare my rates", b2: "File a claim",
    stats: [["$640", "Avg. yearly savings"], ["30+", "Carriers compared"], ["1 call", "To a real agent"]],
    feats: [["We shop for you", "One form, dozens of quotes."], ["Local agents", "People who answer the phone."], ["Claims support", "We advocate when it matters."]],
    secTitle: "Coverage", items: "cards",
    list: [["Home & auto", "Bundle and save up to 25%", "Quotes in minutes"], ["Business", "Liability, property, workers' comp", "Custom packages"], ["Life", "Term and whole life", "From $18/mo"]],
    quote: ["Saved $900 a year and my agent actually picks up when I call.", "Brian T., client"],
    ctaT: "Paying too much?", ctaS: "Free rate comparison in about five minutes."
  },
  {
    id: "signal", name: "Signal", industry: "Marketing agency", cat: "Professional",
    blurb: "A loud, modern agency site with gradient energy, results-first case studies and a strategy-call CTA.",
    fh: "'Bricolage Grotesque',sans-serif", fb: "'Space Grotesk',sans-serif", hw: 800, r: 20, layout: "dash", widget: "dash", dashK: ["Leads today", "Ad return", "Revenue"], dashRows: [["Spring promo · Google", "Live"], ["Welcome series · Email", "Sending"]],
    pal: [
      { bg: "#0D0B1A", fg: "#F1EEFF", mu: "#9D97BD", ac: "#FF5C8A", acfg: "#0D0B1A", sf: "#17142B", hi: "#FF5C8A" },
      { bg: "#F6F4FF", fg: "#17123A", mu: "#67628C", ac: "#5B3DF5", acfg: "#FFFFFF", sf: "#FFFFFF", hi: "#5B3DF5" },
      { bg: "#071A17", fg: "#E6FAF4", mu: "#86AFA5", ac: "#2BE3A6", acfg: "#071A17", sf: "#0E2A25", hi: "#2BE3A6" }
    ],
    art: { kind: "mesh", c: ["#FF5C8A", "#5B3DF5", "#FFB86B"] },
    brand: "Signal & Noise", nav: ["Services", "Work", "Results", "About"], cta: "Free strategy call",
    kicker: "Ads · SEO · Content · Email",
    title: "Marketing you can <em>measure.</em>",
    sub: "A senior growth team for brands that are done guessing where the leads come from.",
    b1: "Book a strategy call", b2: "See client results",
    stats: [["$48M", "Client revenue driven"], ["4.2×", "Avg. return on ads"], ["Month-to-month", "No lock-in"]],
    feats: [["Live dashboards", "Every lead and dollar, in real time."], ["No lock-in contracts", "We earn the next month."], ["One senior team", "Strategy and execution together."]],
    secTitle: "Services", items: "cards",
    list: [["Paid ads", "Google, Meta, TikTok", "From $1,500/mo"], ["SEO & content", "Rank for what buyers search", "From $1,200/mo"], ["Email & SMS", "Flows that sell while you sleep", "From $900/mo"]],
    quote: ["Leads doubled in ninety days and I finally understand my own numbers.", "Founder, home services brand"],
    ctaT: "Want a free growth plan?", ctaS: "30 minutes. Three ideas you can use tomorrow."
  },
  {
    id: "compass", name: "Compass", industry: "Financial advisor", cat: "Professional",
    blurb: "A calm, credible wealth-advisory site with planning services, fee transparency and an intro-meeting flow.",
    fh: "'DM Serif Display',serif", fb: "'Geist',sans-serif", hw: 400, r: 6, layout: "split",
    pal: [
      { bg: "#F4F2EC", fg: "#122B2A", mu: "#5D706E", ac: "#12443F", acfg: "#FFFFFF", sf: "#FFFFFF", hi: "#B88A3E" },
      { bg: "#F1F4F9", fg: "#152447", mu: "#5D6A88", ac: "#152447", acfg: "#FFFFFF", sf: "#FFFFFF", hi: "#B88A3E" },
      { bg: "#0E1D1C", fg: "#EEF1EA", mu: "#93A5A1", ac: "#D6B26A", acfg: "#0E1D1C", sf: "#172B29", hi: "#D6B26A" }
    ],
    art: { kind: "lines", c: ["#D9E2DD", "#B88A3E", "#EEF1EC"] },
    brand: "Compass Wealth Partners", nav: ["Planning", "Investing", "Fees", "Our team"], cta: "Schedule a meeting",
    kicker: "Fee-only fiduciary advisors",
    title: "A plan for the life you <em>actually</em> want.",
    sub: "Retirement, investing and tax strategy from advisors who are paid by you, not by products.",
    b1: "Schedule an intro meeting", b2: "How our fees work",
    stats: [["$410M", "Assets advised"], ["Fee-only", "No commissions"], ["97%", "Client retention"]],
    feats: [["Fiduciary, always", "Legally bound to your interest."], ["One clear fee", "No hidden costs or commissions."], ["Your whole picture", "Taxes, estate and insurance together."]],
    secTitle: "How we help", items: "cards",
    list: [["Retirement planning", "Know when, and how much", "Flat annual fee"], ["Investment management", "Low-cost, diversified", "0.75% of assets"], ["Tax strategy", "Keep more of what you earn", "Included"]],
    quote: ["For the first time we know exactly when we can retire.", "Mark & Diane P., clients"],
    ctaT: "Start with a conversation.", ctaS: "A free 45-minute meeting. No sales pitch."
  },

  /* ---------------- Shops & creative ---------------- */
  {
    id: "posy", name: "Posy", industry: "Florist", cat: "Shops & creative",
    blurb: "A romantic florist site with same-day delivery, a seasonal shop and wedding inquiries.",
    fh: "'Cormorant Garamond',serif", fb: "'Outfit',sans-serif", hw: 500, r: 60, layout: "split",
    pal: [
      { bg: "#FBF3EF", fg: "#3D2A2E", mu: "#84706F", ac: "#B5536A", acfg: "#FFFFFF", sf: "#FFFFFF", hi: "#B5536A" },
      { bg: "#F1F4EC", fg: "#2A3626", mu: "#69755F", ac: "#4D6B3C", acfg: "#FFFFFF", sf: "#FFFFFF", hi: "#C77B4A" },
      { bg: "#221A1D", fg: "#F8ECE8", mu: "#B3A1A2", ac: "#F0A6B4", acfg: "#221A1D", sf: "#2E2428", hi: "#F0A6B4" }
    ],
    art: { kind: "petal", c: ["#F3C9CF", "#B5536A", "#FFF4EF"] },
    brand: "Posy Floral Studio", nav: ["Shop", "Weddings", "Subscriptions", "About"], cta: "Send flowers",
    kicker: "Same-day delivery · Order by 1pm",
    title: "Flowers that say it <em>better.</em>",
    sub: "Seasonal, garden-style arrangements made the morning they're delivered.",
    b1: "Shop arrangements", b2: "Wedding flowers",
    stats: [["Same day", "Local delivery"], ["Seasonal", "Stems only"], ["7 day", "Freshness promise"]],
    feats: [["Designer's choice", "Tell us the mood, we'll do the rest."], ["Flower subscriptions", "Fresh stems weekly or monthly."], ["Handwritten notes", "Included with every order."]],
    secTitle: "This week's arrangements", items: "products",
    list: [["The garden party", "Peonies and ranunculus", "$85"], ["Wild meadow", "Seasonal wildflowers", "$65"], ["Classic whites", "Roses and lisianthus", "$95"], ["Petite posy", "Bud vase", "$38"]],
    quote: ["My mom called in tears, the good kind. Delivered in three hours.", "Jenna K., customer"],
    ctaT: "Make someone's day.", ctaS: "Order by 1pm for same-day delivery."
  },
  {
    id: "gild", name: "Gild", industry: "Jewelry", cat: "Shops & creative",
    blurb: "A refined jewelry boutique site with collections, custom ring consultations and care guides.",
    fh: "'Playfair Display',serif", fb: "'Geist',sans-serif", hw: 500, r: 0, layout: "center",
    pal: [
      { bg: "#FBF9F5", fg: "#1F1B16", mu: "#70695F", ac: "#1F1B16", acfg: "#FBF9F5", sf: "#F2EEE6", hi: "#A8842C" },
      { bg: "#0F1412", fg: "#F2EFE8", mu: "#969A94", ac: "#C9A74E", acfg: "#0F1412", sf: "#18201C", hi: "#C9A74E" },
      { bg: "#F5EFF0", fg: "#2D1F26", mu: "#77666D", ac: "#2D1F26", acfg: "#F5EFF0", sf: "#EBE2E4", hi: "#A9667A" }
    ],
    art: { kind: "orb", c: ["#E6D9B8", "#A8842C", "#F8F3E6"] },
    brand: "Gild Fine Jewelry", nav: ["Collections", "Engagement", "Custom", "Care"], cta: "Book an appointment",
    kicker: "Handmade in our studio",
    title: "Pieces made to be <em>passed down.</em>",
    sub: "Recycled gold and ethically sourced stones, designed and finished by hand.",
    b1: "Shop the collection", b2: "Design a custom ring",
    stats: [["100%", "Recycled gold"], ["Lifetime", "Care & resizing"], ["6 wk", "Custom lead time"]],
    feats: [["Made to order", "Crafted for you, never mass produced."], ["Custom design", "Sketch to finished ring in six weeks."], ["Lifetime care", "Free cleaning and resizing."]],
    secTitle: "New pieces", items: "products",
    list: [["Solstice ring", "14k gold, diamond", "$1,480"], ["Tide necklace", "18k gold, pearl", "$620"], ["Ember studs", "Rose gold, garnet", "$340"], ["Signet", "Hand engraved", "$780"]],
    quote: ["They turned my grandmother's stone into the ring I wear every day.", "Olivia S., client"],
    ctaT: "Designing something special?", ctaS: "Book a private appointment in the studio."
  },
  {
    id: "encore", name: "Encore", industry: "Musician & band", cat: "Shops & creative",
    blurb: "A stage-ready artist site with tour dates, music embeds, merch and a booking contact.",
    fh: "'Anton',sans-serif", fb: "'Space Grotesk',sans-serif", hw: 400, r: 4, layout: "full", up: true,
    pal: [
      { bg: "#0B0B0F", fg: "#F5F2FF", mu: "#9A96AE", ac: "#B14CFF", acfg: "#FFFFFF", sf: "#15151D", hi: "#B14CFF" },
      { bg: "#140A0A", fg: "#FFF1EA", mu: "#B59E98", ac: "#FF4A2B", acfg: "#140A0A", sf: "#1F1212", hi: "#FF4A2B" },
      { bg: "#F2EFE9", fg: "#111111", mu: "#666360", ac: "#111111", acfg: "#F2EFE9", sf: "#FFFFFF", hi: "#B14CFF" }
    ],
    art: { kind: "mesh", c: ["#B14CFF", "#FF4A8D", "#3B1E73"] },
    brand: "THE LOW TIDES", nav: ["Tour", "Music", "Merch", "Booking"], cta: "Get tickets",
    kicker: "New album out now",
    title: "Loud songs for <em>quiet towns.</em>",
    sub: "On tour all summer. Stream the new record, then come sing it with us.",
    b1: "See tour dates", b2: "Listen now",
    stats: [["38", "Dates this summer"], ["12M", "Streams"], ["3", "Albums"]],
    feats: [["Tour alerts", "Know when we're near you."], ["Signed vinyl", "Limited pressings in the shop."], ["Book the band", "Festivals, weddings and private shows."]],
    secTitle: "Upcoming shows", items: "schedule", schedBtn: "Tickets",
    list: [["Jun 14", "Norfolk, VA", "The NorVa · Doors 7pm"], ["Jun 20", "Richmond, VA", "The National · Doors 7pm"], ["Jun 27", "Raleigh, NC", "Lincoln Theatre · Low tickets"], ["Jul 5", "Asheville, NC", "The Orange Peel · Doors 8pm"]],
    quote: ["A live show that feels like a house party with a thousand friends.", "Indie Current"],
    ctaT: "Catch us on the road.", ctaS: "Tickets from $25. Kids under 12 free at outdoor shows."
  },
  {
    id: "vow", name: "Vow", industry: "Wedding planner", cat: "Shops & creative",
    blurb: "An elegant planner site with real-wedding galleries, service tiers and an inquiry questionnaire.",
    fh: "'Instrument Serif',serif", fb: "'Outfit',sans-serif", hw: 400, r: 2, layout: "center",
    pal: [
      { bg: "#FAF6F1", fg: "#3A302B", mu: "#827870", ac: "#3A302B", acfg: "#FAF6F1", sf: "#F1EAE1", hi: "#B58A6A" },
      { bg: "#F0F2EF", fg: "#2B332D", mu: "#6D766F", ac: "#55705C", acfg: "#FFFFFF", sf: "#FFFFFF", hi: "#55705C" },
      { bg: "#1E1A19", fg: "#F6EEE6", mu: "#ADA199", ac: "#E2C3A6", acfg: "#1E1A19", sf: "#2A2523", hi: "#E2C3A6" }
    ],
    art: { kind: "soft", c: ["#DCC6B2", "#B58A6A", "#F7EEE4"] },
    brand: "Vow & Veil Events", nav: ["Services", "Real weddings", "About", "Inquire"], cta: "Inquire",
    kicker: "Planning · Design · Coordination",
    title: "Be a guest at your <em>own</em> wedding.",
    sub: "Full-service planning and month-of coordination for couples who want to enjoy every minute.",
    b1: "Check our availability", b2: "See real weddings",
    stats: [["240", "Weddings planned"], ["15", "Dates per year"], ["5.0", "On The Knot"]],
    feats: [["One point of contact", "We manage every vendor."], ["Design boards", "See the whole day before it happens."], ["Day-of calm", "You'll never see a problem."]],
    secTitle: "Real weddings", items: "gallery",
    list: [["Emma & Cole", "", ""], ["Priya & Dev", "", ""], ["Hannah & Will", "", ""], ["Maya & Jo", "", ""], ["Ana & Luke", "", ""], ["Grace & Sam", "", ""]],
    quote: ["I didn't answer a single question on my wedding day. Worth every penny.", "Emma, bride"],
    ctaT: "Tell us about your day.", ctaS: "We take a limited number of weddings each season."
  },
  {
    id: "inkwell", name: "Inkwell", industry: "Tattoo studio", cat: "Shops & creative",
    blurb: "A dark, gallery-led tattoo studio site with artist portfolios, flash and a consult request form.",
    fh: "'Archivo Black',sans-serif", fb: "'Space Grotesk',sans-serif", hw: 400, r: 0, layout: "editorial", up: true,
    pal: [
      { bg: "#0C0C0C", fg: "#F2EEE6", mu: "#96928A", ac: "#F2EEE6", acfg: "#0C0C0C", sf: "#171717", hi: "#D93A2B" },
      { bg: "#EDE8DE", fg: "#141414", mu: "#666158", ac: "#141414", acfg: "#EDE8DE", sf: "#E1DBCF", hi: "#D93A2B" },
      { bg: "#101A17", fg: "#E9F0EA", mu: "#8FA097", ac: "#3FD08F", acfg: "#101A17", sf: "#18261F", hi: "#3FD08F" }
    ],
    art: { kind: "photo", c: ["#3B3B3B", "#D93A2B", "#151515"] },
    brand: "INKWELL TATTOO", nav: ["Artists", "Flash", "Aftercare", "Book"], cta: "Request a consult",
    kicker: "Custom tattoos · By appointment",
    title: "Art you <em>keep.</em>",
    sub: "Five resident artists, every style from fine line to traditional, in a private studio.",
    b1: "Request a consult", b2: "Browse artists",
    stats: [["5", "Resident artists"], ["12 yr", "In the studio"], ["Private", "Rooms"]],
    feats: [["Custom designs", "Drawn for you, never repeated."], ["Clean & licensed", "Hospital-grade sterilization."], ["Free touch-ups", "Within the first year."]],
    secTitle: "Recent work", items: "gallery",
    list: [["Fine line", "", ""], ["Traditional", "", ""], ["Blackwork", "", ""], ["Botanical", "", ""], ["Script", "", ""], ["Color realism", "", ""]],
    quote: ["Six hours in the chair and I'd do it again tomorrow. Unreal detail.", "Nico R., client"],
    ctaT: "Got an idea?", ctaS: "Send references and we'll match you with an artist."
  },
  {
    id: "thread", name: "Thread", industry: "Clothing boutique", cat: "Shops & creative",
    blurb: "A fashion-forward store site with lookbooks, new-arrival drops and size guides.",
    fh: "'Syne',sans-serif", fb: "'Outfit',sans-serif", hw: 700, r: 0, layout: "editorial", up: true,
    pal: [
      { bg: "#F4F0EA", fg: "#191715", mu: "#6C665F", ac: "#191715", acfg: "#F4F0EA", sf: "#E9E3DA", hi: "#C4472B" },
      { bg: "#E8ECEF", fg: "#14202A", mu: "#5F6C77", ac: "#14202A", acfg: "#E8ECEF", sf: "#DCE2E6", hi: "#2F6FDB" },
      { bg: "#141414", fg: "#F4F0EA", mu: "#96928C", ac: "#F4F0EA", acfg: "#141414", sf: "#1E1E1E", hi: "#E8B84A" }
    ],
    art: { kind: "photo", c: ["#8C7B6B", "#D9C3A5", "#3A322B"] },
    brand: "THREAD SUPPLY", nav: ["New in", "Women", "Men", "Lookbook"], cta: "Bag (0)",
    kicker: "Spring collection · Just dropped",
    title: "Wear it <em>forever.</em>",
    sub: "Well-cut essentials in natural fabrics, made in small runs so nothing goes to waste.",
    b1: "Shop new arrivals", b2: "View the lookbook",
    stats: [["Free", "Shipping over $100"], ["30 day", "Returns"], ["Small-batch", "Production"]],
    feats: [["Made to last", "Heavyweight fabrics and real stitching."], ["Fit finder", "Get your size right the first time."], ["Repairs for life", "Send it back, we'll mend it."]],
    secTitle: "New arrivals", items: "products",
    list: [["Linen overshirt", "Sand", "$128"], ["Wide-leg trouser", "Ink", "$142"], ["Heavy tee", "Bone", "$48"], ["Chore jacket", "Olive", "$188"]],
    quote: ["I've washed this jacket fifty times and it only looks better.", "Sam O., customer"],
    ctaT: "Join the list.", ctaS: "Early access to drops and 10% off your first order."
  },

  /* ---------------- Local services ---------------- */
  {
    id: "sprout", name: "Sprout", industry: "Daycare & preschool", cat: "Local services",
    blurb: "A cheerful, parent-friendly childcare site with programs, tuition and tour scheduling.",
    fh: "'Bricolage Grotesque',sans-serif", fb: "'Outfit',sans-serif", hw: 800, r: 30, layout: "split",
    pal: [
      { bg: "#FFF7E2", fg: "#243B2A", mu: "#647868", ac: "#2E9E5B", acfg: "#FFFFFF", sf: "#FFFFFF", hi: "#FF7A45" },
      { bg: "#EAF4FF", fg: "#16325C", mu: "#5B7396", ac: "#2D7FF9", acfg: "#FFFFFF", sf: "#FFFFFF", hi: "#FFB020" },
      { bg: "#FDEFF4", fg: "#4A1F3A", mu: "#8B647C", ac: "#E0559A", acfg: "#FFFFFF", sf: "#FFFFFF", hi: "#2E9E5B" }
    ],
    art: { kind: "dots", c: ["#BCE5C8", "#2E9E5B", "#FFE2A8"] },
    brand: "Sprout Early Learning", nav: ["Programs", "Tuition", "Our teachers", "Tour"], cta: "Book a tour",
    kicker: "Ages 6 weeks to 5 years",
    title: "Where little ones <em>bloom.</em>",
    sub: "Play-based learning, loving teachers and daily photo updates so you never miss a moment.",
    b1: "Schedule a tour", b2: "View programs",
    stats: [["1:4", "Teacher ratio"], ["Licensed", "& accredited"], ["Daily", "Photo updates"]],
    feats: [["Play-based learning", "Curiosity leads the way."], ["Healthy meals", "Fresh lunch and snacks included."], ["Parent app", "Photos, naps and meals in real time."]],
    secTitle: "Programs", items: "cards",
    list: [["Infants", "6 weeks to 18 months", "Limited spots"], ["Toddlers", "18 months to 3 years", "Enrolling now"], ["Pre-K", "3 to 5 years", "Kindergarten ready"]],
    quote: ["Our daughter runs to the door every morning. That tells us everything.", "The Kim family"],
    ctaT: "Come see a day at Sprout.", ctaS: "Tours on weekdays at 10am and 3pm."
  },
  {
    id: "bright", name: "Bright", industry: "Tutoring & test prep", cat: "Local services",
    blurb: "A smart, encouraging tutoring site with subject pages, score results and trial-lesson booking.",
    fh: "'Space Grotesk',sans-serif", fb: "'Geist',sans-serif", hw: 700, r: 16, layout: "split",
    pal: [
      { bg: "#FFFBEB", fg: "#1F2647", mu: "#62688A", ac: "#3B43D6", acfg: "#FFFFFF", sf: "#FFFFFF", hi: "#F5A300" },
      { bg: "#EFFAF6", fg: "#0F3B31", mu: "#557A70", ac: "#0E9F7A", acfg: "#FFFFFF", sf: "#FFFFFF", hi: "#0E9F7A" },
      { bg: "#12142B", fg: "#EEEFFC", mu: "#9396BC", ac: "#FFC738", acfg: "#12142B", sf: "#1B1E3F", hi: "#FFC738" }
    ],
    art: { kind: "grid", c: ["#3B43D6", "#F5A300", "#C9CDF7"] },
    brand: "Bright Minds Tutoring", nav: ["Subjects", "Test prep", "Results", "Pricing"], cta: "Free trial lesson",
    kicker: "K–12 · SAT · ACT · College essays",
    title: "Better grades. <em>Bigger</em> confidence.",
    sub: "One-on-one tutoring matched to how your student learns, online or at our center.",
    b1: "Book a free trial lesson", b2: "See results",
    stats: [["+180", "Avg. SAT gain"], ["1-on-1", "Every session"], ["94%", "Grade improvement"]],
    feats: [["Matched tutors", "Paired by subject and personality."], ["Progress reports", "Notes after every session."], ["Flexible plans", "Weekly, or just before the test."]],
    secTitle: "Popular programs", items: "cards",
    list: [["Math tutoring", "Elementary through calculus", "$65/hr"], ["SAT & ACT prep", "8-week program", "$899"], ["College essays", "Brainstorm to final draft", "$450"]],
    quote: ["From a C in algebra to an A minus in one semester. He's proud of himself.", "Parent of a 9th grader"],
    ctaT: "Try a lesson, free.", ctaS: "No commitment. See the fit first."
  },
  {
    id: "torque", name: "Torque", industry: "Auto repair", cat: "Local services",
    blurb: "A no-nonsense mechanic site with service pricing, online appointments and digital inspections.",
    fh: "'Archivo Black',sans-serif", fb: "'Outfit',sans-serif", hw: 400, r: 6, layout: "split", up: true,
    pal: [
      { bg: "#15171A", fg: "#F2F3F4", mu: "#9A9EA4", ac: "#E5383B", acfg: "#FFFFFF", sf: "#1E2125", hi: "#E5383B" },
      { bg: "#F1F2F4", fg: "#15171A", mu: "#5E6268", ac: "#15171A", acfg: "#FFFFFF", sf: "#FFFFFF", hi: "#E5383B" },
      { bg: "#0D1B2A", fg: "#EAF0F6", mu: "#8E9FB2", ac: "#F4A261", acfg: "#0D1B2A", sf: "#16283B", hi: "#F4A261" }
    ],
    art: { kind: "gloss", c: ["#1E2125", "#E5383B", "#B9BEC6"] },
    brand: "TORQUE AUTO", nav: ["Services", "Pricing", "Fleet", "About"], cta: "Book service",
    kicker: "ASE-certified · All makes & models",
    title: "Honest repairs. <em>Fair</em> prices.",
    sub: "Photos and video of everything we find, so you approve repairs with your own eyes.",
    b1: "Book an appointment", b2: "See pricing",
    stats: [["3 yr", "36k-mile warranty"], ["Same day", "Most repairs"], ["Free", "Loaner cars"]],
    feats: [["Digital inspections", "Photos sent to your phone."], ["No upsell promise", "We tell you what can wait."], ["Free loaners", "Keep your day moving."]],
    secTitle: "Common services", items: "cards",
    list: [["Oil change", "Full synthetic, 21-point check", "$69"], ["Brake service", "Pads, rotors, fluid", "From $189"], ["Diagnostics", "Check-engine light", "$95"]],
    quote: ["They told me I didn't need the repair another shop quoted. Customer for life.", "Alicia V., customer"],
    ctaT: "Something sound off?", ctaS: "Drop it off today. Loaners are on us."
  },

  /* ---------------- Events & travel ---------------- */
  {
    id: "driftwood", name: "Driftwood", industry: "Inn & vacation rental", cat: "Events & travel",
    blurb: "A relaxed boutique-stay site with room galleries, direct booking and a local guide.",
    fh: "'Fraunces',serif", fb: "'Outfit',sans-serif", hw: 500, r: 18, layout: "full", widget: "search", searchF: ["Check-in", "Check-out", "2 guests"],
    pal: [
      { bg: "#F7F3EA", fg: "#263238", mu: "#69757A", ac: "#2F6F73", acfg: "#FFFFFF", sf: "#FFFFFF", hi: "#D08A4E" },
      { bg: "#F1F5F6", fg: "#1D2F3A", mu: "#607480", ac: "#1D2F3A", acfg: "#FFFFFF", sf: "#FFFFFF", hi: "#2F8FA3" },
      { bg: "#161D1F", fg: "#F1EDE4", mu: "#9BA5A6", ac: "#E2A66C", acfg: "#161D1F", sf: "#20292C", hi: "#E2A66C" }
    ],
    art: { kind: "waves", c: ["#2F6F73", "#F2C48D", "#7FB3B5"] },
    brand: "Driftwood Inn", nav: ["Rooms", "Experiences", "Local guide", "Offers"], cta: "Check availability",
    kicker: "Eleven rooms · Steps from the beach",
    title: "Stay where the <em>days slow down.</em>",
    sub: "A small coastal inn with porch breakfasts, beach bikes and nowhere you need to be.",
    b1: "Check availability", b2: "See the rooms",
    stats: [["11", "Rooms & suites"], ["2 min", "Walk to the beach"], ["4.9", "Guest rating"]],
    feats: [["Book direct & save", "Best rate, always, right here."], ["Breakfast included", "Served on the porch daily."], ["Beach gear", "Bikes, chairs and umbrellas, free."]],
    secTitle: "Rooms & suites", items: "listings",
    list: [["Garden room", "Queen bed · Sleeps 2", "$189/night"], ["Ocean view king", "Balcony · Sleeps 2", "$259/night"], ["Captain's suite", "Two rooms · Sleeps 4", "$349/night"]],
    quote: ["We came for two nights and stayed five. Already booked for next summer.", "The Harrisons"],
    ctaT: "Your porch chair is waiting.", ctaS: "Book direct for a free bottle of wine on arrival."
  },
  {
    id: "loft", name: "Loft", industry: "Event venue", cat: "Events & travel",
    blurb: "An industrial-chic venue site with space tours, capacity charts and date availability requests.",
    fh: "'DM Serif Display',serif", fb: "'Space Grotesk',sans-serif", hw: 400, r: 0, layout: "full",
    pal: [
      { bg: "#EFEBE4", fg: "#1D1C1A", mu: "#6A6761", ac: "#1D1C1A", acfg: "#EFEBE4", sf: "#FFFFFF", hi: "#A8642A" },
      { bg: "#171615", fg: "#F0EBE2", mu: "#A09B92", ac: "#D9A766", acfg: "#171615", sf: "#22201E", hi: "#D9A766" },
      { bg: "#E9EEEC", fg: "#1B2A27", mu: "#62726E", ac: "#28524A", acfg: "#FFFFFF", sf: "#FFFFFF", hi: "#28524A" }
    ],
    art: { kind: "grid", c: ["#3A322A", "#D9A766", "#8B7D6D"] },
    brand: "The Foundry Loft", nav: ["The space", "Weddings", "Corporate", "Availability"], cta: "Check a date",
    kicker: "Historic warehouse · Up to 300 guests",
    title: "A blank canvas with <em>good bones.</em>",
    sub: "Exposed brick, 20-foot windows and a rooftop terrace in the heart of downtown.",
    b1: "Check your date", b2: "Tour the space",
    stats: [["300", "Guest capacity"], ["8,000", "Square feet"], ["Rooftop", "Terrace included"]],
    feats: [["All-day access", "Setup starts at 9am."], ["Bring your vendors", "Open catering and bar policy."], ["On-site manager", "Someone to solve everything."]],
    secTitle: "Ways to use the space", items: "cards",
    list: [["Weddings", "Ceremony and reception", "From $6,500"], ["Corporate events", "Launches, offsites, parties", "From $3,200"], ["Photo & film", "Hourly studio rental", "$250/hr"]],
    quote: ["Our guests walked in and gasped. It photographs like a dream.", "Katie & Marcus"],
    ctaT: "Is your date open?", ctaS: "Saturdays book 12 to 18 months out."
  },
  {
    id: "wander", name: "Wander", industry: "Tours & travel", cat: "Events & travel",
    blurb: "An adventurous tour-operator site with trip listings, departure dates and secure booking.",
    fh: "'Bricolage Grotesque',sans-serif", fb: "'Outfit',sans-serif", hw: 800, r: 20, layout: "full", widget: "search", searchF: ["Where to?", "Any dates", "2 travelers"],
    pal: [
      { bg: "#FBF7EF", fg: "#1E2F2B", mu: "#63746F", ac: "#E4572E", acfg: "#FFFFFF", sf: "#FFFFFF", hi: "#E4572E" },
      { bg: "#EFF6F7", fg: "#12333B", mu: "#58767D", ac: "#12333B", acfg: "#FFFFFF", sf: "#FFFFFF", hi: "#17A2B8" },
      { bg: "#10201C", fg: "#F0F4EA", mu: "#93A89F", ac: "#F6C453", acfg: "#10201C", sf: "#192E29", hi: "#F6C453" }
    ],
    art: { kind: "waves", c: ["#1F5A52", "#F6C453", "#6FA79A"] },
    brand: "Wander Outfitters", nav: ["Trips", "Destinations", "Private groups", "About"], cta: "Find a trip",
    kicker: "Small-group adventures · Local guides",
    title: "Go further. <em>Come back different.</em>",
    sub: "Kayak tours, guided hikes and weekend escapes for groups of twelve or fewer.",
    b1: "Browse trips", b2: "Plan a private trip",
    stats: [["12", "Guests max"], ["40+", "Trips a season"], ["4.9", "2,300 reviews"]],
    feats: [["Local guides", "Born here, certified everywhere."], ["Gear included", "Just bring shoes and a water bottle."], ["Free rescheduling", "Weather happens. We're flexible."]],
    secTitle: "Popular trips", items: "listings",
    list: [["Sunset kayak tour", "2.5 hours · All levels", "$69"], ["Blue Ridge day hike", "8 miles · Lunch included", "$119"], ["Island camping weekend", "2 nights · Gear provided", "$389"]],
    quote: ["Dolphins at sunset from a kayak. Best thing we did all vacation.", "Jamie L., guest"],
    ctaT: "Where to next?", ctaS: "Book online. Free rescheduling up to 48 hours out."
  }
];

/* =====================================================================
   Variations. Every design above can wear any shared palette, any font
   pairing and any hero layout below, which is how 54 designs become
   thousands of ready-made looks. Add a palette or a font pairing here
   and every design picks it up.
   ===================================================================== */
const PRESET_PALS = [
  { n: "Linen",     bg: "#F6F1E8", fg: "#221E1A", mu: "#6F675E", ac: "#221E1A", acfg: "#F6F1E8", sf: "#FFFFFF", hi: "#B4552D", art: ["#6B5646", "#C9764F", "#E9DCCB"] },
  { n: "Ocean",     bg: "#EFF6FA", fg: "#0B2A3F", mu: "#55707F", ac: "#0F6FA8", acfg: "#FFFFFF", sf: "#FFFFFF", hi: "#0F6FA8", art: ["#0B3A5A", "#2C9BD6", "#CFE6F2"] },
  { n: "Forest",    bg: "#F3F0E6", fg: "#1C3326", mu: "#5E7065", ac: "#1F4D36", acfg: "#FFFFFF", sf: "#FFFFFF", hi: "#B8862F", art: ["#1F4D36", "#C99A3F", "#DCE5CF"] },
  { n: "Blush",     bg: "#FCF0EE", fg: "#43203A", mu: "#86657A", ac: "#8C2F5F", acfg: "#FFFFFF", sf: "#FFF9F8", hi: "#C4587F", art: ["#B66A8A", "#D9809F", "#FBE3E4"] },
  { n: "Sunrise",   bg: "#FFF6E9", fg: "#33200F", mu: "#7D6853", ac: "#E5631C", acfg: "#FFFFFF", sf: "#FFFFFF", hi: "#C44A0C", art: ["#8A4014", "#F28A3C", "#FFDDB5"] },
  { n: "Lavender",  bg: "#F4F2FD", fg: "#241D4F", mu: "#69648F", ac: "#5B46D9", acfg: "#FFFFFF", sf: "#FFFFFF", hi: "#5B46D9", art: ["#3B2E8F", "#8F7DF2", "#DDD8FA"] },
  { n: "Mono",      bg: "#FFFFFF", fg: "#111111", mu: "#6A6A6A", ac: "#111111", acfg: "#FFFFFF", sf: "#F3F3F1", hi: "#111111", art: ["#3D3D3D", "#A8A8A8", "#E4E4E2"] },
  { n: "Midnight",  bg: "#0A1424", fg: "#E9EFF9", mu: "#8B9AB5", ac: "#5AA9FF", acfg: "#0A1424", sf: "#121F36", hi: "#5AA9FF", art: ["#102848", "#5AA9FF", "#2C4A78"] },
  { n: "Charcoal",  bg: "#141414", fg: "#F2EEE6", mu: "#9C978E", ac: "#D2A94E", acfg: "#141414", sf: "#1E1E1E", hi: "#D2A94E", art: ["#2A2620", "#D2A94E", "#5A5245"] },
  { n: "Espresso",  bg: "#1F1611", fg: "#F8EBDD", mu: "#B5A290", ac: "#F0A070", acfg: "#1F1611", sf: "#2B1F18", hi: "#F0A070", art: ["#4A2E1E", "#F0A070", "#8A6046"] },
  { n: "Neon",      bg: "#0C0C0C", fg: "#FFFFFF", mu: "#9A9A9A", ac: "#C8FF2E", acfg: "#0C0C0C", sf: "#171717", hi: "#C8FF2E", art: ["#1A1A1A", "#C8FF2E", "#3A3A3A"] },
  { n: "Plum",      bg: "#1A1024", fg: "#F6ECFA", mu: "#A997B8", ac: "#F27DB4", acfg: "#1A1024", sf: "#261834", hi: "#F27DB4", art: ["#3A1F54", "#F27DB4", "#6B4590"] }
];
const FONT_PAIRS = [
  { n: "Modern sans",      fh: "'Outfit',sans-serif",              fb: "'Outfit',sans-serif",        hw: 700 },
  { n: "Friendly grotesk", fh: "'Bricolage Grotesque',sans-serif", fb: "'Outfit',sans-serif",        hw: 800 },
  { n: "Tech",             fh: "'Space Grotesk',sans-serif",       fb: "'Geist',sans-serif",         hw: 700 },
  { n: "Editorial serif",  fh: "'Fraunces',serif",                 fb: "'Geist',sans-serif",         hw: 500 },
  { n: "Classic serif",    fh: "'Playfair Display',serif",         fb: "'Outfit',sans-serif",        hw: 600 },
  { n: "Elegant",          fh: "'Cormorant Garamond',serif",       fb: "'Outfit',sans-serif",        hw: 500 },
  { n: "Display serif",    fh: "'DM Serif Display',serif",         fb: "'Outfit',sans-serif",        hw: 400 },
  { n: "Fine serif",       fh: "'Instrument Serif',serif",         fb: "'Geist',sans-serif",         hw: 400 },
  { n: "Artsy",            fh: "'Syne',sans-serif",                fb: "'Geist',sans-serif",         hw: 700 },
  { n: "Poster",           fh: "'Anton',sans-serif",               fb: "'Space Grotesk',sans-serif", hw: 400, up: true },
  { n: "Heavy",            fh: "'Archivo Black',sans-serif",       fb: "'Outfit',sans-serif",        hw: 400, up: true }
];
const LAYOUTS = { split: "Split", center: "Centered", full: "Full-bleed", editorial: "Editorial" };
const VARIANTS_PER_DESIGN = 24;

const tplBase = t => (t && t.base ? TEMPLATES.find(b => b.id === t.base) : t);
/* a design's own three palettes followed by every shared one */
function tplAllPals(t) {
  const b = tplBase(t), names = ["Signature", "Alternate", "Contrast"];
  return b.pal.map((p, i) => Object.assign({ n: names[i] || "Palette " + (i + 1) }, p)).concat(PRESET_PALS);
}
/* hero layouts in a stable order for this design: its own first, then the others */
function tplLayouts(t) {
  const b = tplBase(t), own = b.layout === "dash" ? "split" : b.layout;
  return [b.layout, ...Object.keys(LAYOUTS).filter(k => k !== own)];
}
/* p = palette index (tplAllPals), f = 0 for the design's own fonts or 1..n (FONT_PAIRS), l = layout index (tplLayouts) */
function tplVariant(base, p, f, l) {
  const pals = tplAllPals(base), lay = tplLayouts(base)[l] || base.layout, font = f ? FONT_PAIRS[f - 1] : null;
  const parts = [];
  if (p) parts.push(pals[p].n);
  if (font) parts.push(font.n);
  if (l) parts.push(LAYOUTS[lay]);
  const v = Object.assign({}, base, { id: `${base.id}~${p}.${f}.${l}`, base: base.id, vname: parts.join(" · "), pal: pals, p0: p, layout: lay });
  if (font) Object.assign(v, { fh: font.fh, fb: font.fb, hw: font.hw, up: !!font.up });
  return v;
}
/* the ready-made variations shown in the gallery: a deterministic, well-spread pick */
const tplVarCache = {};
function tplVariants(base) {
  if (tplVarCache[base.id]) return tplVarCache[base.id];
  const nP = tplAllPals(base).length, nF = FONT_PAIRS.length + 1, nL = 4, total = nP * nF * nL;
  let seed = 0; for (const ch of base.id) seed = (seed * 31 + ch.charCodeAt(0)) % total;
  const seen = new Set(["0.0.0"]), out = [];
  const add = (p, f, l) => { const k = `${p}.${f}.${l}`; if (!seen.has(k)) { seen.add(k); out.push(tplVariant(base, p, f, l)); } };
  add(1, 0, 0); add(2, 0, 0);
  for (let k = 1; out.length < VARIANTS_PER_DESIGN && k < total; k++) {
    const n = (seed + k * 133) % total;
    add(n % nP, Math.floor(n / nP) % nF, Math.floor(n / (nP * nF)));
  }
  return tplVarCache[base.id] = out;
}
/* look up a design or a variation ("harbor" or "harbor~7.3.2") */
function tplGet(id) {
  if (!id) return null;
  const [bid, rest] = String(id).split("~"), base = TEMPLATES.find(t => t.id === bid);
  if (!base || !rest) return base || null;
  const [p, f, l] = rest.split(".").map(n => parseInt(n, 10) || 0);
  if (p >= tplAllPals(base).length || f > FONT_PAIRS.length || l > 3 || p < 0 || f < 0 || l < 0) return base;
  return tplVariant(base, p, f, l);
}
const tplStats = () => ({
  designs: TEMPLATES.length,
  ready: TEMPLATES.length * (1 + VARIANTS_PER_DESIGN),
  combos: TEMPLATES.length * (3 + PRESET_PALS.length) * (FONT_PAIRS.length + 1) * 4
});

/* ---------- search: what people type vs. what the designs are called ---------- */
const TPL_SYNONYMS = {
  dentist: "dental", doctor: "medical", lawyer: "law", attorney: "law", legal: "law", realtor: "real estate", hair: "salon", nails: "salon",
  mechanic: "auto", car: "auto", vet: "veterinary", cafe: "café", coffee: "coffee", therapist: "therap", counselor: "counsel", hotel: "inn",
  airbnb: "rental", accountant: "account", cpa: "account", bookkeeper: "bookkeep", handyman: "handym", contractor: "construct", builder: "construct",
  hvac: "heating", ac: "cooling", store: "shop", ecommerce: "store", band: "music", photography: "photograph", daycare: "daycare", preschool: "preschool",
  lawn: "landscap", yard: "landscap", flowers: "florist", flower: "florist", bar: "bar", pub: "brew", beer: "brew", pizza: "pizz", tacos: "taco",
  spa: "spa", massage: "massage", physio: "physio", gym: "gym", trainer: "coach", nonprofit: "nonprofit", charity: "nonprofit", saas: "software", startup: "startup",
  agency: "agency", wedding: "wedding", weddings: "wedding", travel: "tour", tours: "tour", mover: "moving", movers: "moving"
};
/* turns a search box value into loose word stems; every stem has to be found in tplHay() */
function tplSearchWords(q) {
  return String(q || "").trim().toLowerCase().split(/\s+/).filter(Boolean).map(w => TPL_SYNONYMS[w] || (w.length > 5 ? w.slice(0, -2) : w));
}
const tplHay = t => (t.name + " " + t.industry + " " + t.blurb + " " + t.cat + " " + (t.vname || "") + " " + (t.kicker || "")).toLowerCase();

/* ---------- generative "photography" for each template ---------- */
function tpArt(t, i = 0, colors) {
  const [a, b, c] = colors || t.art.c, k = t.art.kind, s = i * 23 % 60;
  const A = {
    arch: `radial-gradient(circle at ${30 + s}% 120%,${b}55 0 30%,transparent 31%),linear-gradient(180deg,transparent 55%,${a}22 55% 57%,transparent 57%),radial-gradient(ellipse 34% 50% at 50% 100%,${c} 0 99%,transparent 100%),linear-gradient(160deg,${c},${b}66)`,
    glow: `radial-gradient(circle at ${20 + s}% 25%,${c}cc 0 5%,transparent 12%),radial-gradient(circle at ${70 - s / 2}% 30%,${c}99 0 4%,transparent 10%),radial-gradient(circle at 50% 60%,${b}88 0 14%,transparent 30%),radial-gradient(ellipse 90% 50% at 50% 100%,${b}aa,transparent 70%),linear-gradient(170deg,${a},#140A05)`,
    soft: `radial-gradient(ellipse 30% 40% at ${40 + s / 2}% 60%,${c} 0 60%,transparent 61%),radial-gradient(ellipse 22% 30% at ${65 - s / 3}% 45%,${b}aa 0 60%,transparent 61%),linear-gradient(170deg,${a},${b})`,
    stripes: `linear-gradient(115deg,transparent 0 ${40 + s / 3}%,${b} ${40 + s / 3}% ${44 + s / 3}%,transparent ${44 + s / 3}%),repeating-linear-gradient(115deg,${a} 0 22px,${c} 22px 24px),linear-gradient(${a},#000)`,
    lines: `repeating-linear-gradient(90deg,transparent 0 46px,${b}22 46px 47px),radial-gradient(ellipse 60% 80% at ${70 - s / 3}% 100%,${b}44,transparent 70%),linear-gradient(160deg,${c},${a})`,
    orb: `radial-gradient(circle at ${60 - s / 3}% 40%,#ffffff 0 10%,${c} 10% 22%,transparent 23%),radial-gradient(circle at 30% 80%,${b}66 0 18%,transparent 40%),linear-gradient(150deg,${a},${c})`,
    house: `linear-gradient(180deg,transparent 0 58%,${c} 58% 100%),conic-gradient(from 135deg at ${45 + s / 4}% 30%,${b} 0 90deg,transparent 90deg),linear-gradient(180deg,transparent 30%,${b} 30% 58%,transparent 58%) ${30 + s / 4}% 0/40% 100% no-repeat,linear-gradient(180deg,${a},#E8EEF2)`,
    petal: `radial-gradient(ellipse 18% 32% at ${40 + s / 4}% 50%,${b}cc 0 60%,transparent 62%),radial-gradient(ellipse 32% 18% at ${50 + s / 4}% 52%,${a} 0 60%,transparent 62%),radial-gradient(circle at 50% 50%,${c},${a})`,
    grid: `linear-gradient(${b} 0 0) ${20 + s}% 70%/38% 6px no-repeat,repeating-linear-gradient(0deg,${c}33 0 1px,transparent 1px 32px),repeating-linear-gradient(90deg,${c}33 0 1px,transparent 1px 32px),linear-gradient(160deg,${c},${a})`,
    photo: `radial-gradient(ellipse 40% 26% at ${50 + s / 3}% ${40 + s / 4}%,${b}aa,transparent 70%),linear-gradient(180deg,${a} 0 ${45 + s / 3}%,${c} ${45 + s / 3}%)`,
    gloss: `linear-gradient(100deg,transparent 30%,${c}55 ${42 + s / 4}%,transparent 55%),radial-gradient(ellipse 70% 30% at 50% 82%,${b},transparent 70%),linear-gradient(180deg,${a},#02050C)`,
    leaf: `radial-gradient(ellipse 14% 30% at ${30 + s / 2}% 60%,${b} 0 60%,transparent 62%),radial-gradient(ellipse 12% 26% at ${62 - s / 3}% 50%,${c} 0 60%,transparent 62%),linear-gradient(180deg,${c}88,${a})`,
    sun: `radial-gradient(circle at 50% ${70 - s / 4}%,${c} 0 14%,${a} 14% 22%,transparent 23%),linear-gradient(180deg,${a},${b})`,
    mesh: `radial-gradient(circle at ${20 + s}% 20%,${a}cc,transparent 40%),radial-gradient(circle at 80% ${30 + s / 2}%,${b}bb,transparent 45%),radial-gradient(circle at 50% 100%,${c}99,transparent 50%),#0B1020`,
    waves: `radial-gradient(circle at ${78 - s / 3}% ${22 + s / 4}%,${b} 0 9%,transparent 10%),repeating-radial-gradient(ellipse 120% 40% at 50% 120%,${c} 0 6px,${a} 6px 18px),linear-gradient(180deg,${b}55,${a} 50%)`,
    dots: `radial-gradient(circle at ${35 + s / 3}% 55%,${b} 0 18%,transparent 19%),radial-gradient(${a} 22%,transparent 23%) 0 0/26px 26px,linear-gradient(140deg,${c},${a})`
  };
  return A[k] || A.soft;
}

function tpPal(t, p) { return typeof p === "object" && p ? p : t.pal[p == null ? (t.p0 || 0) : p] || t.pal[0]; }

/* ---------- safe text output ---------- */
const tpEsc = s => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
/* headlines may carry <em> and <br>, nothing else */
const tpRich = s => tpEsc(s).replace(/&lt;(\/?)(em|br)\s*\/?&gt;/gi, "<$1$2>");
const tpUrl = u => "url('" + String(u).replace(/['"()\\\s<>]/g, ch => "%" + ch.charCodeAt(0).toString(16)) + "')";
function tpLum(hex) {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex || ""); if (!m) return 1;
  const n = parseInt(m[1], 16), f = v => { v /= 255; return v <= .03928 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4); };
  return .2126 * f(n >> 16) + .7152 * f(n >> 8 & 255) + .0722 * f(n & 255);
}
/* black or white, whichever reads better on the given color */
const tpOn = hex => (tpLum(hex) > .4 ? "#111111" : "#FFFFFF");

/* ---------- optional content every design can show ---------- */
const TP_SECTIONS = {
  hero: "Hero", feats: "Highlights", list: "Main list", quote: "Testimonial", cta: "Call to action",
  stats: "Stats band", steps: "How it works", story: "Our story", team: "Team", faq: "FAQ", gallery: "Photo gallery", signup: "Newsletter sign-up"
};
function tpExtra(t) {
  return {
    sections: ["hero", "feats", "list", "quote", "cta"],
    schedBtn: "Book",
    searchF: ["Where to?", "Any dates", "2 guests"],
    bookSub: "Pick a day and time",
    dashK: ["Jobs today", "On time", "Revenue"],
    dashRows: [["Crew A · Bayview Ln", "En route"], ["Crew C · Marsh Ct", "On site"]],
    contact: ["(555) 010-0142", "Mon–Fri 8am–6pm\nSat 9am–2pm", "214 Harbor Street\nYour Town, VA"],
    stepsT: "How it works",
    steps: [["Reach out", "Tell us what you need with a quick message or call."], ["Get a clear plan", "We confirm the details, timing and price up front."], ["Enjoy the result", "We deliver, follow up and make sure you're happy."]],
    story: ["Our story", `${t.brand} started with a simple idea: do great work and treat people well. Years later that's still how we run things, one customer at a time.`],
    teamT: "Meet the team",
    team: [["Alex Morgan", "Founder"], ["Jordan Lee", "Manager"], ["Sam Rivera", "Customer care"]],
    faqT: "Questions, answered",
    faq: [["How do I get started?", `Choose “${t.b1}” and we'll take it from there. Most people hear back the same day.`], ["What does it cost?", "Prices are listed up front with no surprise fees. Ask us for an exact quote any time."], ["Where are you located?", "We serve the local area and nearby towns. Get in touch to check your address."]],
    galT: "Gallery",
    gal: ["One", "Two", "Three", "Four", "Five", "Six"],
    signup: ["Stay in the loop", "News and offers about once a month. No spam, ever.", "Sign up"]
  };
}

/* pal: palette index or palette object. pg: 0 = home, 1-4 = the template's four menu pages */
function tpRender(t, pal, pg = 0) {
  const P = tpPal(t, pal), X = tpExtra(t);
  const g = path => { const ks = path.split("."); let o = t[ks[0]] == null ? X[ks[0]] : t[ks[0]]; for (let i = 1; i < ks.length && o != null; i++) o = o[ks[i]]; return o; };
  /* editable text: tag, data path, class, rich (allows <em>/<br>), extra attributes */
  const T = (tag, path, cls = "", rich = false, attr = "") => `<${tag}${cls ? ` class="${cls}"` : ""}${attr} data-e="${path}"${rich ? " data-rich" : ""}>${rich ? tpRich(g(path)) : tpEsc(g(path)).replace(/\n/g, "<br>")}</${tag}>`;
  const vars = `--bg:${P.bg};--fg:${P.fg};--mu:${P.mu};--ac:${P.ac};--acfg:${P.acfg};--sf:${P.sf};--hi:${P.hi};--r:${+t.r || 0}px;--fh:${t.fh};--fb:${t.fb};--hw:${+t.hw || 600}`;
  const artBg = (key, i) => (t.imgs && t.imgs[key] ? `${tpUrl(t.imgs[key])} center/cover no-repeat` : tpArt(t, i, P.art));
  const img = (key, i, cls = "") => `<div class="tp-img ${cls}" data-img="${key}" style="background:${artBg(key, i)}"></div>`;
  const navL = t.nav.map(tpEsc), pages = ["Home", ...navL];
  const nav = `<div class="tp-nav">${T("a", "brand", "tp-logo", false, ' data-pg="0"')}<span class="tp-links">${navL.map((n, i) => `<a data-pg="${i + 1}" data-e="nav.${i}"${pg === i + 1 ? ' class="on"' : ""}>${n}</a>`).join("")}</span>${T("a", "cta", "tp-btn", false, ' data-pg="4"')}<button class="tp-burger" type="button" data-burger aria-label="Open menu"><i></i><i></i><i></i></button></div>
    <div class="tp-mnav">${pages.map((n, i) => `<a data-pg="${i}"${pg === i ? ' class="on"' : ""}>${n}</a>`).join("")}<a class="tp-btn" data-pg="4">${tpEsc(t.cta)}</a></div>`;
  const btns = `<div class="tp-btns">${T("a", "b1", "tp-btn", false, ' data-pg="4"')}${T("a", "b2", "tp-btn ghost", false, ' data-pg="1"')}</div>`;
  const stats = (band = false) => `<div class="tp-stats${band ? " band" : ""}">${t.stats.map((s, i) => `<div>${T("b", `stats.${i}.0`)}${T("small", `stats.${i}.1`)}</div>`).join("")}</div>`;
  const text = `${T("span", "kicker", "tp-kick")}${T("h1", "title", "", true)}${T("p", "sub", "tp-sub")}${btns}`;
  let widget = img("hero0", 0, "tall");
  if (t.widget === "form") widget = `<div class="tp-card tp-form"><b>Request a consultation</b><span>Full name</span><span>Phone or email</span><span class="big">How can we help?</span><i>Send securely</i><small>Encrypted · Reply within 48 hours</small></div>`;
  if (t.widget === "booking") widget = `<div class="tp-card tp-book"><b>Book a visit</b><small>${tpEsc(g("bookSub"))}</small><div class="tp-days"><span>Mon<br><em>12</em></span><span class="on">Tue<br><em>13</em></span><span>Wed<br><em>14</em></span><span>Thu<br><em>15</em></span></div><div class="tp-slots"><span>8:40</span><span class="on">9:20</span><span>11:00</span><span>1:30</span><span>3:15</span><span>4:00</span></div><i>Confirm Tue 9:20 AM</i></div>`;
  if (t.widget === "dash") widget = `<div class="tp-card tp-dash"><div class="tp-kpis">${g("dashK").map((k, i) => `<div><small>${tpEsc(k)}</small><b>${["48", "96%", "$21.4k"][i]}</b></div>`).join("")}</div><div class="tp-bars">${[38, 55, 46, 70, 62, 84, 92, 76, 98].map(h => `<i style="height:${h}%"></i>`).join("")}</div><div class="tp-rows">${g("dashRows").map(r => `<span><i></i>${tpEsc(r[0])}<em>${tpEsc(r[1])}</em></span>`).join("")}</div></div>`;
  const hero = () => {
    if (t.layout === "split" || t.layout === "dash") return `<section class="tp-hero split"><div>${text}${stats()}</div>${widget}</section>`;
    if (t.layout === "center") return `<section class="tp-hero center"><div>${text}</div><div class="tp-trio">${img("hero1", 1)}${img("hero0", 2, "mid")}${img("hero2", 3)}</div></section>`;
    if (t.layout === "full") return `<section class="tp-hero full" data-img="hero0" style="--art:${artBg("hero0", 0)}"><div class="tp-shade"></div><div class="tp-in">${text}${t.widget === "search" ? `<div class="tp-search">${g("searchF").map(x => `<span>${tpEsc(x)}</span>`).join("")}<i>Search</i></div>` : ""}</div></section>${stats(true)}`;
    return `<section class="tp-hero editorial">${T("span", "kicker", "tp-kick")}${T("h1", "title", "", true)}<div class="tp-ed">${T("p", "sub", "tp-sub")}${btns}</div><div class="tp-row">${img("hero1", 0)}${img("hero0", 1, "wide")}${img("hero2", 2)}</div></section>`;
  };
  const feats = () => `<section class="tp-feats">${t.feats.map((f, i) => `<div><i>${String(i + 1).padStart(2, "0")}</i>${T("b", `feats.${i}.0`)}${T("p", `feats.${i}.1`)}</div>`).join("")}</section>`;
  const L = t.list;
  const items = () => {
    if (t.items === "menu") return `<div class="tp-menu">${L.map((x, i) => `<div><span>${T("b", `list.${i}.0`)}${T("small", `list.${i}.1`)}</span><i></i>${T("em", `list.${i}.2`)}</div>`).join("")}</div>`;
    if (t.items === "products") return `<div class="tp-prods">${L.map((x, i) => `<div>${img("item" + i, i + 2, "sq")}${T("b", `list.${i}.0`)}${T("small", `list.${i}.1`)}${T("em", `list.${i}.2`)}</div>`).join("")}</div>`;
    if (t.items === "schedule") return `<div class="tp-sched">${L.map((x, i) => `<div class="${i === 1 ? "on" : ""}">${T("em", `list.${i}.0`)}${T("b", `list.${i}.1`)}${T("small", `list.${i}.2`)}<a class="tp-btn ${i === 1 ? "" : "ghost"}" data-pg="4">${tpEsc(g("schedBtn"))}</a></div>`).join("")}</div>`;
    if (t.items === "listings") return `<div class="tp-cards">${L.map((x, i) => `<div class="tp-cardi">${img("item" + i, i + 1)}<div>${T("span", `list.${i}.2`, "tp-price big")}${T("b", `list.${i}.0`)}${T("p", `list.${i}.1`)}</div></div>`).join("")}</div>`;
    if (t.items === "gallery") return `<div class="tp-gal">${L.map((x, i) => `<div class="g${i % 6}">${img("item" + i, i + 1)}${T("small", `list.${i}.0`)}</div>`).join("")}</div>`;
    return `<div class="tp-cards">${L.map((x, i) => `<div class="tp-cardi">${img("item" + i, i + 4)}<div>${T("b", `list.${i}.0`)}${T("p", `list.${i}.1`)}${T("span", `list.${i}.2`, "tp-price")}</div></div>`).join("")}</div>`;
  };
  const list = (more = true) => `<section class="tp-list"><div class="tp-h2">${T("h2", "secTitle", "", true)}${more ? `<a class="tp-link" data-pg="1">View all →</a>` : ""}</div>${items()}</section>`;
  const quote = () => `<section class="tp-quote"><span class="tp-stars">★★★★★</span><blockquote>“${T("span", "quote.0")}”</blockquote>${T("small", "quote.1")}</section>`;
  const cta = () => `<section class="tp-cta"><div>${T("h2", "ctaT", "", true)}${T("p", "ctaS")}</div><a class="tp-btn" data-pg="4">${tpEsc(t.b1)}</a></section>`;
  const SEC = {
    hero, feats, list: () => list(true), quote, cta,
    stats: () => `<section class="tp-xstats">${stats(true)}</section>`,
    steps: () => `<section class="tp-list tp-steps"><div class="tp-h2">${T("h2", "stepsT", "", true)}</div><div class="tp-stepg">${g("steps").map((s, i) => `<div><i>${i + 1}</i>${T("b", `steps.${i}.0`)}${T("p", `steps.${i}.1`)}</div>`).join("")}</div></section>`,
    story: () => `<section class="tp-story">${img("story", 5)}<div>${T("h2", "story.0", "", true)}${T("p", "story.1")}<a class="tp-link" data-pg="2">Learn more →</a></div></section>`,
    team: () => `<section class="tp-list tp-team"><div class="tp-h2">${T("h2", "teamT", "", true)}</div><div class="tp-teamg">${g("team").map((s, i) => `<div>${img("team" + i, i + 3, "sq")}${T("b", `team.${i}.0`)}${T("small", `team.${i}.1`)}</div>`).join("")}</div></section>`,
    faq: () => `<section class="tp-list tp-faq"><div class="tp-h2">${T("h2", "faqT", "", true)}</div><div class="tp-faqg">${g("faq").map((s, i) => `<div>${T("b", `faq.${i}.0`)}${T("p", `faq.${i}.1`)}</div>`).join("")}</div></section>`,
    gallery: () => `<section class="tp-list"><div class="tp-h2">${T("h2", "galT", "", true)}</div><div class="tp-gal">${g("gal").map((s, i) => `<div class="g${i % 6}">${img("gal" + i, i + 8)}${T("small", `gal.${i}`)}</div>`).join("")}</div></section>`,
    signup: () => `<section class="tp-signup"><div>${T("h2", "signup.0", "", true)}${T("p", "signup.1")}</div><div class="tp-signf"><span>Email address</span>${T("i", "signup.2")}</div></section>`
  };
  const foot = `<footer class="tp-foot"><a class="tp-logo" data-pg="0">${tpEsc(t.brand)}</a><span class="tp-flinks">${pages.map((n, i) => `<a data-pg="${i}">${n}</a>`).join("")}</span><small>© ${new Date().getFullYear()} ${tpEsc(t.brand)}</small></footer>`;
  const head = (intro, i) => `<section class="tp-phead" style="--art:${artBg("head" + i, i + 6)}"><div><small><a data-pg="0">Home</a> / ${pages[pg]}</small><h1>${pages[pg]}</h1><p class="tp-sub">${tpEsc(intro)}</p></div><div class="tp-img" data-img="head${i}"></div></section>`;
  let body;
  if (pg === 1) body = head(t.sub, 1) + list(false) + feats() + cta();
  else if (pg === 2) body = head(`Why people choose ${t.brand}.`, 2) + `<section class="tp-zig">${t.feats.map((f, i) => `<div>${img("zig" + i, i + 7)}<div><i>${String(i + 1).padStart(2, "0")}</i><h2>${tpEsc(f[0])}</h2><p>${tpEsc(f[1])} ${tpEsc(t.sub)}</p><a class="tp-link" data-pg="4">Get started →</a></div></div>`).join("")}</section>` + stats(true) + quote() + cta();
  else if (pg === 3) body = head(`A closer look at ${t.brand}.`, 3) + `<section class="tp-list"><div class="tp-gal">${[...L, ...L].slice(0, 6).map((x, i) => `<div class="g${i}">${img("more" + i, i + 9)}<small>${tpEsc(x[0])}</small></div>`).join("")}</div></section>` + quote() + cta();
  else if (pg === 4) body = head(t.ctaS, 4) + `<section class="tp-contact"><div class="tp-card tp-form"><b>Send us a message</b><span>Your name</span><span>Email or phone</span><span class="big">How can we help?</span><i>${tpEsc(t.b1)}</i><small>We reply within one business day</small></div><div class="tp-info"><div><small>Call or text</small>${T("b", "contact.0")}</div><div><small>Hours</small>${T("b", "contact.1")}</div><div><small>Visit</small>${T("b", "contact.2")}</div>${img("map", 12, "map")}</div></section>`;
  else body = g("sections").filter(k => SEC[k]).map(k => SEC[k]().replace("<section ", `<section data-sec="${k}" `)).join("");
  return `<div class="tp${t.up ? " up" : ""}${tpLum(P.hi) < .3 ? " hid" : ""}" data-page="${pg}" style="${vars}">${nav}${body}${foot}</div>`;
}
