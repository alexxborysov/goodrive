import { Brand } from '~/shared/types/brand';

export type Bucket = Brand<
  {
    linkedEmail: BucketLinkedEmail;
  },
  'bucket'
>;

export type BucketLinkedEmail = Brand<string, 'bucket-linked-email'>;
