# Date field mapping — admin panel

## Form labels ↔ database columns

| Form label (Italian UI) | DB column | Meaning | Contract argument |
|-------------------------|-----------|---------|---------------------|
| **Data Chiusura Scommesse** (betting closes) | `closing_date` | Last moment users can bet | `closingDate` (first arg) |
| **Data Chiusura Prediction** (event ends) | `closing_bid` | When the underlying event is over | `closingBid` (second arg) |

## Contract rule

The pool contract enforces:

```solidity
require(closingBid > closingDate, "Closing bid must be after closing date");
```

So in data entry:

- `closing_date` (betting deadline) must be **earlier**  
- `closing_bid` (event / resolution window) must be **later**  

## Example

Prediction: “Will Napoli win the match?”

1. **Betting closes** (`closing_date` → `closingDate`): e.g. 2025-11-30 23:59 — last time to place a bet  
2. **Event ends** (`closing_bid` → `closingBid`): e.g. 2025-12-01 23:59 — after the match, when the outcome is known  

## Admin flows

- **Create / edit prediction**: the two datetime fields map 1:1 to `closing_date` and `closing_bid` as in `AdminPanel.tsx`  
- **Activate contract**: `closing_date` → `closingDate`, `closing_bid` → `closingBid`  

This matches the live labels in the admin forms: **Data Chiusura Scommesse** binds to `closing_date`, **Data Chiusura Prediction** binds to `closing_bid`.
