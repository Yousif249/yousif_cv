// -*- coding: utf-8 -*-
// static/js/chart.js - Cosmic Theme Interactions

document.addEventListener('DOMContentLoaded', function() {
    console.log('JavaScript ملف chart.js تم تحميله بنجاح!');

    // دالة لإنشاء خلفية الجالاكسي المتحركة
    function createGalaxyBackground() {
        if (!document.querySelector('.galaxy')) {
            const galaxy = document.createElement('div');
            galaxy.className = 'galaxy';
            document.body.prepend(galaxy); // إضافة في بداية الجسم
        }
    }

    // دالة لإنشاء النجوم الدوارة وتأثير الوميض
    function createRotatingStars(num = 75) {
        let starContainer = document.querySelector('.stars');
        if (!starContainer) {
            starContainer = document.createElement('div');
            starContainer.className = 'stars';
            document.body.appendChild(starContainer);
        }

        const w = () => window.innerWidth;
        const h = () => window.innerHeight;

        function getCenter() { return [w() / 2, h() / 2]; }
        const minRadius = () => Math.min(w(), h()) * 0.38;
        const maxRadius = () => Math.min(w(), h()) * 0.53;

        const stars = [];
        for (let i = 0; i < num; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            const size = Math.random() * 2.7 + 1.2;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.opacity = 0.6 + Math.random() * 0.38;
            starContainer.appendChild(star);

            stars.push({
                el: star,
                angle: Math.random() * Math.PI * 2,
                radius: minRadius() + Math.random() * (maxRadius() - minRadius()),
                speed: 0.00009 + Math.random() * 0.00016, // أبطأ بكثير جداً
                twinkle: 0.4 + Math.random() * 0.5,
                twinkleSpeed: 0.00042 + Math.random() * 0.0005,
                wave: Math.random() * 12 + 16,
                direction: i % 2 === 0 ? 1 : -1
            });
        }

        let lastTime = performance.now();
        function animateStars(time) {
            const dt = time - lastTime;
            lastTime = time;
            const [centerX, centerY] = getCenter();

            for (let i = 0; i < stars.length; i++) {
                const s = stars[i];
                s.angle += s.speed * dt * s.direction;
                const x = centerX + Math.cos(s.angle) * s.radius;
                const y = centerY + Math.sin(s.angle) * (s.radius * 0.46 + s.wave * Math.sin(s.angle * 0.5));
                s.el.style.left = `${x}px`;
                s.el.style.top = `${y}px`;

                const tw = s.twinkle + 0.3 * Math.sin(time * s.twinkleSpeed + i * 7.2);
                s.el.style.opacity = Math.max(0.13, Math.min(1, tw));
            }

            requestAnimationFrame(animateStars);
        }
        requestAnimationFrame(animateStars);

        window.addEventListener('resize', () => {
            for (let s of stars) {
                // إعادة حساب نصف القطر عند تغيير حجم النافذة للحفاظ على النجوم داخل الرؤية
                s.radius = minRadius() + Math.random() * (maxRadius() - minRadius());
            }
        });
    }

    // تأثير التموج (Ripple effect) للأزرار
    function enableCosmicRipple() {
        const allButtons = document.querySelectorAll('.btn-primary, .contact-button, .export-btn, .btn-glow, .navbar a');
        allButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                const circle = document.createElement('span');
                const diameter = Math.max(button.clientWidth, button.clientHeight);
                const radius = diameter / 2;
                circle.style.width = circle.style.height = `${diameter}px`;
                circle.style.left = `${e.clientX - (button.getBoundingClientRect().left + radius)}px`;
                circle.style.top = `${e.clientY - (button.getBoundingClientRect().top + radius)}px`;
                circle.classList.add('ripple');

                const ripple = button.getElementsByClassName('ripple')[0];
                if (ripple) ripple.remove(); // إزالة التموج السابق إن وجد
                button.appendChild(circle);
            });
        });

        // تم نقل الـ CSS الخاص بالـ ripple إلى styles.css
    }

    // إظهار الأقسام ببطء عند دخولها إلى منطقة العرض (Scroll Reveal)
    function enableScrollReveal() {
        // العناصر التي سيتم إظهارها
        const revealElems = [
            ...document.querySelectorAll('.cv-header, .cv-section, .contact-button-container, .social-links, .container')
        ];
        // إخفاء جميع العناصر في البداية لمنع ظهورها قبل الحركة
        revealElems.forEach(el => el.classList.remove('reveal'));

        function revealOnScroll() {
            for (let i = 0; i < revealElems.length; i++) {
                const el = revealElems[i];
                const rect = el.getBoundingClientRect();
                // إذا كان الجزء العلوي من العنصر داخل 87% من ارتفاع النافذة
                if (rect.top < window.innerHeight * 0.87) {
                    // إضافة الفئة 'reveal' مع تأخير متتالي
                    setTimeout(() => el.classList.add('reveal'), i * 100 + 50); // تأخير متدرج
                }
            }
        }
        window.addEventListener('scroll', revealOnScroll);
        window.addEventListener('resize', revealOnScroll); // لإعادة تشغيل الكشف عند تغيير حجم الشاشة
        setTimeout(revealOnScroll, 300); // تشغيل أولي بعد وقت قصير لتحريك العناصر الأولى
    }

    // عند تحميل محتوى DOM بالكامل، قم بتهيئة كل شيء
    // هذه الدالة الأخيرة هي التي يتم استدعائها عند DOMContentLoaded
    // والوظائف الداخلية ستُنفذ بدورها
    createGalaxyBackground();
    createRotatingStars(80); // عدد النجوم
    enableCosmicRipple();
    enableScrollReveal();
    // لتعيين السنة الحالية في عناصر .current-year (مثل الفوتر، إذا كانت موجودة)
    document.querySelectorAll('.current-year').forEach(el => {
        el.textContent = new Date().getFullYear();
    });
});