import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { archiveCmsService, getCmsService, updateCmsService } from "@/lib/cms-services";
import { cmsServiceSchema } from "@/lib/cms-service-validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
type RouteContext = { params: { id: string } };

function refresh(family: string, slug: string) {
  revalidatePath("/");
  revalidatePath(`/${family}`);
  revalidatePath(`/${family}/${slug}`);
  revalidatePath("/sitemap.xml");
}

export async function GET(_: Request, { params }: RouteContext) {
  const service = await getCmsService(decodeURIComponent(params.id));
  return service ? NextResponse.json({ data: service }) : NextResponse.json({ error: "Service not found." }, { status: 404 });
}

export async function PUT(request: Request, { params }: RouteContext) {
  try {
    const parsed = cmsServiceSchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message || "Please correct the service fields." }, { status: 400 });
    const previous = await getCmsService(decodeURIComponent(params.id));
    const service = await updateCmsService(decodeURIComponent(params.id), parsed.data);
    if (previous) refresh(previous.family, previous.slug);
    refresh(service.family, service.slug);
    return NextResponse.json({ data: service });
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : "Unable to update service.";
    return NextResponse.json({ error: message }, { status: message === "Service not found." ? 404 : 500 });
  }
}

export async function DELETE(_: Request, { params }: RouteContext) {
  try {
    const service = await getCmsService(decodeURIComponent(params.id));
    await archiveCmsService(decodeURIComponent(params.id));
    if (service) refresh(service.family, service.slug);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : "Unable to archive service.";
    return NextResponse.json({ error: message }, { status: message === "Service not found." ? 404 : 500 });
  }
}
