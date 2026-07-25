import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { createCmsService, listCmsServices } from "@/lib/cms-services";
import { cmsServiceSchema } from "@/lib/cms-service-validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return NextResponse.json({ data: await listCmsServices() });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to load services." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const parsed = cmsServiceSchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message || "Please correct the service fields." }, { status: 400 });
    const service = await createCmsService(parsed.data);
    revalidatePath("/");
    revalidatePath(`/${service.family}`);
    revalidatePath(`/${service.family}/${service.slug}`);
    revalidatePath("/sitemap.xml");
    return NextResponse.json({ data: service }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to create service." }, { status: 500 });
  }
}
