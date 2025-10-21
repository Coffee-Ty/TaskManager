import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: Error): void {
    // Log to console in development
    console.error('Global error caught:', error);
    
    // Handle specific error types
    if (this.isStorageError(error)) {
      console.warn('Storage operation failed. Data may not persist across sessions.');
      return;
    }
    
    if (this.isNetworkError(error)) {
      console.error('Network request failed. Please check your connection.');
      return;
    }
    
    // Generic error handling
    console.error('An unexpected error occurred:', error.message);
    
    // In production, you might want to:
    // - Send to error tracking service (Sentry, LogRocket, etc.)
    // - Show user-friendly notification
    // - Log to backend monitoring service
  }
  
  private isStorageError(error: Error): boolean {
    return error.name === 'QuotaExceededError' || 
           error.message?.includes('localStorage') ||
           error.message?.includes('Storage');
  }
  
  private isNetworkError(error: Error): boolean {
    return error.message?.includes('Http') || 
           error.message?.includes('fetch') ||
           error.message?.includes('Network');
  }
}

