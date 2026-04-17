# BSCScan verification — new factory (testnet)

## Contract metadata

- **Contract address**: `0x4F782D68766c543C2cfB495169988f999B70Ea08`  
- **Network**: BSC testnet  
- **Deployer** (on-chain): `0x7D03E4E68017fdf5240Ca3c2358d72370e5D6b77`  
- **Deployment tx**: `0x8c0c2691a4b173a7bedccb372646e578069dd737f4570d28347b49da67a7bc84`  

## Explorer

https://testnet.bscscan.com/address/0x4F782D68766c543C2cfB495169988f999B70Ea08  

## Manual verification steps

1. Open the contract on BSCScan testnet.  
2. **Contract** tab → **Verify and Publish**.  
3. Choose **Solidity (single file)** (or match how you flattened).  
4. **Compiler**: e.g. `v0.8.24+commit.e01b4b5c` (must match your build).  
5. **License**: MIT (or whatever you shipped).  
6. **Source**: paste `BellaNapoliPredictionFactory-flattened-new.sol` (or the exact flattened file you use).  
7. **Constructor arguments**: none if the constructor takes no ABI-encoded parameters.  
8. Submit and wait for the compiler output.  

## Admin-oriented functions added on this factory

- `setPoolWinner(address pool, bool winner)`  
- `emergencyResolvePool(address pool, bool winner, string reason)`  
- `setPoolEmergencyStop(address pool, bool stopped)`  
- `cancelPoolPrediction(address pool, string reason)`  

Matching events were added for traceability.

## Files

- `contracts/BellaNapoliPredictionFactory-flattened-new.sol` — verification payload  
- `lib/contracts.ts` — ABI / address wiring in the app  
- `deployment-info.json` — **gitignored** template for local deploy metadata; do not commit secrets  

## Post-verification smoke tests

1. Create a pool from the factory.  
2. Drive each admin action (winner, emergency, cancel) and read logs on BSCScan.  
3. Confirm the admin UI still points at `NEXT_PUBLIC_FACTORY_ADDRESS`.  

---

**Date**: 2025-10-25  
