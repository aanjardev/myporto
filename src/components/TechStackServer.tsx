import { jsonStore } from "@/lib/json-store";
import TechStack from "./TechStack";

export default async function TechStackServer() {
  const [techs, familiars] = await Promise.all([
    jsonStore.techStackItem.findMany({
      where: { isVisible: true },
      orderBy: { order: "asc" },
    }),
    jsonStore.familiarTech.findMany({
      orderBy: { order: "asc" },
    }),
  ]);

  return <TechStack techs={techs} familiars={familiars} />;
}
