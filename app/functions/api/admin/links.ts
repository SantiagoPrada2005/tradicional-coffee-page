import { createDb } from '../../../src/db';
import { campaignLinks } from '../../../src/db/schema';
import { desc, eq } from 'drizzle-orm';

interface Env {
  DB?: unknown;
}

export const onRequestGet = async (context: {
  request: Request;
  env: Env;
}): Promise<Response> => {
  const { env } = context;

  if (!env.DB) {
    return new Response(JSON.stringify({ links: [] }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const db = createDb(env.DB);
    const links = await db
      .select()
      .from(campaignLinks)
      .orderBy(desc(campaignLinks.createdAt))
      .limit(200);

    return new Response(JSON.stringify({ links }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: 'Failed to fetch links', details: message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};

export const onRequestPost = async (context: {
  request: Request;
  env: Env;
}): Promise<Response> => {
  const { request, env } = context;

  if (!env.DB) {
    return new Response(
      JSON.stringify({ error: 'Cloudflare D1 is not bound to this environment.' }),
      {
        status: 503,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON payload' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const slug = typeof body.slug === 'string' ? body.slug : '';
  const title = typeof body.title === 'string' ? body.title : '';
  const targetPath = typeof body.targetPath === 'string' ? body.targetPath : '/';
  const utmSource = typeof body.utmSource === 'string' ? body.utmSource : '';
  const utmMedium = typeof body.utmMedium === 'string' ? body.utmMedium : '';
  const utmCampaign = typeof body.utmCampaign === 'string' ? body.utmCampaign : '';
  const utmContent = typeof body.utmContent === 'string' ? body.utmContent : null;
  const utmTerm = typeof body.utmTerm === 'string' ? body.utmTerm : null;
  const tag = typeof body.tag === 'string' ? body.tag : null;

  if (!slug || !title || !utmSource || !utmMedium || !utmCampaign) {
    return new Response(
      JSON.stringify({
        error: 'Missing required fields: slug, title, utmSource, utmMedium, utmCampaign',
      }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  const normalizedSlug = slug.trim().toLowerCase().replace(/[^a-z0-9-_]/g, '-');
  const userEmail = request.headers.get('cf-access-authenticated-user-email') || 'admin';

  try {
    const db = createDb(env.DB);
    const [inserted] = await db
      .insert(campaignLinks)
      .values({
        slug: normalizedSlug,
        title: title.trim(),
        targetPath: targetPath.trim() || '/',
        utmSource: utmSource.trim(),
        utmMedium: utmMedium.trim(),
        utmCampaign: utmCampaign.trim(),
        utmContent: utmContent?.trim() || null,
        utmTerm: utmTerm?.trim() || null,
        tag: tag?.trim() || null,
        createdBy: userEmail,
      })
      .returning();

    return new Response(JSON.stringify({ success: true, link: inserted }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: 'Could not create link (slug may be duplicate)', details: message }),
      {
        status: 409,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};

export const onRequestDelete = async (context: {
  request: Request;
  env: Env;
}): Promise<Response> => {
  const { request, env } = context;
  if (!env.DB) {
    return new Response(JSON.stringify({ error: 'D1 not bound' }), { status: 503 });
  }

  const url = new URL(request.url);
  const idStr = url.searchParams.get('id');
  if (!idStr) {
    return new Response(JSON.stringify({ error: 'Missing id query parameter' }), { status: 400 });
  }

  try {
    const db = createDb(env.DB);
    await db.delete(campaignLinks).where(eq(campaignLinks.id, parseInt(idStr, 10)));
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Unknown error';
    return new Response(JSON.stringify({ error: message }), { status: 500 });
  }
};
