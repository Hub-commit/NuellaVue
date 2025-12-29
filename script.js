document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.createElement('div');
    cursor.classList.add('cursor');
    document.body.appendChild(cursor);
    let lastSpark = 0;
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;

        const now = Date.now();
        if (now - lastSpark > 60) { // throttle sparkles
            lastSpark = now;
            const sparkle = document.createElement('div');
            sparkle.classList.add('sparkle');
            sparkle.style.left = `${e.clientX}px`;
            sparkle.style.top = `${e.clientY}px`;
            document.body.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 900);
        }
    });

    const slider = document.querySelector('.ba-slider');
    const resize = slider.querySelector('.resize');
    const handle = slider.querySelector('.handle');

    let dragging = false;

    const startDrag = (clientX) => {
        dragging = true;
        moveHandle(clientX);
    };

    const stopDrag = () => dragging = false;

    const moveHandle = (clientX) => {
        const sliderRect = slider.getBoundingClientRect();
        let offsetX = clientX - sliderRect.left;
        let percentage = (offsetX / sliderRect.width) * 100;

        if (percentage < 0) percentage = 0;
        if (percentage > 100) percentage = 100;

        resize.style.width = `${percentage}%`;
        handle.style.left = `${percentage}%`;
    };

    handle.addEventListener('pointerdown', (e) => startDrag(e.clientX));
    document.addEventListener('pointerup', stopDrag);
    document.addEventListener('pointermove', (e) => {
        if (!dragging) return;
        moveHandle(e.clientX);
    });

    // Initialize slider to middle
    resize.style.width = '50%';
    handle.style.left = '50%';

    // Modal logic
    const modal = document.getElementById('booking-modal');
    const openModalBtn = document.getElementById('open-modal-btn');
    const closeModalBtn = document.querySelector('.close-btn');
    const bookingForm = document.getElementById('booking-form');

    openModalBtn.addEventListener('click', () => {
        modal.style.display = 'block';
        // clear or keep previous values
    });

    // Hero CTA opens modal
    const heroCta = document.getElementById('hero-cta');
    if (heroCta) heroCta.addEventListener('click', () => modal.style.display = 'block');

    // Clicking a service card opens modal and pre-fills service
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('click', () => {
            const svc = card.getAttribute('data-service') || '';
            const serviceSelect = document.getElementById('service');
            if (serviceSelect) {
                // try to match one of the options
                for (let i=0;i<serviceSelect.options.length;i++){
                    if (serviceSelect.options[i].value.toLowerCase().includes(svc.split(' ')[0].toLowerCase())){
                        serviceSelect.selectedIndex = i; break;
                    }
                }
            }
            modal.style.display = 'block';
        });
    });

    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const service = document.getElementById('service').value;
        const status = document.getElementById('status').value;
        const location = document.getElementById('location').value;
        const requirements = document.getElementById('requirements').value;
        const name = document.getElementById('name').value;
        const whatsapp = document.getElementById('whatsapp').value;

        const message = `Hello NuellaVue Cleaning Agency! I want to book a deep clean.%0A%0ADetails:%0AType: ${service}%0AStatus: ${status}%0ALocation: ${location}%0ANote: ${requirements}%0AName: ${name}%0AWhatsApp: ${whatsapp}%0A%0APlease send me the invoice and payment details.`;

        // Send to agency WhatsApp number (Nigeria). No plus sign, no leading zeros.
        const agencyNumber = '2349073184174';
        const whatsappUrl = `https://wa.me/${agencyNumber}?text=${message}`;
        // Open WhatsApp (web or app) in a new tab/window so user can return
        window.open(whatsappUrl, '_blank');
        modal.style.display = 'none';
    });

    // Animated counter
    const counter = document.getElementById('counter');
    const target = +counter.getAttribute('data-target');
    const speed = 200; // The lower the number, the faster the count

    const updateCount = () => {
        const count = +counter.innerText;
        const inc = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + inc);
            setTimeout(updateCount, 1);
        } else {
            counter.innerText = target;
        }
    };

    // Intersection Observer to trigger the counter animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                updateCount();
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the element is visible
    });

    observer.observe(counter);

    // Scroll animations
    const animatedSections = document.querySelectorAll('.animated-section');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                sectionObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    animatedSections.forEach(section => {
        sectionObserver.observe(section);
    });
});
