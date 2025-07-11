import { useState, useCallback } from 'react';
import { apiService } from '../services/api';
import { handleApiError } from '../utils/errorHandler';

export const useCreateRoom = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createRoom = useCallback(async (roomName: string) => {
    try {
      setLoading(true);
      setError(null);
      const room = await apiService.createRoom(roomName);
      return room;
    } catch (err: any) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    createRoom,
    loading,
    error
  };
}; 