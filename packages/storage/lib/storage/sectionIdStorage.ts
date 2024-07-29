import { BaseStorage, createStorage, StorageType } from './base';

type SectionIdStorage = BaseStorage<string>;

const storage = createStorage<string>('section-id-storage-key', '', {
  storageType: StorageType.Local,
  liveUpdate: true,
});

export const sectionIdStorage: SectionIdStorage = {
  ...storage,
};
