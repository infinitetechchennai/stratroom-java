import re
path = r'd:\java-migration\orgstructurev2.sql'
with open(path, 'r', encoding='utf-8', errors='ignore') as f:
    for line in f:
        if 'INSERT INTO `module_details` VALUES' in line:
            body = line.split('VALUES', 1)[1].strip().rstrip(';')
            parts = body.split('),(')
            parts[0] = parts[0].lstrip('(')
            parts[-1] = parts[-1].rstrip(')')
            rows = []
            for p in parts:
                p = p.strip('()')
                m = re.match(r"(\d+),'((?:''|[^'])*)','((?:''|[^'])*)'", p)
                if m:
                    rows.append((m.group(2).replace("''", "'"), m.group(3).replace("''", "'")))
                else:
                    m2 = re.match(r"(\d+),'((?:''|[^'])*)',NULL", p)
                    if m2:
                        rows.append((m2.group(2).replace("''", "'"), None))
            print('count', len(rows))
            for a, b in rows:
                print(repr((a, b)))
            break
