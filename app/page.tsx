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
  sizes?: string[];
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
  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Header */}
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <HardHat className="w-7 h-7 text-primary" />
              <h1 className="text-2xl font-bold tracking-tight">future press company</h1>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
              <a href="#workers" className="hover:text-primary transition-colors">فيست عمال</a>
              <a href="#supervisors" className="hover:text-primary transition-colors">فيست مشرفين</a>
              <a href="#engineers" className="hover:text-primary transition-colors">فيست مهندسين</a>
              <a href="#helmets" className="hover:text-primary transition-colors">الخوذات</a>
            </nav>
            <Badge variant="secondary" className="text-sm">
              مهمات وأزياء أمان
            </Badge>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-muted/30 border-b">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4">تجهيزات أمان صناعي وميداني</Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            تجهيزات السلامة والسترات من future press company
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
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
                  <h3 className="text-3xl font-bold tracking-tight">{category.title}</h3>
                  <p className="text-muted-foreground mt-1">{category.description}</p>
                </div>
                <span className="text-sm text-primary font-semibold">
                  {category.products.length} {category.products.length === 1 ? "منتج متاح" : "منتجات متاحة"}
                </span>
              </div>

              {category.products.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                  {category.products.map((product) => (
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

                          {/* المقاسات المتاحة */}
                          {product.sizes && (
                            <div className="mb-4">
                              <span className="text-xs font-semibold text-muted-foreground block mb-1">
                                المقاسات المتاحة:
                              </span>
                              <div className="flex gap-2">
                                {product.sizes.map((size) => (
                                  <Badge key={size} variant="outline" className="font-mono">
                                    {size}
                                  </Badge>
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

                        {/* السعر وزر الطلب */}
                        <div className="pt-4 border-t">
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-xs text-muted-foreground">السعر للقطعة:</span>
                            <span className="text-2xl font-bold text-primary">
                              {product.price} ج.م
                            </span>
                          </div>
                          <Link href={`/checkout?product=${product.id}`}>
                            <Button className="w-full cursor-pointer">
                              <ShoppingCart className="w-4 h-4 ml-2" />
                              طلب الآن
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
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
      <footer className="border-t py-8 bg-card">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} future press company. جميع الحقوق محفوظة.</p>
        </div>
      </footer>
    </div>
  );
}
