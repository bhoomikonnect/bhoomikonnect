import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { deleteCmsPage, getCmsPage, updateCmsPage } from "@/lib/cms-repository";
import { cmsPageSchema } from "@/lib/cms-validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteContext = { params: { id: string } };

export async function GET(_: Request, { params }: RouteContext) {
  try {
    const page = await getCmsPage(decodeURIComponent(params.id));
    return page
      ? NextResponse.json({ data: page })
      : NextResponse.json({ error: "Page not found." }, { status: 404 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to load page." }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: RouteContext) {
  try {
    const parsed = cmsPageSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "Please correct the page fields.", fields: parsed.error.flatten().fieldErrors }, { status: 400 });
    }

    const previous = await getCmsPage(decodeURIComponent(params.id));
    const page = await updateCmsPage(decodeURIComponent(params.id), parsed.data);
    if (previous) revalidatePath(`/pages/${previous.slug}`);
    revalidatePath(`/pages/${page.slug}`);
    revalidatePath("/sitemap.xml");
    return NextResponse.json({ data: page });
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : "Unable to update page.";
    return NextResponse.json({ error: message }, { status: message === "Page not found." ? 404 : 500 });
  }
}

export async function DELETE(_: Request, { params }: RouteContext) {
  try {
    const identifier = decodeURIComponent(params.id);
    const page = await getCmsPage(identifier);
    await deleteCmsPage(identifier);
    if (page) revalidatePath(`/pages/${page.slug}`);
    revalidatePath("/sitemap.xml");
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : "Unable to delete page.";
    return NextResponse.json({ error: message }, { status: message === "Page not found." ? 404 : 500 });
  }
}
