import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminChatBot from "@/components/admin/AdminChatBot";
import { ADMIN_COOKIE, isAuthed } from "@/lib/auth";

export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const store = await cookies();
  if (!isAuthed(store.get(ADMIN_COOKIE)?.value)) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-[#f2f6fb]">
      <AdminSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <AdminHeader />
        <main className="p-4 lg:p-5">{children}</main>
      </div>
      <AdminChatBot />
    </div>
  );
}