'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Car, Zap, Fuel, Info, AlertCircle, Linkedin, 
  CheckCircle, Check, Landmark, Leaf, Share2, TrendingUp, 
  BookOpen, ChevronDown, FileText, Globe, Gauge, 
  X, Mail, Phone, Code, ExternalLink
} from 'lucide-react';

// تعريف الأنواع لتجنب أخطاء TypeScript
type TabType = 'customs' | 'loan' | 'savings';
type LangType = 'ar' | 'en';
type ModalType = 'privacy' | 'contact' | null;

export default function Home() {
  const [lang, setLang] = useState<LangType>('ar');
  const [activeTab, setActiveTab] = useState<TabType>('customs');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  // --- Effect to handle scroll ---
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- States (تم تعديل الأنواع لقبول القيمة الفارغة وتجنب الايرور) ---
  const [carPrice, setCarPrice] = useState<number | ''>('');
  const [engineType, setEngineType] = useState<string>('electric');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [carYear, setCarYear] = useState<string>('2025'); 
  const [includeFees, setIncludeFees] = useState<boolean>(true);
  const [customsCost, setCustomsCost] = useState<number | null>(null);
  const [totalCost, setTotalCost] = useState<number | null>(null);
  const [taxDetails, setTaxDetails] = useState<string>('');
  
  // هنا التعديل: <number | ''> عشان يقبل الحقل الفاضي
  const [loanAmount, setLoanAmount] = useState<number | ''>('');
  const [downPayment, setDownPayment] = useState<number | ''>('');
  const [interestRate, setInterestRate] = useState<number | ''>(5.5);
  const [loanTerm, setLoanTerm] = useState<number>(5);
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);
  
  const [dailyDistance, setDailyDistance] = useState<number | ''>('');
  const [petrolPrice, setPetrolPrice] = useState<number | ''>(0.95);
  const [petrolConsumption, setPetrolConsumption] = useState<number | ''>(10);
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [electricPrice] = useState<number>(0.12);
  const [monthlySavings, setMonthlySavings] = useState<number | null>(null);
  const [yearlySavings, setYearlySavings] = useState<number | null>(null);

  // --- Constants ---
  const BRAND_NAME = { ar: "أوتو جو", en: "AutoJo" };
  const DEVELOPER_NAME = { ar: "ينال أبو طوق", en: "Yanal Abu Touq" };
  const LINKEDIN_URL = "https://www.linkedin.com/in/yanal-abutouq-6b2484377/"; 
  const CONTACT_INFO = {
    email: "abutouqy16@gmail.com", 
    phone: "+962 79 2398007" 
  };

  // --- Translations ---
  const t = {
    ar: {
      share: "نشر",
      heroTitle: "دليلك الذكي لامتلاك سيارة",
      heroSubtitle: "حسب قوانين 2026",
      tabs: { customs: "حساب الجمرك", loan: "قسط البنك", savings: "حاسبة التوفير" },
      customs: {
        note: "تنبيه هام:",
        noteText: "يرجى إدخال القيمة التخمينية (تقدير الجمارك) وليس سعر السوق.",
        priceLabel: "القيمة التخمينية (دينار)",
        engineLabel: "نوع المحرك",
        feesLabel: "إضافة 150 دينار (رسوم وتخليص تقريبي)",
        btn: "احسب التكلفة",
        resultTitle: "تفاصيل التكلفة",
        taxValue: "قيمة الرسوم والجمرك",
        total: "السعر النهائي شامل السيارة",
        goToLoan: "اضغط هنا لحساب القسط الشهري ➜",
        types: { electric: "كهرباء", hybrid: "هايبرد", gasoline: "بنزين" }
      },
      loan: {
        amount: "قيمة السيارة / القرض",
        downPayment: "الدفعة الأولى",
        interest: "نسبة الفائدة (%)",
        term: "مدة السداد",
        years: "سنوات",
        btn: "احسب القسط الشهري",
        resultTitle: "القسط المتوقع",
        loanValue: "أصل القرض"
      },
      savings: {
        distance: "كم تمشي يومياً؟ (كم)",
        petrolPrice: "سعر لتر البنزين",
        consumption: "مصروف سيارتك الحالية (لتر/100كم)",
        btn: "احسب كم ستوفر",
        resultTitle: "نتائج التوفير",
        monthly: "توفير شهري",
        yearly: "توفير سنوي",
        compare: "مقارنة بسيارة بنزين تستهلك",
        explanation: "تعتمد الحسبة على مقارنة تكلفة البنزين مع استهلاك كهرباء تقديري (18 كيلوواط/100كم) بتعرفة منزلية (0.12 دينار)."
      },
      info: {
        customsTitle: "كيف تعمل حاسبة الجمارك؟",
        loanTitle: "نصائح القروض البنكية",
        savingsTitle: "لماذا تشتري سيارة كهربائية؟",
        stepsTitle: "الخطوات",
        tipsTitle: "معلومات ذهبية",
        customsSteps: ["حدد نوع المحرك.", "ضع القيمة التخمينية.", "شاهد النتيجة."],
        customsTips: ["الضريبة الموحدة للكهرباء هي 27%.", "الهايبرد 39%، البنزين 51%.", "الأسعار تقريبية للإرشاد."],
        loanSteps: ["أدخل المبلغ الإجمالي.", "خصم الدفعة الأولى.", "حساب الفائدة."],
        loanTips: ["الدفعة الأولى تقلل الفائدة.", "الفائدة البنكية الحالية ~5-6%.", "لا تتجاوز 50% من راتبك للقسط."],
        savingsSteps: ["مسافتك اليومية.", "سعر الوقود.", "الفرق هو ربحك."],
        savingsTips: ["توفر الكهرباء 80% من المصاريف.", "صيانة أقل (لا زيوت).", "الشحن المنزلي أرخص وسيلة."]
      },
      docs: {
        title: "ماذا تحتاج للتخليص؟",
        list: ["الهوية الشخصية", "عقد الشراء", "بوليصة الشحن", "شهادة المنشأ", "شهادة الشطب (للحرة)", "وصل إي-فواتيركم"]
      },
      faq: {
        title: "الأسئلة الأكثر تكراراً",
        list: [
          { q: "ما الفرق بين القيمة التخمينية وسعر الشراء؟", a: "القيمة التخمينية يحددها مخمن الجمارك حسب جداول الاستهلاك، وهي عادة أقل من السعر الذي اشتريت به السيارة." },
          { q: "هل السيارات الكهربائية معفاة من الضريبة؟", a: "هي معفاة من ضريبة المبيعات العامة، ولكن عليها ضريبة خاصة بنسبة 27%." },
          { q: "كيف يتم دفع الرسوم؟", a: "حصرياً عبر نظام إي-فواتيركم." },
          { q: "هل تختلف الضريبة حسب حجم البطارية؟", a: "لا، حسب تعديلات 2025 أصبحت النسبة موحدة (27%) للجميع." }
        ]
      },
      insurance: {
        title: "كم يكلف التأمين الشامل؟",
        desc: "التأمين الشامل في الأردن يعتمد على قيمة السيارة. النسبة الشائعة تتراوح بين 3% إلى 4% حسب نوع السيارة وسجل السائق.",
        tags: ["تغطية الحوادث", "المسؤولية المدنية", "السرقة والحريق"],
        inputLabel: "أدخل قيمة السيارة المتوقعة",
        placeholder: "مثال: 15000",
        resultLabel: "القسط السنوي التقديري:"
      },
      footer: {
        rights: "© 2026 AutoJo - جميع الحقوق محفوظة",
        dev: "تم التطوير بواسطة",
        contact: "تواصل معنا",
        privacy: "سياسة الخصوصية"
      },
      modals: {
        privacyTitle: "سياسة الخصوصية",
        privacyText: "نحن في AutoJo نحترم خصوصيتك. هذا الموقع لا يقوم بتخزين أي بيانات شخصية أو مالية. جميع العمليات الحسابية تتم محلياً على متصفحك. نحن نستخدم ملفات تعريف الارتباط (Cookies) فقط لتحسين تجربة المستخدم وعرض الإعلانات المناسبة.",
        contactTitle: "تواصل معنا",
        contactText: "هل لديك استفسار أو اقتراح؟ يسعدنا سماع صوتك. يمكنك التواصل معنا عبر القنوات التالية:"
      }
    },
    en: {
      share: "Share",
      heroTitle: "Smart Guide to Car Ownership",
      heroSubtitle: "Based on 2026 Regulations",
      tabs: { customs: "Customs Calc", loan: "Bank Loan", savings: "Savings Calc" },
      customs: {
        note: "Important:",
        noteText: "Use Appraised Value (Customs Value) not Market Price.",
        priceLabel: "Appraised Value (JOD)",
        engineLabel: "Engine Type",
        feesLabel: "Add ~150 JOD Fees",
        btn: "Calculate Total",
        resultTitle: "Cost Breakdown",
        taxValue: "Customs & Duties",
        total: "Turnkey Price (With Car)",
        goToLoan: "Calculate Monthly Payment ➜",
        types: { electric: "Electric", hybrid: "Hybrid", gasoline: "Gasoline" }
      },
      loan: {
        amount: "Car Price / Loan Amount",
        downPayment: "Down Payment",
        interest: "Interest Rate (%)",
        term: "Duration",
        years: "Years",
        btn: "Calculate Payment",
        resultTitle: "Expected Payment",
        loanValue: "Principal Loan"
      },
      savings: {
        distance: "Daily Distance (KM)",
        petrolPrice: "Petrol Price (JOD/L)",
        consumption: "Current Consumption (L/100KM)",
        btn: "Calculate Savings",
        resultTitle: "Savings Results",
        monthly: "Monthly Savings",
        yearly: "Yearly Savings",
        compare: "Compared to petrol car consuming",
        explanation: "Calculations compare petrol cost with estimated EV consumption (18 kWh/100km) at residential electricity rate (0.12 JOD)."
      },
      info: {
        customsTitle: "How Customs Calc Works?",
        loanTitle: "Bank Loan Tips",
        savingsTitle: "Why Buy Electric?",
        stepsTitle: "Steps",
        tipsTitle: "Golden Tips",
        customsSteps: ["Select Engine.", "Enter Appraised Value.", "See Result."],
        customsTips: ["Electric Tax is flat 27%.", "Hybrid 39%, Gas 51%.", "Results are approximate guide."],
        loanSteps: ["Total Amount.", "Minus Down Payment.", "Calculate Interest."],
        loanTips: ["Down payment reduces interest.", "Current rates ~5-6%.", "Keep payment under 50% of income."],
        savingsSteps: ["Daily Distance.", "Fuel Price.", "Difference is profit."],
        savingsTips: ["EVs save 80% cost.", "Less maintenance.", "Home charging is cheapest."]
      },
      docs: {
        title: "Required Documents",
        list: ["Personal ID", "Sales Contract", "Bill of Lading", "Origin Cert", "Scrap Cert", "e-Fawateercom Receipt"]
      },
      faq: {
        title: "Frequently Asked Questions",
        list: [
          { q: "Appraised Value vs Market Price?", a: "Appraised value is set by Customs based on depreciation tables, usually lower than what you paid." },
          { q: "Are EVs tax exempt?", a: "Exempt from General Sales Tax, but subject to 27% Special Tax." },
          { q: "How to pay fees?", a: "Exclusively via e-Fawateercom." },
          { q: "Does battery size matter?", a: "No, as of 2025, it's a flat 27% for all EVs." }
        ]
      },
      insurance: {
        title: "Comprehensive Insurance Cost?",
        desc: "Insurance estimates are based on car value. Common rates in Jordan range between 3% - 4% depending on car type and driver history.",
        tags: ["Accident Cover", "Liability", "Theft & Fire"],
        inputLabel: "Enter Car Market Value",
        placeholder: "Example: 15000",
        resultLabel: "Est. Annual Premium:"
      },
      footer: {
        rights: "© 2026 AutoJo - All Rights Reserved",
        dev: "Developed by",
        contact: "Contact Us",
        privacy: "Privacy Policy"
      },
      modals: {
        privacyTitle: "Privacy Policy",
        privacyText: "At AutoJo, we respect your privacy. This site does not store any personal or financial data. All calculations are performed locally on your browser. We use cookies solely to enhance user experience and serve relevant ads.",
        contactTitle: "Contact Us",
        contactText: "Have a question or suggestion? We'd love to hear from you. Reach out via:"
      }
    }
  };

  const content = t[lang];
  const TAX_RATES = {
    electric: { rate: 0.27, labelAr: '27% (موحدة)', labelEn: '27% (Flat)' },
    hybrid: { rate: 0.39, labelAr: '39% (مخفضة)', labelEn: '39% (Reduced)' },
    gasoline: { rate: 0.51, labelAr: '51% (مخفضة)', labelEn: '51% (Reduced)' }
  };

  // --- Logic Functions ---
  const calculateCustoms = () => {
    if (typeof carPrice === 'number' && carPrice > 0) {
      setCustomsCost(null); setTotalCost(null); setTaxDetails('');
      setTimeout(() => {
        const selectedTax = TAX_RATES[engineType as keyof typeof TAX_RATES];
        const taxAmount = carPrice * selectedTax.rate;
        const fees = includeFees ? 150 : 0; 
        const totalCustoms = taxAmount + fees;
        const finalPrice = carPrice + totalCustoms;
        setCustomsCost(totalCustoms);
        setTotalCost(finalPrice);
        setLoanAmount(finalPrice);
        setDownPayment(Math.floor(finalPrice * 0.20));
        const label = lang === 'ar' ? selectedTax.labelAr : selectedTax.labelEn;
        let details = `${label}`;
        if (includeFees) details += lang === 'ar' ? ' + 150 دينار رسوم' : ' + 150 JOD Fees';
        setTaxDetails(details);
      }, 500);
    }
  };

  const calculateLoan = () => {
    if (typeof loanAmount === 'number' && typeof interestRate === 'number') {
      const principal = loanAmount - (Number(downPayment) || 0);
      const monthlyRate = interestRate / 100 / 12;
      const numberOfPayments = loanTerm * 12;
      const payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
      setMonthlyPayment(payment);
    }
  };

  const calculateSavings = () => {
    if (typeof dailyDistance === 'number' && typeof petrolPrice === 'number' && typeof petrolConsumption === 'number') {
      const monthlyDistance = dailyDistance * 30;
      const petrolCostMonth = (monthlyDistance / 100) * petrolConsumption * petrolPrice;
      const evConsumptionPer100Km = 18; 
      const electricCostMonth = (monthlyDistance / 100) * evConsumptionPer100Km * electricPrice;
      const savedMonth = petrolCostMonth - electricCostMonth;
      setMonthlySavings(savedMonth);
      setYearlySavings(savedMonth * 12);
    }
  };

  const shareToWhatsapp = () => {
    const text = `Check out AutoJo Calculator: \n ${window.location.href}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-blue-100" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      
      {/* --- Floating Header --- */}
      <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
        <header className={`w-full max-w-5xl rounded-full transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-xl shadow-lg border border-slate-200/50 py-3' : 'bg-white/70 backdrop-blur-md border border-white/40 py-4'}`}>
          <div className="px-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-2.5 rounded-full text-white shadow-lg shadow-blue-500/20"><Car size={20} strokeWidth={2.5} /></div>
              <span className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600 tracking-tight">{lang === 'ar' ? BRAND_NAME.ar : BRAND_NAME.en}</span>
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <button onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')} className="flex items-center gap-1.5 text-xs md:text-sm font-bold text-slate-600 bg-slate-100/80 px-4 py-2 rounded-full hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-slate-200"><Globe size={14} />{lang === 'ar' ? 'English' : 'عربي'}</button>
              <button onClick={shareToWhatsapp} className="flex items-center gap-2 text-xs md:text-sm font-bold text-white bg-slate-900 px-4 py-2 rounded-full hover:bg-slate-800 hover:shadow-lg hover:-translate-y-0.5 transition-all"><Share2 size={14} /><span className="hidden md:inline">{content.share}</span></button>
            </div>
          </div>
        </header>
      </div>

      {/* --- Main Content --- */}
      <main className="flex-grow pt-32 pb-10 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-4 tracking-tight leading-tight">{content.heroTitle} <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">{content.heroSubtitle}</span></h2>
          </motion.div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center mb-10 gap-2">
            {[
              { id: 'customs', label: content.tabs.customs, icon: Car },
              { id: 'loan', label: content.tabs.loan, icon: Landmark },
              { id: 'savings', label: content.tabs.savings, icon: Leaf },
            ].map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id as TabType)} className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all border ${activeTab === tab.id ? 'bg-slate-900 text-white border-slate-900 shadow-xl shadow-slate-900/10 scale-105' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50 hover:border-slate-300'}`}><tab.icon size={18} />{tab.label}</button>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {/* Input Card */}
            <motion.div layout className="md:col-span-2 bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden relative">
              <div className="absolute top-0 w-full h-2 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
              <div className="p-8 space-y-8">
                {activeTab === 'customs' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                    <div className="bg-amber-50/50 border border-amber-100 rounded-2xl p-4 flex gap-3 items-start"><AlertCircle className="text-amber-500 shrink-0 mt-0.5" size={20} /><p className="text-sm text-amber-900/80 font-medium"><strong>{content.customs.note}</strong> {content.customs.noteText}</p></div>
                    <div className="space-y-3"><label className="text-sm font-bold text-slate-800">{content.customs.priceLabel}</label><input type="number" value={carPrice} onChange={(e) => setCarPrice(e.target.value === '' ? '' : Number(e.target.value))} className="w-full p-4 bg-slate-50/50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 focus:bg-white outline-none font-bold text-lg transition-all" placeholder="12000" /></div>
                    <div className="space-y-3"><label className="text-sm font-bold text-slate-800">{content.customs.engineLabel}</label>
                      <div className="grid grid-cols-3 gap-3">
                        {[{ id: 'electric', label: content.customs.types.electric, icon: Zap }, { id: 'hybrid', label: content.customs.types.hybrid, icon: Fuel }, { id: 'gasoline', label: content.customs.types.gasoline, icon: Car }].map((type) => (
                          <button key={type.id} onClick={() => setEngineType(type.id)} className={`py-4 px-2 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${engineType === type.id ? 'border-blue-600 bg-blue-50/50 text-blue-700 shadow-sm' : 'border-slate-100 hover:border-slate-200 text-slate-500'}`}><type.icon size={24} strokeWidth={1.5} /> <span className="font-bold text-sm">{type.label}</span></button>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => setIncludeFees(!includeFees)}><div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors ${includeFees ? 'bg-blue-600 border-blue-600' : 'border-slate-300 bg-white'}`}>{includeFees && <Check size={16} className="text-white" />}</div><span className="text-sm font-bold text-slate-700">{content.customs.feesLabel}</span></div>
                    <button onClick={calculateCustoms} disabled={!carPrice} className="w-full bg-slate-900 hover:bg-blue-600 text-white font-bold py-5 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-slate-900/20">{content.customs.btn}</button>
                  </motion.div>
                )}
                {activeTab === 'loan' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                    <div className="space-y-3"><label className="text-sm font-bold text-slate-800">{content.loan.amount}</label><input type="number" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value === '' ? '' : Number(e.target.value))} className="w-full p-4 bg-slate-50/50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 focus:bg-white outline-none font-bold text-lg transition-all" /></div>
                    <div className="grid grid-cols-2 gap-4"><div className="space-y-3"><label className="text-sm font-bold text-slate-800">{content.loan.downPayment}</label><input type="number" value={downPayment} onChange={(e) => setDownPayment(e.target.value === '' ? '' : Number(e.target.value))} className="w-full p-4 bg-slate-50/50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 focus:bg-white outline-none font-bold text-lg transition-all" /></div><div className="space-y-3"><label className="text-sm font-bold text-slate-800">{content.loan.interest}</label><input type="number" value={interestRate} onChange={(e) => setInterestRate(e.target.value === '' ? '' : Number(e.target.value))} className="w-full p-4 bg-slate-50/50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 focus:bg-white outline-none font-bold text-lg transition-all" /></div></div>
                    <div className="space-y-3"><label className="text-sm font-bold text-slate-800">{content.loan.term}: {loanTerm} {content.loan.years}</label><input type="range" min="1" max="8" value={loanTerm} onChange={(e) => setLoanTerm(Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg accent-blue-600" /></div>
                    <button onClick={calculateLoan} className="w-full bg-slate-900 hover:bg-blue-600 text-white font-bold py-5 rounded-2xl transition-all shadow-lg shadow-slate-900/20">{content.loan.btn}</button>
                  </motion.div>
                )}
                {activeTab === 'savings' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                    <div className="space-y-3"><label className="text-sm font-bold text-slate-800">{content.savings.distance}</label><input type="number" value={dailyDistance} onChange={(e) => setDailyDistance(e.target.value === '' ? '' : Number(e.target.value))} className="w-full p-4 bg-slate-50/50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 focus:bg-white outline-none font-bold text-lg transition-all" /></div>
                    <div className="grid grid-cols-2 gap-4"><div className="space-y-3"><label className="text-sm font-bold text-slate-800">{content.savings.petrolPrice}</label><input type="number" value={petrolPrice} onChange={(e) => setPetrolPrice(e.target.value === '' ? '' : Number(e.target.value))} className="w-full p-4 bg-slate-50/50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 focus:bg-white outline-none font-bold text-lg transition-all" /></div><div className="space-y-3"><label className="text-sm font-bold text-slate-800">{content.savings.consumption}</label><input type="number" value={petrolConsumption} onChange={(e) => setPetrolConsumption(e.target.value === '' ? '' : Number(e.target.value))} className="w-full p-4 bg-slate-50/50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 focus:bg-white outline-none font-bold text-lg transition-all" /></div></div>
                    <button onClick={calculateSavings} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-5 rounded-2xl transition-all shadow-lg shadow-green-600/20">{content.savings.btn}</button>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Results Sidebar */}
            <motion.div className="md:col-span-1 space-y-4">
              <div className="bg-slate-900 text-white rounded-[2rem] p-8 shadow-2xl shadow-slate-900/20 relative overflow-hidden h-full flex flex-col justify-center min-h-[400px]">
                <div className={`absolute top-0 w-64 h-64 bg-blue-600/30 rounded-full blur-[80px] -mt-10 ${lang === 'ar' ? '-mr-10 right-0' : '-ml-10 left-0'}`}></div>
                {activeTab === 'customs' && (
                  <div className="text-center relative z-10"><h3 className="text-slate-400 font-bold text-xs uppercase tracking-wider mb-8">{content.customs.resultTitle}</h3>{totalCost ? (<motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="space-y-8"><div><p className="text-slate-400 text-sm mb-2">{content.customs.taxValue}</p><span className="text-3xl font-bold">{customsCost?.toLocaleString()} JD</span><p className="text-slate-500 text-xs mt-1">{taxDetails}</p></div><div className="bg-white/10 p-6 rounded-2xl border border-white/10 backdrop-blur-sm"><p className="text-green-400 text-sm font-bold flex justify-center gap-1.5 mb-2"><CheckCircle size={16}/> {content.customs.total}</p><span className="text-4xl font-black text-white tracking-tight">{totalCost?.toLocaleString()} JD</span></div><button onClick={() => setActiveTab('loan')} className="text-sm text-blue-300 font-medium hover:text-white transition-colors flex items-center justify-center gap-1 mx-auto">{content.customs.goToLoan}</button></motion.div>) : <div className="py-12 text-slate-500 flex flex-col items-center"><Gauge size={40} className="mb-4 opacity-20" /><span className="text-sm font-medium opacity-50">...</span></div>}</div>
                )}
                {activeTab === 'loan' && (
                  <div className="text-center relative z-10"><h3 className="text-slate-400 font-bold text-xs uppercase tracking-wider mb-8">{content.loan.resultTitle}</h3>{monthlyPayment ? (<motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="space-y-8"><div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-8 rounded-3xl shadow-lg shadow-indigo-500/30 border border-white/10"><span className="text-6xl font-black">{monthlyPayment.toFixed(0)}</span> <span className="text-white/70 text-xl font-medium">JD</span></div><div className="text-sm text-slate-400 font-medium bg-white/5 p-3 rounded-xl border border-white/5 inline-block">{content.loan.loanValue}: {(Number(loanAmount) - Number(downPayment)).toLocaleString()} JD</div></motion.div>) : <div className="py-12 text-slate-500 flex flex-col items-center"><Landmark size={40} className="mb-4 opacity-20" /><span className="text-sm font-medium opacity-50">...</span></div>}</div>
                )}
                {activeTab === 'savings' && (
                  <div className="text-center relative z-10"><h3 className="text-slate-400 font-bold text-xs uppercase tracking-wider mb-8">{content.savings.resultTitle}</h3>{monthlySavings ? (<motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="space-y-8"><div><p className="text-slate-400 text-sm mb-2">{content.savings.monthly}</p><span className="text-5xl font-black text-green-400 flex justify-center items-center gap-2"><TrendingUp size={36}/> {monthlySavings.toFixed(0)} <span className="text-2xl text-green-400/50">JD</span></span></div><div className="bg-green-500/20 border border-green-500/20 p-6 rounded-2xl"><p className="text-green-300 text-sm mb-2 font-bold">{content.savings.yearly}</p><span className="text-3xl font-bold text-white">{yearlySavings?.toFixed(0)} JD</span></div><div className="mt-4 p-3 bg-blue-900/30 rounded-xl text-xs text-blue-200 flex gap-2 items-start border border-blue-800/30"><Info size={14} className="flex-shrink-0 mt-0.5" /><p className="leading-relaxed opacity-90">{content.savings.explanation}</p></div></motion.div>) : <div className="py-12 text-slate-500 flex flex-col items-center"><Leaf size={40} className="mb-4 opacity-20" /><span className="text-sm font-medium opacity-50">...</span></div>}</div>
                )}
              </div>
            </motion.div>
          </div>

          {/* New Sections */}
          <section className="mb-20">
            <div className="flex items-center justify-between mb-8"><h2 className="text-2xl font-black text-slate-900">{lang === 'ar' ? 'متوسط أسعار السيارات في الحرة' : 'Average Free Zone Prices'}</h2><span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{lang === 'ar' ? 'تحديث 2026' : '2026 Update'}</span></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[{ name: "VW ID.4 Crozz", price: "17,500 - 21,000", type: "electric" }, { name: "Changan E-Star", price: "8,500 - 10,500", type: "electric" }, { name: "Tesla Model 3", price: "23,000 - 28,000", type: "electric" }, { name: "Toyota Camry", price: "21,000 - 25,000", type: "hybrid" }, { name: "Hyundai Ioniq 5", price: "26,000 - 32,000", type: "electric" }, { name: "BYD Seagull", price: "10,000 - 12,500", type: "electric" }, { name: "Kia Niro EV", price: "19,000 - 23,000", type: "electric" }, { name: "Toyota bZ4X", price: "20,000 - 24,000", type: "electric" }].map((car, idx) => (
                <motion.div key={idx} whileHover={{ y: -5 }} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-all group"><div className="flex justify-between items-start mb-3"><div className={`p-2 rounded-xl ${car.type === 'electric' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'}`}>{car.type === 'electric' ? <Zap size={18} /> : <Fuel size={18} />}</div><span className="text-xs font-medium text-slate-400 bg-slate-50 px-2 py-1 rounded-md">JD</span></div><h3 className="font-bold text-slate-800 text-lg mb-1 group-hover:text-blue-600 transition-colors">{car.name}</h3><p className="text-slate-500 text-sm mb-4">{lang === 'ar' ? 'السعر التقريبي:' : 'Est. Price:'}</p><div className="text-xl font-black text-slate-900">{car.price}</div></motion.div>
              ))}
            </div>
            <p className="text-center text-slate-400 text-xs mt-8">{lang === 'ar' ? '* الأسعار تقريبية وتعتمد على النظافة والمواصفات وسنة الصنع.' : '* Prices are approximate and depend on condition, specs, and year.'}</p>
          </section>

          {/* Licensing & Charging */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            <section className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
              <div className="flex items-center gap-3 mb-6"><div className="bg-orange-100 p-2.5 rounded-full text-orange-600"><FileText size={20} /></div><h3 className="font-bold text-slate-800 text-lg">{lang === 'ar' ? 'رسوم الترخيص السنوي (تقديري)' : 'Annual License Fees (Est.)'}</h3></div>
              <div className="space-y-3">{[{ label: lang === 'ar' ? 'سيارات الكهرباء (جميع الفئات)' : 'Electric Cars (All)', price: '50 JD' }, { label: lang === 'ar' ? 'محرك بنزين/هايبرد أقل من 1600cc' : 'Gas/Hybrid < 1600cc', price: '45 JD' }, { label: lang === 'ar' ? 'محرك 1600cc - 2000cc' : 'Engine 1600cc - 2000cc', price: '64 JD' }, { label: lang === 'ar' ? 'محرك 2000cc - 2500cc' : 'Engine 2000cc - 2500cc', price: '173 JD' }, { label: lang === 'ar' ? 'محرك 2500cc - 3000cc' : 'Engine 2500cc - 3000cc', price: '225 JD' }, { label: lang === 'ar' ? 'محرك 3000cc - 4000cc' : 'Engine 3000cc - 4000cc', price: '440 JD' }].map((row, idx) => (<div key={idx} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100 hover:bg-orange-50/50 hover:border-orange-100 transition-colors"><span className="text-sm font-medium text-slate-600">{row.label}</span><span className="text-sm font-black text-slate-900">{row.price}</span></div>))}</div>
              <p className="text-xs text-slate-400 mt-4 leading-relaxed">{lang === 'ar' ? '* الرسوم تقريبية وتشمل الطوابع الأساسية، وقد تختلف قليلاً حسب سنة التسجيل.' : '* Fees are approximate including basic stamps, may vary slightly by registration year.'}</p>
            </section>
            <section className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
              <div className="flex items-center gap-3 mb-6"><div className="bg-blue-100 p-2.5 rounded-full text-blue-600"><Zap size={20} /></div><h3 className="font-bold text-slate-800 text-lg">{lang === 'ar' ? 'تكلفة شحن البطارية (لكل 1 كيلوواط)' : 'Charging Cost (Per 1 kW)'}</h3></div>
              <div className="grid gap-4">
                <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-100 relative overflow-hidden"><div className="flex justify-between items-start relative z-10"><div><h4 className="font-bold text-green-900 text-sm mb-1">{lang === 'ar' ? 'الشحن المنزلي' : 'Home Charging'}</h4><p className="text-xs text-green-700/80">{lang === 'ar' ? 'أوفر طريقة للشحن' : 'Cheapest option'}</p></div><span className="text-xl font-black text-green-700">0.12 <span className="text-xs font-medium">JD</span></span></div></div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100"><div className="flex justify-between items-start"><div><h4 className="font-bold text-slate-800 text-sm mb-1">{lang === 'ar' ? 'محطات عامة (AC بطيء)' : 'Public Stations (AC)'}</h4><p className="text-xs text-slate-500">{lang === 'ar' ? 'المولات والأماكن العامة' : 'Malls & Public spots'}</p></div><span className="text-xl font-black text-slate-800">0.22 <span className="text-xs font-medium text-slate-400">JD</span></span></div></div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100"><div className="flex justify-between items-start"><div><h4 className="font-bold text-slate-800 text-sm mb-1">{lang === 'ar' ? 'شحن سريع (DC Fast)' : 'Fast Charging (DC)'}</h4><p className="text-xs text-slate-500">{lang === 'ar' ? 'محطات الوقود (المناصير/جوبترول)' : 'Gas Stations'}</p></div><span className="text-xl font-black text-slate-800">0.33 <span className="text-xs font-medium text-slate-400">JD</span></span></div></div>
              </div>
            </section>
          </div>

          {/* Insurance */}
          <section className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2rem] p-8 md:p-12 text-white shadow-xl mb-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-[100px] opacity-20 -mr-16 -mt-16"></div>
            <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4"><div className="bg-blue-500/20 p-2.5 rounded-full text-blue-300 border border-blue-500/30"><CheckCircle size={24} /></div><h2 className="text-2xl md:text-3xl font-black">{content.insurance.title}</h2></div>
                <p className="text-slate-400 leading-relaxed mb-6">{content.insurance.desc}</p>
                <div className="flex flex-wrap gap-2 text-xs font-medium text-slate-300">{content.insurance.tags.map((tag, i) => (<span key={i} className="bg-white/10 px-3 py-1 rounded-full">{tag}</span>))}</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6">
                <label className="text-sm text-slate-400 mb-2 block">{content.insurance.inputLabel}</label>
                <div className="relative">
                  <input 
                    type="number" 
                    placeholder={content.insurance.placeholder} 
                    onChange={(e) => { 
                      const val = e.target.value === '' ? 0 : Number(e.target.value); 
                      const min = Math.round(val * 0.03); 
                      const max = Math.round(val * 0.0375); 
                      document.getElementById('ins-res')!.innerText = val > 0 ? `${min} - ${max}` : '---'; 
                    }} 
                    // Fixed Input for leading zero + Fixed Direction based on language
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-4 text-white placeholder-slate-600 outline-none focus:border-blue-500 transition-colors" 
                    dir={lang === 'ar' ? 'rtl' : 'ltr'} 
                  />
                  {/* Dynamic position for JD label */}
                  <span className={`absolute top-4 text-slate-500 text-sm ${lang === 'ar' ? 'left-4' : 'right-4'}`}>JD</span>
                </div>
                <div className="mt-6 pt-6 border-t border-white/5 flex justify-between items-end"><span className="text-slate-400 text-sm">{content.insurance.resultLabel}</span><span className="text-3xl font-black text-blue-400" id="ins-res">---</span></div>
                {/* Dynamic alignment for disclaimer */}
                <p className={`text-[10px] text-slate-500 mt-2 ${lang === 'ar' ? 'text-left' : 'text-right'}`}>JD / Year</p>
              </div>
            </div>
          </section>

          {/* Dynamic Info & Checklist & FAQ */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
             <section className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
               <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2"><BookOpen size={20} className="text-blue-500" />{content.info.stepsTitle}</h3>
               <ul className="space-y-4">
                 {(activeTab === 'customs' ? content.info.customsSteps : activeTab === 'loan' ? content.info.loanSteps : content.info.savingsSteps).map((step, idx) => (<li key={idx} className="flex gap-4 items-start text-slate-600 font-medium text-sm leading-relaxed"><span className="flex-shrink-0 w-6 h-6 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center font-bold text-xs mt-0.5">{idx + 1}</span>{step}</li>))}
               </ul>
             </section>
             <section className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
                <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2"><FileText size={20} className="text-blue-600" /> {content.docs.title}</h3>
                <div className="flex flex-wrap gap-3">
                  {content.docs.list.map((item, idx) => (<div key={idx} className="bg-slate-50 px-3 py-2 rounded-lg border border-slate-100 flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center"><Check size={10} className="text-green-600" /></div><span className="text-xs font-bold text-slate-700">{item}</span></div>))}
                </div>
             </section>
          </div>
          <section className="bg-white rounded-[2rem] p-8 md:p-10 shadow-sm border border-slate-100 mb-20">
            <h2 className="text-2xl font-black text-slate-900 mb-10 text-center">{content.faq.title}</h2>
            <div className="space-y-4 max-w-3xl mx-auto">
              {content.faq.list.map((item, index) => (<div key={index} className="bg-slate-50 rounded-2xl px-6 transition-all hover:bg-slate-100"><button onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)} className={`w-full flex justify-between items-center py-5 focus:outline-none ${lang === 'ar' ? 'text-right' : 'text-left'}`}><span className={`font-bold text-base md:text-lg transition-colors ${openFaqIndex === index ? 'text-blue-600' : 'text-slate-800'}`}>{item.q}</span><div className={`p-1 rounded-full transition-colors ${openFaqIndex === index ? 'bg-blue-100 text-blue-600' : 'bg-slate-200 text-slate-500'}`}><ChevronDown size={18} className={`transition-transform duration-300 ${openFaqIndex === index ? 'rotate-180' : ''}`} /></div></button><AnimatePresence>{openFaqIndex === index && (<motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden"><p className="text-slate-600 font-medium text-sm leading-relaxed pb-6 border-t border-slate-200/50 pt-4">{item.a}</p></motion.div>)}</AnimatePresence></div>))}
            </div>
          </section>
        </div>
      </main>

      {/* --- Footer with Developer Credit --- */}
      <footer className="bg-white border-t border-slate-200 py-12 mt-auto">
        <div className="max-w-5xl mx-auto px-6 text-center">
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-8">
            <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 px-4 py-2 rounded-full border border-slate-100 hover:border-blue-200 transition-colors">
              <span className="text-slate-500">{content.footer.rights}</span>
              <span className="mx-2 text-slate-300">|</span>
              <div className="flex items-center gap-2">
                <Code size={16} className="text-blue-500" />
                <span>{content.footer.dev}</span>
                <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="font-bold text-blue-600 hover:underline flex items-center gap-1">
                  {lang === 'ar' ? DEVELOPER_NAME.ar : DEVELOPER_NAME.en}
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
            
            {/* LinkedIn Only */}
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-700 transition-colors">
              <Linkedin size={24} />
            </a>
          </div>

          <div className="border-t border-slate-100 pt-8 flex justify-center gap-6 text-xs font-medium text-slate-500">
            <button onClick={() => setActiveModal('privacy')} className="hover:text-blue-600 transition-colors">{content.footer.privacy}</button>
            <button onClick={() => setActiveModal('contact')} className="hover:text-blue-600 transition-colors">{content.footer.contact}</button>
          </div>
        </div>
      </footer>

      {/* --- Modals (Pop-ups) --- */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setActiveModal(null)} />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl z-10">
              <button onClick={() => setActiveModal(null)} className="absolute top-4 left-4 p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors text-slate-500"><X size={20} /></button>
              <h3 className="text-2xl font-black text-slate-900 mb-6">{activeModal === 'privacy' ? content.modals.privacyTitle : content.modals.contactTitle}</h3>
              {activeModal === 'privacy' ? (
                <p className="text-slate-600 leading-relaxed text-sm">{content.modals.privacyText}</p>
              ) : (
                <div className="space-y-6">
                  <p className="text-slate-600 text-sm mb-6">{content.modals.contactText}</p>
                  <a href={`mailto:${CONTACT_INFO.email}`} className="flex items-center gap-4 p-4 bg-blue-50 rounded-2xl hover:bg-blue-100 transition-colors group"><div className="bg-blue-200 p-3 rounded-xl text-blue-700 group-hover:scale-110 transition-transform"><Mail size={24} /></div><div><span className="block text-xs text-blue-600 font-bold uppercase tracking-wider">Email</span><span className="text-slate-900 font-bold">{CONTACT_INFO.email}</span></div></a>
                  <a href={`tel:${CONTACT_INFO.phone}`} className="flex items-center gap-4 p-4 bg-green-50 rounded-2xl hover:bg-green-100 transition-colors group"><div className="bg-green-200 p-3 rounded-xl text-green-700 group-hover:scale-110 transition-transform"><Phone size={24} /></div><div><span className="block text-xs text-green-600 font-bold uppercase tracking-wider">Phone</span><span className="text-slate-900 font-bold" dir="ltr">{CONTACT_INFO.phone}</span></div></a>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}