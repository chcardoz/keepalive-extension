import { BaseStorage, createStorage, StorageType } from './base';

type QuestionStorage = BaseStorage<string>;

const storage = createStorage<string>('question-storage-key', '', {
  storageType: StorageType.Local,
  liveUpdate: true,
});

export const questionStorage: QuestionStorage = {
  ...storage,
};
