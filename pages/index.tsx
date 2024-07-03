import Image from "next/image";
import { Inter } from "next/font/google";
import NewDrops from "@/components/NewDrops";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`${inter.className}`}
    >
      <div className="">
        <div className="">
        <NewDrops />
        </div>
      </div>
    </main>
  );
}
