# System Design Master

Sistem tasarımında bilmen gerekenleri açıklama, gerçek hayat örneği ve kullanım koşuluyla bir araya getiren Türkçe bilgi kontrol listesi. İlgili maddelerde sık hata ve karar soruları da bulunur.

[Web sürümünde oku](https://ratipcan-uysal.github.io/teknik-urun-atlasi/) · [Tam PDF’yi indir](system-design-master-205.pdf)

29 Ekim 2026 sürümü: **205 kavram, 19 teknik şema, 12 tablo ve 108 sayfa**. 101 kaynak bağlantısının tamamı korunmuştur; bunlar 73 farklı URL’ye gider. Başlıklardan oluşan tıklanabilir içindekiler, PDF yer imleri, her sayfada dizine dönüş bağlantısı ve aranabilir Türkçe metin vardır. Teknik şemalar açıklamalarıyla birlikte yatay sayfalardadır.

Madde numaraları 001–205 arasındadır. Bölüm numarası veya zorunlu öğrenme sırası değildir. Okumayı konuya göre sürdürebilirsin:

- Temeller: 001–052
- Üretimde çalışan sistemler: 053–129
- İleri sistem tasarımı: 130–177
- Performans ve hız: 178–197
- Ek mimari ve ürün kararları: 198–205
- Bütüncül sistem örnekleri, kapasite/maliyet hesapları, sözlük ve kaynakça

[Medium sürümü](https://medium.com/p/486f5d2d20dc)

Metin ve şemalar yapay zekâ desteğiyle hazırlanmıştır. Ürün senaryoları temsili, hesap örneklerinin trafik/kapasite/fiyatları varsayımdır. Şemalar sadeleştirilmiş öğretim modelleridir. Bu PDF tarihli bir sürümdür; Page veya Medium değişiklikleri dosyaya otomatik aktarılmaz.

Teknik Ürün Atlası’nın 35 derslik sitesi ve kaynak dosyaları depoda korunmaktadır. Bu rehber ayrı bir bilgi kontrol listesidir.

Bu sürümde WAF, 12 Factor, API Gateway, MFA/TOTP, Redis veri yapıları, bildirim politikası, Kubernetes bileşenleri ve kartlı ödeme aktörleri eklendi. JWT oturumu açıklaması güncellendi; AWS, Microsoft, OWASP, Redis, Slack, Kubernetes ve Visa birincil kaynakları kullanıldı.

## Web sürümünün bakımı

6 Kasım 2026 tarihli web sürümü PDF ile aynı 205 maddeyi, 19 şemayı, 12 tabloyu ve kaynakları taşır. `docs/index.html` tam metni, `docs/system-design-master/reader.css` görünümü, `reader.js` arama ve gezinmeyi içerir. Görseller `assets/` altında WebP olarak saklanır. `.nojekyll` ile statik dosyalar doğrudan servis edilir; paket kurulumu veya derleme gerekmez. İçerik değişikliklerinde web, PDF ve Medium sürümlerini ayrı doğrulayın. `dist/` altındaki önceki 35 derslik site ve mevcut Sites hosting ayarı bağımsızdır.
