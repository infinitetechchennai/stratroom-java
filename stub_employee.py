import re

file_path = r'C:\Users\sibi\Desktop\Stratroom-Source\db-service\src\main\java\com\estrat\service\db\service\EmployeeService.java'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

def stub_method(content, method_name, return_type, default_return):
    # Find the method start
    pattern = r'(public\s+' + return_type + r'\s+' + method_name + r'\s*\([^\)]*\)\s*\{)'
    match = re.search(pattern, content)
    if not match:
        return content
    
    start_idx = match.end()
    
    # Find the matching closing brace
    brace_count = 1
    idx = start_idx
    while idx < len(content) and brace_count > 0:
        if content[idx] == '{':
            brace_count += 1
        elif content[idx] == '}':
            brace_count -= 1
        idx += 1
        
    if brace_count == 0:
        end_idx = idx - 1
        new_body = f"\n        return {default_return};\n    "
        return content[:start_idx] + new_body + content[end_idx:]
    return content

content = stub_method(content, 'getDepartmentResponseDetails', 'List<DepartmentResponseDetailsDTO>', 'new java.util.ArrayList<>()')
content = stub_method(content, 'saveEmployeeDepartmentMapping', 'void', '')
content = stub_method(content, 'getDepartmentDetails', 'DepartmentResponseDetailsDTO', 'null')
content = stub_method(content, 'getAllDepartment', 'List<OrganizationDetails>', 'new java.util.ArrayList<>()')
content = stub_method(content, 'getEmployeeDepartments', 'List<EmployeeDepartmentMappingDTO>', 'new java.util.ArrayList<>()')

# Write back
with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
