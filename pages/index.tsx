import Image from "next/image";
import { Inter } from "next/font/google";
import NewDrops from "@/components/NewDrops";
import newdropz from "@/public/static/newdropz.png";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={`${inter.className} min-h-screen bg-gray-100`}>
      <header className="bg-primary-color text-white p-6 shadow-xl z-50 flex items-center justify-between">
        <div className="flex items-center">
          <Image src={newdropz} alt="NewDropz Logo" width={50} height={50} />
          <h1 className="text-3xl font-bold ml-4">NewDropz</h1>
        </div>
      </header>
      <section className="bg-primary-color py-10">
        <NewDrops />
      </section>
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>&copy; 2024 NewDropz. All rights reserved.</p>
      </footer>
    </main>
  );
}
