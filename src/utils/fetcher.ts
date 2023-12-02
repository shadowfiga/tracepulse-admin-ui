import ky, { KyResponse, NormalizedOptions } from "ky";
import config from "../config.ts";

function calculateTiming(startedAt: string): number {
  // Parse `startedAt` and create a date object
  const startedAtDate = new Date(parseInt(startedAt));

  // Get the current date
  const currentDate = new Date();

  // Calculate the difference in milliseconds
  const timing = currentDate.getTime() - startedAtDate.getTime();

  return timing;
}

let token = "";
const fetcher = ky.extend({
  prefixUrl: config.apiUrl,
  hooks: {
    afterResponse: [
      async (request: Request, _: NormalizedOptions, response: KyResponse) => {
        const { method, url } = request;
        const { status } = response;
        const startedAt = request.headers.get("x-started-at") ?? "0";
        let timing = 0;
        if (startedAt) {
          timing = calculateTiming(startedAt);
        }
        if (response.ok) {
          console.info(
            `${method}: ${url} - [${status}] - [OK] (${timing || "-"}ms)`,
          );
        }
        if (!response.ok) {
          console.error(
            `${method}: ${url} - [${status}] - [ERROR] (${timing || "-"}ms)`,
          );
        }
        return response;
      },
    ],
    beforeRequest: [
      async (request) => {
        request.headers.set("Authorization", `Bearer ${token}`);
        request.headers.set("x-started-at", Date.now().toString());
        return request;
      },
    ],
  },
});

export const setFetcherToken = async (accessToken: string): Promise<void> => {
  token = accessToken;
};

export const getAccessToken = (): string => token;

export default fetcher;
