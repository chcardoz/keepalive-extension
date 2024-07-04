import { useSyncExternalStore } from 'react';
import { BaseStorage } from '@chrome-extension-boilerplate/storage';

type WrappedPromise = ReturnType<typeof wrapPromise>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const storageMap: Map<BaseStorage<any>, WrappedPromise> = new Map();

export function useStorageSuspense<
  Storage extends BaseStorage<Data>,
  Data = Storage extends BaseStorage<infer Data> ? Data : unknown,
>(storage: Storage) {
  const _data = useSyncExternalStore<Data | null>(storage.subscribe, storage.getSnapshot);

  if (!storageMap.has(storage)) {
    storageMap.set(storage, wrapPromise(storage.get()));
  }
  if (_data !== null) {
    storageMap.set(storage, { read: () => _data });
  }

  return _data ?? (storageMap.get(storage)!.read() as Data);
}

/**
 * Wraps a promise to handle its pending, success, and error states.
 * This allows for integration with React Suspense by throwing the promise
 * while it is pending, causing a fallback UI to be shown, and returning the
 * result or error once resolved or rejected.
 *
 * @template R
 * @param {Promise<R>} promise - The promise to be wrapped.
 * @returns {{ read: () => R }} An object with a `read` method that throws the
 *                              promise while it is pending, throws the error
 *                              if the promise is rejected, or returns the
 *                              resolved value if the promise is fulfilled.
 */
function wrapPromise<R>(promise: Promise<R>) {
  let status = 'pending';
  let result: R;
  const suspender = promise.then(
    r => {
      status = 'success';
      result = r;
    },
    e => {
      status = 'error';
      result = e;
    },
  );

  return {
    read() {
      switch (status) {
        case 'pending':
          throw suspender;
        case 'error':
          throw result;
        default:
          return result;
      }
    },
  };
}

export function useStorage<
  Storage extends BaseStorage<Data>,
  Data = Storage extends BaseStorage<infer Data> ? Data : unknown,
>(storage: Storage) {
  const _data = useSyncExternalStore<Data | null>(storage.subscribe, storage.getSnapshot);

  // eslint-disable-next-line
  // @ts-ignore
  if (!storageMap.has(storage)) {
    // eslint-disable-next-line
    // @ts-ignore
    storageMap.set(storage, wrapPromise(storage.get()));
  }
  if (_data !== null) {
    // eslint-disable-next-line
    // @ts-ignore
    storageMap.set(storage, { read: () => _data });
  }
  // eslint-disable-next-line
  // @ts-ignore
  return _data ?? (storageMap.get(storage)!.read() as Data);
}
