const fs = require('fs');
const path = require('path');

const src = '/Users/pradeep/Downloads/mg-portal-new-11-06-2026';
const dest = '/Users/pradeep/Desktop/strat_final/stratroom-java/frontend/stratroom-ui/public/kpi-test';

fs.cp(src, dest, { recursive: true }, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('success!');
  }
});
