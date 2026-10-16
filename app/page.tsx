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
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleSelectSize = (productId: string, size: string) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  const addToCart = (product: Product) => {
    const chosenSize = selectedSizes[product.id] || product.sizes[0];
    const cartItemId = `${product.id}-${chosenSize}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + 1 } : item
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
          quantity: 1,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
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
    <div className="min-h-screen bg-background text-foreground" dir="rtl">
      {/* Header */}
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur z-40">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* اللوجو واسم الشركة */}
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border shadow-sm shrink-0">
                <Image
                  src="https://i.ibb.co/NdnYZ3Pp/Whats-App-Image-2026-10-14-at-5-53-58-AM.jpg"
                  alt="Future Press Company Logo"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
                Future Press Company
              </h1>
            </div>

            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
              <a href="#workers" className="hover:text-primary transition-colors">فيست عمال</a>
              <a href="#supervisors" className="hover:text-primary transition-colors">فيست مشرفين</a>
              <a href="#engineers" className="hover:text-primary transition-colors">فيست مهندسين</a>
              <a href="#helmets" className="hover:text-primary transition-colors">الخوذات</a>
            </nav>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                className="relative cursor-pointer flex items-center gap-2"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="w-5 h-5 text-primary" />
                <span className="hidden sm:inline">سلة المشتريات</span>
                {totalItemsCount > 0 && (
                  <span className="bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {totalItemsCount}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-muted/30 border-b">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4">تجهيزات أمان صناعي وميداني</Badge>
          <h2 className="text-3xl sm:text-5xl font-bold mb-4">
            تجهيزات السلامة والسترات من Future Press Company
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
            نوفر لشركتك أجود أنواع السترات العاكسة وخوذات الأمان المخصصة للعمال والمشرفين والمهندسين وفقاً لأعلى معايير السلامة المهنية مع إمكانية طباعة وتطريز الشعار.
          </p>
        </div>
      </section>

      {/* Categories & Products */}
      <main className="py-12">
        <div className="container mx-auto px-4 space-y-20">
          {CATEGORIES.map((category) => (
            <section key={category.id} id={category.id} className="scroll-mt-24">
              <div className="border-b pb-4 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-2">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">{category.title}</h3>
                  <p className="text-muted-foreground mt-1">{category.description}</p>
                </div>
                <span className="text-sm text-primary font-semibold">
                  {category.products.length} {category.products.length === 1 ? "منتج متاح" : "منتجات متاحة"}
                </span>
              </div>

              {category.products.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                  {category.products.map((product) => {
                    const currentSelectedSize = selectedSizes[product.id] || product.sizes[0];

                    return (
                      <div
                        key={product.id}
                        className="border rounded-2xl overflow-hidden bg-card text-card-foreground shadow-sm flex flex-col sm:flex-row hover:shadow-md transition-shadow"
                      >
                        {/* صورة المنتج */}
                        <div className="relative sm:w-1/2 aspect-square bg-muted">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                          {product.badge && (
                            <div className="absolute top-3 right-3">
                              <Badge className="bg-primary text-primary-foreground">
                                {product.badge}
                              </Badge>
                            </div>
                          )}
                        </div>

                        {/* تفاصيل المنتج */}
                        <div className="p-6 sm:w-1/2 flex flex-col justify-between space-y-4">
                          <div>
                            <h4 className="text-xl font-bold mb-2">{product.name}</h4>
                            <p className="text-sm text-muted-foreground mb-4">
                              {product.description}
                            </p>

                            {/* اختيار المقاس */}
                            {product.sizes && product.sizes.length > 0 && (
                              <div className="mb-4">
                                <span className="text-xs font-semibold text-muted-foreground block mb-2">
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
                                          ? "bg-primary text-primary-foreground border-primary shadow-sm"
                                          : "bg-background text-foreground hover:bg-muted"
                                      }`}
                                    >
                                      {size}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* المميزات */}
                            <div className="space-y-2">
                              <p className="text-xs font-semibold text-muted-foreground">المميزات:</p>
                              <ul className="text-sm space-y-1">
                                {product.features.map((feature, idx) => (
                                  <li key={idx} className="flex items-center gap-2">
                                    <Check className="w-4 h-4 text-green-600 shrink-0" />
                                    <span>{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* السعر وزر الإضافة للسلة */}
                          <div className="pt-4 border-t">
                            <div className="flex items-center justify-between mb-4">
                              <span className="text-xs text-muted-foreground">السعر للقطعة:</span>
                              <span className="text-2xl font-bold text-primary">
                                {product.price} ج.م
                              </span>
                            </div>
                            <Button
                              onClick={() => addToCart(product)}
                              className="w-full cursor-pointer flex items-center justify-center gap-2"
                            >
                              <ShoppingCart className="w-4 h-4" />
                              أضف إلى السلة (مقاس {currentSelectedSize})
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-8 text-center border border-dashed rounded-xl bg-muted/20 text-muted-foreground">
                  قريباً - سيتم إضافة المنتجات الخاصة بهذا القسم فور توفرها.
                </div>
              )}
            </section>
          ))}
        </div>
      </main>

      {/* Trust Indicators */}
      <section className="py-12 bg-muted/50 border-t">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto text-primary-foreground">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-semibold text-lg">مطابقة للمواصفات</h4>
              <p className="text-sm text-muted-foreground">
                جميع المنتجات معتمدة وعاكسة للضوء ومقاومة للصدمات للأمان الميداني
              </p>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto text-primary-foreground">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="font-semibold text-lg">طباعة وتطريز الشعار</h4>
              <p className="text-sm text-muted-foreground">
                إمكانية تخصيص وطباعة هوية شركتكم على كافة التجهيزات والسترات والخوذ
              </p>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto text-primary-foreground">
                <Star className="w-6 h-6" />
              </div>
              <h4 className="font-semibold text-lg">أسعار خاصة للكميات</h4>
              <p className="text-sm text-muted-foreground">
                عروض وأسعار تنافسية ومخصصة لطلبات التوريد والمشاريع الكبرى
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 bg-card mb-20 md:mb-0">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Future Press Company. جميع الحقوق محفوظة.</p>
        </div>
      </footer>

      {/* نافذة سلة المشتريات الجانبية */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm transition-all">
          <div className="w-full max-w-md bg-background h-full shadow-2xl flex flex-col p-6 animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between pb-4 border-b">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-bold">سلة المشتريات</h3>
                <Badge variant="secondary">{totalItemsCount}</Badge>
              </div>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="p-1 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* عناصر السلة */}
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-20 text-muted-foreground">
                  <ShoppingCart className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>سلتك فارغة حالياً</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 border rounded-xl p-3 bg-card items-center justify-between"
                  >
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="font-semibold text-sm truncate">{item.name}</h5>
                      <p className="text-xs text-muted-foreground">
                        المقاس: <span className="font-bold text-foreground">{item.size}</span>
                      </p>
                      <p className="text-sm font-bold text-primary mt-1">
                        {item.price * item.quantity} ج.م
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-7 h-7 rounded border flex items-center justify-center hover:bg-muted"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-7 h-7 rounded border flex items-center justify-center hover:bg-muted"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="text-destructive hover:bg-destructive/10 p-1.5 rounded mr-1"
                        title="حذف"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* الحساب النهائي وزر الدفع */}
            {cart.length > 0 && (
              <div className="border-t pt-4 space-y-4">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>الإجمالي:</span>
                  <span className="text-primary">{totalPrice} ج.م</span>
                </div>
                <Link href="/checkout" className="block w-full">
                  <Button className="w-full text-base py-6 cursor-pointer">
                    إتمام الطلب
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* الأزرار العائمة الثابتة (سلة، واتساب، فيسبوك، إنستجرام) */}
      <div className="fixed bottom-6 left-6 z-40 flex flex-col gap-3">
        {/* زر السلة العائم */}
        <button
          type="button"
          onClick={() => setIsCartOpen(true)}
          className="relative w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-xl flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
          title="سلة المشتريات"
        >
          <ShoppingCart className="w-6 h-6" />
          {totalItemsCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-destructive text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-md">
              {totalItemsCount}
            </span>
          )}
        </button>

        {/* زر الواتساب العائم */}
        <a
          href="https://wa.me/201010625349"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 rounded-full bg-[#25D366] text-white shadow-xl flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
          title="تواصل معنا عبر واتساب"
        >
          <MessageCircle className="w-7 h-7" />
        </a>

        {/* زر الفيسبوك العائم */}
        <a
          href="https://www.facebook.com/profile.php?id=61565194104813"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 rounded-full bg-[#1877F2] text-white shadow-xl flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
          title="صفحتنا على فيسبوك"
        >
          <Facebook className="w-7 h-7" />
        </a>

        {/* زر الإنستجرام العائم */}
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
