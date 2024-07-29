import { BaseStorage, createStorage, StorageType } from './base';

type AnswerStorage = BaseStorage<string>;

const storage = createStorage<string>('answer-storage-key', '', {
  storageType: StorageType.Local,
  liveUpdate: true,
});

export const answerStorage: AnswerStorage = {
  ...storage,
};
