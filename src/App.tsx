import { useEffect, useState } from "react";
import {
  useAccount,
  useConnect,
  useContract,
  useDisconnect,
  useSigner,
} from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import mood from "../abi/mood.json";
import { type Mood } from "../types/ethers-contracts";
import * as moodContract from "./contract";

export function App() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const [moodValue, setMoodValue] = useState("");
  const { data: signer, isSuccess } = useSigner();

  const contract = useContract<Mood>({
    addressOrName: moodContract.address,
    contractInterface: mood,
    signerOrProvider: signer,
  });

  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  useEffect(() => {
    if (isSuccess) {
      contract.getMood().then((value) => setMoodValue(value));
    }
  }, [contract, isSuccess]);

  return (
    <main className="flex justify-center items-center h-screen">
      <div className="card max-w-md w-full bg-base-200 shadow-xl">
        <div className="card-body">
          <div>
            <code className="flex">
              Account: <span className="truncate">{address}</span>
            </code>
            <div className="flex gap-2">
              <button
                className="btn btn-success btn-sm flex-1"
                onClick={() => connect()}
              >
                Connect
              </button>
              <button
                className="btn btn-error btn-sm flex-1"
                onClick={() => disconnect()}
              >
                Disconnect
              </button>
            </div>
          </div>
          <h1 className="card-title">Yo, it's my first dapp</h1>
          <p>Tell me how you feel, bro</p>
          <div className="card-actions flex flex-col items-stretch">
            <input
              type="text"
              value={moodValue}
              onChange={(e) => setMoodValue(e.currentTarget.value)}
              placeholder="Sad..."
              className="input input-primary"
            />
            <div className="flex gap-2">
              <button
                className="btn btn-primary flex-1"
                onClick={() => contract.setMood(moodValue)}
              >
                Set Mood
              </button>
              <button
                className="btn btn-secondary flex-1"
                onClick={() =>
                  contract.getMood().then((value) => setMoodValue(value))
                }
              >
                Get Mood
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
