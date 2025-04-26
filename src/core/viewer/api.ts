import type { ViewerEmail, ViewerName } from '~/domain/viewer';
import type { Option } from '~/shared/types/option';
import type { paths } from '~/shared/api/interface';
import {
  type ApiRequestError,
  privateApiClient,
} from '~/shared/api/private-client';
import { type Result } from '~/shared/types/result';
import { delay } from '~/shared/lib/delay';
import { error, success } from '~/shared/lib/result';
import { Bucket } from '~/domain/bucket';

export const api = {
  async whoami(): Promise<
    Result<
      {
        buckets: Option<Array<Bucket>>;
        viewerEmail: ViewerEmail;
        viewerName: ViewerName;
      },
      Option<ApiRequestError>
    >
  > {
    if (process.env.NEXT_PUBLIC_MOCK) return __mocks.whoami();
    const query = await privateApiClient.query<
      paths['/api/auth/whoami']['get']['responses']['200']['content']
    >({
      url: '/auth/whoami',
      method: 'GET',
    });
    if (query.success) return success(mappers.whoami(query.success));
    else return error(query.error);
  },

  async logout() {
    return privateApiClient.query<
      paths['/api/auth/google-signout']['delete']['responses']['204']['content']
    >({
      url: '/auth/google-signout',
      method: 'DELETE',
    });
  },
};

const mappers = {
  whoami(
    params: Partial<
      paths['/api/auth/whoami']['get']['responses']['200']['content']
    >
  ) {
    return {
      viewerName: 'Goodrive User' as ViewerName,
      viewerEmail: params?.session_email as ViewerEmail,
      buckets: params?.buckets as Option<Array<Bucket>>,
    };
  },
};

const __mocks = {
  async whoami() {
    await delay(200);
    return success(
      mappers.whoami({
        session_email: 'mock@gmail.com',
        buckets: ['mock@gmail.com', 'mock-2@gmail.com'],
      })
    );
  },
};
