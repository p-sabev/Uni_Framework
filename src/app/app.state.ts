import { Source } from './_models/source';

export interface AppState {
  readonly appTitle: string;
  readonly sources: Source[];
}
