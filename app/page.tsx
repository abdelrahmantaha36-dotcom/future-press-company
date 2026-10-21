"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  ShoppingCart,
  X,
  MessageCircle,
  Facebook,
  Instagram,
  ArrowLeft,
  ArrowRight,
  Layers,
  FileText,
  CreditCard,
  Download,
  MapPin,
  Phone,
  Copy,
  CheckCheck,
  Flame,
  Truck,
  Printer,
  Search,
  SlidersHorizontal,
  Star,
  Tag,
  Eye,
  Sparkles,
  Ruler,
  HelpCircle,
  ChevronDown,
  FileSpreadsheet,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  gallery?: string[];
  sizes: string[];
  features: string[];
  badge?: string;
  isOffer?: boolean;
  origin?: "local" | "imported";
}

interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  size: string;
  image: string;
  quantity: number;
  printLocation?: "chest" | "back" | "both";
}

interface Category {
  id: string;
  title: string;
  description: string;
  products: Product[];
}

const LEMON_WORKER_LOCAL_IMG = "https://i.ibb.co/8gKN8hzP/file-0000000094448210a19f4e941d1adf40.png";

const HERO_SHOWCASE_IMAGES = [
  {
    url: "https://i.ibb.co/S7PprHnh/Whats-App-Image-2026-10-18-at-10-13-20-PM-3.jpg",
    title: "فيست عمال ليموني مطبوع (الصدر)",
    badge: "طباعة حية معتمدة",
    category: "عمال",
  },
  {
    url: "https://i.ibb.co/27hvcSNp/Whats-App-Image-2026-10-18-at-10-13-20-PM-2.jpg",
    title: "فيست عمال ليموني مطبوع (الظهر)",
    badge: "طباعة الظهر عريضة",
    category: "عمال",
  },
  {
    url: "https://i.ibb.co/nqVj983V/Whats-App-Image-2026-10-18-at-10-13-18-PM-3.jpg",
    title: "فيستات مطبوعة وجاهزة للتسليم الميداني",
    badge: "إنتاج فعلي مباشر",
    category: "تسليمات",
  },
  {
    url: "https://i.ibb.co/3H5hPsv/Whats-App-Image-2026-10-18-at-10-13-42-PM-1.jpg",
    title: "موك آب فيست عمال احترافي",
    badge: "تجسيد واقعي للشعار",
    category: "موك آب",
  },
  {
    url: "https://i.ibb.co/FkXwgTMy/Whats-App-Image-2026-10-18-at-10-13-15-PM.jpg",
    title: "موك آب فيست مهندسين 4 عاكس (نموذج 1)",
    badge: "4 خطوط فسفورية",
    category: "مهندسين",
  },
  {
    url: "https://i.ibb.co/GfYhRpFf/Whats-App-Image-2026-10-18-at-10-13-18-PM.jpg",
    title: "موك آب فيست مهندسين 4 عاكس (نموذج 2)",
    badge: "تصميم هندسي تنفيذي",
    category: "مهندسين",
  },
  {
    url: "https://i.ibb.co/LDJ5Qv0d/Whats-App-Image-2026-10-18-at-10-13-17-PM-1.jpg",
    title: "موك آب فيست مهندسين 3M الأصلي",
    badge: "أعلى توهج عاكس معتمد",
    category: "3M بريميوم",
  },
];

const GOVERNORATES = [
  { name: "القاهرة", fee: 100 },
  { name: "الجيزة", fee: 100 },
  { name: "الإسكندرية", fee: 100 },
  { name: "القليوبية", fee: 100 },
  { name: "الشرقية", fee: 100 },
  { name: "الدقهلية", fee: 100 },
  { name: "البحيرة", fee: 100 },
  { name: "الغربية", fee: 100 },
  { name: "المنوفية", fee: 100 },
  { name: "دمياط", fee: 100 },
  { name: "كفر الشيخ", fee: 100 },
  { name: "الإسماعيلية", fee: 100 },
  { name: "السويس", fee: 100 },
  { name: "بورسعيد", fee: 100 },
  { name: "الفيوم", fee: 130 },
  { name: "بني سويف", fee: 130 },
  { name: "المنيا", fee: 130 },
  { name: "أسيوط", fee: 130 },
  { name: "سوهاج", fee: 130 },
  { name: "قنا", fee: 130 },
  { name: "الأقصر", fee: 130 },
  { name: "أسوان", fee: 130 },
  { name: "مطروح", fee: 130 },
  { name: "الوادي الجديد", fee: 130 },
  { name: "البحر الأحمر", fee: 130 },
  { name: "جنوب سيناء", fee: 130 },
  { name: "شمال سيناء", fee: 130 },
];

const CATEGORIES: Category[] = [
  {
    id: "offers",
    title: "العروض الحصرية",
    description: "أقوى عروض وباقات التوفير للشركات والمقاولات بأفضل الأسعار وأعلى دقة طباعة للشعار.",
    products: [
      {
        id: "offer-50-vests",
        name: "عرض 50 فيست عمال ليموني بالطباعة",
        description: "باقة توفير كبرى تشمل 50 فيست عمال فسفوري عالي الجودة بسعر 65 ج للقطعة مع خصم 12.5% وطباعة الشعار مجاناً بدقة متناهية.",
        price: 2844,
        image: LEMON_WORKER_LOCAL_IMG,
        gallery: [
          LEMON_WORKER_LOCAL_IMG,
          "https://i.ibb.co/27hvcSNp/Whats-App-Image-2026-10-18-at-10-13-20-PM-2.jpg",
          "https://i.ibb.co/nqVj983V/Whats-App-Image-2026-10-18-at-10-13-18-PM-3.jpg",
          "https://i.ibb.co/3H5hPsv/Whats-App-Image-2026-10-18-at-10-13-42-PM-1.jpg",
        ],
        sizes: ["مقاسات مشكلة (XL/2XL/3XL)", "XL", "2XL", "3XL"],
        features: [
          "50 فيست عمال فسفوري عالي الوضوح (سعر القطعة 65 ج)",
          "خصم 12.5% مباشر مطبق على الإجمالي (بدلاً من 3250 ج.م)",
          "شامل طباعة الشعار بدقة وثبات عالي",
          "أشرطة عاكسة متطورة للأمان الميداني والنهاري والليلي",
        ],
        badge: "عرض خاص لفترة محدودة",
        isOffer: true,
      },
    ],
  },
  {
    id: "workers",
    title: "فيست عمال",
    description: "سترات أمان عملية ومتينة مصممة لتوفير أعلى درجات الرؤية والسلامة في بيئات العمل المختلفة.",
    products: [
      {
        id: "worker-vest-lemon-local",
        name: "فيست عمال ليموني (محلي)",
        description: "فيست أمان عمال لون ليموني فسفوري عالي الوضوح، تصنيع محلي بجودة ممتازة وخامة متينة.",
        price: 65,
        image: LEMON_WORKER_LOCAL_IMG,
        gallery: [
          LEMON_WORKER_LOCAL_IMG,
          "https://i.ibb.co/27hvcSNp/Whats-App-Image-2026-10-18-at-10-13-20-PM-2.jpg",
          "https://i.ibb.co/3H5hPsv/Whats-App-Image-2026-10-18-at-10-13-42-PM-1.jpg",
        ],
        sizes: ["XL", "2XL", "3XL"],
        features: ["لون ليموني عالي الوضوح", "خطوط عاكسة للضوء للأمان الميداني", "صناعة محلية عالية الجودة"],
        badge: "إنتاج محلي",
        origin: "local",
      },
      {
        id: "worker-vest-orange-local",
        name: "فيست عمال برتقالي (محلي)",
        description: "فيست أمان عمال لون برتقالي ناصع، خامات متينة وأشرطة عاكسة للضوء تصنيع محلي عالي الجودة.",
        price: 65,
        image: "https://i.ibb.co/cXKFMsb7/Whats-App-Image-2026-10-11-at-3-09-24-PM.jpg",
        sizes: ["XL", "2XL", "3XL"],
        features: ["لون برتقالي فاقع عالي الرؤية", "خطوط عاكسة مزدوجة", "تصنيع محلي متين"],
        badge: "إنتاج محلي",
        origin: "local",
      },
      {
        id: "worker-vest-black-local",
        name: "فيست عمال أسود (محلي)",
        description: "فيست عمال لون أسود بتصميم أنيق ومقاوم للأتربة والاتساخ مع خطوط عاكسة واضحة تصنيع محلي.",
        price: 85,
        image: "https://i.ibb.co/FLvDPndN/Whats-App-Image-2026-10-11-at-3-09-59-PM-2.jpg",
        sizes: ["XL", "2XL", "3XL"],
        features: ["لون أسود مميز وعملي", "أشرطة فسفورية عاكسة للأمان", "قماش متين عالي التحمل"],
        badge: "إنتاج محلي",
        origin: "local",
      },
      {
        id: "worker-vest-blue-local",
        name: "فيست عمال أزرق (محلي)",
        description: "فيست أمان عمال باللون الأزرق الميداني الأنيق، تصنيع محلي متقن مع أشرطة فسفورية للرؤية.",
        price: 85,
        image: "https://i.ibb.co/ccQ8PXjb/Whats-App-Image-2026-10-11-at-3-09-59-PM-1.jpg",
        sizes: ["XL", "2XL", "3XL"],
        features: ["لون أزرق عملي وجذاب", "عاكس إضاءة عريض", "خامة محلية عالية الجودة"],
        badge: "إنتاج محلي",
        origin: "local",
      },
      {
        id: "worker-vest-red-local",
        name: "فيست عمال أحمر (محلي)",
        description: "فيست عمال لون أحمر ناصع للتمييز السريع ولفرق السلامة والطوارئ تصنيع محلي متميز.",
        price: 85,
        image: "https://i.ibb.co/ns3w2ct8/Whats-App-Image-2026-10-11-at-3-09-59-PM.jpg",
        sizes: ["XL", "2XL", "3XL"],
        features: ["لون أحمر فاقع لسهولة التمييز", "خطوط فسفورية لامعة", "خياطة متينة ومقاومة"],
        badge: "إنتاج محلي",
        origin: "local",
      },
      {
        id: "worker-vest-lemon-imported",
        name: "فيست عمال ليموني (مستورد)",
        description: "فيست أمان عمال لون ليموني فسفوري عالي الوضوح، خامات مستوردة ممتازة وتصميم مريح للعمل الشاق.",
        price: 75,
        image: "https://i.ibb.co/hxhfZXz0/Whats-App-Image-2026-10-11-at-3-09-23-PM.jpg",
        gallery: [
          "https://i.ibb.co/hxhfZXz0/Whats-App-Image-2026-10-11-at-3-09-23-PM.jpg",
          "https://i.ibb.co/3H5hPsv/Whats-App-Image-2026-10-18-at-10-13-42-PM-1.jpg",
        ],
        sizes: ["XL", "2XL", "3XL"],
        features: ["خامة مستوردة فائقة المتانة", "أشرطة فسفورية عاكسة متطورة", "سحاب أمامي عملي وقوي"],
        badge: "مستورد",
        origin: "imported",
      },
      {
        id: "worker-vest-orange-imported",
        name: "فيست عمال برتقالي (مستورد)",
        description: "فيست أمان عمال برتقالي مستورد عالي الكفاءة، مقاوم للظروف القاسية مع أشرطة عاكسة ممتازة.",
        price: 75,
        image: "https://i.ibb.co/cXKFMsb7/Whats-App-Image-2026-10-11-at-3-09-24-PM.jpg",
        sizes: ["XL", "2XL", "3XL"],
        features: ["خامة مستوردة ممتازة", "عاكس ضوء فائق القوة", "مريح وسهل الارتداء"],
        badge: "مستورد",
        origin: "imported",
      },
      {
        id: "worker-vest-black-imported",
        name: "فيست عمال أسود (مستورد)",
        description: "فيست عمال أسود مستورد عالي الجودة، يجمع بين المظهر المهني والأمان التام داخل الموقع.",
        price: 105,
        image: "https://i.ibb.co/FLvDPndN/Whats-App-Image-2026-10-11-at-3-09-59-PM-2.jpg",
        sizes: ["XL", "2XL", "3XL"],
        features: ["خامة مستوردة فاخرة", "أشرطة عاكسة متينة", "سحاب قوي وخياطة معززة"],
        badge: "مستورد",
        origin: "imported",
      },
      {
        id: "worker-vest-blue-imported",
        name: "فيست عمال أزرق (مستورد)",
        description: "فيست أمان عمال أزرق مستورد بخامات ممتازة وتصميم احترافي يوفر الراحة الكاملة أثناء العمل.",
        price: 105,
        image: "https://i.ibb.co/ccQ8PXjb/Whats-App-Image-2026-10-11-at-3-09-59-PM-1.jpg",
        sizes: ["XL", "2XL", "3XL"],
        features: ["خامات مستوردة فائقة الجودة", "عواكس متطورة للرؤية الليلية", "تهوية وراحة أثناء الحركة"],
        badge: "مستورد",
        origin: "imported",
      },
      {
        id: "worker-vest-red-imported",
        name: "فيست عمال أحمر (مستورد)",
        description: "فيست عمال أحمر مستورد عالي الجودة بتصميم متين يناسب مهام العمل الصعبة وإدارة المواقع.",
        price: 105,
        image: "https://i.ibb.co/ns3w2ct8/Whats-App-Image-2026-10-11-at-3-09-59-PM.jpg",
        sizes: ["XL", "2XL", "3XL"],
        features: ["خامات مستوردة عالية التحمل", "أشرطة عاكسة متطورة", "سحاب مريح وعملي"],
        badge: "مستورد",
        origin: "imported",
      },
    ],
  },
  {
    id: "supervisors",
    title: "فيست مشرفين",
    description: "سترات متميزة بجيوب متعددة لحفظ الدفاتر والأدوات وتسهيل مهام الإشراف والمتابعة.",
    products: [
      {
        id: "sup-vest-lemon-local",
        name: "فيست مشرفين ليموني (محلي)",
        description: "فيست إشراف ميداني لون ليموني فسفوري مزود بجيوب عملية وأماكن مخصصة للأقلام والكروت تصنيع محلي.",
        price: 125,
        image: "https://i.ibb.co/ZpmnCmJq/Whats-App-Image-2026-10-11-at-3-10-27-PM.jpg",
        sizes: ["XL", "2XL", "3XL"],
        features: ["جيوب أمامية متعددة وعميقة", "حامل بطاقة تعريفية", "قماش متين ولون عالي الوضوح"],
        badge: "إنتاج محلي",
        origin: "local",
      },
      {
        id: "sup-vest-orange-local",
        name: "فيست مشرفين برتقالي (محلي)",
        description: "فيست إشراف لون برتقالي ناصع، مجهز بجيوب متعددة وحامل كارنيه تصنيع محلي ممتاز.",
        price: 125,
        image: "https://i.ibb.co/CszMnVCj/Whats-App-Image-2026-10-11-at-3-10-27-PM-1.jpg",
        sizes: ["XL", "2XL", "3XL"],
        features: ["جيوب عملية ومريحة", "لون برتقالي فاقع واضح", "أشرطة عاكسة متينة"],
        badge: "إنتاج محلي",
        origin: "local",
      },
      {
        id: "sup-vest-lemon-black-local",
        name: "فيست مشرفين ليموني × أسود (محلي)",
        description: "فيست إشراف أنيق يدمج بين الليموني الفسفوري والأسود لمظهر قيادي عملي وجيوب متعددة محلي.",
        price: 115,
        image: "https://i.ibb.co/Jjqq2XML/Whats-App-Image-2026-10-14-at-1-55-06-PM.jpg",
        sizes: ["XL", "2XL", "3XL"],
        features: ["مزيج ليموني وأسود أنيق", "جيوب مخصصة للأجهزة والأقلام", "صناعة محلية متينة"],
        badge: "إنتاج محلي",
        origin: "local",
      },
      {
        id: "sup-vest-lemon-blue-local",
        name: "فيست مشرفين ليموني × أزرق (محلي)",
        description: "فيست إشراف ليموني مدمج مع الأزرق الداكن بتصميم عصري وجيوب تخزين ممتازة تصنيع محلي.",
        price: 115,
        image: "https://i.ibb.co/qL0cZFMW/Whats-App-Image-2026-10-14-at-1-55-06-PM-1.jpg",
        sizes: ["XL", "2XL", "3XL"],
        features: ["ألوان متباينة عالية الوضوح", "جيوب إشراف متعددة", "خياطة محلية معززة"],
        badge: "إنتاج محلي",
        origin: "local",
      },
      {
        id: "sup-vest-lemon-orange-local",
        name: "فيست مشرفين ليموني × برتقالي (محلي)",
        description: "فيست إشراف بلونين فسفوريين عاليي الرؤية (ليموني وبرتقالي) مع جيوب كاملة تصنيع محلي.",
        price: 115,
        image: "https://i.ibb.co/p61yHtHW/Whats-App-Image-2026-10-14-at-1-55-06-PM-2.jpg",
        sizes: ["XL", "2XL", "3XL"],
        features: ["وضوح مضاعف بلونين فسفوريين", "جيوب متعددة الوظائف", "خامة محلية قوية"],
        badge: "إنتاج محلي",
        origin: "local",
      },
      {
        id: "sup-vest-lemon-imported",
        name: "فيست مشرفين ليموني (مستورد)",
        description: "فيست مشرفين ليموني مستورد فاخر، جيوب متعددة وسحابات قوية مع عواكس ضوء ممتازة.",
        price: 145,
        image: "https://i.ibb.co/ZpmnCmJq/Whats-App-Image-2026-11-at-3-10-27-PM.jpg",
        sizes: ["XL", "2XL", "3XL"],
        features: ["خامة مستوردة فاخرة", "جيوب مخصصة للراديو والأدوات", "أشرطة عاكسة عالية الجودة"],
        badge: "مستورد",
        origin: "imported",
      },
      {
        id: "sup-vest-orange-imported",
        name: "فيست مشرفين برتقالي (مستورد)",
        description: "فيست إشراف برتقالي مستورد عالي الكفاءة، تصميم مريح وخامات فائقة التحمل بجيوب كاملة.",
        price: 145,
        image: "https://i.ibb.co/CszMnVCj/Whats-App-Image-2026-10-11-at-3-10-27-PM-1.jpg",
        sizes: ["XL", "2XL", "3XL"],
        features: ["خامة مستوردة عالية الجودة", "تقسيمات جيوب ذكية وعملية", "خطوط عاكسة متطورة"],
        badge: "مستورد",
        origin: "imported",
      },
      {
        id: "sup-vest-lemon-black-imported",
        name: "فيست إشراف ليموني × أسود (مستورد)",
        description: "فيست إشراف ليموني × أسود مستورد بجودة عالية، مظهر مميز يبرز طاقم الإشراف بالموقع.",
        price: 135,
        image: "https://i.ibb.co/Jjqq2XML/Whats-App-Image-2026-10-14-at-1-55-06-PM.jpg",
        sizes: ["XL", "2XL", "3XL"],
        features: ["خامات مستوردة ممتازة", "أشرطة فسفورية متطورة", "سحابات متينة وعملية"],
        badge: "مستورد",
        origin: "imported",
      },
      {
        id: "sup-vest-lemon-blue-imported",
        name: "فيست مشرفين ليموني × أزرق (مستورد)",
        description: "فيست مشرفين ليموني × أزرق مستورد فاخر، مناسب للمتابعة الميدانية والمهام الإشرافية الدقيقة.",
        price: 135,
        image: "https://i.ibb.co/qL0cZFMW/Whats-App-Image-2026-10-14-at-1-55-06-PM-1.jpg",
        sizes: ["XL", "2XL", "3XL"],
        features: ["خامة مستوردة راقية", "جيوب كروت وأجهزة لاسلكية", "عواكس ليلية ممتازة"],
        badge: "مستورد",
        origin: "imported",
      },
      {
        id: "sup-vest-lemon-orange-imported",
        name: "فيست مشرفين ليموني × برتقالي (مستورد)",
        description: "فيست إشراف ليموني × برتقالي مستورد عالي الجودة، يضمن أقصى معايير السلامة المهنية للمشرفين.",
        price: 135,
        image: "https://i.ibb.co/p61yHtHW/Whats-App-Image-2026-10-14-at-1-55-06-PM-2.jpg",
        sizes: ["XL", "2XL", "3XL"],
        features: ["خامات مستوردة متطورة", "رؤية فائقة بالنهار والليل", "سحاب قوي وخياطة متينة"],
        badge: "مستورد",
        origin: "imported",
      },
    ],
  },
  {
    id: "engineers",
    title: "فيست مهندسين",
    description: "سترات احترافية فاخرة تجمع بين المظهر الهندسي الأنيق وأقصى درجات الأمان الميداني.",
    products: [
      {
        id: "eng-vest-4ref-lemon-black-local",
        name: "فيست مهندسين 4 عاكس ليموني × أسود (محلي)",
        description: "فيست مهندسين تنفيذي مزود بأربعة خطوط عاكسة متطورة، قماش فاخر وجيوب واسعة للرسومات والأدوات.",
        price: 155,
        image: "https://i.ibb.co/FkXwgTMy/Whats-App-Image-2026-10-18-at-10-13-15-PM.jpg",
        gallery: [
          "https://i.ibb.co/FkXwgTMy/Whats-App-Image-2026-10-18-at-10-13-15-PM.jpg",
          "https://i.ibb.co/GfYhRpFf/Whats-App-Image-2026-10-18-at-10-13-18-PM.jpg",
        ],
        sizes: ["XL", "2XL", "3XL"],
        features: ["4 خطوط عاكسة متطورة", "مظهر هندسي تنفيذي فاخر", "جيوب مخصصة للمخططات والموبايل"],
        badge: "4 عاكس",
        origin: "local",
      },
      {
        id: "eng-vest-4ref-lemon-blue-local",
        name: "فيست مهندسين 4 عاكس ليموني × أزرق (محلي)",
        description: "فيست مهندسين 4 عاكس بتنسيق ألوان ليموني وأزرق داكن راقٍ، خامات متينة وجيوب متعددة محلي.",
        price: 155,
        image: "https://i.ibb.co/GfYhRpFf/Whats-App-Image-2026-10-18-at-10-13-18-PM.jpg",
        sizes: ["XL", "2XL", "3XL"],
        features: ["4 خطوط عاكسة قوية", "قصة أنيقة ومريحة للمهندسين", "خامات متينة ومقاومة للحرارة"],
        badge: "4 عاكس",
        origin: "local",
      },
      {
        id: "eng-vest-4ref-lemon-orange-local",
        name: "فيست مهندسين 4 عاكس ليموني × برتقالي (محلي)",
        description: "فيست مهندسين 4 عاكس بلونين ناصعين لتوفير أعلى مستوى رؤية وأناقة في المواقع الكبرى.",
        price: 155,
        image: "https://i.ibb.co/C5KynwMt/Whats-App-Image-2026-10-11-at-3-12-09-PM-2.jpg",
        sizes: ["XL", "2XL", "3XL"],
        features: ["4 أشرطة عاكسة للضوء", "مزيج فسفوري فائق الوضوح", "خياطة مزدوجة معززة"],
        badge: "4 عاكس",
        origin: "local",
      },
      {
        id: "eng-vest-3m-lemon-black-local",
        name: "فيست مهندسين ثري إم (3M) ليموني × أسود (محلي)",
        description: "فيست مهندسين فاخر مزود بأشرطة 3M العاكسة الأصلية لتوفير بريق عاكس قياسي عالمي محلي.",
        price: 185,
        image: "https://i.ibb.co/LDJ5Qv0d/Whats-App-Image-2026-10-18-at-10-13-17-PM-1.jpg",
        gallery: [
          "https://i.ibb.co/LDJ5Qv0d/Whats-App-Image-2026-10-18-at-10-13-17-PM-1.jpg",
          "https://i.ibb.co/HTJjPgsn/Whats-App-Image-2026-10-11-at-3-12-35-PM.jpg",
        ],
        sizes: ["XL", "2XL", "3XL"],
        features: ["شريط عاكس أصلي 3M", "قماش عالي الكثافة والجودة", "جيوب تنظيمية احترافية"],
        badge: "عاكس 3M محلي",
        origin: "local",
      },
      {
        id: "eng-vest-3m-lemon-blue-local",
        name: "فيست مهندسين ثري إم (3M) ليموني × أزرق (محلي)",
        description: "فيست مهندسين بلونين ليموني وأزرق مع أشرطة 3M المعتمدة، تصنيع محلي متميز وعملي للغاية.",
        price: 185,
        image: "https://i.ibb.co/zkxZxDq/Whats-App-Image-2026-10-11-at-3-12-36-PM-1.jpg",
        sizes: ["XL", "2XL", "3XL"],
        features: ["عواكس 3M فائقة التوهج", "قماش جبردين عالي التحمل", "حلقات لتعليق اللاسلكي والمفاتيح"],
        badge: "عاكس 3M محلي",
        origin: "local",
      },
      {
        id: "eng-vest-3m-lemon-orange-local",
        name: "فيست مهندسين ثري إم (3M) ليموني × برتقالي (محلي)",
        description: "فيست مهندسين مزود بشرائط 3M الأصلية بلوني السلامة المعتمدين ليموني وبرتقالي تصنيع محلي.",
        price: 185,
        image: "https://i.ibb.co/PvkGXDPV/Whats-App-Image-2026-10-11-at-3-12-36-PM-1.jpg",
        sizes: ["XL", "2XL", "3XL"],
        features: ["أشرطة عاكسة أصلية 3M", "مزيج لوني عالي الوضوح", "خياطة متينة وجيوب شاملة"],
        badge: "عاكس 3M محلي",
        origin: "local",
      },
      {
        id: "eng-vest-3m-lemon-black-imported",
        name: "فيست مهندسين ثري إم (3M) ليموني × أسود (مستورد)",
        description: "فيست مهندسين تنفيذي مستورد بأعلى معايير الجودة العالمية مع شرائط 3M العاكسة الأصلية.",
        price: 235,
        image: "https://i.ibb.co/LDJ5Qv0d/Whats-App-Image-2026-10-18-at-10-13-17-PM-1.jpg",
        gallery: [
          "https://i.ibb.co/LDJ5Qv0d/Whats-App-Image-2026-10-18-at-10-13-17-PM-1.jpg",
          "https://i.ibb.co/HTJjPgsn/Whats-App-Image-2026-10-11-at-3-12-35-PM.jpg",
        ],
        sizes: ["XL", "2XL", "3XL"],
        features: ["شريط عاكس معتمد 3M", "خامات مستوردة بريميوم", "تفصيل ومظهر قيادي فاخر"],
        badge: "عاكس 3M مستورد",
        origin: "imported",
      },
      {
        id: "eng-vest-3m-lemon-blue-imported",
        name: "فيست مهندسين ثري إم (3M) ليموني × أزرق (مستورد)",
        description: "فيست مهندسين مستورد بريميوم بشرائط 3M ليموني × أزرق لضمان أعلى مستويات الأمان والأناقة.",
        price: 235,
        image: "https://i.ibb.co/zkxZxDq/Whats-App-Image-2026-10-11-at-3-12-36-PM-1.jpg",
        sizes: ["XL", "2XL", "3XL"],
        features: ["تقنية عاكس 3M المتطورة", "خامة مستوردة مقاومة للتآكل", "راحة تامة في التحرك والمطابقة"],
        badge: "عاكس 3M مستورد",
        origin: "imported",
      },
      {
        id: "eng-vest-3m-lemon-orange-imported",
        name: "فيست مهندسين ثري إم (3M) ليموني × برتقالي (مستورد)",
        description: "فيست مهندسين تنفيذي مستورد بشرائط 3M، تصميم متقن يوفر الحماية والمظهر المهني المتألق.",
        price: 235,
        image: "https://i.ibb.co/PvkGXDPV/Whats-App-Image-2026-10-11-at-3-12-36-PM-1.jpg",
        sizes: ["XL", "2XL", "3XL"],
        features: ["شريط عاكس 3M مستورد", "أعلى معايير الجودة التنفيذية", "متانة قصوى في البيئات القاسية"],
        badge: "عاكس 3M مستورد",
        origin: "imported",
      },
    ],
  },
  {
    id: "helmets",
    title: "خوذه",
    description: "خوذات حماية للرأس مصممة لتحمل الصدمات وتوفير الحماية القصوى للأمان الميداني.",
    products: [
      {
        id: "helmet-workers-white",
        name: "خوذه عمال أبيض",
        description: "خوذة أمان عمال لون أبيض، متينة ومقاومة للصدمات ومطابقة لمواصفات الأمان الميداني ومريحة للارتداء اليومي.",
        price: 65,
        image: "https://i.ibb.co/YFnvLy5h/Whats-App-Image-2026-10-11-at-3-13-12-PM-1.jpg",
        sizes: ["مقاس موحد"],
        features: ["مقاومة عالية للصدمات", "نظام تعليق داخلي لامتصاص الصدمات", "خفيفة ومريحة للاستخدام الطويل"],
        badge: "عمال",
      },
      {
        id: "helmet-workers-yellow",
        name: "خوذه عمال أصفر",
        description: "خوذة أمان عمال لون أصفر فاقع عالي الرؤية، توفر الحماية الميكانيكية للرأس في المواقع الإنشائية والصناعية.",
        price: 65,
        image: "https://i.ibb.co/nNZYDVFs/Whats-App-Image-2026-10-11-at-3-13-12-PM.jpg",
        sizes: ["مقاس موحد"],
        features: ["لون أصفر قياسي عالي الوضوح", "خامة قوية شديدة التحمل", "حزام تثبيت مريح وقابل للضبط"],
        badge: "عمال",
      },
      {
        id: "helmet-engineers-white-msa",
        name: "خوذه مهندسين أبيض MSA",
        description: "خوذة أمان مهندسين أبيض ماركة MSA الأصلية، خامات فائقة الجودة توفر أقصى درجات الحماية والأناقة الهندسية.",
        price: 205,
        image: "https://i.ibb.co/5b3fx0r/image.png",
        sizes: ["مقاس موحد"],
        features: ["ماركة MSA الأصلية", "تصميم هندسي متقدم عالي التحمل", "نظام ضبط قياس خلفي دقيق وسلس"],
        badge: "MSA معتمدة",
      },
    ],
  },
];

const FAQS = [
  {
    q: "ما هي جودة الطباعة وهل تتأثر بالغسيل المتكرر في المواقع؟",
    a: "نستخدم أحدث تقنيات الطباعة الحرارية والسلك سكرين بأحبار صناعية معالجة حرارياً لا تتشقق ولا تبهت مع الغسيل المتكرر وتتحمل درجات الحرارة والأتربة الميدانية.",
  },
  {
    q: "كيف أتأكد من ضبط وتناسق الشعار الخاص بشركتي قبل طباعة الكمية كاملة؟",
    a: "بمجرد إرفاق الشعار عبر الطلب أو إرساله لنا، يقوم فريق التصميم بإعداد بروفا رقمية توضح أبعاد وموضع الشعار على الصدر والظهر وإرسالها لكم عبر واتساب لاعتمادها قبل بدء خط الإنتاج.",
  },
  {
    q: "هل يمكن إصدار فواتير ضريبية وأوراق توريد رسمية للمؤسسات والشركات؟",
    a: "نعم، شركة Future Press مسجلة رسمياً ويمكننا تزويدكم بفواتير ضريبية، سجل تجاري، وبطاقة ضريبية معتمدة لكافة أوامر التوريد الكبرى.",
  },
  {
    q: "ما هي مدة التجهيز والشحن للمحافظات والمشروعات؟",
    a: "يتم تجهيز وشحن الطلبات العاجلة خلال 24 إلى 48 ساعة فقط، ونغطي جميع المحافظات ومواقع العمل الإنشائية عبر أسطول شحن سريع ومباشر.",
  },
];

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [subCategoryFilter, setSubCategoryFilter] = useState<{ [catId: string]: "all" | "local" | "imported" }>({
    workers: "all",
    supervisors: "all",
    engineers: "all",
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"default" | "price-asc" | "price-desc">("default");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [heroSlideIndex, setHeroSlideIndex] = useState(0);

  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isQuotationModalOpen, setIsQuotationModalOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const [printLocations, setPrintLocations] = useState<{ [productId: string]: "chest" | "back" | "both" }>({});
  const [selectedSizes, setSelectedSizes] = useState<{ [productId: string]: string }>({});
  const [quantities, setQuantities] = useState<{ [productId: string]: number }>({});
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [view, setView] = useState<"store" | "checkout">("store");

  const [formData, setFormData] = useState({
    fullName: "",
    governorate: "القاهرة",
    address: "",
    phone1: "",
    phone2: "",
    companyName: "",
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [isInvoiceReady, setIsInvoiceReady] = useState(false);
  const [orderDate, setOrderDate] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");

  const [copiedVodafone, setCopiedVodafone] = useState(false);
  const [copiedInstapay, setCopiedInstapay] = useState(false);

  const selectedGov = GOVERNORATES.find((g) => g.name === formData.governorate);
  const shippingFee = selectedGov ? selectedGov.fee : 100;

  useEffect(() => {
    document.title = "Future Press | للطباعة وتوريدات الأمان الصناعي";
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("future_press_cart");
      if (saved) {
        try {
          setCart(JSON.parse(saved));
        } catch {
          setCart([]);
        }
      }
    }
    const now = new Date();
    setOrderDate(
      now.toLocaleDateString("ar-EG", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    );
    setInvoiceNumber(`FP-${Math.floor(100000 + Math.random() * 900000)}`);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroSlideIndex((prev) => (prev + 1) % HERO_SHOWCASE_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setLogoFile(file);
  };

  const saveCart = (items: CartItem[]) => {
    setCart(items);
    if (typeof window !== "undefined") {
      localStorage.setItem("future_press_cart", JSON.stringify(items));
    }
  };

  const handleSelectSize = (productId: string, size: string) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  const handleQuantityChange = (productId: string, value: string) => {
    const num = parseInt(value, 10);
    setQuantities((prev) => ({
      ...prev,
      [productId]: isNaN(num) || num < 1 ? 1 : num,
    }));
  };

  const addToCart = (product: Product) => {
    const chosenSize = selectedSizes[product.id] || product.sizes[0] || "مقاس موحد";
    const chosenPrintLocation = printLocations[product.id] || "both";
    const qtyToAdd = quantities[product.id] || 1;
    const cartItemId = `${product.id}-${chosenSize}-${chosenPrintLocation}`;

    const existingIndex = cart.findIndex((item) => item.id === cartItemId);
    let updatedCart: CartItem[];

    if (existingIndex > -1) {
      updatedCart = [...cart];
      updatedCart[existingIndex].quantity += qtyToAdd;
    } else {
      updatedCart = [
        ...cart,
        {
          id: cartItemId,
          productId: product.id,
          name: product.name,
          price: product.price,
          size: chosenSize,
          image: product.image,
          quantity: qtyToAdd,
          printLocation: chosenPrintLocation,
        },
      ];
    }

    saveCart(updatedCart);
    showToast(`تمت إضافة "${product.name}" بنجاح إلى السلة`);
  };

  const removeFromCart = (id: string) => {
    saveCart(cart.filter((item) => item.id !== id));
  };

  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const rawTotalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const discountRate = useMemo(() => {
    if (totalItemsCount >= 50) return 0.125;
    if (totalItemsCount > 21) return 0.05;
    return 0;
  }, [totalItemsCount]);

  const discountAmount = Math.round(rawTotalPrice * discountRate);
  const totalPrice = rawTotalPrice - discountAmount;
  const grandTotal = totalPrice + shippingFee;

  const handleCopy = (text: string, type: "vodafone" | "instapay") => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      if (type === "vodafone") {
        setCopiedVodafone(true);
        setTimeout(() => setCopiedVodafone(false), 2000);
      } else {
        setCopiedInstapay(true);
        setTimeout(() => setCopiedInstapay(false), 2000);
      }
    }
  };

  const generateOrderMessage = () => {
    let itemsText = "";
    cart.forEach((item, index) => {
      const locText =
        item.printLocation === "chest"
          ? "الصدر فقط"
          : item.printLocation === "back"
          ? "الظهر فقط"
          : "الصدر والظهر";
      itemsText += `\n${index + 1}- ${item.name} | المقاس: ${item.size} | موضع الطباعة: ${locText} | الكمية: ${item.quantity} | السعر: ${
        item.price * item.quantity
      } ج.م`;
    });

    return `*طلب جديد من موقع Future Press Company* 🔔
----------------------------------
📄 رقم الفاتورة: ${invoiceNumber}
📅 التاريخ: ${orderDate}

👤 بيانات العميل:
- الاسم: ${formData.fullName}
- المنشأة/الشركة: ${formData.companyName || "طلب شخصي/ميداني"}
- المحافظة: ${formData.governorate}
- الهاتف: ${formData.phone1} ${formData.phone2 ? `\n• هاتف إضافي: ${formData.phone2}` : ""}
- العنوان: ${formData.address}
${logoFile ? `• ملف الشعار للطباعة: تم إرفاقه (${logoFile.name})` : "• ملف الشعار: لم يتم إرفاقه"}
${receiptFile ? `• إيصال التحويل: تم إرفاقه (${receiptFile.name})` : "• إيصال التحويل: لم يتم إرفاقه"}

📦 تفاصيل المنتجات والمطبوعات:${itemsText}

----------------------------------
💰 إجمالي المنتجات: ${rawTotalPrice} ج.م
${discountAmount > 0 ? `🎁 خصم الكميات المطبق (${discountRate * 100}%): -${discountAmount} ج.م\n` : ""}💰 الإجمالي بعد الخصم: ${totalPrice} ج.م
🚚 مصاريف شحن (${formData.governorate}): ${shippingFee} ج.م
💵 الإجمالي المطلوب: ${grandTotal} ج.م
----------------------------------
برجاء تأكيد الطلب وتجهيز بروفة الطباعة.`;
  };

  const sendGusBotNotification = async (msg: string) => {
    try {
      const apiKey = "6877639";
      const phone = "201010625349";
      const url = `https://api.callmebot.com/whatsapp.php?phone=${phone}&text=${encodeURIComponent(msg)}&apikey=${apiKey}`;
      await fetch(url, { mode: "no-cors" });
    } catch {
      // ignore
    }
  };

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.address || !formData.phone1 || !formData.governorate) {
      alert("يرجى ملء جميع الحقول الإلزامية واختيار المحافظة");
      return;
    }

    const orderMsg = generateOrderMessage();
    await sendGusBotNotification(orderMsg);
    setIsInvoiceReady(true);
  };

  const filterAndSortProducts = (products: Product[]) => {
    let result = products.filter((p) => {
      const q = searchQuery.toLowerCase().trim();
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.features.some((f) => f.toLowerCase().includes(q))
      );
    });

    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  };

  const displayedCategories = (
    activeCategory === "all"
      ? CATEGORIES
      : CATEGORIES.filter((category) => category.id === activeCategory)
  ).map((cat) => ({
    ...cat,
    products: filterAndSortProducts(cat.products),
  })).filter((cat) => cat.products.length > 0 || !searchQuery);

  const renderProductCard = (product: Product, isHelmet: boolean) => {
    const currentSelectedSize = selectedSizes[product.id] || product.sizes[0] || "مقاس موحد";
    const currentQty = quantities[product.id] || 1;
    const currentPrintLocation = printLocations[product.id] || "both";

    const potentialDiscount = currentQty >= 50 ? 0.125 : currentQty > 21 ? 0.05 : 0;
    const finalItemPrice = Math.round(product.price * (1 - potentialDiscount));

    return (
      <div
        key={product.id}
        className={`group border rounded-2xl overflow-hidden bg-slate-900/60 backdrop-blur-sm text-slate-100 flex flex-col sm:flex-row hover:border-blue-500/60 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-950/40 ${
          product.isOffer ? "border-amber-500/40 bg-gradient-to-br from-amber-950/20 via-slate-900/70 to-slate-900" : "border-slate-800"
        }`}
      >
        <div className="relative sm:w-1/2 aspect-square bg-slate-950/60 overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            unoptimized
          />
          {product.badge && (
            <div className="absolute top-3 right-3 z-10">
              <Badge
                className={
                  product.isOffer
                    ? "bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-2.5 py-1 text-xs shadow-md"
                    : "bg-blue-600 hover:bg-blue-500 text-white font-medium px-2.5 py-1 text-xs shadow-md"
                }
              >
                {product.badge}
              </Badge>
            </div>
          )}

          <button
            type="button"
            onClick={() => setQuickViewProduct(product)}
            className="absolute bottom-3 left-3 z-10 bg-slate-900/80 hover:bg-blue-600 text-white p-2 rounded-xl backdrop-blur-sm border border-slate-700 hover:border-blue-500 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-lg"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>معاينة وتفاصيل</span>
          </button>
        </div>

        <div className="p-5 sm:p-6 sm:w-1/2 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-start justify-between gap-2">
              <h4 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                {product.name}
              </h4>
              {!isHelmet && (
                <button
                  type="button"
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-[11px] text-blue-400 hover:underline flex items-center gap-1 shrink-0 font-medium cursor-pointer"
                >
                  <Ruler className="w-3 h-3" />
                  دليل المقاسات
                </button>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{product.description}</p>

            {product.sizes && product.sizes.length > 0 && (
              <div className="mt-4">
                <span className="text-xs font-semibold text-slate-300 block mb-2">المقاس المطلوب:</span>
                <div className="flex flex-wrap gap-1.5">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => handleSelectSize(product.id, size)}
                      className={`px-2.5 py-1 rounded-md border text-xs font-medium cursor-pointer transition-colors ${
                        currentSelectedSize === size
                          ? "bg-blue-600 text-white border-blue-500 shadow-sm"
                          : "bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {!isHelmet && (
              <div className="mt-4">
                <span className="text-xs font-semibold text-slate-300 block mb-1.5">موضع طباعة الشعار:</span>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: "both", label: "الصدر والظهر" },
                    { id: "chest", label: "الصدر فقط" },
                    { id: "back", label: "الظهر فقط" },
                  ].map((loc) => (
                    <button
                      key={loc.id}
                      type="button"
                      onClick={() =>
                        setPrintLocations((prev) => ({
                          ...prev,
                          [product.id]: loc.id as any,
                        }))
                      }
                      className={`py-1 px-1 rounded-lg border text-[11px] font-medium transition-colors cursor-pointer text-center ${
                        currentPrintLocation === loc.id
                          ? "bg-blue-600/30 border-blue-500 text-blue-200 font-bold"
                          : "bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white"
                      }`}
                    >
                      {loc.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-4">
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-300">الكمية:</label>
                {potentialDiscount > 0 ? (
                  <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    خصم {potentialDiscount * 100}% مطبق
                  </span>
                ) : (
                  <span className="text-[10px] text-slate-400">أكثر من 21 قطعة لخصم 5%</span>
                )}
              </div>
              <div className="flex items-center gap-2 max-w-[140px]">
                <button
                  type="button"
                  onClick={() =>
                    setQuantities((prev) => ({
                      ...prev,
                      [product.id]: Math.max(1, (prev[product.id] || 1) - 1),
                    }))
                  }
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center justify-center text-white font-bold cursor-pointer"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={currentQty}
                  onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg py-1 text-center font-bold text-sm text-white focus:outline-none focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() =>
                    setQuantities((prev) => ({
                      ...prev,
                      [product.id]: (prev[product.id] || 1) + 1,
                    }))
                  }
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center justify-center text-white font-bold cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {!product.isOffer && (
              <div className="mt-3 py-1.5 px-2.5 rounded-lg bg-slate-950/70 border border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span>1-21 قطعة: <strong className="text-slate-200">{product.price} ج.م</strong></span>
                <span>فوق 21: <strong className="text-emerald-400">{Math.round(product.price * 0.95)} ج.م</strong></span>
                <span>50+: <strong className="text-emerald-400">{Math.round(product.price * (1 - 0.125))} ج.م</strong></span>
              </div>
            )}

            <ul className="mt-4 space-y-1.5">
              {product.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4 border-t border-slate-800 space-y-3">
            <div className="flex items-baseline justify-between">
              <span className="text-xs text-slate-400">
                {product.isOffer ? "إجمالي العرض بعد الخصم:" : "السعر المقدر للقطعة:"}
              </span>
              <div className="text-left flex items-baseline gap-1.5">
                {potentialDiscount > 0 && (
                  <span className="text-xs line-through text-slate-500">{product.price} ج.م</span>
                )}
                <span className="text-2xl font-black text-blue-400">{finalItemPrice}</span>
                <span className="text-xs text-slate-400">ج.م</span>
              </div>
            </div>

            {!isHelmet && (
              <p className="text-xs text-emerald-400 font-medium flex items-center justify-end gap-1">
                <Check className="w-3.5 h-3.5" />
                شامل طباعة الشعار بدقة وثبات عالي
              </p>
            )}

            <Button
              onClick={() => addToCart(product)}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 rounded-xl cursor-pointer transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 active:scale-95"
            >
              <ShoppingCart className="w-4 h-4" />
              أضف ({currentQty}) إلى السلة
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 antialiased selection:bg-blue-500 selection:text-white pb-16 md:pb-0" dir="rtl">
      <style jsx global>{`
        @media print {
          body, html {
            background: #ffffff !important;
            color: #000000 !important;
            height: auto !important;
          }
          @page {
            size: A4 portrait;
            margin: 10mm;
          }
          header, footer, nav, .no-print, [role="banner"], [id="showcase"], [id="reviews"], [id="faqs"], .fixed {
            display: none !important;
          }
          .printable-single-page {
            display: block !important;
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            background: #ffffff !important;
            color: #0f172a !important;
            box-shadow: none !important;
            border: none !important;
            padding: 0 !important;
            margin: 0 !important;
            page-break-after: avoid !important;
            page-break-inside: avoid !important;
          }
          .printable-single-page * {
            color: #0f172a !important;
          }
        }
      `}</style>

      {/* شريط الإعلانات التفاعلي العلوي */}
      <div className="no-print bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-900 text-white py-1.5 px-4 text-center text-xs font-semibold border-b border-blue-700/40 overflow-hidden">
        <div className="inline-flex items-center gap-3">
          <span className="flex items-center gap-1 text-amber-300">
            <Sparkles className="w-3.5 h-3.5" />
            عروض التوريد الكبرى لعام 2026
          </span>
          <span className="hidden sm:inline text-blue-200">|</span>
          <span className="hidden sm:inline">🚚 خصم 5% فوق 21 قطعة و 12.5% على 50 قطعة فأكثر لجميع الفيستات والخوذات</span>
          <span className="hidden md:inline text-blue-200">|</span>
          <span className="hidden md:inline text-emerald-300 font-bold">✨ أعلى دقة طباعة للشعار للشركات والمصانع</span>
        </div>
      </div>

      {toastMessage && (
        <div className="no-print fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-blue-600 text-white px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-2 text-xs sm:text-sm font-bold animate-in fade-in slide-in-from-top-4 duration-300">
          <Check className="w-4 h-4 text-emerald-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* الهيدر العلوي */}
      <header className="no-print sticky top-0 z-40 bg-[#090d16]/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => {
              setView("store");
              setIsInvoiceReady(false);
            }}
          >
            <div className="relative w-11 h-11 rounded-full overflow-hidden border border-blue-500/40 shadow-sm shrink-0 group-hover:scale-105 transition-transform">
              <Image
                src="https://i.ibb.co/NdnYZ3Pp/Whats-App-Image-2026-10-14-at-5-53-58-AM.jpg"
                alt="Future Press Company"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div>
              <span className="text-base sm:text-lg font-black tracking-tight text-white block group-hover:text-blue-400 transition-colors">
                Future Press
              </span>
              <span className="text-[10px] text-slate-400 font-medium hidden sm:block">
                للطباعة ومهمات الأمان الصناعي
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
            <button
              onClick={() => {
                setView("store");
                setActiveCategory("all");
              }}
              className="hover:text-blue-400 transition-colors cursor-pointer"
            >
              الرئيسية
            </button>
            <button
              onClick={() => {
                setView("store");
                setActiveCategory("offers");
              }}
              className="hover:text-amber-400 transition-colors cursor-pointer flex items-center gap-1"
            >
              <Flame className="w-4 h-4 text-amber-500" />
              العروض
            </button>
            <button
              onClick={() => {
                setView("store");
                setActiveCategory("workers");
              }}
              className="hover:text-blue-400 transition-colors cursor-pointer"
            >
              فيستات عمال
            </button>
            <button
              onClick={() => {
                setView("store");
                setActiveCategory("engineers");
              }}
              className="hover:text-blue-400 transition-colors cursor-pointer"
            >
              مهندسين
            </button>
            <a href="#showcase" className="hover:text-blue-400 transition-colors">
              نماذج الطباعة
            </a>
            <a href="#reviews" className="hover:text-blue-400 transition-colors">
              آراء العملاء
            </a>
            <a href="#faqs" className="hover:text-blue-400 transition-colors">
              الأسئلة الشائعة
            </a>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setIsQuotationModalOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-700 bg-slate-800/40 hover:bg-slate-800 text-xs font-semibold text-slate-200 transition-colors cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4 text-amber-400" />
              <span>طلب مقايسة رسمية</span>
            </button>

            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl border border-slate-700/80 bg-slate-800/40 hover:bg-slate-800 hover:border-blue-500/50 text-slate-200 transition-colors cursor-pointer flex items-center gap-2.5"
              aria-label="سلة المشتريات"
            >
              <ShoppingCart className="w-5 h-5 text-blue-400" />
              <span className="text-xs font-semibold hidden sm:inline">السلة</span>
              {totalItemsCount > 0 && (
                <span className="bg-blue-600 text-white text-[11px] font-bold px-1.5 py-0.5 rounded-full min-w-5 h-5 flex items-center justify-center">
                  {totalItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* المحتوى الرئيسي */}
      {view === "store" ? (
        <>
          <section className="relative overflow-hidden bg-gradient-to-b from-blue-950/30 via-transparent to-transparent border-b border-slate-800/60 py-12 sm:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-6 text-center lg:text-right">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-800/60 text-blue-300 text-xs font-semibold">
                    <Flame className="w-4 h-4 text-amber-400" />
                    خصومات توريد فورية: 5% فوق 21 قطعة و 12.5% على 50 قطعة فأكثر
                  </div>

                  <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
                    تجهيزات السلامة المهنية الميدانية <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-amber-300">
                      مع طباعة احترافية فائقة الدقة للشعار
                    </span>
                  </h1>

                  <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed">
                    شاهد نماذج حية وموك آب واقعي لفيستات العمال والمهندسين (4 عاكس و 3M) مع إمكانية طباعة الصدر والظهر بدقة وثبات تام.
                  </p>

                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                    <Button
                      onClick={() => setActiveCategory("offers")}
                      className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-6 rounded-xl font-bold text-base cursor-pointer shadow-lg shadow-blue-600/30 transition-transform active:scale-95"
                    >
                      تسوق العروض الحصرية الآن
                      <ArrowLeft className="w-5 h-5 mr-2" />
                    </Button>
                    <button
                      type="button"
                      onClick={() => setIsQuotationModalOpen(true)}
                      className="px-5 py-3 rounded-xl border border-slate-700 bg-slate-900/60 text-slate-200 hover:text-white hover:bg-slate-800 text-sm font-semibold transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <Download className="w-4 h-4 text-amber-400" />
                      استخراج مقايسة أسعار (PDF)
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 max-w-lg mx-auto lg:mx-0 text-right">
                    <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                      <Truck className="w-4 h-4 text-blue-400 shrink-0" />
                      <span>شحن لجميع المحافظات</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                      <Printer className="w-4 h-4 text-blue-400 shrink-0" />
                      <span>طباعة لوجو فائقة الدقة</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                      <Tag className="w-4 h-4 text-blue-400 shrink-0" />
                      <span>خصومات كميات فورية</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-slate-700/80 shadow-2xl bg-slate-900 group">
                    <Image
                      src={HERO_SHOWCASE_IMAGES[heroSlideIndex].url}
                      alt={HERO_SHOWCASE_IMAGES[heroSlideIndex].title}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-105"
                      priority
                      unoptimized
                    />

                    <div className="absolute top-4 right-4 z-10 flex gap-2">
                      <Badge className="bg-blue-600/90 text-white font-bold px-3 py-1 text-xs backdrop-blur-md border border-blue-400/40 shadow-lg">
                        {HERO_SHOWCASE_IMAGES[heroSlideIndex].badge}
                      </Badge>
                      <Badge className="bg-slate-900/80 text-amber-300 font-semibold px-2.5 py-1 text-xs backdrop-blur-md border border-slate-700">
                        {HERO_SHOWCASE_IMAGES[heroSlideIndex].category}
                      </Badge>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent flex items-end justify-between p-5">
                      <div className="text-white">
                        <span className="text-[11px] font-bold text-amber-400 tracking-wider block">
                          معاينة وتصوير حي
                        </span>
                        <p className="font-bold text-base sm:text-lg">
                          {HERO_SHOWCASE_IMAGES[heroSlideIndex].title}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 z-10">
                        <button
                          type="button"
                          onClick={() =>
                            setHeroSlideIndex((prev) =>
                              prev === 0 ? HERO_SHOWCASE_IMAGES.length - 1 : prev - 1
                            )
                          }
                          className="w-8 h-8 rounded-full bg-slate-900/80 hover:bg-blue-600 text-white border border-slate-700 flex items-center justify-center cursor-pointer transition-colors"
                          aria-label="الصورة السابقة"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setHeroSlideIndex((prev) =>
                              (prev + 1) % HERO_SHOWCASE_IMAGES.length
                            )
                          }
                          className="w-8 h-8 rounded-full bg-slate-900/80 hover:bg-blue-600 text-white border border-slate-700 flex items-center justify-center cursor-pointer transition-colors"
                          aria-label="الصورة التالية"
                        >
                          <ArrowLeft className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-7 gap-1.5 mt-3">
                    {HERO_SHOWCASE_IMAGES.map((img, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setHeroSlideIndex(idx)}
                        className={`relative aspect-square rounded-xl overflow-hidden border transition-all cursor-pointer ${
                          heroSlideIndex === idx
                            ? "border-blue-500 scale-105 shadow-md shadow-blue-900/50"
                            : "border-slate-800 opacity-60 hover:opacity-100"
                        }`}
                        title={img.title}
                      >
                        <Image src={img.url} alt="Thumbnail" fill className="object-cover" unoptimized />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="showcase" className="py-12 bg-slate-950/60 border-b border-slate-800/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 text-xs mb-2">
                    تنفيذ حقيقي وموك آب معتمد
                  </Badge>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    معرض نماذج الفيستات والطباعة الفعلية
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    استعرض أشكال الفيستات من الأمام والظهر مع نماذج 4 عاكس و 3M قبل إتمام طلبك
                  </p>
                </div>
                <a
                  href="https://wa.me/201010625349?text=أود الاستفسار عن تفاصيل طباعة كميات فيستات للشركات"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold text-blue-400 hover:text-blue-300"
                >
                  <span>اطلب بروفة رقمية لشعارك الآن</span>
                  <ArrowLeft className="w-4 h-4" />
                </a>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
                {HERO_SHOWCASE_IMAGES.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => setHeroSlideIndex(index)}
                    className="group relative aspect-square rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 hover:border-blue-500/60 transition-all duration-300 cursor-pointer"
                  >
                    <Image
                      src={item.url}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2.5">
                      <span className="text-[9px] font-bold text-amber-400">{item.badge}</span>
                      <p className="text-[10px] font-bold text-white leading-tight">{item.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-slate-950/90 py-8 border-b border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div className="space-y-1">
                  <span className="text-2xl sm:text-3xl font-black text-blue-400">+15,000</span>
                  <p className="text-xs text-slate-400 font-medium">فيست ومهمة أمان تم توريدها</p>
                </div>
                <div className="space-y-1">
                  <span className="text-2xl sm:text-3xl font-black text-blue-400">+120</span>
                  <p className="text-xs text-slate-400 font-medium">شركة ومصنع معتمد يتعامل معنا</p>
                </div>
                <div className="space-y-1">
                  <span className="text-2xl sm:text-3xl font-black text-blue-400">27</span>
                  <p className="text-xs text-slate-400 font-medium">محافظة يتم التوصيل المباشر لها</p>
                </div>
                <div className="space-y-1">
                  <span className="text-2xl sm:text-3xl font-black text-blue-400">100%</span>
                  <p className="text-xs text-slate-400 font-medium">ثبات ودقة طباعة الأحبار</p>
                </div>
              </div>
            </div>
          </section>

          <section className="sticky top-18 z-30 bg-[#090d16]/95 backdrop-blur-md border-b border-slate-800/80 py-4 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="ابحث بالاسم، اللون، أو الخامة (مثال: 3M)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl pr-10 pl-3 py-2 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <SlidersHorizontal className="w-4 h-4 text-slate-400" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-slate-900 border border-slate-700 text-xs sm:text-sm text-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500 cursor-pointer"
                  >
                    <option value="default">الترتيب التلقائي</option>
                    <option value="price-asc">السعر: من الأقل للأعلى</option>
                    <option value="price-desc">السعر: من الأعلى للأقل</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                <button
                  type="button"
                  onClick={() => setActiveCategory("all")}
                  className={`px-4 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border shrink-0 ${
                    activeCategory === "all"
                      ? "bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-900/30"
                      : "bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white"
                  }`}
                >
                  كل الأقسام
                </button>

                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-4 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border flex items-center gap-1.5 shrink-0 ${
                      activeCategory === cat.id
                        ? "bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-900/30"
                        : "bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white"
                    }`}
                  >
                    {cat.id === "offers" && <Flame className="w-3.5 h-3.5 text-amber-400" />}
                    {cat.title}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <main className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
              {displayedCategories.length === 0 ? (
                <div className="text-center py-20 space-y-3">
                  <p className="text-slate-400 text-lg">لم يتم العثور على أي منتج يطابق بحثك &quot;{searchQuery}&quot;</p>
                  <Button
                    onClick={() => setSearchQuery("")}
                    variant="outline"
                    className="border-slate-700 text-slate-200"
                  >
                    إعادة ضبط البحث
                  </Button>
                </div>
              ) : (
                displayedCategories.map((category) => {
                  const isHelmet = category.id === "helmets";
                  const isVestCategory = ["workers", "supervisors", "engineers"].includes(category.id);
                  const currentFilter = subCategoryFilter[category.id] || "all";

                  const localProducts = category.products.filter((p) => p.origin === "local");
                  const importedProducts = category.products.filter((p) => p.origin === "imported");

                  return (
                    <section key={category.id} id={category.id} className="space-y-6">
                      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-800">
                        <div>
                          <div className="flex items-center gap-2">
                            {category.id === "offers" && <Flame className="w-6 h-6 text-amber-400" />}
                            <h2 className="text-2xl sm:text-3xl font-black text-white">
                              {category.title}
                            </h2>
                          </div>
                          <p className="text-slate-400 text-sm mt-1">{category.description}</p>
                        </div>

                        {isVestCategory && (
                          <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800 w-fit">
                            <button
                              type="button"
                              onClick={() =>
                                setSubCategoryFilter((prev) => ({ ...prev, [category.id]: "all" }))
                              }
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                currentFilter === "all"
                                  ? "bg-blue-600 text-white shadow-sm"
                                  : "text-slate-400 hover:text-white"
                              }`}
                            >
                              الكل ({category.products.length})
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                setSubCategoryFilter((prev) => ({ ...prev, [category.id]: "local" }))
                              }
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                currentFilter === "local"
                                  ? "bg-emerald-600 text-white shadow-sm"
                                  : "text-slate-400 hover:text-white"
                              }`}
                            >
                              محلي ({localProducts.length})
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                setSubCategoryFilter((prev) => ({ ...prev, [category.id]: "imported" }))
                              }
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                currentFilter === "imported"
                                  ? "bg-cyan-600 text-white shadow-sm"
                                  : "text-slate-400 hover:text-white"
                              }`}
                            >
                              مستورد ({importedProducts.length})
                            </button>
                          </div>
                        )}
                      </div>

                      {!isVestCategory && (
                        <div className="grid md:grid-cols-2 gap-6">
                          {category.products.map((product) => renderProductCard(product, isHelmet))}
                        </div>
                      )}

                      {isVestCategory && (
                        <div className="space-y-10">
                          {(currentFilter === "all" || currentFilter === "local") && localProducts.length > 0 && (
                            <div className="space-y-4">
                              <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                <h3 className="text-lg font-bold text-emerald-400">تصنيع محلي</h3>
                                <span className="text-xs text-slate-500">({localProducts.length} نوع)</span>
                              </div>
                              <div className="grid md:grid-cols-2 gap-6">
                                {localProducts.map((product) => renderProductCard(product, false))}
                              </div>
                            </div>
                          )}

                          {(currentFilter === "all" || currentFilter === "imported") && importedProducts.length > 0 && (
                            <div className="space-y-4">
                              <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                                <h3 className="text-lg font-bold text-cyan-400">خامات مستوردة</h3>
                                <span className="text-xs text-slate-500">({importedProducts.length} نوع)</span>
                              </div>
                              <div className="grid md:grid-cols-2 gap-6">
                                {importedProducts.map((product) => renderProductCard(product, false))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </section>
                  );
                })
              )}
            </div>
          </main>

          <section id="reviews" className="py-16 bg-slate-950/80 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              <div className="text-center space-y-3">
                <Badge className="bg-blue-600/20 text-blue-400 border border-blue-500/30 px-3 py-1 text-xs">
                  شركاء النجاح والثقة
                </Badge>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  موثوق به من كبرى شركات المقاولات والمصانع
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto">
                  قمنا بتجهيز أطقم الأمان المهني وتوريد السترات المطبوعة لمئات المشروعات الهندسية والمصانع على مستوى مصر.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                  <div className="flex text-amber-400 gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    &quot;تم استلام دفعة 100 فيست مهندسين ثري إم لموقع التجمع. خامة القماش محملة وجودة طباعة اللوجو ممتازة والتسليم في الميعاد المحدد.&quot;
                  </p>
                  <div className="pt-2 border-t border-slate-800/80">
                    <p className="font-bold text-xs text-white">م. أحمد سامي</p>
                    <p className="text-[11px] text-slate-500">مدير مشتريات شركة مقاولات</p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                  <div className="flex text-amber-400 gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    &quot;عرض الـ 50 فيست وفر معانا كتير في تجهيز العمال بالمصنع، العواكس بتلمع جداً بالإضاءة الليلية وشغل محترم جداً.&quot;
                  </p>
                  <div className="pt-2 border-t border-slate-800/80">
                    <p className="font-bold text-xs text-white">أ. محمد الشريف</p>
                    <p className="text-[11px] text-slate-500">مدير مصنع صناعات غذائية - العاشر</p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                  <div className="flex text-amber-400 gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    &quot;التعامل راقي جداً وسهولة استخراج عروض الأسعار والفواتير المعتمدة من الموقع بتسهل علينا إنهاء المعاملات المحاسبية بسرعة.&quot;
                  </p>
                  <div className="pt-2 border-t border-slate-800/80">
                    <p className="font-bold text-xs text-white">م. كريم عادل</p>
                    <p className="text-[11px] text-slate-500">مسؤول السلامة والصحة المهنية (HSE)</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="faqs" className="py-16 bg-slate-900/40 border-t border-slate-800">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
              <div className="text-center space-y-2">
                <h3 className="text-2xl sm:text-3xl font-black text-white flex items-center justify-center gap-2">
                  <HelpCircle className="w-6 h-6 text-blue-400" />
                  الأسئلة الشائعة والاستفسارات
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm">
                  إليك كل ما تود معرفته عن مواصفات التوريد وإجراءات الطباعة والشحن
                </p>
              </div>

              <div className="space-y-3">
                {FAQS.map((faq, idx) => (
                  <div
                    key={idx}
                    className="border border-slate-800 bg-slate-900/80 rounded-2xl overflow-hidden transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                      className="w-full p-4 sm:p-5 text-right font-bold text-sm sm:text-base text-white flex items-center justify-between gap-4 cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 transition-transform ${
                          activeFaq === idx ? "rotate-180 text-blue-400" : ""
                        }`}
                      />
                    </button>
                    {activeFaq === idx && (
                      <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 border-t border-slate-800/50 leading-relaxed">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      ) : (
        /* شاشة الفاتورة وإتمام الطلب */
        <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 space-y-8">
          <button
            type="button"
            onClick={() => {
              setView("store");
              setIsInvoiceReady(false);
            }}
            className="no-print inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold text-sm cursor-pointer"
          >
            <ArrowRight className="w-4 h-4" />
            الرجوع للتسوق وإضافة منتجات أخرى
          </button>

          {!isInvoiceReady ? (
            <form onSubmit={handleCheckoutSubmit} className="space-y-6">
              <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 shadow-xl">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-400" />
                  مراجعة المنتجات وسعر التوريد
                </h2>
                {cart.length === 0 ? (
                  <p className="text-center py-6 text-slate-400 text-sm">سلتك فارغة حالياً</p>
                ) : (
                  <div className="divide-y divide-slate-800 text-sm">
                    {cart.map((item) => (
                      <div key={item.id} className="py-3 flex justify-between items-center">
                        <div>
                          <p className="font-bold text-white">{item.name}</p>
                          <p className="text-slate-400 text-xs mt-0.5">
                            المقاس: <span className="text-slate-200">{item.size}</span> | موضع الطباعة:{" "}
                            <span className="text-blue-300">
                              {item.printLocation === "chest"
                                ? "الصدر"
                                : item.printLocation === "back"
                                ? "الظهر"
                                : "الصدر والظهر"}
                            </span>{" "}
                            | الكمية: <span className="text-slate-200">{item.quantity}</span>
                          </p>
                        </div>
                        <div className="font-bold text-blue-400">{item.price * item.quantity} ج.م</div>
                      </div>
                    ))}

                    <div className="pt-3 flex justify-between text-slate-300 text-sm">
                      <span>إجمالي المنتجات:</span>
                      <span>{rawTotalPrice} ج.م</span>
                    </div>

                    {discountAmount > 0 && (
                      <div className="pt-2 flex justify-between text-emerald-400 font-bold text-sm">
                        <span>خصم الكميات ({discountRate * 100}%):</span>
                        <span>-{discountAmount} ج.م</span>
                      </div>
                    )}

                    <div className="pt-2 flex justify-between text-slate-300 text-sm">
                      <span>تكلفة الشحن لـ ({formData.governorate}):</span>
                      <span className="font-semibold">{shippingFee} ج.م</span>
                    </div>

                    <div className="pt-3 flex justify-between font-black text-lg text-white border-t border-slate-800">
                      <span>الإجمالي النهائي المطلوب:</span>
                      <span className="text-blue-400">{grandTotal} ج.م</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
                <h2 className="text-xl font-bold text-white mb-2">بيانات الشحن والتوريد</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1.5 text-slate-300">
                      اسم المستلم أو مسؤول الاستلام *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                      placeholder="اسم المستلم ثلاثي"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1.5 text-slate-300">
                      اسم الشركة أو المنشأة (اختياري)
                    </label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                      placeholder="اسم الشركة لتدوينه بالفاتورة"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1.5 text-slate-300">
                      رقم الهاتف الأساسي للتواصل *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone1}
                      onChange={(e) => setFormData({ ...formData, phone1: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                      placeholder="01xxxxxxxxx"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1.5 text-slate-300">
                      رقم هاتف إضافي (اختياري)
                    </label>
                    <input
                      type="tel"
                      value={formData.phone2}
                      onChange={(e) => setFormData({ ...formData, phone2: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                      placeholder="رقم مسؤول الموقع أو الطوارئ"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1.5 text-slate-300">
                      المحافظة *
                    </label>
                    <select
                      value={formData.governorate}
                      onChange={(e) => setFormData({ ...formData, governorate: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-blue-500 font-medium"
                    >
                      {GOVERNORATES.map((gov) => (
                        <option key={gov.name} value={gov.name} className="bg-slate-900 text-white">
                          {gov.name} (الشحن {gov.fee} ج.م)
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold mb-1.5 text-slate-300">
                      العنوان بالتفصيل *
                    </label>
                    <textarea
                      required
                      rows={2}
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                      placeholder="المدينة / المركز، اسم الشارع، رقم المبنى أو تفاصيل الموقع الإنشائي"
                    />
                  </div>

                  {/* إرفاق الشعار بدون معاينة */}
                  <div className="md:col-span-2 space-y-2">
                    <label className="block text-xs font-semibold text-slate-300">
                      ملف الشعار للطباعة (اختياري)
                    </label>
                    <input
                      type="file"
                      accept="image/*,.pdf,.ai,.eps,.psd"
                      onChange={handleLogoUpload}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-slate-400 file:ml-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-blue-600 file:text-white cursor-pointer"
                    />
                    {logoFile ? (
                      <p className="text-xs text-emerald-400 font-medium flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5" />
                        تم إرفاق الشعار بنجاح: {logoFile.name} (سيقوم فريق التصميم بإرسال بروفة الشعار عبر واتساب لاعتمادها قبل بدء خط الإنتاج)
                      </p>
                    ) : (
                      <p className="text-[11px] text-slate-400">
                        يمكنك إرفاق الشعار هنا بأي صيغة (PNG, JPG, PDF, AI)، وسنقوم بالتواصل معك وإرسال بروفة الاعتماد عبر واتساب.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
                <h2 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-blue-400" />
                  سداد عربون تأكيد أمر التوريد والبدء بالطباعة
                </h2>
                <p className="text-xs text-slate-400 leading-relaxed">
                  لبدء سحب الخامات وطباعة الشعار، يرجى تحويل مبلغ جدية التعاقد عبر فودافون كاش أو إنستاباي:
                </p>

                <div className="grid md:grid-cols-2 gap-4 pt-1">
                  <div className="rounded-xl border border-red-500/30 bg-gradient-to-br from-red-950/30 to-slate-950 p-4 flex flex-col justify-between">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs font-bold text-red-400">Vodafone Cash</span>
                      <button
                        type="button"
                        onClick={() => handleCopy("01010625349", "vodafone")}
                        className="px-2 py-1 rounded bg-red-600/20 hover:bg-red-600 text-red-200 hover:text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                      >
                        {copiedVodafone ? <CheckCheck className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedVodafone ? "تم النسخ" : "نسخ"}</span>
                      </button>
                    </div>
                    <div>
                      <p className="text-xl font-black text-white tracking-wider">01010625349</p>
                      <p className="text-[11px] text-slate-400 mt-1">تحويل كاش إلى هذا الرقم</p>
                    </div>
                  </div>

                  <div className="rounded-xl border border-purple-500/30 bg-gradient-to-br from-purple-950/30 to-slate-950 p-4 flex flex-col justify-between">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs font-bold text-purple-400">InstaPay</span>
                      <button
                        type="button"
                        onClick={() => handleCopy("01144248804", "instapay")}
                        className="px-2 py-1 rounded bg-purple-600/20 hover:bg-purple-600 text-purple-200 hover:text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                      >
                        {copiedInstapay ? <CheckCheck className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedInstapay ? "تم النسخ" : "نسخ"}</span>
                      </button>
                    </div>
                    <div>
                      <p className="text-xl font-black text-white tracking-wider">01144248804</p>
                      <p className="text-[11px] text-slate-400 mt-1">تحويل لحظي عبر InstaPay</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <label className="block text-xs font-semibold mb-1.5 text-slate-300">
                    إرفاق إيصال التحويل (اسكرين شوت)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setReceiptFile(e.target.files?.[0] || null)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-slate-400 file:ml-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-blue-600 file:text-white"
                  />
                  {receiptFile && (
                    <p className="text-xs text-emerald-400 mt-1">تم إرفاق الإيصال: {receiptFile.name}</p>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                disabled={cart.length === 0}
                className="w-full py-6 text-base font-bold bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-600/20 cursor-pointer active:scale-95 transition-transform"
              >
                تأكيد أمر الشغل وإصدار الفاتورة
              </Button>
            </form>
          ) : (
            /* الفاتورة الرسمية المصممة لطباعة صفحة A4 واحدة نقية */
            <div className="space-y-6">
              <div className="no-print flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-900 p-4 rounded-xl border border-slate-800 gap-4">
                <div>
                  <h3 className="text-lg font-bold text-white">تم استلام أمر التوريد والطباعة بنجاح!</h3>
                  <p className="text-xs text-slate-400">
                    تم توثيق الطلب وإرسال إشعار التجهيز الفوري لفريق العمل.
                  </p>
                </div>
                <Button
                  onClick={() => window.print()}
                  className="bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-2 font-bold cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  طباعة أو حفظ الفاتورة PDF (صفحة واحدة)
                </Button>
              </div>

              <div
                id="invoice-print-area"
                className="printable-single-page bg-white text-slate-900 p-6 sm:p-8 rounded-2xl shadow-xl border border-slate-200"
              >
                <div className="flex flex-row justify-between items-center pb-4 border-b-2 border-slate-900">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border border-slate-300 shrink-0">
                      <Image
                        src="https://i.ibb.co/NdnYZ3Pp/Whats-App-Image-2026-10-14-at-5-53-58-AM.jpg"
                        alt="Logo"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div>
                      <h2 className="text-lg font-black text-slate-900">Future Press Company</h2>
                      <p className="text-[11px] text-slate-500">للطباعة ومهمات السلامة المهنية المعتمدة</p>
                    </div>
                  </div>

                  <div className="text-left font-sans">
                    <span className="text-xl font-black text-slate-900 tracking-wider">فاتورة مبيعات</span>
                    <p className="text-xs font-bold text-slate-600 mt-0.5">كود: {invoiceNumber}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 py-4 border-b border-slate-200 text-xs">
                  <div>
                    <h4 className="font-bold text-slate-900 mb-0.5">الجهة الموردة:</h4>
                    <p className="text-slate-700 font-semibold">Future Press Company</p>
                    <p className="text-slate-500">القاهرة - حلوان | هاتف: 01010625349</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 mb-0.5">بيانات العميل:</h4>
                    <p className="text-slate-700 font-semibold">{formData.fullName} {formData.companyName && `(${formData.companyName})`}</p>
                    <p className="text-slate-500">
                      {formData.governorate} - {formData.address} | هاتف: {formData.phone1}
                    </p>
                    <p className="text-slate-500 text-[10px]">التاريخ: {orderDate}</p>
                  </div>
                </div>

                <div className="py-4">
                  <table className="w-full text-right border-collapse text-xs">
                    <thead>
                      <tr className="border-b-2 border-slate-900 font-bold text-slate-700">
                        <th className="py-1.5">المنتج / البيان</th>
                        <th className="py-1.5 text-center">المقاس</th>
                        <th className="py-1.5 text-center">موضع الطباعة</th>
                        <th className="py-1.5 text-center">الكمية</th>
                        <th className="py-1.5 text-center">السعر</th>
                        <th className="py-1.5 text-left">الإجمالي</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {cart.map((item, idx) => (
                        <tr key={idx}>
                          <td className="py-1.5 font-medium text-slate-800">{item.name}</td>
                          <td className="py-1.5 text-center text-slate-600">{item.size}</td>
                          <td className="py-1.5 text-center text-slate-600">
                            {item.printLocation === "chest"
                              ? "الصدر فقط"
                              : item.printLocation === "back"
                              ? "الظهر فقط"
                              : "الصدر والظهر"}
                          </td>
                          <td className="py-1.5 text-center text-slate-600">{item.quantity}</td>
                          <td className="py-1.5 text-center text-slate-600">{item.price} ج.م</td>
                          <td className="py-1.5 text-left font-bold text-slate-900">
                            {item.price * item.quantity} ج.م
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="border-t-2 border-slate-900 pt-3 flex justify-end">
                  <div className="w-64 space-y-1 text-xs">
                    <div className="flex justify-between text-slate-600">
                      <span>إجمالي المنتجات:</span>
                      <span>{rawTotalPrice} ج.م</span>
                    </div>

                    {discountAmount > 0 && (
                      <div className="flex justify-between text-emerald-600 font-bold">
                        <span>خصم الكميات ({discountRate * 100}%):</span>
                        <span>-{discountAmount} ج.م</span>
                      </div>
                    )}

                    <div className="flex justify-between text-slate-600">
                      <span>الشحن والتوصيل ({formData.governorate}):</span>
                      <span>{shippingFee} ج.م</span>
                    </div>

                    <div className="flex justify-between text-sm font-black border-t border-slate-900 pt-1.5 text-slate-900">
                      <span>الإجمالي النهائي:</span>
                      <span>{grandTotal} ج.م</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-200 text-center text-[10px] text-slate-500">
                  <p>شكراً لتعاملكم مع Future Press Company. سيتم التواصل معكم هاتفياً لتأكيد الشحن والتسليم.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* سلة المشتريات الجانبية Drawer */}
      {isCartOpen && (
        <div className="no-print fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-slate-900 text-slate-100 border-l border-slate-800 h-full p-6 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-blue-400" />
                  <h3 className="font-bold text-base text-white">سلة المشتريات</h3>
                  <Badge className="bg-blue-600 text-white text-xs">{totalItemsCount}</Badge>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {totalItemsCount < 50 && (
                <div className="mt-3 p-2.5 rounded-lg bg-blue-950/40 border border-blue-900/50 text-[11px] text-blue-300">
                  {totalItemsCount <= 21 ? (
                    <p>أضف <strong>{22 - totalItemsCount}</strong> قطع إضافية لتحصل على خصم 5% توريدات!</p>
                  ) : (
                    <p>أضف <strong>{50 - totalItemsCount}</strong> قطعة إضافية لتحصل على خصم الجملة الكبرى 12.5%!</p>
                  )}
                </div>
              )}

              <div className="overflow-y-auto max-h-[60vh] py-4 space-y-3">
                {cart.length === 0 ? (
                  <p className="text-center text-slate-500 py-12 text-sm">السلة فارغة حالياً</p>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-3 p-3 bg-slate-950/60 border border-slate-800/80 rounded-xl"
                    >
                      <div className="flex-1 min-w-0">
                        <h5 className="font-bold text-xs truncate text-white">{item.name}</h5>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          المقاس: {item.size} | موضع الطباعة:{" "}
                          <span className="text-blue-300">
                            {item.printLocation === "chest"
                              ? "الصدر"
                              : item.printLocation === "back"
                              ? "الظهر"
                              : "الصدر والظهر"}
                          </span>
                        </p>
                        <p className="text-xs font-black text-blue-400 mt-1">
                          {item.price * item.quantity} ج.م ({item.quantity} قطع)
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="text-slate-500 hover:text-red-400 p-1.5 rounded transition-colors cursor-pointer"
                        title="حذف"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {cart.length > 0 && (
              <div className="border-t border-slate-800 pt-4 space-y-3">
                {discountAmount > 0 && (
                  <div className="flex justify-between items-center text-xs text-emerald-400 font-bold">
                    <span>خصم الكميات المطبق ({discountRate * 100}%):</span>
                    <span>-{discountAmount} ج.م</span>
                  </div>
                )}
                <div className="flex justify-between items-center text-sm font-bold">
                  <span className="text-slate-400">إجمالي السلة:</span>
                  <span className="text-blue-400 text-xl font-black">{totalPrice} ج.م</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    onClick={() => {
                      setIsCartOpen(false);
                      setIsQuotationModalOpen(true);
                    }}
                    variant="outline"
                    className="border-slate-700 hover:bg-slate-800 text-slate-200 text-xs font-bold py-5 rounded-xl cursor-pointer"
                  >
                    عرض أسعار (PDF)
                  </Button>
                  <Button
                    onClick={() => {
                      setIsCartOpen(false);
                      setView("checkout");
                      setIsInvoiceReady(false);
                    }}
                    className="py-5 text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white rounded-xl cursor-pointer"
                  >
                    إتمام الطلب
                    <ArrowLeft className="w-4 h-4 mr-1" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* نافذة المعاينة السريعة للمنتج (Quick View Modal) */}
      {quickViewProduct && (
        <div className="no-print fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 text-slate-100 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-lg text-white">{quickViewProduct.name}</h3>
              <button
                type="button"
                onClick={() => setQuickViewProduct(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 items-center">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
                <Image
                  src={quickViewProduct.image}
                  alt={quickViewProduct.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>

              <div className="space-y-4 text-xs">
                <p className="text-slate-300 leading-relaxed text-sm">{quickViewProduct.description}</p>
                <div className="space-y-2">
                  <span className="font-bold text-white block">أبرز المواصفات:</span>
                  <ul className="space-y-1.5 text-slate-300">
                    {quickViewProduct.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-baseline justify-between">
                  <span className="text-slate-400">السعر الفردي:</span>
                  <span className="text-2xl font-black text-blue-400">{quickViewProduct.price} ج.م</span>
                </div>

                <Button
                  onClick={() => {
                    addToCart(quickViewProduct);
                    setQuickViewProduct(null);
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-5 rounded-xl cursor-pointer"
                >
                  إضافة سريعة إلى السلة
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* نافذة دليل المقاسات الذكي (Interactive Size Guide) */}
      {isSizeGuideOpen && (
        <div className="no-print fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 text-slate-100 space-y-5">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Ruler className="w-5 h-5 text-blue-400" />
                <h3 className="font-bold text-base text-white">دليل المقاسات الميدانية بالسنتيمتر</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsSizeGuideOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-x-auto text-xs">
              <table className="w-full text-center border-collapse border border-slate-800">
                <thead>
                  <tr className="bg-slate-950 font-bold text-blue-300">
                    <th className="p-2.5 border border-slate-800">المقاس</th>
                    <th className="p-2.5 border border-slate-800">محيط الصدر (سم)</th>
                    <th className="p-2.5 border border-slate-800">الطول من الكتف (سم)</th>
                    <th className="p-2.5 border border-slate-800">الوزن التقريبي</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  <tr>
                    <td className="p-2.5 font-bold text-white border border-slate-800">XL</td>
                    <td className="p-2.5 border border-slate-800">115 - 120</td>
                    <td className="p-2.5 border border-slate-800">68</td>
                    <td className="p-2.5 border border-slate-800">65 - 80 كجم</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white border border-slate-800">2XL</td>
                    <td className="p-2.5 border border-slate-800">120 - 126</td>
                    <td className="p-2.5 border border-slate-800">70</td>
                    <td className="p-2.5 border border-slate-800">80 - 95 كجم</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white border border-slate-800">3XL</td>
                    <td className="p-2.5 border border-slate-800">126 - 134</td>
                    <td className="p-2.5 border border-slate-800">72</td>
                    <td className="p-2.5 border border-slate-800">95 - 115 كجم</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-900/50 text-xs text-blue-300 leading-relaxed">
              💡 <strong>نصيحة مهندسي المواقع:</strong> إذا كان طاقم العمل يرتدي الفيست فوق جواكت أو ملابس شتوية ثقيلة أثناء نوبات العمل الخارجية، يفضل اختيار مقاس أكبر بدرجة واحدة لحرية الحركة التامة.
            </div>

            <Button
              onClick={() => setIsSizeGuideOpen(false)}
              className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold"
            >
              إغلاق
            </Button>
          </div>
        </div>
      )}

      {/* نافذة استخراج عرض الأسعار الرسمي للشركات (صفحة واحدة A4 بدون تكرار) */}
      {isQuotationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="printable-single-page bg-white text-slate-900 rounded-3xl max-w-3xl w-full p-6 sm:p-8 max-h-[92vh] overflow-y-auto space-y-5 shadow-2xl">
            <div className="flex justify-between items-start border-b-2 border-slate-900 pb-3">
              <div>
                <span className="text-xl font-black text-slate-900">Future Press Company</span>
                <p className="text-[11px] text-slate-600">قطاع التوريدات الهندسية والطباعة الصناعية</p>
              </div>
              <div className="text-left">
                <span className="text-base font-black bg-slate-900 text-white px-3 py-1 rounded">
                  عرض أسعار ومقايسة توريد
                </span>
                <p className="text-[11px] text-slate-500 mt-1">التاريخ: {orderDate}</p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <p className="text-slate-700 font-medium leading-relaxed">
                السادة مديري المشتريات والمشروعات المحترمين، يسر شركة <strong>Future Press Company</strong> أن تقدم لسيادتكم مقايسة الأسعار الرسمية بناءً على المنتجات المحددة في السلة مع ضمان أعلى دقة في طباعة الشعار:
              </p>

              <table className="w-full text-right border-collapse text-xs">
                <thead>
                  <tr className="border-b-2 border-slate-900 font-bold bg-slate-100">
                    <th className="p-2">البيان</th>
                    <th className="p-2 text-center">المقاس</th>
                    <th className="p-2 text-center">الكمية</th>
                    <th className="p-2 text-center">السعر الفردي</th>
                    <th className="p-2 text-left">الإجمالي</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {cart.map((item, i) => (
                    <tr key={i}>
                      <td className="p-2 font-medium">{item.name} (شامل الطباعة)</td>
                      <td className="p-2 text-center">{item.size}</td>
                      <td className="p-2 text-center">{item.quantity}</td>
                      <td className="p-2 text-center">{item.price} ج.م</td>
                      <td className="p-2 text-left font-bold">{item.price * item.quantity} ج.م</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="border-t border-slate-300 pt-2 flex justify-end">
                <div className="w-64 space-y-1">
                  <div className="flex justify-between">
                    <span>إجمالي الأصناف:</span>
                    <span>{rawTotalPrice} ج.م</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-bold">
                      <span>خصم الكميات ({discountRate * 100}%):</span>
                      <span>-{discountAmount} ج.م</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-black border-t border-slate-900 pt-1">
                    <span>الإجمالي التقديري:</span>
                    <span>{totalPrice} ج.م</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1 text-[11px] text-slate-600">
                <p>📌 <strong>شروط التوريد والاعتماد:</strong></p>
                <p>1. الأسعار تشمل إعداد وتجهيز فيلم الطباعة والأحبار المعتمدة للشركات.</p>
                <p>2. مدة سريان هذا العرض 15 يوماً من تاريخ إصداره أعلاه.</p>
                <p>3. يتم سداد 30% دفعة مقدمة عند التعاقد والباقي عند الفحص والاستلام.</p>
              </div>
            </div>

            <div className="no-print flex justify-between items-center pt-3 border-t border-slate-200">
              <Button
                onClick={() => setIsQuotationModalOpen(false)}
                variant="outline"
                className="border-slate-300 text-slate-700"
              >
                إغلاق
              </Button>
              <Button
                onClick={() => window.print()}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold flex items-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                تحميل / طباعة المقايسة (PDF)
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* زر واتساب عائم */}
      <div className="no-print hidden md:block fixed bottom-6 left-6 z-40">
        <a
          href="https://wa.me/201010625349?text=مرحبا، أود الاستفسار عن تفاصيل طباعة وتوريدات Future Press"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 bg-[#25D366] text-white p-3.5 rounded-full shadow-2xl hover:scale-105 transition-all cursor-pointer"
          title="تواصل مباشرة عبر واتساب"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="text-xs font-bold max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300">
            تواصل معنا واتساب
          </span>
        </a>
      </div>

      {/* شريط سفلي للهواتف المحمولة */}
      <div className="no-print md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#090d16]/95 backdrop-blur-md border-t border-slate-800 px-4 py-2 flex items-center justify-around text-xs">
        <button
          onClick={() => {
            setView("store");
            setActiveCategory("all");
          }}
          className="flex flex-col items-center gap-1 text-slate-400 hover:text-white"
        >
          <Layers className="w-5 h-5" />
          <span>الرئيسية</span>
        </button>

        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center gap-1 text-slate-400 hover:text-white"
        >
          <ShoppingCart className="w-5 h-5 text-blue-400" />
          <span>السلة</span>
          {totalItemsCount > 0 && (
            <span className="absolute -top-1 right-2 bg-blue-600 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
              {totalItemsCount}
            </span>
          )}
        </button>

        <a
          href="https://wa.me/201010625349?text=مرحبا، أود الاستفسار عن منتجات Future Press"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 text-emerald-400"
        >
          <MessageCircle className="w-5 h-5" />
          <span>واتساب</span>
        </a>
      </div>

      {/* تذييل الموقع (Footer) */}
      <footer id="footer" className="no-print bg-slate-950 border-t border-slate-800/80 mt-20 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-800/80 text-sm">
            <div className="space-y-3 md:col-span-2">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-blue-500/40">
                  <Image
                    src="https://i.ibb.co/NdnYZ3Pp/Whats-App-Image-2026-10-14-at-5-53-58-AM.jpg"
                    alt="Future Press"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <h4 className="text-base font-black text-white">Future Press Company</h4>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
                المتخصصون في مستلزمات السلامة والصحة المهنية، سترات الأمان التنفيذية والميدانية، وأحدث حلول الطباعة واليونيفورم للشركات والمصانع في مصر.
              </p>
            </div>

            <div>
              <h5 className="font-bold text-white mb-3 text-xs tracking-wider uppercase">معلومات التواصل</h5>
              <ul className="space-y-2 text-xs text-slate-400">
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>القاهرة - حلوان</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>01010625349</span>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-white mb-3 text-xs tracking-wider uppercase">تابعنا على السوشيال ميديا</h5>
              <div className="flex items-center gap-2.5">
                <a
                  href="https://www.facebook.com/profile.php?id=61565194104813"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 hover:border-blue-500 flex items-center justify-center text-slate-300 hover:text-blue-400 transition-colors"
                  title="صفحتنا على فيسبوك"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://instagram.com/future.press1?stkn=MTI1azk0dzZsMnp1dw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 hover:border-pink-500 flex items-center justify-center text-slate-300 hover:text-pink-400 transition-colors"
                  title="إنستغرام"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://wa.me/201010625349"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 hover:border-emerald-500 flex items-center justify-center text-slate-300 hover:text-emerald-400 transition-colors"
                  title="واتساب مباشر"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
            <p>© 2026 Future Press Company. جميع الحقوق محفوظة.</p>
            <p>حلول التوريدات الميدانية والطباعة الصناعية</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
