const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
  page.on('pageerror', err => console.log('BROWSER ERROR:', err));

  await page.goto('http://localhost:5173/scorecard?pageId=1');
  await page.waitForTimeout(5000); // Wait for load

  console.log("Checking window.bootstrap.Modal...");
  const hasModal = await page.evaluate(() => typeof window.bootstrap?.Modal);
  console.log("window.bootstrap.Modal is:", hasModal);

  console.log("Checking window.scorecardActions...");
  const hasActions = await page.evaluate(() => typeof window.scorecardActions);
  console.log("window.scorecardActions is:", hasActions);

  if (hasActions === 'object') {
    console.log("Attempting to run openAddObjective...");
    await page.evaluate(() => window.scorecardActions.openAddObjective('test-id'));
    await page.waitForTimeout(1000);
    
    const isModalVisible = await page.evaluate(() => {
      const el = document.getElementById('objective-add-modal');
      return el && el.classList.contains('show');
    });
    console.log("Objective Add Modal is visible?", isModalVisible);
  }

  await browser.close();
})();
