#!/bin/bash
rm -rf ./dist || true
npm i
npm run build
