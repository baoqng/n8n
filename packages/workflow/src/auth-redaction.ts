// bloom-deps:

import type { IncomingHttpHeaders } from 'http';

const REDACTED = '[redacted]';

const ALWAYS_SENSITIVE_HEADER_NAMES: readonly string[] = [
	'authorization',
	'cookie',
	'set-cookie',
	'x-api-key',
	'x-auth-token',
	'x-access-token',
	'proxy-authorization',
	'www-authenticate',
];

const CONTENT_TYPE_LOWER = 'content-type';

function isSensitiveHeader(name: string): boolean {
	const lower = name.toLowerCase();

	// Exception: content-type is never sensitive
	if (lower === CONTENT_TYPE_LOWER) {
		return false;
	}

	// Rule 1: always-sensitive header names
	if (ALWAYS_SENSITIVE_HEADER_NAMES.includes(lower)) {
		return true;
	}

	// Rule 2: contains 'secret'
	if (lower.includes('secret')) {
		return true;
	}

	// Rule 3: contains 'token'
	if (lower.includes('token')) {
		return true;
	}

	return false;
}

export function redactSensitiveHeaders(
	headers: Record<string, string>,
): Record<string, string> {
	const result: Record<string, string> = {};

	for (const key of Object.keys(headers)) {
		if (isSensitiveHeader(key)) {
			result[key] = REDACTED;
		} else {
			result[key] = headers[key];
		}
	}

	return result;
}