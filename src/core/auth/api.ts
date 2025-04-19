import type { ViewerEmail } from "~/domain/viewer";
import type { Option } from "~/shared/types/option";
import type { paths } from "~/shared/api/interface";
import {
  type ApiRequestError,
  privateApiClient,
} from "~/shared/api/private-client";
import { type Result } from "~/shared/types/result";
import { delay } from "~/shared/lib/delay";
import { error, success } from "~/shared/lib/result";
import { Bucket } from "~/domain/bucket";

export const api = {
  async whoami(): Promise<
    Result<
      { buckets: Option<Array<Bucket>>; viewerEmail: ViewerEmail },
      Option<ApiRequestError>
    >
  > {
    function map(
      params: Partial<
        paths["/api/auth/whoami"]["get"]["responses"]["200"]["content"]
      >,
    ) {
      return {
        viewerEmail: params?.session_email as ViewerEmail,
        buckets: params?.buckets as Option<Array<Bucket>>,
      };
    }

    if (process.env.NEXT_PUBLIC_MOCK) {
      await delay(200);
      return success(
        map({ session_email: "mock@gmail.com", buckets: ["mock@gmail.com"] }),
      );
    }

    const query = await privateApiClient.query<
      paths["/api/auth/whoami"]["get"]["responses"]["200"]["content"]
    >({
      url: "/auth/whoami",
      method: "GET",
    });
    if (query.success) return success(map(query.success));
    else return error(query.error);
  },

  async logout() {
    return privateApiClient.query<
      paths["/api/auth/google-signout"]["delete"]["responses"]["204"]["content"]
    >({
      url: "/auth/google-signout",
      method: "DELETE",
    });
  },
};
