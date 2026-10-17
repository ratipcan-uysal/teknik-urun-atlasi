# Doğrulama raporu — 2 Ekim 2026

## Çalıştırılan kontroller

- `node scripts/validate.mjs`: **geçti**. 35 benzersiz ders, 4 vaka, 33 kaynak, 16 kapsam alanı; zorunlu alanlar, ön koşul döngüsü, iç ders bağlantıları, vaka eşleştirmesi, kaynak kimlikleri ve quiz yanıt aralığı kontrol edildi.
- `node --check dist/app.js` ve içerik modülleri: **geçti**.
- Yerel HTTP sunucusunda `curl -I http://127.0.0.1:8765/`: **200 OK**.
- Masaüstü tarayıcıda ana sayfa ve ders sayfası açıldı; kaynak, ön koşul ve ilgili vaka linkleri görünür: **geçti**.
- Türkçe/İngilizce ders araması: `idempotency` sonuç verdi; eşleşmeyen sorgu boş durum gösterdi; sonra `OAuth` sorgusuyla sonuçlara geri dönüldü: **geçti**.
- Quiz: doğru seçenek seçilip açıklamalı yanıt gösterildi: **geçti**.
- Tamamlama ve yer imi: ders işaretlendi, sayfa yenilendi, her ikisi de cihazda korundu: **geçti**.
- Beş simülasyonun tümü yüklendi; timeout/yeni anahtar ve durum makinesi geçersiz geçiş dalları çalıştırıldı: **geçti**.
- Mobil 390 px: ana sayfa ve simülasyonlar yatay belge taşması olmadan açıldı; mobil menü çalıştı: **geçti**.
- Mobil 390 px kapsam tablosu ilk kontrolünde yatay taşma vardı; tabloya iç kaydırma alanı eklenip tekrar test edildi: belge `scrollWidth = 390`, viewport `390`: **düzeltildi**.
- Tablet 768 px AI değerlendirme dersinde belge `scrollWidth = 768`: **geçti**.
- Kaynak URL'leri resmi siteler ve özgün araştırma sayfalarında web aracıyla açıldı; `docs/source-inventory.csv` durum alanı her kaynak için ayrı kaydedildi. Notion tarayıcıda kısmen okundu. MDN durum kodu sayfası yönleniyor.

## İçerik incelemesinde düzeltilenler

- HTTP 4xx sınıfı “kullanıcı hatası” gibi sunulmadı; ağ hatası/HTTP yanıtı ve işlem sonucunun belirsizliği ayrıldı.
- HTTPS'in koruduğu aktarım ve alan adı kimliği, iş doğruluğu/yetkiden ayrıldı.
- Ödeme idempotency anahtarının tek başına tam olarak bir kez yürütme garantisi olmadığı belirtildi.
- CAP sloganı bağlamsız mimari reçete olarak kullanılmadı.
- AI için kaynak bulma, kaynak kullanma, araç yetkisi, değerlendirme ve maliyet ayrı sorulara ayrıldı.
- Model ve servis fiyatları zamansız bilgi olarak yazılmadı; simülatör varsayımları açık.

## Bilinen sınırlar

- Notion sayfasının bütün blokları ve olası alt sayfaları okunamadı; paragraf düzeyi koru/çıkar kararı verilmedi. Ekli export yoktu. Başlık düzeyi eşleştirme `docs/notion-mapping.md` içinde.
- Dış bağlantıların gelecekteki sürekliliği garanti edilemez. Kaynak başlığı/URL/içerik desteği 2 Ekim 2026'da gözden geçirildi; yeni sürümde yeniden kontrol gerekir.
- Çok sayıda ileri konu PM/PO karar düzeyinde işlendi. SOAP/gRPC/Kubernetes uygulama eğitimi, istatistiksel güç hesabı ve hukuk yorumları kapsam dışı.
- Baskı stili ve reduced-motion CSS eklendi; fiziksel çıktı veya tüm tarayıcılarda görsel baskı testi çalıştırılmadı.
- Ekran okuyucu cihazıyla tam kullanım testi çalıştırılmadı. Semantik yapı, etiketler, klavye odağı ve responsive görünüm gözle incelendi.
- Cihazlar arası ilerleme eşitlemesi yok; yalnız localStorage.

## 3 Ekim 2026 — İlk beş dersin yeniden yazımı

- Açılış sırasındaki `urun-akisi`, `dns-tls`, `http`, `api-sozlesmesi`, `api-operasyon` dersleri ayrı öğretim metnine dönüştürüldü. Her derste 5–6 bölüm, özgün hareketli HTML şema, karar çerçevesi, çalışılmış örnek, uygulama görevi, teslim ölçütleri ve açıklamalı çözüm var.
- İçerik doğrulaması: ilk beş dersin her biri en az 500 sözcüklük bölüm metni, en az 5 bölüm, en az 3 uygulama ölçütü ve en az 2 paragraflık örnek cevap içeriyor. `node scripts/validate.mjs` geçti: 35 ders, 4 vaka, 39 kaynak.
- Yeni kaynaklar RFC 8446, RFC 6585, MDN Performance Timing, Stripe Pagination/Webhooks ve AWS retry rehberidir. Resmî sayfalar 3 Ekim 2026'da açıldı; eski kaynakların önceki kontrol tarihi korunuyor.
- Yerel önizlemede beş dersin tümü masaüstü ve 390 px mobil görünümde açıldı; belge yatay taşması görülmedi. Beşinde de bölüm ve uygulama alanı doğrulandı. Ders içi bölüm bağlantısı URL rotasını bozmadan kaydırdı; API operasyon dersinin mini değerlendirmesi doğru yanıtı gösterdi.
- Hareketli şemalar yalnız CSS ile oluşturuldu; `prefers-reduced-motion` etkinliğinde hareket süreleri sıfıra yakın düşürülüyor. Şemaların her birinde metinsel açıklama ve görünür etiketler var.

## 3 Ekim 2026 — 06–20 numaralı dersler

- `kimlik-yetki` ile `api-dene` arasındaki 15 dersin her birine beş özgün anlatım bölümü, bir uygulama görevi, ölçütlü örnek cevap, hatırlama kartı ve dört adımlı hareketli şema eklendi. Şema sonunda konuya özgü ürün kararı gösteriliyor. Görsel hareket HTML/CSS ve tarayıcı zamanlayıcısıyla çalışır; dış GIF dosyası kullanılmaz.
- Hareketli şemalarda adımlar elle seçilebiliyor; otomatik akış durdurulup yeniden başlatılabiliyor. Azaltılmış hareket tercihinde otomatik oynatma kapalı. Her adımın metni animasyon olmadan da görünür.
- `node --check` yeni içerik modülleri ve uygulamada, `node scripts/validate.mjs` tüm sitede geçti: 35 ders, 4 vaka, 49 kaynak, 16 kapsam alanı. 15 yeni dersin tümünde dört şema adımı, hatırlama sorusu, uygulama görevi ve geçerli kaynak kimlikleri kontrol edildi.
- Yerel tarayıcıda 15 rotanın tamamı 390 piksel mobil görünümde açıldı: kapak şeması, hareketli şema ve hatırlama kartı görüldü; belge yatay taşması olmadı. Masaüstünde durdurma, yeniden oynatma ve adım ilerlemesi gözlendi.
- PostgreSQL, Kafka, Redis, Playwright, OpenTelemetry ve Google SRE'nin birincil kaynakları ilgili derslere eklendi. Anlatımdaki vakalar öğretim için kurgusaldır; bağlantıların gelecekteki erişilebilirliği garanti edilemez.
