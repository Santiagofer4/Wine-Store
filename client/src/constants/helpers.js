import { isPending } from '@reduxjs/toolkit';

export const status = Object.freeze({
  idle: 'idle',
  loading: 'loading',
  succeded: 'succeded',
  failed: 'failed',
});
