# RPC consistency — pool loading

## Problem

- **Deploy path** used `https://bsc-testnet.publicnode.com`  
- **Pool listing** used `https://data-seed-prebsc-1-s1.binance.org:8545/`  

New pools created via the factory were not always visible under “on-chain prediction pools” because reads hit a different RPC endpoint than writes.

## Fix

Aligned these call sites to the same RPC:

1. `listPools()`  
2. `getPoolSummary()`  
3. `checkIsFactoryOwner()`  

```typescript
// Before
const provider = new ethers.JsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org:8545/");

// After
const provider = new ethers.JsonRpcProvider("https://bsc-testnet.publicnode.com");
```

## Result

Deploy, enumeration, and owner checks all read the same chain head, so freshly created pools show up consistently in the admin panel.

## How to verify

1. Reload the admin UI  
2. Confirm pools appear under the on-chain section  
3. Spot-check pool metadata against BSCScan  
