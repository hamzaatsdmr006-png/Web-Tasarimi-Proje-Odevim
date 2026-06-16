/* ===========================
   TÜRK TRAKTÖR - SCRIPT.JS
   =========================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ===========================
     1. MOBİL MENÜ
     =========================== */
  const hamburger = document.getElementById('hamburger');
  const mobilMenu = document.getElementById('mobil-menu');

  if (hamburger && mobilMenu) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('acik');
      mobilMenu.classList.toggle('acik');
    });

    // Dışarı tıklayınca kapat
    document.addEventListener('click', function (e) {
      if (!hamburger.contains(e.target) && !mobilMenu.contains(e.target)) {
        hamburger.classList.remove('acik');
        mobilMenu.classList.remove('acik');
      }
    });

    // Menü linkine tıklayınca kapat
    mobilMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('acik');
        mobilMenu.classList.remove('acik');
      });
    });
  }

  /* ===========================
     2. SEKMELİ İÇERİK
     =========================== */
  const sekmeBtnler = document.querySelectorAll('.sekme-btn');
  const sekmePaneller = document.querySelectorAll('.sekme-panel');

  sekmeBtnler.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const hedef = btn.dataset.sekme;

      sekmeBtnler.forEach(function (b) { b.classList.remove('aktif'); });
      sekmePaneller.forEach(function (p) { p.classList.remove('aktif'); });

      btn.classList.add('aktif');
      const hedefPanel = document.getElementById('sekme-' + hedef);
      if (hedefPanel) hedefPanel.classList.add('aktif');
    });
  });

  /* ===========================
     3. AKORDİYON
     =========================== */
  const akordeonBtnler = document.querySelectorAll('.akordeon-baslik');

  akordeonBtnler.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const icerik = btn.nextElementSibling;
      const zatenAcik = btn.classList.contains('aktif');

      // Hepsini kapat
      document.querySelectorAll('.akordeon-baslik').forEach(function (b) {
        b.classList.remove('aktif');
        b.nextElementSibling.classList.remove('acik');
      });

      // Kapalıysa aç
      if (!zatenAcik) {
        btn.classList.add('aktif');
        icerik.classList.add('acik');
      }
    });
  });

  /* ===========================
     4. İLETİŞİM FORMU KONTROLÜ
     =========================== */
  const iletisimForm = document.getElementById('iletisim-form');

  if (iletisimForm) {
    iletisimForm.addEventListener('submit', function (e) {
      e.preventDefault();
      let gecerli = true;

      // Tüm hataları temizle
      iletisimForm.querySelectorAll('.hata-mesaj').forEach(function (m) {
        m.classList.remove('goster');
      });
      iletisimForm.querySelectorAll('input, textarea').forEach(function (el) {
        el.classList.remove('hata');
      });

      // Ad Soyad kontrolü
      const adSoyad = document.getElementById('ad-soyad');
      if (adSoyad && adSoyad.value.trim().length < 3) {
        adSoyad.classList.add('hata');
        document.getElementById('ad-soyad-hata').classList.add('goster');
        gecerli = false;
      }

      // E-posta kontrolü
      const eposta = document.getElementById('eposta');
      if (eposta) {
        const epostaRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!epostaRegex.test(eposta.value.trim())) {
          eposta.classList.add('hata');
          document.getElementById('eposta-hata').classList.add('goster');
          gecerli = false;
        }
      }

      // Mesaj kontrolü
      const mesaj = document.getElementById('mesaj');
      if (mesaj && mesaj.value.trim().length < 10) {
        mesaj.classList.add('hata');
        document.getElementById('mesaj-hata').classList.add('goster');
        gecerli = false;
      }

      // Geçerliyse gönder (simüle)
      if (gecerli) {
        const basariMesaj = document.getElementById('basari-mesaj');
        if (basariMesaj) {
          basariMesaj.classList.add('goster');
          iletisimForm.reset();
          setTimeout(function () {
            basariMesaj.classList.remove('goster');
          }, 5000);
        }
      }
    });
  }

  /* ===========================
     5. AKTİF MENÜ BAĞLANTISI
     =========================== */
  const mevcutSayfa = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a, .mobil-menu a').forEach(function (link) {
    const linkSayfa = link.getAttribute('href');
    if (linkSayfa === mevcutSayfa || (mevcutSayfa === '' && linkSayfa === 'index.html')) {
      link.classList.add('aktif');
    }
  });

});
