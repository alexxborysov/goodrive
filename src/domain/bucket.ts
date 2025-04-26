import { Tag } from '~/shared/types/brand';

export type Bucket = Tag<
  {
    linkedEmail: BucketLinkedEmail;
  },
  'bucket'
>;

export type BucketLinkedEmail = Tag<string, 'bucket-linked-email'>;
