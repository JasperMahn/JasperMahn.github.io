/* =================================================================
   CONTENT.JS: everything that changes as the build goes on.
   Status, build phases, parts and budget, and the build log.
   The site sorts log entries by date automatically (oldest first).
   ================================================================= */


/* ---------- 1. CURRENT STATUS ---------- */

status({
  name: "Jasper Mahn",
  location: "San Juan Islands, Washington",
  phase: "Battery",
  summary: "Taking apart a blown Tesla battery pack to find the faulty section and test the good cells.",
  updated: "2026-10-18",
});


/* ---------- 2. BUILD PHASES ("done", "now" or "next") ---------- */

phase("Learn EV basics", "done");
phase("Buy and inspect the frame", "done");
phase("Choose mid-drive or hub motor", "done");
phase("Tear down and inspect the chassis", "now");
phase("Design motor and battery placement", "now");
phase("Build the battery pack and BMS", "now");
phase("Buy the motor and controller", "next");
phase("Fabricate mounts and battery box", "next");
phase("Wiring and kill switch", "next");
phase("Rebuild the brakes", "next");
phase("Bench test", "next");
phase("First low-speed ride", "next");


/* ---------- 3. PARTS AND BUDGET ----------
   part(name, cost, "bought" | "planned" | "backup", note)
   0 = free, null = cost not known yet. Backup parts aren't counted. */

part("1984 Honda XR250R rolling chassis (no engine)", 100, "bought", "Frame, Pro-Link swingarm, wheels and forks");
part("Gas for the trip to pick up the frame", 89, "bought", "");
part("Salvaged Tesla 18650 battery pack (one blown section)", 0, "bought", "Being tested as the cell source for the bike's pack");
part("QS138 70H 3000 W mid-drive motor + EM150-2SP controller kit", 615, "planned", "72 V kit sold for dirt bike conversions");
part("JBD 20S smart BMS, 84 V charger and pack supplies", 220, "planned", "Estimate. Supplies: nickel strip, cell holders, fuse, connectors, wire");
part("Motor sprocket, mount and battery box material, brake parts, programming cable, kill switch", 200, "planned", "Estimate");
part("Import duty on parts shipped from China", null, "planned", "Depends on the seller and how orders are combined");
part("New 18650 cells, if the salvaged cells don't pass testing", 625, "backup", "Estimate: $550 to $700 for 140 cells");


/* ---------- 4. BUILD LOG ----------
   kind: "work" (hands-on) or "research" (research and planning).
   hours: a number (5, 2.5) or "h:mm" ("1:25").
   List the most important items first: only the first 3 show
   until someone clicks "See more".                                  */

entry({
  date: "2026-08-09",
  dateLabel: "Aug 9–22, 2026",
  kind: "research",
  title: "Choosing a donor bike",
  hours: 8,
  progress: [
    "Compared donor bikes that could handle an electric motor's torque for under $600",
    "Narrowed the choice to a mid-1980s Honda XR250R rolling chassis",
    "Wrote an inspection checklist and a list of questions for the seller",
    "Chose a mid-drive motor over a hub motor",
  ],
  challenges: [
    "Mini bikes (YZ80, KX80) and the DR100 were ruled out: their thinner tubing and forks aren't built for EV torque and battery weight",
    "Brake completeness on the listed bike was uncertain and had to be verified before buying",
    "Newer aluminum-frame motocross bikes are hard to modify and cost more, even wrecked",
  ],
  learned: [
    "Why a full-size steel frame suits EV torque loads and is easy to weld mounts onto",
    "Known weak points of 1980s XR250Rs: steering head bearings, swingarm pivot bushings, cracking at the Pro-Link mount, subframe fatigue, drum brakes and damper-rod forks",
    "Mid-drive vs hub motors: a mid-drive keeps the stock chain and swingarm and gets torque from gearing",
    "Building the battery pack is the highest-risk phase, needing cell testing, a correctly sized BMS and a mentor",
  ],
});

entry({
  date: "2026-08-23",
  kind: "work",
  title: "Picking up the frame",
  hours: 13,
  progress: [
    "Drove down and picked up the 1984 XR250R rolling chassis for $100",
  ],
  challenges: [],
  learned: [],
});

entry({
  date: "2026-09-06",
  kind: "work",
  title: "First inspection and measuring the engine bay",
  hours: 3.5,
  progress: [
    "Measured the empty engine bay where the motor and battery will go",
    "Inspected the frame, rear shock, Pro-Link linkage, forks and steering head",
    "Cleaned mud and dirt off the frame",
    "Checked the front disc brake and the rear axle",
  ],
  challenges: [
    "Brake hardware on the rolling chassis had to be checked for missing parts",
  ],
  learned: [],
  photos: [
    "2026-09-06-01.jpg | The bike as it arrived: a 1984 XR250R rolling chassis with no engine",
    "2026-09-06-02.jpg | Rear shock and the frame space the engine used to fill",
    "2026-09-06-03.jpg | Pro-Link swingarm and linkage",
    "2026-09-06-04.jpg | Front fork gaiters",
    "2026-09-06-05.jpg | Steering head and triple clamp",
    "2026-09-06-06.jpg | Kayaba rear shock",
    "2026-09-06-07.jpg | Rear axle nut off",
    "2026-09-06-08.jpg | Front brake disc and caliper bracket",
    "2026-09-06-09.jpg | Measuring the length of the engine bay",
    "2026-09-06-10.jpg | Measuring the height of the engine bay",
  ],
});

entry({
  date: "2026-09-06",
  kind: "research",
  title: "Choosing cells, BMS and motor kit",
  hours: 1,
  progress: [
    "Picked target parts: Samsung 30Q-class 18650 cells, a JBD 20S smart BMS and the QS138 70H motor kit",
    "Compared a motor-only listing with a full kit that includes the controller and display",
  ],
  challenges: [
    "Counterfeit cells are common, so cells have to come from verified sellers like 18650batterystore, Fogstar or Illumn",
  ],
  learned: [
    "How to weigh cells for safety, cost and track record",
    "Why a Bluetooth smart BMS (JBD) beats a basic one: every cell group's voltage can be checked from a phone",
  ],
});

entry({
  date: "2026-09-08",
  kind: "research",
  title: "Sourcing battery cells",
  hours: "1:15",
  progress: [
    "Compared cell sources: verified retailers (about $5–6 per cell), bulk wholesale (about $3) and salvaged pulls ($0.63–2)",
    "Evaluated a salvaged doorbell-camera cell listing at $0.63 per cell",
    "Compared LiFePO4 with lithium-ion chemistry",
  ],
  challenges: [
    "Cheap marketplace cells are often counterfeit or relabeled, so listed brand names can't be trusted",
    "The salvage listing didn't name the cell model, so its discharge rating couldn't be verified",
    "The salvaged 2-packs can't be used as-is: they're likely wired in series, use thin wiring, and have circuit boards that would conflict with an external BMS",
  ],
  learned: [
    "LiFePO4 trade-offs: safer and longer-lasting, but it needs 23 cells in series instead of 20 and adds weight",
    "Salvaged cells need individual capacity and load testing before they go in a pack",
    "Why verified retailers are worth the higher price per cell",
  ],
});

entry({
  date: "2026-09-12",
  kind: "work",
  title: "Front end teardown",
  hours: 5,
  progress: [
    "Removed forks",
    "Removed front disc brakes",
    "Removed front wheel",
    "Removed fork gaiters and cleaned forks",
    "Cleaned and greased chain",
    "Removed front mudguard",
  ],
  challenges: [
    "Front axle was rusted to the front wheel",
    "Left fork was leaking oil",
    "Vice grips were stripping the nuts on the bike",
    "Chain was covered in rust and dirt",
  ],
  learned: [
    "How calipers and disc brakes work",
    "How different parts of a dirt bike work together",
    "Applications of socket wrenches vs vice grips",
    "Importance of grease in preventing rust",
    "How to clean and care for rusted parts",
  ],
  photos: [
    "2026-09-12-01.jpg | Front axle out, after fighting the rust",
    "2026-09-12-02.jpg | Front brake caliper off the disc, tied up with string",
    "2026-09-12-03.jpg | Measuring fork position in the clamp before pulling the forks",
    "2026-09-12-04.jpg | Frame with the forks removed",
    "2026-09-12-05.jpg | Forks, gaiters and front fender on the bench",
    "2026-09-12-06.jpg | Everything from the front end laid out",
    "2026-09-12-07.jpg | Small parts sorted so they go back in the right place",
    "2026-09-12-08.jpg | Chain after cleaning and greasing",
    "2026-09-12-09.jpg | Frame plate: XR250R, built October 1983 as a 1984 model",
    "2026-09-12-10.jpg | Frame up on blocks with the front end off",
  ],
  videos: [
    "2026-09-12-02.mp4 | Walk-through of the parts on the bench",
  ],
});

entry({
  date: "2026-09-13",
  kind: "work",
  title: "Rear wheel and drum brake",
  hours: 2.5,
  progress: [
    "Removed rear wheel",
    "Dismantled drum brakes",
    "Removed rear axle",
  ],
  challenges: [
    "No accessible information on how to remove the rear wheel on this specific bike",
    "A torque bar had to be rigged up to get enough leverage on the axle nut",
    "The frame sat on a single stack of wood blocks, which is unstable for torque work without the engine's weight",
    "Bolts were frozen, and rust remover was needed to loosen them",
  ],
  learned: [
    "How drum brakes work",
    "The removal order: chain, brake rod, torque arm bolt, cotter pin and axle nut, adjusters, then the axle",
    "Factory axle nut torque for the XR250R: 58–80 ft-lb (80–110 N·m)",
    "How chain tensioners work",
    "Applications of a torque bar",
    "Assembly of rear wheel mounts on a dirt bike",
  ],
  photos: [
    "2026-09-13-01.jpg | Rear end on blocks, ready to come apart",
    "2026-09-13-02.jpg | Pro-Link linkage under the swingarm",
    "2026-09-13-03.jpg | Rear sprocket and axle",
    "2026-09-13-04.jpg | Drum brake backing plate and actuator arm",
    "2026-09-13-05.jpg | Backing plate off the wheel",
    "2026-09-13-06.jpg | Rear brake shoes",
    "2026-09-13-07.jpg | Axle adjuster, nut and spacers",
    "2026-09-13-08.jpg | Inside the rear hub drum",
  ],
});

entry({
  date: "2026-09-14",
  kind: "research",
  title: "Salvaged Tesla modules and cell formats",
  hours: 1,
  progress: [
    "Looked into building the pack from salvaged Tesla modules",
    "Evaluated the Molicel P42A 21700 cell as an alternative",
  ],
  challenges: [
    "Salvaged modules have an unknown history, and getting the cells out means removing welded tabs and rebuilding from scratch",
  ],
  learned: [
    "A cell rated far above the pack's demand (45 A vs about 6–7 A per cell) adds cost and weight without a benefit, and switching to 21700s means redesigning the cell holders",
    "Tesla Model S and X modules use 18650 cells; Model 3 and Y use 2170s",
  ],
});

entry({
  date: "2026-09-23",
  kind: "research",
  title: "Full cost and build plan review",
  hours: "1:25",
  progress: [
    "Reviewed the complete parts list, real costs and build order",
  ],
  challenges: [
    "The all-in cost came to about $1,800 with new cells, over the $1,500 budget, once the charger, BMS, pack supplies, sprocket, mounts, brake parts, programming cable and import duty were counted",
    "Samsung 35E cells are rated for only 8 A continuous, while the EM150 controller can draw up to 150 A at peak, over 20 A per cell in a 7P pack",
  ],
  learned: [
    "The controller's battery-current limit has to be set to match the cells and the BMS",
    "Chain line: the motor sprocket has to sit in the same plane as the rear sprocket, on mounts stiff enough for the motor's torque",
    "Buying the motor before designing the mounts means designing around the real part",
  ],
});

entry({
  date: "2026-09-27",
  kind: "research",
  title: "Reaching out to an experienced builder",
  hours: 1,
  progress: [
    "Drafted an email asking an experienced EV builder for advice on sourcing the motor and cells",
  ],
  challenges: [],
  learned: [
    "Specific technical questions, with the key specs included, get more useful answers than open-ended ones",
  ],
});

entry({
  date: "2026-10-07",
  kind: "work",
  title: "Testing a blown Tesla battery pack",
  hours: 3,
  progress: [
    "Acquired a blown Tesla battery pack",
    "Identified it as a Tesla-built module from a Mercedes A-Class E-Cell (W169), with 15 cell groups in series",
    "Tested the voltage of each unit in the battery pack",
  ],
  challenges: [
    "The pack is blown in one section, so it is very dangerous if mishandled",
    "One battery sheet is blown, so the voltage of each one had to be tested to find the faulty sheet",
    "The module is 15S (about 55 V) but the motor kit needs 72 V (20S), so the cells would have to be rebuilt into a new pack",
    "Readings were inconsistent: group C4 read 0 V, the full-module reading kept drifting down, and a second meter read one group at 4.17 V when the rest had read 3.47–3.5 V",
    "Little information is available on how to dismantle Tesla battery packs",
    "The kit's 428-size motor sprocket doesn't match the bike's 520 chain",
  ],
  learned: [
    "Battery arrangement: wiring in series vs parallel",
    "How to test voltage within a large battery pack",
    "18650 voltage range: 4.2 V is full, 3.6–3.7 V is nominal, about 3.0–3.3 V is empty",
    "A meter should be checked against a known battery before its readings are trusted",
    "How a BMS connector works",
    "How to use a voltmeter and multimeter",
    "Why 40 mph takes only a few horsepower: the power to push through air grows with the cube of speed",
    "How sprocket sizes trade top speed against hill-climbing torque",
    "Converting motor power to horsepower: 3,000 W is about 4 hp continuous",
  ],
  notes: `The pack's 20-pin connector reaches every cell group plus two temperature sensors, so each group can be checked one at a time without opening the pack.`,
  photos: [
    "2026-10-07-01.jpg | The module on the shop bench",
    "2026-10-07-02.jpg | Module label",
    "2026-10-07-03.jpg | Cell-group sense connector",
    "2026-10-07-04.jpg | Reading one cell group: 3.47 V",
    "2026-10-07-05.jpg | First look at the 18650 cells inside",
  ],
});

entry({
  date: "2026-10-14",
  kind: "work",
  title: "Opening the module",
  hours: 2,
  progress: [
    "Removed the module cover and cell interconnect plates",
    "Exposed the cells for testing",
  ],
  challenges: [
    "Every exposed plate is live at up to about 60 V, so no tool could be allowed to bridge two plates",
    "It wasn't clear how the power collected by each plate reaches the output terminals",
    "The plates are odd shapes and don't line up, which made the faulty group (C4) hard to locate",
  ],
  learned: [
    "How a series module is built: only the two end plates connect to the terminals, and each middle plate joins one group's positive to the next group's negative",
    "Safe handling of an open, live module: no metal jewelry, plastic tools where possible, and tape over exposed plates",
    "Sense wires tap each plate so every group's voltage can be read",
    "Measuring plate to plate checks a group directly, skipping the connector and sense wires",
  ],
  photos: [
    "2026-10-14-01.jpg | Taking the module apart",
    "2026-10-14-02.jpg | Cells exposed with the interconnect plates removed",
    "2026-10-14-03.jpg | Interconnect plates labeled so the layout is documented",
  ],
});
