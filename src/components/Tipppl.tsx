import { TipConfigForm } from "~/components/TipConfigForm";

export default function HomePage() {
  return (
    <main className="min-h-screen p-4 bg-gray-50">
      <h1 className="text-2xl font-bold text-center mb-6">Tipppl</h1>
      <TipConfigForm />
    </main>
  );
}
