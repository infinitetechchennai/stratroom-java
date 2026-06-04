import re

file_path = r'C:\Users\sibi\Desktop\Stratroom-Source\db-service\src\main\java\com\estrat\service\db\service\EmployeeService.java'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

def stub_method(content, method_name, return_type, default_return):
    pattern = r'((?:public|private|protected)\s+' + return_type + r'\s+' + method_name + r'\s*\([^\)]*\)\s*\{)'
    # Find all matches
    matches = list(re.finditer(pattern, content))
    if not matches:
        return content
    
    # Process from last to first so indices don't change
    for match in reversed(matches):
        start_idx = match.end()
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
            new_body = f"\n        return {default_return};\n    " if default_return else f"\n        return;\n    "
            content = content[:start_idx] + new_body + content[end_idx:]
    return content

content = stub_method(content, 'removeEmployeeDepartmentMapping', 'void', '')
content = stub_method(content, 'buildAllReporteeList', 'List<Employee>', 'new java.util.ArrayList<>()')
content = stub_method(content, 'getOrgList', 'List<OrganizationDetails>', 'new java.util.ArrayList<>()')
content = stub_method(content, 'departmentByEmployeeList', 'List<EmployeeDepartmentMappingDTO>', 'new java.util.ArrayList<>()')
content = stub_method(content, 'departmentByEmployeeList', 'DepartmentResponseDetailsDTO', 'null')
content = stub_method(content, 'getDepartmentHierarchyList', 'DepartmentResponseDetailsDTO', 'null')
content = stub_method(content, 'getSuperUserDepartmentHierarchyList', 'DepartmentResponseDetailsDTO', 'null')
content = stub_method(content, 'getYearsForDropdown', 'List<Integer>', 'new java.util.ArrayList<>()')
content = stub_method(content, 'getMappingList', 'List<EmployeeDepartmentMappingDTO>', 'new java.util.ArrayList<>()')
content = stub_method(content, 'getDepartmentChildList', 'List<DepartmentResponseDetailsDTO>', 'new java.util.ArrayList<>()')
content = stub_method(content, 'saveRemoveOwner', 'void', '')
content = stub_method(content, 'deleteUserDeptMapping', 'void', '')
content = stub_method(content, 'getEmployeeDepartments', 'List<EmployeeDepartmentMappingDTO>', 'new java.util.ArrayList<>()')
content = stub_method(content, 'getDepartmentDetails', 'DepartmentResponseDetailsDTO', 'null')

# Write back
with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
