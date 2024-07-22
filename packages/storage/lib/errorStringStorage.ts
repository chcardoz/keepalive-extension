import { BaseStorage, createStorage, StorageType } from './base';

type ErrorStringStorage = BaseStorage<string>;

const storage = createStorage<string>('erorr-string-storage-key', '', {
  storageType: StorageType.Local,
  liveUpdate: true,
});

export const errorStringStorage: ErrorStringStorage = {
  ...storage,
};
