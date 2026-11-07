import { getAllCredentials } from "@/lib/db/credentials";
import CredentialsSlider from "./Achievement";

export default async function AchievementServer() {
  const credentials = await getAllCredentials();
  return <CredentialsSlider credentials={credentials} />;
}
