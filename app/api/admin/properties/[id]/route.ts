import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { deleteCmsProperty, getCmsProperty, updateCmsProperty } from "@/lib/cms-repository";
import { cmsPropertySchema } from "@/lib/cms-validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteContext = { params: { id: string } };

export async function GET(_: Request, { params }: RouteContext) {
  try {
    const property = await getCmsProperty(decodeURIComponent(params.id));
    return property
      ? NextResponse.json({ data: property })
      : NextResponse.json({ error: "Property not found." }, { status: 404 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to load property." }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: RouteContext) {
  try {
    const parsed = cmsPropertySchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "Please correct the highlighted property fields.", fields: parsed.error.flatten().fieldErrors }, { status: 400 });
    }

    const property = await updateCmsProperty(decodeURIComponent(params.id), parsed.data);
    revalidatePath("/buy");
    revalidatePath("/rent");
    revalidatePath(`/property/${property.slug}`);
    revalidatePath("/sitemap.xml");
    return NextResponse.json({ data: property });
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : "Unable to update property.";
    return NextResponse.json({ error: message }, { status: message === "Property not found." ? 404 : 500 });
  }
}

export async function DELETE(_: Request, { params }: RouteContext) {
  try {
    const identifier = decodeURIComponent(params.id);
    const property = await getCmsProperty(identifier);
    await deleteCmsProperty(identifier);
    revalidatePath("/buy");
    revalidatePath("/rent");
    if (property) revalidatePath(`/property/${property.slug}`);
    revalidatePath("/sitemap.xml");
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : "Unable to delete property.";
    return NextResponse.json({ error: message }, { status: message === "Property not found." ? 404 : 500 });
  }
}
