import Image from "next/image";
import ytl_logo from "assets/ytl_logo.svg";
import { Inter } from "@next/font/google";
import { ErrorStatus } from "components/ErrorStatus";

const inter = Inter({ subsets: ["latin"] });

export default function LandingPage() {
  return (
    <div>
      {/* Header */}
      {/* <div className="bg-secondary p-2.5 pl-5 flex items-center justify-between border-b border-stroke fixed w-full top-0 z-10">
        <div className="flex items-center">
          <Image src={ytl_logo} alt="YTL Cement" width={48} height={48} />
        </div>
      </div> */}
      <ErrorStatus />
      {/* Footer */}
      <div className="bg-color-sky p-1"></div>
    </div>
  );
}
