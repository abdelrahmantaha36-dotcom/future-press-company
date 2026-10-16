"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  Star,
  ShoppingCart,
  ShieldCheck,
  X,
  Plus,
  Minus,
  MessageCircle,
  Facebook,
  Instagram,
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
        id: "worker-vest-local",
        name: "فيست عمال ليموني (محلي)",
        description: "فيست أمان عمال لون ليموني فسفوري عالي الوضوح، تصنيع محلي بجودة ممتازة وخامة متينة.",
        price: 80,
        image: "https://i.ibb.co/hxhfZXz0/Whats-App-Image-2026-10-11-at-3-09-23-PM.jpg",
        sizes: ["XL", "2XL", "3XL"],
        features: ["لون ليموني عالي الوضوح", "خطوط عاكسة للضوء للأمان الليلي", "صناعة محلية عالية الجودة"],
        badge: "إنتاج محلي",
      },
      {
        id: "worker-vest-imported",
        name: "فيست عمال ليموني (مستورد)",
        description: "فيست أمان عمال لون ليموني فسفوري عالي الوضوح، خامات مستوردة ممتازة وتصميم مريح للعمل الشاق.",
        price: 90,
        image: "https://i.ibb.co/hxhfZXz0/Whats-App-Image-2026-10-11-at-3-09-23-PM.jpg",
        sizes: ["XL", "2XL", "3XL"],
        features: ["خامة مستوردة فائقة المتانة", "أشرطة فسفورية عاكسة متطورة", "سحاب أمامي عملي وقوي"],
        badge: "مستورد",
      },
    ],
  },
  {
    id: "supervisors",
    title: "فيست مشرفين",
    description: "سترات متميزة بجيوب متعددة لحفظ الدفاتر والأدوات اللاسلكية وتسهيل مهام الإشراف والمتابعة.",
    products: [],
  },
  {
    id: "engineers",
    title: "فيست مهندسين",
    description: "سترات احترافية فاخرة تجمع بين المظهر الهندسي الأنيق وأقصى درجات الأمان والوظائف الميدانية.",
    products: [],
  },
  {
    id: "helmets",
    title: "خوذات الأمان والسلامة",
    description: "خوذات حماية للرأس مصممة لتحمل الصدمات وتوفير الحماية القصوى للأمان الميداني.",
    products: [],
  },
];

export default function HomePage() {
  const [selectedSizes, setSelectedSizes] = useState<{ [productId: string]: string }>({
    "worker-vest-local": "XL",
    "worker-vest-imported": "XL",
  });
  const [quantities, setQuantities] = useState<{ [productId: string]: number }>({
    "worker-vest-local": 1,
    "worker-vest-imported": 1,
  });
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleSelectSize = (productId: string, size: string) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  const handleQuantityInputChange = (productId: string, val: string) => {
    const num = parseInt(val, 10);
    setQuantities((prev) => ({
      ...prev,
      [productId]: isNaN(num) || num < 1 ? 1 : num,
    }));
  };

  const adjustQuantity = (productId: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[productId] || 1;
      const updated = current + delta;
      return { ...prev, [productId]: updated < 1 ? 1 : updated };
    });
  };

  const addToCart = (product: Product) => {
    const chosenSize = selectedSizes[product.id] || product.sizes[0];
    const qtyToAdd = quantities[product.id] || 1;
    const cartItemId = `${product.id}-${chosenSize}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + qtyToAdd } : item
        );
      }
      return [
        ...prev,
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
    });
    setIsCartOpen(true);
  };

  const updateCartQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#070d19] text-slate-100 selection:bg-blue-600 selection:text-white" dir="rtl">
      {/* Header */}
      <header className="border-b border-blue-900/40 sticky top-0 bg-[#0a1324]/90 backdrop-blur-md z-40">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* اللوجو واسم الشركة */}
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-blue-500/30 shadow-md shrink-0">
                <Image
                  src="https://i.ibb.co/NdnYZ3Pp/Whats-App-Image-2026-10-14-at-5-53-58-AM.jpg"
                  alt="Future Press Company Logo"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white drop-shadow-sm">
                Future Press Company
              </h1>
            </div>

            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
              <a href="#workers" className="hover:text-blue-400 transition-colors">فيست عمال</a>
              <a href="#supervisors" className="hover:text-blue-400 transition-colors">فيست مشرفين</a>
              <a href="#engineers" className="hover:text-blue-400 transition-colors">فيست مهندسين</a>
              <a href="#helmets" className="hover:text-blue-400 transition-colors">الخوذات</a>
            </nav>

            <div className="flex items-center gap-3">
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
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-[#0b1730] to-[#070d19] border-b border-blue-900/30">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 bg-blue-900/60 text-blue-300 border border-blue-600/40 px-3 py-1">
            تجهيزات أمان صناعي وميداني
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold mb-4 text-white tracking-tight">
            تجهيزات السلامة والسترات من <span className="text-blue-400">Future Press Company</span>
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            نوفر لشركتك أجود أنواع السترات العاكسة وخوذات الأمان المخصصة للعمال والمشرفين والمهندسين وفقاً لأعلى معايير السلامة المهنية مع إمكانية طباعة وتطريز الشعار.
          </p>
        </div>
      </section>

      {/* Categories & Products */}
      <main className="py-12">
        <div className="container mx-auto px-4 space-y-20">
          {CATEGORIES.map((category) => (
            <section key={category.id} id={category.id} className="scroll-mt-24">
              <div className="border-b border-blue-900/50 pb-4 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-2">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">{category.title}</h3>
                  <p className="text-slate-400 mt-1">{category.description}</p>
                </div>
                <span className="text-sm text-blue-400 font-semibold bg-blue-950/60 px-3 py-1 rounded-full border border-blue-800/50 w-fit">
                  {category.products.length} {category.products.length === 1 ? "منتج متاح" : "منتجات متاحة"}
                </span>
              </div>

              {category.products.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                  {category.products.map((product) => {
                    const currentSelectedSize = selectedSizes[product.id] || product.sizes[0];
                    const currentQty = quantities[product.id] || 1;

                    return (
                      <div
                        key={product.id}
                        className="border border-blue-900/50 rounded-2xl overflow-hidden bg-[#0c1830] text-slate-100 shadow-xl flex flex-col sm:flex-row hover:border-blue-500/50 transition-all duration-300"
                      >
                        {/* صورة المنتج */}
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
                              <Badge className="bg-blue-600 text-white font-semibold shadow-md">
                                {product.badge}
                              </Badge>
                            </div>
                          )}
                        </div>

                        {/* تفاصيل المنتج */}
                        <div className="p-6 sm:w-1/2 flex flex-col justify-between space-y-4">
                          <div>
                            <h4 className="text-xl font-bold mb-2 text-white">{product.name}</h4>
                            <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                              {product.description}
                            </p>

                            {/* اختيار المقاس */}
                            {product.sizes && product.sizes.length > 0 && (
                              <div className="mb-4">
                                <span className="text-xs font-semibold text-slate-400 block mb-2">
                                  اختر المقاس:
                                </span>
                                <div className="flex gap-2">
                                  {product.sizes.map((size) => (
                                    <button
                                      key={size}
                                      type="button"
                                      onClick={() => handleSelectSize(product.id, size)}
                                      className={`px-3 py-1.5 rounded-lg border text-sm font-semibold transition-all cursor-pointer ${
                                        currentSelectedSize === size
                                          ? "bg-blue-600 text-white border-blue-500 shadow-md ring-1 ring-blue-400"
                                          : "bg-[#091428] text-slate-300 border-blue-900 hover:bg-blue-950 hover:text-white"
                                      }`}
                                    >
                                      {size}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* تحديد العدد والكمية المطلوبة */}
                            <div className="mb-4">
                              <span className="text-xs font-semibold text-slate-400 block mb-2">
                                حدد الكمية:
                              </span>
                              <div className="flex items-center gap-2 bg-[#081020] border border-blue-900/70 p-1 rounded-xl w-fit">
                                <button
                                  type="button"
                                  onClick={() => adjustQuantity(product.id, -1)}
                                  className="w-8 h-8 rounded-lg bg-blue-950 hover:bg-blue-900 border border-blue-800/60 flex items-center justify-center text-white transition-colors cursor-pointer"
                                >
                                  <Minus className="w-3.5 h-3.5" />
                                </button>
                                <input
                                  type="number"
                                  min="1"
                                  value={currentQty}
                                  onChange={(e) => handleQuantityInputChange(product.id, e.target.value)}
                                  className="w-16 bg-transparent text-center font-bold text-base text-white focus:outline-none"
                                />
                                <button
                                  type="button"
                                  onClick={() => adjustQuantity(product.id, 1)}
                                  className="w-8 h-8 rounded-lg bg-blue-950 hover:bg-blue-900 border border-blue-800/60 flex items-center justify-center text-white transition-colors cursor-pointer"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>

                            {/* المميزات */}
                            <div className="space-y-2">
                              <p className="text-xs font-semibold text-slate-400">المميزات:</p>
                              <ul className="text-sm space-y-1.5">
                                {product.features.map((feature, idx) => (
                                  <li key={idx} className="flex items-center gap-2 text-slate-200">
                                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                                    <span>{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* السعر وزر الإضافة للسلة */}
                          <div className="pt-4 border-t border-blue-900/50">
                            <div className="flex items-center justify-between mb-4">
                              <span className="text-xs text-slate-400">السعر للقطعة:</span>
                              <span className="text-2xl font-black text-blue-400">
                                {product.price} ج.م
                              </span>
                            </div>
                            <Button
                              onClick={() => addToCart(product)}
                              className="w-full cursor-pointer flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-6 text-base transition-colors shadow-lg shadow-blue-950/50"
                            >
                              <ShoppingCart className="w-5 h-5" />
                              أضف {currentQty} للسلة (مقاس {currentSelectedSize})
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-8 text-center border border-dashed border-blue-900/70 rounded-xl bg-[#0a1428]/40 text-slate-400">
                  قريباً - سيتم إضافة المنتجات الخاصة بهذا القسم فور توفرها.
                </div>
              )}
            </section>
          ))}
        </div>
      </main>

      {/* Trust Indicators */}
      <section className="py-14 bg-[#0a1428] border-t border-blue-900/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto text-white shadow-lg shadow-blue-900/50">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-lg text-white">مطابقة للمواصفات</h4>
              <p className="text-sm text-slate-300">
                جميع المنتجات معتمدة وعاكسة للضوء ومقاومة للصدمات للأمان الميداني
              </p>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto text-white shadow-lg shadow-blue-900/50">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-lg text-white">طباعة وتطريز الشعار</h4>
              <p className="text-sm text-slate-300">
                إمكانية تخصيص وطباعة هوية شركتكم على كافة التجهيزات والسترات والخوذ
              </p>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto text-white shadow-lg shadow-blue-900/50">
                <Star className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-lg text-white">أسعار خاصة للكميات</h4>
              <p className="text-sm text-slate-300">
                عروض وأسعار تنافسية ومخصصة لطلبات التوريد والمشاريع الكبرى
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-blue-900/40 py-8 bg-[#060b14] mb-20 md:mb-0">
        <div className="container mx-auto px-4 text-center text-slate-400">
          <p>&copy; {new Date().getFullYear()} Future Press Company. جميع الحقوق محفوظة.</p>
        </div>
      </footer>

      {/* نافذة سلة المشتريات الجانبية */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm transition-all">
          <div className="w-full max-w-md bg-[#0a1428] text-slate-100 border-l border-blue-900/70 h-full shadow-2xl flex flex-col p-6 animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between pb-4 border-b border-blue-900/50">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-blue-400" />
                <h3 className="text-lg font-bold text-white">سلة المشتريات</h3>
                <Badge className="bg-blue-600 text-white">{totalItemsCount}</Badge>
              </div>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="p-1 rounded-md hover:bg-blue-950 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* عناصر السلة */}
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-20 text-slate-500">
                  <ShoppingCart className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>سلتك فارغة حالياً</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 border border-blue-900/60 rounded-xl p-3 bg-[#0d1a35] items-center justify-between"
                  >
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-[#070e1a] shrink-0 border border-blue-950">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="font-semibold text-sm truncate text-white">{item.name}</h5>
                      <p className="text-xs text-slate-400">
                        المقاس: <span className="font-bold text-blue-300">{item.size}</span>
                      </p>
                      <p className="text-sm font-bold text-blue-400 mt-1">
                        {item.price * item.quantity} ج.م
                      </p>
