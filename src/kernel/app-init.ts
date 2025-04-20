import { init as initAuthModel } from '~/core/auth/init';

export function initializeApplication() {
  initAuthModel();
}
