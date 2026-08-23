import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { fetchLicensedChapterFromProvider } from "./bible.server";

export const fetchLicensedChapter = createServerFn({ method: "GET" })
  .inputValidator((data) =>
    z.object({ bookId: z.string().min(1), chapter: z.number().int().positive() }).parse(data),
  )
  .handler(async ({ data }) => fetchLicensedChapterFromProvider(data.bookId, data.chapter));
