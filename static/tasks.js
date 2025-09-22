let selectedCard = null;

function toggleTask(card) {
    // Deselect previous
    if (selectedCard && selectedCard !== card) {
        selectedCard.classList.remove('selected');
    }

    // Toggle this one
    const isSelected = card.classList.toggle('selected');
    selectedCard = isSelected ? card : null;
}

function markComplete() {
    if (selectedCard) {
        selectedCard.classList.remove('failed');
        selectedCard.classList.add('completed');
        selectedCard.classList.remove('selected');
    }
}

function markCaught() {
    if (selectedCard) {
        selectedCard.classList.remove('completed');
        selectedCard.classList.add('failed');
        selectedCard.classList.remove('selected');
    }
}

function resetCard() {
    if (selectedCard) {
        selectedCard.classList.remove('completed', 'failed', 'selected');
    }
}
