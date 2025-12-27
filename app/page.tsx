import { AuthenticatedLayout } from "@/components/AuthenticatedLayout";

export default function Home() {
  return (
    <AuthenticatedLayout>
      <main>
        <h1>Vibe List</h1>
        <p>Shared shopping list web app</p>
      </main>
    </AuthenticatedLayout>
  );
}
