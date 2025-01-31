let currentCardIndex = 0;
const cards = document.querySelectorAll('.card');

function showCard(index) {
    cards.forEach((card, i) => {
        card.classList.remove('active', 'previous', 'next');
        if (i === index) {
            card.classList.add('active');
        } else if (i === (index - 1 + cards.length) % cards.length) {
            card.classList.add('previous');
        } else if (i === (index + 1) % cards.length) {
            card.classList.add('next');
        }
    });
}

function nextCard() {
    currentCardIndex = (currentCardIndex + 1) % cards.length;
    showCard(currentCardIndex);
}

function previousCard() {
    currentCardIndex = (currentCardIndex - 1 + cards.length) % cards.length;
    showCard(currentCardIndex);
}


// Language page translation
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the first card as active
    showCard(currentCardIndex);

    // Language page translation
    const langItems = document.querySelectorAll('.langitemwrapper');
    const pageTitle = document.getElementById('page-title');

    // Store original text content
    langItems.forEach(item => {
        item.dataset.originalLang = item.querySelector('h2').textContent.toLowerCase();
        item.dataset.originalProficiency = item.querySelector('h3').textContent.toLowerCase();
    });

    langItems.forEach(item => {
        item.addEventListener('click', () => {
            const translations = JSON.parse(item.getAttribute('data-translate'));
            pageTitle.textContent = translations.title;

            // Update proficiency levels and language names
            langItems.forEach(wrapper => {
                const originalLang = wrapper.dataset.originalLang;
                wrapper.querySelector('h2').textContent = translations[originalLang];
                wrapper.querySelector('h3').textContent = translations.proficiency[originalLang];
            });
        });
    });
});