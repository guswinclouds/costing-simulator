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
  FolderPlus,
  Layers,
  LayoutDashboard,
  Calculator,
  Database,
  TrendingUp,
  DollarSign,
  CheckCircle2,
  FileSpreadsheet,
  CalendarDays,
  Save,
  Eye,
  LogOut,
  ShieldAlert,
  ShieldCheck,
  User,
  AlertCircle,
  CheckCircle,
  UserPlus,
  Key,
  Bot,
  Clock,
  MessageSquare,
  FileText,
  Send,
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
  confirmedBg: "#E3F2FD",
  confirmedText: "#1565C0",
  successBg: "#E8F5E9",
  successText: "#2E7D32",
};

const DEFAULT_CATALOG = [
  {
    id: "dive",
    title: "Snorkeling & Diving",
    items: [
      ["Wonderland 4 Place", 900000],
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

const DEFAULT_PRESETS = [
  {
    id: "west",
    label: "West Package",
    picks: [
      ["car", "West"],
      ["boat", "Maruti Return"],
      ["resto", "Arjuna Lunch 100"],
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
      ["resto", "Arjuna Lunch 100"],
      ["inclusion", "Diamond & Atuh"],
      ["inclusion", "Retribution"],
      ["inclusion", "Snack Box + Mineral"],
    ],
  },
  {
    id: "combi",
    label: "Combination Package",
    picks: [
      ["car", "Combination"],
      ["boat", "Maruti Return"],
      ["resto", "Arjuna Lunch 100"],
      ["inclusion", "Retribution"],
      ["inclusion", "Snack Box + Mineral"],
    ],
  },
  {
    id: "snorkel",
    label: "Snorkeling Only",
    picks: [
      ["boat", "Maruti Return"],
      ["dive", "Sharing Snorkeling"],
      ["resto", "Arjuna Lunch 75"],
      ["inclusion", "Snack Box + Mineral"],
    ],
  },
];

const DEFAULT_USERS = [
  {
    id: "god-root",
    username: "god",
    email: "god@tourhq.com",
    name: "Master God Admin",
    role: "GOD",
    status: "Approved",
    createdAt: "2026-01-01",
  },
  {
    id: "admin-1",
    username: "admin",
    email: "admin@tourhq.com",
    name: "Senior Tour Manager",
    role: "Admin",
    status: "Approved",
    createdAt: "2026-02-15",
  },
  {
    id: "staff-1",
    username: "agent1",
    email: "agent1@tourhq.com",
    name: "Wayman Reservations",
    role: "Staff",
    status: "Approved",
    createdAt: "2026-03-10",
  },
];

const idr = (n) => "Rp" + Math.round(n || 0).toLocaleString("id-ID");

function getAutoRuleForItem(catId, itemName = "", item = null) {
  if (item && item.mode) {
    return {
      mode: item.mode,
      capacity: item.capacity ?? 4,
      threshold: item.threshold ?? 2,
      surcharge: item.surcharge ?? 50000,
    };
  }
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

export default function App() {
  const [usersList, setUsersList] = useState(() => {
    try {
      const saved = localStorage.getItem("system_users");
      return saved ? JSON.parse(saved) : DEFAULT_USERS;
    } catch (e) {
      return DEFAULT_USERS;
    }
  });

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem("active_user_session");
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const [currentPage, setCurrentPage] = useState("simulator");

  const [authForm, setAuthForm] = useState({
    username: "",
    password: "",
    godMasterKey: "",
  });
  const [authNotice, setAuthNotice] = useState({ type: "", text: "" });

  const [newUserForm, setNewUserForm] = useState({
    username: "",
    name: "",
    email: "",
    role: "Staff",
  });
  const [userNotice, setUserNotice] = useState({ type: "", text: "" });

  const [catalog, setCatalog] = useState(() => {
    try {
      const saved = localStorage.getItem("custom_catalog");
      return saved ? JSON.parse(saved) : DEFAULT_CATALOG;
    } catch (e) {
      return DEFAULT_CATALOG;
    }
  });

  const [presets, setPresets] = useState(() => {
    try {
      const saved = localStorage.getItem("custom_presets");
      return saved ? JSON.parse(saved) : DEFAULT_PRESETS;
    } catch (e) {
      return DEFAULT_PRESETS;
    }
  });

  const [savedHistory, setSavedHistory] = useState(() => {
    try {
      const saved = localStorage.getItem("saved_quote_history");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("system_users", JSON.stringify(usersList));
    } catch (e) {
      console.error(e);
    }
  }, [usersList]);

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem("active_user_session", JSON.stringify(currentUser));
      } else {
        localStorage.removeItem("active_user_session");
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem("custom_catalog", JSON.stringify(catalog));
    } catch (e) {
      console.error(e);
    }
  }, [catalog]);

  useEffect(() => {
    try {
      localStorage.setItem("custom_presets", JSON.stringify(presets));
    } catch (e) {
      console.error(e);
    }
  }, [presets]);

  useEffect(() => {
    try {
      localStorage.setItem("saved_quote_history", JSON.stringify(savedHistory));
    } catch (e) {
      console.error(e);
    }
  }, [savedHistory]);

  const createDefaultQuoteSession = (idNumber = 1, titleOverride = null) => ({
    id: `quote-${Date.now()}-${idNumber}`,
    title: titleOverride || `Quote #${idNumber}`,
    status: "Draft",
    pic: currentUser?.name || "",
    agent: currentUser?.role || "Staff",
    activityDate: new Date().toISOString().split("T")[0],
    confirmedAt: null,
    adults: 2,
    kids: 0,
    kidsRate: 65,
    margin: 25,
    days: [
      {
        id: `day-${Date.now()}-1`,
        title: "Day 1",
        presetName: "",
        itemConfig: {}, // BLANK INITIAL STATE (0 IDR COST)
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

  const [open, setOpen] = useState({ dive: true, car: true });
  const [query, setQuery] = useState("");
  const [catalogQuery, setCatalogQuery] = useState("");
  const [copied, setCopied] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(true);

  const [newCatTitle, setNewCatTitle] = useState("");
  const [newItemData, setNewItemData] = useState({ catId: "", name: "", price: "" });
  const [editingItemRuleId, setEditingItemRuleId] = useState(null);

  const [editingPreset, setEditingPreset] = useState(null);
  const [newPresetLabel, setNewPresetLabel] = useState("");

  const currentQuote = quotes[activeQuoteIndex] || quotes[0];

  const updateCurrentQuote = (patch) => {
    setQuotes((prev) =>
      prev.map((q, i) => (i === activeQuoteIndex ? { ...q, ...patch } : q))
    );
  };

  const adults = currentQuote?.adults || 2;
  const setAdults = (val) =>
    updateCurrentQuote({
      adults: typeof val === "function" ? val(currentQuote.adults) : val,
    });

  const kids = currentQuote?.kids || 0;
  const setKids = (val) =>
    updateCurrentQuote({
      kids: typeof val === "function" ? val(currentQuote.kids) : val,
    });

  const kidsRate = currentQuote?.kidsRate || 65;
  const setKidsRate = (val) => updateCurrentQuote({ kidsRate: val });

  const margin = currentQuote?.margin || 25;
  const setMargin = (val) => updateCurrentQuote({ margin: val });

  const days = currentQuote?.days || [];
  const setDays = (val) =>
    updateCurrentQuote({
      days: typeof val === "function" ? val(currentQuote.days) : val,
    });

  const activeDayIndex = currentQuote?.activeDayIndex || 0;
  const setActiveDayIndex = (idx) => updateCurrentQuote({ activeDayIndex: idx });

  const activeDay = days[activeDayIndex] || days[0];

  const totalPax = adults + kids;
  const weightedPax = adults + kids * (kidsRate / 100);

  const isGodUser = currentUser?.role === "GOD";
  const isAdminOrGod = currentUser?.role === "GOD" || currentUser?.role === "Admin";

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setAuthNotice({ type: "", text: "" });

    if (authForm.godMasterKey.trim() === "GOD2026" || authForm.password === "GOD2026") {
      const godUser = {
        id: "god-master",
        username: authForm.username || "god",
        name: "Master God Admin",
        role: "GOD",
        status: "Approved",
        email: "god@tourhq.com",
      };
      setCurrentUser(godUser);
      setAuthNotice({ type: "success", text: "Welcome Master GOD! Unrestricted permissions granted." });
      setCurrentPage("simulator");
      return;
    }

    const found = usersList.find(
      (u) =>
        u.username.toLowerCase() === authForm.username.trim().toLowerCase() ||
        u.email.toLowerCase() === authForm.username.trim().toLowerCase()
    );

    if (!found) {
      setAuthNotice({ type: "error", text: "User account not found. Contact GOD/Admin to create your account." });
      return;
    }

    if (found.status === "Blocked") {
      setAuthNotice({
        type: "error",
        text: "Your account has been suspended by GOD. Contact system administrator.",
      });
      return;
    }

    setCurrentUser(found);
    setAuthNotice({ type: "success", text: `Logged in successfully as ${found.name} (${found.role})` });
    setCurrentPage("simulator");
  };

  const handleAdminCreateUser = (e) => {
    e.preventDefault();
    setUserNotice({ type: "", text: "" });

    if (!newUserForm.username.trim() || !newUserForm.name.trim()) {
      setUserNotice({ type: "error", text: "Please enter both Full Name and Username." });
      return;
    }

    const existing = usersList.find(
      (u) =>
        u.username.toLowerCase() === newUserForm.username.trim().toLowerCase() ||
        (newUserForm.email && u.email.toLowerCase() === newUserForm.email.trim().toLowerCase())
    );

    if (existing) {
      setUserNotice({ type: "error", text: "Username or Email already exists." });
      return;
    }

    const createdUser = {
      id: `user-${Date.now()}`,
      username: newUserForm.username.trim(),
      name: newUserForm.name.trim(),
      email: newUserForm.email.trim() || `${newUserForm.username.trim()}@tourhq.com`,
      role: newUserForm.role,
      status: "Approved",
      createdAt: new Date().toISOString().split("T")[0],
    };

    setUsersList((prev) => [...prev, createdUser]);
    setUserNotice({ type: "success", text: `Account for "${createdUser.name}" (${createdUser.role}) created successfully!` });
    setNewUserForm({ username: "", name: "", email: "", role: "Staff" });
  };

  const updateUserRoleAndStatus = (userId, newRole, newStatus) => {
    setUsersList((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role: newRole, status: newStatus } : u))
    );
  };

  const deleteUserAccount = (userId) => {
    setUsersList((prev) => prev.filter((u) => u.id !== userId));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setAuthNotice({ type: "", text: "" });
  };

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
    const item = catalog.flatMap((c) => c.items).find((i) => i.name === itemName);
    const auto = getAutoRuleForItem(catId, itemName, item);
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

  const buildPresetConfig = (picks) => {
    const nextConfig = {};
    picks.forEach(([catId, name]) => {
      const catObj = catalog.find((c) => c.id === catId);
      const item = catObj?.items.find((i) => i.name === name);
      if (!item) return;
      const auto = getAutoRuleForItem(catId, item.name, item);
      nextConfig[item.id] = {
        included: true,
        mode: auto.mode,
        qty: auto.mode === "flat" ? 1 : 0,
        capacity: auto.capacity,
        threshold: auto.threshold,
        surcharge: auto.surcharge,
        override: "",
      };
    });
    return nextConfig;
  };

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

  const addNewDay = () => {
    const nextIndex = days.length + 1;
    const newDayObj = {
      id: `day-${Date.now()}`,
      title: `Day ${nextIndex}`,
      presetName: "",
      itemConfig: {}, // Blank state
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

  const removeItemFromDay = (dayIdx, itemObj) => {
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
  };

  const resetAll = () => {
    updateCurrentQuote({
      days: [
        {
          id: `day-${Date.now()}`,
          title: "Day 1",
          presetName: "",
          itemConfig: {}, // Blank cost
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

      catalog.forEach((cat) => {
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
            });
          }
        });
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
  }, [days, margin, totalPax, weightedPax, kidsRate, catalog]);

  const filteredCatalog = useMemo(() => {
    if (!query.trim()) return catalog;
    const q = query.toLowerCase();
    return catalog
      .map((cat) => ({
        ...cat,
        items: cat.items.filter((i) => i.name.toLowerCase().includes(q)),
      }))
      .filter((cat) => cat.items.length > 0);
  }, [query, catalog]);

  const formattedQuotationText = useMemo(() => {
    let summary = `📍 *TOUR QUOTATION - ${currentQuote.title.toUpperCase()} (${days.length} Day${days.length > 1 ? "s" : ""})*\n`;
    if (currentQuote.pic) summary += `👤 PIC: ${currentQuote.pic}\n`;
    if (currentQuote.agent) summary += `🏢 Agent: ${currentQuote.agent}\n`;
    summary += `🗓 Tour Date: ${currentQuote.activityDate || "TBA"}\n`;
    summary += `👥 Pax Count: ${adults} Adult(s)${kids > 0 ? `, ${kids} Child(ren) (${kidsRate}%)` : ""}\n`;
    summary += `-----------------------------------\n`;

    totals.dayBreakdowns.forEach(({ day, dayCost, selectedItems }) => {
      summary += `\n🗓 *${day.title}*\n`;
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
  }, [days, adults, kids, kidsRate, totals, currentQuote]);

  const displayQuotationText =
    currentQuote.customQuoteText !== undefined
      ? currentQuote.customQuoteText
      : formattedQuotationText;

  const copyTextToClipboard = (text) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
      });
    }
  };

  const saveQuoteToDatabase = (statusToSave = "Draft") => {
    const record = {
      ...currentQuote,
      status: statusToSave,
      calculatedCost: totals.cost,
      calculatedProfit: totals.profit,
      calculatedPrice: totals.price,
      savedAt: new Date().toISOString(),
      confirmedAt: statusToSave === "Confirmed" ? new Date().toISOString() : currentQuote.confirmedAt,
    };

    updateCurrentQuote({ status: statusToSave, confirmedAt: record.confirmedAt });

    setSavedHistory((prev) => {
      const existingIdx = prev.findIndex((item) => item.id === record.id);
      if (existingIdx >= 0) {
        const nextArr = [...prev];
        nextArr[existingIdx] = record;
        return nextArr;
      }
      return [record, ...prev];
    });

    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const updateSavedQuoteStatus = (historyId, newStatus) => {
    setSavedHistory((prev) =>
      prev.map((item) => {
        if (item.id === historyId) {
          return {
            ...item,
            status: newStatus,
            confirmedAt: newStatus === "Confirmed" ? new Date().toISOString() : item.confirmedAt,
          };
        }
        return item;
      })
    );
  };

  const deleteQuoteFromHistory = (historyId) => {
    setSavedHistory((prev) => prev.filter((item) => item.id !== historyId));
  };

  const loadQuoteFromHistory = (item) => {
    setQuotes((prev) => [item, ...prev]);
    setActiveQuoteIndex(0);
    setCurrentPage("simulator");
  };

  const dashboardStats = useMemo(() => {
    const confirmed = savedHistory.filter((item) => item.status === "Confirmed");
    const totalRev = confirmed.reduce((sum, item) => sum + (item.calculatedPrice || 0), 0);
    const totalProfit = confirmed.reduce((sum, item) => sum + (item.calculatedProfit || 0), 0);
    const totalSaved = savedHistory.length;
    const totalConfirmed = confirmed.length;
    const conversionRate = totalSaved > 0 ? Math.round((totalConfirmed / totalSaved) * 100) : 0;

    return { totalRev, totalProfit, totalSaved, totalConfirmed, conversionRate };
  }, [savedHistory]);

  const searchedCatalog = useMemo(() => {
    if (!catalogQuery.trim()) return catalog;
    const q = catalogQuery.toLowerCase();
    return catalog
      .map((cat) => ({
        ...cat,
        items: cat.items.filter((i) => i.name.toLowerCase().includes(q)),
      }))
      .filter((cat) => cat.items.length > 0 || cat.title.toLowerCase().includes(q));
  }, [catalogQuery, catalog]);

  const handleAddCategory = () => {
    if (!newCatTitle.trim()) return;
    const newCat = {
      id: `cat-${Date.now()}`,
      title: newCatTitle.trim(),
      items: [],
    };
    setCatalog((prev) => [...prev, newCat]);
    setNewCatTitle("");
  };

  const handleAddItemToCategory = (catId) => {
    if (!newItemData.name.trim() || newItemData.catId !== catId) return;
    const price = parseInt(`${newItemData.price}`.replace(/\D/g, ""), 10) || 0;
    const newItem = {
      id: `${catId}-${Date.now()}`,
      name: newItemData.name.trim(),
      price,
      mode: "pax",
      capacity: 4,
    };
    setCatalog((prev) =>
      prev.map((cat) => (cat.id === catId ? { ...cat, items: [...cat.items, newItem] } : cat))
    );
    setNewItemData({ catId: "", name: "", price: "" });
  };

  const handleUpdateItemPrice = (catId, itemId, newPriceStr) => {
    const price = parseInt(`${newPriceStr}`.replace(/\D/g, ""), 10) || 0;
    setCatalog((prev) =>
      prev.map((cat) => {
        if (cat.id !== catId) return cat;
        return {
          ...cat,
          items: cat.items.map((i) => (i.id === itemId ? { ...i, price } : i)),
        };
      })
    );
  };

  const handleUpdateItemName = (catId, itemId, newName) => {
    setCatalog((prev) =>
      prev.map((cat) => {
        if (cat.id !== catId) return cat;
        return {
          ...cat,
          items: cat.items.map((i) => (i.id === itemId ? { ...i, name: newName } : i)),
        };
      })
    );
  };

  const handleUpdateItemRule = (catId, itemId, patch) => {
    setCatalog((prev) =>
      prev.map((cat) => {
        if (cat.id !== catId) return cat;
        return {
          ...cat,
          items: cat.items.map((i) => (i.id === itemId ? { ...i, ...patch } : i)),
        };
      })
    );
  };

  const handleDeleteItemFromCatalog = (catId, itemId) => {
    setCatalog((prev) =>
      prev.map((cat) => {
        if (cat.id !== catId) return cat;
        return {
          ...cat,
          items: cat.items.filter((i) => i.id !== itemId),
        };
      })
    );
  };

  const handleResetCatalogToDefault = () => {
    setCatalog(DEFAULT_CATALOG);
  };

  const createNewPresetFromCatalog = () => {
    if (!newPresetLabel.trim()) return;
    const newPreset = {
      id: `preset-${Date.now()}`,
      label: newPresetLabel.trim(),
      picks: [],
    };
    setPresets((prev) => [...prev, newPreset]);
    setNewPresetLabel("");
  };

  const deletePreset = (presetId) => {
    setPresets((prev) => prev.filter((p) => p.id !== presetId));
  };

  const openPresetEditor = (preset) => {
    const picksMap = {};
    (preset.picks || []).forEach(([catId, name]) => {
      picksMap[`${catId}:::${name}`] = true;
    });
    setEditingPreset({ ...preset, picksMap });
  };

  const togglePresetPick = (catId, itemName) => {
    setEditingPreset((prev) => {
      if (!prev) return null;
      const key = `${catId}:::${itemName}`;
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
    const nextPicks = Object.keys(editingPreset.picksMap).map((key) => key.split(":::"));
    setPresets((prev) =>
      prev.map((p) =>
        p.id === editingPreset.id ? { ...p, label: editingPreset.label, picks: nextPicks } : p
      )
    );
    setEditingPreset(null);
  };

  const stepBtn = (bg, color) => ({
    width: 26,
    height: 26,
    borderRadius: 8,
    border: "none",
    background: bg,
    color,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  });

  if (!currentUser) {
    return (
      <div
        style={{
          background: COLORS.deep,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Inter', sans-serif",
          padding: 16,
        }}
      >
        <div
          style={{
            background: COLORS.sand,
            borderRadius: 20,
            width: "100%",
            maxWidth: 420,
            padding: 24,
            boxShadow: "0 12px 32px rgba(0,0,0,0.4)",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <div style={{ display: "inline-flex", padding: 12, borderRadius: 16, background: COLORS.ocean, marginBottom: 10 }}>
              <Waves size={32} color={COLORS.coral} />
            </div>
            <h2 style={{ margin: 0, fontFamily: "'Fraunces', serif", fontSize: 24, color: COLORS.ink }}>
              Tour HQ Portal
            </h2>
            <p style={{ margin: "4px 0 0", fontSize: 13, color: COLORS.muted }}>
              Sign in with your authorized account or GOD Master key
            </p>
          </div>

          {authNotice.text && (
            <div
              style={{
                padding: "10px 14px",
                borderRadius: 10,
                marginBottom: 16,
                fontSize: 12.5,
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: authNotice.type === "error" ? "#FFEBEE" : "#E8F5E9",
                color: authNotice.type === "error" ? "#C62828" : "#2E7D32",
                border: `1px solid ${authNotice.type === "error" ? "#EF9A9A" : "#A5D6A7"}`,
              }}
            >
              {authNotice.type === "error" ? <AlertCircle size={16} /> : <CheckCircle size={16} />}
              <span>{authNotice.text}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: COLORS.ink, marginBottom: 4 }}>
                Username or Email
              </label>
              <input
                type="text"
                required
                placeholder="e.g. god, admin, or agent1"
                value={authForm.username}
                onChange={(e) => setAuthForm({ ...authForm, username: e.target.value })}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: 10,
                  border: `1px solid ${COLORS.line}`,
                  fontSize: 13,
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: COLORS.ink, marginBottom: 4 }}>
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={authForm.password}
                onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: 10,
                  border: `1px solid ${COLORS.line}`,
                  fontSize: 13,
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div style={{ borderTop: `1px dashed ${COLORS.line}`, paddingTop: 10, marginTop: 4 }}>
              <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11.5, fontWeight: 700, color: COLORS.coral, marginBottom: 4 }}>
                <Key size={13} /> GOD Master Passkey
              </label>
              <input
                type="password"
                placeholder="Enter GOD Key (e.g. GOD2026)"
                value={authForm.godMasterKey}
                onChange={(e) => setAuthForm({ ...authForm, godMasterKey: e.target.value })}
                style={{
                  width: "100%",
                  padding: "8px 10px",
                  borderRadius: 8,
                  border: `1px solid ${COLORS.coralSoft}`,
                  fontSize: 12,
                  boxSizing: "border-box",
                  background: "#FFF8F5",
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                marginTop: 8,
                padding: "12px",
                borderRadius: 10,
                border: "none",
                background: COLORS.ocean,
                color: COLORS.sand,
                fontWeight: 700,
                fontSize: 14,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              Sign In to Headquarters
            </button>
          </form>
        </div>
      </div>
    );
  }

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
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Main Container */}
      <div style={{ maxWidth: 880, margin: "0 auto", padding: "16px 16px 120px" }}>
        
        {/* Top Header & User Profile Bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Waves size={26} color={COLORS.coral} strokeWidth={2.5} />
            <div>
              <h1
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontWeight: 700,
                  fontSize: 22,
                  color: COLORS.sand,
                  margin: 0,
                  letterSpacing: "-0.01em",
                }}
              >
                Tour Costing & Booking HQ
              </h1>
              <p style={{ color: COLORS.muted, fontSize: 12, margin: "2px 0 0" }}>
                Multi-Quote Workspaces, Saved Bookings & Catalog Manager
              </p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ background: COLORS.oceanLight, padding: "6px 12px", borderRadius: 10, color: COLORS.sand, fontSize: 12 }}>
              <span style={{ color: COLORS.muted }}>Logged as: </span>
              <strong>{currentUser.name}</strong> ({currentUser.role})
            </div>

            <button
              onClick={handleLogout}
              title="Sign Out"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                background: COLORS.coral,
                color: COLORS.sand,
                border: "none",
                borderRadius: 10,
                padding: "8px 12px",
                fontSize: 12,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={{ display: "flex", gap: 6, background: COLORS.oceanLight, padding: 6, borderRadius: 14, marginBottom: 18, flexWrap: "wrap" }}>
          <button
            onClick={() => setCurrentPage("simulator")}
            style={{
              flex: 1,
              minWidth: 130,
              padding: "10px 12px",
              borderRadius: 10,
              border: "none",
              background: currentPage === "simulator" ? COLORS.sand : "transparent",
              color: currentPage === "simulator" ? COLORS.ink : COLORS.sand,
              fontWeight: 700,
              fontSize: 13,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
            }}
          >
            <Calculator size={16} color={currentPage === "simulator" ? COLORS.coral : COLORS.sand} />
            Simulator
          </button>

          <button
            onClick={() => setCurrentPage("dashboard")}
            style={{
              flex: 1,
              minWidth: 130,
              padding: "10px 12px",
              borderRadius: 10,
              border: "none",
              background: currentPage === "dashboard" ? COLORS.sand : "transparent",
              color: currentPage === "dashboard" ? COLORS.ink : COLORS.sand,
              fontWeight: 700,
              fontSize: 13,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
            }}
          >
            <LayoutDashboard size={16} color={currentPage === "dashboard" ? COLORS.coral : COLORS.sand} />
            Dashboard ({savedHistory.length})
          </button>

          {isAdminOrGod && (
            <button
              onClick={() => setCurrentPage("catalog")}
              style={{
                flex: 1,
                minWidth: 130,
                padding: "10px 12px",
                borderRadius: 10,
                border: "none",
                background: currentPage === "catalog" ? COLORS.sand : "transparent",
                color: currentPage === "catalog" ? COLORS.ink : COLORS.sand,
                fontWeight: 700,
                fontSize: 13,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
              }}
            >
              <Database size={16} color={currentPage === "catalog" ? COLORS.coral : COLORS.sand} />
              Catalog Manager
            </button>
          )}

          {isGodUser && (
            <button
              onClick={() => setCurrentPage("users")}
              style={{
                flex: 1,
                minWidth: 130,
                padding: "10px 12px",
                borderRadius: 10,
                border: "none",
                background: currentPage === "users" ? COLORS.coral : "transparent",
                color: COLORS.sand,
                fontWeight: 700,
                fontSize: 13,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
              }}
            >
              <ShieldAlert size={16} color={COLORS.sand} />
              God Permissions ({usersList.length})
            </button>
          )}
        </div>

        {/* PAGE 1: SIMULATOR */}
        {currentPage === "simulator" && (
          <div>
            {/* Workspace Bar */}
            <div style={{ background: COLORS.oceanLight, borderRadius: 16, padding: 12, marginBottom: 14 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10, flexWrap: "wrap", gap: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, color: COLORS.sand, fontWeight: 700, fontSize: 13.5 }}>
                  <Layers size={16} color={COLORS.coralSoft} />
                  Quote Workspaces ({quotes.length} Active)
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  <button
                    onClick={() => saveQuoteToDatabase(currentQuote.status)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      background: COLORS.profit,
                      color: "#FFF",
                      border: "none",
                      borderRadius: 8,
                      padding: "6px 12px",
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    <Save size={13} /> {copied ? "Saved!" : "Save Quote"}
                  </button>
                  <button
                    onClick={duplicateCurrentQuote}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      background: COLORS.sandDeep,
                      color: COLORS.ink,
                      border: "none",
                      borderRadius: 8,
                      padding: "6px 10px",
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    <Copy size={13} /> Duplicate
                  </button>
                  <button
                    onClick={addNewQuote}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      background: COLORS.sand,
                      color: COLORS.ink,
                      border: "none",
                      borderRadius: 8,
                      padding: "6px 12px",
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    <FolderPlus size={13} /> + New
                  </button>
                </div>
              </div>

              {/* Workspace Tabs */}
              <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }} className="no-scrollbar">
                {quotes.map((q, idx) => (
                  <div
                    key={q.id}
                    onClick={() => setActiveQuoteIndex(idx)}
                    style={{
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "8px 12px",
                      borderRadius: 10,
                      cursor: "pointer",
                      background: activeQuoteIndex === idx ? COLORS.coral : COLORS.ocean,
                      color: activeQuoteIndex === idx ? COLORS.sand : COLORS.muted,
                      fontWeight: 600,
                      fontSize: 13,
                      border: `1px solid ${activeQuoteIndex === idx ? COLORS.coral : COLORS.oceanLight}`,
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

              {/* Title, PIC, Agent, Date & Status Input Fields */}
              <div style={{ marginTop: 10, borderTop: `1px solid ${COLORS.ocean}`, paddingTop: 10, display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
                <div style={{ flex: "1 1 200px", display: "flex", alignItems: "center", gap: 6 }}>
                  <Pencil size={13} color={COLORS.coralSoft} />
                  <input
                    type="text"
                    value={currentQuote.title || ""}
                    onChange={(e) => updateCurrentQuote({ title: e.target.value })}
                    placeholder="Quote Title (e.g. Mr. John - Nusa Penida)"
                    style={{
                      width: "100%",
                      padding: "6px 10px",
                      borderRadius: 8,
                      border: `1px solid ${COLORS.line}`,
                      fontSize: 12.5,
                      background: COLORS.sand,
                      color: COLORS.ink,
                      fontWeight: 600,
                    }}
                  />
                </div>

                <div style={{ flex: "1 1 130px", display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 12, color: COLORS.sand, fontWeight: 600 }}>PIC:</span>
                  <input
                    type="text"
                    value={currentQuote.pic || ""}
                    onChange={(e) => updateCurrentQuote({ pic: e.target.value })}
                    placeholder="Person In Charge"
                    style={{
                      width: "100%",
                      padding: "6px 8px",
                      borderRadius: 8,
                      border: `1px solid ${COLORS.line}`,
                      fontSize: 12,
                      background: COLORS.sand,
                      color: COLORS.ink,
                      fontWeight: 600,
                    }}
                  />
                </div>

                <div style={{ flex: "1 1 130px", display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 12, color: COLORS.sand, fontWeight: 600 }}>Agent:</span>
                  <input
                    type="text"
                    value={currentQuote.agent || ""}
                    onChange={(e) => updateCurrentQuote({ agent: e.target.value })}
                    placeholder="Agent Name"
                    style={{
                      width: "100%",
                      padding: "6px 8px",
                      borderRadius: 8,
                      border: `1px solid ${COLORS.line}`,
                      fontSize: 12,
                      background: COLORS.sand,
                      color: COLORS.ink,
                      fontWeight: 600,
                    }}
                  />
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <CalendarDays size={14} color={COLORS.sand} />
                  <span style={{ fontSize: 12, color: COLORS.sand, fontWeight: 500 }}>Tour Date:</span>
                  <input
                    type="date"
                    value={currentQuote.activityDate || ""}
                    onChange={(e) => updateCurrentQuote({ activityDate: e.target.value })}
                    style={{
                      padding: "5px 8px",
                      borderRadius: 8,
                      border: `1px solid ${COLORS.line}`,
                      fontSize: 12,
                      background: COLORS.sand,
                      color: COLORS.ink,
                      fontWeight: 600,
                    }}
                  />
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 12, color: COLORS.sand, fontWeight: 500 }}>Status:</span>
                  <select
                    value={currentQuote.status}
                    onChange={(e) => saveQuoteToDatabase(e.target.value)}
                    style={{
                      padding: "5px 8px",
                      borderRadius: 8,
                      border: `1px solid ${COLORS.line}`,
                      fontSize: 12,
                      background: currentQuote.status === "Confirmed" ? COLORS.profit : COLORS.sand,
                      color: currentQuote.status === "Confirmed" ? "#FFF" : COLORS.ink,
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    <option value="Draft">Draft</option>
                    <option value="Sent">Sent</option>
                    <option value="Confirmed">Confirmed ✅</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Days Cart */}
            <div style={{ background: COLORS.oceanLight, borderRadius: 16, padding: 12, marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, color: COLORS.sand, fontWeight: 600, fontSize: 13 }}>
                  <Calendar size={15} color={COLORS.coralSoft} />
                  Multi-Day Shopping Cart ({days.length} Day{days.length > 1 ? "s" : ""})
                </div>
                <button
                  onClick={() => addNewDay()}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    background: COLORS.sand,
                    color: COLORS.ink,
                    border: "none",
                    borderRadius: 8,
                    padding: "5px 10px",
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: "pointer",
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
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "8px 12px",
                      borderRadius: 10,
                      cursor: "pointer",
                      background: activeDayIndex === idx ? COLORS.coral : COLORS.ocean,
                      color: activeDayIndex === idx ? COLORS.sand : COLORS.muted,
                      fontWeight: 600,
                      fontSize: 13,
                      border: `1px solid ${activeDayIndex === idx ? COLORS.coral : COLORS.oceanLight}`,
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
            </div>

            {/* Package Shortcuts Bar */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                <Sparkles size={13} color={COLORS.coralSoft} />
                <span style={{ fontSize: 12, color: COLORS.muted, fontWeight: 600 }}>
                  Load Package Shortcut for {activeDay.title}:
                </span>
              </div>
              <div style={{ display: "flex", gap: 8, overflowX: "auto" }} className="no-scrollbar">
                {presets.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => applyPresetToDay(activeDayIndex, p)}
                    style={{
                      flexShrink: 0,
                      padding: "7px 12px",
                      borderRadius: 10,
                      border: "none",
                      background: COLORS.sand,
                      color: COLORS.ink,
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    + {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Summary Pricing Card */}
            <div
              style={{
                background: COLORS.sand,
                borderRadius: 18,
                padding: "18px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
                marginBottom: 18,
              }}
            >
              {/* Pax Stepper */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12, flexWrap: "wrap" }}>
                <Users size={16} color={COLORS.ink} />
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 12.5, color: COLORS.muted, fontWeight: 600 }}>Adults</span>
                  <button className="stepper-btn" onClick={() => setAdults((a) => Math.max(1, a - 1))} style={stepBtn(COLORS.deep, COLORS.sand)}>
                    <Minus size={12} />
                  </button>
                  <span style={{ minWidth: 18, textAlign: "center", fontWeight: 700, color: COLORS.ink }}>{adults}</span>
                  <button className="stepper-btn" onClick={() => setAdults((a) => a + 1)} style={stepBtn(COLORS.coral, COLORS.sand)}>
                    <Plus size={12} />
                  </button>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 12.5, color: COLORS.muted, fontWeight: 600 }}>Kids</span>
                  <button className="stepper-btn" onClick={() => setKids((k) => Math.max(0, k - 1))} style={stepBtn(COLORS.deep, COLORS.sand)}>
                    <Minus size={12} />
                  </button>
                  <span style={{ minWidth: 18, textAlign: "center", fontWeight: 700, color: COLORS.ink }}>{kids}</span>
                  <button className="stepper-btn" onClick={() => setKids((k) => k + 1)} style={stepBtn(COLORS.coral, COLORS.sand)}>
                    <Plus size={12} />
                  </button>
                </div>
                {kids > 0 && (
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <span style={{ fontSize: 12, color: COLORS.muted, fontWeight: 600 }}>Child Rate:</span>
                    <input
                      type="number"
                      value={kidsRate}
                      onChange={(e) => setKidsRate(Math.max(0, Math.min(100, Number(e.target.value))))}
                      style={{
                        width: 44,
                        padding: "3px 4px",
                        borderRadius: 6,
                        border: `1px solid ${COLORS.line}`,
                        fontSize: 12,
                        textAlign: "center",
                        fontWeight: 600,
                      }}
                    />
                    <span style={{ fontSize: 12, color: COLORS.muted }}>%</span>
                  </div>
                )}
              </div>

              {/* Sell Price Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 12, flexWrap: "wrap", gap: 10 }}>
                <div>
                  <div style={{ fontSize: 11, color: COLORS.muted, fontWeight: 600, textTransform: "uppercase" }}>
                    Grand Total Sell Price ({days.length} Day{days.length > 1 ? "s" : ""})
                  </div>
                  <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: 32, color: COLORS.ink, lineHeight: 1.1 }}>
                    {idr(totals.price)}
                  </div>
                </div>
                <button
                  onClick={resetAll}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    background: "none",
                    border: `1px solid ${COLORS.line}`,
                    borderRadius: 10,
                    padding: "6px 10px",
                    color: COLORS.muted,
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  <RotateCcw size={13} /> Reset
                </button>
              </div>

              {/* Per Pax Breakdown Cards */}
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

              {/* Cost & Profit Margin Bar */}
              <div style={{ borderTop: `1px solid ${COLORS.line}`, paddingTop: 12, paddingBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <label style={{ fontSize: 12.5, fontWeight: 600, color: COLORS.ink }}>Profit Margin Target</label>
                  <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: 18, color: COLORS.coral }}>{margin}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={margin}
                  onChange={(e) => setMargin(Number(e.target.value))}
                  style={{ width: "100%", display: "block" }}
                />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: COLORS.ink, marginTop: 8 }}>
                  <span>Total Vendor Cost: {idr(totals.cost)}</span>
                  <span>Estimated Profit: {idr(totals.profit)}</span>
                </div>
              </div>

              {/* Selected Items Cost Breakdown Drawer */}
              <div style={{ borderTop: `1px solid ${COLORS.line}`, paddingTop: 12 }}>
                <button
                  onClick={() => setShowBreakdown((b) => !b)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: "none",
                    border: "none",
                    color: COLORS.ink,
                    fontWeight: 700,
                    fontSize: 13,
                    cursor: "pointer",
                    padding: "4px 0",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <List size={15} color={COLORS.coral} />
                    <span>Selected Items Cost Breakdown ({totals.lineCount} items)</span>
                  </div>
                  <ChevronDown
                    size={16}
                    style={{
                      transform: showBreakdown ? "rotate(180deg)" : "none",
                      transition: "transform 0.2s",
                    }}
                  />
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
                          <div style={{ fontSize: 11.5, color: COLORS.muted }}>No items selected for this day. Click items below to add.</div>
                        ) : (
                          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                            {selectedItems.map((itemObj, i) => (
                              <div
                                key={i}
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  fontSize: 12,
                                  background: COLORS.sand,
                                  padding: "6px 10px",
                                  borderRadius: 8,
                                }}
                              >
                                <div>
                                  <span style={{ fontWeight: 600, color: COLORS.ink }}>{itemObj.item.name}</span>
                                  <span style={{ color: COLORS.muted, fontSize: 11, marginLeft: 6 }}>({itemObj.caption})</span>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                  <span style={{ fontWeight: 700, color: COLORS.ink }}>{idr(itemObj.cost)}</span>
                                  <button
                                    onClick={() => removeItemFromDay(dIdx, itemObj)}
                                    title="Remove item"
                                    style={{
                                      background: "none",
                                      border: "none",
                                      color: COLORS.coral,
                                      cursor: "pointer",
                                      padding: 0,
                                      display: "flex",
                                    }}
                                  >
                                    <X size={14} />
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

            {/* Catalog Item Search */}
            <div style={{ position: "relative", marginBottom: 12 }}>
              <Search size={15} color={COLORS.muted} style={{ position: "absolute", left: 12, top: 11 }} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Search items to add to ${activeDay.title}…`}
                style={{
                  width: "100%",
                  padding: "10px 12px 10px 34px",
                  borderRadius: 12,
                  border: `1px solid ${COLORS.oceanLight}`,
                  background: COLORS.ocean,
                  color: COLORS.sand,
                  fontSize: 13.5,
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {/* Catalog Accordions */}
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
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "13px 15px",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
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
                      <ChevronDown
                        size={17}
                        color={COLORS.sand}
                        style={{ transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.15s" }}
                      />
                    </button>

                    {isOpen && (
                      <div style={{ background: COLORS.sand }}>
                        {cat.items.map((item) => {
                          const cfg = getConfig(item.id, cat.id, item.name);
                          const selected = isSelected(cfg);

                          return (
                            <div key={item.id} style={{ borderTop: `1px solid ${COLORS.line}`, padding: "10px 15px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                              <div>
                                <div style={{ fontSize: 13, color: COLORS.ink, fontWeight: 500 }}>{item.name}</div>
                                <div style={{ fontSize: 11.5, color: COLORS.muted }}>{ruleCaption(item, cfg, totalPax)}</div>
                              </div>
                              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                {cfg.mode === "flat" ? (
                                  <>
                                    <button onClick={() => setItemQty(item.id, cat.id, item.name, (cfg.qty || 0) - 1)} style={stepBtn(COLORS.deep, COLORS.sand)}>
                                      <Minus size={12} />
                                    </button>
                                    <span style={{ minWidth: 16, textAlign: "center", fontSize: 13, fontWeight: 600, color: COLORS.ink }}>{cfg.qty || 0}</span>
                                    <button onClick={() => setItemQty(item.id, cat.id, item.name, (cfg.qty || 0) + 1)} style={stepBtn(COLORS.coral, COLORS.sand)}>
                                      <Plus size={12} />
                                    </button>
                                  </>
                                ) : (
                                  <button onClick={() => toggleInclude(item.id, cat.id, item.name, cfg)} style={{ padding: "5px 12px", borderRadius: 8, border: "none", background: selected ? COLORS.profit : COLORS.coral, color: "#FFF", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
                                    {selected ? "Selected ✓" : "+ Add"}
                                  </button>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* WhatsApp Quote Text Area Export */}
            <div style={{ background: COLORS.oceanLight, borderRadius: 18, padding: 16, marginTop: 18 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <span style={{ fontWeight: 700, fontSize: 14, color: COLORS.sand }}>WhatsApp Quote Export</span>
                <button
                  onClick={() => copyTextToClipboard(displayQuotationText)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    background: COLORS.coral,
                    color: COLORS.sand,
                    border: "none",
                    borderRadius: 8,
                    padding: "6px 12px",
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? "Copied!" : "Copy Text"}
                </button>
              </div>
              <textarea
                value={displayQuotationText}
                onChange={(e) => updateCurrentQuote({ customQuoteText: e.target.value })}
                rows={10}
                style={{
                  width: "100%",
                  padding: 12,
                  borderRadius: 10,
                  border: `1px solid ${COLORS.line}`,
                  fontSize: 12.5,
                  fontFamily: "monospace",
                  color: COLORS.ink,
                  background: "#FCFAF3",
                  resize: "vertical",
                  boxSizing: "border-box",
                }}
              />
            </div>
          </div>
        )}

        {/* PAGE 2: DASHBOARD */}
        {currentPage === "dashboard" && (
          <div>
            {/* KPI Analytics */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12, marginBottom: 20 }}>
              <div style={{ background: COLORS.sand, borderRadius: 14, padding: 16, boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, color: COLORS.muted, fontSize: 12, fontWeight: 600 }}>
                  <TrendingUp size={16} color={COLORS.profit} />
                  Confirmed Revenue
                </div>
                <div style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 700, color: COLORS.ink, marginTop: 4 }}>
                  {idr(dashboardStats.totalRev)}
                </div>
              </div>

              <div style={{ background: COLORS.sand, borderRadius: 14, padding: 16, boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, color: COLORS.muted, fontSize: 12, fontWeight: 600 }}>
                  <DollarSign size={16} color={COLORS.coral} />
                  Estimated Profit
                </div>
                <div style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 700, color: COLORS.profit, marginTop: 4 }}>
                  {idr(dashboardStats.totalProfit)}
                </div>
              </div>

              <div style={{ background: COLORS.sand, borderRadius: 14, padding: 16, boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, color: COLORS.muted, fontSize: 12, fontWeight: 600 }}>
                  <CheckCircle2 size={16} color={COLORS.confirmedText} />
                  Confirmed Tours
                </div>
                <div style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 700, color: COLORS.ink, marginTop: 4 }}>
                  {dashboardStats.totalConfirmed} / {dashboardStats.totalSaved}
                </div>
              </div>

              <div style={{ background: COLORS.sand, borderRadius: 14, padding: 16, boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, color: COLORS.muted, fontSize: 12, fontWeight: 600 }}>
                  <FileSpreadsheet size={16} color={COLORS.coralSoft} />
                  Conversion Rate
                </div>
                <div style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 700, color: COLORS.ink, marginTop: 4 }}>
                  {dashboardStats.conversionRate}%
                </div>
              </div>
            </div>

            {/* Saved Quotes History */}
            <div style={{ background: COLORS.sand, borderRadius: 16, padding: 16, boxShadow: "0 6px 18px rgba(0,0,0,0.2)" }}>
              <h3 style={{ margin: "0 0 14px", fontFamily: "'Fraunces', serif", fontSize: 18, color: COLORS.ink }}>
                Saved Booking & Quote History
              </h3>

              {savedHistory.length === 0 ? (
                <div style={{ textAlign: "center", padding: "30px 10px", color: COLORS.muted, fontSize: 13 }}>
                  No saved quotes found yet. Open the Costing Simulator and click <strong>"Save Quote"</strong> to record quotes here.
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {savedHistory.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        background: COLORS.sandDeep,
                        borderRadius: 12,
                        padding: 12,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: 10,
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 14, color: COLORS.ink }}>
                          {item.title}
                        </div>
                        <div style={{ fontSize: 11.5, color: COLORS.muted, marginTop: 2 }}>
                          🗓 Tour Date: <strong>{item.activityDate || "TBA"}</strong> · {item.days?.length || 1} Day(s) · {item.adults || 2} Pax
                          {(item.pic || item.agent) && (
                            <span style={{ marginLeft: 8 }}>
                              {item.pic && <span>| 👤 PIC: <strong>{item.pic}</strong> </span>}
                              {item.agent && <span>| 🏢 Agent: <strong>{item.agent}</strong></span>}
                            </span>
                          )}
                        </div>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ textAlign: "right" }}>
                          <div style={{ fontWeight: 700, fontSize: 15, color: COLORS.ink }}>
                            {idr(item.calculatedPrice || 0)}
                          </div>
                          {/* EDITABLE STATUS DROPDOWN ON DASHBOARD */}
                          <select
                            value={item.status || "Draft"}
                            onChange={(e) => updateSavedQuoteStatus(item.id, e.target.value)}
                            style={{
                              fontSize: 11,
                              fontWeight: 700,
                              padding: "2px 6px",
                              borderRadius: 6,
                              border: `1px solid ${COLORS.line}`,
                              background: item.status === "Confirmed" ? COLORS.profit : COLORS.sand,
                              color: item.status === "Confirmed" ? "#FFF" : COLORS.ink,
                              cursor: "pointer",
                              marginTop: 2,
                            }}
                          >
                            <option value="Draft">Draft</option>
                            <option value="Sent">Sent</option>
                            <option value="Confirmed">Confirmed ✅</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </div>

                        <div style={{ display: "flex", gap: 6 }}>
                          <button
                            onClick={() => loadQuoteFromHistory(item)}
                            title="Load quote into simulator"
                            style={{
                              padding: "6px 10px",
                              borderRadius: 8,
                              border: "none",
                              background: COLORS.ocean,
                              color: COLORS.sand,
                              fontSize: 12,
                              fontWeight: 700,
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              gap: 4,
                            }}
                          >
                            <Eye size={13} /> Load
                          </button>
                          <button
                            onClick={() => deleteQuoteFromHistory(item.id)}
                            style={{
                              padding: "6px",
                              borderRadius: 8,
                              border: "none",
                              background: "none",
                              color: COLORS.coral,
                              cursor: "pointer",
                            }}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* PAGE 3: CATALOG & SHORTCUTS MANAGER (GOD/ADMIN ONLY) */}
        {currentPage === "catalog" && isAdminOrGod && (
          <div style={{ background: COLORS.sand, borderRadius: 18, padding: 18, boxShadow: "0 8px 24px rgba(0,0,0,0.25)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, flexWrap: "wrap", gap: 10 }}>
              <div>
                <h2 style={{ margin: 0, fontFamily: "'Fraunces', serif", fontSize: 20, color: COLORS.ink }}>
                  Master Vendor & Package Shortcuts Manager
                </h2>
                <p style={{ margin: "2px 0 0", fontSize: 12, color: COLORS.muted }}>
                  Manage item prices, custom package shortcuts, pricing rules, and capacity limits.
                </p>
              </div>

              <button
                onClick={handleResetCatalogToDefault}
                style={{
                  background: "none",
                  border: `1px solid ${COLORS.line}`,
                  color: COLORS.coral,
                  borderRadius: 8,
                  padding: "6px 12px",
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Reset Defaults
              </button>
            </div>

            {/* PACKAGE SHORTCUTS (PRESETS) MANAGEMENT CARD */}
            <div style={{ background: COLORS.sandDeep, borderRadius: 14, padding: 14, marginBottom: 18 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, flexWrap: "wrap", gap: 8 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: COLORS.ink, display: "flex", alignItems: "center", gap: 6 }}>
                  <Sparkles size={16} color={COLORS.coral} />
                  Package Shortcuts (Presets) Manager
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  <input
                    type="text"
                    placeholder="New preset name..."
                    value={newPresetLabel}
                    onChange={(e) => setNewPresetLabel(e.target.value)}
                    style={{ padding: "5px 8px", borderRadius: 6, border: `1px solid ${COLORS.line}`, fontSize: 12 }}
                  />
                  <button
                    onClick={createNewPresetFromCatalog}
                    style={{
                      padding: "5px 10px",
                      borderRadius: 6,
                      background: COLORS.coral,
                      color: "#FFF",
                      border: "none",
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    + Add Preset
                  </button>
                </div>
              </div>

              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {presets.map((p) => (
                  <div
                    key={p.id}
                    style={{
                      background: "#FFF",
                      borderRadius: 10,
                      padding: "8px 12px",
                      border: `1px solid ${COLORS.line}`,
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 12.5, color: COLORS.ink }}>{p.label}</div>
                      <div style={{ fontSize: 11, color: COLORS.muted }}>{p.picks?.length || 0} items included</div>
                    </div>
                    <button
                      onClick={() => openPresetEditor(p)}
                      title="Edit included items"
                      style={{ background: "none", border: "none", color: COLORS.ocean, cursor: "pointer", padding: 2 }}
                    >
                      <Pencil size={13} />
                    </button>
                    <button
                      onClick={() => deletePreset(p.id)}
                      title="Delete preset"
                      style={{ background: "none", border: "none", color: COLORS.coral, cursor: "pointer", padding: 2 }}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Catalog Fast Search Input */}
            <div style={{ position: "relative", marginBottom: 14 }}>
              <Search size={15} color={COLORS.muted} style={{ position: "absolute", left: 12, top: 11 }} />
              <input
                value={catalogQuery}
                onChange={(e) => setCatalogQuery(e.target.value)}
                placeholder="Search vendor items or categories in catalog..."
                style={{
                  width: "100%",
                  padding: "10px 12px 10px 34px",
                  borderRadius: 12,
                  border: `1px solid ${COLORS.line}`,
                  background: "#FFF",
                  color: COLORS.ink,
                  fontSize: 13.5,
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
              {catalogQuery && (
                <button
                  onClick={() => setCatalogQuery("")}
                  style={{
                    position: "absolute",
                    right: 12,
                    top: 10,
                    background: "none",
                    border: "none",
                    color: COLORS.muted,
                    cursor: "pointer",
                  }}
                >
                  <X size={15} />
                </button>
              )}
            </div>

            {/* Category Adder */}
            <div style={{ background: COLORS.sandDeep, borderRadius: 12, padding: 12, marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: COLORS.ink, marginBottom: 6 }}>
                + Create New Category
              </label>
              <div style={{ display: "flex", gap: 8 }}>
                <input
                  type="text"
                  placeholder="e.g. Helicopter & Private Jet Charters"
                  value={newCatTitle}
                  onChange={(e) => setNewCatTitle(e.target.value)}
                  style={{ flex: 1, padding: "8px 10px", borderRadius: 8, border: `1px solid ${COLORS.line}`, fontSize: 12.5 }}
                />
                <button
                  onClick={handleAddCategory}
                  style={{
                    padding: "8px 14px",
                    borderRadius: 8,
                    background: COLORS.coral,
                    color: COLORS.sand,
                    border: "none",
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Add Category
                </button>
              </div>
            </div>

            {/* Catalog Categories */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {searchedCatalog.map((cat) => (
                <div key={cat.id} style={{ background: "#FFF", borderRadius: 12, padding: 12, border: `1px solid ${COLORS.line}` }}>
                  <div style={{ fontWeight: 700, fontSize: 13, color: COLORS.ocean, marginBottom: 8, borderBottom: `1px solid ${COLORS.line}`, paddingBottom: 4 }}>
                    {cat.title} ({cat.items.length} items)
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 10 }}>
                    {cat.items.map((item) => {
                      const effectiveRule = getAutoRuleForItem(cat.id, item.name, item);
                      const isEditingRule = editingItemRuleId === item.id;

                      return (
                        <div key={item.id} style={{ background: COLORS.sand, borderRadius: 8, padding: "8px 10px", border: `1px solid ${COLORS.line}` }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                            <input
                              type="text"
                              value={item.name}
                              onChange={(e) => handleUpdateItemName(cat.id, item.id, e.target.value)}
                              style={{ flex: 1, minWidth: 140, padding: "5px 7px", borderRadius: 6, border: `1px solid ${COLORS.line}`, fontSize: 12, fontWeight: 600 }}
                            />
                            
                            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                              <span style={{ fontSize: 11, color: COLORS.muted }}>Price:</span>
                              <input
                                type="text"
                                value={item.price}
                                onChange={(e) => handleUpdateItemPrice(cat.id, item.id, e.target.value)}
                                style={{ width: 100, padding: "5px 7px", borderRadius: 6, border: `1px solid ${COLORS.line}`, fontSize: 12, textAlign: "right", fontWeight: 700 }}
                              />
                            </div>

                            {/* Rule badge & settings toggle */}
                            <button
                              onClick={() => setEditingItemRuleId(isEditingRule ? null : item.id)}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 4,
                                padding: "4px 8px",
                                borderRadius: 6,
                                background: isEditingRule ? COLORS.coral : COLORS.sandDeep,
                                color: isEditingRule ? COLORS.sand : COLORS.ink,
                                border: `1px solid ${COLORS.line}`,
                                fontSize: 11,
                                fontWeight: 600,
                                cursor: "pointer",
                              }}
                            >
                              <Settings2 size={12} />
                              <span>
                                {effectiveRule.mode === "pax"
                                  ? "Per Pax"
                                  : effectiveRule.mode === "unit"
                                  ? `Shared Unit (${effectiveRule.capacity} pax/unit)`
                                  : effectiveRule.mode === "tier"
                                  ? `Tiered (${effectiveRule.threshold} base)`
                                  : "Manual Qty"}
                              </span>
                            </button>

                            <button
                              onClick={() => handleDeleteItemFromCatalog(cat.id, item.id)}
                              style={{ background: "none", border: "none", color: COLORS.coral, cursor: "pointer", padding: 2 }}
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>

                          {/* Rule configuration drawer */}
                          {isEditingRule && (
                            <div style={{ marginTop: 8, paddingTop: 8, borderTop: `1px dashed ${COLORS.line}`, fontSize: 12 }}>
                              <div style={{ fontWeight: 600, color: COLORS.ink, marginBottom: 6 }}>
                                Default Master Pricing Rule for "{item.name}":
                              </div>
                              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 8 }}>
                                {[
                                  { mode: "pax", label: "Per Pax" },
                                  { mode: "unit", label: "Shared per Unit" },
                                  { mode: "flat", label: "Manual Qty" },
                                  { mode: "tier", label: "Tiered (Base + Extra)" },
                                ].map(({ mode, label }) => (
                                  <button
                                    key={mode}
                                    onClick={() => handleUpdateItemRule(cat.id, item.id, { mode })}
                                    style={{
                                      padding: "4px 8px",
                                      borderRadius: 6,
                                      fontSize: 11,
                                      fontWeight: 600,
                                      border: `1px solid ${effectiveRule.mode === mode ? COLORS.coral : COLORS.line}`,
                                      background: effectiveRule.mode === mode ? COLORS.coral : COLORS.sand,
                                      color: effectiveRule.mode === mode ? COLORS.sand : COLORS.ink,
                                      cursor: "pointer",
                                    }}
                                  >
                                    {label}
                                  </button>
                                ))}
                              </div>

                              {effectiveRule.mode === "unit" && (
                                <div style={{ display: "flex", alignItems: "center", gap: 6, color: COLORS.ink }}>
                                  <span>Unit capacity:</span>
                                  <input
                                    type="number"
                                    min={1}
                                    value={item.capacity ?? effectiveRule.capacity}
                                    onChange={(e) => handleUpdateItemRule(cat.id, item.id, { capacity: Math.max(1, Number(e.target.value)) })}
                                    style={{ width: 50, padding: "3px 5px", borderRadius: 6, border: `1px solid ${COLORS.line}`, textAlign: "center" }}
                                  />
                                  <span style={{ fontSize: 11, color: COLORS.muted }}>pax per unit (e.g., 4 pax/car, 2 pax/room)</span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Add item to category */}
                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    <input
                      type="text"
                      placeholder="New item name..."
                      value={newItemData.catId === cat.id ? newItemData.name : ""}
                      onChange={(e) => setNewItemData({ catId: cat.id, name: e.target.value, price: newItemData.price })}
                      style={{ flex: 1, padding: "5px 8px", borderRadius: 6, border: `1px solid ${COLORS.line}`, fontSize: 12 }}
                    />
                    <input
                      type="text"
                      placeholder="Price"
                      value={newItemData.catId === cat.id ? newItemData.price : ""}
                      onChange={(e) => setNewItemData({ catId: cat.id, name: newItemData.name, price: e.target.value })}
                      style={{ width: 90, padding: "5px 8px", borderRadius: 6, border: `1px solid ${COLORS.line}`, fontSize: 12 }}
                    />
                    <button
                      onClick={() => handleAddItemToCategory(cat.id)}
                      style={{
                        padding: "5px 12px",
                        borderRadius: 6,
                        background: COLORS.ocean,
                        color: COLORS.sand,
                        border: "none",
                        fontSize: 12,
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      + Add Item
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PAGE 4: GOD USER PERMISSIONS PAGE (EXCLUSIVE TO GOD) */}
        {currentPage === "users" && isGodUser && (
          <div style={{ background: COLORS.sand, borderRadius: 18, padding: 18, boxShadow: "0 8px 24px rgba(0,0,0,0.25)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <ShieldAlert size={26} color={COLORS.coral} />
              <div>
                <h2 style={{ margin: 0, fontFamily: "'Fraunces', serif", fontSize: 20, color: COLORS.ink }}>
                  GOD Permission & Account Governance
                </h2>
                <p style={{ margin: "2px 0 0", fontSize: 12, color: COLORS.muted }}>
                  Create new accounts directly, manage staff roles, and revoke system access.
                </p>
              </div>
            </div>

            {/* Direct Add New Account Form */}
            <div style={{ background: COLORS.sandDeep, borderRadius: 14, padding: 16, marginBottom: 20, border: `1px solid ${COLORS.line}` }}>
              <h3 style={{ margin: "0 0 10px", fontSize: 14, color: COLORS.ink, display: "flex", alignItems: "center", gap: 6 }}>
                <UserPlus size={16} color={COLORS.coral} /> Create New User Account
              </h3>

              {userNotice.text && (
                <div
                  style={{
                    padding: "8px 12px",
                    borderRadius: 8,
                    marginBottom: 12,
                    fontSize: 12,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    background: userNotice.type === "error" ? "#FFEBEE" : "#E8F5E9",
                    color: userNotice.type === "error" ? "#C62828" : "#2E7D32",
                    border: `1px solid ${userNotice.type === "error" ? "#EF9A9A" : "#A5D6A7"}`,
                  }}
                >
                  {userNotice.type === "error" ? <AlertCircle size={14} /> : <CheckCircle size={14} />}
                  <span>{userNotice.text}</span>
                </div>
              )}

              <form onSubmit={handleAdminCreateUser} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 10, alignItems: "end" }}>
                <div>
                  <label style={{ display: "block", fontSize: 11.5, fontWeight: 700, color: COLORS.ink, marginBottom: 4 }}>Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Wayman Reservations"
                    value={newUserForm.name}
                    onChange={(e) => setNewUserForm({ ...newUserForm, name: e.target.value })}
                    style={{ width: "100%", padding: "7px 9px", borderRadius: 8, border: `1px solid ${COLORS.line}`, fontSize: 12, boxSizing: "border-box" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 11.5, fontWeight: 700, color: COLORS.ink, marginBottom: 4 }}>Username</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. wayman"
                    value={newUserForm.username}
                    onChange={(e) => setNewUserForm({ ...newUserForm, username: e.target.value })}
                    style={{ width: "100%", padding: "7px 9px", borderRadius: 8, border: `1px solid ${COLORS.line}`, fontSize: 12, boxSizing: "border-box" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 11.5, fontWeight: 700, color: COLORS.ink, marginBottom: 4 }}>Email (Optional)</label>
                  <input
                    type="email"
                    placeholder="wayman@company.com"
                    value={newUserForm.email}
                    onChange={(e) => setNewUserForm({ ...newUserForm, email: e.target.value })}
                    style={{ width: "100%", padding: "7px 9px", borderRadius: 8, border: `1px solid ${COLORS.line}`, fontSize: 12, boxSizing: "border-box" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 11.5, fontWeight: 700, color: COLORS.ink, marginBottom: 4 }}>Role Permission</label>
                  <select
                    value={newUserForm.role}
                    onChange={(e) => setNewUserForm({ ...newUserForm, role: e.target.value })}
                    style={{ width: "100%", padding: "7px 9px", borderRadius: 8, border: `1px solid ${COLORS.line}`, fontSize: 12, fontWeight: 700, background: "#FFF" }}
                  >
                    <option value="Staff">Staff (Quotes & Dashboard)</option>
                    <option value="Admin">Admin (+ Catalog Editing)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  style={{
                    padding: "8px 12px",
                    borderRadius: 8,
                    border: "none",
                    background: COLORS.coral,
                    color: "#FFF",
                    fontWeight: 700,
                    fontSize: 12.5,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                    height: 34,
                  }}
                >
                  <UserPlus size={14} /> Add User
                </button>
              </form>
            </div>

            {/* All Accounts Governance Table */}
            <h3 style={{ margin: "0 0 10px", fontSize: 15, color: COLORS.ink }}>
              All Authorized System Accounts
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {usersList.map((user) => (
                <div
                  key={user.id}
                  style={{
                    background: COLORS.sandDeep,
                    borderRadius: 12,
                    padding: 12,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 10,
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 13.5, color: COLORS.ink, display: "flex", alignItems: "center", gap: 6 }}>
                      {user.role === "GOD" && <ShieldAlert size={14} color={COLORS.coral} />}
                      {user.role === "Admin" && <ShieldCheck size={14} color={COLORS.ocean} />}
                      {user.role === "Staff" && <User size={14} color={COLORS.muted} />}
                      {user.name}
                      <span style={{ fontSize: 11, color: COLORS.muted }}>({user.username})</span>
                    </div>
                    <div style={{ fontSize: 11.5, color: COLORS.muted, marginTop: 2 }}>
                      {user.email} · Role: <strong>{user.role}</strong>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    {user.role !== "GOD" ? (
                      <>
                        <select
                          value={user.role}
                          onChange={(e) => updateUserRoleAndStatus(user.id, e.target.value, user.status)}
                          style={{
                            padding: "4px 8px",
                            borderRadius: 6,
                            border: `1px solid ${COLORS.line}`,
                            fontSize: 12,
                            fontWeight: 700,
                            background: "#FFF",
                            color: COLORS.ink,
                          }}
                        >
                          <option value="Staff">Staff</option>
                          <option value="Admin">Admin</option>
                        </select>

                        <select
                          value={user.status}
                          onChange={(e) => updateUserRoleAndStatus(user.id, user.role, e.target.value)}
                          style={{
                            padding: "4px 8px",
                            borderRadius: 6,
                            border: `1px solid ${COLORS.line}`,
                            fontSize: 12,
                            fontWeight: 700,
                            background: user.status === "Approved" ? COLORS.profit : COLORS.coral,
                            color: "#FFF",
                          }}
                        >
                          <option value="Approved">Approved</option>
                          <option value="Blocked">Blocked</option>
                        </select>

                        <button
                          onClick={() => deleteUserAccount(user.id)}
                          title="Delete user"
                          style={{ background: "none", border: "none", color: COLORS.coral, cursor: "pointer", padding: 2 }}
                        >
                          <Trash2 size={15} />
                        </button>
                      </>
                    ) : (
                      <span style={{ fontSize: 11.5, fontWeight: 700, color: COLORS.coral, background: "#FFF", padding: "4px 10px", borderRadius: 6 }}>
                        Master GOD Account
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* PRESET SHORTCUT EDITING MODAL */}
      {editingPreset && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.65)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: 16,
          }}
        >
          <div
            style={{
              background: COLORS.sand,
              borderRadius: 18,
              width: "100%",
              maxWidth: 520,
              maxHeight: "85vh",
              overflowY: "auto",
              padding: 20,
              boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <h3 style={{ margin: 0, fontFamily: "'Fraunces', serif", fontSize: 18, color: COLORS.ink }}>
                Edit Shortcut: {editingPreset.label}
              </h3>
              <button onClick={() => setEditingPreset(null)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                <X size={18} color={COLORS.muted} />
              </button>
            </div>

            <div style={{ marginBottom: 14 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: COLORS.ink, marginBottom: 4 }}>
                Shortcut Title
              </label>
              <input
                type="text"
                value={editingPreset.label}
                onChange={(e) => setEditingPreset({ ...editingPreset, label: e.target.value })}
                style={{ width: "100%", padding: "8px 10px", borderRadius: 8, border: `1px solid ${COLORS.line}`, fontSize: 13 }}
              />
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: COLORS.ink, marginBottom: 8 }}>
                Select Included Catalog Items for this Shortcut:
              </label>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, maxHeight: 300, overflowY: "auto" }}>
                {catalog.map((cat) => (
                  <div key={cat.id} style={{ background: COLORS.sandDeep, borderRadius: 10, padding: 10 }}>
                    <div style={{ fontWeight: 700, fontSize: 12, color: COLORS.ocean, marginBottom: 6 }}>
                      {cat.title}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                      {cat.items.map((item) => {
                        const key = `${cat.id}:::${item.name}`;
                        const isChecked = !!editingPreset.picksMap[key];
                        return (
                          <label key={item.id} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: COLORS.ink, cursor: "pointer" }}>
                            <input
                              type="checkbox"
                              checked={isChecked}
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

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
              <button
                onClick={() => setEditingPreset(null)}
                style={{ padding: "8px 14px", borderRadius: 8, border: `1px solid ${COLORS.line}`, background: "transparent", color: COLORS.muted, cursor: "pointer", fontSize: 12, fontWeight: 600 }}
              >
                Cancel
              </button>
              <button
                onClick={saveEditedPreset}
                style={{ padding: "8px 16px", borderRadius: 8, border: "none", background: COLORS.coral, color: "#FFF", cursor: "pointer", fontSize: 12, fontWeight: 700 }}
              >
                Save Shortcut Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}