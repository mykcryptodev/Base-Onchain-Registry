import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { type EntryResponse } from "~/types/entry";

export const entriesRouter = createTRPCRouter({
  getEntries: publicProcedure
    .input(z.object({
      limit: z.number().max(50).default(10),
      cursor: z.string().nullish(),
      category: z.enum(['Games', 'Social', 'Creators', 'Finance', 'Media']).optional(),
      curation: z.enum(['Featured', 'Curated', 'Community']).optional(),
    }))
    .query(async ({ input }) => {
      const baseUrl = 'https://base.org';
      const path = '/api/registry/entries';
      const url = new URL(path, baseUrl);
      url.searchParams.append('page', input.cursor?.toString() ?? '1');
      url.searchParams.append('limit', input.limit.toString());
      if (input.category) {
        url.searchParams.append('category', input.category);
      }
      if (input.curation) {
        url.searchParams.append('curation', input.curation);
      }
      const res = await fetch(url.toString());
      const data = await res.json() as EntryResponse;
      return {
        ...data,
        nextCursor: data.pagination.current_page + 1,
      };
    }),
});
