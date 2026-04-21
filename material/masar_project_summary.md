# Masar Landing Page - Project Summary

هذا الملف يحتوى على ملخص شامل لكل ما تم إنجازه في مشروع "مسار" ليتم استخدامه كمرجع مباشر (Context) لأي شات جديد دون الحاجة لقراءة الأكواد من الصفر.

## 1. تفاصيل المشروع والتقنيات (Tech Stack)
- **الإطار العام:** React (Vite)
- **التصميم:** Tailwind CSS v4
- **الأيقونات:** `react-icons/hi2` (Heroicons 2)
- **لغة الموقع:** عربية (RTL Direction Configuration)
- **الملف الرئيسي للتنسيقات:** `index.css` (تم التخلص من `App.css` القديم لتفادي تعارض الـ Tags مع Tailwind Preflight).

## 2. القياسات وألوان النظام (Design System)
- **أقصى عرض للحاويات (Container Width):** `max-w-[1123px]` ثابت في كافة أقسام الصفحة.
- **الألوان الأساسية:**
  - `Primary Blue:` `#146EEC` (ويستخدم للتركيز وللأزرار الأساسية)
  - `Dark Navy (Background):` `#101822` / `#162033`
  - `Secondary Card BG:` `#1E293B`
- **التأثيرات (Animations):** تم إعداد `pulse-glow` لأزرار الـ CTA و تأثيرات `hover:-translate-y` للبطاقات، بالإضافة لحركات `Scale` خفيفة للصور.

## 3. تفاصيل المكونات المطورة (Components Architecture)
الموقع مقسم لمجموعة Sections تعمل بشكل تسلسلي في `App.jsx`:

### 1- `HeroSection.jsx`
- يحتوى على "شارة" علوية (مستقبل مخصص لك) مع أيقونة 🚀.
- ترتيب النصوص بالملي كما في Figma، زر أساسي "ابدأ رحلتك" مزود بـ Arrow وزر ثانوي "كيف يعمل مسار" مزود بأيقونة Play دائرية.

### 2- `FeaturesCards.jsx`
- يحتوى على 3 بطاقات للخدمات (اكتشف، اتبع، صل للاحتراف) بتنسيق Inline-Styles لتجنب تداخل الـ CSS.
- زر سفلي "ابدأ رحلتك" مدمج بداخله سهم جانبي، ونص توضيحي بالأسفل "تستغرق 5 دقائق للإكمال".

### 3- `JourneySteps.jsx` (الأصعب والأكثر دقة)
- **المخطط (Zig-Zag):** يعتمد على شبكة متعرجة، يتم التحكم بها عبر Flexbox وفي بيئة الـ RTL:
  - للوضع في اليمين نستخدم: `justify-start`.
  - للوضع في اليسار نستخدم: `justify-end`.
- **الأسهم (S-Curve SVGs):** خطوط متقطعة (Dashed) تربط بين النصوص بدقة وتعمل بشكل Absolute Position من منتصف اليمين إلى اليسار والعكس.
- **الصور (Image Mapping):**
  - خطوة 1 (يمين): `step1.png`
  - خطوة 2 (يسار): `step2.png` 
  - خطوة 3 (يمين): `step3.png`
  - خطوة 4 (يسار): `step4.png`
  - خطوة 5 (يمين): `step5.png`

### 4- `CTASection.jsx`
- يعتمد على صورة خلفية مخصصة (`url('/images/Section.png')`).
- ارتفاع دقيق `minHeight: 388px`، و`borderRadius: 40px`.
- تم استخدام `isolation: isolate` في القسم الخارجي لمنع أي CSS Bleed (تسرب تنسيقات) من العناصر المجاورة (مثل Border Gradients).

## 4. ملاحظات هامة للشاتات القادمة (For AI Context)
1. **لا تضيف Container CSS Resets:** تـجنّب وضع أي Base CSS يحتوي على `* { margin:0; padding:0; }` بشكل عشوائي، Tailwind v4 مُعد مسبقاً لذلك في `index.css`.
2. **اتجاه الـ RTL:** إذا طلب المستخدم وضع عنصر في "اليمين"، تذكر أن تستخدم `ml-` (Margin Left) للإبعاد بدلاً من `mr-` أو الانتباه لـ `justify-start`.
3. **عدم المساس بالـ SVG Arrows:** أسهم قسم `JourneySteps` حساسة جداً لأي تغيير في العرض أو المسافات العمودية (`space-y`).

---

**طريقة الاستخدام للشات الجديد:**
قم بنسخ محتوى هذا الملف وإلصاقه في بداية المحادثة الجديدة وطلب:
 *"Please review this project summary context and continue working with me on..."*
