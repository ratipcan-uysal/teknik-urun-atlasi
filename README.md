# Teknik Ürün Atlası

PM ve PO'lar için Türkçe, statik ve düzenlenebilir teknik ürün eğitimi. PM ile PO sorumluluklarının sınırı kuruma göre değişir; dersler unvanı değil ürün kararını merkeze alır.

35 ders ve 4 uçtan uca vaka içerir. İlk 20 ders ayrıntılı anlatım, konuya özgü görsel, uygulama ve kaynaklarla hazırlanmıştır; 21–35. dersler daha kısa karar çerçeveleridir. 06–20. derslerde dört adımlı, durdurulup yeniden oynatılabilen hareketli şemalar bulunur.

## Açma ve yerel çalışma

Python 3 ile proje kökünde:

```sh
python3 -m http.server 8765 --directory dist
```

Sonra `http://localhost:8765/` açın. ES modülleri kullanıldığı için `dist/index.html` dosyasını `file://` olarak açmak bazı tarayıcılarda çalışmaz. Site için API anahtarı, ücretli servis, npm paketi veya build adımı gerekmez. Statik hostingde `dist/` içeriğini kök dizin olarak yayınlayın. Hash tabanlı gezinme (`#lesson/...`) sunucu route ayarı gerektirmez.

## İçerik düzeni

- `dist/data/lessons-core.js`: temel teknik ve ürün kararları dersleri.
- `dist/data/lessons-extra.js`: DNS/TLS, veri işlemleri ve API işletimi.
- `dist/data/lessons-practice.js`: pratik araç ve bitirme dersi.
- `dist/data/lessons-depth.js`: mimari, mobil, arama ve AI dersleri.
- `dist/data/deep-dives.js`: seçilmiş derslerin derin anlatımları.
- `dist/data/cases.js`: dört kurgusal uçtan uca vaka.
- `dist/data/sources.js`: kaynak/bağlantı envanteri; başlık, kurum, tam URL, desteklediği nokta, kontrol durumu.
- `dist/data/featured-lessons.js` ve `expanded-lessons-*.js`: ilk 20 dersin ayrıntılı anlatımları.
- `dist/data/artworks.js`, `dist/data/diagrams.js`, `dist/data/motion-diagrams.js`: ders görselleri ve hareketli şemalar.
- `dist/app.js`: gezinme, arama, quiz, ilerleme, yer imi, kaynak görünümü ve simülasyonlar.
- `dist/style.css`, `dist/atelier.css`, `dist/motion-lessons.css`: ortak tasarım sistemi, mobil görünüm, odak ve azaltılmış hareket desteği.

## Ders ekleme/güncelleme

1. İlgili ders dosyasında `L(...)` kaydı ekleyin veya düzenleyin. Benzersiz `id`, başlık, seviye, konu, süre, ön koşul, çıktılar, problem, mekanizma, ürün akışı, ödünleşim, sorular, uygulama, açıklamalı yanıt, kaynak kimlikleri ve quiz gerekir. `schema.js` kalan ortak alanları ekler.
2. Çıktı fiillerini `açıklayabilmeli`, `uygulayabilmeli` veya `karar verebilmeli` ile başlatın. Ön koşul ID'leri var olan derslere işaret etmeli; yeni kavramı tanıtmadan ileri derste kullanmayın.
3. Birincil kaynağı `sources.js` içine kurum, tam URL ve desteklediği iddiayla ekleyin. Bağlantının açılması ile iddiayı gerçekten desteklemesini ayrı kontrol edin. Kontrol tarihini ve durumu kaydedin.
4. Dersi uygun vakaya bağlayın; ürün kararı ve en az bir hata yolu yazın. Quizde bağlama göre değişen cevapları tek doğru gibi işaretlemeyin.
5. `node scripts/validate.mjs` çalıştırın. Ardından tarayıcıda ana sayfa, arama, yeni ders, ilgili vaka, mobil görünüm ve kaynak bağlantısını kontrol edin. `docs/verification.md` tarihini güncelleyin.

## Dosya ve bakım notları

İlerleme ve yer imi tarayıcının `localStorage` alanında tutulur; cihazlar arasında eşitlenmez. Veri silinirse ilerleme de silinir. Ders metinleri sentetik örnekler içerir ve dış servise istek göndermez. Kaynak bağlantıları dışarı açılır. AI maliyet simülasyonundaki fiyatlar yalnız eğitim varsayımıdır. Hukuki yükümlülük iddiası verilmez; ülke/tarih/resmi kaynak olmadan hukuk yorumu eklemeyin.

Kapsam: `docs/coverage.md`. Eski kaynak eşleştirmesi: `docs/notion-mapping.md`. Test ve sınırlar: `docs/verification.md`.

`.openai/hosting.json` mevcut Site projesinin dağıtım tanımıdır; başka bir hesapta yayınlamak için kendi Site projenizi oluşturmanız gerekir. Depo herkese açıktır; bu, ayrıca belirtilmeyen bir yeniden kullanım lisansı verildiği anlamına gelmez.
