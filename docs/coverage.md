# Kapsam matrisi — 2 Ekim 2026

3 Ekim 2026 güncellemesi: açılış sırasındaki ilk 20 ders kapsamlı anlatım, konuya özgü şema, uygulama ve kaynaklarla genişletildi. 21–35 numaralı dersler karar düzeyinde özet anlatımdadır. Aşağıdaki “İşlendi” işareti bütün derslerin eşit derinlikte olduğu anlamına gelmez.

Durum **işlendi**: konu özgün ders metni veya vaka içinde anlatılır. **Özet**: PM/PO kararına yetecek kısa çerçeve var; uygulama derinliği sınırlı. Bu matris, başlık görünmesiyle tam uzmanlık iddia etmez.

| Alan | Durum | Dersler / vakalar | Sınır |
|---|---|---|---|
| A Yazılım ve internet | İşlendi | `urun-akisi`, `dns-tls`, `http`, `network-incele` | Transport ve OSI katmanları PM ihtiyacı ölçüsünde. |
| B API ve entegrasyon | İşlendi | `api-sozlesmesi`, `api-operasyon`, `tekrar`, `api-dene`, `kimlik-yetki` | SOAP/WebSocket teknik uygulaması derinleşme referansı düzeyinde. |
| C Veri ve veritabanları | İşlendi | `veri-modeli`, `veri-islemleri`, `sql` | NoSQL ve analitik mimarisi karar düzeyinde. |
| D Veri modelleme hataları | İşlendi | `veri-tuzaklari`, `durum-modeli`, `akis-yaz` | Para ve tarih örnekleri kurgusal. |
| E Mimari ve dağıtık sistemler | İşlendi | `dagitik`, `cache`, `mimari-secim`, `tekrar` | CAP uygulama mimarisine otomatik reçete yapılmadı. |
| F Bulut ve altyapı | İşlendi | `altyapi`, `kesif`, `operasyon` | Kubernetes operatör eğitimi kapsam dışı. |
| G Web ve mobil | İşlendi | `urun-akisi`, `mobil-yayin`, `test-yayin`, `guvenlik` | Mağaza süreçlerinin sürüme bağlı ekran adımları verilmedi. |
| H Arama | İşlendi | `arama`, `ai-rag` | Arama değerlendirmesi örnek setle yapılır. |
| I Teknik gereksinim | İşlendi | `durum-modeli`, `akis-yaz`, `bitirme` | Performans eşiği gerçek baz çizgiye göre seçilir. |
| J Teknik keşif ve karar | İşlendi | `kesif`, `mimari-secim`, `altyapi` | Build/buy için evrensel sonuç yok. |
| K Geliştirme/test/yayın | İşlendi | `test-yayin`, `mobil-yayin`, `bitirme` | CI sağlayıcı kurulumu kapsam dışı. |
| L Güvenlik/gizlilik | İşlendi | `kimlik-yetki`, `guvenlik`, `ai-guvenlik` | Hukuki yükümlülük iddiası verilmez. |
| M Performans/işletim | İşlendi | `operasyon`, `hata-incele`, `altyapi` | SLO sayıları sentetik örneklerdir. |
| N Analitik/deney | İşlendi | `olcum`, `ai-degerlendirme`, `bitirme` | İstatistiksel güç hesaplama derinleştirilmedi. |
| O Pratik araçlar | İşlendi | `network-incele`, `api-dene`, `sql`, `hata-incele`, `akis-yaz` | Üretim hesabı/verisi gerekmez. |
| P AI engineering | İşlendi | `ai-problem`, `ai-temel`, `ai-rag`, `ai-degerlendirme`, `ai-guvenlik`, `ai-izleme`, `ai-cikti-incele` | Model/pazar fiyatı verilmez; simülasyon varsayımsal. |

## Bilinçli sınırlar

- Teknik PM/PO rolü tek bir şirketin görev dağılımıyla tanımlanmadı.
- gRPC, SOAP, WebSocket, Kafka, Redis ve Kubernetes için komut/konfigürasyon öğretimi yok; sistem ve ürün kararı bağlamı var.
- Hukuki durumlar ülke ve tarih gerektirdiği için teknik gizlilik ilkelerinden ayrı tutuldu.
- Gerçek üretim verisi, ödeme hesabı ve ücretli AI anahtarı kullanılmadı.
