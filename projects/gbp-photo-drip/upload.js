#!/usr/bin/env node
/**
 * Upload a photo to Google Business Profile via browser automation.
 * Usage: node upload.js <photo_path>
 */

const puppeteer = require('puppeteer-core');
const path = require('path');

const PHOTO_PATH = process.argv[2];
if (!PHOTO_PATH) { console.error('Usage: node upload.js <photo_path>'); process.exit(1); }

const GBP_SEARCH_URL = 'https://www.google.com/search?q=Bay+Area+Boxing+Belmont';
const BROWSER_URL = 'http://localhost:18800';

(async () => {
  let browser;
  try {
    browser = await puppeteer.connect({ browserURL: BROWSER_URL, defaultViewport: null });
  } catch (e) {
    console.error('Could not connect to browser. Is Chrome running?', e.message);
    process.exit(1);
  }

  const pages = await browser.pages();
  let page = pages.find(p => p.url().includes('google.com/search'));

  if (!page) {
    page = await browser.newPage();
    await page.goto(GBP_SEARCH_URL, { waitUntil: 'networkidle2', timeout: 20000 });
    await new Promise(r => setTimeout(r, 3000));
  }

  // Navigate to photos panel via hash
  await page.goto(GBP_SEARCH_URL + '#mpd=~10362271798752596997/promote/photos/mediatool', { waitUntil: 'networkidle2', timeout: 20000 });
  await new Promise(r => setTimeout(r, 4000));

  const frames = page.frames();
  const gbpFrame = frames.find(f => f.url().includes('local/business') && f.url().includes('mediatool'));

  if (!gbpFrame) {
    console.error('GBP management frame not found. May need to navigate manually first.');
    process.exit(1);
  }

  // Click "Add photos" button
  await gbpFrame.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const btn = buttons.find(b => b.textContent.trim() === 'Add photos');
    if (btn) btn.click();
  });

  await new Promise(r => setTimeout(r, 2000));

  // Get file input
  const fileInput = await gbpFrame.$('input[type="file"]');
  if (!fileInput) {
    console.error('File input not found after clicking Add photos');
    process.exit(1);
  }

  await fileInput.uploadFile(PHOTO_PATH);
  console.log('File uploaded:', path.basename(PHOTO_PATH));
  await new Promise(r => setTimeout(r, 5000));

  console.log('UPLOAD_SUCCESS');
  await browser.disconnect();
})().catch(e => {
  console.error('UPLOAD_ERROR:', e.message);
  process.exit(1);
});
