let selectedCard = null;

function toggleTask(card) {
    // Toggle completed state
    if (card.classList.contains('completed')) {
        card.classList.remove('completed');
    } else {
        card.classList.add('completed');
    }
}

function markComplete() {
    if (!selectedCard) {
        showToast("Select a task.");
        return;
    }
    selectedCard.classList.remove('failed');
    selectedCard.classList.add('completed');
}

function resetCard() {
    if (!selectedCard) {
        showToast("Select a task.");
        return;
    }
    selectedCard.classList.remove('completed', 'failed');
}
