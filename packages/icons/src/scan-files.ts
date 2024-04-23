// Copyright (c) 2024, Will Shown <ch-ui@willshown.com>

import { spawn } from 'node:child_process';
import { resolve } from 'node:path';
import { BundleParams } from './types';

const split = /[\s\n"]+/m;

export const scanFiles = ({
  tokenPattern,
  contentPath,
}: Pick<BundleParams, 'tokenPattern' | 'contentPath'> & {
  extension?: string;
}): Promise<Set<string>> => {
  return new Promise((res, rej) => {
    const tokens = new Set<string>();
    let error = '';

    const grep = spawn('grep', [
      '-Eroh',
      `"${tokenPattern}"`,
      resolve(__dirname, contentPath),
    ]);

    grep.stdout.on('data', (data) => {
      data
        .toString()
        .split(split)
        .map((token: string) => token && tokens.add(token));
    });

    grep.stderr.on('data', (data) => {
      error += data.toString();
    });

    grep.on('close', () => {
      if (error) {
        rej(error);
      } else {
        res(tokens);
      }
    });
  });
};
