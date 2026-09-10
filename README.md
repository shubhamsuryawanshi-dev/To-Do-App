# 📝 Simple Todo List

A clean, local-first todo app built with vanilla HTML, CSS, and JavaScript — no frameworks, no backend. Your tasks are saved automatically in the browser via `localStorage`, so they're still there the next time you open the page.

## Features

- ➕ Add todos (click **Add** or press **Enter**)
- ✅ Mark todos complete with a custom-styled checkbox
- ✏️ Edit a todo in place — double-click the text, edit, press **Enter** to save or **Esc** to cancel
- 🗑️ Delete individual todos
- 🔍 Filter by **All / Active / Completed**
- 🧹 Clear all completed todos in one click
- 📊 Live "items left" counter
- 💾 Persistent storage — todos survive a page refresh or browser restart
- 📱 Responsive layout that works on mobile

## Tech Stack

- HTML5
- CSS3 (custom properties, Flexbox, transitions)
- Vanilla JavaScript (DOM APIs, `localStorage`) — no libraries or build tools

## Project Structure

```
.
├── index.html   # Page structure
├── style.css    # Styling and layout
└── script.js    # App logic (state, rendering, events)
```

## Getting Started

No installation or build step required.

1. Download or clone the three files (`index.html`, `style.css`, `script.js`) into the same folder.
2. Open `index.html` in any modern web browser.

That's it — the app runs entirely client-side.

## How It Works

- All todos live in a single JavaScript array, each with a unique `id`, `text`, and `completed` flag.
- Every change (add, edit, delete, toggle) updates that array, saves it to `localStorage`, and re-renders the list from scratch.
- Filters simply change which subset of the array gets rendered — the underlying data is untouched.

## Browser Support

Works in any modern browser with `localStorage` support (Chrome, Firefox, Safari, Edge).

## License

Free to use and modify.
