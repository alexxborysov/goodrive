import { Brand } from '~/shared/types/brand';
import { Option } from '~/shared/types/option';

export type Viewer = Brand<
  {
    email: ViewerEmail;
    name: ViewerName;
    nameInitials: ViewerNameInitials;
  },
  'viewer'
>;

export type ViewerEmail = Brand<string, 'viewer-email'>;
export type ViewerName = Brand<string, 'viewer-name'>;
export type ViewerNameInitials = Brand<string, 'viewer-name-initials'>;

export function makeNameInitials(name: Option<ViewerName>): ViewerNameInitials {
  if (!name?.length) return 'VG' as ViewerNameInitials;
  return name
    .split(' ')
    .slice(0, 2)
    .map((word) => word[0])
    .join('') as ViewerNameInitials;
}
