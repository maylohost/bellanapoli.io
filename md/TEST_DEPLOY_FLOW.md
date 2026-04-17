# Admin panel — deploy / redeploy test flow

## Scenario 1 — first activation (`in_attesa`)

1. **Prediction status**: `in_attesa`  
2. **Pool address**: `NULL`  
3. **Action**: click **Activate contract**  
4. **Expected**  
   - Pool contract created on-chain  
   - Row updated: `status = 'attiva'`, `pool_address = '0x…'`  
   - RPC JSON: `{ success: true, message: "Contract activated successfully" }`  

## Scenario 2 — redeploy while `attiva`

1. **Prediction status**: `attiva`  
2. **Pool address**: existing `0x…`  
3. **Action**: **Redeploy contract**  
4. **Expected**  
   - New pool deployed  
   - `pool_address` updated to the new address; status stays `attiva`  
   - Same success payload shape as scenario 1  

## Browser console checks

You should see logs similar to:

- Contract activation started for prediction id  
- Parsed date → unix fields for `closingDate` / `closingBid`  
- New pool address + tx hash  
- RPC success envelope parsed end-to-end  

## Database check (Supabase SQL)

```sql
SELECT id, title, status, pool_address, updated_at
FROM predictions
WHERE id = '<prediction-uuid>'
ORDER BY updated_at DESC;
```

## Chain check

- Open the pool address on BSCScan testnet.  
- Confirm bytecode is present and calls match the factory you configured.  

## Common failures

| Symptom | Likely cause |
|---------|----------------|
| RPC error banner | Supabase RPC auth / RLS / network |
| “Prediction not found” | Wrong id or row deleted |
| Contract revert | Wallet, gas, or date ordering (`closingBid` must be after `closingDate`) |

## Success criteria

1. Wallet prompt completes without revert.  
2. Console shows activation steps without thrown errors.  
3. `pool_address` populated in Supabase.  
4. UI shows **attiva** with explorer link.  
5. Pool visible on BSCScan.  

The admin client was updated to parse structured RPC responses, surface errors clearly, and support both first deploy and redeploy.
