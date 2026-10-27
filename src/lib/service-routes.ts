export const INSURANCE_SERVICE_PATH = "/service/Insurance-Virtual-Assistants";

export function getServicePath(slug: string): string {
  return slug === "insurance-virtual-assistants"
    ? INSURANCE_SERVICE_PATH
    : `/services/${slug}`;
}
