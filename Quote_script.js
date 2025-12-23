const api_url = "https://api.quotable.io/random";
const quoteEl = document.getElementById("quote");
const authorEl = document.getElementById("author");
const btn = document.querySelector(".quote-box button");

const STORAGE_CURRENT = "currentQuote";
const STORAGE_NEXT = "nextQuote";
let prefetched = null;

function showQuote(obj) {
    quoteEl.textContent = obj.text || "No quote found";
    authorEl.textContent = obj.author || "";
    try { localStorage.setItem(STORAGE_CURRENT, JSON.stringify(obj)); } catch (_) {}
}

async function fetchQuote() {
    try {
        const res = await fetch(api_url, { cache: 'no-store' });
        if (!res.ok) throw new Error(res.statusText || res.status);
        const data = await res.json();
        const text = data.content || data.quote || (Array.isArray(data) && data[0] && (data[0].q || data[0].quote)) || "";
        const author = data.author || data.a || (Array.isArray(data) && data[0] && (data[0].a || data[0].author)) || "";
        return { text, author };
    } catch (e) {
        return { text: "Could not load quote.", author: "" };
    }
}

async function prefetchQuote() {
    prefetched = await fetchQuote();
    try { localStorage.setItem(STORAGE_NEXT, JSON.stringify(prefetched)); } catch (_) {}
}
// On load: prefer the saved prefetched `nextQuote` so reload shows a new quote instantly.
try {
    const savedNext = localStorage.getItem(STORAGE_NEXT);
    if (savedNext) {
        const next = JSON.parse(savedNext);
        showQuote(next);
        try { localStorage.removeItem(STORAGE_NEXT); } catch (_) {}
        // start fetching the next-next in background
        prefetchQuote();
    } else {
        const saved = localStorage.getItem(STORAGE_CURRENT);
        if (saved) showQuote(JSON.parse(saved));
        // ensure we have a prefetched quote ready
        prefetchQuote();
    }
} catch (_) { prefetchQuote(); }

// Button click: show prefetched if available, else fetch synchronously
if (btn) btn.addEventListener('click', async () => {
    // try prefetched in-memory first, then localStorage, then network
    let next = prefetched;
    if (!next) {
        try {
            const savedNext = localStorage.getItem(STORAGE_NEXT);
            if (savedNext) next = JSON.parse(savedNext);
        } catch (_) { next = null; }
    }

    if (next) {
        showQuote(next);
        prefetched = null;
        try { localStorage.removeItem(STORAGE_NEXT); } catch (_) {}
        prefetchQuote();
    } else {
        const q = await fetchQuote();
        showQuote(q);
        prefetchQuote();
    }
});
