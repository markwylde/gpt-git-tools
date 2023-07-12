#!/usr/bin/env node

import { execSync } from 'child_process';
import chalk from 'chalk';
import OpenAI from 'openai';
import callOpenAI from '../callOpenAI.js';

function getDiff() {
  return execSync('git add package-lock.json && git status && git diff', { encoding: 'utf8' });
}

async function main() {
  try {
    const diff = getDiff();
    console.log(chalk.cyan('\n--------------------   DIFF   --------------------\n'));
    console.log(diff)

    console.log(chalk.yellow('\n-------------------- CODE REVIEW --------------------\n'));
    await callOpenAI(diff, 'Review this code change for me');
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      console.error(error.status, error.code, error.type);
      console.error(error.message);
    } else {
      console.log(chalk.red('\n-------------------- ERROR --------------------\n'));
      throw error;
    }
  }
}

main();
