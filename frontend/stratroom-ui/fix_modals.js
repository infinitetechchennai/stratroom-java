const fs = require('fs');
const path = require('path');

const dirs = [
  'D:/Stratroom-Source/Stratroom-Source/stratroom-ui/src/pages/scorecard_temp/modals',
  'D:/Stratroom-Source/Stratroom-Source/stratroom-ui/src/pages/scorecard/modals'
];

dirs.forEach(dir => {
  if(!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));
  for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    let originalContent = content;
    
    // Check if it has row col-md-12
    if (content.includes('className="row col-md-12"')) {
      // Replace textarea container
      content = content.replace(
        /<div className="row col-md-12">(\s*<textarea)/g,
        '<div className="mb-3 w-100">$1'
      );
      
      // Replace buttons container
      content = content.replace(
        /<div className="row col-md-12">(\s*<button\s+type="button"\s+className="opr)/g,
        '<div className="mb-3 w-100" style={{ display: \'flex\', flexWrap: \'wrap\', gap: \'8px\' }}>$1'
      );

      // In some modals the button doesn't have className="opr" on the very first line, wait, let's look:
      // <button type="button" className="opr btn btn-secondary"
      // They do. Let's just use `<button` to be safe, but there might be other buttons.
      // Wait, let's use:
      content = content.replace(
        /<div className="row col-md-12">(\s*<button)/g,
        '<div className="mb-3 w-100" style={{ display: \'flex\', flexWrap: \'wrap\', gap: \'8px\' }}>$1'
      );
      
      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Updated ' + filePath);
      }
    }
  }
});
