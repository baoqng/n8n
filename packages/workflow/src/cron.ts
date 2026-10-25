// bloom-deps:

export function formatCronAsText(expression: string): string {
	const trimmed = expression.trim();
	const fields = trimmed.split(/\s+/);

	if (fields.length !== 5) {
		throw new Error(`Invalid cron expression: expected 5 fields but got ${fields.length}`);
	}

	const [minute, hour, dayOfMonth, month, dayOfWeek] = fields;

	const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

	// '* * * * *' -> 'Every minute'
	if (minute === '*' && hour === '*' && dayOfMonth === '*' && month === '*' && dayOfWeek === '*') {
		return 'Every minute';
	}

	// '*/1 * * * *' -> 'Every minute'
	if (minute === '*/1' && hour === '*' && dayOfMonth === '*' && month === '*' && dayOfWeek === '*') {
		return 'Every minute';
	}

	// '*/N * * * *' -> 'Every N minutes' (N >= 2)
	const minuteStepMatch = /^\*\/(\d+)$/.exec(minute);
	if (
		minuteStepMatch &&
		hour === '*' &&
		dayOfMonth === '*' &&
		month === '*' &&
		dayOfWeek === '*'
	) {
		const n = parseInt(minuteStepMatch[1], 10);
		if (n >= 2) {
			return `Every ${n} minutes`;
		}
	}

	// '0 * * * *' -> 'Every hour'
	if (minute === '0' && hour === '*' && dayOfMonth === '*' && month === '*' && dayOfWeek === '*') {
		return 'Every hour';
	}

	// '0 */N * * *' -> 'Every N hours' (N >= 2)
	const hourStepMatch = /^\*\/(\d+)$/.exec(hour);
	if (
		minute === '0' &&
		hourStepMatch &&
		dayOfMonth === '*' &&
		month === '*' &&
		dayOfWeek === '*'
	) {
		const n = parseInt(hourStepMatch[1], 10);
		if (n >= 2) {
			return `Every ${n} hours`;
		}
	}

	// '0 0 1 * *' -> 'First of each month at midnight'
	if (minute === '0' && hour === '0' && dayOfMonth === '1' && month === '*' && dayOfWeek === '*') {
		return 'First of each month at midnight';
	}

	// '0 H 1 * *' -> 'First of each month at H:00' (H != 0)
	const hourLiteralForMonth = /^(\d+)$/.exec(hour);
	if (
		minute === '0' &&
		hourLiteralForMonth &&
		dayOfMonth === '1' &&
		month === '*' &&
		dayOfWeek === '*'
	) {
		const h = parseInt(hourLiteralForMonth[1], 10);
		if (h >= 0 && h <= 23 && h !== 0) {
			return `First of each month at ${h}:00`;
		}
	}

	// '0 H * * D' -> 'Every <DayName> at H:00'
	const hourLiteralForDay = /^(\d+)$/.exec(hour);
	const dayLiteral = /^(\d+)$/.exec(dayOfWeek);
	if (
		minute === '0' &&
		hourLiteralForDay &&
		dayOfMonth === '*' &&
		month === '*' &&
		dayLiteral
	) {
		const h = parseInt(hourLiteralForDay[1], 10);
		const d = parseInt(dayLiteral[1], 10);
		if (h >= 0 && h <= 23 && d >= 0 && d <= 6) {
			return `Every ${dayNames[d]} at ${h}:00`;
		}
	}

	// '0 H * * *' -> 'Every day at H:00'
	const hourLiteral = /^(\d+)$/.exec(hour);
	if (
		minute === '0' &&
		hourLiteral &&
		dayOfMonth === '*' &&
		month === '*' &&
		dayOfWeek === '*'
	) {
		const h = parseInt(hourLiteral[1], 10);
		if (h >= 0 && h <= 23) {
			return `Every day at ${h}:00`;
		}
	}

	return 'Custom schedule';
}