import React, { useState, useMemo, useEffect } from "react";
import {
  Plus, Minus, RotateCcw, ChevronDown, Search, X, Trash2, Waves,
  Settings2, Users, Pencil, Sparkles,
} from "lucide-react";

// ---------- Design tokens ----------
const COLORS = {
  deep: "#0A3532",
  ocean: "#0E4A47",
  oceanLight: "#155B57",
  sand: "#F4EEDD",
  sandDeep: "#E9DFC4",
  coral: "#E0713F",
  coralSoft: "#F1A17E",
  ink: "#132422",
  muted: "#6E8681",
  profit: "#3E8E6E",
  line: "#D8CFB4",
};

// ---------- Catalog (from Quotation Template database) ----------
const CATALOG = [
  {
    id: "dive",
    title: "Snorkeling & Diving",
    items: [
      ["Wonderland 4 Place", 900000], ["Elite 4 Place", 900000], ["Ocean 4 Place", 1200000],
      ["Gili Snorkeling", 1500000], ["Wonderland 3 Place", 800000], ["Elite 3 Place", 850000],
      ["Ocean 3 Place", 900000], ["Wonderland 2 Place", 750000], ["Elite 2 Place", 800000],
      ["Ocean 2 Place", 850000], ["Sharing Snorkeling", 150000], ["No Snorkeling", 0],
      ["Manta Point", 2500000], ["Manta Point Sharing", 300000], ["Maruti 4 Place", 1200000],
      ["Maruti 3 Place Sharing", 100000], ["Turtle Conservation", 100000],
      ["2 Dives Certified", 1500000], ["3 Dives Certified", 2000000], ["4 Dives (1 Day)", 2500000],
      ["6 Dives (2 Days)", 3800000], ["12 Dives (4 Days)", 7200000], ["Scuba Refresher", 200000],
      ["Try Scuba 2 Dive", 1700000], ["Try Scuba 3 Dives", 2200000], ["Pool Session", 500000],
    ],
  },
  {
    id: "resto",
    title: "Resto / Meals",
    items: [
      ["Arjuna Lunch 100", 100000], ["D'MM Lunch 50", 50000], ["Arjuna Lunch 75", 75000],
      ["Funtasea 50", 50000], ["Maruti Lunch 100", 100000], ["Maruti Lunch 75", 75000],
      ["Maruti Lunch Buffet", 150000], ["TA Resto 50", 50000], ["TA Resto Buffet", 100000],
      ["Guide Lunch", 50000], ["The Aura Resto 50", 50000], ["The Aura Resto 100", 100000],
      ["Angle Bilabong 125", 125000], ["Dhaba 50", 50000], ["Dhaba 75", 75000],
      ["Dhaba 100", 100000], ["Dhaba 120", 120000], ["Sorent 50", 50000], ["Sorent 100", 100000],
      ["Khamara 150", 150000], ["Amok 125", 125000], ["Amok 150", 150000], ["Amerta 300", 300000],
      ["Dinner 150", 150000], ["Dinner 250", 250000], ["Lunch 200", 200000], ["No Lunch", 0],
    ],
  },
  {
    id: "inclusion",
    title: "Inclusions & Extras",
    items: [
      ["Snack Box + Mineral", 10000], ["Retribution", 25000], ["Diamond & Atuh", 45000],
      ["Three House", 30000], ["Paluang Cliff", 35000], ["Kelapa Glass", 10000],
      ["Kelapa Whole", 20000], ["Welcome Drink Arjuna 5", 5000], ["Welcome Drink Arjuna 10", 10000],
      ["Welcome Drink Maruti", 20000], ["Accommodation Semabu", 1800000],
      ["Accommodation AWK", 1500000], ["Accommodation MAUA", 2900000], ["Accommodation Gili", 700000],
      ["Guide", 50000], ["Guide Gili", 500000], ["Beer", 50000], ["Pontoon", 50000],
      ["Push Bike", 50000], ["Sunset Drink Gili", 50000],
    ],
  },
  {
    id: "car",
    title: "Car Transport Vendor",
    items: [
      ["West", 450000], ["East", 450000], ["Combination", 550000], ["Extra Car 500", 500000],
      ["Extra Car 350", 350000], ["Extra Car 250", 250000], ["Extra Car 150", 150000],
      ["Extra Car 50", 50000], ["Luggage Car", 200000], ["No Car", 0],
    ],
  },
  {
    id: "transport",
    title: "Transport Bali (Drop-off)",
    items: [
      ["Kuta", 300000], ["Seminyak", 300000], ["Denpasar", 300000], ["Nusa Dua", 350000],
      ["Jimbaran", 350000], ["Uluwatu", 400000], ["Ubud", 400000], ["Canggu", 400000],
      ["No Car", 0],
    ],
  },
  {
    id: "boat",
    title: "Fast Boat Vendor",
    items: [
      ["Maruti Return", 250000], ["Maruti One Way", 110000], ["Rayfish Return", 200000],
      ["Rayfish One Way", 120000], ["Einstein Return", 300000], ["Einstein One Way", 150000],
      ["Axestone Return", 200000], ["Axestone One Way", 100000], ["Eka Jaya Gili", 500000],
      ["Sanjaya Return", 180000], ["Sanjaya One Way", 75000], ["Arjuna Return", 150000],
      ["Arjuna One Way", 75000], ["Gangga Return", 200000], ["Glory Return", 200000],
      ["Boat Guide", 100000],
    ],
  },
  {
    id: "lembongan",
    title: "Lembongan Packages",
    items: [
      ["Package A – Snorkeling & Lembongan Tour", 550000], ["Package B – Sea Adventure", 600000],
      ["Package C – Explore Marine Life", 750000], ["Package D – Diving Experience", 750000],
      ["Snorkeling Safari Private", 700000], ["Snorkeling Safari Sharing", 650000],
      ["Land Tour", 550000],
    ],
  },
].map((cat) => ({
  ...cat,
  items: cat.items.map(([name, price], i) => ({ id: `${cat.id}-${i}`, name, price })),
}));

const CAT_BY_ID = Object.fromEntries(CATALOG.map((c) => [c.id, c]));
const findItem = (catId, name) => CAT_BY_ID[catId]?.items.find((i) => i.name === name);

// Categories where "shared per unit" (capacity-based splitting) makes sense
const SHARED_CAPABLE = ["car", "transport", "boat"];

// Package shortcuts — best-guess starting bundles built from the Data Base
// naming (West/East/Combination car rates + a snorkeling default). These are
// starting points only — edit freely, since the original per-package quote
// tabs (Q_West_Tour_000 etc.) weren't reachable from here.
const PRESETS = [
  { id: "west", label: "West", picks: [["car", "West"], ["dive", "Sharing Snorkeling"]] },
  { id: "east", label: "East", picks: [["car", "East"], ["dive", "Sharing Snorkeling"]] },
  { id: "combi", label: "Combination", picks: [["car", "Combination"], ["dive", "Sharing Snorkeling"]] },
  { id: "snorkel", label: "Snorkeling Only", picks: [["dive", "Sharing Snorkeling"]] },
  { id: "exotic", label: "Exotic", picks: [["car", "Combination"], ["dive", "Manta Point Sharing"]] },
];

const idr = (n) => "Rp" + Math.round(n || 0).toLocaleString("id-ID");

const RULE_LABELS = { flat: "Manual qty", pax: "Per pax", unit: "Shared per unit", tier: "Base + extra pax" };

function computeItemCost(item, cfg, totalPax, weightedPax) {
  if (cfg.override !== "" && cfg.override != null && !isNaN(parseFloat(cfg.override))) {
    return parseFloat(cfg.override);
  }
  if (cfg.mode === "flat") return (cfg.qty || 0) * item.price;
  if (cfg.mode === "pax") return weightedPax * item.price;
  if (cfg.mode === "unit") return Math.ceil(totalPax / Math.max(1, cfg.capacity || 4)) * item.price;
  if (cfg.mode === "tier") {
    return item.price + Math.max(0, totalPax - (cfg.threshold ?? 2)) * (cfg.surcharge || 0);
  }
  return 0;
}

function isSelected(cfg) {
  if (cfg.mode === "flat") return (cfg.qty || 0) > 0;
  return !!cfg.included;
}

function ruleCaption(item, cfg, totalPax) {
  if (cfg.mode === "pax") return `${idr(item.price)} / pax`;
  if (cfg.mode === "unit") {
    const units = Math.ceil(totalPax / Math.max(1, cfg.capacity || 4));
    return `${idr(item.price)} / unit · ${cfg.capacity || 4} pax per unit · ${units} unit${units > 1 ? "s" : ""}`;
  }
  if (cfg.mode === "tier") {
    const extra = Math.max(0, totalPax - (cfg.threshold ?? 2));
    return `${idr(item.price)} base (up to ${cfg.threshold ?? 2} pax)${extra > 0 ? ` + ${extra} × ${idr(cfg.surcharge)}` : ""}`;
  }
  return idr(item.price);
}

export default function CostingSimulator() {
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  const [adults, setAdults] = useState(2);
  const [kids, setKids] = useState(0);
  const [kidsRate, setKidsRate] = useState(50);
  const [bookingType, setBookingType] = useState("private"); // 'private' | 'shared'

  const [itemConfig, setItemConfig] = useState({});
  const [ruleOpen, setRuleOpen] = useState({});
  const [custom, setCustom] = useState([]);
  const [margin, setMargin] = useState(25);
  const [open, setOpen] = useState({ dive: true });
  const [query, setQuery] = useState("");
  const [customForm, setCustomForm] = useState({ name: "", price: "" });

  const totalPax = adults + kids;
  const weightedPax = adults + kids * (kidsRate / 100);

  const defaultConfigFor = (catId) => {
    if (bookingType === "shared" && SHARED_CAPABLE.includes(catId)) {
      return { included: false, mode: "unit", qty: 0, capacity: 4, threshold: 2, surcharge: 50000, override: "" };
    }
    return { included: false, mode: "flat", qty: 0, capacity: 4, threshold: 2, surcharge: 50000, override: "" };
  };

  const getConfig = (id, catId) => itemConfig[id] || defaultConfigFor(catId);
  const updateConfig = (id, catId, patch) =>
    setItemConfig((c) => ({ ...c, [id]: { ...getConfig(id, catId), ...patch } }));

  const setItemQty = (id, catId, val) => {
    const v = Math.max(0, val);
    updateConfig(id, catId, { mode: "flat", qty: v });
  };

  const toggleInclude = (id, catId, cfg) =>
    updateConfig(id, catId, { included: !cfg.included, override: "" });

  const setRuleMode = (id, catId, mode) => {
    if (mode === "off") {
      updateConfig(id, catId, { mode: "flat", qty: 0, included: false, override: "" });
    } else if (mode === "flat") {
      updateConfig(id, catId, { mode: "flat", included: false, override: "" });
    } else {
      updateConfig(id, catId, { mode, included: true, override: "" });
    }
  };

  const toggleRulePanel = (id) => setRuleOpen((r) => ({ ...r, [id]: !r[id] }));

  const applyPreset = (preset) => {
    const next = {};
    const openCats = {};
    preset.picks.forEach(([catId, name]) => {
      const item = findItem(catId, name);
      if (!item) return;
      openCats[catId] = true;
      if (bookingType === "shared" && SHARED_CAPABLE.includes(catId)) {
        next[item.id] = { included: true, mode: "unit", qty: 0, capacity: 4, threshold: 2, surcharge: 50000, override: "" };
      } else {
        next[item.id] = { included: false, mode: "flat", qty: 1, capacity: 4, threshold: 2, surcharge: 50000, override: "" };
      }
    });
    setItemConfig(next);
    setCustom([]);
    setOpen((o) => ({ ...o, ...openCats }));
  };

  const addCustom = () => {
    const price = parseInt(customForm.price.replace(/\D/g, ""), 10);
    if (!customForm.name.trim() || !price) return;
    setCustom((c) => [...c, { id: `custom-${Date.now()}`, name: customForm.name.trim(), price, qty: 1 }]);
    setCustomForm({ name: "", price: "" });
  };

  const removeCustom = (id) => setCustom((c) => c.filter((i) => i.id !== id));
  const setCustomQty = (id, val) =>
    setCustom((c) => c.map((i) => (i.id === id ? { ...i, qty: Math.max(0, val) } : i)));

  const reset = () => {
    setItemConfig({});
    setCustom([]);
    setMargin(25);
    setAdults(2);
    setKids(0);
  };

  const totals = useMemo(() => {
    let cost = 0;
    let lineCount = 0;
    CATALOG.forEach((cat) => {
      cat.items.forEach((item) => {
        const cfg = getConfig(item.id, cat.id);
        if (isSelected(cfg)) {
          cost += computeItemCost(item, cfg, totalPax, weightedPax);
          lineCount++;
        }
      });
    });
    custom.forEach((c) => {
      if (c.qty > 0) {
        cost += c.qty * c.price;
        lineCount++;
      }
    });
    const profit = cost * (margin / 100);
    const price = cost + profit;
    return { cost, profit, price, lineCount };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemConfig, custom, margin, totalPax, weightedPax, bookingType]);

  const filteredCatalog = useMemo(() => {
    if (!query.trim()) return CATALOG;
    const q = query.toLowerCase();
    return CATALOG.map((cat) => ({
      ...cat,
      items: cat.items.filter((i) => i.name.toLowerCase().includes(q)),
    })).filter((cat) => cat.items.length > 0);
  }, [query]);

  const costPct = totals.price > 0 ? (totals.cost / totals.price) * 100 : 100;

  const stepBtn = (bg, color, border) => ({
    width: 26, height: 26, borderRadius: 8, border: border || "none",
    background: bg, color, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
  });

  return (
    <div style={{ background: COLORS.deep, minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none; appearance: none;
          width: 22px; height: 22px; border-radius: 50%;
          background: ${COLORS.coral}; border: 3px solid ${COLORS.sand};
          cursor: pointer; margin-top: -8px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        }
        input[type=range]::-webkit-slider-runnable-track {
          height: 6px; border-radius: 4px; background: ${COLORS.oceanLight};
        }
        input[type=range] { -webkit-appearance: none; appearance: none; background: transparent; }
        .stepper-btn:active { transform: scale(0.92); }
        .accordion-item:hover { background: ${COLORS.sandDeep}; }
        .preset-chip:active { transform: scale(0.95); }
      `}</style>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "20px 16px 100px" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18, paddingTop: 4 }}>
          <Waves size={22} color={COLORS.coral} strokeWidth={2.5} />
          <div>
            <h1 style={{
              fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: 22,
              color: COLORS.sand, margin: 0, letterSpacing: "-0.01em",
            }}>
              Tour Costing Simulator
            </h1>
            <p style={{ color: COLORS.muted, fontSize: 12.5, margin: "2px 0 0" }}>
              Set pax, load a package, adjust your margin
            </p>
          </div>
        </div>

        {/* Package shortcuts */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
            <Sparkles size={13} color={COLORS.coralSoft} />
            <span style={{ fontSize: 12, color: COLORS.muted, fontWeight: 600 }}>
              Quick-start packages (starting points — edit after loading)
            </span>
          </div>
          <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 2 }}>
            {PRESETS.map((p) => (
              <button key={p.id} onClick={() => applyPreset(p)} className="preset-chip" style={{
                flexShrink: 0, padding: "8px 14px", borderRadius: 12, border: "none",
                background: COLORS.sand, color: COLORS.ink, fontSize: 12.5, fontWeight: 700, cursor: "pointer",
                boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
              }}>
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Summary card */}
        <div style={{
          background: COLORS.sand, borderRadius: 18, padding: "18px 18px 16px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.25)", marginBottom: 18,
        }}>
          {/* Pax control */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
            <Users size={15} color={COLORS.ink} />
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 12, color: COLORS.muted, fontWeight: 600 }}>Adults</span>
              <button className="stepper-btn" onClick={() => setAdults((a) => Math.max(1, a - 1))} style={stepBtn(COLORS.deep, COLORS.sand)}><Minus size={12} /></button>
              <span style={{ minWidth: 16, textAlign: "center", fontWeight: 700, color: COLORS.ink }}>{adults}</span>
              <button className="stepper-btn" onClick={() => setAdults((a) => a + 1)} style={stepBtn(COLORS.coral, COLORS.sand)}><Plus size={12} /></button>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 12, color: COLORS.muted, fontWeight: 600 }}>Kids</span>
              <button className="stepper-btn" onClick={() => setKids((k) => Math.max(0, k - 1))} style={stepBtn(COLORS.deep, COLORS.sand)}><Minus size={12} /></button>
              <span style={{ minWidth: 16, textAlign: "center", fontWeight: 700, color: COLORS.ink }}>{kids}</span>
              <button className="stepper-btn" onClick={() => setKids((k) => k + 1)} style={stepBtn(COLORS.coral, COLORS.sand)}><Plus size={12} /></button>
            </div>
            {kids > 0 && (
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <span style={{ fontSize: 12, color: COLORS.muted, fontWeight: 600 }}>Kid rate</span>
                <input
                  type="number" value={kidsRate} min={0} max={100}
                  onChange={(e) => setKidsRate(Math.max(0, Math.min(100, Number(e.target.value))))}
                  style={{ width: 44, padding: "3px 4px", borderRadius: 6, border: `1px solid ${COLORS.line}`, fontSize: 12, textAlign: "center" }}
                />
                <span style={{ fontSize: 12, color: COLORS.muted }}>%</span>
              </div>
            )}
            <span style={{ fontSize: 11.5, color: COLORS.muted, marginLeft: "auto" }}>
              {totalPax} pax total{kids > 0 ? ` (${weightedPax.toFixed(1)} weighted)` : ""}
            </span>
          </div>

          {/* Booking type toggle */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
            <span style={{ fontSize: 12, color: COLORS.muted, fontWeight: 600 }}>Car / boat / transport counts as</span>
            <div style={{ display: "flex", borderRadius: 10, overflow: "hidden", border: `1px solid ${COLORS.line}` }}>
              <button onClick={() => setBookingType("private")} style={{
                padding: "5px 10px", fontSize: 12, fontWeight: 600, border: "none", cursor: "pointer",
                background: bookingType === "private" ? COLORS.coral : "transparent",
                color: bookingType === "private" ? COLORS.sand : COLORS.ink,
              }}>
                1 group (manual)
              </button>
              <button onClick={() => setBookingType("shared")} style={{
                padding: "5px 10px", fontSize: 12, fontWeight: 600, border: "none", cursor: "pointer",
                background: bookingType === "shared" ? COLORS.coral : "transparent",
                color: bookingType === "shared" ? COLORS.sand : COLORS.ink,
              }}>
                Shared per unit (auto-split by pax)
              </button>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 11, color: COLORS.muted, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                Sell price
              </div>
              <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: 34, color: COLORS.ink, lineHeight: 1.1 }}>
                {idr(totals.price)}
              </div>
            </div>
            <button onClick={reset} className="stepper-btn" style={{
              display: "flex", alignItems: "center", gap: 5, background: "none",
              border: `1px solid ${COLORS.line}`, borderRadius: 10, padding: "6px 10px",
              color: COLORS.muted, fontSize: 12, fontWeight: 600, cursor: "pointer",
            }}>
              <RotateCcw size={13} /> Reset
            </button>
          </div>

          {/* cost vs profit bar */}
          <div style={{ height: 10, borderRadius: 6, overflow: "hidden", display: "flex", marginBottom: 8 }}>
            <div style={{ width: `${costPct}%`, background: COLORS.ocean, transition: "width 0.2s" }} />
            <div style={{ width: `${100 - costPct}%`, background: COLORS.profit, transition: "width 0.2s" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, color: COLORS.ink, marginBottom: 16 }}>
            <span><span style={{ display: "inline-block", width: 8, height: 8, borderRadius: 4, background: COLORS.ocean, marginRight: 5 }} />
              Cost {idr(totals.cost)}</span>
            <span><span style={{ display: "inline-block", width: 8, height: 8, borderRadius: 4, background: COLORS.profit, marginRight: 5 }} />
              Profit {idr(totals.profit)}</span>
          </div>

          <div style={{ borderTop: `1px solid ${COLORS.line}`, paddingTop: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <label style={{ fontSize: 12.5, fontWeight: 600, color: COLORS.ink }}>Profit margin</label>
              <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: 18, color: COLORS.coral }}>{margin}%</span>
            </div>
            <input
              type="range" min={0} max={100} value={margin}
              onChange={(e) => setMargin(Number(e.target.value))}
              style={{ width: "100%", display: "block" }}
            />
            <div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap" }}>
              {[10, 15, 20, 25, 30, 40, 50].map((m) => (
                <button key={m} onClick={() => setMargin(m)} className="stepper-btn" style={{
                  padding: "5px 11px", borderRadius: 20, fontSize: 12, fontWeight: 600,
                  border: `1px solid ${margin === m ? COLORS.coral : COLORS.line}`,
                  background: margin === m ? COLORS.coral : "transparent",
                  color: margin === m ? COLORS.sand : COLORS.muted, cursor: "pointer",
                }}>
                  {m}%
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Search */}
        <div style={{ position: "relative", marginBottom: 14 }}>
          <Search size={15} color={COLORS.muted} style={{ position: "absolute", left: 12, top: 11 }} />
          <input
            value={query} onChange={(e) => setQuery(e.target.value)}
            placeholder="Search items across all categories…"
            style={{
              width: "100%", padding: "10px 12px 10px 34px", borderRadius: 12,
              border: `1px solid ${COLORS.oceanLight}`, background: COLORS.ocean,
              color: COLORS.sand, fontSize: 13.5, outline: "none", boxSizing: "border-box",
            }}
          />
        </div>

        {/* Categories */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {filteredCatalog.map((cat) => {
            const selectedInCat = cat.items.filter((i) => isSelected(getConfig(i.id, cat.id)));
            const catCost = selectedInCat.reduce(
              (s, i) => s + computeItemCost(i, getConfig(i.id, cat.id), totalPax, weightedPax), 0
            );
            const isOpen = open[cat.id] || query.trim().length > 0;
            return (
              <div key={cat.id} style={{ background: COLORS.oceanLight, borderRadius: 14, overflow: "hidden" }}>
                <button
                  onClick={() => setOpen((o) => ({ ...o, [cat.id]: !o[cat.id] }))}
                  className="accordion-item"
                  style={{
                    width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "13px 15px", background: "none", border: "none", cursor: "pointer",
                  }}
                >
                  <div style={{ textAlign: "left" }}>
                    <div style={{ color: COLORS.sand, fontWeight: 600, fontSize: 14 }}>{cat.title}</div>
                    {selectedInCat.length > 0 && (
                      <div style={{ color: COLORS.coralSoft, fontSize: 11.5, marginTop: 1 }}>
                        {selectedInCat.length} selected · {idr(catCost)}
                      </div>
                    )}
                  </div>
                  <ChevronDown size={17} color={COLORS.sand}
                    style={{ transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.15s" }} />
                </button>
                {isOpen && (
                  <div style={{ background: COLORS.sand }}>
                    {cat.items.map((item) => {
                      const cfg = getConfig(item.id, cat.id);
                      const selected = isSelected(cfg);
                      const panelOpen = !!ruleOpen[item.id];
                      const itemTotal = computeItemCost(item, cfg, totalPax, weightedPax);
                      const overridden = cfg.override !== "" && cfg.override != null && !isNaN(parseFloat(cfg.override));
                      return (
                        <div key={item.id} style={{ borderTop: `1px solid ${COLORS.line}` }}>
                          <div style={{
                            display: "flex", justifyContent: "space-between", alignItems: "center",
                            padding: "10px 15px",
                          }}>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                <span style={{ fontSize: 13, color: COLORS.ink, fontWeight: 500 }}>{item.name}</span>
                                <button
                                  className="stepper-btn"
                                  onClick={() => toggleRulePanel(item.id)}
                                  title="Pricing rule"
                                  style={{
                                    background: "none", border: "none", cursor: "pointer", padding: 2,
                                    color: cfg.mode !== "flat" ? COLORS.coral : COLORS.muted,
                                    display: "flex",
                                  }}
                                >
                                  <Settings2 size={13} />
                                </button>
                              </div>
                              <div style={{ fontSize: 11.5, color: COLORS.muted }}>
                                {selected ? ruleCaption(item, cfg, totalPax) : idr(item.price)}
                                {overridden && <span style={{ color: COLORS.coral, fontWeight: 600 }}> · edited</span>}
                              </div>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                              {cfg.mode === "flat" ? (
                                <>
                                  <button className="stepper-btn" onClick={() => setItemQty(item.id, cat.id, (cfg.qty || 0) - 1)}
                                    disabled={(cfg.qty || 0) === 0}
                                    style={stepBtn((cfg.qty || 0) === 0 ? "transparent" : COLORS.deep, (cfg.qty || 0) === 0 ? COLORS.muted : COLORS.sand, `1px solid ${COLORS.line}`)}>
                                    <Minus size={12} />
                                  </button>
                                  <span style={{ minWidth: 16, textAlign: "center", fontSize: 13.5, fontWeight: 600, color: COLORS.ink }}>{cfg.qty || 0}</span>
                                  <button className="stepper-btn" onClick={() => setItemQty(item.id, cat.id, (cfg.qty || 0) + 1)}
                                    style={stepBtn(COLORS.coral, COLORS.sand)}>
                                    <Plus size={12} />
                                  </button>
                                </>
                              ) : cfg.included ? (
                                <>
                                  <span style={{ fontSize: 13, fontWeight: 700, color: COLORS.profit }}>{idr(itemTotal)}</span>
                                  <button className="stepper-btn" onClick={() => toggleInclude(item.id, cat.id, cfg)}
                                    style={stepBtn("transparent", COLORS.coral, `1px solid ${COLORS.line}`)}>
                                    <X size={12} />
                                  </button>
                                </>
                              ) : (
                                <button className="stepper-btn" onClick={() => toggleInclude(item.id, cat.id, cfg)}
                                  style={stepBtn(COLORS.coral, COLORS.sand)}>
                                  <Plus size={12} />
                                </button>
                              )}
                            </div>
                          </div>

                          {panelOpen && (
                            <div style={{ background: COLORS.sandDeep, padding: "10px 15px 12px", fontSize: 12 }}>
                              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 8 }}>
                                {["flat", "pax", "unit", "tier"].map((m) => (
                                  <button key={m} onClick={() => setRuleMode(item.id, cat.id, m)} className="stepper-btn"
                                    style={{
                                      padding: "5px 9px", borderRadius: 8, fontSize: 11.5, fontWeight: 600,
                                      border: `1px solid ${cfg.mode === m ? COLORS.coral : COLORS.line}`,
                                      background: cfg.mode === m ? COLORS.coral : "transparent",
                                      color: cfg.mode === m ? COLORS.sand : COLORS.ink, cursor: "pointer",
                                    }}>
                                    {RULE_LABELS[m]}
                                  </button>
                                ))}
                              </div>

                              {cfg.mode === "unit" && (
                                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8, flexWrap: "wrap" }}>
                                  <span style={{ color: COLORS.muted }}>Pax per unit:</span>
                                  <input type="number" min={1} value={cfg.capacity}
                                    onChange={(e) => updateConfig(item.id, cat.id, { capacity: Math.max(1, Number(e.target.value)) })}
                                    style={{ width: 48, padding: "3px 5px", borderRadius: 6, border: `1px solid ${COLORS.line}`, textAlign: "center" }} />
                                  <span style={{ color: COLORS.muted }}>(e.g. 4 pax share 1 car → forces extra units above capacity)</span>
                                </div>
                              )}

                              {cfg.mode === "tier" && (
                                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8, flexWrap: "wrap" }}>
                                  <span style={{ color: COLORS.muted }}>Included up to</span>
                                  <input type="number" min={0} value={cfg.threshold}
                                    onChange={(e) => updateConfig(item.id, cat.id, { threshold: Math.max(0, Number(e.target.value)) })}
                                    style={{ width: 40, padding: "3px 5px", borderRadius: 6, border: `1px solid ${COLORS.line}`, textAlign: "center" }} />
                                  <span style={{ color: COLORS.muted }}>pax, then +</span>
                                  <input type="number" min={0} value={cfg.surcharge}
                                    onChange={(e) => updateConfig(item.id, cat.id, { surcharge: Math.max(0, Number(e.target.value)) })}
                                    style={{ width: 66, padding: "3px 5px", borderRadius: 6, border: `1px solid ${COLORS.line}`, textAlign: "center" }} />
                                  <span style={{ color: COLORS.muted }}>/ extra pax</span>
                                </div>
                              )}

                              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                <Pencil size={12} color={COLORS.muted} />
                                <span style={{ color: COLORS.muted }}>Override total:</span>
                                <input
                                  value={cfg.override}
                                  placeholder={idr(computeItemCost(item, { ...cfg, override: "" }, totalPax, weightedPax))}
                                  onChange={(e) => updateConfig(item.id, cat.id, { override: e.target.value.replace(/[^0-9]/g, "") })}
                                  inputMode="numeric"
                                  style={{ width: 110, padding: "3px 6px", borderRadius: 6, border: `1px solid ${COLORS.line}` }}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Custom items */}
        <div style={{ background: COLORS.oceanLight, borderRadius: 14, padding: 15, marginTop: 10 }}>
          <div style={{ color: COLORS.sand, fontWeight: 600, fontSize: 14, marginBottom: 10 }}>Custom item</div>
          {custom.map((c) => (
            <div key={c.id} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              background: COLORS.sand, borderRadius: 10, padding: "9px 12px", marginBottom: 8,
            }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, color: COLORS.ink, fontWeight: 500 }}>{c.name}</div>
                <div style={{ fontSize: 12, color: COLORS.muted }}>{idr(c.price)} × {c.qty}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <button className="stepper-btn" onClick={() => setCustomQty(c.id, c.qty - 1)}
                  style={stepBtn(COLORS.deep, COLORS.sand)}>
                  <Minus size={11} />
                </button>
                <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.ink, minWidth: 14, textAlign: "center" }}>{c.qty}</span>
                <button className="stepper-btn" onClick={() => setCustomQty(c.id, c.qty + 1)}
                  style={stepBtn(COLORS.coral, COLORS.sand)}>
                  <Plus size={11} />
                </button>
                <button className="stepper-btn" onClick={() => removeCustom(c.id)}
                  style={stepBtn("transparent", COLORS.coralSoft)}>
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
          <div style={{ display: "flex", gap: 8 }}>
            <input
              value={customForm.name}
              onChange={(e) => setCustomForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="Item name"
              style={{
                flex: 1, minWidth: 0, padding: "9px 10px", borderRadius: 9, border: `1px solid ${COLORS.line}`,
                fontSize: 13, outline: "none", background: COLORS.sand, color: COLORS.ink,
              }}
            />
            <input
              value={customForm.price}
              onChange={(e) => setCustomForm((f) => ({ ...f, price: e.target.value }))}
              placeholder="Price"
              inputMode="numeric"
              style={{
                width: 100, padding: "9px 10px", borderRadius: 9, border: `1px solid ${COLORS.line}`,
                fontSize: 13, outline: "none", background: COLORS.sand, color: COLORS.ink,
              }}
            />
            <button onClick={addCustom} className="stepper-btn" style={{
              width: 38, borderRadius: 9, border: "none", background: COLORS.coral, color: COLORS.sand,
              display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0,
            }}>
              <Plus size={16} />
            </button>
          </div>
        </div>

        {totals.lineCount === 0 && (
          <p style={{ textAlign: "center", color: COLORS.muted, fontSize: 12.5, marginTop: 20 }}>
            Load a package above, or pick items category by category. Tap ⚙ on any item for a per-pax, shared-unit, or tiered rule.
          </p>
        )}
      </div>
    </div>
  );
}
