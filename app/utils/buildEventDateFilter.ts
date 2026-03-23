import type { activeFilter } from "~/types/event";

export const buildDateFilter = (
  filter: typeof activeFilter.value | undefined,
) => {
  if (!filter) {
    filter = "all";
  }
  const filters = {
    live: {
      _and: [{ start_at: { _lte: "$NOW" } }, { end_at: { _gte: "$NOW" } }],
    },
    upcoming: { start_at: { _gt: "$NOW" } },
    past: { end_at: { _lt: "$NOW" } },
    all: undefined,
  };
  return filters[filter];
};
