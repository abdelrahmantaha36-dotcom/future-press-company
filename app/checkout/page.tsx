"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CreditCard,
  Download,
  FileText,
  ArrowRight,
  Phone,
  MapPin,
  Calendar,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  size: string;
  image: string;
  quantity: number;
}

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    phone1: "",
    phone2: "",
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderDate, setOrderDate] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");

  const shippingFee = 50; // رسوم الشحن

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("future_press_cart");
      if (saved) {
        setCart(JSON.parse(saved));
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

  const itemsTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const grandTotal = itemsTotal + shippingFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.address || !formData.phone1) {
      alert("يرجى ملء جميع الحقول المطلوبة");
      return;
    }
    // الانتقال المباشر لإصدار الفاتورة دون إجبار العميل على إرفاق الإيصال
    setIsSubmitted(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#070d19] text-slate-100 py-10 px-4" dir="rtl">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* زر الرجوع */}
        {!isSubmitted && (
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold"
          >
            <ArrowRight className="w-5 h-5" />
            العودة للمتجر
          </Link>
        )}

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* 1. استعراض منتجات السلة */}
            <div className="bg-[#0a1428] border border-blue-900/50 rounded-2xl p-6 shadow-xl">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <FileText className="w-6 h-6 text-blue-400" />
                المنتجات في سلة المشتريات
              </h2>
              {cart.length === 0 ? (
                <div className="text-center py-6 text-slate-400">
                  <p>لا توجد منتجات بالسلة حالياً.</p>
                  <Link href="/" className="text-blue-400 underline mt-2 inline-block">
                    تصفح المنتجات وأضف ما تحتاجه
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-blue-900/40">
                  {cart.map((item) => (
                    <div key={item.id} className="py-3 flex justify-between items-center text-sm">
                      <div>
                        <p className="font-bold text-white">{item.name}</p>
                        <p className="text-slate-400 text-xs">
                          المقاس: <span className="text-blue-300 font-semibold">{item.size}</span> | الكمية: <span className="text-blue-300 font-semibold">{item.quantity}</span>
                        </p>
                      </div>
                      <div className="text-left font-bold text-blue-400">
                        {item.price * item.quantity} ج.م
                      </div>
                    </div>
                  ))}
                  <div className="pt-3 flex justify-between font-bold text-slate-300 text-sm">
                    <span>رسوم الشحن والتوصيل:</span>
                    <span>{shippingFee} ج.م</span>
                  </div>
                  <div className="pt-3 flex justify-between font-black text-lg text-white">
                    <span>الإجمالي الكلي:</span>
                    <span className="text-blue-400">{grandTotal} ج.م</span>
                  </div>
                </div>
              )}
            </div>

            {/* 2. بيانات العميل */}
            <div className="bg-[#0a1428] border border-blue-900/50 rounded-2xl p-6 shadow-xl space-y-4">
              <h2 className="text-2xl font-bold text-white mb-2">بيانات العميل والشحن</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-slate-300">
                    الاسم بالكامل *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-[#081020] border border-blue-900 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500"
                    placeholder="اكتب اسمك ثلاثي أو رباعي"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-slate-300">
                    رقم التليفون *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone1}
                    onChange={(e) => setFormData({ ...formData, phone1: e.target.value })}
                    className="w-full bg-[#081020] border border-blue-900 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500"
                    placeholder="رقم الهاتف الأساسي"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-slate-300">
                    رقم تليفون ثاني (اختياري)
                  </label>
                  <input
                    type="tel"
                    value={formData.phone2}
                    onChange={(e) => setFormData({ ...formData, phone2: e.target.value })}
                    className="w-full bg-[#081020] border border-blue-900 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500"
                    placeholder="رقم هاتف إضافي للطوارئ"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-slate-300">
                    لوجو الطباعة على الفيست
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
                    className="w-full bg-[#081020] border border-blue-900 rounded-lg p-2.5 text-xs text-slate-400 file:ml-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-blue-600 file:text-white"
                  />
                  {logoFile && (
                    <p className="text-xs text-emerald-400 mt-1">تم اختيار ملف الشعار: {logoFile.name}</p>
                  )}
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold mb-2 text-slate-300">
                    العنوان بالتفصيل *
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-[#081020] border border-blue-900 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500"
                    placeholder="المحافظة، المدينة، اسم المنطقة، اسم الشارع، رقم العمارة والدور"
                  />
                </div>
              </div>
            </div>

            {/* 3. سداد الديبوزت */}
            <div className="bg-[#0a1428] border border-blue-900/50 rounded-2xl p-6 shadow-xl space-y-4">
              <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                <CreditCard className="w-6 h-6 text-blue-400" />
                سداد ديبوزت (عربون تأكيد الطلب)
              </h2>
              <p className="text-sm text-slate-300">
                يرجى تحويل مبلغ العربون لتأكيد أمر التوريد والبدء في التجهيز:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-[#081020] border border-blue-900 rounded-xl space-y-1">
                  <Badge className="bg-red-600 text-white">Vodafone Cash</Badge>
                  <p className="text-xl font-bold text-white tracking-widest">01010625349</p>
                  <p className="text-xs text-slate-400">تحويل كاش إلى هذا الرقم</p>
                </div>
                <div className="p-4 bg-[#081020] border border-blue-900 rounded-xl space-y-1">
                  <Badge className="bg-purple-600 text-white">InstaPay</Badge>
                  <p className="text-xl font-bold text-white tracking-widest">01144248804</p>
                  <p className="text-xs text-slate-400">تحويل فوري عبر تطبيق إنستاباي</p>
                </div>
              </div>

              {/* رفع اسكرين التحويل دون إجبار */}
              <div className="pt-2">
                <label className="block text-sm font-semibold mb-2 text-slate-300">
                  إرفاق اسكرين من التحويل
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setReceiptFile(e.target.files?.[0] || null)}
                  className="w-full bg-[#081020] border border-blue-900 rounded-lg p-2.5 text-xs text-slate-400 file:ml-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-blue-600 file:text-white"
                />
                {receiptFile && (
                  <p className="text-xs text-emerald-400 mt-2">تم إرفاق إيصال التحويل: {receiptFile.name}</p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              disabled={cart.length === 0}
              className="w-full py-6 text-lg font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-xl cursor-pointer"
            >
              تأكيد الطلب وعرض الفاتورة الرسمية
            </Button>
          </form>
        ) : (
          /* 4. تصميم الفاتورة الرسمي */
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-[#0a1428] p-4 rounded-xl border border-blue-900">
              <div>
                <h2 className="text-xl font-bold text-white">تم استلام طلبك بنجاح!</h2>
                <p className="text-xs text-slate-400">يمكنك حفظ أو طباعة الفاتورة والاحتفاظ بنسخة منها</p>
              </div>
              <Button
                onClick={handlePrint}
                className="bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-2 font-bold cursor-pointer"
              >
                <Download className="w-4 h-4" />
                تحميل / طباعة الفاتورة
              </Button>
            </div>

            {/* قالب الفاتورة الرسمي */}
            <div
              id="invoice-print-area"
              className="bg-white text-slate-900 p-8 sm:p-12 rounded-2xl shadow-2xl border border-slate-200"
            >
              {/* ترويسة الفاتورة */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-8 border-b-2 border-slate-900 gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border border-slate-300 shadow-sm shrink-0">
                    <Image
                      src="https://i.ibb.co/NdnYZ3Pp/Whats-App-Image-2026-10-14-at-5-53-58-AM.jpg"
                      alt="Logo"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div>
                    <h1 className="text-2xl font-black tracking-tight text-slate-900">
                      Future Press Company
                    </h1>
                    <p className="text-xs text-slate-500">للطباعة وتوريدات الأمان الصناعي والمهني</p>
                  </div>
                </div>

                <div className="text-left font-sans">
                  <span className="text-3xl font-black text-slate-900 tracking-wider">INVOICE</span>
                  <p className="text-xs font-bold text-slate-600 mt-1">رقم الفاتورة: {invoiceNumber}</p>
                </div>
              </div>

              {/* بيانات الشركة والعميل */}
              <div className="grid grid-cols-2 gap-6 py-6 border-b border-slate-200 text-sm">
                <div>
                  <h4 className="font-bold text-slate-900 mb-2">بيانات الشركة:</h4>
                  <p className="text-slate-800 font-semibold">Future Press Company</p>
                  <p className="text-slate-600 flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    القاهرة - حلوان
                  </p>
                  <p className="text-slate-600 flex items-center gap-1 mt-1">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    01010625349
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 mb-2">فاتورة إلى (بيانات العميل):</h4>
                  <p className="text-slate-800 font-semibold">{formData.fullName}</p>
                  <p className="text-slate-600 flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {formData.address}
                  </p>
                  <p className="text-slate-600 flex items-center gap-1 mt-1">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    {formData.phone1} {formData.phone2 ? ` - ${formData.phone2}` : ""}
                  </p>
                  <p className="text-slate-600 flex items-center gap-1 mt-1 text-xs">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    التاريخ: {orderDate}
                  </p>
                </div>
              </div>

              {/* جدول المنتجات وسعر كل منتج */}
              <div className="py-6">
                <table className="w-full text-right border-collapse">
                  <thead>
                    <tr className="border-b-2 border-slate-900 text-xs uppercase font-bold text-slate-700">
                      <th className="py-3">المنتج / البيان</th>
                      <th className="py-3 text-center">المقاس</th>
                      <th className="py-3 text-center">الكمية</th>
                      <th className="py-3 text-center">سعر الوحدة</th>
                      <th className="py-3 text-left">الإجمالي</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-sm">
                    {cart.map((item, idx) => (
                      <tr key={idx}>
                        <td className="py-3 font-medium text-slate-900">{item.name}</td>
                        <td className="py-3 text-center text-slate-600">{item.size}</td>
                        <td className="py-3 text-center text-slate-600">{item.quantity}</td>
                        <td className="py-3 text-center text-slate-600">{item.price} ج.م</td>
                        <td className="py-3 text-left font-bold text-slate-900">
                          {item.price * item.quantity} ج.م
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* إجماليات الفاتورة ورسوم الشحن */}
              <div className="border-t-2 border-slate-900 pt-4 flex justify-end">
                <div className="w-72 space-y-2 text-sm">
                  <div className="flex justify-between text-slate-600">
                    <span>مجموع المنتجات:</span>
                    <span>{itemsTotal} ج.م</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>رسوم الشحن والتوصيل:</span>
                    <span>{shippingFee} ج.م</span>
                  </div>
                  <div className="flex justify-between text-base font-black border-t-2 border-slate-900 pt-2 text-slate-900">
                    <span>الإجمالي النهائي المطلوب:</span>
                    <span>{grandTotal} ج.م</span>
                  </div>
                </div>
              </div>

              {/* تذييل الفاتورة */}
              <div className="mt-12 pt-6 border-t border-slate-200 text-center text-xs text-slate-500 space-y-1">
                <p className="font-semibold text-slate-700">
                  شكراً لتعاملكم مع Future Press Company
                </p>
                <p>سيقوم فريق العمل بالتواصل معكم هاتفياً لتأكيد الشحن والتوصيل ومراجعة تصميم الشعار.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
