let selectedCard = null;

function toggleTask(card) {
    if (selectedCard) {
        selectedCard.style.border = '';
    }
    selectedCard = card;
    card.style.border = '2px solid #007bff';
}

// Mark the selected card as completed (green + line-through)
function markComplete() {
    if (selectedCard) {
        selectedCard.classList.remove('caught');
        selectedCard.classList.add('completed');
        selectedCard.style.border = '';
    }
}

// Mark the selected card as caught (red + line-through)
function markCaught() {
    if (selectedCard) {
        selectedCard.classList.remove('completed');
        selectedCard.classList.add('caught');
        selectedCard.style.border = '';
    }
}

// Reset the selected card to default state
function resetCard() {
    if (selectedCard) {
        selectedCard.classList.remove('completed', 'caught');
        selectedCard.style.border = '';
    }
}
