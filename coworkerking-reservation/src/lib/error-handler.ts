import { 
  AuthError, 
  ForbiddenError, 
  ValidationError, 
  NotFoundError,
  getErrorMessage
} from './errors';

export function handleServerActionError(error: unknown): never {
  console.error('Server Action Error:', error);

  if (error instanceof AuthError) {
    throw error; // Re-throw to be caught by error boundary
  }

  if (error instanceof ForbiddenError) {
    throw error;
  }

  if (error instanceof ValidationError) {
    throw error;
  }

  if (error instanceof NotFoundError) {
    throw error;
  }

  // Convert unknown errors to generic server errors
  throw new Error(getErrorMessage(error));
}