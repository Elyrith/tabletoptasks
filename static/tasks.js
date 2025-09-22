let selectedCard = null;

// Toast container
const toastContainer = document.createElement('div');
toastContainer.id = 'toast-container';
document.body.appendChild(toastContainer);

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 2000); // 2 seconds
}

// Update button states
function updateButtonState() {
    const hasSelection = selectedCard !== null;
    document.getElementById("mark-complete-btn").disabled = !hasSelection;
    document.getElementById("mark-failed-btn").disabled = !hasSelection;
    document.getElementById("reset-btn").disabled = !hasSelection;
}

// Toggle selection of a card
function toggleTask(card) {
    if (selectedCard === card) return; // Already selected
    if (selectedCard) selectedCard.classList.remove('selected');
    selectedCard = card;
    selectedCard.classList.add('selected');
    updateButtonState();
}

// Mark selected card as completed
function markComplete() {
    if (!selectedCard) return;

    selectedCard.classList.remove('failed');
    selectedCard.classList.add('completed');
}

// Mark selected card as failed (cannot fail first card)
function markFailed() {
    if (!selectedCard) return;

    const index = Array.from(document.querySelectorAll('.card')).indexOf(selectedCard);
    if (index === 0) {
        showToast("The 'Guess what?' task can't be marked as failed!");
        return;
    }

    selectedCard.classList.remove('completed');
    selectedCard.classList.add('failed');
}

// Reset selected card
function resetCard() {
    if (!selectedCard) return;

    selectedCard.classList.remove('completed', 'failed');
}

// Initialize buttons as disabled
updateButtonState();
