/* Lesson-purity banks: every chapter carries its OWN full 40m set
   (Q1.A 5 MCQ + Q1.B 5 + Q2.A 3 + Q2.B 5 + Q3 8 + Q4 2), so chapter
   papers/prints NEVER borrow questions from other lessons.
   Loaded AFTER data-sci / data-maths / data-ssteng / data-mastery files. */
(function () {
  var SUB = function (id) { return (window.SSC_SUBJECTS || []).find(function (s) { return s.id === id; }); };
  var MQ = function (sid, arr) { var s = SUB(sid); if (!s || !s.mcq) { if (window.console) console.warn("[lesson-purity] skipped MCQs, subject not loaded:", sid); return; } arr.forEach(function (o) { s.mcq.push(o); }); };
  var MB = function (key, bank) { window.SSC_MASTERY[key] = bank; };
  var MT = function (key, arr) { var b = (window.SSC_MASTERY || {})[key]; if (!b || !b.three) { if (window.console) console.warn("[lesson-purity] skipped items, mastery bank not loaded:", key); return; } arr.forEach(function (o) { b.three.push(o); }); };

  /* ---------- SCIENCE MCQs (each chapter to 5+) ---------- */
  MQ("sci1", [
    { ch: "le", q: "A convex lens of focal length 20 cm forms a same-sized real image when the object is at", opts: ["10 cm from the lens", "20 cm from the lens", "40 cm from the lens", "Between F and 2F"], ans: 2, exp: "Same-size real inverted image forms at 2F = 40 cm." },
    { ch: "me", q: "Sulphide ores of zinc and lead are concentrated by", opts: ["Gravity separation", "Magnetic separation", "Froth floatation", "Hand picking"], ans: 2, exp: "Oil-froth carries sulphide particles to the top." },
    { ch: "cc", q: "Ethanol on heating with concentrated H2SO4 at 443 K gives", opts: ["Ethene", "Ethane", "Methanol", "Acetic acid"], ans: 0, exp: "Dehydration removes H2O → ethene (CH2=CH2)." },
    { ch: "sp", q: "INSAT series satellites are parked in", opts: ["Low earth orbit", "Medium earth orbit", "Geostationary orbit", "Polar orbit"], ans: 2, exp: "GEO ≈ 35,780 km; 24-hour period for TV/weather." }
  ]);
  MQ("sci2", [
    { ch: "he2", q: "Which connecting link joins reptiles and mammals?", opts: ["Peripatus", "Archaeopteryx", "Platypus (duck-billed)", "Lungfish"], ans: 2, exp: "Platypus lays eggs yet suckles its young.", hot: "PYQ · 2023" },
    { ch: "ge", q: "A solar water heater works mainly on", opts: ["Photovoltaic cells", "Blackened surface absorbing heat", "Mirrors boiling water", "Biogas burner"], ans: 1, exp: "Flat-plate collector: black absorber → heat, not electricity." },
    { ch: "sh", q: "Long-term alcohol abuse mainly damages the", opts: ["Lungs", "Liver", "Kidneys", "Skin"], ans: 1, exp: "Alcoholic liver: fatty liver → cirrhosis." },
    { ch: "sh", q: "Which habit combination best manages exam stress?", opts: ["Tobacco and isolation", "Late nights and energy drinks", "Regular exercise, hobbies and talking", "Skipping meals and overstudy"], ans: 2, exp: "Exercise, hobbies, communication = textbook stress plan." },
    { ch: "dm", q: "Which Maharashtra region faces recurring drought?", opts: ["Konkan coast", "Marathwada", "Western Ghats crest", "Mumbai suburbs"], ans: 1, exp: "Rain-shadow Marathwada; relief + watershed work." },
    { ch: "dm", q: "In first aid, the 'A' of ABC stands for", opts: ["Alertness", "Airway", "Artery", "Ankle"], ans: 1, exp: "Airway → Breathing → Circulation order." }
  ]);

  /* ---------- SCIENCE Q3 three-markers (each chapter to 8) ---------- */
  MT("sci1:g", [
    { q: "Derive the relation g = GM/R² and state how g changes with height and depth.", model: "On the surface, mg = GMm/R², so cancelling m gives g = GM/R², where M and R are the earth's mass and radius. The value of g decreases with height as g′ = g(1 − 2h/R) and also decreases with depth inside the earth. The value of G is constant throughout the universe, but g changes from place to place.", keys: ["g = GM/R²", "decreases with height", "G is constant"] }
  ]);
  MT("sci1:pc", [
    { q: "Explain the reaction of alkali metals with water and the trend down the group.", model: "Alkali metals like sodium and potassium react violently with water, releasing hydrogen gas with great heat. The vigour of this reaction increases down the group, so potassium burns with a lilac flame while lithium only fizzes. Because of this danger, sodium and potassium are stored in kerosene away from air and moisture.", keys: ["react violently with water", "increases down the group", "stored in kerosene"] }
  ]);
  MT("sci1:cr", [
    { q: "Explain double displacement reaction with the barium sulphate precipitation activity.", model: "When barium chloride solution mixes with sodium sulphate solution, the two compounds exchange their ions. A white precipitate of BaSO4 appears while sodium chloride stays dissolved, proving the exchange. The equation BaCl2 + Na2SO4 → BaSO4 + 2NaCl is a classic double displacement reaction.", keys: ["exchange their ions", "white precipitate of BaSO4", "double displacement reaction"] }
  ]);
  MT("sci1:ee", [
    { q: "State the right-hand thumb rule and describe the magnetic field of a straight wire and a solenoid.", model: "The right-hand thumb rule states that if the thumb points in the current direction, the curled fingers show the magnetic field direction. Around a straight current-carrying wire the field forms concentric circles that weaken with distance. A current-carrying solenoid behaves like a bar magnet with clear north and south poles.", keys: ["right-hand thumb rule", "concentric circles", "behaves like a bar magnet"] }
  ]);
  MT("sci1:he", [
    { q: "Explain conduction, convection and radiation with one example each.", model: "In conduction heat passes by direct contact in solids, as when a metal spoon placed in hot tea becomes hot. In convection heat travels with the bulk movement of fluids, as in boiling water or a sea breeze. In radiation heat reaches us without any medium, as the sunlight warming the earth shows.", keys: ["direct contact in solids", "bulk movement of fluids", "without any medium"] }
  ]);
  MT("sci1:rl", [
    { q: "A ray enters water (n = 1.33) from air at 45°. Find the refraction angle and state the bending rule.", model: "By Snell's law, sin r = sin 45° / 1.33 = 0.707 / 1.33 = 0.5317, so r ≈ 32°. Because light enters a denser medium, it bends towards the normal, and the refraction angle is smaller than the incidence angle. This bending towards the normal always happens when light travels from a rarer to a denser medium.", keys: ["r ≈ 32°", "bends towards the normal", "Snell's law"] }
  ]);
  MT("sci1:le", [
    { q: "Explain the working of a simple microscope (magnifying glass) with a ray diagram.", model: "In a simple microscope the small object is placed inside F of a convex lens, very close to it. The lens forms a virtual, erect and magnified image on the same side as the object. Watch repairers and readers use this lens to see tiny details clearly.", keys: ["inside F of a convex lens", "virtual, erect and magnified", "Watch repairers"] }
  ]);
  MT("sci1:me", [
    { q: "Explain the thermite reaction and state its use in welding railway tracks.", model: "When aluminium powder reacts with ferric oxide, a highly exothermic displacement forms molten iron and aluminium oxide. The reaction Fe2O3 + 2Al → 2Fe + Al2O3 releases intense heat and light. The molten iron fills gaps and cracks, so the mixture is used for welding railway tracks and machine parts.", keys: ["highly exothermic", "molten iron", "welding railway tracks"] }
  ]);
  MT("sci1:cc", [
    { q: "Explain three physical properties of carbon compounds and give the reason for each.", model: "Carbon compounds have low melting and boiling points because the forces between their molecules are weak. They are generally insoluble in water but dissolve in organic solvents like alcohol and ether. They are poor conductors of electricity because they do not form ions in any state.", keys: ["low melting and boiling points", "insoluble in water", "poor conductors of electricity"] }
  ]);
  MT("sci1:sp", [
    { q: "Explain how Indian satellites help in weather forecasting and disaster management (two uses).", model: "INSAT satellites track the formation and movement of cyclones, so coastal districts get early warning and evacuation time. Remote sensing satellites map floods, drought and crop damage, guiding fast relief to the worst-hit areas. Hence space technology directly saves lives during disasters.", keys: ["track the formation and movement of cyclones", "map floods", "early warning"] }
  ]);
  MT("sci2:he2", [
    { q: "Explain the role of mutation in evolution, with the sickle-cell example.", model: "Hugo de Vries proposed the mutation theory, stating that sudden inheritable changes in genes create new characters in a generation. Most mutations are neutral or harmful, but useful ones are preserved by natural selection over generations. Sickle-cell anaemia arises from such a gene change in haemoglobin and continues through inheritance.", keys: ["mutation theory", "Hugo de Vries", "sickle-cell anaemia"] }
  ]);
  MT("sci2:lp1", [
    { q: "Explain the mechanism of breathing in humans (inhalation and exhalation).", model: "During inhalation the diaphragm contracts and moves down while the ribs move up, so the chest expands and air rushes in. During exhalation the diaphragm relaxes and the chest shrinks, pushing air out of the lungs. Inside the lungs the alveoli provide a large surface for gaseous exchange between air and blood.", keys: ["diaphragm contracts", "alveoli", "gaseous exchange"] }
  ]);
  MT("sci2:ge", [
    { q: "Explain wind energy: energy change, Maharashtra sites and two limitations.", model: "In a wind turbine the kinetic energy of wind rotates large blades connected to a generator, producing electricity. In Maharashtra the plateaus of Satara and Sangli have strong steady winds ideal for wind farms. The limitations are that wind is an intermittent source and turbines need large open land away from homes.", keys: ["kinetic energy of wind", "Satara and Sangli", "intermittent source"] }
  ]);
  MT("sci2:ac", [
    { q: "Explain why classification is necessary, using the whale as an example.", model: "Millions of species exist, so a scientific system of classification is necessary to study and identify them. The whale looks like a fish but breathes with lungs and feeds its babies with milk, so the whale is a mammal and not a fish. Correct classification thus predicts an animal's characters and shows evolutionary relationships among groups.", keys: ["scientific system of classification", "whale is a mammal", "evolutionary relationships"] }
  ]);
  MT("sci2:mi", [
    { q: "What is vaccination? Explain how a vaccine builds immunity, with an example.", model: "A vaccine contains weakened or killed germs that cannot cause the disease but trigger the immune system. After vaccination the body makes antibodies and memory cells that respond rapidly during a real infection. Edward Jenner used this principle to make the first vaccine against smallpox.", keys: ["weakened or killed germs", "memory cells", "Edward Jenner"] }
  ]);
  MT("sci2:cb", [
    { q: "Distinguish between mitosis and meiosis (three points) and state one significance of each.", model: "Mitosis produces 2 identical diploid cells and helps in growth and repair of the body. Meiosis produces 4 different haploid cells and forms gametes for sexual reproduction. The crossing over in meiosis creates genetic variation, which drives evolution.", keys: ["2 identical diploid cells", "4 different haploid cells", "genetic variation"] }
  ]);
  MT("sci2:sh", [
    { q: "Explain how cleanliness and physical exercise protect our social health (three points).", model: "Clean surroundings prevent the spread of infection and keep public places dignified, so neighbours cooperate happily. Regular physical exercise manages exam and work stress and keeps the body energetic for social activities. Confident healthy habits improve communication and social participation in family and community life.", keys: ["prevent the spread of infection", "manages exam and work stress", "improve communication and social participation"] }
  ]);
  MT("sci2:dm", [
    { q: "Prepare a home disaster kit and explain the use of any four items.", model: "A home disaster kit must contain a torch with extra batteries for light during power cuts. It should have sealed drinking water and dry food for at least three days of survival. Keep copies of important documents in a waterproof bag for quick evacuation and later claims. A box of first-aid medicines with bandages handles small injuries before help arrives.", keys: ["torch with extra batteries", "important documents", "first-aid medicines"] }
  ]);

  /* ---------- ALGEBRA ---------- */
  MB("alg:le2", { one: [    { q: "Condition for a unique solution of a1x+b1y=c1, a2x+b2y=c2?", model: "The pair has a unique solution when a1/a2 ≠ b1/b2.", keys: ["a1/a2 ≠ b1/b2"] },
    { q: "Solve x+y=5, x−y=1.", model: "Adding both equations gives 2x=6, so x=3 and y=2.", keys: ["x=3", "y=2"] },
    { q: "What does the graph of each linear equation in two variables represent?", model: "Each equation represents a straight line, and their intersection point is the solution.", keys: ["straight line"] },
    { q: "Check consistency: 2x+3y=7 and 4x+6y=15.", model: "Since 2/4 = 3/6 ≠ 7/15, the lines are parallel and there is no solution.", keys: ["parallel", "no solution"] },
    { q: "If x+2y=8 and 2x+y=7, find x−y.", model: "Subtracting the first equation from the second gives x − y = −1.", keys: ["x − y = −1"] }
  ], reasons: [
    { q: "Show that x=3, y=2 satisfies both x+y=5 and x−y=1.", model: "For x=3, y=2: 3+2=5 matches the first equation. Also 3−2=1 matches the second equation. Hence (3,2) is the solution of the pair.", keys: ["3+2=5", "3−2=1", "solution of the pair"] },
    { q: "Justify: the pair 2x+3y=7, 4x+6y=15 is inconsistent.", model: "Here a1/a2 = 2/4 = 1/2 and b1/b2 = 3/6 = 1/2, but c1/c2 = 7/15, which is different. Equal a,b ratios with an unequal c ratio means parallel lines. Hence the pair is inconsistent with no solution.", keys: ["parallel lines", "inconsistent", "no solution"] },
    { q: "Why does multiplying an equation by a non-zero number not change its solution?", model: "Multiplying both sides by the same non-zero number keeps the balance of the equality. Every solution of the original equation still satisfies the new one. Hence the solution set remains unchanged.", keys: ["same non-zero number", "solution set remains unchanged"] }
  ], two: [
    { q: "Solve by elimination: 3x+2y=12, x−y=1.", model: "Multiply the second equation by 2: 2x−2y=2. Adding to the first: 5x=14, so x=14/5 and y=9/5. Verification in both equations confirms the solution.", keys: ["5x=14", "x=14/5", "y=9/5"] },
    { q: "Solve by substitution: x+3y=9, 2x−y=4.", model: "From the first: x=9−3y. Substituting in the second: 2(9−3y)−y=4, so 18−7y=4 and y=2. Then x=9−6=3.", keys: ["x=9−3y", "y=2", "x=9−6=3"] },
    { q: "The sum of two numbers is 15 and their difference is 3. Find them.", model: "Let the numbers be x and y: x+y=15 and x−y=3. Adding: 2x=18, so x=9. Then y=15−9=6.", keys: ["x+y=15", "x=9", "y=15−9=6"] },
    { q: "Find the solution of y=2x+1 and y=−x+4 by equating.", model: "At the intersection 2x+1=−x+4, so 3x=3 and x=1. Then y=2(1)+1=3. The lines meet at (1,3), the solution.", keys: ["3x=3", "x=1", "(1,3)"] },
    { q: "Check whether (4,−1) is a solution of 2x+3y=5.", model: "Substituting: 2(4)+3(−1)=8−3=5, which equals the RHS. Hence (4,−1) is a solution of the equation.", keys: ["2(4)+3(−1)=8−3=5", "is a solution"] },
    { q: "How many solutions does x−y=2, 3x−3y=6 have? Justify.", model: "The second equation is exactly 3 times the first, so both represent the same line. Hence there are infinitely many solutions on the coincident lines.", keys: ["same line", "infinitely many solutions"] }
  ], three: [
    { q: "Solve 2x+3y=11 and 4x−y=9 by elimination, with verification.", model: "Multiply the second by 3: 12x−3y=27. Adding to the first: 14x=38, so x=19/7. Then 4(19/7)−y=9 gives y=76/7−63/7=13/7. Substituting x=19/7, y=13/7 in the first: 38/7+39/7=77/7=11 verifies the solution.", keys: ["14x=38", "x=19/7", "y=13/7"] },
    { q: "The larger of two numbers is 5 more than the smaller; their sum is 25. Find them.", model: "Let the smaller be x and the larger y: y=x+5 and x+y=25. Substituting: x+x+5=25, so 2x=20 and x=10. Then y=10+5=15.", keys: ["y=x+5", "2x=20", "y=10+5=15"] },
    { q: "A father is 3 times his son's age; after 5 years their sum will be 70. Find present ages.", model: "Let the son be x and the father 3x. After 5 years: (x+5)+(3x+5)=70, so 4x+10=70 and 4x=60, giving x=15. The father is 3×15=45.", keys: ["3x", "4x=60", "x=15", "45"] },
    { q: "Solve: x/2 + y/3 = 4 and x − y = 3.", model: "Multiplying the first by 6: 3x+2y=24. From the second x=y+3, so 3(y+3)+2y=24, giving 5y+9=24 and 5y=15, so y=3. Then x=3+3=6.", keys: ["3x+2y=24", "5y=15", "x=3+3=6"] },
    { q: "Solve 2x+3y=13 and 4x+6y=26. What do you observe?", model: "The second equation is exactly twice the first, so both represent the same line. The ratios satisfy a1/a2=b1/b2=c1/c2. Hence there are infinitely many solutions on the coincident lines.", keys: ["same line", "infinitely many solutions"] },
    { q: "Solve by substitution: 3x−4y=10 and 2x+y=8.", model: "From the second: y=8−2x. Substituting: 3x−4(8−2x)=10, so 3x−32+8x=10 and 11x=42, giving x=42/11. Then y=8−84/11=4/11.", keys: ["y=8−2x", "11x=42", "x=42/11"] },
    { q: "The sum of digits of a two-digit number is 9; reversing digits gives 27 more. Find it.", model: "Let tens digit be x, units y: x+y=9. Reversing: (10y+x)−(10x+y)=27, so 9y−9x=27 and y−x=3. Solving: 2y=12, so y=6 and x=3. The number is 36.", keys: ["x+y=9", "y−x=3", "36"] },
    { q: "Solve graphically: x+y=6, x−y=2 (lines + intersection).", model: "The line x+y=6 passes through (6,0) and (0,6), while x−y=2 passes through (2,0) and (0,−2). Plotting both, they intersect at the point (4,2). Hence the solution is x=4, y=2.", keys: ["(6,0) and (0,6)", "intersect at the point (4,2)", "x=4, y=2"] }
  ], five: [
    { q: "A two-digit number plus its reverse is 121; digit difference is 3. Find and verify it.", model: "Let digits be x,y: number=10x+y, reverse=10y+x. Sum: 11x+11y=121, so x+y=11. Difference: x−y=3. Adding: 2x=14, so x=7 and y=4. The number is 74; check: 74+47=121 and 7−4=3.", keys: ["x+y=11", "x−y=3", "74+47=121"] },
    { q: "Solve 2x+3y=16 and 3x+2y=19 by elimination, with full verification.", model: "Multiply the first by 3: 6x+9y=48; multiply the second by 2: 6x+4y=38. Subtracting: 5y=10, so y=2. Substituting: 2x+6=16, so 2x=10 and x=5. Verification in the second: 3(5)+2(2)=15+4=19.", keys: ["5y=10", "y=2", "x=5", "15+4=19"] }
  ] });
  MB("alg:qe", { one: [
    { q: "Standard form of a quadratic equation?", model: "The standard form is ax²+bx+c=0, where a≠0.", keys: ["ax²+bx+c=0", "a≠0"] },
    { q: "Roots of x²−5x+6=0?", model: "Factorising (x−2)(x−3)=0, the roots are x=2 and x=3.", keys: ["x=2", "x=3"] },
    { q: "Formula for the discriminant?", model: "The discriminant is D = b²−4ac.", keys: ["D = b²−4ac"] },
    { q: "Nature of roots when D < 0?", model: "The equation has no real roots when D<0.", keys: ["no real roots"] },
    { q: "Sum and product of roots of ax²+bx+c=0?", model: "Sum of roots = −b/a and product of roots = c/a.", keys: ["−b/a", "c/a"] }
  ], reasons: [
    { q: "Show that x=3 is a root of x²−2x−3=0.", model: "Substituting x=3: 9−6−3=0, which holds true. Hence x=3 is a root of the equation.", keys: ["9−6−3=0", "is a root"] },
    { q: "Justify: x²+4x+4=0 has equal roots.", model: "Here D=16−16=0. A zero discriminant means two equal real roots. Hence x=−2 is a repeated root.", keys: ["D=16−16=0", "equal real roots"] },
    { q: "Why must a≠0 in ax²+bx+c=0?", model: "If a=0, the x² term vanishes and the equation becomes linear. A quadratic must have degree 2. Hence a≠0 is essential.", keys: ["degree 2", "a≠0"] }
  ], two: [
    { q: "Solve x²−7x+12=0 by factorisation.", model: "(x−3)(x−4)=0, so x=3 or x=4.", keys: ["(x−3)(x−4)=0", "x=3 or x=4"] },
    { q: "Find D of 2x²−4x+3=0 and state the nature of roots.", model: "D=16−24=−8. Since D<0, there are no real roots.", keys: ["D=16−24=−8", "no real roots"] },
    { q: "If one root of x²+kx+12=0 is 3, find k.", model: "Substituting: 9+3k+12=0, so 3k=−21 and k=−7.", keys: ["9+3k+12=0", "k=−7"] },
    { q: "Find two consecutive positive integers with product 56.", model: "Let them be x and x+1: x(x+1)=56, so x²+x−56=0 and (x+8)(x−7)=0, giving x=7. The numbers are 7 and 8.", keys: ["x(x+1)=56", "x=7", "7 and 8"] },
    { q: "Solve 5x²−11x+2=0.", model: "5x²−10x−x+2=0 gives 5x(x−2)−1(x−2)=0, so (5x−1)(x−2)=0 and x=1/5 or x=2.", keys: ["(5x−1)(x−2)=0", "x=1/5 or x=2"] },
    { q: "Find the roots of x²+x−6=0 by factorisation.", model: "(x+3)(x−2)=0, so x=2 or x=−3. Check: sum=−1=−b/a and product=−6=c/a.", keys: ["(x+3)(x−2)=0", "x=2 or x=−3"] }
  ], three: [
    { q: "Solve x²−9x+18=0 by completing the square.", model: "Rewriting: (x−9/2)²=81/4−18=9/4. So x−9/2=±3/2, giving (x−9/2)²=9/4 and x=6 or x=3.", keys: ["(x−9/2)²=9/4", "x=6 or x=3"] },
    { q: "Solve 2x²+5x+2=0 by the formula method.", model: "D=25−16=9. Then x=(−5±3)/4, so x=−1/2 or x=−2.", keys: ["D=25−16=9", "x=−1/2 or x=−2"] },
    { q: "Find k if x²−4x+k=0 has equal roots.", model: "For equal roots D=0: 16−4k=0, so 4k=16 and k=4.", keys: ["16−4k=0", "k=4"] },
    { q: "The product of two consecutive even numbers is 168. Find them.", model: "Let them be x and x+2: x(x+2)=168, so x²+2x−168=0 and (x+14)(x−12)=0, giving x=12. The numbers are 12 and 14.", keys: ["x(x+2)=168", "x=12", "12 and 14"] },
    { q: "Solve x²−3x−10=0 and verify sum and product of roots.", model: "(x−5)(x+2)=0, so x=5 or x=−2. Sum=3=−b/a and product=−10=c/a, as required.", keys: ["(x−5)(x+2)=0", "Sum=3=−b/a", "product=−10=c/a"] },
    { q: "A garden's length exceeds its breadth by 4 m; area is 96 m². Find dimensions.", model: "Let breadth be x: x(x+4)=96, so x²+4x−96=0 and (x+12)(x−8)=0, giving x=8. Breadth is 8 m and length is 12 m.", keys: ["x(x+4)=96", "x=8", "12 m"] },
    { q: "Using the formula, solve 3x²−5x+2=0.", model: "D=25−24=1. Then x=(5±1)/6, so x=1 or x=2/3.", keys: ["D=25−24=1", "x=1 or x=2/3"] },
    { q: "If the roots of 2x²−mx+3=0 are equal, find m.", model: "D=m²−24=0, so m²=24 and m=±2√6.", keys: ["m²−24=0", "m=±2√6"] }
  ], five: [
    { q: "A boat's still-water speed is 8 km/h; 15 km upstream and back takes 4 hrs. Find the stream speed.", model: "Let the stream be x: 15/(8−x)+15/(8+x)=4. Simplifying: 240/(64−x²)=4, so 64−x²=60 and x²=4, giving x=2. The stream flows at 2 km/h.", keys: ["15/(8−x)+15/(8+x)=4", "x²=4", "2 km/h"] },
    { q: "Solve 6x²−x−2=0 by factorisation and by formula; show both agree.", model: "Factorisation: 2x(3x−2)+1(3x−2)=0 gives (2x+1)(3x−2)=0, so x=−1/2 or x=2/3. By formula: D=1+48=49 and x=(1±7)/12, giving the same roots. Both methods give the same roots.", keys: ["(2x+1)(3x−2)=0", "D=1+48=49", "same roots"] }
  ] });
  MB("alg:ap", { one: [
    { q: "First term and common difference of 5,9,13,…?", model: "The first term a=5 and the common difference d=4.", keys: ["a=5", "d=4"] },
    { q: "General nth term formula of an AP?", model: "The nth term is tn = a+(n−1)d.", keys: ["tn = a+(n−1)d"] },
    { q: "Is 2,5,8,11,… an AP?", model: "Yes: each term exceeds the previous by 3.", keys: ["exceeds the previous by 3"] },
    { q: "Find d if t₃=10 and a=4.", model: "Using a+2d=10: 4+2d=10, so 2d=6 and d=3.", keys: ["4+2d=10", "d=3"] },
    { q: "Sum formula Sn of an AP?", model: "Sn = n/2 × (2a+(n−1)d), which is also n/2 × (first term + last term).", keys: ["Sn = n/2"] }
  ], reasons: [
    { q: "Show that 3,7,11,15,… is an AP.", model: "Differences: 7−3=4, 11−7=4, 15−11=4. The common difference is constant. Hence it is an AP with d=4.", keys: ["common difference is constant", "d=4"] },
    { q: "Justify: the 20th term of 5,9,13,… is 81.", model: "With a=5, d=4: t₂₀=5+19×4=5+76=81. The formula fits the sequence. Hence t₂₀=81 is correct.", keys: ["5+19×4=5+76=81", "t₂₀=81"] },
    { q: "Why is the sum of the first n natural numbers n(n+1)/2?", model: "It is an AP with a=1,d=1: Sn=n/2×(2+(n−1))=n/2×(n+1). The formula follows directly. Hence the result holds.", keys: ["a=1,d=1", "n/2×(n+1)"] }
  ], two: [
    { q: "Find t₁₀ of 2,5,8,….", model: "With a=2, d=3: t₁₀=2+9×3=29.", keys: ["t₁₀=2+9×3=29"] },
    { q: "Which term of 3,7,11,… is 47?", model: "3+(n−1)4=47 gives 4(n−1)=44, so n−1=11 and n=12.", keys: ["3+(n−1)4=47", "n=12"] },
    { q: "Find the sum of the first 15 natural numbers.", model: "Using n(n+1)/2: 15×16/2=120.", keys: ["15×16/2=120"] },
    { q: "If Sn=3n²+2n, find the 2nd term.", model: "S2=3×4+4=16 and S1=5, so t₂=S2−S1=16−5=11.", keys: ["t₂=S2−S1=16−5=11"] },
    { q: "Find the 8th term from the end of 7,10,13,…,184.", model: "From the end a=184, d=−3: t₈=184+7×(−3)=184−21=163.", keys: ["184+7×(−3)=184−21=163"] },
    { q: "Find the 15th term of 7,10,13,….", model: "Here a=7 and d=3: t₁₅=7+14×3=7+42=49.", keys: ["t₁₅=7+14×3", "49"] }
  ], three: [
    { q: "Find the sum of the first 25 terms of 11,16,21,….", model: "With a=11, d=5: S₂₅=25/2×(22+24×5)=25/2×(22+120)=25/2×142=25×71=1775.", keys: ["d=5", "25/2×142", "1775"] },
    { q: "How many terms of 2,5,8,… add up to 155?", model: "n/2×(4+(n−1)3)=155 gives n(3n+1)=310, so 3n²+n−310=0 and (3n+31)(n−10)=0, giving n=10.", keys: ["n(3n+1)=310", "n=10"] },
    { q: "Find a and d if t₄=13 and t₇=25.", model: "a+3d=13 and a+6d=25. Subtracting: 3d=12, so d=4. Then a=13−12=1.", keys: ["a+3d=13", "d=4", "a=1"] },
    { q: "The 5th term is 17 and the 9th is 29. Find the AP.", model: "a+4d=17 and a+8d=29. Subtracting: 4d=12, so d=3 and a=17−12=5. The AP is 5,8,11,….", keys: ["4d=12", "d=3", "AP is 5,8,11"] },
    { q: "Find the sum of all two-digit numbers divisible by 3.", model: "First is 12, last is 99: n=(99−12)/3+1=30. Sum: S=30/2×(12+99)=15×111=1665.", keys: ["n=(99−12)/3+1=30", "15×111=1665"] },
    { q: "If 7 times the 7th term equals 11 times the 11th term, show t₁₈=0.", model: "7(a+6d)=11(a+10d) gives 7a+42d=11a+110d, so 4a+68d=0 and a+17d=0. But t₁₈=a+17d, so t₁₈=0.", keys: ["4a+68d=0", "t₁₈=a+17d", "t₁₈=0"] },
    { q: "Find the middle term(s) of 7,13,19,…,241.", model: "With d=6: n=(241−7)/6+1=40 terms, an even count. Middle terms are t₂₀ and t₂₁: t₂₀=7+19×6=121 and t₂₁=127.", keys: ["n=(241−7)/6+1=40", "121", "127"] },
    { q: "Three numbers in AP add to 21 with product 231. Find them.", model: "Let them be a−d,a,a+d: 3a=21, so a=7. Product: 7(49−d²)=231, so 49−d²=33 and d²=16, giving d=±4. The numbers are 3,7,11.", keys: ["3a=21", "d²=16", "3,7,11"] }
  ], five: [
    { q: "The sum of the first 7 terms of an AP is 63 and of the first 14 is 224. Find the AP.", model: "S₇=63 gives a+3d=9, and S₁₄=224 gives 2a+13d=32. Doubling the first: 2a+6d=18; subtracting: 7d=14, so d=2. Then a=9−3×2=3, and the AP is 3,5,7,….", keys: ["a+3d=9", "7d=14", "AP is 3,5,7"] },
    { q: "Find the sum of all three-digit numbers divisible by 7.", model: "First is 105, last is 994: n=(994−105)/7+1=128. Sum: S=128/2×(105+994)=64×1099=70,336.", keys: ["n=(994−105)/7+1=128", "64×1099", "70,336"] }
  ] });
  MQ("alg", [
    { ch: "le2", q: "The pair x+2y=5, 2x+4y=10 has", opts: ["No solution", "Unique solution", "Infinitely many solutions", "Exactly two solutions"], ans: 2, exp: "Second equation is 2× the first; coincident lines." },
    { ch: "ap", q: "If a=7 and d=−3, then the 5th term is", opts: ["−5", "−8", "−2", "22"], ans: 0, exp: "t₅ = 7+4×(−3) = −5." },
    { ch: "fp", q: "A shopkeeper charges GST 18% on ₹500. The bill amount is", opts: ["₹518", "₹590", "₹680", "₹500"], ans: 1, exp: "Tax = 90; total = 500+90 = 590." },
    { ch: "st", q: "The mean of 4, 7, x, 9 is 6. Then x =", opts: ["6", "4", "5", "8"], ans: 1, exp: "(20+x)/4=6 → x=4." },
    { ch: "st", q: "For the data 3, 5, 5, 7, 9, the mode is", opts: ["3", "5", "7", "9"], ans: 1, exp: "5 occurs most often." }
  ]);

  MB("alg:fp", { one: [
    { q: "What is GST?", model: "Goods and Services Tax is a single indirect tax levied on the sale of goods and services.", keys: ["indirect tax"] },
    { q: "When do CGST+SGST apply, and when does IGST apply?", model: "Intra-state sales carry CGST+SGST in equal halves, while inter-state sales carry a single IGST.", keys: ["Intra-state", "CGST+SGST"] },
    { q: "Face value vs market value of a share?", model: "Face value is printed on the share certificate; market value is its current trading price.", keys: ["Face value", "market value"] },
    { q: "What is dividend?", model: "Dividend is the share of profit a company pays per share to its shareholders.", keys: ["profit", "shareholders"] },
    { q: "What is brokerage?", model: "Brokerage is the commission paid to the broker on buying or selling shares.", keys: ["commission", "broker"] }
  ], reasons: [
    { q: "Why is GST split as CGST+SGST in intra-state trade?", model: "Both the Centre and the State have taxing rights on the same sale. Splitting keeps both shares equal and transparent. Hence intra-state bills show CGST and SGST halves.", keys: ["Centre and the State", "CGST and SGST"] },
    { q: "Justify: buying shares below face value can still be profitable.", model: "Profit depends on dividend plus price rise, not on face value alone. A low market price with a good dividend gives high yield. Hence below-face-value shares can be profitable.", keys: ["dividend", "high yield"] },
    { q: "Why compare market price with dividend before buying shares?", model: "A high market price with a small dividend gives a poor percentage return. Comparing reveals the true earning rate. Hence comparison prevents overpaying.", keys: ["percentage return", "prevents overpaying"] }
  ], two: [
    { q: "A machine costs ₹20,000 plus 12% GST intra-state. Give CGST, SGST and bill total.", model: "GST=12% of 20,000=₹2,400, split as CGST=₹1,200 and SGST=₹1,200. Bill total=₹22,400.", keys: ["₹2,400", "₹1,200", "₹22,400"] },
    { q: "A share of FV ₹100, MV ₹150 gives 8% dividend. Find dividend amount and yield.", model: "Dividend=8% of FV=₹8. Yield=8/150×100=5.33%.", keys: ["₹8", "5.33%"] },
    { q: "Sneha buys 50 shares at MV ₹120 with 1% brokerage. Total cost?", model: "Shares cost=50×120=₹6,000; brokerage=1% of 6,000=₹60. Total payable=₹6,060.", keys: ["₹6,000", "₹60", "₹6,060"] },
    { q: "Inter-state purchase of ₹10,000 with 18% IGST. Bill amount?", model: "IGST=18% of 10,000=₹1,800. Bill total=₹11,800.", keys: ["₹1,800", "₹11,800"] },
    { q: "CP ₹2,000, profit 12%, then 5% GST on SP. Customer's bill?", model: "SP=2,000×1.12=₹2,240. GST=5% of 2,240=₹112. Customer pays ₹2,352.", keys: ["₹2,240", "₹112", "₹2,352"] },
    { q: "Find the dividend on 200 shares of FV ₹50 at a 10% dividend.", model: "Total face value=200×50=₹10,000. Dividend=10% of 10,000=₹1,000.", keys: ["₹10,000", "₹1,000"] }
  ], three: [
    { q: "A trader sells goods for ₹40,000 intra-state with 12% GST. Give CGST, SGST, invoice.", model: "Taxable value=₹40,000. GST=12% gives ₹4,800, split as CGST=₹2,400 and SGST=₹2,400. Invoice total=₹44,800.", keys: ["₹4,800", "CGST=₹2,400", "₹44,800"] },
    { q: "Ravi bought 100 shares (FV ₹10, MV ₹25), got 20% dividend, sold at ₹30. Gain?", model: "Cost=100×25=₹2,500. Dividend=20% of 1,000=₹200. Sale=100×30=₹3,000. Total gain=3,000+200−2,500=₹700.", keys: ["₹2,500", "₹200", "₹700"] },
    { q: "Marked price ₹5,000, discount 10%, GST 18% intra-state. Payable amount?", model: "Discounted price=5,000−500=₹4,500. GST=18% of 4,500=₹810. Payable=₹5,310 with CGST=SGST=₹405.", keys: ["₹4,500", "₹810", "₹5,310"] },
    { q: "Compare: 200 shares FV50 MV80 dividend 10% vs bank FD at 6%. Which is better?", model: "Investment=200×80=₹16,000. Dividend=10% of 10,000=₹1,000, so yield=1,000/16,000=6.25%. Since 6.25% exceeds 6%, shares earn better.", keys: ["₹16,000", "6.25%", "shares earn better"] },
    { q: "Inter-state goods worth ₹25,000 with 12% IGST. Bill and explanation.", model: "IGST=12% of 25,000=₹3,000. Bill=₹28,000. Inter-state sales carry a single IGST instead of CGST+SGST.", keys: ["₹3,000", "₹28,000", "single IGST"] },
    { q: "Buy 40 shares @₹90, sell @₹110, brokerage 2% both sides. Profit?", model: "Buy cost=40×90=₹3,600 plus 2% (₹72)=₹3,672. Sale=40×110=₹4,400 minus 2% (₹88)=₹4,312. Profit=4,312−3,672=₹640.", keys: ["₹3,672", "₹4,312", "₹640"] },
    { q: "Find dividend percent and yield: MV ₹200, annual dividend ₹15 per share of FV ₹100.", model: "Dividend percent=15/100×100=15%. Yield on investment=15/200×100=7.5%.", keys: ["15%", "7.5%"] },
    { q: "A bill shows CGST ₹450 + SGST ₹450 at 18% GST. Find taxable value and invoice.", model: "Total GST=₹900, which is 18% of value. Taxable value=900/0.18=₹5,000. Invoice total=₹5,900.", keys: ["₹900", "₹5,000", "₹5,900"] }
  ], five: [
    { q: "Machine bought inter-state ₹50,000 + 18% IGST; sold intra-state ₹60,000 + 18% GST. Net GST payable?", model: "Purchase IGST=18% of 50,000=₹9,000, available as ITC. Sale GST=18% of 60,000=₹10,800 (CGST ₹5,400 + SGST ₹5,400). Net payable=10,800−9,000=₹1,800 after adjusting ITC of ₹9,000.", keys: ["₹9,000", "₹10,800", "₹1,800"] },
    { q: "Compare on ₹24,000: (a) 300 shares FV10 MV80 dividend 15%; (b) FD at 7%.", model: "Shares cost=300×80=₹24,000. Dividend=15% of 3,000=₹450, so return=450/24,000=1.875%. The FD at 7% gives ₹1,680, so the FD at 7% is better.", keys: ["₹24,000", "1.875%", "FD at 7% is better"] }
  ] });
  MB("alg:pr", { one: [
    { q: "Define probability of an event.", model: "Probability equals favourable outcomes divided by total possible outcomes.", keys: ["favourable outcomes"] },
    { q: "Probability of a sure event and an impossible event?", model: "P(sure event)=1 and P(impossible event)=0.", keys: ["=1", "=0"] },
    { q: "A die is thrown. What is the sample space?", model: "The sample space is S={1,2,3,4,5,6}, six equally likely outcomes.", keys: ["{1,2,3,4,5,6}"] },
    { q: "Probability of getting 7 on a standard die?", model: "Seven is impossible on a standard die, so P=0.", keys: ["P=0"] },
    { q: "If P(E)=0.35, find P(not E).", model: "P(not E)=1−0.35=0.65.", keys: ["0.65"] }
  ], reasons: [
    { q: "Why does every probability lie between 0 and 1?", model: "Favourable outcomes can never exceed total outcomes, so the ratio is at most 1. A count can never be negative, so the ratio is at least 0. Hence 0≤P(E)≤1 for every event.", keys: ["at most 1", "at least 0", "0≤P(E)≤1"] },
    { q: "Justify: P(head)+P(tail)=1 for a fair coin.", model: "Head and tail are the only two exhaustive outcomes. Their probabilities cover the whole sample space. Hence they add to 1.", keys: ["exhaustive", "add to 1"] },
    { q: "Why are die outcomes called equally likely?", model: "No face is favoured by a fair die's symmetry. Each of the six faces has the same chance 1/6. Hence they are equally likely.", keys: ["same chance 1/6", "equally likely"] }
  ], two: [
    { q: "One card from 52. Find P(face card).", model: "There are 12 face cards in 52: P=12/52=3/13.", keys: ["P=12/52=3/13"] },
    { q: "A die is thrown once. Find P(even number).", model: "Evens are {2,4,6}: P=3/6=1/2.", keys: ["P=3/6=1/2"] },
    { q: "A bag has 4 red and 5 blue balls. Find P(blue).", model: "Total 9 balls: P=5/9.", keys: ["P=5/9"] },
    { q: "One card is drawn from 52 cards. Find P(an ace).", model: "There are 4 aces in 52 cards: P=4/52=1/13.", keys: ["P=4/52=1/13"] },
    { q: "Two coins are tossed. Find P(exactly one head).", model: "S={HH,HT,TH,TT}; favourable HT and TH give P=2/4=1/2.", keys: ["{HH,HT,TH,TT}", "P=2/4=1/2"] },
    { q: "From 52 cards, find P(red queen).", model: "There are 2 red queens in 52: P=2/52=1/26.", keys: ["P=2/52=1/26"] }
  ], three: [
    { q: "Two dice are thrown. Find P(i) sum 9 (ii) doublet (iii) sum 4 or less.", model: "(i) Sum 9 comes from (3,6),(4,5),(5,4),(6,3): P=4/36=1/9. (ii) There are six doublets, so P=6/36=1/6. (iii) Sums 2,3,4 have 1+2+3=6 ways, so P=6/36=1/6.", keys: ["P=4/36=1/9", "six doublets", "1+2+3=6"] },
    { q: "A bag has 3 red, 4 green, 5 white balls. One drawn. Find P(i) green (ii) not red (iii) red or white.", model: "Total is 12. (i) P(green)=4/12=1/3. (ii) Not red covers 9 balls: P=9/12=3/4. (iii) Red or white covers 8 balls: P=8/12=2/3.", keys: ["P(green)=4/12=1/3", "P=9/12=3/4", "P=8/12=2/3"] },
    { q: "A box has 5 defective and 95 good bulbs. One is drawn. Find P(i) good (ii) defective.", model: "Total is 100. (i) P(good)=95/100=19/20. (ii) P(defective)=5/100=1/20. Good bulbs dominate the lot.", keys: ["P(good)=95/100=19/20", "P(defective)=5/100=1/20"] },
    { q: "A spinner has 8 equal sectors numbered 1–8. Find P(i) multiple of 3 (ii) factor of 8 (iii) number above 8.", model: "(i) Multiples of 3 are 3 and 6: P=2/8=1/4. (ii) Factors of 8 are 1,2,4,8: P=4/8=1/2. (iii) Nothing exceeds 8: P=0.", keys: ["P=2/8=1/4", "1,2,4,8", "P=0"] },
    { q: "One card drawn. Find P(i) king (ii) black ace (iii) neither heart nor king.", model: "(i) Four kings: P=4/52=1/13. (ii) Two black aces: P=2/52=1/26. (iii) Exclude 13 hearts plus 3 non-heart kings (16 cards): P=(52−16)/52=36/52=9/13.", keys: ["P=4/52=1/13", "P=2/52=1/26", "36/52=9/13"] },
    { q: "A coin is tossed 3 times. Find P(i) all heads (ii) at least one tail.", model: "There are 8 outcomes. (i) Only HHH works: P=1/8. (ii) All except HHH work: P=7/8.", keys: ["P=1/8", "P=7/8"] },
    { q: "In a leap year find P(i) 53 Sundays (ii) 53 Mondays.", model: "A leap year has 366 days = 52 weeks + 2 extra days. (i) 53 Sundays need a Sunday among the 2 extra days: P=2/7. (ii) Similarly for Mondays: P=2/7.", keys: ["52 weeks + 2 extra days", "P=2/7"] },
    { q: "In a non-leap year find P(53 Sundays).", model: "365 days = 52 weeks + 1 extra day. Only 1 of the 7 choices is a Sunday, so P=1/7.", keys: ["52 weeks + 1 extra day", "P=1/7"] }
  ], five: [
    { q: "One card drawn from 52. Find P of (i) king or queen (ii) red or face card (iii) ace of spades (iv) black numbered card (v) diamond.", model: "(i) 4 kings + 4 queens = 8: P=8/52=2/13. (ii) 26 red + 6 black face = 32: P=32/52=8/13. (iii) Only one ace of spades: P=1/52. (iv) Black numbered cards: 9 ranks × 2 suits = 18: P=18/52=9/26. (v) 13 diamonds: P=13/52=1/4.", keys: ["P=8/52=2/13", "P=32/52=8/13", "P=18/52=9/26"] },
    { q: "Three coins are tossed. Find P of (i) 3 heads (ii) exactly 2 heads (iii) at least 2 heads (iv) no head (v) at most 1 head.", model: "There are 8 outcomes. (i) HHH only: P=1/8. (ii) HHT,HTH,THH: P=3/8. (iii) The three 2-head cases plus HHH: P=4/8=1/2. (iv) TTT only: P=1/8. (v) TTT plus the three 1-head cases: P=4/8=1/2.", keys: ["P=3/8", "P=4/8=1/2", "TTT only"] }
  ] });
  MB("alg:st", { one: [
    { q: "Define mean of data.", model: "Mean is the sum of observations divided by their number.", keys: ["sum of observations"] },
    { q: "Define median.", model: "Median is the middle observation after arranging data in order.", keys: ["middle observation"] },
    { q: "Define mode.", model: "Mode is the observation occurring most frequently.", keys: ["most frequently"] },
    { q: "Formula for mean of grouped data (direct method)?", model: "Mean = Σfixi / Σfi, using class marks xi.", keys: ["Σfixi / Σfi"] },
    { q: "What is cumulative frequency?", model: "Cumulative frequency adds each frequency to all the previous ones.", keys: ["adds each frequency"] }
  ], reasons: [
    { q: "Why must data be arranged before finding the median?", model: "The middle position is meaningful only in sorted order. Unsorted data hides the centre. Hence arrangement is compulsory for median.", keys: ["sorted order", "compulsory for median"] },
    { q: "Why can the mean be misleading when extreme values exist?", model: "One very large value pulls the total up unfairly. The mean then misrepresents typical data. Hence median is preferred for such skewed data.", keys: ["pulls the total up", "median is preferred"] },
    { q: "Justify: the mode of 2,3,3,5,7,3 is 3.", model: "The value 3 occurs three times, more than any other value. The most frequent value is the mode. Hence mode is 3.", keys: ["three times", "mode is 3"] }
  ], two: [
    { q: "Find the mean of 5,8,12,15,20.", model: "Sum=60 over 5 observations: mean=60/5=12.", keys: ["mean=60/5=12"] },
    { q: "Find the median of 7,3,9,1,5.", model: "Sorted: 1,3,5,7,9; the middle is 5.", keys: ["1,3,5,7,9", "middle is 5"] },
    { q: "Find the mode of 4,6,4,9,4,7.", model: "The value 4 occurs three times: mode=4.", keys: ["mode=4"] },
    { q: "Find the mean of the first 10 natural numbers.", model: "Sum=55 over 10 numbers: mean=5.5.", keys: ["mean=5.5"] },
    { q: "If mean is 20 and Σfi=15, find Σfixi.", model: "Σfixi=mean×Σfi=20×15=300.", keys: ["20×15=300"] },
    { q: "Find the median of 4, 9, 2, 7, 5.", model: "Arranging in order: 2, 4, 5, 7, 9. The middle observation is 5.", keys: ["2, 4, 5, 7, 9", "middle observation is 5"] }
  ], three: [
    { q: "Find mean, median and mode of 10,20,30,20,40.", model: "Mean=(10+20+30+20+40)/5=120/5=24. Sorted 10,20,20,30,40: median=20. The value 20 repeats: mode=20.", keys: ["120/5=24", "median=20", "mode=20"] },
    { q: "Calculate the mean: x=5,10,15 with frequencies 3,4,3.", model: "Σfi=10; Σfixi=15+40+45=100. Mean=100/10=10.", keys: ["Σfixi=15+40+45=100", "Mean=100/10=10"] },
    { q: "Find the median of 12,8,20,16,24,10.", model: "Sorted: 8,10,12,16,20,24. Median=(12+16)/2=14.", keys: ["8,10,12,16,20,24", "Median=(12+16)/2=14"] },
    { q: "The mean of 5 observations is 18; one more observation 30 joins. New mean?", model: "Old total=5×18=90. New total=90+30=120 over 6: mean=120/6=20.", keys: ["5×18=90", "mean=120/6=20"] },
    { q: "Find the modal class and mode: 0−10 (4), 10−20 (8), 20−30 (15), 30−40 (6).", model: "Modal class is 20−30 with the highest frequency 15. Mode=20+((15−8)/(30−8−6))×10=20+(7/16)×10=20+4.375=24.375.", keys: ["Modal class is 20−30", "24.375"] },
    { q: "Find the missing frequency if mean is 25: values 10,20,30,40 with frequencies 3,5,f,2.", model: "Mean=(210+30f)/(10+f)=25 gives 210+30f=250+25f, so 5f=40 and f=8.", keys: ["5f=40", "f=8"] },
    { q: "Find the median: 0−10 (5), 10−20 (12), 20−30 (20), 30−40 (8).", model: "N=45, N/2=22.5, so the median class is 20−30. Median=20+((22.5−17)/20)×10=20+2.75=22.75.", keys: ["median class is 20−30", "22.75"] },
    { q: "Mean of 20 observations is 15; 25 was wrongly read as 15. Correct mean?", model: "Wrong total=20×15=300. Correct total=300−15+25=310. Correct mean=310/20=15.5.", keys: ["300−15+25=310", "15.5"] }
  ], five: [
    { q: "Compute mean, median, mode: 0−20 (2), 20−40 (5), 40−60 (10), 60−80 (6), 80−100 (2).", model: "Midpoints give Σfi=25 and Σfixi=20+150+500+420+180=1270, so mean=1270/25=50.8. Median class 40−60: 40+(12.5−7)/10×20=51. Modal class 40−60: 40+(5/9)×20=51.11.", keys: ["mean=1270/25=50.8", "Median class 40−60", "51.11"] },
    { q: "Find the mean daily wage: 100−120 (12), 120−140 (14), 140−160 (8), 160−180 (6).", model: "Midpoints 110,130,150,170; Σfi=40; Σfixi=1320+1820+1200+1020=5360. Mean=5360/40=134, so the mean daily wage is ₹134.", keys: ["Σfixi=1320+1820+1200+1020=5360", "Mean=5360/40=134"] }
  ] });

  /* ---------- GEOMETRY ---------- */
  MB("geo:sim", { one: [
    { q: "State the Basic Proportionality Theorem (BPT).", model: "A line parallel to one side of a triangle divides the other two sides proportionally.", keys: ["other two sides proportionally"] },
    { q: "State the AAA test of similarity.", model: "If three angles of one triangle equal the three angles of another, the triangles are similar.", keys: ["triangles are similar"] },
    { q: "Ratio of areas of two similar triangles?", model: "Their areas are proportional to the squares of corresponding sides.", keys: ["squares of corresponding sides"] },
    { q: "△ABC ~ △PQR with AB/PQ=2/3. Find the area ratio.", model: "Area ratio=(2/3)²=4/9.", keys: ["4/9"] },
    { q: "State the converse of BPT.", model: "If a line divides two sides of a triangle proportionally, it is parallel to the third side.", keys: ["parallel to the third side"] }
  ], reasons: [
    { q: "Justify: all equilateral triangles are similar.", model: "Each angle of an equilateral triangle is 60°, so AAA holds for any pair. Equal angles guarantee similarity. Hence all equilateral triangles are similar.", keys: ["is 60°", "similar"] },
    { q: "Why must corresponding vertices be named in order in similarity?", model: "The order tells which sides and angles correspond to each other. A wrong order mismatches the similarity ratio. Hence correct order is compulsory.", keys: ["correspond", "compulsory"] },
    { q: "Show: the line through midpoints of two sides is parallel to the third side.", model: "Midpoints divide the sides in the ratio 1:1, satisfying the BPT converse condition. A line dividing sides proportionally is parallel. Hence it is parallel to the third side.", keys: ["1:1", "parallel to the third side"] }
  ], two: [
    { q: "DE∥BC with AD=3, DB=6, AE=4. Find EC.", model: "By BPT 3/6=4/EC, so EC=8.", keys: ["EC=8"] },
    { q: "△ABC ~ △DEF, AB=6, DE=9, area of △ABC=24. Find area of △DEF.", model: "Side ratio=(6/9)²=4/9, so area of △DEF=24×9/4=54.", keys: ["area of △DEF=24×9/4=54"] },
    { q: "Perimeters of two similar triangles are 30 and 45. Find the similarity ratio.", model: "Similarity ratio equals perimeter ratio=30/45=2/3.", keys: ["2/3"] },
    { q: "In △PQR, ST∥QR with PS/SQ=1/2 and PT=5. Find PR.", model: "1/2=5/TQ gives TQ=10. Then PR=PT+TQ=15.", keys: ["PR=PT+TQ=15"] },
    { q: "Areas of two similar triangles are 49 and 81. Find the side ratio.", model: "Side ratio=√(49/81)=7/9.", keys: ["7/9"] }
  ], three: [
    { q: "State and prove the Basic Proportionality Theorem.", model: "Statement: a line parallel to one side of a triangle divides the other two sides in the same ratio. Proof: in △ABC with DE∥BC, triangles BDE and CDE share base DE and height, so their areas are equal; area ratios give AD/DB=AE/EC. Thus the theorem holds.", keys: ["same ratio", "AD/DB=AE/EC"] },
    { q: "Prove the converse of BPT.", model: "Given AD/DB=AE/EC, suppose DE is not parallel and draw DF∥BC. By BPT, AF/FC=AD/DB=AE/EC, so F coincides with E. Hence DE is parallel to BC.", keys: ["F coincides with E", "parallel to BC"] },
    { q: "Prove: areas of similar triangles are proportional to squares of corresponding sides.", model: "For △ABC~△PQR with altitudes h1,h2: area ratio=(BC×h1)/(QR×h2)=(BC/QR)×(AB/PQ)=(BC/QR)². Hence proved.", keys: ["(BC/QR)²"] },
    { q: "Prove the midpoint theorem using BPT.", model: "D,E are midpoints, so AD/DB=1=AE/EC. By the converse of BPT, DE∥BC. By similarity (1:2) DE=½BC. Hence proved.", keys: ["AD/DB=1=AE/EC", "DE=½BC"] },
    { q: "Similar triangles have perimeters 36 and 24; AB=9. Find PQ.", model: "Similarity ratio=36/24=3/2. So PQ=AB÷(3/2)=9×2/3=6.", keys: ["36/24=3/2", "9×2/3=6"] },
    { q: "In trapezium ABCD (AB∥CD), diagonals meet at O. Prove OA/OC=OB/OD.", model: "AB∥CD gives alternate angles equal: ∠OAB=∠OCD and ∠OBA=∠ODC. So △OAB~△OCD by AA. Corresponding sides give OA/OC=OB/OD.", keys: ["alternate angles equal", "OA/OC=OB/OD"] },
    { q: "Two poles 9 m and 6 m stand 12 m apart. Find the distance between their tops.", model: "The height difference of 3 m forms a right triangle with base 12 m. Distance=√(144+9)=√153=3√17 m.", keys: ["√(144+9)", "3√17 m"] },
    { q: "State and prove the internal angle-bisector theorem.", model: "The bisector of an angle divides the opposite side in the ratio of the containing sides: BD/DC=AB/AC. A parallel-line construction creates similar triangles proving it. Hence the side divides proportionally.", keys: ["BD/DC=AB/AC", "divides proportionally"] }
  ], five: [
    { q: "In right △ABC (∠B=90°), altitude BD falls on hypotenuse AC. Prove the similarity relations and corollaries.", model: "Altitude BD gives △ABD~△ABC by common angle A, and △BDC~△ABC by common angle C. Hence △ABD~△BDC. Corollaries: AB²=AD×AC and BD²=AD×DC.", keys: ["△ABD~△BDC", "AB²=AD×AC", "BD²=AD×DC"] },
    { q: "State and prove Pythagoras theorem.", model: "In a right triangle, the square of the hypotenuse equals the sum of squares of the other two sides. Proof: draw the altitude to the hypotenuse; from the similar triangles AB²=AD×AC and BC²=CD×AC. Adding: AB²+BC²=AC(AD+DC)=AC².", keys: ["square of the hypotenuse", "AB²+BC²", "AC²"] }
  ] });
  MB("geo:py", { one: [
    { q: "State Pythagoras theorem.", model: "In a right-angled triangle, hypotenuse² = base² + perpendicular².", keys: ["hypotenuse²"] },
    { q: "Give a Pythagorean triplet containing 8.", model: "6,8,10 is a triplet since 36+64=100.", keys: ["6,8,10"] },
    { q: "Hypotenuse 25, one side 7. Find the other side.", model: "Other side=√(625−49)=√576=24.", keys: ["24"] },
    { q: "State the converse of Pythagoras theorem.", model: "If c²=a²+b² in a triangle, the angle opposite side c is a right angle.", keys: ["right angle"] },
    { q: "Diagonal of a 9 cm by 12 cm rectangle?", model: "Diagonal=√(81+144)=√225=15 cm.", keys: ["15"] }
  ], reasons: [
    { q: "Show that 5,12,13 is a Pythagorean triplet.", model: "25+144=169=13², satisfying c²=a²+b². The converse gives a right angle. Hence 5,12,13 is a triplet.", keys: ["169=13²", "triplet"] },
    { q: "Why is the hypotenuse always the longest side?", model: "It faces the largest angle, the 90° angle. Larger angles always face longer sides. Hence the hypotenuse is longest.", keys: ["faces the largest angle", "longest"] },
    { q: "Justify: the diagonal of a square of side a is a√2.", model: "By Pythagoras: diagonal²=a²+a²=2a². Taking the square root gives a√2. Hence proved.", keys: ["2a²", "a√2"] }
  ], two: [
    { q: "Find the hypotenuse for legs 9 and 40.", model: "Hypotenuse=√(81+1600)=√1681=41.", keys: ["41"] },
    { q: "A rhombus has diagonals 16 and 30. Find its side.", model: "Half-diagonals are 8 and 15: side=√(64+225)=√289=17.", keys: ["17"] },
    { q: "Find the height of an equilateral triangle of side 10.", model: "Height=√(100−25)=√75=5√3.", keys: ["5√3"] },
    { q: "Are sides 7,24,25 right-angled?", model: "49+576=625=25², so yes, the triangle is right-angled.", keys: ["625=25²", "right-angled"] },
    { q: "Hypotenuse 17, one leg 8. Find the other leg.", model: "Other leg=√(289−64)=√225=15.", keys: ["15"] }
  ], three: [
    { q: "State and prove the converse of Pythagoras theorem.", model: "If c²=a²+b², construct a right triangle with legs a and b; its hypotenuse is √(a²+b²)=c. By SSS the triangles are congruent, so the angle is 90°. Hence the converse holds.", keys: ["√(a²+b²)=c", "congruent", "90°"] },
    { q: "A 15 m ladder reaches 12 m up a wall. How far is its foot from the wall?", model: "Foot distance=√(225−144)=√81=9 m. The ladder, wall and ground form a right triangle.", keys: ["√(225−144)", "9 m"] },
    { q: "Two poles 12 m and 18 m stand 8 m apart. Find the distance between their tops.", model: "Height difference is 6 m: distance=√(64+36)=√100=10 m.", keys: ["√(64+36)", "10 m"] },
    { q: "Show that sides 9,40,41 form a right triangle and find its area.", model: "81+1600=1681=41², so it is right-angled. Area=½×9×40=180 sq units.", keys: ["1681=41²", "180 sq units"] },
    { q: "In △ABC, ∠B=90°, AB=5, BC=12. Find AC and the perimeter.", model: "AC=√(25+144)=√169=13. Perimeter=5+12+13=30.", keys: ["√169=13", "30"] },
    { q: "A rhombus has side 13 and one diagonal 10. Find the other diagonal.", model: "Half of the known diagonal is 5: half of the other=√(169−25)=√144=12. Full diagonal=24.", keys: ["√144=12", "24"] },
    { q: "State and prove Apollonius theorem.", model: "For median AD to side BC: AB²+AC²=2AD²+2BD², where D is the midpoint of BC. Dropping perpendiculars and applying Pythagoras twice proves it. Hence proved.", keys: ["2AD²+2BD²", "midpoint of BC"] },
    { q: "An isosceles triangle has equal sides 13 and base 10. Find its altitude and area.", model: "Altitude=√(169−25)=√144=12. Area=½×10×12=60.", keys: ["√144=12", "60"] }
  ], five: [
    { q: "Prove the 30-60-90 theorem and find the altitude and area of an equilateral triangle of side 2a.", model: "In a 30-60-90 triangle the side opposite 30° is half the hypotenuse. For equilateral side 2a, half-base=a gives altitude=√(4a²−a²)=a√3. Area=½×2a×a√3=a²√3.", keys: ["half the hypotenuse", "altitude=√(4a²−a²)=a√3", "a²√3"] },
    { q: "Prove: the median to the hypotenuse of a right triangle equals half the hypotenuse.", model: "The hypotenuse is a diameter of the triangle's circumcircle. Its midpoint is the circumcentre, equidistant from all three vertices. Hence the median equals half the hypotenuse.", keys: ["hypotenuse is a diameter", "equidistant", "half the hypotenuse"] }
  ] });
  MB("geo:cir", { one: [
    { q: "Define a tangent to a circle.", model: "A tangent touches the circle at exactly one point.", keys: ["exactly one point"] },
    { q: "How many tangents can be drawn from an external point?", model: "Exactly two tangents can be drawn from an external point.", keys: ["two tangents"] },
    { q: "Tangent length from a point 25 cm away from the centre (radius 7 cm)?", model: "Length=√(625−49)=√576=24 cm.", keys: ["24 cm"] },
    { q: "Two circles touch externally. Relate the centre distance with radii.", model: "The distance between centres equals the sum of radii.", keys: ["sum of radii"] },
    { q: "How many common tangents do two separate circles have?", model: "Four common tangents: two direct and two transverse.", keys: ["Four common tangents"] }
  ], reasons: [
    { q: "Why is only one tangent possible at a point on the circle?", model: "The radius fixes a unique perpendicular direction at that point. Any other line through it cuts the circle twice. Hence only one tangent exists.", keys: ["unique perpendicular", "cuts the circle twice"] },
    { q: "Justify: the two tangents from one external point are equal.", model: "Joining the centre forms two congruent right triangles by RHS. Their corresponding sides are equal. Hence the tangent lengths are equal.", keys: ["congruent right triangles", "equal"] },
    { q: "Why does the perpendicular from the centre bisect a chord?", model: "The two right triangles formed are congruent by RHS. Their corresponding halves match exactly. Hence the perpendicular from the centre bisects the chord.", keys: ["congruent", "bisects the chord"] }
  ], two: [
    { q: "Radius 5 cm, external point 13 cm away. Find the tangent length.", model: "Length=√(169−25)=√144=12 cm.", keys: ["12 cm"] },
    { q: "A chord of length 16 lies in a circle of radius 10. Find its distance from the centre.", model: "Half-chord is 8: distance=√(100−64)=√36=6.", keys: ["6"] },
    { q: "Tangents PA, PB with ∠APB=60° and radius 5. Find OP.", model: "△OAP is a 30-60-90 triangle with OA=5 opposite 30°: OP=10.", keys: ["OP=10"] },
    { q: "Two circles touch internally with radii 8 and 5. Find the centre distance.", model: "Centre distance equals the difference of radii: 8−5=3.", keys: ["8−5=3"] },
    { q: "A 24 cm chord lies 5 cm from the centre. Find the radius.", model: "Half-chord is 12: radius=√(144+25)=√169=13.", keys: ["√169=13"] }
  ], three: [
    { q: "Prove: a tangent is perpendicular to the radius at the point of contact.", model: "Suppose the tangent meets the radius obliquely; then a shorter perpendicular to the line exists, cutting the circle twice. This contradicts tangency at one point. Hence the tangent is perpendicular to the radius.", keys: ["perpendicular to the radius"] },
    { q: "Prove: the two tangents from an external point are equal in length.", model: "Join OP and radii OA, OB: △OAP ≅ △OBP by RHS with a common hypotenuse and equal radii. Corresponding parts give PA=PB. Hence the tangent lengths are equal.", keys: ["△OAP ≅ △OBP", "PA=PB"] },
    { q: "Prove: the line joining the centres of two touching circles passes through the point of contact.", model: "At contact T, both circles share the same tangent line. Each radius is perpendicular to this tangent at T. Both centres lie on this unique perpendicular, so the line of centres passes through T.", keys: ["same tangent line", "passes through T"] },
    { q: "Two circles of radii 6 and 4 touch externally. Find the centre distance and the direct common tangent.", model: "Distance=6+4=10. Direct common tangent=√(d²−(R−r)²)=√(100−4)=√96=4√6.", keys: ["Distance=6+4=10", "4√6"] },
    { q: "A chord 30 cm long lies 8 cm from the centre. Find the radius.", model: "Half-chord is 15: radius=√(225+64)=√289=17.", keys: ["√289=17"] },
    { q: "Prove: equal chords of a circle are equidistant from the centre.", model: "Dropping perpendiculars from the centre to both chords forms congruent right triangles. Their corresponding perpendiculars match. Hence the perpendiculars are equal.", keys: ["congruent", "perpendiculars are equal"] },
    { q: "How many tangents pass through (i) an interior point (ii) a point on the circle (iii) an exterior point?", model: "Through an interior point: zero tangents; through a point on the circle: exactly one tangent; through an exterior point: two tangents. Position decides the count.", keys: ["zero tangents", "exactly one tangent", "two tangents"] },
    { q: "A 24 cm chord of the outer of two concentric circles touches the inner. Outer radius is 13. Find the inner radius.", model: "Half-chord 12 with outer radius 13 forms a right triangle: inner radius=√(169−144)=√25=5.", keys: ["inner radius", "√25=5"] }
  ], five: [
    { q: "State and prove the alternate segment theorem.", model: "The angle between a tangent and a chord equals the angle in the alternate segment. With diameter AD, ∠ABD=90°, so ∠PAB=90°−∠DAB=∠ADB, the angle in the alternate segment. Hence the angles are equal.", keys: ["∠PAB", "angle in the alternate segment", "equal"] },
    { q: "From external P, tangents PA=12 cm are drawn to a circle of radius 5 cm. Find OP and the area of quadrilateral OAPB.", model: "OP=√(144+25)=√169=13. Area=2×(½×5×12)=60 sq cm.", keys: ["√169=13", "60 sq cm"] }
  ] });
  MQ("geo", [
    { ch: "sim", q: "In △ABC, DE∥BC with AD/DB=2/3. Then AE/EC =", opts: ["2/3", "3/2", "4/9", "9/4"], ans: 0, exp: "BPT: AD/DB = AE/EC." },
    { ch: "py", q: "A 13 m ladder reaches a window 12 m high. The foot is away from the wall by", opts: ["5 m", "6 m", "7 m", "4 m"], ans: 0, exp: "√(169−144) = 5 m." },
    { ch: "cir", q: "A tangent at any point of a circle is ___ to the radius through that point.", opts: ["Parallel", "Perpendicular", "Equal", "Inclined at 60°"], ans: 1, exp: "Radius ⊥ tangent at contact." },
    { ch: "co", q: "The distance between (0,0) and (3,4) is", opts: ["5", "7", "25", "6"], ans: 0, exp: "√(9+16) = 5." },
    { ch: "co", q: "The midpoint of (2,6) and (8,2) is", opts: ["(5,4)", "(6,8)", "(2,4)", "(5,2)"], ans: 0, exp: "((2+8)/2, (6+2)/2) = (5,4)." },
    { ch: "men", q: "Volume of a cylinder with r=7 cm, h=10 cm (π=22/7) is", opts: ["1540 cm³", "440 cm³", "770 cm³", "2200 cm³"], ans: 0, exp: "22/7 × 49 × 10 = 1540." },
    { ch: "men", q: "Total surface area of a cube of edge 5 cm is", opts: ["150 cm²", "125 cm²", "100 cm²", "75 cm²"], ans: 0, exp: "6 × 25 = 150." }
  ]);

  MB("geo:con", { one: [
    { q: "Which scale factor enlarges a figure in construction?", model: "A scale factor greater than 1 enlarges the figure.", keys: ["greater than 1"] },
    { q: "First step to divide a segment in a given ratio?", model: "Draw an auxiliary ray making an acute angle with the segment.", keys: ["auxiliary ray"] },
    { q: "How many equal parts are marked on the ray for ratio m:n?", model: "Mark m+n equal parts on the ray.", keys: ["m+n"] },
    { q: "To draw a tangent at a point on the circle, what is drawn first?", model: "First draw the radius to that point.", keys: ["radius"] },
    { q: "How is 22.5° constructed?", model: "Bisect 45°, which itself bisects 90°.", keys: ["Bisect 45°"] }
  ], reasons: [
    { q: "Why does the ray method give the correct division ratio?", model: "Parallel lines through the ray marks cut the segment by BPT. Equal ray parts give proportional segments. Hence the division matches m:n.", keys: ["BPT", "m:n"] },
    { q: "Justify the step of joining the last ray mark to the segment end.", model: "The parallels create smaller similar triangles on the ray. Corresponding sides stay proportional. Hence each part is equal.", keys: ["similar triangles", "proportional"] },
    { q: "Why is angle bisection the basis of constructing 15°?", model: "90° to 60° to 30° to 15° uses bisection plus the standard 60°. Each step halves exactly. Hence 15° is constructible.", keys: ["halves exactly", "15° is constructible"] }
  ], two: [
    { q: "Describe dividing a 9 cm segment in ratio 3:2.", model: "Draw a ray, mark 5 equal parts, join the 5th mark to the segment end, and draw a parallel through the 3rd mark. It cuts the segment in ratio 3:2.", keys: ["5 equal parts", "3:2"] },
    { q: "Construct a triangle similar to △ABC with sides 3/4 of it (steps).", model: "Divide BC into 4 equal parts; through the 3rd mark draw parallels to AB and AC. The inner triangle has sides 3/4 of △ABC.", keys: ["4 equal parts", "3/4"] },
    { q: "Draw tangents from an external point (steps).", model: "Join OP and bisect it; with the midpoint as centre draw a circle. Its intersections with the given circle are the contact points.", keys: ["bisect it", "contact points"] },
    { q: "Construct 67.5° (steps).", model: "Construct 90°, bisect to 45°, then add half of 45° (22.5°) to 45°. The result is 67.5°.", keys: ["22.5°", "67.5°"] },
    { q: "To divide a segment in ratio 5:3, how many ray parts are needed?", model: "Mark 5+3=8 equal parts on the ray and join accordingly.", keys: ["5+3=8"] }
  ], three: [
    { q: "Divide a 12 cm segment internally in ratio 3:4 (construction + justification).", model: "Draw an acute ray from one end and mark 7 equal parts. Join the 7th mark to the other end; draw a parallel through the 3rd mark. By BPT the segment divides in ratio 3:4.", keys: ["7 equal parts", "ratio 3:4"] },
    { q: "Construct a triangle similar to a given triangle with scale factor 5/3 (steps + reason).", model: "Extend the base to fit 5 parts out of 3; draw parallels to the other sides through the division points. The new triangle is similar with sides 5/3 of the original.", keys: ["parallels", "5/3"] },
    { q: "Draw a pair of tangents from a point 8 cm from the centre of a 4 cm circle.", model: "Join OP=8 cm and bisect it at M. With M as centre and MO as radius, draw a circle cutting the given circle at T1,T2. Join P to T1 and T2: the required tangents.", keys: ["bisect it", "required tangents"] },
    { q: "Construct 105° (as 90°+15°) with steps.", model: "Construct 90°, then 60° on the same base; bisect the 30° gap to get 15°. Adding to 90° gives 105°.", keys: ["bisect the 30° gap", "105°"] },
    { q: "Construct the circumcircle of a triangle (steps).", model: "Draw perpendicular bisectors of any two sides; their meeting point O is equidistant from the vertices. With O as centre and OA as radius, draw the circumcircle.", keys: ["perpendicular bisectors", "equidistant from the vertices"] },
    { q: "Construct the incircle of a triangle (steps).", model: "Bisect any two angles; their meeting point I is equidistant from all sides. Drop a perpendicular to one side for the radius and draw the incircle.", keys: ["Bisect any two angles", "equidistant from all sides"] },
    { q: "Divide a 10 cm segment in ratio 2:3:4 (steps).", model: "Draw a ray with 2+3+4=9 equal parts. Join the 9th mark to the segment end; draw parallels through the 2nd and 5th marks. The parts are in ratio 2:3:4.", keys: ["9 equal parts", "2:3:4"] },
    { q: "Justify the tangent construction using the angle in a semicircle.", model: "M is the midpoint of OP, so the auxiliary circle has OP as diameter. Angles T1 and T2 in a semicircle are right angles. Hence PT1, PT2 are perpendicular to radii: the required tangents.", keys: ["semicircle are right angles", "perpendicular to radii"] }
  ], five: [
    { q: "Construct △ABC (AB=5, BC=6, AC=7), then a similar triangle with sides 4/5 of it.", model: "Build △ABC by SSS. Divide BC into 5 equal parts; through the 4th mark draw parallels to AB and AC meeting the other sides. By BPT the inner triangle is similar with sides 4/5 of △ABC.", keys: ["SSS", "4/5 of △ABC"] },
    { q: "Construct a tangent to a 4 cm circle from a point 9 cm away; verify its length.", model: "Join OP=9 cm, bisect at M, and draw the auxiliary circle cutting the given circle at T. PT is the tangent; by Pythagoras PT=√(81−16)=√65≈8.06 cm, matching measurement.", keys: ["bisect at M", "PT=√(81−16)", "8.06 cm"] }
  ] });
  MB("geo:co", { one: [
    { q: "State the distance formula.", model: "Distance=√((x2−x1)²+(y2−y1)²).", keys: ["√((x2−x1)²+(y2−y1)²)"] },
    { q: "State the section formula for internal division m:n.", model: "The point is ((mx2+nx1)/(m+n),(my2+ny1)/(m+n)).", keys: ["(mx2+nx1)/(m+n)"] },
    { q: "Slope of the line through (x1,y1) and (x2,y2)?", model: "Slope=(y2−y1)/(x2−x1).", keys: ["(y2−y1)/(x2−x1)"] },
    { q: "State the midpoint formula.", model: "Midpoint=((x1+x2)/2,(y1+y2)/2).", keys: ["((x1+x2)/2"] },
    { q: "What is the y-coordinate of any point on the x-axis?", model: "Every point on the x-axis has y=0.", keys: ["y=0"] }
  ], reasons: [
    { q: "Why is distance always non-negative?", model: "Distance is the square root of a sum of squares. Squares are never negative. Hence distance is non-negative.", keys: ["sum of squares", "non-negative"] },
    { q: "Justify: (0,0),(3,0),(0,4) form a right triangle.", model: "The sides are 3,4,5 with 9+16=25. Pythagoras is satisfied. Hence it is right-angled.", keys: ["9+16=25", "right-angled"] },
    { q: "Why does the section formula use weighted averages?", model: "The point divides the segment in ratio m:n, weighting each end oppositely. Coordinates blend in that proportion. Hence the formula is a weighted average.", keys: ["m:n", "weighted average"] }
  ], two: [
    { q: "Find the distance between (4,7) and (1,3).", model: "Distance=√((4−1)²+(7−3)²)=√(9+16)=√25=5.", keys: ["√(9+16)=√25=5"] },
    { q: "Find the midpoint of (−3,5) and (7,−1).", model: "Midpoint=((−3+7)/2,(5−1)/2)=(2,2).", keys: ["(2,2)"] },
    { q: "Find k if the distance of (k,3) from (2,7) is 5.", model: "(k−2)²+16=25 gives (k−2)²=9, so k−2=±3 and k=5 or k=−1.", keys: ["(k−2)²=9", "k=5 or k=−1"] },
    { q: "Divide the segment joining (6,3),(−2,9) internally in ratio 1:3.", model: "x=(1×(−2)+3×6)/4=(−2+18)/4=4; y=(1×9+3×3)/4=18/4=9/2. The point is (4,9/2).", keys: ["(−2+18)/4=4", "(4,9/2)"] },
    { q: "Show that (5,8),(3,4),(7,4) form an isosceles triangle.", model: "Sides: √(4+16)=√20, √(4+16)=√20, and base=4. Two equal sides form an isosceles triangle.", keys: ["√20", "isosceles"] }
  ], three: [
    { q: "Prove the distance formula using Pythagoras.", model: "Drop perpendiculars to form a right triangle with legs |x2−x1| and |y2−y1|. By Pythagoras the hypotenuse is √((x2−x1)²+(y2−y1)²). Hence the formula follows.", keys: ["|x2−x1|", "√((x2−x1)²+(y2−y1)²)"] },
    { q: "Show that (2,4),(6,8),(10,4),(6,0) form a square.", model: "All four sides equal √((4)²+(4)²)=√32 each. Diagonals measure 8 and 8. Equal sides with equal diagonals form a square.", keys: ["√32", "Diagonals", "square"] },
    { q: "Find the point dividing (5,9),(−3,7) in ratio 3:1.", model: "x=(3×(−3)+1×5)/4=(−9+5)/4=−1; y=(3×7+1×9)/4=30/4=15/2. The point is (−1,15/2).", keys: ["(−9+5)/4=−1", "(−1,15/2)"] },
    { q: "Find the centroid of the triangle (2,3),(6,7),(4,1).", model: "Centroid=((2+6+4)/3,(3+7+1)/3)=(12/3,11/3)=(4,11/3).", keys: ["(12/3,11/3)", "(4,11/3)"] },
    { q: "Check whether (1,2),(3,4),(5,6) are collinear.", model: "Slopes are (4−2)/(3−1)=1 and (6−4)/(5−3)=1. Equal slopes through a common point mean collinearity. Hence the points are collinear.", keys: ["Equal slopes", "collinear"] },
    { q: "Find the area of the triangle (0,0),(4,0),(0,3).", model: "Base=4 and height=3: area=½×4×3=6 sq units.", keys: ["½×4×3=6"] },
    { q: "If P(x,2) is equidistant from (3,5) and (7,9), find x.", model: "(x−3)²+9=(x−7)²+49 gives x²−6x+18=x²−14x+98, so 8x=80 and x=10.", keys: ["8x=80", "x=10"] },
    { q: "Find the slope and inclination of the line through (0,0) and (√3,3).", model: "Slope=(3−0)/(√3−0)=3/√3=√3. Since tanθ=√3, the inclination is 60°.", keys: ["3/√3=√3", "60°"] }
  ], five: [
    { q: "Prove that (1,2),(4,6),(7,2),(4,−2) form a rhombus and find its area.", model: "Each side is √(9+16)=5: AB=BC=CD=DA=5. Diagonals are AC=6 and BD=8, unequal, so it is a rhombus. Area=½×6×8=24 sq units.", keys: ["BC=CD=DA=5", "AC=6 and BD=8", "Area=½×6×8=24"] },
    { q: "In what ratio does the x-axis divide the segment joining (2,5),(8,−3)? Find the point.", model: "On the x-axis y=0: (5k−3)/(k+1)=0 gives k=3/5. So the ratio is 3:5. The point is x=(24+10)/8=17/4, i.e. (17/4,0).", keys: ["k=3/5", "ratio is 3:5", "(17/4,0)"] }
  ] });
  MB("geo:tr", { one: [
    { q: "Evaluate sin 30° + cos 60°.", model: "sin 30° + cos 60° = 1/2+1/2=1.", keys: ["1/2+1/2=1"] },
    { q: "Value of tan 45°?", model: "tan 45°=1.", keys: ["tan 45°=1"] },
    { q: "Define sin θ in a right triangle.", model: "sin θ equals opposite side divided by hypotenuse.", keys: ["opposite", "hypotenuse"] },
    { q: "Value of sin²θ+cos²θ?", model: "sin²θ+cos²θ=1 for all θ.", keys: ["sin²θ+cos²θ=1"] },
    { q: "If tan θ=1 (acute), find θ.", model: "The acute angle with tangent 1 is θ=45°.", keys: ["θ=45°"] }
  ], reasons: [
    { q: "Why is sin 30°=1/2?", model: "In a 30-60-90 triangle the side opposite 30° is half the hypotenuse. The ratio opposite/hypotenuse is therefore 1/2. Hence sin 30°=1/2.", keys: ["half the hypotenuse", "sin 30°=1/2"] },
    { q: "Justify: tan θ × cot θ = 1.", model: "tan θ=sinθ/cosθ and cot θ=cosθ/sinθ. Their product cancels to 1. Hence tan θ × cot θ=1.", keys: ["cancels to 1", "tan θ × cot θ=1"] },
    { q: "Why does sin θ increase as θ goes from 0° to 90°?", model: "The opposite side grows toward the hypotenuse as the angle opens. The ratio opposite/hypotenuse thus rises to 1. Hence sin θ increases with θ.", keys: ["opposite side grows", "increases with θ"] }
  ], two: [
    { q: "Evaluate: 2tan²45°+cos²30°−sin²60°.", model: "2(1)+3/4−3/4=2.", keys: ["2(1)+3/4−3/4=2"] },
    { q: "If sin A=1/2 (acute), find A and cos A.", model: "A=30°; cos A=√3/2.", keys: ["A=30°", "√3/2"] },
    { q: "Find θ if 2cosθ=√3 (acute).", model: "cosθ=√3/2, so θ=30°.", keys: ["θ=30°"] },
    { q: "Evaluate sin60°cos30°+cos60°sin30°.", model: "(√3/2)(√3/2)+(1/2)(1/2)=3/4+1/4=1.", keys: ["3/4+1/4=1"] },
    { q: "If tanθ=√3, find sinθ+cosθ.", model: "θ=60°: sinθ+cosθ=√3/2+1/2=(√3+1)/2.", keys: ["θ=60°", "(√3+1)/2"] }
  ], three: [
    { q: "Prove: sec²θ−tan²θ=1 using sin²θ+cos²θ=1.", model: "Dividing sin²θ+cos²θ=1 by cos²θ gives tan²θ+1=sec²θ. Rearranging gives sec²θ−tan²θ=1. Hence proved.", keys: ["tan²θ+1=sec²θ", "sec²θ−tan²θ=1"] },
    { q: "Prove: (1−sinθ)(1+sinθ)=cos²θ.", model: "LHS=1−sin²θ. Since sin²θ+cos²θ=1, this equals cos²θ. Hence proved.", keys: ["1−sin²θ", "cos²θ"] },
    { q: "If sinθ=3/5, find cosθ and tanθ.", model: "cosθ=√(1−9/25)=√(16/25)=4/5. Then tanθ=sinθ/cosθ=3/4.", keys: ["4/5", "3/4"] },
    { q: "Evaluate: tan²60°+2cos²45°−sec²30°.", model: "3+2×(1/2)−4/3=3+1−4/3=8/3.", keys: ["8/3"] },
    { q: "A 10 m ladder makes 60° with the ground. How high does it reach?", model: "Height=10×sin60°=10×√3/2=5√3≈8.66 m. The ladder is the hypotenuse.", keys: ["10×√3/2", "8.66 m"] },
    { q: "From 20 m away, a tower's top has 45° elevation. Find its height.", model: "Height=20×tan45°=20×1=20 m. Equal angle gives height equal to distance.", keys: ["20×tan45°", "20 m"] },
    { q: "Prove: √((1−cosθ)/(1+cosθ))=cosecθ−cotθ.", model: "Multiplying top and bottom by (1−cosθ) gives (1−cosθ)/sinθ=1/sinθ−cosθ/sinθ=cosecθ−cotθ. Hence proved.", keys: ["(1−cosθ)/sinθ", "cosecθ−cotθ"] },
    { q: "If cosecθ=13/5, find cotθ.", model: "sinθ=5/13; cosθ=√(1−25/169)=√(144/169)=12/13. So cotθ=12/5.", keys: ["12/13", "12/5"] }
  ], five: [
    { q: "Prove: (sinθ+cosecθ)²+(cosθ+secθ)²=7+tan²θ+cot²θ.", model: "Expanding: sin²θ+cosec²θ+2+cos²θ+sec²θ+2. Using cosec²=1+cot² and sec²=1+tan²: total=1+(1+cot²)+(1+tan²)+4=7+tan²θ+cot²θ. Hence proved.", keys: ["cosec²=1+cot²", "7+tan²θ+cot²θ"] },
    { q: "A kite string 100 m long makes 60° with the ground. Find the kite's height (no slack).", model: "Height=100×sin60°=100×√3/2=50√3≈86.6 m. The string is the hypotenuse of the right triangle.", keys: ["100×√3/2", "86.6 m"] }
  ] });
  MB("geo:men", { one: [
    { q: "Volume of a sphere of radius r?", model: "Volume V=4/3πr³.", keys: ["4/3πr³"] },
    { q: "Curved surface area of a cylinder?", model: "CSA=2πrh.", keys: ["2πrh"] },
    { q: "Volume of a cone?", model: "Volume V=⅓πr²h.", keys: ["⅓πr²h"] },
    { q: "Total surface area of a hemisphere (including base)?", model: "Total surface area=3πr².", keys: ["3πr²"] },
    { q: "If a sphere's radius doubles, what happens to its volume?", model: "Volume depends on r³, so it grows 8 times.", keys: ["8 times"] }
  ], reasons: [
    { q: "Why is a cone's volume one-third of the same-based cylinder's?", model: "The same base and height fill exactly three cones into one cylinder. Experiment and calculus both confirm the ratio. Hence V=⅓πr²h.", keys: ["three cones", "⅓πr²h"] },
    { q: "Justify: doubling the radius quadruples a circle's area.", model: "Area depends on r², so (2r)²=4r². The factor 4 multiplies πr². Hence the area becomes four times.", keys: ["(2r)²=4r²", "four times"] },
    { q: "Why add all parts for a capsule's surface area (cylinder + 2 hemispheres)?", model: "A capsule's surface has three exposed parts. Hidden joining faces are never counted. Hence total area adds all exposed parts.", keys: ["exposed parts"] }
  ], two: [
    { q: "Find the volume of a sphere of radius 21 cm (π=22/7).", model: "V=4/3×22/7×21³=4×22×147=12,936 cm³.", keys: ["12,936 cm³"] },
    { q: "CSA of a cylinder with r=7 cm, h=20 cm.", model: "CSA=2×22/7×7×20=880 cm².", keys: ["880 cm²"] },
    { q: "Volume of a cone with r=6 cm, h=7 cm.", model: "V=⅓×22/7×36×7=264 cm³.", keys: ["264 cm³"] },
    { q: "Edge of a cube with volume 512 cm³?", model: "Edge=∛512=8 cm.", keys: ["8"] },
    { q: "Find the volume of a hemisphere of radius 21 cm.", model: "V=⅔×22/7×21³=6,468 cm³.", keys: ["6,468 cm³"] }
  ], three: [
    { q: "A cylinder (r=7, h=10) melts into a cone (r=10). Find the cone's height.", model: "Cylinder volume=22/7×49×10=1540. Cone: ⅓×22/7×100×h=1540 gives h=1540×3×7/(22×100)=14.7.", keys: ["1540", "14.7"] },
    { q: "Find the TSA of a cube (edge 9) and a cuboid (8×6×4).", model: "Cube: 6×81=486 cm². Cuboid: 2(48+24+32)=2×104=208 cm².", keys: ["486 cm²", "208 cm²"] },
    { q: "How many balls of radius 2 cm can be made from a sphere of radius 6 cm?", model: "Big volume uses 216, each small ball uses 8 (r³ units). Count=216/8=27 balls.", keys: ["216/8=27"] },
    { q: "A tent is a cylinder (r=14, h=10) with a conical top (h=12). Find the canvas area.", model: "Cylinder CSA=2×22/7×14×10=880. Cone slant l=√(196+144)≈18.44; CSA=22/7×14×18.44≈811. Total canvas≈1691 sq m.", keys: ["880", "≈811", "1691"] },
    { q: "A well of diameter 14 m and depth 12 m is dug. Find the earth removed.", model: "With r=7: V=22/7×49×12=1848 m³ of earth.", keys: ["1848 m³"] },
    { q: "Find the height of a cylinder with volume 1540 cm³ and radius 7 cm.", model: "1540=22/7×49×h=154h, so h=10 cm.", keys: ["154h", "h=10 cm"] },
    { q: "A cone has r=7, h=24. Find slant height and CSA.", model: "Slant l=√(49+576)=√625=25. CSA=22/7×7×25=550 cm².", keys: ["=√625=25", "550 cm²"] },
    { q: "Show that a sphere's surface area is 4 times its great circle's area.", model: "Sphere area=4πr²; great circle area=πr². The ratio is exactly 4. Hence proved.", keys: ["4πr²", "ratio is exactly 4"] }
  ], five: [
    { q: "A solid cylinder (r=14, h=20) melts into 12 identical cones (r=7). Find each cone's height.", model: "Cylinder volume=22/7×196×20=12,320 cm³, so each cone has 12,320/12=3,080/3 cm³. With ⅓×22/7×49×h=154h/3: h=3,080/154=20 cm.", keys: ["12,320 cm³", "3,080/154=20 cm"] },
    { q: "A hemispherical bowl (r=21) fills cylindrical bottles (r=7, h=6). How many bottles?", model: "Bowl volume=⅔×22/7×9261=6,468 cm³. One bottle=22/7×49×6=924 cm³. Count=6,468/924=7 bottles.", keys: ["6,468 cm³", "924 cm³", "7 bottles"] }
  ] });

  /* ---------- HISTORY ---------- */
  MB("his:hgw", { one: [
    { q: "Who wrote the 'Histories'?", model: "Herodotus of Greece wrote the 'Histories', the first systematic history.", keys: ["Herodotus"] },
    { q: "What was Voltaire's view of history?", model: "Voltaire held the philosophy of history: reason, not divine will, drives events.", keys: ["reason"] },
    { q: "What was Ranke's method?", model: "Ranke insisted on source criticism and writing history as it really was.", keys: ["source criticism", "as it really was"] },
    { q: "What, for Marx, drives history?", model: "Marx held that class struggle drives history.", keys: ["class struggle"] },
    { q: "Who founded the Annales School?", model: "Febvre and Bloch founded the Annales School of total history.", keys: ["Febvre and Bloch"] }
  ], reasons: [
    { q: "Why did Ranke reject philosophical speculation?", model: "Speculation lacks verifiable evidence. Only criticised sources give facts. Hence Ranke demanded the scientific method.", keys: ["verifiable evidence", "scientific method"] },
    { q: "Why is Marx's approach called materialist?", model: "It roots change in economic production, not ideas or kings. Class conflict over resources moves history. Hence it is materialist.", keys: ["economic production", "materialist"] },
    { q: "Why did Annales historians study climate and trade?", model: "Kings and wars alone cannot explain common life. Climate and trade shape everyday existence. Hence they wrote total history.", keys: ["common life", "total history"] }
  ], two: [
    { q: "Write two features of Herodotus as a historian.", model: "He travelled widely collecting eyewitness accounts. He organised them into the first systematic narrative, the Histories.", keys: ["eyewitness", "first systematic narrative"] },
    { q: "State two ideas of the Annales School.", model: "History must cover climate, trade and everyday life. It decentres kings and wars toward ordinary people.", keys: ["everyday life", "ordinary people"] },
    { q: "What is Foucault's contribution to historiography?", model: "Foucault studied how knowledge and power shape each other. His archaeology of knowledge analyses discourses across eras.", keys: ["power", "discourses"] },
    { q: "How did Marx explain historical change?", model: "Through stages driven by control of production. Class struggle between haves and have-nots topples old orders.", keys: ["control of production", "Class struggle"] },
    { q: "What is the philosophy of history?", model: "It asks why history moves as it does: reason, spirit or matter. Voltaire answered with human reason.", keys: ["human reason"] }
  ], three: [
    { q: "Explain Voltaire's philosophy of history.", model: "Voltaire rejected divine will as history's cause. He argued human reason and rationality move societies forward. His approach is called the philosophy of history.", keys: ["divine will", "human reason", "philosophy of history"] },
    { q: "Explain Ranke's scientific method in historiography.", model: "Ranke demanded criticism of sources for authenticity. He wanted history written as it really was, without moralising. This made historiography a science.", keys: ["criticism of sources", "as it really was", "science"] },
    { q: "Explain Marx's materialist interpretation of history.", model: "Marx rooted change in the mode of production. Class struggle between owners and workers drives each transition. History thus advances through economic conflict.", keys: ["mode of production", "Class struggle", "economic conflict"] },
    { q: "Explain total history with two examples.", model: "Total history covers climate, trade, population and daily life, not just politics. Grain prices explain revolts; disease shapes settlements. Febvre and Bloch pioneered it.", keys: ["daily life", "grain prices", "Febvre and Bloch"] },
    { q: "Write a note on Herodotus as the first historian.", model: "Herodotus travelled across Greece and Persia gathering accounts. He arranged them into the Histories, a connected narrative. Hence he is called the first systematic historian.", keys: ["Histories", "first systematic historian"] },
    { q: "Explain Foucault's archaeology of knowledge.", model: "Foucault examined how each era defines truth through its discourses. Power produces knowledge and knowledge sustains power. His method is called the archaeology of knowledge.", keys: ["discourses", "Power produces knowledge", "archaeology of knowledge"] },
    { q: "Distinguish traditional political history from Annales history (three points).", model: "Traditional history centres kings, wars and dates. Annales history studies structures like climate, economy and everyday life. One narrates events; the other explains long-term change.", keys: ["kings, wars", "everyday life", "long-term change"] },
    { q: "Assess the statement 'History is a science' with Ranke's view.", model: "Ranke gave history a scientific method of source criticism. Verified facts replace legends and bias. Yet interpretation keeps it partly an art. Hence history is a science with artistic judgment.", keys: ["source criticism", "Verified facts", "science"] }
  ], five: [
    { q: "Trace Western historiography from Herodotus to the Annales School.", model: "Herodotus began systematic narrative; Voltaire added reason as the philosophy of history. Ranke made method scientific with source criticism, and Marx added economic stages. Febvre and Bloch completed the arc with total history of everyday life.", keys: ["systematic narrative", "source criticism", "total history"] },
    { q: "Compare Voltaire, Ranke and Marx on 'what drives history?'", model: "Voltaire answered human reason; Ranke refused grand answers and demanded verified facts. Marx answered class struggle over production. Together they show ideas, method and economy shaping historiography.", keys: ["human reason", "verified facts", "class struggle"] }
  ] });
  MB("his:hgi", { one: [
    { q: "Who wrote the Arthashastra?", model: "Kautilya (Chanakya) wrote the Arthashastra on Mauryan polity.", keys: ["Kautilya"] },
    { q: "Who wrote the Harshacharita?", model: "Banabhatta wrote the Harshacharita on Harsha's life.", keys: ["Banabhatta"] },
    { q: "Who wrote the Rajatarangini?", model: "Kalhana wrote the Rajatarangini, Kashmir's chronicle.", keys: ["Kalhana"] },
    { q: "Who wrote the Ain-i-Akbari?", model: "Abul Fazl wrote the Ain-i-Akbari for Akbar.", keys: ["Abul Fazl"] },
    { q: "Who wrote the first connected English history of the Marathas?", model: "James Grant Duff wrote the history of the Marathas.", keys: ["Grant Duff"] }
  ], reasons: [
    { q: "Why is Kalhana called India's first scientific historian?", model: "He dated kings and checked inscriptions critically. He rejected pure legend as fact. Hence his method resembles modern historiography.", keys: ["inscriptions", "modern historiography"] },
    { q: "Why are bakhars valuable yet tricky sources?", model: "Bakhars narrate Maratha-era events firsthand. But they flatter patrons and mix legend. Hence they need cross-checking.", keys: ["firsthand", "cross-checking"] },
    { q: "Why did nationalist historians re-read ancient texts?", model: "Colonial writers called India unchanging and backward. Re-reading showed science, polity and trade. Hence pride and scientific temper grew.", keys: ["Colonial", "scientific temper"] }
  ], two: [
    { q: "Name two court historians with their patrons.", model: "Banabhatta served Harsha; Abul Fazl served Akbar.", keys: ["Banabhatta", "Abul Fazl"] },
    { q: "What are bakhars?", model: "Bakhars are Marathi narrative histories of medieval times. They mix fact with praise.", keys: ["Marathi narrative", "praise"] },
    { q: "Name two sources for Sultanate-Mughal history.", model: "Court chronicles like the Ain-i-Akbari and travellers' accounts. Coins and monuments support them.", keys: ["Ain-i-Akbari", "travellers"] },
    { q: "Who was Grant Duff and why is he read?", model: "A British officer who wrote the first English history of the Marathas. Indians read him critically for facts.", keys: ["Marathas", "critically"] },
    { q: "What is the tarikh tradition?", model: "Tarikh means chronological court history in Persian. It lists reigns, battles and administration year-wise.", keys: ["chronological", "year-wise"] }
  ], three: [
    { q: "Explain the features of ancient Indian historiography.", model: "Ancient India preserved pasts through Puranas, epics and inscriptions. Court poets recorded kings with praise and legend. Modern historians sift facts from these with archaeology.", keys: ["Puranas", "inscriptions", "archaeology"] },
    { q: "Write a note on Kautilya's Arthashastra.", model: "Kautilya wrote the Arthashastra as a manual of Mauryan statecraft. It details taxation, spies, army and diplomacy. It proves ancient Indian political science.", keys: ["Mauryan statecraft", "taxation", "political science"] },
    { q: "Write a note on Kalhana's Rajatarangini.", model: "Kalhana chronicled Kashmir's kings in verse with dates. He compared inscriptions and rejected hearsay. Hence he anticipates scientific historiography.", keys: ["Kashmir", "inscriptions", "scientific historiography"] },
    { q: "Explain Abul Fazl's contribution.", model: "Abul Fazl wrote the Ain-i-Akbari recording Akbar's administration. He listed ranks, revenues and customs precisely. It is the finest Mughal statistical history.", keys: ["Ain-i-Akbari", "revenues", "statistical history"] },
    { q: "Assess Grant Duff's history of the Marathas.", model: "Grant Duff used Maratha records to write the first English narrative. His colonial lens blamed Indian misrule. Indians use his facts while rejecting his bias.", keys: ["Maratha records", "colonial lens", "bias"] },
    { q: "Explain the role of bakhars as sources.", model: "Bakhars narrate Shivaji's and Peshwa-era deeds vividly. They were written by court dependants. So historians verify them with letters and coins.", keys: ["Shivaji", "court dependants", "letters and coins"] },
    { q: "How did nationalist historians change Indian historiography?", model: "They exposed colonial claims of a changeless India. They highlighted science, trade and republican traditions. History became a tool of freedom.", keys: ["colonial", "republican traditions", "freedom"] },
    { q: "Distinguish court histories from folk traditions as sources.", model: "Court histories date events but flatter rulers. Folk songs and powadas preserve popular memory without dates. Good history uses both critically.", keys: ["flatter rulers", "popular memory", "critically"] }
  ], five: [
    { q: "Trace Indian historiography from the Puranas to nationalist history.", model: "Puranas and epics carried legend-mixed memory; Kalhana added dated criticism. Sultanate tarikhs and bakhars recorded medieval rule. Colonial and then nationalist historians made it scientific and patriotic.", keys: ["Puranas", "Kalhana", "nationalist"] },
    { q: "Evaluate Mughal court histories as sources for administration.", model: "The Ain-i-Akbari lists mansabs, revenues and customs in numbers. It reflects the emperor's viewpoint, hiding peasant distress. Used with coins and traveller accounts, it reveals Mughal rule.", keys: ["mansabs", "revenues", "traveller accounts"] }
  ] });
  MB("his:ah3", { one: [
    { q: "Define applied history.", model: "Applied history puts historical research to practical social use.", keys: ["practical social use"] },
    { q: "Name two applied-history institutions.", model: "Museums and archives preserve and display the past.", keys: ["Museums", "archives"] },
    { q: "What is numismatics?", model: "Numismatics is the study of coins.", keys: ["coins"] },
    { q: "What is epigraphy?", model: "Epigraphy is the study of inscriptions.", keys: ["inscriptions"] },
    { q: "Give one tourism use of history.", model: "Heritage sites attract tourists and create local jobs.", keys: ["tourists", "jobs"] }
  ], reasons: [
    { q: "Why preserve old manuscripts?", model: "They carry unique knowledge of science and society. Once lost to damp or fire, they never return. Hence digitisation and archives matter.", keys: ["unique knowledge", "digitisation"] },
    { q: "Why do films need historical consultants?", model: "Wrong costumes and dates mislead crores of viewers. Experts keep the depiction credible. Hence consultants protect both art and truth.", keys: ["mislead", "credible"] },
    { q: "Why are archives called the memory of a nation?", model: "They hold original orders, maps and letters. Without them, claims about the past cannot be proved. Hence they anchor national memory.", keys: ["original", "national memory"] }
  ], two: [
    { q: "Give two branches of applied history.", model: "Museum studies and archival science apply history. Heritage management and tourism are two more.", keys: ["Museum", "tourism"] },
    { q: "How do museums serve education?", model: "Objects let students see the past directly. Guided tours explain context simply.", keys: ["see the past", "Guided tours"] },
    { q: "What does an archivist do?", model: "An archivist catalogues, preserves and supplies records. Scholars use them for research.", keys: ["catalogues", "research"] },
    { q: "Give two uses of inscriptions.", model: "They date kings and record donations. They also reveal language and script change.", keys: ["date kings", "donations"] },
    { q: "How does heritage tourism help locals?", model: "Visitors pay for guides, food and crafts. This income sustains conservation.", keys: ["guides", "conservation"] }
  ], three: [
    { q: "Explain the meaning and scope of applied history.", model: "Applied history uses research for museums, archives, preservation and tourism. It connects scholars with the public. Its scope grows with media and travel.", keys: ["museums", "archives", "public"] },
    { q: "Explain the role of museums in preserving history.", model: "Museums collect, conserve and display objects with labels. They teach students through seeing, not rote. They also aid researchers with reserves.", keys: ["collect, conserve", "labels", "researchers"] },
    { q: "Explain archival science and its importance.", model: "Archives acquire, arrange and protect original records. Catalogues help scholars locate evidence fast. Without archives, history writing stops.", keys: ["original records", "Catalogues", "history writing stops"] },
    { q: "How are inscriptions and coins used together?", model: "Inscriptions date rulers and events in words. Coins confirm reigns through symbols and metals. Together they verify each other.", keys: ["date rulers", "verify each other"] },
    { q: "Explain history's role in film and television.", model: "Serials and films popularise figures like Shivaji. Consultants ensure costumes and facts stay credible. Good productions spark reading.", keys: ["popularise", "credible", "reading"] },
    { q: "Explain how tourism applies history.", model: "Guides narrate monuments with stories and dates. Entry fees fund upkeep and jobs. Responsible tourism preserves sites.", keys: ["Guides", "Entry fees", "preserves sites"] },
    { q: "What skills does an applied historian need?", model: "Research skill to verify facts from sources. Communication skill to write and speak simply. Digital skill to digitise and present.", keys: ["verify facts", "Communication", "digitise"] },
    { q: "Assess: 'History is useless without application.'", model: "Pure research alone reaches few readers. Museums, books and tourism carry it to society. Yet application without research spreads myths. Hence both need each other.", keys: ["Museums", "myths", "both need each other"] }
  ], five: [
    { q: "Describe the working of a museum from collection to display.", model: "Objects arrive by excavation, gift or purchase with records. Conservators clean, date and catalogue them. Curators design galleries with labels and lights, and guides interpret them. Visitors thus learn history by seeing.", keys: ["catalogue", "Curators", "learn history by seeing"] },
    { q: "Plan a heritage walk for your city (four stops with purpose).", model: "Begin at the oldest temple or fort for origins. Visit a museum for objects, a market street for living trade, and a memorial for modern history. A printed leaflet with maps completes the walk.", keys: ["origins", "living trade", "leaflet"] }
  ] });
  MB("his:ar4", { one: [
    { q: "Where are the Ajanta caves?", model: "Ajanta caves lie in Maharashtra's Aurangabad district.", keys: ["Aurangabad"] },
    { q: "Name two classical dances of India.", model: "Bharatanatyam and Kathak are classical dances.", keys: ["Bharatanatyam", "Kathak"] },
    { q: "Name the two streams of Indian classical music.", model: "Hindustani and Carnatic are the two streams.", keys: ["Hindustani", "Carnatic"] },
    { q: "Name the Mughal painting style.", model: "Mughal miniatures paint court life in fine detail.", keys: ["miniatures"] },
    { q: "Name one Indo-Islamic monument.", model: "The Qutub Minar shows Indo-Islamic arches and calligraphy.", keys: ["Qutub Minar"] }
  ], reasons: [
    { q: "Why are Ajanta paintings a historical source?", model: "They show dress, tools and Jataka stories of their age. Art thus records society. Hence historians read paintings as documents.", keys: ["Jataka", "documents"] },
    { q: "Why did Mughal miniatures flourish?", model: "Emperors employed artists and paid for detail. Court patronage gave steady work. Hence the school matured.", keys: ["patronage", "matured"] },
    { q: "Why is classical dance called a living archive?", model: "Gestures carry stories across generations. Guru-shishya training preserves steps exactly. Hence dance archives culture bodily.", keys: ["generations", "culture"] }
  ], two: [
    { q: "Name two temple styles with one example each.", model: "Nagara: Khajuraho; Dravida: Brihadeshwara at Thanjavur.", keys: ["Khajuraho", "Brihadeshwara"] },
    { q: "Give two features of Indo-Islamic architecture.", model: "Pointed arches with domes, plus calligraphy and jalis.", keys: ["domes", "calligraphy"] },
    { q: "Name two folk dances with their states.", model: "Lavani belongs to Maharashtra and Bhangra to Punjab.", keys: ["Lavani", "Bhangra"] },
    { q: "Give two uses of music in history.", model: "Powadas spread heroism; devotional songs unite people.", keys: ["Powadas", "unite"] },
    { q: "Name two colonial buildings in Mumbai.", model: "The CST station and Gateway of India show colonial styles.", keys: ["CST", "Gateway of India"] }
  ], three: [
    { q: "Describe the Ajanta-Ellora caves as art and source.", model: "Ajanta's Buddhist frescoes narrate Jataka tales in mineral colour. Ellora unites Buddhist, Hindu and Jain shrines in rock. Together they reveal faith, craft and trade.", keys: ["frescoes", "Jataka", "Ellora"] },
    { q: "Explain temple architecture with two styles.", model: "Nagara temples rise in curving shikharas like Khajuraho. Dravida temples stack pyramid vimanas like Thanjavur. Sculpture narrates epics on walls.", keys: ["shikharas", "vimanas", "epics"] },
    { q: "Explain Indo-Islamic architecture with examples.", model: "Arches, domes and minarets joined Indian trabeate craft. The Qutub Minar and the Taj Mahal display calligraphy and symmetry. The style speaks of synthesis.", keys: ["domes", "Taj Mahal", "synthesis"] },
    { q: "Write a note on Hindustani and Carnatic music.", model: "Hindustani music grew in the north with khayal and dhrupad. Carnatic music follows composed kritis in the south. Both use raga and tala.", keys: ["khayal", "kritis", "raga"] },
    { q: "Write a note on two classical dances.", model: "Bharatanatyam of Tamil Nadu tells stories through precise gestures. Kathak of the north spins tales with footwork. Both need years of training.", keys: ["Bharatanatyam", "Kathak", "training"] },
    { q: "Explain Mughal miniatures.", model: "Mughal ateliers painted court, hunt and faith in tiny detail. Persian drawing met Indian colour. Akbar's Hamzanama shows the blend.", keys: ["tiny detail", "Hamzanama", "blend"] },
    { q: "How do folk arts preserve history?", model: "Tamasha, Powada and Bhavai sing heroes and events. Village crowds remember dates through songs. Folk art is thus people's archive.", keys: ["Powada", "songs", "archive"] },
    { q: "Assess colonial architecture in Mumbai.", model: "CST and the Gateway mix Gothic with Indian motifs. They served imperial display and railways. Today they are heritage earning pride and tourism.", keys: ["Gothic", "heritage", "tourism"] }
  ], five: [
    { q: "Trace Indian art from Ajanta to Mughal miniatures.", model: "Ajanta gave Buddhist murals; temples added Nagara-Dravida sculpture. Sultanate arches prepared Indo-Islamic synthesis. Mughal miniatures refined detail with a Persian-Indian blend.", keys: ["murals", "synthesis", "miniatures"] },
    { q: "Discuss performing arts as sources of history.", model: "Songs like Powadas record battles and heroes. Dances encode myth and custom. Music gharanas trace teacher lineages. Together they date and describe society.", keys: ["Powadas", "custom", "lineages"] }
  ] });
  MB("his:mm5", { one: [
    { q: "Which was India's first newspaper (1780)?", model: "Hicky's Bengal Gazette of 1780 was India's first newspaper.", keys: ["Bengal Gazette"] },
    { q: "Who started Kesari?", model: "Lokmanya Tilak started Kesari in Marathi with the Mahratta in English.", keys: ["Tilak", "Kesari"] },
    { q: "When did television reach India?", model: "Doordarshan began experimental telecast in 1959 in Delhi.", keys: ["1959", "Delhi"] },
    { q: "Who is the father of Indian cinema?", model: "Dadasaheb Phalke is the father of Indian cinema.", keys: ["Phalke"] },
    { q: "What is a documentary?", model: "A documentary records real events for information.", keys: ["real events"] }
  ], reasons: [
    { q: "Why is Kesari important in freedom history?", model: "Tilak's Kesari spread nationalist ideas in Marathi. It criticised British rule fearlessly. Hence the press read it as a movement.", keys: ["nationalist", "British rule"] },
    { q: "Why is cinema a mass source of history?", model: "Films reach crores beyond readers. Period films shape public memory. Hence historians study cinema seriously.", keys: ["crores", "public memory"] },
    { q: "Why did radio matter before TV?", model: "Radio reached villages cheaply in local languages. News and farm advice travelled fast. Hence Akashvani united the nation.", keys: ["villages", "Akashvani"] }
  ], two: [
    { q: "Name two early newspapers with founders.", model: "The Bengal Gazette by Hicky; Kesari by Tilak.", keys: ["Hicky", "Tilak"] },
    { q: "Give two roles of All India Radio.", model: "News in many languages and farm-weather bulletins.", keys: ["languages", "bulletins"] },
    { q: "Name two history-based films.", model: "Mughal-e-Azam and Lagaan recreate eras.", keys: ["Mughal-e-Azam", "Lagaan"] },
    { q: "Give two educational uses of television.", model: "School lessons and UGC lectures reach remote homes.", keys: ["lectures", "remote"] },
    { q: "Name two press freedoms.", model: "Free speech and reasonable criticism of policy.", keys: ["Free speech", "criticism"] }
  ], three: [
    { q: "Explain the role of Kesari in the freedom movement.", model: "Tilak used Kesari to explain swaraj in Marathi. It attacked unjust laws and praised resisters. The British prosecuted it, proving its sting.", keys: ["swaraj", "Marathi", "prosecuted"] },
    { q: "Write a note on Dadasaheb Phalke.", model: "Phalke made Raja Harishchandra in 1913, India's first feature film. He built sets, cameras and studios himself. Hence he is the father of Indian cinema.", keys: ["Raja Harishchandra", "1913", "father of Indian cinema"] },
    { q: "Explain radio's role in nation-building.", model: "Akashvani carried news, music and farm advice to villages. One network with many voices united listeners. During wars it kept morale high.", keys: ["Akashvani", "villages", "morale"] },
    { q: "Explain television's educational role.", model: "Doordarshan's school and UGC programmes teach remote learners. Ramayana-Mahabharata serials sparked history debates. TV thus educates and entertains.", keys: ["Doordarshan", "remote learners", "debates"] },
    { q: "How do films serve as historical sources?", model: "Sets, costumes and dialogues reflect their maker's era. Mughal-e-Azam shows 1960s ideas of Akbar. Critics read both story and context.", keys: ["maker's era", "Mughal-e-Azam", "context"] },
    { q: "Distinguish print and electronic media as sources.", model: "Print gives dated editorials for close reading. Electronic media adds voice, image and reach. Both need bias checks.", keys: ["editorials", "voice, image", "bias"] },
    { q: "Assess social media as tomorrow's archive.", model: "Posts record instant public mood in bulk. Fakes and deletions weaken reliability. Archivists must save and verify continuously.", keys: ["public mood", "Fakes", "verify"] },
    { q: "Explain the press during the Emergency (1975-77).", model: "Censorship gagged newspapers; some bent, some fought. Underground bulletins spread resistance news. The episode proved press freedom's value.", keys: ["Censorship", "Underground", "press freedom"] }
  ], five: [
    { q: "Trace mass media in India from print to digital.", model: "Hicky's Gazette began print; Tilak's Kesari weaponised it. Akashvani and Doordarshan carried voice and image nationwide. The internet and social media now archive instant opinion.", keys: ["Kesari", "Akashvani", "Doordarshan"] },
    { q: "Discuss cinema's double role: art and historical source.", model: "As art, films move crores with story and music. As source, Lagaan reveals 2001 views of 1893. Historians must separate drama from data.", keys: ["crores", "Lagaan", "drama from data"] }
  ] });
  MB("his:en6", { one: [
    { q: "Name two folk arts of Maharashtra.", model: "Tamasha and Lavani are Maharashtra's folk arts.", keys: ["Tamasha", "Lavani"] },
    { q: "What is a Powada?", model: "A Powada is a heroic ballad of battles.", keys: ["ballad"] },
    { q: "Which instruments accompany Tamasha?", model: "Dholki and tuntune accompany Tamasha.", keys: ["Tamasha"] },
    { q: "Name a game revived as modern entertainment.", model: "Kabaddi returned through leagues and TV.", keys: ["Kabaddi"] },
    { q: "Name an epic television serial.", model: "Ramayan (1987) drew record viewers.", keys: ["Ramayan"] }
  ], reasons: [
    { q: "Why do folk arts need state support?", model: "TV and cinema pull crowds away. Artists age without pensions. Hence grants and festivals sustain them.", keys: ["grants", "festivals"] },
    { q: "Why did mythological serials succeed?", model: "Epics live in every home's memory. Sunday mornings united families. Hence ratings soared.", keys: ["memory", "ratings"] },
    { q: "Why is street theatre effective?", model: "It plays free at chowks for workers. Direct dialogue questions power. Hence it mobilises fast.", keys: ["chowks", "mobilises"] }
  ], two: [
    { q: "Name two folk arts with one feature each.", model: "Lavani has fast rhythm; Bhavai is Gujarati dance-drama.", keys: ["Lavani", "Bhavai"] },
    { q: "Name two traditional games of Maharashtra.", model: "Kushti wrestling and Mallakhamb pole feats.", keys: ["Kushti", "Mallakhamb"] },
    { q: "Name two modern entertainments with history content.", model: "Historical films and light-and-sound shows.", keys: ["Historical films", "light-and-sound"] },
    { q: "Give two benefits of fairs (jatra).", model: "Trade for artisans and shared devotion.", keys: ["artisans", "devotion"] },
    { q: "Give two ways TV changed leisure.", model: "Family viewing together and recorded replay.", keys: ["Family viewing", "replay"] }
  ], three: [
    { q: "Explain Tamasha as history and entertainment.", model: "Tamasha mixes Lavani song, dance and comic skits. Shahirs once spread news and heroism. Today festivals keep it alive.", keys: ["Lavani", "Shahirs", "festivals"] },
    { q: "Write a note on Powada.", model: "Powadas are Marathi ballads of Shivaji's battles. Afzal Khan's killing echoes in verse. They taught courage to villages.", keys: ["Shivaji", "verse", "courage"] },
    { q: "Explain Mallakhamb and Kushti.", model: "Mallakhamb trains grip on a wooden pole. Kushti akhadas build strength with diet and discipline. Both shaped warrior fitness.", keys: ["pole", "akhadas", "fitness"] },
    { q: "How did radio and TV carry folk arts?", model: "Akashvani recorded rural singers. Doordarshan telecast Lavani festivals. Archives now preserve them.", keys: ["Akashvani", "Doordarshan", "Archives"] },
    { q: "Explain the Ramayan serial phenomenon (1987).", model: "Streets emptied on Sunday mornings. The epic united classes in devotion. It proved TV's mass power.", keys: ["Sunday mornings", "mass power"] },
    { q: "Distinguish folk and classical entertainment.", model: "Folk is open, cheap and participative. Classical needs training and halls. Both carry history differently.", keys: ["participative", "training", "history"] },
    { q: "Assess IPL-style leagues for traditional games.", model: "Kabaddi leagues brought money and viewers. Rules simplified for TV slots. Tradition gains only if roots stay.", keys: ["Kabaddi", "viewers", "roots"] },
    { q: "Why preserve dying arts? Give three reasons.", model: "They hold community memory and skills. They employ rural artists. They enrich tourism and pride.", keys: ["memory", "artists", "tourism"] }
  ], five: [
    { q: "Discuss entertainment as a mirror of society through history.", model: "Folk songs recorded harvests and heroes. Cinema reflected freedom, then city life. TV serials now debate family values. Each age entertains its own concerns.", keys: ["heroes", "city life", "family values"] },
    { q: "Plan a school folk-arts festival (objectives, items, outcome).", model: "Objective: meet living artists and learn. Items: Lavani, Powada, Kushti demo, craft stalls. Outcome: documentation plus an artist fund.", keys: ["living artists", "craft stalls", "documentation"] }
  ] });
  MB("his:sp7", { one: [
    { q: "In which Olympics did India first win hockey gold?", model: "India first won Olympic hockey gold at Amsterdam 1928.", keys: ["Amsterdam 1928"] },
    { q: "Who is called the hockey wizard?", model: "Dhyan Chand is called the hockey wizard.", keys: ["Dhyan Chand"] },
    { q: "Which city hosted the first Asian Games, and when?", model: "Delhi hosted the first Asian Games in 1951.", keys: ["Delhi", "1951"] },
    { q: "What is India's highest sports honour?", model: "The Major Dhyan Chand Khel Ratna is India's highest sports honour.", keys: ["Khel Ratna"] },
    { q: "Name an indigenous game of Maharashtra.", model: "Mallakhamb is Maharashtra's pole sport.", keys: ["Mallakhamb"] }
  ], reasons: [
    { q: "Why is 1928 a landmark in Indian sports?", model: "India won its first Olympic gold in hockey. Dhyan Chand's goals stunned the world. Hence hockey became national pride.", keys: ["first Olympic gold", "national pride"] },
    { q: "Why do awards like the Arjuna matter?", model: "They honour years of unseen training. Cash and jobs follow recognition. Hence youth choose sport.", keys: ["training", "recognition"] },
    { q: "Why preserve indigenous games?", model: "Kabaddi and kushti carry local culture. They need little equipment. Hence they stay accessible.", keys: ["culture", "accessible"] }
  ], two: [
    { q: "Name two Olympic hockey triumphs of India.", model: "Gold at Amsterdam 1928 and at Berlin 1936.", keys: ["Amsterdam 1928", "Berlin 1936"] },
    { q: "Name two national sports honours.", model: "The Arjuna Award for players; Dronacharya for coaches.", keys: ["Arjuna", "Dronacharya"] },
    { q: "Name two indigenous sports with states.", model: "Jallikattu of Tamil Nadu; Vallamkali boat race of Kerala.", keys: ["Jallikattu", "Vallamkali"] },
    { q: "Give two benefits of hosting the 1951 Asian Games.", model: "Stadiums for Delhi and sporting prestige.", keys: ["Stadiums", "prestige"] },
    { q: "Name two qualities sports teach.", model: "Discipline and teamwork under pressure.", keys: ["Discipline", "teamwork"] }
  ], three: [
    { q: "Write a note on Dhyan Chand.", model: "Dhyan Chand scored hockey goals with magical control. India won gold in 1928, 1932 and 1936. His birthday is National Sports Day.", keys: ["magical control", "1936", "National Sports Day"] },
    { q: "Explain India's early Olympic hockey dominance.", model: "From 1928 to 1956 India won six straight hockey golds. Speed, dribbling and fitness beat Europeans. Partition and astroturf later ended the run.", keys: ["six straight", "dribbling", "astroturf"] },
    { q: "Write a note on the Asian Games 1951.", model: "Delhi hosted Asia's first Asiad in 1951. Eleven nations joined the new festival. India finished second with 15 golds.", keys: ["Delhi", "Eleven nations", "15 golds"] },
    { q: "Explain indigenous games with two examples.", model: "Kabaddi needs breath control and raids. Mallakhamb builds grip on a pole. Both thrive in akhadas and school grounds.", keys: ["raids", "pole", "akhadas"] },
    { q: "How did cricket become mass entertainment?", model: "Radio commentary first carried Tests home. The 1983 World Cup win sparked a TV craze. The IPL now fills stadiums yearly.", keys: ["1983", "TV craze", "IPL"] },
    { q: "Distinguish ancient and modern sports organisation.", model: "Ancient contests served ritual and war training. Modern federations fix rules and calendars. Professionalism pays athletes today.", keys: ["ritual", "federations", "Professionalism"] },
    { q: "Assess yoga as sport and heritage.", model: "Yoga trains body and breath together. International Yoga Day spreads it globally. It blends health with philosophy.", keys: ["breath", "International Yoga Day", "philosophy"] },
    { q: "Why do stadiums matter for history? (three points)", model: "They stage memorable national moments. Their records date sporting eras. Preserved stadiums attract sports tourism.", keys: ["national moments", "records", "tourism"] }
  ], five: [
    { q: "Trace Indian sports from akhadas to the Olympics.", model: "Akhadas trained kushti and mallakhamb for strength. The British added cricket, hockey and football clubs. Independent India won hockey golds and hosts leagues. Sports thus mirror social change.", keys: ["akhadas", "hockey golds", "leagues"] },
    { q: "Discuss the role of awards and policy in sports growth.", model: "Arjuna, Dronacharya and Khel Ratna honour talent. TOPS funds Olympic training. Khelo India scouts schoolchildren. Policy plus prizes builds champions.", keys: ["Khel Ratna", "TOPS", "Khelo India"] }
  ] });
  MQ("his", [
    { ch: "ah3", q: "Applied history means", opts: ["History for its own sake", "Putting historical knowledge to practical use", "Only political history", "Imaginary stories of kings"], ans: 1, exp: "Uses: museums, archives, preservation, tourism." },
    { ch: "ah3", q: "Numismatics is the study of", opts: ["Coins", "Stamps", "Weapons", "Manuscripts"], ans: 0, exp: "Coins reveal economy and rulers." },
    { ch: "ar4", q: "Ajanta caves are famous for", opts: ["Royal portraits", "Buddhist paintings and frescoes", "Mughal miniatures", "Colonial forts"], ans: 1, exp: "Jataka murals from 2nd century BCE." },
    { ch: "mm5", q: "Raja Harishchandra (1913), India's first feature film, was made by", opts: ["Satyajit Ray", "Dadasaheb Phalke", "V. Shantaram", "Mehboob Khan"], ans: 1, exp: "Father of Indian cinema." },
    { ch: "en6", q: "Powada is a ballad of", opts: ["Love", "Heroism and battles", "Harvest", "Monsoon"], ans: 1, exp: "Shahirs sang Shivaji's deeds." },
    { ch: "sp7", q: "Dhyan Chand is associated with", opts: ["Cricket", "Hockey", "Wrestling", "Chess"], ans: 1, exp: "Three Olympic hockey golds (1928–36)." }
  ]);

  MB("his:to8", { one: [
    { q: "Define tourism.", model: "Tourism is travel for leisure, study or pilgrimage with stay.", keys: ["leisure"] },
    { q: "Name two Maharashtra UNESCO sites.", model: "Ajanta and Ellora caves are UNESCO sites.", keys: ["Ajanta", "Ellora"] },
    { q: "What is eco-tourism?", model: "Eco-tourism visits nature without harming it.", keys: ["without harming"] },
    { q: "Give one duty of a tourist guide.", model: "A guide explains sites accurately and ensures safety.", keys: ["accurately", "safety"] },
    { q: "What is agro-tourism?", model: "Agro-tourism lets visitors experience farm life.", keys: ["farm life"] }
  ], reasons: [
    { q: "Why is tourism called a smokeless industry?", model: "It earns foreign exchange without factories. Hotels and transport employ thousands. Hence it is smokeless yet rich.", keys: ["foreign exchange", "smokeless"] },
    { q: "Why do heritage sites need trained guides?", model: "Wrong stories spread myths about monuments. Trained guides give dates and context. Hence guiding protects truth.", keys: ["myths", "context"] },
    { q: "Why must tourism respect local culture?", model: "Loud, careless visitors offend hosts. Respect keeps the welcome alive. Hence codes of conduct matter.", keys: ["offend", "conduct"] }
  ], two: [
    { q: "Name two types of tourism with examples.", model: "Heritage: Ajanta; religious: Shirdi.", keys: ["Ajanta", "Shirdi"] },
    { q: "Name two needs of tourists.", model: "Clean stay and safe transport.", keys: ["stay", "transport"] },
    { q: "Name two Maharashtra forts for tourism.", model: "Raigad and Sinhagad draw trekkers.", keys: ["Raigad", "Sinhagad"] },
    { q: "Give two economic benefits of tourism.", model: "Jobs for youth and a market for crafts.", keys: ["Jobs", "crafts"] },
    { q: "Name two things a tourist map must show.", model: "Scale with direction, and a symbols legend.", keys: ["Scale", "legend"] }
  ], three: [
    { q: "Explain the types of tourism with examples.", model: "Heritage tourism visits Ajanta-Ellora; religious covers Shirdi. Eco-tourism explores Tadoba; adventure seeks treks. Each type needs different care.", keys: ["Ajanta-Ellora", "Shirdi", "Tadoba"] },
    { q: "Write a note on Ajanta-Ellora as tourist sites.", model: "Ajanta's frescoes and Ellora's Kailasa draw world scholars. MTDC runs buses, guides and festivals. Footfall funds conservation.", keys: ["frescoes", "Kailasa", "conservation"] },
    { q: "Explain Maharashtra's fort tourism.", model: "Raigad, Sinhagad and Pratapgad narrate Shivaji's era. Treks combine fitness with history. Local guides and stalls earn livelihoods.", keys: ["Shivaji", "Treks", "livelihoods"] },
    { q: "What facilities must a tourist spot provide?", model: "Clean toilets, drinking water and shade top the list. Signboards, parking and first aid follow. Safety audits complete readiness.", keys: ["toilets", "Signboards", "first aid"] },
    { q: "How does tourism help the economy?", model: "Hotels, transport and guides employ youth directly. Crafts and food gain markets. Tax revenue funds roads and sites.", keys: ["employ youth", "crafts", "Tax revenue"] },
    { q: "Distinguish domestic and international tourism.", model: "Domestic travel stays within India on low budgets. International travel brings forex with passports and visas. Both need hospitality.", keys: ["within India", "forex", "hospitality"] },
    { q: "Assess eco-tourism in the Western Ghats.", model: "Tadoba and Bhimashankar safaris fund guards. Caps on vehicles limit disturbance. Locals working as guides share gains.", keys: ["safaris", "Caps", "guides"] },
    { q: "Suggest a 2-day Ajanta-Ellora itinerary.", model: "Day 1 covers Ajanta's fresco caves with a guide. Day 2 covers Ellora's Kailasa plus Daulatabad fort. Evenings sample local food and crafts.", keys: ["Day 1", "Kailasa", "Daulatabad"] }
  ], five: [
    { q: "Discuss tourism as applied history.", model: "Guides translate research into stories at monuments. Entry fees maintain the sites scholars study. Tourist maps spread historical literacy. Thus tourism funds and popularises history.", keys: ["stories", "Entry fees", "literacy"] },
    { q: "Plan tourism development for a fort village (five points).", model: "Repair paths, railings and signboards first. Train local youth as guides. Schedule homestays, food stalls and first aid. Cap daily footfall and audit yearly.", keys: ["signboards", "homestays", "footfall"] }
  ] });
  MB("his:he9", { one: [
    { q: "Expand UNESCO.", model: "United Nations Educational, Scientific and Cultural Organization.", keys: ["Educational", "Cultural"] },
    { q: "Name one cultural UNESCO site in Maharashtra.", model: "The Ajanta Caves are a UNESCO World Heritage Site.", keys: ["Ajanta Caves"] },
    { q: "Which Mumbai station is a UNESCO site?", model: "Chhatrapati Shivaji Terminus is a UNESCO site.", keys: ["Shivaji Terminus"] },
    { q: "What does the ASI do?", model: "The ASI protects and conserves national monuments.", keys: ["protects"] },
    { q: "Name one natural UNESCO site in Maharashtra.", model: "The Western Ghats are a natural World Heritage Site.", keys: ["Western Ghats"] }
  ], reasons: [
    { q: "Why list World Heritage Sites?", model: "Listing gives global fame and funds. It pressures governments to protect. Hence listing saves monuments.", keys: ["fame", "protect"] },
    { q: "Why ban construction near protected monuments?", model: "Vibrations and pollution crack old stone. Crowding ruins the setting. Hence regulated zones preserve them.", keys: ["crack", "zones"] },
    { q: "Why should students visit heritage sites?", model: "Seeing builds memory stronger than reading. Pride in craft grows citizenship. Hence visits educate deeply.", keys: ["memory", "citizenship"] }
  ], two: [
    { q: "Name two UNESCO cultural sites of Maharashtra.", model: "The Ajanta and Ellora caves.", keys: ["Ajanta", "Ellora"] },
    { q: "Give two duties of the ASI.", model: "Conserve monuments and run site museums.", keys: ["Conserve", "museums"] },
    { q: "Name two threats to monuments.", model: "Pollution and vandalism damage stone.", keys: ["Pollution", "vandalism"] },
    { q: "Name two things the AMASR Act (1958) controls.", model: "Construction near monuments and antiquity smuggling.", keys: ["Construction", "smuggling"] },
    { q: "Give two ways citizens can help heritage.", model: "Report damage and keep sites litter-free.", keys: ["Report", "litter-free"] }
  ], three: [
    { q: "Explain the UNESCO World Heritage concept.", model: "UNESCO lists places of outstanding universal value. Cultural sites show human genius; natural sites show earth's story. Listing brings aid and duty.", keys: ["universal value", "human genius", "duty"] },
    { q: "Write a note on Ajanta as world heritage.", model: "Ajanta's ancient frescoes depict Buddha's past lives. UNESCO listed it among the first Indian sites. Conservation labs now protect its colours.", keys: ["frescoes", "first Indian", "colours"] },
    { q: "Write a note on Elephanta (Gharapuri).", model: "Elephanta's rock Trimurti shows Shiva's faces. Ferries carry visitors from the Gateway. Seepage and crowds need control.", keys: ["Trimurti", "Ferries", "Seepage"] },
    { q: "Explain the role of the ASI.", model: "The ASI surveys, excavates and conserves monuments. Its museums display finds with labels. Its guards prevent encroachment.", keys: ["excavates", "labels", "encroachment"] },
    { q: "How do laws protect heritage?", model: "The AMASR Act bans building near monuments. Exporting antiquities without licence is a crime. Punishment deters smugglers.", keys: ["AMASR", "licence", "smugglers"] },
    { q: "Distinguish tangible and intangible heritage.", model: "Tangible heritage covers monuments and objects. Intangible covers songs, rituals and crafts. Both need safeguarding.", keys: ["monuments", "rituals", "safeguarding"] },
    { q: "Assess the CST station as living heritage.", model: "CST runs trains while flaunting Gothic design. Daily use funds its upkeep. Living use keeps heritage relevant.", keys: ["Gothic", "Daily use", "relevant"] },
    { q: "Suggest a school heritage project (three steps).", model: "Adopt a local shrine and record its story. Photograph damage and report to ASI. Hold an exhibition for parents.", keys: ["record", "report to ASI", "exhibition"] }
  ], five: [
    { q: "Discuss the challenges in conserving rock heritage like Ajanta.", model: "Seepage cracks painted plaster each monsoon. Crowds raise humidity and touch art. Funds and experts fall short. Controlled entry, labs and local jobs answer all three.", keys: ["Seepage", "humidity", "Controlled entry"] },
    { q: "Argue: development and heritage can coexist.", model: "Metro lines and roads can skirt monument zones. Tourism income pays conservation. Strict impact assessment balances both. Hence growth need not kill heritage.", keys: ["skirt", "Tourism income", "impact assessment"] }
  ] });
  MB("his:dem", { one: [
    { q: "When was the Constitution adopted?", model: "The Constitution was adopted on 26 November 1949.", keys: ["26 November 1949"] },
    { q: "When did the Constitution come into force?", model: "It came into force on 26 January 1950.", keys: ["26 January 1950"] },
    { q: "Who chaired the Drafting Committee?", model: "Dr B. R. Ambedkar chaired the Drafting Committee.", keys: ["Ambedkar"] },
    { q: "Name two ideals of the Preamble.", model: "Justice and Liberty lead the Preamble's ideals.", keys: ["Justice", "Liberty"] },
    { q: "What is the minimum voting age?", model: "Every Indian citizen aged 18 or above can vote.", keys: ["18"] }
  ], reasons: [
    { q: "Why is 26 January celebrated as Republic Day?", model: "The Constitution took effect that day in 1950. India became a republic with its own head. Hence the date is honoured.", keys: ["1950", "republic"] },
    { q: "Why are Fundamental Rights called the conscience of the Constitution?", model: "They protect citizens against state excess. Courts enforce them directly. Hence they guard dignity.", keys: ["state excess", "dignity"] },
    { q: "Why do duties accompany rights?", model: "The rights of one are the duties of another. Cleanliness and harmony need all. Hence duties complete rights.", keys: ["harmony", "duties"] }
  ], two: [
    { q: "Give two salient features of the Constitution.", model: "It is the world's lengthiest written constitution. It blends federal and unitary features.", keys: ["lengthiest", "federal"] },
    { q: "Name two Fundamental Rights.", model: "Right to Equality and Right to Freedom.", keys: ["Equality", "Freedom"] },
    { q: "Name two Directive Principles.", model: "Free legal aid and village panchayats.", keys: ["legal aid", "panchayats"] },
    { q: "Name two Fundamental Duties.", model: "Respect the flag and protect heritage.", keys: ["flag", "heritage"] },
    { q: "Give two functions of the President.", model: "The President appoints the PM and signs bills into law.", keys: ["PM", "bills"] }
  ], three: [
    { q: "Explain the Preamble's ideals.", model: "Justice, Liberty, Equality and Fraternity head the Preamble. They promise a socialist, secular republic. Courts read them into every law.", keys: ["Justice", "Fraternity", "secular"] },
    { q: "Write a note on the Drafting Committee.", model: "Ambedkar chaired experts who debated each article. They studied world constitutions for 3 years. The Assembly adopted the draft in 1949.", keys: ["Ambedkar", "3 years", "1949"] },
    { q: "Explain federal features with the unitary tilt.", model: "States have legislatures and lists of powers. But residuary powers and emergencies favour the Centre. India is thus quasi-federal.", keys: ["legislatures", "emergencies", "quasi-federal"] },
    { q: "Explain any three Fundamental Rights.", model: "Equality bans discrimination; Freedom guards speech. The right against Exploitation bans forced labour. Courts enforce all three directly.", keys: ["Equality", "forced labour", "Courts"] },
    { q: "Explain Directive Principles with two examples.", model: "Directives guide the state toward welfare. Free legal aid and panchayats are examples. Though non-justiciable, they shape laws.", keys: ["welfare", "panchayats", "non-justiciable"] },
    { q: "Distinguish Fundamental Rights and Directive Principles.", model: "Rights are justiciable claims of citizens. Directives are state goals without court remedy. Together they balance liberty and welfare.", keys: ["justiciable", "goals", "balance"] },
    { q: "Assess Ambedkar's role in the Constitution.", model: "Ambedkar piloted every clause through debate. He secured rights for Dalits and women. Hence he is the chief architect.", keys: ["piloted", "Dalits", "architect"] },
    { q: "Why is the Constitution called living?", model: "Amendments update it with time, like the 73rd-74th for panchayats. Judicial review adapts meanings. Hence it lives and grows.", keys: ["Amendments", "73rd", "grows"] }
  ], five: [
    { q: "Describe the making of the Indian Constitution.", model: "The Constituent Assembly debated from 1946 to 1949. Ambedkar's committee drafted articles studying world models. Adopted on 26 November 1949, it commenced on 26 January 1950.", keys: ["1946 to 1949", "Ambedkar", "26 January 1950"] },
    { q: "Discuss Fundamental Rights and duties in daily life.", model: "Speech lets students debate; equality opens schools to all. Duties demand respecting the flag and nature. Exercising rights with duties builds the republic.", keys: ["debate", "equality", "republic"] }
  ] });
  MB("his:el2", { one: [
    { q: "What is the minimum age to vote?", model: "An Indian citizen aged 18 or above can vote.", keys: ["18"] },
    { q: "Expand EVM.", model: "EVM means Electronic Voting Machine.", keys: ["Electronic Voting Machine"] },
    { q: "What is VVPAT?", model: "VVPAT prints a slip so voters verify their vote.", keys: ["slip", "verify"] },
    { q: "Who prepares the electoral rolls?", model: "The Election Commission prepares electoral rolls.", keys: ["Election Commission"] },
    { q: "What is the Model Code of Conduct?", model: "It is the EC's rulebook restraining parties during polls.", keys: ["EC", "polls"] }
  ], reasons: [
    { q: "Why must the EC be independent?", model: "Ruling parties could misuse officials and funds. Independence keeps contests fair. Hence the Constitution shields the CEC.", keys: ["fair", "shields"] },
    { q: "Why is VVPAT used with EVMs?", model: "EVMs hide the voter's mark from view. The VVPAT slip lets each voter verify. Hence trust in counting rises.", keys: ["verify", "trust"] },
    { q: "Why is the voting age 18?", model: "At 18 citizens are legally adults. They can judge policies and candidates. Hence the 61st Amendment lowered it from 21.", keys: ["adults", "61st Amendment"] }
  ], two: [
    { q: "Give two functions of the Election Commission.", model: "Recognising parties with symbols and enforcing the code.", keys: ["symbols", "code"] },
    { q: "Name two stages of the polling process.", model: "Campaigning ends 48 hours before polling; votes are counted centrally.", keys: ["48 hours", "counted"] },
    { q: "Name two reforms for free polls.", model: "Photo rolls plus VVPAT verification.", keys: ["rolls", "VVPAT"] },
    { q: "Name two malpractices the code prevents.", model: "Misuse of government vehicles and hate speeches.", keys: ["vehicles", "hate speeches"] },
    { q: "Give two ways to check your name on the roll.", model: "Booth lists and the NVSP portal.", keys: ["Booth", "NVSP"] }
  ], three: [
    { q: "Explain the composition and independence of the EC.", model: "The CEC plus commissioners run elections. Security of tenure matches judges. Expenses come charged on the Consolidated Fund.", keys: ["CEC", "Security of tenure", "Consolidated Fund"] },
    { q: "Describe the polling process step by step.", model: "Rolls close, symbols freeze and campaigns end. Voters ink fingers and press EVMs; VVPAT slips confirm. Counting decides winners.", keys: ["symbols", "ink", "Counting"] },
    { q: "Explain the Model Code of Conduct.", model: "It bans ministers from announcing sops after dates. It limits rallies, vehicles and speeches. The EC punishes violations.", keys: ["sops", "rallies", "punishes"] },
    { q: "How are electoral rolls prepared and revised?", model: "Booth officers enrol residents turning 18. Drafts invite objections yearly. Final rolls print with photos.", keys: ["18", "objections", "photos"] },
    { q: "Distinguish national and state parties (criteria).", model: "National parties poll in several states with set vote shares. State parties dominate one region. Symbols reflect status.", keys: ["vote shares", "region", "Symbols"] },
    { q: "Assess EVMs: benefits and safeguards.", model: "EVMs end invalid votes and speed counting. VVPAT slips allow sample checks. Sealed storage guards machines.", keys: ["invalid votes", "sample checks", "Sealed storage"] },
    { q: "Why do voter-ID campaigns matter?", model: "Missing names silence lakhs of youth. Drives enrol migrants and brides. Every vote deepens legitimacy.", keys: ["Missing names", "migrants", "legitimacy"] },
    { q: "Explain the counting-day procedure.", model: "Strong rooms open before agents. Round-wise EVM totals tally with VVPAT samples. The Returning Officer declares winners.", keys: ["Strong rooms", "samples", "Returning Officer"] }
  ], five: [
    { q: "Describe a Lok Sabha general election from announcement to results.", model: "The EC announces dates with the code in force. Campaigns, polling in phases, then EVM sealing follow. Counting ends with the President inviting the majority.", keys: ["code in force", "phases", "majority"] },
    { q: "Argue: should voting be compulsory?", model: "Compulsion raises turnout and representativeness. But forced votes may be random and liberty suffers. Awareness beats compulsion in a democracy.", keys: ["turnout", "liberty", "Awareness"] }
  ] });
  MB("his:pp3", { one: [
    { q: "What is a political party?", model: "A party is an organised group contesting elections on shared policies.", keys: ["elections", "policies"] },
    { q: "Name two national parties.", model: "The BJP and Congress are recognised national parties.", keys: ["BJP", "Congress"] },
    { q: "What is an election symbol?", model: "A symbol identifies parties for illiterate voters.", keys: ["identifies"] },
    { q: "What is defection?", model: "Defection is an MLA or MP abandoning the party for another.", keys: ["abandoning"] },
    { q: "What is the role of the opposition?", model: "The opposition questions and checks the government.", keys: ["checks"] }
  ], reasons: [
    { q: "Why do parties need symbols?", model: "Millions cannot read names. Pictures identify choices fast. Hence symbols deepen the franchise.", keys: ["Pictures", "franchise"] },
    { q: "Why punish defection?", model: "Floor-crossing betrays voters for office. Governments fall to bribes. Hence the 10th Schedule disqualifies defectors.", keys: ["betrays", "disqualifies"] },
    { q: "Why is inner-party democracy important?", model: "High-command tickets ignore workers. Debate improves candidates. Hence democracy inside builds trust outside.", keys: ["tickets", "trust"] }
  ], two: [
    { q: "Give two differences: national vs state party.", model: "A national party contests many states; a state party dominates one region.", keys: ["many states", "one region"] },
    { q: "Give two roles of the opposition.", model: "Questioning ministers and offering alternative policies.", keys: ["Questioning", "alternative"] },
    { q: "Give two effects of coalition politics.", model: "Shared power with slower decisions.", keys: ["Shared power", "slower"] },
    { q: "Suggest two party reforms.", model: "State funding of polls and inner-party elections.", keys: ["State funding", "inner-party"] },
    { q: "Name two regional parties with states.", model: "Shiv Sena of Maharashtra; DMK of Tamil Nadu.", keys: ["Shiv Sena", "DMK"] }
  ], three: [
    { q: "Explain the need for political parties in a democracy.", model: "Parties aggregate opinions into programmes. They field candidates and form governments. Without them, crores cannot choose coherently.", keys: ["programmes", "governments", "coherently"] },
    { q: "Distinguish national and state parties with examples.", model: "National parties like the BJP and Congress fight across India. State parties like Shiv Sena rule one region. The EC recognises both by votes.", keys: ["BJP", "Shiv Sena", "EC"] },
    { q: "Explain the anti-defection law.", model: "The 10th Schedule punishes MLAs and MPs who quit parties. The Speaker disqualifies them from the House. Stability thus survives greed.", keys: ["10th Schedule", "Speaker", "Stability"] },
    { q: "What is the role of the opposition? (three points)", model: "It questions bills and budgets daily. It exposes scams through debate. It offers voters a ready alternative.", keys: ["questions", "exposes scams", "alternative"] },
    { q: "Assess coalition governments.", model: "Coalitions share power among regions. Common minimum programmes bind rivals. Slow decisions are the price of inclusion.", keys: ["share power", "Common minimum", "inclusion"] },
    { q: "Explain party funding and its reform.", model: "Parties collect donations under bond scrutiny. Opaque cash breeds quid pro quo. State funding plus caps can clean polls.", keys: ["donations", "quid pro quo", "State funding"] },
    { q: "How do regional parties strengthen federalism?", model: "They voice state soil, language and jobs. Delhi must negotiate with them. Federal balance thus deepens.", keys: ["language", "negotiate", "Federal"] },
    { q: "Suggest three reforms for cleaner parties.", model: "Hold inner-party elections regularly. Publish donor lists online. Debar criminals through fast courts. Clean parties make clean politics.", keys: ["inner-party", "donor lists", "criminals"] }
  ], five: [
    { q: "Discuss one-party, two-party and multi-party systems with examples.", model: "China shows one-party rule; the USA shows two-party contests. India runs a multi-party system with dozens. Each suits its history.", keys: ["China", "USA", "multi-party"] },
    { q: "Evaluate: are regional parties good for India?", model: "They raise neglected state issues loudly. But narrow demands can stall national plans. Balanced federalism uses both levels.", keys: ["state issues", "national plans", "federalism"] }
  ] });
  MB("his:spm4", { one: [
    { q: "What was the Samyukta Maharashtra movement?", model: "It demanded a Marathi-speaking state including Mumbai.", keys: ["Marathi-speaking", "Mumbai"] },
    { q: "Who led the Dalit movement?", model: "Dr Ambedkar led the Dalit movement for equality.", keys: ["Ambedkar"] },
    { q: "Who led the Chipko movement?", model: "Sunderlal Bahuguna led the Chipko tree-hugging movement.", keys: ["Bahuguna"] },
    { q: "Who leads the Narmada Bachao Andolan?", model: "Medha Patkar leads the Narmada Bachao Andolan.", keys: ["Medha Patkar"] },
    { q: "What is a social movement?", model: "A social movement is organised collective action for change.", keys: ["collective action"] }
  ], reasons: [
    { q: "Why was Mumbai central to Samyukta Maharashtra?", model: "Mumbai held Marathi workers, mills and the press. Losing it meant losing the economic heart. Hence the slogan of Mumbai with Maharashtra.", keys: ["mills", "economic heart"] },
    { q: "Why did Dalits need a separate movement?", model: "Congress freedom ignored caste bondage. Temples, wells and schools barred them. Hence Ambedkar built independent assertion.", keys: ["caste", "Ambedkar"] },
    { q: "Why did Chipko villagers hug trees?", model: "Contractors felled Himalayan forests for profit. Villagers needed forests for life. Hence embracing trees stopped axes.", keys: ["contractors", "embracing"] }
  ], two: [
    { q: "Give two outcomes of Samyukta Maharashtra.", model: "Maharashtra formed on 1 May 1960 with Mumbai.", keys: ["1 May 1960", "Mumbai"] },
    { q: "Name two Ambedkar-led struggles.", model: "The Mahad water satyagraha and Kalaram temple entry.", keys: ["Mahad", "Kalaram"] },
    { q: "Name two methods of the Narmada Bachao Andolan.", model: "Rallies plus Supreme Court petitions.", keys: ["Rallies", "petitions"] },
    { q: "Name two women's movement issues.", model: "Dowry deaths and workplace safety.", keys: ["Dowry", "safety"] },
    { q: "Name two farmer demands.", model: "Fair prices and loan relief.", keys: ["Fair prices", "loan relief"] }
  ], three: [
    { q: "Explain the Samyukta Maharashtra movement.", model: "Marathi speakers demanded one state with Mumbai. Morchas, martyrs of Hutatma Chowk (105 dead), and press pressure built up. Delhi yielded on 1 May 1960.", keys: ["Mumbai", "105", "1 May 1960"] },
    { q: "Explain Ambedkar's Dalit movement.", model: "The Mahad satyagraha claimed water rights; Kalaram claimed temple entry. The Poona Pact won reserved seats. Equality became constitutional.", keys: ["Mahad", "Poona Pact", "Equality"] },
    { q: "Explain the Chipko movement.", model: "In 1973 Himalayan villagers hugged trees against loggers. Bhatt and Bahuguna led the resistance. Forest policy changed toward people.", keys: ["1973", "hugged trees", "Bahuguna"] },
    { q: "Explain the Narmada Bachao Andolan.", model: "Medha Patkar questioned big-dam displacement. Marches and court cases demanded rehabilitation. The debate reshaped resettlement policy.", keys: ["Medha Patkar", "displacement", "rehabilitation"] },
    { q: "Distinguish social from political movements.", model: "Social movements reform customs like caste. Political movements capture state power. Both overlap in leaders and crowds.", keys: ["customs", "state power", "overlap"] },
    { q: "Assess women's movements in Maharashtra.", model: "Stree-mukti groups fought dowry and violence. Mahila Mandals run savings and safety. Laws now back their demands.", keys: ["dowry", "Mahila Mandals", "Laws"] },
    { q: "How do movements use media?", model: "Morchas attract cameras and headlines. Pamphlets and songs spread messages. Coverage pressures rulers to concede.", keys: ["headlines", "songs", "concede"] },
    { q: "Why do some movements turn violent? How to prevent it?", model: "Ignored petitions breed anger and provocateurs. Dialogue, inquiries and justice calm crowds. Early redress prevents fire.", keys: ["anger", "Dialogue", "redress"] }
  ], five: [
    { q: "Compare Samyukta Maharashtra and Chipko as people's movements.", model: "Samyukta Maharashtra sought a linguistic state with Mumbai; Chipko saved Himalayan forests. One used morchas and martyrs, the other hugging and fasts. Both forced policy change.", keys: ["Mumbai", "hugging", "policy change"] },
    { q: "Evaluate the Dalit movement's contribution to democracy.", model: "It turned the vote into dignity for crores. Reservations opened schools and offices. Parties now court Dalit support. Democracy deepened socially.", keys: ["dignity", "Reservations", "deepened"] }
  ] });
  MB("his:chd5", { one: [
    { q: "What is communalism?", model: "Communalism uses religion for political gain.", keys: ["religion", "political gain"] },
    { q: "What is regionalism?", model: "Regionalism puts one region above the nation.", keys: ["region"] },
    { q: "Expand RTI.", model: "RTI means the Right to Information.", keys: ["Right to Information"] },
    { q: "What is criminalisation of politics?", model: "It means criminals entering elections and office.", keys: ["criminals"] },
    { q: "Give one effect of corruption.", model: "Corruption diverts funds meant for the poor.", keys: ["poor"] }
  ], reasons: [
    { q: "Why is communalism dangerous for democracy?", model: "It divides voters by faith, not issues. Riots follow hate speeches. Hence secular unity must be guarded.", keys: ["faith", "Riots", "secular"] },
    { q: "Why does corruption persist despite laws?", model: "Delayed courts let culprits escape. Citizens pay speed money silently. Hence transparency plus punishment is needed.", keys: ["Delayed courts", "transparency", "punishment"] },
    { q: "Why is criminalisation rising in polls?", model: "Muscle power wins booths and funds. Parties prize winnability over character. Hence fast courts and voter rejection are cures.", keys: ["Muscle power", "winnability", "voter rejection"] }
  ], two: [
    { q: "Name two challenges to Indian democracy.", model: "Communalism and corruption top the list.", keys: ["Communalism", "corruption"] },
    { q: "Give two effects of regionalism.", model: "Demands for new states and son-of-soil job quotas.", keys: ["new states", "job quotas"] },
    { q: "Give two RTI uses.", model: "Exposing ration scams and school grants.", keys: ["ration", "grants"] },
    { q: "Give two ways media checks power.", model: "Sting reports and debate panels.", keys: ["Sting", "debate"] },
    { q: "Give two qualities of an ideal voter.", model: "Informed choice without selling the vote.", keys: ["Informed", "selling"] }
  ], three: [
    { q: "Explain communalism and its remedies.", model: "Communalism mobilises votes in God's name. Riots and ghettos follow. Secular schooling, swift justice and interfaith meets cure it.", keys: ["God's name", "Riots", "Secular"] },
    { q: "Explain corruption: causes and cures.", model: "Discretion plus secrecy breeds bribes. E-tenders, RTI and fast courts remove hiding places. Honest officers need protection.", keys: ["bribes", "RTI", "fast courts"] },
    { q: "Explain criminalisation of politics.", model: "History-sheeters buy tickets with muscle and money. Voters fear or admire them. Debarring on framing of charges can clean polls.", keys: ["muscle and money", "Debarring", "clean polls"] },
    { q: "Distinguish communalism from regionalism.", model: "Communalism splits by religion; regionalism by soil and language. Both use identity for power. Both yield to development plus justice.", keys: ["religion", "soil and language", "justice"] },
    { q: "How does RTI strengthen democracy?", model: "Citizens ask for files and force replies in 30 days. Exposed scams jail officers. Fear of queries keeps work honest.", keys: ["30 days", "scams", "honest"] },
    { q: "Assess the role of media in meeting challenges.", model: "Fearless reporting exposes riots and scams. Paid news and TV trials distort. Regulation plus ethics saves credibility.", keys: ["exposes", "Paid news", "ethics"] },
    { q: "Why is voter awareness the master remedy?", model: "Aware voters reject criminals and bigots. Turnout rises with knowledge. Democracy then cleans itself.", keys: ["reject", "Turnout", "cleans"] },
    { q: "Suggest a school plan against communalism (three steps).", model: "Mixed teams for sports and projects daily. Festival exhibitions of all faiths. A pledge for unity on 26 January.", keys: ["Mixed teams", "all faiths", "unity"] }
  ], five: [
    { q: "Discuss three challenges to Indian democracy with remedies.", model: "Communalism divides by faith; secular schools and swift courts answer. Corruption eats funds; RTI and e-tenders answer. Criminalisation scares voters; debarring and awareness answer.", keys: ["secular", "RTI", "debarring"] },
    { q: "Argue: democracy in India is resilient despite challenges.", model: "Voters punish arrogance every poll. Courts and the EC check rulers steadily. Movements and media expose rot daily. Hence democracy endures and deepens.", keys: ["punish", "Courts", "endures"] }
  ] });
  MQ("his", [
    { ch: "to8", q: "Ajanta-Ellora are famous as", opts: ["Sea beaches", "UNESCO heritage caves", "Hill stations", "Ports"], ans: 1, exp: "Rock-cut art; world heritage." },
    { ch: "he9", q: "The Archaeological Survey of India looks after", opts: ["Railways", "Protected monuments", "Banks", "Airports"], ans: 1, exp: "Conservation of national monuments." },
    { ch: "el2", q: "The Election Commission is headed by the", opts: ["Prime Minister", "Chief Election Commissioner", "President", "Chief Justice"], ans: 1, exp: "Independent constitutional body." },
    { ch: "pp3", q: "A party recognised in several states with a prescribed vote share is a", opts: ["State party", "National party", "NGO", "Pressure group"], ans: 1, exp: "EC recognition rules." },
    { ch: "pp3", q: "The anti-defection law is in the", opts: ["52nd Amendment (10th Schedule)", "44th Amendment", "Right to Information", "Preamble"], ans: 0, exp: "Disqualification for floor-crossing." },
    { ch: "spm4", q: "The Samyukta Maharashtra movement demanded", opts: ["A separate Vidarbha", "A Marathi-speaking state with Mumbai", "Merger with Gujarat", "Union territory status"], ans: 1, exp: "Achieved 1 May 1960." },
    { ch: "chd5", q: "Communalism means", opts: ["Community service", "Using religion for political ends", "Federal division", "Tribal welfare"], ans: 1, exp: "Votes in the name of god." },
    { ch: "chd5", q: "The Right to Information Act was passed in", opts: ["2005", "1995", "2010", "2000"], ans: 0, exp: "Transparency tool against corruption." }
  ]);

  /* ---------- GEOGRAPHY ---------- */
  MB("geo2:fv", { one: [
    { q: "What is the first step of a field visit?", model: "Defining the objective starts every field visit.", keys: ["objective"] },
    { q: "What is a toposheet?", model: "A toposheet is a large-scale map showing relief, drainage and settlements.", keys: ["relief"] },
    { q: "What must every map carry?", model: "Every map needs scale, direction and a legend.", keys: ["scale", "legend"] },
    { q: "What is remote sensing?", model: "Remote sensing gathers earth data through satellites.", keys: ["satellites"] },
    { q: "Name one use of GIS.", model: "GIS maps disease, traffic or crop patterns.", keys: ["GIS"] }
  ], reasons: [
    { q: "Why is the objective fixed before a field visit?", model: "Without aim, observation wanders and data stays useless. A clear question focuses tools and route. Hence the objective comes first.", keys: ["observation", "objective"] },
    { q: "Why are toposheet symbols standardised?", model: "Standard colours let any reader decode relief and water. Confusion in disasters costs lives. Hence symbols stay uniform.", keys: ["decode", "uniform"] },
    { q: "Why combine fieldwork with maps?", model: "Maps show pattern; fields show process. Together they verify each other. Hence both are compulsory.", keys: ["pattern", "verify"] }
  ], two: [
    { q: "Name two field-visit tools.", model: "Compass and questionnaire.", keys: ["Compass", "questionnaire"] },
    { q: "Name two map essentials.", model: "Scale and the north line.", keys: ["Scale", "north"] },
    { q: "Give two uses of toposheets.", model: "Planning treks and marking watersheds.", keys: ["treks", "watersheds"] },
    { q: "Give two remote-sensing uses.", model: "Crop forecast and flood mapping.", keys: ["Crop", "flood"] },
    { q: "Name two report sections.", model: "Aim with method, then findings.", keys: ["Aim", "findings"] }
  ], three: [
    { q: "Describe the steps of a field visit.", model: "Fix the objective and study toposheets first. Walk the route with compass, camera and questionnaire. Tabulate observations and write aim-method-findings-conclusion. Present the report with maps.", keys: ["objective", "questionnaire", "conclusion"] },
    { q: "Explain toposheet symbols for relief and drainage.", model: "Contours show height: close lines mean steep slopes. Blue lines mark rivers; blue dots mark wells. Brown tints rise with altitude.", keys: ["Contours", "Blue lines", "Brown"] },
    { q: "How are settlement and transport symbols read?", model: "Red squares mark huts; black lines mark roads. Railways run as black ladders. Together they reveal connectivity.", keys: ["Red squares", "Railways", "connectivity"] },
    { q: "Explain scale, direction and legend with one use each.", model: "Scale converts map cm to ground km. The north arrow orients the sheet. The legend decodes every symbol.", keys: ["Scale", "north arrow", "legend"] },
    { q: "Compare Survey of India maps with Google Maps.", model: "SoI sheets are surveyed and legally authoritative. Google Maps update faster with live traffic. Field study uses both.", keys: ["authoritative", "live traffic", "Field study"] },
    { q: "Plan a field visit to a nearby river (four steps).", model: "Mark the stretch on a toposheet. Measure width and note banks, bridges and waste. Interview sand workers and farmers. Conclude with a cleanliness plan.", keys: ["toposheet", "Interview", "cleanliness plan"] },
    { q: "Assess questionnaires as field tools.", model: "Short, local-language questions get honest answers. Long forms tire respondents. Pilot testing fixes wording.", keys: ["honest answers", "Pilot testing"] },
    { q: "Why do geographers study Brazil alongside India?", model: "Brazil mirrors India's tropics, plateaus and monsoon-like rains. Contrasts in settlement and farming sharpen concepts. Comparison builds geographic thinking.", keys: ["tropics", "Comparison", "geographic thinking"] }
  ], five: [
    { q: "Write a model field-visit report on a local water body.", model: "Aim: check pollution sources of the lake. Method: toposheet route, photos, pH strips, interviews. Findings: inlet drain, algal bloom, fishing. Conclusion: divert the drain and fine dumping.", keys: ["Aim", "pH strips", "Conclusion"] },
    { q: "Argue: every geography student must do fieldwork.", model: "Maps alone never show smell, slope or struggle. Fieldwork trains eyes, tools and empathy. Concepts stick when feet verify. Hence fieldwork is compulsory.", keys: ["slope", "empathy", "compulsory"] }
  ] });
  MB("geo2:loc", { one: [
    { q: "Give the latitudinal extent of mainland India.", model: "India's mainland stretches from 8°4′N to 37°6′N.", keys: ["8°4′N", "37°6′N"] },
    { q: "What is India's standard meridian?", model: "82°30′E through Mirzapur is India's standard meridian.", keys: ["82°30′E"] },
    { q: "Through how many states does the Tropic of Cancer pass?", model: "The Tropic of Cancer passes through 8 states.", keys: ["8 states"] },
    { q: "What is India's southernmost mainland point?", model: "Kanyakumari is the mainland's southern tip.", keys: ["Kanyakumari"] },
    { q: "Which ocean is named after India?", model: "The Indian Ocean is named after India.", keys: ["Indian Ocean"] }
  ], reasons: [
    { q: "Why does India follow one standard time?", model: "One meridian at 82°30′E avoids railway chaos. Local times would confuse timetables. Hence IST unites the nation.", keys: ["82°30′E", "IST"] },
    { q: "Why is the Tropic of Cancer significant?", model: "The sun shines vertically on it on 21 June. It divides tropical and subtropical India. Hence climate studies use it.", keys: ["21 June", "subtropical"] },
    { q: "Why does location give India a long coastline?", model: "The peninsula juts 7,517 km into the ocean. Three seas meet its shores. Hence ports and fisheries thrive.", keys: ["7,517 km", "ports"] }
  ], two: [
    { q: "Name two neighbours on India's east.", model: "Bangladesh and Myanmar border the east.", keys: ["Bangladesh", "Myanmar"] },
    { q: "Name two states on the Tropic of Cancer.", model: "Gujarat and West Bengal.", keys: ["Gujarat", "West Bengal"] },
    { q: "Name two island UTs.", model: "Lakshadweep and Andaman-Nicobar.", keys: ["Lakshadweep", "Andaman"] },
    { q: "IST is ahead of GMT by?", model: "IST is GMT+5:30.", keys: ["5:30"] },
    { q: "Name two countries bigger than India.", model: "Russia and China exceed India in area.", keys: ["Russia", "China"] }
  ], three: [
    { q: "Describe India's location and size.", model: "India lies between 8°4′N–37°6′N and 68°7′E–97°25′E, spanning 3.28 million sq km. It is the seventh largest country. Location gives monsoons, coasts and neighbours.", keys: ["3.28 million", "seventh largest", "monsoons"] },
    { q: "Explain the Standard Meridian and IST.", model: "82°30′E through Mirzapur is the standard meridian. IST is GMT+5:30 for the whole nation. One time unites railways and exams.", keys: ["82°30′E", "GMT+5:30", "railways"] },
    { q: "Compare India's location with Brazil's.", model: "India sits in the northern and eastern hemisphere; Brazil in the southern and western. Both cross the tropics and face oceans. Both are subcontinental giants.", keys: ["tropics", "oceans", "giants"] },
    { q: "Write a note on India's neighbours.", model: "Pakistan and China dispute borders; Nepal, Bhutan and Bangladesh share open ties. Sri Lanka links by sea. Neighbourhood shapes policy.", keys: ["dispute", "open ties", "policy"] },
    { q: "Explain the strategic value of the Indian Ocean.", model: "Half the world's oil sails through it. Indian ports guard sea lanes. Hence navies court India.", keys: ["oil", "sea lanes", "navies"] },
    { q: "Distinguish the mainland from the island groups.", model: "The mainland holds states and UTs. Lakshadweep corals and Andaman forests differ ecologically. Both extend the EEZ.", keys: ["Lakshadweep", "Andaman", "EEZ"] },
    { q: "Assess: 'Size gives India natural advantages.'", model: "Vast plains grow food for crores. Long coasts earn trade and fish. Variety of climate tests planning.", keys: ["plains", "coasts", "climate"] },
    { q: "Locate: Tropic of Cancer, Standard Meridian, Kanyakumari, Kachchh.", model: "Cancer cuts India near the middle; 82°30′E runs through Mirzapur. Kanyakumari anchors the south; Kachchh the western marshes. Together they frame India.", keys: ["Mirzapur", "Kanyakumari", "Kachchh"] }
  ], five: [
    { q: "Discuss India's location: extent, neighbours and ocean.", model: "Latitudes 8°4′N–37°6′N and longitudes 68°7′E–97°25′E frame a 3.28 million sq km land. Seven neighbours ring it; the Indian Ocean opens trade. Location thus shapes climate, defence and economy.", keys: ["3.28 million", "Seven neighbours", "economy"] },
    { q: "Compare India and Brazil locationally (five points).", model: "India lies in the north-east hemisphere between 8–37°N; Brazil in the south-west between 5°N–33°S. Both cross the tropics and touch oceans. India has land neighbours all around; Brazil borders ten states. Both are developing giants.", keys: ["tropics", "oceans", "giants"] }
  ] });
  MB("geo2:phy", { one: [
    { q: "Which is India's highest peak?", model: "Kanchenjunga (8,586 m) is India's highest peak.", keys: ["Kanchenjunga"] },
    { q: "Which is India's largest plateau?", model: "The Deccan Plateau is India's largest.", keys: ["Deccan Plateau"] },
    { q: "Which river is called the Ganga of the South?", model: "The Godavari is the Ganga of the South.", keys: ["Godavari"] },
    { q: "Which rivers form the Sunderbans delta?", model: "The Ganga and Brahmaputra form the Sunderbans delta.", keys: ["Ganga and Brahmaputra"] },
    { q: "Where does the Narmada rise?", model: "The Narmada rises at Amarkantak.", keys: ["Amarkantak"] }
  ], reasons: [
    { q: "Why do Himalayan rivers flood the plains?", model: "Steep slopes rush silt-laden water down. Plains slow the flow, spilling banks. Hence floods renew yet ruin.", keys: ["silt", "spilling banks"] },
    { q: "Why is the Deccan rich in black soil?", model: "Lava cooled into basalt, which weathers to regur. Regur holds moisture well. Hence cotton thrives.", keys: ["basalt", "regur", "cotton"] },
    { q: "Why do peninsular rivers dry in summer?", model: "They depend on monsoon rain, not snowmelt. Summer heat evaporates flow. Hence dams store water.", keys: ["monsoon", "snowmelt", "dams"] }
  ], two: [
    { q: "Name the Himalayan ranges in order, north to south.", model: "Himadri, then Himachal, then Shiwalik, southward.", keys: ["Himadri", "Shiwalik"] },
    { q: "Name two west-flowing rivers.", model: "The Narmada and Tapi flow west.", keys: ["Narmada", "Tapi"] },
    { q: "Name two left-bank tributaries of the Ganga.", model: "Gomti and Ghaghara join from the left.", keys: ["Gomti", "Ghaghara"] },
    { q: "Give two features of the Thar desert.", model: "Shifting dunes and scanty rain.", keys: ["dunes", "scanty"] },
    { q: "Name the two coastal plains.", model: "Konkan in the west; Coromandel in the east.", keys: ["Konkan", "Coromandel"] }
  ], three: [
    { q: "Describe the three Himalayan ranges.", model: "Himadri holds Everest and Kanchenjunga in snow. Himachal carries Shimla's hills and valleys. Shiwalik's foothills face the plains.", keys: ["Himadri", "Himachal", "Shiwalik"] },
    { q: "Explain the Northern Plains: formation and divisions.", model: "Himalayan rivers deposited silt for ages, forming Bhabar, Terai, Bhangar and Khadar. Khadar's fresh silt feeds wheat. Density follows fertility.", keys: ["silt", "Bhangar", "Khadar"] },
    { q: "Write a note on the Deccan Plateau.", model: "Volcanic basalt built the Deccan in steps. Black regur soil grows cotton. Minerals and rivers add value.", keys: ["basalt", "regur", "cotton"] },
    { q: "Compare Himalayan and peninsular rivers (three points).", model: "Himalayan rivers are perennial, silted and delta-making. Peninsular rivers are seasonal, rocky and estuary-forming. Dams tame both.", keys: ["perennial", "seasonal", "estuary-forming"] },
    { q: "Explain the Ganga system with tributaries.", model: "The Bhagirathi and Alaknanda meet at Devprayag as the Ganga. Yamuna, Gomti and Ghaghara join from the sides. The Sunderbans delta closes the journey.", keys: ["Devprayag", "Yamuna", "Sunderbans"] },
    { q: "Write a note on the Godavari basin.", model: "The Godavari rises at Trimbakeshwar and runs 1,465 km east. Cotton and sugarcane drink its water. Nizam Sagar and Jayakwadi store it.", keys: ["Trimbakeshwar", "1,465 km", "Jayakwadi"] },
    { q: "Assess: rivers are lifelines of Maharashtra.", model: "Godavari, Krishna and Tapi water farms and cities. Dams light homes and cool plants. Pilgrimages honour every bank.", keys: ["Godavari", "Dams", "Pilgrimages"] },
    { q: "Compare the Amazon with the Ganga.", model: "The Amazon carries the world's largest discharge through forests. The Ganga carries the densest civilisation on plains. Both face pollution and dams.", keys: ["discharge", "civilisation", "pollution"] }
  ], five: [
    { q: "Describe India's physiographic divisions with one feature each.", model: "The Himalayas guard the north; the plains feed crores. The peninsula mines minerals; the coasts trade; the islands guard seas. Deserts test adaptation.", keys: ["plains", "peninsula", "islands"] },
    { q: "Discuss river pollution and cleaning (Ganga + one Maharashtra river).", model: "Sewage, idols and industry choke the Ganga; Namami Gange builds sewers. Maharashtra's Mula-Mutha needs the same. People's taps depend on clean rivers.", keys: ["Sewage", "Namami Gange", "Mula-Mutha"] }
  ] });
  MB("geo2:cli", { one: [
    { q: "Which winds bring most rain to India?", model: "The south-west monsoon brings most rain.", keys: ["south-west monsoon"] },
    { q: "Which month brings Mumbai's heaviest rain?", model: "July brings Mumbai's heaviest rain.", keys: ["July"] },
    { q: "What is loo?", model: "Loo is the hot dry summer wind of the north.", keys: ["loo"] },
    { q: "Which coast gets winter rain?", model: "The Coromandel coast gets retreating-monsoon rain.", keys: ["Coromandel"] },
    { q: "What is El Nino?", model: "El Nino is Pacific warming that can weaken the monsoon.", keys: ["Pacific warming"] }
  ], reasons: [
    { q: "Why does Mumbai rain heavily in July?", model: "The Arabian Sea branch strikes the Ghats head-on. Orographic lift dumps clouds fast. Hence July peaks.", keys: ["Arabian Sea", "Orographic", "July"] },
    { q: "Why is the Coromandel dry in the summer monsoon?", model: "It lies in the rain shadow of the Ghats. The Bay branch flows parallel to the coast. Hence it waits for winter rain.", keys: ["rain shadow", "parallel", "winter rain"] },
    { q: "Why do north Indian winters get rain?", model: "Western disturbances ride the jet stream in. They water wheat and chill nights. Hence farmers watch them.", keys: ["Western disturbances", "wheat"] }
  ], two: [
    { q: "Name the two monsoon branches.", model: "The Arabian Sea and Bay of Bengal branches.", keys: ["Arabian Sea", "Bay of Bengal"] },
    { q: "Name two rainy months in Maharashtra.", model: "June and July open the season.", keys: ["June", "July"] },
    { q: "Name two cool summer retreats.", model: "Mahabaleshwar and Ooty stay cool.", keys: ["Mahabaleshwar", "Ooty"] },
    { q: "Give two effects of a late monsoon.", model: "Dry dams and delayed sowing.", keys: ["Dry dams", "sowing"] },
    { q: "In which months does Chennai get rain?", model: "October to December from the retreating monsoon.", keys: ["October", "retreating"] }
  ], three: [
    { q: "Explain the mechanism of the south-west monsoon.", model: "Summer heat builds low pressure over the north. Moist air rushes in from the seas. The Ghats and Himalayas squeeze out rain.", keys: ["low pressure", "moist air", "squeeze"] },
    { q: "Why does the Coromandel get winter rain?", model: "The retreating monsoon picks up Bay moisture. The coast faces these winds directly. Hence October to December wets Chennai.", keys: ["Bay moisture", "directly", "October"] },
    { q: "Compare Mumbai and Chennai rainfall regimes.", model: "Mumbai peaks in July with orographic rain. Chennai peaks in November with cyclonic rain. Their seasons oppose.", keys: ["July", "November", "oppose"] },
    { q: "Explain western disturbances and their uses.", model: "Mediterranean lows ride winter jets east. They rain wheat belts and snow hills. Apple and wheat depend on them.", keys: ["Mediterranean", "wheat", "snow"] },
    { q: "What is the retreating monsoon? (process + effects)", model: "By October the low shifts south; winds reverse to land-to-sea. Tamil Nadu gains rain; north India clears. Cyclones threaten coasts.", keys: ["reverse", "Tamil Nadu", "Cyclones"] },
    { q: "Assess monsoon dependence of Indian farming.", model: "Half the cropped area lacks irrigation. A weak monsoon cuts food and jobs. Forecasts and dams reduce risk.", keys: ["irrigation", "food", "Forecasts"] },
    { q: "Compare Indian and Brazilian rainfall.", model: "India's monsoon bursts seasonally and withdraws. Amazon rains fall year-round by convection. Both feed great rivers.", keys: ["seasonally", "convection", "rivers"] },
    { q: "Suggest a school weather project (instruments + table).", model: "Record rain with a gauge and wind with an anemometer daily. Tabulate max-min temperature monthly. Compare with IMD data and conclude.", keys: ["gauge", "anemometer", "IMD"] }
  ], five: [
    { q: "Discuss the seasons of India with rainfall and crops.", model: "Summer heats the north with loo; mango showers help the south. The monsoon floods fields with rice. Winter clears skies for wheat; retreating rain serves Tamil Nadu.", keys: ["loo", "rice", "wheat"] },
    { q: "Argue: climate change threatens the monsoon.", model: "Warming shifts tracks and breaks; cloudbursts alternate with droughts. Reservoirs swing full-empty. Adaptation needs forecasts, storage and hardy seeds.", keys: ["cloudbursts", "droughts", "hardy seeds"] }
  ] });
  MB("geo2:veg", { one: [
    { q: "Which forest type covers the Western Ghats?", model: "Tropical evergreen forests cloak the Ghats.", keys: ["evergreen"] },
    { q: "Sandalwood grows in which forest?", model: "Sandalwood grows in tropical deciduous forests.", keys: ["deciduous"] },
    { q: "Name one mangrove site in Maharashtra.", model: "The Achara-Ratnagiri creeks hold mangroves.", keys: ["mangroves"] },
    { q: "Which was Project Tiger's first reserve (1973)?", model: "Jim Corbett became the first tiger reserve.", keys: ["Corbett"] },
    { q: "Name one endemic species of the Ghats.", model: "The lion-tailed macaque lives only in the Ghats.", keys: ["lion-tailed macaque"] }
  ], reasons: [
    { q: "Why are tidal forests halophytes?", model: "Daily salt flooding kills ordinary roots. Pneumatophores breathe above mud. Hence mangroves survive.", keys: ["salt", "Pneumatophores"] },
    { q: "Why do deciduous trees shed leaves?", model: "Summer heat would drain water through leaves. Shedding conserves moisture. Hence teak rests yearly.", keys: ["conserves moisture", "teak"] },
    { q: "Why protect endemic species first?", model: "They live nowhere else on earth. Extinction means total loss. Hence hotspots top lists.", keys: ["nowhere else", "Extinction"] }
  ], two: [
    { q: "Name two evergreen trees.", model: "Rosewood and ebony stay green.", keys: ["Rosewood", "ebony"] },
    { q: "Name two deciduous trees.", model: "Teak and sal shed yearly.", keys: ["Teak", "sal"] },
    { q: "Name two thorn-forest plants.", model: "Babool and cactus store water.", keys: ["Babool", "cactus"] },
    { q: "Name two national parks of Maharashtra.", model: "Tadoba and Sanjay Gandhi parks.", keys: ["Tadoba", "Sanjay Gandhi"] },
    { q: "Give two causes of deforestation.", model: "Farming expansion and mining.", keys: ["Farming", "mining"] }
  ], three: [
    { q: "Describe tropical evergreen forests.", model: "Heavy rain over 200 cm keeps them green year-round. Rosewood and ebony crowd in layers. The Ghats and Andaman host them.", keys: ["200 cm", "Rosewood", "Andaman"] },
    { q: "Describe tropical deciduous forests.", model: "Moderate rain grows teak and sal. Trees shed leaves to save water. Most Indian forests are this type.", keys: ["teak", "shed leaves", "Most"] },
    { q: "Explain mangroves with adaptations.", model: "Tidal mud hosts stilt roots and pneumatophores. Salt-excreting leaves survive spray. The Sunderbans and Ratnagiri show them.", keys: ["pneumatophores", "Sunderbans", "Ratnagiri"] },
    { q: "Compare Gir and Tadoba.", model: "Gir guards Asiatic lions in dry scrub. Tadoba guards tigers in teak forest. Both use core-buffer zones.", keys: ["lions", "tigers", "core-buffer"] },
    { q: "Why is the Western Ghats a hotspot?", model: "Endemic macaques, frogs and plants crowd it. Monsoon plus isolation evolved them. Threats now press hard.", keys: ["Endemic", "isolation", "Threats"] },
    { q: "Assess Joint Forest Management.", model: "Villagers guard beats and share produce. Incomes rise with forests. Participation beats policing.", keys: ["share produce", "Incomes", "Participation"] },
    { q: "Distinguish national parks from sanctuaries.", model: "Parks ban all human use strictly. Sanctuaries allow limited grazing. Cores protect breeding.", keys: ["ban", "grazing", "Cores"] },
    { q: "Compare Amazon and Ghats forests.", model: "The Amazon's vast evergreen stores carbon globally. The Ghats' compact evergreen waters India's rivers. Both face mines and roads.", keys: ["carbon", "rivers", "mines"] }
  ], five: [
    { q: "Discuss forest types of India with climate links.", model: "Evergreen needs 200 cm rain; deciduous moderate; thorn survives drought. Tidal forests guard coasts; Himalayan zones stack vertically. Climate paints forests.", keys: ["200 cm", "thorn", "vertically"] },
    { q: "Argue: wildlife conservation pays.", model: "Tigers pull tourism crores yearly. Forests water farms free. Genes insure future crops. Protection is profitable.", keys: ["tourism", "farms", "Genes"] }
  ] });
  MB("geo2:pop", { one: [
    { q: "Define density of population.", model: "Density equals people per sq km.", keys: ["per sq km"] },
    { q: "Which is the most populous state?", model: "Uttar Pradesh is the most populous state.", keys: ["Uttar Pradesh"] },
    { q: "What is sex ratio?", model: "Sex ratio is females per 1000 males.", keys: ["1000 males"] },
    { q: "What was India's literacy in 2011?", model: "About 73% were literate in 2011.", keys: ["73%"] },
    { q: "What is urbanisation?", model: "Urbanisation is the rising share of town-dwellers.", keys: ["town-dwellers"] }
  ], reasons: [
    { q: "Why is the Gangetic plain dense?", model: "Flat fertile land plus water feeds many. Jobs cluster in cities. Hence density soars.", keys: ["fertile", "density"] },
    { q: "Why does Kerala differ demographically?", model: "Literacy, especially women's, cut births. Health care cut deaths. Hence growth slowed.", keys: ["Literacy", "growth slowed"] },
    { q: "Why study age composition?", model: "Young workers need jobs; elders need care. Planning schools and pensions depends on it. Hence pyramids matter.", keys: ["jobs", "pensions"] }
  ], two: [
    { q: "Name two crowded states.", model: "UP and Bihar crowd the plains.", keys: ["UP", "Bihar"] },
    { q: "Name two sparse areas.", model: "Ladakh and Arunachal stay sparse.", keys: ["Ladakh", "Arunachal"] },
    { q: "If literacy is 73%, how many per 100 are illiterate?", model: "27 per 100 remain illiterate.", keys: ["27"] },
    { q: "Give two causes of migration to Mumbai.", model: "Mill jobs earlier; film and finance now.", keys: ["Mill", "finance"] },
    { q: "Give two effects of high density.", model: "Crowded trains and costly housing.", keys: ["trains", "housing"] }
  ], three: [
    { q: "Explain density distribution in India.", model: "Plains and coasts crowd with farms and ports. Himalayas and deserts stay thin. Water and jobs decide density.", keys: ["plains", "thin", "jobs"] },
    { q: "Write a note on Census operations.", model: "Every 10 years enumerators list each resident. Houses, age and literacy get coded. Totals plan funds and seats.", keys: ["10 years", "literacy", "seats"] },
    { q: "Explain sex-ratio concerns in India.", model: "India counts about 943 females per 1000 males. Neglect and selection skew births. Beti Bachao promotes births and schooling. Every girl counts.", keys: ["943", "Beti Bachao", "schooling"] },
    { q: "Compare Kerala and Bihar demographically.", model: "Kerala shows low birth, low death, high literacy. Bihar shows high birth with poverty. Policy must differ.", keys: ["low birth", "high birth", "Policy"] },
    { q: "Explain migration types with causes.", model: "Rural-urban flows chase jobs; seasonal cane-cutting follows harvest. Marriage moves women mostly. Push and pull both work.", keys: ["jobs", "harvest", "Push and pull"] },
    { q: "Assess: 'Population is a resource.'", model: "Skilled youth build and earn. Unskilled crowds strain services. Education converts burden to bonus.", keys: ["Skilled youth", "strain", "Education"] },
    { q: "Distinguish birth rate from growth rate.", model: "Birth rate counts births per 1000 yearly. Growth subtracts deaths and adds migration. Policies target both.", keys: ["per 1000", "migration", "Policies"] },
    { q: "Compare India and Brazil population patterns.", model: "India crowds plains densely; Brazil crowds coasts, emptying Amazonia. Both urbanise fast with slums. Planning differs by map.", keys: ["densely", "coasts", "slums"] }
  ], five: [
    { q: "Discuss India's population pyramid and its meaning.", model: "A wide base shows many children; the narrowing top shows fewer elders. It promises workers but demands schools. Policy must skill the bulge.", keys: ["wide base", "workers", "skill"] },
    { q: "Argue: literacy solves population pressure.", model: "Educated women marry later and plan families. Kerala proves the link. Schools thus cool growth sustainably.", keys: ["plan families", "Kerala", "Schools"] }
  ] });
  MB("geo2:stl", { one: [
    { q: "What is a settlement?", model: "A settlement is a place where people live and work.", keys: ["live"] },
    { q: "Name two types of rural settlements.", model: "Compact and dispersed villages.", keys: ["Compact", "dispersed"] },
    { q: "What is site versus situation?", model: "Site is the exact ground; situation is its surroundings.", keys: ["ground", "surroundings"] },
    { q: "Name a planned city.", model: "Chandigarh is a planned city.", keys: ["Chandigarh"] },
    { q: "What is urban sprawl?", model: "Urban sprawl is uncontrolled city spread.", keys: ["spread"] }
  ], reasons: [
    { q: "Why do villages cluster near water?", model: "Wells and rivers cut carrying distance. Farms need daily water. Hence houses hug sources.", keys: ["distance", "hug"] },
    { q: "Why do hill towns sprawl linearly?", model: "Ridges allow building only along roads. Valleys forbid sideways growth. Hence lines follow contours.", keys: ["Ridges", "contours"] },
    { q: "Why did Mumbai grow into a megacity?", model: "Port, mills and films pulled migrants. Railways spread suburbs. Hence crores crowded in.", keys: ["Port", "Railways", "crores"] }
  ], two: [
    { q: "Name two compact-settlement regions.", model: "The Punjab plains and Kerala coast.", keys: ["Punjab", "Kerala"] },
    { q: "Name two dispersed-settlement regions.", model: "The Konkan hills and Meghalaya.", keys: ["Konkan", "Meghalaya"] },
    { q: "Name two functions of towns.", model: "Market and administration.", keys: ["Market", "administration"] },
    { q: "Name two planned cities.", model: "Chandigarh and Navi Mumbai.", keys: ["Chandigarh", "Navi Mumbai"] },
    { q: "Name two slum problems.", model: "Unsafe water and no toilets.", keys: ["water", "toilets"] }
  ], three: [
    { q: "Distinguish rural from urban settlements (three points).", model: "Rural folk farm with low density. Urban folk serve industry with high density. Services and votes differ accordingly.", keys: ["farm", "density", "Services"] },
    { q: "Explain compact versus dispersed villages.", model: "Plains cluster homes for safety and wells. Hills scatter homes near terraces. Terrain decides pattern.", keys: ["cluster", "scatter", "Terrain"] },
    { q: "Write a note on Mumbai's growth.", model: "Seven islands merged by causeways. Mills, port and films pulled lakhs. Railways stretched it into suburbs.", keys: ["islands", "mills", "suburbs"] },
    { q: "Compare Mumbai with Brasília.", model: "Mumbai grew organically around its port. Brasília rose planned in a decade. One crowds, the other zones.", keys: ["port", "planned", "zones"] },
    { q: "Explain site and situation with Mumbai.", model: "Site: seven marshy islands. Situation: Arabian Sea trade winds. Together they made a port-city.", keys: ["islands", "trade winds", "port-city"] },
    { q: "Assess slums: problems and policy.", model: "Dharavi recycles city waste yet lacks toilets. The SRA rebuilds in situ. Dignity needs tenure plus services.", keys: ["Dharavi", "toilets", "tenure"] },
    { q: "How do towns serve villages?", model: "Mandis buy crops and sell inputs. Hospitals and colleges cluster there. Roads link both daily.", keys: ["Mandis", "colleges", "Roads"] },
    { q: "Plan a smart village (three ideas).", model: "Piped water plus toilets first. Solar lights with Wi-Fi next. Agro-processing jobs complete it.", keys: ["toilets", "Solar", "jobs"] }
  ], five: [
    { q: "Discuss urbanisation in India: trends and problems.", model: "Towns now hold a third of Indians and rising. Jobs pull migrants; housing lags. Slums, traffic and waste follow. Planned transport and housing answer.", keys: ["third", "Slums", "housing"] },
    { q: "Compare a metro with a market town.", model: "Metros host headquarters and metro rails. Market towns host mandis and melas. Both need water, waste and ward plans.", keys: ["headquarters", "mandis", "ward"] }
  ] });
  MB("geo2:eco", { one: [
    { q: "Name two kharif crops.", model: "Rice and cotton are kharif crops.", keys: ["Rice", "cotton"] },
    { q: "Name two rabi crops.", model: "Wheat and mustard are rabi crops.", keys: ["Wheat", "mustard"] },
    { q: "What is plantation agriculture?", model: "Plantation grows one cash crop on large estates.", keys: ["estates"] },
    { q: "Which is the largest employer in India?", model: "Agriculture employs the most Indians.", keys: ["Agriculture"] },
    { q: "What is an SEZ?", model: "An SEZ is a duty-free export zone.", keys: ["duty-free"] }
  ], reasons: [
    { q: "Why is rice grown in West Bengal?", model: "Heavy rain plus delta silt suits paddy. Labour is plentiful. Hence Bengal leads.", keys: ["silt", "leads"] },
    { q: "Why did the Green Revolution start in Punjab?", model: "Canal water plus flat land suited HYV wheat. Credit and mandis backed farmers. Hence yields jumped.", keys: ["HYV", "yields"] },
    { q: "Why do farmers need crop insurance?", model: "Hail and drought strike suddenly. Loans compound losses. Hence insurance cushions risk.", keys: ["drought", "insurance"] }
  ], two: [
    { q: "Name two cash crops.", model: "Cotton and sugarcane pay cash.", keys: ["Cotton", "sugarcane"] },
    { q: "Name two plantation crops.", model: "Tea and coffee grow on estates.", keys: ["Tea", "coffee"] },
    { q: "Name two iron-steel centres.", model: "Jamshedpur and Bhilai smelt steel.", keys: ["Jamshedpur", "Bhilai"] },
    { q: "Name two IT hubs.", model: "Bengaluru and Hyderabad code software.", keys: ["Bengaluru", "Hyderabad"] },
    { q: "Name two Mumbai industries.", model: "Film and finance employ lakhs.", keys: ["Film", "finance"] }
  ], three: [
    { q: "Distinguish kharif from rabi (three points).", model: "Kharif sows with June rains (rice, cotton). Rabi sows in winter (wheat, mustard). Seasons flip inputs and harvests.", keys: ["rice", "wheat", "Seasons"] },
    { q: "Explain the Green Revolution.", model: "HYV seeds with fertilisers and canals doubled wheat. Punjab led; hunger fell. Soils and water paid the price.", keys: ["HYV", "Punjab", "doubled"] },
    { q: "Write a note on cotton in Maharashtra.", model: "Black soil and dry spells suit cotton. Marathwada gins and spins it. Prices decide sowing.", keys: ["Black soil", "Marathwada", "Prices"] },
    { q: "Explain sugar cooperatives.", model: "Co-op mills share profits with cane farmers. Warana and Pravara show the model. Politics shadows management.", keys: ["Co-op", "Warana", "profits"] },
    { q: "Why is IT concentrated in Bengaluru-Hyderabad?", model: "Engineering colleges supply talent. Pleasant climate and airports help. Policy parks seal the deal.", keys: ["talent", "airports", "parks"] },
    { q: "Assess iron-steel location factors.", model: "Ore, coal, water and rails decide sites. Jamshedpur had all four. Mini-mills now recycle scrap.", keys: ["Ore", "Jamshedpur", "scrap"] },
    { q: "Compare Indian and Brazilian agriculture.", model: "India farms small plots intensively. Brazil ranches vast fazendas. Both export sugar and coffee.", keys: ["small plots", "fazendas", "sugar"] },
    { q: "Suggest doubling farm income (three steps).", model: "Drip irrigation saves water. Processing adds value. Direct mandi apps cut middlemen.", keys: ["Drip", "Processing", "apps"] }
  ], five: [
    { q: "Discuss Maharashtra's agriculture: crops, problems, solutions.", model: "Cotton, sugarcane and onion lead output. Rain failure and debt kill hope. Drip, co-ops and insurance answer. Processing multiplies income.", keys: ["Cotton", "debt", "insurance"] },
    { q: "Argue: industry or services for jobs?", model: "Industry absorbs school leavers in factories. Services pay graduates in offices. India needs both ladders.", keys: ["factories", "offices", "ladders"] }
  ] });
  MB("geo2:trt", { one: [
    { q: "Which is India's longest national highway?", model: "NH-44 is India's longest highway.", keys: ["NH-44"] },
    { q: "What is the Golden Quadrilateral?", model: "It links Delhi-Mumbai-Chennai-Kolkata by highway.", keys: ["Delhi-Mumbai-Chennai-Kolkata"] },
    { q: "Name one international airport of Maharashtra.", model: "Mumbai's Sahar airport serves international flights.", keys: ["Sahar"] },
    { q: "What is a port?", model: "A port loads and unloads ships.", keys: ["ships"] },
    { q: "Name one communication satellite series.", model: "The INSAT series carry TV and phones.", keys: ["INSAT"] }
  ], reasons: [
    { q: "Why are roads called arteries?", model: "They carry goods to every village. Blocked roads stall life. Hence roads are arteries.", keys: ["village", "arteries"] },
    { q: "Why did the Konkan Railway matter?", model: "It linked Mumbai to Kerala through tunnels. Freight and tourists flow faster. Hence coasts connected.", keys: ["tunnels", "coasts"] },
    { q: "Why is Mumbai a transport hub?", model: "Port, two railways and airport meet here. Head offices follow links. Hence hub status stays.", keys: ["Port", "airport", "hub"] }
  ], two: [
    { q: "Name two national waterways.", model: "NW-1 on the Ganga; NW-2 on the Brahmaputra.", keys: ["NW-1", "NW-2"] },
    { q: "Name two Maharashtra ports.", model: "Nhava Sheva and Mumbai ports.", keys: ["Nhava Sheva", "Mumbai"] },
    { q: "Name two hill railways.", model: "Matheran and Darjeeling joy-rides.", keys: ["Matheran", "Darjeeling"] },
    { q: "Name two telecom revolutions.", model: "STD booths, then mobiles.", keys: ["STD", "mobiles"] },
    { q: "Name two tourist circuits.", model: "The Golden Triangle and Ashtavinayak.", keys: ["Golden Triangle", "Ashtavinayak"] }
  ], three: [
    { q: "Explain road types with examples.", model: "Expressways speed metros; NHs link capitals. State highways join districts; rural roads reach farms. Each tier feeds the next.", keys: ["Expressways", "State highways", "rural roads"] },
    { q: "Write a note on Indian Railways.", model: "The lifeline runs 68,000 km with zones. Suburban trains carry Mumbai daily. Freight earns the surplus.", keys: ["68,000 km", "Suburban", "Freight"] },
    { q: "Explain the Konkan Railway.", model: "Tunnels and bridges pierce the Ghats to Kerala. Monsoon timetables beat landslides. Tourism and fish ride it.", keys: ["Tunnels", "Monsoon", "fish"] },
    { q: "Compare Mumbai and Santos ports.", model: "Nhava Sheva handles containers for industry. Santos ships Brazil's coffee and sugar. Both need dredging and roads.", keys: ["containers", "coffee", "dredging"] },
    { q: "How did mobiles change communication?", model: "STD booths gave way to pocket phones. UPI and video reach villages. Information now travels instantly.", keys: ["STD", "UPI", "instantly"] },
    { q: "Distinguish personal from mass communication.", model: "Letters and calls target individuals. TV and radio address crores. Both need networks.", keys: ["individuals", "crores", "networks"] },
    { q: "Assess tourism circuits in Maharashtra.", model: "Ashtavinayak links faith with roads. Ajanta-Ellora links art with stays. Circuits package days and spending.", keys: ["Ashtavinayak", "Ajanta-Ellora", "Circuits"] },
    { q: "Suggest easing Mumbai traffic (three steps).", model: "Complete metro lines fast. Run more AC buses with lanes. Stagger office hours.", keys: ["metro", "buses", "hours"] }
  ], five: [
    { q: "Discuss transport as the backbone of the economy.", model: "Roads feed mandis daily. Rails move coal and grain cheaply. Ports and planes link the world. Together they set prices.", keys: ["mandis", "Rails", "prices"] },
    { q: "Compare transport in India and Brazil.", model: "India leans on crowded rails. Brazil flies long hauls and ships rivers. Both pave highways now. Geography dictates mix.", keys: ["rails", "rivers", "highways"] }
  ] });
  MQ("geo2", [
    { ch: "pop", q: "India's population in Census 2011 was about", opts: ["102 crore", "121 crore", "140 crore", "90 crore"], ans: 1, exp: "1.21 billion then." },
    { ch: "stl", q: "The first cotton mill in Mumbai (1854) was set up by", opts: ["J. Tata", "G. Birla", "C. N. Davar", "D. Ambani"], ans: 2, exp: "Bombay Spinning and Weaving Company." },
    { ch: "eco", q: "Which is a kharif crop?", opts: ["Wheat", "Rice", "Mustard", "Gram"], ans: 1, exp: "Sown with June rains." }
  ]);

  /* ---------- ENGLISH ---------- */
  MB("eng:gr", { one: [
    { q: "Identify the tense: She has finished her work.", model: "It is in the present perfect tense.", keys: ["Present perfect"] },
    { q: "Change to passive: She writes a letter.", model: "The passive form is: A letter is written by her.", keys: ["is written"] },
    { q: "Change to indirect speech: He said, 'I am busy.'", model: "He said that he was busy.", keys: ["he was busy"] },
    { q: "Add a question tag: You are coming, ___?", model: "You are coming, aren't you?", keys: ["aren't you"] },
    { q: "Give the comparative degree of 'good'.", model: "The comparative degree of good is better.", keys: ["better"] }
  ], reasons: [
    { q: "Rewrite using 'unless': If you do not hurry, you will miss the bus.", model: "Unless you hurry, you will miss the bus.", keys: ["Unless you hurry"] },
    { q: "Rewrite in passive voice: The teacher praised the boy.", model: "The boy was praised by the teacher.", keys: ["was praised"] },
    { q: "Punctuate: what a beautiful flower it is", model: "What a beautiful flower it is!", keys: ["beautiful flower"] },
    { q: "Combine with 'although': He is rich. He is not happy.", model: "Although he is rich, he is not happy.", keys: ["Although he is rich"] },
    { q: "Change the degree: No other metal is as useful as iron. (superlative)", model: "Iron is the most useful of all metals.", keys: ["most useful"] }
  ], two: [
    { q: "Make it negative without changing meaning: He is always on time.", model: "He is never late.", keys: ["never late"] },
    { q: "Rewrite as exclamatory: The scenery is very beautiful.", model: "How beautiful the scenery is!", keys: ["How beautiful"] },
    { q: "Use 'as soon as': On seeing the teacher, the boys stood up.", model: "As soon as the boys saw the teacher, they stood up.", keys: ["As soon as"] },
    { q: "Rewrite with 'too': He is so tired that he cannot walk.", model: "He is too tired to walk.", keys: ["too tired to"] },
    { q: "Change to comparative: Mumbai is one of the biggest cities.", model: "Mumbai is bigger than most other cities.", keys: ["bigger than"] }
  ], three: [
    { q: "Explain the present perfect tense with two examples.", model: "It links a past action to the present moment. 'She has finished her work' shows completion. 'I have lived here since 2015' shows duration.", keys: ["links a past action", "has finished", "since 2015"] },
    { q: "Explain active-passive conversion with an example.", model: "The object becomes the subject in passive voice. The verb takes be + past participle. Example: 'She writes a letter' becomes 'A letter is written by her'.", keys: ["object becomes the subject", "be + past participle", "is written"] },
    { q: "Explain direct-indirect speech changes with an example.", model: "Reported speech backshifts tenses: is becomes was. Pronouns and time words shift too. Example: He said, 'I am busy' becomes He said that he was busy.", keys: ["backshifts tenses", "Pronouns", "he was busy"] },
    { q: "Explain degrees of comparison with one example each.", model: "Positive states equality: as tall as. Comparative compares two: taller than. Superlative picks one of many: the tallest.", keys: ["as tall as", "taller than", "the tallest"] },
    { q: "Explain question tags with two examples.", model: "A positive sentence takes a negative tag. 'You are coming, aren't you?' shows it. Negative sentences take positive tags.", keys: ["negative tag", "aren't you", "positive tags"] },
    { q: "Explain 'since' versus 'for' with examples.", model: "Since marks a point of time: since Monday. For marks a duration: for three days. Mixing them changes meaning.", keys: ["point of time", "duration", "since Monday"] },
    { q: "Explain finite versus non-finite verbs.", model: "Finite verbs show tense with a subject. Non-finites like infinitives and participles do not. 'To err is human' has a non-finite.", keys: ["tense", "infinitives", "To err"] },
    { q: "Explain subject-verb agreement with two rules.", model: "A singular subject takes a singular verb. 'Neither of the boys is late' follows proximity. Collective nouns usually take singular verbs.", keys: ["singular verb", "Neither", "Collective nouns"] }
  ], five: [
    { q: "Do as directed: (i) passive of 'She writes a letter' (ii) indirect of 'He said, I am busy' (iii) tag for 'You are coming' (iv) comparative of good (v) exclamatory of 'very beautiful scenery'.", model: "(i) A letter is written by her. (ii) He said that he was busy. (iii) You are coming, aren't you? (iv) Better. (v) How beautiful the scenery is!", keys: ["is written", "was busy", "aren't you", "Better", "How beautiful"] },
    { q: "Correct the errors: (i) He do not like mangoes (ii) She is junior than me (iii) The sceneries are beautiful (iv) I have been waiting since two hours (v) Each of the boys are ready.", model: "(i) He does not like mangoes. (ii) She is junior to me. (iii) The scenery is beautiful. (iv) I have been waiting for two hours. (v) Each of the boys is ready.", keys: ["does not", "junior to", "scenery is", "for two hours", "is ready"] }
  ] });
  MB("eng:wr", { one: [
    { q: "What opens a formal letter?", model: "The sender's address with date opens a formal letter.", keys: ["sender's address"] },
    { q: "What is a subject line?", model: "A subject line states the letter's purpose briefly.", keys: ["purpose"] },
    { q: "What is a report headline?", model: "A headline summarises the news in a few words.", keys: ["summarises"] },
    { q: "Name two parts of an email.", model: "Subject line and body with sign-off.", keys: ["Subject line", "sign-off"] },
    { q: "What is dialogue formatting?", model: "Each speaker's words go in a new line with quotation marks.", keys: ["new line", "quotation marks"] }
  ], reasons: [
    { q: "Why is the subject line crucial in letters and emails?", model: "It tells the reader the purpose instantly. Busy officials sort by subject. Hence a clear subject gets replies.", keys: ["purpose", "replies"] },
    { q: "Why must reports stay factual?", model: "Opinions mislead the public. Facts with witnesses build trust. Hence news avoids adjectives.", keys: ["Facts", "trust"] },
    { q: "Why plan a speech before writing it?", model: "Planning orders ideas logically. Openings hook listeners. Hence outlines save time.", keys: ["logically", "hook"] }
  ], two: [
    { q: "Draft a 3-line condolence message.", model: "We share your grief at this loss. His kindness lives on in us. Please accept our sympathy.", keys: ["grief", "sympathy"] },
    { q: "Write a 3-line notice for a class picnic.", model: "Class X picnic to Lonavala on Sunday. Assemble at 7 am with tiffin. Contact the monitor by Friday.", keys: ["Lonavala", "monitor"] },
    { q: "Give a headline plus first line: school wins the football final.", model: "Headline: 'City School Lifts Football Cup.' First line: City School beat St Mary's 2-1 in the final.", keys: ["Football Cup", "2-1"] },
    { q: "Write 3 dialogue exchanges inviting a friend.", model: "'Will you join the library drive?' 'Gladly — when?' 'Saturday at ten.' Polite turns complete it.", keys: ["library drive", "Saturday"] },
    { q: "Write a 3-line product description (school bag).", model: "Strong canvas with padded straps. Three zipped compartments fit books. Five-year warranty included.", keys: ["padded straps", "warranty"] }
  ], three: [
    { q: "Write a letter to the editor about water shortage (format + points).", model: "Address, date, 'To the Editor', subject, salutation. Body: shortage timing, suffering, demand for tankers. Sign-off with name.", keys: ["subject", "tankers", "Sign-off"] },
    { q: "Write a report on the school annual day.", model: "Headline with venue and date. Opening: chief guest and events. Details: prizes and speeches; close with a vote of thanks.", keys: ["Headline", "chief guest", "vote of thanks"] },
    { q: "Draft a speech on 'Save Water' (opening + points + close).", model: "Greet and open with a stark fact. Points: short showers and rain harvesting. Close with a pledge appeal.", keys: ["Greet", "rain harvesting", "pledge"] },
    { q: "Expand the idea: 'Honesty is the best policy.'", model: "Define honesty as truth in word and act. Example: returning a lost purse. Result: trust and peace.", keys: ["truth", "trust", "peace"] },
    { q: "Write an email applying for three days' leave (fever).", model: "Subject: Leave application, Class X-A. Body: fever since Monday, request for three days. Sign-off with roll number.", keys: ["Subject", "three days", "roll number"] },
    { q: "Write a dialogue between a customer and a bookseller (4 exchanges).", model: "Greeting and asking the price. Bargaining politely. Agreeing and paying. Thanking and leaving.", keys: ["price", "paying", "Thanking"] },
    { q: "Describe your best friend in a paragraph.", model: "Name, class and meeting story. Qualities: honest, funny, helpful. A shared memory closes it.", keys: ["honest", "helpful", "memory"] },
    { q: "State the rules of message-writing from a notice.", model: "Read twice and keep only facts. Use indirect speech with no headings. One-third length suffices.", keys: ["facts", "indirect speech", "One-third"] }
  ], five: [
    { q: "Write a formal letter to the Municipal Commissioner about garbage (full format).", model: "Sender's address and date; To the Commissioner; Subject: Heaps of garbage in Ward 4. Body: uncollected piles, stink, disease risk; demand daily clearance. Yours faithfully with name.", keys: ["Subject", "disease risk", "Yours faithfully"] },
    { q: "Write on 'My Role in a Clean India' (five points).", model: "Open with Gandhiji's dream. Points: no littering, segregation, composting, drives. Close: pledge for a clean ward.", keys: ["segregation", "composting", "pledge"] }
  ] });
  MB("eng:rc", { one: [
    { q: "What is skimming?", model: "Skimming is quick reading for the gist.", keys: ["gist"] },
    { q: "What is scanning?", model: "Scanning hunts for specific facts fast.", keys: ["specific facts"] },
    { q: "What is inference?", model: "Inference reads between the lines logically.", keys: ["between the lines"] },
    { q: "What makes a good title?", model: "A title captures the central idea briefly.", keys: ["central idea"] },
    { q: "What is a summary?", model: "A summary keeps only the main points briefly.", keys: ["main points"] }
  ], reasons: [
    { q: "Why skim before detailed reading?", model: "Skimming maps the passage structure. Questions then locate answers faster. Hence time is saved.", keys: ["structure", "time"] },
    { q: "Why guess word meaning from context?", model: "A dictionary breaks flow and wastes time. Surrounding clues usually suffice. Hence context comes first.", keys: ["flow", "clues"] },
    { q: "Why read the questions first?", model: "Questions tell the reader what to hunt. Scanning then targets lines. Hence marks come faster.", keys: ["hunt", "marks"] }
  ], two: [
    { q: "Give two differences: skimming vs scanning.", model: "Skimming seeks the gist; scanning seeks facts.", keys: ["gist", "facts"] },
    { q: "Name two clues for unknown words.", model: "Nearby examples and contrast words.", keys: ["examples", "contrast"] },
    { q: "Name two traits of a good summary.", model: "Own words with no examples.", keys: ["Own words", "no examples"] },
    { q: "Name two steps after the first reading.", model: "Underline answers, then draft.", keys: ["Underline", "draft"] },
    { q: "Name two question types in passages.", model: "Factual and inferential questions.", keys: ["Factual", "inferential"] }
  ], three: [
    { q: "Explain skimming with steps.", model: "Read the title and first lines fast. Note headings and names. Frame the gist in one line.", keys: ["first lines", "headings", "gist"] },
    { q: "Explain scanning with steps.", model: "Read the question and catch keywords. Sweep lines for those words. Read around the hit.", keys: ["keywords", "Sweep", "hit"] },
    { q: "How to infer the author's tone?", model: "Mark adjectives and examples. Positive or critical words reveal the stand. Conclude tone with proof.", keys: ["adjectives", "stand", "proof"] },
    { q: "How to choose the best title?", model: "Cover the whole passage, not one line. Keep it short and central. Test it against each para.", keys: ["whole passage", "short", "para"] },
    { q: "Give the steps of summary writing.", model: "Read twice and list points. Drop examples and quotes. Join in own words within limits.", keys: ["list points", "own words", "limits"] },
    { q: "How to answer vocabulary-in-context?", model: "Replace options in the sentence. Pick the fitting meaning. Note the part of speech.", keys: ["Replace", "meaning", "speech"] },
    { q: "Distinguish fact from opinion in passages.", model: "Facts verify with data. Opinions show feels and shoulds. Mark each line accordingly.", keys: ["verify", "shoulds", "accordingly"] },
    { q: "Assess a time plan for a 10-mark passage.", model: "Skim in two minutes. Answer factual questions first. Infer last with leftover time.", keys: ["Skim", "factual", "leftover"] }
  ], five: [
    { q: "Demonstrate full analysis of a passage (theme, tone, title, summary, words).", model: "Theme: honesty pays. Tone: earnest and hopeful. Title: 'Truth Wins'. Summary: a boy returns cash and gains trust. Words: integrity means wholeness.", keys: ["honesty", "earnest", "integrity"] },
    { q: "Solve a poem-comprehension: stanza meaning, rhyme, figure, message, title.", model: "The stanza means dawn brings hope. Rhyme runs in couplets. Personification appears in the winds. Message: rise and shine. Title: 'Morning'.", keys: ["hope", "Personification", "Morning"] }
  ] });
  MQ("eng", [
    { ch: "wr", q: "A formal letter begins with", opts: ["Dearest friend", "Sender's address and date", "A joke", "Slang greeting"], ans: 1, exp: "Format: address, date, receiver, subject, salutation." },
    { ch: "wr", q: "A news report must answer", opts: ["Only what happened", "Who, what, when, where, why", "Only opinions", "Only dialogues"], ans: 1, exp: "5W news format plus headline." },
    { ch: "wr", q: "An email's subject line should be", opts: ["Left blank", "Short and clear", "A full paragraph", "Decorated"], ans: 1, exp: "Purpose at a glance." },
    { ch: "wr", q: "Dialogue writing needs", opts: ["Only narration", "Turn-taking with speakers' names", "No punctuation", "One speaker"], ans: 1, exp: "New line per speaker." },
    { ch: "wr", q: "A speech begins best with", opts: ["An apology", "A greeting plus striking opening", "A long silence", "Personal complaints"], ans: 1, exp: "Hook the audience first." },
    { ch: "rc", q: "Skimming means", opts: ["Reading every word", "Glancing for the gist", "Memorising lines", "Copying text"], ans: 1, exp: "Quick gist reading." },
    { ch: "rc", q: "The best title of a passage is", opts: ["The longest line", "Short and central", "Always a question", "Unrelated words"], ans: 1, exp: "Covers the whole passage." }
  ]);
})();
