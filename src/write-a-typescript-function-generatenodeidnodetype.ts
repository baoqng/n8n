// bloom-deps:

function generateNodeId(nodeType: string, existingIds: string[]): string {
  if (typeof nodeType !== 'string' || nodeType.length === 0) {
    throw new TypeError('nodeType must be a non-empty string');
  }

  if (!Array.isArray(existingIds)) {
    throw new TypeError('existingIds must be an Array');
  }

  if (!existingIds.includes(nodeType)) {
    return nodeType;
  }

  let counter = 1;
  while (true) {
    const candidate = `${nodeType}${counter}`;
    if (!existingIds.includes(candidate)) {
      return candidate;
    }
    counter++;
  }
}

export { generateNodeId };