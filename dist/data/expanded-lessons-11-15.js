// Ders 11–15. Ürün örnekleri öğretim için kurgulanmıştır.
export const expanded1115={
  tekrar:{
    number:'11',deck:'Bir ağ denemesini bir iş niyetiyle karıştırmadan tekrar tasarlayın.',
    thesis:'Timeout “yanıt görülmedi” demektir; idempotency aynı niyetin yeniden denenmesinde ikinci etkiyi önlemeye çalışan sözleşmedir.',
    sources:['rfc9110','stripe','awsRetry'],
    motion:{mode:'retry',title:'Yanıt kaybolunca aynı niyeti izle',caption:'Aynı anahtarın ömrü, parametre eşleşmesi ve sunucu atomikliği sözleşmede açık olmalıdır.',steps:[
      {title:'Niyet',detail:'Sipariş kimliği ve tekrar anahtarı oluşur.'},
      {title:'İşlem',detail:'Sunucu ödeme girişimini başlatır.'},
      {title:'Kayıp yanıt',detail:'İstemci sonucu görmez.'},
      {title:'Güvenli tekrar',detail:'Aynı niyetin sonucu aranır.'}
    ]},
    memory:{hook:'Yanıt yok ≠ işlem yok. Tekrar isteği ≠ yeni niyet.',question:'POST isteği 10 saniyede cevap vermedi. Kullanıcı yeniden basınca ne korunmalı?',answer:'Tek iş niyetinin kimliği korunmalı; aynı niyeti güvenli tekrar veya durum sorgusuyla doğrulayan sunucu sözleşmesi kullanılmalıdır. Yeni bir sipariş açmak ayrı karar olmalıdır.'},
    practice:{brief:'Bir paket satın alma isteği sunucuda işlendi; mobil ağ yanıtı kaybetti. Kullanıcı iki kez daha dokundu. İsteklerin ve ekranın davranışını yazın.',deliverables:['Tek iş niyeti ve üç ağ denemesinin ayrı kimlikleri','Timeout, retry ve durum sorgusu sırası','Anahtarın süresi dolduğunda güvenli davranış'],model:[
      'İlk dokunuş bir sipariş niyeti ve idempotency anahtarı üretir. Yanıt kaybında aynı anahtarla sınırlı tekrar yapılır veya sipariş kimliğiyle durum sorgulanır. Üç dokunuş üç ayrı hak açmaz. İstemci “sonuç doğrulanıyor” durumunu korur.',
      'Sağlayıcıya göre idempotency sonucu ve anahtar saklama süresi farklı olabilir. Bu pencere aşıldığında aynı anahtarı körlemesine tekrar göndermek yerine kalıcı sipariş/sağlayıcı referansından uzlaşma yapılır. Retry üst sınırı ve bekleme planı açık yazılır.'
    ]},
    chapters:[
      {label:'01 / Belirsizlik',title:'Timeout, işlemin yapılmadığını söylemez',paragraphs:[
        `İstek sunucuya hiç ulaşmamış olabilir; sunucu işlemeye başlamış ama yanıtı kaybolmuş olabilir; sağlayıcı ödemeyi tamamlamış, bizim servis henüz bunu kaydetmemiş olabilir. Bu üç dünya istemcide aynı “zaman aşımı” mesajını üretir. Ürün akışı ağ hatasını iş sonucuyla eşitlememelidir. Kullanıcıya kesin başarısızlık demeden önce kalıcı bir iş referansıyla durumun doğrulanması gerekir.`,
        `HTTP yöntemlerinin idempotent semantiği, aynı isteğin yinelenmesinin amaçlanan etkisini açıklar; ancak gerçek ürün işlemi birden çok sistem sınırını aşabilir. POST genelde idempotent değildir. Bu yüzden ödeme gibi yan etkili istekte bir iş niyeti kimliği veya idempotency anahtarı tasarlanır. Anahtar yalnız istemcide etiket değil, sunucuda tutarlı kayıt ve eşzamanlı istek kontrolü gerektirir.`
      ],source:'rfc9110'},
      {label:'02 / Sözleşme',title:'Aynı anahtar neyi garanti eder?',paragraphs:[
        `Stripe’ın API örneğinde idempotency anahtarıyla yapılan ilk isteğin durum kodu ve gövdesi kaydedilir; aynı anahtarlı uygun tekrar aynı sonucu alabilir. Bu sağlayıcıya özgü sözleşmedir. Sonucun hata kodu olması bile kaydedilebilir; doğrulama hatası veya eşzamanlı çakışma gibi bazı durumlarda sonuç kaydı oluşmayabilir. Anahtarın ne kadar saklandığı ve farklı parametreyle kullanıldığında ne olduğu okunmalıdır.`,
        `Ürün tarafında daha güçlü değişmez “bir sipariş için en fazla bir hak” olabilir. Bunu yalnız API anahtarına yüklemek tehlikelidir: anahtar saklama penceresi biter, başka servis aynı işlemi başlatır veya dış sağlayıcı farklı sonuç tutar. Kalıcı sipariş kimliği, benzersizlik kuralı, işlem durumu ve uzlaşma yolu birlikte tasarlanır. “Exactly once” vaadi ancak hangi sınır içinde geçerli olduğu açıklanınca anlamlıdır.`
      ],source:'stripe'},
      {label:'03 / Retry',title:'Yeniden deneme kapasiteyi de tüketir',paragraphs:[
        `Geçici bağlantı hatasında retry yararlı olabilir; yetkisizlik veya geçersiz girdi gibi kalıcı hatada aynı istek tekrar edilmemelidir. Deneme sayısı, toplam süre, artan bekleme ve jitter belirlenir. AWS’nin güvenilirlik kılavuzu, sınırsız veya birden çok katmanda yinelenen retry’nin zaten zorlanan servise ek yük bindirebildiğini vurgular. SDK zaten tekrar yapıyorsa uygulama katmanındaki tekrarlarla çarpılma riski hesaplanır.`,
        `Kullanıcı “tekrar dene” dediğinde teknik retry ile yeni iş başlatma ayrımı arayüzde net olmalıdır. Ödeme sonucu bilinmiyorsa düğme önce durum sorgular; doğrulanmış redden sonra yeni deneme sunulabilir. Hangi hatada otomatik, hangi hatada kullanıcı kontrollü tekrar olacağı ürün kararıdır.`
      ],bullets:['Retry yalnız geçici olabilecek hata için.','Tekrarlar tek katmanda ve sınırlı olsun.','İş niyeti deneme boyunca sabit kalsın.'],source:'awsRetry'},
      {label:'04 / Çıktı',title:'Bir tabloyla bütün yolları sınayın',paragraphs:[
        `Dört satırlı test tablosu kurun: istek hiç ulaşmadı, işlendi ama yanıt kayboldu, işlem reddedildi, aynı anda iki istek geldi. Her satırda sunucu kaydı, sağlayıcı kaydı, istemci ekranı ve kullanıcının güvenli sonraki eylemi yazılmalıdır. Bu tablo boşluk bırakıyorsa “retry destekliyoruz” ifadesi kanıtlanmamıştır.`,
        `Operasyon ekibinin aynı niyete bağlı tüm denemeleri görebileceği referans da gerekir. Destek “bir kez daha deneyin” demeden önce işin hangi sınırda kaldığını anlayabilmelidir. Ürün kabul kriteri çift hak ve çift tahsilatın nasıl tespit edilip düzeltileceğini de kapsar.`
      ],decision:'Karar sorusu: Sonucu bilinmeyen istekte kullanıcıya yeni niyet mi, durum doğrulama mı sunulacak?'}
    ]
  },
  dagitik:{
    number:'12',deck:'Servisler ve olaylar arasındaki sınırları kullanıcı durumuna çevirin.',
    thesis:'Bir servisin “kabul ettim” yanıtı, bütün iş akışının bittiği anlamına gelmez.',
    sources:['kafkaDelivery','trace','awsRetry'],
    motion:{mode:'event',title:'Bildirim işi servisler arasında ilerler',caption:'Olay yinelenebilir veya gecikebilir; kullanıcıya gösterilen durum doğrulanmış aşamayı yansıtmalıdır.',steps:[
      {title:'Kabul',detail:'İş kalıcı sıraya alınır.'},
      {title:'Tüketim',detail:'İşçi olayı okur.'},
      {title:'Sağlayıcı',detail:'Dış sistem teslimi dener.'},
      {title:'Uzlaşma',detail:'Sonuç ve tekrarlar kaydedilir.'}
    ]},
    memory:{hook:'Accepted ≠ sent ≠ delivered. Üç kelime, üç farklı kanıt.',question:'API “202 Accepted” döndürdüyse kullanıcıya “bildirim teslim edildi” yazılabilir mi?',answer:'Hayır. İstek kabul edilmiştir; teslimat ayrı iş ve sağlayıcı sonucudur. Ekran veya operasyon paneli aşamaları ayrı göstermelidir.'},
    practice:{brief:'Kampanya bildirimi yayınlanıyor. Kuyruk tüketicisi çöküyor, olay sonra tekrar teslim ediliyor ve sağlayıcı sonucu gecikiyor.',deliverables:['Accepted, scheduled, sending, sent, failed durumları','Yinelenen olayda çift bildirim kontrolü','Kuyruk yaşı ve sonuç doğrulama sinyalleri'],model:[
      'Yayın API’si işi kalıcı kayda ve kuyruğa güvenli biçimde alır; kullanıcıya “yayın için sırada” der. Tüketici aynı iş kimliğini tekrar gördüğünde daha önceki durumu kontrol eder. Sağlayıcı isteği ve sonucu ayrı referanslarla izlenir.',
      'Yinelenen olayın kendisi hata sayılmaz; ikinci kullanıcı etkisi doğurması hatadır. Kuyruk yaşı, işin son duruma geçme süresi ve belirsiz sonuç sayısı operasyon göstergesi olur. “Gönderildi” sağlayıcının hangi kanıtına dayandığıyla tanımlanır.'
    ]},
    chapters:[
      {label:'01 / Sınır',title:'Senkron yanıtın erişmediği işleri görün',paragraphs:[
        `Tek bir ekran isteği, kullanıcı servisi, kampanya servisi, kuyruk, işçi ve bildirim sağlayıcısını kapsayabilir. Hepsini tek yanıt içinde beklemek uzun ve kırılgan bir akış yaratabilir. Asenkron yol, işi kabul edip sonra tamamlamayı sağlar; bunun karşılığı ürünün “bekliyor” durumunu dürüstçe taşımasıdır. API’nin 202 yanıtı işin kayda alınmasını anlatabilir, son kullanıcıya teslimi değil.`,
        `Hangi adımın hemen bitmesi gerektiği kullanıcı işine bağlıdır. Kampanya taslağının kaydı anlık olabilir; binlerce bildirimin gönderimi arka planda yürüyebilir. Buna karşılık ödeme sonucu bilinmeden ücretli hak açmak kabul edilemeyebilir. PM/PO, teknik mimari yerine “hangi kullanıcı vaadi hangi kanıtla veriliyor?” sorusunu netleştirir.`
      ]},
      {label:'02 / Olay',title:'Teslim tekrarını olağan bir durum sayın',paragraphs:[
        `Olay tabanlı sistemlerde tüketici işledikten sonra onay veremeden çökebilir; aynı olay tekrar gelebilir. Kafka belgeleri teslim semantiğinin producer, broker ve consumer sınırlarına göre değiştiğini; “exactly once” iddiasının kapsamına dikkat edilmesini anlatır. Dış bildirim sağlayıcısına yapılan etkiyi tek bir mesajlaşma ayarıyla garanti etmek mümkün değildir. İş kimliği, tekrar kontrolü ve uzlaşma birlikte gerekir.`,
        `Sıralama da kapsamlı bir varsayım olmamalıdır. Aynı kampanyanın “yayınlandı” ve “iptal edildi” olayları farklı yollardan gelebilir. Güncellemede sürüm, olay zamanı veya durum geçiş kuralı kullanılarak eski olayın yeni durumu bozması önlenir. Tekrarlanan olayın hangi veriyi değiştirebileceği kabul kriterine yazılır.`
      ],source:'kafkaDelivery'},
      {label:'03 / İzleme',title:'İşin nerede kaldığını bulacak iz bırakın',paragraphs:[
        `Dağıtık akışta “bildirim kayboldu” şikâyeti tek sunucunun loguna bakılarak çözülemez. İş kimliği veya iz bağlamı sınırlar arasında taşınır. W3C Trace Context, iz bilgisini servisler boyunca ilişkilendirmeyi standartlaştırır; fakat iz tek başına iş sonucunun kanıtı değildir. Kalıcı iş kaydı ve sağlayıcı referansı ayrıca gerekir.`,
        `Ürün operasyonu için kuyruk yaşı, bekleyen iş sayısı, deneme sayısı, sonuca ulaşma süresi ve belirsiz kayıt sayısı önemlidir. Ortalama gönderim süresi iyi görünürken küçük bir kesim saatlerce bekleyebilir. Bu yüzden yaşlanan işlerin oranı ve destek tarafından sorgulanabilir işlem referansı belirlenir.`
      ],source:'trace'},
      {label:'04 / Karar',title:'Son kullanıcı sözünü teknik aşamaya bağlayın',paragraphs:[
        `Ekran metinlerini somut kanıta eşleyin: “Taslak kaydedildi” veritabanı kaydı; “yayın için sırada” kalıcı iş kabulü; “gönderim sürüyor” işçi denemesi; “gönderildi” sağlayıcı kabulü; “teslim edildi” ancak sağlayıcı böyle bir teslim kanıtı sağlıyorsa. Kaynakta olmayan bir garantiyi ürün metni vermemelidir.`,
        `Bu eşleme test planına dönüşür. İşçi kapalı, kuyruk gecikmiş, sağlayıcı 429 vermiş, aynı olay iki kez gelmiş ve iptal olayı önce ulaşmış senaryoları tek tek yürütün. Her durumda sistem kaydı, kullanıcı metni ve operasyon alarmı tutarlı kalmalıdır.`
      ],decision:'Karar sorusu: Hangi aşamadan sonra kullanıcı eylemi geri alınabilir, hangisinden sonra uzlaşma gerekir?'}
    ]
  },
  cache:{
    number:'13',deck:'Hızı artırırken hangi eskiliği kabul ettiğinizi açıkça seçin.',
    thesis:'Önbellek asıl verinin kopyasıdır; ürün sorusu bu kopyanın ne zaman güvenle gösterilebileceğidir.',
    sources:['rfc9111','redisCache','redisEviction'],
    motion:{mode:'cache',title:'Fiyat güncellemesi iki farklı görünüm yaratır',caption:'TTL yalnız üst sınır yaklaşımıdır; kritik alanlarda yazma sonrası geçersizleştirme veya yeniden doğrulama gerekebilir.',steps:[
      {title:'Kaynak',detail:'Fiyat 120 olarak değişir.'},
      {title:'Eski kopya',detail:'Cache hâlâ 100 gösterir.'},
      {title:'Geçersiz kıl',detail:'Kopya silinir veya yenilenir.'},
      {title:'Doğrula',detail:'Ödeme anı kaynak fiyatı kullanır.'}
    ]},
    memory:{hook:'Cache hız satın alır; bedeli olası eskiliktir.',question:'Liste 100, ödeme 120 gösterirse yalnız TTL kısaltmak yeterli çözüm müdür?',answer:'Hayır. Kabul edilen eskilik penceresi ve fiyatın hangi adımda doğrulanacağı ürün kararıdır. Ödeme anında kaynak fiyatı yeniden kontrol etmek ve farkı kullanıcıya açıklamak gerekebilir.'},
    practice:{brief:'Kurgusal katalog fiyatı 100’den 120’ye çıktı. Liste sayfası 10 dakika cache tutuyor; kullanıcı 3 dakika sonra listeyi açıp ödeme başlatıyor.',deliverables:['Hangi yüzeyde eski fiyat tolere edilir?','Ödeme öncesi doğrulama ve fiyat farkı metni','Cache anahtarı, geçersizleştirme ve izleme sinyali'],model:[
      'Liste önbelleğinde kısa eskilik kabul edilebilir olsa bile son ödeme tutarı sunucuda güncel kurala göre doğrulanır. Fark varsa kullanıcının onayı yenilenir; eski fiyatla sessiz tahsilat veya beklenmedik yüksek tutar gösterimi yapılmaz.',
      'Fiyat değişiminde ilgili cache anahtarları geçersiz kılınır. TTL ek güvenlik ağıdır; anlık tutarlılık garantisi değildir. Cache hit oranı yanında eski fiyatla açılan ödeme denemesi ve fiyat farkı terk oranı izlenir.'
    ]},
    chapters:[
      {label:'01 / Kopya',title:'Cache ile gerçek kaynağı ayırın',paragraphs:[
        `Önbellek, sık okunan veriyi daha yakın veya hızlı bir katmanda tutar. Tarayıcı, CDN, uygulama belleği ve Redis gibi katmanların her birinin anahtarı, ömrü ve geçersiz kılma yolu farklıdır. RFC 9111 HTTP cache direktiflerini ve yeniden doğrulama davranışını tanımlar; fakat uygulamanın iç veri önbelleği için aynı davranış otomatik gelmez. Önce hangi kopyadan söz edildiğini haritalayın.`,
        `“Sayfa hızlı açılıyor” ölçümü tek başına yeterli değildir. Liste fiyatı, sepet fiyatı ve tahsil fiyatı farklı eskilik toleranslarına sahiptir. Kullanıcının karar verdiği veya para ödediği noktada doğruluk daha ağır basabilir. Ürün kabul kriteri her yüzey için hangi verinin ne kadar eski olabileceğini ayrı söyler.`
      ],source:'rfc9111'},
      {label:'02 / Tazelik',title:'TTL bir saat değil, risk penceresidir',paragraphs:[
        `TTL süresi dolan kopyanın yenilenmesini sağlar; kaynak değiştiği an eski kopyanın yok olacağını garanti etmez. Cache-aside deseninde uygulama önce cache’i okur, bulunmazsa kaynağa gider ve kopyayı doldurur. Yazma sonrası ilgili anahtarın geçersiz kılınması eski veri penceresini daraltabilir. Aynı anda çok sayıda isteğin popüler anahtar boşaldığında kaynağa yüklenmesi de ayrı risk oluşturur.`,
        `TTL seçimi teknik bir sabit değil, veri değişim sıklığı ve yanlış gösterimin bedeliyle ilişkilidir. Kampanya görseli beş dakika eski olabilirken kullanılabilir bakiye veya sipariş sonucu aynı toleransı taşımayabilir. “Son güncelleme” işareti ve kullanıcıya yeniden deneme yolu bazı kopyalarda güven sağlar; hassas karar anında kaynak doğrulaması gerekir.`
      ],source:'redisCache'},
      {label:'03 / Kapasite',title:'Cache dolduğunda neyin çıktığını bilin',paragraphs:[
        `Bellek sınırı dolduğunda Redis gibi sistemler seçilen eviction politikasına göre anahtarları çıkarabilir veya yeni yazmaya hata dönebilir. Bu nedenle cache hit oranının düşmesi, kaynağa aniden daha çok yük bindirebilir. Veri yalnız cache’te tutuluyorsa çıkarılma veri kaybıdır; gerçek cache’te ise kaynakta durur. “Cache var” mimarisi ancak kaynak sistemi cache kaçırmasını kaldırabiliyorsa dayanıklıdır.`,
        `PM/PO açısından sonuç, kullanıcı etkisini tarif etmektir: cache boşalınca ekran yalnız yavaşlar mı, yoksa başarısız mı olur? Yoğun kampanya anında sıcak anahtarın bitmesi tüm istekleri veritabanına yığabilir. Kapasite testinde soğuk başlangıç ve toplu geçersizleştirme ayrıca denenmelidir.`
      ],source:'redisEviction'},
      {label:'04 / Karar',title:'Veri sınıfına göre tazelik sözleşmesi yazın',paragraphs:[
        `Bir tablo oluşturun: alan, kaynak, gösterim yüzeyi, kabul edilen eskilik, geçersiz kılma olayı ve karar anında yeniden doğrulama. Fiyat, stok, kullanıcı adı ve sipariş durumu için aynı TTL’yi seçmek kolaydır ama anlamlı değildir. İşlemin geri dönülmezliği arttıkça gösterimden çok son doğrulama önem kazanır.`,
        `Testte kaynak değişimiyle liste, detay, sepet ve ödeme ekranlarını farklı anlarda açın. Her ekrandaki değerin hangi kopyadan geldiğini ve kullanıcının hangi tutara onay verdiğini kaydedin. Cache tasarımı ancak bu iz üzerinden ürün beklentisiyle karşılaştırılabilir.`
      ],decision:'Karar sorusu: Ödeme anında fiyat değişmişse kullanıcıya hangi fark ve hangi yeniden onay sunulur?'}
    ]
  },
  kesif:{
    number:'14',deck:'Teknik seçeneği hız veya maliyet sloganıyla değil, belirsizlikleri kapatarak seçin.',
    thesis:'Keşif, çözüm sunmadan önce kullanıcı ihtiyacını, sistem sınırını ve geri dönüş maliyetini kanıtlarla daraltır.',
    sources:['adr','awswa'],
    motion:{mode:'decision',title:'Bildirim sağlayıcısı kararı',caption:'PoC bir seçenek seçme gösterisi değil; kararı değiştirebilecek en büyük belirsizliği sınamalıdır.',steps:[
      {title:'Problem',detail:'Teslim gecikmesi mi, maliyet mi?'},
      {title:'Seçenekler',detail:'Mevcut, yeni, içeride geliştirme.'},
      {title:'Kanıt',detail:'Kritik bilinmeyen için küçük deneme.'},
      {title:'Karar',detail:'Gerekçe, koşul ve geri dönüş.'}
    ]},
    memory:{hook:'Seçenek değil, belirsizlik test edilir.',question:'Üç sağlayıcının fiyat listesi varsa PoC’yi fiyat karşılaştırması için mi yaparsınız?',answer:'Fiyat zaten biliniyorsa PoC, teslim güvenilirliği, entegrasyon sınırı veya veri taşınabilirliği gibi kararı değiştirebilecek belirsizliği sınamalıdır.'},
    practice:{brief:'Kampanya bildirimleri geç gidiyor. Mevcut sağlayıcıda kalma, yeni sağlayıcıya geçme ve içeride geliştirme seçeneklerini karşılaştırın.',deliverables:['Kararı etkileyen en az dört ölçüt','En belirsiz varsayım ve onu sınayan PoC','Seçilen seçeneğin geri dönüş/çıkış koşulu'],model:[
      'Ölçütler: uçtan uca teslim süresi, teslim kanıtı, yinelenen olay davranışı, maliyet, veri işleme koşulu ve sağlayıcı bağımlılığı. Önce gecikmenin mevcut sistemin kuyruğunda mı sağlayıcıda mı olduğunu ölçmek gerekir.',
      'PoC, küçük sentetik trafikle olay tekrarını ve gecikme dağılımını karşılaştırabilir. Karar kaydı seçilen yolu, reddedilen alternatifleri, hangi kanıtla değişeceğini ve geçişin geri alma maliyetini içerir.'
    ]},
    chapters:[
      {label:'01 / Problem',title:'İstenen çözüm ile yaşanan sorunu ayırın',paragraphs:[
        `“Yeni bildirim sağlayıcısı alalım” bir çözüm önerisidir. Asıl sorun, bildirimlerin geç gitmesi, teslim kanıtının olmaması veya maliyetin artması olabilir. Gecikme bizim kuyruğumuzdaysa sağlayıcı değiştirmek etki etmeyebilir. Keşifte kullanıcı etkisi, mevcut akış, teknik sinyal ve iş kısıtı ayrı yazılır. Karar sahibi hangi sonucun daha iyi olacağını önceden tanımlar.`,
        `Sorunu ölçerken ortalama süreye saplanmayın. Bildirimlerin küçük ama kritik bir bölümü çok geç kalıyorsa kuyruk yaşı veya belirli yüzdelik dilimler daha anlamlıdır. Acil olmayan kampanya ile zaman duyarlı güvenlik uyarısı aynı teslim hedefini gerektirmez. Önce kullanıcı vaadini sınıflayın.`
      ]},
      {label:'02 / Seçenek',title:'Build, buy ve mevcut çözümü aynı masaya koyun',paragraphs:[
        `Mevcut sistemde kalmak, yeni sağlayıcı almak ve içeride geliştirmek gerçek alternatiflerdir. Her biri teslim kabiliyeti, entegrasyon süresi, operasyon yükü, veri bağımlılığı ve çıkış maliyeti taşır. “Satın alırsak hızlı olur” varsayımı, veri taşıma, güvenlik incelemesi ve gözlemlenebilirlik kurulumunu atlayabilir. “Kendimiz yaparsak kontrol bizde” varsayımı ise gece operasyonunu ve uzmanlık maliyetini gizleyebilir.`,
        `AWS Well-Architected çerçevesi, mimari kararları operasyon, güvenilirlik, performans ve maliyet gibi ayrı sütunlarda ele alır. Ürün kararı bunların hepsini aynı ağırlıkta saymak zorunda değildir; ancak göz ardı edilen sütunun riskini açık kaydeder. Seçeneklerin aynı kullanım senaryosunda karşılaştırılması gerekir.`
      ],source:'awswa'},
      {label:'03 / PoC',title:'Denemeyi kararı değiştirecek soruya bağlayın',paragraphs:[
        `Proof of Concept (PoC), tüm ürünü küçük ölçekte inşa etmek değildir. Tek veya az sayıdaki kritik belirsizliği sınar: sağlayıcı yinelenen webhook gönderdiğinde iki bildirim oluşuyor mu? Gecikme belirli yükte nasıl dağılıyor? Çıkışta veriyi taşıyabiliyor muyuz? Denemenin başarı eşiği ve süre sınırı baştan yazılır; aksi halde sonuç “çalıştı” gibi yoruma açık bir cümle olur.`,
        `Kurgusal demo verisini gerçek trafikle karıştırmayın. Sentetik örnek, sözleşme ve entegrasyon davranışını gösterebilir; üretimdeki teslim oranını kanıtlamaz. Denemenin kapsamadığı koşulları karar kaydında açık bırakın. Negatif sonuç da değerlidir: seçenek elenmesi zaman kazandırır.`
      ]},
      {label:'04 / Kayıt',title:'Kararın ömrünü ve yeniden açılma koşulunu yazın',paragraphs:[
        `Architecture Decision Record yaklaşımı bağlam, seçenek, karar ve sonuçların kısa bir kaydını tutar. PM/PO için ek değer, ürün varsayımı ve tekrar gözden geçirme tetikleyicisidir. Örneğin “kampanya teslim süresi hedefin dışına çıkar veya sağlayıcı maliyeti belirli eşiği aşarsa karar yeniden açılır.” Eşik gerçek veriden gelmeli; öğretim örnekleri üretim hedefi diye kopyalanmamalıdır.`,
        `Karar kaydı tek seferlik imza değildir. Uygulama sonrası beklenen metrikle gerçekleşen metrik karşılaştırılır. Seçenek yanlış çıktıysa geri alma veya ikinci geçiş yolu önceden bilinmelidir. Bu disiplin, teknoloji tercihini kişisel zevk tartışmasından ürün hipotezine çevirir.`
      ],source:'adr',decision:'Karar sorusu: Hangi tek kanıt mevcut tercihinizi değiştirirdi?'}
    ]
  },
  'test-yayin':{
    number:'15',deck:'Test piramidini risk, yayını da geri alma ihtimali üzerinden kurun.',
    thesis:'“Test geçti” tek bir güven düzeyi değildir; her test farklı hatayı yakalar, kademeli yayın ise kaçan hatanın etkisini sınırlar.',
    sources:['openapi','playwrightTrace','stripe'],
    motion:{mode:'release',title:'Ödeme değişikliğinin kontrollü çıkışı',caption:'Dağıtım ve özelliğin kullanıcıya açılması ayrı adımlardır; geri alma veri etkisini de hesaba katar.',steps:[
      {title:'Sözleşme',detail:'İstemci–servis uyumu doğrulanır.'},
      {title:'Akış testi',detail:'Başarı ve belirsizlik sınanır.'},
      {title:'Kademeli aç',detail:'Küçük grupta sinyal izle.'},
      {title:'Genişlet / geri al',detail:'Önceden yazılı eşikle karar ver.'}
    ]},
    memory:{hook:'Test riski bulur; kademeli yayın kaçan riskin etkisini sınırlar.',question:'E2E testi geçtiğinde kademeli yayına neden yine ihtiyaç olabilir?',answer:'Test ortamı üretimdeki trafik, eski istemci, gerçek sağlayıcı gecikmesi ve nadir durumların tümünü temsil etmez. Kademeli açılış canlı sinyallerle etkiyi sınırlı tutar.'},
    practice:{brief:'Ödeme API’sine yeni sonuç durumu ekleniyor. Eski mobil uygulamalar sahada ve sağlayıcı bazen geç yanıt veriyor.',deliverables:['Unit, contract, E2E ve UAT için birer risk odaklı örnek','Küçük kullanıcı grubunda izlenecek metrik ve durdurma eşiği','Kod, özellik bayrağı ve veri değişikliği için geri alma ayrımı'],model:[
      'Unit: belirsiz sonuçtan yeni sipariş açılmaz. Contract: eski istemci bilinmeyen durumu güvenle karşılar. E2E: yanıt kaybında ekran doğrulama durumunda kalır. UAT: destek ekibi işlem referansını bulur ve kullanıcı metnini anlar.',
      'Özellik önce küçük grupta açılır; çift hak, belirsiz sonuç süresi, ödeme terk ve hata oranı izlenir. Eşik aşılırsa özellik kapatılır; yapılmış veritabanı değişikliğinin eski koda uyumluluğu ayrıca doğrulanır.'
    ]},
    chapters:[
      {label:'01 / Test',title:'Her testin yakalayabileceği hatayı söyleyin',paragraphs:[
        `Unit testi küçük bir iş kuralını hızlı doğrular; örneğin “aynı sipariş iki hak üretmez”. Contract testi API alanı ve hata biçiminin tüketici beklentisine uyduğunu sınar. E2E testi gerçekçi akışta ekran, servis ve veri sınırlarını birlikte çalıştırır ama daha yavaş ve kırılgan olabilir. UAT, alan bilgisini taşıyan kişinin ürün davranışını kabul etmesidir; teknik testin yerine geçmez.`,
        `Ödeme değişikliğinde “test yazıldı” yerine risk eşlemesi isteyin. Yeni durum eski mobil sürümde nasıl görünür? Sağlayıcı yanıtı kaybolursa ne olur? Aynı webhook iki kez gelirse hangi kayıt oluşur? Her risk için en ucuz güvenilir test seviyesi seçilir. Test sayısı yüksek olup kritik dal boş kalabilir.`
      ]},
      {label:'02 / Kanıt',title:'Başarısız testi yeniden üretilebilir yapın',paragraphs:[
        `E2E başarısızlığında yalnız ekran görüntüsü genellikle kök neden için yetersizdir. Playwright’ın trace görünümü, eylemler, DOM anlık görüntüleri, ağ istekleri ve konsol sinyallerini birlikte incelemeyi sağlar. Üründe sorun raporu da benzer disiplin ister: test verisi, ortam, istemci sürümü, işlem referansı ve beklenen/gerçekleşen davranış ayrı tutulur.`,
        `Üretim verisini testte rastgele kullanmak iyi kanıt üretmez. Sentetik ödeme ve kampanya verisi, kritik durumları kontrollü kurmayı sağlar. Sağlayıcı hata davranışı simüle ediliyorsa bunun gerçek sağlayıcı sözleşmesinden hangi noktada farklı olduğu yazılır. Test, iddiayı hangi kapsamda doğruladığını açık söylemelidir.`
      ],source:'playwrightTrace'},
      {label:'03 / Yayın',title:'Dağıtım ile kullanıcıya açılışı ayırın',paragraphs:[
        `Kod üretime dağıtılmış olsa bile özellik bayrağıyla kapalı olabilir. Bu ayrım küçük grupta açmayı, sinyal izlemeyi ve gerektiğinde hızla durdurmayı kolaylaştırır. Ancak bayrak kapatmak veri şemasını, dış sağlayıcıya gönderilmiş isteği veya verilmiş hakkı geri almaz. Geri alma planı kod, özellik davranışı ve kalıcı veri etkisini ayrı ele almalıdır.`,
        `Kademeli yayında birincil başarı metriği kadar guardrail gerekir: ödeme başarısı, çift tahsilat şikâyeti, belirsiz sonuç yaşı, hata ve gecikme. Örnek hacmi küçükse “hiç hata görmedik” güvenli sonuç olmayabilir. İzleme penceresi ve karar sahibi önceden yazılır; kriz anında eşiği doğaçlama seçmek yanlılığa açık olur.`
      ]},
      {label:'04 / Karar',title:'Yayın kararını bir kontrol listesine sıkıştırın',paragraphs:[
        `Yayından önce dört soruya yanıt verin: hangi davranış değişiyor; hangi eski tüketici etkilenir; hangi sinyal bozulursa dururuz; durdurunca kalıcı veri ne olur? Bu soruların her biri isimli sahibine bağlanır. “Rollback var” cümlesi ancak birkaç dakikada gerçekten denenebilen bir yol olduğunda değerlidir.`,
        `Yayın sonrası öğrenme de plana dahildir. İlk grup beklenen davranışı gösteriyorsa aşamalı genişletilir; göstermiyorsa neden analiz edilir. PM/PO’nun görevi test komutlarını seçmek değil, kabul edilecek kullanıcı sonucu ve karar eşiğini açık hale getirmektir.`
      ],decision:'Karar sorusu: Özelliği kapattığınızda hangi kullanıcı ve veri etkisi yerinde kalır?'}
    ]
  }
};
