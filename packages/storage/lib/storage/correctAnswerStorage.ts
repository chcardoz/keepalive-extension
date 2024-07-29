import { BaseStorage, createStorage, StorageType } from './base';

type CorrectAnswerStorage = BaseStorage<string>;

const storage = createStorage<string>('correct-answer-storage-key', '', {
  storageType: StorageType.Local,
  liveUpdate: true,
});

export const correctAnswerStorage: CorrectAnswerStorage = {
  ...storage,
};
