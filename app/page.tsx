"use client";

import { useState } from "react";
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
  Layers,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  sizes: string[];
  features: string[];
  badge?: string;
}

interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  size: string;
  image: string;
  quantity: number;
}

interface Category {
  id: string;
  title: string;
  description: string;
  products: Product[];
}

const CATEGORIES: Category[] = [
  {
    id: "workers",
    title: "فيست عمال",
    description: "سترات أمان عملية ومتينة مصممة لتوفير أعلى درجات الرؤية والسلامة في بيئات العمل المختلفة.",
    products: [
      {
        id: "worker-vest-lemon-local",
        name: "فيست عمال ليموني (محلي)",
        description: "فيست أمان عمال لون ليموني فسفوري عالي الوضوح، تصنيع محلي بجودة ممتازة وخامة متينة.",
        price: 80,
        image: "https://i.ibb.co/hxhfZXz0/Whats-App-Image-2026-10-11-at-3-09-23-PM.jpg",
        sizes: ["XL", "2XL", "3XL"],
        features: ["لون ليموني عالي الوضوح", "خطوط عاكسة للضوء للأمان الليلي", "صناعة محلية عالية الجودة"],
        badge: "إنتاج محلي",
      },
      {
        id: "worker-vest-lemon-imported",
        name: "فيست عمال ليموني (مستورد)",
        description: "فيست أمان عمال لون ليموني فسفوري عالي الوضوح، خامات مستوردة ممتازة وتصميم مريح للعمل الشاق.",
        price: 90,
        image: "https://i.ibb.co/hxhfZXz0/Whats-App-Image-2026-10-11-at-3-09-23-PM.jpg",
        sizes: ["XL", "2XL", "3XL"],
        features: ["خامة مستوردة فائقة المتانة", "أشرطة فسفورية عاكسة متطورة", "سحاب أمامي عملي وقوي"],
        badge: "مستورد",
      },
      {
        id: "worker-vest-orange-local",
        name: "فيست عمال برتقالي (محلي)",
        description: "فيست أمان عمال لون برتقالي ناصع، خامات متينة وأشرطة عاكسة للضوء تصنيع محلي عالي الجودة.",
        price: 80,
        image: "https://i.ibb.co/cXKFMsb7/Whats-App-Image-2026-10-11-at-3-09-24-PM.jpg",
        sizes: ["XL", "2XL", "3XL"],
        features: ["لون برتقالي فاقع عالي الرؤية", "خطوط عاكسة مزدوجة", "تصنيع محلي متين"],
        badge: "إنتاج محلي",
      },
      {
        id: "worker-vest-orange-imported",
        name: "فيست عمال برتقالي (مستورد)",
        description: "فيست أمان عمال برتقالي مستورد عالي الكفاءة، مقاوم للظروف القاسية مع أشرطة عاكسة ممتازة.",
        price: 90,
        image: "https://i.ibb.co/cXKFMsb7/Whats-App-Image-2026-10-11-at-3-09-24-PM.jpg",
        sizes: ["XL", "2XL", "3XL"],
        features: ["خامة مستوردة ممتازة", "عاكس ضوء فائق القوة", "مريح وسهل الارتداء"],
        badge: "مستورد",
      },
      {
        id: "worker-vest-black-local",
        name: "فيست عمال أسود (محلي)",
        description: "فيست عمال لون أسود بتصميم أنيق ومقاوم للأتربة والاتساخ مع خطوط عاكسة واضحة تصنيع محلي.",
        price: 100,
        image: "https://i.ibb.co/FLvDPndN/Whats-App-Image-2026-10-11-at-3-09-59-PM-2.jpg",
        sizes: ["XL", "2XL", "3XL"],
        features: ["لون أسود مميز وعملي", "أشرطة فسفورية عاكسة للأمان", "قماش متين عالي التحمل"],
        badge: "إنتاج محلي",
      },
      {
        id: "worker-vest-black-imported",
        name: "فيست عمال أسود (مستورد)",
        description: "فيست عمال أسود مستورد عالي الجودة، يجمع بين المظهر المهني والأمان التام داخل الموقع.",
        price: 120,
        image: "https://i.ibb.co/FLvDPndN/Whats-App-Image-2026-10-11-at-3-09-59-PM-2.jpg",
        sizes: ["XL", "2XL", "3XL"],
        features: ["خامة مستوردة فاخرة", "أشرطة عاكسة متينة", "سحاب قوي وخياطة معززة"],
        badge: "مستورد",
      },
      {
        id: "worker-vest-blue-local",
        name: "فيست عمال أزرق (محلي)",
        description: "فيست أمان عمال باللون الأزرق الميداني الأنيق، تصنيع محلي متقن مع أشرطة فسفورية للرؤية.",
        price: 100,
        image: "https://i.ibb.co/ccQ8PXjb/Whats-App-Image-2026-10-11-at-3-09-59-PM-1.jpg",
        sizes: ["XL", "2XL", "3XL"],
        features: ["لون أزرق عملي وجذاب", "عاكس إضاءة عريض", "خامة محلية عالية الجودة"],
        badge: "إنتاج محلي",
      },
      {
        id: "worker-vest-blue-imported",
        name: "فيست عمال أزرق (مستورد)",
        description: "فيست أمان عمال أزرق مستورد بخامات ممتازة وتصميم احترافي يوفر الراحة الكاملة أثناء العمل.",
        price: 120,
        image: "https://i.ibb.co/ccQ8PXjb/Whats-App-Image-2026-10-11-at-3-09-59-PM-1.jpg",
        sizes: ["XL", "2XL", "3XL"],
        features: ["خامات مستوردة فائقة الجودة", "عواكس متطورة للرؤية الليلية", "تهوية وراحة أثناء الحركة"],
        badge: "مستورد",
      },
      {
        id: "worker-vest-red-local",
        name: "فيست عمال أحمر (محلي)",
        description: "فيست عمال لون أحمر ناصع للتمييز السريع ولفرق السلامة والطوارئ تصنيع محلي متميز.",
        price: 100,
        image: "https://i.ibb.co/ns3w2ct8/Whats-App-Image-2026-10-11-at-3-09-59-PM.jpg",
        sizes: ["XL", "2XL", "3XL"],
        features: ["لون أحمر فاقع لسهولة التمييز", "خطوط فسفورية لامعة", "خياطة متينة ومقاومة"],
        badge: "إنتاج محلي",
      },
      {
        id: "worker-vest-red-imported",
        name: "فيست عمال أحمر (مستورد)",
        description: "فيست عمال أحمر مستورد عالي الجودة بتصميم متين يناسب مهام العمل الصعبة وإدارة المواقع.",
        price: 120,
        image: "https://i.ibb.co/ns3w2ct8/Whats-App-Image-2026-10-11-at-3-09-59-PM.jpg",
        sizes: ["XL", "2XL", "3XL"],
        features: ["خامات مستوردة عالية التحمل", "أشرطة عاكسة متطورة", "سحاب مريح وعملي"],
        badge: "مستورد",
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
        price: 140,
        image: "https://i.ibb.co/ZpmnCmJq/Whats-App-Image-2026-10-11-at-3-10-27-PM.jpg",
        sizes: ["XL", "2XL", "3XL"],
        features: ["جيوب أمامية متعددة وعميقة", "حامل بطاقة تعريفية", "قماش متين ولون عالي الوضوح"],
        badge: "إنتاج محلي",
      },
      {
        id: "sup-vest-lemon-imported",
        name: "فيست مشرفين ليموني (مستورد)",
        description: "فيست مشرفين ليموني مستورد فاخر، جيوب متعددة وسحابات قوية مع عواكس ضوء ممتازة.",
        price: 160,
        image: "https://i.ibb.co/ZpmnCmJq/Whats-App-Image-2026-10-11-at-3-10-27-PM.jpg",
        sizes: ["XL", "2XL", "3XL"],
        features: ["خامة مستوردة فاخرة", "جيوب مخصصة للراديو والأدوات", "أشرطة عاكسة عالية الجودة"],
        badge: "مستورد",
      },
      {
        id: "sup-vest-orange-local",
        name: "فيست مشرفين برتقالي (محلي)",
        description: "فيست إشراف لون برتقالي ناصع، مجهز بجيوب متعددة وحامل كارنيه تصنيع محلي ممتاز.",
        price: 140,
        image: "https://i.ibb.co/CszMnVCj/Whats-App-Image-2026-10-11-at-3-10-27-PM-1.jpg",
        sizes: ["XL", "2XL", "3XL"],
        features: ["جيوب عملية ومريحة", "لون برتقالي فاقع واضح", "أشرطة عاكسة متينة"],
        badge: "إنتاج محلي",
      },
      {
        id: "sup-vest-orange-imported",
        name: "فيست مشرفين برتقالي (مستورد)",
        description: "فيست إشراف برتقالي مستورد عالي الكفاءة، تصميم مريح وخامات فائقة التحمل بجيوب كاملة.",
        price: 160,
        image: "https://i.ibb.co/CszMnVCj/Whats-App-Image-2026-10-11-at-3-10-27-PM-1.jpg",
        sizes: ["XL", "2XL", "3XL"],
        features: ["خامة مستوردة عالية الجودة", "تقسيمات جيوب ذكية وعملية", "خطوط عاكسة متطورة"],
        badge: "مستورد",
      },
      {
        id: "sup-vest-lemon-black-local",
        name: "فيست مشرفين ليموني × أسود (محلي)",
        description: "فيست إشراف أنيق يدمج بين الليموني الفسفوري والأسود لمظهر قيادي عملي وجيوب متعددة محلي.",
        price: 130,
        image: "https://i.ibb.co/Jjqq2XML/Whats-App-Image-2026-10-14-at-1-55-06-PM.jpg",
        sizes: ["XL", "2XL", "3XL"],
        features: ["مزيج ليموني وأسود أنيق", "جيوب مخصصة للأجهزة والأقلام", "صناعة محلية متينة"],
        badge: "إنتاج محلي",
      },
      {
        id: "sup-vest-lemon-black-imported",
        name: "فيست مشرفين ليموني × أسود (مستورد)",
        description: "فيست إشراف ليموني × أسود مستورد بجودة عالية، مظهر مميز يبرز طاقم الإشراف بالموقع.",
        price: 150,
        image: "https://i.ibb.co/Jjqq2XML/Whats-App-Image-2026-10-14-at-1-55-06-PM.jpg",
        sizes: ["XL", "2XL", "3XL"],
        features: ["خامات مستوردة ممتازة", "أشرطة فسفورية متطورة", "سحابات متينة وعملية"],
        badge: "مستورد",
      },
      {
        id: "sup-vest-lemon-blue-local",
        name: "فيست مشرفين ليموني × أزرق (محلي)",
        description: "فيست إشراف ليموني مدمج مع الأزرق الداكن بتصميم عصري وجيوب تخزين ممتازة تصنيع محلي.",
        price: 130,
        image: "https://i.ibb.co/qL0cZFMW/Whats-App-Image-2026-10-14-at-1-55-06-PM-1.jpg",
        sizes: ["XL", "2XL", "3XL"],
        features: ["ألوان متباينة عالية الوضوح", "جيوب إشراف متعددة", "خياطة محلية معززة"],
        badge: "إنتاج محلي",
      },
      {
        id: "sup-vest-lemon-blue-imported",
        name: "فيست مشرفين ليموني × أزرق (مستورد)",
        description: "فيست مشرفين ليموني × أزرق مستورد فاخر، مناسب للمتابعة الميدانية والمهام الإشرافية الدقيقة.",
        price: 150,
        image: "https://i.ibb.co/qL0cZFMW/Whats-App-Image-2026-10-14-at-1-55-06-PM-1.jpg",
        sizes: ["XL", "2XL", "3XL"],
        features: ["خامة مستوردة راقية", "جيوب كروت وأجهزة لاسلكية", "عواكس ليلية ممتازة"],
        badge: "مستورد",
      },
      {
        id: "sup-vest-lemon-orange-local",
        name: "فيست مشرفين ليموني × برتقالي (محلي)",
        description: "فيست إشراف بلونين فسفوريين عاليي الرؤية (ليموني وبرتقالي) مع جيوب كاملة تصنيع محلي.",
        price: 130,
        image: "https://i.ibb.co/p61yHtHW/Whats-App-Image-2026-10-14-at-1-55-06-PM-2.jpg",
        sizes: ["XL", "2XL", "3XL"],
        features: ["وضوح مضاعف بلونين فسفوريين", "جيوب متعددة الوظائف", "خامة محلية قوية"],
        badge: "إنتاج محلي",
      },
      {
        id: "sup-vest-lemon-orange-imported",
        name: "فيست مشرفين ليموني × برتقالي (مستورد)",
        description: "فيست إشراف ليموني × برتقالي مستورد عالي الجودة، يضمن أقصى معايير السلامة المهنية للمشرفين.",
        price: 150,
        image: "https://i.ibb.co/p61yHtHW/Whats-App-Image-2026-10-14-at-1-55-06-PM-2.jpg",
        sizes: ["XL", "2XL", "3XL"],
        features: ["خامات مستوردة متطورة", "رؤية فائقة بالنهار والليل", "سحاب قوي وخياطة متينة"],
        badge: "مستورد",
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
        price: 170,
        image: "https://i.ibb.co/ycqLFDJD/Whats-App-Image-2026-10-11-at-3-12-09-PM.jpg",
        sizes: ["XL", "2XL", "3XL"],
        features: ["4 خطوط عاكسة متطورة", "مظهر هندسي تنفيذي فاخر", "جيوب مخصصة للمخططات والموبايل"],
        badge: "4 عاكس",
      },
      {
        id: "eng-vest-4ref-lemon-blue-local",
        name: "فيست مهندسين 4 عاكس ليموني × أزرق (محلي)",
        description: "فيست مهندسين 4 عاكس بتنسيق ألوان ليموني وأزرق داكن راقٍ، خامات متينة وجيوب متعددة محلي.",
        price: 170,
        image: "https://i.ibb.co/84Gc7fMy/Whats-App-Image-2026-10-11-at-3-12-09-PM-1.jpg",
        sizes: ["XL", "2XL", "3XL"],
        features: ["4 خطوط عاكسة قوية", "قصة أنيقة ومريحة للمهندسين", "خامات متينة ومقاومة للحرارة"],
        badge: "4 عاكس",
      },
      {
        id: "eng-vest-4ref-lemon-orange-local",
        name: "فيست مهندسين 4 عاكس ليموني × برتقالي (محلي)",
        description: "فيست مهندسين 4 عاكس بلونين ناصعين لتوفير أعلى مستوى رؤية وأناقة في المواقع الكبرى.",
        price: 170,
        image: "https://i.ibb.co/C5KynwMt/Whats-App-Image-2026-10-11-at-3-12-09-PM-2.jpg",
        sizes: ["XL", "2XL", "3XL"],
        features: ["4 أشرطة عاكسة للضوء", "مزيج فسفوري فائق الوضوح", "خياطة مزدوجة معززة"],
        badge: "4 عاكس",
      },
      {
        id: "eng-vest-3m-lemon-black-local",
        name: "فيست مهندسين ثري إم (3M) ليموني × أسود (محلي)",
        description: "فيست مهندسين فاخر مزود بأشرطة 3M العاكسة الأصلية لتوفير بريق عاكس قياسي عالمي محلي.",
        price: 200,
        image: "https://i.ibb.co/HTJjPgsn/Whats-App-Image-2026-10-11-at-3-12-35-PM.jpg",
        sizes: ["XL", "2XL", "3XL"],
        features: ["شريط عاكس أصلي 3M", "قماش عالي الكثافة والجودة", "جيوب تنظيمية احترافية"],
        badge: "عاكس 3M محلي",
      },
      {
        id: "eng-vest-3m-lemon-black-imported",
        name: "فيست مهندسين ثري إم (3M) ليموني × أسود (مستورد)",
        description: "فيست مهندسين تنفيذي مستورد بأعلى معايير الجودة العالمية مع شرائط 3M العاكسة الأصلية.",
        price: 250,
        image: "https://i.ibb.co/HTJjPgsn/Whats-App-Image-2026-10-11-at-3-12-35-PM.jpg",
        sizes: ["XL", "2XL", "3XL"],
        features: ["شريط عاكس معتمد 3M", "خامات مستوردة بريميوم", "تفصيل ومظهر قيادي فاخر"],
        badge: "عاكس 3M مستورد",
      },
      {
        id: "eng-vest-3m-lemon-blue-local",
        name: "فيست مهندسين ثري إم (3M) ليموني × أزرق (محلي)",
        description: "فيست مهندسين بلونين ليموني وأزرق مع أشرطة 3M المعتمدة، تصنيع محلي متميز وعملي للغاية.",
        price: 200,
        image: "https://i.ibb.co/zkxZxDq/Whats-App-Image-2026-10-11-at-3-12-36-PM.jpg",
        sizes: ["XL", "2XL", "3XL"],
        features: ["عواكس 3M فائقة التوهج", "قماش جبردين عالي التحمل", "حلقات لتعليق اللاسلكي والمفاتيح"],
        badge: "عاكس 3M محلي",
      },
      {
        id: "eng-vest-3m-lemon-blue-imported",
        name: "فيست مهندسين ثري إم (3M) ليموني × أزرق (مستورد)",
        description: "فيست مهندسين مستورد بريميوم بشرائط 3M ليموني × أزرق لضمان أعلى مستويات الأمان والأناقة.",
        price: 250,
        image: "https://i.ibb.co/zkxZxDq/Whats-App-Image-2026-10-11-at-3-12-36-PM.jpg",
        sizes: ["XL", "2XL", "3XL"],
        features: ["تقنية عاكس 3M المتطورة", "خامة مستوردة مقاومة للتآكل", "راحة تامة في التحرك والمطابقة"],
        badge: "عاكس 3M مستورد",
      },
      {
        id: "eng-vest-3m-lemon-orange-local",
        name: "فيست مهندسين ثري إم (3M) ليموني × برتقالي (محلي)",
        description: "فيست مهندسين مزود بشرائط 3M الأصلية بلوني السلامة المعتمدين ليموني وبرتقالي تصنيع محلي.",
        price: 200,
        image: "https://i.ibb.co/PvkGXDPV/Whats-App-Image-2026-10-11-at-3-12-36-PM-1.jpg",
        sizes: ["XL", "2XL", "3XL"],
        features: ["أشرطة عاكسة أصلية 3M", "مزيج لوني عالي الوضوح", "خياطة متينة وجيوب شاملة"],
        badge: "عاكس 3M محلي",
      },
      {
        id: "eng-vest-3m-lemon-orange-imported",
        name: "فيست مهندسين ثري إم (3M) ليموني × برتقالي (مستورد)",
        description: "فيست مهندسين تنفيذي مستورد بشرائط 3M، تصميم متقن يوفر الحماية والمظهر المهني المتألق.",
        price: 250,
        image: "https://i.ibb.co/PvkGXDPV/Whats-App-Image-2026-10-11-at-3-12-36-PM-1.jpg",
        sizes: ["XL", "2XL", "3XL"],
        features: ["شريط عاكس 3M مستورد", "أعلى معايير الجودة التنفيذية", "متانة قصوى في البيئات القاسية"],
        badge: "عاكس 3M مستورد",
      },
    ],
  },
  {
    id: "helmets",
    title: "خوذ",
    description: "خوذات حماية للرأس مصممة لتحمل الصدمات وتوفير الحماية القصوى للأمان الميداني.",
    products: [],
  },
];

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedSizes, setSelectedSizes] = useState<{ [productId: string]: string }>({});
  const [quantities, setQuantities] = useState<{ [productId: string]: number }>({});
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("future_press_cart");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

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
    const chosenSize = selectedSizes[product.id] || product.sizes[0] || "XL";
    const qtyToAdd = quantities[product.id] || 1;
    const cartItemId = `${product.id}-${chosenSize}`;

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
        },
      ];
    }

    saveCart(updatedCart);
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    saveCart(cart.filter((item) => item.id !== id));
  };

  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // تصفية الأقسام بناءً على القسم المختار
  const displayedCategories =
    activeCategory === "all"
      ? CATEGORIES
      : CATEGORIES.filter((category) => category.id === activeCategory);

  return (
    <div className="min-h-screen bg-[#070d19] text-slate-100" dir="rtl">
      {/* Header */}
      <header className="border-b border-blue-900/40 sticky top-0 bg-[#0a1324]/90 backdrop-blur-md z-40">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-blue-500/40 shadow-md shrink-0">
                <Image
                  src="https://i.ibb.co/NdnYZ3Pp/Whats-App-Image-2026-10-14-at-5-53-58-AM.jpg"
                  alt="Future Press Company Logo"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                Future Press Company
              </h1>
            </div>

            <Button
              variant="outline"
              className="relative cursor-pointer flex items-center gap-2 border-blue-500/40 bg-blue-950/40 text-blue-200 hover:bg-blue-900/60 hover:text-white"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="w-5 h-5 text-blue-400" />
              <span className="hidden sm:inline font-semibold">سلة المشتريات</span>
              {totalItemsCount > 0 && (
                <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {totalItemsCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* صورة عروض اليوم */}
      <section className="container mx-auto px-4 pt-6">
        <div className="relative w-full h-48 sm:h-72 md:h-96 rounded-2xl overflow-hidden border border-blue-900/50 shadow-2xl bg-[#0a1428]">
          <Image
            src="https://i.ibb.co/xK3CccpF/Whats-App-Image-2026-10-14-at-1-29-11-PM.jpg"
            alt="عروض اليوم - Future Press Company"
            fill
            className="object-cover"
            priority
            unoptimized
          />
        </div>
      </section>

      {/* قائمة اختيار الأقسام التفاعلية في أول الصفحة فوق المنتجات */}
      <section className="container mx-auto px-4 pt-8">
        <div className="bg-[#0a1428]/80 border border-blue-900/50 rounded-2xl p-4 sm:p-6 shadow-xl">
          <div className="flex items-center gap-2 mb-4 text-blue-400 font-bold text-lg">
            <Layers className="w-5 h-5" />
            <span>اختر القسم لعرض المنتجات:</span>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setActiveCategory("all")}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm sm:text-base transition-all duration-200 cursor-pointer border ${
                activeCategory === "all"
                  ? "bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-950"
                  : "bg-[#081020] text-slate-300 border-blue-900 hover:bg-blue-950 hover:text-white"
              }`}
            >
              كل الأقسام
            </button>

            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-xl font-bold text-sm sm:text-base transition-all duration-200 cursor-pointer border ${
                  activeCategory === cat.id
                    ? "bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-950"
                    : "bg-[#081020] text-slate-300 border-blue-900 hover:bg-blue-950 hover:text-white"
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* عرض الأقسام والمنتجات */}
      <main className="py-10">
        <div className="container mx-auto px-4 space-y-16">
          {displayedCategories.map((category) => (
            <section
              key={category.id}
              id={category.id}
              className="bg-[#0a1428]/60 border border-blue-900/40 rounded-3xl p-6 sm:p-10 shadow-2xl"
            >
              <div className="border-b border-blue-900/50 pb-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-3xl sm:text-4xl font-black text-white tracking-wide">
                    {category.title}
                  </h3>
                  <p className="text-slate-400 text-base mt-2">{category.description}</p>
                </div>
                <span className="text-sm font-semibold bg-blue-950 px-4 py-2 rounded-full border border-blue-800 text-blue-300 w-fit">
                  {category.products.length} {category.products.length === 1 ? "منتج متاح" : "منتجات متاحة"}
                </span>
              </div>

              {category.products.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-8">
                  {category.products.map((product) => {
                    const currentSelectedSize = selectedSizes[product.id] || product.sizes[0] || "XL";
                    const currentQty = quantities[product.id] || 1;

                    return (
                      <div
                        key={product.id}
                        className="border border-blue-900/60 rounded-2xl overflow-hidden bg-[#0c1830] text-slate-100 flex flex-col sm:flex-row hover:border-blue-500/50 transition-all duration-300 shadow-lg"
                      >
                        <div className="relative sm:w-1/2 aspect-square bg-[#081020]">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                          {product.badge && (
                            <div className="absolute top-3 right-3">
                              <Badge className="bg-blue-600 text-white font-semibold">
                                {product.badge}
                              </Badge>
                            </div>
                          )}
                        </div>

                        <div className="p-6 sm:w-1/2 flex flex-col justify-between space-y-4">
                          <div>
                            <h4 className="text-xl font-bold mb-2 text-white">{product.name}</h4>
                            <p className="text-sm text-slate-300 mb-4">{product.description}</p>

                            {/* اختيار المقاس */}
                            {product.sizes && product.sizes.length > 0 && (
                              <div className="mb-4">
                                <span className="text-xs font-semibold text-slate-400 block mb-2">
                                  المقاس:
                                </span>
                                <div className="flex gap-2">
                                  {product.sizes.map((size) => (
                                    <button
                                      key={size}
                                      type="button"
                                      onClick={() => handleSelectSize(product.id, size)}
                                      className={`px-3 py-1.5 rounded-lg border text-sm font-semibold cursor-pointer ${
                                        currentSelectedSize === size
                                          ? "bg-blue-600 text-white border-blue-500 shadow-md"
                                          : "bg-[#091428] text-slate-300 border-blue-900 hover:bg-blue-950"
                                      }`}
                                    >
                                      {size}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* خانة كتابة العدد */}
                            <div className="mb-4">
                              <label className="text-xs font-semibold text-slate-400 block mb-2">
                                اكتب العدد المطلوب:
                              </label>
                              <input
                                type="number"
                                min="1"
                                value={currentQty}
                                onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                                className="w-full bg-[#081020] border border-blue-900 rounded-lg px-3 py-2 text-white font-bold text-center focus:border-blue-500 focus:outline-none"
                              />
                            </div>

                            {/* المميزات */}
                            <ul className="text-xs space-y-1 text-slate-300">
                              {product.features.map((feature, idx) => (
                                <li key={idx} className="flex items-center gap-2">
                                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="pt-4 border-t border-blue-900/50">
                            <div className="flex items-center justify-between mb-4">
                              <span className="text-xs text-slate-400">سعر القطعة:</span>
                              <span className="text-2xl font-black text-blue-400">
                                {product.price} ج.م
                              </span>
                            </div>
                            <Button
                              onClick={() => addToCart(product)}
                              className="w-full cursor-pointer bg-blue-600 hover:bg-blue-500 text-white font-bold py-5"
                            >
                              <ShoppingCart className="w-4 h-4 ml-2" />
                              أضف ({currentQty}) إلى السلة
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="py-12 text-center border border-dashed border-blue-900/70 rounded-2xl bg-[#081020]/50 text-slate-400">
                  قريباً - سيتم توفير منتجات هذا القسم فور توفرها
                </div>
              )}
            </section>
          ))}
        </div>
      </main>

      {/* سلة المشتريات الجانبية */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#0a1428] text-slate-100 border-l border-blue-900/70 h-full p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-blue-900/50">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-blue-400" />
                  <h3 className="text-lg font-bold text-white">سلة المشتريات</h3>
                  <Badge className="bg-blue-600 text-white">{totalItemsCount}</Badge>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="p-1 rounded-md text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="overflow-y-auto max-h-[60vh] py-4 space-y-4">
                {cart.length === 0 ? (
                  <p className="text-center text-slate-500 py-10">سلة المشتريات فارغة</p>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-4 p-3 bg-[#0d1a35] border border-blue-900/60 rounded-xl"
                    >
                      <div className="flex-1 min-w-0">
                        <h5 className="font-semibold text-sm truncate text-white">{item.name}</h5>
                        <p className="text-xs text-slate-400">المقاس: {item.size}</p>
                        <p className="text-xs text-slate-400">العدد: {item.quantity}</p>
                        <p className="text-sm font-bold text-blue-400 mt-1">
                          {item.price * item.quantity} ج.م
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-400 hover:bg-red-950/40 p-2 rounded cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {cart.length > 0 && (
              <div className="border-t border-blue-900/50 pt-4 space-y-4">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span className="text-slate-300">الإجمالي:</span>
                  <span className="text-blue-400 text-2xl font-black">{totalPrice} ج.م</span>
                </div>
                <Link href="/checkout" className="block w-full">
                  <Button className="w-full text-base py-6 cursor-pointer bg-blue-600 hover:bg-blue-500 text-white font-bold">
                    متابعة إتمام الطلب
                    <ArrowLeft className="w-5 h-5 mr-2" />
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* زر سلة المشتريات العائم - أسفل اليمين */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          type="button"
          onClick={() => setIsCartOpen(true)}
          className="relative w-14 h-14 rounded-full bg-blue-600 text-white shadow-xl flex items-center justify-center hover:scale-110 transition-transform cursor-pointer border-2 border-blue-400/40"
          title="سلة المشتريات"
        >
          <ShoppingCart className="w-6 h-6" />
          {totalItemsCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
              {totalItemsCount}
            </span>
          )}
        </button>
      </div>

      {/* أزرار التواصل العائمة (واتساب، فيسبوك، إنستجرام) - أسفل اليسار */}
      <div className="fixed bottom-6 left-6 z-40 flex flex-col gap-3">
        {/* واتساب */}
        <a
          href="https://wa.me/201010625349"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 rounded-full bg-[#25D366] text-white shadow-xl flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
          title="تواصل معنا عبر واتساب"
        >
          <MessageCircle className="w-7 h-7" />
        </a>

        {/* فيسبوك */}
        <a
          href="https://www.facebook.com/profile.php?id=61565194104813"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 rounded-full bg-[#1877F2] text-white shadow-xl flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
          title="صفحتنا على فيسبوك"
        >
          <Facebook className="w-7 h-7" />
        </a>

        {/* إنستجرام */}
        <a
          href="https://instagram.com/future.press1?stkn=MTI1azk0dzZsMnp1dw%3D%3D"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white shadow-xl flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
          title="تابعنا على إنستجرام"
        >
          <Instagram className="w-7 h-7" />
        </a>
      </div>
    </div>
  );
}
