document.addEventListener('DOMContentLoaded', function() {
    // Controle do navbar no scroll
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.classList.remove('scrolled', 'scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
            // Scrolling down
            navbar.classList.remove('scroll-up');
            navbar.classList.add('scroll-down', 'scrolled');
        } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
            // Scrolling up
            navbar.classList.remove('scroll-down');
            navbar.classList.add('scroll-up', 'scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // Efeito de digitação no hero com verificação de elemento
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typingEffect = setInterval(() => {
            if (i < originalText.length) {
                heroTitle.textContent += originalText.charAt(i);
                i++;
            } else {
                clearInterval(typingEffect);
            }
        }, 100);
    }

    // Dados dos serviços premium atualizados
    const services = [        {
            title: "Consultoria Estratégica em TI",
            icon: "🚀",
            description: "Planejamento tecnológico personalizado para maximizar seus resultados.",
            link: "cases/consultoria-estrategica.html"
        },
        {
            title: "Segurança Cibernética",
            icon: "🔐",
            description: "Proteção completa para seus dados e infraestrutura tecnológica.",
            link: "https://github.com/FelipeSoeiroLopes/tecnosoluti"
        },
        {
            title: "Cloud & DevOps",
            icon: "☁️",
            description: "Modernização e otimização de ambientes em nuvem e práticas DevOps.",
            link: "https://github.com/FelipeSoeiroLopes/tecnosoluti"
        },
        {
            title: "Desenvolvimento Sob Medida",
            icon: "👨‍💻",
            description: "Soluções personalizadas para suas necessidades específicas.",
            link: "https://github.com/FelipeSoeiroLopes/tecnosoluti"
        }
    ];

    // Gerar cards de serviços com verificação
    const servicesGrid = document.querySelector('.services-grid');
    if (servicesGrid) {
        services.forEach((service, index) => {
            const card = document.createElement('div');
            card.className = 'service-card';
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            card.innerHTML = `
                <div class="service-icon">${service.icon}</div>
                <h3>${service.title}</h3>
                <p>${service.description}</p>
                <a href="${service.link}" class="service-button">Saiba mais</a>
            `;
            
            servicesGrid.appendChild(card);
            
            // Animação de entrada com delay
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 200 + index * 100);
        });
    }    // MENU MOBILE MODERNO
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const overlay = document.querySelector('.mobile-menu-overlay');
    const body = document.body;
    if (menuToggle && mobileMenu && overlay) {
        function openMenu() {
            mobileMenu.classList.add('open');
            overlay.classList.add('open');
            menuToggle.classList.add('active');
            body.classList.add('menu-open');
            menuToggle.setAttribute('aria-expanded', 'true');
            mobileMenu.setAttribute('aria-hidden', 'false');
        }
        function closeMenu() {
            mobileMenu.classList.remove('open');
            overlay.classList.remove('open');
            menuToggle.classList.remove('active');
            body.classList.remove('menu-open');
            menuToggle.setAttribute('aria-expanded', 'false');
            mobileMenu.setAttribute('aria-hidden', 'true');
            // Remover foco de qualquer link dentro do menu mobile
            const focused = mobileMenu.querySelector('a:focus');
            if (focused) focused.blur();
        }
        menuToggle.addEventListener('click', function() {
            if (mobileMenu.classList.contains('open')) {
                closeMenu();
            } else {
                openMenu();
            }
        });
        overlay.addEventListener('click', closeMenu);
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
                closeMenu();
            }
        });
    }    // Navbar scroll
    if (navbar) {
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll <= 0) {
                navbar.classList.remove('scrolled', 'scroll-up', 'scroll-down');
                return;
            }
            
            if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
                // Scrolling down
                navbar.classList.remove('scroll-up');
                navbar.classList.add('scroll-down', 'scrolled');
            } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
                // Scrolling up
                navbar.classList.remove('scroll-down');
                navbar.classList.add('scroll-up', 'scrolled');
            }
            
            lastScroll = currentScroll;
        });
    }

    // Scroll suave para links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animação dos números na seção Sobre
    const animateValue = (element, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            element.textContent = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    // Observer para animação dos números
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.stat-number').forEach(stat => {
                    const value = parseInt(stat.textContent);
                    animateValue(stat, 0, value, 2000);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
        observer.observe(statsSection);
    }

    // Formulário de contato
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Aqui você pode adicionar a lógica de envio do formulário
            alert('Mensagem enviada com sucesso!');
            this.reset();
        });
    }

    // Otimização para touch events
    const handleTouchStart = (e) => {
        const target = e.target;
        if (target.classList.contains('service-card')) {
            target.classList.add('touch-active');
        }
    };

    const handleTouchEnd = (e) => {
        const target = e.target;
        if (target.classList.contains('service-card')) {
            target.classList.remove('touch-active');
        }
    };

    // Adiciona eventos de touch
    document.addEventListener('touchstart', handleTouchStart, false);
    document.addEventListener('touchend', handleTouchEnd, false);

    // Otimização de scroll para mobile
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            const target = document.querySelector(href);
            
            if (target) {
                const headerOffset = 60;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Fecha o menu mobile se estiver aberto
                const mobileMenu = document.querySelector('.mobile-menu');
                if (mobileMenu && mobileMenu.classList.contains('open')) {
                    mobileMenu.classList.remove('open');
                }
            }
        });
    });

    // Otimização do formulário para mobile
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Desfoca o campo ativo para esconder o teclado virtual
            document.activeElement.blur();
            
            // Aqui você pode adicionar sua lógica de envio do formulário
            alert('Mensagem enviada com sucesso!');
            form.reset();
        });
    }

    // Melhoria na detecção de orientação do dispositivo
    window.addEventListener('orientationchange', function() {
        setTimeout(() => {
            window.scrollTo(0, window.scrollY);
        }, 300);
    });

    // POPUP DAS LOGOS DOS SISTEMAS
    window.openLogoPopup = function(system) {
        // Fecha todos os popups
        document.querySelectorAll('.logo-popup').forEach(p => p.style.display = 'none');
        document.getElementById('logo-popup-bg').style.display = 'block';
        const popup = document.getElementById('logo-popup-' + system);
        if (popup) popup.style.display = 'block';
    }
    window.closeLogoPopup = function() {
        document.getElementById('logo-popup-bg').style.display = 'none';
        document.querySelectorAll('.logo-popup').forEach(p => p.style.display = 'none');
    }
});
