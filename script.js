/**
 * Orman Suç Tutanağı Web Sitesi Etkileşimleri
 * Vanilla JS tabanlı, performans odaklı animasyon ve ui scripti.
 */
// ========================================================
// APK İNDİRME LİNKİ AYARI
// ========================================================
// Aşağıdaki adresi arka planda bağlamak istediğiniz indirme
// linkiyle (Google Drive, Dropbox, vb.) değiştirebilirsiniz.
const APK_DOWNLOAD_LINK = "https://drive.google.com/file/d/1s3dKj-CwaWejL-37Mfb1xf-cnEa6SPVq/view?usp=sharing";

document.addEventListener('DOMContentLoaded', () => {

    // "Kullanıcılara açık olmayacak" özelliği için Gizli APK indirme mantığı
    // Sadece şifreyi bilenler veya URL'de beta anahtarı olanlar yönlendirilen linke geçebilir.
    const downloadButtons = document.querySelectorAll('a[href="#indir"], .cta-action');
    downloadButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Eğer URL'de ?beta=1 varsa direkt indir
            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams.get('beta') === '1') {
                window.open(APK_DOWNLOAD_LINK, '_blank');
                return;
            }
            
            // Şifreli giriş (Kullanıcı prompt'u)
            const pwd = prompt("Bu özellik herkese açık değildir. Beta tester şifresini giriniz:");
            if (pwd === "orman" || pwd === "walter") {
                window.open(APK_DOWNLOAD_LINK, '_blank');
            } else if (pwd !== null) {
                alert("Hatalı şifre. Uygulama yakında genel kullanıma açılacaktır.");
            }
        });
    });

    
    // 1. Scroll-triggered Animations via IntersectionObserver
    // Sadece eleman ekranda görünür olduğunda animasyon başlatılır.
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Sona eklenen 'is-visible' class'ı style.css'deki animasyonu tetikler.
                entry.target.classList.add('is-visible');
                // Sadece bir kere animasyon oynatması için observe'u bırak.
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // .animate-on-scroll sınıfına sahip tüm elemanları gözlemle
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        scrollObserver.observe(el);
    });

    // 2. Navbar Scroll Efekti
    // Sayfa aşağı kaydırıldığında navbar'ı daraltıp gölge ekler.
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 40) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // 3. Mobile Menu Toggle
    // Mobilde ikon üzerinden menüyü açıp kapama işlemi.
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navBtn = document.querySelector('.btn-nav');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            // Basit bir inline stil değişimi, daha gelişmiş tasarımlarda class toggle kullanılabilir.
            const isExpanded = navLinks.style.display === 'flex';
            if (isExpanded) {
                navLinks.style.display = 'none';
                if (navBtn) navBtn.style.display = 'none';
                navbar.style.background = 'rgba(245, 240, 232, 0.75)';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'var(--color-bg)';
                navLinks.style.padding = 'var(--space-lg)';
                navLinks.style.borderBottom = '1px solid var(--color-border)';
                navLinks.style.boxShadow = 'var(--shadow-md)';
                
                if (navBtn) {
                    navBtn.style.display = 'inline-flex';
                    navBtn.style.margin = 'var(--space-md) var(--space-lg)';
                }
                navbar.style.background = 'var(--color-bg)';
            }
        });
        
        // Linke tıklanınca menüyü kapat
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 968) {
                    navLinks.style.display = 'none';
                    if (navBtn) navBtn.style.display = 'none';
                    navbar.style.background = 'rgba(245, 240, 232, 0.75)';
                }
            });
        });
        
        // Resize durumunda stilleri sıfırla
        window.addEventListener('resize', () => {
            if (window.innerWidth > 968) {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'row';
                navLinks.style.position = 'static';
                navLinks.style.background = 'transparent';
                navLinks.style.padding = '0';
                navLinks.style.borderBottom = 'none';
                navLinks.style.boxShadow = 'none';
                if (navBtn) {
                    navBtn.style.display = 'inline-flex';
                    navBtn.style.margin = '0';
                }
            } else {
                navLinks.style.display = 'none';
                if (navBtn) navBtn.style.display = 'none';
            }
        });
    }
});
