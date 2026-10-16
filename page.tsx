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
    id: "engineers",
    title: "فيست مهندسين",
    description: "سترات احترافية فاخرة تجمع بين المظهر الهندسي الأنيق وأقصى درجات الأمان والوظائف الميدانية.",
    products: [
      {
        id: "e1",
        name: "فيست مهندسين تنفيذي بريميوم",
        description: "مصنوع من أجود خامات الجبردين المقاوم للماء مع بطانة داخلية وجيوب واسعة للمخططات.",
        price: 350,
        image: "/placeholder.svg?height=400&width=400&query=engineer+executive+safety+vest",
        features: ["جيب كبير للرسومات الهندسية", "قماش عالي الجودة مقاوم للأتربة", "شريط عاكس 3M عالي الكفاءة"],
        badge: "خامة فاخرة",
      },
      {
        id: "e2",
        name: "فيست مهندسين خفيف بتصميم عصري",
        description: "مزيج يجمع بين الأناقة الرسمية وسهولة الحركة أثناء الفحص والتفتيش الميداني.",
        price: 320,
        image: "/placeholder.svg?height=400&width=400&query=modern+engineer+vest",
        features: ["قصة مريحة وعصرية", "خامات فاخرة مضادة للانكماش", "مساحة مخصصة للطباعة والتطريز"],
      },
    ],
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
            تشكيلة سترات الأمان من future press company
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            نوفر لشركتك أجود أنواع السترات العاكسة المخصصة للعمال، المشرفين، والمهندسين وفقاً لأعلى معايير السلامة المهنية مع إمكانية طباعة وتطريز الشعار.
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
                  {category.products.length} منتجات متاحة
                </span>
              </div>

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
                جميع المنتجات معتمدة وعاكسة للضوء بأعلى دقة للأمان الميداني
              </p>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto text-primary-foreground">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="font-semibold text-lg">طباعة شعار الشركة</h4>
              <p className="text-sm text-muted-foreground">
                إمكانية تخصيص وطباعة هوية شركتكم على كافة التجهيزات
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