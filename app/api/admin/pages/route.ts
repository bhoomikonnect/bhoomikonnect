import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { createCmsPage, listCmsPages } from "@/lib/cms-repository";
import { cmsPageSchema } from "@/lib/cms-validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return NextResponse.json({ data: await listCmsPages() });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to load pages." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const parsed = cmsPageSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "Please correct the page fields.", fields: parsed.error.flatten().fieldErrors }, { status: 400 });
    }

    const page = await createCmsPage(parsed.data);
    revalidatePath(`/pages/${page.slug}`);
    revalidatePath("/sitemap.xml");
    return NextResponse.json({ data: page }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to create page." }, { status: 500 });
  }
}
