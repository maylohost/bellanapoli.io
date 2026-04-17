# BSCScan links in the admin panel

## Summary

Direct BSCScan links were added for each prediction that has an on-chain pool address stored in the database.

## Placement

- **Section**: Existing prediction details in the admin UI  
- **Layout**: Mobile and desktop  
- **Condition**: Rendered only when `pool_address` is present  

## Implementation snippet

```tsx
{prediction.pool_address && (
  <div className="flex items-center gap-2 mt-2">
    <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Contract:</span>
    <a
      href={`https://testnet.bscscan.com/address/${prediction.pool_address}`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-2 py-1 rounded hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
    >
      <span className="font-mono">
        {prediction.pool_address.slice(0, 6)}...{prediction.pool_address.slice(-4)}
      </span>
      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    </a>
  </div>
)}
```

## UX

- **Label**: “Contract:” in muted text  
- **Address**: Short form (first 6 + last 4 hex chars)  
- **Icon**: External-link affordance  
- **Colors**: Blue chip with hover state  
- **Responsive**: Stacks cleanly on small screens  

## Behaviour

- **URL**: `https://testnet.bscscan.com/address/{pool_address}`  
- **Target**: `_blank` with `rel="noopener noreferrer"`  
- **Visibility**: Only when `pool_address` is set  

## Benefits

1. One click from admin UI to contract code and internal txs  
2. Easier verification and debugging  
3. Clear association between a row in the DB and an on-chain pool  
