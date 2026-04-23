import { useQuery } from "@tanstack/vue-query";
import type { ArchiveSectionResolved } from "~/data/archive-sections";

const ARCHIVE_LINKS_QUERY_KEY = ["posts-archive-links"] as const;

export const useArchiveLinksQuery = () => {
  return useQuery<ArchiveSectionResolved[]>({
    queryKey: ARCHIVE_LINKS_QUERY_KEY,
    queryFn: () => $fetch("/api/posts/archive-links"),
    staleTime: Number.POSITIVE_INFINITY,
    gcTime: Number.POSITIVE_INFINITY,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
