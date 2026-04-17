# HNG Task 0

A simple task card UI built as part of HNG Tech internship task 1A.

## Overview

This project demonstrates a small interactive task card with:
- editable task title, description, priority, and due date
- status selection with visual styling for `Pending`, `In Progress`, and `Done`
- a collapsible description that shows only two lines and expands on click
- remaining-time display in days, hours, and minutes
- accessible toggle using `aria-expanded` and `aria-controls`

## Files

- `index.html` — main page structure and ARIA-enabled collapse control
- `index.css` — styling for the task card, responsive layout, and description collapse
- `index.js` — interactive behavior, form handling, status updates, and timer refresh
- `editForm.css` — edit form styles

## Usage

1. Open `index.html` in your browser.
2. Click `Edit` to change the task details.
3. Use the `Save` button to apply changes without reloading the page.
4. Toggle the description with the `Show more` / `Show less` button.
5. Change status to `Done` to apply green styling and strike through the task title.

## Notes

- The remaining time is updated every minute.
- Only the word `Overdue` is displayed in red when the due date has passed.
- There was no edit mode for task 0, no collapsible, no live time update, no status control, no advance syncs and change visbility.
- I had problem with the time update, it took a lot of time to get it right
- The initial task 0 design wasnt modified too much, the design is still quite similar.
## License

This repository is provided for demonstration purposes.

