import Image from "next/image";
import CreateVacation from "./_components/CreateVacationForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      
      <CreateVacation />

    </main>
  );
}
