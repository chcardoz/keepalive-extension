import { BaseStorage, createStorage, StorageType } from './base';

type LinkStorage = BaseStorage<string>;

const storage = createStorage<string>('link-storage-key', '', {
  storageType: StorageType.Local,
  liveUpdate: true,
});

export const linkStorage: LinkStorage = {
  ...storage,
};
