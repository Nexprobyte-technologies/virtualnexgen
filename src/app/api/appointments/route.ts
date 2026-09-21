import { getAppointments, addAppointment } from "@/lib/appointments";

export async function GET() {
  const appointments = await getAppointments();
  return Response.json({ appointments });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, company, date, time, message } = body;

    if (!name || !email || !date || !time) {
      return Response.json(
        { error: "Name, email, date and time are required" },
        { status: 400 },
      );
    }

    const appointment = await addAppointment({
      name,
      email,
      phone: phone || "",
      company: company || "",
      date,
      time,
      message: message || "",
    });

    return Response.json({ ok: true, appointment }, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to book appointment";
    return Response.json({ error: message }, { status: 400 });
  }
}
