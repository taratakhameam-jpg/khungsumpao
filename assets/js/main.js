/* ==========================================================================
   เทศบาลตำบลคุ้งสำเภา (Official Portal Interaction & Accessibility)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Accessibility: Font Sizing
    const body = document.body;
    const btnFontDec = document.getElementById('btnFontDec');
    const btnFontReset = document.getElementById('btnFontReset');
    const btnFontInc = document.getElementById('btnFontInc');

    if (btnFontDec && btnFontReset && btnFontInc) {
        btnFontDec.addEventListener('click', () => {
            body.classList.remove('font-large');
            body.classList.add('font-small');
        });
        btnFontReset.addEventListener('click', () => {
            body.classList.remove('font-large', 'font-small');
        });
        btnFontInc.addEventListener('click', () => {
            body.classList.remove('font-small');
            body.classList.add('font-large');
        });
    }

    // 2. Accessibility: Contrast & Mourning Modes
    const btnContrast = document.getElementById('btnContrastToggle');
    const btnMourning = document.getElementById('btnMourningToggle');

    if (btnContrast) {
        btnContrast.addEventListener('click', () => {
            body.classList.toggle('high-contrast');
            if (body.classList.contains('high-contrast')) {
                body.classList.remove('mourning-mode');
            }
        });
    }

    if (btnMourning) {
        btnMourning.addEventListener('click', () => {
            body.classList.toggle('mourning-mode');
            if (body.classList.contains('mourning-mode')) {
                body.classList.remove('high-contrast');
            }
        });
    }

    // 3. Mobile Navigation Toggle
    const mobileToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
        });
    }

    // 4. News Tabs Switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            const targetId = btn.getAttribute('data-tab');
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // 5. AI Civic Assistant Widget ("น้องสำเภา AI")
    const aiFab = document.getElementById('aiFab');
    const aiWindow = document.getElementById('aiChatWindow');
    const aiClose = document.getElementById('aiCloseBtn');
    const aiInput = document.getElementById('aiInput') || document.getElementById('aiUserInput');
    const aiSend = document.getElementById('aiSendBtn');
    const aiBody = document.getElementById('aiChatBody');
    const chips = document.querySelectorAll('.ai-chips .chip');

    if (aiFab && aiWindow) {
        aiFab.addEventListener('click', () => {
            aiWindow.classList.toggle('open');
            if (aiWindow.classList.contains('open')) {
                aiInput.focus();
            }
        });
    }

    if (aiClose) {
        aiClose.addEventListener('click', () => {
            aiWindow.classList.remove('open');
        });
    }

    function appendMessage(text, isUser = false) {
        const msgDiv = document.createElement('div');
        msgDiv.className = isUser ? 'ai-msg user' : 'ai-msg bot';
        msgDiv.innerHTML = text;
        aiBody.appendChild(msgDiv);
        aiBody.scrollTop = aiBody.scrollHeight;
    }

    function handleAiQuery(query) {
        if (!query.trim()) return;
        appendMessage(query, true);

        // Smart Civics Mock Answers
        setTimeout(() => {
            let reply = '';
            const q = query.toLowerCase();

            if (q.includes('ร้องทุกข์') || q.includes('ร้องเรียน')) {
                reply = '📢 ท่านสามารถยื่นเรื่องร้องทุกข์ออนไลน์ได้ที่ <a href="#complain" style="color:#f59e0b;font-weight:600;">เมนูรับเรื่องร้องทุกข์</a> หรือติดต่อศูนย์ดำรงธรรมเทศบาลตำบลคุ้งสำเภา โทร. 056-491-325 ได้ตลอด 24 ชม. ครับ';
            } else if (q.includes('ภาษี') || q.includes('ที่ดิน')) {
                reply = '💰 สำหรับการชำระภาษีที่ดินและสิ่งปลูกสร้าง หรือภาษีป้าย ประจำปี สามารถยื่นชำระได้ที่กองคลัง หรือผ่านระบบ QR Code ธนาคารในระบบ <a href="#tax" style="color:#f59e0b;font-weight:600;">e-Tax Service</a> ครับ';
            } else if (q.includes('no gift') || q.includes('ita') || q.includes('โปร่งใส')) {
                reply = '🛡️ เทศบาลตำบลคุ้งสำเภา ประกาศเจตนารมณ์ <strong>No Gift Policy</strong> งดรับงดให้ของขวัญในทุกเทศกาล มุ่งสู่การประเมิน ITA ระดับผ่านดีเยี่ยมประจำปี 2569 ครับ';
            } else if (q.includes('เบอร์') || q.includes('ติดต่อ') || q.includes('ที่อยู่')) {
                reply = '📞 สำนักงานเทศบาลตำบลคุ้งสำเภา ตั้งอยู่ หมู่ 4 ถ.ชัยนาท-มโนรมย์ ต.คุ้งสำเภา อ.มโนรมย์ จ.ชัยนาท 17110 โทรศัพท์: <strong>056-491-325</strong> (วันและเวลาราชการ)';
            } else {
                reply = 'ยินดีรับเรื่องครับ! สำหรับเรื่อง "' + query + '" น้องสำเภาขอแนะนำให้ติดต่อสอบถามเจ้าหน้าที่โดยตรงที่โทร. 056-491-325 หรือเลือกดูบริการที่เมนู e-Service ด้านบนได้เลยครับ 😊';
            }

            appendMessage(reply, false);
        }, 500);
    }

    if (aiSend && aiInput) {
        aiSend.addEventListener('click', () => {
            handleAiQuery(aiInput.value);
            aiInput.value = '';
        });

        aiInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleAiQuery(aiInput.value);
                aiInput.value = '';
            }
        });
    }

    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            const query = chip.getAttribute('data-query');
            handleAiQuery(query);
        });
    });

});


/* ========================================================
   PDPA COOKIE CONSENT & PREFERENCES CONTROLLER
   (พระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562)
   ======================================================== */
(function initPDPA() {
    const STORAGE_KEY = 'khungsumpao_pdpa_consent_v1';
    const banner = document.getElementById('pdpa-banner');
    const modal = document.getElementById('pdpa-modal');
    const floatingTrigger = document.getElementById('pdpa-floating-trigger');

    const btnAcceptAll = document.getElementById('btn-pdpa-accept-all');
    const btnReject = document.getElementById('btn-pdpa-reject');
    const btnOpenSettings = document.getElementById('btn-pdpa-open-settings');
    const btnCloseModal = document.getElementById('btn-pdpa-close-modal');
    const btnSavePreferences = document.getElementById('btn-pdpa-save-preferences');
    const btnAcceptAllModal = document.getElementById('btn-pdpa-accept-all-modal');

    const chkAnalytics = document.getElementById('cookie-analytics');
    const chkFunctional = document.getElementById('cookie-functional');
    const chkMedia = document.getElementById('cookie-media');

    function getConsent() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            return raw ? JSON.parse(raw) : null;
        } catch (e) {
            return null;
        }
    }

    function saveConsent(consentObj) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(consentObj));
            // Also store lightweight cookie for server side inspection
            document.cookie = `khungsumpao_pdpa=${consentObj.analytics ? '1' : '0'}${consentObj.functional ? '1' : '0'}${consentObj.media ? '1' : '0'}; path=/; max-age=31536000; SameSite=Lax`;
        } catch (e) {
            console.warn('Unable to persist PDPA consent:', e);
        }
        hideBanner();
        hideModal();
    }

    function showBanner() {
        if (banner) {
            banner.classList.add('active');
        }
    }

    function hideBanner() {
        if (banner) {
            banner.classList.remove('active');
        }
    }

    function showModal() {
        const consent = getConsent();
        if (consent) {
            if (chkAnalytics) chkAnalytics.checked = !!consent.analytics;
            if (chkFunctional) chkFunctional.checked = !!consent.functional;
            if (chkMedia) chkMedia.checked = !!consent.media;
        }
        if (modal) {
            modal.classList.add('active');
            modal.setAttribute('aria-hidden', 'false');
        }
    }

    function hideModal() {
        if (modal) {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
        }
    }

    // Event Listeners
    if (btnAcceptAll) {
        btnAcceptAll.addEventListener('click', () => {
            saveConsent({
                necessary: true,
                analytics: true,
                functional: true,
                media: true,
                timestamp: new Date().toISOString()
            });
        });
    }

    if (btnReject) {
        btnReject.addEventListener('click', () => {
            saveConsent({
                necessary: true,
                analytics: false,
                functional: false,
                media: false,
                timestamp: new Date().toISOString()
            });
        });
    }

    if (btnOpenSettings) {
        btnOpenSettings.addEventListener('click', () => {
            showModal();
        });
    }

    if (floatingTrigger) {
        floatingTrigger.addEventListener('click', () => {
            showModal();
        });
    }

    if (btnCloseModal) {
        btnCloseModal.addEventListener('click', () => {
            hideModal();
        });
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                hideModal();
            }
        });
    }

    // ESC key closes modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            hideModal();
        }
    });

    if (btnSavePreferences) {
        btnSavePreferences.addEventListener('click', () => {
            saveConsent({
                necessary: true,
                analytics: chkAnalytics ? chkAnalytics.checked : false,
                functional: chkFunctional ? chkFunctional.checked : false,
                media: chkMedia ? chkMedia.checked : false,
                timestamp: new Date().toISOString()
            });
        });
    }

    if (btnAcceptAllModal) {
        btnAcceptAllModal.addEventListener('click', () => {
            saveConsent({
                necessary: true,
                analytics: true,
                functional: true,
                media: true,
                timestamp: new Date().toISOString()
            });
        });
    }

    // Auto-display banner if no consent stored yet
    document.addEventListener('DOMContentLoaded', () => {
        const consent = getConsent();
        if (!consent) {
            setTimeout(showBanner, 800);
        }
    });
})();


/* ========================================================
   CAROUSEL & LIGHTBOX CONTROLLER
   ======================================================== */
(function initCarousel() {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot-btn');
    const prevBtn = document.getElementById('carouselPrevBtn');
    const nextBtn = document.getElementById('carouselNextBtn');
    const wrapper = document.getElementById('heroCarousel');
    let autoInterval = null;

    if (!slides.length) return;

    function goToSlide(n) {
        slides.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));
        
        currentSlide = (n + slides.length) % slides.length;
        
        slides[currentSlide].classList.add('active');
        if (dots[currentSlide]) dots[currentSlide].classList.add('active');
    }

    function next() {
        goToSlide(currentSlide + 1);
    }

    function prev() {
        goToSlide(currentSlide - 1);
    }

    function startAuto() {
        stopAuto();
        autoInterval = setInterval(next, 4500);
    }

    function stopAuto() {
        if (autoInterval) {
            clearInterval(autoInterval);
            autoInterval = null;
        }
    }

    if (prevBtn) prevBtn.addEventListener('click', () => { prev(); startAuto(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { next(); startAuto(); });

    dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
            goToSlide(idx);
            startAuto();
        });
    });

    if (wrapper) {
        wrapper.addEventListener('mouseenter', stopAuto);
        wrapper.addEventListener('mouseleave', startAuto);

        // Touch swipe support for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        wrapper.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        wrapper.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            if (touchStartX - touchEndX > 50) next();
            if (touchEndX - touchStartX > 50) prev();
        }, { passive: true });
    }

    startAuto();
})();

// Lightbox functions (global)
window.openLightbox = function(src, caption) {
    const modal = document.getElementById('imageLightboxModal');
    const img = document.getElementById('lightboxImg');
    const cap = document.getElementById('lightboxCaption');
    if (modal && img) {
        img.src = src;
        if (cap) cap.textContent = caption || '';
        modal.classList.add('active');
    }
};

window.closeLightbox = function(e) {
    const modal = document.getElementById('imageLightboxModal');
    if (modal && (!e || e.target === modal || e.target.classList.contains('lightbox-close'))) {
        modal.classList.remove('active');
    }
};

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        window.closeLightbox();
    }
});
