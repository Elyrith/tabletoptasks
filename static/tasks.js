let selectedCard = null;

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    // Show it
    setTimeout(() => toast.classList.add('show'), 50);

    // Hide + remove it
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 2000);
}

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
    }
}

function markFailed() {
    if (selectedCard) {
        const cards = document.querySelectorAll('.card');
        const index = Array.from(cards).indexOf(selectedCard);

        // Don't let the first task (guesswhat) be failed
        if (index === 0) {
            showToast("The 'Guess what?' task can't be marked as failed!");
            return;
        }

        selectedCard.classList.remove('completed');
        selectedCard.classList.add('failed');
    }
}

function resetCard() {
    if (selectedCard) {
        selectedCard.classList.remove('completed', 'failed');
    }
}
