import pandas as pd
import sys

file_path = '/Users/pradeep/Desktop/stratroom-java_1/stratroom-java/Scorecard_Business Logic.xlsx'

try:
    xls = pd.ExcelFile(file_path)
    
    print("=== SCORECARD BUSINESS LOGIC - OVERALL CONCEPT ANALYSIS ===")
    print(f"Total Sheets: {len(xls.sheet_names)}\n")
    
    for sheet in xls.sheet_names:
        print(f"\n--- Sheet: {sheet} ---")
        df = pd.read_excel(xls, sheet_name=sheet)
        if len(df.columns) > 0:
            print("Columns/Headers:", list(df.columns))
            # print the first row as an example concept
            print("Concept row example:")
            print(df.head(1).to_dict(orient='records'))
        else:
            print("Empty sheet.")
            
except Exception as e:
    print(f"Error reading Excel file: {e}")
