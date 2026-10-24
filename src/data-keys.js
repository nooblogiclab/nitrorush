/* Keyword + PYQ-frequency patch for existing banks.
   Attaches mark-fetching KEYWORDS (what the examiner ticks) and HOT tags
   (repeated PYQ) to items in window.SSC_SUBJECTS. Matched by substring. */
(function () {
  var PATCH = [
    // ---- Science & Tech Part 1 ----
    { m: "universal law of gravitation", keys: ["F = G·m1·m2/r²", "along line joining them", "G = 6.67×10⁻¹¹ N·m²/kg²"], hot: "PYQ favourite" },
    { m: "redox reaction", keys: ["simultaneous oxidation + reduction", "H₂ oxidised → reductant", "CuO reduced → oxidant"] },
    { m: "Joule's law", keys: ["H = I²Rt", "bulb / heater / iron (any one)", "fuse: low mp, series with live"], hot: "PYQ favourite" },
    { m: "Snell's law", keys: ["sin i / sin r = constant (n)", "denser → rarer", "i > critical angle", "fibre / diamond / mirage (any two)"], hot: "PYQ favourite" },
    { m: "object at 2F of convex", keys: ["1/f = 1/v − 1/u", "v = +2f", "m = −1", "real, inverted, same size"] },
    { m: "roasting and calcination", keys: ["roasting: sulphide + excess air (2ZnS…)", "calcination: carbonate, no air (CaCO₃…)"], hot: "PYQ favourite" },
    { m: "homologous series", keys: ["differ by −CH₂−", "same functional group", "eg CH₄, C₂H₆, C₃H₈"] },
    { m: "anomalous behaviour of water", keys: ["contracts 0→4°C", "max density at 4°C", "ice floats / aquatic life survives", "graph shown"], hot: "PYQ favourite" },
    { m: "Chandrayaan-1, Mangalyaan and Chandrayaan-3", keys: ["C-1: water on moon", "Mangalyaan: first-attempt Mars", "C-3: south-pole landing"] },
    { m: "noble gases inert", keys: ["complete octet", "Na loses 1e⁻", "Cl gains 1e⁻ → Na⁺Cl⁻"] },
    { m: "Escape velocity", keys: ["√(2gR)", "≈ 11.2 km/s"] },
    // ---- Science & Tech Part 2 ----
    { m: "Define vestigial organs. Name human examples", keys: ["degenerate, useless remnants", "appendix / tail-bone / wisdom teeth", "functional in other animals"], hot: "PYQ · asked 3+ times" },
    { m: "human digestive system", keys: ["salivary amylase", "HCl + pepsin", "bile emulsifies (no enzymes)", "trypsin / lipase", "villi absorb"], hot: "PYQ · asked 5+ times" },
    { m: "human heart and explain double circulation", keys: ["right side → lungs", "left side → body", "no mixing of blood", "valves: one-way flow", "labelled diagram"], hot: "PYQ · asked 5+ times" },
    { m: "reflex action", keys: ["involuntary, sudden", "example: hot object", "receptor→sensory→spinal→motor→muscle"] },
    { m: "What is biogas", keys: ["anaerobic digestion", "methane-rich", "digester → holder → outlet", "smoke-free + manure"], hot: "PYQ · asked 5+ times" },
    { m: "useful and four harmful effects of microorganisms", keys: ["fermentation", "antibiotics", "vaccines", "sewage treatment", "cholera / TB", "food spoilage"] },
    { m: "steps of biotechnology", keys: ["isolate gene", "plasmid vector", "insert into host", "select + multiply", "insulin / Bt cotton"] },
    { m: "ill-effects of tobacco and alcohol", keys: ["dependence / craving", "tobacco: cancer", "alcohol: liver", "family + economic loss", "counselling / de-addiction"] },
    { m: "pre-, during- and post-disaster", keys: ["pre: mapping + drills", "during: rescue + shelters", "post: survey + rehab"] },
    { m: "Classify vertebrates", keys: ["Pisces", "Amphibia", "Reptilia", "Aves", "Mammalia", "2 examples each"] },
    { m: "aerobic and anaerobic respiration", keys: ["O₂ needed / not", "mitochondria / cytoplasm", "38 ATP / 2 ATP", "CO₂+water / lactic acid"] },
    { m: "sickle-cell anaemia is caused", keys: ["mutation — sudden heritable DNA change"], hot: "PYQ · 2023" },
    { m: "Human males have", keys: ["44 + XY (46 total)"], hot: "PYQ · 2023" },
    { m: "Bile juice is secreted", keys: ["liver", "emulsifies fats, no enzymes"], hot: "PYQ favourite" },
    { m: "Functional unit of kidney", keys: ["nephron"], hot: "PYQ favourite" },
    { m: "Biogas mainly contains", keys: ["methane (~60%)"], hot: "PYQ favourite" },
    { m: "Mitosis produces", keys: ["2 identical diploid cells"], hot: "PYQ favourite" },
    // ---- Maths ----
    { m: "Roots of x²−5x+6=0", keys: ["(x−2)(x−3) = 0"], hot: "PYQ favourite" },
    { m: "Sum of first 15 natural", keys: ["15×16/2 = 120"], hot: "PYQ favourite" },
    { m: "Diagonal of a square of side 7", keys: ["side × √2"], hot: "PYQ favourite" },
    { m: "Angle in a semicircle", keys: ["90° — Thales"], hot: "PYQ favourite" },
    { m: "Distance between (0,0) and (3,4)", keys: ["3-4-5 → 5"], hot: "PYQ favourite" }
  ];
  var subs = window.SSC_SUBJECTS || [];
  PATCH.forEach(function (p) {
    subs.forEach(function (s) {
      ["mcq", "shortQs"].forEach(function (k) {
        (s[k] || []).forEach(function (it) {
          if (it.q && it.q.indexOf(p.m) !== -1) {
            if (p.keys && !it.keys) it.keys = p.keys;
            if (p.hot && !it.hot) it.hot = p.hot;
          }
        });
      });
    });
  });
})();
