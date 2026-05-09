#!/usr/bin/env node
/**
 * BAB Google Business Profile Photo Drip
 * Picks next photo, sends Telegram preview, waits for approval, uploads to GBP.
 * Run via cron every 2 days.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const STATE_FILE = path.join(__dirname, 'state.json');
const QUEUE_FILE = path.join(__dirname, 'photo-queue.txt');
const UPLOAD_SCRIPT = path.join(__dirname, 'upload.js');

// Load state
const state = JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
const queue = fs.readFileSync(QUEUE_FILE, 'utf8').trim().split('\n');

// Pick next photo
const nextPhoto = queue[state.currentIndex];
if (!nextPhoto) {
  console.log('Queue exhausted — looping back to start');
  state.currentIndex = 0;
}

const photoPath = nextPhoto || queue[0];
const photoName = path.basename(photoPath);
const category = photoPath.split('/').slice(-3)[0]; // Bags, Ring, Team, etc.

// Generate caption based on category
function generateCaption(category, filename) {
  const captions = {
    Bags: [
      "This is what real training looks like. No filters, no theater — just work. Bay Area Boxing, Belmont. 📍 210 El Camino Real",
      "Every round on the bag is a deposit in the bank. Come make yours. 📍 Bay Area Boxing, Belmont CA",
      "Technique. Power. Conditioning. All in one session. Bay Area Boxing — where Belmont trains. 📍 210 El Camino Real",
    ],
    Ring: [
      "The ring doesn't lie. Bay Area Boxing, Belmont's home for real combat sports training. 📍 210 El Camino Real",
      "15 years in Belmont. The ring has seen a lot of hard work. Come add yours. 📍 Bay Area Boxing",
      "Real sparring. Real coaches. Real progress. Bay Area Boxing, Belmont CA. 📍 210 El Camino Real",
    ],
    Team: [
      "The coaches behind Bay Area Boxing. 15 years building Belmont's best combat sports community. 📍 210 El Camino Real",
      "These are the people who will make you better. Bay Area Boxing, Belmont. 📍 210 El Camino Real",
      "Not a franchise. Not a cardio class. Real coaches, real training. 📍 Bay Area Boxing, Belmont CA",
    ],
    Mat: [
      "BJJ, Muay Thai, MMA — the mats at Bay Area Boxing see it all. 📍 210 El Camino Real, Belmont",
      "The mat is where technique meets pressure. Bay Area Boxing, Belmont. 📍 210 El Camino Real",
      "Grappling, striking, conditioning — all under one roof. Bay Area Boxing, Belmont CA. 📍 210 El Camino Real",
    ],
    Miscellaneous: [
      "5,000 sq ft of real combat sports training in Belmont, CA. 📍 Bay Area Boxing, 210 El Camino Real",
      "This is Bay Area Boxing. 15 years. 5 stars. Belmont's gym. 📍 210 El Camino Real",
      "Boxing. Muay Thai. BJJ. Strength. All in one place. Bay Area Boxing, Belmont. 📍 210 El Camino Real",
    ]
  };

  const opts = captions[category] || captions['Miscellaneous'];
  const idx = parseInt(filename.replace(/\D/g, '') || '0') % opts.length;
  return opts[idx];
}

const caption = generateCaption(category, photoName);

// Save pending approval to state
state.pendingApproval = { photo: photoPath, caption, category, sentAt: new Date().toISOString() };
fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));

console.log(`Next photo: ${photoName} (${category})`);
console.log(`Caption: ${caption}`);
console.log('State saved — send Telegram preview and wait for approval.');
console.log(`PHOTO_PATH=${photoPath}`);
console.log(`CAPTION=${caption}`);
