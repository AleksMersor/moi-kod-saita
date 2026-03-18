document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        let el = document.getElementById(link.getAttribute('href').slice(1));
        if (el) el.scrollIntoView({behavior: 'smooth'});
    });
});

let i = 0;
const s = document.querySelectorAll('.slide');
const d = document.querySelectorAll('.dot');

function showSlide() {
    if (i >= s.length) i = 0;
    if (i < 0) i = s.length - 1;
    s.forEach(el => el.classList.remove('active'));
    d.forEach(el => el.classList.remove('active'));
    s[i].classList.add('active');
    d[i].classList.add('active');
}

window.nextSlide = function() {
    i++;
    showSlide();
}

window.prevSlide = function() {
    i--;
    showSlide();
}

window.currentSlide = function(n) {
    i = n;
    showSlide();
}

setInterval(() => {
    i++;
    showSlide();
}, 5000);

function updateTimer() {
    let end = new Date();
    end.setHours(23, 59, 59);
    let diff = end - new Date();
    if (diff < 0) {
        document.getElementById('timer').innerText = '00:00:00';
        return;
    }   
    let h = Math.floor(diff / 3600000);
    let m = Math.floor(diff / 60000) % 60;
    let sec = Math.floor(diff / 1000) % 60;
    
    document.getElementById('timer').innerText = 
        `${h < 10 ? '0' + h : h}:${m < 10 ? '0' + m : m}:${sec < 10 ? '0' + sec : sec}`;
}

updateTimer();
setInterval(updateTimer, 1000);

window.closeDiscount = function() {
    document.getElementById('discountBanner').style.display = 'none';
}

function validateForm() {
    let isValid = true;
    
    const name = document.getElementById('name');
    const nameError = document.getElementById('nameError');
    if (name.value.trim().length < 2) {
        name.classList.add('error');
        nameError.classList.add('show');
        isValid = false;
    } else {
        name.classList.remove('error');
        nameError.classList.remove('show');
    }
    
    const email = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
        email.classList.add('error');
        emailError.classList.add('show');
        isValid = false;
    } else {
        email.classList.remove('error');
        emailError.classList.remove('show');
    }    
    
    const phone = document.getElementById('phone');
    const phoneError = document.getElementById('phoneError');
    if (phone.value.trim() !== '') {
        const phoneRegex = /^[\+\d\s\(\)\-]{10,20}$/;
        if (!phoneRegex.test(phone.value.trim())) {
            phone.classList.add('error');
            phoneError.classList.add('show');
            isValid = false;
        } else {
            phone.classList.remove('error');
            phoneError.classList.remove('show');
        }
    } else {
        phone.classList.remove('error');
        phoneError.classList.remove('show');
    }
    
    const subject = document.getElementById('subject');
    const subjectError = document.getElementById('subjectError');
    if (subject.value === '') {
        subject.classList.add('error');
        subjectError.classList.add('show');
        isValid = false;
    } else {
        subject.classList.remove('error');
        subjectError.classList.remove('show');
    }
    
    const message = document.getElementById('message');
    const messageError = document.getElementById('messageError');
    if (message.value.trim().length < 10) {
        message.classList.add('error');
        messageError.classList.add('show');
        isValid = false;
    } else {
        message.classList.remove('error');
        messageError.classList.remove('show');
    }    
    
    return isValid;
}

window.submitForm = function() {
    if (validateForm()) {
        document.getElementById('successModal').classList.add('show');
        document.getElementById('feedbackForm').reset();
        document.querySelectorAll('.form-group input, .form-group textarea, .form-group select').forEach(el => {
            el.classList.remove('error');
        });
        document.querySelectorAll('.error-message').forEach(el => {
            el.classList.remove('show');
        });
    }
}

window.closeModal = function() {
    document.getElementById('successModal').classList.remove('show');
}

window.closeHintModal = function() {
    document.getElementById('hintModal').classList.remove('show');
}

document.getElementById('successModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

document.getElementById('hintModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeHintModal();
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
        closeHintModal();
    }
});

document.getElementById('name').addEventListener('input', function() {
    if (this.value.trim().length >= 2) {
        this.classList.remove('error');
        document.getElementById('nameError').classList.remove('show');
    }
});

document.getElementById('email').addEventListener('input', function() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(this.value.trim())) {
        this.classList.remove('error');
        document.getElementById('emailError').classList.remove('show');
    }
});

document.getElementById('phone').addEventListener('input', function() {
    if (this.value.trim() === '' || /^[\+\d\s\(\)\-]{10,20}$/.test(this.value.trim())) {
        this.classList.remove('error');
        document.getElementById('phoneError').classList.remove('show');
    }
});

document.getElementById('subject').addEventListener('change', function() {
    if (this.value !== '') {
        this.classList.remove('error');
        document.getElementById('subjectError').classList.remove('show');
    }
});

document.getElementById('message').addEventListener('input', function() {
    if (this.value.trim().length >= 10) {
        this.classList.remove('error');
        document.getElementById('messageError').classList.remove('show');
    }
});

document.getElementById('name').addEventListener('focus', function() {
    document.getElementById('nameHint').classList.add('show');
});

document.getElementById('name').addEventListener('blur', function() {
    document.getElementById('nameHint').classList.remove('show');
});

document.getElementById('email').addEventListener('focus', function() {
    document.getElementById('emailHint').classList.add('show');
});

document.getElementById('email').addEventListener('blur', function() {
    document.getElementById('emailHint').classList.remove('show');
});

document.getElementById('phone').addEventListener('focus', function() {
    document.getElementById('phoneHint').classList.add('show');
});

document.getElementById('phone').addEventListener('blur', function() {
    document.getElementById('phoneHint').classList.remove('show');
});

document.getElementById('subject').addEventListener('focus', function() {
    document.getElementById('subjectHint').classList.add('show');
});

document.getElementById('subject').addEventListener('blur', function() {
    document.getElementById('subjectHint').classList.remove('show');
});

document.getElementById('message').addEventListener('focus', function() {
    document.getElementById('messageHint').classList.add('show');
});

document.getElementById('message').addEventListener('blur', function() {
    document.getElementById('messageHint').classList.remove('show');
});

document.querySelectorAll('.tooltip').forEach(tooltip => {
    tooltip.addEventListener('click', function(e) {
        e.stopPropagation();
        const text = this.querySelector('.tooltip-text').textContent;
        document.getElementById('hintModalText').textContent = text;
        document.getElementById('hintModal').classList.add('show');
    });
});

let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', function(e) {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateAssassinEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateAssassinEasterEgg() {
    document.body.classList.add('leap-effect');
    setTimeout(() => {
        document.body.classList.remove('leap-effect');
    }, 500);
    document.getElementById('hiddenQuote').innerHTML = 'A · Hичто не истинно, всё дозволено · A';
    document.getElementById('hiddenQuote').style.opacity = '0.8';
    document.getElementById('hiddenQuote').style.color = 'orange';
    document.querySelector('.assassin-footer').style.opacity = '0.8';
    document.querySelector('.assassin-footer').style.color = 'orange';
}

window.showAssassinMessage = function() {
    document.getElementById('assassinModal').classList.add('show');
}

window.closeAssassinModal = function() {
    document.getElementById('assassinModal').classList.remove('show');
}

window.revealAssassin = function() {
    activateAssassinEasterEgg();
    showAssassinMessage();
}

document.getElementById('assassinModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeAssassinModal();
    }
});

let lastScroll = 0;
window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    if (Math.abs(currentScroll - lastScroll) > 500) {
        document.getElementById('hiddenQuote').innerHTML = 'A · Прыжок веры · A';
        setTimeout(() => {
            if (document.getElementById('hiddenQuote').style.opacity !== '0.8') {
                document.getElementById('hiddenQuote').innerHTML = 'A';
            }
        }, 1000);
    }
    lastScroll = currentScroll;
});