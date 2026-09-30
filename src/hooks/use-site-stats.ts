import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

import { fetchSiteStats, registerVisit, type SiteStats } from "@/lib/stats";

export function useSiteStats() {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["site-stats"],
    queryFn: fetchSiteStats,
    refetchInterval: 5000,
    refetchIntervalInBackground: false,
  });

  useEffect(() => {
    registerVisit()
      .then((stats) => {
        if (stats) queryClient.setQueryData<SiteStats>(["site-stats"], stats);
      })
      .catch(() => undefined);
  }, [queryClient]);

  return query;
}
