import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
  fetchLicensedChapterFromProvider,
  fetchLicensedVersesFromProvider,
  searchLicensedVersesFromProvider,
  readProviderStatus,
} from "./bible.server";

export const fetchLicensedChapter = createServerFn({ method: "GET" })
  .inputValidator((data) =>
    z.object({ bookId: z.string().min(1), chapter: z.number().int().positive() }).parse(data),
  )
  .handler(async ({ data }) => fetchLicensedChapterFromProvider(data.bookId, data.chapter));

export const fetchLicensedVerses = createServerFn({ method: "GET" })
  .inputValidator((data) =>
    z
      .object({
        refs: z
          .array(
            z.object({
              ref: z.string().min(1),
              bookId: z.string().min(1),
              chapter: z.number().int().positive(),
              verse: z.number().int().positive().optional(),
            }),
          )
          .max(24),
      })
      .parse(data),
  )
  .handler(async ({ data }) => fetchLicensedVersesFromProvider(data.refs));

export const searchLicensedVerses = createServerFn({ method: "GET" })
  .inputValidator((data) =>
    z
      .object({ query: z.string().min(2), limit: z.number().int().positive().max(100).optional() })
      .parse(data),
  )
  .handler(async ({ data }) => searchLicensedVersesFromProvider(data.query, data.limit ?? 60));

export const getBibleProviderStatus = createServerFn({ method: "GET" }).handler(async () =>
  readProviderStatus(),
);
