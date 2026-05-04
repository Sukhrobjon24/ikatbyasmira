import { redirect } from "next/navigation";
import { AdminPage } from "@/components/pages/admin-page";
import { getAdminSession } from "@/lib/admin-auth";

export default async function Admin({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const [{ locale }, session] = await Promise.all([params, getAdminSession()]);

  if (!session) {
    redirect(`/${locale}/admin/login`);
  }

  return <AdminPage adminEmail={session.email} />;
}