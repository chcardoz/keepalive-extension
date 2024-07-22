import { answerStorage } from './answerStorage';
import { createStorage, StorageType, type BaseStorage, SessionAccessLevel } from './base';
import { errorStringStorage } from './errorStringStorage';
import { exampleThemeStorage } from './exampleThemeStorage';
import { linkStorage } from './linkStorage';
import { questionStorage } from './questionStorage';
import { sectionIdStorage } from './sectionIdStorage';
import { textSnippetStorage } from './textSnippetStorage';
import { visitedSitesStringStorage } from './visitedSitesStorage';

export {
  exampleThemeStorage,
  textSnippetStorage,
  questionStorage,
  answerStorage,
  linkStorage,
  visitedSitesStringStorage,
  errorStringStorage,
  sectionIdStorage,
  createStorage,
  StorageType,
  SessionAccessLevel,
  BaseStorage,
};
