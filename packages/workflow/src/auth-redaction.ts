// bloom-deps:

export function redactSensitiveHeaders(
	headers: Record<string, string>,
): Record<string, string> {
	const ALWAYS_SENSITIVE = new Set([
		'authorization',
		'cookie',
		'set-cookie',
		'x-api-key',
		'x-auth-token',
		'x-access-token',
		'proxy-authorization',
		'www-authenticate',
	]);

	const result: Record<string, string> = {};

	for (const [key, value] of Object.entries(headers)) {
		const lowerKey = key.toLowerCase();

		// content-type exception: never sensitive
		if (lowerKey === 'content-type') {
			result[key] = value;
			continue;
		}

		// Rule 1: always-sensitive header names
		if (ALWAYS_SENSITIVE.has(lowerKey)) {
			result[key] = '[redacted]';
			continue;
		}

		// Rule 2: contains 'secret' (case-insensitive)
		if (lowerKey.includes('secret')) {
			result[key] = '[redacted]';
			continue;
		}

		// Rule 3: contains 'token' (case-insensitive)
		if (lowerKey.includes('token')) {
			result[key] = '[redacted]';
			continue;
		}

		// Non-sensitive: copy unchanged
		result[key] = value;
	}

	return result;
}