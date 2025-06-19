#!/bin/bash
cd /home/kavia/workspace/code-generation/medilocate-64176-bfbb0b7f/medi_locate_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

