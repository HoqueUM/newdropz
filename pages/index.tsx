import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`${inter.className}`}
    >
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col justify-center items-center animate-fade animate-delay-[100ms]">
            <p className="text-2xl font-mono">NewDropz</p>
            <p className="font-mono">Coming soon...</p>
        </div>
      </div>
    </main>
  );
}
