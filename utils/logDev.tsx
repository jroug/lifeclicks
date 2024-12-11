export const logDev = (...args: unknown[]): void => {
    if (process.env.NODE_ENV === 'development') {
      console.log(...args);
    }
 };
  