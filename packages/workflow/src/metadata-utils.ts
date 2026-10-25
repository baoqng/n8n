// bloom-deps:

export function getParentExecutionIds(metadata: Record<string, string>): string[] {
  try {
    if (!Object.prototype.hasOwnProperty.call(metadata, 'parentExecution')) {
      return [];
    }

    const raw = metadata['parentExecution'];

    if (typeof raw !== 'string' || raw.length === 0) {
      return [];
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch {
      return [];
    }

    if (!Array.isArray(parsed)) {
      return [];
    }

    const filtered = parsed.filter(
      (element): element is string =>
        typeof element === 'string' && element.length > 0,
    );

    return filtered.reverse();
  } catch {
    return [];
  }
}