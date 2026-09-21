"use client";

import { usePathname } from "next/navigation";
import ChatBot from "@/components/ChatBot";

export default function AdminChatBot() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin/chatbot")) return null;
  return <ChatBot variant="admin" />;
}