# Tabletop Tasks

A meta-game for your game night.

Each player gets 5 random tasks ("compliment someone's great move", "roll the lowest number on a die"...) and tries to be the first to finish them all.

It is a static website (plain HTML, CSS and JavaScript, no build step) served by GitHub Pages from the `docs/` folder.

## Sharing a card

The address always carries the card's seed, for example `?seed=k7p2xq`. The same seed always deals the same 5 tasks, so "Share this card" (or copying the address) gives a friend the same card. Opening the plain address, or "New card", deals a new one.

If the task list in `docs/language/en.json` changes, an old seed deals a different card than it used to.

## Adding or changing tasks

Edit `docs/language/en.json`. The page text lives there too. Tasks are plain text.

## Running it locally

The page loads `language/en.json` with `fetch`, so it needs a web server (opening the file directly won't work):

    python3 -m http.server -d docs

then open <http://localhost:8000/>.

## Tests

Needs Node 20 or newer:

    node --test

## Publishing

In the GitHub repo: Settings, Pages, "Deploy from a branch", branch `main`, folder `/docs`. To use your own domain, add a `docs/CNAME` file containing the domain name and set the DNS records GitHub shows.

## TODO

- Add a bunch of tasks
- Tell people about it
