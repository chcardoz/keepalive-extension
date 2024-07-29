import { BaseStorage, createStorage, StorageType } from './base';

type TextSnippetStorage = BaseStorage<string>;

const storage = createStorage<string>('text-snippet-storage-key', '', {
  storageType: StorageType.Local,
  liveUpdate: true,
});

export const textSnippetStorage: TextSnippetStorage = {
  ...storage,
};
