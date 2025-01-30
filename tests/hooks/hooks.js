import fs from 'fs';
import path from 'path';
import { test } from '@playwright/test';

test.afterEach(async ({ page }, testInfo) => {
  const videoPath = await page.video()?.path();
  if (videoPath) {
    const newVideoPath = path.join(
      __dirname,
      '../reports/videos',
      `${testInfo.title.replace(/[\W_]+/g, '_')}.webm`
    );

    fs.mkdirSync(path.dirname(newVideoPath), { recursive: true });
    fs.renameSync(videoPath, newVideoPath);
    console.log(`Video saved to: ${newVideoPath}`);
  }
});
