import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import { FC } from "react";
import "@solana/wallet-adapter-react-ui/styles.css";
import useGetTokens from "../../hooks/useGetTokens";

const Content: FC = () => {
	const [wallet, solBalance, splTokenAccounts]: any = useGetTokens();

	return (
		<div className="container">
			<div className="wrapper">
				<div style={{ textAlign: "center" }}>
					<WalletMultiButton className="box" />
				</div>

				{wallet?.publicKey && (solBalance == 0 || solBalance) && (
					<>
						<div className="box">{solBalance} SOl</div>
						{!!splTokenAccounts?.length && (
							<>
								<div className="box">other tokens 👇</div>
								{splTokenAccounts.map((token: any, i: number) => (
									<div className="box" key={i}>
										Amount: {token.balance} <br /> Mint: {token.tokenMint}
									</div>
								))}
							</>
						)}
					</>
				)}
			</div>
		</div>
	);
};

export default Content;
