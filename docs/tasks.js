"use strict";

const NUMBER_OF_TASKS = 5;
const SEED_ALPHABET = "abcdefghjkmnpqrstuvwxyz23456789"; // no look-alikes (i/l/o/0/1)
const SEED_LENGTH = 6;
const MAX_SEED_LENGTH = 64;

// --- Seeded random numbers -------------------------------------------------
// The same seed always deals the same card, so a link can be shared.

// Turns any string into a 32-bit integer (xmur3).
function hashSeed(text) {
    let h = 1779033703 ^ text.length;
    for (let i = 0; i < text.length; i++) {
        h = Math.imul(h ^ text.charCodeAt(i), 3432918353);
        h = (h << 13) | (h >>> 19);
    }
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return (h ^ (h >>> 16)) >>> 0;
}

// Returns a function that gives numbers in [0, 1) (mulberry32).
function makeRng(seed) {
    let a = hashSeed(String(seed));
    return function () {
        a = (a + 0x6D2B79F5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

// A short random code to use as a seed when the link doesn't have one.
function newSeed() {
    const bytes = new Uint8Array(SEED_LENGTH);
    crypto.getRandomValues(bytes);
    let seed = "";
    for (const b of bytes) {
        seed += SEED_ALPHABET[b % SEED_ALPHABET.length];
    }
    return seed;
}

// Reads ?seed=... from a query string. Returns null if there isn't a usable one.
function seedFromSearch(search) {
    const value = new URLSearchParams(search).get("seed");
    if (value === null) {
        return null;
    }
    const seed = value.trim().slice(0, MAX_SEED_LENGTH);
    return seed === "" ? null : seed;
}

// Picks `count` different tasks (fewer if the list is shorter) without
// changing the list that was passed in.
function pickTasks(allTasks, count, rng) {
    const pool = allTasks.slice();
    const n = Math.min(count, pool.length);
    for (let i = 0; i < n; i++) {
        const j = i + Math.floor(rng() * (pool.length - i));
        [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    return pool.slice(0, n);
}

// --- Page ------------------------------------------------------------------

function toggleCard(card) {
    const done = card.getAttribute("aria-pressed") === "true";
    card.setAttribute("aria-pressed", String(!done));
}

// Each task is a native <button> in a list item, so it gets keyboard
// support (Enter and Space) and its role and focus behaviour for free.
function renderCards(container, tasks) {
    container.replaceChildren();
    for (const task of tasks) {
        const item = document.createElement("li");
        const card = document.createElement("button");
        card.type = "button";
        card.className = "card";
        card.setAttribute("aria-pressed", "false");
        card.textContent = task;
        item.append(card);
        container.append(item);
    }
}

async function init() {
    const response = await fetch("language/en.json");
    const strings = await response.json();

    // Keep the same card when the link has a seed; otherwise deal a new one
    // and put its seed in the address bar so the link can be shared.
    let seed = seedFromSearch(window.location.search);
    if (seed === null) {
        seed = newSeed();
        const url = new URL(window.location.href);
        url.searchParams.set("seed", seed);
        history.replaceState(null, "", url);
    }

    document.title = strings.title;
    document.getElementById("header").textContent = strings.header;
    document.getElementById("goal").textContent = strings.goal;
    document.getElementById("how-to-play-header").textContent = strings.how_to_play_header;
    document.getElementById("invite").textContent = strings.invite;
    document.getElementById("footer").textContent = strings.footer;
    document.getElementById("new-card").textContent = strings.new_card;

    const list = document.getElementById("how-to-play");
    for (const rule of strings.how_to_play) {
        const item = document.createElement("li");
        item.textContent = rule;
        list.append(item);
    }

    const cards = document.getElementById("cards");
    renderCards(cards, pickTasks(strings.tasks, NUMBER_OF_TASKS, makeRng(seed)));
    cards.addEventListener("click", (event) => {
        const card = event.target.closest(".card");
        if (card) {
            toggleCard(card);
        }
    });
}

if (typeof document !== "undefined") {
    init();
}

if (typeof module !== "undefined") {
    module.exports = { hashSeed, makeRng, newSeed, seedFromSearch, pickTasks, NUMBER_OF_TASKS };
}
