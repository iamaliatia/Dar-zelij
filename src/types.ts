export interface Product {
  id: string;
  name: string;
  category: "زليج" | "رخام" | "معدات التركيب";
  price: string;
  priceNum: number; // numeric price for calculations (e.g. 180 d.m./m²)
  unit: string; // e.g. "د.م./م²" or "د.م./قطعة"
  description: string;
  image: string;
  dimensions: string;
  inStock: boolean;
  isCustomColors?: boolean;
}

export interface Project {
  id: string;
  name: string;
  type: "فيلات" | "فنادق" | "مساجد" | "مكاتب";
  image: string;
  client: string;
  completionDate: string;
}

export interface SampleRequest {
  id: string;
  clientName: string;
  phone: string;
  city: string;
  productName: string;
  notes: string;
  createdAt: string;
  status: "جديد" | "قيد المعالجة" | "تم التسليم";
}
