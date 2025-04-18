import { Brand } from "~/shared/types/brand";
import { Option } from "~/shared/types/option";

export type Viewer = Brand<
  {
    name: ViewerName;
    nameInitials: Option<ViewerNameInitials>;
    sessionEmail: Email;
  },
  "viewer"
>;

export type Email = Brand<string, "email">;
export type ViewerName = Brand<string, "viewer-name">;
export type ViewerNameInitials = Brand<string, "viewer-name">;

export function makeNameInitials(name: ViewerName): ViewerNameInitials {
  return name
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("") as ViewerNameInitials;
}
