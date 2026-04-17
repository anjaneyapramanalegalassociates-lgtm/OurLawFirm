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

        function showTypingIndicator() {
            const chatContainer = document.getElementById('chat-messages');
            const msgDiv = document.createElement('div');
            msgDiv.id = 'typing-indicator-bubble';
            msgDiv.className = "bg-gray-200 text-gray-800 rounded-lg p-3 w-16 self-start shadow-sm typing-indicator flex justify-center items-center h-10";
            msgDiv.innerHTML = '<span></span><span></span><span></span>';
            
            chatContainer.appendChild(msgDiv);
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }

        function removeTypingIndicator() {
            const indicator = document.getElementById('typing-indicator-bubble');
            if (indicator) {
                indicator.remove();
            }
        }

        function handleUserMessage() {
            const inputField = document.getElementById('chat-bot-input');
            const userText = inputField.value.trim();
            
            if (!userText) return;

            appendMessage('user', userText);
            inputField.value = '';

            showTypingIndicator();

            setTimeout(() => {
                removeTypingIndicator();
                
                const botResponse = getBotResponse(userText);
                appendMessage('bot', botResponse);
            }, 1500);
        }

        function handleEnterKeyPress(event) {
            if (event.key === 'Enter') {
                handleUserMessage();
            }
        }

        function appendMessage(sender, text) {
            const chatContainer = document.getElementById('chat-messages');
            const msgDiv = document.createElement('div');
            
            if (sender === 'user') {
                msgDiv.className = "bg-[#25D366] text-white rounded-lg p-3 max-w-[85%] self-end text-sm shadow-sm";
            } else {
                msgDiv.className = "bg-gray-200 text-gray-800 rounded-lg p-3 max-w-[85%] self-start text-sm shadow-sm";
            }
            
            msgDiv.textContent = text;
            chatContainer.appendChild(msgDiv);
            
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }

        let awaitingWhatsAppPermission = false;
        let lastUserQuery = "";

        const botKnowledge = [
            {
                intent: "criminal_and_bail",
                priority: 100,
                keywords: ["bail", "anticipatory", "police", "f.i.r", "fir", "arrest", "criminal", "crminal", "crmiminal", "jail", "court", "warrant", "crime", "murder", "fraud", "quashing"],
                response: "We handle Regular Bail, Anticipatory Bail, and FIR quashing at the District Court and Patna High Court. Time is critical in criminal matters. Please contact us immediately at +91 74829 14219."
            },
            {
                intent: "drt_sarfaesi_urgent",
                priority: 100,
                keywords: ["drt", "bank", "loan", "npa", "sarfaesi", "auction", "notice", "recovery", "default", "finance", "possession", "13(2)", "13(4)"],
                response: "Under the SARFAESI Act, if you receive a Section 13(2) notice, you have 60 days to reply. If they take symbolic possession under Section 13(4), you have 45 days to file an SA in the DRT. Do not delay—call us at +91 74829 14219 for immediate representation by Adv. Sachin Kumar."
            },

            {
                intent: "divorce_procedure",
                priority: 90,
                keywords: ["divorce", "divource", "divrce", "family", "marriage", "alimony", "custody", "wife", "husband", "maintenance", "dowry", "498a", "mutual consent", "13b"],
                response: "For a mutual consent divorce under Section 13B, spouses must live separately for 1 year. The process involves a 'First Motion', a 6-month cooling-off period (which can sometimes be waived), and a 'Second Motion'. We handle all family, alimony, and custody matters."
            },
            {
                intent: "property_title_search",
                priority: 90,
                keywords: ["property", "land", "dispute", "civil", "agreement", "registry", "title", "real estate", "partition", "zamin", "zameen", "dakhil kharij", "mutation", "encumbrance"],
                response: "Before buying property, a Title Search is mandatory. We verify Sale Deeds, Encumbrance Certificates (EC), and Mutation (Dakhil Kharij) records to protect you from double-selling and forged documents. We also handle partition suits and RERA disputes."
            },

            {
                intent: "track_record_stats",
                priority: 80,
                keywords: ["record", "success", "awards", "cases won", "experience", "how many clients", "reputation", "best lawyer"],
                response: "Anjaneya Pramana Legal Associates has a stellar track record: over 100+ Corporate & Civil Clients, 150+ Cases Won, and 10+ Legal Awards. We deliver dynamic, ethical, and result-oriented legal services."
            },
            {
                intent: "notable_cases",
                priority: 80,
                keywords: ["handled cases", "previous cases", "example", "history", "portfolio", "cwjc", "cr. misc"],
                response: "We handle high-profile matters in the High Court. Some notable cases include Cr. Misc No.35276 of 2025 (Rajan Kumar), C.W.J.C No.12763 of 2024 (Durgawati Steel vs BIADA), and Arbitration Case No.01 of 2025 (S.K. Verma)."
            },

            {
                intent: "advocate_sachin",
                priority: 70,
                keywords: ["sachin", "sachin kumar", "founder", "managing advocate", "main lawyer", "head lawyer", "owner", "boss"],
                response: "Adv. Sachin Kumar (B.A. LL.B., Diploma in Cyber Law) is our Founder. He actively practices at the Patna High Court and Supreme Court, specializing in Banking Law (DRT), Civil/Commercial Litigation, and Constitutional Writs."
            },
            {
                intent: "advocate_samridhi",
                priority: 70,
                keywords: ["samridhi", "pandey", "kumari samridhi", "lady advocate", "female lawyer"],
                response: "Advocate Kumari Samridhi Pandey specializes in civil and criminal litigation. She is highly skilled in legal research, drafting pleadings, and practicing before the Patna High Court, District Courts, and DRT."
            },
            {
                intent: "advocate_parkhi",
                priority: 70,
                keywords: ["parkhi", "pankaj", "parkhi pankaj"],
                response: "Advocate Parkhi Pankaj focuses heavily on Real Estate Law, civil matters, and family disputes. She handles detailed legal research and procedural practice at the Patna High Court and District Courts."
            },
            {
                intent: "staff_details",
                priority: 70,
                keywords: ["aditya", "patel", "suraj", "manager", "munsi", "clerk", "admin", "staff"],
                response: "Our firm is supported by Aditya Kr. Patel (Firm Manager), who handles legal operations and client relations, and Suraj Kumar (Munsi/Clerk), who manages court registry, documentation, and office administration."
            },

            {
                intent: "fees_and_cost",
                priority: 50,
                keywords: ["fee", "fees", "cost", "price", "charge", "charges", "how much", "expensive", "money", "consultation"],
                response: "We offer a FREE initial 15-minute phone evaluation! After understanding your situation, we will provide a clear, upfront estimate of the legal fees required to proceed with your case."
            },
            {
                intent: "time_and_duration",
                priority: 50,
                keywords: ["how long", "time", "duration", "fast", "quick", "months", "years", "speed"],
                response: "Case duration depends on court schedules and complexity. However, we strive for efficient resolutions and frequently utilize Alternative Dispute Resolution (ADR) like arbitration or mediation to speed things up."
            },
            {
                intent: "location_and_contact",
                priority: 50,
                keywords: ["location", "address", "where", "office", "visit", "meet", "appointment", "contact", "phone", "number", "email", "call"],
                response: "Our office is at Kurji Ashiana Road, Near Platinum Library, Above Elite Food Junction, Rajeev Nagar, A.G Colony-800024, Patna. Call us at +91 74829 14219 or +91 70661 60162."
            },
            {
                intent: "office_hours",
                priority: 50,
                keywords: ["timing", "hours", "open", "close", "sunday", "when are you open", "available"],
                response: "Our office is open Monday to Saturday from 10:00 AM to 8:00 PM (20:00). We are available on Sundays optionally or by prior appointment."
            },
            {
                intent: "social_media_and_language",
                priority: 50,
                keywords: ["language", "hindi", "english", "social media", "twitter", "linkedin"],
                response: "We communicate fluently in both English and Hindi. You can also connect with us on Twitter (@LegalPramana312) and our LinkedIn page!"
            },

            {
                intent: "articles_and_blog",
                priority: 10,
                keywords: ["article", "blog", "read", "guide", "insight", "learn", "information"],
                response: "We regularly publish legal insights! Scroll to the 'Legal Insights' section of our website to read our guides on the SARFAESI Act, Mutual Consent Divorce steps, and Property Title Searches."
            },
            {
                intent: "greetings",
                priority: 10,
                keywords: ["hi", "hii", "hiii", "hello", "hey", "heyy", "namaste", "pranam", "help", "assist"],
                response: "Hello! Welcome to Anjaneya Pramana Legal Associates. How can I help you today? You can ask me about our services, specific legal processes (like Bail, DRT, Divorce), fees, or our advocates."
            }
        ];

        function getBotResponse(input) {
            const lowerInput = input.toLowerCase();
            
            if (awaitingWhatsAppPermission) {
                if (lowerInput.match(/\b(yes|yep|sure|ok|yeah|y|ha|haan|yes please)\b/)) {
                    awaitingWhatsAppPermission = false;
                    
                    setTimeout(() => {
                        const waMessage = `Hi, I was chatting with your virtual assistant and I need human help regarding: "${lastUserQuery}"`;
                        window.open(`https://wa.me/917482914219?text=${encodeURIComponent(waMessage)}`, '_blank');
                        toggleChatPopup(); 
                    }, 1500);
                    
                    return "Great! Redirecting you to our WhatsApp support team now. Please wait a moment...";
                    
                } else if (lowerInput.match(/\b(no|nope|nah|n|nahi)\b/)) {
                    awaitingWhatsAppPermission = false;
                    return "Okay, no problem! Feel free to ask another question or use the Contact Form on our website.";
                } else {
                    return "Please answer Yes or No. Would you like me to connect you with our legal team on WhatsApp?";
                }
            }
            
            let matchedCategories = [];
            
            for (const category of botKnowledge) {
                const isMatch = category.keywords.some(keyword => lowerInput.includes(keyword));
                if (isMatch) {
                    matchedCategories.push(category);
                }
            }
            
            if (matchedCategories.length > 0) {
                matchedCategories.sort((a, b) => b.priority - a.priority);
                
                return matchedCategories[0].response;
            }
            
            awaitingWhatsAppPermission = true;
            lastUserQuery = input; 
            
            return "I am a basic virtual assistant and I'm not quite sure how to answer that yet. Would you like me to redirect you to our human legal team on WhatsApp? (Please reply Yes or No)";
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
