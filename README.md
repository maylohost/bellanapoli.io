# Bella Napoli — Prediction Market

An Italian-themed prediction market on BNB Chain: bet on the future with a clear, modern Web3 UI.

Bella Napoli is a Web3 app on BNB Chain that lets users stake BNB on future outcomes. It pairs intuitive UX with verified smart contracts so prediction markets stay approachable for crypto-native communities.

## Vision

Bella Napoli brings “Italian-style” prediction topics into crypto: culture, sport, politics, and lifestyle, on-chain. It is built for communities that want live, user-driven markets (crypto, NFTs, DeFi, or their own scenes), mixing familiar storytelling with blockchain transparency.

## Main features

- **Decentralized predictions**: Bets flow through smart contracts on BNB Chain  
- **Polished UI**: Responsive layout and wallet-first flows  
- **Wallet support**: MetaMask, Rabby, WalletConnect, and compatible wallets  
- **On-chain transparency**: Positions and payouts are verifiable on a block explorer  
- **Profiles**: Avatar, nickname, and bio  
- **Categories**: Crypto, politics, sport, TV, lifestyle, and more  
- **Odds-style readouts**: Live view of pool sides and sizing  

## Links

- **Website**: [bellanapoli.io](https://bellanapoli.io)  
- **X**: [@bellanapoli_io](https://x.com/bellanapoli_io)  

## BNB Chain testnet

The product is oriented around **BNB Chain testnet** so users can try flows safely with test tokens.

**Important**: testnet tokens have no real monetary value.

### Wallet network (BSC testnet)

- **Network name**: BSC Testnet  
- **RPC URL**: `https://data-seed-prebsc-1-s1.bnbchain.org:8545`  
- **Chain ID**: 97 (0x61)  
- **Symbol**: tBNB  
- **Explorer**: [testnet.bscscan.com](https://testnet.bscscan.com/)  

**Tip**: add the network via [ChainList (chain 97)](https://chainlist.org/chain/97).

## How it works

1. Connect a wallet on BSC testnet  
2. Get tBNB from a faucet  
3. Create a profile (wallet message signing)  
4. Open a prediction and choose a side (e.g. YES / NO)  
5. Stake BNB and confirm in the wallet  
6. After resolution, claim if you are on the winning side  

## Tech stack

### Frontend

- **Next.js 14** — App Router, Server Components, API routes  
- **React 18**  
- **TypeScript** (strict)  
- **Tailwind CSS**  
- **TanStack Query** — server state and caching  
- **Recharts** — charts  

### Blockchain

- **BNB Chain testnet** — contracts and settlements  
- **Wagmi** — React hooks for Ethereum  
- **RainbowKit** — wallet UI  
- **Viem** — typed Ethereum client  
- **Hardhat** — Solidity toolchain  

### Backend & data

- **Supabase** — Postgres with Row Level Security  
- **Wallet auth** — custom flow using signed messages (EIP-4361 style)  

### Smart contracts

- **Solidity**  
- **Factory** — creates and manages prediction pools  
- **Prediction pools** — one contract instance per market  

### Integrations (optional)

- Football match data API  
- Polymarket-style trend signals (where configured)  
- BSCScan — verification and transaction lookup  

## Repository layout

```
app/                 # Next.js App Router (pages, API routes)
components/          # React components
lib/                 # contracts, wagmi, supabase helpers
hooks/               # Custom hooks
contracts/           # Solidity sources
public/              # Static assets
md/                  # Internal engineering notes (English)
```

## Security notes

- Contracts are intended to be **verified** on BSCScan for the deployments you run.  
- **Supabase RLS** and carefully scoped RPCs protect user data.  
- **No passwords**: authentication is wallet-based signing.  
- **On-chain data is public** by design.  

More detail lives in the in-app documentation at [bellanapoli.io/documentation](https://bellanapoli.io/documentation).

## Getting started

### Prerequisites

- Node.js 18+ and npm (or pnpm/yarn)  
- A browser wallet  
- A Supabase project (for local / hosted backend)  

### Setup

```bash
git clone https://github.com/maylohost/bellanapoli.io.git
cd bellanapoli.io
npm install
cp .env.example .env.local
# Edit .env.local with your Supabase URL/keys and factory address
npm run dev
```

### Environment variables

See `.env.example`. In short:

- `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` — browser-safe Supabase client  
- `SUPABASE_SERVICE_ROLE_KEY` — **server only**, never expose to the client  
- `NEXT_PUBLIC_FACTORY_ADDRESS` — deployed factory on your target chain  
- `FOOTBALL_API_KEY` — optional  
- `PRIVATE_KEY` / `BSCSCAN_API_KEY` — **local Hardhat / deploy only**, never commit real values  

## License

Open source; see the license file(s) in the repository.

## Contributing

Issues and pull requests are welcome. Please keep secrets out of git: use `.env.local` (gitignored) and environment variables in your host (e.g. Vercel).

**Bella Napoli** — where predictions meet the chain.
