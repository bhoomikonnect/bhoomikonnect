import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { createCmsProperty, listCmsProperties } from "@/lib/cms-repository";
import { cmsPropertySchema } from "@/lib/cms-validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return NextResponse.json({ data: await listCmsProperties() });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to load properties." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const parsed = cmsPropertySchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "Please correct the highlighted property fields.", fields: parsed.error.flatten().fieldErrors }, { status: 400 });
    }

    const property = await createCmsProperty(parsed.data);
    revalidatePath("/buy");
    revalidatePath("/rent");
    revalidatePath("/property/[slug]", "page");
    revalidatePath("/sitemap.xml");
    return NextResponse.json({ data: property }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to create property." }, { status: 500 });
  }
}
