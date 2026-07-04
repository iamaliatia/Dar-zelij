/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Calculator, 
  Layers, 
  Image as ImageIcon, 
  MessageSquare, 
  Phone, 
  MapPin, 
  Clock, 
  CheckCircle, 
  Sliders, 
  Settings, 
  Users, 
  FileText, 
  Sparkles,
  ChevronRight,
  TrendingUp,
  Briefcase,
  X,
  Database,
  ArrowRight,
  Printer,
  Search
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { Product, Project, SampleRequest } from "./types";

// Core initial product list with local image references and theme-appropriate Unsplash images
const INITIAL_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "زليج فاسي تقليدي — أزرق مجريطي",
    category: "زليج",
    price: "180 د.م./م²",
    priceNum: 180,
    unit: "م²",
    description: "نقشة نجمية تقليدية بألوان الأزرق والأبيض اللامع، مناسبة للنافورات والأرضيات والجدران الأندلسية.",
    image: "/src/assets/images/blue_zellige_1783187248822.jpg",
    dimensions: "10×10 سم / 5×5 سم",
    inStock: true
  },
  {
    id: "2",
    name: "زليج فاسي — أخضر وذهبي",
    category: "زليج",
    price: "200 د.م./م²",
    priceNum: 200,
    unit: "م²",
    description: "تركيبة كلاسيكية فاخرة تجمع بين اللون الأخضر الملكي والذهبي الأصفر للحمامات والنوافير الداخلية والرياض المغربي.",
    image: "/src/assets/images/green_zellige_1783187263120.jpg",
    dimensions: "10×10 سم",
    inStock: true
  },
  {
    id: "3",
    name: "رخام كرارة الإيطالي الأبيض",
    category: "رخام",
    price: "750 د.م./م²",
    priceNum: 750,
    unit: "م²",
    description: "رخام إيطالي فاخر ذو عروق رمادية متقاطعة وأنيقة، مثالي لتبليط الصالونات الكبرى والواجهات والدرج الفاخر.",
    image: "/src/assets/images/carrara_marble_1783187214465.jpg",
    dimensions: "60×60 / 60×120 سم",
    inStock: true
  },
  {
    id: "4",
    name: "رخام أسود مطعّم بالذهبي",
    category: "رخام",
    price: "900 د.م./م²",
    priceNum: 900,
    unit: "م²",
    description: "رخام أسود فخم ذو عروق ذهبية وبرونزية براقة، يضفي لمسة عصرية وفخامة استثنائية على مداخل الفنادق والقصور.",
    image: "/src/assets/images/black_gold_marble_1783187230357.jpg",
    dimensions: "60×60 سم",
    inStock: true
  },
  {
    id: "5",
    name: "رخام أونيكس شفاف",
    category: "رخام",
    price: "1500 د.م./م²",
    priceNum: 1500,
    unit: "م²",
    description: "رخام أونيكس نادر ومميز شبه شفاف يسمح بمرور الضوء، يستخدم في تصميم الإضاءة الخلفية للبارات والتحف الجدارية.",
    image: "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?w=600&auto=format&fit=crop&q=80",
    dimensions: "حسب المقاس والطلب",
    inStock: true
  },
  {
    id: "6",
    name: "زليج معاصر — أحادي اللون",
    category: "زليج",
    price: "150 د.م./م²",
    priceNum: 150,
    unit: "م²",
    description: "بلاطات زليج بنقوش عصرية مبسطة وألوان أحادية دافئة للمطابخ الحديثة والفلل الراقية ذات الطابع المينيماليستي.",
    image: "https://images.unsplash.com/photo-1502005229762-fc1b2b812ca5?w=600&auto=format&fit=crop&q=80",
    dimensions: "20×20 سم",
    inStock: true
  },
  {
    id: "7",
    name: "رخام مغربي محلي — بيج ملكي",
    category: "رخام",
    price: "320 د.م./م²",
    priceNum: 320,
    unit: "م²",
    description: "رخام محلي مستخرج من جبال الأطلس المغربية، يتميز بمتانة عالية ولون بيج دافئ ومثالي للمشاريع السكنية الكبرى والمجتمعية.",
    image: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?w=600&auto=format&fit=crop&q=80",
    dimensions: "40×40 / 60×60 سم",
    inStock: true
  },
  {
    id: "8",
    name: "قاطعة زليج يدوية احترافية",
    category: "معدات التركيب",
    price: "450 د.م./قطعة",
    priceNum: 450,
    unit: "قطعة",
    description: "قاطعة يدوية ذات جودة صناعية عالية لقص قطع الزليج بدقة بالغة وبأشكال هندسية مخصصة، أساسية لعمل الصناع والحرفيين.",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80",
    dimensions: "مقاس قياسي",
    inStock: true
  },
  {
    id: "9",
    name: "غراء وإسمنت لاصق للرخام والزليج",
    category: "معدات التركيب",
    price: "90 د.م./كيس",
    priceNum: 90,
    unit: "كيس",
    description: "مادة لاصقة اسمنتية عالية التماسك مخصصة لتركيب الزليج والرخام الفاخر على الجدران والأرضيات، ومقاومة للرطوبة والمياه.",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&auto=format&fit=crop&q=80",
    dimensions: "كيس وزن 25 كجم",
    inStock: true
  },
  {
    id: "10",
    name: "مادة الجلوين لسد فواصل الزليج",
    category: "معدات التركيب",
    price: "60 د.م./كيس",
    priceNum: 60,
    unit: "كيس",
    description: "مسحوق ملء الفواصل الجصي عالي الجودة بألوان متنوعة (أزرق، أخضر، أبيض) متناسبة مع ألوان الزليج المغربي لتشطيب متناسق.",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&auto=format&fit=crop&q=80",
    dimensions: "عبوة 5 كجم",
    inStock: true
  }
];

const INITIAL_PROJECTS: Project[] = [
  {
    id: "1",
    name: "جدران ونوافير فيلا خاصة",
    type: "فيلات",
    image: "/src/assets/images/blue_zellige_1783187248822.jpg",
    client: "مجموعة بنجلون العقارية",
    completionDate: "2025-11-12"
  },
  {
    id: "2",
    name: "مساحات بهو فندق المنصور الذهبي",
    type: "فنادق",
    image: "/src/assets/images/black_gold_marble_1783187230357.jpg",
    client: "فندق المنصور 5 نجوم",
    completionDate: "2026-03-01"
  },
  {
    id: "3",
    name: "محراب وفناء مسجد النور الكبير",
    type: "مساجد",
    image: "/src/assets/images/green_zellige_1783187263120.jpg",
    client: "وزارة الأوقاف والشؤون الإسلامية",
    completionDate: "2025-08-20"
  },
  {
    id: "4",
    name: "مكاتب شركة طاقة المغرب الإدارية",
    type: "مكاتب",
    image: "/src/assets/images/carrara_marble_1783187214465.jpg",
    client: "طاقة المغرب ش.م.",
    completionDate: "2026-01-15"
  }
];

const INITIAL_INQUIRIES: SampleRequest[] = [
  {
    id: "req_1",
    clientName: "طارق اليوسفي",
    phone: "+212661908070",
    city: "الرباط",
    productName: "زليج فاسي تقليدي — أزرق مجريطي",
    notes: "نحتاج عينة لمشروع فندق بوتيك بالمدينة العتيقة لتأكيد موافقة المهندس.",
    createdAt: "2026-07-03T14:30:00Z",
    status: "جديد"
  },
  {
    id: "req_2",
    clientName: "سعاد بنجلون",
    phone: "+212662453525",
    city: "الدار البيضاء",
    productName: "رخام كرارة الإيطالي الأبيض",
    notes: "الكمية المطلوبة حوالي 150 متر مربع لصالة استقبال فيلا خاصة بدار بوعزة.",
    createdAt: "2026-07-04T09:15:00Z",
    status: "قيد المعالجة"
  }
];

export default function App() {
  // State backing
  const [products, setProducts] = useState<Product[]>(() => {
    const local = localStorage.getItem("dar_zellige_products");
    return local ? JSON.parse(local) : INITIAL_PRODUCTS;
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    const local = localStorage.getItem("dar_zellige_projects");
    return local ? JSON.parse(local) : INITIAL_PROJECTS;
  });

  const [inquiries, setInquiries] = useState<SampleRequest[]>(() => {
    const local = localStorage.getItem("dar_zellige_inquiries");
    return local ? JSON.parse(local) : INITIAL_INQUIRIES;
  });

  // UI States
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
  const [activeCatalogFilter, setActiveCatalogFilter] = useState<string>("الكل");
  const [activeProjectFilter, setActiveProjectFilter] = useState<string>("الكل");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{
    type: "product" | "project" | "inquiry";
    id: string;
    name: string;
  } | null>(null);
  
  // Calculator States
  const [calcLength, setCalcLength] = useState<number>(5);
  const [calcWidth, setCalcWidth] = useState<number>(4);
  const [calcWaste, setCalcWaste] = useState<number>(10);
  const [selectedProductId, setSelectedProductId] = useState<string>("1");
  const [customTileSize, setCustomTileSize] = useState<number>(30);
  const [calcTileType, setCalcTileType] = useState<string>("30"); // "20" (zellige), "30", "40", "60" (marble), "custom"

  // Form States (Inquiry)
  const [clientName, setClientName] = useState<string>("");
  const [clientPhone, setClientPhone] = useState<string>("");
  const [clientCity, setClientCity] = useState<string>("");
  const [chosenProductInForm, setChosenProductInForm] = useState<string>("زليج فاسي تقليدي — أزرق مجريطي");
  const [additionalNotes, setAdditionalNotes] = useState<string>("");

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Admin CRUD Form States
  const [adminActiveTab, setAdminActiveTab] = useState<"products" | "projects" | "inquiries">("products");
  
  // Product Form State
  const [prodFormId, setProdFormId] = useState<string | null>(null);
  const [prodFormName, setProdFormName] = useState<string>("");
  const [prodFormCategory, setProdFormCategory] = useState<"زليج" | "رخام" | "معدات التركيب">("زليج");
  const [prodFormPriceNum, setProdFormPriceNum] = useState<number>(150);
  const [prodFormUnit, setProdFormUnit] = useState<string>("م²");
  const [prodFormDimensions, setProdFormDimensions] = useState<string>("20×20 سم");
  const [prodFormDescription, setProdFormDescription] = useState<string>("");
  const [prodFormImage, setProdFormImage] = useState<string>("");
  const [prodFormInStock, setProdFormInStock] = useState<boolean>(true);

  // Project Form State
  const [projFormId, setProjFormId] = useState<string | null>(null);
  const [projFormName, setProjFormName] = useState<string>("");
  const [projFormType, setProjFormType] = useState<"فيلات" | "فنادق" | "مساجد" | "مكاتب">("فيلات");
  const [projFormClient, setProjFormClient] = useState<string>("");
  const [projFormDate, setProjFormDate] = useState<string>("2026-01-01");
  const [projFormImage, setProjFormImage] = useState<string>("");

  // Professional Artwork & Pattern Generator Tool States
  const [showImgGenerator, setShowImgGenerator] = useState<boolean>(false);
  const [imgGeneratorTarget, setImgGeneratorTarget] = useState<"product" | "project">("product");
  const [imgGenPattern, setImgGenPattern] = useState<string>("star");
  const [imgGenPrimary, setImgGenPrimary] = useState<string>("#B8862E");
  const [imgGenSecondary, setImgGenSecondary] = useState<string>("#161513");
  const [imgGenTab, setImgGenTab] = useState<"vector" | "photos">("vector");

  // State to manage the active inquiry selected for print layout
  const [printTarget, setPrintTarget] = useState<SampleRequest | null>(null);
  const [printDriverName, setPrintDriverName] = useState<string>("مندوب دار الزليج المعتمد");
  const [printCustomNotes, setPrintCustomNotes] = useState<string>("يرجى التأكد من تسليم العينات داخل صندوق الحماية لضمان عدم الكسر.");
  
  // State to manage search input in the Admin Panel
  const [adminSearchQuery, setAdminSearchQuery] = useState<string>("");

  // Reusable custom Vector SVG pattern generator
  const generateCustomSVG = (pattern: string, primary: string, secondary: string) => {
    let svgContent = "";
    if (pattern === "star") {
      svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 100 100">
        <rect width="100" height="100" fill="${secondary}" />
        <defs>
          <pattern id="star-pattern" width="25" height="25" patternUnits="userSpaceOnUse">
            <rect width="25" height="25" fill="none" />
            <path d="M12.5,2 L16.5,9 L23,12.5 L16.5,16 L12.5,23 L8.5,16 L2,12.5 L8.5,9 Z" fill="${primary}" stroke="${secondary}" stroke-width="0.5" />
            <polygon points="12.5,0 25,12.5 12.5,25 0,12.5" fill="none" stroke="${primary}" stroke-width="0.3" opacity="0.3" />
            <circle cx="12.5" cy="12.5" r="1.5" fill="#E4DCC8" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#star-pattern)" />
        <rect width="100" height="100" fill="black" opacity="0.04" />
        <rect width="100" height="100" stroke="${primary}" stroke-width="2" fill="none" />
      </svg>`;
    } else if (pattern === "mosaic") {
      svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 100 100">
        <rect width="100" height="100" fill="${secondary}" />
        <defs>
          <pattern id="mosaic-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
            <rect width="20" height="20" fill="${secondary}" stroke="${primary}" stroke-width="0.4" />
            <rect x="3" y="3" width="14" height="14" fill="${primary}" opacity="0.8" />
            <polygon points="10,3 17,10 10,17 3,10" fill="#E4DCC8" opacity="0.9" />
            <circle cx="10" cy="10" r="1.5" fill="${secondary}" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#mosaic-pattern)" />
        <rect width="100" height="100" fill="black" opacity="0.03" />
        <rect width="100" height="100" stroke="${primary}" stroke-width="2" fill="none" />
      </svg>`;
    } else if (pattern === "marble") {
      svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 100 100">
        <rect width="100" height="100" fill="${secondary}" />
        <path d="M-10,30 Q30,42 60,12 T110,42" fill="none" stroke="${primary}" stroke-width="1.8" opacity="0.3" />
        <path d="M-10,30 Q30,42 60,12 T110,42" fill="none" stroke="${primary}" stroke-width="0.5" opacity="0.75" />
        <path d="M20,110 Q52,72 42,42 T92,-12" fill="none" stroke="${primary}" stroke-width="1.2" opacity="0.25" />
        <path d="M20,110 Q52,72 42,42 T92,-12" fill="none" stroke="${primary}" stroke-width="0.4" opacity="0.6" />
        <path d="M-10,80 C32,72 52,92 112,72" fill="none" stroke="${primary}" stroke-width="0.8" opacity="0.25" />
        <circle cx="30" cy="40" r="25" fill="white" filter="blur(15px)" opacity="0.08" />
        <rect width="100" height="100" stroke="${primary}" stroke-width="2" fill="none" />
      </svg>`;
    } else {
      svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 100 100">
        <rect width="100" height="100" fill="${secondary}" />
        <defs>
          <pattern id="chevron-pattern" width="20" height="20" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
            <rect width="10" height="20" fill="${primary}" stroke="${secondary}" stroke-width="0.5" />
            <rect x="10" width="10" height="20" fill="${secondary}" stroke="${primary}" stroke-width="0.5" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#chevron-pattern)" />
        <rect width="100" height="100" stroke="${primary}" stroke-width="2" fill="none" />
      </svg>`;
    }
    
    const base64Svg = btoa(unescape(encodeURIComponent(svgContent)));
    return `data:image/svg+xml;base64,${base64Svg}`;
  };

  // Curated list of premium architectural textures & photography presets
  const curatedPhotos = [
    {
      id: "cur_zellige_blue",
      name: "زليج فاس أزرق تقليدي",
      url: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80",
      tag: "زليج"
    },
    {
      id: "cur_zellige_green",
      name: "زليج زمردي ملكي",
      url: "https://images.unsplash.com/photo-1581428982868-e410dd047a90?w=600&auto=format&fit=crop&q=80",
      tag: "زليج"
    },
    {
      id: "cur_marble_white",
      name: "رخام كرارة أبيض إيطالي",
      url: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=600&auto=format&fit=crop&q=80",
      tag: "رخام"
    },
    {
      id: "cur_marble_gold",
      name: "رخام كلكتا ذهبي فاخر",
      url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80",
      tag: "رخام"
    },
    {
      id: "cur_terracotta",
      name: "طين فخاري طبيعي يدوي",
      url: "https://images.unsplash.com/photo-1501183007986-d0d080b147f9?w=600&auto=format&fit=crop&q=80",
      tag: "زليج"
    },
    {
      id: "cur_marble_dark",
      name: "رخام ماركينا أسود مذهب",
      url: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600&auto=format&fit=crop&q=80",
      tag: "رخام"
    },
    {
      id: "cur_villa_morocco",
      name: "فناء فيلا مغربية أندلسية",
      url: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&auto=format&fit=crop&q=80",
      tag: "فيلات"
    },
    {
      id: "cur_hotel_riad",
      name: "فندق ورياض مراكشي فاخر",
      url: "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?w=600&auto=format&fit=crop&q=80",
      tag: "فنادق"
    },
    {
      id: "cur_mosque_mihrab",
      name: "محراب مسجد مزخرف بالفسيفساء",
      url: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&auto=format&fit=crop&q=80",
      tag: "مساجد"
    },
    {
      id: "cur_modern_office",
      name: "مكتب هندسي حديث بلمسة رخام",
      url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format&fit=crop&q=80",
      tag: "مكاتب"
    }
  ];

  // Save to LocalStorage on changes
  useEffect(() => {
    localStorage.setItem("dar_zellige_products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem("dar_zellige_projects", JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem("dar_zellige_inquiries", JSON.stringify(inquiries));
  }, [inquiries]);

  // Toast helper
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Calculator logic
  const calcArea = calcLength * calcWidth;
  const calcAreaWithWaste = calcArea * (1 + calcWaste / 100);
  
  const tileSize = calcTileType === "custom" ? customTileSize : parseFloat(calcTileType);
  const tileAreaM2 = (tileSize / 100) * (tileSize / 100);
  const totalTilesNeeded = tileAreaM2 > 0 ? Math.ceil(calcAreaWithWaste / tileAreaM2) : 0;
  
  const activeCalcProduct = products.find(p => p.id === selectedProductId);
  const estimatedCost = activeCalcProduct ? calcAreaWithWaste * activeCalcProduct.priceNum : 0;

  // Compute number of inquiries with "جديد" status
  const newInquiriesCount = inquiries.filter(inq => inq.status === "جديد").length;

  // Filtered lists for the Admin Panel
  const adminFilteredProducts = React.useMemo(() => {
    return products.filter(p => {
      if (!adminSearchQuery.trim()) return true;
      const query = adminSearchQuery.toLowerCase();
      return (
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.dimensions.toLowerCase().includes(query) ||
        (p.description && p.description.toLowerCase().includes(query))
      );
    });
  }, [products, adminSearchQuery]);

  const adminFilteredProjects = React.useMemo(() => {
    return projects.filter(p => {
      if (!adminSearchQuery.trim()) return true;
      const query = adminSearchQuery.toLowerCase();
      return (
        p.name.toLowerCase().includes(query) ||
        p.client.toLowerCase().includes(query) ||
        p.type.toLowerCase().includes(query)
      );
    });
  }, [projects, adminSearchQuery]);

  const adminFilteredInquiries = React.useMemo(() => {
    return inquiries.filter(req => {
      if (!adminSearchQuery.trim()) return true;
      const query = adminSearchQuery.toLowerCase();
      return (
        req.clientName.toLowerCase().includes(query) ||
        req.phone.toLowerCase().includes(query) ||
        req.city.toLowerCase().includes(query) ||
        req.productName.toLowerCase().includes(query) ||
        (req.notes && req.notes.toLowerCase().includes(query))
      );
    });
  }, [inquiries, adminSearchQuery]);

  // Compute projects distribution by type for Recharts PieChart
  const projectStats = React.useMemo(() => {
    const counts: Record<string, number> = {
      "فيلات": 0,
      "فنادق": 0,
      "مساجد": 0,
      "مكاتب": 0,
    };
    projects.forEach((p) => {
      if (counts[p.type] !== undefined) {
        counts[p.type]++;
      } else {
        counts[p.type] = (counts[p.type] || 0) + 1;
      }
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [projects]);

  const PROJECT_COLORS: Record<string, string> = {
    "فيلات": "#B8862E",
    "فنادق": "#3B82F6",
    "مساجد": "#10B981",
    "مكاتب": "#8B5CF6",
  };

  // Submit Inquiry from Client form
  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone || !clientCity) {
      triggerToast("الرجاء ملء جميع الحقول المطلوبة لتسجيل الطلب.");
      return;
    }

    const newInquiry: SampleRequest = {
      id: "req_" + Date.now(),
      clientName,
      phone: clientPhone,
      city: clientCity,
      productName: chosenProductInForm,
      notes: additionalNotes,
      createdAt: new Date().toISOString(),
      status: "جديد"
    };

    setInquiries([newInquiry, ...inquiries]);
    triggerToast("تم تسجيل طلب عيّنتك بنجاح! ستظهر فوراً في لوحة الإدارة.");
    
    // Reset client form
    setClientName("");
    setClientPhone("");
    setClientCity("");
    setAdditionalNotes("");
  };

  // Admin: Save/Update Product
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodFormName || !prodFormDescription) {
      triggerToast("الرجاء إدخال الاسم والوصف للمنتج.");
      return;
    }

    const imageToUse = prodFormImage || "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?w=600&auto=format&fit=crop&q=80";

    if (prodFormId) {
      // Edit mode
      setProducts(products.map(p => p.id === prodFormId ? {
        ...p,
        name: prodFormName,
        category: prodFormCategory,
        priceNum: prodFormPriceNum,
        price: `${prodFormPriceNum} د.م./${prodFormUnit}`,
        unit: prodFormUnit,
        dimensions: prodFormDimensions,
        description: prodFormDescription,
        image: imageToUse,
        inStock: prodFormInStock
      } : p));
      triggerToast("تم تعديل المنتج بنجاح ✓");
    } else {
      // Create mode
      const newProd: Product = {
        id: "prod_" + Date.now(),
        name: prodFormName,
        category: prodFormCategory,
        priceNum: prodFormPriceNum,
        price: `${prodFormPriceNum} د.م./${prodFormUnit}`,
        unit: prodFormUnit,
        dimensions: prodFormDimensions,
        description: prodFormDescription,
        image: imageToUse,
        inStock: prodFormInStock
      };
      setProducts([...products, newProd]);
      triggerToast("تمت إضافة المنتج الجديد لقاعدة البيانات بنجاح ✓");
    }

    // Reset Form
    resetProductForm();
  };

  const resetProductForm = () => {
    setProdFormId(null);
    setProdFormName("");
    setProdFormCategory("زليج");
    setProdFormPriceNum(150);
    setProdFormUnit("م²");
    setProdFormDimensions("20×20 سم");
    setProdFormDescription("");
    setProdFormImage("");
    setProdFormInStock(true);
  };

  const startEditProduct = (p: Product) => {
    setProdFormId(p.id);
    setProdFormName(p.name);
    setProdFormCategory(p.category);
    setProdFormPriceNum(p.priceNum);
    setProdFormUnit(p.unit);
    setProdFormDimensions(p.dimensions);
    setProdFormDescription(p.description);
    setProdFormImage(p.image);
    setProdFormInStock(p.inStock);
    
    // Scroll to form nicely
    document.getElementById("admin-product-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleDeleteProduct = (id: string) => {
    const p = products.find(prod => prod.id === id);
    if (p) {
      setDeleteTarget({ type: "product", id, name: p.name });
    }
  };

  // Admin: Save/Update Project
  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projFormName || !projFormClient) {
      triggerToast("الرجاء إدخال الاسم والعميل للمشروع.");
      return;
    }

    const imageToUse = projFormImage || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80";

    if (projFormId) {
      setProjects(projects.map(p => p.id === projFormId ? {
        ...p,
        name: projFormName,
        type: projFormType,
        client: projFormClient,
        completionDate: projFormDate,
        image: imageToUse
      } : p));
      triggerToast("تم تعديل المشروع بنجاح ✓");
    } else {
      const newProj: Project = {
        id: "proj_" + Date.now(),
        name: projFormName,
        type: projFormType,
        client: projFormClient,
        completionDate: projFormDate,
        image: imageToUse
      };
      setProjects([...projects, newProj]);
      triggerToast("تمت إضافة المشروع الجديد لقائمة المعرض بنجاح ✓");
    }

    resetProjectForm();
  };

  const resetProjectForm = () => {
    setProjFormId(null);
    setProjFormName("");
    setProjFormType("فيلات");
    setProjFormClient("");
    setProjFormDate("2026-01-01");
    setProjFormImage("");
  };

  const startEditProject = (p: Project) => {
    setProjFormId(p.id);
    setProjFormName(p.name);
    setProjFormType(p.type);
    setProjFormClient(p.client);
    setProjFormDate(p.completionDate);
    setProjFormImage(p.image);
  };

  const handleDeleteProject = (id: string) => {
    const proj = projects.find(p => p.id === id);
    if (proj) {
      setDeleteTarget({ type: "project", id, name: proj.name });
    }
  };

  // Change Inquiry Status
  const handleUpdateInquiryStatus = (id: string, newStatus: "جديد" | "قيد المعالجة" | "تم التسليم") => {
    setInquiries(inquiries.map(req => req.id === id ? { ...req, status: newStatus } : req));
    triggerToast(`تم تحديث حالة الطلب إلى "${newStatus}"`);
  };

  const handleDeleteInquiry = (id: string) => {
    const inq = inquiries.find(i => i.id === id);
    if (inq) {
      setDeleteTarget({ type: "inquiry", id, name: `طلب عينة من ${inq.clientName}` });
    }
  };

  const executeDelete = () => {
    if (!deleteTarget) return;
    const { type, id } = deleteTarget;
    if (type === "product") {
      setProducts(products.filter(p => p.id !== id));
      triggerToast("تم حذف المنتج بنجاح.");
    } else if (type === "project") {
      setProjects(projects.filter(p => p.id !== id));
      triggerToast("تم حذف المشروع بنجاح.");
    } else if (type === "inquiry") {
      setInquiries(inquiries.filter(req => req.id !== id));
      triggerToast("تم حذف الاستفسار بنجاح.");
    }
    setDeleteTarget(null);
  };

  // Quick Action: Request Sample of selected product in store modal
  const handleRequestSampleForProduct = (p: Product) => {
    setChosenProductInForm(p.name);
    setSelectedProduct(null);
    document.getElementById("sample")?.scrollIntoView({ behavior: "smooth" });
    triggerToast(`تم اختيار "${p.name}" في نموذج الطلب بالأسفل!`);
  };

  // Filter products/projects
  const filteredProducts = activeCatalogFilter === "الكل" 
    ? products 
    : products.filter(p => p.category === activeCatalogFilter);

  const filteredProjects = activeProjectFilter === "الكل"
    ? projects
    : projects.filter(p => p.type === activeProjectFilter);

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#161513] font-sans antialiased relative" dir="rtl" id="app-root">
      
      {/* ============ TOAST NOTIFICATION ============ */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 20, x: "-50%" }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#252220] text-white px-6 py-4 rounded-lg shadow-xl flex items-center gap-3 border border-[#B8862E]"
            id="toast-notification"
          >
            <div className="w-2 h-2 rounded-full bg-[#B8862E] animate-ping" />
            <span className="text-sm font-medium">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============ FLOAT WINDOW: SYSTEM SWITCHER ============ */}
      <div className="fixed bottom-6 left-6 z-40 flex items-center gap-2">
        <button
          onClick={() => setIsAdminMode(!isAdminMode)}
          className={`px-5 py-3 rounded-full flex items-center gap-2.5 font-bold text-sm shadow-xl border transition-all duration-300 ${
            isAdminMode 
              ? "bg-[#FAF7F0] text-[#161513] border-[#161513] hover:bg-[#F1ECE0]" 
              : "bg-[#252220] text-[#FAF7F0] border-[#B8862E] hover:bg-[#161513] hover:border-[#D9B45F]"
          }`}
          id="toggle-admin-btn"
          title="الانتقال بين واجهة العرض ولوحة الإدارة"
        >
          {isAdminMode ? (
            <>
              <Layers className="w-4 h-4 text-[#B8862E]" />
              <span>عرض الموقع كعميل</span>
            </>
          ) : (
            <>
              <Settings className="w-4 h-4 text-[#D9B45F] animate-spin" style={{ animationDuration: '6s' }} />
              <span>لوحة الإدارة (Django/Admin Replica)</span>
            </>
          )}
        </button>
      </div>

      {/* ============ TOP PREMIUM NAV ============ */}
      <header className="sticky top-0 z-30 bg-[#FAF7F0]/92 backdrop-blur-md border-b border-[#E4DCC8] shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#252220] flex items-center justify-center border border-[#B8862E]">
              <span className="text-[#FAF7F0] font-serif font-bold text-lg">◆</span>
            </div>
            <div>
              <span className="font-serif text-xl font-bold tracking-tight block">دار <span className="text-[#B8862E]">الزليج</span></span>
              <span className="text-[10px] text-[#6B6255] font-mono tracking-widest block -mt-1 uppercase">Dar Zellige Systems</span>
            </div>
          </div>

          {/* Nav Links - Hide when Admin mode active to avoid confusion */}
          {!isAdminMode && (
            <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#6B6255]">
              <a href="#hero" className="hover:text-[#B8862E] transition-colors">الرئيسية</a>
              <a href="#catalog" className="hover:text-[#B8862E] transition-colors">الكتالوج</a>
              <a href="#projects" className="hover:text-[#B8862E] transition-colors">مشاريعنا</a>
              <a href="#calculator" className="hover:text-[#B8862E] transition-colors">حاسبة الكمية والسعر</a>
              <a href="#sample" className="hover:text-[#B8862E] transition-colors">طلب عينات</a>
              <a href="/DJANGO_GUIDE.md" target="_blank" className="text-[#B8862E] hover:underline flex items-center gap-1 font-mono">
                <Database className="w-3.5 h-3.5" />
                <span>Django Guide</span>
              </a>
            </nav>
          )}

          <div className="flex items-center gap-3">
            {isAdminMode ? (
              <span className="bg-[#B8862E]/10 text-[#B8862E] border border-[#B8862E]/30 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 font-mono">
                <Sliders className="w-3 h-3" />
                <span>ADMIN PANEL ACTIVE</span>
              </span>
            ) : (
              <a 
                href="#sample" 
                className="bg-[#B8862E] hover:bg-[#D9B45F] text-[#161513] text-xs font-bold px-4 py-2.5 rounded transition-all duration-200"
                id="header-cta"
              >
                اطلب عينة مجانية
              </a>
            )}
          </div>
        </div>
      </header>

      {/* ============ RENDER: MAIN LANDING PAGE (CLIENT VIEW) ============ */}
      {!isAdminMode ? (
        <main className="pb-24">
          
          {/* 1. HERO SECTION */}
          <section id="hero" className="relative bg-[#161513] text-[#FAF7F0] overflow-hidden py-24 lg:py-32 border-b border-[#B8862E]/30">
            <div className="absolute inset-0 opacity-15">
              <img 
                src="/src/assets/images/black_gold_marble_1783187230357.jpg" 
                alt="Background marble pattern" 
                className="w-full h-full object-cover filter grayscale"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-8">
                <div className="inline-flex items-center gap-2 bg-[#B8862E]/10 text-[#D9B45F] border border-[#B8862E]/30 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide">
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                  <span>توريد للمشاريع الهندسية والفلل الفاخرة</span>
                </div>
                
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white leading-tight">
                  زليج فاسي أصيل، <br />
                  <span className="italic text-[#D9B45F] font-serif">ورخام كرارة فاخر</span> <br />
                  لمشاريعكم المعمارية.
                </h1>
                
                <p className="text-[#D8D2C4] text-base sm:text-lg max-w-2xl leading-relaxed">
                  نحن نوفر أجود أنواع الزليج المغربي التقليدي المشكل يدوياً بمدينة فاس، بالإضافة لأرقى قطع رخام كرارة الإيطالي والرخام المحلي. نظامنا الإداري يضمن التوريد الفوري والحسابات الدقيقة للمهندسين والمقاولين.
                </p>
                
                <div className="flex flex-wrap gap-4 pt-2">
                  <a href="#catalog" className="bg-[#B8862E] hover:bg-[#D9B45F] text-[#161513] px-8 py-4 rounded font-bold text-sm shadow-lg transition-colors flex items-center gap-2">
                    <span>تصفح الكتالوج المطور</span>
                    <ChevronRight className="w-4 h-4 rotate-180" />
                  </a>
                  <a href="#calculator" className="bg-transparent hover:bg-white/5 text-white border border-white/30 px-8 py-4 rounded font-bold text-sm transition-all duration-200 flex items-center gap-2">
                    <Calculator className="w-4 h-4 text-[#D9B45F]" />
                    <span>حاسبة الكميات التفاعلية</span>
                  </a>
                </div>

                <div className="grid grid-cols-3 gap-6 pt-6 border-t border-[#FAF7F0]/10 max-w-lg">
                  <div>
                    <span className="font-serif text-3xl font-semibold text-[#D9B45F] block">+20</span>
                    <span className="text-xs text-[#B5AC9A] block mt-1">سنة من الخبرة الإرثية</span>
                  </div>
                  <div>
                    <span className="font-serif text-3xl font-semibold text-[#D9B45F] block">+300</span>
                    <span className="text-xs text-[#B5AC9A] block mt-1">مشروع معماري منجز</span>
                  </div>
                  <div>
                    <span className="font-serif text-3xl font-semibold text-[#D9B45F] block">{products.length}</span>
                    <span className="text-xs text-[#B5AC9A] block mt-1">منتج وأدوات تركيب متاح</span>
                  </div>
                </div>
              </div>

              {/* Visual Showcase (Featured Product card) */}
              <div className="lg:col-span-5 relative">
                <div className="absolute -inset-2 rounded-2xl bg-gradient-to-tr from-[#B8862E] to-transparent opacity-30 blur-lg" />
                <div className="relative bg-[#252220] border border-[#4A463E] p-4 rounded-xl shadow-2xl overflow-hidden">
                  <div className="h-64 rounded-lg overflow-hidden relative group">
                    <img 
                      src="/src/assets/images/blue_zellige_1783187248822.jpg" 
                      alt="Moroccan Blue Zellige Texture" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 right-3 bg-[#B8862E] text-[#161513] text-[10px] font-bold px-2.5 py-1 rounded">
                      عينة حقيقية فائقة الدقة
                    </div>
                  </div>
                  <div className="mt-4 space-y-1">
                    <span className="text-xs font-bold text-[#D9B45F] tracking-wider uppercase font-mono block">منتج الشهر المميز</span>
                    <h3 className="font-serif text-xl text-white">زليج فاسي يدوي — أزرق مجريطي</h3>
                    <p className="text-xs text-[#B5AC9A] line-clamp-2">صناعة يدوية أصلية بالكامل بفرن الطين التقليدي والقطع الدقيق بمدينة فاس العتيقة.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Signature Geometric Zellige Border line */}
            <div className="absolute bottom-0 inset-x-0 h-1 bg-[#B8862E] opacity-70" />
          </section>

          {/* 2. CATALOG SECTION (WITH ACTUAL DATABASE AND NEW FILTERING) */}
          <section id="catalog" className="py-24 max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
              <span className="text-xs font-bold text-[#B8862E] tracking-widest uppercase block">الكتالوج الكامل والمحدث</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#161513]">زليج، رخام، وأدوات تركيب احترافية</h2>
              <p className="text-sm text-[#6B6255] leading-relaxed">
                استعرض باقة المواد والمنتجات المتوفرة في مستودعاتنا حالياً. جميع الأسعار شفافة ومحدثة بانتظام من خلال لوحة تحكم الإدارة.
              </p>
            </div>

            {/* Catalog Filter Chips */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {["الكل", "زليج", "رخام", "معدات التركيب"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCatalogFilter(cat)}
                  className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 border ${
                    activeCatalogFilter === cat 
                      ? "bg-[#252220] text-white border-[#252220] shadow-md" 
                      : "bg-white text-[#6B6255] border-[#E4DCC8] hover:border-[#B8862E] hover:text-[#B8862E]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((p) => (
                <motion.div 
                  key={p.id}
                  onClick={() => setSelectedProduct(p)}
                  whileHover={{ 
                    y: -6, 
                    scale: 1.02,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="bg-white border border-[#E4DCC8] rounded-xl overflow-hidden shadow-sm cursor-pointer group flex flex-col justify-between"
                  id={`product-card-${p.id}`}
                >
                  <div>
                    {/* Real Image instead of gradient! */}
                    <div className="h-48 overflow-hidden relative bg-[#FAF7F0]">
                      <img 
                        src={p.image} 
                        alt={p.name} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      {!p.inStock && (
                        <div className="absolute inset-0 bg-[#161513]/60 backdrop-blur-xs flex items-center justify-center">
                          <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded">طلب مسبق</span>
                        </div>
                      )}
                      <div className="absolute bottom-2 left-2 bg-[#252220]/75 backdrop-blur-md text-[#D9B45F] text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                        {p.dimensions}
                      </div>
                    </div>

                    <div className="p-5 space-y-2">
                      <span className="text-[10px] font-bold text-[#B8862E] uppercase tracking-wider block">{p.category}</span>
                      <h3 className="font-serif text-lg font-semibold text-[#161513] line-clamp-1 group-hover:text-[#B8862E] transition-colors">{p.name}</h3>
                      <p className="text-xs text-[#6B6255] line-clamp-2 leading-relaxed">{p.description}</p>
                    </div>
                  </div>

                  <div className="p-5 pt-0 border-t border-[#F1ECE0] flex items-center justify-between mt-3">
                    <span className="text-xs font-mono font-semibold text-[#8C6A3F]">
                      {p.price}
                    </span>
                    <span className="text-xs font-bold text-[#B8862E] group-hover:translate-x-[-4px] transition-transform flex items-center gap-1">
                      <span>عرض التفاصيل</span>
                      <ChevronRight className="w-3.5 h-3.5 rotate-180" />
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* 3. PROJECT GALLERY SECTION */}
          <section id="projects" className="py-24 bg-[#F1ECE0] border-y border-[#E4DCC8]">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
                <span className="text-xs font-bold text-[#B8862E] tracking-widest uppercase block">معرض الأعمال والمشاريع</span>
                <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#161513]">شاهد فخامة تنفيذنا على أرض الواقع</h2>
                <p className="text-sm text-[#6B6255] leading-relaxed">
                  من القصور والفيلات الفاخرة إلى المساجد وصالات الاستقبال الفندقية الكبرى — توريداتنا هي علامة الرقي الإنشائي.
                </p>
              </div>

              {/* Gallery Filter chips */}
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {["الكل", "فيلات", "فنادق", "مساجد", "مكاتب"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setActiveProjectFilter(type)}
                    className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 border ${
                      activeProjectFilter === type 
                        ? "bg-[#252220] text-white border-[#252220] shadow-sm" 
                        : "bg-white text-[#6B6255] border-[#E4DCC8] hover:border-[#B8862E] hover:text-[#B8862E]"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              {/* Masonry-Style Responsive Project Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProjects.map((proj) => (
                  <motion.div 
                    key={proj.id} 
                    whileHover={{ 
                      y: -6, 
                      scale: 1.02,
                      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.15)"
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className="relative rounded-xl overflow-hidden group shadow-md bg-[#252220] cursor-pointer"
                    id={`project-card-${proj.id}`}
                  >
                    <div className="h-72 w-full overflow-hidden relative">
                      <img 
                        src={proj.image} 
                        alt={proj.name} 
                        className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    {/* Absolute Overlay Caption */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#161513] via-[#161513]/70 to-transparent p-5 space-y-1">
                      <span className="text-[10px] font-bold text-[#D9B45F] tracking-widest uppercase block">{proj.type}</span>
                      <h4 className="font-serif text-base text-white font-medium">{proj.name}</h4>
                      <div className="flex justify-between items-center text-[11px] text-[#D8D2C4] pt-2 border-t border-white/10 mt-1">
                        <span>العميل: {proj.client}</span>
                        <span className="font-mono text-[10px] opacity-75">{proj.completionDate}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* 4. QUANTITY & ESTIMATED COST CALCULATOR SECTION */}
          <section id="calculator" className="py-24 max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Info Block */}
              <div className="lg:col-span-5 space-y-6">
                <span className="text-xs font-bold text-[#B8862E] tracking-widest uppercase block">أداة حسابية مطورة للمقاولين</span>
                <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#161513]">احسب كمية البلاط والتكلفة التقديرية فوراً</h2>
                <p className="text-sm text-[#6B6255] leading-relaxed">
                  أدخل أبعاد الغرفة أو الجدار المراد تبليطه، واختر نوع المادة من كتالوج منتجاتنا الحية بالأسعار، ليقوم النظام بحساب عدد البلاطات والمساحة الصافية شاملة نسبة الهدر والتكلفة المالية المقدرة للمشروع.
                </p>
                <div className="bg-[#B8862E]/5 border-l-4 border-[#B8862E] p-4 rounded-r">
                  <p className="text-xs text-[#8C6A3F] leading-relaxed">
                    <strong>تنبيه هندسي:</strong> ننصح بإضافة من 5% إلى 15% كنسبة هدر للقطع والزوايا والتشذيب حسب نمط النقش الهندسي للزليج.
                  </p>
                </div>
              </div>

              {/* Calculator Box */}
              <div className="lg:col-span-7 bg-[#252220] text-[#FAF7F0] rounded-2xl p-6 sm:p-8 shadow-xl border border-[#4A463E] grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* Inputs Column */}
                <div className="md:col-span-7 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs text-[#D8D2C4] font-medium block">الطول (متر)</label>
                      <input 
                        type="number" 
                        min="0.1" 
                        step="0.1" 
                        value={calcLength} 
                        onChange={(e) => setCalcLength(parseFloat(e.target.value) || 0)}
                        className="w-full bg-[#161513] border border-[#4A463E] rounded px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-[#B8862E]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs text-[#D8D2C4] font-medium block">العرض (متر)</label>
                      <input 
                        type="number" 
                        min="0.1" 
                        step="0.1" 
                        value={calcWidth} 
                        onChange={(e) => setCalcWidth(parseFloat(e.target.value) || 0)}
                        className="w-full bg-[#161513] border border-[#4A463E] rounded px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-[#B8862E]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-[#D8D2C4] font-medium block">اختر مادة البلاط (لربط السعر والوصف)</label>
                    <select
                      value={selectedProductId}
                      onChange={(e) => setSelectedProductId(e.target.value)}
                      className="w-full bg-[#161513] border border-[#4A463E] rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-[#B8862E]"
                    >
                      {products.map(p => (
                        <option key={p.id} value={p.id}>
                          {p.name} ({p.price})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-[#D8D2C4] font-medium block">مقاس البلاطة (لحساب العدد الفعلي)</label>
                    <select
                      value={calcTileType}
                      onChange={(e) => setCalcTileType(e.target.value)}
                      className="w-full bg-[#161513] border border-[#4A463E] rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-[#B8862E]"
                    >
                      <option value="10">10 × 10 سم (زليج صغير)</option>
                      <option value="20">20 × 20 سم (زليج تقليدي)</option>
                      <option value="30">30 × 30 سم (رخام صغير)</option>
                      <option value="40">40 × 40 سم (رخام متوسط)</option>
                      <option value="60">60 × 60 سم (رخام لوح قياسي)</option>
                      <option value="custom">مقاس مخصص...</option>
                    </select>
                  </div>

                  {calcTileType === "custom" && (
                    <div className="space-y-1.5 bg-[#161513] p-3 rounded border border-[#4A463E]">
                      <label className="text-xs text-[#D8D2C4] font-medium block">المقاس المخصص لطول ضلع البلاطة مربعة الشكل (سم)</label>
                      <input 
                        type="number" 
                        min="1" 
                        max="200"
                        value={customTileSize} 
                        onChange={(e) => setCustomTileSize(parseInt(e.target.value) || 10)}
                        className="w-full bg-[#252220] border border-[#4A463E] rounded px-3 py-1.5 text-white font-mono text-sm focus:outline-none focus:border-[#B8862E]"
                      />
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label className="text-xs text-[#D8D2C4] font-medium block">نسبة الهدر المحتسبة (%)</label>
                    <input 
                      type="range" 
                      min="0" 
                      max="30" 
                      value={calcWaste}
                      onChange={(e) => setCalcWaste(parseInt(e.target.value) || 0)}
                      className="w-full h-1 bg-[#161513] rounded-lg appearance-none cursor-pointer accent-[#B8862E]"
                    />
                    <div className="flex justify-between text-[11px] text-[#B5AC9A] font-mono">
                      <span>0%</span>
                      <span className="text-[#D9B45F] font-bold">{calcWaste}% (مختارة)</span>
                      <span>30%</span>
                    </div>
                  </div>
                </div>

                {/* Outputs Column */}
                <div className="md:col-span-5 bg-[#161513] rounded-xl p-5 border border-[#38352E] flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div>
                      <span className="text-[10px] text-[#B5AC9A] tracking-wider uppercase block">عدد البلاط المطلوب</span>
                      <span className="font-mono text-4xl font-bold text-[#D9B45F] block">{totalTilesNeeded.toLocaleString()}</span>
                      <span className="text-[10px] text-[#FAF7F0]/60 block mt-1">بلاطة تقريباً</span>
                    </div>

                    <div className="space-y-2.5 pt-4 border-t border-[#252220]">
                      <div className="flex justify-between text-xs text-[#B5AC9A]">
                        <span>المساحة الصافية:</span>
                        <span className="font-mono text-white">{calcArea.toFixed(2)} م²</span>
                      </div>
                      <div className="flex justify-between text-xs text-[#B5AC9A]">
                        <span>المساحة بالهدر:</span>
                        <span className="font-mono text-white">{calcAreaWithWaste.toFixed(2)} م²</span>
                      </div>
                      <div className="flex justify-between text-xs text-[#B5AC9A]">
                        <span>مساحة البلاطة:</span>
                        <span className="font-mono text-white">{(tileAreaM2).toFixed(4)} م²</span>
                      </div>
                    </div>
                  </div>

                  {/* Estimated Cost Panel */}
                  <div className="bg-[#252220] p-4 rounded-lg border border-[#4A463E] space-y-1">
                    <span className="text-[9px] text-[#D9B45F] font-bold tracking-wider uppercase block">التكلفة المالية التقديرية</span>
                    <div className="flex items-baseline justify-between">
                      <span className="font-mono text-2xl font-bold text-white">{Math.round(estimatedCost).toLocaleString()}</span>
                      <span className="text-xs text-[#D9B45F]">درهم مغربي</span>
                    </div>
                    <span className="text-[9px] text-white/40 block">شاملاً ضريبة التوريد (السعر تقديري)</span>
                  </div>
                </div>

              </div>

            </div>
          </section>

          {/* 5. SAMPLE REQUEST / INQUIRY FORM */}
          <section id="sample" className="py-24 bg-[#FAF7F0] border-t border-[#E4DCC8] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#B8862E]/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#8C6A3F]/5 rounded-full blur-3xl" />
            
            <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Description Block */}
              <div className="lg:col-span-5 space-y-6">
                <span className="text-xs font-bold text-[#B8862E] tracking-widest uppercase block">طلب معاينة المنتجات</span>
                <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#161513]">تفضل بطلب عينة مجانية للمعاينة في موقعك</h2>
                <p className="text-sm text-[#6B6255] leading-relaxed">
                  نحن نؤمن بأن ملمس الرخام وانعكاس الضوء على الزليج الفاسي لا يكتمل سحره إلا بالمعاينة البصرية واللمس الفعلي. اختر نوع بلاطك واملأ بياناتك ليوصلك مندوبنا العينة مجاناً أينما كنت بالمغرب.
                </p>
                
                <div className="space-y-4 pt-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#B8862E]/15 text-[#B8862E] flex items-center justify-center font-bold text-xs mt-0.5">١</div>
                    <p className="text-xs text-[#6B6255] leading-relaxed"><strong>اختر المنتج المطلوب:</strong> اختر البلاط من القائمة الدورية المحدثة.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#B8862E]/15 text-[#B8862E] flex items-center justify-center font-bold text-xs mt-0.5">٢</div>
                    <p className="text-xs text-[#6B6255] leading-relaxed"><strong>تعبئة بيانات التوصيل:</strong> اكتب رقم هاتفك والمدينة لجدولة التوصيل السريع.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#B8862E]/15 text-[#B8862E] flex items-center justify-center font-bold text-xs mt-0.5">٣</div>
                    <p className="text-xs text-[#6B6255] leading-relaxed"><strong>فحص العينة الحية:</strong> ستستلم عينة ملموسة مجاناً لمراجعة الجودة وموافقة المهندس.</p>
                  </div>
                </div>
              </div>

              {/* Inquiry Form */}
              <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-[#E4DCC8] shadow-md">
                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  <h3 className="font-serif text-xl font-semibold text-[#161513] pb-3 border-b border-[#F1ECE0]">نموذج تسجيل طلب عينة</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs text-[#6B6255] font-semibold block">الاسم الكامل *</label>
                      <input 
                        type="text" 
                        required
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="مثال: يوسف بن جلون"
                        className="w-full bg-[#FAF7F0] border border-[#E4DCC8] rounded px-3.5 py-2 text-sm text-[#161513] focus:outline-none focus:border-[#B8862E]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs text-[#6B6255] font-semibold block">رقم الهاتف للاتصال والتنسيق *</label>
                      <input 
                        type="tel" 
                        required
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="مثال: 0661234567"
                        className="w-full bg-[#FAF7F0] border border-[#E4DCC8] rounded px-3.5 py-2 text-sm text-[#161513] focus:outline-none focus:border-[#B8862E]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs text-[#6B6255] font-semibold block">المدينة *</label>
                      <input 
                        type="text" 
                        required
                        value={clientCity}
                        onChange={(e) => setClientCity(e.target.value)}
                        placeholder="مثال: الدار البيضاء، مراكش"
                        className="w-full bg-[#FAF7F0] border border-[#E4DCC8] rounded px-3.5 py-2 text-sm text-[#161513] focus:outline-none focus:border-[#B8862E]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs text-[#6B6255] font-semibold block">المنتج المراد معاينته عيناتياً *</label>
                      <select
                        value={chosenProductInForm}
                        onChange={(e) => setChosenProductInForm(e.target.value)}
                        className="w-full bg-[#FAF7F0] border border-[#E4DCC8] rounded px-3 py-2 text-sm text-[#161513] focus:outline-none focus:border-[#B8862E]"
                      >
                        {products.map(p => (
                          <option key={p.id} value={p.name}>{p.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-[#6B6255] font-semibold block">ملاحظات إضافية أو تفاصيل المشروع (اختياري)</label>
                    <textarea 
                      rows={3}
                      value={additionalNotes}
                      onChange={(e) => setAdditionalNotes(e.target.value)}
                      placeholder="اكتب هنا تفاصيل المساحة المطلوبة أو طبيعة التركيب (مطبخ، حمام، مسبح فندق...)"
                      className="w-full bg-[#FAF7F0] border border-[#E4DCC8] rounded px-3.5 py-2 text-sm text-[#161513] focus:outline-none focus:border-[#B8862E] resize-y"
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-[#252220] hover:bg-[#161513] text-white font-bold text-sm py-4 rounded transition-colors shadow-lg flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-[#D9B45F]" />
                    <span>إرسال طلب المعاينة الفوري</span>
                  </button>
                </form>
              </div>

            </div>
          </section>

          {/* 6. BRAND STORY & TRUST */}
          <section id="about" className="py-24 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="h-96 rounded-2xl overflow-hidden relative shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1541123437800-1bb1317badc2?w=600&auto=format&fit=crop&q=80" 
                alt="Moroccan architectural craft detail" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#161513]/70 to-transparent" />
              <div className="absolute bottom-6 right-6">
                <span className="text-xs font-bold text-[#D9B45F] uppercase block tracking-widest font-mono">حرفة أندلسية أصيلة</span>
                <span className="font-serif text-2xl text-white font-semibold">تاريخ فاس في طيات الطين</span>
              </div>
            </div>

            <div className="space-y-6">
              <span className="text-xs font-bold text-[#B8862E] tracking-widest uppercase block">قصة دار الزليج</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#161513]">إرث الحرفة المغربية بمعايير إنشائية احترافية</h2>
              <p className="text-sm text-[#6B6255] leading-relaxed">
                في دار الزليج، نعمل كجسر يربط بين تراث المعلمين الحرفيين الفاسيين وصنّاع الرخام المهنيين، وبين تطلعات المكاتب الهندسية وشركات المقاولات الكبرى بالمغرب وخارجه.
              </p>
              <p className="text-sm text-[#6B6255] leading-relaxed">
                جميع طلبيات الزليج تُصنع بالطلب وتحت إشراف مباشر لضبط الألوان والمقاييس. لوحة إدارة النظام تمنحنا التحكم الفوري للتواصل والتسعير المرن، لضمان أعلى مستويات الالتزام والتسليم الفوري للموقع الإنشائي.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#B8862E]/10 flex items-center justify-center text-[#B8862E]">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-sm">مراقبة الجودة الفنية</h5>
                    <span className="text-xs text-[#6B6255]">فحص دقيق للمقاسات واللمعان</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#B8862E]/10 flex items-center justify-center text-[#B8862E]">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-sm">تسليم منظم في الآجال</h5>
                    <span className="text-xs text-[#6B6255]">لوجستيات نقل متكاملة لكافة المدن</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 7. CONTACT & MAP */}
          <section id="contact" className="py-24 bg-[#F1ECE0] border-t border-[#E4DCC8]">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
                <span className="text-xs font-bold text-[#B8862E] tracking-widest uppercase block">المعرض الرئيسي وقنوات الاتصال</span>
                <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#161513]">تفضلوا بزيارتنا أو اتصلوا بنا فوراً</h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                
                {/* Contact detail cards */}
                <div className="lg:col-span-5 flex flex-col justify-between gap-4">
                  <div className="bg-white p-6 rounded-xl border border-[#E4DCC8] space-y-2">
                    <div className="flex items-center gap-2 text-[#B8862E]">
                      <MapPin className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-wider">العنوان والمقر</span>
                    </div>
                    <p className="text-sm font-semibold text-[#161513]">المنطقة الصناعية الكبرى، ممر الرخام، عين السبع، الدار البيضاء، المغرب</p>
                  </div>

                  <div className="bg-white p-6 rounded-xl border border-[#E4DCC8] space-y-2">
                    <div className="flex items-center gap-2 text-[#B8862E]">
                      <Phone className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-wider">الاتصال والواتساب الإداري</span>
                    </div>
                    <p className="text-sm font-mono font-bold text-[#161513]">+212 6 00 00 00 00</p>
                    <p className="text-[11px] text-[#6B6255]">يتوفر طاقم المبيعات للرد على استفسارات المشاريع بالجملة طوال ٢٤ ساعة.</p>
                  </div>

                  <div className="bg-white p-6 rounded-xl border border-[#E4DCC8] space-y-2">
                    <div className="flex items-center gap-2 text-[#B8862E]">
                      <Clock className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-wider">أوقات العمل بالمعرض الرئيسي</span>
                    </div>
                    <p className="text-sm text-[#161513]">الاثنين – السبت: 9:00 صباحاً – 6:30 مساءً</p>
                    <p className="text-xs text-[#8C6A3F]">الأحد مغلق (زيارات خاصة بالموعد المسبق لمهندسي الديكور)</p>
                  </div>
                </div>

                {/* Google Maps Embed iframe with sepia tint style */}
                <div className="lg:col-span-7 h-96 lg:h-auto rounded-xl overflow-hidden border border-[#E4DCC8] relative shadow-md">
                  <iframe 
                    className="w-full h-full min-h-[300px]" 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106338.45507115865!2d-7.669389279188439!3d33.58831346049281!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7cd4778aa113b%3A0xb06c1d84f310fd3!2sCasablanca%2020250%2C%20Morocco!5e0!3m2!1sen!2sus!4v1710000000000!5m2!1sen!2sus" 
                    style={{ border: 0, filter: 'sepia(0.1) contrast(0.95)' }}
                    allowFullScreen 
                    loading="lazy" 
                  />
                </div>

              </div>
            </div>
          </section>

        </main>
      ) : (
        
        // ============ RENDER: SYSTEM ADMIN PANEL (DJANGO REPLICA) ============
        <main className="max-w-7xl mx-auto px-6 py-12">
          
          {/* Admin Header */}
          <div className="bg-[#252220] rounded-2xl p-6 sm:p-8 text-white border border-[#B8862E] shadow-xl mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-2">
              <span className="bg-[#B8862E]/20 text-[#D9B45F] border border-[#B8862E]/40 text-xs font-bold px-3 py-1 rounded-full inline-flex items-center gap-1.5 font-mono">
                <Database className="w-3 h-3 animate-ping" />
                <span>DJANGO SYSTEM DATABASE CONSOLE</span>
              </span>
              <h1 className="font-serif text-3xl font-semibold text-white">لوحة تحكم دار الزليج المحدثة</h1>
              <p className="text-xs text-[#FAF7F0]/60 max-w-xl">
                هذه لوحة محاكاة حية لنظام الإدارة الخلفي (Admin Panel). يمكنك من هنا إضافة منتجات، رفع وتعديل مسارات الصور والأسعار الحية لتحديث الكتالوج، وإدارة استفسارات عينات العملاء الواردة فوراً.
              </p>
            </div>
            
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-4 bg-[#161513] p-4 rounded-xl border border-[#4A463E]">
              <div className="text-center px-2">
                <span className="text-xs text-[#B5AC9A] block">المنتجات</span>
                <span className="font-serif font-bold text-xl text-[#D9B45F] block">{products.length}</span>
              </div>
              <div className="text-center px-2 border-x border-[#FAF7F0]/10">
                <span className="text-xs text-[#B5AC9A] block">المشاريع</span>
                <span className="font-serif font-bold text-xl text-[#D9B45F] block">{projects.length}</span>
              </div>
              <div className="text-center px-2">
                <span className="text-xs text-[#B5AC9A] block">الطلبات</span>
                <span className="font-serif font-bold text-xl text-green-400 block">{inquiries.length}</span>
              </div>
            </div>
          </div>

          {/* ============ ANALYTICS PANEL: PROJECT DISTRIBUTION ============ */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10" id="admin-analytics-section">
            {/* Quick Insights Card */}
            <div className="bg-white rounded-2xl p-6 border border-[#E4DCC8] shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#161513] mb-2 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[#B8862E]" />
                  <span>الرؤية التحليلية للمشاريع</span>
                </h3>
                <p className="text-xs text-[#6B6255] leading-relaxed">
                  تحليل فوري لتوزع مساهمة دار الزليج في القطاعات الإنشائية والمعمارية المختلفة بالمملكة. يساعدك هذا المخطط على فهم التوجهات وتخصيص الموارد الإنتاجية والمخزنية وفقاً للطلب الفعلي بالمعرض.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-[#F1ECE0] space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-[#6B6255]">الأكثر طلباً:</span>
                  <span className="font-bold text-[#161513]">
                    {(() => {
                      const sorted = [...projectStats].sort((a, b) => b.value - a.value);
                      const max = sorted[0];
                      return max && max.value > 0 ? `${max.name} (${max.value} مشاريع)` : "لا يوجد";
                    })()}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#6B6255]">إجمالي المشاريع المنفذة:</span>
                  <span className="font-mono font-bold text-[#B8862E]">{projects.length} مشاريع</span>
                </div>
              </div>
            </div>

            {/* Pie Chart Card */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-[#E4DCC8] shadow-sm flex flex-col justify-between">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-serif text-sm font-bold text-[#161513]">
                  توزيع المشاريع المنفذة حسب التصنيف الحالي بالمعرض
                </h3>
                <span className="text-[10px] bg-[#FAF7F0] border border-[#E4DCC8] text-[#8C6A3F] px-2.5 py-1 rounded font-mono font-bold">
                  تحديث فوري
                </span>
              </div>
              <div className="h-60 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={projectStats}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={75}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {projectStats.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={PROJECT_COLORS[entry.name] || "#B8862E"} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`${value} مشاريع`, 'العدد']}
                      contentStyle={{ textAlign: 'right', direction: 'rtl', borderRadius: '12px', border: '1px solid #E4DCC8', fontFamily: 'system-ui' }}
                    />
                    <Legend 
                      verticalAlign="bottom" 
                      height={36}
                      iconType="circle"
                      iconSize={8}
                      formatter={(value) => {
                        const count = projectStats.find(item => item.name === value)?.value || 0;
                        return <span className="text-[11px] text-[#6B6255] font-semibold font-sans ml-4">{value} ({count})</span>;
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Navigation Tab for Admin Panels */}
          <div className="flex border-b border-[#E4DCC8] gap-6 mb-8 text-sm font-semibold">
            <button
              onClick={() => {
                setAdminActiveTab("products");
                setAdminSearchQuery("");
              }}
              className={`pb-4 transition-colors flex items-center gap-2 relative ${
                adminActiveTab === "products" ? "text-[#B8862E]" : "text-[#6B6255] hover:text-[#161513]"
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>إدارة المنتجات ({products.length})</span>
              {adminActiveTab === "products" && <div className="absolute bottom-0 inset-x-0 h-0.5 bg-[#B8862E]" />}
            </button>
            <button
              onClick={() => {
                setAdminActiveTab("projects");
                setAdminSearchQuery("");
              }}
              className={`pb-4 transition-colors flex items-center gap-2 relative ${
                adminActiveTab === "projects" ? "text-[#B8862E]" : "text-[#6B6255] hover:text-[#161513]"
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>إدارة المشاريع بالمعرض ({projects.length})</span>
              {adminActiveTab === "projects" && <div className="absolute bottom-0 inset-x-0 h-0.5 bg-[#B8862E]" />}
            </button>
            <button
              onClick={() => {
                setAdminActiveTab("inquiries");
                setAdminSearchQuery("");
              }}
              className={`pb-4 transition-colors flex items-center gap-2 relative ${
                adminActiveTab === "inquiries" ? "text-[#B8862E]" : "text-[#6B6255] hover:text-[#161513]"
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>طلبات العينات الواردة ({inquiries.length})</span>
              {newInquiriesCount > 0 && (
                <span className="absolute -top-2 -left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg animate-bounce flex items-center justify-center gap-1 border border-white z-10">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
                  <span>{newInquiriesCount} جديد</span>
                </span>
              )}
              {adminActiveTab === "inquiries" && <div className="absolute bottom-0 inset-x-0 h-0.5 bg-[#B8862E]" />}
            </button>
          </div>

          {/* ============ LIVE SEARCH CONTROLLER FOR TABLES ============ */}
          <div className="mb-8 bg-white p-4 rounded-xl border border-[#E4DCC8] shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between" id="admin-search-container">
            <div className="relative w-full sm:max-w-md">
              <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-[#8C6A3F]">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={adminSearchQuery}
                onChange={(e) => setAdminSearchQuery(e.target.value)}
                placeholder={
                  adminActiveTab === "products"
                    ? "ابحث عن منتج بالاسم، التصنيف، الأبعاد، أو الوصف..."
                    : adminActiveTab === "projects"
                    ? "ابحث عن مشروع بالاسم، العميل، أو التصنيف..."
                    : "ابحث عن طلب بالعميل، الهاتف، المدينة، أو المنتج..."
                }
                className="w-full bg-[#FAF7F0] border border-[#E4DCC8] rounded-lg pr-10 pl-10 py-2.5 text-xs text-[#161513] placeholder-[#6B6255]/60 focus:outline-none focus:border-[#B8862E] focus:ring-1 focus:ring-[#B8862E] transition-all text-right"
                dir="rtl"
              />
              {adminSearchQuery && (
                <button
                  onClick={() => setAdminSearchQuery("")}
                  className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            
            <div className="text-xs text-[#6B6255] font-semibold flex items-center gap-2">
              {adminSearchQuery ? (
                <>
                  <span>تم العثور على:</span>
                  <span className="text-white bg-[#B8862E] px-2.5 py-1 rounded font-mono font-bold">
                    {adminActiveTab === "products" 
                      ? `${adminFilteredProducts.length} من أصل ${products.length} منتج`
                      : adminActiveTab === "projects"
                      ? `${adminFilteredProjects.length} من أصل ${projects.length} مشروع`
                      : `${adminFilteredInquiries.length} من أصل ${inquiries.length} طلب`
                    }
                  </span>
                  <span className="text-[10px] text-gray-400 font-normal">(تصفية حية)</span>
                </>
              ) : (
                <span className="text-[#6B6255]/70 text-[11px]">يمكنك البحث لتصفية جداول الكتالوج والمشاريع والطلبات فورياً بالاسم أو العميل.</span>
              )}
            </div>
          </div>

          {/* ============ TAB: PRODUCT MANAGEMENT ============ */}
          {adminActiveTab === "products" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Product Form (Add/Edit) */}
              <div 
                id="admin-product-form"
                className="lg:col-span-5 bg-white p-6 rounded-xl border border-[#E4DCC8] shadow-sm space-y-4"
              >
                <div className="pb-3 border-b border-[#F1ECE0]">
                  <h3 className="font-serif text-lg font-semibold text-[#161513]">
                    {prodFormId ? "تعديل بيانات المنتج الحالي" : "إضافة منتج جديد لقاعدة البيانات"}
                  </h3>
                  <span className="text-xs text-[#6B6255]">سيتم حفظ وتحديث الكومبوننت والتفاصيل والأسعار الحسابية فوراً.</span>
                </div>

                <form onSubmit={handleSaveProduct} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#6B6255] block">اسم المنتج *</label>
                    <input 
                      type="text" 
                      required
                      value={prodFormName}
                      onChange={(e) => setProdFormName(e.target.value)}
                      placeholder="مثال: رخام امبراطور مغربي بني"
                      className="w-full bg-[#FAF7F0] border border-[#E4DCC8] rounded px-3 py-1.5 text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#6B6255] block">التصنيف الرئيسي *</label>
                      <select
                        value={prodFormCategory}
                        onChange={(e) => setProdFormCategory(e.target.value as any)}
                        className="w-full bg-[#FAF7F0] border border-[#E4DCC8] rounded px-3 py-2 text-sm"
                      >
                        <option value="زليج">زليج</option>
                        <option value="رخام">رخام</option>
                        <option value="معدات التركيب">معدات التركيب</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#6B6255] block">الأبعاد والمقاس المتوفر *</label>
                      <input 
                        type="text" 
                        required
                        value={prodFormDimensions}
                        onChange={(e) => setProdFormDimensions(e.target.value)}
                        placeholder="مثال: 60×60 سم"
                        className="w-full bg-[#FAF7F0] border border-[#E4DCC8] rounded px-3 py-1.5 text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#6B6255] block">رقم السعر الرقمي (بالدرهم) *</label>
                      <input 
                        type="number" 
                        required
                        min="1"
                        value={prodFormPriceNum}
                        onChange={(e) => setProdFormPriceNum(parseInt(e.target.value) || 0)}
                        className="w-full bg-[#FAF7F0] border border-[#E4DCC8] rounded px-3 py-1.5 text-sm font-mono"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#6B6255] block">الوحدة السعرية *</label>
                      <input 
                        type="text" 
                        required
                        value={prodFormUnit}
                        onChange={(e) => setProdFormUnit(e.target.value)}
                        placeholder="م² أو قطعة أو كيس"
                        className="w-full bg-[#FAF7F0] border border-[#E4DCC8] rounded px-3 py-1.5 text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#6B6255] block">مسار الصورة (Image URL / Path) *</label>
                    <input 
                      type="text" 
                      value={prodFormImage}
                      onChange={(e) => setProdFormImage(e.target.value)}
                      placeholder="مسار صورة Unsplash أو الصورة المضغوطة المرفوعة"
                      className="w-full bg-[#FAF7F0] border border-[#E4DCC8] rounded px-3 py-1.5 text-sm font-mono"
                    />
                    <div className="flex items-center justify-between gap-2 mt-1">
                      <span className="text-[10px] text-[#6B6255]">دعها فارغة لاستخدام صورة افتراضية ملائمة متناسقة تلقائياً.</span>
                      <button
                        type="button"
                        onClick={() => {
                          setImgGeneratorTarget("product");
                          setShowImgGenerator(true);
                        }}
                        className="text-[10px] text-[#B8862E] hover:text-[#8C6A3F] font-bold flex items-center gap-1 bg-[#FAF7F0] hover:bg-[#F1ECE0] border border-[#E4DCC8] px-2.5 py-1.5 rounded-md transition-all shadow-sm"
                      >
                        <Sparkles className="w-3 h-3 text-[#B8862E]" />
                        <span>مولد الصور الابتكاري / Placeholder</span>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#6B6255] block">الوصف الفني التفصيلي للمنتج *</label>
                    <textarea 
                      required
                      rows={3}
                      value={prodFormDescription}
                      onChange={(e) => setProdFormDescription(e.target.value)}
                      placeholder="اكتب مواصفات المنتج وعروقه ومدى مناسبته للمطابخ ومعدل مقاومته للرطوبة..."
                      className="w-full bg-[#FAF7F0] border border-[#E4DCC8] rounded px-3 py-1.5 text-sm resize-y"
                    />
                  </div>

                  <div className="flex items-center gap-3 py-2">
                    <input 
                      type="checkbox" 
                      id="form-instock"
                      checked={prodFormInStock}
                      onChange={(e) => setProdFormInStock(e.target.checked)}
                      className="w-4 h-4 text-[#B8862E] accent-[#B8862E]"
                    />
                    <label htmlFor="form-instock" className="text-xs font-semibold text-[#161513]">المنتج متوفر بالمخزن للتوريد الفوري</label>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button 
                      type="submit" 
                      className="flex-1 bg-[#252220] hover:bg-[#161513] text-white text-xs font-bold py-3 rounded transition-colors"
                    >
                      {prodFormId ? "تحديث بيانات المنتج" : "حفظ المنتج الجديد بقاعدة البيانات"}
                    </button>
                    {prodFormId && (
                      <button 
                        type="button"
                        onClick={resetProductForm}
                        className="px-4 bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-bold rounded"
                      >
                        إلغاء التعديل
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* Product Live List Table */}
              <div className="lg:col-span-7 bg-white rounded-xl border border-[#E4DCC8] overflow-hidden shadow-sm">
                <div className="p-5 border-b border-[#F1ECE0] bg-gray-50/50">
                  <h3 className="font-serif text-base font-semibold text-[#161513]">قائمة منتجات المستودع الحية</h3>
                  <span className="text-xs text-[#6B6255]">تعرض كافة المنتجات المخزنة والمسعرة. يمكنك تعديل السعر أو سحب المنتج أو حذفه.</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-right text-xs">
                    <thead className="bg-[#FAF7F0] text-[#6B6255] uppercase font-bold border-b border-[#E4DCC8]">
                      <tr>
                        <th className="p-4">الصورة</th>
                        <th className="p-4">اسم المنتج</th>
                        <th className="p-4">التصنيف</th>
                        <th className="p-4">السعر</th>
                        <th className="p-4">المخزن</th>
                        <th className="p-4 text-center">خيارات التحكم</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {adminFilteredProducts.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="p-8 text-center text-gray-500 font-semibold bg-gray-50/30">
                            <div className="flex flex-col items-center justify-center gap-2 py-4">
                              <Search className="w-8 h-8 text-gray-300" />
                              <span>لا توجد منتجات تطابق استعلام البحث الحالي.</span>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        adminFilteredProducts.map((p) => (
                          <tr key={p.id} className="hover:bg-[#FAF7F0]/40 transition-colors">
                            <td className="p-4">
                              <div className="w-12 h-12 rounded overflow-hidden border border-gray-200">
                                <img src={p.image} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="font-bold text-[#161513]">{p.name}</div>
                              <div className="text-[10px] text-[#6B6255]">{p.dimensions}</div>
                            </td>
                            <td className="p-4">
                              <span className="bg-gray-100 text-gray-800 text-[10px] font-semibold px-2.5 py-0.5 rounded-full">
                                {p.category}
                              </span>
                            </td>
                            <td className="p-4 font-mono font-bold text-[#8C6A3F]">
                              {p.price}
                            </td>
                            <td className="p-4">
                              <span className={`w-2.5 h-2.5 rounded-full inline-block ${p.inStock ? "bg-green-500" : "bg-red-500"}`} />
                              <span className="mr-1.5 text-[10px]">{p.inStock ? "متوفر" : "طلب مسبق"}</span>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center justify-center gap-2">
                                <button
                                  onClick={() => startEditProduct(p)}
                                  className="p-1.5 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors"
                                  title="تعديل المنتج"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteProduct(p.id)}
                                  className="p-1.5 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors"
                                  title="حذف نهائي"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* ============ TAB: PROJECT MANAGEMENT ============ */}
          {adminActiveTab === "projects" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Project Form (Add/Edit) */}
              <div className="lg:col-span-5 bg-white p-6 rounded-xl border border-[#E4DCC8] shadow-sm space-y-4">
                <div className="pb-3 border-b border-[#F1ECE0]">
                  <h3 className="font-serif text-lg font-semibold text-[#161513]">
                    {projFormId ? "تعديل المشروع المنجز" : "إضافة مشروع منجز جديد للمعرض"}
                  </h3>
                  <span className="text-xs text-[#6B6255]">سيتم عرض المشاريع في معرض المنفذات لتبني الثقة لعملائك الجدد.</span>
                </div>

                <form onSubmit={handleSaveProject} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#6B6255] block">اسم المشروع والموقع *</label>
                    <input 
                      type="text" 
                      required
                      value={projFormName}
                      onChange={(e) => setProjFormName(e.target.value)}
                      placeholder="مثال: بهو قاعة المؤتمرات بفاس"
                      className="w-full bg-[#FAF7F0] border border-[#E4DCC8] rounded px-3 py-1.5 text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#6B6255] block">نوع المشروع *</label>
                      <select
                        value={projFormType}
                        onChange={(e) => setProjFormType(e.target.value as any)}
                        className="w-full bg-[#FAF7F0] border border-[#E4DCC8] rounded px-3 py-2 text-sm"
                      >
                        <option value="فيلات">فيلات</option>
                        <option value="فنادق">فنادق</option>
                        <option value="مساجد">مساجد</option>
                        <option value="مكاتب">مكاتب</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#6B6255] block">اسم العميل والجهة المسؤولة *</label>
                      <input 
                        type="text" 
                        required
                        value={projFormClient}
                        onChange={(e) => setProjFormClient(e.target.value)}
                        placeholder="مثال: شركة العقار والتنمية"
                        className="w-full bg-[#FAF7F0] border border-[#E4DCC8] rounded px-3 py-1.5 text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5 col-span-2">
                      <label className="text-xs font-semibold text-[#6B6255] block">تاريخ الإنجاز والاعتماد *</label>
                      <input 
                        type="date" 
                        required
                        value={projFormDate}
                        onChange={(e) => setProjFormDate(e.target.value)}
                        className="w-full bg-[#FAF7F0] border border-[#E4DCC8] rounded px-3 py-1.5 text-sm font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#6B6255] block">رابط أو مسار صورة المشروع *</label>
                    <input 
                      type="text" 
                      value={projFormImage}
                      onChange={(e) => setProjFormImage(e.target.value)}
                      placeholder="مسار صورة حقيقي للمشروع"
                      className="w-full bg-[#FAF7F0] border border-[#E4DCC8] rounded px-3 py-1.5 text-sm font-mono"
                    />
                    <div className="flex items-center justify-between gap-2 mt-1">
                      <span className="text-[10px] text-[#6B6255]">أدخل رابط الصورة أو استخدم المولد لاختيار مظهر احترافي فوري.</span>
                      <button
                        type="button"
                        onClick={() => {
                          setImgGeneratorTarget("project");
                          setShowImgGenerator(true);
                        }}
                        className="text-[10px] text-[#B8862E] hover:text-[#8C6A3F] font-bold flex items-center gap-1 bg-[#FAF7F0] hover:bg-[#F1ECE0] border border-[#E4DCC8] px-2.5 py-1 rounded-md transition-all shadow-sm"
                      >
                        <Sparkles className="w-3 h-3 text-[#B8862E]" />
                        <span>مولد الصور الابتكاري / Placeholder</span>
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button 
                      type="submit" 
                      className="flex-1 bg-[#252220] hover:bg-[#161513] text-white text-xs font-bold py-3 rounded transition-colors"
                    >
                      {projFormId ? "تحديث المشروع" : "حفظ المشروع الجديد"}
                    </button>
                    {projFormId && (
                      <button 
                        type="button"
                        onClick={resetProjectForm}
                        className="px-4 bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-bold rounded"
                      >
                        إلغاء التعديل
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* Projects List Table */}
              <div className="lg:col-span-7 bg-white rounded-xl border border-[#E4DCC8] overflow-hidden shadow-sm">
                <div className="p-5 border-b border-[#F1ECE0] bg-gray-50/50">
                  <h3 className="font-serif text-base font-semibold text-[#161513]">ألبوم مشاريع الشركة المعتمدة</h3>
                  <span className="text-xs text-[#6B6255]">تعرض كافة المشاريع المكتملة في المعرض العام حالياً.</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-right text-xs">
                    <thead className="bg-[#FAF7F0] text-[#6B6255] uppercase font-bold border-b border-[#E4DCC8]">
                      <tr>
                        <th className="p-4">الصورة</th>
                        <th className="p-4">اسم المشروع</th>
                        <th className="p-4">النوع</th>
                        <th className="p-4">العميل</th>
                        <th className="p-4">التاريخ</th>
                        <th className="p-4 text-center">الخيارات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {adminFilteredProjects.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="p-8 text-center text-gray-500 font-semibold bg-gray-50/30">
                            <div className="flex flex-col items-center justify-center gap-2 py-4">
                              <Search className="w-8 h-8 text-gray-300" />
                              <span>لا توجد مشاريع تطابق استعلام البحث الحالي.</span>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        adminFilteredProjects.map((p) => (
                          <tr key={p.id} className="hover:bg-[#FAF7F0]/40 transition-colors">
                            <td className="p-4">
                              <div className="w-12 h-12 rounded overflow-hidden border border-gray-200">
                                <img src={p.image} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                              </div>
                            </td>
                            <td className="p-4 font-bold text-[#161513]">{p.name}</td>
                            <td className="p-4">
                              <span className="bg-amber-50 text-amber-800 text-[10px] font-semibold px-2.5 py-0.5 rounded-full">
                                {p.type}
                              </span>
                            </td>
                            <td className="p-4 text-[#6B6255]">{p.client}</td>
                            <td className="p-4 font-mono">{p.completionDate}</td>
                            <td className="p-4 text-center">
                              <div className="flex items-center justify-center gap-2">
                                <button
                                  onClick={() => startEditProject(p)}
                                  className="p-1.5 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteProject(p.id)}
                                  className="p-1.5 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* ============ TAB: SAMPLE INQUIRIES VIEW ============ */}
          {adminActiveTab === "inquiries" && (
            <div className="bg-white rounded-xl border border-[#E4DCC8] shadow-sm overflow-hidden">
              <div className="p-6 border-b border-[#F1ECE0] bg-gray-50/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="font-serif text-base font-semibold text-[#161513]">طلبات المعاينة واستفسارات العينات الواردة</h3>
                  <span className="text-xs text-[#6B6255]">يتم تحديث الطلبات لحظياً فور إرسالها من النموذج الخارجي للعملاء بالأسفل.</span>
                </div>
                <div className="bg-[#B8862E]/10 border border-[#B8862E] px-4 py-2 rounded text-xs font-bold text-[#8C6A3F]">
                  إجمالي الطلبات: {inquiries.length} طلبات حية
                </div>
              </div>

              {inquiries.length === 0 ? (
                <div className="text-center py-16 space-y-3">
                  <MessageSquare className="w-12 h-12 text-gray-300 mx-auto" />
                  <p className="text-sm text-gray-500 font-semibold">لا توجد أي استفسارات أو طلبات عينات واردة بعد.</p>
                  <p className="text-xs text-gray-400">عند تعبئة النموذج من الصفحة الرئيسية كعميل، ستظهر التفاصيل هنا في التو واللحظة.</p>
                </div>
              ) : adminFilteredInquiries.length === 0 ? (
                <div className="text-center py-16 space-y-3">
                  <Search className="w-12 h-12 text-[#B8862E]/30 mx-auto" />
                  <p className="text-sm text-gray-500 font-semibold">لا توجد طلبات عينات تطابق استعلام البحث الحالي.</p>
                  <p className="text-xs text-gray-400">حاول البحث باستخدام اسم العميل، رقم الهاتف، أو اسم المنتج المراد معاينته.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-right text-xs">
                    <thead className="bg-[#FAF7F0] text-[#6B6255] font-bold border-b border-[#E4DCC8]">
                      <tr>
                        <th className="p-4">العميل</th>
                        <th className="p-4">رقم الهاتف للتواصل</th>
                        <th className="p-4">المدينة ومكان التسليم</th>
                        <th className="p-4">المنتج المراد معاينته</th>
                        <th className="p-4">تفاصيل / ملاحظات المشروع</th>
                        <th className="p-4">تاريخ ووقت الإرسال</th>
                        <th className="p-4">حالة الطلب</th>
                        <th className="p-4 text-center">خيارات التحكم المباشرة</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {adminFilteredInquiries.map((req) => (
                        <tr key={req.id} className="hover:bg-[#FAF7F0]/20 transition-colors">
                          <td className="p-4 font-bold text-[#161513]">{req.clientName}</td>
                          <td className="p-4 font-mono font-bold text-blue-600">
                            <a href={`tel:${req.phone}`} className="hover:underline flex items-center gap-1">
                              <Phone className="w-3 h-3" />
                              <span>{req.phone}</span>
                            </a>
                          </td>
                          <td className="p-4 text-[#161513]">{req.city}</td>
                          <td className="p-4 font-semibold text-[#8C6A3F]">{req.productName}</td>
                          <td className="p-4 max-w-xs truncate text-[#6B6255]" title={req.notes}>
                            {req.notes || "لا توجد ملاحظات"}
                          </td>
                          <td className="p-4 font-mono text-[10px] text-gray-500">
                            {new Date(req.createdAt).toLocaleString("ar-MA", { hour12: false })}
                          </td>
                          <td className="p-4">
                            <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                              req.status === "جديد" ? "bg-amber-100 text-amber-800 border border-amber-200" :
                              req.status === "قيد المعالجة" ? "bg-blue-100 text-blue-800 border border-blue-200" :
                              "bg-green-100 text-green-800 border border-green-200"
                            }`}>
                              {req.status}
                            </span>
                          </td>
                          <td className="p-4 text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              {req.status !== "تم التسليم" && (
                                <button
                                  onClick={() => handleUpdateInquiryStatus(req.id, req.status === "جديد" ? "قيد المعالجة" : "تم التسليم")}
                                  className="px-2 py-1 bg-green-50 hover:bg-green-100 text-green-700 rounded border border-green-200 font-bold text-[10px] transition-colors"
                                >
                                  {req.status === "جديد" ? "البدء بالمعالجة" : "تم تسليم العينة ✓"}
                                </button>
                              )}
                              <button
                                onClick={() => setPrintTarget(req)}
                                className="p-1 bg-amber-50 hover:bg-amber-100 text-[#B8862E] rounded border border-[#E4DCC8] transition-colors"
                                title="طباعة نموذج وسند استلام العينة"
                              >
                                <Printer className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteInquiry(req.id)}
                                className="p-1 bg-red-50 text-red-600 rounded hover:bg-red-100 border border-red-200 transition-colors"
                                title="إزالة من اللوحة"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

        </main>
      )}

      {/* ============ BOTTOM PREMIUM FOOTER ============ */}
      <footer className="bg-[#161513] text-[#B5AC9A] border-t border-[#B8862E]/20 py-12 text-center text-xs mt-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 space-y-6">
          <div className="flex justify-center items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#FAF7F0]/5 flex items-center justify-center border border-[#B8862E]">
              <span className="text-[#FAF7F0] font-serif font-bold text-sm">◆</span>
            </div>
            <span className="font-serif text-lg font-bold text-white tracking-tight">دار الزليج للرخام والزليج الإرثي</span>
          </div>
          
          <p className="max-w-xl mx-auto leading-relaxed">
            أنظمة توريد متكاملة تضمن جودة ومطابقة المنتجات الحقيقية للمواصفات الهندسية العالمية مع الحساب الدقيق لكميات الهدر.
          </p>

          <div className="flex justify-center gap-8 text-[11px] text-[#D8D2C4] font-medium pt-4 border-t border-[#FAF7F0]/10 max-w-md mx-auto">
            <span>الدار البيضاء — المغرب</span>
            <span>هاتف: +212 6 00 00 00 00</span>
            <a href="/DJANGO_GUIDE.md" target="_blank" className="text-[#D9B45F] hover:underline">ملف الموديلات وتوجيهات Django</a>
          </div>

          <p className="text-[10px] text-[#B5AC9A]/40 pt-4">
            © {new Date().getFullYear()} دار الزليج. جميع الحقوق الفنية والبرمجية محفوظة.
          </p>
        </div>
      </footer>

      {/* ============ MODAL: PRODUCT DETAILS ============ */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 bg-white/85 hover:bg-white text-gray-800 p-2 rounded-full shadow z-10 transition-colors"
                id="close-modal-btn"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Product Image */}
                <div className="h-64 md:h-full min-h-[300px] bg-[#FAF7F0] relative">
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.name} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-4 right-4 bg-[#252220] text-[#D9B45F] text-xs font-bold px-3 py-1.5 rounded shadow-lg">
                    المقاس: {selectedProduct.dimensions}
                  </div>
                </div>

                {/* Details Content */}
                <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div>
                      <span className="text-xs font-bold text-[#B8862E] uppercase tracking-wider block">{selectedProduct.category}</span>
                      <h3 className="font-serif text-2xl font-bold text-[#161513] mt-1">{selectedProduct.name}</h3>
                    </div>

                    <p className="text-sm text-[#6B6255] leading-relaxed">{selectedProduct.description}</p>
                    
                    <div className="space-y-2 pt-3 border-t border-gray-100">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500 font-semibold">حالة التوفر:</span>
                        <span className={`font-bold ${selectedProduct.inStock ? "text-green-600" : "text-amber-600"}`}>
                          {selectedProduct.inStock ? "متوفر حالياً بالكامل للتوريد الفوري" : "طلب مسبق (تصنيع بالطلب خلال ١٥ يوم)"}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500 font-semibold">التكلفة المالية الصافية:</span>
                        <span className="font-mono text-[#8C6A3F] font-bold text-sm">{selectedProduct.price}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 pt-4">
                    <button 
                      onClick={() => handleRequestSampleForProduct(selectedProduct)}
                      className="w-full bg-[#252220] hover:bg-[#161513] text-white text-xs font-bold py-3.5 rounded transition-colors flex items-center justify-center gap-2 shadow-md"
                    >
                      <Sparkles className="w-4 h-4 text-[#D9B45F]" />
                      <span>اطلب عينة مجانية لمعاينة اللون واللمس</span>
                    </button>
                    
                    <a 
                      href={`https://wa.me/212600000000?text=${encodeURIComponent(`مرحباً، أريد الاستفسار عن تفاصيل وأسعار توريد كميات كبيرة من المنتج: ${selectedProduct.name}`)}`}
                      target="_blank"
                      className="w-full bg-[#25D366] hover:bg-[#20ba56] text-white text-xs font-bold py-3 rounded transition-colors flex items-center justify-center gap-2 shadow-sm"
                    >
                      <Phone className="w-4 h-4" />
                      <span>استفسار واتساب سريع بالجملة</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============ MODAL: CUSTOM DELETION CONFIRMATION ============ */}
      <AnimatePresence>
        {deleteTarget && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setDeleteTarget(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl border border-red-100 p-6 relative text-right"
              onClick={(e) => e.stopPropagation()}
              id="delete-confirm-modal"
            >
              {/* Alert Icon Header */}
              <div className="flex items-center gap-4 mb-4 pb-3 border-b border-gray-100">
                <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-600 shrink-0">
                  <Trash2 className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-gray-900">تأكيد عملية الحذف</h3>
                  <p className="text-xs text-gray-500 mt-0.5">تحذير: لا يمكن التراجع عن هذا الإجراء</p>
                </div>
              </div>

              {/* Message Content */}
              <div className="space-y-3 my-4">
                <p className="text-sm text-gray-600 leading-relaxed">
                  هل أنت متأكد تماماً من رغبتك في حذف العنصر التالي نهائياً من النظام؟
                </p>
                <div className="bg-red-50/50 border border-red-100 rounded-lg p-3 text-sm font-semibold text-red-900 font-sans flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0" />
                  <span className="break-all">{deleteTarget.name}</span>
                </div>
                <p className="text-[11px] text-gray-400">
                  سيتم حذف كافة البيانات المرتبطة بهذا العنصر فوراً وبشكل دائم من الـ LocalStorage ومحاكاة نظام إدارة Django.
                </p>
              </div>

              {/* Actions Footer */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
                <button
                  onClick={() => setDeleteTarget(null)}
                  className="px-4 py-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-bold transition-all"
                  id="cancel-delete-btn"
                >
                  إلغاء الأمر
                </button>
                <button
                  onClick={executeDelete}
                  className="px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2"
                  id="confirm-delete-btn"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>نعم، احذف نهائياً</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============ MODAL: PROFESSIONAL ARTWORK & PLACEHOLDER GENERATOR ============ */}
      <AnimatePresence>
        {showImgGenerator && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setShowImgGenerator(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl border border-[#E4DCC8] p-6 relative text-right flex flex-col gap-4 max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
              id="artwork-generator-modal"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-gray-150">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#B8862E]/10 flex items-center justify-center text-[#B8862E]">
                    <Sparkles className="w-5 h-5 animate-spin" style={{ animationDuration: "3s" }} />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-gray-900">مساعد توليد الصور الفنية والـ Placeholders</h3>
                    <p className="text-xs text-gray-500">قم بتوليد نقوش هندسية كلاسيكية أو اختر صوراً حية لتعزيز كتالوج المعرض</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowImgGenerator(false)}
                  className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-gray-100 gap-4 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setImgGenTab("vector")}
                  className={`pb-2 px-1 relative flex items-center gap-1.5 ${imgGenTab === "vector" ? "text-[#B8862E]" : "text-gray-500 hover:text-gray-800"}`}
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>توليد نقوش هندسية (Vector SVG)</span>
                  {imgGenTab === "vector" && <div className="absolute bottom-0 inset-x-0 h-0.5 bg-[#B8862E]" />}
                </button>
                <button
                  type="button"
                  onClick={() => setImgGenTab("photos")}
                  className={`pb-2 px-1 relative flex items-center gap-1.5 ${imgGenTab === "photos" ? "text-[#B8862E]" : "text-gray-500 hover:text-gray-800"}`}
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>صور معمارية ملهمة (Curated)</span>
                  {imgGenTab === "photos" && <div className="absolute bottom-0 inset-x-0 h-0.5 bg-[#B8862E]" />}
                </button>
              </div>

              {/* Main Tab Content */}
              <div className="overflow-y-auto flex-1 min-h-[300px] max-h-[50vh] pr-1">
                
                {imgGenTab === "vector" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                    {/* Control Panel */}
                    <div className="space-y-4">
                      {/* Pattern Type */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-700 block">نوع وتصميم النقش المغربي</label>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { id: "star", name: "نجمة ثمانية أندلسية" },
                            { id: "mosaic", name: "فسيفساء فاسي متداخل" },
                            { id: "marble", name: "رخام بعروق طبيعية" },
                            { id: "chevron", name: "بلاط متعرج مائل" }
                          ].map((p) => (
                            <button
                              key={p.id}
                              type="button"
                              onClick={() => setImgGenPattern(p.id)}
                              className={`p-2.5 rounded-lg border text-center transition-all text-xs font-semibold ${
                                imgGenPattern === p.id 
                                  ? "border-[#B8862E] bg-[#FAF7F0] text-[#B8862E] shadow-sm font-bold" 
                                  : "border-gray-200 hover:border-[#B8862E] text-gray-700 bg-white"
                              }`}
                            >
                              {p.name}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Primary Color Picker */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-700 block">اللون الرئيسي (النقشة أو العروق)</label>
                        <div className="flex flex-wrap gap-2">
                          {[
                            { hex: "#B8862E", name: "ذهبي" },
                            { hex: "#0A369D", name: "أزرق فاسي" },
                            { hex: "#0F5132", name: "أخضر زمردي" },
                            { hex: "#800000", name: "قرميدي" },
                            { hex: "#161513", name: "أسود" },
                            { hex: "#E4DCC8", name: "بيج كلاسيكي" },
                            { hex: "#FAF7F0", name: "كريمي" }
                          ].map((col) => (
                            <button
                              key={col.hex}
                              type="button"
                              onClick={() => setImgGenPrimary(col.hex)}
                              className="w-8 h-8 rounded-full border border-gray-300 relative transition-transform hover:scale-115 shadow-sm"
                              style={{ backgroundColor: col.hex }}
                              title={col.name}
                            >
                              {imgGenPrimary === col.hex && (
                                <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white drop-shadow-md">✓</span>
                              )}
                            </button>
                          ))}
                          <input 
                            type="color" 
                            value={imgGenPrimary}
                            onChange={(e) => setImgGenPrimary(e.target.value)}
                            className="w-8 h-8 rounded-full border border-gray-300 cursor-pointer overflow-hidden p-0"
                            title="لون مخصص"
                          />
                        </div>
                      </div>

                      {/* Secondary Color Picker */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-700 block">اللون الخلفي (قاعدة البلاط)</label>
                        <div className="flex flex-wrap gap-2">
                          {[
                            { hex: "#FAF7F0", name: "كريمي عتيق" },
                            { hex: "#161513", name: "أسود صخري" },
                            { hex: "#E4DCC8", name: "بيج مغربي" },
                            { hex: "#0A369D", name: "أزرق عميق" },
                            { hex: "#0F5132", name: "أخضر ملكي" },
                            { hex: "#FFFFFF", name: "أبيض ناصع" }
                          ].map((col) => (
                            <button
                              key={col.hex}
                              type="button"
                              onClick={() => setImgGenSecondary(col.hex)}
                              className="w-8 h-8 rounded-full border border-gray-300 relative transition-transform hover:scale-115 shadow-sm"
                              style={{ backgroundColor: col.hex }}
                              title={col.name}
                            >
                              {imgGenSecondary === col.hex && (
                                <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white drop-shadow-md">✓</span>
                              )}
                            </button>
                          ))}
                          <input 
                            type="color" 
                            value={imgGenSecondary}
                            onChange={(e) => setImgGenSecondary(e.target.value)}
                            className="w-8 h-8 rounded-full border border-gray-300 cursor-pointer overflow-hidden p-0"
                            title="لون مخصص"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Preview Panel */}
                    <div className="bg-[#FAF7F0] border border-gray-200 rounded-xl p-4 flex flex-col items-center justify-center gap-3">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">معاينة البلاط المولد حياً</span>
                      <div className="w-48 h-48 rounded-lg overflow-hidden shadow-lg border border-white bg-white">
                        <img 
                          src={generateCustomSVG(imgGenPattern, imgGenPrimary, imgGenSecondary)} 
                          alt="Custom pattern preview" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-center">
                        <span className="text-[10px] text-gray-400 block font-mono">طبيعة الصورة: Vector Base64 SVG</span>
                        <span className="text-xs text-gray-600 mt-1 font-semibold block">نقش هندسي متناسق وقابل للتكبير بلا نهاية</span>
                      </div>
                    </div>
                  </div>
                )}

                {imgGenTab === "photos" && (
                  <div className="space-y-4">
                    <span className="text-xs font-bold text-gray-500 block">اختر من مكتبة الصور المعمارية عالية الجودة والملائمة لمواد دار الزليج:</span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {curatedPhotos.map((item) => (
                        <div 
                          key={item.id}
                          onClick={() => {
                            if (imgGeneratorTarget === "product") {
                              setProdFormImage(item.url);
                            } else {
                              setProjFormImage(item.url);
                            }
                            triggerToast(`تم اختيار صورة ${item.name}`);
                            setShowImgGenerator(false);
                          }}
                          className="group relative h-28 rounded-xl overflow-hidden border border-gray-200 cursor-pointer hover:border-[#B8862E] hover:shadow-md transition-all"
                        >
                          <img 
                            src={item.url} 
                            alt={item.name} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-2 text-right">
                            <span className="text-[10px] text-[#D9B45F] font-bold">{item.tag}</span>
                            <span className="text-[10px] text-white font-bold truncate">{item.name}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>

              {/* Actions Footer */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-150">
                <button
                  type="button"
                  onClick={() => setShowImgGenerator(false)}
                  className="px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-bold transition-all"
                >
                  إلغاء
                </button>
                {imgGenTab === "vector" && (
                  <button
                    type="button"
                    onClick={() => {
                      const svgUri = generateCustomSVG(imgGenPattern, imgGenPrimary, imgGenSecondary);
                      if (imgGeneratorTarget === "product") {
                        setProdFormImage(svgUri);
                      } else {
                        setProjFormImage(svgUri);
                      }
                      triggerToast("تم تطبيق البلاط المولد هندسياً بنجاح.");
                      setShowImgGenerator(false);
                    }}
                    className="px-5 py-2 rounded-lg bg-[#252220] hover:bg-[#161513] text-white text-xs font-bold transition-all shadow-md flex items-center gap-2"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#D9B45F]" />
                    <span>تطبيق واعتماد التصميم</span>
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============ MODAL: A4 SAMPLE DELIVERY RECEIPT PRINT PREVIEW ============ */}
      <AnimatePresence>
        {printTarget && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setPrintTarget(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-[#FAF7F0] rounded-2xl w-full max-w-5xl overflow-hidden shadow-2xl border border-[#E4DCC8] flex flex-col lg:flex-row text-right h-auto lg:h-[85vh]"
              onClick={(e) => e.stopPropagation()}
              id="print-preview-modal"
            >
              {/* Left Side: Control Panel (Customization) */}
              <div className="lg:w-1/3 bg-[#FAF7F0] p-6 border-l border-[#E4DCC8] flex flex-col justify-between overflow-y-auto">
                <div className="space-y-6">
                  <div className="flex items-center gap-3 pb-4 border-b border-[#E4DCC8]">
                    <div className="w-10 h-10 rounded-full bg-[#B8862E]/10 flex items-center justify-center text-[#B8862E]">
                      <Printer className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-serif text-base font-bold text-[#161513]">تجهيز طباعة سند استلام العينة</h3>
                      <p className="text-[11px] text-[#6B6255]">تخصيص بيانات السند لطباعتها في ورقة A4 لمندوب التوصيل</p>
                    </div>
                  </div>

                  {/* Representative Name input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 block">اسم مندوب التوصيل / الناقل</label>
                    <input
                      type="text"
                      value={printDriverName}
                      onChange={(e) => setPrintDriverName(e.target.value)}
                      placeholder="مثال: أحمد المحمدي - مندوب التوصيل"
                      className="w-full bg-white border border-[#E4DCC8] rounded px-3 py-2 text-xs"
                    />
                  </div>

                  {/* Special Instructions for Driver */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 block">توجيهات وملاحظات التسليم الخاصة</label>
                    <textarea
                      value={printCustomNotes}
                      onChange={(e) => setPrintCustomNotes(e.target.value)}
                      rows={3}
                      placeholder="تعليمات للمندوب أو العميل عند التسليم..."
                      className="w-full bg-white border border-[#E4DCC8] rounded px-3 py-2 text-xs"
                    />
                  </div>

                  {/* Print Tips Info */}
                  <div className="bg-[#B8862E]/5 border border-[#B8862E]/20 rounded-xl p-4 space-y-2">
                    <h4 className="text-xs font-bold text-[#8C6A3F] flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5 text-[#B8862E]" />
                      <span>إرشادات الطباعة المثالية:</span>
                    </h4>
                    <ul className="text-[11px] text-[#6B6255] space-y-1 list-disc pr-4 leading-relaxed">
                      <li>تم تصميم السند ليتوافق تلقائياً مع مقاس ورق <strong>A4</strong> القياسي.</li>
                      <li>تأكد من تفعيل خيار <strong>"طباعة الخلفيات والألوان"</strong> في إعدادات الطباعة بالمتصفح للحصول على المظهر الفاخر الكامل.</li>
                      <li>يمكنك تركيز الطابعة على النسخة الملونة أو الأبيض والأسود حسب رغبتك.</li>
                    </ul>
                  </div>
                </div>

                {/* Modal actions */}
                <div className="pt-6 border-t border-[#E4DCC8] flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      // Trigger native print flow
                      window.print();
                    }}
                    className="flex-1 bg-[#252220] hover:bg-[#161513] text-white text-xs font-bold py-3 px-4 rounded-lg transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <Printer className="w-4 h-4 text-[#D9B45F]" />
                    <span>طباعة السند الآن (A4)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPrintTarget(null)}
                    className="px-4 py-3 rounded-lg border border-gray-300 hover:bg-gray-100 text-gray-700 text-xs font-bold transition-all"
                  >
                    إغلاق
                  </button>
                </div>
              </div>

              {/* Right Side: A4 Live Sheet Preview */}
              <div className="lg:w-2/3 bg-gray-200/50 p-6 flex items-center justify-center overflow-y-auto max-h-[50vh] lg:max-h-none">
                <div 
                  id="print-section"
                  className="bg-white w-[210mm] min-h-[297mm] p-8 sm:p-12 shadow-xl border border-gray-300 text-[#161513] flex flex-col justify-between text-right relative font-sans scale-[0.6] sm:scale-[0.7] lg:scale-[0.8] xl:scale-[0.9] origin-center shrink-0 my-8 bg-cover bg-center"
                >
                  
                  {/* Styling override specifically for printing */}
                  <style dangerouslySetInnerHTML={{ __html: `
                    @media print {
                      body * {
                        visibility: hidden !important;
                      }
                      #print-section, #print-section * {
                        visibility: visible !important;
                      }
                      #print-section {
                        position: absolute !important;
                        left: 0 !important;
                        top: 0 !important;
                        width: 210mm !important;
                        height: 297mm !important;
                        padding: 15mm !important;
                        margin: 0 !important;
                        border: none !important;
                        box-shadow: none !important;
                        background: white !important;
                        color: black !important;
                        transform: scale(1) !important;
                        transform-origin: top left !important;
                        direction: rtl !important;
                      }
                      .no-print {
                        display: none !important;
                      }
                    }
                  ` }} />

                  {/* Header Decoration */}
                  <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-[#B8862E] via-[#E4DCC8] to-[#161513]" />

                  {/* Inner receipt layout */}
                  <div className="space-y-6">
                    {/* Top Business Header */}
                    <div className="flex justify-between items-start border-b-2 border-[#FAF7F0] pb-6">
                      {/* Arabic Logo */}
                      <div className="space-y-1">
                        <h2 className="font-serif text-xl font-bold text-[#161513] flex items-center gap-2">
                          <span className="text-[#B8862E]">◆</span>
                          <span>دار الزليج للرخام والزليج</span>
                        </h2>
                        <p className="text-[10px] text-gray-500 font-medium">تأصيل معمار الفخامة والإرث الهندسي الأندلسي</p>
                        <p className="text-[9px] text-[#8C6A3F] font-bold">قسم مراقبة الجودة والطلبات الخارجية للعينات</p>
                      </div>

                      {/* Brand Motif */}
                      <div className="hidden sm:flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full border border-[#B8862E] flex items-center justify-center text-xs text-[#B8862E] font-bold">
                          ◈
                        </div>
                        <span className="text-[8px] text-gray-400 mt-1 uppercase tracking-wider">Heritage Brand</span>
                      </div>

                      {/* English Logo */}
                      <div className="text-left space-y-1">
                        <h2 className="font-serif text-base font-bold text-[#161513]">DAR AL-ZELLIGE</h2>
                        <p className="text-[9px] text-gray-400 font-mono">Premium Zellige & Stone</p>
                        <p className="text-[9px] text-gray-500">Casablanca, Morocco</p>
                      </div>
                    </div>

                    {/* Document Title bar */}
                    <div className="bg-[#FAF7F0] border border-[#E4DCC8] rounded-xl p-4 text-center space-y-1">
                      <h1 className="font-serif text-lg font-bold text-[#161513]">سند استلام وتسليم عينات معمارية</h1>
                      <p className="text-[10px] text-[#8C6A3F] font-semibold">وثيقة رسمية مخصصة لمطابقة ومعاينة جودة الحجر والزليج الإرثي</p>
                    </div>

                    {/* Metadata & Receipt Details */}
                    <div className="grid grid-cols-3 gap-4 text-xs bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <div>
                        <span className="text-gray-400 block mb-1">رقم السند المرجعي:</span>
                        <span className="font-mono font-bold text-gray-900 text-xs">DZ-SMP-{printTarget.id.substring(0, 8).toUpperCase()}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 block mb-1">تاريخ ووقت الطلب:</span>
                        <span className="font-mono text-gray-900 text-xs">
                          {new Date(printTarget.createdAt).toLocaleString("ar-MA", { hour12: false })}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-400 block mb-1">تاريخ الطباعة والإرسال:</span>
                        <span className="font-mono text-gray-900 text-xs">
                          {new Date().toLocaleDateString("ar-MA")} {new Date().toLocaleTimeString("ar-MA", { hour12: false })}
                        </span>
                      </div>
                    </div>

                    {/* Customer Data */}
                    <div className="space-y-2">
                      <h3 className="text-xs font-bold text-[#8C6A3F] border-r-2 border-[#B8862E] pr-2">بيانات العميل المستلم وعنوان وجهة التوصيل:</h3>
                      <div className="grid grid-cols-2 gap-4 text-xs bg-white border border-gray-100 p-4 rounded-xl">
                        <div className="space-y-2">
                          <div className="flex gap-2">
                            <span className="text-gray-400 w-24 block">اسم العميل:</span>
                            <span className="font-bold text-gray-900">{printTarget.clientName}</span>
                          </div>
                          <div className="flex gap-2">
                            <span className="text-gray-400 w-24 block">رقم الهاتف:</span>
                            <span className="font-mono font-bold text-blue-800">{printTarget.phone}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex gap-2">
                            <span className="text-gray-400 w-24 block">المدينة / المقر:</span>
                            <span className="font-bold text-gray-900">{printTarget.city}</span>
                          </div>
                          <div className="flex gap-2">
                            <span className="text-gray-400 w-24 block">ملاحظات العميل:</span>
                            <span className="text-gray-600 font-medium truncate max-w-[200px]" title={printTarget.notes}>
                              {printTarget.notes || "لا توجد ملاحظات مخصصة"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Sample Materials Details Table */}
                    <div className="space-y-2">
                      <h3 className="text-xs font-bold text-[#8C6A3F] border-r-2 border-[#B8862E] pr-2">المواد المعمارية المرفقة بسلة العينات:</h3>
                      <table className="w-full text-right text-xs border border-gray-200 rounded-lg overflow-hidden">
                        <thead className="bg-[#FAF7F0] border-b border-gray-200 text-gray-700 font-bold">
                          <tr>
                            <th className="p-3 border-l border-gray-200 text-center w-12">م</th>
                            <th className="p-3 border-l border-gray-200">الصنف والوصف الفني</th>
                            <th className="p-3 border-l border-gray-200 text-center">أبعاد العينة المرجعية</th>
                            <th className="p-3 border-l border-gray-200 text-center w-20">الكمية</th>
                            <th className="p-3 text-center">حالة المنتج بالمعرض</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          <tr>
                            <td className="p-3 border-l border-gray-200 text-center font-bold">١</td>
                            <td className="p-3 border-l border-gray-200">
                              <span className="font-bold text-gray-900 block">{printTarget.productName}</span>
                              <span className="text-[10px] text-gray-400 block">تصميم مغربي كلاسيكي أصيل خاضع لمعاينة الملمس واللون</span>
                            </td>
                            <td className="p-3 border-l border-gray-200 text-center font-mono text-gray-600">قطعة نموذجية قياسية</td>
                            <td className="p-3 border-l border-gray-200 text-center font-bold text-gray-900">١ صندوق عينة</td>
                            <td className="p-3 text-center">
                              <span className="bg-green-50 text-green-800 text-[9px] font-bold px-2 py-0.5 rounded border border-green-200">
                                جاهز للتوريد الفوري
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Courier and Custom Notes Section */}
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div className="space-y-2">
                        <h4 className="font-bold text-gray-700">بيانات مندوب النقل والمعاينة:</h4>
                        <div className="bg-gray-50 p-3 rounded-lg border border-gray-150 space-y-1">
                          <div className="flex gap-1.5 text-[11px]">
                            <span className="text-gray-400">الناقل المعتمد:</span>
                            <span className="font-bold text-gray-800">{printDriverName}</span>
                          </div>
                          <div className="flex gap-1.5 text-[11px]">
                            <span className="text-gray-400">جهة الشحن:</span>
                            <span className="font-semibold text-gray-700">أسطول النقل السريع بدار الزليج</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-bold text-gray-700">توجيهات التسليم والأمان الفنية:</h4>
                        <p className="bg-amber-50/50 text-[#8C6A3F] p-3 rounded-lg border border-amber-100 text-[11px] leading-relaxed">
                          {printCustomNotes}
                        </p>
                      </div>
                    </div>

                    {/* Verification Checklist */}
                    <div className="space-y-2 bg-gray-50/50 p-4 rounded-xl border border-gray-150">
                      <h4 className="text-[11px] font-bold text-gray-700">قائمة التحقق الميداني قبل توقيع العميل بالاستلام:</h4>
                      <div className="grid grid-cols-3 gap-2 text-[9px] text-gray-500">
                        <div className="flex items-center gap-1">
                          <span className="w-3 h-3 border border-gray-400 rounded flex items-center justify-center"></span>
                          <span>خلو العينات تماماً من التصدعات أو الكسور</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="w-3 h-3 border border-gray-400 rounded flex items-center justify-center"></span>
                          <span>مطابقة النقوش ومقاس العينة للكتالوج الفني</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="w-3 h-3 border border-gray-400 rounded flex items-center justify-center"></span>
                          <span>تسليم دليل حساب الهدر والتركيب</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Signatures & Footer Section */}
                  <div className="mt-8 space-y-6">
                    {/* Signatures Row */}
                    <div className="grid grid-cols-2 gap-12 pt-8 border-t border-dashed border-gray-200">
                      <div className="text-center space-y-8">
                        <span className="text-xs font-bold text-gray-600 block">المرسِل: اعتماد وتوقيع مسؤول مستودعات دار الزليج</span>
                        <div className="h-12 flex items-center justify-center text-gray-300 italic text-xs">
                          (قسم المراقبة والجرد)
                        </div>
                        <div className="w-40 border-t border-gray-300 mx-auto pt-1 text-[10px] text-gray-400 font-mono">
                          التوقيع والختم الرسمي
                        </div>
                      </div>

                      <div className="text-center space-y-8">
                        <span className="text-xs font-bold text-gray-600 block">المستلِم: توقيع ومصادقة العميل بالاستلام والمعاينة</span>
                        <div className="h-12 flex items-center justify-center text-gray-300 text-xs">
                          أقر باستلام العينة ومطابقتها للمواصفات المعروضة
                        </div>
                        <div className="w-40 border-t border-gray-300 mx-auto pt-1 text-[10px] text-gray-400 font-mono">
                          توقيع المستلم الفعلي والاسم الثنائي
                        </div>
                      </div>
                    </div>

                    {/* Receipt Footer Terms */}
                    <div className="text-center pt-4 border-t border-gray-100 space-y-1">
                      <p className="text-[9px] text-gray-400">
                        سند تسليم العينات هذا وثيقة تأكيدية لا تعتبر فاتورة بيع نهائية ولا يترتب عليها أي التزامات مالية.
                      </p>
                      <p className="text-[10px] font-semibold text-[#8C6A3F] font-serif">
                        دار الزليج للرخام والزليج الإرثي — الدار البيضاء، المملكة المغربية — هاتف: +212 6 00 00 00 00 — www.daralzellige.ma
                      </p>
                    </div>
                  </div>

                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
