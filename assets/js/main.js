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
    const aiInput = document.getElementById('aiInput');
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
