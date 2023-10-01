import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { Connection, LAMPORTS_PER_SOL, clusterApiUrl } from "@solana/web3.js";
import { useEffect, useState } from "react";

const useGetTokens = () => {
	const [solBalance, setSolBalance] = useState<any>(0);
	const wallet = useAnchorWallet();
	const network = WalletAdapterNetwork.Devnet;
	const connection = new Connection(clusterApiUrl(network));
	const [splTokenAccounts, setSplTokenAccounts] = useState<any>();

	useEffect(() => {
		if (!wallet?.publicKey) return;

		const SOL = connection.getAccountInfo(wallet.publicKey);
		SOL.then((res) => {
			console.log("res", res);

			if (!res) {
				requestAirDrop();
				return;
			}

			setSolBalance(res.lamports / LAMPORTS_PER_SOL);
			getAccounts(wallet.publicKey);
		});
	}, [wallet?.publicKey]);

	const requestAirDrop = () => {
		if (
			wallet?.publicKey &&
			connection?.rpcEndpoint === "https://api.devnet.solana.com"
		)
			connection
				.requestAirdrop(wallet?.publicKey, 1 * LAMPORTS_PER_SOL)
				.then((res) => {
					console.log({ res });
					setSolBalance(1);
				})
				.catch((err) => {
					console.log({ err });
				});
	};

	const getAccounts = async (MY_WALLET_ADDRESS: any) => {
		const parsedProgramAccounts = await connection.getParsedProgramAccounts(
			TOKEN_PROGRAM_ID,
			{
				filters: [
					{
						dataSize: 165, // number of bytes
					},
					{
						memcmp: {
							offset: 32, // number of bytes
							bytes: MY_WALLET_ADDRESS, // base58 encoded string
						},
					},
				],
			}
		);

		setSplTokenAccounts(
			parsedProgramAccounts.map((account, i) => {
				const accountInfo: any = account.account.data;
				return {
					accountToken: account.pubkey.toString(),
					tokenMint: accountInfo["parsed"]["info"]["mint"],
					balance: accountInfo["parsed"]["info"]["tokenAmount"]["uiAmount"],
				};
			})
		);
	};

	return [wallet, solBalance, splTokenAccounts];
};

export default useGetTokens;
