# Ürün Atölyesi görsel sistemi

Bu sistem, Teknik Ürün Atlası'nın arayüzünü ve ders şemalarını aynı görsel dile bağlar.

## Temel kurallar

| İşlev | Değer | Kullanım |
|---|---|---|
| Zemin | `#fffdf8` | Uzun okuma yüzeyi |
| Ana yeşil | `#245c52` | Başlık, sınır, düğme, şema bağlantısı |
| Koyu yeşil | `#193f38` | Ana metin ve güçlü vurgu |
| Mercan | `#b55d4a` | Sıra numarası, yön ve bölüm işareti |
| Nane | `#d6f1e5` | İlk kavram veya giriş katmanı |
| Krem | `#fff0d7` | Karar, seçenek veya ikinci adım |
| Soluk mavi | `#e3ebf7` | Sistem veya ara katman |
| Soluk mercan | `#f7ddd6` | Sonuç veya dördüncü adım |

Başlıklar kalın sans serif; gövde metni aynı ailede, en az 16 piksel. Kartlar ince yeşil çizgili, hafif dış gölgeli ve yuvarlak köşeli. Koyu zemin yalnız kod örneklerinde kullanılır. Hareket, teknik bir akışın yönünü veya değişimini anlattığında kullanılır; azaltılmış hareket tercihi saygı görür.

## Öğretim görselleri

`dist/data/artworks.js` her gerçek rota için ayrı başlık, konu etiketleri ve açıklama içerir. Şemalar ölçülmüş veriyi temsil etmez; kavramsal süreç ve sınırları anlatır. Aynı konu birden çok derste farklı soru gerektiriyorsa görselin yapısı da değişir. Kullanılan yapılar: akış, köprü, zaman çizgisi, matris, döngü, ağ, katman, karar ayrımı, ağaç, hat, huni ve güven sınırı.

Görsel metni HTML olarak erişilebilirdir ve CSS ile küçük ekranlara uyarlanır. İlk beş dersin ayrıntılı hareketli sistem şemaları kapak görselinin ardından yer alır. 06–20 numaralı dersler dört adımlı, ders konusuna özgü hareketli anlatımlar kullanır. Adımların açıklaması hareket durduğunda da okunur; öğrenci adım seçebilir, durdurabilir ve baştan oynatabilir. Son adım ürün kararına bağlanır. Hareket yalnız süreç sırasını veya durum değişimini görünür kılar; dekoratif tekrar yoktur. `prefers-reduced-motion` tercihinde otomatik oynatma yapılmaz.

Yeni bir ders eklenirse özgün konu şeması da eklenmeli; `artworkKeys` doğrulamasıyla rota kapsamı kontrol edilmelidir. Hareketli anlatım eklenirse her kare metinle anlaşılır olmalı ve durdurma/yeniden oynatma davranışı mobilde doğrulanmalıdır.
