import Image from "next/image";
import { Inter } from "@next/font/google";
import { ErrorStatus } from "components/ErrorStatus";
import { Login } from "components/Login";

const inter = Inter({ subsets: ["latin"] });

export default function LoginPage() {
  return (
    <div>
      {/* <ErrorStatus /> */}
      <Login />
      {/* Footer */}
      {/* <div className="bg-color-sky p-1"></div> */}
    </div>
  );
}
