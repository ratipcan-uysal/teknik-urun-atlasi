# Eski Notion kaynağı: envanter ve eşleştirme

Kontrol tarihi: 2 Ekim 2026. [TECHNICAL PM](https://ratip.notion.site/TECHNICAL-PM-361507b1354240ec859b9aa7a30e8eb0) tarayıcıda açıldı. İçindekiler başlıkları ve görünen ilk bölümlerdeki metin okundu. Sayfa uzun ve sanallaştırılmış olduğu için tüm bloklar okunamadı; erişilebilir alt sayfa veya kullanıcı export'u bulunmadı. Bu kayıt, okunmamış açıklamaları değerlendirdiği iddiasını taşımaz.

| Görünen eski içerik | Karar | Yeni yer / gerekçe |
|---|---|---|
| HTTP Status Codes and Meanings | Geliştir | `http`: kodu kullanıcıya geri dönüş ve hata matrisiyle bağla. |
| IP Nedir, DNS, SUBDOMAINS | Güncelle / birleştir | `dns-tls`: IP'nin cihaz kimliği olduğu gibi yanıltıcı basitleştirmeleri gider. |
| SOAP vs GRAPHL vs REST; GraphQL, WebSocket, gRPC, SOAP | Birleştir | `api-sozlesmesi`: kullanım bağlamı ve sözleşme kararı. İleri uygulama ayrıntısı öğrenme yolunda değil. |
| Webhook başlıkları (birkaç tekrar) | Birleştir | `api-sozlesmesi`, `api-operasyon`, `dagitik`: teslim ve tekrar davranışı. |
| Kafka, MESSAGE QUEUES, PUB-SUB | Geliştir | `dagitik`: olay, kuyruk ve kullanıcıya yansıyan asenkron durum. |
| HOW to Design Rest Apis?, EFFECTIVE API DESIGN, API GATEWAY | Birleştir | `api-sozlesmesi`, `api-operasyon`: şema, hata, sürüm ve bağımlılık. |
| WAF | Güncelle | `guvenlik`: tek ürün adı yerine tehdit modeli ve kontrol sınırı. |
| CACHE SYSTEMS (iki tekrar), REDIS, Hazelcast | Birleştir | `cache`: TTL, invalidation, kişisel veri ve fiyat örneği. |
| API PERFORMANCE CONSIDERAIONS | Geliştir | `operasyon`, `api-operasyon`: p95, timeout, kullanıcı etkisi. |
| 12 FACTOR APP | Birleştir | `altyapi`, `test-yayin`: yapılandırma ve dağıtım kararları. |
| OSI-MODEL ve yedi katmanı | Gerekçesiyle çıkar | PM başlangıç yolunda katman ezberi yerine `dns-tls` ve `http` yolculuğu. |
| FORWARD vs. REVERSE Proxy | Birleştir | `urun-akisi`, `altyapi`: bağımlılık ve yönlendirme bağlamı. |
| MICROSERVICE ARCHITECTURE/BEST PRACTICES/TECH STACK | Güncelle / birleştir | `dagitik`, `mimari-secim`: modular monolith alternatifi ve operasyon maliyeti. |
| Nginx/Cloudflare, Eureka/Zookeeper, AWS/Azure/GCP, Redis/Elasticsearch, Cassandra, Prometheus/Kubernetes teknoloji örnekleri | Gerekçesiyle çıkar / güncelle | Zaman ve bağlama bağlı ürün listeleri yerine `altyapi`, `arama`, `operasyon` karar çerçeveleri. |
| HOW DOES GIT WORK | Geliştir | `test-yayin`: branch, PR, CI, deploy/release ayrımı. |
| VISA EXAMPLE, HOW VISA EARNS MONEY | Gerekçesiyle çıkar | Şirket/gelir ayrıntıları bu eğitimin teknik karar çekirdeği değil; `odeme` sentetik vaka. |
| JWT token nedir? | Güncelle | `kimlik-yetki`: token biçimi kimlik/yetki garantisi değildir. |
| TYPES OF MEMORIES | Gerekçesiyle çıkar | PM öğrenme yolunda donanım sınıflandırması yerine `cache`, veri ve uygulama belleği bağlamı. |
| Design TinyURL | Gerekçesiyle çıkar | Mülakat mimarisi yerine dört tekrar eden ürün vakası. |
| How slack decides to send notification | Geliştir | `kampanya` vakası: platforma bağımlı anlatım yerine izin, teslim ve ölçüm. |
| Untitled | Karar verilemedi | Başlık içerik belirtmiyor; blok metni doğrulanamadı. |
| USEFUL ARTICLES, iki GitHub system design bağlantısı | Güncelle | İddia bazlı birincil kaynak envanteri. Eski dış bağlantıların içerik uygunluğu ayrı doğrulanmadı. |

Eski sayfada görünen bir dış yazı bağlantısı: `https://blog.ehoneahobed.com/what-happens-when-you-type-wwwgooglecom-in-your-browser-and-press-enter`. GitHub bağlantıları: `https://github.com/ByteByteGoHq/system-design-101#why-is-redis-so-fast`, `https://github.com/karanpratapsingh/system-design`. Bunlar yeni derslerin kaynak dayanağı olarak kullanılmadı; erişim ve iddia kontrolü yapılmadı.
