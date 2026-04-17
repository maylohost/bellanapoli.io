# Factory contract comparison — old vs new (BSC testnet)

Public testnet deployment notes. Addresses are visible on BSCScan; rotate or redeploy for your own environment as needed.

## Deployments (historical)

### Previous factory

- **Address**: `0xfc37AC0AbF530f5127A0995fa6FA92e336244DB3`  
- **Deployed**: 2025-10-25T11:01:56.970Z  
- **Capabilities**: Pool creation only (limited admin surface)  

### Replacement factory

- **Address**: `0x4F782D68766c543C2cfB495169988f999B70Ea08`  
- **Deployed**: 2025-10-25T17:59:56.061Z  
- **Capabilities**: Full pool lifecycle via factory owner  

## Solidity surface

### Old

```solidity
function createPool(...) returns (address)
function getAllPools() view returns (address[])
function getPoolCount() view returns (uint256)
function getPoolInfo(address) view returns (...)
```

### New (adds factory-level management)

```solidity
// Same read/create helpers, plus:
function setPoolWinner(address, bool)
function emergencyResolvePool(address, bool, string)
function setPoolEmergencyStop(address, bool)
function cancelPoolPrediction(address, string)
function closePool(address)
function collectFees(address) returns (uint256)
```

## Why upgrade

1. **Centralized control**: Admin calls the factory instead of each pool’s `owner` directly.  
2. **Consistent permissions**: Factory owner can operate every pool created by that factory.  
3. **Full lifecycle**: Winner, emergency resolve, emergency stop, cancel, close, fee collection.  
4. **Richer events**: Easier indexing and auditing.  

## Frontend mapping (`lib/contracts.ts`)

```typescript
resolvePool()        → factory.setPoolWinner()
emergencyResolve()   → factory.emergencyResolvePool()
setEmergencyStop()   → factory.setPoolEmergencyStop()
cancelPool()         → factory.cancelPoolPrediction()
```

## Migration checklist

1. **Environment** — set `NEXT_PUBLIC_FACTORY_ADDRESS` to the factory you actually deploy (see `.env.example`).  
2. **Verify on BSCScan** — use the flattened source that matches your compiler version.  
3. **Regression test** — create pool, set winner, emergency paths, cancel.  

---

**Last updated**: 2025-10-25  
