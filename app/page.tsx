import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star, ShoppingCart, ShieldCheck, HardHat } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  features: string[];
  badge?: string;
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
    description: "سترات أمان عملية ومتينة مصممة لتحمل بيئات العمل الشاقة وتوفير أعلى درجات الرؤية.",
    products: [
      {
        id: "w1",
        name: "فيست عمال عاكس قياسي",
        description: "خامة بوليستر متينة مع خطوط عاكسة للضوء متوافقة مع معايير السلامة المهنية.",
        price: 120,
        image: "/placeholder.svg?height=400&width=400&query=safety+vest+worker",
        features: ["خطوط فسفورية عاكسة", "قماش شبكي مريح وخفيف", "سحاب أمامي عملي"],
        badge: "الأكثر مبيعاً",
      },
      {
        id: "w2",
        name: "فيست عمال شبكي صيفي",
        description: "تصميم مهوى بالكامل يسمح بمرور الهواء ومثالي للأعمال الميدانية في الأجواء الحارة.",
        price: 140,
        image: "/placeholder.svg?height=400&width=400&query=mesh+worker+safety+vest",
        features: ["تهوية ممتازة", "أشرطة عاكسة عريضة", "مقاوم للتمزق"],
      },
    ],
  },
  {
    id: "supervisors",
    title: "فيست مشرفين",
    description: "سترات متميزة بجيوب متعددة لحفظ الدفاتر والأدوات اللاسلكية وتسهيل مهام الإشراف والمتابعة.",
    products: [
      {
        id: "s1",
        name: "فيست إشراف بجيوب متعددة",
        description: "مزود بجيوب عملية للأقلام، الأجهزة اللاسلكية، وحامل بطاقة التعريف الشخصية.",
        price: 220,
        image: "/placeholder.svg?height=400&width=400&query=supervisor+safety+vest+pockets",
        features: ["حامل بطاقة هوية مدمج", "جيوب مخصصة للراديو والأقلام", "نسيج عالي التحمل"],
        badge: "مميز",
      },
      {
        id: "s2",
        name: "فيست إشراف بلونين عاكسين",
        description: "تصميم جذاب وألوان متباينة تميز فريق الإشراف بوضوح تام داخل مواقع العمل.",
        price: 250,
        image: "/placeholder.svg?height=400&width=400&query=dual+color+supervisor+vest",
        features: ["ألوان عالية الوضوح", "خياطة مزدوجة معززة", "حلقات تعليق للمفاتيح"],
      },
    ],
  },
  {
