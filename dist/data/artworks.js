// Ürün Atölyesi: every route receives its own teaching diagram.
// Labels describe a conceptual model, not measured data or a prescribed architecture.
const specs = {
  home:{kind:'network',title:'Bir ürün kararının etrafındaki sistem',center:'Ürün kararı',items:['Kullanıcı ihtiyacı','Teknik mekanizma','Risk ve ödünleşim','Başarı sinyali'],caption:'Atlas, teknik kavramları bu dört soruya bağlayarak öğretir.'},
  path:{kind:'timeline',title:'Öğrenme rotası',items:['Akışı gör','Sözleşmeyi anla','Veriyi ve durumu çöz','İşlet ve ölç'],caption:'Sıra, bir ürün isteğinin sistemde nasıl ilerlediğini izler.'},
  library:{kind:'matrix',title:'Dersleri üç gözle tarayın',items:['Temel kavram','Uygulama pratiği','Derin teknik konu','Ürün kararı'],caption:'Bir konuyu yalnız tanımıyla değil, kullanım ve karar bağlamıyla okuyun.'},
  cases:{kind:'network',title:'Aynı sistem, dört vaka',center:'Ürün akışı',items:['Giriş','Ödeme','Kampanya','AI önerisi'],caption:'Vakalar; kimlik, veri, operasyon ve ölçüm kararlarını farklı bağlamlarda tekrar gösterir.'},
  labs:{kind:'cycle',title:'Uygulama döngüsü',items:['Varsayımı yaz','Akışı dene','Sonucu gözle','Kararı düzelt'],caption:'Küçük deney, gözlem ve açıklama birlikte öğrenmeyi pekiştirir.'},
  capstone:{kind:'stack',title:'Bitirme çalışmasının parçaları',items:['Kullanıcı ve sistem akışı','API ve veri sözleşmesi','Hata ve operasyon planı','Ölçüm ve karar kaydı'],caption:'Teslim, tek bir ekran tasarımından çok daha geniş bir ürün kararıdır.'},
  glossary:{kind:'bridge',title:'Terimden karara',items:['Türkçe terim','Teknik anlam','Ürün sorusu'],caption:'Sözlük, kelimeyi toplantıda sorulabilecek somut bir soruya bağlar.'},
  sources:{kind:'flow',title:'Bir iddiayı doğrulama zinciri',items:['Ders iddiası','Birincil kaynak','Sürüm ve tarih','Ürün yorumu'],caption:'Kaynakta yazan olgu ile ürüne yapılan çıkarım ayrı tutulur.'},
  bookmarks:{kind:'stack',title:'Kişisel tekrar masası',items:['Kaydettiğiniz ders','Tekrar edeceğiniz kavram','Uygulanacak örnek'],caption:'Yer imleri bu tarayıcıda saklanır; başka cihazlara eşitlenmez.'},
  legacy:{kind:'bridge',title:'Eski nottan okunabilir derse',items:['Eski konu başlığı','Atlas dersi','Kaynak ve uygulama'],caption:'Eşleştirme, önceki notların yeni ders yapısındaki yerini gösterir.'},
  coverage:{kind:'matrix',title:'Kapsamı dört yönden okuyun',items:['Kavram','Mekanizma','Ürün kararı','Kaynak'],caption:'Kapsam matrisi, her konudaki öğretim ve kanıt durumunu görünür kılar.'},
  'case-giris':{kind:'fork',title:'Girişte karar noktası',center:'Kimlik doğrulama isteği',items:['Başarılı: oturum aç','Başarısız: güvenli geri bildirim'],caption:'Hata mesajı, güvenliği ve kullanıcının toparlanmasını birlikte etkiler.'},
  'case-odeme':{kind:'cycle',title:'Ödeme isteğinin belirsiz sonucu',items:['İstek gönder','Yanıt bekle','Durumu sorgula','Aynı niyeti koru'],caption:'Zaman aşımı, ödemenin gerçekleşmediğini kanıtlamaz.'},
  'case-kampanya':{kind:'tree',title:'Kampanya uygunluk ağacı',center:'Teklif gösterilsin mi?',items:['Hedef kitle','Stok ve süre','Kullanıcı hakkı'],caption:'Teklifin görünmesi ve uygulanabilmesi aynı kural değildir.'},
  'case-ai':{kind:'pipeline',title:'AI önerisinin denetim hattı',items:['Kullanıcı bağlamı','Model çıktısı','Güvenlik ve kural','Gösterim'],caption:'Model yanıtı, ürüne ulaşmadan önce doğrulama ve ürün kurallarından geçer.'},
  'urun-akisi':{kind:'flow',title:'Bir dokunuşun sistem yolculuğu',items:['Kullanıcı','İstemci','Servis','Veri'],caption:'Üründe görünen tek eylem, birden fazla sistem sınırını aşar.'},
  http:{kind:'bridge',title:'İstek ve yanıtın ortak dili',items:['İstemci isteği','HTTP sözleşmesi','Sunucu yanıtı'],caption:'Yöntem, adres, başlık, durum ve gövde birlikte anlam taşır.'},
  'api-sozlesmesi':{kind:'bridge',title:'İki ekibin paylaştığı sözleşme',items:['İstemci beklentisi','API sözleşmesi','Servis davranışı'],caption:'Alan adı, hata biçimi ve sürüm davranışı ürünün dış arayüzüdür.'},
  'kimlik-yetki':{kind:'shield',title:'Kimlikten erişim kararına',center:'Kaynak erişimi',items:['Kim olduğunu doğrula','Ne yapabileceğini denetle','Kararı kaydet'],caption:'Giriş yapmış olmak, her kaynağa yetki verildiği anlamına gelmez.'},
  'veri-modeli':{kind:'tree',title:'Veri ilişkileri',center:'Sipariş',items:['Müşteri','Satır kalemi','Ödeme'],caption:'Kimlik ve ilişki seçimi, sonradan sorulabilecek soruları belirler.'},
  'veri-tuzaklari':{kind:'matrix',title:'Veride dört sessiz hata',items:['Saat dilimi','Para birimi','Boş değer','Yanlış durum'],caption:'Alan doğru görünse bile anlamı yanlış tutulabilir.'},
  'durum-modeli':{kind:'timeline',title:'İşlemin durumu bir öyküdür',items:['Taslak','Gönderildi','İşleniyor','Sonuçlandı'],caption:'Aradaki durumlar tasarlanmazsa kullanıcı belirsizliği hata sanır.'},
  tekrar:{kind:'cycle',title:'Tek niyet, birden çok deneme',items:['Niyet oluştur','İsteği gönder','Yanıtı kaybet','Aynı anahtarla sorgula'],caption:'Tekrarlanan ağ isteği, yeni bir iş niyeti üretmemelidir.'},
  dagitik:{kind:'network',title:'Dağıtık akışta görünmeyen sınırlar',center:'Ürün olayı',items:['Servis A','Kuyruk','Servis B','Gözlemleme'],caption:'Bir servisin başarısı, bütün iş akışının bittiğini göstermez.'},
  cache:{kind:'stack',title:'Verinin üç görünümü',items:['Kaynak veri','Önbellek','Kullanıcı arayüzü'],caption:'Hız kazanımı, hangi eskiliğin kabul edileceği kararıyla gelir.'},
  kesif:{kind:'fork',title:'Çözümden önce keşif',center:'Kullanıcı problemi',items:['Davranış kanıtı','Sistem kanıtı'],caption:'İki kanıt türü, yanlış problemi hızla çözmeyi önler.'},
  'test-yayin':{kind:'pipeline',title:'Koddan kullanıcıya çıkış',items:['Değişiklik','Test','Dağıtım','Kademeli açılış'],caption:'Dağıtım ve özelliğin kullanıcılara açılması ayrı kararlardır.'},
  operasyon:{kind:'network',title:'Bir arızayı dört sinyalden oku',center:'Kullanıcı etkisi',items:['Metrik','Log','İz','Uyarı'],caption:'Sinyaller aynı sorunun farklı parçalarını gösterir.'},
  olcum:{kind:'funnel',title:'Ölçümde davranış zinciri',items:['Fırsatı gören','Eyleme başlayan','Tamamlayan','Geri dönen'],caption:'Sayım tanımı ve olay kalitesi olmadan dönüşüm oranı yanıltır.'},
  guvenlik:{kind:'shield',title:'Koruma katmanları',center:'Kullanıcı verisi',items:['Yetki sınırı','Girdi doğrulama','İzleme ve tepki'],caption:'Tek bir kontrol, tüm tehdit modelinin yerini tutmaz.'},
  'dns-tls':{kind:'timeline',title:'Adres çubuğundan ilk yanıta',items:['DNS çözümü','Bağlantı','TLS el sıkışması','HTTP isteği'],caption:'Bu aşamaların her biri ayrı hata ve gecikme noktasıdır.'},
  'veri-islemleri':{kind:'stack',title:'Veri değişikliğinin katmanları',items:['Şema','Sorgu ve indeks','İşlem','Geçiş planı'],caption:'Alan eklemek, veri doğruluğu ve eski istemcilerle uyum kararlarını da açar.'},
  'api-operasyon':{kind:'matrix',title:'API işletim masası',items:['Sayfalama','Hız sınırı','Tekrar güvenliği','Hata sözleşmesi'],caption:'İyi endpoint, yoğunluk ve başarısızlık altında da anlaşılır davranır.'},
  'network-incele':{kind:'timeline',title:'Ağ panelinde izlenecek yol',items:['İstek','Durum kodu','Süre','Yanıt gövdesi'],caption:'Hata ararken önce hangi isteğin başarısız olduğunu bulun.'},
  'api-dene':{kind:'flow',title:'Kontrollü API denemesi',items:['URL ve yöntem','Başlık ve gövde','Yanıt','Doğrulama'],caption:'Deneme, yalnız “200 geldi” sonucuyla bitmez; beklenen sözleşme kontrol edilir.'},
  sql:{kind:'tree',title:'Sorgunun veri ilişkisi',center:'Siparişler',items:['Müşterilerle birleştir','Koşulla daralt','Grupla ve say'],caption:'Önce satırın neyi temsil ettiğini, sonra toplamın neyi saydığını belirleyin.'},
  'hata-incele':{kind:'bridge',title:'Şikâyetten kök nedene',items:['Kullanıcı belirtisi','İstek kimliği ve iz','Sistem nedeni'],caption:'Ekrandaki hata ile alttaki başarısızlık aynı şey olmayabilir.'},
  'akis-yaz':{kind:'timeline',title:'Akışı durumlarıyla yaz',items:['Giriş koşulu','Başarılı yol','Hata dalı','Toparlanma'],caption:'Yalnız mutlu yolu anlatan akış, uygulama için eksiktir.'},
  'ai-cikti-incele':{kind:'bridge',title:'AI çıktısını kanıta bağla',items:['Model iddiası','Kaynak ve kural','Ürün kararı'],caption:'İkna edici ifade, doğrulanmış bilgi değildir.'},
  bitirme:{kind:'network',title:'Tek kararda birleşen teslimler',center:'Ürün önerisi',items:['Akış','Sözleşme','Risk','Ölçüm'],caption:'Bitirme çalışması kararın teknik ve ürün gerekçesini birlikte toplar.'},
  altyapi:{kind:'stack',title:'Çalışan ürünün altyapısı',items:['Ağ','Hesaplama','Depolama','Yedekleme ve kurtarma'],caption:'Kapasite ve dayanıklılık, ürünün beklenen davranışını belirler.'},
  'mobil-yayin':{kind:'timeline',title:'Mobil sürümler birlikte yaşar',items:['Eski uygulama','Yeni sürüm','Kademeli dağıtım','Geriye uyum'],caption:'Sunucu, kullanıcıların aynı anda farklı istemci sürümlerinde olduğunu varsaymalıdır.'},
  arama:{kind:'pipeline',title:'Arama deneyiminin dört durağı',items:['Sorgu','İndeks','Sıralama','Sonuç'],caption:'Arama kalitesi, yalnız metin eşleşmesinden oluşmaz.'},
  'mimari-secim':{kind:'fork',title:'Mimari seçimde iki yol',center:'Ürün ve ekip ihtiyacı',items:['Modüler tek uygulama','Ayrı servisler'],caption:'Sınır seçimi, bağımsız geliştirme ile operasyon maliyetini birlikte etkiler.'},
  'ai-problem':{kind:'fork',title:'AI kullanımı için karar kapısı',center:'Çözülecek iş',items:['Deterministik kural','Model tabanlı yaklaşım'],caption:'Önce başarı ölçütü ve hata bedeli belirlenir.'},
  'ai-temel':{kind:'pipeline',title:'Modelin ürün içindeki hattı',items:['Bağlam','Model','Araç veya veri','Şemalı çıktı'],caption:'Ürün davranışı, modelin çevresindeki sınırlarla şekillenir.'},
  'ai-rag':{kind:'flow',title:'Kaynaklı yanıtın yolu',items:['Belgeler','İndeks','İlgili parçalar','Yanıt'],caption:'Getirilen parça ilgili olsa da yanıtın iddiası ayrıca doğrulanmalıdır.'},
  'ai-degerlendirme':{kind:'cycle',title:'AI değerlendirme döngüsü',items:['Örnek kümesi','Çalıştırma','Hata analizi','Eşik kararı'],caption:'Aynı örneklerde tekrar ölçmek, değişiklik etkisini görünür kılar.'},
  'ai-guvenlik':{kind:'shield',title:'AI akışındaki güven sınırları',center:'Ürün eylemi',items:['Güvenilmeyen içerik','Araç yetkisi','Sunucu doğrulaması'],caption:'Model önerisi, yetkili bir sistem işlemi yerine geçmez.'},
  'ai-izleme':{kind:'matrix',title:'AI ürününü dört sinyalle izle',items:['Yanıt kalitesi','Gecikme','Maliyet','Güvenlik'],caption:'Tek bir başarı metriği, modelin üretimdeki davranışını açıklamaz.'}
};

const E=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const cell=(item,i)=>`<div class="art-card art-card-${i%4}"><span class="art-card-index">${String(i+1).padStart(2,'0')}</span><strong>${E(item)}</strong></div>`;
const arrow='<span class="art-arrow" aria-hidden="true">→</span>';
const render={
  flow:s=>`<div class="art-flow">${s.items.map((x,i)=>cell(x,i)+(i<s.items.length-1?arrow:'')).join('')}</div>`,
  bridge:s=>`<div class="art-bridge">${cell(s.items[0],0)}${arrow}<div class="art-bridge-core"><span>ORTAK SINIR</span><strong>${E(s.items[1])}</strong></div>${arrow}${cell(s.items[2],2)}</div>`,
  timeline:s=>`<div class="art-timeline">${s.items.map((x,i)=>`<div class="art-time"><span>${String(i+1).padStart(2,'0')}</span><strong>${E(x)}</strong></div>`).join('')}</div>`,
  matrix:s=>`<div class="art-matrix">${s.items.map(cell).join('')}</div>`,
  cycle:s=>`<div class="art-cycle">${s.items.map(cell).join('')}<span class="art-cycle-return" aria-hidden="true">↺</span></div>`,
  network:s=>`<div class="art-network"><div class="art-network-core">${E(s.center)}</div>${s.items.map((x,i)=>`<div class="art-network-node art-network-node-${i}"><span>${String(i+1).padStart(2,'0')}</span><strong>${E(x)}</strong></div>`).join('')}</div>`,
  stack:s=>`<div class="art-stack">${s.items.map((x,i)=>`<div class="art-stack-layer art-card-${i%4}"><span>${String(i+1).padStart(2,'0')}</span><strong>${E(x)}</strong></div>`).join('')}</div>`,
  fork:s=>`<div class="art-fork"><div class="art-fork-root">${E(s.center)}</div><div class="art-fork-branches">${s.items.map(cell).join('')}</div></div>`,
  tree:s=>`<div class="art-tree"><div class="art-tree-root">${E(s.center)}</div><div class="art-tree-leaves">${s.items.map(cell).join('')}</div></div>`,
  pipeline:s=>`<div class="art-pipeline">${s.items.map((x,i)=>`<div class="art-pipe"><span>0${i+1}</span><strong>${E(x)}</strong></div>`).join('')}</div>`,
  funnel:s=>`<div class="art-funnel">${s.items.map((x,i)=>`<div class="art-funnel-band art-card-${i%4}" style="--n:${i}"><span>0${i+1}</span><strong>${E(x)}</strong></div>`).join('')}</div>`,
  shield:s=>`<div class="art-shield"><div class="art-shield-core">${E(s.center)}</div><div class="art-shield-controls">${s.items.map((x,i)=>`<div><span>0${i+1}</span><strong>${E(x)}</strong></div>`).join('')}</div></div>`
};

export const artworkKeys=Object.keys(specs);
export function artwork(key){const s=specs[key];if(!s)return '';return `<figure class="atlas-art atlas-kind-${s.kind}" role="group" aria-label="${E(s.title)}"><div class="art-heading"><span class="art-overline">ATLAS / GÖRSEL</span><h2>${E(s.title)}</h2></div><div class="art-canvas">${render[s.kind](s)}</div><figcaption>${E(s.caption)}</figcaption></figure>`}
