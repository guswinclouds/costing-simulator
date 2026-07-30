const [isAdmin, setIsAdmin] = useState(false);
const [catalog, setCatalog] = useState(() => {
  const saved = localStorage.getItem('custom_catalog');
  return saved ? JSON.parse(saved) : DEFAULT_CATALOG;
});

import React, { useState, useMemo, useEffect } from "react";
import {
  Plus,
  Minus,
  RotateCcw,
  ChevronDown,
  Search,
  X,
  Trash2,
  Waves,
  Settings2,
  Users,
  Pencil,
  Sparkles,
  Calendar,
  Copy,
  Check,
  List,
  Bot,
  BookmarkPlus,
  Edit2,
  MessageSquare,
  FileText,
  Clock,
  Send,
  FolderPlus,
  Layers,
  RefreshCw,
} from "lucide-react";

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

const CATALOG = [
  {
    id: "dive",
    title: "Snorkeling & Diving",
    items: [
      ["Wonderland 4 Place", 1200000],
      ["Elite 4 Place", 900000],
      ["Ocean 4 Place", 1200000],
      ["Gili Snorkeling", 1500000],
      ["Wonderland 3 Place", 800000],
      ["Elite 3 Place", 850000],
      ["Ocean 3 Place", 900000],
      ["Wonderland 2 Place", 750000],
      ["Elite 2 Place", 800000],
      ["Ocean 2 Place", 850000],
      ["Sharing Snorkeling", 150000],
      ["No Snorkeling", 0],
      ["Manta Point", 2500000],
      ["Manta Point Sharing", 300000],
      ["Maruti 4 Place", 1200000],
      ["Maruti 3 Place Sharing", 100000],
      ["Turtle Conservation", 100000],
      ["2 Dives Certified", 1500000],
      ["3 Dives Certified", 2000000],
      ["4 Dives (1 Day)", 2500000],
      ["6 Dives (2 Days)", 3800000],
      ["12 Dives (4 Days)", 7200000],
      ["Scuba Refresher", 200000],
      ["Try Scuba 2 Dive", 1700000],
      ["Try Scuba 3 Dives", 2200000],
      ["Pool Session", 500000],
    ],
  },
  {
    id: "resto",
    title: "Resto / Meals",
    items: [
      ["Arjuna Lunch 100", 100000],
      ["D'MM Lunch 50", 50000],
      ["Arjuna Lunch 75", 75000],
      ["Funtasea 50", 50000],
      ["Maruti Lunch 100", 100000],
      ["Maruti Lunch 75", 75000],
      ["Maruti Lunch Buffet", 150000],
      ["TA Resto 50", 50000],
      ["TA Resto Buffet", 100000],
      ["Guide Lunch", 50000],
      ["The Aura Resto 50", 50000],
      ["The Aura Resto 100", 100000],
      ["Angle Bilabong 125", 125000],
      ["Dhaba 50", 50000],
      ["Dhaba 75", 75000],
      ["Dhaba 100", 100000],
      ["Dhaba 120", 120000],
      ["Sorent 50", 50000],
      ["Sorent 100", 100000],
      ["Khamara 150", 150000],
      ["Amok 125", 125000],
      ["Amok 150", 150000],
      ["Amerta 300", 300000],
      ["Dinner 150", 150000],
      ["Dinner 250", 250000],
      ["Lunch 200", 200000],
      ["No Lunch", 0],
    ],
  },
  {
    id: "inclusion",
    title: "Inclusions & Extras",
    items: [
      ["Snack Box + Mineral", 10000],
      ["Retribution", 25000],
      ["Diamond & Atuh", 60000],
      ["Three House", 30000],
      ["Paluang Cliff", 35000],
      ["Kelapa Glass", 10000],
      ["Kelapa Whole", 20000],
      ["Welcome Drink Arjuna 5", 5000],
      ["Welcome Drink Arjuna 10", 10000],
      ["Welcome Drink Maruti", 20000],
      ["Guide", 50000],
      ["Guide Gili", 500000],
      ["Beer", 50000],
      ["Pontoon", 50000],
      ["Push Bike", 50000],
      ["Sunset Drink Gili", 50000],
    ],
  },
  {
    id: "hotel",
    title: "Accommodation & Hotels",
    items: [
      ["Accommodation Semabu", 1800000],
      ["Accommodation AWK", 1500000],
      ["Accommodation MAUA", 2900000],
      ["Accommodation Gili", 700000],
    ],
  },
  {
    id: "car",
    title: "Car Transport Vendor",
    items: [
      ["West", 450000],
      ["East", 450000],
      ["Combination", 550000],
      ["Extra Car 500", 500000],
      ["Extra Car 350", 350000],
      ["Extra Car 250", 250000],
      ["Extra Car 150", 150000],
      ["Extra Car 50", 50000],
      ["Luggage Car", 200000],
      ["No Car", 0],
    ],
  },
  {
    id: "transport",
    title: "Transport Bali (Drop-off)",
    items: [
      ["Kuta", 300000],
      ["Seminyak", 300000],
      ["Denpasar", 300000],
      ["Nusa Dua", 350000],
      ["Jimbaran", 350000],
      ["Uluwatu", 400000],
      ["Ubud", 400000],
      ["Canggu", 400000],
      ["No Car", 0],
    ],
  },
  {
    id: "boat",
    title: "Fast Boat Vendor",
    items: [
      ["Maruti Return", 250000],
      ["Maruti One Way", 110000],
      ["Rayfish Return", 200000],
      ["Rayfish One Way", 120000],
      ["Einstein Return", 300000],
      ["Einstein One Way", 150000],
      ["Axestone Return", 200000],
      ["Axestone One Way", 100000],
      ["Eka Jaya Gili", 500000],
      ["Sanjaya Return", 180000],
      ["Sanjaya One Way", 75000],
      ["Arjuna Return", 150000],
      ["Arjuna One Way", 75000],
      ["Gangga Return", 200000],
      ["Glory Return", 200000],
      ["Boat Guide", 100000],
    ],
  },
  {
    id: "lembongan",
    title: "Lembongan Packages",
    items: [
      ["Package A – Snorkeling & Lembongan Tour", 550000],
      ["Package B – Sea Adventure", 600000],
      ["Package C – Explore Marine Life", 750000],
      ["Package D – Diving Experience", 750000],
      ["Snorkeling Safari Private", 700000],
      ["Snorkeling Safari Sharing", 650000],
      ["Land Tour", 550000],
    ],
  },
].map((cat) => ({
  ...cat,
  items: cat.items.map(([name, price], i) => ({ id: `${cat.id}-${i}`, name, price })),
}));

const CAT_BY_ID = Object.fromEntries(CATALOG.map((c) => [c.id, c]));
const findItem = (catId, name) => CAT_BY_ID[catId]?.items.find((i) => i.name === name);

function getAutoRuleForItem(catId, itemName = "") {
  const lower = itemName.toLowerCase();
  if (catId === "boat" || catId === "resto" || catId === "inclusion") {
    return { mode: "pax", capacity: 1, threshold: 0, surcharge: 0 };
  }
  if (catId === "hotel") {
    return { mode: "unit", capacity: 2, threshold: 0, surcharge: 0 };
  }
  if (catId === "car") {
    return { mode: "unit", capacity: 4, threshold: 0, surcharge: 0 };
  }
  if (catId === "dive") {
    if (lower.includes("sharing") || lower.includes("certified") || lower.includes("dive")) {
      return { mode: "pax", capacity: 1, threshold: 0, surcharge: 0 };
    }
    return { mode: "unit", capacity: 4, threshold: 0, surcharge: 0 };
  }
  return { mode: "flat", capacity: 4, threshold: 2, surcharge: 50000 };
}

const DEFAULT_PRESETS = [
  {
    id: "west",
    label: "West Package",
    picks: [
      ["car", "West"],
      ["boat", "Maruti Return"],,
      ["resto", "TA Resto 50"],
      ["inclusion", "Retribution"],
      ["inclusion", "Snack Box + Mineral"],
    ],
  },
  {
    id: "east",
    label: "East Package",
    picks: [
      ["car", "East"],
      ["boat", "Maruti Return"],
      ["resto", "Sorent 50"],
      ["inclusion", "Diamond & Atuh"],
      {"Inclusion": "Three House"},
      ["inclusion", "Retribution"],
      ["inclusion", "Snack Box + Mineral"],
    ],
  },
  {
    id: "combi",
    label: "Combination Package",
    picks: [
      ["car", "Combination"],
      ["inclusion", "Diamond & Atuh"],
      ["boat", "Maruti Return"],
      ["resto", "Sorent 50"],
      ["inclusion", "Retribution"],
      ["inclusion", "Snack Box + Mineral"],
    ],
  },
  {
    id: "snorkel",
    label: "Snorkeling Only",
    picks: [
      ["boat", "Maruti Return"],
      ["dive", "Ocean 4 Place"],
      ["resto", "TA Resto 50"],
      ["inclusion", "Snack Box + Mineral"],
    ],
  },
  {
    id: "exotic",
    label: "Exotic Package",
    picks: [
      ["car", "Combination"],
      ["boat", "Rayfish Return"],
      ["dive", "Ocean 4 Places"],
      ["resto", "TA Resto 50"],
      ["inclusion", "Retribution"],
      ["inclusion", "Snack Box + Mineral"],
    ],
  },
];

const idr = (n) => "Rp" + Math.round(n || 0).toLocaleString("id-ID");

const RULE_LABELS = {
  flat: "Manual qty",
  pax: "Per pax",
  unit: "Shared per unit",
  tier: "Base + extra pax",
};

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
    return `${idr(item.price)} / unit · ${cfg.capacity || 4} pax / unit · ${units} unit${units > 1 ? "s" : ""}`;
  }
  if (cfg.mode === "tier") {
    const extra = Math.max(0, totalPax - (cfg.threshold ?? 2));
    return `${idr(item.price)} base (${cfg.threshold ?? 2} pax max) + ${extra} × ${idr(cfg.surcharge)}`;
  }
  return idr(item.price);
}

function buildPresetConfig(picks) {
  const nextConfig = {};
  picks.forEach(([catId, name]) => {
    const item = findItem(catId, name);
    if (!item) return;
    const auto = getAutoRuleForItem(catId, item.name);
    if (auto.mode === "pax") {
      nextConfig[item.id] = {
        included: true,
        mode: "pax",
        qty: 0,
        capacity: auto.capacity,
        threshold: auto.threshold,
        surcharge: auto.surcharge,
        override: "",
      };
    } else if (auto.mode === "unit") {
      nextConfig[item.id] = {
        included: true,
        mode: "unit",
        qty: 0,
        capacity: auto.capacity,
        threshold: auto.threshold,
        surcharge: auto.surcharge,
        override: "",
      };
    } else {
      nextConfig[item.id] = {
        included: true,
        mode: "flat",
        qty: 1,
        capacity: auto.capacity,
        threshold: auto.threshold,
        surcharge: auto.surcharge,
        override: "",
      };
    }
  });
  return nextConfig;
}

export default function App() {
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  const createDefaultQuoteSession = (idNumber = 1, titleOverride = null) => ({
    id: `quote-${Date.now()}-${idNumber}`,
    title: titleOverride || `Quote #${idNumber}`,
    adults: 0,
    kids: 0,
    kidsRate: 65,
    margin: 25,
    days: [
      {
        id: `day-${Date.now()}-1`,
        title: "Day 1",
        presetName: "",
        itemConfig: buildPresetConfig(DEFAULT_PRESETS[0].picks),
        custom: [],
      },
    ],
    activeDayIndex: 0,
    aiItinerary: "",
    aiPitch: "",
    customQuoteText: undefined,
  });

  const [quotes, setQuotes] = useState([createDefaultQuoteSession(1, "Quote #1")]);
  const [activeQuoteIndex, setActiveQuoteIndex] = useState(0);

  const [presets, setPresets] = useState(DEFAULT_PRESETS);
  const [open, setOpen] = useState({ dive: true, car: true });
  const [query, setQuery] = useState("");
  const [ruleOpen, setRuleOpen] = useState({});
  const [copied, setCopied] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(true);

  const [customForm, setCustomForm] = useState({ name: "", price: "" });
  const [editingPreset, setEditingPreset] = useState(null);

  const [activeTab, setActiveTab] = useState("quote");
  const [aiLoading, setAiLoading] = useState(false);

  const currentQuote = quotes[activeQuoteIndex] || quotes[0];

  const updateCurrentQuote = (patch) => {
    setQuotes((prev) =>
      prev.map((q, i) => (i === activeQuoteIndex ? { ...q, ...patch } : q))
    );
  };

  const adults = currentQuote.adults;
  const setAdults = (val) =>
    updateCurrentQuote({
      adults: typeof val === "function" ? val(currentQuote.adults) : val,
    });

  const kids = currentQuote.kids;
  const setKids = (val) =>
    updateCurrentQuote({
      kids: typeof val === "function" ? val(currentQuote.kids) : val,
    });

  const kidsRate = currentQuote.kidsRate;
  const setKidsRate = (val) => updateCurrentQuote({ kidsRate: val });

  const margin = currentQuote.margin;
  const setMargin = (val) => updateCurrentQuote({ margin: val });

  const days = currentQuote.days;
  const setDays = (val) =>
    updateCurrentQuote({
      days: typeof val === "function" ? val(currentQuote.days) : val,
    });

  const activeDayIndex = currentQuote.activeDayIndex || 0;
  const setActiveDayIndex = (idx) => updateCurrentQuote({ activeDayIndex: idx });

  const aiItinerary = currentQuote.aiItinerary;
  const setAiItinerary = (val) => updateCurrentQuote({ aiItinerary: val });

  const aiPitch = currentQuote.aiPitch;
  const setAiPitch = (val) => updateCurrentQuote({ aiPitch: val });

  const activeDay = days[activeDayIndex] || days[0];

  const totalPax = adults + kids;
  const weightedPax = adults + kids * (kidsRate / 100);

  const addNewQuote = () => {
    const nextNum = quotes.length + 1;
    const newQ = createDefaultQuoteSession(nextNum, `Quote #${nextNum}`);
    setQuotes((prev) => [...prev, newQ]);
    setActiveQuoteIndex(quotes.length);
  };

  const duplicateCurrentQuote = () => {
    const duplicated = JSON.parse(JSON.stringify(currentQuote));
    duplicated.id = `quote-${Date.now()}`;
    duplicated.title = `${currentQuote.title} (Copy)`;
    setQuotes((prev) => [...prev, duplicated]);
    setActiveQuoteIndex(quotes.length);
  };

  const removeQuoteSession = (index, e) => {
    if (e) e.stopPropagation();
    if (quotes.length <= 1) return;
    setQuotes((prev) => prev.filter((_, i) => i !== index));
    setActiveQuoteIndex((prev) => Math.max(0, prev - 1));
  };

  const defaultConfigFor = (catId, itemName = "") => {
    const auto = getAutoRuleForItem(catId, itemName);
    return {
      included: false,
      mode: auto.mode,
      qty: 0,
      capacity: auto.capacity,
      threshold: auto.threshold,
      surcharge: auto.surcharge,
      override: "",
    };
  };

  const getConfig = (id, catId, itemName = "") =>
    activeDay?.itemConfig?.[id] || defaultConfigFor(catId, itemName);

  const updateActiveDayConfig = (id, catId, itemName, patch) => {
    setDays((prev) =>
      prev.map((d, i) => {
        if (i !== activeDayIndex) return d;
        const currentCfg = d.itemConfig[id] || defaultConfigFor(catId, itemName);
        return {
          ...d,
          itemConfig: { ...d.itemConfig, [id]: { ...currentCfg, ...patch } },
        };
      })
    );
  };

  const setItemQty = (id, catId, itemName, val) => {
    const v = Math.max(0, val);
    updateActiveDayConfig(id, catId, itemName, { mode: "flat", qty: v });
  };

  const toggleInclude = (id, catId, itemName, cfg) => {
    updateActiveDayConfig(id, catId, itemName, {
      included: !cfg.included,
      override: "",
    });
  };

  const setRuleMode = (id, catId, itemName, mode) => {
    if (mode === "off") {
      updateActiveDayConfig(id, catId, itemName, {
        mode: "flat",
        qty: 0,
        included: false,
        override: "",
      });
    } else if (mode === "flat") {
      updateActiveDayConfig(id, catId, itemName, {
        mode: "flat",
        included: false,
        override: "",
      });
    } else {
      updateActiveDayConfig(id, catId, itemName, {
        mode,
        included: true,
        override: "",
      });
    }
  };

  const toggleRulePanel = (id) => setRuleOpen((r) => ({ ...r, [id]: !r[id] }));

  const applyPresetToDay = (dayIdx, preset) => {
    const nextConfig = buildPresetConfig(preset.picks);
    setDays((prev) =>
      prev.map((d, i) =>
        i === dayIdx
          ? { ...d, presetName: preset.label, itemConfig: nextConfig }
          : d
      )
    );
  };

  const deletePreset = (presetId, e) => {
    if (e) e.stopPropagation();
    setPresets((prev) => prev.filter((p) => p.id !== presetId));
    if (editingPreset?.id === presetId) {
      setEditingPreset(null);
    }
  };

  const restoreDefaultPresets = () => {
    setPresets(DEFAULT_PRESETS);
  };

  const addNewDay = (preset = null) => {
    const nextIndex = days.length + 1;
    const chosenPreset = preset || presets[0];
    const newDayObj = {
      id: `day-${Date.now()}`,
      title: `Day ${nextIndex}`,
      presetName: chosenPreset.label,
      itemConfig: buildPresetConfig(chosenPreset.picks),
      custom: [],
    };
    setDays((prev) => [...prev, newDayObj]);
    setActiveDayIndex(days.length);
  };

  const removeDay = (index, e) => {
    if (e) e.stopPropagation();
    if (days.length <= 1) return;
    setDays((prev) => prev.filter((_, i) => i !== index));
    setActiveDayIndex((prev) => Math.max(0, prev - 1));
  };

  const updateDayTitle = (title) => {
    setDays((prev) =>
      prev.map((d, i) => (i === activeDayIndex ? { ...d, title } : d))
    );
  };

  const addCustomToActiveDay = () => {
    const price = parseInt(customForm.price.replace(/\D/g, ""), 10);
    if (!customForm.name.trim() || !price) return;
    const newItem = {
      id: `custom-${Date.now()}`,
      name: customForm.name.trim(),
      price,
      qty: 1,
    };
    setDays((prev) =>
      prev.map((d, i) =>
        i === activeDayIndex ? { ...d, custom: [...d.custom, newItem] } : d
      )
    );
    setCustomForm({ name: "", price: "" });
  };

  const removeCustomFromDay = (dayIdx, id) => {
    setDays((prev) =>
      prev.map((d, i) =>
        i === dayIdx ? { ...d, custom: d.custom.filter((c) => c.id !== id) } : d
      )
    );
  };

  const removeItemFromDay = (dayIdx, itemObj) => {
    if (itemObj.isCustom) {
      removeCustomFromDay(dayIdx, itemObj.item.id);
    } else {
      setDays((prev) =>
        prev.map((d, i) => {
          if (i !== dayIdx) return d;
          return {
            ...d,
            itemConfig: {
              ...d.itemConfig,
              [itemObj.item.id]: {
                ...(d.itemConfig[itemObj.item.id] || {}),
                included: false,
                qty: 0,
                override: "",
              },
            },
          };
        })
      );
    }
  };

  const setCustomQtyInDay = (dayIdx, id, val) => {
    setDays((prev) =>
      prev.map((d, i) => {
        if (i !== dayIdx) return d;
        return {
          ...d,
          custom: d.custom.map((c) =>
            c.id === id ? { ...c, qty: Math.max(0, val) } : c
          ),
        };
      })
    );
  };

  const openPresetEditor = (preset, e) => {
    if (e) e.stopPropagation();
    setEditingPreset({
      ...preset,
      picksMap: Object.fromEntries(
        preset.picks.map(([cat, name]) => [`${cat}:::${name}`, true])
      ),
    });
  };

  const togglePresetPick = (catId, name) => {
    setEditingPreset((prev) => {
      if (!prev) return null;
      const key = `${catId}:::${name}`;
      const nextMap = { ...prev.picksMap };
      if (nextMap[key]) {
        delete nextMap[key];
      } else {
        nextMap[key] = true;
      }
      return { ...prev, picksMap: nextMap };
    });
  };

  const saveEditedPreset = () => {
    if (!editingPreset) return;
    const newPicks = Object.keys(editingPreset.picksMap).map((k) =>
      k.split(":::")
    );
    const updated = {
      id: editingPreset.id,
      label: editingPreset.label,
      picks: newPicks,
    };

    setPresets((prev) =>
      prev.map((p) => (p.id === editingPreset.id ? updated : p))
    );
    setEditingPreset(null);
  };

  const saveCurrentDayAsPreset = () => {
    const activePicks = [];
    CATALOG.forEach((cat) => {
      cat.items.forEach((item) => {
        const cfg = getConfig(item.id, cat.id, item.name);
        if (isSelected(cfg)) {
          activePicks.push([cat.id, item.name]);
        }
      });
    });

    const newPreset = {
      id: `preset-${Date.now()}`,
      label: `${activeDay.title} Custom`,
      picks: activePicks,
    };
    setPresets((prev) => [...prev, newPreset]);
  };

  const resetAll = () => {
    const defaultPicks = buildPresetConfig(DEFAULT_PRESETS[0].picks);
    updateCurrentQuote({
      days: [
        {
          id: `day-${Date.now()}`,
          title: "Day 1",
          presetName: "West Package",
          itemConfig: defaultPicks,
          custom: [],
        },
      ],
      activeDayIndex: 0,
      margin: 25,
      adults: 2,
      kids: 0,
      kidsRate: 65,
      aiItinerary: "",
      aiPitch: "",
      customQuoteText: undefined,
    });
    setQuery("");
  };

  const totals = useMemo(() => {
    let grandCost = 0;
    let totalLineCount = 0;
    const dayBreakdowns = days.map((day) => {
      let dayCost = 0;
      const selectedItems = [];

      CATALOG.forEach((cat) => {
        cat.items.forEach((item) => {
          const cfg =
            day.itemConfig?.[item.id] || defaultConfigFor(cat.id, item.name);
          if (isSelected(cfg)) {
            const cost = computeItemCost(item, cfg, totalPax, weightedPax);
            dayCost += cost;
            totalLineCount++;
            selectedItems.push({
              item,
              cat,
              cfg,
              cost,
              caption: ruleCaption(item, cfg, totalPax),
              isCustom: false,
            });
          }
        });
      });

      (day.custom || []).forEach((c) => {
        if (c.qty > 0) {
          const cost = c.qty * c.price;
          dayCost += cost;
          totalLineCount++;
          selectedItems.push({
            item: c,
            cat: { title: "Custom Item" },
            cfg: { mode: "flat", qty: c.qty },
            cost,
            caption: `${idr(c.price)} × ${c.qty}`,
            isCustom: true,
          });
        }
      });

      grandCost += dayCost;
      return { day, dayCost, selectedItems };
    });

    const grandProfit = grandCost * (margin / 100);
    const grandPrice = grandCost + grandProfit;

    const adultPricePax = weightedPax > 0 ? grandPrice / weightedPax : 0;
    const childPricePax = adultPricePax * (kidsRate / 100);

    return {
      cost: grandCost,
      profit: grandProfit,
      price: grandPrice,
      adultPricePax,
      childPricePax,
      lineCount: totalLineCount,
      dayBreakdowns,
    };
  }, [days, margin, totalPax, weightedPax, kidsRate]);

  const filteredCatalog = useMemo(() => {
    if (!query.trim()) return CATALOG;
    const q = query.toLowerCase();
    return CATALOG.map((cat) => ({
      ...cat,
      items: cat.items.filter((i) => i.name.toLowerCase().includes(q)),
    })).filter((cat) => cat.items.length > 0);
  }, [query]);

  const costPct = totals.price > 0 ? (totals.cost / totals.price) * 100 : 100;

  const formattedQuotationText = useMemo(() => {
    let summary = `📍 *TOUR QUOTATION - ${currentQuote.title.toUpperCase()} (${days.length} Day${days.length > 1 ? "s" : ""})*\n`;
    summary += `👥 Pax Count: ${adults} Adult(s)${kids > 0 ? `, ${kids} Child(ren) (${kidsRate}%)` : ""}\n`;
    summary += `-----------------------------------\n`;

    totals.dayBreakdowns.forEach(({ day, dayCost, selectedItems }) => {
      summary += `\n🗓 *${day.title}* (${day.presetName || "Custom"})\n`;
      if (selectedItems.length === 0) {
        summary += ` • No items selected\n`;
      } else {
        selectedItems.forEach(({ item, cost, caption }) => {
          summary += ` • ${item.name} (${caption}) → ${idr(cost)}\n`;
        });
      }
      summary += `   Subtotal ${day.title}: ${idr(dayCost)}\n`;
    });

    summary += `\n-----------------------------------\n`;
    summary += `🏷 *Total Sell Price: ${idr(totals.price)}*\n`;
    summary += `👤 Adult Price / pax: ${idr(totals.adultPricePax)}\n`;
    if (kids > 0) {
      summary += `👶 Child Price / pax (${kidsRate}%): ${idr(totals.childPricePax)}\n`;
    }
    summary += `\nThank you for choosing our tour services! ✨`;
    return summary;
  }, [days, adults, kids, kidsRate, totals, currentQuote.title]);

  const displayQuotationText =
    currentQuote.customQuoteText !== undefined
      ? currentQuote.customQuoteText
      : formattedQuotationText;

  const copyTextToClipboard = (text) => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2200);
        })
        .catch(() => fallbackCopy(text));
    } else {
      fallbackCopy(text);
    }
  };

  const fallbackCopy = (text) => {
    try {
      const el = document.createElement("textarea");
      el.value = text;
      el.setAttribute("readonly", "");
      el.style.position = "absolute";
      el.style.left = "-9999px";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch (e) {
      console.error("Copy failed", e);
    }
  };

  const generateAiContent = async () => {
    setAiLoading(true);
    try {
      const apiKey =
        typeof process !== "undefined" && process.env
          ? process.env.REACT_APP_GEMINI_API_KEY
          : "";

      const systemPrompt = `You are an expert, world-class travel planner and sales manager for Nusa Penida, Lembongan, and Bali tours. 
Create highly detailed, realistic, hour-by-hour time schedules for each day based on the specific items selected.
Always show exact time slots (e.g., 09:30 AM - 11:00 AM) for every location and activity.
Include practical travel tips and clear highlight descriptions for every activity.`;

      const prompt = `Create a customer-facing tour proposal for "${currentQuote.title}" (${days.length}-day tour).
Pax: ${adults} Adults, ${kids} Kids.
Grand Price: ${idr(totals.price)} (Adult: ${idr(totals.adultPricePax)}/pax, Child: ${idr(totals.childPricePax)}/pax).
Items breakdown per day:
${totals.dayBreakdowns
  .map(
    (b) =>
      `${b.day.title}: ${b.selectedItems.map((i) => `${i.item.name} (${i.caption})`).join(", ")}`
  )
  .join("\n")}

Format output with two sections separated by "WHATSAPP_PITCH":
1. "ITINERARY": Minute-by-minute time schedule for each day with location descriptions, logistics, and a "💡 Essential Travel Tips" section at the end.
2. "WHATSAPP_PITCH": Warm, high-converting sales pitch to send to customer on WhatsApp.`;

      if (apiKey) {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              systemInstruction: { parts: [{ text: systemPrompt }] },
            }),
          }
        );

        const data = await response.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
        if (text) {
          if (text.includes("WHATSAPP_PITCH")) {
            const parts = text.split("WHATSAPP_PITCH");
            setAiItinerary(parts[0].replace("ITINERARY", "").trim());
            setAiPitch(parts[1].trim());
          } else {
            setAiItinerary(text);
          }
          setActiveTab("itinerary");
          setAiLoading(false);
          return;
        }
      }

      let builtItinerary = `🌴 *${currentQuote.title.toUpperCase()} - ${days.length}-DAY TIME SCHEDULE*\n`;
      builtItinerary += `👥 Guests: ${adults} Adult(s)${kids > 0 ? `, ${kids} Child(ren)` : ""}\n\n`;

      totals.dayBreakdowns.forEach(({ day, selectedItems }) => {
        builtItinerary += `===================================\n`;
        builtItinerary += `🗓 *${day.title.toUpperCase()} TIME SCHEDULE*\n`;
        builtItinerary += `===================================\n`;
        builtItinerary += `⏰ 06:00 AM - 07:00 AM | Hotel Pickup in Bali\n`;
        builtItinerary += `   • Private AC vehicle pickup from hotel lobby.\n`;
        builtItinerary += `⏰ 07:30 AM - 08:00 AM | Sanur Harbor Check-in\n`;
        builtItinerary += `   • Collect fast boat boarding passes.\n`;
        builtItinerary += `⏰ 08:15 AM - 09:00 AM | Fast Boat Crossing\n`;
        builtItinerary += `   • Scenic ~45 min fast boat ocean crossing to Nusa Penida.\n`;
        builtItinerary += `⏰ 09:00 AM - 09:15 AM | Arrival & Driver Briefing\n`;
        builtItinerary += `   • Welcome by local private driver/guide.\n\n`;

        const itemNamesLower = selectedItems
          .map((i) => i.item.name.toLowerCase())
          .join(" ");

        const isWest = itemNamesLower.includes("west");
        const isEast = itemNamesLower.includes("east");
        const isCombi =
          itemNamesLower.includes("combination") || (isWest && isEast);
        const hasSnorkeling =
          itemNamesLower.includes("snorkel") ||
          itemNamesLower.includes("manta") ||
          itemNamesLower.includes("dive");

        if (hasSnorkeling && (isWest || isEast || isCombi)) {
          builtItinerary += `📌 *09:30 AM - 12:15 PM | Snorkeling Safari Exploration*\n`;
          builtItinerary += `   • Gear fitting & safety orientation.\n`;
          builtItinerary += `   • Visit 3-4 spots: Manta Bay, Crystal Bay, Wall Bay & GT Point.\n\n`;
          builtItinerary += `📌 *12:30 PM - 01:30 PM | Resto Lunch Break*\n`;
          builtItinerary += `   • Delicious set lunch at partner restaurant.\n\n`;
          builtItinerary += `📌 *01:45 PM - 03:45 PM | Coastal Highlight Sightseeing*\n`;
          builtItinerary += `   • Visit Kelingking T-Rex Cliff & Angel's Billabong / Broken Beach.\n\n`;
        } else if (isWest) {
          builtItinerary += `📌 *09:30 AM - 11:30 AM | Kelingking Beach (T-Rex Cliff)*\n`;
          builtItinerary += `   • Marvel at the iconic T-Rex shaped cliff & turquoise waves.\n\n`;
          builtItinerary += `📌 *11:45 AM - 12:45 PM | Angel's Billabong & Broken Beach*\n`;
          builtItinerary += `   • Natural ocean infinity pool & circular archway.\n\n`;
          builtItinerary += `📌 *01:00 PM - 02:00 PM | Resto Lunch Break*\n`;
          builtItinerary += `   • Set lunch at local partner restaurant.\n\n`;
          builtItinerary += `📌 *02:30 PM - 03:45 PM | Crystal Bay Beach Relaxation*\n`;
          builtItinerary += `   • Relax on palm-fringed sands & swim in calm waters.\n\n`;
        } else if (isEast) {
          builtItinerary += `📌 *09:45 AM - 11:30 AM | Diamond Beach & Atuh Beach*\n`;
          builtItinerary += `   • Descend cliff stairway to white sands & rock pinnacles.\n\n`;
          builtItinerary += `📌 *11:45 AM - 12:45 PM | Thousand Islands & Treehouse*\n`;
          builtItinerary += `   • Panoramic viewpoint & photo stop at famous Tree House.\n\n`;
          builtItinerary += `📌 *01:00 PM - 02:00 PM | Resto Lunch Break*\n\n`;
          builtItinerary += `📌 *02:30 PM - 03:45 PM | Paluang Cliff Viewpoint*\n\n`;
        } else {
          builtItinerary += `📌 *09:30 AM - 01:00 PM | Sightseeing Highlights*\n`;
          selectedItems.forEach(({ item }) => {
            builtItinerary += `   • 🌊 ${item.name}\n`;
          });
          builtItinerary += `📌 *01:00 PM - 02:00 PM | Resto Lunch Break*\n\n`;
        }

        builtItinerary += `⏰ 04:00 PM - 04:30 PM | Harbor Return & Boarding\n`;
        builtItinerary += `⏰ 05:00 PM - 05:45 PM | Fast Boat Return to Sanur\n`;
        builtItinerary += `⏰ 06:00 PM - 07:00 PM | Hotel Drop-off Transfer\n\n`;
      });

      builtItinerary += `💡 *ESSENTIAL TRAVEL TIPS:*\n`;
      builtItinerary += `1. 👟 Footwear: Wear comfortable shoes or sturdy sandals.\n`;
      builtItinerary += `2. ☀️ Sun Protection: Reef-safe sunscreen, sunglasses & hat.\n`;
      builtItinerary += `3. 🏊 Swimwear: Wear swimsuit under clothes if doing snorkeling.\n`;
      builtItinerary += `4. 💵 Cash: Bring extra IDR cash for personal drinks.\n\n`;
      builtItinerary += `✅ *Inclusions:* Fast boat tickets, private island car transport with driver, entrance retributions, lunch & snorkeling gear (if applicable).`;

      let builtPitch = `Hello! 👋 Thank you for inquiring about our island tour experience.\n\nHere is your custom package for "${currentQuote.title}" (${days.length} Day(s), ${adults} Adult(s)${kids > 0 ? ` & ${kids} Child(ren)` : ""}):\n\n`;
      builtPitch += `💵 *Total Sell Price:* ${idr(totals.price)}\n`;
      builtPitch += `👤 *Adult Rate:* ${idr(totals.adultPricePax)} / pax\n`;
      if (kids > 0) {
        builtPitch += `👶 *Child Rate (${kidsRate}%):* ${idr(totals.childPricePax)} / pax\n`;
      }
      builtPitch += `\nIncludes fast boat tickets, private island transport, entrance retributions & lunch!\n\nWould you like to confirm this booking for your travel dates? 😊✨`;

      setAiItinerary(builtItinerary);
      setAiPitch(builtPitch);
      setActiveTab("itinerary");
    } catch (e) {
      console.error(e);
      setAiItinerary("Generative service ready. Click 'Build AI Itinerary & Proposal' to generate timeline.");
    } finally {
      setAiLoading(false);
    }
  };

  const stepBtn = (bg, color, border) => ({
    width: 26,
    height: 26,
    borderRadius: 8,
    border: border || "none",
    background: bg,
    color,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  });

  return (
    <div
      style={{
        background: COLORS.deep,
        minHeight: "100vh",
        fontFamily: "'Inter', sans-serif",
      }}
    >
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
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div style={{ maxWidth: 780, margin: "0 auto", padding: "20px 16px 120px" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Waves size={24} color={COLORS.coral} strokeWidth={2.5} />
            <div>
              <h1 style={{
                fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: 22,
                color: COLORS.sand, margin: 0, letterSpacing: "-0.01em",
              }}>
                Tour Costing Simulator
              </h1>
              <p style={{ color: COLORS.muted, fontSize: 12.5, margin: "2px 0 0" }}>
                Multi-Quote Workspaces & Multi-Day Shopping Cart
              </p>
            </div>
          </div>
          <button
            onClick={() => copyTextToClipboard(displayQuotationText)}
            style={{
              display: "flex", alignItems: "center", gap: 6, background: COLORS.coral,
              color: COLORS.sand, border: "none", borderRadius: 10, padding: "8px 14px",
              fontSize: 12.5, fontWeight: 700, cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
            }}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? "Copied!" : "Export Quote"}
          </button>
        </div>

        {/* Workspace bar */}
        <div style={{ background: COLORS.oceanLight, borderRadius: 16, padding: 12, marginBottom: 14 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, color: COLORS.sand, fontWeight: 700, fontSize: 13.5 }}>
              <Layers size={16} color={COLORS.coralSoft} />
              Quote Workspaces ({quotes.length} Active Quote{quotes.length > 1 ? "s" : ""})
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <button
                onClick={duplicateCurrentQuote}
                title="Duplicate active quote session"
                style={{
                  display: "flex", alignItems: "center", gap: 4, background: COLORS.sandDeep,
                  color: COLORS.ink, border: "none", borderRadius: 8, padding: "5px 9px",
                  fontSize: 11.5, fontWeight: 700, cursor: "pointer"
                }}
              >
                <Copy size={12} /> Duplicate Quote
              </button>
              <button
                onClick={addNewQuote}
                style={{
                  display: "flex", alignItems: "center", gap: 4, background: COLORS.sand,
                  color: COLORS.ink, border: "none", borderRadius: 8, padding: "5px 10px",
                  fontSize: 12, fontWeight: 700, cursor: "pointer"
                }}
              >
                <FolderPlus size={13} /> + New Quote
              </button>
            </div>
          </div>

          <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }} className="no-scrollbar">
            {quotes.map((q, idx) => (
              <div
                key={q.id}
                onClick={() => setActiveQuoteIndex(idx)}
                style={{
                  flexShrink: 0, display: "flex", alignItems: "center", gap: 6,
                  padding: "8px 12px", borderRadius: 10, cursor: "pointer",
                  background: activeQuoteIndex === idx ? COLORS.coral : COLORS.ocean,
                  color: activeQuoteIndex === idx ? COLORS.sand : COLORS.muted,
                  fontWeight: 600, fontSize: 13, border: `1px solid ${activeQuoteIndex === idx ? COLORS.coral : COLORS.oceanLight}`
                }}
              >
                <span>{q.title}</span>
                {quotes.length > 1 && (
                  <X
                    size={13}
                    onClick={(e) => removeQuoteSession(idx, e)}
                    style={{ opacity: 0.7, cursor: "pointer" }}
                  />
                )}
              </div>
            ))}
          </div>

          <div style={{ marginTop: 10, borderTop: `1px solid ${COLORS.ocean}`, paddingTop: 8, display: "flex", alignItems: "center", gap: 8 }}>
            <Pencil size={13} color={COLORS.coralSoft} />
            <span style={{ fontSize: 12, color: COLORS.sand, fontWeight: 500 }}>Rename Active Quote Title:</span>
            <input
              type="text"
              value={currentQuote.title || ""}
              onChange={(e) => updateCurrentQuote({ title: e.target.value })}
              placeholder="e.g. Mr. John - 3 Days Nusa Penida"
              style={{
                flex: 1, padding: "4px 8px", borderRadius: 6, border: `1px solid ${COLORS.line}`,
                fontSize: 12, background: COLORS.sand, color: COLORS.ink, fontWeight: 600
              }}
            />
          </div>
        </div>

        {}
        <div style={{ background: COLORS.oceanLight, borderRadius: 16, padding: 12, marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, color: COLORS.sand, fontWeight: 600, fontSize: 13 }}>
              <Calendar size={15} color={COLORS.coralSoft} />
              Multi-Day Shopping Cart ({days.length} Day{days.length > 1 ? "s" : ""})
            </div>
            <button
              onClick={() => addNewDay()}
              style={{
                display: "flex", alignItems: "center", gap: 4, background: COLORS.sand,
                color: COLORS.ink, border: "none", borderRadius: 8, padding: "5px 10px",
                fontSize: 12, fontWeight: 700, cursor: "pointer"
              }}
            >
              <Plus size={13} /> Add Day
            </button>
          </div>

          <div style={{ display: "flex", gap: 8, overflowX: "auto" }} className="no-scrollbar">
            {days.map((day, idx) => (
              <div
                key={day.id}
                onClick={() => setActiveDayIndex(idx)}
                style={{
                  flexShrink: 0, display: "flex", alignItems: "center", gap: 6,
                  padding: "8px 12px", borderRadius: 10, cursor: "pointer",
                  background: activeDayIndex === idx ? COLORS.coral : COLORS.ocean,
                  color: activeDayIndex === idx ? COLORS.sand : COLORS.muted,
                  fontWeight: 600, fontSize: 13, border: `1px solid ${activeDayIndex === idx ? COLORS.coral : COLORS.oceanLight}`
                }}
              >
                <span>{day.title}</span>
                {days.length > 1 && (
                  <X
                    size={13}
                    onClick={(e) => removeDay(idx, e)}
                    style={{ opacity: 0.7, cursor: "pointer" }}
                  />
                )}
              </div>
            ))}
          </div>

          <div style={{ marginTop: 12, borderTop: `1px solid ${COLORS.ocean}`, paddingTop: 10, display: "flex", alignItems: "center", gap: 8 }}>
            <Edit2 size={13} color={COLORS.coralSoft} />
            <span style={{ fontSize: 12, color: COLORS.sand, fontWeight: 500 }}>Active Day Name:</span>
            <input
              type="text"
              value={activeDay?.title || ""}
              onChange={(e) => updateDayTitle(e.target.value)}
              placeholder="e.g. Day 1: West Tour"
              style={{
                flex: 1, padding: "4px 8px", borderRadius: 6, border: `1px solid ${COLORS.line}`,
                fontSize: 12, background: COLORS.sand, color: COLORS.ink, fontWeight: 600
              }}
            />
          </div>
        </div>

        {}
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Sparkles size={13} color={COLORS.coralSoft} />
              <span style={{ fontSize: 12, color: COLORS.muted, fontWeight: 600 }}>
                Package Shortcuts (Loads full preset for {activeDay.title})
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {presets.length < DEFAULT_PRESETS.length && (
                <button
                  onClick={restoreDefaultPresets}
                  style={{
                    background: "none", border: "none", color: COLORS.muted,
                    fontSize: 12, fontWeight: 600, cursor: "pointer"
                  }}
                >
                  Restore Defaults
                </button>
              )}
              <button
                onClick={saveCurrentDayAsPreset}
                style={{
                  background: "none", border: "none", color: COLORS.coralSoft,
                  fontSize: 12, fontWeight: 600, cursor: "pointer", display: "flex",
                  alignItems: "center", gap: 4
                }}
              >
                <BookmarkPlus size={13} /> Save Day as Preset
              </button>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }} className="no-scrollbar">
            {presets.map((p) => (
              <div
                key={p.id}
                style={{
                  flexShrink: 0, display: "flex", alignItems: "center", borderRadius: 12,
                  background: COLORS.sand, boxShadow: "0 2px 6px rgba(0,0,0,0.2)", overflow: "hidden"
                }}
              >
                <button
                  onClick={() => applyPresetToDay(activeDayIndex, p)}
                  className="preset-chip"
                  style={{
                    padding: "8px 12px", border: "none", background: "transparent",
                    color: COLORS.ink, fontSize: 12.5, fontWeight: 700, cursor: "pointer",
                  }}
                >
                  {p.label}
                </button>
                <button
                  onClick={(e) => openPresetEditor(p, e)}
                  title="Edit Preset"
                  style={{
                    padding: "8px 4px", border: "none", background: "transparent",
                    color: COLORS.muted, cursor: "pointer", display: "flex", alignItems: "center"
                  }}
                >
                  <Pencil size={12} />
                </button>
                <button
                  onClick={(e) => deletePreset(p.id, e)}
                  title="Delete Preset Shortcut"
                  style={{
                    padding: "8px 8px 8px 2px", border: "none", background: "transparent",
                    color: COLORS.coral, cursor: "pointer", display: "flex", alignItems: "center"
                  }}
                >
                  <Trash2 size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {}
        <div style={{
          background: COLORS.sand, borderRadius: 18, padding: "18px 18px 16px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.25)", marginBottom: 18,
        }}>
          {/* Pax control */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12, flexWrap: "wrap" }}>
            <Users size={16} color={COLORS.ink} />
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 12.5, color: COLORS.muted, fontWeight: 600 }}>Adults</span>
              <button className="stepper-btn" onClick={() => setAdults((a) => Math.max(1, a - 1))} style={stepBtn(COLORS.deep, COLORS.sand)}><Minus size={12} /></button>
              <span style={{ minWidth: 18, textAlign: "center", fontWeight: 700, color: COLORS.ink }}>{adults}</span>
              <button className="stepper-btn" onClick={() => setAdults((a) => a + 1)} style={stepBtn(COLORS.coral, COLORS.sand)}><Plus size={12} /></button>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 12.5, color: COLORS.muted, fontWeight: 600 }}>Kids</span>
              <button className="stepper-btn" onClick={() => setKids((k) => Math.max(0, k - 1))} style={stepBtn(COLORS.deep, COLORS.sand)}><Minus size={12} /></button>
              <span style={{ minWidth: 18, textAlign: "center", fontWeight: 700, color: COLORS.ink }}>{kids}</span>
              <button className="stepper-btn" onClick={() => setKids((k) => k + 1)} style={stepBtn(COLORS.coral, COLORS.sand)}><Plus size={12} /></button>
            </div>
            {kids > 0 && (
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ fontSize: 12, color: COLORS.muted, fontWeight: 600 }}>Child Rate:</span>
                <input
                  type="number" value={kidsRate} min={0} max={100}
                  onChange={(e) => setKidsRate(Math.max(0, Math.min(100, Number(e.target.value))))}
                  style={{ width: 44, padding: "3px 4px", borderRadius: 6, border: `1px solid ${COLORS.line}`, fontSize: 12, textAlign: "center", fontWeight: 600 }}
                />
                <span style={{ fontSize: 12, color: COLORS.muted }}>%</span>
              </div>
            )}
            <span style={{ fontSize: 11.5, color: COLORS.muted, marginLeft: "auto" }}>
              Total Pax: {totalPax}{kids > 0 ? ` (${weightedPax.toFixed(1)} weighted)` : ""}
            </span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 12, flexWrap: "wrap", gap: 10 }}>
            <div>
              <div style={{ fontSize: 11, color: COLORS.muted, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                Grand Total Sell Price ({days.length} Day{days.length > 1 ? "s" : ""})
              </div>
              <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: 32, color: COLORS.ink, lineHeight: 1.1 }}>
                {idr(totals.price)}
              </div>
            </div>
            <button onClick={resetAll} className="stepper-btn" style={{
              display: "flex", alignItems: "center", gap: 5, background: "none",
              border: `1px solid ${COLORS.line}`, borderRadius: 10, padding: "6px 10px",
              color: COLORS.muted, fontSize: 12, fontWeight: 600, cursor: "pointer",
            }}>
              <RotateCcw size={13} /> Reset Quote
            </button>
          </div>

          {/* Adult / Child Rate Display */}
          <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
            <div style={{ flex: 1, background: COLORS.sandDeep, padding: "8px 12px", borderRadius: 10 }}>
              <div style={{ fontSize: 11, color: COLORS.muted, fontWeight: 600 }}>Adult Price / pax</div>
              <div style={{ fontWeight: 700, fontSize: 16, color: COLORS.ink }}>{idr(totals.adultPricePax)}</div>
            </div>
            {kids > 0 && (
              <div style={{ flex: 1, background: COLORS.sandDeep, padding: "8px 12px", borderRadius: 10 }}>
                <div style={{ fontSize: 11, color: COLORS.muted, fontWeight: 600 }}>Child Price / pax ({kidsRate}%)</div>
                <div style={{ fontWeight: 700, fontSize: 16, color: COLORS.coral }}>{idr(totals.childPricePax)}</div>
              </div>
            )}
          </div>

          {/* Cost vs profit bar */}
          <div style={{ height: 10, borderRadius: 6, overflow: "hidden", display: "flex", marginBottom: 8 }}>
            <div style={{ width: `${costPct}%`, background: COLORS.ocean, transition: "width 0.2s" }} />
            <div style={{ width: `${100 - costPct}%`, background: COLORS.profit, transition: "width 0.2s" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, color: COLORS.ink, marginBottom: 16 }}>
            <span><span style={{ display: "inline-block", width: 8, height: 8, borderRadius: 4, background: COLORS.ocean, marginRight: 5 }} />
              Total Cost {idr(totals.cost)}</span>
            <span><span style={{ display: "inline-block", width: 8, height: 8, borderRadius: 4, background: COLORS.profit, marginRight: 5 }} />
              Profit {idr(totals.profit)}</span>
          </div>

          {/* Margin slider */}
          <div style={{ borderTop: `1px solid ${COLORS.line}`, paddingTop: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <label style={{ fontSize: 12.5, fontWeight: 600, color: COLORS.ink }}>Profit Margin Target</label>
              <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: 18, color: COLORS.coral }}>{margin}%</span>
            </div>
            <input
              type="range" min={0} max={100} value={margin}
              onChange={(e) => setMargin(Number(e.target.value))}
              style={{ width: "100%", display: "block" }}
            />
            <div style={{ display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" }}>
              {[10, 15, 20, 25, 30, 40, 50].map((m) => (
                <button key={m} onClick={() => setMargin(m)} className="stepper-btn" style={{
                  padding: "4px 10px", borderRadius: 20, fontSize: 11.5, fontWeight: 600,
                  border: `1px solid ${margin === m ? COLORS.coral : COLORS.line}`,
                  background: margin === m ? COLORS.coral : "transparent",
                  color: margin === m ? COLORS.sand : COLORS.muted, cursor: "pointer",
                }}>
                  {m}%
                </button>
              ))}
            </div>
          </div>

          {}
          <div style={{ marginTop: 14, borderTop: `1px solid ${COLORS.line}`, paddingTop: 10 }}>
            <button
              onClick={() => setShowBreakdown((b) => !b)}
              style={{
                width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                background: "none", border: "none", color: COLORS.ink, fontWeight: 700, fontSize: 13,
                cursor: "pointer", padding: "4px 0"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <List size={15} color={COLORS.coral} />
                Selected Items Cost Breakdown
              </div>
              <ChevronDown size={16} style={{ transform: showBreakdown ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
            </button>

            {showBreakdown && (
              <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 10 }}>
                {totals.dayBreakdowns.map(({ day, dayCost, selectedItems }, dIdx) => (
                  <div key={day.id} style={{ background: COLORS.sandDeep, borderRadius: 12, padding: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: 12.5, color: COLORS.ink, marginBottom: 6 }}>
                      <span>{day.title} Subtotal:</span>
                      <span>{idr(dayCost)}</span>
                    </div>
                    {selectedItems.length === 0 ? (
                      <div style={{ fontSize: 11.5, color: COLORS.muted }}>No items selected for this day.</div>
                    ) : (
                      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                        {selectedItems.map((itemObj, i) => (
                          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12, background: COLORS.sand, padding: "6px 10px", borderRadius: 8 }}>
                            <div>
                              <span style={{ fontWeight: 600, color: COLORS.ink }}>{itemObj.item.name}</span>
                              <span style={{ color: COLORS.muted, fontSize: 11, marginLeft: 6 }}>({itemObj.caption})</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                              <span style={{ fontWeight: 700, color: COLORS.ink }}>{idr(itemObj.cost)}</span>
                              <button
                                onClick={() => removeItemFromDay(dIdx, itemObj)}
                                style={{ background: "none", border: "none", color: COLORS.coral, cursor: "pointer", padding: 0, display: "flex" }}
                              >
                                <X size={13} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {}
        <div style={{ background: COLORS.oceanLight, borderRadius: 18, padding: 16, marginBottom: 18 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14, flexWrap: "wrap", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, color: COLORS.sand, fontWeight: 700, fontSize: 15 }}>
              <Bot size={20} color={COLORS.coralSoft} />
              Quotation & AI Itinerary Center
            </div>
            <button
              onClick={generateAiContent}
              disabled={aiLoading}
              style={{
                display: "flex", alignItems: "center", gap: 6, background: COLORS.coral,
                color: COLORS.sand, border: "none", borderRadius: 10, padding: "7px 14px",
                fontSize: 12.5, fontWeight: 700, cursor: "pointer", opacity: aiLoading ? 0.6 : 1
              }}
            >
              <Sparkles size={14} /> {aiLoading ? "Generating AI..." : "Build AI Itinerary & Proposal"}
            </button>
          </div>

          <div style={{ display: "flex", gap: 6, background: COLORS.ocean, padding: 4, borderRadius: 10, marginBottom: 12 }}>
            <button
              onClick={() => setActiveTab("quote")}
              style={{
                flex: 1, padding: "8px 10px", borderRadius: 8, border: "none",
                background: activeTab === "quote" ? COLORS.sand : "transparent",
                color: activeTab === "quote" ? COLORS.ink : COLORS.muted,
                fontWeight: 700, fontSize: 12, cursor: "pointer", display: "flex",
                alignItems: "center", justifyContent: "center", gap: 6
              }}
            >
              <FileText size={14} /> WhatsApp Quote
            </button>
            <button
              onClick={() => setActiveTab("itinerary")}
              style={{
                flex: 1, padding: "8px 10px", borderRadius: 8, border: "none",
                background: activeTab === "itinerary" ? COLORS.sand : "transparent",
                color: activeTab === "itinerary" ? COLORS.ink : COLORS.muted,
                fontWeight: 700, fontSize: 12, cursor: "pointer", display: "flex",
                alignItems: "center", justifyContent: "center", gap: 6
              }}
            >
              <Clock size={14} /> AI Detailed Schedule
            </button>
            <button
              onClick={() => setActiveTab("pitch")}
              style={{
                flex: 1, padding: "8px 10px", borderRadius: 8, border: "none",
                background: activeTab === "pitch" ? COLORS.sand : "transparent",
                color: activeTab === "pitch" ? COLORS.ink : COLORS.muted,
                fontWeight: 700, fontSize: 12, cursor: "pointer", display: "flex",
                alignItems: "center", justifyContent: "center", gap: 6
              }}
            >
              <MessageSquare size={14} /> Sales Pitch
            </button>
          </div>

          {activeTab === "quote" && (
            <div style={{ background: COLORS.sand, borderRadius: 12, padding: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, flexWrap: "wrap", gap: 6 }}>
                <div>
                  <span style={{ fontWeight: 700, fontSize: 13, color: COLORS.ink }}>WhatsApp Export Quote</span>
                  <span style={{ fontSize: 11, color: COLORS.muted, marginLeft: 6 }}>(Editable text area)</span>
                </div>
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  {currentQuote.customQuoteText !== undefined && (
                    <button
                      onClick={() => updateCurrentQuote({ customQuoteText: undefined })}
                      title="Reset back to auto-calculated text"
                      style={{
                        display: "flex", alignItems: "center", gap: 4, background: COLORS.sandDeep,
                        color: COLORS.ink, border: `1px solid ${COLORS.line}`, borderRadius: 8, padding: "5px 9px",
                        fontSize: 11.5, fontWeight: 700, cursor: "pointer"
                      }}
                    >
                      <RefreshCw size={12} /> Reset Auto
                    </button>
                  )}
                  <button
                    onClick={() => copyTextToClipboard(displayQuotationText)}
                    style={{
                      display: "flex", alignItems: "center", gap: 4, background: COLORS.coral,
                      color: COLORS.sand, border: "none", borderRadius: 8, padding: "5px 10px",
                      fontSize: 11.5, fontWeight: 700, cursor: "pointer"
                    }}
                  >
                    {copied ? <Check size={13} /> : <Copy size={13} />}
                    {copied ? "Copied!" : "Copy Text"}
                  </button>
                </div>
              </div>
              <textarea
                value={displayQuotationText}
                onChange={(e) => updateCurrentQuote({ customQuoteText: e.target.value })}
                rows={12}
                placeholder="Type or customize your WhatsApp quote here..."
                style={{
                  width: "100%", padding: 12, borderRadius: 8, border: `1px solid ${COLORS.line}`,
                  fontSize: 12.5, fontFamily: "monospace", color: COLORS.ink, background: "#FCFAF3",
                  resize: "vertical", boxSizing: "border-box", outline: "none", lineHeight: 1.5
                }}
              />
            </div>
          )}

          {activeTab === "itinerary" && (
            <div style={{ background: COLORS.sand, borderRadius: 12, padding: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, flexWrap: "wrap", gap: 6 }}>
                <div>
                  <span style={{ fontWeight: 700, fontSize: 13, color: COLORS.ink }}>Detailed Hour-by-Hour Time Schedule</span>
                  <span style={{ fontSize: 11, color: COLORS.muted, marginLeft: 6 }}>(Editable text area)</span>
                </div>
                {aiItinerary && (
                  <button
                    onClick={() => copyTextToClipboard(aiItinerary)}
                    style={{
                      display: "flex", alignItems: "center", gap: 4, background: COLORS.coral,
                      color: COLORS.sand, border: "none", borderRadius: 8, padding: "5px 10px",
                      fontSize: 11.5, fontWeight: 700, cursor: "pointer"
                    }}
                  >
                    {copied ? <Check size={13} /> : <Copy size={13} />}
                    {copied ? "Copied!" : "Copy Itinerary"}
                  </button>
                )}
              </div>
              {aiItinerary ? (
                <textarea
                  value={aiItinerary}
                  onChange={(e) => setAiItinerary(e.target.value)}
                  rows={16}
                  placeholder="Itinerary details will appear here..."
                  style={{
                    width: "100%", padding: 12, borderRadius: 8, border: `1px solid ${COLORS.line}`,
                    fontSize: 12.5, fontFamily: "'Inter', sans-serif", color: COLORS.ink, background: "#FCFAF3",
                    resize: "vertical", boxSizing: "border-box", outline: "none", lineHeight: 1.5
                  }}
                />
              ) : (
                <div style={{ textAlign: "center", padding: "20px 10px", color: COLORS.muted, fontSize: 12.5 }}>
                  Click <strong>"Build AI Itinerary & Proposal"</strong> above to generate an informative minute-by-minute time schedule based on your selected items!
                </div>
              )}
            </div>
          )}

          {activeTab === "pitch" && (
            <div style={{ background: COLORS.sand, borderRadius: 12, padding: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, flexWrap: "wrap", gap: 6 }}>
                <div>
                  <span style={{ fontWeight: 700, fontSize: 13, color: COLORS.ink }}>Client Pitch Message</span>
                  <span style={{ fontSize: 11, color: COLORS.muted, marginLeft: 6 }}>(Editable text area)</span>
                </div>
                {aiPitch && (
                  <button
                    onClick={() => copyTextToClipboard(aiPitch)}
                    style={{
                      display: "flex", alignItems: "center", gap: 4, background: COLORS.coral,
                      color: COLORS.sand, border: "none", borderRadius: 8, padding: "5px 10px",
                      fontSize: 11.5, fontWeight: 700, cursor: "pointer"
                    }}
                  >
                    {copied ? <Check size={13} /> : <Send size={13} />}
                    {copied ? "Copied!" : "Copy Pitch"}
                  </button>
                )}
              </div>
              {aiPitch ? (
                <textarea
                  value={aiPitch}
                  onChange={(e) => setAiPitch(e.target.value)}
                  rows={10}
                  placeholder="Sales pitch will appear here..."
                  style={{
                    width: "100%", padding: 12, borderRadius: 8, border: `1px solid ${COLORS.line}`,
                    fontSize: 12.5, fontFamily: "'Inter', sans-serif", color: COLORS.ink, background: "#FCFAF3",
                    resize: "vertical", boxSizing: "border-box", outline: "none", lineHeight: 1.5
                  }}
                />
              ) : (
                <div style={{ textAlign: "center", padding: "20px 10px", color: COLORS.muted, fontSize: 12.5 }}>
                  Click <strong>"Build AI Itinerary & Proposal"</strong> above to draft a high-converting sales pitch!
                </div>
              )}
            </div>
          )}
        </div>

        {}
        <div style={{ position: "relative", marginBottom: 14 }}>
          <Search size={15} color={COLORS.muted} style={{ position: "absolute", left: 12, top: 11 }} />
          <input
            value={query} onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search items to add to ${activeDay.title}…`}
            style={{
              width: "100%", padding: "10px 12px 10px 34px", borderRadius: 12,
              border: `1px solid ${COLORS.oceanLight}`, background: COLORS.ocean,
              color: COLORS.sand, fontSize: 13.5, outline: "none", boxSizing: "border-box",
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {filteredCatalog.map((cat) => {
            const selectedInCat = cat.items.filter((i) =>
              isSelected(getConfig(i.id, cat.id, i.name))
            );
            const catCost = selectedInCat.reduce(
              (s, i) =>
                s +
                computeItemCost(
                  i,
                  getConfig(i.id, cat.id, i.name),
                  totalPax,
                  weightedPax
                ),
              0
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
                        {selectedInCat.length} selected for {activeDay.title} · {idr(catCost)}
                      </div>
                    )}
                  </div>
                  <ChevronDown size={17} color={COLORS.sand}
                    style={{ transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.15s" }} />
                </button>

                {isOpen && (
                  <div style={{ background: COLORS.sand }}>
                    {cat.items.map((item) => {
                      const cfg = getConfig(item.id, cat.id, item.name);
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
                                  <button className="stepper-btn" onClick={() => setItemQty(item.id, cat.id, item.name, (cfg.qty || 0) - 1)}
                                    disabled={(cfg.qty || 0) === 0}
                                    style={stepBtn((cfg.qty || 0) === 0 ? "transparent" : COLORS.deep, (cfg.qty || 0) === 0 ? COLORS.muted : COLORS.sand, `1px solid ${COLORS.line}`)}>
                                    <Minus size={12} />
                                  </button>
                                  <span style={{ minWidth: 16, textAlign: "center", fontSize: 13.5, fontWeight: 600, color: COLORS.ink }}>{cfg.qty || 0}</span>
                                  <button className="stepper-btn" onClick={() => setItemQty(item.id, cat.id, item.name, (cfg.qty || 0) + 1)}
                                    style={stepBtn(COLORS.coral, COLORS.sand)}>
                                    <Plus size={12} />
                                  </button>
                                </>
                              ) : cfg.included ? (
                                <>
                                  <span style={{ fontSize: 13, fontWeight: 700, color: COLORS.profit }}>{idr(itemTotal)}</span>
                                  <button className="stepper-btn" onClick={() => toggleInclude(item.id, cat.id, item.name, cfg)}
                                    style={stepBtn("transparent", COLORS.coral, `1px solid ${COLORS.line}`)}>
                                    <X size={12} />
                                  </button>
                                </>
                              ) : (
                                <button className="stepper-btn" onClick={() => toggleInclude(item.id, cat.id, item.name, cfg)}
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
                                  <button key={m} onClick={() => setRuleMode(item.id, cat.id, item.name, m)} className="stepper-btn"
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
                                    onChange={(e) => updateActiveDayConfig(item.id, cat.id, item.name, { capacity: Math.max(1, Number(e.target.value)) })}
                                    style={{ width: 48, padding: "3px 5px", borderRadius: 6, border: `1px solid ${COLORS.line}`, textAlign: "center" }} />
                                  <span style={{ color: COLORS.muted }}>(auto-split per unit)</span>
                                </div>
                              )}

                              {cfg.mode === "tier" && (
                                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8, flexWrap: "wrap" }}>
                                  <span style={{ color: COLORS.muted }}>Included up to</span>
                                  <input type="number" min={0} value={cfg.threshold}
                                    onChange={(e) => updateActiveDayConfig(item.id, cat.id, item.name, { threshold: Math.max(0, Number(e.target.value)) })}
                                    style={{ width: 40, padding: "3px 5px", borderRadius: 6, border: `1px solid ${COLORS.line}`, textAlign: "center" }} />
                                  <span style={{ color: COLORS.muted }}>pax, then +</span>
                                  <input type="number" min={0} value={cfg.surcharge}
                                    onChange={(e) => updateActiveDayConfig(item.id, cat.id, item.name, { surcharge: Math.max(0, Number(e.target.value)) })}
                                    style={{ width: 66, padding: "3px 5px", borderRadius: 6, border: `1px solid ${COLORS.line}`, textAlign: "center" }} />
                                  <span style={{ color: COLORS.muted }}>/ extra pax</span>
                                </div>
                              )}

                              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                <Pencil size={12} color={COLORS.muted} />
                                <span style={{ color: COLORS.muted }}>Override total cost:</span>
                                <input
                                  value={cfg.override}
                                  placeholder={idr(computeItemCost(item, { ...cfg, override: "" }, totalPax, weightedPax))}
                                  onChange={(e) => updateActiveDayConfig(item.id, cat.id, item.name, { override: e.target.value.replace(/[^0-9]/g, "") })}
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

        {}
        <div style={{ background: COLORS.oceanLight, borderRadius: 14, padding: 15, marginTop: 10 }}>
          <div style={{ color: COLORS.sand, fontWeight: 600, fontSize: 14, marginBottom: 10 }}>
            Custom items for {activeDay.title}
          </div>
          {(activeDay.custom || []).map((c) => (
            <div key={c.id} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              background: COLORS.sand, borderRadius: 10, padding: "9px 12px", marginBottom: 8,
            }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, color: COLORS.ink, fontWeight: 500 }}>{c.name}</div>
                <div style={{ fontSize: 12, color: COLORS.muted }}>{idr(c.price)} × {c.qty}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <button className="stepper-btn" onClick={() => setCustomQtyInDay(activeDayIndex, c.id, c.qty - 1)}
                  style={stepBtn(COLORS.deep, COLORS.sand)}>
                  <Minus size={11} />
                </button>
                <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.ink, minWidth: 14, textAlign: "center" }}>{c.qty}</span>
                <button className="stepper-btn" onClick={() => setCustomQtyInDay(activeDayIndex, c.id, c.qty + 1)}
                  style={stepBtn(COLORS.coral, COLORS.sand)}>
                  <Plus size={11} />
                </button>
                <button className="stepper-btn" onClick={() => removeCustomFromDay(activeDayIndex, c.id)}
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
              placeholder="Custom item name"
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
            <button onClick={addCustomToActiveDay} className="stepper-btn" style={{
              width: 38, borderRadius: 9, border: "none", background: COLORS.coral, color: COLORS.sand,
              display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0,
            }}>
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>

      {}
      {editingPreset && (
        <div
          style={{
            position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
            background: "rgba(0,0,0,0.65)", display: "flex", alignItems: "center",
            justifyContent: "center", zIndex: 9999, padding: 16,
          }}
        >
          <div
            style={{
              background: COLORS.sand, borderRadius: 18, width: "100%", maxWidth: 520,
              maxHeight: "85vh", overflowY: "auto", padding: 20, boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <h3 style={{ margin: 0, fontFamily: "'Fraunces', serif", fontSize: 18, color: COLORS.ink }}>
                Edit Preset: {editingPreset.label}
              </h3>
              <button
                onClick={() => setEditingPreset(null)}
                style={{ background: "none", border: "none", color: COLORS.muted, cursor: "pointer" }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ marginBottom: 14 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: COLORS.muted, marginBottom: 4 }}>
                Preset Shortcut Label
              </label>
              <input
                value={editingPreset.label}
                onChange={(e) => setEditingPreset((p) => ({ ...p, label: e.target.value }))}
                style={{
                  width: "100%", padding: "8px 10px", borderRadius: 8,
                  border: `1px solid ${COLORS.line}`, fontSize: 13, outline: "none",
                  boxSizing: "border-box"
                }}
              />
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: COLORS.muted, marginBottom: 8 }}>
                Select Included Catalog Items
              </label>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, maxHeight: 300, overflowY: "auto" }}>
                {CATALOG.map((cat) => (
                  <div key={cat.id} style={{ background: COLORS.sandDeep, borderRadius: 10, padding: 10 }}>
                    <div style={{ fontWeight: 700, fontSize: 12.5, color: COLORS.ink, marginBottom: 6 }}>
                      {cat.title}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                      {cat.items.map((item) => {
                        const key = `${cat.id}:::${item.name}`;
                        const active = !!editingPreset.picksMap[key];
                        return (
                          <label
                            key={item.id}
                            style={{
                              display: "flex", alignItems: "center", gap: 8, fontSize: 12,
                              color: COLORS.ink, cursor: "pointer"
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={active}
                              onChange={() => togglePresetPick(cat.id, item.name)}
                            />
                            <span>{item.name} ({idr(item.price)})</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", gap: 10, justifyContent: "space-between", alignItems: "center" }}>
              <button
                onClick={() => deletePreset(editingPreset.id)}
                style={{
                  padding: "8px 12px", borderRadius: 10, border: `1px solid ${COLORS.coralSoft}`,
                  background: "transparent", color: COLORS.coral, fontSize: 13,
                  fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 4,
                }}
              >
                <Trash2 size={13} /> Delete Preset
              </button>
              <div style={{ display: "flex", gap: 10 }}>
                <button
                  onClick={() => setEditingPreset(null)}
                  style={{
                    padding: "8px 14px", borderRadius: 10, border: `1px solid ${COLORS.line}`,
                    background: "transparent", color: COLORS.muted, fontSize: 13,
                    fontWeight: 600, cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={saveEditedPreset}
                  style={{
                    padding: "8px 16px", borderRadius: 10, border: "none",
                    background: COLORS.coral, color: COLORS.sand, fontSize: 13,
                    fontWeight: 700, cursor: "pointer",
                  }}
                >
                  Save Shortcut
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
