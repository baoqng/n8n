function buildPaginationMeta(
  total: number,
  page: number,
  pageSize: number
): {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
} {
  if (
    typeof total !== 'number' ||
    !Number.isFinite(total) ||
    !Number.isInteger(total) ||
    total < 0
  ) {
    throw new TypeError('total must be a non-negative integer');
  }

  if (
    typeof page !== 'number' ||
    !Number.isFinite(page) ||
    !Number.isInteger(page) ||
    page < 1
  ) {
    throw new TypeError('page must be a positive integer');
  }

  if (
    typeof pageSize !== 'number' ||
    !Number.isFinite(pageSize) ||
    !Number.isInteger(pageSize) ||
    pageSize < 1
  ) {
    throw new TypeError('pageSize must be a positive integer');
  }

  const totalPages = Math.ceil(total / pageSize);
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;

  return {
    total,
    page,
    pageSize,
    totalPages,
    hasNextPage,
    hasPrevPage,
  };
}

export { buildPaginationMeta };