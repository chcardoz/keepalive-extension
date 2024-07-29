import { BaseStorage, createStorage, StorageType } from './base';

type SuccessStringStorage = BaseStorage<string>;

const storage = createStorage<string>('success-string-storage-key', '', {
  storageType: StorageType.Local,
  liveUpdate: true,
});

export const successStringStorage: SuccessStringStorage = {
  ...storage,
};
