// Ders 06–10. Sentetik hesap/ödeme örnekleri gerçek müşteri verisi içermez.
export const expanded0610={
  'kimlik-yetki':{
    number:'06',deck:'Giriş, oturum ve kaynak erişimini üç ayrı karar olarak ele alın.',
    thesis:'Kimlik doğrulama “kim?”, yetkilendirme “bu kaynakta ne yapabilir?” sorusunu yanıtlar; oturum bu kararların süre içindeki taşıyıcısıdır.',
    sources:['oidc','oauth','owaspApi','mdnStatus'],
    motion:{mode:'gate',title:'Bir profil isteği üç kapıdan geçer',caption:'Hesap değiştirmede eski hesabın önbelleği ve açık istekleri de hesaba katılmalıdır.',steps:[
      {title:'Kimlik',detail:'Kullanıcının oturumu geçerli mi?'},
      {title:'Özne',detail:'İstek hangi hesap adına yapılıyor?'},
      {title:'Kaynak',detail:'Bu profil o özneye ait mi?'},
      {title:'Görünüm',detail:'Yalnız izinli alanlar çizilir.'}
    ]},
    memory:{hook:'Üç soru: Kim? Kimin adına? Hangi kayıt?',question:'Giriş yapmış A kullanıcısı URL’deki profil kimliğini B ile değiştirirse hangi kontrol sonucu belirler?',answer:'Sunucu, B profiline erişim yetkisini nesne düzeyinde yeniden denetlemelidir. Giriş yapılmış olması veya istemcinin butonu saklaması yeterli değildir.'},
    practice:{brief:'Mobil uygulamada kullanıcı A hesabından B hesabına geçiyor. A profili ve son işlemleri önbellekte; A için başlatılmış bir istek henüz dönmedi. B hesabının ilk ekranını tasarlayın.',deliverables:['Oturum ve hesap bağlamı değişim sırası','Eski önbellek ile geç dönen isteğin ele alınması','401, 403 ve geçici servis hatasının ayrı kullanıcı davranışı'],model:[
      'Önce aktif hesap bağlamı değişir ve A hesabına ait görünür veriler kaldırılır. A için açık isteklerin sonucu iptal edilir veya hesap kimliği eşleşmediği için görünüme uygulanmaz. B oturumu doğrulanır; B verisi ancak sunucudaki nesne düzeyi yetki kontrolünden sonra gösterilir.',
      '401 oturumun yeniden kurulmasını gerektirir; 403 erişim yok durumudur; 5xx geçici arıza olarak tekrar deneme sunabilir. Destek kaydında hassas veri değil, işlem/istek kimliği ve yetki kararının türü tutulur.'
    ]},
    chapters:[
      {label:'01 / Ayrım',title:'Giriş yapmak, veriyi görme hakkı vermez',paragraphs:[
        `Kimlik doğrulama kullanıcının kim olduğunu veya hangi hesapla oturum açtığını kanıtlamaya çalışır. Yetkilendirme ise belirli bir işlem ve nesne için izin kararını verir. OpenID Connect kimlik katmanı, OAuth 2.0 ise yetki devri çerçevesidir; ürün belgelerinde bu iki amacı “token var” cümlesine indirmek yanlış tasarıma yol açar. Aynı kullanıcı kendi profilini okuyabilir ama başka kullanıcının profilini okuyamaz; yönetici rolü de her veri alanını otomatik olarak görmez.`,
        `Ürün akışında kaynak kimliği URL, gövde veya oturumdan gelebilir. İstemcinin gönderdiği “userId” güvenilir otorite değildir. Sunucu kimliği doğrulanmış özneyle istenen nesnenin sahipliğini ve izin kapsamını karşılaştırmalıdır. OWASP’ın nesne düzeyi yetkilendirme uyarısı, bu kontrolün her nesneye erişen işlevde ele alınmasını ister. Kabul kriteri “giriş yoksa ekran açılmaz” ile bitmez; A kullanıcısının B kaydını farklı yollarla isteyememesi de sınanır.`
      ],bullets:['Kimlik doğrulama özneyi kurar.','Yetkilendirme her işlem ve nesne için karar verir.','İstemci görünümü güvenlik sınırı değildir.'],source:'owaspApi'},
      {label:'02 / Oturum',title:'Oturumun ömrü ve hesap değiştirme',paragraphs:[
        `Oturum, kimlik bilgisinin istekler arasında taşınmasını sağlar; kısa veya uzun ömür seçimi kullanılabilirlik ve ele geçirilme penceresini etkiler. “30 gün giriş açık kalsın” isteği, kimlik yenileme, cihaz kaybı, çıkış, parola değişimi ve kritik işlemde yeniden doğrulama davranışı belirlenmeden eksiktir. Token biçimi tek başına bu ürün kararlarını çözmez. Oturum iptali, sunucu tarafı durum veya belirli bir geçerlilik politikası gerektirebilir.`,
        `Hesap değiştirme sırasında en zor hata, yeni hesap için eski hesabın verisinin bir an görünmesidir. İstemcide saklanan profil, arama sonucu, son işlemler ve devam eden istekler hesap sınırına bağlanmalıdır. Geç gelen A yanıtı B ekranına uygulanmamalıdır. Çoklu hesap deneyimi tasarlanırken yalnız çıkış düğmesi değil, veri temizleme sırası ve bağlantı kesikken hangi hesabın gösterileceği de yazılır.`
      ],decision:'Karar sorusu: Hesap değişiminde önce hangi veri gizlenir, sonra hangi kanıtla yeni veri gösterilir?'},
      {label:'03 / Hata',title:'401 ile 403 farklı ürün durumlarıdır',paragraphs:[
        `401, isteğin geçerli kimlik bilgisiyle tamamlanamadığını; 403, sunucunun isteği anladığı halde erişimi reddettiğini ifade eder. Uygulama 401’de oturumu yenilemeyi veya yeniden giriş istemeyi seçebilir. 403’te aynı istekle tekrar tekrar giriş yaptırmak çözüm olmayabilir; kullanıcıya erişim sınırı açıklanır. Gerçek hata sözleşmesinde güvenlik açısından ne kadar ayrıntı verileceği ayrıca kararlaştırılır.`,
        `Başarısız kimlik veya yetki denemelerini ölçerken aynı kişiyi ifşa edecek kayıtlar üretmemek gerekir. Destek ekibi “kullanıcı giriş yapamadı mı, erişim mi reddedildi, servis mi çöktü?” ayrımını görebilmelidir. Ürün gereksinimi hata metni, yeniden deneme yolu, hesap değiştirme yolu ve desteğe taşınacak güvenli referansı birlikte tarif eder.`
      ],sample:'GET /accounts/B/profile\nAuthorization: Bearer <A oturumu>\n\n403 Forbidden\n{ "code": "ACCOUNT_ACCESS_DENIED", "requestId": "req_42" }',source:'mdnStatus'},
      {label:'04 / Karar',title:'Yetki matrisini ekrana değil kaynağa kurun',paragraphs:[
        `Bir yetki matrisi oluşturun: aktör, işlem, nesne, koşul ve görünür sonuç. Örneğin “hesap sahibi, kendi faturasını okur”; “destek görevlisi, maskelenmiş fatura özetini gerekçeli erişimle görür”; “başka kullanıcı, hiçbir faturayı okuyamaz”. Her hücre hem API testine hem de ekran durumuna bağlanır. Alan düzeyinde maskeleme ile nesne düzeyi erişim farklı kontrollerdir.`,
        `PM/PO’nun görevi rol isimleri icat etmekten çok sınırların kullanıcı amacına uyduğunu doğrulamaktır. Dış entegrasyon, eski mobil sürüm ve iç operasyon aracı aynı veriye başka yollarla ulaşabiliyorsa kontrol her yerde tutarlı olmalıdır. “Sadece ekranda sakladık” veya “ID tahmin edilemez” gerekçeleri yetki testinin yerini tutmaz.`
      ],decision:'Çıktı: Üç aktör × üç işlem × iki hesap durumu için izin ve hata davranışı matrisi.'}
    ]
  },
  'veri-modeli':{
    number:'07',deck:'Tablo adlarından önce kimliği, sahipliği ve yaşam döngüsünü belirleyin.',
    thesis:'İyi veri modeli, hangi kaydın neyi temsil ettiğini ve bir iş olayı tekrarlandığında hangi kimliğin sabit kaldığını açıklar.',
    sources:['postgres','pgConstraints'],
    motion:{mode:'model',title:'Bir satın alma, üç ayrı kayıt',caption:'Bir siparişin birden fazla ödeme girişimi olabilir; hak tanımı ancak doğrulanmış sonuçla değişir.',steps:[
      {title:'Sipariş',detail:'Kullanıcının tek satın alma niyeti.'},
      {title:'Girişim',detail:'Sağlayıcıya yapılan her deneme.'},
      {title:'Sonuç',detail:'Ödeme sonucu ve kanıtı.'},
      {title:'Hak',detail:'Üründe açılan erişim.'}
    ]},
    memory:{hook:'Kimlik ≠ deneme ≠ sonuç. Bir sipariş, birçok ödeme girişimi.',question:'Ödeme sağlayıcısı yanıt vermez ve aynı sipariş yeniden denenirse yeni sipariş mi, yeni girişim mi doğar?',answer:'Aynı satın alma niyeti için sipariş kimliği korunur; deneme ayrı bir kayıt olabilir. Çift hak açılmaması için sonuç ve hak verme kuralı ayrıca korunur.'},
    practice:{brief:'Bir kullanıcı tek bir dijital paket satın alıyor. İlk ödeme denemesi zaman aşımına uğruyor, ikinci deneme tamamlanıyor, ilk denemenin sonucu sonradan geliyor.',deliverables:['Kullanıcı, sipariş, ödeme girişimi ve hak kimlikleri','1→çok ilişkiler ve sahiplik sınırları','İki deneme de “başarılı” görünürse uzlaşma kuralı'],model:[
      'Kullanıcı birden çok siparişe, sipariş birden çok ödeme girişimine sahip olabilir. Her denemenin sağlayıcı referansı ayrı tutulur. Hak kaydı siparişe bağlanır; aynı sipariş için ikinci hak oluşturulmasını engelleyen bir iş kuralı ve veri kısıtı gerekir.',
      'Geç gelen sonuç sessizce ikinci paket açmaz. Ödeme ve hak kayıtları arasındaki çelişki izlenir, gerektiğinde geri ödeme/uzlaşma sürecine alınır. Bu davranışın kesin biçimi ödeme sağlayıcısı sözleşmesine göre seçilir.'
    ]},
    chapters:[
      {label:'01 / Varlık',title:'Önce “bir satır ne demek?” sorusunu yanıtlayın',paragraphs:[
        `Kullanıcı, sipariş, ödeme girişimi ve ürün hakkı benzer ekranda görülebilir ama aynı şey değildir. Sipariş tek bir satın alma niyetini; ödeme girişimi dış sağlayıcıyla belirli bir denemeyi; hak ise ürünün erişim sonucunu temsil eder. Bunları tek “payment” kaydına sıkıştırmak, timeout sonrasındaki ikinci denemeyi, geri ödemeyi ve destek incelemesini belirsiz hale getirir. Veri modellemesi, tablo çizmeden önce bu kimlikleri ve yaşam döngülerini ayırma işidir.`,
        `Her varlık için “ne zaman doğar, ne zaman değişir, kime aittir, silinirse ne olur?” soruları yazılır. İstemcinin rastgele ürettiği bir ekran kimliği, sunucunun kalıcı sipariş kimliğiyle aynı amaçta olmayabilir. Destek, analitik ve finans kayıtları da kimliklerin kararlı olmasına dayanır. Ürün kararı bir alan listesi değil, bu sınırların kullanıcıya ve operasyona etkisidir.`
      ],bullets:['Bir kayıt için tek açık anlam tanımlayın.','İş niyeti ile teknik denemeyi ayırın.','Sahipliği ve yaşam döngüsünü yazın.']},
      {label:'02 / İlişki',title:'Anahtar ve ilişki, ürün kuralını taşır',paragraphs:[
        `Bir kullanıcının çok siparişi, bir siparişin çok ödeme girişimi olabilir. Yabancı anahtar, bir girişimin var olan siparişe bağlanmasını sağlayan veri bütünlüğü aracıdır; fakat “yalnız bir hak ver” gibi iş kuralını tek başına çözmez. Benzersizlik kısıtı bazı değişmezleri koruyabilir; koşullu, zamanla değişen veya dış sistemle ilgili kural için işlem mantığı da gerekir. PostgreSQL belgeleri birincil anahtar, yabancı anahtar, NOT NULL ve CHECK kısıtlarını ayrı amaçlarla tanımlar.`,
        `İlişki çiziminde yön kadar çokluk ve opsiyonellik de önemlidir. Ödeme girişimi sipariş olmadan var olabiliyor mu? Henüz ödeme yapmamış siparişin girişimi sıfır olabilir mi? İptal edilmiş kullanıcı kaydı geçmiş finans kayıtlarını nasıl etkiler? Bu sorular cevaplanmadan verilen “1→çok” oku eksiktir. Silme davranışı veri saklama ve rapor gereksinimiyle birlikte düşünülür.`
      ],source:'pgConstraints'},
      {label:'03 / Saklanan anlam',title:'Kaydedilen, türetilen ve geçmiş değerleri ayırın',paragraphs:[
        `“Toplam tutar” sipariş satırlarından yeniden hesaplanabilir gibi görünür; ancak fiyat, vergi veya kampanya kuralı sonradan değiştiğinde geçmiş işlemin hangi tutarla kabul edildiği kaybolmamalıdır. Bu nedenle bazı değerler karar anındaki kanıt olarak saklanır. Diğerleri güncel kaynak veriden türetilir. İkisini ayırmak gereksiz tekrar ile denetlenebilir geçmiş arasında bilinçli bir seçim yapmayı sağlar.`,
        `Ürün belgesinde her alan için anlam, kaynak, değişebilirlik ve hassasiyet yazılmalıdır. “price” alanı liste fiyatı mı, indirim sonrası tahsil edilecek tutar mı, sağlayıcının tahsil ettiği tutar mı? Aynı kelimenin üç tabloda farklı anlam taşıması raporlarda sessiz hata üretir. Veri sözlüğü, API sözleşmesi ve olay tanımı aynı semantiği kullanmalıdır.`
      ],sample:'Kullanıcı 1 ── N Sipariş 1 ── N ÖdemeGirişimi\nSipariş 1 ── 0..1 Hak\n\nSipariş: niyet ve kabul edilen tutar\nÖdemeGirişimi: sağlayıcı isteği ve sonucu\nHak: üründe açılan erişim'},
      {label:'04 / Karar',title:'Modeli başarısız senaryoyla sınayın',paragraphs:[
        `Modeli yalnız başarılı satın alma ile test etmeyin. Yanıt kaybı, yinelenen webhook, geri ödeme, eski siparişin yeniden açılması ve hesap kapatma senaryolarını sırayla geçirin. Her olayda hangi kayıt yeni oluşur, hangisi güncellenir, hangisi değişmez? Cevap net değilse veri modeli henüz ürün davranışını taşımıyor demektir.`,
        `PM/PO’nun karar çıktısı fiziksel SQL şeması olmak zorunda değildir. Bir varlık haritası, kimlik/sahiplik tanımı ve dört temel değişmez çoğu tartışmayı açar: bir siparişin niyeti tek, denemeleri çok olabilir; ödeme kanıtı olmadan hak açılmaz; aynı sonuç iki hak yaratmaz; geçmiş tahsilat tutarı sonradan değişmez. Mühendislik ekibi bunun hangi kısıt ve işlem yapısıyla korunacağını seçer.`
      ],decision:'Karar sorusu: Hangi değer geçmiş iş kanıtıdır, hangisi güncel veriden yeniden üretilebilir?'}
    ]
  },
  'veri-islemleri':{
    number:'08',deck:'Hız, atomiklik ve şema değişimini aynı ürün akışında okuyun.',
    thesis:'İndeks sorguyu hızlandırabilir, transaction yerel değişiklikleri birlikte tutar; migration ise çalışan eski ve yeni sürümlerin aynı veriyi anlamasını sağlar.',
    sources:['pgIndex','pgiso','postgres'],
    motion:{mode:'migrate',title:'Zorunlu alanı güvenli ekleme',caption:'Önce yeni alanı okuyup yazabilen sürümler yayılır; eski kayıtlar doldurulmadan alan zorunlu kılınmaz.',steps:[
      {title:'Genişlet',detail:'Yeni alanı opsiyonel ekle.'},
      {title:'Çift uyum',detail:'Eski ve yeni istemciler çalışır.'},
      {title:'Doldur',detail:'Geçmiş kayıtları kontrollü taşı.'},
      {title:'Daralt',detail:'Doğrula, sonra zorunlu yap.'}
    ]},
    memory:{hook:'İndeks = bulma. Transaction = birlikte olma. Migration = zaman içinde uyum.',question:'Yeni currency alanını ilk gün NOT NULL yapmak eski mobil sürümlerde hangi riski doğurur?',answer:'Eski sürüm alanı göndermiyorsa yazma işlemi reddedilebilir. Önce uyumlu okuma/yazma, sonra veri doldurma ve en son kısıt uygulanır.'},
    practice:{brief:'Siparişe currency alanı eklenecek. Üretimde milyonlarca kayıt ve güncellemesi geciken mobil istemciler var. Ayrıca “son 30 gün siparişleri” sorgusu yavaş.',deliverables:['Genişlet–doldur–daralt yayın planı','Eski istemci yazma ve okuma davranışı','İndeks kararının sorgu ve yazma maliyetiyle gerekçesi'],model:[
      'Önce nullable alan ve sunucuda güvenli varsayılan/uyumluluk davranışı eklenir. Yeni kod alanı yazar ve okur; geçmiş kayıtlar partiler halinde doldurulur. Eksik kayıt ve hata oranı ölçülür. Eski istemciler güvenle desteklendikten sonra uygun kısıt uygulanır.',
      'Yavaş sorgu için önce gerçek sorgu planı ve filtre/sıralama kullanımı görülür. İndeks, okuma maliyetini azaltabilir ama yazma ve depolama maliyeti getirir. Üretim veritabanında indeks oluşturma yöntemi kilit ve süre etkisine göre seçilir.'
    ]},
    chapters:[
      {label:'01 / İndeks',title:'İndeks hız vaadi değil, sorgu şekline bağlı yatırımdır',paragraphs:[
        `İndeks, belirli alanlara göre satır bulmayı kolaylaştıran ek bir yapıdır. Her sorguyu otomatik hızlandırmaz: seçicilik, filtre, sıralama, veri büyüklüğü ve sorgu planı belirleyicidir. “Tüm alanları indeksleyelim” yaklaşımı yazma maliyeti, depolama ve bakım yükünü büyütür. PM/PO için doğru talep “sipariş listesi hızlı olsun” değil; hangi filtre, hangi sıralama, yaklaşık hacim ve hangi kullanıcı bekleme eşiği sorularını açık yazmaktır.`,
        `PostgreSQL’in EXPLAIN ve indeks belgeleri, sorgu planının incelenmesini ve üretimde indeks ekleme yönteminin yazma trafiğine etkisini vurgular. Özellikle büyük canlı tabloda standart indeks oluşturma yazan işlemleri engelleyebilir; eşzamanlı yöntem daha uzun sürebilir ama normal işlemlere izin verir. Bu yüzden indeks kararı performans ile yayın riski birlikte değerlendirilerek alınır.`
      ],source:'pgIndex'},
      {label:'02 / Transaction',title:'Birlikte olmalı işlemleri sınırlandırın',paragraphs:[
        `Transaction, bir veritabanındaki birden fazla değişikliğin tutarlı bir bütün olarak ele alınmasını sağlar. Örneğin sipariş “tamamlandı” yazılırken aynı veritabanındaki hak kaydı açılıyorsa, arada çökme olduğunda yarım durum kalmaması istenir. Ancak dış ödeme sağlayıcısı ve kendi veritabanınız tek bir yerel transaction içinde değildir. “Transaction var, ödeme tam bir kez olur” varsayımı sınırı aşar.`,
        `Eşzamanlı istekler de ayrı bir sorundur. İki işlem aynı stok adedini okuyup ikisi de son ürünü satabilir. İzolasyon düzeyi ve kilitleme davranışı bu yarışları etkiler; ürün gereksinimi “stok eksiye düşmez” gibi değişmezi açıkça verir. Mühendislik ekibi uygun atomik güncelleme veya izolasyon yöntemini seçer; PM/PO ise başarısız yarışın kullanıcıya nasıl döneceğini belirler.`
      ],source:'pgiso'},
      {label:'03 / Migration',title:'Şema değişikliği bir zaman çizelgesidir',paragraphs:[
        `Yeni currency alanını eklemek, yalnız ALTER TABLE çalıştırmak değildir. Sunucunun eski kodu, yeni kodu, eski mobil istemci ve geçmiş satırlar bir süre birlikte yaşayabilir. Genişlet–doldur–daralt yaklaşımında önce yeni alan opsiyonel tanıtılır, kod her iki biçimi anlar, geçmiş veri doldurulur, ölçümle eksikler görülür ve en son zorunluluk uygulanır. Silme veya yeniden adlandırma, tüm tüketiciler hazır olmadan yapılmaz.`,
        `Bu sıra geri alma olanağını da belirler. Yeni sürüm hatalı çıkarsa eski sürüme dönüldüğünde yeni şemayla çalışabilecek mi? Veri bir kez dönüştürüldüyse geri dönüşte kayıp olur mu? Ürün yayın planında uyumluluk penceresi, veri doldurma başarısı, kapatma koşulu ve destek izlemesi bulunmalıdır. “Migration tamamlandı” ancak eski ve yeni davranışlar doğrulandığında söylenebilir.`
      ],sample:'Aşama 1: currency NULL kabul eder\nAşama 2: yeni yazmalar currency üretir; eski yazmalar sunucuda ele alınır\nAşama 3: geçmiş kayıtlar doldurulur ve sayılır\nAşama 4: tüm tüketiciler doğrulanır; NOT NULL değerlendirilir'},
      {label:'04 / Karar',title:'Üç mekanizmayı aynı risk haritasında birleştirin',paragraphs:[
        `İndeks, transaction ve migration çoğu zaman aynı sipariş özelliğinde buluşur. Yeni alanın sorgulanması indeks isteyebilir; aynı anda iki alanın güncellenmesi transaction sınırı isteyebilir; eski istemcilerle yaşamak migration planı isteyebilir. Tek bir “veritabanı işi” başlığında toplandıklarında riskler görünmez olur. Her mekanizma için kullanıcı etkisi, ölçülecek sinyal ve geri alma yolu ayrı yazılır.`,
        `Ekipten somut kanıt isteyin: yavaş sorgunun planı, yarış durumunun yeniden üretimi, veri doldurma sayımı ve eski istemciyle sözleşme testi. Bunlar geliştirme detayına karışmak değildir; ürün davranışının gerçekleştiğini doğrulamaktır. Karar kaydında kabul edilen geçiş penceresi ve olası kısmi başarısızlığın kullanıcı sonucu açık kalmalıdır.`
      ],decision:'Karar sorusu: Yeni alan ve yavaş sorgu aynı yayında mı çözülmeli, yoksa riskleri ayıran iki yayın mı gerekir?'}
    ]
  },
  'veri-tuzaklari':{
    number:'09',deck:'“Tarih”, “fiyat”, “boş” ve “tamamlandı” kelimelerini kesin kurallara çevirin.',
    thesis:'Veri tipinin teknik olarak geçerli olması, ürün anlamının doğru olduğu anlamına gelmez.',
    sources:['pgDate','pgNumeric','pgConstraints'],
    motion:{mode:'trap',title:'Tek kampanya, dört sessiz anlam hatası',caption:'Bu alanların her biri kabul kriterinde ayrı sınır örneğiyle test edilmelidir.',steps:[
      {title:'Zaman',detail:'Bitiş anı hangi zaman diliminde?'},
      {title:'Para',detail:'Tutar ve para birimi birlikte mi?'},
      {title:'Boş',detail:'Yok, bilinmiyor ve sıfır ayrı mı?'},
      {title:'Durum',detail:'Gösterildi mi, uygulandı mı?'}
    ]},
    memory:{hook:'Z-P-B-D: Zaman, Para, Boşluk, Durum. Dördünü de sınır örneğiyle sor.',question:'Kampanyanın “Cuma gece” bitmesi için yalnız 23:59 yazmak neden eksik?',answer:'Tarih, yerel zaman dilimi, saniye hassasiyeti ve bitiş sınırının dahil mi hariç mi olduğu belirtilmelidir. Açık bir bitiş anı ve karşılaştırma kuralı gerekir.'},
    practice:{brief:'“Kampanya cuma gece biter, 99,90 fiyatlıdır; uygun olmayan kullanıcıda indirim alanı boş kalır.” Bu cümleyi uygulama ve test için kesinleştirin.',deliverables:['Zaman dilimi ve dahil/hariç bitiş sınırı','Tutar, para birimi, yuvarlama ve gösterim','Boş alanın üç olası anlamı ve durum geçişi'],model:[
      'Örnek: Kampanya Europe/Istanbul takviminde 2026-10-09 23:59:59.999 yerine 2026-10-10 00:00 yerel anında biter; geçerlilik koşulu now < endExclusive. Sunucu bu anı zaman dilimi bilgisiyle saklar ve karşılaştırır.',
      'Örnek fiyat TRY 99,90 olarak tanımlanır; tahsil tutarı ve gösterim ayrı alanlardır. “Uygun değil” durumu null indirimden çıkarılmaz; uygunluk nedeni ayrı bir durum koduyla taşınır. Yuvarlama kuralı ödeme ve fiş akışıyla doğrulanır.'
    ]},
    chapters:[
      {label:'01 / Zaman',title:'Bir tarih, bir an ve bir yerel saat aynı şey değildir',paragraphs:[
        `“Cuma gece” takvim günü mü, yerel saat mi, mutlak bitiş anı mı? Kullanıcı başka ülkedeyse hangi kural uygulanır? Geçerlilik aralığını başlangıç dahil, bitiş hariç olarak yazmak sınır saniyesi tartışmasını azaltır. PostgreSQL’in timezone-aware timestamp davranışında değer UTC temelli tutulur, gösterim oturum zaman dilimine göre değişir; orijinal bölge adı otomatik saklanmaz. Kampanyanın ticari kuralı belirli bir yerel bölgeye bağlıysa bölge bilgisini de açık tutmak gerekebilir.`,
        `Yaz saati değişiklikleri olan bölgelerde yalnız sabit UTC offset’i gelecekteki yerel saat kuralını temsil etmeyebilir. Testler kampanyanın başlangıcından bir an önce, tam başlangıçta, bitişten bir an önce ve tam bitişte yapılmalıdır. PM/PO’nun kabul kriteri “00:00’a kadar” gibi yoruma açık ifadeler yerine tam bölge ve sınır karşılaştırmasını söyler.`
      ],source:'pgDate'},
      {label:'02 / Para',title:'Tutar, para birimi ve yuvarlama ayrılmaz',paragraphs:[
        `99,90 tek başına fiyat değildir: TRY mi EUR mu, vergi dahil mi, indirim öncesi mi, tahsil tutarı mı? Para için ikili kayan nokta kullanımı temsil ve yuvarlama hatası doğurabilir; kesin ondalık veya tam sayı alt birim yaklaşımı seçilir. Ancak “kuruş olarak sakla” da her para biriminin aynı alt birime sahip olduğunu varsaymamalıdır. İndirim ve vergi hesaplama sırası, bölme ve yuvarlama noktası ürün kuralıdır.`,
        `Liste ekranı 99,90 gösterip ödeme 100,00 çekiyorsa veri tipi doğru olsa bile ürün başarısızdır. Karşılaştırmada ham tutar, para birimi, gösterim ve sağlayıcı tahsilat kaydı ayrı tutulur. Geçmiş siparişte karar anındaki fiyat saklanır; bugünkü katalog fiyatından yeniden türetilmez.`
      ],source:'pgNumeric'},
      {label:'03 / Boş',title:'Null, sıfır ve uygulanmaz farklı durumlardır',paragraphs:[
        `“İndirim alanı boş” üç farklı şeyi anlatabilir: indirim yok, uygunluk henüz hesaplanmadı veya bu ürün için indirim kavramı uygulanmıyor. Bu anlamlar tek null değerde birleşirse arayüz yanlış “%0” gösterebilir, analitik uygun olmayanları hesaplanmamışlarla karıştırır. Alanın boş olma nedeni ayrı durum veya açık bir sözleşme ile ifade edilmelidir.`,
        `Veritabanı kısıtları bazı imkânsız değerleri engeller, ama null’un iş anlamını tanımlamaz. Ürün belgesinde her isteğe bağlı alan için “yoksa ne anlama gelir, kim hesaplar, ne zaman dolar?” soruları yazılır. API örneklerinde alanın hiç bulunmaması ile null gelmesi de ayrı yorumlanıyorsa açıkça belirtilir.`
      ],source:'pgConstraints'},
      {label:'04 / Durum',title:'“Tamamlandı” etiketini olayla bağlayın',paragraphs:[
        `Kampanya “yayınlandı” demek mesaj kuyruğuna alındı mı, sağlayıcı kabul etti mi, kullanıcıya teslim edildi mi? Tek bir durum etiketi üç ayrı aşamayı birleştirirse destek ve ölçüm yanıltılır. Durumun kaynağı, doğrulayan olay ve geri dönüş olasılığı yazılmalıdır. Özellikle dış sistem sonucunda “bilinmiyor” durumu başarısızlığa zorla çevrilmemelidir.`,
        `Akılda kalacak test şudur: Alan adını ve örnek değerini başka bir ekibe gösterin; aynı davranışı tarif ediyorlar mı? Etmiyorlarsa ürün anlamı henüz sözleşme değildir. Zaman, para, boş değer ve durum için ayrı sınır örnekleri yazmak, çok sayıda üretim hatasını geliştirme başlamadan görünür kılar.`
      ],decision:'Karar sorusu: Ekrandaki “geçerli” ve “tamamlandı” etiketini hangi kesin olay ve zaman sınırı doğrular?'}
    ]
  },
  'durum-modeli':{
    number:'10',deck:'Bir işlemin bütün görünür durumlarını ve geçiş koşullarını yazın.',
    thesis:'Kullanıcı yalnız başarıyı değil, beklemeyi, kısmi sonucu, belirsizliği ve toparlanma yolunu da deneyimler.',
    sources:['stripe','slo'],
    motion:{mode:'state',title:'Ödeme ekranının dürüst durumları',caption:'Timeout sonrasında “başarısız” demek yerine doğrulama gerektiren ayrı bir durum tutulur.',steps:[
      {title:'Hazır',detail:'İstek henüz gönderilmedi.'},
      {title:'İşleniyor',detail:'Yanıt bekleniyor.'},
      {title:'Sonuç bilinmiyor',detail:'Yanıt yok; durum sorgulanmalı.'},
      {title:'Doğrulandı',detail:'Başarı veya ret kanıtlandı.'}
    ]},
    memory:{hook:'Durum = görünen isim + giriş koşulu + çıkış yolu.',question:'Ödeme isteği timeout aldı. Ekran “başarısız” deyip yeni ödeme başlatabilir mi?',answer:'Hayır. Sağlayıcı işlemiş olabilir. Önce aynı niyetin durumu güvenilir referansla sorgulanır; kullanıcıya “sonuç doğrulanıyor” gibi dürüst bir durum gösterilir.'},
    practice:{brief:'“Ödeme güvenilir olmalı” cümlesini geliştirilebilir bir durum modeline çevirin. Sağlayıcı geç yanıt verebilir veya yanıt kaybolabilir.',deliverables:['En az beş görünür durum ve giriş koşulları','Her durumdan izinli çıkışlar ve yasak geçişler','Belirsiz sonuç için iki ölçülebilir kabul kriteri'],model:[
      'Örnek: hazır → gönderiliyor → işleniyor → başarılı / reddedildi / sonuç doğrulanıyor. “Sonuç doğrulanıyor” durumundan güvenilir sorgu veya uzlaşma ile başarılı/reddedildiye geçilir. Yeni satın alma niyeti oluşturmak, aynı isteği yeniden göndermekten ayrı eylemdir.',
      'Kabul kriteri: Yanıt kaybolduğunda ekranda kesin ret veya başarı gösterilmez. Aynı sipariş için tekrar düğmesi yeni hak üretmez; durum doğrulanana kadar işlem referansı destek ve kullanıcı görünümünde korunur.'
    ]},
    chapters:[
      {label:'01 / Model',title:'Ekran akışını durum makinesi olarak görün',paragraphs:[
        `Durum makinesi, sistemin hangi durumlarda bulunabileceğini ve hangi olayın hangi geçişe izin verdiğini tanımlar. Ödeme örneğinde hazır, gönderiliyor, işleniyor, başarılı, reddedildi ve sonuç bilinmiyor farklı durumlardır. “Loading” ile “bilinmiyor” aynı şey değildir: ilki normal bekleme, ikincisi yanıtın kaybolmuş olabileceği bir doğrulama ihtiyacıdır. Her duruma giriş koşulu ve kullanıcıya görünen metin bağlanır.`,
        `Geçişler de sınırlandırılmalıdır. Başarılı siparişin geç gelen eski “işleniyor” yanıtıyla geri dönmesi, ters sıradaki olayların ekrana yanlış uygulanmasıdır. Ürün gereksinimi yalnız ekran görüntülerini değil, olay sırası değiştiğinde hangi durumun üstün geleceğini de tarif eder. Durumları veri modeliyle eşlemek, yalnız istemcide duran sahte kesinlikleri önler.`
      ],bullets:['Her durumun kanıtı vardır.','Her geçişin tetikleyicisi ve sahibi vardır.','Belirsizlik ayrı bir durumdur.']},
      {label:'02 / Hata',title:'Başarısızlık ile belirsizliği ayırın',paragraphs:[
        `Kart reddi gibi açık sağlayıcı yanıtı, doğrulanmış başarısızlıktır. Zaman aşımı ise belirlenen sürede yanıt görülmediği anlamına gelir; ödeme gerçekleşmiş olabilir. Bu fark kullanıcı metnine ve düğmeye yansır. “Tekrar öde” yanlışlıkla ikinci tahsilat başlatabilir; “İşlem durumunu kontrol et” aynı niyete bağlı güvenli bir eylem olabilir.`,
        `Kısmi sonuç da mümkündür: ödeme onaylandı ama hak henüz açılmadı. Bu, “başarılı” mesajını hangi olayda göstereceğiniz sorusunu doğurur. İşlemin finansal ve ürün tarafı arasında uzlaşma yolu, destek kaydı ve makul bekleme sınırı tanımlanır. Kullanıcıdan gizlenen uzun bekleme, operasyonel hata yükünü büyütür.`
      ],source:'stripe'},
      {label:'03 / Kriter',title:'Sıfatı gözlenebilir kabul kriterine çevirin',paragraphs:[
        `“Güvenilir”, “hızlı” veya “sorunsuz” test edilebilir gereksinim değildir. Bunun yerine koşul, eylem ve beklenen durum yazılır: “Yanıt 10 saniyede gelmezse işlem referansı korunur, ekran ‘sonuç doğrulanıyor’ gösterir ve yeni ödeme oluşturulmaz.” Buradaki 10 saniye örnek ürün eşiğidir, evrensel standart değildir; gerçek hedef kullanıcı araştırması ve sistem ölçümünden seçilir.`,
        `Ölçülebilirlik yalnız süre değildir. Bilinmeyen durumda kalan sipariş oranı, doğrulama süresi, çift hak sayısı ve destek başvurusu gibi göstergeler durum modelinin çalışıp çalışmadığını gösterir. SLO yaklaşımı, kullanıcı açısından iyi sonuç veren olayların oranını tanımlamayı öğretir; her teknik başarılı yanıtı kullanıcı başarısıyla eşitlemez.`
      ],sample:'Koşul: ödeme isteği gönderildi, yanıt kayboldu\nBeklenen: durum = SONUÇ_DOĞRULANIYOR\nİzinli eylem: aynı sipariş için durum sorgula\nYasak eylem: otomatik yeni sipariş oluştur',source:'slo'},
      {label:'04 / Karar',title:'Durum tablosunu toplantı artefaktı yapın',paragraphs:[
        `Altı durumluk bir tablo çoğu uzun akış belgesinden daha değerlidir: durum adı, giriş kanıtı, görünen metin, izinli eylem, çıkış olayı ve ölçüm sinyali. Bu tabloyu tasarım, mobil, backend, analitik ve destek birlikte okuyabilir. Her ekibin aynı kelimeyi farklı kullanması erken fark edilir.`,
        `Son adımda ters ve gecikmiş olaylarla masa başı provası yapın. İki ödeme denemesi, ağ kesintisi, uygulamanın kapanması, webhook’un geç gelmesi ve kullanıcının başka cihazdan bakması durumlarında aynı sonuca ulaşılıyor mu? Eğer durum yalnız ekran belleğinde yaşıyorsa bu senaryolarda kopacaktır. Kalıcı iş durumu ile geçici arayüz durumunu ayırın.`
      ],decision:'Karar sorusu: Kullanıcıya kesin başarı hangi kanıt geldiğinde söylenebilir?'}
    ]
  }
};
