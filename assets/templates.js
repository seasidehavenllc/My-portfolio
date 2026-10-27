/* =====================================================================
   SEASIDE HAVEN STUDIOS — template collection
   Every template below is an original design rendered from this data.
   To add one, copy an entry, change its copy and colors, and it shows
   up in the gallery automatically.
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
    fh: "'Outfit',sans-serif", fb: "'Outfit',sans-serif", hw: 700, r: 20, layout: "dash", widget: "booking",
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
    fh: "'Fraunces',serif", fb: "'Geist',sans-serif", hw: 500, r: 6, layout: "full", widget: "search",
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
    secTitle: "Upcoming events", items: "schedule",
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
  }
];

/* ---------- generative "photography" for each template ---------- */
function tpArt(t, i = 0, p) {
  const [a, b, c] = t.art.c, k = t.art.kind, s = i * 23 % 60;
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

function tpPal(t, p) { return t.pal[p || 0]; }

/* pg: 0 = home, 1-4 = the template's four menu pages */
function tpRender(t, palIdx = 0, pg = 0) {
  const P = tpPal(t, palIdx);
  const vars = `--bg:${P.bg};--fg:${P.fg};--mu:${P.mu};--ac:${P.ac};--acfg:${P.acfg};--sf:${P.sf};--hi:${P.hi};--r:${t.r}px;--fh:${t.fh};--fb:${t.fb};--hw:${t.hw}`;
  const img = (i, extra = "", cls = "") => `<div class="tp-img ${cls}" style="background:${tpArt(t, i)}${extra}"></div>`;
  const pages = ["Home", ...t.nav];
  const nav = `<div class="tp-nav"><a class="tp-logo" data-pg="0">${t.brand}</a><span class="tp-links">${t.nav.map((n, i) => `<a data-pg="${i + 1}"${pg === i + 1 ? ' class="on"' : ""}>${n}</a>`).join("")}</span><a class="tp-btn" data-pg="4">${t.cta}</a><button class="tp-burger" type="button" data-burger aria-label="Open menu"><i></i><i></i><i></i></button></div>
    <div class="tp-mnav">${pages.map((n, i) => `<a data-pg="${i}"${pg === i ? ' class="on"' : ""}>${n}</a>`).join("")}<a class="tp-btn" data-pg="4">${t.cta}</a></div>`;
  const btns = `<div class="tp-btns"><a class="tp-btn" data-pg="4">${t.b1}</a><a class="tp-btn ghost" data-pg="1">${t.b2}</a></div>`;
  const stats = `<div class="tp-stats">${t.stats.map(s => `<div><b>${s[0]}</b><small>${s[1]}</small></div>`).join("")}</div>`;
  const text = `<span class="tp-kick">${t.kicker}</span><h1>${t.title}</h1><p class="tp-sub">${t.sub}</p>${btns}`;
  let widget = img(0, "", "tall");
  if (t.widget === "form") widget = `<div class="tp-card tp-form"><b>Request a consultation</b><span>Full name</span><span>Phone or email</span><span class="big">How can we help?</span><i>Send securely</i><small>Encrypted · Reply within 48 hours</small></div>`;
  if (t.widget === "booking") widget = `<div class="tp-card tp-book"><b>Book a visit</b><small>Dr. Lee · Cleaning & exam</small><div class="tp-days"><span>Mon<br><em>12</em></span><span class="on">Tue<br><em>13</em></span><span>Wed<br><em>14</em></span><span>Thu<br><em>15</em></span></div><div class="tp-slots"><span>8:40</span><span class="on">9:20</span><span>11:00</span><span>1:30</span><span>3:15</span><span>4:00</span></div><i>Confirm Tue 9:20 AM</i></div>`;
  if (t.widget === "dash") widget = `<div class="tp-card tp-dash"><div class="tp-kpis"><div><small>Jobs today</small><b>48</b></div><div><small>On time</small><b>96%</b></div><div><small>Revenue</small><b>$21.4k</b></div></div><div class="tp-bars">${[38, 55, 46, 70, 62, 84, 92, 76, 98].map(h => `<i style="height:${h}%"></i>`).join("")}</div><div class="tp-rows"><span><i></i>Crew A · Bayview Ln<em>En route</em></span><span><i></i>Crew C · Marsh Ct<em>On site</em></span></div></div>`;
  let hero;
  if (t.layout === "split" || t.layout === "dash") hero = `<section class="tp-hero split"><div>${text}${stats}</div>${widget}</section>`;
  else if (t.layout === "center") hero = `<section class="tp-hero center"><div>${text}</div><div class="tp-trio">${img(1)}${img(2, "", "mid")}${img(3)}</div></section>`;
  else if (t.layout === "full") hero = `<section class="tp-hero full" style="--art:${tpArt(t, 0)}"><div class="tp-shade"></div><div class="tp-in">${text}${t.widget === "search" ? `<div class="tp-search"><span>City, neighborhood or ZIP</span><span>Any price</span><span>3+ beds</span><i>Search</i></div>` : ""}</div></section>${stats.replace("tp-stats", "tp-stats band")}`;
  else hero = `<section class="tp-hero editorial"><span class="tp-kick">${t.kicker}</span><h1>${t.title}</h1><div class="tp-ed"><p class="tp-sub">${t.sub}</p>${btns}</div><div class="tp-row">${img(0)}${img(1, "", "wide")}${img(2)}</div></section>`;
  const feats = `<section class="tp-feats">${t.feats.map((f, i) => `<div><i>${String(i + 1).padStart(2, "0")}</i><b>${f[0]}</b><p>${f[1]}</p></div>`).join("")}</section>`;
  let items = "";
  const L = t.list;
  if (t.items === "cards") items = `<div class="tp-cards">${L.map((x, i) => `<div class="tp-cardi">${img(i + 4)}<div><b>${x[0]}</b><p>${x[1]}</p><span class="tp-price">${x[2]}</span></div></div>`).join("")}</div>`;
  if (t.items === "menu") items = `<div class="tp-menu">${L.map(x => `<div><span><b>${x[0]}</b><small>${x[1]}</small></span><i></i><em>${x[2]}</em></div>`).join("")}</div>`;
  if (t.items === "products") items = `<div class="tp-prods">${L.map((x, i) => `<div>${img(i + 2, "", "sq")}<b>${x[0]}</b><small>${x[1]}</small><em>${x[2]}</em></div>`).join("")}</div>`;
  if (t.items === "schedule") items = `<div class="tp-sched">${L.map((x, i) => `<div class="${i === 1 ? "on" : ""}"><em>${x[0]}</em><b>${x[1]}</b><small>${x[2]}</small><a class="tp-btn ${i === 1 ? "" : "ghost"}" data-pg="4">${t.id === "gather" ? "Details" : "Book"}</a></div>`).join("")}</div>`;
  if (t.items === "listings") items = `<div class="tp-cards">${L.map((x, i) => `<div class="tp-cardi">${img(i + 1)}<div><span class="tp-price big">${x[2]}</span><b>${x[0]}</b><p>${x[1]}</p></div></div>`).join("")}</div>`;
  if (t.items === "gallery") items = `<div class="tp-gal">${L.map((x, i) => `<div class="g${i}">${img(i + 1)}<small>${x[0]}</small></div>`).join("")}</div>`;
  const list = (more = true) => `<section class="tp-list"><div class="tp-h2"><h2>${t.secTitle}</h2>${more ? `<a class="tp-link" data-pg="1">View all →</a>` : ""}</div>${items}</section>`;
  const quote = `<section class="tp-quote"><span class="tp-stars">★★★★★</span><blockquote>“${t.quote[0]}”</blockquote><small>${t.quote[1]}</small></section>`;
  const cta = `<section class="tp-cta"><div><h2>${t.ctaT}</h2><p>${t.ctaS}</p></div><a class="tp-btn" data-pg="4">${t.b1}</a></section>`;
  const foot = `<footer class="tp-foot"><a class="tp-logo" data-pg="0">${t.brand}</a><span class="tp-flinks">${pages.map((n, i) => `<a data-pg="${i}">${n}</a>`).join("")}</span><small>© 2026 ${t.brand.replace(/&/g, "&amp;")}</small></footer>`;
  const head = (intro, i) => `<section class="tp-phead" style="--art:${tpArt(t, i + 6)}"><div><small><a data-pg="0">Home</a> / ${pages[pg]}</small><h1>${pages[pg]}</h1><p class="tp-sub">${intro}</p></div><div class="tp-img"></div></section>`;
  let body;
  if (pg === 1) body = head(t.sub, 1) + list(false) + feats + cta;
  else if (pg === 2) body = head(`Why people choose ${t.brand}.`, 2) + `<section class="tp-zig">${t.feats.map((f, i) => `<div>${img(i + 7)}<div><i>${String(i + 1).padStart(2, "0")}</i><h2>${f[0]}</h2><p>${f[1]} ${t.sub}</p><a class="tp-link" data-pg="4">Get started →</a></div></div>`).join("")}</section>` + stats.replace("tp-stats", "tp-stats band") + quote + cta;
  else if (pg === 3) body = head(`A closer look at ${t.brand}.`, 3) + `<section class="tp-list"><div class="tp-gal">${[...L, ...L].slice(0, 6).map((x, i) => `<div class="g${i}">${img(i + 9)}<small>${x[0]}</small></div>`).join("")}</div></section>` + quote + cta;
  else if (pg === 4) body = head(t.ctaS, 4) + `<section class="tp-contact"><div class="tp-card tp-form"><b>Send us a message</b><span>Your name</span><span>Email or phone</span><span class="big">How can we help?</span><i>${t.b1}</i><small>We reply within one business day</small></div><div class="tp-info"><div><small>Call or text</small><b>(555) 010-0142</b></div><div><small>Hours</small><b>Mon–Fri 8am–6pm<br>Sat 9am–2pm</b></div><div><small>Visit</small><b>214 Harbor Street<br>Your Town, VA</b></div>${img(12, "", "map")}</div></section>`;
  else body = hero + feats + list() + quote + cta;
  return `<div class="tp${t.up ? " up" : ""}" data-page="${pg}" style="${vars}">${nav}${body}${foot}</div>`;
}
