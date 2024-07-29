import { answerStorage } from './storage/answerStorage';
import { createStorage, StorageType, type BaseStorage, SessionAccessLevel } from './storage/base';
import { correctAnswerStorage } from './storage/correctAnswerStorage';
import { errorStringStorage } from './storage/errorStringStorage';
import { exampleThemeStorage } from './storage/exampleThemeStorage';
import { linkStorage } from './storage/linkStorage';
import { questionStorage } from './storage/questionStorage';
import { sectionIdStorage } from './storage/sectionIdStorage';
import { successStringStorage } from './storage/successStringStorage';
import { textSnippetStorage } from './storage/textSnippetStorage';
import { visitedSitesStringStorage } from './storage/visitedSitesStorage';

export {
  exampleThemeStorage,
  textSnippetStorage,
  questionStorage,
  answerStorage,
  linkStorage,
  visitedSitesStringStorage,
  errorStringStorage,
  successStringStorage,
  correctAnswerStorage,
  sectionIdStorage,
  createStorage,
  StorageType,
  SessionAccessLevel,
  BaseStorage,
};
