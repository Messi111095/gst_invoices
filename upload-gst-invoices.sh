#!/bin/bash
set -e

git init

git add .
git commit -m "commit message"

git remote add origin https://github.com/Messi111095/gst_invoices.git

git push -u origin main

git checkout -b my-new-branch

git add .
git commit -m "New branch"

git push -u origin my-new-branch

echo "Upload completed successfully."