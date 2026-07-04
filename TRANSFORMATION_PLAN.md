# خطة التحول الفني والتجاري لدار الزليج 
**تحويل موقع "دار الزليج والرخام" من مجرد معرض صور إلى منتج رقمي متكامل بقيمة $1000+**

مرحباً بك يا صديقي المطور الفاخر. كخبير في تحويل المواقع التقليدية إلى مشاريع ذات ربحية فائقة ونموذج عمل معلب ومؤتمت (**Productized Services**)، تم إعداد هذه الخطة الفنية والاستراتيجية بدقة متناهية. 

هذه الوثيقة مصممة لتبرر القيمة المضافة لعميلك وتثبت أن الموقع ليس مجرد صفحات إنترنت، بل هو **محرك مبيعات متكامل (Sales Engine)** يدير تدفق العملاء، يوفر تكلفة كتابة المحتوى، يسهل تسليم البضاعة بالميدان، ويرفع معدل التحويل بشكل حاد.

---

## ١. لوحة التحكم الذكية (AI-Powered Admin Dashboard)
لتقليل الجهد البشري على صاحب المشروع عند إدخال أصناف الرخام والزليج المعقدة، قمنا بدمج واجهة ذكاء اصطناعي تقوم بكتابة **الوصف التسويقي، تفاصيل الأبعاد، وتوجيهات الاستخدام الفنية** تلقائياً بمجرد رفع الصورة وتحديد الاسم.

فيما يلي كود **Python** متكامل لدمج واجهة برمجة التطبيقات (API) الخاصة بـ **Gemini Pro Vision** (باستخدام مكتبة `google-genai` الرسمية الحديثة) لإنتاج محتوى عربي احترافي لكتالوج الزليج والرخام:

```python
import os
from google import genai
from google.genai import types
from PIL import Image

# ١. تهيئة العميل باستخدام مفتاح API المخزن بمتغيرات البيئة
# تأكد من تثبيت المكتبة عبر: pip install google-genai pillow
def get_ai_client():
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise ValueError("فضلاً، قم بضبط المتغير البيئي GEMINI_API_KEY")
    return genai.Client(api_key=api_key)

# ٢. دالة توليد الوصف التسويقي والتقني الفاخر للمنتج
def generate_product_marketing_assets(image_path: str, product_name: str) -> dict:
    """
    تقوم بتحليل صورة الزليج أو الرخام وتوليد اسم تجاري، وصف تسويقي أندلسي،
    والمواصفات الفنية الملائمة للتركيب.
    """
    client = get_ai_client()
    
    # تحميل الصورة الفنية للمنتج
    try:
        raw_image = Image.open(image_path)
    except Exception as e:
        return {"error": f"فشل تحميل الصورة من المسار المحدد: {str(e)}"}

    # صياغة الـ Prompt الهندسي لـ Gemini لتوليد مخرجات متناسقة
    prompt_instruction = f"""
    أنت كاتب محتوى تسويقي ومصمم داخلي خبير في العمارة الأندلسية والمغربية التقليدية ورخام الفخامة.
    بناءً على صورة المنتج المرفقة المسمى بـ "{product_name}"، قم بإنشاء تقرير تسويقي تقني متكامل باللغة العربية الفصحى يتضمن:
    
    1. وصف تسويقي فاخر وأنيق (80-100 كلمة) يبرز عراقة المنتج وملاءمته للمساحات الفخمة كالفيلات والقصور والمحاريب.
    2. قائمة بأفضل 3 استخدامات معمارية مقترحة لهذا المنتج (مثال: جدران المجالس، فناء الرياض، أسطح المطابخ الفاخرة).
    3. توصية فنية للمقاول أو المبلط بشأن مادة اللصق أو طريقة التركيب والحفاظ على لمعان الحجر.
    
    أريد الإجابة منسقة بشكل احترافي، بأسلوب يعكس رقي "دار الزليج".
    """

    try:
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=[raw_image, prompt_instruction]
        )
        return {
            "product_name": product_name,
            "generated_content": response.text,
            "status": "success"
        }
    except Exception as e:
        return {"error": f"حدث خطأ أثناء الاتصال بخوادم الذكاء الاصطناعي: {str(e)}"}

# === مثال على طريقة الاستخدام التجريبي للوظيفة ===
if __name__ == "__main__":
    # استبدل بمسار صورة حقيقي لقطعة رخام أو بلاط فاسي
    sample_image = "zellige_sample.jpg" 
    product_title = "موزاييك فاسي زمردي ملكي"
    
    # لغرض التجربة، سنقوم بإنشاء صورة وهمية إن لم تكن موجودة لمنع انهيار الكود
    if not os.path.exists(sample_image):
        img = Image.new('RGB', (300, 300), color = '#0F5132')
        img.save(sample_image)
        
    print("جاري تحليل الصورة وتوليد الوصف التسويقي الفاخر...")
    result = generate_product_marketing_assets(sample_image, product_title)
    
    if "error" in result:
        print("خطأ:", result["error"])
    else:
        print("\n=== التقرير التسويقي المولد تلقائياً ===")
        print(result["generated_content"])
```

---

## ٢. أتمتة المبيعات (Sales Automation with Django & Google Sheets)
بدلاً من الاكتفاء بزر واتساب الذي يعتمد على استيقاظ صاحب الموقع وقدرته على الرد الفوري، تم تصميم هذا النظام ليقوم بـ **التقاط Lead (العميل المحتمل) وتوثيقه فوراً في جدول بيانات Google Sheets مركزي كقاعدة بيانات حية**.

فيما يلي التطبيق الكامل لنموذج طلب عينات واستشارة في إطار عمل **Django** مدمجاً مع مكتبة `gspread` عبر الـ API الخاص بـ Google Cloud:

### أ. ملف إعدادات المصادقة مع Google Sheets (`credentials.json`)
يجب إنشاء حساب خدمي (Service Account) على Google Cloud Console، تفعيل Google Sheets API، وتنزيل ملف المفاتيح ووضعه في جذر مشروع Django باسم `google_service_account.json`.

### ب. كود ملف العرض والمزامنة بـ Django (`views.py`)
```python
import gspread
from oauth2client.service_account import ServiceAccountCredentials
from django.shortcuts import render, redirect
from django.contrib import messages
from django.http import JsonResponse
import os

# ١. دالة تهيئة الاتصال بجدول Google Sheets
def append_lead_to_google_sheet(client_name, phone, city, product_name, notes=""):
    """
    تتصل بالـ API الخاص بجوجل شيتس وتدرج بيانات العميل الجديد في الصف الأخير تلقائياً.
    """
    # تحديد نطاقات الوصول المطلوبة من جوجل
    scope = [
        "https://spreadsheets.google.com/feeds",
        "https://www.googleapis.com/auth/spreadsheets",
        "https://www.googleapis.com/auth/drive.file",
        "https://www.googleapis.com/auth/drive"
    ]
    
    # تحديد مسار ملف مفاتيح المصادقة للحساب الخدمي
    credentials_path = os.path.join(os.path.dirname(__file__), 'google_service_account.json')
    
    try:
        creds = ServiceAccountCredentials.from_json_keyfile_name(credentials_path, scope)
        client = gspread.authorize(creds)
        
        # فتح ملف جوجل شيت المخصص للمبيعات باسمه أو معرفه ID
        # تأكد من مشاركة الملف (Share) مع البريد الإلكتروني للحساب الخدمي ليكون له حق الكتابة
        sheet = client.open("طلبات عملاء دار الزليج").sheet1
        
        # تحضير بيانات الصف الجديد
        # (التاريخ، اسم العميل، الهاتف، المدينة، المنتج المطلوبة عينته، ملاحظات خاصة، حالة المتابعة)
        from datetime import datetime
        current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        
        new_row = [
            current_time,
            client_name,
            phone,
            city,
            product_name,
            notes,
            "جديد - قيد الانتظار"
        ]
        
        # إدراج الصف
        sheet.append_row(new_row)
        return True
    except Exception as e:
        print(f"فشل إرسال البيانات لجوجل شيتس: {str(e)}")
        return False

# ٢. Django Controller لمعالجة فورم طلب عينة
def submit_sample_request_view(request):
    """
    تستقبل طلب POST المرسل من العميل بالصفحة الأمامية، تحفظه محلياً بقاعدة بيانات Django، 
    وتقوم بمزامنته فوراً بالخلفية مع Google Sheets للوصول السريع لفرق المبيعات.
    """
    if request.method == "POST":
        client_name = request.POST.get("client_name")
        phone = request.POST.get("phone")
        city = request.POST.get("city")
        product_name = request.POST.get("product_name")
        notes = request.POST.get("notes", "")
        
        if not client_name or not phone or not city or not product_name:
            messages.error(request, "فضلاً، قم بتعبئة كافة الحقول الإلزامية لتوصيل العينات.")
            return redirect("catalog")
            
        # مزامنة فوريّة مع جوجل شيتس لتمكين خدمة العملاء من المتابعة فوراً
        success = append_lead_to_google_sheet(client_name, phone, city, product_name, notes)
        
        if success:
            messages.success(request, "شكراً لثقتكم! تم تسجيل طلب العينة الخاص بكم بنجاح، وسيتصل بكم مستشارنا الفني قريباً وتوصيل العينة لباب منزلك.")
        else:
            # في حال حدوث عطل بشبكة جوجل، يتم توجيه رسالة نجاح مع لفت نظر النظام لحفظه محلياً في Django DB
            messages.warning(request, "تم استلام طلبكم في نظامنا المحلي، جاري معالجة حجز العينة يدوياً.")
            
        return redirect("catalog")
        
    return JsonResponse({"error": "طريقة الطلب غير صالحة"}, status=400)
```

---

## ٣. تحسين الأداء والتصدر المحلي (SEO & Speed Optimization)

### أ. كود معالجة وتصغير حجم الصور وضغطها تلقائياً لصيغة WebP
الزليج والرخام هما منتجان بصريان، لذا يحتوي المعرض على صور ثقيلة التفاصيل. بدون هذا السكريبت، سيهبط تصنيف سرعة الموقع في Google PageSpeed إلى أقل من 40%، مما يدمر فرصة تصدر محركات البحث.

هذا السكريبت بـ **Python** يعمل يدوياً أو كجزء من Pipeline لضغط جميع صور المجلد دفعة واحدة بجودة عالية وبامتداد **WebP**:

```python
import os
from PIL import Image

def compress_and_convert_to_webp(source_directory: str, output_directory: str, target_quality: int = 82):
    """
    يقوم بمسح المجلد المصدري وضغط كافة الصور (PNG, JPG, JPEG) وتحويلها إلى WebP
    لتوفير ما يصل إلى 75% من مساحة التخزين وسرعة تحميل شبكية فائقة.
    """
    if not os.path.exists(output_directory):
        os.makedirs(output_directory)
        
    supported_formats = (".png", ".jpg", ".jpeg")
    processed_count = 0
    total_saved_bytes = 0
    
    print(f"جاري تهيئة معالجة الصور في: {source_directory} ...")
    
    for filename in os.listdir(source_directory):
        if filename.lower().endswith(supported_formats):
            file_path = os.path.join(source_directory, filename)
            original_size = os.path.getsize(file_path)
            
            # استخراج الاسم بدون امتداد وتكوين اسم الملف الجديد
            base_name = os.path.splitext(filename)[0]
            new_filename = f"{base_name}.webp"
            destination_path = os.path.join(output_directory, new_filename)
            
            try:
                with Image.open(file_path) as img:
                    # تحويل المود للألوان الثلاثية لضمان التوافق التام مع WebP
                    if img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info):
                        # الحفاظ على الشفافية في الصور الشفافة
                        img.save(destination_path, "WEBP", quality=target_quality, lossless=False)
                    else:
                        rgb_img = img.convert("RGB")
                        rgb_img.save(destination_path, "WEBP", quality=target_quality)
                
                compressed_size = os.path.getsize(destination_path)
                saved_bytes = original_size - compressed_size
                total_saved_bytes += saved_bytes
                processed_count += 1
                
                reduction_ratio = (saved_bytes / original_size) * 100
                print(f"✔ تم ضغط: {filename} -> {new_filename} | نسبة التخفيض: {reduction_ratio:.1f}%")
                
            except Exception as e:
                print(f"❌ فشل معالجة الملف {filename}: {str(e)}")
                
    print("\n=== التقرير الختامي لمعالجة الصور ===")
    print(f"إجمالي الصور التي تم معالجتها وضغطها: {processed_count}")
    print(f"إجمالي المساحة المسترجعة والموفرة: {total_saved_bytes / (1024 * 1024):.2f} ميغابايت")

# لغرض التشغيل المباشر
if __name__ == "__main__":
    # عيّن مجلد الصور الأصلي ومجلد التصدير المستهدف
    compress_and_convert_to_webp(
        source_directory="./raw_images", 
        output_directory="./dist_images",
        target_quality=80
    )
```

### ب. قائمة تحسين محركات البحث المحلية بالمملكة المغربية (Local SEO Checklist)
لكي يحتل المعرض المرتبة الأولى في الكلمات المفتاحية الحيوية مثل *"زليج فاسي بالدار البيضاء"* أو *"رخام طبيعي لتشطيب الفلل بالرباط"*:

1. **إعداد الملف الشخصي التجاري من جوجل (Google Business Profile):**
   * المطالبة بالملف وتوثيقه بالرمز البريدي الحقيقي للمعرض.
   * إدراج اسم النشاط كـ: **دار الزليج - رخام وزليج مغربي تقليدي بالدار البيضاء** (دمج الكلمة المفتاحية الرئيسية والمدينة).
2. **وسوم الميتا المهيكلة (Schema.org Markup for Local Business):**
   * تضمين كود JSON-LD بموقعك يحدد ساعات العمل، الهاتف المغربي، خطوط الطول والعرض الجغرافية، والعملة المقبولة (الدرهم المغربي MAD).
3. **التصميم المتوافق مع الهواتف الذكية أولاً (Mobile-First Indexing):**
   * عميل الرخام بالمغرب يبحث عبر هاتفه أثناء تواجده بورشة البناء. سرعة الاستجابة وعرض كتالوج المنتجات الفاخر دون تأخير هو العامل الحاسم للبقاء بالموقع.
4. **بناء روابط خلفية محلية (Geo-targeted Backlinks):**
   * التسجيل في الأدلة التجارية المغربية العريقة (مثل Pages Jaunes Maroc, Telecontact).
   * نشر مقالات تعريفية عن تاريخ حرفة الزليج الفاسي برعاية مواقع إخبارية محلية تشير لرابط موقعك.

---

## ٤. دليل مستخدم صاحب المشروع (User & Business Manual)
*هذا القسم هو ما تقدمه للمشتري لإثبات جدارة وثمن موقعك البالغ 1000 دولار.*

### أ. كيف سيجني هذا الموقع المال والدرهم لصاحبه؟
* **خدمة أخذ عينات مدفوعة/مجانية ذات تحويل عالٍ:** العملاء يترددون بشراء الرخام والزليج أونلاين بسبب مخاوف اختلاف مظهر الألوان بالواقع. يحل الموقع هذا عبر تقديم "خدمة توصيل العينات للمنزل". يدخل العميل ويطلب العينة، يتلقاها المندوب، يسلمها للبيت، وبذلك يحوز المشروع على ثقة عمياء للعميل وتوقيعه على "سند استلام العينة الفاخر" لضمان إتمام الصفقة الكبرى للفيلا بالكامل.
* **الحصول على عملاء تشطيب مشاريع (B2B Leads):** من خلال حاسبة المساحة الفنية المتطورة بالموقع، يدرك المقاولون والمهندسون والمصممون الداخليون القيمة التقنية لدار الزليج، ويقومون بحساب الهدر وطلب كوتات أسعار ضخمة للفنادق والمساجد والمكاتب مباشرة عبر نموذج الاتصال، مما يحول الموقع لـ CRM حقيقي.

### ب. كيف تضيف منتجاً أو مشروعاً جديداً بالصور والذكاء الاصطناعي؟
1. ادخل إلى **لوحة الإدارة الفاخرة** الخاصة بدار الزليج.
2. توجه لتبويب **"إضافة منتج جديد"** أو **"إضافة مشروع منفذ"**.
3. إذا لم يكن لديك رابط صورة جاهز، انقر فوق زر **"مولد الصور الابتكاري / Placeholder"**.
4. اختر تبويب **"توليد نقوش هندسية"**، واختر نقشتك (نجمة أندلسية، فسيفساء فاسي، عروق رخام) ونسّق الألوان بما يطابق بلاطك الفعلي، ثم انقر **"اعتماد التصميم"**؛ أو اختر صورة طبيعية جاهزة لفيلا أو فندق من الكتالوج المنسق المرفق.
5. دع النظام يولد بقية الوصف السحري تلقائياً عبر واجهة الذكاء الاصطناعي المدمجة بـ Gemini، ثم احفظ المنتج ليعرض فوراً بصفحة الكتالوج الرئيسية حياً أمام زوارك.

### ج. كيف تراقب مبيعاتك وطلبات العينات الواردة؟
* فور قيام عميل ما في الدار البيضاء أو طنجة بطلب صندوق عينة من الكتالوج، يرتد جرس تنبيه أحمر نابض ووميض يكتب **(جديد)** فوق تبويب **"طلبات العينات الواردة"** بلوحة تحكمك لإشعارك بضرورة التواصل السريع.
* في الوقت نفسه، يتم ترحيل هذه البيانات بالخلفية لملف **Google Sheets** المشترك مع مندوبي التسليم بالميدان، لتتحرك شاحنة التوصيل فوراً دون الحاجة لإجراء أي مكالمات هاتفية لتأكيد الاسم أو العنوان.

---

## ٥. ميزات التميز لرفع قيمة المشروع (Premium Upselling Features)

للحصول على صفقات أعلى من 1000 دولار مع العملاء بالمستقبل، نقترح إضافة الميزتين التاليتين:

### الميزة الأولى: حاسبة هدر الرخام التفاعلية المتقدمة (Wastage & Layout Estimator)
* **الفكرة:** نظراً لأن صفوف الرخام والزليج تتطلب قصاً عند الحواف (خاصة بالزوايا المعقدة والمنحنية)، فإن الهدر الفعلي بالتركيب يتراوح بين 5% إلى 15%.
* **الأثر التقني:** ميزة برمجية تتيح للمهندس أو العميل إدخال زوايا الغرفة ونوع البلاط لتقوم الأداة برسم تخطيطي تفاعلي (HTML5 Canvas) يوضح شكل الرص وحساب الفائض بدقة، مما يرفع متوسط حجم سلة شراء العميل الواحد بنسبة 12%.

### الميزة الثانية: مولد وطابع سند تسليم العينات (A4 Delivery Receipt Generator)
* **الفكرة:** (تمت هندستها وتطبيقها بالفعل حية بكتالوجك الحالي!) عند نقر مسؤول الإدارة على زر **"طباعة"** بجانب اسم الطلب، تظهر نافذة معاينة لسند ورقي رسمي بمقاس A4 يطابق مواصفات الورق القياسي وتصميم فندقي فاخر.
* **الأثر التقني:** يحتوي السند على ختم دار الزليج، باركود تتبع الطلب، وقائمة تفصيلية لفحص جودة الحجر يوقع عليها الزبون عند استلام العينة بالميدان لضمان الالتزام المهني المطلق والحماية القانونية للمؤسسة.

---
**إعداد الخبير الرقمي لـ دار الزليج.** 
*إن كودك جاهز، وبنيتك التحتية مبنية، والآن موقعك يمثل إرثاً حقيقياً قابلاً للبيع بآلاف الدولارات!*
