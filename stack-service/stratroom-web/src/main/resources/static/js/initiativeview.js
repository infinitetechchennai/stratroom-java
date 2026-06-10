var initiativedeletepermission = false;
var initiativeviewpermission = false;
var initiativeloadcontent = false;
var initiativecreatepermission = false;
var initiativeeditpermission = false;
var lookup = {};
var subInitiativeIdValue = "";
var activityIdDataValue = ''
var activityresponseData = {}
var subinitiativeResponseData = {}
var findsuInitiativeData = {}
var reporteelist = [];
// $(document).ready(function() {
//     loadInitiatives();
// });
let iniurlparams = new URL(document.location).searchParams;
let pageId = iniurlparams.get("pageId");

function generateAvatar(name) {
    if (!name) name = "User";

    let initials = name.trim().substring(0,2).toUpperCase();

    let svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30">
        <rect width="100%" height="100%" fill="#A94136"/>
        <text x="50%" y="50%" dy=".35em" text-anchor="middle"
            fill="#ffffff"
            font-family="Arial"
            font-size="16"
            font-weight="600">
            ${initials}
        </text>
    </svg>`;

    return "data:image/svg+xml;base64," + btoa(svg);
}

function generateAvatarsubInitiative(name) {
    if (!name) name = "User";

    let initials = name.trim().substring(0,2).toUpperCase();

    let svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
        <rect width="100%" height="100%" fill="#A94136"/>
        <text x="50%" y="50%" dy=".35em" text-anchor="middle"
            fill="#ffffff"
            font-family="Arial"
            font-size="12"
            font-weight="600">
            ${initials}
        </text>
    </svg>`;

    return "data:image/svg+xml;base64," + btoa(svg);
}

function loadInitiatives(data , result) { 
    const resultttt = {
    "id": 54,
    "initiativeValue": {
        "daysRemaining": 364,
        "createdByName": "Nizam Goolam",
        "impactDesc": "NA",
        "blank": false,
        "statusType": "weighted",
        "totalBudget": 520,
        "statusIndicator": "GREEN",
        "impactId": [
            "2332",
            "2333",
            "2334"
        ],
        "actualdaterange": "",
        "description": "NA",
        "BalCurr": "$",
        "perspectiveName": "Enabled Regulatory Environment",
        "total": false,
        "balance": false,
        "ownerName": "Nizam Goolam",
        "statusLight": "progress-bar progress-bar-success width-per-85 rounded-pill bar_height",
        "Utilized": "44",
        "targetValue": 7.97,
        "utilized": false,
        "budget": false,
        "objectiveDesc": "Improve Regulatory Services (Delivering Effective & Responsive Service ",
        "actual": false,
        "daterange": "04/01/2026 - 03/31/2027",
        "kpi": [
            {
                "id": "2332",
                "name": " Charter developed and approved within the set timeline"
            },
            {
                "id": "2333",
                "name": " % of internal and external stakeholders sensitized on Charter standards"
            },
            {
                "id": "2334",
                "name": " % compliance with service charter standards"
            }
        ],
        "progressval": "48",
        "updatedByName": "Nizam Goolam",
        "actualValue": "48",
        "dateString": "01 Apr 2026 - 31 Mar 2027",
        "forecast": false,
        "dept": "CEO OFFICE",
        "target": false,
        "categoryType": "",
        "totalActual": 50,
        "TotCurr": "0",
        "Total": "44",
        "name": "Enhance client services",
        "utilizedCurr": "$"
    },
    "subInitiativeList": [
        {
            "id": 80,
            "active": 0,
            "subInitiativeValue": {
                "createdByName": null,
                "multipleowners": "2237",
                "contribution": "48",
                "performance": "Test Observations and recomendations Today",
                "ownerName": "Nizam Goolam",
                "dateRange": "04/01/2026 - 03/31/2027",
                "progressval": "15.0",
                "updatedByName": "Nizam Goolam",
                "name": "",
                "description": "Develop a comprehensive Client Service Charter outlining service standards and turnaround times",
                "impremark": "Test Remarks Today",
                "targetValue": 7.97,
                "statusLight": "progress-bar-success width-per-100 rounded-pill bar_height",
                "statusIndicator": "GREEN"
            },
            "createdTime": "2026-03-13T10:53:15",
            "updatedTime": "2026-04-02T03:57:02",
            "owner": 2241,
            "initiativeId": 54,
            "createdBy": 3706,
            "updatedBy": 2241,
            "activitiesList": [
                {
                    "id": 185,
                    "active": 0,
                    "activitiesValue": {
                        "actual": "",
                        "createdByName": "Nizam Goolam",
                        "subInitiativeName": "Develop a comprehensive Client Service Charter outlining service standards and turnaround times",
                        "multipleowners": "2241",
                        "ownerName": "Nizam Goolam",
                        "dateRange": "07/01/2026 - 09/31/2026",
                        "progressval": "0",
                        "updatedByName": "Nizam Goolam",
                        "name": "",
                        "progress": "15",
                        "desc": "Define draft service categories and performance commitments",
                        "budget": ""
                    },
                    "createdTime": "2026-03-13T10:53:16",
                    "updatedTime": "2026-04-01T06:48:45",
                    "owner": 2241,
                    "initiativeId": 54,
                    "createdBy": 3706,
                    "updatedBy": 2241,
                    "subInitiativeId": "80",
                    "userMapApprove": false,
                    "activitiesMapDTOList": [
                        {
                            "id": 5902,
                            "activitiesId": 185,
                            "active": 0,
                            "empId": 0,
                            "employeeProfilePos": {
                                "empId": 2241,
                                "orgId": {
                                    "id": 4,
                                    "name": "LCA",
                                    "status": "Active"
                                },
                                "firstName": "Nizam Goolam",
                                "lastName": null,
                                "userRole": 0,
                                "profileImage": "",
                                "parentEmpId": 0,
                                "department": "CEO OFFICE",
                                "title": null,
                                "location": "",
                                "emailAddress": "ngoolam@lca.org.ls",
                                "createdDate": null
                            }
                        }
                    ],
                    "subActivityList": [
                        {
                            "id": 2,
                            "active": 0,
                            "activitiesValue": {
                                "actual": "30",
                                "createdByName": "Nizam Goolam",
                                "ownerName": "Nizam Goolam",
                                "dateRange": "04/01/2026,04/24/2026",
                                "progressval": "0",
                                "name": "",
                                "progress": "20",
                                "desc": "sub activity test",
                                "budget": "20"
                            },
                            "createdTime": "2026-04-02T08:02:42",
                            "updatedTime": null,
                            "owner": 2241,
                            "activitieId": 185,
                            "createdBy": 2241,
                            "updatedBy": 0
                        }
                    ]
                },
                {
                    "id": 186,
                    "active": 0,
                    "activitiesValue": {
                        "actual": "",
                        "createdByName": "Nizam Goolam",
                        "subInitiativeName": "Develop a comprehensive Client Service Charter outlining service standards and turnaround times",
                        "multipleowners": "2241",
                        "ownerName": "Nizam Goolam",
                        "dateRange": "10/01/2026 - 12/31/2026",
                        "progressval": "0",
                        "updatedByName": "Nizam Goolam",
                        "name": "",
                        "progress": "15",
                        "desc": "Prepare detailed client service charter document",
                        "budget": ""
                    },
                    "createdTime": "2026-03-13T10:53:17",
                    "updatedTime": "2026-04-01T06:49:15",
                    "owner": 2241,
                    "initiativeId": 54,
                    "createdBy": 3706,
                    "updatedBy": 2241,
                    "subInitiativeId": "80",
                    "userMapApprove": false,
                    "activitiesMapDTOList": [
                        {
                            "id": 5903,
                            "activitiesId": 186,
                            "active": 0,
                            "empId": 0,
                            "employeeProfilePos": {
                                "empId": 2241,
                                "orgId": {
                                    "id": 4,
                                    "name": "LCA",
                                    "status": "Active"
                                },
                                "firstName": "Nizam Goolam",
                                "lastName": null,
                                "userRole": 0,
                                "profileImage": "",
                                "parentEmpId": 0,
                                "department": "CEO OFFICE",
                                "title": null,
                                "location": "",
                                "emailAddress": "ngoolam@lca.org.ls",
                                "createdDate": null
                            }
                        }
                    ],
                    "subActivityList": []
                }
            ],
            "subInitiativesMapDTOList": [
                {
                    "id": 6139,
                    "subInitiativeId": 80,
                    "active": 0,
                    "empId": 2237,
                    "employeeProfilePos": {
                        "empId": 2237,
                        "orgId": {
                            "id": 4,
                            "name": "LCA",
                            "status": "Active"
                        },
                        "firstName": "Themba Tšita",
                        "lastName": null,
                        "userRole": 0,
                        "profileImage": "",
                        "parentEmpId": 0,
                        "department": "Risk",
                        "title": null,
                        "location": "Lesotho",
                        "emailAddress": "ttsita@lca.org.ls",
                        "createdDate": null
                    }
                }
            ],
            "userMapApprove": false
        }
    ],
    "activitiesList": [
        {
            "id": 179,
            "active": 0,
            "activitiesValue": {
                "actual": "",
                "createdByName": null,
                "subInitiativeName": "Develop a comprehensive Client Service Charter outlining service standards and turnaround times",
                "multipleowners": "2234,2237,2238",
                "ownerName": "Nizam Goolam",
                "dateRange": "04/01/2026 - 06/31/2026",
                "progressval": "0",
                "updatedByName": "Nizam Goolam",
                "name": "",
                "progress": "50",
                "desc": "Define objectives, scope and principles of client service charter",
                "budget": ""
            },
            "createdTime": "2026-03-13T10:53:15",
            "updatedTime": "2026-03-30T10:47:42",
            "owner": 2241,
            "initiativeId": 54,
            "createdBy": 3706,
            "updatedBy": 2241,
            "subInitiativeId": "0",
            "userMapApprove": false,
            "activitiesMapDTOList": [
                {
                    "id": 5859,
                    "activitiesId": 179,
                    "active": 0,
                    "empId": 0,
                    "employeeProfilePos": {
                        "empId": 2234,
                        "orgId": {
                            "id": 4,
                            "name": "LCA",
                            "status": "Active"
                        },
                        "firstName": "Masechaba Qathatsi",
                        "lastName": null,
                        "userRole": 0,
                        "profileImage": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gIoSUNDX1BST0ZJTEUAAQEAAAIYAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAAHRyWFlaAAABZAAAABRnWFlaAAABeAAAABRiWFlaAAABjAAAABRyVFJDAAABoAAAAChnVFJDAAABoAAAAChiVFJDAAABoAAAACh3dHB0AAAByAAAABRjcHJ0AAAB3AAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAFgAAAAcAHMAUgBHAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z3BhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABYWVogAAAAAAAA9tYAAQAAAADTLW1sdWMAAAAAAAAAAQAAAAxlblVTAAAAIAAAABwARwBvAG8AZwBsAGUAIABJAG4AYwAuACAAMgAwADEANv/bAEMAAwICAwICAwMDAwQDAwQFCAUFBAQFCgcHBggMCgwMCwoLCw0OEhANDhEOCwsQFhARExQVFRUMDxcYFhQYEhQVFP/bAEMBAwQEBQQFCQUFCRQNCw0UFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFP/AABEIAB0AHgMBIgACEQEDEQH/xAAaAAEAAgMBAAAAAAAAAAAAAAAGBwgCAwQF/8QAJBAAAQMEAQQDAQAAAAAAAAAAAQIDBAAFESExBhITQQdRYSL/xAAZAQACAwEAAAAAAAAAAAAAAAAEBQIDBgf/xAAcEQACAgMBAQAAAAAAAAAAAAAAAgERAxIhMVH/2gAMAwEAAhEDEQA/AK/sxnJR/kZH4OK6Woq2VYII3yeaRWm2hplOdH6I5rc5bvLNAAG8ZyK1uk0cwZ+mFlsjs0jxtlRzgke6ka1dLSxEQPF+8Up+NOmY64HeUDvyCSff3Uu2+0R4kVCUspVrkii0xcsT5s/aKdW4lyQgdw7Ad7pAWm2yXMAexkUKt0pbToUN5PFL7e4ZSm0r4Ud1UvwPe4kQdPdcSLSw403sZyKY2z5fksxQHBlwHZ516rzVdLQ2IKVpBz2iiU+Ohp8pSMAVOJaBc2rz4f/Z",
                        "parentEmpId": 0,
                        "department": "Executive Secretary ",
                        "title": null,
                        "location": "Lesotho",
                        "emailAddress": "mqathatsi@lca.org.ls",
                        "createdDate": null
                    }
                },
                {
                    "id": 5861,
                    "activitiesId": 179,
                    "active": 0,
                    "empId": 0,
                    "employeeProfilePos": {
                        "empId": 2237,
                        "orgId": {
                            "id": 4,
                            "name": "LCA",
                            "status": "Active"
                        },
                        "firstName": "Themba Tšita",
                        "lastName": null,
                        "userRole": 0,
                        "profileImage": "",
                        "parentEmpId": 0,
                        "department": "Risk",
                        "title": null,
                        "location": "Lesotho",
                        "emailAddress": "ttsita@lca.org.ls",
                        "createdDate": null
                    }
                },
                {
                    "id": 5860,
                    "activitiesId": 179,
                    "active": 0,
                    "empId": 0,
                    "employeeProfilePos": {
                        "empId": 2238,
                        "orgId": {
                            "id": 4,
                            "name": "LCA",
                            "status": "Active"
                        },
                        "firstName": "Lefu Mothibeli",
                        "lastName": null,
                        "userRole": 0,
                        "profileImage": "",
                        "parentEmpId": 0,
                        "department": "Legal and Corporate Affairs",
                        "title": null,
                        "location": "Lesotho",
                        "emailAddress": "lmothibeli@lca.org.ls",
                        "createdDate": null
                    }
                }
            ],
            "subActivityList": []
        },
        {
            "id": 180,
            "active": 0,
            "activitiesValue": {
                "actual": "",
                "createdByName": null,
                "subInitiativeName": "Develop a comprehensive Client Service Charter outlining service standards and turnaround times",
                "multipleowners": "2241",
                "ownerName": "Nizam Goolam",
                "dateRange": "04/01/2026 - 06/31/2026",
                "progressval": "0",
                "updatedByName": "Nizam Goolam",
                "name": "",
                "progress": "100",
                "desc": "Review existing service delivery practices and internal procedures",
                "budget": ""
            },
            "createdTime": "2026-03-13T10:53:15",
            "updatedTime": "2026-03-30T12:51:08",
            "owner": 2241,
            "initiativeId": 54,
            "createdBy": 3706,
            "updatedBy": 2241,
            "subInitiativeId": "0",
            "userMapApprove": false,
            "activitiesMapDTOList": [
                {
                    "id": 5870,
                    "activitiesId": 180,
                    "active": 0,
                    "empId": 0,
                    "employeeProfilePos": {
                        "empId": 2241,
                        "orgId": {
                            "id": 4,
                            "name": "LCA",
                            "status": "Active"
                        },
                        "firstName": "Nizam Goolam",
                        "lastName": null,
                        "userRole": 0,
                        "profileImage": "",
                        "parentEmpId": 0,
                        "department": "CEO OFFICE",
                        "title": null,
                        "location": "",
                        "emailAddress": "ngoolam@lca.org.ls",
                        "createdDate": null
                    }
                }
            ],
            "subActivityList": []
        },
        {
            "id": 181,
            "active": 0,
            "activitiesValue": {
                "actual": "",
                "createdByName": null,
                "subInitiativeName": "Develop a comprehensive Client Service Charter outlining service standards and turnaround times",
                "multipleowners": "2238",
                "ownerName": "Nizam Goolam",
                "dateRange": "04/01/2026 - 06/31/2026",
                "progressval": "0",
                "updatedByName": "Nizam Goolam",
                "name": "",
                "progress": "100",
                "desc": "Identify services to be covered by the charter",
                "budget": ""
            },
            "createdTime": "2026-03-13T10:53:16",
            "updatedTime": "2026-03-31T11:44:14",
            "owner": 2241,
            "initiativeId": 54,
            "createdBy": 3706,
            "updatedBy": 2241,
            "subInitiativeId": "0",
            "userMapApprove": false,
            "activitiesMapDTOList": [
                {
                    "id": 5893,
                    "activitiesId": 181,
                    "active": 0,
                    "empId": 0,
                    "employeeProfilePos": {
                        "empId": 2238,
                        "orgId": {
                            "id": 4,
                            "name": "LCA",
                            "status": "Active"
                        },
                        "firstName": "Lefu Mothibeli",
                        "lastName": null,
                        "userRole": 0,
                        "profileImage": "",
                        "parentEmpId": 0,
                        "department": "Legal and Corporate Affairs",
                        "title": null,
                        "location": "Lesotho",
                        "emailAddress": "lmothibeli@lca.org.ls",
                        "createdDate": null
                    }
                }
            ],
            "subActivityList": []
        },
        {
            "id": 183,
            "active": 0,
            "activitiesValue": {
                "actual": "",
                "createdByName": null,
                "subInitiativeName": "Develop a comprehensive Client Service Charter outlining service standards and turnaround times",
                "multipleowners": "2237",
                "ownerName": "Nizam Goolam",
                "dateRange": "07/01/2026 - 09/31/2026",
                "progressval": "0",
                "updatedByName": "Themba Tšita",
                "name": "",
                "progress": "100",
                "desc": "Conduct baseline assessment of current services standards and turnaround times from all  the devotions",
                "budget": ""
            },
            "createdTime": "2026-03-13T10:53:16",
            "updatedTime": "2026-04-02T06:28:36",
            "owner": 2241,
            "initiativeId": 54,
            "createdBy": 3706,
            "updatedBy": 2237,
            "subInitiativeId": "0",
            "userMapApprove": false,
            "activitiesMapDTOList": [
                {
                    "id": 5918,
                    "activitiesId": 183,
                    "active": 0,
                    "empId": 0,
                    "employeeProfilePos": {
                        "empId": 2237,
                        "orgId": {
                            "id": 4,
                            "name": "LCA",
                            "status": "Active"
                        },
                        "firstName": "Themba Tšita",
                        "lastName": null,
                        "userRole": 0,
                        "profileImage": "",
                        "parentEmpId": 0,
                        "department": "Risk",
                        "title": null,
                        "location": "Lesotho",
                        "emailAddress": "ttsita@lca.org.ls",
                        "createdDate": null
                    }
                }
            ],
            "subActivityList": [
                {
                    "id": 1,
                    "active": 0,
                    "activitiesValue": {
                        "actual": "20",
                        "createdByName": "Nizam Goolam",
                        "ownerName": "Nizam Goolam",
                        "dateRange": "04/01/2026,04/30/2026",
                        "progressval": "0",
                        "name": "",
                        "progress": "10",
                        "desc": "Test Su Activity",
                        "budget": "500"
                    },
                    "createdTime": "2026-04-02T05:49:38",
                    "updatedTime": null,
                    "owner": 2241,
                    "activitieId": 183,
                    "createdBy": 2241,
                    "updatedBy": 0
                }
            ]
        },
        {
            "id": 184,
            "active": 0,
            "activitiesValue": {
                "actual": "",
                "createdByName": null,
                "subInitiativeName": "Develop a comprehensive Client Service Charter outlining service standards and turnaround times",
                "multipleowners": "2237",
                "ownerName": "Nizam Goolam",
                "dateRange": "07/01/2026 - 09/31/2026",
                "progressval": "0",
                "updatedByName": "Nizam Goolam",
                "name": "",
                "progress": "10",
                "desc": "Develop a client service charter framework",
                "budget": ""
            },
            "createdTime": "2026-03-13T10:53:16",
            "updatedTime": "2026-04-02T06:36:11",
            "owner": 2241,
            "initiativeId": 54,
            "createdBy": 3706,
            "updatedBy": 2241,
            "subInitiativeId": "0",
            "userMapApprove": false,
            "activitiesMapDTOList": [
                {
                    "id": 5921,
                    "activitiesId": 184,
                    "active": 0,
                    "empId": 0,
                    "employeeProfilePos": {
                        "empId": 2237,
                        "orgId": {
                            "id": 4,
                            "name": "LCA",
                            "status": "Active"
                        },
                        "firstName": "Themba Tšita",
                        "lastName": null,
                        "userRole": 0,
                        "profileImage": "",
                        "parentEmpId": 0,
                        "department": "Risk",
                        "title": null,
                        "location": "Lesotho",
                        "emailAddress": "ttsita@lca.org.ls",
                        "createdDate": null
                    }
                }
            ],
            "subActivityList": []
        },
        {
            "id": 185,
            "active": 0,
            "activitiesValue": {
                "actual": "",
                "createdByName": "Nizam Goolam",
                "subInitiativeName": "Develop a comprehensive Client Service Charter outlining service standards and turnaround times",
                "multipleowners": "2241",
                "ownerName": "Nizam Goolam",
                "dateRange": "07/01/2026 - 09/31/2026",
                "progressval": "0",
                "updatedByName": "Nizam Goolam",
                "name": "",
                "progress": "15",
                "desc": "Define draft service categories and performance commitments",
                "budget": ""
            },
            "createdTime": "2026-03-13T10:53:16",
            "updatedTime": "2026-04-01T06:48:45",
            "owner": 2241,
            "initiativeId": 54,
            "createdBy": 3706,
            "updatedBy": 2241,
            "subInitiativeId": "80",
            "userMapApprove": false,
            "activitiesMapDTOList": [
                {
                    "id": 5902,
                    "activitiesId": 185,
                    "active": 0,
                    "empId": 0,
                    "employeeProfilePos": {
                        "empId": 2241,
                        "orgId": {
                            "id": 4,
                            "name": "LCA",
                            "status": "Active"
                        },
                        "firstName": "Nizam Goolam",
                        "lastName": null,
                        "userRole": 0,
                        "profileImage": "",
                        "parentEmpId": 0,
                        "department": "CEO OFFICE",
                        "title": null,
                        "location": "",
                        "emailAddress": "ngoolam@lca.org.ls",
                        "createdDate": null
                    }
                }
            ],
            "subActivityList": [
                {
                    "id": 2,
                    "active": 0,
                    "activitiesValue": {
                        "actual": "30",
                        "createdByName": "Nizam Goolam",
                        "ownerName": "Nizam Goolam",
                        "dateRange": "04/01/2026,04/24/2026",
                        "progressval": "0",
                        "name": "",
                        "progress": "20",
                        "desc": "sub activity test",
                        "budget": "20"
                    },
                    "createdTime": "2026-04-02T08:02:42",
                    "updatedTime": null,
                    "owner": 2241,
                    "activitieId": 185,
                    "createdBy": 2241,
                    "updatedBy": 0
                }
            ]
        },
        {
            "id": 186,
            "active": 0,
            "activitiesValue": {
                "actual": "",
                "createdByName": "Nizam Goolam",
                "subInitiativeName": "Develop a comprehensive Client Service Charter outlining service standards and turnaround times",
                "multipleowners": "2241",
                "ownerName": "Nizam Goolam",
                "dateRange": "10/01/2026 - 12/31/2026",
                "progressval": "0",
                "updatedByName": "Nizam Goolam",
                "name": "",
                "progress": "15",
                "desc": "Prepare detailed client service charter document",
                "budget": ""
            },
            "createdTime": "2026-03-13T10:53:17",
            "updatedTime": "2026-04-01T06:49:15",
            "owner": 2241,
            "initiativeId": 54,
            "createdBy": 3706,
            "updatedBy": 2241,
            "subInitiativeId": "80",
            "userMapApprove": false,
            "activitiesMapDTOList": [
                {
                    "id": 5903,
                    "activitiesId": 186,
                    "active": 0,
                    "empId": 0,
                    "employeeProfilePos": {
                        "empId": 2241,
                        "orgId": {
                            "id": 4,
                            "name": "LCA",
                            "status": "Active"
                        },
                        "firstName": "Nizam Goolam",
                        "lastName": null,
                        "userRole": 0,
                        "profileImage": "",
                        "parentEmpId": 0,
                        "department": "CEO OFFICE",
                        "title": null,
                        "location": "",
                        "emailAddress": "ngoolam@lca.org.ls",
                        "createdDate": null
                    }
                }
            ],
            "subActivityList": []
        }
    ],
    "commentsList": [],
    "mileStonesList": [
        {
            "id": 259,
            "active": 0,
            "mileStonesValue": {
                "ownerName": "Nizam Goolam",
                "dateRange": " 06/31/2026",
                "progressval": "0",
                "updatedByName": "Nizam Goolam",
                "progress": "100",
                "desc": "Approved scoping report",
                "status": "completed",
                "statusLight": "progress-bar progress-bar-success width-per-85 rounded-pill bar_height",
                "statusIndicator": "GREEN"
            },
            "createdTime": "2026-03-13T10:53:17",
            "updatedTime": "2026-03-30T10:23:02",
            "owner": 2241,
            "initiativeId": 54,
            "createdBy": 3706,
            "updatedBy": 2241
        },
        {
            "id": 260,
            "active": 0,
            "mileStonesValue": {
                "ownerName": "Nizam Goolam",
                "dateRange": " 06/31/2026",
                "progressval": "0",
                "updatedByName": "Nizam Goolam",
                "progress": "100",
                "desc": "Workplan",
                "status": "completed",
                "statusLight": "progress-bar progress-bar-success width-per-85 rounded-pill bar_height",
                "statusIndicator": "GREEN"
            },
            "createdTime": "2026-03-13T10:53:17",
            "updatedTime": "2026-03-30T10:23:29",
            "owner": 2241,
            "initiativeId": 54,
            "createdBy": 3706,
            "updatedBy": 2241
        },
        {
            "id": 261,
            "active": 0,
            "mileStonesValue": {
                "ownerName": "thato Ponya",
                "dateRange": " 09/31/2026",
                "progressval": "0",
                "updatedByName": "thato Ponya",
                "progress": "100",
                "desc": "Consolidated baseline report",
                "status": "completed",
                "statusLight": "progress-bar progress-bar-success width-per-85 rounded-pill bar_height",
                "statusIndicator": "GREEN"
            },
            "createdTime": "2026-03-13T10:53:17",
            "updatedTime": "2026-03-30T10:38:45",
            "owner": 2282,
            "initiativeId": 54,
            "createdBy": 3706,
            "updatedBy": 2282
        },
        {
            "id": 262,
            "active": 0,
            "mileStonesValue": {
                "createdByName": null,
                "ownerName": "Nizam Goolam",
                "dateRange": "07/01/2026 - 09/31/2026",
                "progressval": "0",
                "name": "Validated proposed service standard metrics",
                "progress": 0,
                "desc": "Validated proposed service standard metrics",
                "status": "Pending",
                "statusLight": "progress-bar progress-bar-success width-per-85 rounded-pill bar_height",
                "statusIndicator": "GREEN"
            },
            "createdTime": "2026-03-13T10:53:17",
            "owner": 2241,
            "initiativeId": 54,
            "createdBy": 3706,
            "updatedBy": 0
        },
        {
            "id": 263,
            "active": 0,
            "mileStonesValue": {
                "createdByName": null,
                "ownerName": "Nizam Goolam",
                "dateRange": "10/01/2026 - 12/31/2026",
                "progressval": "0",
                "name": "Approved client charter document",
                "progress": 0,
                "desc": "Approved client charter document",
                "status": "Pending",
                "statusLight": "progress-bar progress-bar-success width-per-85 rounded-pill bar_height",
                "statusIndicator": "GREEN"
            },
            "createdTime": "2026-03-13T10:53:18",
            "owner": 2241,
            "initiativeId": 54,
            "createdBy": 3706,
            "updatedBy": 0
        }
    ],
    "attachmentList": [
        {
            "id": 6,
            "initiativesId": 54,
            "active": 0,
            "createdBy": 2241,
            "updatedBy": 0,
            "name": "Report Template (2)",
            "fileName": null,
            "size": "34 KB",
            "type": "pdf",
            "file": "data:application/pdf;base64,JVBERi0xLjMKJbrfrOAKMyAwIG9iago8PC9UeXBlIC9QYWdlCi9QYXJlbnQgMSAwIFIKL1Jlc291cmNlcyAyIDAgUgovTWVkaWFCb3ggWzAgMCAxMTkwLjU0OTk5OTk5OTk5OTk1NDUgODQxLjg4OTk5OTk5OTk5OTk4NjRdCi9Db250ZW50cyA0IDAgUgo+PgplbmRvYmoKNCAwIG9iago8PAovTGVuZ3RoIDIzODI0Cj4+CnN0cmVhbQowLjU2NzAwMDAwMDAwMDAwMDEgdwowIEcKcQoxMTMuMzg1ODI2NzcxNjUzNTU1MSAwIDAgMjguMzQ2NDU2NjkyOTEzMzg4OCAyOC4zNDY0NTY2OTI5MTMzODg4IDc5OS4zNzAzMTQ5NjA2Mjk5MTIxIGNtCi9JMCBEbwpRCkJUCi9GMiAxNCBUZgoxNi4wOTk5OTk5OTk5OTk5OTc5IFRMCjAgZwoxMDUyLjE2MzU0MzMwNzA4NjQ1NjUgODEwLjcwODg5NzYzNzc5NTMwMzEgVGQKKFJlcG9ydCBUZW1wbGF0ZSkgVGoKRVQKQlQKL0YxIDkgVGYKMTAuMzQ5OTk5OTk5OTk5OTk5NiBUTAowIGcKMTA3MS41NzM1NDMzMDcwODYzMTEgNzkzLjcwMTAyMzYyMjA0NzI3MzQgVGQKKE93bmVyOiBOaXphbSBHb29sYW0pIFRqCkVUCkJUCi9GMSA5IFRmCjEwLjM0OTk5OTk5OTk5OTk5OTYgVEwKMCBnCjEwNjIuODQzNTQzMzA3MDg2NTIwMSA3NzkuNTI3Nzk1Mjc1NTkwNTA2MiBUZAooR2VuZXJhdGVkIG9uOiAzLzMxLzIwMjYpIFRqCkVUCkJUCi9GMSA5IFRmCjEwLjM0OTk5OTk5OTk5OTk5OTYgVEwKMCBnCjEwMTIuMTczNTQzMzA3MDg2NDQ3NCA3NjUuMzU0NTY2OTI5MTMzODUyNyBUZAooRGF0ZSBSYW5nZTogMDQvMDEvMjAyNiAtIDAzLzMxLzIwMjcpIFRqCkVUCjAuNDcgMC4xOCAwLjM1IFJHCjEuNDE3MzIyODM0NjQ1NjY5NCB3CjI4LjM0NjQ1NjY5MjkxMzM4ODggNzQyLjY3NzQwMTU3NDgwMzA3MDYgbQoxMTYyLjIwMzU0MzMwNzA4NjQyMDEgNzQyLjY3NzQwMTU3NDgwMzA3MDYgbApTCjAuNDcgMC4xOCAwLjM1IFJHCjEuNDE3MzIyODM0NjQ1NjY5NCB3CjAuNDcgMC4xOCAwLjM1IFJHCjEuNDE3MzIyODM0NjQ1NjY5NCB3CjAuNDcgMC4xOCAwLjM1IHJnCjAuODYgRwowLjI4MzQ2NDU2NjkyOTEzMzkgdwowLjQ3IDAuMTggMC4zNSByZwo0MC4gNzE0LjMzMDk0NDg4MTg4OTc2MzYgNTAuMDQ4NTgyNjc3MTY1MzU2NCAtNTEuNTg4NTgyNjc3MTY1MzU1NSByZQpCCkJUCi9GMiA3IFRmCjguMDQ5OTk5OTk5OTk5OTk4OSBUTAoxLiBnCjQ1LjY2OTI5MTMzODU4MjY3NDIgNjkwLjYzNjY1MzU0MzMwNzAzMzkgVGQKKERlcGFydG1lbnQpIFRqCkVUCkJUCi9GMiA3IFRmCjguMDQ5OTk5OTk5OTk5OTk4OSBUTAoxLiBnCjU1LjUzOTI5MTMzODU4MjY3MTYgNjgyLjU4NjY1MzU0MzMwNzA3OTQgVGQKKE5hbWUpIFRqCkVUCjAuNDcgMC4xOCAwLjM1IHJnCjAuODYgRwowLjI4MzQ2NDU2NjkyOTEzMzkgdwowLjQ3IDAuMTggMC4zNSByZwo5MC4wNDg1ODI2NzcxNjUzNTY0IDcxNC4zMzA5NDQ4ODE4ODk3NjM2IDUxLjY1ODU4MjY3NzE2NTM3IC01MS41ODg1ODI2NzcxNjUzNTU1IHJlCkIKQlQKL0YyIDcgVGYKOC4wNDk5OTk5OTk5OTk5OTg5IFRMCjEuIGcKOTYuMDMyODc0MDE1NzQ4MDM1NCA2OTAuNjM2NjUzNTQzMzA3MDMzOSBUZAooU1RSQVRFR0lDKSBUagpFVApCVAovRjIgNyBUZgo4LjA0OTk5OTk5OTk5OTk5ODkgVEwKMS4gZwo5NS43MTc4NzQwMTU3NDgwMzc3IDY4Mi41ODY2NTM1NDMzMDcwNzk0IFRkCihPVVRDT01FUykgVGoKRVQKMC40NyAwLjE4IDAuMzUgcmcKMC44NiBHCjAuMjgzNDY0NTY2OTI5MTMzOSB3CjAuNDcgMC4xOCAwLjM1IHJnCjE0MS43MDcxNjUzNTQzMzA3MjY0IDcxNC4zMzA5NDQ4ODE4ODk3NjM2IDcyLjcyODU4MjY3NzE2NTM0OSAtNTEuNTg4NTgyNjc3MTY1MzU1NSByZQpCCkJUCi9GMiA3IFRmCjguMDQ5OTk5OTk5OTk5OTk4OSBUTAoxLiBnCjE1OC4yMjY0NTY2OTI5MTMzODc4IDY5MC42MzY2NTM1NDMzMDcwMzM5IFRkCihTVFJBVEVHSUMpIFRqCkVUCkJUCi9GMiA3IFRmCjguMDQ5OTk5OTk5OTk5OTk4OSBUTAoxLiBnCjE1Ni4wMjE0NTY2OTI5MTM0MDM3IDY4Mi41ODY2NTM1NDMzMDcwNzk0IFRkCihPQkpFQ1RJVkVTKSBUagpFVAowLjQ3IDAuMTggMC4zNSByZwowLjg2IEcKMC4yODM0NjQ1NjY5MjkxMzM5IHcKMC40NyAwLjE4IDAuMzUgcmcKMjE0LjQzNTc0ODAzMTQ5NjEwMzcgNzE0LjMzMDk0NDg4MTg4OTc2MzYgNjAuMDU4NTgyNjc3MTY1MzQ3MyAtNTEuNTg4NTgyNjc3MTY1MzU1NSByZQpCCkJUCi9GMiA3IFRmCjguMDQ5OTk5OTk5OTk5OTk4OSBUTAoxLiBnCjIyNC45MDAwMzkzNzAwNzg3NTgzIDY5MC42MzY2NTM1NDMzMDcwMzM5IFRkCihDT0hFUkVOVCkgVGoKRVQKQlQKL0YyIDcgVGYKOC4wNDk5OTk5OTk5OTk5OTg5IFRMCjEuIGcKMjI4Ljc1MDAzOTM3MDA3ODc4MTEgNjgyLjU4NjY1MzU0MzMwNzA3OTQgVGQKKEFDVElPTlMpIFRqCkVUCjAuNDcgMC4xOCAwLjM1IHJnCjAuODYgRwowLjI4MzQ2NDU2NjkyOTEzMzkgdwowLjQ3IDAuMTggMC4zNSByZwoyNzQuNDk0MzMwNzA4NjYxNDM2OCA3MTQuMzMwOTQ0ODgxODg5NzYzNiAxMDMuMDg5MTkwNjgwMTA3MjkzNSAtNTEuNTg4NTgyNjc3MTY1MzU1NSByZQpCCkJUCi9GMiA3IFRmCjguMDQ5OTk5OTk5OTk5OTk4OSBUTAoxLiBnCjMwMS44MTg5MjYwNDg3MTUwNzA1IDY4Ni42MTE2NTM1NDMzMDcwNTY3IFRkCihTVUItQUNUSU9OUykgVGoKRVQKMC40NyAwLjE4IDAuMzUgcmcKMC44NiBHCjAuMjgzNDY0NTY2OTI5MTMzOSB3CjAuNDcgMC4xOCAwLjM1IHJnCjM3Ny41ODM1MjEzODg3Njg3NTg3IDcxNC4zMzA5NDQ4ODE4ODk3NjM2IDE0Ny43MzkyMzQ1MTY5NDAwNTg1IC01MS41ODg1ODI2NzcxNjUzNTU1IHJlCkIKQlQKL0YyIDcgVGYKOC4wNDk5OTk5OTk5OTk5OTg5IFRMCjEuIGcKNDM3LjEwMzEzODY0NzIzODgzNjMgNjg2LjYxMTY1MzU0MzMwNzA1NjcgVGQKKE9VVFBVVCkgVGoKRVQKMC40NyAwLjE4IDAuMzUgcmcKMC44NiBHCjAuMjgzNDY0NTY2OTI5MTMzOSB3CjAuNDcgMC4xOCAwLjM1IHJnCjUyNS4zMjI3NTU5MDU3MDg3MzE5IDcxNC4zMzA5NDQ4ODE4ODk3NjM2IDYxLjI0ODU4MjY3NzE2NTM1MjEgLTUxLjU4ODU4MjY3NzE2NTM1NTUgcmUKQgpCVAovRjIgNyBUZgo4LjA0OTk5OTk5OTk5OTk5ODkgVEwKMS4gZwo1MzAuOTkyMDQ3MjQ0MjkxNDg0MyA2ODYuNjExNjUzNTQzMzA3MDU2NyBUZAooUkVTUE9OU0lCTEUpIFRqCkVUCjAuNDcgMC4xOCAwLjM1IHJnCjAuODYgRwowLjI4MzQ2NDU2NjkyOTEzMzkgdwowLjQ3IDAuMTggMC4zNSByZwo1ODYuNTcxMzM4NTgyODc0MjA0OCA3MTQuMzMwOTQ0ODgxODg5NzYzNiAzOS40MDg1ODI2NzcxNjUzNTU4IC01MS41ODg1ODI2NzcxNjUzNTU1IHJlCkIKQlQKL0YyIDcgVGYKOC4wNDk5OTk5OTk5OTk5OTg5IFRMCjEuIGcKNTkyLjI0MDYyOTkyMTQ1Njg0MzUgNjk0LjY2MTY1MzU0MzMwNzAxMTIgVGQKKFRBUkdFVCkgVGoKRVQKQlQKL0YyIDcgVGYKOC4wNDk5OTk5OTk5OTk5OTg5IFRMCjEuIGcKNTkyLjkwNTYyOTkyMTQ1NjgwNzEgNjg2LjYxMTY1MzU0MzMwNzA1NjcgVGQKKFBFUklPRCkgVGoKRVQKQlQKL0YyIDcgVGYKOC4wNDk5OTk5OTk5OTk5OTg5IFRMCjEuIGcKNTkzLjc0NTYyOTkyMTQ1NjgzODkgNjc4LjU2MTY1MzU0MzMwNzEwMjIgVGQKKDIwMjQvMjUpIFRqCkVUCjAuNDcgMC4xOCAwLjM1IHJnCjAuODYgRwowLjI4MzQ2NDU2NjkyOTEzMzkgdwowLjQ3IDAuMTggMC4zNSByZwo2MjUuOTc5OTIxMjYwMDM5NTMyMiA3MTQuMzMwOTQ0ODgxODg5NzYzNiA3Mi44Njg1ODI2NzcxNjUzNjM3IC01MS41ODg1ODI2NzcxNjUzNTU1IHJlCkIKQlQKL0YyIDcgVGYKOC4wNDk5OTk5OTk5OTk5OTg5IFRMCjEuIGcKNjQ1LjU3OTIxMjU5ODYyMjIzNDUgNjk0LjY2MTY1MzU0MzMwNzAxMTIgVGQKKFBMQU5ORUQpIFRqCkVUCkJUCi9GMiA3IFRmCjguMDQ5OTk5OTk5OTk5OTk4OSBUTAoxLiBnCjYzMS42NDkyMTI1OTg2MjIxNzA4IDY4Ni42MTE2NTM1NDMzMDcwNTY3IFRkCihJTVBMRU1FTlRBVElPTikgVGoKRVQKQlQKL0YyIDcgVGYKOC4wNDk5OTk5OTk5OTk5OTg5IFRMCjEuIGcKNjQ3LjI5NDIxMjU5ODYyMjE1MjcgNjc4LjU2MTY1MzU0MzMwNzEwMjIgVGQKKE1PTlRIUykgVGoKRVQKMC40NyAwLjE4IDAuMzUgcmcKMC44NiBHCjAuMjgzNDY0NTY2OTI5MTMzOSB3CjAuNDcgMC4xOCAwLjM1IHJnCjY5OC44NDg1MDM5MzcyMDQ4OTU5IDcxNC4zMzA5NDQ4ODE4ODk3NjM2IDcyLjg2ODU4MjY3NzE2NTM2MzcgLTUxLjU4ODU4MjY3NzE2NTM1NTUgcmUKQgpCVAovRjIgNyBUZgo4LjA0OTk5OTk5OTk5OTk5ODkgVEwKMS4gZwo3MjAuOTMyNzk1Mjc1Nzg3NjExOSA2OTQuNjYxNjUzNTQzMzA3MDExMiBUZAooQUNUVUFMKSBUagpFVApCVAovRjIgNyBUZgo4LjA0OTk5OTk5OTk5OTk5ODkgVEwKMS4gZwo3MDQuNTE3Nzk1Mjc1Nzg3NjQ4MyA2ODYuNjExNjUzNTQzMzA3MDU2NyBUZAooSU1QTEVNRU5UQVRJT04pIFRqCkVUCkJUCi9GMiA3IFRmCjguMDQ5OTk5OTk5OTk5OTk4OSBUTAoxLiBnCjcyMC4xNjI3OTUyNzU3ODc2MzAxIDY3OC41NjE2NTM1NDMzMDcxMDIyIFRkCihNT05USFMpIFRqCkVUCjAuNDcgMC4xOCAwLjM1IHJnCjAuODYgRwowLjI4MzQ2NDU2NjkyOTEzMzkgdwowLjQ3IDAuMTggMC4zNSByZwo3NzEuNzE3MDg2NjE0MzcwMjU5NyA3MTQuMzMwOTQ0ODgxODg5NzYzNiA2NS45Mzg1ODI2NzcxNjUzNTY5IC01MS41ODg1ODI2NzcxNjUzNTU1IHJlCkIKQlQKL0YyIDcgVGYKOC4wNDk5OTk5OTk5OTk5OTg5IFRMCjEuIGcKNzc3LjM4NjM3Nzk1Mjk1MzAxMiA3MDIuNzExNjUzNTQzMzA3MDc5NCBUZAooUEVSRk9STUFOQ0UpIFRqCkVUCkJUCi9GMiA3IFRmCjguMDQ5OTk5OTk5OTk5OTk4OSBUTAoxLiBnCjc5MS4zODYzNzc5NTI5NTI4OTgzIDY5NC42NjE2NTM1NDMzMDcwMTEyIFRkCihTVEFUVVMpIFRqCkVUCkJUCi9GMiA3IFRmCjguMDQ5OTk5OTk5OTk5OTk4OSBUTAoxLiBnCjc4OS43MDYzNzc5NTI5NTI4MzQ3IDY4Ni42MTE2NTM1NDMzMDcwNTY3IFRkCihBUyBBVCAzMCkgVGoKRVQKQlQKL0YyIDcgVGYKOC4wNDk5OTk5OTk5OTk5OTg5IFRMCjEuIGcKNzgzLjA1NjM3Nzk1Mjk1Mjk3MTEgNjc4LjU2MTY1MzU0MzMwNzEwMjIgVGQKKFNFUFRFTUJFUikgVGoKRVQKQlQKL0YyIDcgVGYKOC4wNDk5OTk5OTk5OTk5OTg5IFRMCjEuIGcKNzk2Ljk4NjM3Nzk1Mjk1MjkyMTEgNjcwLjUxMTY1MzU0MzMwNzAzMzkgVGQKKDIwMjQpIFRqCkVUCjAuNDcgMC4xOCAwLjM1IHJnCjAuODYgRwowLjI4MzQ2NDU2NjkyOTEzMzkgdwowLjQ3IDAuMTggMC4zNSByZwo4MzcuNjU1NjY5MjkxNTM1NTU5OCA3MTQuMzMwOTQ0ODgxODg5NzYzNiA3Mi44Njg1ODI2NzcxNjUzNjM3IC01MS41ODg1ODI2NzcxNjUzNTU1IHJlCkIKQlQKL0YyIDcgVGYKOC4wNDk5OTk5OTk5OTk5OTg5IFRMCjEuIGcKODQzLjMyNDk2MDYzMDExODMxMjEgNjkwLjYzNjY1MzU0MzMwNzAzMzkgVGQKKElNUExFTUVOVEFUSU9OKSBUagpFVApCVAovRjIgNyBUZgo4LjA0OTk5OTk5OTk5OTk5ODkgVEwKMS4gZwo4NTYuNDg0OTYwNjMwMTE4MjgwMyA2ODIuNTg2NjUzNTQzMzA3MDc5NCBUZAooUkVNQVJLUykgVGoKRVQKMC40NyAwLjE4IDAuMzUgcmcKMC44NiBHCjAuMjgzNDY0NTY2OTI5MTMzOSB3CjAuNDcgMC4xOCAwLjM1IHJnCjkxMC41MjQyNTE5Njg3MDA5MjM1IDcxNC4zMzA5NDQ4ODE4ODk3NjM2IDgzLjU3ODU4MjY3NzE2NTM0MzMgLTUxLjU4ODU4MjY3NzE2NTM1NTUgcmUKQgpCVAovRjIgNyBUZgo4LjA0OTk5OTk5OTk5OTk5ODkgVEwKMS4gZwo5MjUuMDEzNTQzMzA3MjgzNjEyMiA2OTguNjg2NjUzNTQzMzA3MTAyMiBUZAooUEVSRk9STUFOQ0UpIFRqCkVUCkJUCi9GMiA3IFRmCjguMDQ5OTk5OTk5OTk5OTk4OSBUTAoxLiBnCjkzNS4xMjg1NDMzMDcyODM1MDc2IDY5MC42MzY2NTM1NDMzMDcwMzM5IFRkCihBTkFMWVNJUykgVGoKRVQKQlQKL0YyIDcgVGYKOC4wNDk5OTk5OTk5OTk5OTg5IFRMCjEuIGcKOTI1LjAxMzU0MzMwNzI4MzYxMjIgNjgyLjU4NjY1MzU0MzMwNzA3OTQgVGQKKE9CU0VSVkFUSU9OUykgVGoKRVQKQlQKL0YyIDcgVGYKOC4wNDk5OTk5OTk5OTk5OTg5IFRMCjEuIGcKOTE2LjE5MzU0MzMwNzI4MzY3NTkgNjc0LjUzNjY1MzU0MzMwNzAxMTIgVGQKKFJFQ09NTUVOREFUSU9OUykgVGoKRVQKMC40NyAwLjE4IDAuMzUgcmcKMC44NiBHCjAuMjgzNDY0NTY2OTI5MTMzOSB3CjAuNDcgMC4xOCAwLjM1IHJnCjk5NC4xMDI4MzQ2NDU4NjYzMjM2IDcxNC4zMzA5NDQ4ODE4ODk3NjM2IDcyLjg2ODU4MjY3NzE2NTM2MzcgLTUxLjU4ODU4MjY3NzE2NTM1NTUgcmUKQgpCVAovRjIgNyBUZgo4LjA0OTk5OTk5OTk5OTk5ODkgVEwKMS4gZwoxMDAyLjkyMjEyNTk4NDQ0ODkzOTYgNjk0LjY2MTY1MzU0MzMwNzAxMTIgVGQKKENPTlNPTElEQVRFRCkgVGoKRVQKQlQKL0YyIDcgVGYKOC4wNDk5OTk5OTk5OTk5OTg5IFRMCjEuIGcKOTk5Ljc3MjEyNTk4NDQ0ODk2MjMgNjg2LjYxMTY1MzU0MzMwNzA1NjcgVGQKKElNUExFTUVOVEFUSU9OKSBUagpFVApCVAovRjIgNyBUZgo4LjA0OTk5OTk5OTk5OTk5ODkgVEwKMS4gZwoxMDEyLjkzMjEyNTk4NDQ0ODkzMDUgNjc4LjU2MTY1MzU0MzMwNzEwMjIgVGQKKFJFTUFSS1MpIFRqCkVUCjAuNDcgMC4xOCAwLjM1IHJnCjAuODYgRwowLjI4MzQ2NDU2NjkyOTEzMzkgdwowLjQ3IDAuMTggMC4zNSByZwoxMDY2Ljk3MTQxNzMyMzAzMTU3MzcgNzE0LjMzMDk0NDg4MTg4OTc2MzYgODMuNTc4NTgyNjc3MTY1MzQzMyAtNTEuNTg4NTgyNjc3MTY1MzU1NSByZQpCCkJUCi9GMiA3IFRmCjguMDQ5OTk5OTk5OTk5OTk4OSBUTAoxLiBnCjEwODEuMTQ1NzA4NjYxNjE0MjA3OCA3MDIuNzExNjUzNTQzMzA3MDc5NCBUZAooQ09OU09MSURBVEVEKSBUagpFVApCVAovRjIgNyBUZgo4LjA0OTk5OTk5OTk5OTk5ODkgVEwKMS4gZwoxMDgxLjQ2MDcwODY2MTYxNDI2MjQgNjk0LjY2MTY1MzU0MzMwNzAxMTIgVGQKKFBFUkZPUk1BTkNFKSBUagpFVApCVAovRjIgNyBUZgo4LjA0OTk5OTk5OTk5OTk5ODkgVEwKMS4gZwoxMDkxLjU3NTcwODY2MTYxNDI3MTUgNjg2LjYxMTY1MzU0MzMwNzA1NjcgVGQKKEFOQUxZU0lTKSBUagpFVApCVAovRjIgNyBUZgo4LjA0OTk5OTk5OTk5OTk5ODkgVEwKMS4gZwoxMDgxLjQ2MDcwODY2MTYxNDI2MjQgNjc4LjU2MTY1MzU0MzMwNzEwMjIgVGQKKE9CU0VSVkFUSU9OUykgVGoKRVQKQlQKL0YyIDcgVGYKOC4wNDk5OTk5OTk5OTk5OTg5IFRMCjEuIGcKMTA3Mi42NDA3MDg2NjE2MTQzMjYgNjcwLjUxMTY1MzU0MzMwNzAzMzkgVGQKKFJFQ09NTUVOREFUSU9OUykgVGoKRVQKMC40NyAwLjE4IDAuMzUgUkcKMS40MTczMjI4MzQ2NDU2Njk0IHcKMC45OCBnCjAuODYgRwowLjI4MzQ2NDU2NjkyOTEzMzkgdwowLjk4IGcKNDAuIDY2Mi43NDIzNjIyMDQ3MjQzNzI1IDUwLjA0ODU4MjY3NzE2NTM1NjQgLTY3LjY4ODU4MjY3NzE2NTM0MjcgcmUKQgpCVAovRjEgNyBUZgo4LjA0OTk5OTk5OTk5OTk5ODkgVEwKMC4zMTQgZwo1Ny40NjQyOTEzMzg1ODI2Njg4IDYzMC45OTgwNzA4NjYxNDE2ODg0IFRkCihDRU8pIFRqCkVUCkJUCi9GMSA3IFRmCjguMDQ5OTk5OTk5OTk5OTk4OSBUTAowLjMxNCBnCjUyLjIxNDI5MTMzODU4MjY2ODggNjIyLjk0ODA3MDg2NjE0MTczMzkgVGQKKE9GRklDRSkgVGoKRVQKMC45OCBnCjAuODYgRwowLjI4MzQ2NDU2NjkyOTEzMzkgdwowLjk4IGcKOTAuMDQ4NTgyNjc3MTY1MzU2NCA2NjIuNzQyMzYyMjA0NzI0MzcyNSA1MS42NTg1ODI2NzcxNjUzNyAtNjcuNjg4NTgyNjc3MTY1MzQyNyByZQpCCkJUCi9GMSA3IFRmCjguMDQ5OTk5OTk5OTk5OTk4OSBUTAowLjMxNCBnCjEwMy4xNzI4NzQwMTU3NDgwMzYgNjM1LjAyMzA3MDg2NjE0MTc3OTMgVGQKKEVuYWJsZWQpIFRqCkVUCkJUCi9GMSA3IFRmCjguMDQ5OTk5OTk5OTk5OTk4OSBUTAowLjMxNCBnCjk5LjA3Nzg3NDAxNTc0ODAzNzEgNjI2Ljk3MzA3MDg2NjE0MTcxMTEgVGQKKFJlZ3VsYXRvcnkpIFRqCkVUCkJUCi9GMSA3IFRmCjguMDQ5OTk5OTk5OTk5OTk4OSBUTAowLjMxNCBnCjk2LjM4Mjg3NDAxNTc0ODA0MzkgNjE4LjkyMzA3MDg2NjE0MTc1NjYgVGQKKEVudmlyb25tZW50KSBUagpFVAowLjk4IGcKMC44NiBHCjAuMjgzNDY0NTY2OTI5MTMzOSB3CjAuOTggZwoxNDEuNzA3MTY1MzU0MzMwNzI2NCA2NjIuNzQyMzYyMjA0NzI0MzcyNSA3Mi43Mjg1ODI2NzcxNjUzNDkgLTY3LjY4ODU4MjY3NzE2NTM0MjcgcmUKQgpCVAovRjEgNyBUZgo4LjA0OTk5OTk5OTk5OTk5ODkgVEwKMC4zMTQgZwoxNDcuNzI2NDU2NjkyOTEzNDE2MiA2NDMuMDczMDcwODY2MTQxNzMzOSBUZAooSW1wcm92ZSBSZWd1bGF0b3J5KSBUagpFVApCVAovRjEgNyBUZgo4LjA0OTk5OTk5OTk5OTk5ODkgVEwKMC4zMTQgZwoxNDcuMzc2NDU2NjkyOTEzMzkzNSA2MzUuMDIzMDcwODY2MTQxNzc5MyBUZAooU2VydmljZXNfRGVsaXZlcmluZykgVGoKRVQKQlQKL0YxIDcgVGYKOC4wNDk5OTk5OTk5OTk5OTg5IFRMCjAuMzE0IGcKMTU3Ljk0NjQ1NjY5MjkxMzM4NjYgNjI2Ljk3MzA3MDg2NjE0MTcxMTEgVGQKKEVmZmVjdGl2ZSBhbmQpIFRqCkVUCkJUCi9GMSA3IFRmCjguMDQ5OTk5OTk5OTk5OTk4OSBUTAowLjMxNCBnCjE0Ny4zNDE0NTY2OTI5MTMzOTY5IDYxOC45MjMwNzA4NjYxNDE3NTY2IFRkCihSZXNwb25zaXZlIFNlcnZpY2UpIFRqCkVUCkJUCi9GMSA3IFRmCjguMDQ5OTk5OTk5OTk5OTk4OSBUTAowLjMxNCBnCjE0Ny45MDE0NTY2OTI5MTMzOTkxIDYxMC44NzMwNzA4NjYxNDE4MDIxIFRkCihJbiBBIFRpbWVseSBNYW5uZXIpIFRqCkVUCjAuOTggZwowLjg2IEcKMC4yODM0NjQ1NjY5MjkxMzM5IHcKMC45OCBnCjIxNC40MzU3NDgwMzE0OTYxMDM3IDY2Mi43NDIzNjIyMDQ3MjQzNzI1IDYwLjA1ODU4MjY3NzE2NTM0NzMgLTY3LjY4ODU4MjY3NzE2NTM0MjcgcmUKQgpCVAovRjEgNyBUZgo4LjA0OTk5OTk5OTk5OTk5ODkgVEwKMC4zMTQgZwoyMjAuOTEwMDM5MzcwMDc4NzQ5MiA2MzAuOTk4MDcwODY2MTQxNjg4NCBUZAooRW5oYW5jZSBDbGllbnQpIFRqCkVUCkJUCi9GMSA3IFRmCjguMDQ5OTk5OTk5OTk5OTk4OSBUTAowLjMxNCBnCjIzMS4xMzAwMzkzNzAwNzg3NzY1IDYyMi45NDgwNzA4NjYxNDE3MzM5IFRkCihTZXJ2aWNlcykgVGoKRVQKMC45OCBnCjAuODYgRwowLjI4MzQ2NDU2NjkyOTEzMzkgdwowLjk4IGcKMjc0LjQ5NDMzMDcwODY2MTQzNjggNjYyLjc0MjM2MjIwNDcyNDM3MjUgMTAzLjA4OTE5MDY4MDEwNzI5MzUgLTY3LjY4ODU4MjY3NzE2NTM0MjcgcmUKQgpCVAovRjEgNyBUZgo4LjA0OTk5OTk5OTk5OTk5ODkgVEwKMC4zMTQgZwoyODUuMDg4OTI2MDQ4NzE1MDUyMyA2NTEuMTIzMDcwODY2MTQxNjg4NCBUZAooRGV2ZWxvcCBhIENvbXByZWhlbnNpdmUpIFRqCkVUCkJUCi9GMSA3IFRmCjguMDQ5OTk5OTk5OTk5OTk4OSBUTAowLjMxNCBnCjI5Mi4wMTg5MjYwNDg3MTUxMTU5IDY0My4wNzMwNzA4NjYxNDE3MzM5IFRkCihDbGllbnQgU2VydmljZSBDaGFydGVyKSBUagpFVApCVAovRjEgNyBUZgo4LjA0OTk5OTk5OTk5OTk5ODkgVEwKMC4zMTQgZwoyODIuOTUzOTI2MDQ4NzE1MTE4MiA2MzUuMDIzMDcwODY2MTQxNzc5MyBUZAooT3V0bGluaW5nIFNlcnZpY2UgU3RhbmRhcmRzKSBUagpFVApCVAovRjEgNyBUZgo4LjA0OTk5OTk5OTk5OTk5ODkgVEwKMC4zMTQgZwoyOTEuMzE4OTI2MDQ4NzE1MDcwNSA2MjYuOTczMDcwODY2MTQxNzExMSBUZAooYW5kIFR1cm5hcm91bmQgVGltZXMpIFRqCkVUCkJUCi9GMSA3IFRmCjguMDQ5OTk5OTk5OTk5OTk4OSBUTAowLjMxNCBnCjI5Ni42NzM5MjYwNDg3MTUwODg3IDYxOC45MjMwNzA4NjYxNDE3NTY2IFRkCihEZXZlbG9wIGEgTmF0aW9uYWwpIFRqCkVUCkJUCi9GMSA3IFRmCjguMDQ5OTk5OTk5OTk5OTk4OSBUTAowLjMxNCBnCjI4Ni44NzM5MjYwNDg3MTUwNzczIDYxMC44NzMwNzA4NjYxNDE4MDIxIFRkCihTdGFrZWhvbGRlciBFbmdhZ2VtZW50KSBUagpFVApCVAovRjEgNyBUZgo4LjA0OTk5OTk5OTk5OTk5ODkgVEwKMC4zMTQgZwozMDguNjQzOTI2MDQ4NzE1MDU5MSA2MDIuODIzMDcwODY2MTQxNzMzOSBUZAooRnJhbWV3b3JrKSBUagpFVAowLjk4IGcKMC44NiBHCjAuMjgzNDY0NTY2OTI5MTMzOSB3CjAuOTggZwozNzcuNTgzNTIxMzg4NzY4NzU4NyA2NjIuNzQyMzYyMjA0NzI0MzcyNSAxNDcuNzM5MjM0NTE2OTQwMDU4NSAtNjcuNjg4NTgyNjc3MTY1MzQyNyByZQpCCjAuOTggZwowLjg2IEcKMC4yODM0NjQ1NjY5MjkxMzM5IHcKMC45OCBnCjUyNS4zMjI3NTU5MDU3MDg3MzE5IDY2Mi43NDIzNjIyMDQ3MjQzNzI1IDYxLjI0ODU4MjY3NzE2NTM1MjEgLTY3LjY4ODU4MjY3NzE2NTM0MjcgcmUKQgpCVAovRjEgNyBUZgo4LjA0OTk5OTk5OTk5OTk5ODkgVEwKMC4zMTQgZwo1MzQuNTk3MDQ3MjQ0MjkxMzg4OCA2MjYuOTczMDcwODY2MTQxNzExMSBUZAooQ0VPIE9GRklDRSkgVGoKRVQKMC45OCBnCjAuODYgRwowLjI4MzQ2NDU2NjkyOTEzMzkgdwowLjk4IGcKNTg2LjU3MTMzODU4Mjg3NDIwNDggNjYyLjc0MjM2MjIwNDcyNDM3MjUgMzkuNDA4NTgyNjc3MTY1MzU1OCAtNjcuNjg4NTgyNjc3MTY1MzQyNyByZQpCCjAuOTggZwowLjg2IEcKMC4yODM0NjQ1NjY5MjkxMzM5IHcKMC45OCBnCjYyNS45Nzk5MjEyNjAwMzk1MzIyIDY2Mi43NDIzNjIyMDQ3MjQzNzI1IDcyLjg2ODU4MjY3NzE2NTM2MzcgLTY3LjY4ODU4MjY3NzE2NTM0MjcgcmUKQgpCVAovRjEgNyBUZgo4LjA0OTk5OTk5OTk5OTk5ODkgVEwKMC4zMTQgZwo2NDIuOTE5MjEyNTk4NjIyMjY2MyA2MzAuOTk4MDcwODY2MTQxNjg4NCBUZAooMDQvMDEvMjAyNiAtKSBUagpFVApCVAovRjEgNyBUZgo4LjA0OTk5OTk5OTk5OTk5ODkgVEwKMC4zMTQgZwo2NDUuMDU0MjEyNTk4NjIyMjU3MiA2MjIuOTQ4MDcwODY2MTQxNzMzOSBUZAooMDMvMzEvMjAyNykgVGoKRVQKMC45OCBnCjAuODYgRwowLjI4MzQ2NDU2NjkyOTEzMzkgdwowLjk4IGcKNjk4Ljg0ODUwMzkzNzIwNDg5NTkgNjYyLjc0MjM2MjIwNDcyNDM3MjUgNzIuODY4NTgyNjc3MTY1MzYzNyAtNjcuNjg4NTgyNjc3MTY1MzQyNyByZQpCCjAuOTggZwowLjg2IEcKMC4yODM0NjQ1NjY5MjkxMzM5IHcKMC45OCBnCjc3MS43MTcwODY2MTQzNzAyNTk3IDY2Mi43NDIzNjIyMDQ3MjQzNzI1IDY1LjkzODU4MjY3NzE2NTM1NjkgLTY3LjY4ODU4MjY3NzE2NTM0MjcgcmUKQgowLjk4IGcKMC44NiBHCjAuMjgzNDY0NTY2OTI5MTMzOSB3CjAuOTggZwo4MzcuNjU1NjY5MjkxNTM1NTU5OCA2NjIuNzQyMzYyMjA0NzI0MzcyNSA3Mi44Njg1ODI2NzcxNjUzNjM3IC02Ny42ODg1ODI2NzcxNjUzNDI3IHJlCkIKQlQKL0YxIDcgVGYKOC4wNDk5OTk5OTk5OTk5OTg5IFRMCjAuMzE0IGcKODczLjEwOTk2MDYzMDExODI4MDMgNjI2Ljk3MzA3MDg2NjE0MTcxMTEgVGQKKCwpIFRqCkVUCjAuOTggZwowLjg2IEcKMC4yODM0NjQ1NjY5MjkxMzM5IHcKMC45OCBnCjkxMC41MjQyNTE5Njg3MDA5MjM1IDY2Mi43NDIzNjIyMDQ3MjQzNzI1IDgzLjU3ODU4MjY3NzE2NTM0MzMgLTY3LjY4ODU4MjY3NzE2NTM0MjcgcmUKQgpCVAovRjEgNyBUZgo4LjA0OTk5OTk5OTk5OTk5ODkgVEwKMC4zMTQgZwo5NTEuMzMzNTQzMzA3MjgzNTQ4NSA2MjYuOTczMDcwODY2MTQxNzExMSBUZAooLCkgVGoKRVQKMC45OCBnCjAuODYgRwowLjI4MzQ2NDU2NjkyOTEzMzkgdwowLjk4IGcKOTk0LjEwMjgzNDY0NTg2NjMyMzYgNjYyLjc0MjM2MjIwNDcyNDM3MjUgNzIuODY4NTgyNjc3MTY1MzYzNyAtNjcuNjg4NTgyNjc3MTY1MzQyNyByZQpCCkJUCi9GMSA3IFRmCjguMDQ5OTk5OTk5OTk5OTk4OSBUTAowLjMxNCBnCjEwMjkuNTU3MTI1OTg0NDQ4OTMwNSA2MjYuOTczMDcwODY2MTQxNzExMSBUZAooICkgVGoKRVQKMC45OCBnCjAuODYgRwowLjI4MzQ2NDU2NjkyOTEzMzkgdwowLjk4IGcKMTA2Ni45NzE0MTczMjMwMzE1NzM3IDY2Mi43NDIzNjIyMDQ3MjQzNzI1IDgzLjU3ODU4MjY3NzE2NTM0MzMgLTY3LjY4ODU4MjY3NzE2NTM0MjcgcmUKQgpCVAovRjEgNyBUZgo4LjA0OTk5OTk5OTk5OTk5ODkgVEwKMC4zMTQgZwoxMTA3Ljc4MDcwODY2MTYxNDE5ODcgNjI2Ljk3MzA3MDg2NjE0MTcxMTEgVGQKKCApIFRqCkVUCjEuIGcKMC44NiBHCjAuMjgzNDY0NTY2OTI5MTMzOSB3CjEuIGcKNDAuIDU5NS4wNTM3Nzk1Mjc1NTkwNzI0IDUwLjA0ODU4MjY3NzE2NTM1NjQgLTc1LjczODU4MjY3NzE2NTM1NDEgcmUKQgpCVAovRjEgNyBUZgo4LjA0OTk5OTk5OTk5OTk5ODkgVEwKMC4zMTQgZwo1Ny40NjQyOTEzMzg1ODI2Njg4IDU1OS4yODQ0ODgxODg5NzY0MTEgVGQKKENFTykgVGoKRVQKQlQKL0YxIDcgVGYKOC4wNDk5OTk5OTk5OTk5OTg5IFRMCjAuMzE0IGcKNTIuMjE0MjkxMzM4NTgyNjY4OCA1NTEuMjM0NDg4MTg4OTc2MzQyOCBUZAooT0ZGSUNFKSBUagpFVAoxLiBnCjAuODYgRwowLjI4MzQ2NDU2NjkyOTEzMzkgdwoxLiBnCjkwLjA0ODU4MjY3NzE2NTM1NjQgNTk1LjA1Mzc3OTUyNzU1OTA3MjQgNTEuNjU4NTgyNjc3MTY1MzcgLTc1LjczODU4MjY3NzE2NTM1NDEgcmUKQgpCVAovRjEgNyBUZgo4LjA0OTk5OTk5OTk5OTk5ODkgVEwKMC4zMTQgZwoxMDMuMTcyODc0MDE1NzQ4MDM2IDU2My4zMDk0ODgxODg5NzYzODgzIFRkCihFbmFibGVkKSBUagpFVApCVAovRjEgNyBUZgo4LjA0OTk5OTk5OTk5OTk5ODkgVEwKMC4zMTQgZwo5OS4wNzc4NzQwMTU3NDgwMzcxIDU1NS4yNTk0ODgxODg5NzYzMjAxIFRkCihSZWd1bGF0b3J5KSBUagpFVApCVAovRjEgNyBUZgo4LjA0OTk5OTk5OTk5OTk5ODkgVEwKMC4zMTQgZwo5Ni4zODI4NzQwMTU3NDgwNDM5IDU0Ny4yMDk0ODgxODg5NzYzNjU2IFRkCihFbnZpcm9ubWVudCkgVGoKRVQKMS4gZwowLjg2IEcKMC4yODM0NjQ1NjY5MjkxMzM5IHcKMS4gZwoxNDEuNzA3MTY1MzU0MzMwNzI2NCA1OTUuMDUzNzc5NTI3NTU5MDcyNCA3Mi43Mjg1ODI2NzcxNjUzNDkgLTc1LjczODU4MjY3NzE2NTM1NDEgcmUKQgpCVAovRjEgNyBUZgo4LjA0OTk5OTk5OTk5OTk5ODkgVEwKMC4zMTQgZwoxNjEuMDk2NDU2NjkyOTEzMzkyMyA1NjcuMzM0NDg4MTg4OTc2MzY1NiBUZAooU3RyZW5ndGhlbikgVGoKRVQKQlQKL0YxIDcgVGYKOC4wNDk5OTk5OTk5OTk5OTg5IFRMCjAuMzE0IGcKMTU5LjU1NjQ1NjY5MjkxMzQwMDMgNTU5LjI4NDQ4ODE4ODk3NjQxMSBUZAooU3Rha2Vob2xkZXIpIFRqCkVUCkJUCi9GMSA3IFRmCjguMDQ5OTk5OTk5OTk5OTk4OSBUTAowLjMxNCBnCjE1MS4yNjE0NTY2OTI5MTMzODQ0IDU1MS4yMzQ0ODgxODg5NzY0NTY1IFRkCihFbmdhZ2VtZW50IEFuZCkgVGoKRVQKQlQKL0YxIDcgVGYKOC4wNDk5OTk5OTk5OTk5OTg5IFRMCjAuMzE0IGcKMTU3LjYzMTQ1NjY5MjkxMzM4ODkgNTQzLjE4NDQ4ODE4ODk3NjUwMiBUZAooQ29sbGFib3JhdGlvbikgVGoKRVQKMS4gZwowLjg2IEcKMC4yODM0NjQ1NjY5MjkxMzM5IHcKMS4gZwoyMTQuNDM1NzQ4MDMxNDk2MTAzNyA1OTUuMDUzNzc5NTI3NTU5MDcyNCA2MC4wNTg1ODI2NzcxNjUzNDczIC03NS43Mzg1ODI2NzcxNjUzNTQxIHJlCkIKQlQKL0YxIDcgVGYKOC4wNDk5OTk5OTk5OTk5OTg5IFRMCjAuMzE0IGcKMjI3LjQ5MDAzOTM3MDA3ODc2MTcgNTgzLjQzNDQ4ODE4ODk3NjI3NDYgVGQKKFN0cmVuZ3RoZW4pIFRqCkVUCkJUCi9GMSA3IFRmCjguMDQ5OTk5OTk5OTk5OTk4OSBUTAowLjMxNCBnCjIyNC43OTUwMzkzNzAwNzg3NDAxIDU3NS4zODQ0ODgxODg5NzYzMjAxIFRkCihjb2xsYWJvcmF0aW9uKSBUagpFVApCVAovRjEgNyBUZgo4LjA0OTk5OTk5OTk5OTk5ODkgVEwKMC4zMTQgZwoyMzguNjkwMDM5MzcwMDc4Nzc4OCA1NjcuMzM0NDg4MTg4OTc2MzY1NiBUZAooYW5kKSBUagpFVApCVAovRjEgNyBUZgo4LjA0OTk5OTk5OTk5OTk5ODkgVEwKMC4zMTQgZwoyMjAuMzE1MDM5MzcwMDc4Nzc4OCA1NTkuMjg0NDg4MTg4OTc2NDExIFRkCihwYXJ0bmVyc2hpcHMgZm9yKSBUagpFVApCVAovRjEgNyBUZgo4LjA0OTk5OTk5OTk5OTk5ODkgVEwKMC4zMTQgZwoyMzEuMzQwMDM5MzcwMDc4Nzg0NSA1NTEuMjM0NDg4MTg4OTc2NDU2NSBUZAoobmF0aW9uYWwsKSBUagpFVApCVAovRjEgNyBUZgo4LjA0OTk5OTk5OTk5OTk5ODkgVEwKMC4zMTQgZwoyMjQuNDEwMDM5MzcwMDc4Nzc3NyA1NDMuMTg0NDg4MTg4OTc2NTAyIFRkCihyZWdpb25hbCwgYW5kKSBUagpFVApCVAovRjEgNyBUZgo4LjA0OTk5OTk5OTk5OTk5ODkgVEwKMC4zMTQgZwoyMjUuNTY1MDM5MzcwMDc4NzUwNCA1MzUuMTM0NDg4MTg4OTc2NDMzOCBUZAooaW50ZXJuYXRpb25hbCkgVGoKRVQKQlQKL0YxIDcgVGYKOC4wNDk5OTk5OTk5OTk5OTg5IFRMCjAuMzE0IGcKMjMwLjE1MDAzOTM3MDA3ODc4NjggNTI3LjA4NDQ4ODE4ODk3NjM2NTYgVGQKKGluaXRpYXRpdmVzKSBUagpFVAoxLiBnCjAuODYgRwowLjI4MzQ2NDU2NjkyOTEzMzkgdwoxLiBnCjI3NC40OTQzMzA3MDg2NjE0MzY4IDU5NS4wNTM3Nzk1Mjc1NTkwNzI0IDEwMy4wODkxOTA2ODAxMDcyOTM1IC03NS43Mzg1ODI2NzcxNjUzNTQxIHJlCkIKQlQKL0YxIDcgVGYKOC4wNDk5OTk5OTk5OTk5OTg5IFRMCjAuMzE0IGcKMjk3LjI2ODkyNjA0ODcxNTExNTkgNTcxLjM1OTQ4ODE4ODk3NjM0MjggVGQKKERldmVsb3AgYSBuYXRpb25hbCkgVGoKRVQKQlQKL0YxIDcgVGYKOC4wNDk5OTk5OTk5OTk5OTg5IFRMCjAuMzE0IGcKMjg3LjgxODkyNjA0ODcxNTEyNzMgNTYzLjMwOTQ4ODE4ODk3NjM4ODMgVGQKKHN0YWtlaG9sZGVyIGVuZ2FnZW1lbnQpIFRqCkVUCkJUCi9GMSA3IFRmCjguMDQ5OTk5OTk5OTk5OTk4OSBUTAowLjMxNCBnCjI4NS45OTg5MjYwNDg3MTUwNzczIDU1NS4yNTk0ODgxODg5NzYzMjAxIFRkCihmcmFtZXdvcmsgRGV2ZWxvcCBNb1VzKSBUagpFVApCVAovRjEgNyBUZgo4LjA0OTk5OTk5OTk5OTk5ODkgVEwKMC4zMTQgZwoyNzkuODczOTI2MDQ4NzE1MDc3MyA1NDcuMjA5NDg4MTg4OTc2MzY1NiBUZAood2l0aCBwZWVyIHJlZ3VsYXRvcnMgYW5kIG90aGVyKSBUagpFVApCVAovRjEgNyBUZgo4LjA0OTk5OTk5OTk5OTk5ODkgVEwKMC4zMTQgZwozMDEuNjc4OTI2MDQ4NzE1MDg0MSA1MzkuMTU5NDg4MTg4OTc2NDExIFRkCihyZWxldmFudCBlbnRpdGllcykgVGoKRVQKMS4gZwowLjg2IEcKMC4yODM0NjQ1NjY5MjkxMzM5IHcKMS4gZwozNzcuNTgzNTIxMzg4NzY4NzU4NyA1OTUuMDUzNzc5NTI3NTU5MDcyNCAxNDcuNzM5MjM0NTE2OTQwMDU4NSAtNzUuNzM4NTgyNjc3MTY1MzU0MSByZQpCCkJUCi9GMSA3IFRmCjguMDQ5OTk5OTk5OTk5OTk4OSBUTAowLjMxNCBnCjM4My4wNjMxMzg2NDcyMzg4MTU4IDU3MS4zNTk0ODgxODg5NzYzNDI4IFRkCihBcHByb3ZlZCBzY29waW5nIHJlcG9ydCwgQmVuY2htYXJrIHJlcG9ydCwpIFRqCkVUCkJUCi9GMSA3IFRmCjguMDQ5OTk5OTk5OTk5OTk4OSBUTAowLjMxNCBnCjM4Ni44NzgxMzg2NDcyMzg4MTM1IDU2My4zMDk0ODgxODg5NzYzODgzIFRkCihEcmFmdCBlbmdhZ2VtZW50IGZyYW1ld29yayByZXBvcnQsIEZpbmFsKSBUagpFVApCVAovRjEgNyBUZgo4LjA0OTk5OTk5OTk5OTk5ODkgVEwKMC4zMTQgZwozODMuMjM4MTM4NjQ3MjM4ODI3MiA1NTUuMjU5NDg4MTg4OTc2MzIwMSBUZAooZW5nYWdlbWVudCBmcmFtZXdvcmsgcmVwb3J0LCBEb2N1bWVudGVkKSBUagpFVApCVAovRjEgNyBUZgo4LjA0OTk5OTk5OTk5OTk5ODkgVEwKMC4zMTQgZwozODYuODQzMTM4NjQ3MjM4Nzg4NSA1NDcuMjA5NDg4MTg4OTc2MzY1NiBUZAoocHJpb3JpdHkgYXJlYXMgZm9yIGNvbGxhYm9yYXRpb24sIERyYWZ0IE1vVSwpIFRqCkVUCkJUCi9GMSA3IFRmCjguMDQ5OTk5OTk5OTk5OTk4OSBUTAowLjMxNCBnCjQyNy4wNTgxMzg2NDcyMzg3NjM1IDUzOS4xNTk0ODgxODg5NzY0MTEgVGQKKEZpbmFsIE1vVSBEcmFmdCkgVGoKRVQKMS4gZwowLjg2IEcKMC4yODM0NjQ1NjY5MjkxMzM5IHcKMS4gZwo1MjUuMzIyNzU1OTA1NzA4NzMxOSA1OTUuMDUzNzc5NTI3NTU5MDcyNCA2MS4yNDg1ODI2NzcxNjUzNTIxIC03NS43Mzg1ODI2NzcxNjUzNTQxIHJlCkIKQlQKL0YxIDcgVGYKOC4wNDk5OTk5OTk5OTk5OTg5IFRMCjAuMzE0IGcKNTM0LjU5NzA0NzI0NDI5MTM4ODggNTU1LjI1OTQ4ODE4ODk3NjMyMDEgVGQKKENFTyBPRkZJQ0UpIFRqCkVUCjEuIGcKMC44NiBHCjAuMjgzNDY0NTY2OTI5MTMzOSB3CjEuIGcKNTg2LjU3MTMzODU4Mjg3NDIwNDggNTk1LjA1Mzc3OTUyNzU1OTA3MjQgMzkuNDA4NTgyNjc3MTY1MzU1OCAtNzUuNzM4NTgyNjc3MTY1MzU0MSByZQpCCjEuIGcKMC44NiBHCjAuMjgzNDY0NTY2OTI5MTMzOSB3CjEuIGcKNjI1Ljk3OTkyMTI2MDAzOTUzMjIgNTk1LjA1Mzc3OTUyNzU1OTA3MjQgNzIuODY4NTgyNjc3MTY1MzYzNyAtNzUuNzM4NTgyNjc3MTY1MzU0MSByZQpCCkJUCi9GMSA3IFRmCjguMDQ5OTk5OTk5OTk5OTk4OSBUTAowLjMxNCBnCjY0Mi45MTkyMTI1OTg2MjIyNjYzIDU1OS4yODQ0ODgxODg5NzY0MTEgVGQKKDA0LzAxLzIwMjYgLSkgVGoKRVQKQlQKL0YxIDcgVGYKOC4wNDk5OTk5OTk5OTk5OTg5IFRMCjAuMzE0IGcKNjQ1LjA1NDIxMjU5ODYyMjI1NzIgNTUxLjIzNDQ4ODE4ODk3NjM0MjggVGQKKDAzLzMxLzIwMjcpIFRqCkVUCjEuIGcKMC44NiBHCjAuMjgzNDY0NTY2OTI5MTMzOSB3CjEuIGcKNjk4Ljg0ODUwMzkzNzIwNDg5NTkgNTk1LjA1Mzc3OTUyNzU1OTA3MjQgNzIuODY4NTgyNjc3MTY1MzYzNyAtNzUuNzM4NTgyNjc3MTY1MzU0MSByZQpCCjEuIGcKMC44NiBHCjAuMjgzNDY0NTY2OTI5MTMzOSB3CjEuIGcKNzcxLjcxNzA4NjYxNDM3MDI1OTcgNTk1LjA1Mzc3OTUyNzU1OTA3MjQgNjUuOTM4NTgyNjc3MTY1MzU2OSAtNzUuNzM4NTgyNjc3MTY1MzU0MSByZQpCCjEuIGcKMC44NiBHCjAuMjgzNDY0NTY2OTI5MTMzOSB3CjEuIGcKODM3LjY1NTY2OTI5MTUzNTU1OTggNTk1LjA1Mzc3OTUyNzU1OTA3MjQgNzIuODY4NTgyNjc3MTY1MzYzNyAtNzUuNzM4NTgyNjc3MTY1MzU0MSByZQpCCkJUCi9GMSA3IFRmCjguMDQ5OTk5OTk5OTk5OTk4OSBUTAowLjMxNCBnCjg3My4xMDk5NjA2MzAxMTgyODAzIDU1NS4yNTk0ODgxODg5NzYzMjAxIFRkCigsKSBUagpFVAoxLiBnCjAuODYgRwowLjI4MzQ2NDU2NjkyOTEzMzkgdwoxLiBnCjkxMC41MjQyNTE5Njg3MDA5MjM1IDU5NS4wNTM3Nzk1Mjc1NTkwNzI0IDgzLjU3ODU4MjY3NzE2NTM0MzMgLTc1LjczODU4MjY3NzE2NTM1NDEgcmUKQgpCVAovRjEgNyBUZgo4LjA0OTk5OTk5OTk5OTk5ODkgVEwKMC4zMTQgZwo5NTEuMzMzNTQzMzA3MjgzNTQ4NSA1NTUuMjU5NDg4MTg4OTc2MzIwMSBUZAooLCkgVGoKRVQKMS4gZwowLjg2IEcKMC4yODM0NjQ1NjY5MjkxMzM5IHcKMS4gZwo5OTQuMTAyODM0NjQ1ODY2MzIzNiA1OTUuMDUzNzc5NTI3NTU5MDcyNCA3Mi44Njg1ODI2NzcxNjUzNjM3IC03NS43Mzg1ODI2NzcxNjUzNTQxIHJlCkIKQlQKL0YxIDcgVGYKOC4wNDk5OTk5OTk5OTk5OTg5IFRMCjAuMzE0IGcKMTAyOS41NTcxMjU5ODQ0NDg5MzA1IDU1NS4yNTk0ODgxODg5NzYzMjAxIFRkCiggKSBUagpFVAoxLiBnCjAuODYgRwowLjI4MzQ2NDU2NjkyOTEzMzkgdwoxLiBnCjEwNjYuOTcxNDE3MzIzMDMxNTczNyA1OTUuMDUzNzc5NTI3NTU5MDcyNCA4My41Nzg1ODI2NzcxNjUzNDMzIC03NS43Mzg1ODI2NzcxNjUzNTQxIHJlCkIKQlQKL0YxIDcgVGYKOC4wNDk5OTk5OTk5OTk5OTg5IFRMCjAuMzE0IGcKMTEwNy43ODA3MDg2NjE2MTQxOTg3IDU1NS4yNTk0ODgxODg5NzYzMjAxIFRkCiggKSBUagpFVAowLjk4IGcKMC44NiBHCjAuMjgzNDY0NTY2OTI5MTMzOSB3CjAuOTggZwo0MC4gNTE5LjMxNTE5Njg1MDM5MzcwNDIgNTAuMDQ4NTgyNjc3MTY1MzU2NCAtNjcuNjg4NTgyNjc3MTY1MzQyNyByZQpCCkJUCi9GMSA3IFRmCjguMDQ5OTk5OTk5OTk5OTk4OSBUTAowLjMxNCBnCjU3LjQ2NDI5MTMzODU4MjY2ODggNDg3LjU3MDkwNTUxMTgxMTAyIFRkCihDRU8pIFRqCkVUCkJUCi9GMSA3IFRmCjguMDQ5OTk5OTk5OTk5OTk4OSBUTAowLjMxNCBnCjUyLjIxNDI5MTMzODU4MjY2ODggNDc5LjUyMDkwNTUxMTgxMTA2NTUgVGQKKE9GRklDRSkgVGoKRVQKMC45OCBnCjAuODYgRwowLjI4MzQ2NDU2NjkyOTEzMzkgdwowLjk4IGcKOTAuMDQ4NTgyNjc3MTY1MzU2NCA1MTkuMzE1MTk2ODUwMzkzNzA0MiA1MS42NTg1ODI2NzcxNjUzNyAtNjcuNjg4NTgyNjc3MTY1MzQyNyByZQpCCkJUCi9GMSA3IFRmCjguMDQ5OTk5OTk5OTk5OTk4OSBUTAowLjMxNCBnCjEwMy4xNzI4NzQwMTU3NDgwMzYgNDkxLjU5NTkwNTUxMTgxMTA1NDEgVGQKKEVuYWJsZWQpIFRqCkVUCkJUCi9GMSA3IFRmCjguMDQ5OTk5OTk5OTk5OTk4OSBUTAowLjMxNCBnCjk5LjA3Nzg3NDAxNTc0ODAzNzEgNDgzLjU0NTkwNTUxMTgxMTA5OTYgVGQKKFJlZ3VsYXRvcnkpIFRqCkVUCkJUCi9GMSA3IFRmCjguMDQ5OTk5OTk5OTk5OTk4OSBUTAowLjMxNCBnCjk2LjM4Mjg3NDAxNTc0ODA0MzkgNDc1LjQ5NTkwNTUxMTgxMTA4ODIgVGQKKEVudmlyb25tZW50KSBUagpFVAowLjk4IGcKMC44NiBHCjAuMjgzNDY0NTY2OTI5MTMzOSB3CjAuOTggZwoxNDEuNzA3MTY1MzU0MzMwNzI2NCA1MTkuMzE1MTk2ODUwMzkzNzA0MiA3Mi43Mjg1ODI2NzcxNjUzNDkgLTY3LjY4ODU4MjY3NzE2NTM0MjcgcmUKQgpCVAovRjEgNyBUZgo4LjA0OTk5OTk5OTk5OTk5ODkgVEwKMC4zMTQgZwoxNjEuMDk2NDU2NjkyOTEzMzkyMyA0OTUuNjIwOTA1NTExODExMDMxNCBUZAooU3RyZW5ndGhlbikgVGoKRVQKQlQKL0YxIDcgVGYKOC4wNDk5OTk5OTk5OTk5OTg5IFRMCjAuMzE0IGcKMTU5LjU1NjQ1NjY5MjkxMzQwMDMgNDg3LjU3MDkwNTUxMTgxMTA3NjggVGQKKFN0YWtlaG9sZGVyKSBUagpFVApCVAovRjEgNyBUZgo4LjA0OTk5OTk5OTk5OTk5ODkgVEwKMC4zMTQgZwoxNTEuMjYxNDU2NjkyOTEzMzg0NCA0NzkuNTIwOTA1NTExODExMDY1NSBUZAooRW5nYWdlbWVudCBBbmQpIFRqCkVUCkJUCi9GMSA3IFRmCjguMDQ5OTk5OTk5OTk5OTk4OSBUTAowLjMxNCBnCjE1Ny42MzE0NTY2OTI5MTMzODg5IDQ3MS40NzA5MDU1MTE4MTEwNTQxIFRkCihDb2xsYWJvcmF0aW9uKSBUagpFVAowLjk4IGcKMC44NiBHCjAuMjgzNDY0NTY2OTI5MTMzOSB3CjAuOTggZwoyMTQuNDM1NzQ4MDMxNDk2MTAzNyA1MTkuMzE1MTk2ODUwMzkzNzA0MiA2MC4wNTg1ODI2NzcxNjUzNDczIC02Ny42ODg1ODI2NzcxNjUzNDI3IHJlCkIKQlQKL0YxIDcgVGYKOC4wNDk5OTk5OTk5OTk5OTg5IFRMCjAuMzE0IGcKMjMwLjc4MDAzOTM3MDA3ODc1MzggNDk5LjY0NTkwNTUxMTgxMTA2NTUgVGQKKEVuaGFuY2UpIFRqCkVUCkJUCi9GMSA3IFRmCjguMDQ5OTk5OTk5OTk5OTk4OSBUTAowLjMxNCBnCjIyMy43NDUwMzkzNzAwNzg3ODU2IDQ5MS41OTU5MDU1MTE4MTEwNTQxIFRkCih0cmFuc3BhcmVuY3ksKSBUagpFVApCVAovRjEgNyBUZgo4LjA0OTk5OTk5OTk5OTk5ODkgVEwKMC4zMTQgZwoyMjkuODAwMDM5MzcwMDc4NzM1NiA0ODMuNTQ1OTA1NTExODExMDk5NiBUZAooY29ycG9yYXRlKSBUagpFVApCVAovRjEgNyBUZgo4LjA0OTk5OTk5OTk5OTk5ODkgVEwKMC4zMTQgZwoyMjAuMTA1MDM5MzcwMDc4NzcwOCA0NzUuNDk1OTA1NTExODExMDg4MiBUZAooY29tbXVuaWNhdGlvbiwpIFRqCkVUCkJUCi9GMSA3IFRmCjguMDQ5OTk5OTk5OTk5OTk4OSBUTAowLjMxNCBnCjIyMC44NzUwMzkzNzAwNzg3NTI3IDQ2Ny40NDU5MDU1MTE4MTExMzM3IFRkCihhbmQgcHVibGljIHRydXN0KSBUagpFVAowLjk4IGcKMC44NiBHCjAuMjgzNDY0NTY2OTI5MTMzOSB3CjAuOTggZwoyNzQuNDk0MzMwNzA4NjYxNDM2OCA1MTkuMzE1MTk2ODUwMzkzNzA0MiAxMDMuMDg5MTkwNjgwMTA3MjkzNSAtNjcuNjg4NTgyNjc3MTY1MzQyNyByZQpCCkJUCi9GMSA3IFRmCjguMDQ5OTk5OTk5OTk5OTk4OSBUTAowLjMxNCBnCjI4Ni42Mjg5MjYwNDg3MTUxMjk2IDUwNy42OTU5MDU1MTE4MTEwMiBUZAooRGV2ZWxvcCBhbmQgaW1wbGVtZW50IGEpIFRqCkVUCkJUCi9GMSA3IFRmCjguMDQ5OTk5OTk5OTk5OTk4OSBUTAowLjMxNCBnCjI4MC4yNTg5MjYwNDg3MTUwNjgyIDQ5OS42NDU5MDU1MTE4MTEwNjU1IFRkCihjb3Jwb3JhdGUgY29tbXVuaWNhdGlvbiBhbmQpIFRqCkVUCkJUCi9GMSA3IFRmCjguMDQ5OTk5OTk5OTk5OTk4OSBUTAowLjMxNCBnCjI4NC4xMDg5MjYwNDg3MTUwOTA5IDQ5MS41OTU5MDU1MTE4MTEwNTQxIFRkCihicmFuZGluZyBzdHJhdGVneSBFc3RhYmxpc2gpIFRqCkVUCkJUCi9GMSA3IFRmCjguMDQ5OTk5OTk5OTk5OTk4OSBUTAowLjMxNCBnCjI4NC45NDg5MjYwNDg3MTUwNjU5IDQ4My41NDU5MDU1MTE4MTEwOTk2IFRkCihicmFuZCBndWlkZWxpbmVzIFJlZGVzaWduKSBUagpFVApCVAovRjEgNyBUZgo4LjA0OTk5OTk5OTk5OTk5ODkgVEwKMC4zMTQgZwoyODIuMTQ4OTI2MDQ4NzE1MDU0NSA0NzUuNDk1OTA1NTExODExMDg4MiBUZAood2Vic2l0ZSBhbmQgc29jaWFsIG1lZGlhIGZvcikgVGoKRVQKQlQKL0YxIDcgVGYKOC4wNDk5OTk5OTk5OTk5OTg5IFRMCjAuMzE0IGcKMjkwLjEyODkyNjA0ODcxNTA3MjcgNDY3LjQ0NTkwNTUxMTgxMTEzMzcgVGQKKGJldHRlciBlbmdhZ2VtZW50IGFuZCkgVGoKRVQKQlQKL0YxIDcgVGYKOC4wNDk5OTk5OTk5OTk5OTg5IFRMCjAuMzE0IGcKMzA3LjQ1MzkyNjA0ODcxNTA2MTQgNDU5LjM5NTkwNTUxMTgxMTEyMjMgVGQKKGFjY2Vzc2liaWxpdHkpIFRqCkVUCjAuOTggZwowLjg2IEcKMC4yODM0NjQ1NjY5MjkxMzM5IHcKMC45OCBnCjM3Ny41ODM1MjEzODg3Njg3NTg3IDUxOS4zMTUxOTY4NTAzOTM3MDQyIDE0Ny43MzkyMzQ1MTY5NDAwNTg1IC02Ny42ODg1ODI2NzcxNjUzNDI3IHJlCkIKQlQKL0YxIDcgVGYKOC4wNDk5OTk5OTk5OTk5OTg5IFRMCjAuMzE0IGcKMzg4LjIwODEzODY0NzIzODg1NDQgNTA3LjY5NTkwNTUxMTgxMTAyIFRkCihTaXR1YXRpb25hbCBhbmFseXNpcyBzY29waW5nIHJlcG9ydC4sIERyYWZ0KSBUagpFVApCVAovRjEgNyBUZgo4LjA0OTk5OTk5OTk5OTk5ODkgVEwKMC4zMTQgZwozODUuNTgzMTM4NjQ3MjM4NzQwOCA0OTkuNjQ1OTA1NTExODExMDY1NSBUZAoocmVwb3J0LCBBcHByb3ZlZCBjb3Jwb3JhdGUgY29tbXVuaWNhdGlvbikgVGoKRVQKQlQKL0YxIDcgVGYKOC4wNDk5OTk5OTk5OTk5OTg5IFRMCjAuMzE0IGcKMzg3LjQzODEzODY0NzIzODgxNTggNDkxLjU5NTkwNTUxMTgxMTA1NDEgVGQKKGFuZCBicmFuZGluZyBzdHJhdGVneSwgQnJhbmQgYXNzZXNzbWVudCkgVGoKRVQKQlQKL0YxIDcgVGYKOC4wNDk5OTk5OTk5OTk5OTg5IFRMCjAuMzE0IGcKMzkzLjEwODEzODY0NzIzODc3NDkgNDgzLjU0NTkwNTUxMTgxMTA5OTYgVGQKKHJlcG9ydCwgRHJhZnQgYnJhbmQgZ3VpZGVsaW5lcyBtYW51YWwsKSBUagpFVApCVAovRjEgNyBUZgo4LjA0OTk5OTk5OTk5OTk5ODkgVEwKMC4zMTQgZwozODMuNzI4MTM4NjQ3MjM4Nzc5NCA0NzUuNDk1OTA1NTExODExMDg4MiBUZAooQXBwcm92ZWQgYnJhbmQgZ3VpZGVsaW5lIG1hbnVhbCwgUHJvZ3Jlc3MpIFRqCkVUCkJUCi9GMSA3IFRmCjguMDQ5OTk5OTk5OTk5OTk4OSBUTAowLjMxNCBnCjM5Mi42NTMxMzg2NDcyMzg3OTA4IDQ2Ny40NDU5MDU1MTE4MTExMzM3IFRkCihyZXBvcnQsIDAuMywgU3RhdGlzdGljcyBhbmQgZW5nYWdlbWVudCkgVGoKRVQKQlQKL0YxIDcgVGYKOC4wNDk5OTk5OTk5OTk5OTg5IFRMCjAuMzE0IGcKNDQyLjM4ODEzODY0NzIzODgwNDQgNDU5LjM5NTkwNTUxMTgxMTEyMjMgVGQKKHJlcG9ydCkgVGoKRVQKMC45OCBnCjAuODYgRwowLjI4MzQ2NDU2NjkyOTEzMzkgdwowLjk4IGcKNTI1LjMyMjc1NTkwNTcwODczMTkgNTE5LjMxNTE5Njg1MDM5MzcwNDIgNjEuMjQ4NTgyNjc3MTY1MzUyMSAtNjcuNjg4NTgyNjc3MTY1MzQyNyByZQpCCkJUCi9GMSA3IFRmCjguMDQ5OTk5OTk5OTk5OTk4OSBUTAowLjMxNCBnCjUzNC41OTcwNDcyNDQyOTEzODg4IDQ4My41NDU5MDU1MTE4MTEwNDI3IFRkCihDRU8gT0ZGSUNFKSBUagpFVAowLjk4IGcKMC44NiBHCjAuMjgzNDY0NTY2OTI5MTMzOSB3CjAuOTggZwo1ODYuNTcxMzM4NTgyODc0MjA0OCA1MTkuMzE1MTk2ODUwMzkzNzA0MiAzOS40MDg1ODI2NzcxNjUzNTU4IC02Ny42ODg1ODI2NzcxNjUzNDI3IHJlCkIKMC45OCBnCjAuODYgRwowLjI4MzQ2NDU2NjkyOTEzMzkgdwowLjk4IGcKNjI1Ljk3OTkyMTI2MDAzOTUzMjIgNTE5LjMxNTE5Njg1MDM5MzcwNDIgNzIuODY4NTgyNjc3MTY1MzYzNyAtNjcuNjg4NTgyNjc3MTY1MzQyNyByZQpCCkJUCi9GMSA3IFRmCjguMDQ5OTk5OTk5OTk5OTk4OSBUTAowLjMxNCBnCjY0Mi45MTkyMTI1OTg2MjIyNjYzIDQ4Ny41NzA5MDU1MTE4MTEwMiBUZAooMDQvMDEvMjAyNiAtKSBUagpFVApCVAovRjEgNyBUZgo4LjA0OTk5OTk5OTk5OTk5ODkgVEwKMC4zMTQgZwo2NDUuMDU0MjEyNTk4NjIyMjU3MiA0NzkuNTIwOTA1NTExODExMDY1NSBUZAooMDMvMzEvMjAyNykgVGoKRVQKMC45OCBnCjAuODYgRwowLjI4MzQ2NDU2NjkyOTEzMzkgdwowLjk4IGcKNjk4Ljg0ODUwMzkzNzIwNDg5NTkgNTE5LjMxNTE5Njg1MDM5MzcwNDIgNzIuODY4NTgyNjc3MTY1MzYzNyAtNjcuNjg4NTgyNjc3MTY1MzQyNyByZQpCCjAuOTggZwowLjg2IEcKMC4yODM0NjQ1NjY5MjkxMzM5IHcKMC45OCBnCjc3MS43MTcwODY2MTQzNzAyNTk3IDUxOS4zMTUxOTY4NTAzOTM3MDQyIDY1LjkzODU4MjY3NzE2NTM1NjkgLTY3LjY4ODU4MjY3NzE2NTM0MjcgcmUKQgowLjk4IGcKMC44NiBHCjAuMjgzNDY0NTY2OTI5MTMzOSB3CjAuOTggZwo4MzcuNjU1NjY5MjkxNTM1NTU5OCA1MTkuMzE1MTk2ODUwMzkzNzA0MiA3Mi44Njg1ODI2NzcxNjUzNjM3IC02Ny42ODg1ODI2NzcxNjUzNDI3IHJlCkIKQlQKL0YxIDcgVGYKOC4wNDk5OTk5OTk5OTk5OTg5IFRMCjAuMzE0IGcKODcxLjE0OTk2MDYzMDExODI0MzkgNDgzLjU0NTkwNTUxMTgxMTA0MjcgVGQKKCwgLCkgVGoKRVQKMC45OCBnCjAuODYgRwowLjI4MzQ2NDU2NjkyOTEzMzkgdwowLjk4IGcKOTEwLjUyNDI1MTk2ODcwMDkyMzUgNTE5LjMxNTE5Njg1MDM5MzcwNDIgODMuNTc4NTgyNjc3MTY1MzQzMyAtNjcuNjg4NTgyNjc3MTY1MzQyNyByZQpCCkJUCi9GMSA3IFRmCjguMDQ5OTk5OTk5OTk5OTk4OSBUTAowLjMxNCBnCjk0OS4zNzM1NDMzMDcyODM1MTIxIDQ4My41NDU5MDU1MTE4MTEwNDI3IFRkCigsICwpIFRqCkVUCjAuOTggZwowLjg2IEcKMC4yODM0NjQ1NjY5MjkxMzM5IHcKMC45OCBnCjk5NC4xMDI4MzQ2NDU4NjYzMjM2IDUxOS4zMTUxOTY4NTAzOTM3MDQyIDcyLjg2ODU4MjY3NzE2NTM2MzcgLTY3LjY4ODU4MjY3NzE2NTM0MjcgcmUKQgpCVAovRjEgNyBUZgo4LjA0OTk5OTk5OTk5OTk5ODkgVEwKMC4zMTQgZwoxMDI5LjU1NzEyNTk4NDQ0ODkzMDUgNDgzLjU0NTkwNTUxMTgxMTA0MjcgVGQKKCApIFRqCkVUCjAuOTggZwowLjg2IEcKMC4yODM0NjQ1NjY5MjkxMzM5IHcKMC45OCBnCjEwNjYuOTcxNDE3MzIzMDMxNTczNyA1MTkuMzE1MTk2ODUwMzkzNzA0MiA4My41Nzg1ODI2NzcxNjUzNDMzIC02Ny42ODg1ODI2NzcxNjUzNDI3IHJlCkIKQlQKL0YxIDcgVGYKOC4wNDk5OTk5OTk5OTk5OTg5IFRMCjAuMzE0IGcKMTEwNy43ODA3MDg2NjE2MTQxOTg3IDQ4My41NDU5MDU1MTE4MTEwNDI3IFRkCiggKSBUagpFVAowLjQ3IDAuMTggMC4zNSBSRwoxLjQxNzMyMjgzNDY0NTY2OTQgdwowLjg2IEcKMC4yODM0NjQ1NjY5MjkxMzM5IHcKNDAuIDcxNC4zMzA5NDQ4ODE4ODk3NjM2IDExMTAuNTQ5OTk5OTk5OTk5OTU0NSAtMjYyLjcwNDMzMDcwODY2MTQxNjMgcmUKUwowLjQ3IDAuMTggMC4zNSBSRwoxLjQxNzMyMjgzNDY0NTY2OTQgdwowLjQ3IDAuMTggMC4zNSBSRwoxLjQxNzMyMjgzNDY0NTY2OTQgdwowLjQ3IDAuMTggMC4zNSByZwowLiAzNC4wMTU3NDgwMzE0OTYwNjY1IDExOTAuNTQ5OTk5OTk5OTk5OTU0NSAtMzQuMDE1NzQ4MDMxNDk2MDY2NSByZQpmCkJUCi9GMiAxMCBUZgoxMS41IFRMCjEuIGcKMzQuMDE1NzQ4MDMxNDk2MDY2NSAxNC4xNzMyMjgzNDY0NTY2NTM1IFRkCihSZXBvcnQgVGVtcGxhdGUpIFRqCkVUCkJUCi9GMiAxMCBUZgoxMS41IFRMCjEuIGcKMTA4MS4zNTcwODY2MTQxNzMxMTMgMTQuMTczMjI4MzQ2NDU2NjUzNSBUZAooUGFnZSAxIG9mIDEpIFRqCkVUCmVuZHN0cmVhbQplbmRvYmoKMSAwIG9iago8PC9UeXBlIC9QYWdlcwovS2lkcyBbMyAwIFIgXQovQ291bnQgMQo+PgplbmRvYmoKNSAwIG9iago8PAovVHlwZSAvRm9udAovQmFzZUZvbnQgL0hlbHZldGljYQovU3VidHlwZSAvVHlwZTEKL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcKL0ZpcnN0Q2hhciAzMgovTGFzdENoYXIgMjU1Cj4+CmVuZG9iago2IDAgb2JqCjw8Ci9UeXBlIC9Gb250Ci9CYXNlRm9udCAvSGVsdmV0aWNhLUJvbGQKL1N1YnR5cGUgL1R5cGUxCi9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nCi9GaXJzdENoYXIgMzIKL0xhc3RDaGFyIDI1NQo+PgplbmRvYmoKNyAwIG9iago8PAovVHlwZSAvRm9udAovQmFzZUZvbnQgL0hlbHZldGljYS1PYmxpcXVlCi9TdWJ0eXBlIC9UeXBlMQovRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZwovRmlyc3RDaGFyIDMyCi9MYXN0Q2hhciAyNTUKPj4KZW5kb2JqCjggMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL0Jhc2VGb250IC9IZWx2ZXRpY2EtQm9sZE9ibGlxdWUKL1N1YnR5cGUgL1R5cGUxCi9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nCi9GaXJzdENoYXIgMzIKL0xhc3RDaGFyIDI1NQo+PgplbmRvYmoKOSAwIG9iago8PAovVHlwZSAvRm9udAovQmFzZUZvbnQgL0NvdXJpZXIKL1N1YnR5cGUgL1R5cGUxCi9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nCi9GaXJzdENoYXIgMzIKL0xhc3RDaGFyIDI1NQo+PgplbmRvYmoKMTAgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL0Jhc2VGb250IC9Db3VyaWVyLUJvbGQKL1N1YnR5cGUgL1R5cGUxCi9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nCi9GaXJzdENoYXIgMzIKL0xhc3RDaGFyIDI1NQo+PgplbmRvYmoKMTEgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL0Jhc2VGb250IC9Db3VyaWVyLU9ibGlxdWUKL1N1YnR5cGUgL1R5cGUxCi9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nCi9GaXJzdENoYXIgMzIKL0xhc3RDaGFyIDI1NQo+PgplbmRvYmoKMTIgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL0Jhc2VGb250IC9Db3VyaWVyLUJvbGRPYmxpcXVlCi9TdWJ0eXBlIC9UeXBlMQovRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZwovRmlyc3RDaGFyIDMyCi9MYXN0Q2hhciAyNTUKPj4KZW5kb2JqCjEzIDAgb2JqCjw8Ci9UeXBlIC9Gb250Ci9CYXNlRm9udCAvVGltZXMtUm9tYW4KL1N1YnR5cGUgL1R5cGUxCi9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nCi9GaXJzdENoYXIgMzIKL0xhc3RDaGFyIDI1NQo+PgplbmRvYmoKMTQgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL0Jhc2VGb250IC9UaW1lcy1Cb2xkCi9TdWJ0eXBlIC9UeXBlMQovRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZwovRmlyc3RDaGFyIDMyCi9MYXN0Q2hhciAyNTUKPj4KZW5kb2JqCjE1IDAgb2JqCjw8Ci9UeXBlIC9Gb250Ci9CYXNlRm9udCAvVGltZXMtSXRhbGljCi9TdWJ0eXBlIC9UeXBlMQovRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZwovRmlyc3RDaGFyIDMyCi9MYXN0Q2hhciAyNTUKPj4KZW5kb2JqCjE2IDAgb2JqCjw8Ci9UeXBlIC9Gb250Ci9CYXNlRm9udCAvVGltZXMtQm9sZEl0YWxpYwovU3VidHlwZSAvVHlwZTEKL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcKL0ZpcnN0Q2hhciAzMgovTGFzdENoYXIgMjU1Cj4+CmVuZG9iagoxNyAwIG9iago8PAovVHlwZSAvRm9udAovQmFzZUZvbnQgL1phcGZEaW5nYmF0cwovU3VidHlwZSAvVHlwZTEKL0ZpcnN0Q2hhciAzMgovTGFzdENoYXIgMjU1Cj4+CmVuZG9iagoxOCAwIG9iago8PAovVHlwZSAvRm9udAovQmFzZUZvbnQgL1N5bWJvbAovU3VidHlwZSAvVHlwZTEKL0ZpcnN0Q2hhciAzMgovTGFzdENoYXIgMjU1Cj4+CmVuZG9iagoxOSAwIG9iago8PAovVHlwZSAvWE9iamVjdAovU3VidHlwZSAvSW1hZ2UKL1dpZHRoIDE4OQovSGVpZ2h0IDUwCi9Db2xvclNwYWNlIC9EZXZpY2VSR0IKL0JpdHNQZXJDb21wb25lbnQgOAovTGVuZ3RoIDcyODUKL0ZpbHRlciAvRENURGVjb2RlCj4+CnN0cmVhbQr/2P/gABBKRklGAAEBAQDAAMAAAP/bAEMAAgEBAgEBAgICAgICAgIDBQMDAwMDBgQEAwUHBgcHBwYHBwgJCwkICAoIBwcKDQoKCwwMDAwHCQ4PDQwOCwwMDP/bAEMBAgICAwMDBgMDBgwIBwgMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDP/AABEIADIAvQMBIgACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgv/xAC1EAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5+jp6vHy8/T19vf4+fr/xAAfAQADAQEBAQEBAQEBAAAAAAAAAQIDBAUGBwgJCgv/xAC1EQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/AP38oorH8f8AjvTfhn4O1DXtYuYrPTdNiM080sqRJGo7s7lUUe7MAO5FVGMpSUYq7ZM5xhFyk7JbmxmvAfjL/wAFGvAfw1v7zSfD0OufE3xNYkpPpXhGybUfsbf9PFwv7iAA/eDvuA52mvJbPxV47/4KM63Oujq9h8M45DG15dLPb6VeL/sQDy7jUSRzmdobYZANvNgO30Z4C/Zw8M/BzwzZxW9omqXVn5cFvLexxiK3Luq/ubeNVggXJzshjQcfjXdWWGwabqr2k1vFO0Y23UpJNtrZxjZpqzkmebRqYnG29g/Zwe0mrykns4xbSSe6lK6a1UWfJPij9tL9rL4vSN/whPwr0HwdpsufLlnkOtXgHY74z5Q+hjJ/r5z4o0j9sLWZvtGveM/EVmxOdtqTpcf0AjijWv06066uFvprW4aGRo40kV4kKDDFhgqSem3rnnPTjm8yh1KsMqeCD3rTDcTZlS9/CQw8PL2HNt3c6kpfdI87MOCsvxi5MbiMTK/VV+TfsoU4x++LPz1/Z31z4/8AhTXoU1fxjrlzvP8Ax7ajsvo5h3AdwxPr8jAivuLwD4zvtVs7W31y3t7LVJkLKIm/dz4GTtUksp77STwMgnBxV8d6VpvhTTZLz7JEsMjAEL8vlPyQy46HjqOhxivia9/a61ib9s3wn4UgklurgeJrSymkzjdC8yK7cesTEkDjk17GCxVbiavUw9SnTp16UHOXs48qcV1t2vZO7e+589isPhOCMLSq+3rVaFapGnH2snOXPL7N+9k2rKK0eh+hdeT/AAU+Lus+OP2i/jN4Z1CS3bS/BOo6Xb6WqRBXRLjTYbiQM38X7x2IJ6A4r1ivK7T9kzSNK/aJ1T4k2HiPxpp2pa5NBPqel22qBNJ1B4bZbaMywbMtiNV/i6jNeDg5UFCrGtu4+67XtLmi/ldJq/mfcYyNdzpSo7KXvK9rx5ZL52bTt5HqlfK/7Zf7R3jP4f8A7UXgnwX4f17UvD+lazoV3ql1LpvgyXxNdSyx3VtCitFEd0UW2ViZOgOAeor6oryv41/sl6P8a/iPo3ix/EfjTwvr2h2M2mQ3Xh7VPsLTW0skcrxyfI25S8SHHHStsnr4eliefFK8bS6J6tOzs01o/JmOcUMRVw3JhXaV4vdrRNXV009V5o9UFeMft2fEzxl8JvgnBq/g1bmOZdXtY9Xu7TTl1K807TSWNxcW9sxAmkQBTswx2722nbXs4GBXD/Hr4C6X+0F4W0/TtSvtY0m40bU4NY03UdKuFgvNPu4dwSVGZXQ/K7qQysCGPHQ1hl1SlTxMJ11eKet1dfd/w/o9jozGnVqYacKDtJrSzs/v/wCG9VuQ/st+O9Q+Jv7PPhHX9V1jQPEOoapp0c82paIHWxvic/vI1cBlyACVIBVty4GKk/ah+KN38Ef2bvHvjHT4Ybi/8L+H77VLaOYExvLDA8iBgCDt3KM4PStL4K/B/RfgF8LdF8H+H47iPSNDhMMH2iUyzSEsXd3buzOzMTgDLHAA4rQ+IHgXTfih4E1rw3rVv9q0fxBYzadew7ivmwzI0brkcjKseRyKcqmH+u+0tenzXta3u32tstOhEaeI+pKm3apyWve/vW3vu9ep4j+wx8ZfGfjnxF4/8LeNtZtfEl/4RfSLiDU4rBLFpo7/AE6K6MbRx/L+7dnUEclSM5PNfQ1ea/s4fsuaF+zNYawul6j4g1u/16aCW+1LWrtbi7nEECW8EZZURQkcUaqoC56kkk5r0qqzWtQq4mU8OrRstlZXUUm0lsm7u3mLKqNelhYwxDvK73d3ZybSbe7Ssr+R85fALxX8T9b/AGzPiV4Y8QeOtL1bwv4HisJ4bKLw7Hay3Iv4p5EUzCUlfJ8oDODvzztr6NrlfC3wd0fwf8VfFnjGz+1f2v4yisYdQDyBosWiSJFsXHy8SNnk546V1VTmGIhWqqVNJLlitEo6qK5nZJbyu7jy7DzoUnGo23zSerctHJ8qu29o2Vj43/bU/bx8Vfs+fF/xx4c0uO5kSx8O+H7/AEmSLRZLy3tLi61Se3uWuZlUrGrQoqp5hUbh8vOa+yK8q+K/7HfhH4y674o1HWG1YXHi7TNN0m+EFyEUQ2F3JdwbBtO1jJIdxOcqAAByT6rXTmGIwlShShh42kviff3YL81L779Tny/D4unXqzxErxfwrt703+Tj91uh4v8Atp/FHxP4B0n4f6P4T1SDQ9U8feMbPw42pyWaXbafC8NxPJIkb/IzkQbRuBA3E44FaH7Dnxm1j9oH9lTwf4s8QfZjrWpW8sd69vH5cUssM8sDSKuTt3GLdjoN2K3/AI+/AHSf2hvC+m6dqd9rGk3Gi6nBrOmajpVwsF5p93FuCSxsysudrupDKwIc8Vo/BX4QaL8AvhXong7w9HcR6PoNuLe38+XzZn5LM7t/E7MzMTxyx4HSipiMK8ujRjH97zXbt096+u9neNl0s311KeHxSzGVaUv3XLZK/X3babaWld9bpdNJPi98XNB+BXw51TxV4mvk0/RtHhMs8p5Zj0VEXqzsxCqo5JIFfBfw7j8V/wDBVv41WeseMluNI+GOmTG70jwwrfumiQ4F1ddpZWOAoOVXJIG3Jdv/AAVA8a6n+0X+05oPwtsmn/4Rvw3cW7agEJ2S3c4Ulz2PlwuFX0Z5Pw+sv2Nvh7b+A/DupJHCsMj+TGAFxtjVWCgeg6/lXJxF7bK6WCwNDSti1Kc5renRS0jF9JVXvJWcYXSs5NnFw3iqWfY3H4mprhsDJU4x6Va7+KUu8KOlou6lPWV1FI9c0HQbPwvo1tp+n28VpZWaCOGKMYVFH+eveud+O/xJt/hB8Ite8SXVl/aUOl2+/wCy7gonZmCKpJB2qWYZbBwMnBxiuurP8V2lnqPh26tb+zg1CzvU+yy2syB4rhZCE2ODkFTuwcg8Z4NefywhT5VpFLtol6fofUxlKVRSlq2++r+f6niv7Df7WH/DTNr4qtrnRINI1XwzcwJcPb3TXMN0kyuY2DsN24eWwKknA2kHnA96rj/hD8LvDnwd0260Xw54c0vw3byOLuWOxHyXDNld7MQGZhtxznACgHHAm+Mnxp8N/AXwLeeIvFGp2umabZoWLSyBTIR/CuTyan2lKFNST0VltbXZ6dLvZedkOpGUqrst9d72W+/kt2ee/tzfFey+GvwqVbi5it2nkM8ju2BFBEpZ3P0JUe+TXx3/AMEnfgpqX7Rn7Rut/HDWbWaHw5pd1PHoglXH226YGPcP7ywxkgnp5jDByjAbNj8IvHH/AAVx+JX/AAkGuLqHg34J20y7S2YdQ8SIh3JHCjDdHBzu8xwNxbcASfk/QLwP4I0n4a+ENO0HQdPtdK0fSYFtrS0t02xwRqMAAfqSeSSSck16eSxq5SsXjKumJxUVTUetKindqX/Tyo9ZR+xFKLtO6XzWd0KWe18HQir4XCTdVS/5+12rKUf+ndJXUZfbk3JXhZvVr5R8dftIfGTx/wDtNfFTwj8L4vA6QfCOHRGksdbtpTJ4hkv0M0i/aVlVbZY4gdp8tyWHPB4+rq+fPjh/wTg8G/HX4h+J9evtc8YaTb+O4rCHxTpWmXkMVl4hWxYG387dE0qFQApMUiEqMdyT15LWwlOrN4u1rKzceZJ80W7q6veKklqtWtVut86o4upTgsI3dPVKXK2uWSWtna0nFvR6J6PZ+QftVf8ABQX4kfCvx38bNQ8Ox+FY/C3wGPh5b7Tb2wlnu/EB1IoZdtwsyiDy1cBf3b5IyeOKb+0v/wAFQvE37N/7ZHijw3faboUnw80Hw4twk7RSLenUpdOu722jL79pWRrR4goUHLrzmvYPjV/wTb8FfHH4geJNav8AWvF2m2Pjj+zf+Eo0XT7uFNP8Q/YGBtvODxNKu0KqnypE3ADPPNXfi/8A8E7fh98cfiD4g8Sa9/bE154kl0Wa5hSeMQRnS5Wkh2KUJAcOySZJyrELtPNfQYfH5EowVanf3LOy1TapK9+rUlVkn2kl5L57EZfnzc3QqW9+6u9Gk6rtbonF0otaaxb8382X3/BSf4zWv7Bdh4wXR/B7/Ey4+JTeBHtfsc32EkNIuAnm7t5dAud2Mc4zXVfs2f8ABT3xL+0h+2Lb+H9N0/QV+G+peFpNSsrgRyG9kvYbOyuJwX37diPdmLG3OYzzkV7ZD/wT68EQ+D7LRBeeIDZ2PxA/4WRGTcx7zqPntN5ZPl48jcxG3G7GPnzzUfwS/wCCdPw9/Z/8ZeH9a8PDWI5vDlpqtlbwSzxtDJHqFyLiXeAgJKEBEwRhAAdxGaqrmWRSo1UqPvvn5dNFzLTr0aSXZNipZbn0a1Jut7i5Oa71fK9enVNt92keYfs5/t/+NPiwv7Lv9pWPh+P/AIXNaeIJtc8i3kXyWsI2aHyMyHYCR827dntivNPgt/wV88Z+PdT8K6Dq2keH9P8AEWu/E+18Pri3kWHUNAnmvIDcQAyE+dFPatGzElRlMr81fR/wO/4Jw+D/AIEeO/CusWOveMNWtPAMV/D4V0nUruCSy8Prek/aPK2QpLJkEqDNJJtB47GqWn/8EtPhnps3w5njfxAb34Y+IrrxJpN2bmLzpZbi5N08Ex8vDwiTaQoCsAv3uWJp4/h9TmvZ3TvZpbPmqyWl+idOD9G1eyblYDiBwptVLNW5k3uuWlF627qpNeqTtdpcD8U/+CivjD4f/Cf4/wCsW+l6Bc6n8O/G9t4S8PJJHIsLLP8AZUWS5w+XKtM7HaVzgDjrXfeOvj38TP2Vv2dfi54q+JT+D9ZPg22E/hrUdMt5LRdYaSJRHHcWxlkMRFy6R8SfMpyAOp3fF3/BPjwH438D/E/QNQm16Sz+K2tp4g1N0ulSayu0EPlvbME+Ta0CMAwfkkHIOKyLj/gmj4M8QeGNf0/xHr/jDxVceLvEGneIPEF7qdzbtLrT2G0QW0yRwpF9nwoBRUUkfxdMcccVk7jFONlzRcvdu2rU72d9Nql+/MtHvHrlhM5UpNSu+WSj71km3UtdW13p22tyvXpLg/hZ+1/8Vvip+xp478QR3ngPSPiV8J9T1O18QxSaZPeaffR2kDTp5CJcIyeYjRYcsw+V/l54Lz9sT4qeBv2D/B3xU1q48E6lrHjfUfD7W1tZ6RcW0FjaX8sKyxvuuXMkgWRgHBUDrtNeweEP2EfAPw9ufigvh+1uNB0z4sWEVhqulacsNtYWYS3ktzJaxJGBE7pKSxO4FgDjrmx4m/Yt8J+K/wBmzwn8Lbq61tfD3g1tLaymjnjF1J/Z7xtD5jbCp3eWA2FGQTjbxhSzHK/aq1NcjnGT91XUbXlFdbKWiV9vIccuzVUneo+dQlFe87OV7Rl2u46t238z57/ak/4KD/Eb4W+PfjVqXh6PwqnhP4FXPh+3vdNvbCWa88Qf2iUMpWdZlWDy1kAX92+SMn0qv+1H/wAFS/FH7PH7TXxW8IyaXo//AAjvh3wit5oGpTQP+71mSwmvIILk7wGSYQTqoUKd0ajOWr2b4z/8E2/Bfxv+IviXXdQ1rxdp9l44k02XxPolhdwpp/iBrAg2xmDRNKuNqg+VIm4AZ55q18bv+Cc/w9/aAvPiVP4h/tmST4oWem2mo+VPGv2E2G/7PNbZjOyQbzktuBAxgAkHqwuYZFH2ar07rlSdlqn+6Tfm01Vl5qSj5LlxWX59L2joVbPmbV3o1+9aXkmnSj5OLlbq/If2j/26/id8OvCvw11qzj8L+FvDnizwZDrVz4k1XR7q/wBLOtSojR6dM0UqmxgfdxcSbwNwH8LGvsTwPq914g8FaPf3q2K3l9Yw3E4sp/tFsJHjVm8qTjfHkna2PmGD3rxH4o/8E5/CvxKs9Jhh8S+NPDv9neEB4Eum0y6t/wDibaPgf6POs0Mi7uCfMjCOCxwemPbPAXgnTvhp4G0Xw5o8LW+k6BYwadZRM5cxwwxrHGpY8nCqBk8mvEzTEYCphqccKrTTlfS2l9Lvv83/ANu7P28rw+Pp4mpLFO8Go21vrbWy6L5L/t7deG+JP2ddLt/i14i8QalcQ2rXF2LtJWAL5IVlYDqcEY9MoRXTaB8e/DtgPL0+W3N5bjFxbmTDkd8eq9w2Prg5Fd18VvhNp3xb8OyWN5Jc2c20iG7tmCzQE+mQQw9VII+hwR8E/HD/AIJLfFvUPET33h3xl4f1qJHLQtdSzafcR+mFVXXj13iuqjl2CzylbGYxYetBJQlKPMrLp009WrdL638DMs0zPhyqpZVlrxVGpJupGM1F3b1et3fV2tFp9WtGfcWn/tKeDbtQJ9XjsJu8dypXH44K/rRrH7QfgaW3MD67b3TSEbY7RZJpCwORt8sE5BAIPqK/PXQf+CUP7TGvXQTUPiNouh2nRnOsXd1MB/sqI8H8XFer/D//AIIdaddgN8Svi18QPHETcy6fbXLafZS+qOC8rsv+6yH6dK8Grw3iqDcMTmWHlHvCnVnJr05oRv8A9vpH0mD4rWLip0MqxEJf9PKtKCT9Upyt/wBuNnpPxM/4KGaH4c8QNoHhRodY8W3yhI7eVzf6gxGcKthZCScEZJHmLCnJLOvJrnfBH7C/ij9o/wAeWvjL4yXmoSQ2ziaz0q9kjNwvcYghZrayHsr3M4JytxCcrX0d8Cf2ZvAP7Mvhs6T4D8KaP4atHA802sP7+5x0MszZklI9XYmu6qsPUoYL/c7ymvtztzLzjFaQvd63lLX4jqrUK+M/36yj/JC/L/29J6ztZW0jHT4SvpOk2ug6bDZ2dvFa2tuuyOKNdqoPYVYoorjbbd2eglZWQV4Z+0D+2lF8C/2mPhn8Pv7DOpQ+OJGXUdR+1eX/AGKrypb2rFNp8zzrh9nVcbSeele518y/tM/8E7R+0b8Wtb8azeLL7TNcW10WDw0YWnWDR3sLx7t2miSVUufMkYYDj92VyOea9bJ44J139fdoWffd6J6fy35vls9n5OcSxqoL6grzuu2y1a1/mty/Pdbr6ar5/wD2cP24m+P3jHwZpR8NrpY8WeHNY18yC+877N9h1OKxEWNi7t/mF92RtxjB619AV83/ALK/7C+rfs+fFa11nUPFdjrWj+G9I1LQ/D1pBpjW1xHb32orfyNcyGV1kkVkSNSioCoJIyaMCsG8PVeI+NW5d9dJLpp8XK9ei9Qx7xn1iksP8GvNt/NF9dfh5lp1foexfHTxn4g+Hfwr1jXPDOiad4h1TS4TcixvdRbT4pY1+aQ+asUpDBAxA2ckAZGc1i/smfGLxB+0B8CNB8Z+IfDum+F5PEtrDqVjZ2eqNqINpNEksTu5hi2yEOQUAIGB8xzgdt408Pf8Jd4O1bSfN+z/ANqWc1p5u3d5fmIU3Y4zjOcZrD/Z/wDhg3wS+BXgzwbJeLqEnhTRLPSGulj8sXJggSIuFydu7bnGTjPU1zxqUPqbi4r2nMrPW/LZ368u9ulzeVOv9cU1J+z5XdaW5rq3Tm2v1seWfta/t6aZ+yj4u1DStSs9MYw+B9T8V2Ul5qq2f9oXNpJEkdhGGU7nl8xiCuWG3hT29x8J67/wlHhbTdS8vyf7RtYrry927y96BsZ4zjOM14n+1R+xHD+0x4u1bVJtUsrX+0PAOq+DYI7iwFx9knvJInS8UlhzH5ZG0YJ3cMK9s8JaH/wi/hXTNN8zzv7OtIrXzNu3zNiBc47ZxnFdGM+o/U6PsP4uvPv8vL7jDB/Xvrlb2/8AC05Nvntr958/+Df28NQ8U/tUr4Jk8K2lv4WvfEmqeELHVxqRa8fUdPs0u5jJb+UFWFlLorCQtmPJABGPYP2gfir/AMKL+BXjHxp9h/tP/hE9Fu9X+yeb5P2ryIWk8vfhtu7bjODjOcGvHvBv7COpeF/2qV8aSeKbKfwrY+JdV8X2OkrprLeLqGoWaWkyyXHmlWhUB3UCMNl8EkCvYP2h/hW3xz+AvjPwXHerpsnizRLvSVu2i80WxnhaMOVyNwXdnGRnHWujG/2d9Zoew+C0ef4t+Z3vfW/La9tL7HNgf7S+rV/b/HeXJ8O3KrWtpbmva+ttzhv2L/2sbv8Aao0XxRJfaHpmk3XhfUYrB5tK1f8AtbTrzzLWG5BiuPKiyyCYI6bflZSMnt1XxO+OTfDr4z/DXwiNNF2PiDd39qbrz9n2H7NZyXOdu0792zbjK4znnpWD+y7+yrB+zJr/AI4lsL60k0vxZe2V7BY21kLWOxeGwgtZTgMVJleEyEgDlucnmtz4ofA5/iJ8afhn4uXUltV+H95f3TWxh3m9FzZSW2A2Rs2l93Q5xjjrWeIeAeNk6WlLldt9Jez0Xf4/l8jXD/2gsFBVdavMr7ax9orvtrD5/M7Dxle6tp3hTULjQrCz1TWYYHeytLq7NpDcygfKjyhHKKTxuCNj0ry39in9orxV+0/8NbrxP4h8I6T4Ts2vbiysEs9bbUpLlre4mtpy4MEQjAkhO3BbcGyduMH2SvPf2Xfga/7OfwctfCsmpLqzW+oajffaVh8kMLq+nugu3c33RMFznnbnjOK5KdSgsHOMor2nNGz1ulaXN15d1HdX1dvLrqU8Q8ZTlGT9nyyutLOV48vTm2ctnbRX8+X/AGy/2w4f2NtK0PWtW0OTUPDeqfbrae8inKvbXkdq89pbhAp3faWieINkbXKDB3cereB9U1LW/Bej3msaemk6teWUM17YpN5y2c7IpkiD4G4KxK7sDOM4Fcf+098B/wDhov4b2fh/7dHpv2XXdK1jznt/ODCzvoblo9uRy6xFM543ZweleiU60sM8JTVONql5cz11WnK+3Vp27LbW6owxKxdR1JXp2jyqy0eqku/RNX7vfSxRRRXnnoBRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAf/ZCmVuZHN0cmVhbQplbmRvYmoKMiAwIG9iago8PAovUHJvY1NldCBbL1BERiAvVGV4dCAvSW1hZ2VCIC9JbWFnZUMgL0ltYWdlSV0KL0ZvbnQgPDwKL0YxIDUgMCBSCi9GMiA2IDAgUgovRjMgNyAwIFIKL0Y0IDggMCBSCi9GNSA5IDAgUgovRjYgMTAgMCBSCi9GNyAxMSAwIFIKL0Y4IDEyIDAgUgovRjkgMTMgMCBSCi9GMTAgMTQgMCBSCi9GMTEgMTUgMCBSCi9GMTIgMTYgMCBSCi9GMTMgMTcgMCBSCi9GMTQgMTggMCBSCj4+Ci9YT2JqZWN0IDw8Ci9JMCAxOSAwIFIKPj4KPj4KZW5kb2JqCjIwIDAgb2JqCjw8Ci9Qcm9kdWNlciAoanNQREYgMi41LjEpCi9DcmVhdGlvbkRhdGUgKEQ6MjAyNjAzMzExMjA4NDkrMDInMDAnKQo+PgplbmRvYmoKMjEgMCBvYmoKPDwKL1R5cGUgL0NhdGFsb2cKL1BhZ2VzIDEgMCBSCi9PcGVuQWN0aW9uIFszIDAgUiAvRml0SCBudWxsXQovUGFnZUxheW91dCAvT25lQ29sdW1uCj4+CmVuZG9iagp4cmVmCjAgMjIKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDI0MDMwIDAwMDAwIG4gCjAwMDAwMzMzMDAgMDAwMDAgbiAKMDAwMDAwMDAxNSAwMDAwMCBuIAowMDAwMDAwMTUzIDAwMDAwIG4gCjAwMDAwMjQwODcgMDAwMDAgbiAKMDAwMDAyNDIxMiAwMDAwMCBuIAowMDAwMDI0MzQyIDAwMDAwIG4gCjAwMDAwMjQ0NzUgMDAwMDAgbiAKMDAwMDAyNDYxMiAwMDAwMCBuIAowMDAwMDI0NzM1IDAwMDAwIG4gCjAwMDAwMjQ4NjQgMDAwMDAgbiAKMDAwMDAyNDk5NiAwMDAwMCBuIAowMDAwMDI1MTMyIDAwMDAwIG4gCjAwMDAwMjUyNjAgMDAwMDAgbiAKMDAwMDAyNTM4NyAwMDAwMCBuIAowMDAwMDI1NTE2IDAwMDAwIG4gCjAwMDAwMjU2NDkgMDAwMDAgbiAKMDAwMDAyNTc1MSAwMDAwMCBuIAowMDAwMDI1ODQ3IDAwMDAwIG4gCjAwMDAwMzM1NTkgMDAwMDAgbiAKMDAwMDAzMzY0NSAwMDAwMCBuIAp0cmFpbGVyCjw8Ci9TaXplIDIyCi9Sb290IDIxIDAgUgovSW5mbyAyMCAwIFIKL0lEIFsgPDBDNDdDMjg2NjA0NTIxQUE5OTgyMTM4RUUzMEQ5MUM0PiA8MEM0N0MyODY2MDQ1MjFBQTk5ODIxMzhFRTMwRDkxQzQ+IF0KPj4Kc3RhcnR4cmVmCjMzNzQ5CiUlRU9G",
            "createdTime": "2026-04-01T08:08:28",
            "updatedTime": null
        }
    ],
    "taskList": [
        {
            "id": 3,
            "active": 0,
            "initiativeId": 54,
            "taskValue": {
                "createdByName": "Nizam Goolam",
                "ownerName": "Nizam Goolam",
                "dateRange": "04/01/2026 - 12/31/2026",
                "progressval": "0",
                "progress": "50",
                "status": "in progress",
                "desc": "Task Testing1"
            },
            "owner": 2241,
            "createdBy": 2241,
            "updatedBy": 0,
            "createdTime": "2026-03-30T13:31:18",
            "updatedTime": null
        },
        {
            "id": 4,
            "active": 0,
            "initiativeId": 54,
            "taskValue": {
                "createdByName": "Nizam Goolam",
                "ownerName": "Nizam Goolam",
                "dateRange": "04/08/2026 - 12/31/2026",
                "progressval": "0",
                "progress": "60",
                "status": "in progress",
                "desc": "Task Test 4"
            },
            "owner": 2241,
            "createdBy": 2241,
            "updatedBy": 0,
            "createdTime": "2026-03-31T06:46:05",
            "updatedTime": null
        },
        {
            "id": 5,
            "active": 0,
            "initiativeId": 54,
            "taskValue": {
                "createdByName": "Nizam Goolam",
                "ownerName": "Nizam Goolam",
                "dateRange": "04/02/2026 - 12/30/2026",
                "progressval": "0",
                "progress": "100",
                "status": "completed",
                "desc": "Task 3"
            },
            "owner": 2241,
            "createdBy": 2241,
            "updatedBy": 0,
            "createdTime": "2026-04-01T06:34:16",
            "updatedTime": null
        }
    ],
    "pageId": 3706,
    "perspectiveId": 4566,
    "scorecardDetailId": 3682,
    "objectiveId": 435,
    "createDateString": "13-Mar-2026",
    "updatedDateString": "30-Mar-2026",
    "createdTime": "2026-03-13T10:53:15",
    "updatedTime": "2026-03-30T06:06:54",
    "active": 0,
    "owner": 2241,
    "createdBy": 3706,
    "updatedBy": 2241,
    "initiativeId": "CA 2.1.1.2",
    "departmentId": 1049
    };
    console.log(data, result, "data and result");
   var progressvalue = "0";

  if (result.initiativeValue.progressval != undefined) {
    progressvalue = result.initiativeValue.progressval;
  }
var daysremaining = "0";
  var daterangeformatted = "";
  if (
    result.initiativeValue.daterange != undefined &&
    result.initiativeValue.daterange != ""
  ) {
    var datestring = result.initiativeValue.daterange;

    if (datestring.includes("-")) {
      var dateval = datestring.split("-");
      var endDate = Date.parse(dateval[1]);
      var today = new Date();
      const currDate = Date.parse(today);

      var Difference_In_Time = endDate - currDate;
      var days = Difference_In_Time / (1000 * 60 * 60 * 24);
      // expected output: 0

      if (days > 0) {
        daysremaining = Math.round(days).toString();
      }

      var startdate = new Date(dateval[0]);
      var enddateformatted = new Date(dateval[1]);
      /*
       * daterangeformatted = startdate.toLocaleDateString('en-GB', {
       * day : 'numeric', month : 'short', year : 'numeric' }) + " - " +
       * enddateformatted.toLocaleDateString('en-GB', { day :
       * 'numeric', month : 'short', year : 'numeric' });
       */
    }
  }
  var daterangeformatted =
    dateFormatedtohumanread(startdate) +
    "- " +
    dateFormatedtohumanread(enddateformatted);
    var initdetail = {
    id: result.id,
    title: result.initiativeValue.name,
    Owner: result.initiativeValue.createdByName,
    chartHeader:
      result.initiativeValue.chartHeader == undefined ||
      result.initiativeValue.chartHeader == ""
        ? "Chart"
        : result.initiativeValue.chartHeader,
    id: result.id,
    status: result.initiativeValue.status,
    progressval: progressvalue,
    progressvalpercent: progressvalue + "%",
    intiativedaterange: daterangeformatted,
    diffdays: daysremaining + " days",
  };

  initiativegrattChart(
    initdetail,
    result,
    progressvalue,
    "initiativeview", 
    activitiesganttchart
  );
  const dataaa = [{
    "id": 1032,
    "initiativeValue": {
        "daysRemaining": 30,
        "createdByName": null,
        "impactDesc": "NA",
        "blank": false,
        "statusType": "manual",
        "totalBudget": 0,
        "statusIndicator": "RED",
        "actualdaterange": "04/01/2025 - 03/31/2026",
        "description": "NA",
        "BalCurr": "$",
        "perspectiveName": "Customer And Stakeholder",
        "total": false,
        "balance": false,
        "ownerName": "Mary",
        "statusLight": "progress-bar width-per-15 rounded-pill bar_height orange_bar",
        "Utilized": "45",
        "targetValue": 100,
        "utilized": false,
        "budget": false,
        "objectiveDesc": "To Strengthen Construction And Maintenance Efficiently In Order To Have Resilient Road Infrastructure",
        "actual": false,
        "daterange": "04/01/2025 - 03/31/2026",
        "progressval": "50",
        "updatedByName": "Mary",
        "actualValue": "50",
        "dateString": "01 Apr 2025 - 31 Mar 2026",
        "forecast": false,
        "dept": "Chief Executive officer",
        "target": false,
        "categoryType": "Compliance",
        "totalActual": 0,
        "TotCurr": "0",
        "Total": "45",
        "name": "Regulatory Compliance",
        "utilizedCurr": "$"
    },
    "subInitiativeList": [
        {
            "id": 1023,
            "active": 0,
            "subInitiativeValue": {
                "createdByName": null,
                "multipleowners": "2138",
                "contribution": "50",
                "performance": "",
                "ownerName": "Mary",
                "dateRange": "11/18/2025 - 11/19/2025",
                "progressval": "65",
                "updatedByName": "Mary",
                "name": "",
                "description": "Compliance Risk Assessment",
                "impremark": "",
                "targetValue": 100,
                "statusLight": "progress-bar width-per-15 rounded-pill bar_height orange_bar",
                "statusIndicator": "RED"
            },
            "createdTime": "2025-11-04T04:34:22",
            "updatedTime": "2025-11-18T03:13:51",
            "owner": 2138,
            "initiativeId": 1032,
            "createdBy": 2797,
            "updatedBy": 2138,
            "activitiesList": [
                {
                    "id": 939,
                    "active": 0,
                    "activitiesValue": {
                        "actual": "",
                        "createdByName": "Mary",
                        "subInitiativeName": "Compliance Risk Assessment",
                        "multipleowners": "2138",
                        "ownerName": "Mary",
                        "dateRange": "04/01/2025 - 04/30/2025",
                        "progressval": "0",
                        "updatedByName": "Mary",
                        "name": "",
                        "progress": "90",
                        "desc": "Identify Compliance Risks",
                        "budget": ""
                    },
                    "createdTime": "2025-11-04T04:34:22",
                    "updatedTime": "2025-11-18T04:12:51",
                    "owner": 2138,
                    "initiativeId": 1032,
                    "createdBy": 2797,
                    "updatedBy": 2138,
                    "subInitiativeId": "1023",
                    "activitiesMapDTOList": [
                        {
                            "id": 1089,
                            "activitiesId": 939,
                            "active": 0,
                            "empId": 0,
                            "employeeProfilePos": {
                                "empId": 2138,
                                "orgId": {
                                    "id": 4,
                                    "name": "Demo1",
                                    "status": "Active"
                                },
                                "firstName": "Mary",
                                "lastName": null,
                                "userRole": 0,
                                "profileImage": "",
                                "parentEmpId": 0,
                                "department": null,
                                "title": null,
                                "location": "Lesotho",
                                "emailAddress": "mary@demo.com",
                                "createdDate": null
                            }
                        }
                    ],
                    "subActivityList": [
                        {
                            "id": 743,
                            "active": 0,
                            "activitiesValue": {
                                "createdByName": null,
                                "multipleowners": "2138",
                                "ownerName": "Mary",
                                "dateRange": "04/01/2025 - 04/10/2025",
                                "progressval": "0",
                                "name": "Conduct Risk Workshops",
                                "description": "Conduct Risk Workshops",
                                "progress": 0,
                                "desc": "Conduct Risk Workshops"
                            },
                            "createdTime": "2025-11-04T04:34:22",
                            "updatedTime": null,
                            "owner": 2138,
                            "activitieId": 939,
                            "createdBy": 2797,
                            "updatedBy": 0
                        },
                        {
                            "id": 744,
                            "active": 0,
                            "activitiesValue": {
                                "createdByName": null,
                                "multipleowners": "2138",
                                "ownerName": "Mary",
                                "dateRange": "04/11/2025 - 04/20/2025",
                                "progressval": "0",
                                "name": "Assess Impact",
                                "description": "Assess Impact",
                                "progress": 0,
                                "desc": "Assess Impact"
                            },
                            "createdTime": "2025-11-04T04:34:23",
                            "updatedTime": null,
                            "owner": 2138,
                            "activitieId": 939,
                            "createdBy": 2797,
                            "updatedBy": 0
                        },
                        {
                            "id": 745,
                            "active": 0,
                            "activitiesValue": {
                                "createdByName": null,
                                "multipleowners": "2138",
                                "ownerName": "Mary",
                                "dateRange": "04/21/2025 - 04/30/2025",
                                "progressval": "0",
                                "name": "Identify Controls",
                                "description": "Identify Controls",
                                "progress": 0,
                                "desc": "Identify Controls"
                            },
                            "createdTime": "2025-11-04T04:34:24",
                            "updatedTime": null,
                            "owner": 2138,
                            "activitieId": 939,
                            "createdBy": 2797,
                            "updatedBy": 0
                        }
                    ]
                },
                {
                    "id": 940,
                    "active": 0,
                    "activitiesValue": {
                        "actual": "",
                        "createdByName": "Mary",
                        "subInitiativeName": "Compliance Risk Assessment",
                        "multipleowners": "2138",
                        "ownerName": "Mary",
                        "dateRange": "05/01/2025 - 06/30/2025",
                        "progressval": "0",
                        "updatedByName": "Mary",
                        "name": "",
                        "progress": "40",
                        "desc": "Compliance Gap Analysis",
                        "budget": ""
                    },
                    "createdTime": "2025-11-04T04:34:26",
                    "updatedTime": "2025-11-18T05:07:04",
                    "owner": 2138,
                    "initiativeId": 1032,
                    "createdBy": 2797,
                    "updatedBy": 2138,
                    "subInitiativeId": "1023",
                    "activitiesMapDTOList": [
                        {
                            "id": 1093,
                            "activitiesId": 940,
                            "active": 0,
                            "empId": 0,
                            "employeeProfilePos": {
                                "empId": 2138,
                                "orgId": {
                                    "id": 4,
                                    "name": "Demo1",
                                    "status": "Active"
                                },
                                "firstName": "Mary",
                                "lastName": null,
                                "userRole": 0,
                                "profileImage": "",
                                "parentEmpId": 0,
                                "department": null,
                                "title": null,
                                "location": "Lesotho",
                                "emailAddress": "mary@demo.com",
                                "createdDate": null
                            }
                        }
                    ],
                    "subActivityList": [
                        {
                            "id": 746,
                            "active": 0,
                            "activitiesValue": {
                                "actual": "",
                                "createdByName": "Mary",
                                "ownerName": "Mary",
                                "dateRange": "05/01/2025 - 05/15/2025",
                                "progressval": "0",
                                "updatedByName": "Mary",
                                "name": "",
                                "progress": "40",
                                "desc": "Current Compliance Review",
                                "budget": ""
                            },
                            "createdTime": "2025-11-04T04:34:26",
                            "updatedTime": "2025-11-24T10:01:00",
                            "owner": 2138,
                            "activitieId": 940,
                            "createdBy": 2797,
                            "updatedBy": 2138
                        },
                        {
                            "id": 747,
                            "active": 0,
                            "activitiesValue": {
                                "createdByName": null,
                                "multipleowners": "2138",
                                "ownerName": "Mary",
                                "dateRange": "05/16/2025 - 05/31/2025",
                                "progressval": "0",
                                "name": "Gap Identification",
                                "description": "Gap Identification",
                                "progress": 0,
                                "desc": "Gap Identification"
                            },
                            "createdTime": "2025-11-04T04:34:27",
                            "updatedTime": null,
                            "owner": 2138,
                            "activitieId": 940,
                            "createdBy": 2797,
                            "updatedBy": 0
                        },
                        {
                            "id": 748,
                            "active": 0,
                            "activitiesValue": {
                                "createdByName": null,
                                "multipleowners": "2138",
                                "ownerName": "Mary",
                                "dateRange": "06/01/2025 - 06/30/2025",
                                "progressval": "0",
                                "name": "Gap Remediation Planning",
                                "description": "Gap Remediation Planning",
                                "progress": 0,
                                "desc": "Gap Remediation Planning"
                            },
                            "createdTime": "2025-11-04T04:34:28",
                            "updatedTime": null,
                            "owner": 2138,
                            "activitieId": 940,
                            "createdBy": 2797,
                            "updatedBy": 0
                        }
                    ]
                }
            ],
            "subInitiativesMapDTOList": [
                {
                    "id": 1783,
                    "subInitiativeId": 1023,
                    "active": 0,
                    "empId": 2138,
                    "employeeProfilePos": {
                        "empId": 2138,
                        "orgId": {
                            "id": 4,
                            "name": "Demo1",
                            "status": "Active"
                        },
                        "firstName": "Mary",
                        "lastName": null,
                        "userRole": 0,
                        "profileImage": "",
                        "parentEmpId": 0,
                        "department": null,
                        "title": null,
                        "location": "Lesotho",
                        "emailAddress": "mary@demo.com",
                        "createdDate": null
                    }
                }
            ]
        },
        {
            "id": 1024,
            "active": 0,
            "subInitiativeValue": {
                "createdByName": "Mary",
                "multipleowners": "2138",
                "ownerName": "Mary",
                "statusLight": "progress-bar width-per-15 rounded-pill bar_height orange_bar",
                "statusIndicator": "RED",
                "dateRange": "07/01/2025 - 07/31/2025",
                "progressval": "50",
                "updatedByName": null,
                "targetValue": 100,
                "description": "Training & Awareness"
            },
            "createdTime": "2025-11-04T04:34:30",
            "updatedTime": "2025-11-04T04:34:30",
            "owner": 2138,
            "initiativeId": 1032,
            "createdBy": 2797,
            "updatedBy": 2797,
            "activitiesList": [
                {
                    "id": 941,
                    "active": 0,
                    "activitiesValue": {
                        "actual": "",
                        "createdByName": "Mary",
                        "subInitiativeName": "Training & Awareness",
                        "multipleowners": "2138",
                        "ownerName": "Mary",
                        "dateRange": "07/01/2025 - 07/31/2025",
                        "progressval": "0",
                        "updatedByName": "Mary",
                        "name": "",
                        "progress": "50",
                        "desc": "Training & Awareness",
                        "budget": ""
                    },
                    "createdTime": "2025-11-04T04:34:30",
                    "updatedTime": "2025-11-18T04:13:14",
                    "owner": 2138,
                    "initiativeId": 1032,
                    "createdBy": 2797,
                    "updatedBy": 2138,
                    "subInitiativeId": "1024",
                    "activitiesMapDTOList": [
                        {
                            "id": 1090,
                            "activitiesId": 941,
                            "active": 0,
                            "empId": 0,
                            "employeeProfilePos": {
                                "empId": 2138,
                                "orgId": {
                                    "id": 4,
                                    "name": "Demo1",
                                    "status": "Active"
                                },
                                "firstName": "Mary",
                                "lastName": null,
                                "userRole": 0,
                                "profileImage": "",
                                "parentEmpId": 0,
                                "department": null,
                                "title": null,
                                "location": "Lesotho",
                                "emailAddress": "mary@demo.com",
                                "createdDate": null
                            }
                        }
                    ],
                    "subActivityList": [
                        {
                            "id": 749,
                            "active": 0,
                            "activitiesValue": {
                                "createdByName": null,
                                "multipleowners": "2138",
                                "ownerName": "Mary",
                                "dateRange": "07/01/2025 - 07/10/2025",
                                "progressval": "0",
                                "name": "Create Training Content",
                                "description": "Create Training Content",
                                "progress": 0,
                                "desc": "Create Training Content"
                            },
                            "createdTime": "2025-11-04T04:34:30",
                            "updatedTime": null,
                            "owner": 2138,
                            "activitieId": 941,
                            "createdBy": 2797,
                            "updatedBy": 0
                        },
                        {
                            "id": 750,
                            "active": 0,
                            "activitiesValue": {
                                "createdByName": null,
                                "multipleowners": "2138",
                                "ownerName": "Mary",
                                "dateRange": "07/11/2025 - 07/31/2025",
                                "progressval": "0",
                                "name": "Deliver Training",
                                "description": "Deliver Training",
                                "progress": 0,
                                "desc": "Deliver Training"
                            },
                            "createdTime": "2025-11-04T04:34:31",
                            "updatedTime": null,
                            "owner": 2138,
                            "activitieId": 941,
                            "createdBy": 2797,
                            "updatedBy": 0
                        }
                    ]
                }
            ],
            "subInitiativesMapDTOList": [
                {
                    "id": 1628,
                    "subInitiativeId": 1024,
                    "active": 0,
                    "empId": 2138,
                    "employeeProfilePos": {
                        "empId": 2138,
                        "orgId": {
                            "id": 4,
                            "name": "Demo1",
                            "status": "Active"
                        },
                        "firstName": "Mary",
                        "lastName": null,
                        "userRole": 0,
                        "profileImage": "",
                        "parentEmpId": 0,
                        "department": null,
                        "title": null,
                        "location": "Lesotho",
                        "emailAddress": "mary@demo.com",
                        "createdDate": null
                    }
                }
            ]
        },
        {
            "id": 1025,
            "active": 0,
            "subInitiativeValue": {
                "createdByName": "Mary",
                "multipleowners": "2138",
                "ownerName": "Mary",
                "statusLight": "progress-bar width-per-15 rounded-pill bar_height orange_bar",
                "statusIndicator": "RED",
                "dateRange": "08/01/2025 - 11/30/2025",
                "progressval": "20",
                "updatedByName": null,
                "targetValue": 100,
                "description": "Regulatory Compliance"
            },
            "createdTime": "2025-11-04T04:34:32",
            "updatedTime": "2025-11-04T04:34:33",
            "owner": 2138,
            "initiativeId": 1032,
            "createdBy": 2797,
            "updatedBy": 2797,
            "activitiesList": [
                {
                    "id": 942,
                    "active": 0,
                    "activitiesValue": {
                        "actual": "",
                        "createdByName": "Mary",
                        "subInitiativeName": "Regulatory Compliance",
                        "multipleowners": "2138",
                        "ownerName": "Mary",
                        "dateRange": "08/01/2025 - 09/30/2025",
                        "progressval": "0",
                        "updatedByName": "Mary",
                        "name": "",
                        "progress": "20",
                        "desc": "Monitoring & Reporting",
                        "budget": ""
                    },
                    "createdTime": "2025-11-04T04:34:32",
                    "updatedTime": "2025-11-18T04:13:33",
                    "owner": 2138,
                    "initiativeId": 1032,
                    "createdBy": 2797,
                    "updatedBy": 2138,
                    "subInitiativeId": "1025",
                    "activitiesMapDTOList": [
                        {
                            "id": 1091,
                            "activitiesId": 942,
                            "active": 0,
                            "empId": 0,
                            "employeeProfilePos": {
                                "empId": 2138,
                                "orgId": {
                                    "id": 4,
                                    "name": "Demo1",
                                    "status": "Active"
                                },
                                "firstName": "Mary",
                                "lastName": null,
                                "userRole": 0,
                                "profileImage": "",
                                "parentEmpId": 0,
                                "department": null,
                                "title": null,
                                "location": "Lesotho",
                                "emailAddress": "mary@demo.com",
                                "createdDate": null
                            }
                        }
                    ],
                    "subActivityList": [
                        {
                            "id": 751,
                            "active": 0,
                            "activitiesValue": {
                                "createdByName": null,
                                "multipleowners": "2138",
                                "ownerName": "Mary",
                                "dateRange": "08/01/2025 - 08/15/2025",
                                "progressval": "0",
                                "name": "Setup Dashboard",
                                "description": "Setup Dashboard",
                                "progress": 0,
                                "desc": "Setup Dashboard"
                            },
                            "createdTime": "2025-11-04T04:34:32",
                            "updatedTime": null,
                            "owner": 2138,
                            "activitieId": 942,
                            "createdBy": 2797,
                            "updatedBy": 0
                        },
                        {
                            "id": 752,
                            "active": 0,
                            "activitiesValue": {
                                "createdByName": null,
                                "multipleowners": "2138",
                                "ownerName": "Mary",
                                "dateRange": "08/16/2025 - 09/30/2025",
                                "progressval": "0",
                                "name": "Periodic Reviews",
                                "description": "Periodic Reviews",
                                "progress": 0,
                                "desc": "Periodic Reviews"
                            },
                            "createdTime": "2025-11-04T04:34:33",
                            "updatedTime": null,
                            "owner": 2138,
                            "activitieId": 942,
                            "createdBy": 2797,
                            "updatedBy": 0
                        }
                    ]
                }
            ],
            "subInitiativesMapDTOList": [
                {
                    "id": 1630,
                    "subInitiativeId": 1025,
                    "active": 0,
                    "empId": 2138,
                    "employeeProfilePos": {
                        "empId": 2138,
                        "orgId": {
                            "id": 4,
                            "name": "Demo1",
                            "status": "Active"
                        },
                        "firstName": "Mary",
                        "lastName": null,
                        "userRole": 0,
                        "profileImage": "",
                        "parentEmpId": 0,
                        "department": null,
                        "title": null,
                        "location": "Lesotho",
                        "emailAddress": "mary@demo.com",
                        "createdDate": null
                    }
                }
            ]
        },
        {
            "id": 1026,
            "active": 0,
            "subInitiativeValue": {
                "createdByName": "Mary",
                "multipleowners": "2138",
                "ownerName": "Mary",
                "statusLight": "progress-bar width-per-15 rounded-pill bar_height orange_bar",
                "statusIndicator": "RED",
                "dateRange": "10/01/2025 - 12/31/2025",
                "progressval": "55",
                "updatedByName": null,
                "targetValue": 100,
                "description": "Data Governance Program"
            },
            "createdTime": "2025-11-04T04:34:34",
            "updatedTime": "2025-11-04T04:34:40",
            "owner": 2138,
            "initiativeId": 1032,
            "createdBy": 2797,
            "updatedBy": 2797,
            "activitiesList": [
                {
                    "id": 943,
                    "active": 0,
                    "activitiesValue": {
                        "actual": "",
                        "createdByName": "Mary",
                        "subInitiativeName": "Data Governance Program",
                        "multipleowners": "2138",
                        "ownerName": "Mary",
                        "dateRange": "10/01/2025 - 10/31/2025",
                        "progressval": "0",
                        "updatedByName": "Mary",
                        "name": "",
                        "progress": "55",
                        "desc": "Policy Development",
                        "budget": ""
                    },
                    "createdTime": "2025-11-04T04:34:34",
                    "updatedTime": "2025-11-18T04:14:03",
                    "owner": 2138,
                    "initiativeId": 1032,
                    "createdBy": 2797,
                    "updatedBy": 2138,
                    "subInitiativeId": "1026",
                    "activitiesMapDTOList": [
                        {
                            "id": 1092,
                            "activitiesId": 943,
                            "active": 0,
                            "empId": 0,
                            "employeeProfilePos": {
                                "empId": 2138,
                                "orgId": {
                                    "id": 4,
                                    "name": "Demo1",
                                    "status": "Active"
                                },
                                "firstName": "Mary",
                                "lastName": null,
                                "userRole": 0,
                                "profileImage": "",
                                "parentEmpId": 0,
                                "department": null,
                                "title": null,
                                "location": "Lesotho",
                                "emailAddress": "mary@demo.com",
                                "createdDate": null
                            }
                        }
                    ],
                    "subActivityList": [
                        {
                            "id": 753,
                            "active": 0,
                            "activitiesValue": {
                                "createdByName": null,
                                "multipleowners": "2138",
                                "ownerName": "Mary",
                                "dateRange": "10/01/2025 - 10/15/2025",
                                "progressval": "0",
                                "name": "Draft Policies",
                                "description": "Draft Policies",
                                "progress": 0,
                                "desc": "Draft Policies"
                            },
                            "createdTime": "2025-11-04T04:34:34",
                            "updatedTime": null,
                            "owner": 2138,
                            "activitieId": 943,
                            "createdBy": 2797,
                            "updatedBy": 0
                        },
                        {
                            "id": 754,
                            "active": 0,
                            "activitiesValue": {
                                "createdByName": null,
                                "multipleowners": "2138",
                                "ownerName": "Mary",
                                "dateRange": "10/16/2025 - 10/31/2025",
                                "progressval": "0",
                                "name": "Stakeholder Input",
                                "description": "Stakeholder Input",
                                "progress": 0,
                                "desc": "Stakeholder Input"
                            },
                            "createdTime": "2025-11-04T04:34:35",
                            "updatedTime": null,
                            "owner": 2138,
                            "activitieId": 943,
                            "createdBy": 2797,
                            "updatedBy": 0
                        }
                    ]
                },
                {
                    "id": 944,
                    "active": 0,
                    "activitiesValue": {
                        "createdByName": "Mary",
                        "multipleowners": "2138",
                        "ownerName": "Mary",
                        "dateRange": "11/01/2025 - 11/30/2025",
                        "progressval": "0",
                        "updatedByName": null,
                        "name": "Communication Campaign",
                        "description": "Communication Campaign",
                        "progress": 0,
                        "desc": "Communication Campaign"
                    },
                    "createdTime": "2025-11-04T04:34:36",
                    "updatedTime": "2025-11-04T04:34:37",
                    "owner": 2138,
                    "initiativeId": 0,
                    "createdBy": 2797,
                    "updatedBy": 2797,
                    "subInitiativeId": "1026",
                    "activitiesMapDTOList": [
                        {
                            "id": 946,
                            "activitiesId": 944,
                            "active": 0,
                            "empId": 0,
                            "employeeProfilePos": {
                                "empId": 2138,
                                "orgId": {
                                    "id": 4,
                                    "name": "Demo1",
                                    "status": "Active"
                                },
                                "firstName": "Mary",
                                "lastName": null,
                                "userRole": 0,
                                "profileImage": "",
                                "parentEmpId": 0,
                                "department": null,
                                "title": null,
                                "location": "Lesotho",
                                "emailAddress": "mary@demo.com",
                                "createdDate": null
                            }
                        }
                    ],
                    "subActivityList": [
                        {
                            "id": 755,
                            "active": 0,
                            "activitiesValue": {
                                "createdByName": null,
                                "multipleowners": "2138",
                                "ownerName": "Mary",
                                "dateRange": "11/01/2025 - 11/10/2025",
                                "progressval": "0",
                                "name": "Prepare Materials",
                                "description": "Prepare Materials",
                                "progress": 0,
                                "desc": "Prepare Materials"
                            },
                            "createdTime": "2025-11-04T04:34:36",
                            "updatedTime": null,
                            "owner": 2138,
                            "activitieId": 944,
                            "createdBy": 2797,
                            "updatedBy": 0
                        },
                        {
                            "id": 756,
                            "active": 0,
                            "activitiesValue": {
                                "createdByName": null,
                                "multipleowners": "2138",
                                "ownerName": "Mary",
                                "dateRange": "11/11/2025 - 11/30/2025",
                                "progressval": "0",
                                "name": "Employee Awareness",
                                "description": "Employee Awareness",
                                "progress": 0,
                                "desc": "Employee Awareness"
                            },
                            "createdTime": "2025-11-04T04:34:37",
                            "updatedTime": null,
                            "owner": 2138,
                            "activitieId": 944,
                            "createdBy": 2797,
                            "updatedBy": 0
                        }
                    ]
                },
                {
                    "id": 945,
                    "active": 0,
                    "activitiesValue": {
                        "createdByName": "Mary",
                        "multipleowners": "2138",
                        "ownerName": "Mary",
                        "dateRange": "12/01/2025 - 01/31/2026",
                        "progressval": "0",
                        "updatedByName": null,
                        "name": "Security Assessment",
                        "description": "Security Assessment",
                        "progress": 0,
                        "desc": "Security Assessment"
                    },
                    "createdTime": "2025-11-04T04:34:39",
                    "updatedTime": "2025-11-04T04:34:40",
                    "owner": 2138,
                    "initiativeId": 0,
                    "createdBy": 2797,
                    "updatedBy": 2797,
                    "subInitiativeId": "1026",
                    "activitiesMapDTOList": [
                        {
                            "id": 949,
                            "activitiesId": 945,
                            "active": 0,
                            "empId": 0,
                            "employeeProfilePos": {
                                "empId": 2138,
                                "orgId": {
                                    "id": 4,
                                    "name": "Demo1",
                                    "status": "Active"
                                },
                                "firstName": "Mary",
                                "lastName": null,
                                "userRole": 0,
                                "profileImage": "",
                                "parentEmpId": 0,
                                "department": null,
                                "title": null,
                                "location": "Lesotho",
                                "emailAddress": "mary@demo.com",
                                "createdDate": null
                            }
                        }
                    ],
                    "subActivityList": [
                        {
                            "id": 757,
                            "active": 0,
                            "activitiesValue": {
                                "createdByName": null,
                                "multipleowners": "2138",
                                "ownerName": "Mary",
                                "dateRange": "12/01/2025 - 12/15/2026",
                                "progressval": "0",
                                "name": "Conduct Vulnerability",
                                "description": "Conduct Vulnerability",
                                "progress": 0,
                                "desc": "Conduct Vulnerability"
                            },
                            "createdTime": "2025-11-04T04:34:39",
                            "updatedTime": null,
                            "owner": 2138,
                            "activitieId": 945,
                            "createdBy": 2797,
                            "updatedBy": 0
                        },
                        {
                            "id": 758,
                            "active": 0,
                            "activitiesValue": {
                                "createdByName": null,
                                "multipleowners": "2138",
                                "ownerName": "Mary",
                                "dateRange": "12/16/2025 - 12/31/2026",
                                "progressval": "0",
                                "name": "Penetration Testing",
                                "description": "Penetration Testing",
                                "progress": 0,
                                "desc": "Penetration Testing"
                            },
                            "createdTime": "2025-11-04T04:34:39",
                            "updatedTime": null,
                            "owner": 2138,
                            "activitieId": 945,
                            "createdBy": 2797,
                            "updatedBy": 0
                        },
                        {
                            "id": 759,
                            "active": 0,
                            "activitiesValue": {
                                "createdByName": null,
                                "multipleowners": "2138",
                                "ownerName": "Mary",
                                "dateRange": "01/01/2026 - 01/31/2026",
                                "progressval": "0",
                                "name": "Mitigation Implementation",
                                "description": "Mitigation Implementation",
                                "progress": 0,
                                "desc": "Mitigation Implementation"
                            },
                            "createdTime": "2025-11-04T04:34:40",
                            "updatedTime": null,
                            "owner": 2138,
                            "activitieId": 945,
                            "createdBy": 2797,
                            "updatedBy": 0
                        }
                    ]
                }
            ],
            "subInitiativesMapDTOList": [
                {
                    "id": 1637,
                    "subInitiativeId": 1026,
                    "active": 0,
                    "empId": 2138,
                    "employeeProfilePos": {
                        "empId": 2138,
                        "orgId": {
                            "id": 4,
                            "name": "Demo1",
                            "status": "Active"
                        },
                        "firstName": "Mary",
                        "lastName": null,
                        "userRole": 0,
                        "profileImage": "",
                        "parentEmpId": 0,
                        "department": null,
                        "title": null,
                        "location": "Lesotho",
                        "emailAddress": "mary@demo.com",
                        "createdDate": null
                    }
                }
            ]
        },
        {
            "id": 1027,
            "active": 0,
            "subInitiativeValue": {
                "createdByName": "Mary",
                "multipleowners": "2138",
                "ownerName": "Mary",
                "statusLight": "progress-bar width-per-15 rounded-pill bar_height orange_bar",
                "statusIndicator": "RED",
                "dateRange": "02/01/2026 - 03/31/2026",
                "progressval": "45",
                "updatedByName": null,
                "targetValue": 100,
                "description": "Reporting Automation"
            },
            "createdTime": "2025-11-04T04:34:42",
            "updatedTime": "2025-11-04T04:34:45",
            "owner": 2138,
            "initiativeId": 1032,
            "createdBy": 2797,
            "updatedBy": 2797,
            "activitiesList": [
                {
                    "id": 946,
                    "active": 0,
                    "activitiesValue": {
                        "actual": "",
                        "createdByName": "Mary",
                        "subInitiativeName": "Reporting Automation",
                        "multipleowners": "2138",
                        "ownerName": "Mary",
                        "dateRange": "02/01/2026 - 02/15/2026",
                        "progressval": "0",
                        "updatedByName": "Mary",
                        "name": "",
                        "progress": "45",
                        "desc": "Data Collection",
                        "budget": ""
                    },
                    "createdTime": "2025-11-04T04:34:42",
                    "updatedTime": "2025-11-18T05:09:06",
                    "owner": 2138,
                    "initiativeId": 1032,
                    "createdBy": 2797,
                    "updatedBy": 2138,
                    "subInitiativeId": "1027",
                    "activitiesMapDTOList": [
                        {
                            "id": 1096,
                            "activitiesId": 946,
                            "active": 0,
                            "empId": 0,
                            "employeeProfilePos": {
                                "empId": 2138,
                                "orgId": {
                                    "id": 4,
                                    "name": "Demo1",
                                    "status": "Active"
                                },
                                "firstName": "Mary",
                                "lastName": null,
                                "userRole": 0,
                                "profileImage": "",
                                "parentEmpId": 0,
                                "department": null,
                                "title": null,
                                "location": "Lesotho",
                                "emailAddress": "mary@demo.com",
                                "createdDate": null
                            }
                        }
                    ],
                    "subActivityList": [
                        {
                            "id": 760,
                            "active": 0,
                            "activitiesValue": {
                                "createdByName": null,
                                "multipleowners": "2138",
                                "ownerName": "Mary",
                                "dateRange": "02/01/2026 - 02/10/2026",
                                "progressval": "0",
                                "name": "Define Data Points",
                                "description": "Define Data Points",
                                "progress": 0,
                                "desc": "Define Data Points"
                            },
                            "createdTime": "2025-11-04T04:34:42",
                            "updatedTime": null,
                            "owner": 2138,
                            "activitieId": 946,
                            "createdBy": 2797,
                            "updatedBy": 0
                        },
                        {
                            "id": 761,
                            "active": 0,
                            "activitiesValue": {
                                "createdByName": null,
                                "multipleowners": "2138",
                                "ownerName": "Mary",
                                "dateRange": "02/11/2026 - 02/28/2026",
                                "progressval": "0",
                                "name": "Automate Data Feed",
                                "description": "Automate Data Feed",
                                "progress": 0,
                                "desc": "Automate Data Feed"
                            },
                            "createdTime": "2025-11-04T04:34:43",
                            "updatedTime": null,
                            "owner": 2138,
                            "activitieId": 946,
                            "createdBy": 2797,
                            "updatedBy": 0
                        }
                    ]
                },
                {
                    "id": 947,
                    "active": 0,
                    "activitiesValue": {
                        "createdByName": "Mary",
                        "multipleowners": "2138",
                        "ownerName": "Mary",
                        "dateRange": "03/01/2026 - 03/31/2026",
                        "progressval": "0",
                        "updatedByName": null,
                        "name": "Report Generation",
                        "description": "Report Generation",
                        "progress": 0,
                        "desc": "Report Generation"
                    },
                    "createdTime": "2025-11-04T04:34:44",
                    "updatedTime": "2025-11-04T04:34:45",
                    "owner": 2138,
                    "initiativeId": 0,
                    "createdBy": 2797,
                    "updatedBy": 2797,
                    "subInitiativeId": "1027",
                    "activitiesMapDTOList": [
                        {
                            "id": 953,
                            "activitiesId": 947,
                            "active": 0,
                            "empId": 0,
                            "employeeProfilePos": {
                                "empId": 2138,
                                "orgId": {
                                    "id": 4,
                                    "name": "Demo1",
                                    "status": "Active"
                                },
                                "firstName": "Mary",
                                "lastName": null,
                                "userRole": 0,
                                "profileImage": "",
                                "parentEmpId": 0,
                                "department": null,
                                "title": null,
                                "location": "Lesotho",
                                "emailAddress": "mary@demo.com",
                                "createdDate": null
                            }
                        }
                    ],
                    "subActivityList": [
                        {
                            "id": 762,
                            "active": 0,
                            "activitiesValue": {
                                "createdByName": null,
                                "multipleowners": "2138",
                                "ownerName": "Mary",
                                "dateRange": "03/01/2026 - 03/15/2026",
                                "progressval": "0",
                                "name": "Create Report Templates",
                                "description": "Create Report Templates",
                                "progress": 0,
                                "desc": "Create Report Templates"
                            },
                            "createdTime": "2025-11-04T04:34:44",
                            "updatedTime": null,
                            "owner": 2138,
                            "activitieId": 947,
                            "createdBy": 2797,
                            "updatedBy": 0
                        },
                        {
                            "id": 763,
                            "active": 0,
                            "activitiesValue": {
                                "createdByName": null,
                                "multipleowners": "2138",
                                "ownerName": "Mary",
                                "dateRange": "03/15/2026 - 03/31/2026",
                                "progressval": "0",
                                "name": "Automate Submission",
                                "description": "Automate Submission",
                                "progress": 0,
                                "desc": "Automate Submission"
                            },
                            "createdTime": "2025-11-04T04:34:45",
                            "updatedTime": null,
                            "owner": 2138,
                            "activitieId": 947,
                            "createdBy": 2797,
                            "updatedBy": 0
                        }
                    ]
                }
            ],
            "subInitiativesMapDTOList": [
                {
                    "id": 1641,
                    "subInitiativeId": 1027,
                    "active": 0,
                    "empId": 2138,
                    "employeeProfilePos": {
                        "empId": 2138,
                        "orgId": {
                            "id": 4,
                            "name": "Demo1",
                            "status": "Active"
                        },
                        "firstName": "Mary",
                        "lastName": null,
                        "userRole": 0,
                        "profileImage": "",
                        "parentEmpId": 0,
                        "department": null,
                        "title": null,
                        "location": "Lesotho",
                        "emailAddress": "mary@demo.com",
                        "createdDate": null
                    }
                }
            ]
        }
    ],
    "activitiesList": [
        {
            "id": 939,
            "active": 0,
            "activitiesValue": {
                "actual": "",
                "createdByName": "Mary",
                "subInitiativeName": "Compliance Risk Assessment",
                "multipleowners": "2138",
                "ownerName": "Mary",
                "dateRange": "04/01/2025 - 04/30/2025",
                "progressval": "0",
                "updatedByName": "Mary",
                "name": "",
                "progress": "90",
                "desc": "Identify Compliance Risks",
                "budget": ""
            },
            "createdTime": "2025-11-04T04:34:22",
            "updatedTime": "2025-11-18T04:12:51",
            "owner": 2138,
            "initiativeId": 1032,
            "createdBy": 2797,
            "updatedBy": 2138,
            "subInitiativeId": "1023",
            "activitiesMapDTOList": [
                {
                    "id": 1089,
                    "activitiesId": 939,
                    "active": 0,
                    "empId": 0,
                    "employeeProfilePos": {
                        "empId": 2138,
                        "orgId": {
                            "id": 4,
                            "name": "Demo1",
                            "status": "Active"
                        },
                        "firstName": "Mary",
                        "lastName": null,
                        "userRole": 0,
                        "profileImage": "",
                        "parentEmpId": 0,
                        "department": null,
                        "title": null,
                        "location": "Lesotho",
                        "emailAddress": "mary@demo.com",
                        "createdDate": null
                    }
                }
            ],
            "subActivityList": [
                {
                    "id": 743,
                    "active": 0,
                    "activitiesValue": {
                        "createdByName": null,
                        "multipleowners": "2138",
                        "ownerName": "Mary",
                        "dateRange": "04/01/2025 - 04/10/2025",
                        "progressval": "0",
                        "name": "Conduct Risk Workshops",
                        "description": "Conduct Risk Workshops",
                        "progress": 0,
                        "desc": "Conduct Risk Workshops"
                    },
                    "createdTime": "2025-11-04T04:34:22",
                    "updatedTime": null,
                    "owner": 2138,
                    "activitieId": 939,
                    "createdBy": 2797,
                    "updatedBy": 0
                },
                {
                    "id": 744,
                    "active": 0,
                    "activitiesValue": {
                        "createdByName": null,
                        "multipleowners": "2138",
                        "ownerName": "Mary",
                        "dateRange": "04/11/2025 - 04/20/2025",
                        "progressval": "0",
                        "name": "Assess Impact",
                        "description": "Assess Impact",
                        "progress": 0,
                        "desc": "Assess Impact"
                    },
                    "createdTime": "2025-11-04T04:34:23",
                    "updatedTime": null,
                    "owner": 2138,
                    "activitieId": 939,
                    "createdBy": 2797,
                    "updatedBy": 0
                },
                {
                    "id": 745,
                    "active": 0,
                    "activitiesValue": {
                        "createdByName": null,
                        "multipleowners": "2138",
                        "ownerName": "Mary",
                        "dateRange": "04/21/2025 - 04/30/2025",
                        "progressval": "0",
                        "name": "Identify Controls",
                        "description": "Identify Controls",
                        "progress": 0,
                        "desc": "Identify Controls"
                    },
                    "createdTime": "2025-11-04T04:34:24",
                    "updatedTime": null,
                    "owner": 2138,
                    "activitieId": 939,
                    "createdBy": 2797,
                    "updatedBy": 0
                }
            ]
        },
        {
            "id": 940,
            "active": 0,
            "activitiesValue": {
                "actual": "",
                "createdByName": "Mary",
                "subInitiativeName": "Compliance Risk Assessment",
                "multipleowners": "2138",
                "ownerName": "Mary",
                "dateRange": "05/01/2025 - 06/30/2025",
                "progressval": "0",
                "updatedByName": "Mary",
                "name": "",
                "progress": "40",
                "desc": "Compliance Gap Analysis",
                "budget": ""
            },
            "createdTime": "2025-11-04T04:34:26",
            "updatedTime": "2025-11-18T05:07:04",
            "owner": 2138,
            "initiativeId": 1032,
            "createdBy": 2797,
            "updatedBy": 2138,
            "subInitiativeId": "1023",
            "activitiesMapDTOList": [
                {
                    "id": 1093,
                    "activitiesId": 940,
                    "active": 0,
                    "empId": 0,
                    "employeeProfilePos": {
                        "empId": 2138,
                        "orgId": {
                            "id": 4,
                            "name": "Demo1",
                            "status": "Active"
                        },
                        "firstName": "Mary",
                        "lastName": null,
                        "userRole": 0,
                        "profileImage": "",
                        "parentEmpId": 0,
                        "department": null,
                        "title": null,
                        "location": "Lesotho",
                        "emailAddress": "mary@demo.com",
                        "createdDate": null
                    }
                }
            ],
            "subActivityList": [
                {
                    "id": 746,
                    "active": 0,
                    "activitiesValue": {
                        "actual": "",
                        "createdByName": "Mary",
                        "ownerName": "Mary",
                        "dateRange": "05/01/2025 - 05/15/2025",
                        "progressval": "0",
                        "updatedByName": "Mary",
                        "name": "",
                        "progress": "40",
                        "desc": "Current Compliance Review",
                        "budget": ""
                    },
                    "createdTime": "2025-11-04T04:34:26",
                    "updatedTime": "2025-11-24T10:01:00",
                    "owner": 2138,
                    "activitieId": 940,
                    "createdBy": 2797,
                    "updatedBy": 2138
                },
                {
                    "id": 747,
                    "active": 0,
                    "activitiesValue": {
                        "createdByName": null,
                        "multipleowners": "2138",
                        "ownerName": "Mary",
                        "dateRange": "05/16/2025 - 05/31/2025",
                        "progressval": "0",
                        "name": "Gap Identification",
                        "description": "Gap Identification",
                        "progress": 0,
                        "desc": "Gap Identification"
                    },
                    "createdTime": "2025-11-04T04:34:27",
                    "updatedTime": null,
                    "owner": 2138,
                    "activitieId": 940,
                    "createdBy": 2797,
                    "updatedBy": 0
                },
                {
                    "id": 748,
                    "active": 0,
                    "activitiesValue": {
                        "createdByName": null,
                        "multipleowners": "2138",
                        "ownerName": "Mary",
                        "dateRange": "06/01/2025 - 06/30/2025",
                        "progressval": "0",
                        "name": "Gap Remediation Planning",
                        "description": "Gap Remediation Planning",
                        "progress": 0,
                        "desc": "Gap Remediation Planning"
                    },
                    "createdTime": "2025-11-04T04:34:28",
                    "updatedTime": null,
                    "owner": 2138,
                    "activitieId": 940,
                    "createdBy": 2797,
                    "updatedBy": 0
                }
            ]
        },
        {
            "id": 941,
            "active": 0,
            "activitiesValue": {
                "actual": "",
                "createdByName": "Mary",
                "subInitiativeName": "Training & Awareness",
                "multipleowners": "2138",
                "ownerName": "Mary",
                "dateRange": "07/01/2025 - 07/31/2025",
                "progressval": "0",
                "updatedByName": "Mary",
                "name": "",
                "progress": "50",
                "desc": "Training & Awareness",
                "budget": ""
            },
            "createdTime": "2025-11-04T04:34:30",
            "updatedTime": "2025-11-18T04:13:14",
            "owner": 2138,
            "initiativeId": 1032,
            "createdBy": 2797,
            "updatedBy": 2138,
            "subInitiativeId": "1024",
            "activitiesMapDTOList": [
                {
                    "id": 1090,
                    "activitiesId": 941,
                    "active": 0,
                    "empId": 0,
                    "employeeProfilePos": {
                        "empId": 2138,
                        "orgId": {
                            "id": 4,
                            "name": "Demo1",
                            "status": "Active"
                        },
                        "firstName": "Mary",
                        "lastName": null,
                        "userRole": 0,
                        "profileImage": "",
                        "parentEmpId": 0,
                        "department": null,
                        "title": null,
                        "location": "Lesotho",
                        "emailAddress": "mary@demo.com",
                        "createdDate": null
                    }
                }
            ],
            "subActivityList": [
                {
                    "id": 749,
                    "active": 0,
                    "activitiesValue": {
                        "createdByName": null,
                        "multipleowners": "2138",
                        "ownerName": "Mary",
                        "dateRange": "07/01/2025 - 07/10/2025",
                        "progressval": "0",
                        "name": "Create Training Content",
                        "description": "Create Training Content",
                        "progress": 0,
                        "desc": "Create Training Content"
                    },
                    "createdTime": "2025-11-04T04:34:30",
                    "updatedTime": null,
                    "owner": 2138,
                    "activitieId": 941,
                    "createdBy": 2797,
                    "updatedBy": 0
                },
                {
                    "id": 750,
                    "active": 0,
                    "activitiesValue": {
                        "createdByName": null,
                        "multipleowners": "2138",
                        "ownerName": "Mary",
                        "dateRange": "07/11/2025 - 07/31/2025",
                        "progressval": "0",
                        "name": "Deliver Training",
                        "description": "Deliver Training",
                        "progress": 0,
                        "desc": "Deliver Training"
                    },
                    "createdTime": "2025-11-04T04:34:31",
                    "updatedTime": null,
                    "owner": 2138,
                    "activitieId": 941,
                    "createdBy": 2797,
                    "updatedBy": 0
                }
            ]
        },
        {
            "id": 942,
            "active": 0,
            "activitiesValue": {
                "actual": "",
                "createdByName": "Mary",
                "subInitiativeName": "Regulatory Compliance",
                "multipleowners": "2138",
                "ownerName": "Mary",
                "dateRange": "08/01/2025 - 09/30/2025",
                "progressval": "0",
                "updatedByName": "Mary",
                "name": "",
                "progress": "20",
                "desc": "Monitoring & Reporting",
                "budget": ""
            },
            "createdTime": "2025-11-04T04:34:32",
            "updatedTime": "2025-11-18T04:13:33",
            "owner": 2138,
            "initiativeId": 1032,
            "createdBy": 2797,
            "updatedBy": 2138,
            "subInitiativeId": "1025",
            "activitiesMapDTOList": [
                {
                    "id": 1091,
                    "activitiesId": 942,
                    "active": 0,
                    "empId": 0,
                    "employeeProfilePos": {
                        "empId": 2138,
                        "orgId": {
                            "id": 4,
                            "name": "Demo1",
                            "status": "Active"
                        },
                        "firstName": "Mary",
                        "lastName": null,
                        "userRole": 0,
                        "profileImage": "",
                        "parentEmpId": 0,
                        "department": null,
                        "title": null,
                        "location": "Lesotho",
                        "emailAddress": "mary@demo.com",
                        "createdDate": null
                    }
                }
            ],
            "subActivityList": [
                {
                    "id": 751,
                    "active": 0,
                    "activitiesValue": {
                        "createdByName": null,
                        "multipleowners": "2138",
                        "ownerName": "Mary",
                        "dateRange": "08/01/2025 - 08/15/2025",
                        "progressval": "0",
                        "name": "Setup Dashboard",
                        "description": "Setup Dashboard",
                        "progress": 0,
                        "desc": "Setup Dashboard"
                    },
                    "createdTime": "2025-11-04T04:34:32",
                    "updatedTime": null,
                    "owner": 2138,
                    "activitieId": 942,
                    "createdBy": 2797,
                    "updatedBy": 0
                },
                {
                    "id": 752,
                    "active": 0,
                    "activitiesValue": {
                        "createdByName": null,
                        "multipleowners": "2138",
                        "ownerName": "Mary",
                        "dateRange": "08/16/2025 - 09/30/2025",
                        "progressval": "0",
                        "name": "Periodic Reviews",
                        "description": "Periodic Reviews",
                        "progress": 0,
                        "desc": "Periodic Reviews"
                    },
                    "createdTime": "2025-11-04T04:34:33",
                    "updatedTime": null,
                    "owner": 2138,
                    "activitieId": 942,
                    "createdBy": 2797,
                    "updatedBy": 0
                }
            ]
        },
        {
            "id": 943,
            "active": 0,
            "activitiesValue": {
                "actual": "",
                "createdByName": "Mary",
                "subInitiativeName": "Data Governance Program",
                "multipleowners": "2138",
                "ownerName": "Mary",
                "dateRange": "10/01/2025 - 10/31/2025",
                "progressval": "0",
                "updatedByName": "Mary",
                "name": "",
                "progress": "55",
                "desc": "Policy Development",
                "budget": ""
            },
            "createdTime": "2025-11-04T04:34:34",
            "updatedTime": "2025-11-18T04:14:03",
            "owner": 2138,
            "initiativeId": 1032,
            "createdBy": 2797,
            "updatedBy": 2138,
            "subInitiativeId": "1026",
            "activitiesMapDTOList": [
                {
                    "id": 1092,
                    "activitiesId": 943,
                    "active": 0,
                    "empId": 0,
                    "employeeProfilePos": {
                        "empId": 2138,
                        "orgId": {
                            "id": 4,
                            "name": "Demo1",
                            "status": "Active"
                        },
                        "firstName": "Mary",
                        "lastName": null,
                        "userRole": 0,
                        "profileImage": "",
                        "parentEmpId": 0,
                        "department": null,
                        "title": null,
                        "location": "Lesotho",
                        "emailAddress": "mary@demo.com",
                        "createdDate": null
                    }
                }
            ],
            "subActivityList": [
                {
                    "id": 753,
                    "active": 0,
                    "activitiesValue": {
                        "createdByName": null,
                        "multipleowners": "2138",
                        "ownerName": "Mary",
                        "dateRange": "10/01/2025 - 10/15/2025",
                        "progressval": "0",
                        "name": "Draft Policies",
                        "description": "Draft Policies",
                        "progress": 0,
                        "desc": "Draft Policies"
                    },
                    "createdTime": "2025-11-04T04:34:34",
                    "updatedTime": null,
                    "owner": 2138,
                    "activitieId": 943,
                    "createdBy": 2797,
                    "updatedBy": 0
                },
                {
                    "id": 754,
                    "active": 0,
                    "activitiesValue": {
                        "createdByName": null,
                        "multipleowners": "2138",
                        "ownerName": "Mary",
                        "dateRange": "10/16/2025 - 10/31/2025",
                        "progressval": "0",
                        "name": "Stakeholder Input",
                        "description": "Stakeholder Input",
                        "progress": 0,
                        "desc": "Stakeholder Input"
                    },
                    "createdTime": "2025-11-04T04:34:35",
                    "updatedTime": null,
                    "owner": 2138,
                    "activitieId": 943,
                    "createdBy": 2797,
                    "updatedBy": 0
                }
            ]
        },
        {
            "id": 946,
            "active": 0,
            "activitiesValue": {
                "actual": "",
                "createdByName": "Mary",
                "subInitiativeName": "Reporting Automation",
                "multipleowners": "2138",
                "ownerName": "Mary",
                "dateRange": "02/01/2026 - 02/15/2026",
                "progressval": "0",
                "updatedByName": "Mary",
                "name": "",
                "progress": "45",
                "desc": "Data Collection",
                "budget": ""
            },
            "createdTime": "2025-11-04T04:34:42",
            "updatedTime": "2025-11-18T05:09:06",
            "owner": 2138,
            "initiativeId": 1032,
            "createdBy": 2797,
            "updatedBy": 2138,
            "subInitiativeId": "1027",
            "activitiesMapDTOList": [
                {
                    "id": 1096,
                    "activitiesId": 946,
                    "active": 0,
                    "empId": 0,
                    "employeeProfilePos": {
                        "empId": 2138,
                        "orgId": {
                            "id": 4,
                            "name": "Demo1",
                            "status": "Active"
                        },
                        "firstName": "Mary",
                        "lastName": null,
                        "userRole": 0,
                        "profileImage": "",
                        "parentEmpId": 0,
                        "department": null,
                        "title": null,
                        "location": "Lesotho",
                        "emailAddress": "mary@demo.com",
                        "createdDate": null
                    }
                }
            ],
            "subActivityList": [
                {
                    "id": 760,
                    "active": 0,
                    "activitiesValue": {
                        "createdByName": null,
                        "multipleowners": "2138",
                        "ownerName": "Mary",
                        "dateRange": "02/01/2026 - 02/10/2026",
                        "progressval": "0",
                        "name": "Define Data Points",
                        "description": "Define Data Points",
                        "progress": 0,
                        "desc": "Define Data Points"
                    },
                    "createdTime": "2025-11-04T04:34:42",
                    "updatedTime": null,
                    "owner": 2138,
                    "activitieId": 946,
                    "createdBy": 2797,
                    "updatedBy": 0
                },
                {
                    "id": 761,
                    "active": 0,
                    "activitiesValue": {
                        "createdByName": null,
                        "multipleowners": "2138",
                        "ownerName": "Mary",
                        "dateRange": "02/11/2026 - 02/28/2026",
                        "progressval": "0",
                        "name": "Automate Data Feed",
                        "description": "Automate Data Feed",
                        "progress": 0,
                        "desc": "Automate Data Feed"
                    },
                    "createdTime": "2025-11-04T04:34:43",
                    "updatedTime": null,
                    "owner": 2138,
                    "activitieId": 946,
                    "createdBy": 2797,
                    "updatedBy": 0
                }
            ]
        }
    ],
    "commentsList": [
        {
            "id": 152,
            "createDateString": null,
            "kpiId": 0,
            "fromPage": null,
            "updatedDateString": null,
            "active": 0,
            "commentsValue": {
                "createdByName": "Mary",
                "progressval": "0",
                "formattedDateTime": "2025-11-24T10:04:31.749",
                "commentsImage": "",
                "formattedTime": "Nov 24,2025 10:4 AM Monday",
                "title": "",
                "desc": "Need to Keep the momentum to finish this on time"
            },
            "createdTime": "2025-11-24T10:04:32",
            "updatedTime": "2025-11-24T10:04:53",
            "owner": 0,
            "initiativeId": 1032,
            "createdBy": 2138,
            "updatedBy": 0,
            "likeCount": null,
            "empId": null,
            "likeEmpIds": [],
            "type": null,
            "commentsParendId": 0,
            "commentType": 0,
            "replyComments": []
        }
    ],
    "mileStonesList": [
        {
            "id": 1008,
            "active": 0,
            "mileStonesValue": {
                "ownerName": "Mary",
                "dateRange": "04/30/2025",
                "progressval": "0",
                "updatedByName": "Mary",
                "progress": "78",
                "desc": "Risk Register Established",
                "status": "in progress",
                "statusLight": "progress-bar width-per-15 rounded-pill bar_height orange_bar",
                "statusIndicator": "RED"
            },
            "createdTime": "2025-11-04T04:34:25",
            "updatedTime": "2025-11-24T10:02:30",
            "owner": 2138,
            "initiativeId": 1032,
            "createdBy": 2797,
            "updatedBy": 2138
        },
        {
            "id": 1009,
            "active": 0,
            "mileStonesValue": {
                "ownerName": "Mary",
                "dateRange": "04/20/2025",
                "progressval": "0",
                "updatedByName": "Mary",
                "progress": "30",
                "desc": "Impact Assessment Complete",
                "status": "in progress",
                "statusLight": "progress-bar width-per-15 rounded-pill bar_height orange_bar",
                "statusIndicator": "RED"
            },
            "createdTime": "2025-11-04T04:34:25",
            "updatedTime": "2025-11-04T05:33:50",
            "owner": 2138,
            "initiativeId": 1032,
            "createdBy": 2797,
            "updatedBy": 2138
        },
        {
            "id": 1010,
            "active": 0,
            "mileStonesValue": {
                "ownerName": "Mary",
                "dateRange": "04/30/2025",
                "progressval": "0",
                "updatedByName": "Mary",
                "progress": "80",
                "desc": "Controls Inventory Ready",
                "status": "delayed",
                "statusLight": "progress-bar width-per-15 rounded-pill bar_height orange_bar",
                "statusIndicator": "RED"
            },
            "createdTime": "2025-11-04T04:34:26",
            "updatedTime": "2025-11-18T04:15:09",
            "owner": 2138,
            "initiativeId": 1032,
            "createdBy": 2797,
            "updatedBy": 2138
        },
        {
            "id": 1011,
            "active": 0,
            "mileStonesValue": {
                "ownerName": "Mary",
                "dateRange": "06/30/2025",
                "progressval": "0",
                "updatedByName": "Mary",
                "progress": "10",
                "desc": "Review Report Ready",
                "status": "delayed",
                "statusLight": "progress-bar width-per-15 rounded-pill bar_height orange_bar",
                "statusIndicator": "RED"
            },
            "createdTime": "2025-11-04T04:34:28",
            "updatedTime": "2025-11-24T10:02:51",
            "owner": 2138,
            "initiativeId": 1032,
            "createdBy": 2797,
            "updatedBy": 2138
        },
        {
            "id": 1012,
            "active": 0,
            "mileStonesValue": {
                "createdByName": null,
                "ownerName": "Mary",
                "dateRange": "05/31/2025",
                "progressval": "0",
                "name": "Gap Prioritization Done",
                "description": "Gap Prioritization Done",
                "desc": "Gap Prioritization Done",
                "status": "Pending",
                "statusLight": "progress-bar width-per-15 rounded-pill bar_height orange_bar",
                "statusIndicator": "RED"
            },
            "createdTime": "2025-11-04T04:34:29",
            "owner": 2138,
            "initiativeId": 1032,
            "createdBy": 2797,
            "updatedBy": 0
        },
        {
            "id": 1013,
            "active": 0,
            "mileStonesValue": {
                "createdByName": null,
                "ownerName": "Mary",
                "dateRange": "06/30/2025",
                "progressval": "0",
                "name": "Remediation Plans Approved",
                "description": "Remediation Plans Approved",
                "desc": "Remediation Plans Approved",
                "status": "Pending",
                "statusLight": "progress-bar width-per-15 rounded-pill bar_height orange_bar",
                "statusIndicator": "RED"
            },
            "createdTime": "2025-11-04T04:34:29",
            "owner": 2138,
            "initiativeId": 1032,
            "createdBy": 2797,
            "updatedBy": 0
        },
        {
            "id": 1014,
            "active": 0,
            "mileStonesValue": {
                "createdByName": null,
                "ownerName": "Mary",
                "dateRange": "07/31/2025",
                "progressval": "0",
                "name": "Training Modules Ready",
                "description": "Training Modules Ready",
                "desc": "Training Modules Ready",
                "status": "Pending",
                "statusLight": "progress-bar width-per-15 rounded-pill bar_height orange_bar",
                "statusIndicator": "RED"
            },
            "createdTime": "2025-11-04T04:34:31",
            "owner": 2138,
            "initiativeId": 1032,
            "createdBy": 2797,
            "updatedBy": 0
        },
        {
            "id": 1015,
            "active": 0,
            "mileStonesValue": {
                "createdByName": null,
                "ownerName": "Mary",
                "dateRange": "07/31/2025",
                "progressval": "0",
                "name": "Training Delivered",
                "description": "Training Delivered",
                "desc": "Training Delivered",
                "status": "Pending",
                "statusLight": "progress-bar width-per-15 rounded-pill bar_height orange_bar",
                "statusIndicator": "RED"
            },
            "createdTime": "2025-11-04T04:34:31",
            "owner": 2138,
            "initiativeId": 1032,
            "createdBy": 2797,
            "updatedBy": 0
        },
        {
            "id": 1016,
            "active": 0,
            "mileStonesValue": {
                "createdByName": null,
                "ownerName": "Mary",
                "dateRange": "09/30/2025",
                "progressval": "0",
                "name": "Dashboard Deployed",
                "description": "Dashboard Deployed",
                "desc": "Dashboard Deployed",
                "status": "Pending",
                "statusLight": "progress-bar width-per-15 rounded-pill bar_height orange_bar",
                "statusIndicator": "RED"
            },
            "createdTime": "2025-11-04T04:34:33",
            "owner": 2138,
            "initiativeId": 1032,
            "createdBy": 2797,
            "updatedBy": 0
        },
        {
            "id": 1017,
            "active": 0,
            "mileStonesValue": {
                "createdByName": null,
                "ownerName": "Mary",
                "dateRange": "09/30/2025",
                "progressval": "0",
                "name": "Review Reports Published",
                "description": "Review Reports Published",
                "desc": "Review Reports Published",
                "status": "Pending",
                "statusLight": "progress-bar width-per-15 rounded-pill bar_height orange_bar",
                "statusIndicator": "RED"
            },
            "createdTime": "2025-11-04T04:34:34",
            "owner": 2138,
            "initiativeId": 1032,
            "createdBy": 2797,
            "updatedBy": 0
        },
        {
            "id": 1018,
            "active": 0,
            "mileStonesValue": {
                "createdByName": null,
                "ownerName": "Mary",
                "dateRange": "10/31/2025",
                "progressval": "0",
                "name": "Policies Approved",
                "description": "Policies Approved",
                "desc": "Policies Approved",
                "status": "Pending",
                "statusLight": "progress-bar width-per-15 rounded-pill bar_height orange_bar",
                "statusIndicator": "RED"
            },
            "createdTime": "2025-11-04T04:34:35",
            "owner": 2138,
            "initiativeId": 1032,
            "createdBy": 2797,
            "updatedBy": 0
        },
        {
            "id": 1019,
            "active": 0,
            "mileStonesValue": {
                "createdByName": null,
                "ownerName": "Mary",
                "dateRange": "10/31/2025",
                "progressval": "0",
                "name": "Stakeholder Signoff",
                "description": "Stakeholder Signoff",
                "desc": "Stakeholder Signoff",
                "status": "Pending",
                "statusLight": "progress-bar width-per-15 rounded-pill bar_height orange_bar",
                "statusIndicator": "RED"
            },
            "createdTime": "2025-11-04T04:34:36",
            "owner": 2138,
            "initiativeId": 1032,
            "createdBy": 2797,
            "updatedBy": 0
        },
        {
            "id": 1020,
            "active": 0,
            "mileStonesValue": {
                "createdByName": null,
                "ownerName": "Mary",
                "dateRange": "11/30/2025",
                "progressval": "0",
                "name": "Materials Ready",
                "description": "Materials Ready",
                "desc": "Materials Ready",
                "status": "Pending",
                "statusLight": "progress-bar width-per-15 rounded-pill bar_height orange_bar",
                "statusIndicator": "RED"
            },
            "createdTime": "2025-11-04T04:34:37",
            "owner": 2138,
            "initiativeId": 1032,
            "createdBy": 2797,
            "updatedBy": 0
        },
        {
            "id": 1021,
            "active": 0,
            "mileStonesValue": {
                "createdByName": null,
                "ownerName": "Mary",
                "dateRange": "11/30/2025",
                "progressval": "0",
                "name": "Campaign Completed",
                "description": "Campaign Completed",
                "desc": "Campaign Completed",
                "status": "Pending",
                "statusLight": "progress-bar width-per-15 rounded-pill bar_height orange_bar",
                "statusIndicator": "RED"
            },
            "createdTime": "2025-11-04T04:34:38",
            "owner": 2138,
            "initiativeId": 1032,
            "createdBy": 2797,
            "updatedBy": 0
        },
        {
            "id": 1022,
            "active": 0,
            "mileStonesValue": {
                "createdByName": null,
                "ownerName": "Mary",
                "dateRange": "02/28/2026",
                "progressval": "0",
                "name": "Scan Report Delivered",
                "description": "Scan Report Delivered",
                "desc": "Scan Report Delivered",
                "status": "Pending",
                "statusLight": "progress-bar width-per-15 rounded-pill bar_height orange_bar",
                "statusIndicator": "RED"
            },
            "createdTime": "2025-11-04T04:34:41",
            "owner": 2138,
            "initiativeId": 1032,
            "createdBy": 2797,
            "updatedBy": 0
        },
        {
            "id": 1023,
            "active": 0,
            "mileStonesValue": {
                "createdByName": null,
                "ownerName": "Mary",
                "dateRange": "03/31/2026",
                "progressval": "0",
                "name": "Pen Test Completed",
                "description": "Pen Test Completed",
                "desc": "Pen Test Completed",
                "status": "Pending",
                "statusLight": "progress-bar progress-bar-success width-per-85 rounded-pill bar_height",
                "statusIndicator": "GREEN"
            },
            "createdTime": "2025-11-04T04:34:41",
            "owner": 2138,
            "initiativeId": 1032,
            "createdBy": 2797,
            "updatedBy": 0
        },
        {
            "id": 1024,
            "active": 0,
            "mileStonesValue": {
                "createdByName": null,
                "ownerName": "Mary",
                "dateRange": "03/31/2026",
                "progressval": "0",
                "name": "Fixes Applied",
                "description": "Fixes Applied",
                "desc": "Fixes Applied",
                "status": "Pending",
                "statusLight": "progress-bar progress-bar-success width-per-85 rounded-pill bar_height",
                "statusIndicator": "GREEN"
            },
            "createdTime": "2025-11-04T04:34:42",
            "owner": 2138,
            "initiativeId": 1032,
            "createdBy": 2797,
            "updatedBy": 0
        },
        {
            "id": 1025,
            "active": 0,
            "mileStonesValue": {
                "createdByName": null,
                "ownerName": "Mary",
                "dateRange": "03/15/2026",
                "progressval": "0",
                "name": "Data Points Approved",
                "description": "Data Points Approved",
                "desc": "Data Points Approved",
                "status": "Pending",
                "statusLight": "progress-bar progress-bar-success width-per-85 rounded-pill bar_height",
                "statusIndicator": "GREEN"
            },
            "createdTime": "2025-11-04T04:34:43",
            "owner": 2138,
            "initiativeId": 1032,
            "createdBy": 2797,
            "updatedBy": 0
        },
        {
            "id": 1026,
            "active": 0,
            "mileStonesValue": {
                "createdByName": null,
                "ownerName": "Mary",
                "dateRange": "03/31/2026",
                "progressval": "0",
                "name": "Feed Active",
                "description": "Feed Active",
                "desc": "Feed Active",
                "status": "Pending",
                "statusLight": "progress-bar progress-bar-success width-per-85 rounded-pill bar_height",
                "statusIndicator": "GREEN"
            },
            "createdTime": "2025-11-04T04:34:44",
            "owner": 2138,
            "initiativeId": 1032,
            "createdBy": 2797,
            "updatedBy": 0
        },
        {
            "id": 1027,
            "active": 0,
            "mileStonesValue": {
                "createdByName": null,
                "ownerName": "Mary",
                "dateRange": "03/15/2026",
                "progressval": "0",
                "name": "Templates Ready",
                "description": "Templates Ready",
                "desc": "Templates Ready",
                "status": "Pending",
                "statusLight": "progress-bar progress-bar-success width-per-85 rounded-pill bar_height",
                "statusIndicator": "GREEN"
            },
            "createdTime": "2025-11-04T04:34:45",
            "owner": 2138,
            "initiativeId": 1032,
            "createdBy": 2797,
            "updatedBy": 0
        },
        {
            "id": 1028,
            "active": 0,
            "mileStonesValue": {
                "createdByName": null,
                "ownerName": "Mary",
                "dateRange": "03/31/2026",
                "progressval": "0",
                "name": "Reports Submitted",
                "description": "Reports Submitted",
                "desc": "Reports Submitted",
                "status": "Pending",
                "statusLight": "progress-bar progress-bar-success width-per-85 rounded-pill bar_height",
                "statusIndicator": "GREEN"
            },
            "createdTime": "2025-11-04T04:34:46",
            "owner": 2138,
            "initiativeId": 1032,
            "createdBy": 2797,
            "updatedBy": 0
        }
    ],
    "attachmentList": [
        {
            "id": 14,
            "initiativesId": 1032,
            "active": 0,
            "createdBy": 2138,
            "updatedBy": 0,
            "name": "Initiatives (2)",
            "fileName": null,
            "size": "24 KB",
            "type": "xlsx",
            "file": "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,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",
            "createdTime": "2025-11-04T05:27:41",
            "updatedTime": null
        },
        {
            "id": 15,
            "initiativesId": 1032,
            "active": 0,
            "createdBy": 2138,
            "updatedBy": 0,
            "name": "Initiatives (2)",
            "fileName": null,
            "size": "24 KB",
            "type": "xlsx",
            "file": "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,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",
            "createdTime": "2025-11-04T05:27:42",
            "updatedTime": null
        }
    ],
    "taskList": [
        {
            "id": 13,
            "active": 0,
            "initiativeId": 1032,
            "taskValue": {
                "createdByName": "Mary",
                "ownerName": "Mary",
                "dateRange": "04/10/2025",
                "progressval": "0",
                "progress": "89",
                "status": "not started",
                "desc": "Map entire workflow"
            },
            "owner": 2138,
            "createdBy": 2138,
            "updatedBy": 0,
            "createdTime": "2025-11-04T05:23:55",
            "updatedTime": null
        },
        {
            "id": 14,
            "active": 0,
            "initiativeId": 1032,
            "taskValue": {
                "createdByName": "Mary",
                "ownerName": "Mary",
                "dateRange": "04/20/2025",
                "progressval": "0",
                "progress": "70",
                "status": "in progress",
                "desc": "Document bottlenecks"
            },
            "owner": 2138,
            "createdBy": 2138,
            "updatedBy": 0,
            "createdTime": "2025-11-04T05:25:25",
            "updatedTime": null
        },
        {
            "id": 15,
            "active": 0,
            "initiativeId": 1032,
            "taskValue": {
                "createdByName": "Mary",
                "ownerName": "Mary",
                "dateRange": "05/10/2025",
                "progressval": "0",
                "progress": "99",
                "status": "completed",
                "desc": "Propose automation steps"
            },
            "owner": 2138,
            "createdBy": 2138,
            "updatedBy": 0,
            "createdTime": "2025-11-04T05:25:52",
            "updatedTime": null
        },
        {
            "id": 16,
            "active": 0,
            "initiativeId": 1032,
            "taskValue": {
                "createdByName": "Mary",
                "ownerName": "Mary",
                "dateRange": "05/20/2025",
                "progressval": "0",
                "progress": "71",
                "status": "delayed",
                "desc": "Draft optimized workflows"
            },
            "owner": 2138,
            "createdBy": 2138,
            "updatedBy": 0,
            "createdTime": "2025-11-04T05:26:22",
            "updatedTime": null
        },
        {
            "id": 17,
            "active": 0,
            "initiativeId": 1032,
            "taskValue": {
                "createdByName": "Mary",
                "ownerName": "Mary",
                "dateRange": "05/20/2025",
                "progressval": "0",
                "progress": "89",
                "status": "on hold",
                "desc": "Collect stakeholder input"
            },
            "owner": 2138,
            "createdBy": 2138,
            "updatedBy": 0,
            "createdTime": "2025-11-04T05:26:54",
            "updatedTime": null
        },
        {
            "id": 21,
            "active": 0,
            "initiativeId": 1032,
            "taskValue": {
                "ownerName": "Mary",
                "dateRange": "10/15/2025",
                "progressval": "0",
                "updatedByName": "Mary",
                "progress": "0",
                "status": "not started",
                "desc": "Map Entire Workflow"
            },
            "owner": 2138,
            "createdBy": 0,
            "updatedBy": 2138,
            "createdTime": null,
            "updatedTime": "2025-11-17T05:42:19"
        },
        {
            "id": 29,
            "active": 0,
            "initiativeId": 1032,
            "taskValue": {
                "ownerName": "Mary",
                "dateRange": "11/03/2025",
                "progressval": "0",
                "updatedByName": "Mary",
                "progress": "60",
                "status": "in progress",
                "desc": "Map Entire Workflow"
            },
            "owner": 2138,
            "createdBy": 0,
            "updatedBy": 2138,
            "createdTime": null,
            "updatedTime": "2025-11-24T10:02:05"
        }
    ],
    "pageId": 2797,
    "perspectiveId": 3075,
    "scorecardDetailId": 2937,
    "objectiveId": 3269,
    "createDateString": "04-Nov-2025",
    "updatedDateString": "03-Feb-2026",
    "createdTime": "2025-11-04T04:34:22",
    "updatedTime": "2026-02-03T13:57:46",
    "active": 0,
    "owner": 2138,
    "createdBy": 2797,
    "updatedBy": 2138,
    "initiativeId": "RC1.1",
    "departmentId": 1046
}]
  console.log(data, "apiData");
    const container = $('#initiatives-container');
    
    // Check if container exists
    if (container.length == 0) {
        console.error("Initiatives container not found!");
        return;
    }

    // Show loading state (optional)
    container.html('<div class="text-center p-5"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div></div>');

   

        container.empty(); // Clear loading state
        
        // if (!data || data.length == 0) {
        //     container.html('<div class="text-center p-3">No initiatives found.</div>');
        //     return;
        // }

        const accordionId = "accordionInitiatives";
        let html = `<div class="accordion card-accordion" id="${accordionId}">`;

        data?.forEach((item, index) => {
            const collapseId = `collapseInit${index}`;
            const isExpanded = index == 0 ? "true" : "false"; 
            const showClass = index == 0 ? "show" : "";
            const collapsedClass = index == 0 ? "" : "collapsed";


            let ownerName = item?.initiativeValue?.ownerName || "User";
            let avatar = generateAvatarsubInitiative(ownerName);

            let progress = item?.initiativeValue?.progressval || 0;

            let colorClass = '';

            if (progress >= 0 && progress <= 40) {
                colorClass = 'bg-danger';  
            } else if (progress >= 41 && progress <= 75) {
                colorClass = 'bg-warning';  // yellow
            } else if (progress >= 76 && progress <= 100) {
                colorClass = 'bg-success';  // green
            }

            
            let dateRange = item?.initiativeValue?.actualdaterange || '';

let startDate = '';
let endDate = '';
let remainingDays = 0;

if (dateRange.includes('-')) {

    const parts = dateRange.split('-');

    startDate = parts[0].trim();
    endDate = parts[1].trim();

    // Convert MM/DD/YYYY → Date object
    const end = new Date(endDate);
    const today = new Date();

    // Remove time for accurate calculation
    today.setHours(0,0,0,0);
    end.setHours(0,0,0,0);

    const diffTime = end - today;
    remainingDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (remainingDays < 0) remainingDays = 0;
}
            const statusImg = `assets/images/icons/buzzer-${item?.status}-i.svg`;
            
            
            const kpiBadges = item?.impactKPIs?.map(kpi => 
                `<span class="badge label-bg-dark"># ${kpi}</span>`
            ).join(' ');

            html += `
            <div class="card custom-card kpi_page_details accordion-item">
              <div class="card-header accordion-header flex-wrap">
                <div class="c-header-left kpi_details-title-box flex-nowrap">
                  <div class="accordion-button ${collapsedClass}" type="button" data-bs-toggle="collapse"
                    data-bs-target="#${collapseId}" aria-expanded="${isExpanded}" aria-controls="${collapseId}">
                  </div>

                    <div class="user-card">
                    <div class="user-image user-image-sm user-active">
                        <img src="${avatar}" 
                            alt="${ownerName}" 
                            width="24" 
                            height="24"
                            class="rounded-circle">
                    </div>
                    </div>

                  <h5 class="card-title me-auto">
                    <strong editable="true" contenteditable="true"
                    onkeypress="return (this.innerText.length <= 36)">${item?.initiativeValue?.name || ""}</strong>
                  </h5>

                </div>
                <div class="card-actions justify-content-end">
                   <!-- <a href="#initatives-add-modal" data-bs-toggle="modal" class="btn btn-sm btn-icon">
                        <span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Edit">
                        <i data-lucide="pencil" style="width: 14px; height: 14px;"></i>
                        </span>
                    </a> 

                   <a href="#attachments-modal" data-bs-toggle="modal" class="btn btn-sm btn-icon">
                        <span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="File Upload">
                        <i data-lucide="paperclip" style="width: 14px; height: 14px;"></i>
                        </span>
                    </a> --!>

                  <button type="button" class="btn btn-sm btn-icon popover-filter-btn" data-target-id="${collapseId}">
                          <span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="View">
                            <i data-lucide="eye" style="width: 14px; height: 14px;"></i>
                          </span>
                    </button>
               
                                <a href="#" onclick="loadDataAndGeneratePDF()" data-bs-toggle="tooltip" data-bs-placement="bottom"
                                        data-bs-title="Generate Report" class="btn btn-sm btn-icon">
                                    <i data-lucide="file-text" style="width: 16px; height: 16px;"></i>
                                </a>
                           

                  <div class="dropdown">
                    <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown" aria-expanded="true">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="ellipsis-vertical" aria-hidden="true" style="width: 14px; height: 14px;" class="lucide lucide-ellipsis-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                      <li>
                        <a class="dropdown-item" href="#">Download</a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="#">Delete</a>
                      </li>
                    </ul>
                  </div>
                </div>

              </div>
              <div id="${collapseId}" class="accordion-collapse collapse ${showClass}" data-bs-parent="#${accordionId}">
                <div class="accordion-body">
                  <div class="grid gap-2">
                    <div class="g-col-12 g-col-md-4">
                      <div class="table-responsive h-100">
                        <table class="table table-sm table-lefth table-bordered text-center mb-0 align-middle h-100">
                          <tbody>
                            <tr>
                              <th width="40%">Department</th>
                              <td>${item?.initiativeValue?.dept ? item?.initiativeValue?.dept : "" }</td>
                            </tr>
                            <tr>
                              <th>Initiative ID</th>
                              <td>${item?.id}</td>
                            </tr>

                            <tr>
                              <th>Progress</th>
                              <td>
                               <div class="pt-1 bar-chart">
                                <div class="progress-wrap ${item?.progress?.wrapClass}">
                                    <div class="progress flex-grow-1">
                                    <div class="progress-bar ${colorClass} progress-bar-striped rounded-pill"
                                        role="progressbar"
                                        style="width: ${progress}%"
                                        aria-valuenow="${progress}"
                                        aria-valuemin="0"
                                        aria-valuemax="100">
                                    </div>
                                    </div>
                                    <span class="badge">${progress}%</span>
                                </div>
                                </div>
                              </td>
                            </tr>

                            <tr>
                              <th>Start Date</th>
                              <td>${startDate || 'N/A'}</td>
                            </tr>
                            <tr>
                              <th>End by</th>
                              <td>${endDate || 'N/A'}</td>
                            </tr>
                            <tr>
                              <th>Remaining</th>
                              <td>${remainingDays || 'N/A'} days</td>
                            </tr>

                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div class="g-col-12 g-col-md-4">
                      <div class="table-responsive h-100">
                        <table class="table table-sm table-lefth table-bordered text-center mb-0 align-middle h-100">
                          <tbody>

                            <tr>
                              <th>Status</th>
                                <td>${item?.initiativeValue?.statusType || 'N/A'}</td>
                          
                            </tr>
                            <tr>
                              <th>Reaction</th>
                            <td>
                                <p class="mb-0">
                                    ${
                                    item?.initiativeValue?.statusIndicator == "RED"
                                        ? `<i data-lucide="thumbs-down" class="text-danger" style="width:14px;height:14px;"></i>`
                                        : `<i data-lucide="thumbs-up" class="text-success" style="width:14px;height:14px;"></i>`
                                    }
                                </p>
                            </td>
                            </tr>

                            <tr>
                              <th width="40%">Perspective</th>
                               <td>${item?.initiativeValue?.perspectiveName}</td> 
                            </tr>
                            <tr>
                              <th width="40%">Objective</th>
                               <td>${item?.initiativeValue?.objectiveDesc}</td>
                            </tr>
                            
                            <tr>
                              <th width="40%">Impact-KPI</th>
                              <!-- <td>${kpiBadges}</td> --!>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div class="g-col-12 g-col-md-4">
                      <div class="table-responsive h-100">
                        <table class="table table-sm table-lefth table-bordered text-center mb-0 align-middle h-100">
                          <tbody>
                            <tr>
                              <th width="40%">Total Asset Budget</th>
                              <td>${item?.financials?.assetBudget || 'N/A'}</td>
                            </tr>
                            <tr>
                              <th>Total Asset Realization</th>
                              <td>${item?.financials?.assetRealization || 'N/A'}</td>
                            </tr>
                            <tr>
                              <th>Total Liabilities Budget</th>
                              <td>${item?.financials?.liabilitiesBudget || 'N/A'}</td>
                            </tr>
                            <tr>
                              <th>Total Liabilities Realization</th>
                              <td>${item?.financials?.liabilitiesRealization || 'N/A'}</td>
                            </tr>
                            <tr>
                              <th>Total Budget</th>
                              <td>${item?.financials?.totalBudget || 'N/A'}</td>
                            </tr>
                            <tr>
                              <th>Total Budget Realization</th>
                              <td>${item?.financials?.totalBudgetRealization || 'N/A'}</td>
                            </tr>
                            <tr>
                              <th>Total Asset Realization %</th>
                              <td>${item?.financials?.assetRealizationPercent || 'N/A'} %</td>
                            </tr>
                            <tr>
                              <th>Total Liabilities Realization %</th>
                              <td>${item?.financials?.liabilitiesRealizationPercent || 'N/A'} %</td>
                            </tr>
                            <tr>
                              <th>Total Budget Realization % </th>
                              <td>${item?.financials?.totalBudgetRealizationPercent || 'N/A'} %</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                   
                  </div>
                </div>

              </div>
                </div>
              </div>
            </div>
            
      
            
            </div>`;
        });

          // ... (existing code) ...

        html += `</div>`; // Close grid/accordion
        
        container.html(html);
        
        if (data.length > 0) {
            const firstInitiative = data[0];
            const subInitiativesHtml = renderSubInitiatives(firstInitiative);
            
            if (subInitiativesHtml) {
                 // Adjust layout: shrink main container
                //  const mainCol = $('#initiatives-container').parent();
                //  mainCol.removeClass('col-12').addClass('col-md-8');
                 
                 // Show sub-initiative container and inject HTML
                 const subContainer = $('.sub-initiative-show');
                 subContainer.html(subInitiativesHtml);

                // Initialize sparklines
                initSparklines();


                // Initialize sparklines
                initSparklines();

                // Load sidebar tasks from root tasks array
                if (firstInitiative.taskList && firstInitiative.taskList.length > 0) {
                    renderSidebarTasks(firstInitiative.taskList, "Tasks");
                }

                // Load sidebar milestones from root milestones array
                if (firstInitiative.mileStonesList && firstInitiative.mileStonesList.length > 0) {
                    renderMilestones(firstInitiative.mileStonesList, "Milestones");
                }

                // Load sidebar files from root files array
                if (firstInitiative.attachmentList && firstInitiative.attachmentList.length > 0) {
                    renderFiles(firstInitiative.attachmentList, "Files");
                }

                // Load sidebar comments from root comments array
                if (firstInitiative.commentsList && firstInitiative.commentsList.length > 0) {
                    renderComments(firstInitiative.commentsList);
                }
            }
        }
        // Re-initialize any plugins
        if (window.lucide) {
            window.lucide.createIcons();
        }

        // Initialize Progress Bars
        initProgressBars();
        


        // Initialize Popovers
        initPopoverFilters();
        
        // Initialize Tooltips
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

    
}

// loadInitiatives();


function dateformatyymmdd(newdate) {
  var dt = new Date(newdate);
  var mm = dt.getMonth() + 1;
  var dd = dt.getDate();
  var yyyy = dt.getFullYear();
  return yyyy + "-" + mm + "-" + dd;
}


function safeParseDate(str) {
  if (!str) return null;

  str = str.trim();

  const parts = str.split("/");
  if (parts.length !== 3) return null;

  let [month, day, year] = parts.map(Number);

  // Fix invalid dates like 06/31 → convert to last valid day
  const lastDay = new Date(year, month, 0).getDate();
  if (day > lastDay) day = lastDay;

  return new Date(year, month - 1, day);
}

function initiativegrattChart(
  initdetail,
  result,
  progressvalue,
  initiativeviewtype,
  activitiesChart,
  viewMode = "Month"
) {

  console.log(initdetail,result,progressvalue,  "result");
  var chartdata = [];
  var initiativeganttchart = []; // For table
  var parentchartfromdate = "";
  var parentcharttodate = "";
  var chartElement = "";

  // ---------------- Build Chart Header + Options ----------------
  var chartHeader = initdetail.chartHeader;
  var subInitiativeOptions = "";
  if (!(initiativedeletepermission == false && initiativeviewpermission == false)) {
    subInitiativeOptions = `<div class="dropdown">
      <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown" aria-expanded="true">
         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="ellipsis-vertical" style="width: 14px; height: 14px;" class="lucide lucide-ellipsis-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
      </button>
      <ul class="dropdown-menu dropdown-menu-end border-0 shadow">`;
    if (initiativeviewpermission) {
      subInitiativeOptions += `<li>
        <a class="dropdown-item" href=".chart_view_popup" data-bs-toggle="modal" onclick="initiativechartviewdetails();">
          ${viewHeader}
        </a>
      </li>`;
    }
    subInitiativeOptions += `</ul></div>`;
  }

  var chartinlineEditIcon = `<strong id="chartHeader" data-oldchartHeader="${chartHeader}">${chartHeader}</strong>`;
  if (initiativeeditpermission) {
    chartinlineEditIcon = `<strong class="editableTxt1" onkeypress="return (this.innerText.length <= 25)"
      id="chartHeader" data-oldchartHeader="${chartHeader}" editable="true">${chartHeader}</strong>`;
  }

  // ---------------- Render Mustache Template ----------------
  var chartTemplate = document.getElementById("chart-template").innerHTML;
  var chartTemplateDetails = Mustache.render(chartTemplate, {
    chartHeader: chartHeader,
    subInitiativeOptions: subInitiativeOptions,
    chartinlineEditIcon: chartinlineEditIcon,
    id: initdetail.id,
  });

  if (initiativeviewtype == "initiativeview") {
    $("#chartdiv_ini").html(chartTemplateDetails);
    chartElement = "#chartdiv_" + initdetail.id;
  } else {
    $("#chart_modal").html(chartTemplateDetails);
    chartElement = "#chart_modal";
  }

  // ---------------- Parse Main Initiative Dates ----------------
  var startdate, enddateformatted;
  if (initdetail.intiativedaterange && initdetail.intiativedaterange.includes("-")) {
    var [startStr, endStr] = initdetail.intiativedaterange.split("-");
    startdate = new Date(startStr);
    enddateformatted = new Date(endStr);
    parentchartfromdate = dateformatyymmdd(startdate);
    parentcharttodate = dateformatyymmdd(enddateformatted);
  }

  let taskCounter = 0;

  // ---------------- Main Initiative ----------------
  const mainTaskId = "Task " + taskCounter++;
  chartdata.push({
    custom_class: "initiatives-gantt-color",
    name: initdetail.title,
    start: parentchartfromdate,
    end: parentcharttodate,
    progress: Number(progressvalue) || 0,
    budget: initdetail.budgetValue || "",
    utillized: initdetail.totalutilized || "",
    balance: initdetail.totalbalance || "",
    id: mainTaskId,
    dependencies: "",
    diffdays: initdetail.diffdays,
  });

  initiativeganttchart.push({
    name: initdetail.title,
    start: dateFormatedtohumanread(startdate),
    end: dateFormatedtohumanread(enddateformatted),
    progress: Number(progressvalue) || 0,
    budget: initdetail.budgetValue || "",
    utillized: initdetail.totalutilized || "",
    balance: initdetail.totalbalance || "",
    id: mainTaskId,
    owner: initdetail.Owner || "",
    multiple: [],
  });

  // ---------------- Sub Initiatives ----------------
  $.each(result.subInitiativeList, function (_, chartactivities) {
    const subId = "Task " + taskCounter++;
    var datestring = chartactivities.subInitiativeValue.dateRange;
    var chartprogress = chartactivities.subInitiativeValue.progressval || 0;
    var daysremaining = "0";
    var chartfromdate = "", charttodate = "";

    if (datestring && datestring.includes("-")) {
      var [s, e] = datestring.split("-");
      var subStart = new Date(s);
      var subEnd = new Date(e);
      chartfromdate = dateformatyymmdd(subStart);
      charttodate = dateformatyymmdd(subEnd);

      console.log(chartfromdate, charttodate, "subInitiative dates");

      var days = (subEnd - new Date()) / (1000 * 60 * 60 * 24);
      if (days > 0) daysremaining = Math.round(days).toString();
    }

    var budgetValue = "", utilizedcurrency = "", balancecurrency = "";
    if (chartactivities.subInitiativeValue.budgetValue != null) {
      var res = specialcharsconvertToNumberFormat(chartactivities.subInitiativeValue.budgetValue);
      budgetValue = res.currency + intergerHumanFormat(res.number);
    }
    if (chartactivities.subInitiativeValue.Utillized != null) {
      var res = specialcharsconvertToNumberFormat(chartactivities.subInitiativeValue.Utillized);
      utilizedcurrency = chartactivities.subInitiativeValue.utilizedCurr + intergerHumanFormat(res.number);
    }
    if (chartactivities.subInitiativeValue.Balance != null) {
      var res = specialcharsconvertToNumberFormat(chartactivities.subInitiativeValue.Balance);
      balancecurrency = chartactivities.subInitiativeValue.BalCurr + intergerHumanFormat(res.number);
    }

    chartdata.push({
      custom_class: "subinitiatives-gantt-color",
      name: chartactivities.subInitiativeValue.description,
      start: chartfromdate,
      end: charttodate,
      progress: Number(chartprogress) || 0,
      budget: budgetValue,
      utillized: utilizedcurrency,
      balance: balancecurrency,
      id: subId,
      dependencies: mainTaskId,
      diffdays: daysremaining + " days",
    });

    var Owner = chartactivities.subInitiativeValue.createdByName || chartactivities.subInitiativeValue.ownerName;
    if (lookup) {
      var name = lookup[chartactivities.createdBy + "name"] || Owner;
      var img = lookup[chartactivities.createdBy + "image"];
      Owner = img ? `src="${img}"` : `data-name="${name}"`;
    }

    initiativeganttchart.push({
      name: chartactivities.subInitiativeValue.description,
      start: dateFormatedtohumanread(new Date(datestring.split("-")[0])),
      end: dateFormatedtohumanread(new Date(datestring.split("-")[1])),
      progress: Number(chartprogress) || 0,
      budget: budgetValue,
      utillized: utilizedcurrency,
      balance: balancecurrency,
      id: subId,
      owner: Owner,
      multiple: chartactivities.subInitiativesMapDTOList || [],
    });
  });

  // ---------------- Activities (initiative view only) ----------------
  if (initiativeviewtype == "initiativeview") {
    $.each(activitiesChart, function (_, act) {
      const activityId = "Task " + taskCounter++;
      var actStart = new Date(act.start);
      var actEnd = new Date(act.end);
      var actFrom = dateformatyymmdd(actStart);
      var actTo = dateformatyymmdd(actEnd);

      chartdata.push({
        custom_class: "activities-gantt-color",
        name: act.name,
        start: actFrom,
        end: actTo,
        progress: Number(act.progress) || 0,
        id: activityId,
        dependencies: mainTaskId,
      });

      initiativeganttchart.push({
        name: act.name,
        start: dateFormatedtohumanread(actStart),
        end: dateFormatedtohumanread(actEnd),
        progress: Number(act.progress) || 0,
        budget: "",
        utillized: "",
        balance: "",
        id: activityId,
        owner: "",
        multiple: [],
      });
    });
  }

  // ---------------- Milestones ----------------
  $.each(result.mileStonesList, function (_, chartactivities) {
    const milestoneId = "Task " + taskCounter++;
    var datestring = chartactivities.mileStonesValue.dateRange;
    var chartprogress = Number(chartactivities.mileStonesValue.progress) || 0;
    var charttodate = "";

    var endDate;

    if (datestring && datestring.includes("-")) {
    var parts = datestring.split("-");
    endDate = safeParseDate(parts[1]);
    } else {
    endDate = safeParseDate(datestring);
    }

    if (!endDate || isNaN(endDate)) {
    console.warn("Invalid milestone date:", datestring);
    endDate = new Date();
    }

    let endPlusOne = new Date(endDate);
    endPlusOne.setDate(endPlusOne.getDate() + 1);

    // if (datestring && datestring.includes("-")) {
    //   var endDate = new Date(datestring.split("-")[1]);
    //   charttodate = dateformatyymmdd(endDate);
    // } else {
    //   charttodate = dateformatyymmdd(new Date(datestring));
    //   var endDate = new Date(datestring);
    // }

    var budgetValue = "", utilizedcurrency = "", balancecurrency = "";
    if (chartactivities.mileStonesValue.budgetValue != null) {
      var res = specialcharsconvertToNumberFormat(chartactivities.mileStonesValue.budgetValue);
      budgetValue = res.currency + intergerHumanFormat(res.number);
    }
    if (chartactivities.mileStonesValue.Utillized != null) {
      var res = specialcharsconvertToNumberFormat(chartactivities.mileStonesValue.Utillized);
      utilizedcurrency = chartactivities.mileStonesValue.utilizedCurr + intergerHumanFormat(res.number);
    }
    if (chartactivities.mileStonesValue.Balance != null) {
      var res = specialcharsconvertToNumberFormat(chartactivities.mileStonesValue.Balance);
      balancecurrency = chartactivities.mileStonesValue.BalCurr + intergerHumanFormat(res.number);
    }

    chartdata.push({
      custom_class: "subinitiatives-gantt-color",
      name: chartactivities.mileStonesValue.desc,
    //   start: charttodate,
    //   end: charttodate,
     start: dateformatyymmdd(endDate),
     end: dateformatyymmdd(endPlusOne),
      progress: Number(chartprogress) || 0,
      budget: budgetValue,
      utillized: utilizedcurrency,
      balance: balancecurrency,
      id: milestoneId,
      dependencies: mainTaskId,
      diffdays: "0 days",
    });

    var Owner = chartactivities.mileStonesValue.createdByName || chartactivities.mileStonesValue.ownerName || "";

    if (lookup) {
    // Try to get the lookup name or fallback to Owner
    var name = lookup[chartactivities.createdBy + "name"] || chartactivities.mileStonesValue.ownerName || Owner;

    // Try to get the image from lookup
    var img = lookup[chartactivities.createdBy + "image"];

    // Use image if exists, else fallback to data-name
    Owner = img ? `src="${img}"` : `data-name="${name}"`;
    } else {
    // If no lookup, use Owner directly
    Owner = `data-name="${Owner}"`;
    }


    
    initiativeganttchart.push({
      name: chartactivities.mileStonesValue.desc,
      start: dateFormatedtohumanread(endDate),
      end: dateFormatedtohumanread(endDate),
      progress: Number(chartprogress) || 0,
      budget: budgetValue,
      utillized: utilizedcurrency,
      balance: balancecurrency,
      id: milestoneId,
      owner: Owner,
      multiple: chartactivities.subInitiativesMapDTOList || [],
    });
  });

  // ---------------- Build Table HTML ----------------
  var chartrow = "";
  var parentID = 1;

  function formatOwnerImage(ownerVal, fallbackName = "") {
    console.log()
    let tag = '<img ';
    if (!ownerVal) {
      tag += `class="ganttimagecircle rounded-circle sub_init_img" data-name="${fallbackName}"`;
    } else if (typeof ownerVal == "string") {
      if (ownerVal.includes("src=")) {
        tag += ownerVal;
      } else {
        tag += `class="ganttimagecircle rounded-circle sub_init_img" ${ownerVal}`;
      }
    } else {
      tag += `class="ganttimagecircle rounded-circle sub_init_img" data-name="${fallbackName}"`;
    }
    return tag + ' width="24px" height="24px" style="border-radius: 50%;" alt="Owner"/>';
  }

  $.each(initiativeganttchart, function (_, item) {
    console.log(item, "itemData");
    let ownerTag = formatOwnerImage(item.owner, item.name);
    let childRows = "";

    if (item.multiple && item.multiple.length) {
      let childID = (parentID + 0.1).toFixed(1);
      $.each(item.multiple, function (_, child) {
        let fullName = (child.employeeProfilePos?.firstName || "") + (child.employeeProfilePos?.lastName || "");
        let title = child.employeeProfilePos?.title || item.name;
        let img = child.employeeProfilePos?.profileImage;
        let childImgTag = img
        
          ? `<img  class="rounded-circle sub_init_img" src="${img}" width="24px" height="24px" style="border-radius: 50%;" alt="${fullName}"/>`
          : `<img data-name="${fullName}" class="rounded-circle ganttuserimage" width="24px" height="24px" style="border-radius: 50%;" alt="${fullName}"/>`;

        childRows += `<tr data-tt-id="${childID}" data-tt-parent-id="${parentID}">
          <td>${title}</td>
          <td class="text-center text-nowrap">${item.start}</td>
          <td class="text-center text-nowrap">${item.end}</td>
          <td class="text-center">${childImgTag}</td>
        </tr>`;
        childID = (parseFloat(childID) + 0.1).toFixed(1);
      });
    }

    chartrow += `<tr data-tt-id="${parentID}">
      <td class="" style="text-align: left;">${item.name}</td>
      <td class="text-center text-nowrap">${item.start}</td>
      <td class="text-center text-nowrap">${item.end}</td>
      <td class="text-center text-nowrap">${ownerTag}</td>
    </tr>${childRows}`;
    parentID++;
  });

  var tableHtml = `
    <div class="table-responsive">
      <table id="example-basic" class="table table-bordered treetable w-100">
        
        <tbody>${chartrow}</tbody>
      </table>
    </div>`;

  if (initiativeviewtype == "initiativeview") {
    const chartContainer = $(chartElement).closest(".chart-container");
    if (chartContainer.length) {
      chartContainer.find(".gantt-table-placeholder").html(tableHtml);
    } else {
      console.warn("No .gantt-table-placeholder found for initiative view");
    }
  } else {
    $("#ganttchart_table").html(tableHtml);
  }

  // ---------------- Render Gantt ----------------
  const container = document.querySelector(chartElement);
  if (!container) {
    console.warn("⚠️ Gantt container not found:", chartElement);
    return;
  }
  container.innerHTML = "";

  gantt = new Gantt(chartElement, chartdata, {
    header_height: initiativeviewtype == "initiativeview" ? 70 : 50,
    column_width: initiativeviewtype == "initiativeview" ? 100 : 15,
    step: 24,
    view_modes: ["Quarter Day", "Half Day", "Day", "Week", "Month"],
    bar_height: initiativeviewtype == "initiativeview" ? 18 : 30,
    bar_corner_radius: 10,
    arrow_curve: 5,
    padding: 20,
    view_mode: viewMode,
    date_format: "MMM-DD",
    popup_trigger: "false",
    on_click: () => {},
    on_date_change: () => {},
    on_progress_change: () => {},
    // 🔥 CRITICAL FIX: use the ACTUAL new view mode passed as argument
    on_view_change: function(actualViewMode) {
      setTimeout(() => {
        enforceMinBarWidth(chartElement);
        container.querySelectorAll(".bar-group").forEach(bar =>
          bar.addEventListener("mousedown", ganttstopEvent, true)
        );
        container.querySelectorAll(".handle-group").forEach(h => h.remove());

        // Call correct formatter based on ACTUAL mode
        if (actualViewMode == "Month") {
          if (typeof formatMonthLabels == 'function') formatMonthLabels(chartElement);
        } else if (actualViewMode == "Day") {
          formatDayLabels(chartElement); // Now this will work!
        } else if (actualViewMode == "Week") {
          if (typeof formatWeekLabels == 'function') formatWeekLabels(chartElement);
        }
      }, 50); // 50ms gives more time for DOM to update
    },
  });

  // ---------------- Post-render Setup ----------------
  $("#example-basic").treetable({ expandable: true });

  // Safe event binding for view mode switcher
  $("#control-view").off("click", "button").on("click", "button", function (e) {
    var mode = $(this).data("value");
    if (gantt && typeof gantt.change_view_mode == "function") {
      gantt.change_view_mode(mode);
      $(this).parent().find("button").removeClass("active");
      $(this).addClass("active");
    }
  });

  // Initialize avatars
  $('.ganttimagecircle').initial({ charCount: 2, height: 30, width: 30, fontSize: 18 });
 
};

var  parentInitiativeData = []

function renderSubInitiatives(parentInitiative) {
    parentInitiativeData = parentInitiative

    if(!parentInitiative || !parentInitiative.subInitiativeList || parentInitiative.subInitiativeList.length == 0) return '';
    
    const subInitiatives = parentInitiative.subInitiativeList;
    console.log(subInitiatives, "subInitiatives");
    // const parentCollapseId = `parent-initiative-collapse-${parentInitiative.id}`; // Unused var
    // const parentOwnersHtml = renderOwners(parentInitiative.owners, parentInitiative.remainingOwners); // Unused var

    let html = `
          <div class="card custom-card table-card h-100">
            <div class="card-header">
              <div class="c-header-left">
                <h5 class="card-title">
                  <strong editable="true" contenteditable="true" onkeypress="return (this.innerText.length <= 36)">Sub
                    Initiative & Activities</strong>
                </h5>
              </div>
              <div class="card-actions">
               <!-- <button class="btn btn-sm btn-icon" data-bs-toggle="modal" data-bs-target="#subinitative-add-modal">
                  <span data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Add">
                    <i data-lucide="plus" style="width: 14px; height: 14px;"></i>
                  </span>
                </button> --!>
                <div class="dropdown">
                  <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown" aria-expanded="true">
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="ellipsis-vertical" aria-hidden="true" style="width: 14px; height: 14px;" class="lucide lucide-ellipsis-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                  </button>
                  <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                    <li><a class="dropdown-item" href="#sub_initative_view_popup" onclick="openSubInitiativesView()" data-bs-toggle="modal">View</a></li>
                    <!-- <li><a class="dropdown-item" href="#" onclick="return false;">Delete</a></li> --!>
                  </ul>
                </div>
              </div>
            </div>
            <div class="card-body overflow-auto" style="height: 340px;">
              <div id="accordionSubInitiative" class="accordion accordion-flush-initiative accordion-custom accordion-collopse-content">
    `;

    subInitiatives.forEach((sub, index) => {
        console.log(sub, "subInitiative");
        const collapseId = `initiative-collapse-${parentInitiative.id}-${index}`;
        const ownersHtml = renderOwners(sub.owners, sub.remainingOwners);
        
        const isFirst = index == 0;
        const resizeClass = isFirst ? '' : 'collapsed';
        const ariaExpanded = isFirst ? 'true' : 'false';
        const showClass = isFirst ? 'show' : '';

        // let ownerName = sub?.subInitiativeValue?.ownerName || "User";
        let ownerName = sub?.subInitiativesMapDTOList[0]?.employeeProfilePos?.firstName || "User";
        let avatar = generateAvatar(ownerName);
        
        html += `
             <div class="accordion-item test${sub.id}">
                  <div class="accordion-header bg-primary" style="--stratroom-bg-opacity:0.04">
                    <div class="d-flex justify-content-between p-2 gap-1">
                      <button class="btn p-0 btn-title justify-content-start ${resizeClass}" data-bs-toggle="collapse"
                        data-bs-target="#${collapseId}" aria-expanded="${ariaExpanded}"
                        aria-controls="${collapseId}">
                        <div class="row row-cols-1 g-2 w-100">
                          <span class="col mb-0">${sub?.subInitiativeValue?.description || ""}</span>
                        </div>
                      </button>
                      <div class="list-actions">
                        <div class="d-flex align-items-start">
                         <div class="user-card">
                        <div class="user-image user-image-sm user-active">
                            <img src="${avatar}" 
                                alt="${ownerName}" 
                                width="24" 
                                height="24"
                                class="rounded-circle">
                        </div>
                        </div>
                        </div>

                         ${sub && sub.userMapApprove == true ? `
                        <div class="dropdown">
                          <button class="btn btn-sm btn-outline-icon" type="button" data-bs-toggle="dropdown"
                            aria-expanded="true">
                            <i data-lucide="more-vertical" style="width: 14px; height: 14px;"></i>
                          </button>
                          <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                           <!-- <li><a class="dropdown-item" href="#activities-add-modal" data-bs-toggle="modal">Add</a></li> --!>
                            <li><a class="dropdown-item" data-bs-toggle="modal" onclick="openEditSubInitiativeModal(${sub.id})">Edit</a></li>
                            <li><a class="dropdown-item" data-bs-toggle="modal" onclick="handlesubinitiativeuserevent(${sub.id})">Re-Assign</a></li>
                           <!-- <li><a class="dropdown-item">Delete</a></li> -->
                          </ul>
                        </div>
                        ` : ""}
                      </div>
                    </div>
                    <div class="p-2 d-flex flex-column gap-1 w-100">
                      
                        <div class="progress-wrap ${sub?.subInitiativeValue?.colorClass || ''}">
                        <div class="progress flex-grow-1" style="--stratroom-bg-opacity:1">
                          <div class="progress-bar progress-bar-striped rounded-pill status-bg-green" role="progressbar" style="width: ${sub?.subInitiativeValue?.progressval || 0}%;" data-percent="${sub?.subInitiativeValue?.progressval || 0}" aria-valuenow="${sub?.subInitiativeValue?.progressval || 0}"></div>
                        </div>
                        <span class="badge">${sub?.subInitiativeValue?.progressval || 0}%</span>
                      </div>

                    <div class="d-flex flex-column justify-content-center">
                        <span class="text-muted">${sub?.subInitiativeValue?.dateRange ? sub?.subInitiativeValue?.dateRange : ""}</span>
                    </div>
                  </div>
                  </div>

                  <div id="${collapseId}" class="accordion-collapse collapse ${showClass}" data-bs-parent="#accordionSubInitiative">
                    <div id="accordionSubInitiative-${sub.id}-${index}" class="accordion-body accordion gap-0 p-0">
                      ${renderActivities(sub.activitiesList, sub.id, index)}
                    </div>
                  </div>
                </div>
        `;
    });

    html += `
                      </div>
            </div>
          </div>
        </div>
    `;
    return html;

    
}


function openSubInitiativesView(){
    console.log("function clicked");

    console.log(parentInitiativeData, "parentInitiative");
    if(!parentInitiativeData || !parentInitiativeData.subInitiativeList) return;

    let html = '';

    parentInitiativeData.subInitiativeList.forEach((sub, index) => {

        let ownerName = sub?.subInitiativeValue?.ownerName || "User";
        let avatar = generateAvatar(ownerName);

        html += `
        <div class="card mb-2">
            <div class="card-body d-flex justify-content-between align-items-start">

                <div>
                    <h6 class="mb-1">${sub?.subInitiativeValue?.description || ""}</h6>
                    <div class="text-muted small">
                        ${sub?.subInitiativeValue?.dateRange || ""}
                    </div>

                    <div class="progress-wrap mt-2">
                        <div class="progress flex-grow-1">
                            <div class="progress-bar rounded-pill"
                                style="width:${sub?.subInitiativeValue?.progressval || 0}%">
                            </div>
                        </div>
                        <span class="badge ms-2">${sub?.subInitiativeValue?.progressval || 0}%</span>
                    </div>
                </div>

                <div class="user-card">
                    <div class="user-image user-image-sm user-active">
                        <img src="${avatar}" width="24" height="24" class="rounded-circle">
                    </div>
                </div>

            </div>
        </div>
        `;
    });

    $("#subInitiativesModalBody").html(html);

    
}


function openTaskViewPopUp() {
    console.log(taskListData, "taskListData");
    // Make sure tasks exist
    if (!taskListData || taskListData.length == 0) {
        document.getElementById('taskList').innerHTML =
            '<div class="list-group-item text-center text-muted">No tasks to show</div>';
    } else {
        let html = '';

        taskListData.forEach(task => {
            const progress = task?.taskValue?.progress ? parseInt(task.taskValue.progress) : 0;
            let statusText = task?.taskValue?.status || 'In Progress';
            let statusClass = 'status-bg-blue';

            // Map status text to class
            switch ((statusText || '').toLowerCase()) {
                case 'not started':
                    statusClass = 'status-bg-gray';
                    break;
                case 'in progress':
                    statusClass = 'status-bg-blue';
                    break;
                case 'completed':
                    statusClass = 'status-bg-green';
                    break;
                case 'delayed':
                    statusClass = 'status-bg-red';
                    break;
                case 'on hold':
                    statusClass = 'status-bg-orange';
                    break;
                default:
                    // Fallback logic if status is missing but progress exists
                    if (progress == 0) {
                        statusText = 'Not Started';
                        statusClass = 'status-bg-gray';
                    } else if (progress == 100) {
                        statusText = 'Completed';
                        statusClass = 'status-bg-green';
                    } else {
                        statusClass = 'status-bg-blue';
                    }
            }

            html += `
            <div class="list-group-item">
              <div class="bar-chart">
                <div class="d-flex gap-2 align-items-start">
                  <h4 class="title m-0">${task?.taskValue?.desc || ""}</h4>
                  <span class="badge ${statusClass} rounded-pill ms-auto">
                    ${statusText}
                  </span>
                </div>

                <div class="progress-wrap mt-2">
                  <div class="progress flex-grow-1">
                    <div class="progress-bar progress-bar-striped rounded-pill" role="progressbar"
                      style="width: ${progress}%;" data-percent="${progress}"></div>
                  </div>
                  <span class="badge ms-2">${progress}%</span>
                </div>

                <span class="text-muted">${task?.taskValue?.dateRange || ""}</span>
              </div>
              <div class="list-actions">
                <div class="dropdown">
                  <button class="btn btn-sm btn-outline-icon" type="button" data-bs-toggle="dropdown"
                    aria-expanded="true">
                    <i data-lucide="more-vertical" style="width: 14px; height: 14px;"></i>
                  </button>
                  <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                    <li>
                      <a class="dropdown-item" href="#task-add-modal" data-bs-toggle="modal">Edit</a>
                    </li>
                    <li><a class="dropdown-item">Delete</a></li>
                  </ul>
                </div>
              </div>
            </div>`;
        });

        document.getElementById('taskList').innerHTML = html;
    }

    // Optional: Re-create icons if using lucide
    if (window.lucide && lucide.createIcons) {
        lucide.createIcons();
    }

    // Show the modal using Bootstrap's JS API
    const modalEl = document.getElementById('task-view-modal');
    const modalInstance = bootstrap.Modal.getOrCreateInstance(modalEl);
    modalInstance.show();
}


function openMileStoneViewPopUp() {
    console.log(milestonesData, "milestonesData");
    // 1) Prepare HTML from milestonesData
    let html = '';

    if (!milestonesData || milestonesData.length == 0) {
        html = '<div class="list-group-item text-center text-muted">No milestones to show</div>';
    } else {
        milestonesData.forEach(milestone => {
            const progress = milestone?.mileStonesValue?.progress
                ? parseInt(milestone.mileStonesValue.progress)
                : 0;

            // determine status class exactly like you did in renderMilestones
            let status = (milestone?.mileStonesValue?.status || "").toLowerCase();
            let statusClass = "bg-secondary"; // default grey

            if (status == "in progress") {
                statusClass = "bg-primary";
            } else if (status == "pending") {
                statusClass = "bg-warning";
            } else if (status == "delayed") {
                statusClass = "bg-danger";
            }

            html += `
            <div class="list-group-item">
                <div class="bar-chart">
                  <div class="d-flex gap-2 align-items-start">
                    <h4 class="title m-0">${milestone?.mileStonesValue?.desc || ""}</h4>
                   <span class="badge ${statusClass} rounded-pill ms-auto">
                       ${milestone?.mileStonesValue?.status || ""}
                    </span>
                  </div>

                  <div class="progress-wrap mt-2">
                    <div class="progress flex-grow-1">
                      <div class="progress-bar progress-bar-striped rounded-pill" role="progressbar"
                        style="width: ${progress}%;"
                        data-percent="${progress}"></div>
                    </div>
                    <span class="badge ms-2">${progress}%</span>
                  </div>
                  <span class="text-muted">${milestone?.mileStonesValue?.dateRange || ""}</span>
                </div>
                <div class="list-actions">
                  <div class="dropdown">
                    <button class="btn btn-sm btn-outline-icon" type="button" data-bs-toggle="dropdown"
                      aria-expanded="true">
                      <i data-lucide="more-vertical" style="width: 14px; height: 14px;"></i>
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                      <li>
                        <a class="dropdown-item" href="#milestone-add-modal">Edit</a>
                      </li>
                      <li><a class="dropdown-item">Delete</a></li>
                    </ul>
                  </div>
                </div>
            </div>`;
        });
    }

    // 2) Insert HTML into the container
    document.getElementById('mileStoneData').innerHTML = html;

    // 3) Re-create Lucide icons if needed
    if (window.lucide && lucide.createIcons) {
        lucide.createIcons();
    }

    // 4) Open the modal
    const modalEl = document.getElementById('sub_milestone_view_popup');
    const modalInstance = bootstrap.Modal.getOrCreateInstance(modalEl);
    modalInstance.show();
}

function viewAttachmentModal(){
    console.log(filesData, "filesData");
}

// function renderSubInitiatives(parentInitiative) {

//     if (!parentInitiative || 
//         !parentInitiative.subInitiativeList || 
//         parentInitiative.subInitiativeList.length == 0) return '';

//     const subInitiatives = parentInitiative.subInitiativeList;

//     let html = `
//         <div class="card custom-card table-card h-100">
//             <div class="card-header">
//                 <div class="c-header-left">
//                     <h5 class="card-title">
//                         <strong>Sub Initiative & Activities</strong>
//                     </h5>
//                 </div>
//             </div>

//             <div class="card-body overflow-auto" style="height:340px;">
//                 <div id="accordionSubInitiative" class="accordion accordion-flush-initiative accordion-custom">
//     `;

//     subInitiatives.forEach((sub, index) => {

//         const value = sub.subInitiativeValue || {};

//         const collapseId = `initiative-collapse-${sub.id}`;

//         const isFirst = index == 0;
//         const collapsedClass = isFirst ? '' : 'collapsed';
//         const showClass = isFirst ? 'show' : '';
//         const ariaExpanded = isFirst ? 'true' : 'false';

//         // 🔹 Title
//         const title = value.name || value.description ||'';

//         // 🔹 Progress
//         const progress = parseInt(value.progressval || 0);

//         // 🔹 Date Split
//         let startDate = '';
//         let endDate = '';

//         if (value.dateRange && value.dateRange.includes('-')) {
//             const parts = value.dateRange.split('-');
//             startDate = parts[0].trim();
//             endDate = parts[1].trim();
//         }

//         // 🔹 Owners from subInitiativesMapDTOList
//         const owners = (sub.subInitiativesMapDTOList || []).map(o => {
//             const emp = o.employeeProfilePos || {};
//             return {
//                 name: emp.firstName || '',
//                 image: emp.profileImage || ''
//             };
//         });

//         const ownersHtml = renderOwners(owners, 0);

//         html += `
//             <div class="accordion-item test${sub.id}">
//                 <div class="accordion-header bg-primary" style="--stratroom-bg-opacity:0.04">

//                     <div class="d-flex justify-content-between p-2 gap-1">
//                         <button class="btn p-0 btn-title ${collapsedClass}"
//                             data-bs-toggle="collapse"
//                             data-bs-target="#${collapseId}"
//                             aria-expanded="${ariaExpanded}">
                            
//                             <span>${title}</span>
//                         </button>

//                         <div class="d-flex align-items-center gap-2">
//                             ${ownersHtml}
//                         </div>
//                     </div>

//                     <div class="p-2">

//                         <div class="progress-wrap">
//                             <div class="progress">
//                                 <div class="progress-bar progress-bar-striped rounded-pill"
//                                     style="width:${progress}%">
//                                 </div>
//                             </div>
//                             <span class="badge">${progress}%</span>
//                         </div>

//                         <div class="text-muted mt-1">
//                             ${startDate} - ${endDate}
//                         </div>

//                     </div>

//                 </div>

//                 <div id="${collapseId}" 
//                      class="accordion-collapse collapse ${showClass}"
//                      data-bs-parent="#accordionSubInitiative">

//                     <div class="accordion-body p-0">
//                         ${renderActivitiesdummy(sub.activitiesList || [], sub.id, index)}
//                     </div>

//                 </div>
//             </div>
//         `;
//     });

//     html += `
//                 </div>
//             </div>
//         </div>
//     `;

//     return html;
// }








function renderActivities(activities, parentId, subIndex) {
     console.log(activities, parentId, subIndex, "Rendering Activities");
    if(!activities || activities.length == 0) return '';
    
    let html = '';
    activities.forEach((act, actIndex) => {
        console.log(act, "activitiData");
        const collapseId = `subinitiative-collapse-${parentId}-${subIndex}-${actIndex}`;
        const ownersHtml = renderOwners(act.owners, act.remainingOwners);

        const isActFirst = actIndex == 0;
        const resizeActClass = isActFirst ? '' : 'collapsed';
        const ariaActExpanded = isActFirst ? 'true' : 'false';
        const showActClass = isActFirst ? 'show' : '';
        // let ownerName = act?.activitiesValue?.ownerName || "User";
        let ownerName = act?.activitiesMapDTOList[0]?.employeeProfilePos?.firstName || "User";
        let avatar = generateAvatar(ownerName);

        html += `
            <div class="accordion-item border-0">
                <div class="accordion-header bg-white">
                  <div class="d-flex justify-content-between p-2 gap-1">
                    <div class="btn p-0 btn-title ${resizeActClass}" data-bs-toggle="collapse"
                        data-bs-target="#${collapseId}" aria-expanded="${ariaActExpanded}"
                        aria-controls="${collapseId}">
                        <div class="row row-cols-1 g-2 w-100">
                        <span class="col mb-0">${act?.activitiesValue?.desc || act?.activitiesValue?.name || ""}</span>
                        </div>
                    </div>

                    <div class="list-actions">
                        <div class="d-flex align-items-start">
                          <div class="d-flex align-items-start">
                         <div class="user-card">
                        <div class="user-image user-image-sm user-active">
                            <img src="${avatar}" 
                                alt="${ownerName}" 
                                width="24" 
                                height="24"
                                class="rounded-circle">
                        </div>
                        </div>
                        </div>
                        </div>
                        ${act && act.userMapApprove == true ? `
                            <div class="dropdown"> 
                            <button class="btn btn-sm btn-outline-icon" type="button" data-bs-toggle="dropdown" aria-expanded="true">
                                <i data-lucide="more-vertical" style="width: 14px; height: 14px;"></i>
                            </button>
                            <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                                <!-- <li><a class="dropdown-item" href="#sub-activities-add-modal" data-bs-toggle="modal">Add</a></li> --!>
                                <li><a class="dropdown-item" onclick="openEditActivityModal(${act.id})" data-bs-toggle="modal">Edit</a></li>
                                <li><a class="dropdown-item" onclick="handleactivityuserevent(${act.id})" data-bs-toggle="modal">Re-Assign</a></li>
                                <!-- <li><a class="dropdown-item">Delete</a></li> --!>
                            </ul>
                            </div>
                        ` : ""} 
                        
                    </div>
                  </div>

                    <div class="p-2 d-flex flex-row gap-1 w-100">
                       <div class="d-flex flex-column flex-fill">
                            <div class="d-flex flex-row align-items-center gap-2">
                                <div class="chart-pie" data-value="${act?.activitiesValue?.progress || 0}"></div>
                                <span class="pie-progress" style="font-size:10px;">${act?.activitiesValue?.progress || 0}%</span>
                            </div>
                        </div>

                    <div class="d-flex flex-column justify-content-center">
                        <span class="text-muted">${act?.activitiesValue?.dateRange || ""}</span>
                    </div>
                    </div>
                </div>

                <div id="${collapseId}" class="accordion-collapse collapse ${showActClass}" data-bs-parent="#accordionSubInitiative-${parentId}-${subIndex}">
                    <div class="accordion-body p-0">
                      ${renderTasks(act?.subActivityList ? act?.subActivityList : [])}
                    </div>
                </div>
            </div>
        `;
    });
    return html;
}



function renderTasks(tasks) {
    console.log(tasks, "tasksData");
     if(!tasks || tasks.length == 0) return '';
     
     let html = '';
     tasks.forEach(task => {
        const ownersHtml = renderOwners(task.owners, task.remainingOwners);

        let ownerName = task?.activitiesValue?.ownerName || "User";
        //  let ownerName = task?.activitiesMapDTOList[0]?.employeeProfilePos?.firstName || "User";
        let avatar = generateAvatar(ownerName);
         html += `
            <div class="list-group-item border-bottom">
                <div class="d-flex justify-content-between p-2 gap-1">
                    <div class="p-0 btn-title">
                    <div class="row row-cols-1 g-2 w-100">
                        <span class="col mb-0">${task?.activitiesValue?.desc ? task?.activitiesValue?.desc : task?.activitiesValue?.name || ""}</span>
                    </div>
                    </div>

                    <div class="list-actions">
                    <div class="d-flex align-items-start">
                         <div class="user-card">
                        <div class="user-image user-image-sm user-active">
                            <img src="${avatar}" 
                                alt="${ownerName}" 
                                width="24" 
                                height="24"
                                class="rounded-circle">
                        </div>
                        </div>
                        </div>
                        ${task && task.userMapApprove == true ? `
                    <div class="dropdown">
                        <button class="btn btn-sm btn-outline-icon" type="button" data-bs-toggle="dropdown" aria-expanded="true">
                        <i data-lucide="more-vertical" style="width: 14px; height: 14px;"></i>
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                        <li><a class="dropdown-item" data-bs-toggle="modal" onclick="editSubActivity(${task?.id})">Edit</a></li>
                        <!-- <li><a class="dropdown-item">Delete</a></li> --!>
                        </ul>
                    </div>
                    ` : ""}
                    </div>
                </div>
                <div class="p-2 d-flex flex-row gap-1 w-100">
                       <div class="d-flex flex-column flex-fill">
                            <div class="d-flex flex-row align-items-center gap-2">
                                <div class="chart-pie" data-value="${task?.activitiesValue?.progress || 0}"></div>
                                <span class="pie-progress" style="font-size:10px;">${task?.activitiesValue?.progress || 0}%</span>
                            </div>
                        </div>

                    <div class="d-flex flex-column justify-content-center">
                        <span class="text-muted">${task?.activitiesValue?.dateRange || ""}</span>
                    </div>
                    </div>
            </div>
         `;
     });
     return html;
}

function renderOwners(owners, remaining) {
    if (!owners) return '';
    let html = '<ul class="list-unstyled d-flex align-items-center avatar-group mb-0">';
    
    owners.forEach(owner => {
        html += `
            <li class="avatar avatar-xs pull-up" data-bs-toggle="tooltip" data-bs-placement="top" title="${owner.name}">
                <img src="${owner.image}" class="rounded-circle" alt="${owner.name}" width="24" height="24">
            </li>
        `;
    });
    
    if (remaining > 0) {
        html += `
             <li class="avatar avatar-xs pull-up" data-bs-toggle="modal" data-bs-target="#user_edit_popup">
                <span class="avatar-initial rounded-circle" data-bs-toggle="tooltip" data-bs-placement="top" title="${remaining} more">+${remaining}</span>
            </li>
        `;
    }
    
    html += '</ul>';
    return html;
}

function initSparklines() {
    // Target elements with class 'chart-pie'
    // Target elements with class 'chart-pie'
    $('.chart-pie').each(function() {
         const value = parseInt($(this).data('value'), 10) || 0;
         const remaining = 100 - value;

         let color = "#1aa243"; // green
         if (value < 75 && value >= 40) {
            color = "orange";
         } else if (value < 40) {
            color = "red";
         }

         const colors = [color, "#ffffff"];
         
         $(this).sparkline([value, remaining], {
            type: 'pie',
            height: '30px',
            sliceColors: colors
        });
        
        // Add border style similar to risk.js
        $(this).find('canvas').css({
             'border': '1px solid #c7c7c7',
             'border-radius': '50%'
        });
    });
}

function initPopoverFilters() {
    // Collect all possible row headers from the first card to build the filter list
    const firstCard = $('.kpi_page_details').first();
    const headers = [];
    firstCard.find('th').each(function() {
        headers.push($(this).text().trim());
    });

    // Remove duplicates if any
    const uniqueHeaders = [...new Set(headers)];
    
    // Build Popover Content
    let popoverContent = `
        <div>
            <div class="d-flex justify-content-between align-items-center mb-2">
                <h6 class="mb-0">Filter Details</h6>
                <button type="button" class="btn-close" aria-label="Close"></button>
            </div>
             <div class="d-flex justify-content-between mb-2">
                <button class="btn btn-sm btn-light select-all-rows">Select All</button>
                <button class="btn btn-sm btn-light deselect-all-rows">Deselect All</button>
            </div>
            <div class="d-flex flex-column gap-2" style="max-height: 200px; overflow-y: auto;">
    `;
    
    uniqueHeaders.forEach((header, index) => {
        const safeId = `filter-row-${index}`;
        popoverContent += `
        <div class="form-check">
            <input class="form-check-input row-filter-checkbox" type="checkbox" value="${header}" id="${safeId}" checked>
            <label class="form-check-label" for="${safeId}">
                ${header}
            </label>
        </div>
        `;
    });
    

    
    popoverContent += `</div></div>`;

    // Initialize Popover on all buttons
    $('.popover-filter-btn').each(function() {
        const btn = $(this);
        const collapseId = btn.data('target-id');
        
        // Dispose existing if any
        const existing = bootstrap.Popover.getInstance(this);
        if(existing) existing.dispose();

        new bootstrap.Popover(this, {
            html: true,
            placement: 'bottom',
            content: popoverContent,
            sanitize: false,
            container: 'body',
            trigger: 'click' 
        });

        // When popover shows, sync checkbox state with actual visibility in THIS card
        btn[0].addEventListener('shown.bs.popover', function () {
            const popoverBody = $('.popover-body'); // The currently open popover body
            const cardContext = $(`#${collapseId}`);
            
            popoverBody.find('.filter-row-checkbox').each(function() {
                const headerText = $(this).val();
                // Find the row in this specific card
                const isVisible = cardContext.find('th').filter(function() {
                    return $(this).text().trim() == headerText;
                }).closest('tr').is(':visible');
                
                $(this).prop('checked', isVisible);
                
                // Attach data-card-target to checkbox for the change handler
                $(this).attr('data-card-target', collapseId);
            });

             // Bind close button
            popoverBody.find('.btn-close').on('click', function() {
                 bootstrap.Popover.getInstance(btn[0]).hide();
            });
            
             // Bind Select/Deselect All inside this specific popover instance
            popoverBody.find('.select-all-rows').on('click', function() {
                popoverBody.find('.filter-row-checkbox').prop('checked', true).trigger('change');
            });
            popoverBody.find('.deselect-all-rows').on('click', function() {
                popoverBody.find('.filter-row-checkbox').prop('checked', false).trigger('change');
            });
        });
    });
    
    // ... inside initPopoverFilters ...
}

// Global event listener for checkbox changes (delegated)
$(document).on('change', '.filter-row-checkbox', function() {
    const headerText = $(this).val();
    const isChecked = $(this).is(':checked');
    const targetCardId = $(this).attr('data-card-target');
    
    if(targetCardId) {
            const cardContext = $(`#${targetCardId}`);
            cardContext.find('th').filter(function() {
            return $(this).text().trim() == headerText;
        }).closest('tr').toggle(isChecked);
    }
});

var taskListData = []

function renderSidebarTasks(tasks, title) {
    taskListData = tasks
    const container = $('.task-show'); 
    if (!container.length) return;
    
    let listHtml = '';
    if (!tasks || tasks.length == 0) {
        listHtml = '<div class="list-group-item text-center text-muted">No tasks available</div>';
    } else {
        tasks.forEach(task => {
            const progress = task?.taskValue?.progress ? parseInt(task.taskValue.progress) : 0;
            let statusText = task?.taskValue?.status || 'In Progress';
            let statusClass = 'status-bg-blue';
            
            // Map status text to class
            switch ((statusText || '').toLowerCase()) {
    case 'not started':
        statusClass = 'status-bg-gray';
        break;

    case 'in progress':
        statusClass = 'status-bg-blue';
        break;

    case 'completed':
        statusClass = 'status-bg-green';
        break;

    case 'delayed':
        statusClass = 'status-bg-red';
        break;

    case 'on hold':
        statusClass = 'status-bg-orange';
        break;

    default:
        // Fallback logic if status is missing but progress exists
        if (progress == 0) {
            statusText = 'Not Started';
            statusClass = 'status-bg-gray';
        } else if (progress == 100) {
            statusText = 'Completed';
            statusClass = 'status-bg-green';
        } else {
            statusClass = 'status-bg-blue';
        }
}
    
            listHtml += `
                <div class="list-group-item">
                  <div class="bar-chart">
                    <div class="d-flex gap-2 align-items-start">
                      <h4 class="title m-0">${task?.taskValue?.desc ||""}</h4>
                      <span class="badge ${statusClass} rounded-pill ms-auto">
                        ${statusText}
                      </span>
                    </div>
    
                    <div class="progress-wrap">
                      <div class="progress flex-grow-1">
                        <div class="progress-bar progress-bar-striped rounded-pill" role="progressbar"
                          style="width: ${progress}%;" data-percent="${progress}"></div>
                      </div>
                      <span class="badge"></span>
                    </div>
    
                    <span class="text-muted">${task?.taskValue?.dateRange ? task?.taskValue?.dateRange : ""}</span>
                  </div>
                  <div class="list-actions">

                    <div class="dropdown">
                      <button class="btn btn-sm btn-outline-icon" type="button" data-bs-toggle="dropdown"
                        aria-expanded="true">
                        <i data-lucide="more-vertical" style="width: 14px; height: 14px;"></i>
                      </button>
                      <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
    
                        <li>
                          <a class="dropdown-item" href="#task-add-modal" data-bs-toggle="modal">Edit</a>
                        </li>
                        <li><a class="dropdown-item">Delete</a></li>
    
                      </ul>
                    </div> 

                  </div>
                </div>
            `;
        });
    }

    // Full Card Structure
    const html = `
      <div class="card custom-card table-card h-100">
        <div class="card-header">
          <div class="c-header-left">
            <h5 class="card-title">
              <strong editable="true" contenteditable="true"
                onkeypress="return (this.innerText.length <= 36)">${title}</strong>
            </h5>
          </div>
          <div class="card-actions">
            <!-- <button class="btn btn-sm btn-icon" data-bs-toggle="modal" data-bs-target="#task-add-modal">
              <span data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Add">
                <i data-lucide="plus" style="width: 14px; height: 14px;"></i>
              </span>
            </button> --!>
            <div class="dropdown">
              <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown" aria-expanded="true">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="ellipsis-vertical" aria-hidden="true" style="width: 14px; height: 14px;" class="lucide lucide-ellipsis-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
              </button> 
              <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                <li>
                  <a class="dropdown-item" href="#task-view-modal" onclick="openTaskViewPopUp()"data-bs-toggle="modal">View</a>
                </li>
                <!-- <li>
                  <a class="dropdown-item" href="#" onclick="return false;">Delete</a>
                </li> --!>
              </ul>
            </div>
          </div>
        </div>
        <div class="card-body employee_div_body_box sub-ini-box overflow-auto" style="height: 340px;">
          <div class="list-group initiatives-bar">
            ${listHtml}
          </div>
        </div>
      </div>
    `;
    
    container.html(html);
    lucide.createIcons(); // Re-initialize icons
}



var milestonesData = []
function renderMilestones(milestones, title) {
    milestonesData = milestones
    const container = $('.milestones'); 
    if (!container.length) return;
    
    let listHtml = '';
    if (!milestones || milestones.length == 0) {
        listHtml = '<div class="list-group-item text-center text-muted">No milestones available</div>';
    } else {
        milestones.forEach(milestone => {
            const progress = milestone?.mileStonesValue?.progress ? parseInt(milestone.mileStonesValue.progress) : 0;

            let status = (milestone?.mileStonesValue?.status || "").toLowerCase();
            let statusClass = "bg-secondary"; // default grey

            if (status == "in progress") {
                statusClass = "bg-primary";
            } else if (status == "pending") {
                statusClass = "bg-warning";
            } else if (status == "delayed") {
                statusClass = "bg-danger";
            }
            
            listHtml += `
                <div class="list-group-item">
                    <div class="bar-chart">
                      <div class="d-flex gap-2 align-items-start">
                        <h4 class="title m-0">${milestone?.mileStonesValue?.desc || ""}</h4>
                       <span class="badge ${statusClass} rounded-pill ms-auto">
                           ${milestone?.mileStonesValue?.status || ""}
                        </span>
                      </div>
      
                      <div class="progress-wrap">
                        <div class="progress flex-grow-1">
                          <div class="progress-bar progress-bar-striped rounded-pill" role="progressbar" style="width: ${progress}%;"
                            data-percent="${progress}"></div>
                        </div>
                        <span class="badge"></span>
                      </div>
                      <span class="text-muted">${milestone?.mileStonesValue?.dateRange || ""}</span>
                    </div>
                    <div class="list-actions">
                      <div class="dropdown">
                        <button class="btn btn-sm btn-outline-icon" type="button" data-bs-toggle="dropdown"
                          aria-expanded="true">
                          <i data-lucide="more-vertical" style="width: 14px; height: 14px;"></i>
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                          <li>
                            <a class="dropdown-item" href="#sub_milestone_view_popup" onclick="openMileStoneViewPopUp()" data-bs-toggle="modal">View</a>
                          </li>
                          <!-- <li><a class="dropdown-item">Delete</a></li> --!>
                        </ul>
                      </div>
                    </div>
                  </div>
            `;
        });
    }

    // Full Card Structure
    const html = `
      <div class="card custom-card table-card h-100">
        <div class="card-header">
          <div class="c-header-left">
            <h5 class="card-title">
              <strong editable="true" contenteditable="true"
                onkeypress="return (this.innerText.length <= 36)">${title}</strong>
            </h5>
          </div>
          <div class="card-actions">
            <!-- <button class="btn btn-sm btn-icon" data-bs-toggle="modal" data-bs-target="#milestone-add-modal">
              <span data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Add">
                <i data-lucide="plus" style="width: 14px; height: 14px;"></i>
              </span>
            </button> --!>
            <div class="dropdown">
              <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown" aria-expanded="true">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="ellipsis-vertical" aria-hidden="true" style="width: 14px; height: 14px;" class="lucide lucide-ellipsis-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
              </button>
              <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                <li>
                  <a class="dropdown-item" href="#sub_milestone_view_popup" onclick="openMileStoneViewPopUp()" data-bs-toggle="modal">View</a>
                </li>
                <!-- <li>
                  <a class="dropdown-item" href="#" onclick="return false;">Delete</a>
                </li> --!>
              </ul>
            </div>
          </div>
        </div>
        <div class="card-body employee_div_body_box sub-ini-box overflow-auto" style="height: 340px;">
          <div class="list-group initiatives-bar">
            ${listHtml}
          </div>
        </div>
      </div>
    `;
    
    container.html(html);
    lucide.createIcons(); // Re-initialize icons
}

const filesData = []

function renderFiles(files, title) {
    const filesData = files;
  console.log(files, "filesData");
    const container = $('.files');
    if (!container.length) return;

    let listHtml = '';
    if (!files || files.length == 0) {
        listHtml = '<div class="list-group-item text-center text-muted">No files available</div>';
    } else {
        files.forEach(file => {
            listHtml += `
            <div class="list-group-item">
              <div class="bar-chart">
                <div class="d-flex gap-2">
                  <h4 class="title mb-0">${file?.name || ""}</h4>
                </div>

               <!-- <div class="numbers">
                  <div class="text-muted left">${file.fileName} (${file.size})</div>
                  <div class="text-muted right">${file.date}</div>
                </div> --!>
              </div>
              <div class="list-actions">
                <div class="dropdown">
                  <a href="#" class="btn btn-sm btn-outline-icon" role="button" id="dropdownMenuFile${file.id}"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    <i data-lucide="more-vertical" style="width: 14px; height: 14px;"></i>
                  </a>
                  <ul class="dropdown-menu dropdown-menu-end border-0 shadow" aria-labelledby="dropdownMenuFile${file.id}">
                   <!-- <li>
                      <a href="#attachments-modal" class="dropdown-item" data-bs-toggle="modal">
                        Edit
                      </a>
                    </li> --!>
                    <li>
                      <a href="#delete-modal" class="dropdown-item" data-bs-toggle="modal">
                        View
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            `;
        });
    }

    const html = `
      <div class="card custom-card table-card h-100">
        <div class="card-header">
          <div class="c-header-left">
            <h5 class="card-title">
              <strong editable="true" contenteditable="true"
                onkeypress="return (this.innerText.length <= 36)">${title}</strong>
            </h5>
          </div>
          <div class="card-actions">
           <!-- <button class="btn btn-sm btn-icon" data-bs-toggle="modal" data-bs-target="#attachments-modal">
              <span data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Add">
                <i data-lucide="plus" style="width: 14px; height: 14px;"></i>
              </span>
            </button> --!>
            <div class="dropdown">
              <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown" aria-expanded="true">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="ellipsis-vertical" aria-hidden="true" style="width: 14px; height: 14px;" class="lucide lucide-ellipsis-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
              </button>
              <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                <li>
                  <a class="dropdown-item" href="#attachments-view-modal" onclick="viewAttachmentModal()" data-bs-toggle="modal"
                    onclick="return false;">View</a>
                </li>
              </ul>
            </div>
          </div>

        </div>

        <div class="card-body overflow-auto">
          <div class="card-body-box">
            <div class="list-group initiatives-bar">
                ${listHtml}
            </div>
          </div>
        </div>
      </div>
    `;
    
    container.html(html);
    lucide.createIcons();
}


function renderComments(comments, title = "Comments") {

    const container = $('.comments-show');
    if (!container.length) return;

    let commentsHtml = '';

    if (!comments || comments.length == 0) {
        commentsHtml = '<div class="text-center text-muted p-3">No comments yet</div>';
    } else {

        const renderSingleComment = (comment, isReply = false) => {

            const value = comment.commentsValue || {};

            let ownerName = comment?.commentsValue?.createdByName || "User";
            let avatar = generateAvatar(ownerName);

            // 🔹 User
            const userName = value.createdByName || 'User';
            // const avatar = value.commentsImage && value.commentsImage !== ''
            //     ? value.commentsImage
            //     : 'assets/images/user/usrbig1.jpg';

            // 🔹 Text
            const text = value.desc || '';

            // 🔹 Time
            const time = value.formattedTime || '';

            // 🔹 Like count
            const likeCount = comment.likeCount || 0;

            // 🔹 Replies
            let repliesHtml = '';
            if (comment.replyComments && comment.replyComments.length > 0) {

                repliesHtml = '<div class="replies">';

                comment.replyComments.forEach(reply => {
                    repliesHtml += `
                        <div class="reply">
                            ${renderSingleComment(reply, true)}
                        </div>
                    `;
                });

                repliesHtml += '</div>';
            }

            return `
                <div class="${isReply ? 'reply-content' : 'comment-content'}">
                    <div class="${isReply ? 'reply-card' : 'comment-card'}">

                        <div class="user-card">
  <div class="user-image user-image-sm user-active">
    <img src="${avatar}" 
         alt="${ownerName}" 
         width="24" 
         height="24"
         class="rounded-circle">
  </div>
</div>

                        <div class="comment-cr">

                            <div class="comment-highlight">

                                <div class="comment-head">
                                    <h6 class="user-name">${userName}</h6>
                                    <span class="comment-time">${time}</span>
                                </div>

                                <div class="comment-text">${text}</div>

                            </div>

                            <div class="comment-actions">
                                <span class="like-btn">Like</span> ·
                                <span class="like-count">${likeCount}</span> ·
                                <span class="reply-btn">Reply</span> ·
                                <span class="edit-btn">Edit</span> ·
                                <span class="delete-btn">Delete</span>
                            </div>

                        </div>

                    </div>

                    <div class="reply-section" style="display:none;">
                        <input type="text"
                               class="form-control reply-input"
                               placeholder="Write a reply...">
                        <button class="btn btn-sm label-bg-primary reply-post">
                            <i data-lucide="arrow-right"
                               style="width:14px;height:14px;"></i>
                        </button>
                    </div>
                </div>

                ${repliesHtml}
            `;
        };

        comments.forEach(comment => {
            commentsHtml += `<div class="comment">${renderSingleComment(comment)}</div>`;
        });
    }

    const html = `
        <div class="card custom-card table-card h-100">

            <div class="card-header">
                <div class="c-header-left">
                    <h5 class="card-title">
                        <strong>${title}</strong>
                    </h5>
                </div>
            </div>

            <div class="card-body overflow-auto comment-history comments-list"
                 style="height:262px;">
                ${commentsHtml}
            </div>

            <div class="card-footer comment_send">
                <div class="input-group">
                    <input type="text"
                           class="form-control comment-input"
                           placeholder="Type a comment..." readonly>
                    <button class="btn label-bg-primary post-comment">
                        <i data-lucide="arrow-right"
                           style="width:14px;height:14px;"></i>
                    </button>
                </div>
            </div>

        </div>
    `;

    container.html(html);

    if (window.lucide) {
        window.lucide.createIcons();
    }
}


function initProgressBars() {
    $(".progress-bar[data-percent]").each(function () {
        const $bar = $(this);
        const rawPercent = $bar.data("percent");

        if (rawPercent == undefined || isNaN(rawPercent)) return;

        const percent = Math.max(0, Math.min(100, parseInt(rawPercent, 10)));

        // Update width and aria
        $bar.css("width", percent + "%");
        $bar.attr("aria-valuenow", percent);

        // Set dynamic color
        $bar.removeClass("status-bg-green status-bg-yellow status-bg-red");
        if (percent < 40) {
          $bar.addClass("status-bg-red");
        } else if (percent < 75) {
          $bar.addClass("status-bg-yellow");
        } else {
          $bar.addClass("status-bg-green");
        }

        // Update the badge text next to this progress bar if it exists
        $bar.closest(".progress-wrap").find(".badge").text(percent + "%");
    });
}



//Department  List Map 
function populateOwnerDropdowndepartment() {
    $.ajax({
        url: "/stratroom/allDepartmentList",
        type: "GET",
        async: false,
        success: function (data) {

            var $dropdown = $("#Initiative_DepartmentData");
            $dropdown.empty(); // Clear existing options

            // Default placeholder option
            $dropdown.append('<option value="">Select a Department</option>');

            // Loop through response data
            $.each(data, function (index, item) {
                $dropdown.append(
                    $('<option></option>')
                        .attr("value", item.id)
                        .text(item.name)
                );
            });

            // Refresh select2 if applied
            if ($dropdown.hasClass("select2-hidden-accessible")) {
                $dropdown.trigger("change");
            }
        },
        error: function (xhr, status, error) {
            console.error("Error loading departments:", error);
        }
    });
}

populateOwnerDropdowndepartment();

$(document).on("change", "#Initiative_DepartmentData", function () {
    var departmentId = $(this).val();

    if (departmentId) {
        loadPages(departmentId);
    } else {
        $("#Initiative_Pages").empty()
            .append('<option value="">Select a Pages</option>')
            .trigger("change");
    }
});


function loadPages(departmentId) {

    console.log("Pages loading :::: " + departmentId);

    var $pageSelect = $("#Initiative_Pages");

    // Clear existing options
    $pageSelect.empty();
    $pageSelect.append('<option value="">Select a Pages</option>');

    $.ajax({
        type: "GET",
        url: "/stratroom/pageDeptList/" + departmentId + "?pageType=initiative",
        async: false,
        success: function (data) {

            // Expected response:
            // [{ id: 1, pageName: "Page 1" }, { id: 2, pageName: "Page 2" }]

            $.each(data, function (index, item) {
                $pageSelect.append(
                    $("<option></option>")
                        .attr("value", item.id)
                        .text(item.pageName)
                );
            });

            // Refresh select2
            $pageSelect.trigger("change");
        },
        error: function (xhr, status, error) {
            console.error("Error loading pages:", error);
        }
    });
}


// $(document).on("change", "#Initiative_Pages", function () {
//     var pageId = $(this).val();

//     if (pageId) {
//         console.log("this unction called");
//         fetchinitiatives(pageId);
//     } else {
//         $('#initiate_sidebar').empty();
//     }
// });


function fetchinitiatives() {
    $('#initiate_sidebar').empty();
    initiativeloadcontent = false;

    if (!pageId) return;

    $.ajax({
        type: "GET",
        url: "/stratroom/initiativeViewList",
        data: {
            loadFlag: true,
            pageId: pageId,
            status: "date",
            language: "en"
        },
        dataType: "json",   // expecting JSON response
        success: initiativesSuccessCallback,
        error: function (err) {
            console.error("Error loading initiatives:", err);
        }
    });
}

fetchinitiatives();



function initiativesSuccessCallback(response) {
   
    

    if (!response || response.length == 0) {
        $('#initiate_sidebar').html(
            '<div class="text-center text-muted p-3">No initiatives found</div>'
        );
        return;
    }

    $('#initiate_sidebar').empty();

    $.each(response, function (index, item) {

        var val = item.initiativeValue || {};

        var id = item.id;   // 👈 important
        var name = val.name || '';
        var progress = val.progressval || 0;
        var owner = val.createdByName || '';
        var statusIndicator = val.statusIndicator || '';
        var dateRange = val.daterange || '';
        var categoryType = val.categoryType || '';

        let ownerName = item?.initiativeValue?.ownerName || "User";
        let avatar = generateAvatar(ownerName);

     

        let progressColor =
        progress <= 40 ? 'bg-danger' :     // 0–50 → red
        progress <= 75 ? 'bg-warning' :    // 51–80 → yellow
        'bg-success';                      // 81–100 → green

        // Extract Due Date
        var dueDate = '';
        if (dateRange.includes('-')) {
            var parts = dateRange.split('-');
            dueDate = parts[1].trim();
        }

        var cardHtml = `
            <div class="card card-widget card-plan mb-2 
                 sub_initiative_sidebar_details sidebareventId${id}"
                 onclick="initiativedetail(${id})"
                 data-category="${categoryType}"   
                 style="cursor:pointer;">

                <div class="card-header">
                    <div class="avatar">
                         <div class="user-card">
                        <div class="user-image user-image-sm user-active">
                            <img src="${avatar}" 
                                alt="${ownerName}" 
                                width="24" 
                                height="24"
                                class="rounded-circle">
                        </div>
                        </div>
                    </div>

                    <div class="d-flex gap-1 align-items-center ms-auto">
                        <span class="badge rounded-pill ${
                            statusIndicator == 'GREEN' ? 'status-bg-green' :
                            statusIndicator == 'RED' ? 'status-bg-red' :
                            'status-bg-yellow'
                        }">
                            ${categoryType ? categoryType : ''} 
                        </span>
                    </div>
                </div>

                <div class="card-body">

                    <h4 class="card-title mb-1">${name}</h4>

                    <div class="bar-chart">

                        <div class="d-flex gap-2 align-items-start">
                            <h6 class="title m-0">${owner}</h6>
                        </div>

                        <div class="progress-wrap mt-2">
                            <div class="progress flex-grow-1">
                                <div class="progress-bar ${progressColor} rounded-pill"
                                    role="progressbar"
                                    style="width: ${progress}%"
                                    aria-valuenow="${progress}"
                                    aria-valuemin="0"
                                    aria-valuemax="100">
                                </div>
                            </div>
                            <span class="badge ms-2">${progress}%</span>
                        </div>
                        <div class="text-muted mt-2">
                            Due By : ${dueDate}
                        </div>

                    </div>
                </div>
            </div>
        `;

        $('#initiate_sidebar').append(cardHtml);

    });

    // ✅ Automatically call first initiative detail
    if (response.length > 0) {
        initiativedetail(response[0].id);
    }
}

var  activitiesganttchart = [];

function initiativedetail(id) {

    activitiesganttchart = [];
    localStorage.setItem("initiative_pagenumber", id);

    $(".sub_initiative_sidebar_details")
        .removeClass("initiativeSidebarHighLight");

    $(".sidebareventId" + id)
        .addClass("initiativeSidebarHighLight");

    $.ajax({
        url: "/stratroom/initiatives/" + id + "?loadFlag=true",
        success: function (data) {
            const apiData = [data];
            loadInitiatives(apiData, data);
           

        },
        error: function (err) {
            console.error("Error loading initiative detail:", err);
        }
    });
   
}




   const initiativeCategories = [
            "Strategy & Leadership", "Operations", "Finance", "Sales", "Marketing", "Customer",
            "Human Resources (HR)", "Information Technology (IT)", "Risk Management", "Compliance",
            "Legal", "Procurement & Supply Chain", "Product Development & Innovation", "Sustainability & ESG"
   ];

        const initiativeCategoryPopoverTrigger = document.getElementById('popoverFilterInitiativesCategory');

        let initiativeCategoryPopover;

        // Track checked state persistently so closing/reopening popover remembers selections
        const checkedCategories = new Set(initiativeCategories);

        const createRiskCategoryContent = () => {
            const content = document.createElement('div');
            content.innerHTML = `
      <div>
        <div class="d-flex justify-content-between align-items-center mb-2">
          <h5 class="h6 mb-0">
           Filter Initiatives Category
          </h5>
          <button type="button" class="btn-close" aria-label="Close"></button>
        </div>
        <div class="d-flex justify-content-between mb-2">
          <button class="btn btn-sm btn-light select-all-risk">Select All</button>
          <button class="btn btn-sm btn-light deselect-all-risk">Deselect All</button>
        </div>
        <div class="d-flex flex-column gap-2" style="max-height: 300px; overflow-y: auto;">
          ${initiativeCategories.map(category => `
            <div class="form-check">
              <input class="form-check-input filter-risk" id="rc-${category.replace(/\s+/g, '')}" type="checkbox" value="${category}" ${checkedCategories.has(category) ? 'checked' : ''}>
              <label class="form-check-label" for="rc-${category.replace(/\s+/g, '')}">${category}</label>
            </div>
          `).join('')}
        </div>
      </div>
    `;
            return content;
        };

        initiativeCategoryPopover = new bootstrap.Popover(initiativeCategoryPopoverTrigger, {
            html: true,
            placement: 'bottom',
            content: createRiskCategoryContent,
            sanitize: false,
            container: 'body',
            trigger: 'manual'
        });

        // Open popover on button click
        initiativeCategoryPopoverTrigger.addEventListener('click', () => {
            initiativeCategoryPopover.toggle();
        });

 function filterKpiCardsByInitiative() {
    const checked = Array.from(document.querySelectorAll('.filter-risk:checked'))
                         .map(cb => cb.value);

    const allChecked = checked.length == initiativeCategories.length;

    const cards = document.querySelectorAll('.card.card-widget');

    cards.forEach(card => {
        const cardCategory = card.dataset.category || '';
        // show if all are checked OR this card’s category is checked
        card.style.display = (allChecked || checked.includes(cardCategory)) ? '' : 'none';
    });
}
        // Bind events

        // filterKpiCardsByInitiative();
        // Delegate interactions
       // One-time setup after popover initialization
document.addEventListener('change', function (e) {
    if (e.target && e.target.classList.contains('filter-risk')) {
        if (e.target.checked) {
            checkedCategories.add(e.target.value);
        } else {
            checkedCategories.delete(e.target.value);
        }
        filterKpiCardsByInitiative();
    }
});

document.addEventListener('click', function (e) {
    if (e.target.closest('.btn-close')) {
        initiativeCategoryPopover.hide();
    }
    if (e.target.classList.contains('select-all-risk')) {
        document.querySelectorAll('.filter-risk').forEach(cb => {
            cb.checked = true;
            checkedCategories.add(cb.value);
        });
        filterKpiCardsByInitiative();
    }
    if (e.target.classList.contains('deselect-all-risk')) {
        document.querySelectorAll('.filter-risk').forEach(cb => {
            cb.checked = false;
            checkedCategories.delete(cb.value);
        });
        filterKpiCardsByInitiative();
    }
});

var subInitiativeIdData = {};

function openEditSubInitiativeModal(subInitiativeId) {
    subInitiativeIdData = {};
    console.log(subInitiativeId, "subInitiativeId");

     $.ajax({
        url: "/stratroom/subinitiatives/" + subInitiativeId,
        type: "GET",
        async: false,
        success: function (data) { 
            
            console.log(data, "data");

            subInitiativeIdData = data

             $("#sub_Initiative_id").val(subInitiativeId);
            $("#subinitiative_desc").val(data.subInitiativeValue.description);
            $("#sub_initative_progress").val(data.subInitiativeValue.progressval);
            $("#sub_initative_contribution").val(data.subInitiativeValue.contribution);
            $("#sub_initative_start_end").val(data.subInitiativeValue.dateRange);
            $("#implementation_remarks").val(data.subInitiativeValue.impremark);
            $("#performance_analysis_observations_recommendation").val(data.subInitiativeValue.performance);
            $('.sub_initative_edit_popup').modal('show');
        }
    }); 
}

function convertDateRangeFormat(dateRange) {
    if (!dateRange) return "";

    let dates = dateRange.split(" - ");

    let formattedDates = dates.map(date => {
        // If already in MM/DD/YYYY format → return as is
        if (date.includes("/")) {
            return date;
        }

        // Convert only if format is DD.MM.YYYY
        if (date.includes(".")) {
            let [day, month, year] = date.split(".");
            return `${month}/${day}/${year}`;
        }

        return date; // fallback
    });

    return formattedDates.join(" - ");
};

//Update Sub Initiative
function updateSubInitiative() {
    let rawDateRange = $("#sub_initative_start_end").val();
    console.log(rawDateRange, "rawDateRange");
    const payload = subInitiativeIdData;
    payload.subInitiativeValue.description = $("#subinitiative_desc").val();
    payload.subInitiativeValue.progressval = $("#sub_initative_progress").val();
    payload.subInitiativeValue.contribution = $("#sub_initative_contribution").val();
    payload.subInitiativeValue.dateRange = convertDateRangeFormat(rawDateRange);
    payload.subInitiativeValue.impremark = $("#implementation_remarks").val();
    payload.subInitiativeValue.performance = $("#performance_analysis_observations_recommendation").val();
  
   

    console.log(payload, "payload");

    $.ajax({
        url: "/stratroom/subinitiatives/",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(payload),
        success: function (response) {
            console.log(response, "update response");
            window.location.reload();
        } 
    }); 
}

//Open Activity Edit Pop Up 
var activityIdData = {};
function openEditActivityModal(activityId) {
    activityIdData = {};
    console.log(activityId, "activityId");

     $.ajax({
        url: "/stratroom/activities/" + activityId,
        type: "GET",
        async: false,
        success: function (data) { 
            console.log(data, "data");

            activityIdData = data

            $("#activity_id").val(activityId);
            $("#subinitiative_name").val(data.activitiesValue.subInitiativeName);
            $("#activity_desc").val(data.activitiesValue.desc);
            $("#activity_progress").val(data.activitiesValue.progress);
            $("#activity_start_end").val(data.activitiesValue.dateRange);
            $("#activity_actual").val(data.activitiesValue.actual);
            $("#activity_budget").val(data.activitiesValue.performance);
            $('#activities-edit-modal').modal('show');
        }
    }); 
}


function activityUpdate() {
    let rawDateRange = $("#activity_start_end").val();
    console.log(rawDateRange, "rawDateRange");
    const payload = activityIdData;
    payload.activitiesValue.desc = $("#activity_desc").val();
    payload.activitiesValue.progress = $("#activity_progress").val();
    payload.activitiesValue.dateRange = convertDateRangeFormat(rawDateRange);
    payload.activitiesValue.actual = $("#activity_actual").val();
    payload.activitiesValue.budget = $("#activity_budget").val();

    $.ajax({
        url: "/stratroom/activities/",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(payload),
        success: function (response) {
            console.log(response, "update response");
            window.location.reload();
        } 
    });   
}

var subActivityIdData = {};

function editSubActivity(subActivityId) {
    subActivityIdData = {};
    console.log(subActivityId, "subActivityId");

    $.ajax({
        url: "/stratroom/subactivities/" + subActivityId,
        type: "GET",
        async: false,
        success: function (data) {
            console.log(data, "sub activity data");
            subActivityIdData = data;
                $("#sub_activity_id").val(subActivityId);
                $("#sub_activity_desc").val(data.activitiesValue.desc);
                $("#sub_activity_progress").val(data.activitiesValue.progress);
                $("#sub_activity_start_end").val(data.activitiesValue.dateRange);
                $("#sub_activity_actual").val(data.activitiesValue.actual);
                $("#sub_activity_budget").val(data.activitiesValue.budget);
                $('#sub-activities-edit-modal').modal('show');
        } 
    });    
};

function subactivityUpdate() {
  const payload = subActivityIdData;
    payload.activitiesValue.desc = $("#sub_activity_desc").val();
    payload.activitiesValue.progress = $("#sub_activity_progress").val();
    payload.activitiesValue.dateRange = convertDateRangeFormat($("#sub_activity_start_end").val());
    payload.activitiesValue.actual = $("#sub_activity_actual").val();
    payload.activitiesValue.budget = $("#sub_activity_budget").val();

     $.ajax({
        url: "/stratroom/subactivities/",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(payload),
        success: function (response) {
            console.log(response, "update response");
            window.location.reload();
        } 
    });   

};

function handlesubinitiativeuserevent(subInitiativeId) {
    subInitiativeIdValue = subInitiativeId;
    console.log(subInitiativeId, "subInitiativeId");
     $('.subinitiatives_add_user_popup').modal('show');

     $.ajax({
        url: "/stratroom/subinitiatives/" + subInitiativeId, 
        type: "GET",
        async: false,
        success: function (result) { 
            subinitiativeResponseData = result;
        }
    });

    $.ajax({
        url: "/stratroom/deptReporteeList",
        type: "GET",
        async: false,
        success: function (result, status) {

               var subinitiativeUser = "";

               $.each(result, function (index, users) {
                
                    var username = users.name == undefined || users.name == "" ? "User" : users.name;
                    
                    var userProfileConcate = users.image == undefined || users.image == ""
                        ? "data-name='" + username + "' class='rounded-circle subuserinitiativeimage' "
                        : " class='rounded-circle' src='" + users.image + "'";
                    
                    // Check if this user was previously assigned
                    var ischecked = "";
                    var userId = users.id.toString();
                    
                   
                    
                    // Build checkbox with special class for single-selection handler
                    subinitiativeUser +=
                        '<div class="list-group-item attendee">' +
                            '<div class="form-check cusom-check form-check-reverse">' +
                                '<input class="form-check-input single-select-checkbox" type="radio" name="sub_initiative_owner[]" ' +
                                        'id="attendees' + users.id + '" value="' + users.id + '" ' + ischecked + '>' +
                                '<label class="form-check-label" for="attendees' + users.id + '">' +
                                    '<span class="image">' +
                                        '<img ' + userProfileConcate + ' alt="' + users.name + '" width="18" height="18" >' +
                                    '</span>' +
                                    '<span class="name">' + users.name + '</span>' +
                                '</label>' +
                            '</div>' +
                        '</div>';
                });
                
                // Render the list
                $("#subinitiatives-ini-box_view_users").html(subinitiativeUser);

                // Initialize initials for avatars
                $(".subuserinitiativeimage").initial({
                    charCount: 2,
                    height: 30,
                    width: 30,
                    fontSize: 18,
                });

        }
    });
}



$(document).on("click", ".getselectedActivitiesUsers", function () {
    console.log("function Clickedddddddd");
    window.location.reload();

});


function handleactivityuserevent(activityId) {
    console.log(activityId, "activityId");
    activityIdDataValue = activityId;
     $('.activities_add_user_popup').modal('show');

     $.ajax({
        url: "/stratroom/activities/" + activityId, 
        type: "GET",
        async: false,
        success: function (result) { 
            activityresponseData = result;
        }
    });


    $.ajax({
        url: "/stratroom/deptReporteeList",
        type: "GET",
        async: false,
        success: function (result, status) {

               var subinitiativeUser = "";

               $.each(result, function (index, users) {
                
                    var username = users.name == undefined || users.name == "" ? "User" : users.name;
                    
                    var userProfileConcate = users.image == undefined || users.image == ""
                        ? "data-name='" + username + "' class='rounded-circle subuserinitiativeimage' "
                        : " class='rounded-circle' src='" + users.image + "'";
                    
                    // Check if this user was previously assigned
                    var ischecked = "";
                    var userId = users.id.toString();
                    
                   
                    
                    // Build checkbox with special class for single-selection handler
                    subinitiativeUser +=
                        '<div class="list-group-item attendee">' +
                            '<div class="form-check cusom-check form-check-reverse">' +
                                '<input class="form-check-input  asingle-select-radio" type="radio" name="sub_initiative_owner[]" ' +
                                        'id="attendees' + users.id + '" value="' + users.id + '" ' + ischecked + '>' +
                                '<label class="form-check-label" for="attendees' + users.id + '">' +
                                    '<span class="image">' +
                                        '<img ' + userProfileConcate + ' alt="' + users.name + '" width="18" height="18" >' +
                                    '</span>' +
                                    '<span class="name">' + users.name + '</span>' +
                                '</label>' +
                            '</div>' +
                        '</div>';
                });
                
                // Render the list
                $("#activities-ini-box_view_users").html(subinitiativeUser);

                // Initialize initials for avatars
                $(".subuserinitiativeimage").initial({
                    charCount: 2,
                    height: 30,
                    width: 30,
                    fontSize: 18,
                });

        }
    });
};


$(document).on("click", ".single-select-checkbox", function () {
    var InitiativeObj = {};

        var selectedUserId = $(this).val();

    console.log(selectedUserId, "selected radio value");

 

    subinitiativeResponseData.subInitiativeValue.multipleowners = selectedUserId;


    console.log(subinitiativeResponseData, "subinitiativeResponseData");
   
    $.ajax({
        url: "/stratroom/subinitiatives/",
        type: "put",
        async: false,
        contentType: "application/json",
        data: JSON.stringify(subinitiativeResponseData),
        success: function (data, status) {
            
        },
        error: function (msg, status) {
            if (!jQuery.isEmptyObject(msg.responseText)) {
                $.each(JSON.parse(msg.responseText), function (key, value) {
                    if (key == "exception") {
                        $.notify("Error:" + value, {
                            style: 'error',
                            className: 'graynotify'
                        });
                    }
                    if (key == "error") {
                        $.notify("Error:" + value, {
                            style: 'error',
                            className: 'graynotify'
                        });
                    }
                });
            }
        }
    });
});


$(document).on("change", ".asingle-select-radio", function () { // 👈 Changed from click to change
      var selectedUserId = $(this).val();

    console.log(selectedUserId, "selected radio value");

    activityresponseData.activitiesValue.multipleowners = selectedUserId;
   

    console.log(activityresponseData, "activityresponseData");
    $.ajax({
        url: "/stratroom/activities/",
        type: "put",
        async: false,
        contentType: "application/json",
        data: JSON.stringify(activityresponseData),
        success: function (data, status) {
            // $.notify("Updated Successfully");
        },
        error: function (msg, status) {
            if (!jQuery.isEmptyObject(msg.responseText)) {
                $.each(JSON.parse(msg.responseText), function (key, value) {
                    if (key == "exception") {
                        $.notify("Error:" + value, {
                            style: 'error',
                            className: 'graynotify'
                        });
                    }
                    if (key == "error") {
                        $.notify("Error:" + value, {
                            style: 'error',
                            className: 'graynotify'
                        });
                    }
                });
            }
        }
    });
});













