        // small interactivity: nav toggle, smooth scroll, project modal
        document.getElementById('year').textContent = new Date().getFullYear();

        const navToggle = document.getElementById('navToggle');
        const navList = document.getElementById('navList');
        navToggle && navToggle.addEventListener('click', () => {
            if (navList.style.display === 'block') navList.style.display = '';
            else navList.style.display = 'block';
        });

        function scrollToSection(id) {
            const el = document.getElementById(id);
            if (!el) return;
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        // project modal
        const cards = document.querySelectorAll('.card');
        const modalRoot = document.getElementById('modalRoot');

        function openModal(title, desc, tags, link) {
            const backdrop = document.createElement('div');
            backdrop.className = 'modal-backdrop';
            backdrop.innerHTML = `
                <div class="modal">
                    <div style="display:flex;justify-content:space-between;align-items:center;gap:12px">
                        <a href="${link}" style="color: #E1E5F1" target="_blank"><h3 style="margin:0">${escapeHtml(title)}</h3></a>
                        <button onclick="closeModal()" style="background:transparent;border:none;color:var(--muted);font-weight:700;cursor:pointer;font-family:'Jetbrains Mono'">Close</button>
                    </div>
                    <p class="muted" style="margin-top:12px">${escapeHtml(desc)}</p>
                    <div style="display:flex;gap:8px;margin-top:12px">
                        ${tags.split(',').map(t => `<span class="tag">${escapeHtml(t.trim())}</span>`).join('')}
                    </div>
                </div>
            `;

            modalRoot.innerHTML = '';
            modalRoot.style.display = 'block';
            modalRoot.appendChild(backdrop);

            // Fade-in
            requestAnimationFrame(() => {
                backdrop.classList.add('show');
                backdrop.querySelector('.modal').classList.add('show');
            });
        }

        function closeModal() { 
            const backdrop = modalRoot.querySelector('.modal-backdrop');
            const modal = modalRoot.querySelector('.modal');

            if (!backdrop) return;

            // Fade-out
            backdrop.classList.remove('show');
            modal.classList.remove('show');

            setTimeout(() => {
                modalRoot.style.display = 'none';
                modalRoot.innerHTML = '';
            }, 250);
        }

        function escapeHtml(s) { return String(s).replace(/[&<>\"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '\"': '&quot;' }[c] || c; }); }

        cards.forEach(card => {
            card.style.cursor = 'pointer';
            card.addEventListener('click', () => {
                const title = card.dataset.title || card.querySelector('h3')?.innerText || 'Project';
                const desc = card.dataset.desc || card.querySelector('p')?.innerText || '';
                const tags = card.dataset.tags || '';
                const link = card.dataset.link || '';
                openModal(title, desc, tags, link);
            });
        });
