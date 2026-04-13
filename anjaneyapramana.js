        AOS.init({
            duration: 800,
            easing: 'ease-in-out-sine',
            once: true,
            offset: 100
        });

        let typedInstance = null;
        const typedStrings = {
            en: [
                'Dynamic, ethical, and result-oriented legal services.',
                'Expert legal advocacy based in Patna, Bihar.',
                'Committed to resolving your complex legal issues.'
            ],
            hi: [
                'गतिशील, नैतिक और परिणाम-उन्मुख कानूनी सेवाएं।',
                'पटना, बिहार में स्थित विशेषज्ञ कानूनी वकालत।',
                'आपके जटिल कानूनी मुद्दों को सुलझाने के लिए प्रतिबद्ध।'
            ]
        };

        function initTyped(lang) {
            if (!document.getElementById('typed-output')) return;
            
            if (typedInstance) {
                typedInstance.destroy();
            }
            
            typedInstance = new Typed('#typed-output', {
                strings: typedStrings[lang] || typedStrings['en'],
                typeSpeed: 40,
                backSpeed: 20,
                backDelay: 3000,
                loop: true,
                showCursor: true,
                cursorChar: '|'
            });
        }

        function submitForm(e) {
            e.preventDefault();
            const btn = e.target.querySelector('button[type="submit"]');
            const originalHTML = btn.innerHTML;
            
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i> <span>Redirecting...</span>';
            btn.disabled = true;
            
            const name = document.getElementById('contact-name').value;
            const phone = document.getElementById('contact-phone').value;
            const caseType = document.getElementById('contact-case').value || "Not Specified";
            const desc = document.getElementById('contact-desc').value || "No description provided.";
            
            const message = `*New Consultation Request*\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Case Type:* ${caseType}\n*Description:* ${desc}`;
            
            window.open(`https://wa.me/917482914219?text=${encodeURIComponent(message)}`, '_blank');
            
            setTimeout(() => {
                document.getElementById('form-success').classList.remove('hidden');
                e.target.reset();
                btn.innerHTML = originalHTML;
                btn.disabled = false;
                
                setTimeout(() => {
                    document.getElementById('form-success').classList.add('hidden');
                }, 5000);
            }, 1000);
        }

        function toggleChatPopup() {
            const popup = document.getElementById('chat-popup');
            const icon = document.getElementById('chat-icon');
            
            if (popup.classList.contains('chat-widget-closed')) {
                popup.classList.remove('chat-widget-closed');
                popup.classList.add('chat-widget-open');
                
                icon.classList.remove('fa-comment-dots');
                icon.classList.add('fa-chevron-down');
            } else {
                popup.classList.remove('chat-widget-open');
                popup.classList.add('chat-widget-closed');
                
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-comment-dots');
            }
        }

        function sendWhatsAppChat() {
            const input = document.getElementById('wa-message-input');
            let message = input.value.trim();
            
            if (!message) {
                message = "Hi, I need some legal assistance.";
            }
            
            window.open(`https://wa.me/917482914219?text=${encodeURIComponent(message)}`, '_blank');
            
            input.value = '';
            toggleChatPopup();
        }

        let currentLang = 'en';

        const urlParams = new URLSearchParams(window.location.search);
        const langParam = urlParams.get('lang');
        const cookieMatch = document.cookie.match(/googtrans=\/en\/(hi|en)/);
        const cookieLang = cookieMatch ? cookieMatch[1] : 'en';

        if (langParam === 'hi' && cookieLang !== 'hi') {
            document.cookie = "googtrans=/en/hi; path=/";
            document.cookie = `googtrans=/en/hi; domain=.${window.location.hostname}; path=/`;
            window.location.replace(window.location.href);
        } else if (langParam === 'en' && cookieLang !== 'en') {
            document.cookie = "googtrans=/en/en; path=/";
            document.cookie = `googtrans=/en/en; domain=.${window.location.hostname}; path=/`;
            window.location.replace(window.location.href);
        }

        function updateLangButton(text) {
            const langTexts = document.querySelectorAll('.lang-text-span');
            langTexts.forEach(el => el.innerText = text);
        }

        function toggleLanguage() {
            const targetLang = currentLang === 'en' ? 'hi' : 'en';
            const translateSelect = document.querySelector('.goog-te-combo');

            const newUrl = new URL(window.location);
            newUrl.searchParams.set('lang', targetLang);
            window.history.pushState({}, '', newUrl);

            if (translateSelect) {
                translateSelect.value = targetLang;
                translateSelect.dispatchEvent(new Event('change', { bubbles: true }));
                
                currentLang = targetLang;
                updateLangButton(targetLang === 'hi' ? 'English' : 'हिन्दी');
                
                initTyped(currentLang);
            } else {
                document.cookie = `googtrans=/en/${targetLang}; path=/`;
                document.cookie = `googtrans=/en/${targetLang}; domain=.${window.location.hostname}; path=/`;
                location.reload();
            }
        }

        const teamData = {
            'sachin': {
                name: 'Adv. Sachin Kumar',
                role: 'Founder & Managing Advocate | High Court, Supreme Court, DRT',
                img: 'https://i.ibb.co/Z6ShYC7P/Whats-App-Image-2026-04-11-at-3-18-16-PM.jpg',
                socials: { linkedin: 'https://www.linkedin.com/in/sachin-kumar-87b584203?utm_source=share_via&utm_content=profile&utm_medium=member_ios', twitter: 'https://x.com/LegalPramana312', email: 'sachinsunny6991@gmail.com' }
            },
            'samridhi': {
                name: 'Kumari Samridhi Pandey',
                role: 'Advocate | District Courts, High Court',
                img: 'https://i.ibb.co/4Rg74TZH/Whats-App-Image-2026-04-04-at-2-25-03-PM.jpg',
                socials: { linkedin: 'https://www.linkedin.com/in/adv-samridhi-pandey-032a31214?utm_source=share_via&utm_content=profile&utm_medium=member_android', twitter: '#', email: 'Kumarisamridhipandey@gmail.com' }
            },
            'parkhi': {
                name: 'Parkhi Pankaj',
                role: 'Advocate | Associate',
                img: 'https://i.ibb.co/dsmL9n3j/Whats-App-Image-2026-04-04-at-2-23-08-PM.jpg',
                socials: { linkedin: 'https://www.linkedin.com/in/adv-parkhi-pankaj-859aab214?utm_source=share_via&utm_content=profile&utm_medium=member_android', twitter: '#', email: 'parkhiverma1212@gmail.com' }
            },
            'aditya': {
                name: 'Aditya kr. Patel',
                role: 'Firm Manager | Management & Admin',
                img: 'https://i.ibb.co/Kc42CV6f/Whats-App-Image-2026-04-04-at-2-39-07-PM.jpg',
                socials: { linkedin: 'https://www.linkedin.com/in/aditya-kumar-patel-8a1ab1402?utm_source=share_via&utm_content=profile&utm_medium=member_android', twitter: '#', email: 'Adityakumarpatel0@gmail.com' }
            },
            'suraj': {
                name: 'Suraj Kumar',
                role: 'Munsi (Clerk) | Patna Courts Registry',
                img: 'https://i.ibb.co/WpK3nq1S/Whats-App-Image-2026-04-04-at-1-38-32-PM.jpg',
                socials: { linkedin: '#', twitter: '#', email: '#' }
            }
        };

        function openTeamModal(id) {
            const data = teamData[id];
            if(!data) return;
            
            document.getElementById('modal-img').src = data.img;
            document.getElementById('modal-name').innerHTML = `<i class="fas fa-user-circle mr-3 opacity-80 text-xl"></i> ` + data.name;
            document.getElementById('modal-role').innerHTML = `<i class="fas fa-briefcase text-gold mr-2 opacity-80"></i> ` + data.role;
            
            let socialsHTML = '';
            if (data.socials) {
                if (data.socials.linkedin && data.socials.linkedin !== '#') socialsHTML += `<a href="${data.socials.linkedin}" target="_blank" class="w-8 h-8 rounded-full border border-[#0A66C2]/50 flex items-center justify-center text-[#0A66C2] hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:text-white transition shadow-sm"><i class="fab fa-linkedin-in"></i></a>`;
                if (data.socials.twitter && data.socials.twitter !== '#') socialsHTML += `<a href="${data.socials.twitter}" target="_blank" class="w-8 h-8 rounded-full border border-[#1DA1F2]/50 flex items-center justify-center text-[#1DA1F2] hover:bg-[#1DA1F2] hover:border-[#1DA1F2] hover:text-white transition shadow-sm"><i class="fab fa-twitter"></i></a>`;
                if (data.socials.email && data.socials.email !== '#') {
                    const rawEmail = data.socials.email.replace('mailto:', '');
                    const emailHref = data.socials.email.startsWith('mailto:') ? data.socials.email : `mailto:${data.socials.email}`;
                    socialsHTML += `<a href="${emailHref}" class="h-8 px-4 rounded-full border border-[#EA4335]/50 flex items-center justify-center text-[#EA4335] hover:bg-[#EA4335] hover:border-[#EA4335] hover:text-white transition shadow-sm text-xs font-medium space-x-2"><i class="fas fa-envelope"></i><span>${rawEmail}</span></a>`;
                }
            }
            document.getElementById('modal-socials').innerHTML = socialsHTML;
            
            const bioHtml = document.getElementById('bio-' + id);
            if(bioHtml) {
                document.getElementById('modal-bio').innerHTML = bioHtml.innerHTML;
            } else {
                document.getElementById('modal-bio').innerHTML = '';
            }
            
            const modal = document.getElementById('team-modal');
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            
            void modal.offsetWidth; 
            modal.classList.remove('opacity-0');
            document.body.style.overflow = 'hidden';
        }

        function closeTeamModal(event) {
            if (event && event.target !== event.currentTarget) return;
            
            const modal = document.getElementById('team-modal');
            modal.classList.add('opacity-0');
            setTimeout(() => {
                modal.classList.remove('flex');
                modal.classList.add('hidden');
                document.body.style.overflow = '';
            }, 300);
        }
        const articleData = {
            'sarfaesi': {
                title: 'Understanding the SARFAESI Act: A Guide for Borrowers',
                category: 'Banking Law',
                date: 'April 10, 2026',
                author: 'Adv. Sachin Kumar',
                img: 'banking-law-article.jpeg'
            },
            'divorce': {
                title: 'Crucial Steps in Filing a Mutual Consent Divorce Petition',
                category: 'Family Law',
                date: 'March 28, 2026',
                author: 'Kumari Samridhi Pandey',
                img: 'family-law-article.jpg'
            },
            'property': {
                title: 'Property Disputes: The Importance of a Title Search',
                category: 'Real Estate Law',
                date: 'March 15, 2026',
                author: 'Parkhi Pankaj',
                img: 'real-estate-article.jpg'
            }
        };

        function openArticleModal(id) {
            const data = articleData[id];
            if(!data) return;
            
            document.getElementById('article-modal-img').src = data.img;
            document.getElementById('article-modal-category').innerText = data.category;
            document.getElementById('article-modal-title').innerText = data.title;
            document.getElementById('article-modal-author').innerText = data.author;
            document.getElementById('article-modal-date').innerText = data.date;
            
            const contentHtml = document.getElementById('article-content-' + id);
            if(contentHtml) {
                document.getElementById('article-modal-body').innerHTML = contentHtml.innerHTML;
            } else {
                document.getElementById('article-modal-body').innerHTML = '<p>Content not available.</p>';
            }
            
            const modal = document.getElementById('article-modal');
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            
            void modal.offsetWidth; 
            modal.classList.remove('opacity-0');
            document.body.style.overflow = 'hidden';
        }

        function closeArticleModal(event) {
            if (event && event.target !== event.currentTarget) return;
            
            const modal = document.getElementById('article-modal');
            modal.classList.add('opacity-0');
            setTimeout(() => {
                modal.classList.remove('flex');
                modal.classList.add('hidden');
                document.body.style.overflow = '';
            }, 300);
        }
        let currentSlide = 0;
        const totalSlides = 3;
        let slideInterval;

        window.prevSlide = function() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateSlider();
            resetSlideInterval();
        };

        window.nextSlide = function() {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSlider();
            resetSlideInterval();
        };

        window.goToSlide = function(index) {
            currentSlide = index;
            updateSlider();
            resetSlideInterval();
        };

        function updateSlider() {
            const slider = document.getElementById('hero-slider');
            if(slider) {
                slider.style.transform = `translateX(-${currentSlide * 100}%)`;
            }
            
            const dots = document.querySelectorAll('.indicator-dot');
            dots.forEach((dot, idx) => {
                if (idx === currentSlide) {
                    dot.classList.remove('bg-white/50');
                    dot.classList.add('bg-gold');
                } else {
                    dot.classList.remove('bg-gold');
                    dot.classList.add('bg-white/50');
                }
            });
        }

        function resetSlideInterval() {
            if (slideInterval) clearInterval(slideInterval);
            slideInterval = setInterval(window.nextSlide, 5000);
        }

        resetSlideInterval();

        document.addEventListener('DOMContentLoaded', () => {
            if (cookieLang === 'hi') {
                currentLang = 'hi';
                updateLangButton('English');
            }
            
            initTyped(currentLang);

            const hash = window.location.hash.substring(1); 
            if (hash && articleData[hash]) {
                setTimeout(() => {
                    openArticleModal(hash);
                }, 500);
            }

            const menuBtn = document.getElementById('mobile-menu-btn');
            const mobileMenu = document.getElementById('mobile-menu');
            const mobileLinks = document.querySelectorAll('.mobile-link');

            menuBtn.addEventListener('click', () => {
                if (mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.remove('hidden');
                    mobileMenu.classList.add('flex');
                } else {
                    mobileMenu.classList.add('hidden');
                    mobileMenu.classList.remove('flex');
                }
            });

            mobileLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.add('hidden');
                    mobileMenu.classList.remove('flex');
                });
            });

            const faqToggles = document.querySelectorAll('.faq-toggle');
            faqToggles.forEach(toggle => {
                toggle.addEventListener('click', () => {
                    const content = toggle.nextElementSibling;
                    const icon = toggle.querySelector('.faq-icon');

                    document.querySelectorAll('.faq-content').forEach(c => {
                        if (c !== content) {
                            c.classList.remove('open');
                            c.style.paddingBottom = '0';
                            c.previousElementSibling.querySelector('.faq-icon').classList.remove('open');
                        }
                    });

                    content.classList.toggle('open');
                    icon.classList.toggle('open');
                    
                    if (content.classList.contains('open')) {
                        content.style.paddingBottom = '1.5rem';
                    } else {
                        content.style.paddingBottom = '0';
                    }
                });
            });
        });
