"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const { makeRng, newSeed, seedFromSearch, pickTasks, NUMBER_OF_TASKS } = require("../docs/tasks.js");

const strings = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "docs", "language", "en.json"), "utf-8"));

test("the same seed deals the same card", () => {
    const a = pickTasks(strings.tasks, NUMBER_OF_TASKS, makeRng("abc123"));
    const b = pickTasks(strings.tasks, NUMBER_OF_TASKS, makeRng("abc123"));
    assert.deepEqual(a, b);
});

test("different seeds deal different cards", () => {
    const seen = new Set();
    for (const seed of ["a", "b", "c", "d", "e", "f", "g", "h"]) {
        seen.add(pickTasks(strings.tasks, NUMBER_OF_TASKS, makeRng(seed)).join("|"));
    }
    assert.ok(seen.size > 1);
});

test("a card has the right number of different tasks from the list", () => {
    for (let i = 0; i < 200; i++) {
        const card = pickTasks(strings.tasks, NUMBER_OF_TASKS, makeRng(`seed-${i}`));
        assert.equal(card.length, NUMBER_OF_TASKS);
        assert.equal(new Set(card).size, NUMBER_OF_TASKS);
        for (const task of card) {
            assert.ok(strings.tasks.includes(task));
        }
    }
});

test("every task can be dealt", () => {
    const dealt = new Set();
    for (let i = 0; i < 500; i++) {
        for (const task of pickTasks(strings.tasks, NUMBER_OF_TASKS, makeRng(`seed-${i}`))) {
            dealt.add(task);
        }
    }
    assert.equal(dealt.size, strings.tasks.length);
});

test("a short task list gives a short card instead of an error", () => {
    const card = pickTasks(["one", "two", "three"], NUMBER_OF_TASKS, makeRng("x"));
    assert.equal(card.length, 3);
    assert.deepEqual(pickTasks([], NUMBER_OF_TASKS, makeRng("x")), []);
});

test("picking tasks does not change the task list", () => {
    const list = strings.tasks.slice();
    pickTasks(list, NUMBER_OF_TASKS, makeRng("x"));
    assert.deepEqual(list, strings.tasks);
});

test("rng stays in [0, 1)", () => {
    const rng = makeRng("range");
    for (let i = 0; i < 1000; i++) {
        const n = rng();
        assert.ok(n >= 0 && n < 1);
    }
});

test("seedFromSearch reads, trims and limits the seed", () => {
    assert.equal(seedFromSearch("?seed=abc123"), "abc123");
    assert.equal(seedFromSearch("?foo=1&seed=%20x%20"), "x");
    assert.equal(seedFromSearch("?seed=" + "a".repeat(200)).length, 64);
    assert.equal(seedFromSearch(""), null);
    assert.equal(seedFromSearch("?seed="), null);
    assert.equal(seedFromSearch("?seed=%20%20"), null);
    assert.equal(seedFromSearch("?other=1"), null);
});

test("newSeed makes short codes that differ", () => {
    const seeds = new Set();
    for (let i = 0; i < 50; i++) {
        const seed = newSeed();
        assert.match(seed, /^[a-z2-9]{6}$/);
        seeds.add(seed);
    }
    assert.ok(seeds.size > 40);
});

test("language file has what the page needs", () => {
    for (const key of ["title", "header", "goal", "how_to_play_header", "invite", "share", "new_card", "link_copied", "footer"]) {
        assert.equal(typeof strings[key], "string", key);
        assert.notEqual(strings[key], "", key);
    }
    assert.ok(strings.how_to_play.length > 0);
    assert.ok(strings.tasks.length >= NUMBER_OF_TASKS);
    assert.equal(new Set(strings.tasks).size, strings.tasks.length, "duplicate task");
});
