# Fine Calculator

A single-page expense tracker and loan EMI calculator with live charts and CSV export, built in plain HTML/CSS/JavaScript using Chart.js.

## File structure

```
fine-calculator/
├── index.html           # Markup only — links css/styles.css and js/calculator.js
├── css/
│   └── styles.css        # All styling
├── js/
│   └── calculator.js     # All app logic (expenses, EMI, charts, CSV export)
└── README.md
```

There's no build step, no backend, and no dependencies to install beyond
the Chart.js CDN script already linked in `index.html`'s `<head>`.

## Features

- **Daily expenses** — add named expense entries with amounts; running total
  updates automatically
- **Loan EMI calculator** — enter loan amount, annual interest rate, and
  tenure (months) to compute the monthly EMI
- **Income & balance** — enter monthly income to see what's left after
  expenses and EMI
- **Charts** (via Chart.js)
  - Pie chart: expense categories vs. EMI
  - Bar chart: income vs. total expenses + EMI
- **CSV export** — download a timestamped report of all expenses, EMI,
  income, and remaining balance

## Running it

No install required — just open the file in a browser:

```bash
open index.html       # macOS
start index.html      # Windows
xdg-open index.html   # Linux
```

Or serve it locally if you prefer (e.g. `npx serve .`).

## Notes

- All amounts are displayed in ₹ (Indian Rupees); change the currency
  symbol in `index.html` if you need a different currency.
- EMI is calculated with the standard reducing-balance formula:
  `EMI = P × r × (1+r)^n / ((1+r)^n − 1)`, where `r` is the monthly
  interest rate and `n` is the tenure in months.
- All data is in-memory only (page refresh clears expenses); there's no
  persistence layer (localStorage/database) yet.
