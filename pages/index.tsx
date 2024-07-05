import Image from "next/image";
import { Inter } from "next/font/google";
import NewDrops from "@/components/NewDrops";
import GetLocation from "@/components/GetLocation";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`${inter.className}`}
    >
      <NewDrops />

    </main>
  );
}
