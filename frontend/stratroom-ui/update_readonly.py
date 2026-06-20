import os, glob, re

dirs = [
  'D:/Stratroom-Source/Stratroom-Source/stratroom-ui/src/components/scorecard/modals',
  'D:/Stratroom-Source/Stratroom-Source/stratroom-ui/src/pages/scorecard_temp/modals',
  'D:/Stratroom-Source/Stratroom-Source/stratroom-ui/src/pages/scorecard/modals'
]

for d in dirs:
    if not os.path.exists(d): continue
    for f in os.listdir(d):
        if not f.endswith('.jsx'): continue
        filepath = os.path.join(d, f)
        with open(filepath, 'r', encoding='utf-8') as file:
            content = file.read()
        
        # Replace inputs
        new_content = re.sub(
            r'(<input type="text" className="form-control" id="[^"]+" placeholder="(?:Performance|Year To Date[^"]*)" aria-label="" aria-describedby="button-addon2") />',
            r'\1 readOnly />',
            content
        )
        
        if content != new_content:
            with open(filepath, 'w', encoding='utf-8') as file:
                file.write(new_content)
            print('Updated', filepath)
