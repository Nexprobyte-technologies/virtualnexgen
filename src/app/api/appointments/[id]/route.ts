import { deleteAppointment, updateAppointmentStatus } from "@/lib/appointments";
import { requireAdmin } from "@/lib/auth";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireAdmin();
  } catch {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const deleted = await deleteAppointment(id);
  if (!deleted) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }
  return Response.json({ ok: true });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireAdmin();
  } catch {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const updated = await updateAppointmentStatus(id, body.status);
  if (!updated) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }
  return Response.json({ ok: true, appointment: updated });
}
