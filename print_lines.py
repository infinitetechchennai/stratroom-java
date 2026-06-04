import os

def print_lines(filepath, lines_to_print):
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    print(f"--- {os.path.basename(filepath)} ---")
    for l in lines_to_print:
        print(f"{l}: {lines[l-1].rstrip()}")

kpi = 'c:/Users/sibi/Desktop/Stratroom-Source/scorecard-service/src/main/java/com/estrat/scorecard/service/KPIService.java'
print_lines(kpi, [611, 846, 906, 928, 929, 1239, 1249, 1259, 1269])

data = 'c:/Users/sibi/Desktop/Stratroom-Source/scorecard-service/src/main/java/com/estrat/scorecard/util/DataUtil.java'
print_lines(data, [570, 675, 680, 700, 705, 724, 729, 851])

kpiutil = 'c:/Users/sibi/Desktop/Stratroom-Source/scorecard-service/src/main/java/com/estrat/scorecard/util/KPIUtil.java'
print_lines(kpiutil, [235, 538, 618, 626, 681, 706, 742, 866, 1157, 1189, 1220, 1225, 1226])

