import { addService, getServices } from "@/lib/services";
import { parseServiceRequest } from "@/lib/service-form";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  const services = await getServices();
  return Response.json({ services });
}

export async function POST(request: Request) {
  try {
    await requireAdmin();
  } catch {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const input = await parseServiceRequest(request);

    if (!input.name) {
      return Response.json(
        { error: "Service heading is required" },
        { status: 400 },
      );
    }

    const service = await addService({
      ...(input.sectionCopy as Record<string, never>),
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
    carouselImages: input.carouselImages,
    folderPopItems: input.folderPopItems,
    });

    return Response.json({ ok: true, service }, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to add service";
    return Response.json({ error: message }, { status: 400 });
  }
}