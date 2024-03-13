import Image from "next/image";
import HPlansForm from "./_components/HPlansForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      
      <HPlansForm />

    </main>
  );
}
