import { Badge } from "@/components/ui/badge";
import { Check, Star, ShieldCheck } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">future press company</h1>
            <Badge variant="secondary" className="text-sm">
              Welcome
            </Badge>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            مرحباً بكم في future press company
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            نقدم لكم أفضل الحلول والخدمات الاحترافية بأعلى معايير الجودة والكفاءة.
          </p>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto">
                <ShieldCheck className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-semibold">موثوقية وأمان</h3>
              <p className="text-sm text-muted-foreground">
                التزام كامل بأعلى معايير الدقة
              </p>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto">
                <Check className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-semibold">ضمان الجودة</h3>
              <p className="text-sm text-muted-foreground">
                خدمات احترافية تلبي تطلعاتكم
              </p>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto">
                <Star className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-semibold">تقييمات ممتازة</h3>
              <p className="text-sm text-muted-foreground">
                رضا عملائنا هو أولويتنا القصوى
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} future press company. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}