export const handleApiError = (error: any): string => {
  if (error.name === 'TypeError' && error.message.includes('fetch')) {
    return 'Network error. Please check your connection.';
  }
  
  if (error.status === 404) {
    return 'Room not found.';
  }
  
  if (error.status === 500) {
    return 'Server error. Please try again later.';
  }
  
  return error.message || 'An unexpected error occurred.';
}; 