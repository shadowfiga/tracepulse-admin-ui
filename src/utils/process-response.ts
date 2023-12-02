import { type ResponsePromise } from "ky";

export const processResponse = async <T>(
  cb: () => ResponsePromise,
): Promise<T> => {
  try {
    const response = await cb();
    const json = await response.json();
    return json as T;
  } catch (e) {
    throw new Error((e as Error).message);
  }
};
