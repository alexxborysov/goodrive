import type { ViewerEmail, Viewer, ViewerName } from "~/domain/viewer";
import type { Option } from "~/shared/types/option";
import type { paths } from "~/shared/api/interface";
import {
  type ApiRequestError,
  privateApiClient,
} from "~/shared/api/private-client";
import { type Result } from "~/shared/types/result";
import { delay } from "~/shared/lib/delay";
import { error, success } from "~/shared/lib/result";

export const api = {
  async whoami(): Promise<Result<Viewer, Option<ApiRequestError>>> {
    if (process.env.NEXT_PUBLIC_MOCK) {
      await delay(200);
      return {
        success: mapViewer({
          name: "Alex Mock",
          session_email: "mock@gmail.com",
        }),
      };
    }

    const query = await privateApiClient.query<
      paths["/api/auth/whoami"]["get"]["responses"]["200"]["content"]
    >({
      url: "/auth/whoami",
      method: "GET",
    });
    if (query.success) return success(mapViewer(query.success));
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

function mapViewer(
  payload: NonNullable<
    paths["/api/auth/whoami"]["get"]["responses"]["200"]["content"]
  >,
) {
  return {
    name: payload?.name as ViewerName,
    email: payload?.session_email as ViewerEmail,
    nameInitials: null,
  } as Viewer;
}
