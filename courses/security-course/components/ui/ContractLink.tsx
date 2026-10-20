import { ExternalLink } from "lucide-react";

interface Props {
  address: string;
  chain?: string;
  label?: string;
}

const CHAIN_EXPLORERS: Record<string, string> = {
  "Ethereum Mainnet": "https://etherscan.io/address/",
  "Sepolia": "https://sepolia.etherscan.io/address/",
  "Arbitrum": "https://arbiscan.io/address/",
  "Polygon": "https://polygonscan.com/address/",
};

export default function ContractLink({
  address,
  chain = "Ethereum Mainnet",
  label,
}: Props) {
  const base = CHAIN_EXPLORERS[chain] ?? "https://etherscan.io/address/";
  const short = `${address.slice(0, 6)}...${address.slice(-4)}`;

  return (
    <a
      href={`${base}${address}`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 font-mono text-sm bg-white border-2 border-ink px-3 py-1.5 shadow-[2px_2px_0px_#1a1a1a] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard transition-all no-underline text-ink"
    >
      <span className="text-primary font-bold">{chain}</span>
      <span className="text-gray-600">{label ?? short}</span>
      <ExternalLink size={12} />
    </a>
  );
}
