import { IoWalletOutline } from "react-icons/io5";
import IncreaseWalletCredit from "./IncreaseWalletCredit";
import States from "./States";
import WalletHistory from "./WalletHistory";

export default function Wallet() {
    return (
        <div>
            <div className='w-full flex items-end justify-between mb-7 pb-4 border-b border-b-slate-300 dark:border-b-slate-400'>
                <div className='text-xl text-slate-800 font-semibold'>کیف پول</div>
            </div>

            <IncreaseWalletCredit />
            <States />
            <WalletHistory />
        </div>
    )
}
