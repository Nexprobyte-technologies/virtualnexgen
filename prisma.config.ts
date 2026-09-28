import { definePrismaConfig } from "prisma/config";

export default definePrismaConfig({
  skills: {
    agents: ["claude", "cursor", "agents", "devin"],
  },
  orm: {
    adapter: {
      provider: "postgresql",
    },
    family: {
      provider: "prisma-client-js",
    },
    target: {
      path: "prisma/schema.prisma",
    },
  },
});