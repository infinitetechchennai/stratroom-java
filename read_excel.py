import pandas as pd
import sys

file_path = '/Users/pradeep/Desktop/stratroom-java_1/stratroom-java/Scorecard_Business Logic.xlsx'

try:
    xls = pd.ExcelFile(file_path)
    print(f"Total Sheets: {len(xls.sheet_names)}")
    print(f"Sheet Names: {xls.sheet_names}\n")

    for sheet in xls.sheet_names:
        print(f"--- Sheet: {sheet} ---")
        df = pd.read_excel(xls, sheet_name=sheet)
        print(df.head(20).to_string(index=False))
        print("\n")
except Exception as e:
    print(f"Error reading Excel file: {e}")
