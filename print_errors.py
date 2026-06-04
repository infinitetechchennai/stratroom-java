import re
import os

maven_output = """
[ERROR] /C:/Users/sibi/Desktop/Stratroom-Source/scorecard-service/src/main/java/com/estrat/scorecard/service/KPIService.java:[846,58] incompatible types: java.lang.Object cannot be converted to java.util.Map
[ERROR] /C:/Users/sibi/Desktop/Stratroom-Source/scorecard-service/src/main/java/com/estrat/scorecard/service/KPIService.java:[852,136] cannot find symbol
[ERROR] /C:/Users/sibi/Desktop/Stratroom-Source/scorecard-service/src/main/java/com/estrat/scorecard/service/KPIService.java:[852,112] incompatible types: cannot infer type-variable(s) T,K,U
[ERROR] /C:/Users/sibi/Desktop/Stratroom-Source/scorecard-service/src/main/java/com/estrat/scorecard/service/KPIService.java:[929,135] cannot find symbol
[ERROR] /C:/Users/sibi/Desktop/Stratroom-Source/scorecard-service/src/main/java/com/estrat/scorecard/service/KPIService.java:[929,190] cannot find symbol
[ERROR] /C:/Users/sibi/Desktop/Stratroom-Source/scorecard-service/src/main/java/com/estrat/scorecard/util/DataUtil.java:[570,62] incompatible types: java.util.LinkedHashSet<java.lang.Object> cannot be converted to java.util.List<java.lang.String>
[ERROR] /C:/Users/sibi/Desktop/Stratroom-Source/scorecard-service/src/main/java/com/estrat/scorecard/util/DataUtil.java:[676,94] cannot find symbol
[ERROR] /C:/Users/sibi/Desktop/Stratroom-Source/scorecard-service/src/main/java/com/estrat/scorecard/util/DataUtil.java:[681,87] cannot find symbol
[ERROR] /C:/Users/sibi/Desktop/Stratroom-Source/scorecard-service/src/main/java/com/estrat/scorecard/util/DataUtil.java:[701,94] cannot find symbol
[ERROR] /C:/Users/sibi/Desktop/Stratroom-Source/scorecard-service/src/main/java/com/estrat/scorecard/util/DataUtil.java:[706,87] cannot find symbol
[ERROR] /C:/Users/sibi/Desktop/Stratroom-Source/scorecard-service/src/main/java/com/estrat/scorecard/util/DataUtil.java:[725,94] cannot find symbol
[ERROR] /C:/Users/sibi/Desktop/Stratroom-Source/scorecard-service/src/main/java/com/estrat/scorecard/util/DataUtil.java:[730,87] cannot find symbol
[ERROR] /C:/Users/sibi/Desktop/Stratroom-Source/scorecard-service/src/main/java/com/estrat/scorecard/util/DataUtil.java:[852,87] cannot find symbol
[ERROR] /C:/Users/sibi/Desktop/Stratroom-Source/scorecard-service/src/main/java/com/estrat/scorecard/util/KPIUtil.java:[1337,109] incompatible types: bad type in conditional expression
[ERROR] /C:/Users/sibi/Desktop/Stratroom-Source/scorecard-service/src/main/java/com/estrat/scorecard/util/KPIUtil.java:[1337,176] incompatible types: bad type in conditional expression
[ERROR] /C:/Users/sibi/Desktop/Stratroom-Source/scorecard-service/src/main/java/com/estrat/scorecard/util/KPIUtil.java:[1435,33] incompatible types: java.lang.Object cannot be converted to java.lang.Long
[ERROR] /C:/Users/sibi/Desktop/Stratroom-Source/scorecard-service/src/main/java/com/estrat/scorecard/util/KPIUtil.java:[1439,36] incompatible types: java.util.ArrayList<java.lang.Long> cannot be converted to java.util.List<java.lang.Object>
[ERROR] /C:/Users/sibi/Desktop/Stratroom-Source/scorecard-service/src/main/java/com/estrat/scorecard/util/KPIUtil.java:[1737,33] incompatible types: java.lang.Object cannot be converted to java.util.Map
[ERROR] /C:/Users/sibi/Desktop/Stratroom-Source/scorecard-service/src/main/java/com/estrat/scorecard/util/KPIUtil.java:[1850,47] incompatible types: java.lang.Object cannot be converted to java.lang.String
[ERROR] /C:/Users/sibi/Desktop/Stratroom-Source/scorecard-service/src/main/java/com/estrat/scorecard/util/KPIUtil.java:[1925,47] incompatible types: java.lang.Object cannot be converted to java.lang.String
[ERROR] /C:/Users/sibi/Desktop/Stratroom-Source/scorecard-service/src/main/java/com/estrat/scorecard/util/KPIUtil.java:[1995,47] incompatible types: java.lang.Object cannot be converted to java.lang.String
[ERROR] /C:/Users/sibi/Desktop/Stratroom-Source/scorecard-service/src/main/java/com/estrat/scorecard/util/KPIUtil.java:[2078,33] incompatible types: java.lang.Object cannot be converted to java.util.Map
[ERROR] /C:/Users/sibi/Desktop/Stratroom-Source/scorecard-service/src/main/java/com/estrat/scorecard/util/KPIUtil.java:[3057,46] incompatible types: java.lang.Object cannot be converted to com.estrat.scorecard.dto.InitiativesDTO
[ERROR] /C:/Users/sibi/Desktop/Stratroom-Source/scorecard-service/src/main/java/com/estrat/scorecard/util/KPIUtil.java:[3105,32] incompatible types: java.lang.Object cannot be converted to com.estrat.scorecard.dto.RiskDTO
[ERROR] /C:/Users/sibi/Desktop/Stratroom-Source/scorecard-service/src/main/java/com/estrat/scorecard/util/KPIUtil.java:[3519,108] incompatible types: java.util.HashMap<java.lang.String,java.util.List> cannot be converted to java.util.Map<java.lang.String,java.util.List<java.lang.Object>>
[ERROR] /C:/Users/sibi/Desktop/Stratroom-Source/scorecard-service/src/main/java/com/estrat/scorecard/util/KPIUtil.java:[3557,106] incompatible types: java.lang.Object cannot be converted to java.lang.String
[ERROR] /C:/Users/sibi/Desktop/Stratroom-Source/scorecard-service/src/main/java/com/estrat/scorecard/util/KPIUtil.java:[3557,127] incompatible types: java.lang.Object cannot be converted to java.util.List
[ERROR] /C:/Users/sibi/Desktop/Stratroom-Source/scorecard-service/src/main/java/com/estrat/scorecard/util/KPIUtil.java:[3803,30] incompatible types: java.lang.Object cannot be converted to java.lang.String
[ERROR] /C:/Users/sibi/Desktop/Stratroom-Source/scorecard-service/src/main/java/com/estrat/scorecard/util/KPIUtil.java:[3822,31] incompatible types: java.util.ArrayList<java.util.Date> cannot be converted to java.util.List<java.lang.Object>
[ERROR] /C:/Users/sibi/Desktop/Stratroom-Source/scorecard-service/src/main/java/com/estrat/scorecard/util/DateUtil.java:[319,49] incompatible types: java.lang.Object cannot be converted to java.lang.String
[ERROR] /C:/Users/sibi/Desktop/Stratroom-Source/scorecard-service/src/main/java/com/estrat/scorecard/util/DateUtil.java:[340,49] incompatible types: java.lang.Object cannot be converted to java.lang.String
[ERROR] /C:/Users/sibi/Desktop/Stratroom-Source/scorecard-service/src/main/java/com/estrat/scorecard/util/DateUtil.java:[602,54] incompatible types: java.lang.Object cannot be converted to java.lang.String
[ERROR] /C:/Users/sibi/Desktop/Stratroom-Source/scorecard-service/src/main/java/com/estrat/scorecard/service/InitiativeService.java:[149,116] incompatible types: java.util.HashMap<java.lang.String,java.lang.Long> cannot be converted to java.util.Map<java.lang.String,java.util.Object>
[ERROR] /C:/Users/sibi/Desktop/Stratroom-Source/scorecard-service/src/main/java/com/estrat/scorecard/service/InitiativeService.java:[151,178] cannot find symbol
[ERROR] /C:/Users/sibi/Desktop/Stratroom-Source/scorecard-service/src/main/java/com/estrat/scorecard/service/InitiativeService.java:[181,50] incompatible types: java.lang.Object cannot be converted to com.estrat.scorecard.dto.InitiativesDTO
[ERROR] /C:/Users/sibi/Desktop/Stratroom-Source/scorecard-service/src/main/java/com/estrat/scorecard/service/InitiativeService.java:[290,116] incompatible types: java.util.HashMap<java.lang.String,java.lang.Long> cannot be converted to java.util.Map<java.lang.String,java.util.Object>
[ERROR] /C:/Users/sibi/Desktop/Stratroom-Source/scorecard-service/src/main/java/com/estrat/scorecard/service/InitiativeService.java:[292,178] cannot find symbol
[ERROR] /C:/Users/sibi/Desktop/Stratroom-Source/scorecard-service/src/main/java/com/estrat/scorecard/service/InitiativeService.java:[304,50] incompatible types: java.lang.Object cannot be converted to com.estrat.scorecard.dto.InitiativesDTO
[ERROR] /C:/Users/sibi/Desktop/Stratroom-Source/scorecard-service/src/main/java/com/estrat/scorecard/service/InitiativeService.java:[380,116] incompatible types: java.util.HashMap<java.lang.String,java.lang.Long> cannot be converted to java.util.Map<java.lang.String,java.util.Object>
"""

for line in maven_output.splitlines():
    if not line.strip(): continue
    m = re.match(r'\[ERROR\] (.*?):\[(\d+),\d+\] (.*)', line)
    if m:
        path = m.group(1).strip()
        if path.startswith('/C:'): path = path[1:]
        line_num = int(m.group(2))
        err = m.group(3)
        with open(path, 'r', encoding='utf-8') as f:
            lines = f.readlines()
        print(f"--- {os.path.basename(path)}:{line_num} | {err}")
        print(f"{lines[line_num-1].rstrip()}")
