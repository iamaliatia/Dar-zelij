# دليل الانتقال إلى Django (Dar Zellige Django Guide)

يسرنا تقديم دليل الانتقال البرمجي الكامل لتحويل موقع **دار الزليج** من صفحة ثابتة إلى تطبيق ويب متكامل ومبني باحترافية على إطار عمل **Django** (بايثون).

---

## 1. هيكلية البيانات (Django Models)

في ملف `models.py` الخاص بتطبيقك (مثلاً `catalog/models.py`)، نقوم بتعريف الجداول كالتالي، مع مراعاة الحقول المطلوبة ومصادقة البيانات:

```python
from django.db import models
from django.core.validators import MinValueValidator

class Category(models.Model):
    name = models.CharField(max_length=100, verbose_name="اسم التصنيف")
    slug = models.SlugField(unique=True, verbose_name="رابط فريد (Slug)")

    class Meta:
        verbose_name = "تصنيف"
        verbose_name_plural = "التصنيفات"

    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=200, verbose_name="اسم المنتج")
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="products", verbose_name="التصنيف")
    price = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0.0)], verbose_name="السعر (بالدرهم)")
    unit = models.CharField(max_length=50, default="م²", verbose_name="الوحدة (مثال: م² أو قطعة)")
    description = models.TextField(verbose_name="وصف المنتج")
    dimensions = models.CharField(max_length=100, verbose_name="الأبعاد (مثال: 10×10 سم)")
    stock_available = models.BooleanField(default=True, verbose_name="توفر المخزون")
    image = models.ImageField(upload_to="products/%Y/%m/", verbose_name="صورة المنتج الرئيسية")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="تاريخ الإضافة")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="تاريخ التحديث")

    class Meta:
        verbose_name = "منتج"
        verbose_name_plural = "المنتجات"
        ordering = ["-created_at"]

    def __str__(self):
        return self.name


class Project(models.Model):
    PROJECT_TYPES = [
        ('villa', 'فيلا'),
        ('hotel', 'فندق'),
        ('mosque', 'مسجد'),
        ('office', 'مكتب إداري'),
    ]
    name = models.CharField(max_length=200, verbose_name="اسم المشروع")
    project_type = models.CharField(max_length=50, choices=PROJECT_TYPES, verbose_name="نوع المشروع")
    client = models.CharField(max_length=150, verbose_name="العميل")
    completion_date = models.DateField(verbose_name="تاريخ الإنجاز")
    description = models.TextField(blank=True, verbose_name="تفاصيل المشروع")
    image = models.ImageField(upload_to="projects/%Y/%m/", verbose_name="الصورة الرئيسية للمشروع")

    class Meta:
        verbose_name = "مشروع"
        verbose_name_plural = "المشاريع"
        ordering = ["-completion_date"]

    def __str__(self):
        return f"{self.name} - {self.client}"


class SampleInquiry(models.Model):
    STATUS_CHOICES = [
        ('new', 'جديد'),
        ('processing', 'قيد المعالجة'),
        ('completed', 'تم التواصل والتسليم'),
    ]
    client_name = models.CharField(max_length=150, verbose_name="اسم العميل")
    phone = models.CharField(max_length=20, verbose_name="رقم الهاتف")
    city = models.CharField(max_length=100, verbose_name="المدينة")
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True, verbose_name="المنتج المطلوب")
    notes = models.TextField(blank=True, verbose_name="ملاحظات إضافية")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='new', verbose_name="حالة الطلب")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="تاريخ الطلب")

    class Meta:
        verbose_name = "طلب عينة / استفسار"
        verbose_name_plural = "طلبات العينات والاستفسارات"
        ordering = ["-created_at"]

    def __str__(self):
        return f"طلب من {self.client_name} - {self.city}"
```

---

## 2. إدارة وتعديل الصور تلقائياً (Image Compression)

لرفع صور عالية الدقة (High-resolution) مع ضغطها تلقائياً عند الحفظ لتسريع التصفح، نستخدم مكتبة **Pillow** البرمجية لإعادة ضبط الحجم والضغط بصيغة **WebP** الحديثة أو **JPEG** مضغوط بنسبة جودة 80% (وهي النسبة المثالية بشرياً وبصرياً).

نقوم بتجاوز دالة الحفظ `save()` في الـ Model كالتالي:

```python
import sys
from io import BytesIO
from PIL import Image
from django.core.files.uploadedfile import InMemoryUploadedFile

# دالة مساعدة لضغط الصور
def compress_and_optimize_image(image_field, max_width=1200, quality=80):
    if not image_field:
        return
        
    img = Image.open(image_field)
    
    # تحويل الصورة إلى RGB إذا كانت بصيغة RGBA (لحفظها كـ JPEG)
    if img.mode != 'RGB':
        img = img.convert('RGB')
        
    # تعديل المقاسات مع الحفاظ على النسبة والتناسب
    if img.width > max_width:
        output_size = (max_width, int((max_width / img.width) * img.height))
        img = img.resize(output_size, Image.Resampling.LANCZOS)
        
    # ضغط وحفظ الصورة في الذاكرة مؤقتاً
    output_io_stream = BytesIO()
    img.save(output_io_stream, format='JPEG', quality=quality, optimize=True)
    output_io_stream.seek(0)
    
    # استبدال الملف المرفوع بالملف المضغوط الجديد
    image_field = InMemoryUploadedFile(
        output_io_stream,
        'ImageField',
        f"{image_field.name.split('.')[0]}.jpg",
        'image/jpeg',
        sys.getsizeof(output_io_stream),
        None
    )
    return image_field

# مثال على تطبيقها في موديل المنتج
class Product(models.Model):
    # ... بقية الحقول ...
    image = models.ImageField(upload_to="products/")

    def save(self, *args, **kwargs):
        # نقوم بضغط الصورة قبل حفظ الموديل في قاعدة البيانات
        if self.image:
            self.image = compress_and_optimize_image(self.image, max_width=1000, quality=82)
        super().save(*args, **kwargs)
```

---

## 3. الواجهة الخلفية الافتراضية (Django Admin Panel)

يمكن لصاحب الشركة إدارة كافة المنتجات والمشاريع بسهولة تامة من خلال لوحة تحكم Django الفاخرة. نقوم بتنسيقها لتبدو احترافية عبر تعديل `admin.py`:

```python
from django.contrib import admin
from .models import Category, Product, Project, SampleInquiry

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)}

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'unit', 'dimensions', 'stock_available')
    list_filter = ('category', 'stock_available')
    search_fields = ('name', 'description')
    list_editable = ('price', 'stock_available') # تعديل سريع ومباشر من الجدول!

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('name', 'project_type', 'client', 'completion_date')
    list_filter = ('project_type', 'completion_date')
    search_fields = ('name', 'client')

@admin.register(SampleInquiry)
class SampleInquiryAdmin(admin.ModelAdmin):
    list_display = ('client_name', 'phone', 'city', 'product', 'status', 'created_at')
    list_filter = ('status', 'city', 'created_at')
    search_fields = ('client_name', 'phone', 'notes')
    readonly_fields = ('created_at',)
    list_editable = ('status',)
```

---

## 4. منطق حاسبة الكمية والسعر الإجمالي (API View)

لجعل حاسبة الكمية تتصل بالخادم وتأتي بأسعار المنتجات الفعلية وتحسب السعر الإجمالي بدقة شاملاً نسبة الهدر:

```python
from django.http import JsonResponse
from django.views.decorators.http import require_GET
from .models import Product

@require_GET
def calculate_quote_api(request):
    product_id = request.GET.get('product_id')
    length = float(request.GET.get('length', 0))
    width = float(request.GET.get('width', 0))
    waste_percent = float(request.GET.get('waste', 10)) # الافتراضي 10%
    tile_size_cm = float(request.GET.get('tile_size', 30)) # مقاس البلاطة بالسم

    area = length * width
    area_with_waste = area * (1 + (waste_percent / 100))
    
    # حساب عدد البلاطات المطلوبة تقريباً
    tile_area_m2 = (tile_size_cm / 100) * (tile_size_cm / 100)
    total_tiles = int(area_with_waste / tile_area_m2) + 1 if tile_area_m2 > 0 else 0

    response_data = {
        'area': round(area, 2),
        'area_with_waste': round(area_with_waste, 2),
        'total_tiles': total_tiles,
    }

    # إذا تم إرسال منتج محدد، نأتي بسعره ونحسب السعر الإجمالي
    if product_id:
        try:
            product = Product.objects.get(id=product_id)
            # نفترض أن السعر مخزن للمتر المربع
            total_price = float(product.price) * area_with_waste
            response_data.update({
                'product_name': product.name,
                'price_per_unit': float(product.price),
                'unit': product.unit,
                'total_price': round(total_price, 2)
            })
        except Product.DoesNotExist:
            response_data['error'] = 'Product not found'

    return JsonResponse(response_data)
```

---

## 5. نشر واستضافة التطبيق (Deployment Strategy)

للحصول على تطبيق سريع، آمن ومستقر، نقترح البنية التحتية التالية:

1. **الخادم السحابي (Web Host):** 
   - خيار ممتاز واقتصادي: **DigitalOcean droplets** أو **Hetzner** مع تثبيت Docker.
   - خيار Serverless سهل وسريع: **Google Cloud Run** أو **Render** للـ Web container.
2. **قاعدة البيانات:** **PostgreSQL** (سواء مدارة بالكامل أو مثبتة على الخادم مع تشفير وحفظ دوري للبيانات).
3. **الملفات الساكنة والمرفوعات (Media & Static Files):**
   - لا ينصح أبداً بحفظ الصور المرفوعة من قبل الإدارة على خادم الويب مباشرة (حيث قد تحذف في البيئات السحابية المؤقتة).
   - الحل الأمثل: ربط Django بـ **AWS S3** أو **Google Cloud Storage** أو **Cloudflare R2** باستخدام حزمة `django-storages` لتخزين دائم وسريع للصور.
4. **توصيل المحتوى (CDN):** ربط النطاق بـ **Cloudflare** لتوفير حماية وجدار حماية ناري (WAF) وتخزين مؤقت عالي السرعة لصور المنتجات والمشاريع في كافة دول العالم العربي.
5. **الملقم (Application Server):** تشغيل Django باستخدام **Gunicorn** خلف خادم **Nginx** يعمل كموزع حمولات (Reverse Proxy) ومثبت عليه شهادة أمان SSL مجانية من **Let's Encrypt**.
