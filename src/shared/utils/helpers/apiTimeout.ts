export const withTimeout = <T>(
  promise: Promise<T>,
  timeoutMs: number = 5000,
  timeoutMessage: string = 'Request timeout - please check your connection and try again',
): Promise<T> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  return new Promise((resolve, reject) => {
    promise
      .then((result) => {
        clearTimeout(timeoutId);
        resolve(result);
      })
      .catch((error) => {
        clearTimeout(timeoutId);
        if (error.name === 'AbortError' || error.code === 'ECONNABORTED') {
          reject(new Error(timeoutMessage));
        } else {
          reject(error);
        }
      });
  });
};

// Alternative: Higher-order function for axios calls
export const createTimeoutAxiosCall = (timeoutMs: number = 5000) => {
  return async <T>(axiosCall: () => Promise<T>): Promise<T> => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const result = await axiosCall();
      clearTimeout(timeoutId);
      return result;
    } catch (error: any) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError' || error.code === 'ECONNABORTED') {
        throw new Error('Request timeout - please check your connection and try again');
      }
      throw error;
    }
  };
};
