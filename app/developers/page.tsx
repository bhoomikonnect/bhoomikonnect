import { redirect } from "next/navigation";

// Company directories are private; public users browse listings through
// BhoomiKonnect instead.
export default function DevelopersPage() {
  redirect("/buy");
}
