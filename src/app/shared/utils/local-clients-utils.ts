import { TClient } from '../types/client';
import {
  getLocalItems,
  saveLocalItem,
  mergeItems,
  getNextLocalId as getGenericNextLocalId,
} from './local-storage-utils';

export const getLocalClients = (): TClient[] => getLocalItems<TClient>('clients');

export const saveLocalClient = (client: TClient): void => saveLocalItem('clients', client);

export const mergeClients = (apiClients: TClient[], localClients: TClient[]): TClient[] =>
  mergeItems(apiClients, localClients);

export const getNextLocalId = (): number => getGenericNextLocalId<TClient>('clients', 1000);
