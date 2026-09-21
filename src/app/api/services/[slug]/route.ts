import {
  deleteService,
  getService,
  updateService,
} from "@/lib/services";
import { parseServiceRequest } from "@/lib/service-form";
import { requireAdmin } from "@/lib/auth";

export async function GET(
  _request: Request,
  ctx: { params: Promise<{ slug: string }> },
) {
  const { slug } = await ctx.params;
  const service = await getService(slug);
  if (!service) {
    return Response.json({ error: "Service not found" }, { status: 404 });
  }
  return Response.json({ service });
}

export async function PUT(
  request: Request,
  ctx: { params: Promise<{ slug: string }> },
) {
  try {
    await requireAdmin();
  } catch {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await ctx.params;

  try {
    const input = await parseServiceRequest(request);

    if (!input.name) {
      return Response.json(
        { error: "Service heading is required" },
        { status: 400 },
      );
    }

    const service = await updateService(slug, {
      name: input.name,
      eyebrow: input.eyebrow || input.name.toUpperCase(),
      image: input.imageUrl,
      short: input.short,
      content: input.content,
      sections: input.sections,
      ctaTitle: input.ctaTitle,
      ctaText: input.ctaText,
      ctaButton: input.ctaButton,
      ctaPhone: input.ctaPhone,
      ctaPoints: input.ctaPoints,
      benefits: input.benefits,
      steps: input.steps,
      pricing: input.pricing,
      testimonials: input.testimonials,
      faqs: input.faqs,
    });

    if (!service) {
      return Response.json({ error: "Service not found" }, { status: 404 });
    }
    return Response.json({ ok: true, service });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to update service";
    return Response.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(
  _request: Request,
  ctx: { params: Promise<{ slug: string }> },
) {
  try {
    await requireAdmin();
  } catch {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await ctx.params;
  const deleted = await deleteService(slug);
  if (!deleted) {
    return Response.json({ error: "Service not found" }, { status: 404 });
  }
  return Response.json({ ok: true });
}