// Ders 16–20. Araç komutları örnek sözleşmeye dayanır; gerçek müşteri verisi gerekmez.
export const expanded1620={
  operasyon:{
    number:'16',deck:'Metrik, log ve izi kullanıcı deneyimine bağlayarak arızayı tanıyın.',
    thesis:'Gözlemlenebilirlik çok grafik toplamak değil, “hangi kullanıcı işi bozuldu, nerede, ne kadar süredir?” sorusuna kanıtla yanıt verebilmektir.',
    sources:['slo','trace','otelSignals','sloAlert'],
    motion:{mode:'observe',title:'Başarısız girişten teşhise',caption:'Metrik etkili kullanıcı oranını, iz isteğin yolunu, log belirli olayın kaydını gösterir.',steps:[
      {title:'Kullanıcı etkisi',detail:'Giriş tamamlanmıyor.'},
      {title:'Metrik',detail:'Başarı oranı ve gecikme değişir.'},
      {title:'İz',detail:'İstek hangi serviste bekledi?'},
      {title:'Log',detail:'O servis hangi hatayı kaydetti?'}
    ]},
    memory:{hook:'Metrik “ne kadar?”, iz “nerede?”, log “ne oldu?”',question:'CPU kullanımı normal, ama giriş başarısı düşüyor. Operasyon sağlıklı denebilir mi?',answer:'Hayır. Kaynak metriği kullanıcı sonucunu temsil etmez. Giriş işinin başarı SLI’ı ve etkilenmiş kullanıcı sayısı önceliklidir.'},
    practice:{brief:'Kurgusal bir saatte 10.000 giriş denemesinin 9.700’ü başarıyla tamamlandı. Kullanıcı şikâyetleri belirli mobil sürümde yoğunlaşıyor.',deliverables:['Başarı SLI’ının payı, paydası ve değeri','Sürüm kırılımı ile iz/log korelasyon planı','Alarmın hangi kullanıcı etkisinde tetikleneceği'],model:[
      'Başarı SLI’ı örnek tanıma göre 9.700 / 10.000 = %97’dir. Bu sayı tek başına yeterli değildir: deneme tanımı, bot/iptal edilen akışlar, sürüm ve bölge kırılımı, gecikme ve aynı kullanıcının tekrar denemeleri incelenir.',
      'Etkilenen isteklerin trace/request kimlikleriyle servis yoluna bakılır; hassas kimlik bilgileri loga yazılmaz. Alarm, yalnız CPU veya tek hata mesajına değil, kullanıcı açısından anlamlı başarı eşiğine ve hata bütçesi tüketimine bağlanır.'
    ]},
    chapters:[
      {label:'01 / Sinyal',title:'Üç sinyal üç farklı soru yanıtlar',paragraphs:[
        `Metrik zaman içinde sayısal eğilimi gösterir: giriş başarı oranı veya gecikme dağılımı. Log belirli bir olayın kayıtlı açıklamasıdır. Dağıtık iz, bir isteğin servisler arasında hangi adımlardan geçtiğini ilişkilendirir. OpenTelemetry bu sinyalleri ayrı ama bağlanabilir türler olarak ele alır. Sadece birini toplamak diğerinin sorusunu cevapsız bırakır.`,
        `Giriş başarısı düşerken CPU normal olabilir; kaynak sağlığı ile kullanıcı başarısı aynı metrik değildir. Önce kullanıcı yolculuğunda hangi olayın “iyi” sayıldığını tanımlayın. Sonra metrik bozulduğunda örnek isteği bulacak trace kimliğinin ve oradaki olayı açıklayacak logun bulunup bulunmadığını doğrulayın.`
      ],source:'otelSignals'},
      {label:'02 / SLO',title:'SLO hedefi kullanıcı açısından tanımlayın',paragraphs:[
        `SLI ölçülen göstergedir; SLO bu gösterge için hedeflenen düzeydir. “Giriş başarılı mı?” sorusunda payda hangi denemeleri kapsıyor, başarı hangi olayda tamamlanmış sayılıyor ve ölçüm penceresi nedir? Bu tanımlar olmadan %99 hedefi yalnız bir sayı olur. Google SRE kaynakları, SLO’ların kullanıcı deneyimine uygun “iyi olay” oranından türetilmesini önerir.`,
        `Hata bütçesi, hedefin izin verdiği başarısızlık payıdır. Bütçenin çok hızlı tüketilmesi, tek anlık hata oranından daha anlamlı alarm sinyali olabilir. Ancak hedef belirlemek iş ve mühendislik kararıdır; bir başkasının SLO yüzdesi kopyalanmaz. Kritik giriş akışıyla iç rapor ekranı farklı hedefler taşıyabilir.`
      ],source:'slo'},
      {label:'03 / Alarm',title:'Alarmı aksiyon alınabilir etkiye bağlayın',paragraphs:[
        `Her log hatasında birine bildirim göndermek alarm yorgunluğu üretir. İyi alarm, önemli kullanıcı etkisini yeterince hızlı yakalar ve açık bir ilk eylem verir. Google SRE’nin burn-rate yaklaşımı, hata bütçesinin hangi hızda tüketildiğini farklı zaman pencerelerinde izler. PM/PO, teknik eşik formülünü seçmek zorunda değildir; hangi iş akışı bozulduğunda müdahale beklendiğini söylemelidir.`,
        `Yalnız toplam başarı oranı, küçük bir sürüm veya bölgede büyük arızayı saklayabilir. Sürüm, ülke, ağ türü veya oturum yöntemi kırılımları önemlidir; fakat çok küçük gruplar gürültülü olabilir. Alarm sonrası kullanılacak pano, istek referansı ve destek dili önceden hazırlanır.`
      ],source:'sloAlert'},
      {label:'04 / Olay',title:'Olay incelemesini ürün öğrenmesine çevirin',paragraphs:[
        `Bir olayda zaman çizelgesi kurun: ilk kullanıcı belirtisi, ilk sinyal, alarm, teşhis, düzeltme ve kullanıcıya iyileşmenin yansıması. “Sistem düzeldi” ile “kullanıcı tekrar giriş yapabildi” arasında gecikme olabilir. Müdahale sırasında durum sayfası veya destek mesajı doğrulanmamış kesinlik vermemelidir.`,
        `Sonraki adım suçlu aramak değil, algılama ve toparlanma boşluğunu bulmaktır. Hangi metrik erken uyarabilirdi? Hangi eski istemci davranışı görünmedi? Bir sonraki yayın için hangi kabul kriteri veya gözlemleme aracı değişmeli? Böylece operasyon verisi yol haritasına kanıt olarak geri döner.`
      ],decision:'Karar sorusu: Hangi giriş sonucu kullanıcı açısından “iyi olay” sayılacak ve bozulduğunda kim ne yapacak?'}
    ]
  },
  olcum:{
    number:'17',deck:'Olayları, paydaları ve deneyleri ürün kararını taşıyacak kesinlikte tanımlayın.',
    thesis:'Ölçüm önce olayın neyi temsil ettiğini belirler; rastgele deney ancak bu anlam ve guardrail sabitse yorumlanabilir.',
    sources:['abtest','slo'],
    motion:{mode:'experiment',title:'Deney sinyali dört kontrolden geçer',caption:'Başarı metriği artarken hata veya maliyet guardrail’i bozuluyorsa karar yeniden değerlendirilir.',steps:[
      {title:'Atama',detail:'Kullanıcı tutarlı A/B grubunda.'},
      {title:'Olay',detail:'Aynı tanım iki grupta.'},
      {title:'Sonuç',detail:'Önceden seçilmiş birincil metrik.'},
      {title:'Guardrail',detail:'Güvenlik ve kalite etkisi.'}
    ]},
    memory:{hook:'Olay → payda → karşılaştırma → karar. Her ok doğrulanmalı.',question:'Tıklama %10 arttı; ödeme tamamlanması azaldı. Deney başarılı mı?',answer:'Birincil amaç ve guardrail tanımı görülmeden karar verilemez. Daha çok tıklama, kullanıcı veya iş değeri artışı anlamına gelmeyebilir.'},
    practice:{brief:'Giriş ekranına daha kısa form ekleniyor. Deneyle etkisini görmek istiyorsunuz.',deliverables:['Kullanıcı birimi ve rastgele atama yöntemi','Birincil metrik, iki guardrail ve olay şeması','Olay doğrulama ve karar öncesi kalite kontrolleri'],model:[
      'Birim kullanıcı veya hesap olarak seçilir; aynı kişi oturumlar arasında aynı varyantı görür. Birincil metrik örnek olarak “başlayan uygun kullanıcılar içinde başarıyla tamamlanan giriş oranı” olabilir. Guardrail’ler hesap kilitlenmesi ve şüpheli oturum oranı olabilir.',
      'Atama oranı, eksik veya yinelenen event’ler, eski uygulama sürümleri ve zaman damgaları kontrol edilir. Metrikler analiz başlamadan yazılır; beklenmeyen kırılımlar hipotez olarak ayrıca incelenir, sonradan seçilmiş kesin sonuç gibi sunulmaz.'
    ]},
    chapters:[
      {label:'01 / Olay',title:'Event adı değil, ölçüm birimi tanımlayın',paragraphs:[
        `“login_success” adı tek başına yeterli değildir. Hangi kullanıcı eyleminden sonra, hangi sistem kanıtıyla, hangi cihazda, en fazla kaç kez üretilir? İstemcinin butona basmayı başarı saymasıyla sunucunun oturumu kurmasını başarı sayması farklı oranlar üretir. Event sözlüğü ad, tetikleyici, birim, kimlik, zaman, sürüm ve hata durumunu içerir.`,
        `Bir kullanıcı üç kez denediyse payda deneme mi kullanıcı mı? Ürün sorusuna göre ikisi de yararlı olabilir ama karıştırılamaz. Giriş kolaylığını ölçerken uygun kullanıcıların başarı oranı, altyapı güvenilirliğini ölçerken isteklerin başarı oranı kullanılabilir. Aynı panoda farklı paydaları “başarı” etiketiyle göstermek sessiz karar hatasıdır.`
      ]},
      {label:'02 / Huni',title:'Adım kaybının tanımını sabitleyin',paragraphs:[
        `Huni, belirli sıradaki eylemlerin hangi birim tarafından tamamlandığını gösterir. Kullanıcı formu gördü, başladı, gönderdi ve oturum açtı adımları ölçülüyorsa zaman penceresi ve tekrar ziyaret kuralı gerekir. Bir kişi iki cihazda form açtıysa iki gösterim mi bir kullanıcı mı sayılacak? Kaybolan event, gerçek terk ile aynı şey değildir.`,
        `Funnel raporunu karar öncesi sentetik akışla doğrulayın: bir kullanıcı başarı, biri hata, biri geri dönüş, biri tekrar deneme. Beklenen pay ve paydalar elle hesaplanabilir olmalıdır. Bu küçük kontrol yapılmadan A/B sonucunun ondalık hassasiyeti güven oluşturmaz.`
      ]},
      {label:'03 / Deney',title:'Rastgele karşılaştırmanın sınırlarını bilin',paragraphs:[
        `A/B deneyinde varyantların karşılaştırılabilir olması için atama birimi, kalıcılığı ve uygunluk koşulu belirlenir. Aynı kullanıcı her girişte farklı varyant görürse deney maruziyeti karışır. Ölçüm olayı iki varyantta farklı tetiklenirse fark ürün etkisi değil, enstrümantasyon farkı olabilir. Microsoft Research’ün çevrimiçi deneyim çalışmaları deney altyapısı ve ölçüm disiplininin karar kalitesi için merkezi olduğunu anlatır.`,
        `Birincil metrik ve guardrail’leri sonucu görmeden seçin. Deneyi erken durdurma, çok sayıda alt gruba bakma veya yalnız olumlu metriği raporlama yanlış kesinlik yaratabilir. “İstatistiksel anlamlı” ifadesi de etki büyüklüğü, belirsizlik ve iş değeri görülmeden kararın tamamı değildir. Gerektiğinde deney daha uzun sürer veya karar verilemez sonucu kabul edilir.`
      ],source:'abtest'},
      {label:'04 / Karar',title:'Metrik değişimini davranış açıklamasına dönüştürün',paragraphs:[
        `Yeni form giriş tamamlamayı artırdıysa hangi adımda artış oldu? Daha çok uygun kullanıcı mı tamamladı, yoksa bot/tekrar denemeleri mi sayıldı? Güvenlik guardrail’i bozuldu mu? Ürün raporu tek yüzde yerine birincil etki, güven aralığı veya belirsizlik, segmentler, guardrail ve veri kalite notunu birlikte taşır.`,
        `Sonuçtan sonraki eylem de açık olmalıdır: genişlet, yeniden tasarla, daha fazla veri topla veya durdur. Ölçüm bir karar mekanizmasıdır; panoya grafik eklemek tek başına öğrenme değildir. PM/PO, hangi kanıtın varsayımı değiştireceğini önceden söyleyebilmelidir.`
      ],decision:'Karar sorusu: Deney sonucu hangi koşulda gerçekten “yayınla” kararını değiştirir?'}
    ]
  },
  guvenlik:{
    number:'18',deck:'Tehdit modelini kullanıcı akışı, veri sınırı ve kötüye kullanım üzerinden kurun.',
    thesis:'Güvenlik yalnız giriş ekranı değildir; hangi aktörün hangi veriye ve iş akışına hangi yoldan erişebildiğinin sürekli denetimidir.',
    sources:['owaspApi','oidc','wcag'],
    motion:{mode:'threat',title:'Bir hesap isteğinin tehdit sınırları',caption:'Her sınırda önleme kadar tespit ve kullanıcıyı toparlama davranışı da gereklidir.',steps:[
      {title:'Aktör',detail:'Kim veya hangi otomasyon?'},
      {title:'Varlık',detail:'Hangi hesap, veri veya işlem?'},
      {title:'Kötüye kullanım',detail:'ID değiştirme, aşırı istek, sızıntı.'},
      {title:'Kontrol',detail:'Yetki, sınır, kayıt, toparlanma.'}
    ]},
    memory:{hook:'Aktör + varlık + kötüye kullanım + kontrol.',question:'Kampanya API’sinde ID’ler rastgele ve tahmin edilmesi zor. Nesne düzeyi yetki kontrolü yine gerekli mi?',answer:'Evet. Tahmin zorluğu yetki değildir. Bir ID bağlantıdan, logdan veya başka yoldan öğrenilebilir; sunucu her nesne erişiminde sahiplik/izin denetlemelidir.'},
    practice:{brief:'Kampanya yöneticisi hedef kitleye bildirim gönderebiliyor. Saldırgan başka ekibin kampanya ID’sini biliyor ve çok sayıda gönderim isteği yapabiliyor.',deliverables:['Üç somut kötüye kullanım senaryosu','Her biri için önleyici ve tespit edici kontrol','Yanlış pozitifin meşru kullanıcıya etkisi'],model:[
      'Başka kampanyaya erişim için nesne düzeyi yetki denetlenir; olağandışı denemeler loglanır. Toplu gönderim suistimalinde rol, kota, onay ve hız sınırı birlikte düşünülebilir. Hassas hedef kitle dışa aktarımı ayrı izin ve denetim gerektirir.',
      'Kontrol yanlış pozitif üretirse meşru kampanya gecikebilir. Ürün akışı reddin nedenini güvenli ayrıntıyla gösterir, destek/escalation yolu sunar. Loglar gereksiz kişisel veri içermez; inceleme için işlem kimliği ve karar nedeni tutulur.'
    ]},
    chapters:[
      {label:'01 / Tehdit',title:'Tehdidi özellik listesine değil, kötüye kullanım yoluna bağlayın',paragraphs:[
        `“Güvenli olmalı” bir tehdit modeli değildir. Hangi aktör hangi varlığı hangi yoldan etkileyebilir? Kampanya yöneticisinin başka ekibin kampanyasını değiştirmesi, otomasyonla çok sayıda mesaj göndermesi veya hedef kitle verisini çıkarması ayrı senaryolardır. Her birinde olası kullanıcı ve iş etkisi, önkoşul ve kontrol noktası yazılır. Böylece güvenlik görüşmesi soyut korku listesinden test edilebilir akışa dönüşür.`,
        `OWASP API Security Top 10 nesne düzeyi yetki, işlev düzeyi yetki ve hassas iş akışlarının sınırsız kullanımı gibi ayrı riskleri tanımlar. Hepsi “login var mı?” sorusuyla kapanmaz. Bir kullanıcı meşru oturumla yanlış nesneye erişebilir; aynı işlev otomatik kullanımda zarara dönüşebilir.`
      ],source:'owaspApi'},
      {label:'02 / Veri',title:'Veri minimizasyonunu akış boyunca uygulayın',paragraphs:[
        `Hassas veri yalnız veritabanında değildir. API yanıtı, analitik event, hata logu, dış sağlayıcı isteği ve destek ekranı da veri taşıyabilir. “Ekranda göstermiyoruz” demek gereksiz alanın API’den gelmesini güvenli yapmaz. Ürün gereksinimi hangi rolün hangi alanı hangi amaçla göreceğini ve verinin ne kadar tutulacağını belirler.`,
        `Hesap silme veya erişim kaldırma gibi akışlarda kopyalar, önbellekler ve operasyon kayıtları düşünülür. Mutlak “her yerde anında silindi” vaadi, saklama zorunlulukları ve teknik gecikmeler anlaşılmadan verilmemelidir. Kullanıcıya sunulan açıklama gerçek işleyişle uyumlu olmalıdır.`
      ]},
      {label:'03 / Abuse',title:'Meşru işlevin aşırı kullanımını da modelleyin',paragraphs:[
        `Bir işlevin yetkili kullanıcı tarafından sınırsız kullanılması da kötüye kullanım olabilir. Kampanya gönderimi maliyet, spam, itibar ve sağlayıcı kotası yaratır. Hız sınırı, iş onayı, günlük kota veya olağandışı davranış uyarısı seçeneklerinden hangisi uygun, kullanım sıklığı ve yanlış pozitif maliyetiyle seçilir. Her kontrolün engellediği saldırı ve etkilediği meşru kullanıcı ayrı yazılır.`,
        `Güvenlik davranışı erişilebilir ve toparlanabilir olmalıdır. Şüpheli işlem durdurulduğunda kullanıcı ne olduğunu, hangi adımı güvenle atabileceğini ve yanlışlık varsa nereye başvuracağını anlayabilmelidir. Hata metninde saldırgana gereksiz ayrıntı verilmez; kullanıcı da çıkışsız bırakılmaz.`
      ],source:'wcag'},
      {label:'04 / Karar',title:'Kontrolü kanıt ve operasyonla tamamlayın',paragraphs:[
        `Her tehdide bir önleme, tespit ve toparlanma satırı ekleyin. Örneğin başka kampanyayı değiştirmeyi sunucu yetkisi engeller; reddedilen nesne erişimi güvenli biçimde kaydedilir; yanlış yetki konfigürasyonu varsa hızlı düzeltme ve etki analizi yapılır. Bu üçü olmadan yalnız “403 döner” bir ürün planı değildir.`,
        `Son kontrol, eski istemci, iç yönetim aracı ve üçüncü taraf entegrasyon üzerinden aynı varlığa erişmeyi denemektir. Ekran güvenli görünürken başka giriş noktasından sınır aşılabilir. PM/PO ekipten bütün erişim yüzeylerini haritalamasını ve kritik değişiklikte negatif test yapmasını ister.`
      ],decision:'Karar sorusu: En kötü meşru ve kötüye kullanım akışlarında hangi veri/işlem kesinlikle sınır dışı kalmalı?'}
    ]
  },
  'network-incele':{
    number:'19',deck:'Tarayıcı ağ panelinden iddia değil, sıralı kanıt çıkarın.',
    thesis:'Bir isteğin kodu, süresi, başlığı ve yanıtı birlikte okunmadan “frontend” veya “backend” suçlaması kurulamaz.',
    sources:['devtools','mdnTiming','mdnStatus'],
    motion:{mode:'inspect',title:'Network panelinde teşhis sırası',caption:'Tek bir yavaş isteğin nedeni hakkında kesin hüküm vermek yerine karşılaştırmalı hipotez kurun.',steps:[
      {title:'Doğru istek',detail:'URL ve yöntemi bulun.'},
      {title:'Sonuç',detail:'Durum, yönlendirme ve gövdeyi okuyun.'},
      {title:'Zaman',detail:'DNS, bağlantı, bekleme, aktarımı ayırın.'},
      {title:'Karşılaştır',detail:'Yenileme, cache ve başka ağda deneyin.'}
    ]},
    memory:{hook:'İstek → sonuç → zaman → karşılaştırma.',question:'Network panelinde 800 ms gördünüz. “Sunucu 800 ms sürdü” diyebilir misiniz?',answer:'Hayır. Toplam süre DNS, bağlantı, TLS, sunucu bekleme, aktarım ve başka aşamaları içerebilir. Zamanlama kırılımı incelenmelidir.'},
    practice:{brief:'Bu sitede tarayıcı geliştirici araçlarını açın ve /data/lessons-core.js kaynağını inceleyin. Normal yenileme ile önbelleği devre dışı bıraktığınız yenilemeyi karşılaştırın.',deliverables:['Yöntem, URL, durum ve boyut gözlemi','Zamanlama kırılımı ve cache işareti','Hangi sonucun yalnız tek örnekten çıkarılamayacağı'],model:[
      'GET isteğini ve dönen JavaScript modülünü bulun. Sunucu/cache durumuna göre 200 veya yeniden doğrulama sonucu görülebilir; araç ayarı ve tarayıcıya bağlıdır. Network panelinde toplam süre ile bekleme/aktarım safhalarını ayrı kaydedin.',
      'Tek ölçümle “backend yavaş” veya “cache kesin bozuk” denmez. Aynı ortamda karşılaştırma yapılır; gerekli olduğunda istek kimliğiyle sunucu izi istenir. Paylaşılacak ekran görüntüsünde token ve kişisel veri gizlenir.'
    ]},
    chapters:[
      {label:'01 / Seçim',title:'Önce doğru isteği bulun',paragraphs:[
        `Sayfa yüklenirken onlarca kaynak istenir: HTML, CSS, JavaScript, görsel ve API. Kullanıcının “profil açılmıyor” şikâyeti için en yavaş dosyayı seçmek doğru teşhis değildir. Eylemi tekrar edin, zaman çizelgesinde ilgili isteği URL, yöntem ve başlatan kod bağlamıyla bulun. Bir yönlendirme varsa son yanıtla ilk isteği karıştırmayın.`,
        `Geliştirici araçlarının Network bölümü istek ve yanıt başlıklarını, durum kodunu, gövdeyi, boyutu ve zamanlamayı gösterir. Panel açıkken yeniden üretmek gerekebilir; bazı araçlar önceki istekleri tutmaz. Sorun raporunda eylem, ortam, istemci sürümü ve ilgili isteğin kimliği bulunmalıdır.`
      ],source:'devtools'},
      {label:'02 / Sonuç',title:'HTTP kodunu ürün sonucundan ayırın',paragraphs:[
        `200, HTTP isteğinin başarılı yanıtlandığını söyler; gövde beklenen veriyi taşımıyor olabilir. 401/403 erişim bağlamını, 404 yanlış yolu veya kayıp kaynağı, 429 hız sınırını, 5xx sunucu tarafı başarısızlığı düşündürür; fakat kesin kök neden için yanıt sözleşmesi ve sunucu kanıtı gerekir. 304 gibi yeniden doğrulama yanıtları da normal cache davranışının parçası olabilir.`,
        `Yanıt gövdesindeki hata kodu ve requestId, durum kodundan daha açıklayıcı olabilir. Buna karşılık hata gövdesi hassas bilgi taşıyorsa ekran görüntüsünü paylaşmadan önce temizleyin. İyi hata raporu bir etiket değil, yeniden üretilebilir kanıt setidir.`
      ],source:'mdnStatus'},
      {label:'03 / Süre',title:'Toplam zamanı bileşenlerine ayırın',paragraphs:[
        `Toplam süre DNS, bağlantı, TLS, sunucu yanıtını bekleme ve aktarım gibi aşamalardan oluşabilir; tarayıcı ayrıca kuyruklama ve önceliklendirme gösterebilir. MDN Resource Timing rehberi bu safhaları ayrı ölçüm noktalarıyla açıklar. “Server waiting” yüksekse sunucu veya onun bağımlılığı hipotezi güçlenir, ama ağ gecikmesi ve aradaki katmanlar dışlanmış olmaz.`,
        `Tek örnek yerine benzer istekleri karşılaştırın: ilk ziyaret, yenileme, önbellek kapalı durum, farklı ağ ve yavaş cihaz. Bağlantı yeniden kullanımı bazı safhaları kısaltır. Kullanıcının gördüğü gecikme, isteğin bitişinden sonra istemcinin veriyi işlemesiyle de uzayabilir. Panel yalnız ağ kısmını gösterir.`
      ],source:'mdnTiming'},
      {label:'04 / Aktarım',title:'Bulguyu ekiplerin kullanabileceği dile çevirin',paragraphs:[
        `“Backend yavaş” yerine şu biçimde yazın: “Hesabım tıklamasından sonra GET /me isteği üç denemede 5xx döndü; yanıt gövdesi requestId taşıyor; aynı anda diğer statik kaynaklar yükleniyor.” Veya “İlk ziyarette bağlantı kurulumu belirgin, ikinci ziyarette kayboluyor.” Bu tür bulgu hangi ekibin hangi kanıtı inceleyeceğini gösterir.`,
        `Raporun son satırına kullanıcı etkisini ekleyin: tüm ekran mı boş, yalnız profil mi eksik, tekrar deneme var mı? Teknik iz ile ürün durumu bağlanmadığında sorun önceliği yanlış belirlenebilir. PM/PO’nun değeri, kanıtı kullanıcı sonucuna çevirmektir.`
      ],decision:'Karar sorusu: Tek bir Network ekranından hangi iddiayı kurabilir, hangisini yalnız hipotez olarak bırakmalısınız?'}
    ]
  },
  'api-dene':{
    number:'20',deck:'cURL ile bir sözleşmeyi okuyup güvenli biçimde sınayın.',
    thesis:'API denemesi yalnız istek göndermek değildir; beklenen durum, alan, hata ve veri güvenliğini birlikte doğrulamaktır.',
    sources:['rfc9110','openapi','rfc6585'],
    motion:{mode:'request',title:'API denemesinin dört kontrolü',caption:'Test ortamı ve sentetik veri kullanılmalı; anahtarlar komut geçmişine veya paylaşılan ekran görüntüsüne sızdırılmamalıdır.',steps:[
      {title:'Sözleşme',detail:'Yöntem, yol, parametre.'},
      {title:'İstek',detail:'Ortam, başlık, güvenli veri.'},
      {title:'Yanıt',detail:'Kod, gövde, hata biçimi.'},
      {title:'Karşılaştır',detail:'Beklenen ve gerçekleşen farkı.'}
    ]},
    memory:{hook:'Y-Y-B-K: Yöntem, Yol, Beklenti, Kanıt.',question:'GET /campaigns 200 döndü ve items boş. Bu API hatası mıdır?',answer:'Sözleşme boş listenin geçerli sonuç olduğunu söylüyorsa hayır. 200 gövdesi, sayfalama alanları ve kullanıcıdaki boş durum birlikte kontrol edilir.'},
    practice:{brief:'Kurgusal GET /campaigns sözleşmesi limit ve cursor alıyor. 200 boş liste ve 429 hız sınırı örneklerini taslak olarak hazırlayın. Gerçek kimlik bilgisi kullanmayın.',deliverables:['Sentetik URL ve parametreli cURL komutu','200 boş liste için beklenen gövde ve ürün durumu','429 için Retry-After ve güvenli tekrar kararı'],model:[
      'Örnek komut: curl -i "https://example.invalid/v1/campaigns?limit=20". example.invalid kasıtlı olarak gerçek servis değildir; komutun biçimini gösterir. Gerçek deneme, ekibin verdiği test ortamında ve yalnız sentetik yetkiyle yapılır.',
      '200 örneği: {"items":[],"nextCursor":null}; kullanıcı boş durum görür. 429 örneğinde başlıkta Retry-After olabilir; uygulama sınırı, tekrar bütçesini ve kullanıcıya gösterilecek geçici durumu sözleşmeye göre uygular.'
    ]},
    chapters:[
      {label:'01 / Hazırlık',title:'Önce sözleşmeden beklenen davranışı çıkarın',paragraphs:[
        `OpenAPI tanımı yol, yöntem, parametre, şema ve yanıtları makinece okunabilir biçimde taşıyabilir. Ancak her sözleşme anlamı yalnız şemayla bitmez: boş listenin kullanıcı metni, cursor ömrü ve hız sınırı davranışı ayrıca açıklanmalıdır. GET /campaigns için limit’in izinli aralığını, cursor’ın filtrelerle ilişkisini ve 200/401/429 örneklerini okuyun. Sonra istek göndermeden önce hangi sonucu beklediğinizi yazın.`,
        `Testi gerçek müşteri verisiyle başlatmayın. Yetki kapsamı, ortam ve sentetik kayıtlar net olsun. Komut satırında anahtarı doğrudan yazmak terminal geçmişi ve ekran paylaşımı riskini artırabilir; ekipte onaylı gizli bilgi yöntemini kullanın. Bu ders komut sözdizimini öğretir, üretim API’sine rastgele deneme izni vermez.`
      ],source:'openapi'},
      {label:'02 / İstek',title:'Yöntem, yol, parametre ve başlığı ayrı okuyun',paragraphs:[
        `cURL’de -i yanıt başlıklarını, -X yöntem seçimini, -H başlıkları göstermek veya göndermek için kullanılır. GET isteklerinde sorgu parametreleri URL’de taşınır; URL’lere kişisel veri veya sır koymamak gerekir çünkü log ve geçmişe girebilir. POST denemesinde gövde ve Content-Type sözleşmeyle eşleşmelidir. HTTP yöntemi ürün niyetinin tam garantisi değildir; özellikle yan etkili işlemlerde tekrar semantiği ayrıca belirlenir.`,
        `Komut örneğini açıklarken kabuk kaçışlarına dikkat edin. Öğrenme ortamında URL’nin example.invalid olması komutun bilinçli olarak gerçek isteğe gitmeyeceğini gösterir. Gerçek test için ekipten test taban URL’si, kapsamı sınırlandırılmış yetki ve sıfırlanabilir sentetik veri alınır.`
      ],sample:'curl -i "https://example.invalid/v1/campaigns?limit=20"\n\n# Örnek gövde (gerçek istek değildir):\n{"items":[],"nextCursor":null}',source:'rfc9110'},
      {label:'03 / Yanıt',title:'200, boş liste ve hata sonuçlarını ayırın',paragraphs:[
        `200 koduyla boş items dizisi geçerli bir liste sonucu olabilir. Kullanıcı “henüz kampanya yok” görür; “servis çöktü” değil. 401 kimlik bağlamı, 403 erişim, 429 hız sınırı ve 5xx geçici servis arızası ayrı akış gerektirir. 429 yanıtında Retry-After bulunabilir; RFC 6585 bunu zorunlu değil olası bilgi olarak anlatır. Bu yüzden istemci hem başlık varken hem yokken ne yapacağını bilmelidir.`,
        `Yanıt gövdesini sözleşmedeki türlerle karşılaştırın: items dizi mi, nextCursor null olabilir mi, hata kodu kararlı mı? “200 geldi” demek kullanım senaryosunu doğrulamaz. Özellikle sayfalama, boş sonuç ve izin yok durumları arayüzle birlikte test edilir.`
      ],source:'rfc6585'},
      {label:'04 / Rapor',title:'Denemeyi ürün kararına bağlayın',paragraphs:[
        `Kısa bir deneme kaydı tutun: ortam, sentetik veri, komutun sır içermeyen biçimi, beklenen sonuç, gerçekleşen kod/gövde ve kullanıcı etkisi. Uyuşmazlıkta requestId, tarih ve sürüm eklenir. Anahtar, token veya kişisel veri hata raporuna kopyalanmaz. Böylece mühendislik ekibi aynı koşulu yeniden üretebilir.`,
        `Son soruyu sorun: API sözleşmesi iyi çalışsa bile kullanıcı işi tamamlanıyor mu? Boş liste doğru gösteriliyor mu, 429’da kontrollü bekleme var mı, timeout yeni iş üretmeden yönetiliyor mu? Teknik deneme, ürün davranışının küçük ama güçlü bir kanıt parçasıdır.`
      ],decision:'Karar sorusu: Hangi yanıtı hata, hangisini geçerli boş sonuç olarak tanımlayacaksınız?'}
    ]
  }
};
