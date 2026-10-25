// bloom-deps:

import type { ExecutionStatus } from './interfaces';

export type { ExecutionStatus };

export type TerminalExecutionStatus = 'canceled' | 'crashed' | 'error' | 'success';
export type CompletedExecutionStatus = 'crashed' | 'error' | 'success';
export type ActiveExecutionStatus = 'new' | 'running' | 'waiting';

export function isTerminalExecutionStatus(
	status: ExecutionStatus | undefined,
): status is TerminalExecutionStatus {
	return (
		status === 'canceled' || status === 'crashed' || status === 'error' || status === 'success'
	);
}

export function isCompletedExecutionStatus(
	status: ExecutionStatus,
): status is CompletedExecutionStatus {
	return status === 'crashed' || status === 'error' || status === 'success';
}

export function isActiveExecution(status: ExecutionStatus): boolean {
	switch (status) {
		case 'new':
		case 'running':
		case 'waiting':
			return true;
		case 'success':
		case 'error':
		case 'canceled':
		case 'crashed':
		case 'unknown':
			return false;
		default: {
			const _exhaustiveCheck: never = status;
			return false;
		}
	}
}