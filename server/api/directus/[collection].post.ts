// server/api/directus/[collection].post.ts
import { createDirectus, rest, readItems } from "@directus/sdk";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  
  // Récupération dynamique du nom de la collection (ex: categories, businesses)
  const collection = getRouterParam(event, "collection");

  // Initialisation du client Directus (exécuté côté serveur, pas de souci CORS)
  const client = createDirectus(config.public.directusUrl).with(rest());

  try {
    // Lecture du corps de la requête. Si le body est vide, on initialise un objet vide.
    const body = await readBody(event).catch(() => ({}));

    // Appel à Directus avec la collection et les filtres/options reçus
    const results = await client.request(
      readItems(collection as any, body || {})
    );

    return results;
  } catch (error: any) {
    // Gestion d'erreur détaillée pour le débuggage
    throw createError({
      statusCode: error.response?.status || 500,
      statusMessage: `Directus Error: ${error.message}`,
    });
  }
});