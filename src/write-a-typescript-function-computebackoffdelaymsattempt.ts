function computeBackoffDelayMs(attempt: number, baseMs: number, maxMs: number): number {
  if (!Number.isInteger(attempt) || attempt < 0) {
    throw new TypeError('attempt must be a non-negative integer');
  }

  if (!Number.isFinite(baseMs) || baseMs <= 0) {
    throw new RangeError('baseMs must be a positive finite number');
  }

  if (!Number.isFinite(maxMs) || maxMs <= 0) {
    throw new RangeError('maxMs must be a positive finite number');
  }

  if (maxMs < baseMs) {
    throw new RangeError('maxMs must be >= baseMs');
  }

  return Math.min(baseMs * Math.pow(2, attempt), maxMs);
}

export { computeBackoffDelayMs };