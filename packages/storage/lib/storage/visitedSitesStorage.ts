import { BaseStorage, createStorage, StorageType } from './base';

type VisitedSitesStringStorage = BaseStorage<string>;

const storage = createStorage<string>('visited-sites-string-storage-key', '', {
  storageType: StorageType.Local,
  liveUpdate: true,
});

export const visitedSitesStringStorage: VisitedSitesStringStorage = {
  ...storage,
};
