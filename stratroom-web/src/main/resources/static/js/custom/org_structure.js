var createpermission	=	false;
var editpermission	=	false;
var deletepermission	=	false;
var viewpermission	=	false;
var scorecardlinkEnable	=	false;
var initiativelinkEnable=	false;
var risklinkEnable	=	false;
var kpilinkEnable	=	false;
var reporteelist = {};
var linkdesignenable	=	"none !important";
var draggedDeptId = null;
var newParentDeptId = null;
var oc; // Declare oc in a higher scope
var orgstructurePermission = ""

$("#yearSelector").change(function() {
	var selectedYear = $(this).val();
	localStorage.setItem('selectedYear', selectedYear);
	
	updatePermissionsAndReload(selectedYear);
});

function updatePermissionsAndReload(selectedYear) {
	if (selectedYear != 0) {
		createpermission = false;
		editpermission = false;
		deletepermission = false;
		viewpermission = true;
	} else {
		// Reset permissions for current year
		if(jQuery.inArray("Create", orgstructurePermission) !== -1){
			createpermission = true;
		}
		if(jQuery.inArray("Update", orgstructurePermission) !== -1){
			editpermission = true;
		}
		if(jQuery.inArray("Delete", orgstructurePermission) !== -1){
			deletepermission = true;
		}
		if(jQuery.inArray("View", orgstructurePermission) !== -1){
			viewpermission = true;
		}
	}
// Reload the org chart with the new year
loadOrgChart(selectedYear);
}

// function initOrgChart(res, implementationtypemethod) {

// 	const data = {
// 		"nodeList": {
// 			"deptId": 519,
// 			"deptName": "CEO",
// 			"deptParentId": 0,
// 			"scorecardPageId": null,
// 			"createdTime": "2022-04-25T09:46:10",
// 			"updatedTime": null,
// 			"canMaintain": true,
// 			"children": [
// 				{
// 					"deptId": 572,
// 					"deptName": "Operations",
// 					"deptParentId": 519,
// 					"scorecardPageId": null,
// 					"canMaintain": true,
// 					"scoreCardLandingUrl": null,
// 					"initiativeLandingUrl": null,
// 					"kpiLandingUrl": null,
// 					"riskLandingUrl": null,
// 					"appraisalUrl": null,
// 					"employee": null,
// 					"parent": null,
// 					"children": [
// 						{
// 							"deptId": 524,
// 							"deptName": "SALES",
// 							"deptParentId": 572,
// 							"scorecardPageId": 926,
// 							"canMaintain": true,
// 							"scoreCardLandingUrl": "dashboard/1681?pageId=926",
// 							"initiativeLandingUrl": "",
// 							"kpiLandingUrl": "kpiView?kpiId=19970",
// 							"riskLandingUrl": "dashboard/1681?pageId=947",
// 							"children": [
// 								{
// 									"deptId": 957,
// 									"deptName": "DF",
// 									"deptParentId": 524,
// 									"canMaintain": true,
// 									"scoreCardLandingUrl": null,
// 									"initiativeLandingUrl": null,
// 									"kpiLandingUrl": null,
// 									"riskLandingUrl": null,
// 									"appraisalUrl": null,
// 									"employee": null,
// 									"parent": null,
// 									"children": [
// 										{
// 											"deptId": 961,
// 											"deptName": "SH",
// 											"deptParentId": 957,
// 											"scorecardPageId": 1911,
// 											"canMaintain": true,
// 											"scoreCardLandingUrl": "dashboard/2061?pageId=1911",
// 											"initiativeLandingUrl": "dashboard/2065?pageId=1917",
// 											"kpiLandingUrl": null,
// 											"riskLandingUrl": "dashboard/2065?pageId=1930",
// 											"appraisalUrl": null,
// 											"employee": null,
// 											"parent": null,
// 											"children": [
// 												{
// 													"deptId": 962,
// 													"deptName": "AR",
// 													"deptParentId": 961,
// 													"scorecardPageId": null,
	
// 													"scoreCardLandingUrl": null,
// 													"initiativeLandingUrl": null,
// 													"kpiLandingUrl": null,
// 													"riskLandingUrl": null,
// 													"appraisalUrl": null,
// 													"employee": null,
// 													"parent": null,
// 													"children": [
// 														{
// 															"deptId": 977,
// 															"deptName": "TP",
// 															"deptParentId": 962,
// 															"scorecardPageId": null,
														  
// 															"canMaintain": true,
// 															"scoreCardLandingUrl": null,
// 															"initiativeLandingUrl": null,
// 															"kpiLandingUrl": null,
// 															"riskLandingUrl": null,
// 															"appraisalUrl": null,
// 															"employee": null,
// 															"parent": null,
// 															"children": [],
// 															"parentDepartment": null,
// 															"initiativePageId": null,
// 															"riskPageId": null,
// 															"kpiId": null,
// 															"deptImage": "",
// 															"owner": 2082,
// 															"ownerName": "Kendal",
// 															"emailAddress": "Kendal@demo.com",
// 															"message": null,
// 															"deptUniqueId": "TP"
// 														}
// 													],
// 													"parentDepartment": null,
// 													"initiativePageId": null,
// 													"riskPageId": null,
// 													"kpiId": null,
// 													"deptImage": "",
// 													"owner": 2066,
// 													"ownerName": "Arjun",
// 													"emailAddress": "Arjun@demo.com",
// 													"message": null,
// 													"deptUniqueId": "AR"
// 												},
// 											],
// 											"parentDepartment": null,
// 											"initiativePageId": 1917,
// 											"riskPageId": 1930,
// 											"kpiId": null,
// 											"deptImage": "",
// 											"owner": 2065,
// 											"ownerName": "Shakthi",
// 											"emailAddress": "Shakthi@demo.com",
// 											"message": null,
// 											"deptUniqueId": "SH"
// 										},
// 									],
// 									"parentDepartment": null,
// 									"initiativePageId": null,
// 									"riskPageId": null,
// 									"kpiId": null,
// 									"deptImage": "",
// 									"owner": 2061,
// 									"ownerName": "Sharmi",
// 									"emailAddress": "Sharmi@demo.com",
// 									"message": null,
// 									"deptUniqueId": "DF"
// 								}
// 							],
// 							"parentDepartment": null,
// 							"initiativePageId": 1225,
// 							"riskPageId": 947,
// 							"kpiId": 19970,
// 							"deptImage": "",
// 							"owner": 1681,
// 							"ownerName": "josephs",
// 							"emailAddress": "joseph@demo.com",
// 							"message": null,
// 							"deptUniqueId": "CSO"
// 						},
// 					],
// 					"parentDepartment": null,
// 					"initiativePageId": null,
// 					"riskPageId": null,
// 					"kpiId": null,
// 					"deptImage": "",
// 					"owner": null,
// 					"ownerName": "adhi",
// 					"emailAddress": "",
// 					"deptUniqueId": "OPS"
// 				},
// 				{
// 					"deptId": 691,
// 					"deptName": "Lesotho Communications Authority",
// 					"deptParentId": 519,
// 					"scorecardPageId": 839,
// 					"canMaintain": true,
// 					"scoreCardLandingUrl": "dashboard/1850?pageId=839",
// 					"initiativeLandingUrl": null,
// 					"kpiLandingUrl": "kpiView?kpiId=21619",
// 					"riskLandingUrl": null,
// 					"appraisalUrl": null,
// 					"employee": null,
// 					"parent": null,
// 					"children": [
// 						{
// 							"deptId": 693,
// 							"deptName": "Public Affair Manager",
// 							"deptParentId": 691,
// 							"children": [],
// 							"parentDepartment": null,
// 							"initiativePageId": null,
// 							"riskPageId": null,
// 							"kpiId": null,
// 							"deptImage": null,
// 							"owner": null,
// 							"ownerName": null,
// 							"emailAddress": null,
// 							"message": null,
// 							"deptUniqueId": "PAM"
// 						},
// 					],
// 					"kpiId": 21619,
// 					"deptImage": "",
// 					"owner": null,
// 					"ownerName": "heity",
// 					"emailAddress": null,
// 					"message": null,
// 					"deptUniqueId": "LCA"
// 				},
// 			],
// 			"ownerName": "Joseph",
// 			"emailAddress": null,
// 			"deptUniqueId": "CEO"
// 		}
// 	}
// $('#chart-container').empty();
//   const chart = `<div class="card org-structure-card">
//   <div class="card-body">
//     <ul id="org-structure" class="nested-area org-nested-main">

//     <!-- Non-draggable parent -->
//     <li class="nested-item non-draggable non-draggable-parent">
//       <div class="caret"></div>
//       <div class="card org-box parent">
//       <!-- <h6>Parent Item (Non-Draggable) 01</h6> -->
//       <div class="org-section">
//         <div class="org-content">
//         <div class="image">
//           <img src="images/usrbig6.jpg" loading="lazy" width="26" height="26" alt="usrbig6" />
//         </div>
//         <div class="content">
//           <p class="org-label"><strong>Name</strong> - Raza</p>
//           <p class="org-label"><strong>Department</strong> - Corporate</p>

//           <div class="org-info-action">
//           <ul class="list-unstyled action-list">
//             <li>
//             <a target="_blank" href="scorecard-standard.html">
//               <span class="icon"
//               style="background: url('images/buzzer-green-i.svg') center center no-repeat;background-size:cover">S</span>
//             </a>
//             </li> 
//           </ul>
//           </div>
//         </div>

//         </div>
//         <div class="org-action">
//         <ul class="list-unstyled action-list">
//           <li>
//           <a href="#add-org" data-bs-toggle="modal">
//             <span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Add">
//             <i class="fas fa-plus title_edit_icon"></i>
//             </span>
//           </a>
//           </li>

//         </ul>
//         </div>
//       </div>
//       </div>

//       <ul class="nested nested-area">

//       <li class="nested-item">
//         <div class="card org-box child">
//         <div class="org-section">
//           <div class="org-content">
//           <div class="image">
//             <img src="images/usrbig6.jpg" loading="lazy" width="26" height="26"
//             alt="usrbig6" />
//           </div>
//           <div class="content">
//             <p class="org-label"><strong>Name</strong> - 1</p>
//             <p class="org-label"><strong>Department</strong> - Corporate</p>

//             <div class="org-info-action">
//             <ul class="list-unstyled action-list">
//               <li>
//               <a target="_blank" href="scorecard-standard.html">
//                 <span class="icon"
//                 style="background: url('images/buzzer-green-i.svg') center center no-repeat;background-size:cover">S</span>
//               </a>
//               </li>
//             </ul>
//             </div>
//           </div>

//           </div>
//           <div class="org-action">
//           <ul class="list-unstyled action-list">
//             <li>
//             <a href="#add-org" data-bs-toggle="modal">
//               <span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom"
//               data-bs-title="Add">
//               <i class="fas fa-plus title_edit_icon"></i>
//               </span>
//             </a>
//             </li>
           
//           </ul>
//           </div>
//         </div>
//         </div>
//       </li>

   
//       <!-- Non-draggable parent -->
//       <li class="nested-item nested-item-parent">
//         <div class="caret"></div>
//         <div class="card org-box parent">
//         <div class="org-section">
//           <div class="org-content">
//           <div class="image">
//             <img src="images/usrbig6.jpg" loading="lazy" width="26" height="26"
//             alt="usrbig6" />
//           </div>
//           <div class="content">
//             <p class="org-label"><strong>Name</strong> - 3</p>
//             <p class="org-label"><strong>Department</strong> - Corporate</p>

//             <div class="org-info-action">
//             <ul class="list-unstyled action-list">
//               <li>
//               <a target="_blank" href="scorecard-standard.html">
//                 <span class="icon"
//                 style="background: url('images/buzzer-green-i.svg') center center no-repeat;background-size:cover">S</span>
//               </a>
//               </li>
            
//             </ul>
//             </div>
//           </div>

//           </div>
//           <div class="org-action">
//           <ul class="list-unstyled action-list">
//             <li>
//             <a href="#add-org" data-bs-toggle="modal">
//               <span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom"
//               data-bs-title="Add">
//               <i class="fas fa-plus title_edit_icon"></i>
//               </span>
//             </a>
           
//           </ul>
//           </div>
//         </div>
//         </div>
//         <!-- Draggable children -->
//         <ul class="nested nested-area">
//         <li class="nested-item">
//           <div class="card org-box child">
//           <div class="org-section">
//             <div class="org-content">
//             <div class="image">
//               <img src="images/usrbig6.jpg" loading="lazy" width="26" height="26"
//               alt="usrbig6" />
//             </div>
//             <div class="content">
//               <p class="org-label"><strong>Name</strong> - 4</p>
//               <p class="org-label"><strong>Department</strong> - Corporate</p>

//               <div class="org-info-action">
//               <ul class="list-unstyled action-list">
//                 <li>
//                 <a target="_blank" href="scorecard-standard.html">
//                   <span class="icon"
//                   style="background: url('images/buzzer-green-i.svg') center center no-repeat;background-size:cover">S</span>
//                 </a>
//                 </li>
//                              </ul>
//               </div>
//             </div>

//             </div>
//             <div class="org-action">
//             <ul class="list-unstyled action-list">
//               <li>
//               <a href="#add-org" data-bs-toggle="modal">
//                 <span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom"
//                 data-bs-title="Add">
//                 <i class="fas fa-plus title_edit_icon"></i>
//                 </span>
//               </a>
//               </li>
              
//             </ul>
//             </div>
//           </div>
//           </div>
//         </li>
//           <li class="nested-item">
//             <div class="card org-box child">
//             <div class="org-section">
//               <div class="org-content">
//               <div class="image">
//                 <img src="images/usrbig6.jpg" loading="lazy" width="26" height="26"
//                 alt="usrbig6" />
//               </div>
//               <div class="content">
//                 <p class="org-label"><strong>Name</strong> - 10</p>
//                 <p class="org-label"><strong>Department</strong> - Corporate</p>

//                 <div class="org-info-action">
//                 <ul class="list-unstyled action-list">
//                   <li>
//                   <a target="_blank" href="scorecard-standard.html">
//                     <span class="icon"
//                     style="background: url('images/buzzer-green-i.svg') center center no-repeat;background-size:cover">S</span>
//                   </a>
//                   </li>
                 
//                 </ul>
//                 </div>
//               </div>

//               </div>
//               <div class="org-action">
//               <ul class="list-unstyled action-list">
//                 <li>
//                 <a href="#add-org" data-bs-toggle="modal">
//                   <span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom"
//                   data-bs-title="Add">
//                   <i class="fas fa-plus title_edit_icon"></i>
//                   </span>
//                 </a>
//                 </li>
               
//               </ul>
//               </div>
//             </div>
//             </div>
//           </li>
//           </ul>
//         </li>
//         </ul>
//       </li>

//       </ul>
//     </li>


//     </ul>
//   </div>
//      </div>`

// 	 $('#chart-container').html(chart);

// 	 var toggler = document.getElementsByClassName("caret");
// 	 for (var i = 0; i < toggler.length; i++) {
// 	   toggler[i].addEventListener("click", function () {
// 		 this.parentElement.querySelector(".nested").classList.toggle("active");
// 		 this.classList.toggle("caret-down");
// 	   });
// 	 }
// }


function initOrgChartOld(data, implementationtypemethod) {
	// Clear the container
	console.log(data, 'nodelIst');
	$('#chart-container').empty();
  
	console.log(implementationtypemethod, "implementationtypemethod");

	let currentDeleteNode = null;
    let currentImplementationTypeMethod = null;

	// Recursive function to generate HTML for each node
	function generateNodeHTML(node) {
		console.log(node, "node")
	  let scoreCardLandingUrl = '';
	  let kpiLandingUrl = '';
	  let initiativeLandingUrl = '';
	  let riskUrl = '';
  
	  // Scorecard Link
	  if (scorecardlinkEnable == true) {
		if (node.scoreCardLandingUrl && node.scoreCardLandingUrl !== "") {
		  scoreCardLandingUrl =
			'<li class="orgiz_scorecard_btn">' +
			  '<a target="_blank" href="' + node.scoreCardLandingUrl + '">' +
				'<span class="icon" style="background: url(\'images/buzzer-green-i.svg\') center center no-repeat;background-size:cover; color: white; font-size: 14px; font-weight: 700;">S</span>' +
			  '</a>' +
			'</li>';
		} else {
		  scoreCardLandingUrl =
			'<li class="orgiz_scorecard_btn orgiz_scorecard_btn_no_link">' +
			  '<a onClick="return false;" href="#">' +
				'<span class="icon" style="background: url(\'images/buzzer-green-i.svg\') center center no-repeat;background-size:cover; color: white; font-size: 14px; font-weight: 700;">S</span>' +
			  '</a>' +
			'</li>';
		}
	  }
  
	  // KPI Link
	  if (scorecardlinkEnable == true) {
		if (node.kpiLandingUrl && node.kpiLandingUrl !== "") {
		  kpiLandingUrl =
			'<li class="orgiz_kpi_btn">' +
			  '<a target="_blank" href="' + node.kpiLandingUrl + '">' +
				'<span class="icon" style="background: url(\'images/buzzer-yellow-i.svg\') center center no-repeat;background-size:cover; color: white; font-size: 14px; font-weight: 700;">K</span>' +
			  '</a>' +
			'</li>';
		} else {
		  kpiLandingUrl =
			'<li class="orgiz_kpi_btn orgiz_kpi_btn_no_link">' +
			  '<a onClick="return false;" href="#">' +
				'<span class="icon" style="background: url(\'images/buzzer-yellow-i.svg\') center center no-repeat;background-size:cover; color: white; font-size: 14px; font-weight: 700;">K</span>' +
			  '</a>' +
			'</li>';
		}
	  }
  
	  // Initiative Link
	  if (initiativelinkEnable == true) {
		if (node.initiativeLandingUrl && node.initiativeLandingUrl !== "") {
		  initiativeLandingUrl =
			'<li class="orgiz_initiative_btn">' +
			  '<a target="_blank" href="' + node.initiativeLandingUrl + '">' +
				'<span class="icon" style="background: url(\'images/buzzer-red-i.svg\') center center no-repeat;background-size:cover; color: white; font-size: 14px; font-weight: 700;">I</span>' +
			  '</a>' +
			'</li>';
		} else {
		  initiativeLandingUrl =
			'<li class="orgiz_initiative_btn orgiz_initiative_btn_no_link">' +
			  '<a onClick="return false;" href="#">' +
				'<span class="icon" style="background: url(\'images/buzzer-red-i.svg\') center center no-repeat;background-size:cover; color: white; font-size: 14px; font-weight: 700;">I</span>' +
			  '</a>' +
			'</li>';
		}
	  }
  
	  // Risk Link
	  if (risklinkEnable == true) {
		if (node.riskLandingUrl && node.riskLandingUrl !== "") {
		  riskUrl =
			'<li class="orgiz_risk_btn">' +
			  '<a target="_blank" href="' + node.riskLandingUrl + '">' +
				'<span class="icon" style="background: url(\'images/buzzer-green-i.svg\') center center no-repeat;background-size:cover; color: white; font-size: 14px; font-weight: 700;">R</span>' +
			  '</a>' +
			'</li>';
		} else {
		  riskUrl =
			'<li class="orgiz_risk_btn orgiz_risk_btn_no_link">' +
			  '<a onClick="return false;" href="#">' +
				'<span class="icon" style="background: url(\'images/buzzer-green-i.svg\') center center no-repeat;background-size:cover; color: white; font-size: 14px; font-weight: 700;">R</span>' +
			  '</a>' +
			'</li>';
		}
	  }
  
	  let profileImage = '';
	  if (node.profileImage && node.profileImage !== "") {
		profileImage = '<img src="' + node.profileImage + '" loading="lazy" width="26" height="26" alt="profile" class="rounded-circle pointer" />';
	  } else {
		const name = node.ownerName || 'N/A';
		const initials = name.split(' ').map(part => part[0]).join('').toUpperCase();
		profileImage = '<div data-name="' + name + '" class="rounded-circle pointer swotuserimage">' + initials + '</div>';
	  }
  
	  const nodeHTML =
		'<li class="nested-item ' + (node.children && node.children.length > 0 ? 'nested-item-parent' : '') + '">' +
		  (node.children && node.children.length > 0 ? '<div class="caret"></div>' : '') +
		  '<div class="card org-box ' + (node.children && node.children.length > 0 ? 'parent' : 'child') + '">' +
			'<div class="org-section">' +
				/* Drag */
				'<div class="drag-point" title="Drag to reorder">' +
					'<i class="fas fa-bars"></i>' +
				'</div>' +

				'<div class="org-content">' +

					/* Profile Image */
					'<div class="image">' +
					profileImage +
					'</div>' +

					/* Content */
					'<div class="content">' +
					'<p class="org-label"><strong>Name</strong> - ' + (node.ownerName || 'N/A') + '</p>' +
					'<p class="org-label"><strong>Department</strong> - ' + (node.deptName || 'N/A') + '</p>' +
					'<p class="org-label"><strong>Designation</strong> - ' + (node.designation || 'N/A') + '</p>' +
					'<p class="org-label"><strong>Location</strong> - ' + (node.location || 'N/A') + '</p>' +
					'</div>' +

					/* Actions */
					'<div class="org-action">' +

					/* Scorecard / KPI / Risk shortcuts (static/new UI) */
					'<div class="action-list">' +
						'<a target="_blank" href="scorecard.html"><span class="icon">S</span></a>' +
						'<a target="_blank" href="initiatives-projects.html"><span class="icon">I</span></a>' +
						'<a target="_blank" href="kpi.html"><span class="icon">K</span></a>' +
						'<a target="_blank" href="risk.html"><span class="icon">R</span></a>' +
					'</div>' +

					/* OLD FUNCTIONAL ACTIONS – preserved */
					'<div class="list-unstyled action-list">' +

						/* Add */
						'<a href="#add-org" data-toggle="modal" data-target="#add-org" ' +
						'data-deptId="' + (node.deptId || '') + '">' +
						'<span class="icon" data-toggle="tooltip" data-placement="bottom" title="Add">' +
							'<i class="fas fa-plus"></i>' +
						'</span>' +
						'</a>' +

						/* Edit */
						'<a href="#edit-org" data-toggle="modal" data-target="#edit-org" ' +
						'data-deptId="' + (node.deptId || '') + '" ' +
						'data-nodeId="' + (node.id || '') + '" ' +
						'data-parentId="' + (node.deptParentId || '') + '">' +
						'<span class="icon" data-toggle="tooltip" data-placement="bottom" title="Edit">' +
							'<i class="fas fa-edit"></i>' +
						'</span>' +
						'</a>' +

						/* Delete */
						'<a href="#" class="delete-node-btn" ' +
						'data-node="' + encodeURIComponent(JSON.stringify(node)) + '" ' +
						'data-implementation-type="' + implementationtypemethod + '">' +
						'<span class="icon" data-toggle="tooltip" data-placement="bottom" title="Delete">' +
							'<i class="fas fa-trash"></i>' +
						'</span>' +
						'</a>' +

					'</div>' +
					'</div>' +

				'</div>' +
				'</div>' +
			'</div>' +
		  '</div>' +
		  (node.children && node.children.length > 0 ?
			'<ul class="nested nested-area">' +
			  node.children.map(function(child) {
				return generateNodeHTML(child);
			  }).join('') +
			'</ul>' : '') +
		'</li>';
	  return nodeHTML;
	}

	$(document).on('click', '.delete-node-btn', function(e) {
		e.preventDefault();
		currentDeleteNode = JSON.parse(decodeURIComponent($(this).data('node')));
		currentImplementationTypeMethod = $(this).data('implementation-type');
		$('#delete-modal').modal('show');
	  });
	  
	  // Add this for the delete confirmation button
	  $(document).on('click', '.orgDeleteconfirm', function() {
		console.log(currentDeleteNode, "currentDeleteNode");
		if (!currentDeleteNode) return;
		
		let url = "";
		if (implementationtypemethod ==	true) {
		  url = "deleteDepartmentMapping/" + currentDeleteNode.deptId;
		} else {
		  url = currentDeleteNode.deptId + "/removeEmployee";
		}

		console.log(url)
	  
		$.ajax({
		  type: "DELETE",
		  url: url,
		  contentType: "application/json; charset=utf-8",
		  global: false,
		  async: false,
		  dataType: "json",
		  success: function(data) {
			var sucmsg = (implementationtypemethod ? "Department has been removed successfully" : "Employee has been removed successfully");
			$.notify(sucmsg, {
			  style: 'error',
			  className: 'graynotify'
			});
			$('#delete-modal').modal('hide');
			location.reload();
		  },
		  error: function(xhr, status, error) {
			$.notify("Error deleting record: " + error, {
			  style: 'error',
			  className: 'graynotify'
			});
			$('#delete-modal').modal('hide');
		  }
		});
	  });
  
	// Generate the chart HTML starting from the root node
	const chartHTML = `
	  <div class="card org-structure-card org-tree-container w-100">
		<div class="card-body">
		  <ul id="org-structure" class="nested-area org-nested-main">
			${generateNodeHTML(data)}
		  </ul>
		</div>
	  </div>
	`;



  
	// Insert the chart HTML into the container
	$('#chart-container').html(chartHTML);


	
  
	// Initialize event listeners for .caret elements
	const toggler = document.getElementsByClassName("caret");
	for (let i = 0; i < toggler.length; i++) {
	  toggler[i].addEventListener("click", function () {
		this.parentElement.querySelector(".nested").classList.toggle("active");
		this.classList.toggle("caret-down");
	  });
	}
}



  
 








function loadOrgChart(year) {
	var implementationtypemethod	=	false;
	if((controlpanelgeneralsiteSettings.implementation !=	null && controlpanelgeneralsiteSettings.implementation !=	undefined) && (controlpanelgeneralsiteSettings.implementationType !=	null && controlpanelgeneralsiteSettings.implementationType !=	undefined)){
		if(controlpanelgeneralsiteSettings.implementationType	==	"Department"){
			implementationtypemethod	=	true
		}
	}
	var orglink	=	localStorage.getItem('orglink');
	orglink	=	(orglink	==	null || orglink	==	undefined?localStorage.getItem('rootuseraccessid'):orglink	==	'subuser'?localStorage.getItem('useraccessid'):localStorage.getItem('rootuseraccessid'));
	if(!orglink){
		localStorage.getItem('rootuseraccessid');
	}
	
	if(localStorage.getItem('orguseraccessid') != undefined && localStorage.getItem('orguseraccessid') != null && localStorage.getItem('orguseraccessid') != ""){
		orglink	=	localStorage.getItem('orguseraccessid');
	}
	
	orgurlcall	=	(implementationtypemethod	==	true?"departmentChart":"retrieveOrgChart");
	$("#orgimportmethodtype").val(orgurlcall);


    $.ajax({
        type: "GET",
        url: orgurlcall + '/' + orglink +"?year="+year,
        contentType: "application/json; charset=utf-8",
        global: false,
        async: false,
        dataType: "json",
        success: function(data) {
            nodeList = data.nodeList;

			const allEmployeesWithDept = collectEmployeesWithDept(data.nodeList);

			availableUsers = allEmployeesWithDept;

            console.log(allEmployeesWithDept , "allEmployeesWithDept");

            // Assuming your API returns data in the format expected by OrgChart
            initOrgChart(nodeList, implementationtypemethod);
			$("#yearSelector").val(year);

        },
        error: function (msg, status) {
            if($(".orgchart").find("spinner")){
                $(".spinner").hide();
            }
        }
    });

	
	
}

        $(function($) {


			$.ajax({
				type: "GET",
				url: "/stratroom/org/years",
				dataType: "json",
				success: function(years) {
					var yearSelector = $("#yearSelector");
					years.forEach(function(year) {
						if (year !== 0) {
							yearSelector.append($('<option>', {
								value: year,
								text: 'Oct ' + year
							}));
						}
					});
				}
			});
        	
        	if(jQuery.inArray("Create", orgstructurePermission) !== -1){
				createpermission	=	true;
			}
			
			if(jQuery.inArray("Update", orgstructurePermission) !== -1){
				editpermission	=	true;
			}
			
			if(jQuery.inArray("Delete", orgstructurePermission) !== -1){
				deletepermission	=	true;
			}
			
			if(jQuery.inArray("View", orgstructurePermission) !== -1){
				viewpermission	=	true;
			}
			
			if(createpermission == true || editpermission == true || deletepermission == true){
				viewpermission	=	true;
			}
			
		
			/*if(enableaccesscontrolMenu	==	true){
				createpermission	=	true;
				editpermission		=	true;
				deletepermission	=	true;
				viewpermission		=	true;
			}*/
			
			if(createpermission	==	false){
				$(".accessuploadicon").remove();
				$("#uploadcategory option[value='Organisation Import']").remove()
			}
			
        	
			$.ajax({
				type : "GET",
				url : "user/modulePermissions?moduleName=Scorecard",
				dataType : "json",
				success : function(data) {
					if(data.Scorecard !=	undefined && !jQuery.isEmptyObject(data.Scorecard)){
						if(data.Scorecard.Scorecard.privilegeCreate !=	undefined && data.Scorecard.Scorecard.privilegeCreate == "FALSE"){	
							$("#uploadcategory option[value='Scorecard Import']").remove()
						}
					}
					if(data.Scorecard !=	undefined && jQuery.isEmptyObject(data.Scorecard)){
						$("#uploadcategory option[value='Scorecard Import']").remove()
					}
				}
			});
			var encodeval	=	encodeURIComponent("Initiatives & Projects");
			$.ajax({
				type : "GET",
				url : "user/modulePermissions?moduleName="+encodeval,
				success : function(data) {
					
					$.each(data,function(forindex,fordata){
						if(forindex	==	"Initiatives & Projects"){
							$.each(fordata,function(forindex1,fordata1){
								if(forindex1	==	"Initiatives"){
									if(fordata1.privilegeCreate !=	undefined && fordata1.privilegeCreate == "FALSE"){	
										$("#uploadcategory option[value='Initiative Import']").remove()
									}
								}
							});
						}
					});
				}
			});
            $.ajax({
				type : "GET",
				url : "user/modulePermissions?moduleName=Risk",
				dataType : "json",
				success : function(data) {
					if(data.Risk !=	undefined && !jQuery.isEmptyObject(data.Risk)){
						if(data.Risk.Risk.privilegeCreate !=	undefined && data.Risk.Risk.privilegeCreate == "FALSE"){	
							$("#uploadcategory option[value='Risk Import']").remove()
						}
					}
					if(data.Risk !=	undefined && jQuery.isEmptyObject(data.Risk)){
						$("#uploadcategory option[value='Risk Import']").remove()
					}
				}
			});
			var nodeList;
			
            if(viewpermission	==	false){
            	$(".orgtrackeraccess").remove();
            	$(".noaccessmsg").html("<center>No organization access</center>");
        		return false;;
        	}
			
		    if(LicenseDetailsdata['moduleList'] !=	undefined && LicenseDetailsdata['moduleList'] !=	"" && LicenseDetailsdata['moduleList'] !=	null){
		    	var moduleList	=	LicenseDetailsdata['moduleList'];
				$.each(moduleList, function(index, reportee) {
					var checkedornot	=	(reportee.enabled	==	true?"checked":"");
					if((reportee.moduleName	==	"Scorecard" || reportee.moduleName	==	"ScoreCard") && reportee.enabled	==	true){
						scorecardlinkEnable	=	true;
						linkdesignenable	=	"flex !important";
					}
					if(reportee.moduleName	==	"Initiatives & Projects" && reportee.enabled	==	true){
						initiativelinkEnable	=	true;
						linkdesignenable	=	"flex !important";
					}
					if(reportee.moduleName	==	"Risk" && reportee.enabled	==	true){
						risklinkEnable		=	true;
						linkdesignenable	=	"flex !important";
					}
					if(reportee.tagName	==	"KPI View" && reportee.enabled	==	true){
						kpilinkEnable		=	true;
						linkdesignenable	=	"flex !important";
					}
					
				});
		    }

			var savedYear = localStorage.getItem('selectedYear');
			if (savedYear && savedYear > 0) {
				$("#yearSelector").val(savedYear).trigger('change');
				updatePermissionsAndReload(savedYear);
				loadOrgChart(savedYear);

			} else {
				// Load the default year if no selection is saved
				$("#yearSelector").val(0).trigger('change'); // Assuming 0 is the default year
				updatePermissionsAndReload(0);
				loadOrgChart(0);

			}

		    
		    var implementationtypemethod	=	false;
    		if((controlpanelgeneralsiteSettings.implementation !=	null && controlpanelgeneralsiteSettings.implementation !=	undefined) && (controlpanelgeneralsiteSettings.implementationType !=	null && controlpanelgeneralsiteSettings.implementationType !=	undefined)){
    			if(controlpanelgeneralsiteSettings.implementationType	==	"Department"){
		    		implementationtypemethod	=	true
		    	}
	    	}
    	/*	var orglink	=	localStorage.getItem('orglink');
    		orglink	=	(orglink	==	null || orglink	==	undefined?localStorage.getItem('rootuseraccessid'):orglink	==	'subuser'?localStorage.getItem('useraccessid'):localStorage.getItem('rootuseraccessid'));
    		if(!orglink){
    			localStorage.getItem('rootuseraccessid');
    		}
    		
    		if(localStorage.getItem('orguseraccessid') != undefined && localStorage.getItem('orguseraccessid') != null && localStorage.getItem('orguseraccessid') != ""){
    			orglink	=	localStorage.getItem('orguseraccessid');
    		}
    		
		    orgurlcall	=	(implementationtypemethod	==	true?"departmentChart":"retrieveOrgChart");
		    $("#orgimportmethodtype").val(orgurlcall);
        	$.ajax({
				type : "GET",
				url : orgurlcall+'/'+orglink,
				contentType : "application/json; charset=utf-8",
				global : false,
				async : false,
				dataType : "json",
				success : function(data) {
					nodeList = data.nodeList;
				},error: function (msg, status) {
					if($(".orgchart").find("spinner")){
						$(".spinner").hide();
					}
				}
			});
            var selectedNode = '';
            var ds = nodeList;
            var getId = function() {
                return (new Date().getTime()) * 1000 + Math.floor(Math.random() * 1001);
            };
            */
            if(scorecardlinkEnable	==	false){
            	$(".userscorecardpermission").hide();
            }
            
            if(initiativelinkEnable	==	false){
            	$(".usersinitiativepermission").hide();
            }
            if(risklinkEnable	==	false){
            	$(".usersriskpermission").hide();
            }
            if(kpilinkEnable	==	false){
            	$(".userkpipermission").hide();
            }
            if(risklinkEnable	==	false && initiativelinkEnable	==	false && scorecardlinkEnable	==	false && kpilinkEnable	==	false){
            	$(".pagecustombtn").hide();
            	//$(".usercustombtn").css({"border-top-right-radius":"20px !important","border-bottom-right-radius":"20px !important"});
            }
            
            /*
            var oc = $('#chart-container').orgchart({
                'data': ds,
                'chartClass': 'edit-state',
                'exportButton': true,
                'nodeContent': 'title',
                // 'direction': 'l2r',
                'exportFilename': 'OrgChart',
                'parentNodeSymbol': 'fa-th-large',
                'createNode': function($node, data) {
                    $node[0].id = getId();
                }
            });*/

			function formvalidationerrorreset(){
				$("#add_org_structure_form span[style='color: red']").each(function() {
				    $(this).not("#emailerrorshow1").remove();
				});
				$("#emailerrorshow1").hide();
			}
			
			function updateformvalidationerrorreset(){
				$("#edit_org_structure_form span[style='color: red']").each(function() {
				    $(this).not("#emailerrorshow").remove();
				});
				$("#emailerrorshow").hide();
			}
			
			function deptupdateformvalidationerrorreset(){
				$("#add_dept_structure_form span[style='color: red']").each(function() {
				    $(this).remove();
				});
			}
			
			function populateOwnerDropdownorg(elementId,elementId2) {
				var numberOfOptions = $(elementId + ' > option').length;
				if (jQuery.isEmptyObject(reporteelist)) {
					$.ajax({
						url : "/stratroom/org/employeeList",
						async:false,
						success : function(employeeList) {
							reporteelist = employeeList;
							$.each(employeeList, function(index, reportee) {
								addOption(elementId, reportee.name, reportee.id,reportee.email)
								addOption(elementId2, reportee.name, reportee.id,reportee.email)
							});
						}
					});
				} else if (numberOfOptions < 2) {
					$.each(reporteelist, function(index, reportee) {
						addOption(elementId, reportee.name, reportee.id,reportee.email)
						addOption(elementId2, reportee.name, reportee.id,reportee.email)
					});
				}
			}
			
			function departmentpopulateOwnerDropdownorg(elementId) {
				$(elementId).empty();
				$.ajax({
					url : "/stratroom/org/employeeList",
					async:false,
					success : function(employeeList) {
						$.each(employeeList, function(index, reportee) {
							addOption(elementId, reportee.name, reportee.id,reportee.email)
						});
					}
				});
			}
			
			function departmentlist(elementId){
				$(elementId).empty();	
				$.ajax({
					url : "/stratroom/allDepartmentList",
					async:false,
					success : function(data, status) {
						$.each(data, function (index, reportee) {
							addOption(elementId, reportee.name, reportee.id)
						});
					}
				});
			}
			
			function populateDropdownDeptScorecard(elementId,id) {
				var numberOfOptions = $(elementId + ' > option').length;
				if(id !=	null && id !=	""){
					$.ajax({
						url : "/stratroom/scoreCardDetailListByDeptId/"+id,
						async:false,
						success : function(employeeList) {
							if(employeeList !=	""){
								$.each(employeeList, function(index, reportee) {
									if(reportee.scorecardName !=	undefined){
										addOption(elementId, reportee.scorecardName, reportee.pageId,"");
									}
								});
							}
						}
					});
				}
			}
			
			function populateDropdownScorecard(elementId,empid,type) {
				var numberOfOptions = $(elementId + ' > option').length;
				$.ajax({
					url : "/stratroom/pagesDropDownList/"+empid+"?type="+type,
					async:false,
					success : function(employeeList) {
						$.each(employeeList.resultObject, function(index, reportee) {
							addOption(elementId, reportee.pageName, reportee.id,"")
						});
					}
				});
			}
			
			function populateDropdownDeptInitiative(elementId,id) {
				var numberOfOptions = $(elementId + ' > option').length;
				if(id !=	null && id !=	""){
					$.ajax({
						url : "/stratroom/pageListByDeptPageType/"+id+"?pageType=INITIATIVE",
						async:false,
						success : function(employeeList) {
							if(employeeList !=	""){
								$.each(employeeList, function(index, reportee) {
									if(reportee.pageName !=	undefined){
										addOption(elementId, reportee.pageName, reportee.id,"");
									}
								});
							}
						}
					});
				}
			}
			
			function populateDropdownInitiative(elementId,empid,type) {
				var numberOfOptions = $(elementId + ' > option').length;
				$.ajax({
					url : "/stratroom/pagesDropDownList/"+empid+"?type="+type,
					async:false,
					success : function(employeeList) {
						$.each(employeeList.resultObject, function(index, reportee) {
							addOption(elementId, reportee.pageName, reportee.id,"");
						});
					}
				});
			}
			
			function populateDropdownKpi(elementId,empid,type) {
				var numberOfOptions = $(elementId + ' > option').length;
				$.ajax({
					url : "/stratroom/pagesDropDownList/"+empid+"?type="+type,
					async:false,
					success : function(employeeList) {
						$.each(employeeList.resultObject, function(index, reportee) {
							addOption(elementId, reportee.kpiName, reportee.id,"")
						});
					}
				});
			}
			
			function populateDropdownRisk(elementId,empid,type) {
				var numberOfOptions = $(elementId + ' > option').length;
				$.ajax({
					url : "/stratroom/pagesDropDownList/"+empid+"?type="+type,
					async:false,
					success : function(employeeList) {
						$.each(employeeList.resultObject, function(index, reportee) {
							addOption(elementId, reportee.pageName, reportee.id,"")
						});
					}
				});
			}
			
			function populateDeptDropdownRisk(elementId,valid) {
				var numberOfOptions = $(elementId + ' > option').length;
				var nodeid	=	(valid !=	"" && valid !=	null?valid:$('#orgdept').val());
				$.ajax({
					url : "/stratroom/pageListByDeptPageType/"+nodeid+"?pageType=RISK",
					async:false,
					success : function(employeeList) {
						$.each(employeeList, function(index, reportee) {
							addOption(elementId, reportee.pageName, reportee.id,"")
						});
					}
				});
			}
			
			
			function populateDropdownDeptKpi(elementId,valid) {
				var numberOfOptions = $(elementId + ' > option').length;
				var nodeid	=	(valid !=	"" && valid !=	null?valid:$('#orgdept').val());	
				if(nodeid !=	null && nodeid !=	""){	
					$.ajax({
						url : "/stratroom/kpiListByDept/"+nodeid,
						async:false,
						success : function(employeeList) {
							$.each(employeeList, function(index, reportee) {
								addOption(elementId, reportee.kpiName, reportee.id,"")
							});
						}
					});
				}
			}
			
			function addOption(id, text, value,pageid) {
				$(id).append(`<option data-pageid="${pageid}" value="${value}">${text}</option>`);
			}
			
			$('body').on('click', '.orgiz_name', function() {
				if($("#userrolename").val()	==	"Super User" || $("#userrolename").val()	==	"Admin"){
					var id	=	$(this).attr("data-id");
					if(id ==	"" || id	==	undefined || id	==	null || id	==	'null'){
						console.log('yes');
						return false;
					}
					
					$.ajax({
						url : "/stratroom/updateSessionEmployee/" + id,
						async:false,
						contentType : "application/json",
						success : function(data, status) {
							localStorage.setItem('useraccessid',id);
							localStorage.removeItem('orguseraccessid');
							localStorage.setItem('orglink',"subuser");
							location.reload(true);
						}
					});
				}
			});

			 $('body').on('click', '.orgiz_edit', function() { 
				console.log("function called")
                const nodeId = $(this).closest('a').attr('data-nodeId');
				const deptId = $(this).closest('a').attr('data-deptId');
				const parentdeptid	=	$(this).closest('a').attr('data-parentId');
				console.log(nodeId, deptId, "nodeId, DeptId");
				$("#deptuserscorecardValue").find("option").remove().end();
	            $("#deptuserscorecardValue").append('<option value="">Select Scorecard</option>');
				if(scorecardlinkEnable	==	true){
			       populateDropdownDeptScorecard('#deptuserscorecardValue',deptId);
				}
				
				
				$("#deptuserinitiativeValue").find("option").remove().end();
	            $("#deptuserinitiativeValue").append('<option value="">Select Initiative</option>');
	            if(initiativelinkEnable	==	true){
	                populateDropdownDeptInitiative('#deptuserinitiativeValue',deptId);
	            }

				departmentpopulateOwnerDropdownorg(".userdept-name-multi-select");
				populateDeptbasedOwnerDropdown('.userdept-name-multi-select',deptId);

				$("#deptuserkpiValue").find("option").remove().end();
	            $("#deptuserkpiValue").append('<option value="">Select KPI</option>');
	            if(kpilinkEnable	==	true){
	                populateDropdownDeptKpi('#deptuserkpiValue',deptId);
	            }

				$("#deptuserriskValue").find("option").remove().end();
	            $("#deptuserriskValue").append('<option value="">Select Risk</option>');
	            if(risklinkEnable	==	true){
	                if(nodeId !=	""){
	                	populateDeptDropdownRisk('#deptuserriskValue',deptId);
	                }
	            }

				$.ajax({
					url : "/stratroom/getDepartmentMapping/"+deptId,
					async:false,
					success : function(data) {
						console.log(data, "data");
						/*if(data.deptImage	!=	undefined && data.deptImage !=	"" && data.deptImage !=	null){
							$("#upload_link_dept").attr('src', data.deptImage);
						}else{
							//$("#upload_link_dept").attr('src',"");
							//$("#upload_link_dept").removeAttr('src');
							//$("#upload_link_dept").addClass('orgchartuserimage');
							$("#upload_link_dept").attr('data-name',data.deptName);
							$('#upload_link_dept').initial({ charCount: 2, height: 30, width: 30, fontSize: 18 });
						}*/
						
	            		$("#ownernameValue").find("option").remove().end();
	            		populateOwnerDropdownorg("#ownernameValue");
	            		$('#ownernameValue').val(data.owner);
	            		$("#ownernameValue").select2();
						
						console.log(data.emailAddress, "emailAddress")
						if(data.emailAddress !=	undefined){
							 const emailInput = document.getElementById("deptemailadd");
                             emailInput.value = data.emailAddress;
							 console.log(emailInput, "emailInput");
						}

						$('#emialIdValue').val(data.emailAddress);
						if(data.deptUniqueId !=	undefined){
            				$('#editorgdeptidValue').val(data.deptUniqueId);
            			}
						$("#updatedeptId").val(data.deptId);
            			$('#editorgdept').val(data.deptName);
            			/*$('#editorgdept').select2({
            				tags: true
            			});*/
            			var employee = [];
            			$.each(data.employeeDepartmentMappingList,function(inde,value){
            				employee.push(value.empId);
            			});
            			$('.userdept-name-multi-select').val(employee).trigger('change');;
            			$('.userdept-name-multi-select').select2();
            			$("#deptuserinitiativeValue").val(data.initiativePageId).trigger('change');;
            			$("#deptuserinitiativeValue").select2();
            			
    	    			$('#deptuserscorecardValue').val(data.scorecardPageId).trigger('change');;
    	    			$("#deptuserscorecardValue").select2();
    	    			
    	    			$('#deptuserkpiValue').val(data.kpiId).trigger('change');;
    	    			$("#deptuserkpiValue").select2();
    	    			$('#deptuserriskValue').val(data.riskPageId).trigger('change');;
    	    			$("#deptuserriskValue").select2();
					}
				});

				$("#dept_new_id1").val(nodeId);
				$("#dept_parentid").val(parentdeptid);
				$("#deptmode").val('edit');

				
			 })
			
            // $('body').on('click', '.orgiz_edit', function() {
            // 	$("#deptiduniqeueerrorshow").hide();
            // 	if(implementationtypemethod	==	false){
            // 		updateformvalidationerrorreset();
	        //     	var drogdropid 	=	$(this).parents().eq(1)[0]["id"];
	        //     	if(drogdropid !=	undefined && drogdropid !=	""){
	        //     		$("#currentimgdivid").val(drogdropid);
	        //     	}
	            	
	        //     	$(".usercustombtn").addClass("active");
	        //     	$(".pagecustombtn").removeClass("active");
	        //     	$(".customtabuser").show();
	        //     	$(".customtabpages").hide();
	        //         $('.edit_org_structure-sidebar').css('right', 0);
	        //         $('.add_org_structure-sidebar').css('right', '-300px');
	        //         $('.add_dept_structure-sidebar').css('right', '-300px');
	        //         $("#userscorecard").find("option").remove().end();
	        //         $("#userscorecard").append('<option value="">Select Scorecard</option>');
	        //         if(scorecardlinkEnable	==	true){
	        //         	populateDropdownScorecard('.customtabpages #userscorecard',$("#emp_show_id").val(),"SCORECARD");
	        //         }
	                
	        //         $("#userinitiative").find("option").remove().end();
	        //         $("#userinitiative").append('<option value="">Select Initiative</option>');
	        //         if(initiativelinkEnable	==	true){
	        //         	populateDropdownInitiative('.customtabpages #userinitiative',$("#emp_show_id").val(),"INITIATIVE");
	        //         }
	                
	        //         $("#userkpi").find("option").remove().end();
	        //         $("#userkpi").append('<option value="">Select KPI</option>');
	        //         if(kpilinkEnable	==	true){
	        //         	populateDropdownKpi('.customtabpages #userkpi',$("#emp_show_id").val(),"KPI");
	        //         }
	        //         $('.chosen-select').chosen({}).change( function(obj, result) {
	        //     		$(".chosen-container-single").find('label.error').remove();
	        //         	if(result.selected	==	"" || result.selected	==	undefined){
	        //     			$('*[id=userkpi-error]').each(function() {
	        //     			    $(this).remove();
	        //     			});
	        //     		}else{
	        //     			$(".chosen-container-single").find('label.error').remove();
	        //     		}
	        //     	});
	                
	        //         $(".chosen-container-single").css("width","100%");
	                
	        //         $("#userrisk").find("option").remove().end();
	        //         $("#userrisk").append('<option value="">Select Risk</option>');
	        //         if(risklinkEnable	==	true){
	        //         	populateDropdownRisk('.customtabpages #userrisk',$("#emp_show_id").val(),"RISK");
	        //         }
	        //         getEmploeepageLink($("#emp_show_id").val());
            // 	}
	            
	        //     if(implementationtypemethod	==	true){
	        //     	$(".adddeptText").hide();
	        //     	$(".editdeptSelect").show();
	        //     	$(".dept_struct_add_btn").val("Save");
	        //     	$(".adddeptelem").removeClass("required");
	        //     	$(".editdeptelem").addClass("required");
	        //     	$("#editorgdeptid").attr("readonly",true);
	        //     	deptupdateformvalidationerrorreset();
	        //     	$("#deptmode").val('edit');
	        //     	var drogdropid 	=	$(this).parents().eq(1)[0]["id"];
	        //     	if(drogdropid !=	undefined && drogdropid !=	""){
	        //     		$("#deptcurrentimgdivid").val(drogdropid);
	        //     	}
	        //     	var parentdeptid	=	$(this).attr("data-deptId");
	        //     	var nodeId	=	$(this).attr("data-nodeId");
	            	
	        //     	if(nodeId == undefined || nodeId	==	null || nodeId	==	""){
	        //     		return false;
	        //     	}
	            	
	        //     	$("#deptuserscorecard").find("option").remove().end();
	        //         $("#deptuserscorecard").append('<option value="">Select Scorecard</option>');
	        //         if(scorecardlinkEnable	==	true){
	        //         	populateDropdownDeptScorecard('#deptuserscorecard',nodeId);
	        //         }
	                
	        //         $("#deptuserinitiative").find("option").remove().end();
	        //         $("#deptuserinitiative").append('<option value="">Select Initiative</option>');
	        //         if(initiativelinkEnable	==	true){
	        //         	populateDropdownDeptInitiative('#deptuserinitiative',nodeId);
	        //         }
	        //         departmentpopulateOwnerDropdownorg(".userdept-name-multi-select");
	        //     	populateDeptbasedOwnerDropdown('.userdept-name-multi-select',nodeId);
	            	
	        //     	$('.edit_org_structure-sidebar').css('right','-300px');
	        //         $('.add_org_structure-sidebar').css('right', '-300px');
	        //         $("#dept_new_id1").val(nodeId);
	        //         $("#dept_parentid").val(parentdeptid);
	        //         //departmentlist('#editorgdept');
	        //         //$("#editorgdept").val(nodeId);
            // 		/*$("#editorgdept").select2({
            // 			tags: true
            // 		});*/
            		
	        //         $('.add_dept_structure-sidebar').css('right', 0);
	                
	        //         $("#deptuserkpi").find("option").remove().end();
	        //         $("#deptuserkpi").append('<option value="">Select KPI</option>');
	        //         if(kpilinkEnable	==	true){
	        //         	populateDropdownDeptKpi('#deptuserkpi',nodeId);
	        //         }
	        //         /*$('.deptchosen-select').chosen({}).change( function(obj, result) {
	        //     		$(".chosen-container-single").find('label.error').remove();
	        //         	if(result.selected	==	"" || result.selected	==	undefined){
	        //     			$('*[id=deptuserkpi-error]').each(function() {
	        //     			    $(this).remove();
	        //     			});
	        //     		}else{
	        //     			$(".chosen-container-single").find('label.error').remove();
	        //     		}
	        //     	});
	                
	        //         $(".chosen-container-single").css("width","100%");*/
	                
	        //         $("#deptuserrisk").find("option").remove().end();
	        //         $("#deptuserrisk").append('<option value="">Select Risk</option>');
	        //         if(risklinkEnable	==	true){
	        //         	if(nodeId !=	""){
	        //         		populateDeptDropdownRisk('#deptuserrisk',nodeId);
	        //         	}
	        //         }

			// 		getDeptmentMappingLink(nodeId);

            // 	}

            // });

            function getDeptmentMappingLink(empid) {
            	
				$.ajax({
					url : "/stratroom/getDepartmentMapping/"+empid,
					async:false,
					success : function(data) {
						console.log(data, "data");
						/*if(data.deptImage	!=	undefined && data.deptImage !=	"" && data.deptImage !=	null){
							$("#upload_link_dept").attr('src', data.deptImage);
						}else{
							//$("#upload_link_dept").attr('src',"");
							//$("#upload_link_dept").removeAttr('src');
							//$("#upload_link_dept").addClass('orgchartuserimage');
							$("#upload_link_dept").attr('data-name',data.deptName);
							$('#upload_link_dept').initial({ charCount: 2, height: 30, width: 30, fontSize: 18 });
						}*/
						
	            		$("#ownername").find("option").remove().end();
	            		populateOwnerDropdownorg("#ownername");
	            		$('#ownername').val(data.owner);
	            		$("#ownername").select2();
						
						console.log(data.emailAddress, "emailAddress")
						if(data.emailAddress !=	undefined){
							$("#deptemailadd").val(data.emailAddress)
							console.log("Value set to:", $("#deptemailadd").val());
							console.log(data.emailAddress, "emailAddress")
						}
						if(data.deptUniqueId !=	undefined){
            				$('#editorgdeptid').val(data.deptUniqueId);
            			}
						$("#updatedeptId").val(data.deptId);
            			$('#editorgdept').val(data.deptName);
            			/*$('#editorgdept').select2({
            				tags: true
            			});*/
            			var employee = [];
            			$.each(data.employeeDepartmentMappingList,function(inde,value){
            				employee.push(value.empId);
            			});
            			$('.userdept-name-multi-select').val(employee).trigger('change');;
            			$('.userdept-name-multi-select').select2();
            			$("#deptuserinitiative").val(data.initiativePageId).trigger('change');;
            			$("#deptuserinitiative").select2();
            			
    	    			$('#deptuserscorecard').val(data.scorecardPageId).trigger('change');;
    	    			$("#deptuserscorecard").select2();
    	    			
    	    			$('#deptuserkpi').val(data.kpiId).trigger('change');;
    	    			$("#deptuserkpi").select2();
    	    			$('#deptuserrisk').val(data.riskPageId).trigger('change');;
    	    			$("#deptuserrisk").select2();
					}
				});
			}
            
            function getEmploeepageLink(empid) {
				$.ajax({
					url : "/stratroom/pageLinkListByEmpId/"+empid,
					async:false,
					success : function(employeeList) {
						$.each(employeeList.pageLinkDTOS,function(ind,val){
							if(val.type	==	"KPI"){
								$("#userkpi").val(val.typeId).trigger("chosen:updated");
							}
							if(val.type	==	"RISK"){
								$("#userrisk").val(val.typeId);
							}
							if(val.type	==	"INITIATIVE"){
								$("#userinitiative").val(val.typeId);
							}
							if(val.type	==	"SCORECARD"){
								$("#userscorecard").val(val.typeId);
							}
						});
					}
				});
				if($("#userscorecard").val() == ""){
					$("#userscorecard").val("");
				}
				if($("#userrisk").val() == ""){
					$("#userrisk").val("");
				}
				if($("#userinitiative").val() == ""){
					$("#userinitiative").val("");
				}
				if($("#userkpi").val() == ""){
					$("#userkpi").val("");
				}
			}
            
            $('body').on('click', '.orgiz_add', function() {
			
			var deptIdAlt = $(this).closest('a').attr('data-deptId'); 
			
			console.log("Department ID (from .attr()):", deptIdAlt);


            	$("#deptiduniqeueerrorshow").hide();
            	if(implementationtypemethod	==	false){
            		formvalidationerrorreset();
            		$('#upload_link2').attr('data-imageset', "notset");
	            	$("#upload_link2").attr('src', "images/media.png");
	            	$("#add_org_structure_form").trigger('reset');
	                $('.add_org_structure-sidebar').css('right', 0);
	                $('.edit_org_structure-sidebar').css('right', '-300px');
	                $('.add_dept_structure-sidebar').css('right', '-300px');
            	}
            	
            	if(implementationtypemethod	==	true){
            		deptupdateformvalidationerrorreset();
            		$("#orgdept").val("");
            		$("#deptmode").val('add');
            		$(".dept_struct_add_btn").val("Add");
            		$("#ownername,.userdept-name-multi-selectadd").find("option").remove().end();
            		$("#ownername").append("<option></option>");
            		populateOwnerDropdownorg("#ownername",".userdept-name-multi-selectadd");
            		$("#ownername").val("");
            		$("#ownername").select2();
            		$("#ownername").val("");
	            	$('.add_dept_structure-sidebar').css('right', 0);
            		$(".adddeptText").show();
            		$("#editorgdeptid").attr("readonly",false);
	            	$(".editdeptSelect").hide();
            		$(".adddeptelem").addClass("required");
            		$(".editdeptelem").removeClass("required");
            		$(".userdept-name-multi-selectadd").val("");
            		$(".userdept-name-multi-selectadd").select2();
            		$("#deptemailadd").val($("#ownername option:selected").attr("data-pageid"));

					const emialAddress = $("#ownername option:selected").attr("data-pageid");

					console.log(emialAddress, "emailAddress");
            		//departmentlist('#ownername');
            		//$("#orgdept").val("");
            		//$("#orgdept").select2({});
            		//$(".editdeptelem").next().hide()
            		
            		// if($(this).attr("data-deptid") !=	"" && $(this).attr("data-deptid") !=	undefined){
            		// 	$("#dept_parentid").val($(this).attr("data-deptid"));
            		// }

					 $("#dept_parentid").val(deptIdAlt || '');
            		
            		$("#deptuserscorecard").find("option").remove().end();
	                $("#deptuserscorecard").append('<option value="">Select Scorecard</option>');
	                if(scorecardlinkEnable	==	true){
	                	populateDropdownDeptScorecard('#deptuserscorecard',$("#orgdept").val());
	                }
	                
	                $("#deptuserinitiative").find("option").remove().end();
	                $("#deptuserinitiative").append('<option value="">Select Initiative</option>');
	                if(initiativelinkEnable	==	true){
	                	populateDropdownDeptInitiative('#deptuserinitiative',$("#orgdept").val());
	                }
	                
	                $("#deptuserkpi").find("option").remove().end();
	                $("#deptuserkpi").append('<option value="">Select KPI</option>');
	                if(kpilinkEnable	==	true){
	                	populateDropdownDeptKpi('#deptuserkpi',$("#orgdept").val());
	                }
	                $('.deptchosen-select').chosen({}).change( function(obj, result) {
	            		$(".chosen-container-single").find('label.error').remove();
	                	if(result.selected	==	"" || result.selected	==	undefined){
	            			$('*[id=deptuserkpi-error]').each(function() {
	            			    $(this).remove();
	            			});
	            		}else{
	            			$(".chosen-container-single").find('label.error').remove();
	            		}
	            	});
	                
	                $(".chosen-container-single").css("width","100%");
	                
	                $("#deptuserrisk").find("option").remove().end();
	                $("#deptuserrisk").append('<option value="">Select Risk</option>');
	                if(risklinkEnable	==	true){
	                	
	                		populateDeptDropdownRisk('#deptuserrisk',$("#orgdept").val());
	                }
	                
            		$("#upload_link_dept").attr('src', "images/media.png");
	            	$("#add_dept_structure_form").trigger('reset');
	                $('.add_org_structure-sidebar').css('right', '-300px');
	                $('.edit_org_structure-sidebar').css('right', '-300px');
            	}
            });
			
            $('body').on('click', '.orgiz_initiative_btn_no_link', function(e) {
            	e.preventDefault();
            	$.notify("Initiative link not avaiable", {
					  style: 'error',
					  className: 'graynotify'
					});
            });
            
            $('body').on('click', '.orgiz_risk_btn_no_link', function(e) {
            	e.preventDefault();
            	$.notify("Risk link not avaiable", {
					  style: 'error',
					  className: 'graynotify'
					});
            });
            
            $('body').on('click', '.orgiz_kpi_btn_no_link', function(e) {
            	e.preventDefault();
            	$.notify("Kpi link not avaiable", {
					  style: 'error',
					  className: 'graynotify'
					});
            });
            $('body').on('click', '.orgiz_scorecard_btn_no_link', function(e) {
            	e.preventDefault();
            	$.notify("Scorecard link not avaiable", {
					  style: 'error',
					  className: 'graynotify'
					});
            });
            
			
			$('body').on('click', '.orgiz_kpi_btn', function(e) {
				e.preventDefault();
				
            	var kpidetailsofobjective 	=	{"kpiId":"","objId":"","scoreCardId":""};
				localStorage.setItem('kpi_pagenumber', JSON.stringify(kpidetailsofobjective));
				var getsrcElement	=	e.target;
				var getsrcval		=	$(getsrcElement).attr("data-srcval");
				if(getsrcval !=	undefined && getsrcval !=	""){
					
					$.ajax({
						url : "/stratroom/" + getsrcval,
						async:false,
						success : function(data, status) {
							window.location	=	getsrcval;
						},error: function (msg, status) {
							if (!jQuery.isEmptyObject(msg.responseText)) {
								if (msg.status == "404") {
									$.notify("Not valid link", {
										  style: 'error',
										  className: 'graynotify'
										});
									return false;
								}else if (msg.status == "404") {
									$.notify("Not valid link", {
										  style: 'error',
										  className: 'graynotify'
										});
									return false;
								}
							}
						}
					});	
				}
            });
            

            $('body').on('click', '#close-org-aside', function() {
                $('.edit_org_structure-sidebar').css('right', '-300px');
            });

            $('body').on('click', '#close-org-aside1', function() {
                $('.add_org_structure-sidebar').css('right', '-300px');
            });
            
            $('body').on('click', '#close-dept-aside1', function() {
                $('.add_dept_structure-sidebar').css('right', '-300px');
            });
            
         

            $("#ownername").change(function(){
            	$("#deptemailadd").val($("#ownername option:selected").attr("data-pageid"));
            });
            
          
            
            function populateDeptbasedOwnerDropdown(elementId,id) {
            	//$(elementId).empty();
				var numberOfOptions = $(elementId + ' > option').length;
				$.ajax({
					url : "/stratroom/departmentByEmployeeList/"+id,
					async:false,
					success : function(employeeList) {
						var existdepartment	=	[];
						$.each(employeeList, function(index, reportee) {
							if(reportee.firstName !=	null){
								existdepartment.push(reportee.empId);
								//addOption(elementId, reportee.firstName, reportee.empId)
							}
						});
						$(elementId).val(existdepartment);
					}
				});
			}
            
          


            // Add function
            callaftercreatedemployee	= function(currentimage,empnewID){
            //$('body').on('click', '#add-org-object', function() {
                var $chartContainer = $('#chart-container');
                var nodeVals = [];
                var name1 = $('#name_add1').val();
                var desg1 = $('#desg_add1').val();
                var dept1 = $('#dept_add1').val();
                var kpi1 = $('#kpi_name_add1').val();

                $('#new-nodelist').find('.new-node').each(function(index, item) {
                    var validVal = item.value.trim();
                    if (validVal.length) {
                        nodeVals.push(validVal);
                    }
                });

                // var $node = $('#selected-node').data('node');
                var $node = selectedNode;

                // var nodeType = $('input[name="node-type"]:checked');
                var nodeType = 'children';

                if (!$('.orgchart').length) {
                    alert('Please create the root node firstly when you want to build up the orgchart from the scratch');
                    return;
                }
                if (!$node) {
                    alert('Please select one node in orgchart');
                    return;
                }
                
                var hasChild = $node.parent().attr('colspan') > 0 ? true : false;
                if (!hasChild) {
                    var rel = nodeVals.length > 1 ? '110' : '100';
                    oc.addChildren($node, [{
                        'name': name1,
                        'title': desg1,
                        'dept': dept1,
                        'kpi': kpi1,
                        'relationship': rel,
                        'canMaintain':false,
                        'imagesrc':currentimage,
                        'id': empnewID//getId()
                    }]);
                } else {
                    oc.addSiblings($node.closest('tr').siblings('.nodes').find('.node:first'), [{
                        'name': name1,
                        'title': desg1,
                        'dept': dept1,
                        'kpi': kpi1,
                        'relationship': '110',
                        'canMaintain':false,
                        'imagesrc':currentimage,
                        'id': empnewID//getId()
                    }]);
                }

                $('.orgchartuserimage').initial({ charCount: 2, height: 30, width: 30, fontSize: 18 });
                $('#name_add1, #desg_add1, #dept_add1, #kpi_name_add1').val('');

                $('.add_org_structure-sidebar').css('right', '-300px');

            //});
            }
            
            // Add dept function
            callafterdeptcreatedemployee	= function(currentimage,empnewID){
            //$('body').on('click', '#add-org-object', function() {
                var $chartContainer = $('#chart-container');
                var nodeVals = [];
                var name1 = $("#orgdept option:selected").text();
                var desg1 = $('#deptuserscorecard, #deptuserrisk').val();
                var dept1 = "";
                $('#new-nodelist').find('.new-node').each(function(index, item) {
                    var validVal = item.value.trim();
                    if (validVal.length) {
                        nodeVals.push(validVal);
                    }
                });

                // var $node = $('#selected-node').data('node');
                var $node = selectedNode;

                // var nodeType = $('input[name="node-type"]:checked');
                var nodeType = 'children';

                if (!$('.orgchart').length) {
                    alert('Please create the root node firstly when you want to build up the orgchart from the scratch');
                    return;
                }
                if (!$node) {
                    alert('Please select one node in orgchart');
                    return;
                }
                
                var hasChild = $node.parent().attr('colspan') > 0 ? true : false;
                if (!hasChild) {
                    var rel = nodeVals.length > 1 ? '110' : '100';
                    oc.addChildren($node, [{
                        'name': name1,
                        'title': desg1,
                        'dept': dept1,
                        'kpi': "",
                        'relationship': rel,
                        'canMaintain':false,
                        'imagesrc':currentimage,
                        'id': empnewID//getId()
                    }]);
                } else {
                    oc.addSiblings($node.closest('tr').siblings('.nodes').find('.node:first'), [{
                        'name': name1,
                        'title': desg1,
                        'dept': dept1,
                        'kpi': "",
                        'relationship': '110',
                        'canMaintain':false,
                        'imagesrc':currentimage,
                        'id': empnewID//getId()
                    }]);
                }

                $('.orgchartuserimage').initial({ charCount: 2, height: 30, width: 30, fontSize: 18 });
                $('.userdept-name-multi-select, #deptuserscorecard, #orgdept, #deptuserinitiative, #deptuserkpi, #deptuserrisk').val('');

                $('.add_dept_structure-sidebar').css('right', '-300px');

            //});
            }

            // Edit Function
            updatedeptaftercall 	=	function(currentimage,empID){
            //$('body').on('click', '#edit-org-object', function() {
                var id = $('#dept_new_id1').val();
                var name = $("#orgdept option:selected").text();
                var desg = $("#orgdept option:selected").text();
                var dept = $("#orgdept option:selected").text();
                var kpi = "";

                const checkAndChange = (obj) => {
                	
                    if (id == obj.id) {
                        obj.name = name;
                        obj.title = desg;
                        obj.dept = dept;
                        obj.kpi = kpi;
                        obj.image	=	currentimage;
                    }
                }

                const recursion = (obj) => {
                    const o = obj;
                    checkAndChange(o);
                    var childEl = o.children;
                    if (o.children) {
                        if (childEl.length > 0) {
                            childEl.forEach(v => {
                                recursion(v);
                            });
                        }
                    }

                    return o;
                }
                
                let newData = recursion(ds);
                oc.init({
                    'data': newData
                });

                $('.add_dept_structure-sidebar').css('right', '-300px');
            //});
           }
            
            // Edit Function
            updateemployeeaftercall 	=	function(currentimage,empID){
            //$('body').on('click', '#edit-org-object', function() {
                var id = $('#org_new_id').val();
                var name = $('#name_add').val();
                var desg = $('#desg_add').val();
                var dept = $('#dept_add').val();
                var kpi = $('#kpi_name_add').val();

                const checkAndChange = (obj) => {
                	
                    if (id == obj.id) {
                        obj.name = name;
                        obj.title = desg;
                        obj.dept = dept;
                        obj.kpi = kpi;
                        obj.image	=	currentimage;
                    }
                }

                const recursion = (obj) => {
                    const o = obj;
                    checkAndChange(o);
                    var childEl = o.children;
                    if (o.children) {
                        if (childEl.length > 0) {
                            childEl.forEach(v => {
                                recursion(v);
                            });
                        }
                    }

                    return o;
                }
                
                let newData = recursion(ds);
                oc.init({
                    'data': newData
                });

                $('.edit_org_structure-sidebar').css('right', '-300px');
            //});
           }

            //Delete function
            $('body').on('click', '.orgiz_delete', function() {
            	var alertcontent	=	"Do you really want to delete?";
               
                var $node = $(this).parent().parent();
                if (!$node) {
					
                    $.notify("Error: Please select one node in orgchart", {
							  style: 'error',
							  className: 'graynotify'
							});
                    return;
                } else if ($node[0] == $('.orgchart').find('.node:first')[0]) {
					
					$.notify("Error: whole chart can not able to delete", {
							  style: 'error',
							  className: 'graynotify'
							});
					return;
                    
                }


                var url	=	"";
                if(implementationtypemethod	==	true){
                	if($(this).attr("data-nodeId") ==	"" || $(this).attr("data-nodeId")	==	undefined || $(this).attr("data-nodeId")	==	null)
            		{
                		return false;
            		}
                	url	=	"deleteDepartmentMapping/"+$(this).attr("data-nodeId");
                	$("#deleterecordid").val($(this).attr("data-nodeId"));
                }
                if(implementationtypemethod	==	false){
                	$("#deleterecordid").val($("#org_new_id").val());
                	url	=	$("#org_new_id").val()+"/removeEmployee";
                }
				
				$(".confirmalert").html(alertcontent);
				$('#delete-modal').modal('toggle');
				$(window).on("resize", function(){
				    $(".modal:visible").each(alignModal);
				}); 
				$(".modal").on("shown.bs.modal", alignModal);
				
				//Org delete button function
	            // $('body').on('click', ".orgDeleteconfirm", function (){
	            	
				// 	$('#delete-modal').modal('toggle');
				// 	console.log(implementationtypemethod, "deletedelete");
	            //     $.ajax({
        		// 		type : "DELETE",
        		// 		url : url,
        		// 		contentType : "application/json; charset=utf-8",
        		// 		global : false,
        		// 		async : false,
        		// 		dataType : "json",
        		// 		success : function(data) {
        		// 			var sucmsg	=	(implementationtypemethod?"Department has been removed successfully":"Employee has been removed successfully");
				// 			$.notify(sucmsg,{
				// 			  style: 'error',
				// 			  className: 'graynotify'
				// 			});
				// 			location.reload();
        		// 		}
        		// 	});  
                //     oc.removeNodes($node);
                //     $('#selected-node').val('').data('node', null);
	            // });


				
		
                /*if (window.confirm('Are you sure you want to delete this node?')) {
                   	$.ajax({
        				type : "GET",
        				url : $("#org_new_id").val()+"/removeEmployee",
        				contentType : "application/json; charset=utf-8",
        				global : false,
        				async : false,
        				dataType : "json",
        				success : function(data) {
        					alert("employee removed");
        				}
        			});  
                    oc.removeNodes($node);
                    $('#selected-node').val('').data('node', null);
                }*/
            });

            //Org box button function
            $('body').on('mouseenter', ".orgiz_btn_scorecard,  .orgiz_btn_risk,.orgiz_btn_kpi, .orgiz_btn_init, .orgiz_btn_appraisal", function (){
                $(this).css("border-radius", "6px");
                $(this).css("width", "dd");
                $(this).css("height", "dd");
            });

            $('body').on('mouseleave', ".orgiz_btn_scorecard, .orgiz_btn_risk,.orgiz_btn_kpi, .orgiz_btn_init, .orgiz_btn_appraisal", function (){
                $(this).css("border-radius", "50%");

            });  
            if($(".noorgaccess").length){
            	$(".orgchart").css("min-width","330px");
            }
        });
        

var rendercardData = []


function initOrgChart(data, implementationtypemethod) {
    console.log(data, "datainorgData");
    rendercardData = data;
	const lang = localStorage.getItem('selectedLang') || 'en';
	var deptHeader	=	"Department";
	var nameHeader	=	"Name";
	if(lang == 'ar') {
		deptHeader = "القسم"
		nameHeader = "الاسم"
		
	}else if(lang == 'am'){
		deptHeader = "የክፍል ስም"
		nameHeader = "ስም"
	}else {	
		deptHeader	=	"Department";
		nameHeader	=	"Name";
	}
    console.log(data, 'nodelIst');

	const storedLanguage = localStorage.getItem('selectedLang') || 'en';
	loadLanguage(storedLanguage);
    $('#chart-container').empty();

    let currentDeleteNode = null;
    let currentImplementationTypeMethod = null;

    // recursive renderer for nodes
    function renderNode(node) {
        console.log(node, "nodeata");
        // build image or initials
        var imageHtml = '';
        if (node.profileImage && node.profileImage !== "") {
            imageHtml = '<div class="image">'
                + '  <img src="' + node.profileImage + '" loading="lazy" width="26" height="26" alt="profile" />'
                + '</div>';
        } else {
            var initials = (node.ownerName ? node.ownerName.substring(0, 2).toUpperCase() : 'NA');
            imageHtml = '<div class="image text-avatar" style="margin-top:0.4rem;width:26px;height:26px;">'
                + '  <span>' + initials + '</span>'
                + '</div>';
        }

        var html = ''
            + '<li data-deptid="' + (node.deptId || '') + '">'
            + '  <div class="card org-box child ">'
            + '    <div class="org-section">'
            + '      <div class="drag-point" title="Drag to reorder" draggable="true" data-deptid="' + (node.deptId || '') + '">'
            + '        <i class="fas fa-bars"></i>'
            + '      </div>'
            + '      <div class="org-content">'
            +         imageHtml
            + '        <div class="content">'
            + '          <p class="org-label"><strong>'+nameHeader+'</strong> - ' + (node.ownerName || 'N/A') + '</p>'
            + '          <p class="org-label"><strong>'+deptHeader+'</strong> - ' + (node.deptName || 'N/A') + '</p>'

			+ '          <p class="org-label"><strong>Designation</strong> - ' + (node?.employee?.designation || 'N/A') + '</p>'
            + '          <p class="org-label"><strong>Location</strong> - ' + (node?.employee?.location || 'N/A') + '</p>'

        //     + '          <div class="org-info-action">'
        //     + '            <div class="action-list">';

        // // Scorecard link
        // if (node.scoreCardLandingUrl && node.scoreCardLandingUrl !== "") {
        //     html += '              <a target="_blank" href="' + node.scoreCardLandingUrl + '">'
        //         + '                <span class="icon" style="background:url(\'/stratroom/images/buzzer-green-i.svg\') center center no-repeat;background-size:cover">S</span>'
        //         + '              </a>';
        // } else {
        //     html += '              <a href="javascript:void(0);" onclick="$.notify(\'Scorecard link not available\', {style:\'error\',className:\'graynotify\'});">'
        //         + '                <span class="icon" style="background:url(\'/stratroom/images/buzzer-green-i.svg\') center center no-repeat;background-size:cover">S</span>'
        //         + '              </a>';
        // }

        // // Initiative link
        // if (node.initiativeLandingUrl && node.initiativeLandingUrl !== "") {
        //     html += '              <a target="_blank" href="' + node.initiativeLandingUrl + '">'
        //         + '                <span class="icon" style="background:url(\'/stratroom/images/buzzer-red-i.svg\') center center no-repeat;background-size:cover">I</span>'
        //         + '              </a>';
        // } else {
        //     html += '              <a href="javascript:void(0);" onclick="$.notify(\'Initiative link not available\', {style:\'error\',className:\'graynotify\'});">'
        //         + '                <span class="icon" style="background:url(\'/stratroom/images/buzzer-red-i.svg\') center center no-repeat;background-size:cover">I</span>'
        //         + '              </a>';
        // }

        // // KPI link
        // if (node.kpiLandingUrl && node.kpiLandingUrl !== "") {
        //     html += '              <a target="_blank" href="' + node.kpiLandingUrl + '">'
        //         + '                <span class="icon" style="background:url(\'/stratroom/images/buzzer-yellow-i.svg\') center center no-repeat;background-size:cover">K</span>'
        //         + '              </a>';
        // } else {
        //     html += '              <a href="javascript:void(0);" onclick="$.notify(\'KPI link not available\', {style:\'error\',className:\'graynotify\'});">'
        //         + '                <span class="icon" style="background:url(\'/stratroom/images/buzzer-yellow-i.svg\') center center no-repeat;background-size:cover">K</span>'
        //         + '              </a>';
        // }

        // // Risk link
        // if (node.riskLandingUrl && node.riskLandingUrl !== "") {
        //     html += '              <a target="_blank" href="' + node.riskLandingUrl + '">'
        //         + '                <span class="icon" style="background:url(\'/stratroom/images/buzzer-green-i.svg\') center center no-repeat;background-size:cover">R</span>'
        //         + '              </a>';
        // } else {
        //     html += '              <a href="javascript:void(0);" onclick="$.notify(\'Risk link not available\', {style:\'error\',className:\'graynotify\'});">'
        //         + '                <span class="icon" style="background:url(\'/stratroom/images/buzzer-green-i.svg\') center center no-repeat;background-size:cover">R</span>'
        //         + '              </a>';
        // }

        // html += '            </div>'
        //     + '          </div>'
            + '        </div>'
+ ' <div class="org-action">'
+ '   <div class="action-list">'
// + '     <a target="_blank" href="scorecard.html">'
// + '       <span class="icon">S</span>'
// + '     </a>'
// + '     <a target="_blank" href="initiatives-projects.html">'
// + '       <span class="icon">I</span>'
// + '     </a>'
// + '     <a target="_blank" href="kpi.html">'
// + '       <span class="icon">K</span>'
// + '     </a>'
// + '     <a target="_blank" href="risk.html">'
// + '       <span class="icon">R</span>'
// + '     </a>'
// + '   </div>'

 // Scorecard link
        if (node.scoreCardLandingUrl && node.scoreCardLandingUrl !== "") {
            html += '              <a target="_blank" href="' + node.scoreCardLandingUrl + '">'
                + '                <span class="icon" style="background:url(\'/stratroom/images/buzzer-green-i.svg\') center center no-repeat;background-size:cover; color: white; font-size: 14px; font-weight: 700;">S</span>'
                + '              </a>';
        } else {
            html += '              <a href="javascript:void(0);" onclick="$.notify(\'Scorecard link not available\', {style:\'error\',className:\'graynotify\'});">'
                + '                <span class="icon" style="background:url(\'/stratroom/images/buzzer-green-i.svg\') center center no-repeat;background-size:cover; color: white; font-size: 14px; font-weight: 700;">S</span>'
                + '              </a>';
        }

        // Initiative link
        if (node.initiativeLandingUrl && node.initiativeLandingUrl !== "") {
            html += '              <a target="_blank" href="' + node.initiativeLandingUrl + '">'
                + '                <span class="icon" style="background:url(\'/stratroom/images/buzzer-red-i.svg\') center center no-repeat;background-size:cover; color: white; font-size: 14px; font-weight: 700;">I</span>'
                + '              </a>';
        } else {
            html += '              <a href="javascript:void(0);" onclick="$.notify(\'Initiative link not available\', {style:\'error\',className:\'graynotify\'});">'
                + '                <span class="icon" style="background:url(\'/stratroom/images/buzzer-red-i.svg\') center center no-repeat;background-size:cover; color: white; font-size: 14px; font-weight: 700;">I</span>'
                + '              </a>';
        }

        // KPI link
        if (node.kpiLandingUrl && node.kpiLandingUrl !== "") {
            html += '              <a target="_blank" href="' + node.kpiLandingUrl + '">'
                + '                <span class="icon" style="background:url(\'/stratroom/images/buzzer-yellow-i.svg\') center center no-repeat;background-size:cover; color: white; font-size: 14px; font-weight: 700;">K</span>'
                + '              </a>';
        } else {
            html += '              <a href="javascript:void(0);" onclick="$.notify(\'KPI link not available\', {style:\'error\',className:\'graynotify\'});">'
                + '                <span class="icon" style="background:url(\'/stratroom/images/buzzer-yellow-i.svg\') center center no-repeat;background-size:cover; color: white; font-size: 14px; font-weight: 700;">K</span>'
                + '              </a>';
        }

        // Risk link
        if (node.riskLandingUrl && node.riskLandingUrl !== "") {
            html += '              <a target="_blank" href="' + node.riskLandingUrl + '">'
                + '                <span class="icon" style="background:url(\'/stratroom/images/buzzer-green-i.svg\') center center no-repeat;background-size:cover; color: white; font-size: 14px; font-weight: 700;">R</span>'
                + '              </a>';
        } else {
            html += '              <a href="javascript:void(0);" onclick="$.notify(\'Risk link not available\', {style:\'error\',className:\'graynotify\'});">'
                + '                <span class="icon" style="background:url(\'/stratroom/images/buzzer-green-i.svg\') center center no-repeat;background-size:cover; color: white; font-size: 14px; font-weight: 700;">R</span>'
                + '              </a>';
        }

        html += '            </div>'
            // + '          </div>'

+ '   <div class="list-unstyled action-list">'

+ '     <a data-toggle="modal" href="#add-org" data-target="#add-org"'
+ '        data-deptId="' + (node.deptId || '') + '">'
+ '       <span class="icon orgiz_add"'
+ '             data-bs-toggle="tooltip"'
+ '             data-bs-placement="bottom"'
+ '             data-bs-title="Add">'
+ '         <i data-lucide="plus" style="width:12px;height:12px;"></i>'
+ '       </span>'
+ '     </a>'

+ '     <a data-toggle="modal" href="#edit-org" data-target="#edit-org"'
+ '        data-deptId="' + (node.deptId || '') + '"'
+ '        data-nodeId="' + (node.id || '') + '"'
+ '        data-parentId="' + (node.deptParentId || '') + '">'
+ '       <span class="icon orgiz_edit"'
+ '             data-bs-toggle="tooltip"'
+ '             data-bs-placement="bottom"'
+ '             data-bs-title="Edit">'
+ '         <i data-lucide="pencil" style="width:12px;height:12px;"></i>'
+ '       </span>'
+ '     </a>'

+ '     <a href="#" class="delete-node-btn"'
+ '        data-node="' + encodeURIComponent(JSON.stringify(node)) + '"'
+ '        data-implementation-type="' + implementationtypemethod + '">'
+ '       <span class="icon"'
+ '             data-bs-toggle="tooltip"'
+ '             data-bs-placement="bottom"'
+ '             data-bs-title="Delete">'
+ '         <i data-lucide="trash-2" style="width:12px;height:12px;"></i>'
+ '       </span>'
+ '     </a>'

+ '   </div>'
+ ' </div>'

            + '      </div>'
            + '    </div>'
            + '  </div>';

        // Recursive children rendering
        if (node.children && node.children.length > 0) {
            html += '<ul class="children list-unstyled">';
            for (var i = 0; i < node.children.length; i++) {
                html += renderNode(node.children[i]);
            }
            html += '</ul>';
        }

        html += '</li>';
        return html;
    }














    // root wrapper
    var chartHTML = ''
        + '<div class="container-lg py-2">'
		+ '<div id="tree-view-container" class="org-tree-container">'
        + '<div class="card custom-card org-structure-card org-tree-container w-100">'
		+ '<div class="card-header">'
        + '<div class="c-header-left">'
        + '<h5 class="card-title me-auto">'
        + '<strong editable="true" contenteditable="true" onkeypress="return (this.innerText.length <= 36)">OrgStructure Tree View</strong>'
        + '</h5>'
        + '</div>'
        + '</div>'
        + '<div class="card-body">'
        + '      <div style="overflow: auto;">'
        + '        <ul class="list-unstyled tree">'
        + renderNode(data)
        + '        </ul>'
        + '      </div>'
        + '    </div>'
        + '  </div>'
        + '</div>'
		+ '<div id="grid-view-container" class="d-none">'
        + '<div class="card custom-card org-structure-card org-tree-container w-100">'
        + '<div class="card-header">'
        + '<div class="c-header-left">'
        + '<h5 class="card-title me-auto">'
        + '<strong editable="true" contenteditable="true" onkeypress="return (this.innerText.length <= 36)">Org Structure Grid View</strong>'
        + '</h5>'
        + '</div>'
        + '</div>'
       + '<div class="card-body p-3">'

    // Top Section (Left aligned Select)
        + '<div style="display:flex; justify-content:flex-end; margin-bottom:16px;">'
            + '<div style="width:300px;">'
                + '<select id="group_select" class="dept_select form-select form-select-sm" style="width:100%;">'
                    + '<option value="">Select Group</option>'
                + '</select>'
            + '</div>'
        + '</div>'



    // Cards Section (Below Select)
    + '<div class="treechart d-grid gap-3 org-chart-grid" '
        + 'style="grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));" '
        + 'id="org-grid">'
    + '</div>'

+ '</div>'

        + '</div>'
        +'</div>'
		+ '</div>';

    // Insert into DOM
    $('#chart-container').html(chartHTML);

    // delete node handler
    $(document).on('click', '.delete-node-btn', function (e) {
        e.preventDefault();
        currentDeleteNode = JSON.parse(decodeURIComponent($(this).data('node')));
        currentImplementationTypeMethod = $(this).data('implementation-type');
        $('#delete-modal').modal('show');
    });

    $(document).on('click', '.orgDeleteconfirm', function () {
        if (!currentDeleteNode) return;

        let url = "";
        if (implementationtypemethod == true) {
            url = "deleteDepartmentMapping/" + currentDeleteNode.deptId;
        } else {
            url = currentDeleteNode.deptId + "/removeEmployee";
        }

        $.ajax({
            type: "DELETE",
            url: url,
            contentType: "application/json; charset=utf-8",
            global: false,
            async: false,
            dataType: "json",
            success: function (data) {
                var sucmsg = (implementationtypemethod ? "Department has been removed successfully" : "Employee has been removed successfully");
                $.notify(sucmsg, { style: 'error', className: 'graynotify' });
                $('#delete-modal').modal('hide');
                location.reload();
            },
            error: function (xhr, status, error) {
                $.notify("Error deleting record: " + error, { style: 'error', className: 'graynotify' });
                $('#delete-modal').modal('hide');
            }
        });
    });

    // Initialize sortable tree
$(function () {
    console.log("sortable function triggered");

    function initSortable($ul) {
        if ($ul.data("ui-sortable")) {
            $ul.sortable("refresh");
            return;
        }
        $ul.sortable({
            items: "> li",
            connectWith: ".tree, .tree ul",
            handle: ".drag-point",
            placeholder: "placeholder",
            tolerance: "pointer",
            scroll: true,
            forcePlaceholderSize: true,
            start: function (e, ui) {
                ui.placeholder.height(ui.helper.outerHeight());
            },
		update: function (event, ui) {
			const draggedItem = ui.item;
			const originalParent = ui.item.data('original-parent'); 
			const newParentUl = draggedItem.parent();
			const newParentLi = newParentUl.closest("li");

			 draggedDeptId = draggedItem.data('deptid');
			 newParentDeptId = newParentLi.length ? newParentLi.data('deptid') : "ROOT";

			console.log("Drop event triggered via sortable 'update'");
			console.log("Dragged Dept ID:", draggedDeptId);
			console.log("New Parent Dept ID:", newParentDeptId);

			 $('#dragmap-modal').modal('show');

			// const confirmed = window.confirm(
			// 	`Dragged Node Dept ID: ${draggedDeptId}\nNew Parent Dept ID: ${newParentDeptId}\n\nDo you want to save this change?`
			// );

			// if (confirmed) {
			// 	// Show loading feedback
			// 	$.notify("Updating hierarchy...", {
			// 		style: 'info',
			// 		className: 'graynotify'
			// 	});

			// 	$.ajax({
			// 		url: `/stratroom/updateDepartmentParentId/${newParentDeptId}?deptParentId=${draggedDeptId}`,
			// 		method: "PUT",
			// 		contentType: "application/json",
			// 		success: function (response) {
			// 			console.log("API Success:", response);
			// 			$.notify("Department hierarchy updated successfully!", {
			// 				style: 'success',
			// 				className: 'graynotify'
			// 			});

			// 			// ✅ RELOAD ONLY AFTER SUCCESS
			// 			setTimeout(() => {
			// 				window.location.reload();
			// 			}, 1000); // slight delay for user to see success message
			// 		},
			// 		error: function (xhr, status, error) {
			// 			$.notify("Failed to update hierarchy: " + error, {
			// 				style: 'error',
			// 				className: 'graynotify'
			// 			});

			// 			// ❌ Revert move on error — DO NOT reload
			// 			revertMove(draggedItem, originalParent);
			// 		}
			// 	});
			// } else {
			// 	// ❌ User canceled — revert move, no reload
			// 	revertMove(draggedItem, originalParent);
			// }
		},
            stop: function () {
                ensureChildULs();
                updateToggles();
                
            }
        }).disableSelection();
    }

    function ensureChildULs() {
        console.log("ensureChildULs triggered");
        $(".tree").find("li").each(function () {
            const $li = $(this);
            if ($li.children("ul.children").length == 0) {
                $li.append('<ul class="children list-unstyled"></ul>');
            }

            const $childUl = $li.children("ul.children");
            if ($childUl.children("li").length == 0) {
                $childUl.addClass("empty-ul");
            } else {
                $childUl.removeClass("empty-ul");
            }
        });

        $(".tree, .tree ul").each(function () {
            initSortable($(this));
        });

        $(".tree, .tree ul").sortable("refresh");
    }

    function updateToggles() {
        console.log("updateToggles triggered");
        $(".tree li").each(function () {
            const $li = $(this);
            const $childUl = $li.children("ul");
            const $toggle = $li.children(".toggle");

            if ($childUl.length && $childUl.children("li").length) {
                if ($toggle.length == 0) {
                    if ($li.hasClass("collapsed")) {
                        $li.prepend('<span class="toggle"><i class="fas fa-caret-up"></i></span>');
                    } else {
                        $li.prepend('<span class="toggle"><i class="fas fa-caret-down"></i></span>');
                    }
                }
            } else {
                $toggle.remove();
            }
        });

        $(".toggle").off("click").on("click", function () {
            const $li = $(this).closest("li");
            $li.toggleClass("collapsed");
            const $icon = $(this).find("i");
            if ($li.hasClass("collapsed")) {
                $icon.removeClass("fa-caret-down").addClass("fa-caret-up");
            } else {
                $icon.removeClass("fa-caret-up").addClass("fa-caret-down");
            }
        });
    }

    function getTreeJSON($ul) {
        console.log("getTreeJSON triggered");
        const out = [];
        $ul.children("li").each(function () {
            const $li = $(this);
            const text = $li.children("div").text().trim();
            const node = { text, children: [] };
            const $child = $li.children("ul.children");
            if ($child.length && $child.children("li").length) {
                node.children = getTreeJSON($child);
            }
            out.push(node);
        });
        return out;
    }

    // Initialize
    ensureChildULs();
    updateToggles();

    $(".export").on("click", function () {
        alert(JSON.stringify(getTreeJSON($(".tree")), null, 2));
    });
});
}


function revertMove($item, originalParent) {
    console.log("Reverting move...");
    if (originalParent) {
        $item.appendTo($(originalParent));
    } else {
        $item.appendTo($(".tree"));
    }
    ensureChildULs();
    updateToggles();
    $.notify("Move canceled. Hierarchy restored.", {
        style: 'info',
        className: 'graynotify'
    });
}


// Handle Save button click in modal
$(document).on('click', '.dragMapconfirm', function () {
   

  

    $.ajax({
        url: "/stratroom/updateDepartmentParentId/" + draggedDeptId + "?deptParentId=" + newParentDeptId,
        method: "PUT",
        contentType: "application/json",
        success: function (response) {
            console.log("API Success:", response);
            $.notify("Department mapping updated successfully!", {
                style: 'success',
                className: 'graynotify'
            });
            $('#dragmap-modal').modal('hide');
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        },
        error: function (xhr, status, error) {
            console.error("API Error:", error);
            $.notify("Failed to update : " + (xhr.responseJSON?.message || error), {
                style: 'error',
                className: 'graynotify'
            });
            $('#dragmap-modal').modal('hide');
            window.location.reload();
        },
        
    });
});


	

		//function


// Language workflow
const page_orgstructure_en = {

    "page": {
        "orgstructure": {
            "title": " Org Structure",
            "create_orgstructure": "Create Org Structure",
            "edit_orgstructure": "Edit Org Structure",
            "delete_confirmation": "Do you really want to delete?",
            "file_upload": "File Upload",
            "orgstructure_list": "Org Structure List",
			"save": "Save",
            "cancel": "Cancel",
			"delete": "Delete",
			"previous": "Previous",
			"next": "Next",
			"done": "Done",
            "orgstructure_list_items": {
                "name": "Name",
                "department": "Department"
            },
            "form_items": {
                "attachment": "Attachment",
                "department": "Department",
                "department_id": "Department ID",
                "owner": "Owner",
                "email": "Email",
                "members": "Members",
                "scorecard": "Scorecard",
                "initiative": "Initiative",
                "kpi": "KPI",
                "risk": "Risk",
                 "upload": "Upload",
                "validation": "Validation",
                "import": "Import",
                "import_category": "Import Category",
                "upload_file": "Upload File",
                "choose_file": "Choose a file or drag it here.",
                "supported_file_types": "Supported file type (jpeg,pdf,pptx,xlsx,docx)",
                "file_size_limit": "File size limit 10MB",
                "no_file_chosen": "No file chosen",
                "search": "Search",
                "row": "Row",
                "status": "Status",
                "message": "Message",
                "error": "Error"
            },
            "organisation_tracker": "Organisation Tracker",
            "organisation_tracker_list": {
                "ceo": "CEO",
                "zimra": "ZIMRA",
                "customer_services": "Customer Services",
                "marketing": "Marketing",
                "operations": "Operations",
                "project_services": "Project Services",
                "Product": "Product",
                "compliance": "Compliance",
                "india": "India",
                "kenya": "Kenya",
                "south_africa": "South Africa"
            },
            "organisation_tracker_items": {
                "parent": "Parent",
                "owner": "Owner",
                "department": "Department",
                "email": "Email",
                "pages": "Pages",
                "from_date": "From Date",
                "to_date": "To Date"
            }

        }
    }
}

const page_orgstructure_am = {

    "page": {
        "orgstructure": {
            "title": "የድርጅት መዋቅር",
            "create_orgstructure": "የድርጅት መዋቅር ፍጠር",
            "edit_orgstructure": "የድርጅት መዋቅር አርትዕ",
            "delete_confirmation": "በእውነት መሰረዝ ትፈልጋለህ?",
            "file_upload": "ፋይል አስገባ",
            "orgstructure_list": "የድርጅት መዋቅር ዝርዝር",
			"save": "አስቀምጥ",
            "cancel": "ይቅር",
			"delete": "ሰርዝ",
			"previous": "ያለፈው",
			"next": "ቀጣይ",
			"done": "ተጠናቀቀ",
            "orgstructure_list_items": {
                "name": "ስም",
                "department": "ዳርቻ / ክፍል"
            },
            "form_items": {
                "attachment": "አባሪ ፋይል",
                "department": "ዳርቻ / ክፍል",
                "department_id": "የክፍል መለያ",
                "owner": "ባለቤት",
                "email": "ኢሜይል",
                "members": "አባላት",
                "scorecard": "የአፈፃፀም ካርድ",
                "initiative": "እቅፍ",
                "kpi": "ኪፒአይ (ዋና ውጤት መለኪያ)",
                "risk": "አደጋ",
                "upload": "አስገባ",
                "validation": "ማረጋገጫ",
                "import": "አስመጣ",
                "import_category": "የአስመጣ ምድብ",
                "upload_file": "ፋይል አስገባ",
                "choose_file": "ፋይል ይምረጡ ወይም እዚህ ይጎትቱት።",
                "supported_file_types": "የሚደገፉ ፋይል አይነቶች (jpeg, pdf, pptx, xlsx, docx)",
                "file_size_limit": "የፋይል መጠን ገደብ 10MB",
                "no_file_chosen": "ፋይል አልተመረጠም",
                "search": "ፈልግ",
                "row": "ረድፍ",
                "status": "ሁኔታ",
                "message": "መልእክት",
                "error": "ስህተት"
            },
            "organisation_tracker": "የድርጅት መከታተያ",
            "organisation_tracker_list": {
                "ceo": "ሲኢኦ",
                "zimra": "ዚምራ",
                "customer_services": "የደንበኞች አገልግሎቶች",
                "marketing": "ገበያ ማስታወቂያ",
                "operations": "ክዋኔዎች",
                "project_services": "የፕሮጀክት አገልግሎቶች",
                "Product": "ምርት",
                "compliance": "ተግባራዊነት",
                "india": "ህንድ",
                "kenya": "ኬንያ",
                "south_africa": "ደቡብ አፍሪካ"
            },
            "organisation_tracker_items": {
                "parent": "ወላጅ",
                "owner": "ባለቤት",
                "department": "ዳርቻ / ክፍል",
                "email": "ኢሜይል",
                "pages": "ገጾች",
                "from_date": "ከቀን",
                "to_date": "እስከ ቀን"
            }

        }
    }
}



const page_orgstructure_ar = {
    "page": {
        "orgstructure": {
            "title": "هيكل المنظمة",
            "create_orgstructure": "إنشاء هيكل المنظمة",
            "edit_orgstructure": "تعديل هيكل المنظمة",
            "delete_confirmation": "هل تريد الحذف فعلاً؟",
            "file_upload": "رفع ملف",
            "orgstructure_list": "قائمة هيكل المنظمة",
			"save": "حفظ",
            "cancel": "إلغاء",
			"delete": "حذف",
			"previous": "السابق",
			"next": "التالي",
			"done": "تم",
            "orgstructure_list_items": {
                "name": "الاسم",
                "department": "القسم"
            },
            "form_items": {
                "attachment": "مرفق",
                "department": "القسم",
                "department_id": "معرف القسم",
                "owner": "المالك",
                "email": "البريد الإلكتروني",
                "members": "الأعضاء",
                "scorecard": "بطاقة الأداء",
                "initiative": "مبادرة",
                "kpi": "مؤشر الأداء الرئيسي",
                "risk": "مخاطر",
                "upload": "رفع",
                "validation": "التحقق",
                "import": "استيراد",
                "import_category": "فئة الاستيراد",
                "upload_file": "رفع ملف",
                "choose_file": "اختر ملفًا أو اسحب هنا.",
                "supported_file_types": "أنواع الملفات المدعومة (jpeg,pdf,pptx,xlsx,docx)",
                "file_size_limit": "حد حجم الملف 10MB",
                "no_file_chosen": "لم يتم اختيار ملف",
                "search": "بحث",
                "row": "صف",
                "status": "حالة",
                "message": "رسالة",
                "error": "خطأ"
            },
            "organisation_tracker": "متتبع المنظمة",
            "organisation_tracker_list": {
                "ceo": "الرئيس التنفيذي",
                "zimra": "زيمرا",
                "customer_services": "خدمات العملاء",
                "marketing": "التسويق",
                "operations": "العمليات",
                "project_services": "خدمات المشاريع",
                "Product": "المنتج",
                "compliance": "الامتثال",
                "india": "الهند",
                "kenya": "كينيا",
                "south_africa": "جنوب أفريقيا"
            },
            "organisation_tracker_items": {
                "parent": "الأصل",
                "owner": "المالك",
                "department": "القسم",
                "email": "البريد الإلكتروني",
                "pages": "الصفحات",
                "from_date": "من تاريخ",
                "to_date": "إلى تاريخ"
            }
        }
    }
}


// Helper to get nested property
function getNestedValue(obj, path) {
  return path.split('.').reduce((o, key) => (o && o[key] !== undefined) ? o[key] : null, obj);
}

// Load language for all elements with data-translate
function loadLanguage(lang) {
  let translation;

  if (lang == 'ar') {
    translation = page_orgstructure_ar;
  } else if (lang == 'am') { 
	translation = page_orgstructure_am;
  }else {
    translation = page_orgstructure_en;
  }

  document.querySelectorAll('[data-translate]').forEach(el => {
    const path = el.getAttribute('data-translate');
    const value = getNestedValue(translation, path);
    if (value !== null) {
      el.textContent = value;
    }
  });

  console.log(lang, "language loaded");
}




			function handleDepartmentClick(deptName, deptIdData) {
				const storedLanguage = localStorage.getItem('selectedLang') || 'en';
				console.log("storedLanguage", storedLanguage);
				if(storedLanguage == "en"){
					parentHeader = "Parent";
					ownerHeader = "Owner";
					deptHeader = "Department";
					emailHeader = "Email";
					pagesHeader = "Pages";
					fromDateHeader = "From Date";
					toDateHeader = "To Date";
				}else if(storedLanguage == "ar"){
					parentHeader =  "الأصل";
					ownerHeader = "المالك";
					deptHeader = "القسم";
					emailHeader = "البريد الإلكتروني";
					pagesHeader = "الصفحات";
					fromDateHeader = "من تاريخ";
					toDateHeader = "إلى تاريخ";
				} else if (storedLanguage == "am") {
					parentHeader = "ወላጅ";            
					ownerHeader = "ባለቤት";           
					deptHeader = "ዲፓርትመንት";        
					emailHeader = "ኢሜይል";           
					pagesHeader = "ገፆች";            
					fromDateHeader = "ከቀን";          
					toDateHeader = "እስከ ቀን";         
				}
				$("#org-tracker-tab-section-data").empty();
				console.log("Department clicked:", deptName);
				var daterange2 = $("#datePeriod").val();
				$.ajax({
					url: "/stratroom/orgTrackList?flagType=" + deptName + "&datePeriod=" + daterange2 + "&id=" + deptIdData,
					type: "GET",
					success: function (data) {
						console.log(data, "suceessssss");
					var html = '<div class="control-panel-content">';
    html += '<div class="mb-2 section-title">';
    html += '<h5>CEO</h5>';
    html += '</div>';
    html += '<div class="org-structure-table">';
    html += '<table class="table table-bordered organisationTracker" style="width: 100%;">';
    html += '<thead class="text-center">';
    html += '<tr>';
    html += '<th >'+parentHeader+'</th>';
    html += '<th >'+ownerHeader+'</th>';
    html += '<th data-translate="page.orgstructure.organisation_tracker_items.department">'+deptHeader+'</th>';
    html += '<th data-translate="page.orgstructure.organisation_tracker_items.email">'+emailHeader+'</th>';
    html += '<th data-translate="page.orgstructure.organisation_tracker_items.pages">'+pagesHeader+'</th>';
    html += '<th data-translate="page.orgstructure.organisation_tracker_items.from_date">'+fromDateHeader+'</th>';
    html += '<th data-translate="page.orgstructure.organisation_tracker_items.to_date">'+toDateHeader+'</th>';
    html += '</tr>';
    html += '</thead>';
    html += '<tbody>';

    // Loop through the data and create a row for each item
    for (var i = 0; i < data.length; i++) {
        var item = data[i];
        html += '<tr>';
        html += '<td>' + (item.parentName || '') + '</td>';
        html += '<td>' + (item.ownerName || '') + '</td>';
        html += '<td>' + (item.designation || '') + '</td>';
        html += '<td>' + (item.email || '') + '</td>';
        html += '<td>' + (item.pages || '') + '</td>';
        html += '<td>' + (item.fromDate || '') + '</td>';
        html += '<td>' + (item.toDate || '') + '</td>';
        html += '</tr>';
    }

    html += '</tbody>';
    html += '</table>';
    html += '</div>';
    html += '</div>';


    $("#org-tracker-tab-section-data").append(html);

					}
				});
			}



			/////search work
			// var originalTreeHTML = "";

			// function storeOriginalTree() {
			// 	if (!originalTreeHTML) {
			// 		originalTreeHTML = $(".tree").html();
			// 	}
			// }

			// storeOriginalTree();



function searchOrgTree() {
    var searchText = $("#orgSearch").val().toLowerCase().trim();

    // reset
    $(".tree li").removeClass("highlight-node");
    $(".org-label").removeClass("highlight-label");

    // restore original tree
    if (searchText === "") {
        if (originalTreeHTML) {
            $(".tree").html(originalTreeHTML);
            ensureChildULs();
            updateToggles();
        }
        return;
    }

    let found = false;

    $(".tree li").each(function () {
        const $li = $(this);

        const $labels = $li.find(".org-label");

        // Order matters 👇
        const checks = [
            { type: "name",        el: $labels.eq(0) }, // Name
            { type: "department",  el: $labels.eq(1) }, // Department
            { type: "designation", el: $labels.eq(2) }, // Designation
            { type: "location",    el: $labels.eq(3) }  // Location
        ];

        for (let i = 0; i < checks.length; i++) {
            const text = checks[i].el.text().toLowerCase();

            if (text.includes(searchText)) {
                // highlight node
                $li.addClass("highlight-node");

                // highlight matched label only
                checks[i].el.addClass("highlight-label");

                // move node to top
                $li.prependTo($(".tree"));

                // expand parents
                $li.parents("li").removeClass("collapsed");

                found = true;
                return false; // stop searching after first match
            }
        }
    });

    if (!found) {
        $.notify("No matching record found", {
            style: "error",
            className: "graynotify"
        });
    }
}




function isTreeView() {
				return !$("#tree-view-container").hasClass("d-none");
			}

			function isGridView() {
				return !$("#grid-view-container").hasClass("d-none");
			}


			function searchOrgGrid() {
    var searchText = $("#orgSearch").val().toLowerCase().trim();

    const $cards = $("#org-grid .org-card");

    // reset
    $cards.removeClass("highlight-node").show();
    $cards.find(".org-label, .fw-semibold").removeClass("highlight-label");

    if (searchText === "") {
        $cards.show();
        return;
    }

    let found = false;

    $cards.each(function () {
        const $card = $(this);

        const checks = [
            $card.find(".fw-semibold"),          // Name
            $card.find(".org-label").eq(0),      // Designation
            $card.find(".org-label").eq(1),      // Department
            $card.find(".org-label").eq(2)       // Location
        ];

        let matched = false;

        checks.forEach($el => {
            if ($el.length && $el.text().toLowerCase().includes(searchText)) {
                matched = true;
                $el.addClass("highlight-label");
            }
        });

        if (matched) {
            $card.addClass("highlight-node").show();
            found = true;
        } else {
            $card.hide(); // 🔥 grid filtering
        }
    });

    if (!found) {
        $.notify("No matching record found", {
            style: "error",
            className: "graynotify"
        });
    }
}



function handleOrgSearch() {
    if (isTreeView()) {
        searchOrgTree();
    } else if (isGridView()) {
        searchOrgGrid();
    }
}

$("#orgSearch").on("input", handleOrgSearch);





//Old Code 

// '<div class="org-section">' +
// 			'<div class="drag-point">'+ '<i class="fas fas fa-bars"></i>' +'</div>' +
// 			  '<div class="org-content">' +
// 				'<div class="image" style="margin-top: 0.8rem; width: 26px; height: 26px;">' +
// 				  profileImage +
// 				'</div>' +
// 				'<div class="content">' +
// 				  '<p class="org-label"><strong>Name</strong> - ' + (node.ownerName || 'N/A') + '</p>' +
// 				  '<div class="org-label"><strong>Department</strong><br>' + node.deptName + '</div>' +
				
// 				'</div>' +
// 			  '</div>' +
// 			  '<div class="org-action">' +
			  
// 				'<ul class="list-unstyled action-list">' +
// 				  '<li>' +
// 					'<a data-toggle="modal" href="#add-org" data-target="#add-org" data-deptId="' + (node.deptId || '') + '">' +
// 					  '<span class="icon orgiz_add" data-toggle="tooltip" data-placement="bottom" data-bs-title="Add">' +
// 						'<i class="fas fa-plus title_edit_icon"></i>' +
// 					  '</span>' +
// 					'</a>' +
// 				  '</li>' +
// 				  '<li>' +
// 					'<a data-toggle="modal" href="#edit-org" data-target="#edit-org" data-deptId="' + (node.deptId || '') + '" data-nodeId="' + (node.id || '') + '" data-parentId="' + (node.deptParentId || '') + '">' +
// 					  '<span class="icon orgiz_edit" data-toggle="tooltip" data-placement="bottom" data-title="edit">' +
// 						'<img src="images/edit-i.svg" width="8" height="8" />' +
// 					  '</span>' +
// 					'</a>' +
// 				  '</li>' +
// 				 '<li>' +
// 					'<a href="#" class="delete-node-btn" data-node="' + encodeURIComponent(JSON.stringify(node)) + '" data-implementation-type="' + implementationtypemethod + '">' +
// 						'<span class="icon" data-toggle="tooltip" data-bs-placement="bottom" data-bs-title="delete">' +
// 						'<img src="images/delete-i.svg" width="12" height="12" />' +
// 						'</span>' +
// 					'</a>' +
// 				  '</li>' +
// 				'</ul>' +
				
// 			  '</div>' +




function collectEmployeesWithDept(node, employeeList = []) {

    if (node.employee) {
        employeeList.push({
            id: node.employee.emp_id,
            name: node.employee.first_name,
            email: node.employee.email_address,
            designation: node.employee.designation,
            department: node.deptName,
            location: node.employee.location
        });
    }

    if (node.children && node.children.length > 0) {
        node.children.forEach(child => {
            collectEmployeesWithDept(child, employeeList);
        });
    }

    return employeeList;
}





// new design card renderer
/**
 * Org Structure - Group Management Logic
 * Handles checking/unchecking users, rendering avatars, and saving groups.
 */

// Mock Data for Users (can be replaced with API fetch later)
var availableUsers = [
];

// Helper for Toast Notifications
function showGroupToast(message, type = 'info') {
    // Check if a toast container exists, if not create one
    if ($('.toast-container').length === 0) {
        $('body').append('<div class="toast-container position-fixed bottom-0 end-0 p-3"></div>');
    }

    const toastHtml = `
      <div class="toast align-items-center text-bg-${type} border-0" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
          <div class="toast-body">
            ${message}
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      </div>
    `;

    const $toast = $(toastHtml);
    $('.toast-container').append($toast);
    const toast = new bootstrap.Toast($toast[0]);
    toast.show();

    // Auto remove
    $toast.on('hidden.bs.toast', function () {
        $(this).remove();
    });
}

// State
let savedGroups =  []
// [
//     {
//         id: 101,
//         name: "Executive Team",
//         description: "Top-level management and decision makers.",
//         owner: [{ id: 1, name: "Kim Karlos", img: "assets/images/user/user9.jpg" }],
//         members: [
//             { id: 2, name: "John Doe", img: "assets/images/user/user9.jpg" },
//             { id: 3, name: "Sarah Smith", img: "assets/images/user/user9.jpg" }
//         ]
//     },
//     {
//         id: 102,
//         name: "Product Development",
//         description: "Responsible for new product features and roadmap.",
//         owner: [{ id: 4, name: "Michael Zen", img: "assets/images/user/user9.jpg" }],
//         members: [
//             { id: 5, name: "Emma Watson", img: "assets/images/user/user9.jpg" },
//             { id: 6, name: "Richard Roe", img: "assets/images/user/user9.jpg" },
//             { id: 7, name: "Emily Clark", img: "assets/images/user/user9.jpg" }
//         ]
//     },
//     {
//         id: 103,
//         name: "Marketing Squad",
//         description: "Brand awareness and campaign management.",
//         owner: [{ id: 8, name: "David Miller", img: "assets/images/user/user9.jpg" }],
//         members: [
//             { id: 1, name: "Kim Karlos", img: "assets/images/user/user9.jpg" },
//             { id: 3, name: "Sarah Smith", img: "assets/images/user/user9.jpg" }
//         ]
//     },
//     {
//         id: 104,
//         name: "Sales Force",
//         description: "Global sales operations and revenue tracking.",
//         owner: [{ id: 2, name: "John Doe", img: "assets/images/user/user9.jpg" }],
//         members: [
//             { id: 4, name: "Michael Zen", img: "assets/images/user/user9.jpg" },
//             { id: 6, name: "Richard Roe", img: "assets/images/user/user9.jpg" },
//             { id: 8, name: "David Miller", img: "assets/images/user/user9.jpg" },
//             { id: 5, name: "Emma Watson", img: "assets/images/user/user9.jpg" }
//         ]
//     },
//     {
//         id: 105,
//         name: "Support Team",
//         description: "Customer success and technical support.",
//         owner: [{ id: 3, name: "Sarah Smith", img: "assets/images/user/user9.jpg" }],
//         members: [
//             { id: 7, name: "Emily Clark", img: "assets/images/user/user9.jpg" },
//             { id: 1, name: "Kim Karlos", img: "assets/images/user/user9.jpg" }
//         ]
//     }
// ];
let currentEditingGroupIndex = null;
let selectionContext = null; // 'owner' or 'member'
let tempOwner = [];
let tempMembers = [];
let viewUsers = []; // For view-only mode

$(document).ready(function () {
    // 1. Initialize Event Listeners
    initGroupEventListeners();
    
    // 2. Initial Render of Groups
    renderGroupList();
});

function initGroupEventListeners() {
    // Open 'Add Group' Modal - Reset State
    $('a[href="#add-group"]').on('click', function () {
        resetAddGroupModal();
    });

    // Open 'Manage Groups' and switch to Manage Tab
    $(document).on('click', '#btn-manage-groups', function() {
        $('#add-group').modal('show');
        const triggerEl = document.querySelector('#manage-tab');
        bootstrap.Tab.getInstance(triggerEl) ? bootstrap.Tab.getInstance(triggerEl).show() : new bootstrap.Tab(triggerEl).show();
        renderGroupList();
    });

    // Listen for tab switch to Manage Groups
    $('button[data-bs-toggle="tab"][data-bs-target="#manage-group-pane"]').on('shown.bs.tab', function (e) {
        renderGroupList();
    });

    // Save Group Button
    $('#btn-save-group').on('click', function () {
        saveGroup();
    });

    // Add More Group Button
    $(document).on('click', '#btn-add-more-group', function() {
        resetAddGroupModal();
    });

    // Open User Selection Modal (Owner)
    $('#btn-select-owner').on('click', function () {
        openUserSelectionModal('owner');
    });

    // Open User Selection Modal (Members)
    $('#btn-select-members').on('click', function () {
        openUserSelectionModal('members');
    });

    // Save Users Selection
    $('#btn-save-users').on('click', function () {
        confirmUserSelection();
    });

    // Search in User Selection
    $('#user-search-input').on('input', function() {
        const query = $(this).val().toLowerCase();
        renderUserSelectionList(query);
    });
}

function resetAddGroupModal() {
    currentEditingGroupIndex = null;
    $('#group-name').val('');
    $('#group-desc').val('');
    tempOwner = [];
    tempMembers = [];
    renderAvatars('owner-avatars', []);
    renderAvatars('member-avatars', []);
    // Reset to Create Tab
    const triggerEl = document.querySelector('#create-tab');
    bootstrap.Tab.getInstance(triggerEl) ? bootstrap.Tab.getInstance(triggerEl).show() : new bootstrap.Tab(triggerEl).show();
}

// --- User Selection Logic ---

function openUserSelectionModal(context) {
    selectionContext = context;
    $('#user-search-input').val('');
    
    // Reset Modal State (in case it was view only)
    $('#btn-save-users').show();
    
    renderUserSelectionList();
    $('#attendess-list').modal('show');
    $('#attendess-list .modal-title').text(context === 'owner' ? 'Select Owner' : 'Select Members');
}


function getUserAvatarHtml(user) {
    console.log(user, "userData");
    if (user.profileImage && user.profileImage.trim() !== "") {
        return `
            <div class="user-avatargrid rounded-circle overflow-hidden">
                <img src="${user.profileImage}" 
                     width="32" 
                     height="32" 
                     loading="lazy"
                     alt="profile" />
            </div>
        `;
    }

    // If no image → generate initials
    let name = user.name || user.ownerName || '';
    name = name.trim();
    console.log(name, "names");
    let initials = 'NA';

    if (name.length > 0) {
        initials = name.substring(0, 2).toUpperCase();
    }

    return `
        <div class="user-avatargrid text-avatargrid rounded-circle d-flex align-items-center justify-content-center">
            <span>${initials}</span>
        </div>
    `;
}


function getUserAvatarHtmlownermembers(user) {

    console.log(user, "ownerUsers");

    // If accidentally array passed → take first element
    if (Array.isArray(user)) {
        user = user[0];
    }

    if (!user) return '';

    if (user.profileImage && user.profileImage.trim() !== "") {
        return `
            <div class="user-avatar rounded-circle overflow-hidden">
                <img src="${user.profileImage}" 
                     width="32" 
                     height="32" 
                     loading="lazy"
                     alt="profile" />
            </div>
        `;
    }

    let name = user.name ? user.name.trim() : '';
    let initials = name.length > 0 ? name.substring(0, 2).toUpperCase() : 'NA';

    return `
        <div class="user-avatar text-avatar rounded-circle d-flex align-items-center justify-content-center">
            <span data-userid="${user.id}">${initials}</span>
        </div>
    `;
}



// function renderUserSelectionList(searchQuery = '') {
//     const listContainer = $('#user-selection-list');
//     listContainer.empty();

//     let currentSelected = [];
//     if (selectionContext === 'owner') currentSelected = tempOwner;
//     else if (selectionContext === 'members') currentSelected = tempMembers;
//     else if (selectionContext === 'view') {
//         // In view mode, we expect tempOwner or tempMembers to be set by the caller
//         // We will default to empty if not set, but handleMoreClick sets them.
//         // Actually, we should probably pass the data or store it in a 'viewData' var?
//         // Reuse temp vars is risky if we are editing?
//         // Wait, handleMoreClick in "view mode" is for "Manage Groups".
//         // Manage Groups is separate from Create Groups now in terms of UI, but data is shared?
//         // If we are just viewing, we shouldn't touch tempOwner/Members of the "Create" form.
//         // Let's use a separate logic for "View".
//         // But renderUserSelectionList relies on *some* list to mark checked.
//         // Let's rely on a global 'viewUsers' for view mode.
//     }

//     // Correct approach:
//     // If view mode, we need to know WHICH users to show as checked.
//     // handleMoreClick will populate a specific list.
//     const selectedIds = (selectionContext === 'view' ? viewUsers : (selectionContext == 'owner' ? tempOwner : tempMembers)).map(u => u.id);

//     availableUsers.forEach(user => {
//         console.log(user, "user");
//         if (searchQuery && !user.name.toLowerCase().includes(searchQuery)) return;

//         console.log(tempMembers, tempOwner, selectedIds, "tempdata");

//         const isChecked = selectedIds.includes(user.id) ? 'checked' : '';

//         console.log(isChecked, "ischecked");
        
//         // If selecting owner, prevent selecting multiple (radio behavior) - though UI is checklist, we enforce single logic
//         // But for better UX, let's keep it checkbox and handle single select logic in "save" or allow radio for owner.
//         // For consistency with existing HTML structure, we keep checkboxes.
        
//         const disabledAttr = selectionContext === 'view' ? 'disabled' : '';

//         const itemHtml = `
//             <div class="list-group-item attendee">
//               <div class="form-check cusom-check form-check-reverse">
//                 <input class="form-check-input user-checkbox" type="checkbox" value="${user.id}" id="user-${user.id}" ${isChecked} ${disabledAttr}>
//                 <label class="form-check-label d-flex align-items-center" for="user-${user.id}" style="width: 100%; cursor: pointer;">
//                   <span class="image me-2">
//                     ${getUserAvatarHtml(user)}
//                   </span>
//                   <span class="name">${user.name}</span>
//                 </label>
//               </div>
//             </div>
//         `;
//         listContainer.append(itemHtml);
//     });
// }

function renderUserSelectionList(searchQuery = '') {

    const listContainer = $('#user-selection-list');
    listContainer.empty();

    let selectedUsers = [];

    if (selectionContext == 'view') {
        selectedUsers = viewUsers || [];
    } else if (selectionContext == 'owner') {
        selectedUsers = tempOwner || [];
    } else {
        selectedUsers = tempMembers || [];
    }

    // 🔥 Normalize all selected IDs to string
    const selectedIds = selectedUsers.map(u => String(u.id));

    availableUsers.forEach(user => {

        if (searchQuery && !user.name.toLowerCase().includes(searchQuery.toLowerCase()))
            return;

        // 🔥 Convert user.id also to string
        const userIdStr = String(user.id);

        const isChecked = selectedIds.includes(userIdStr) ? 'checked' : '';

        const disabledAttr = selectionContext === 'view' ? 'disabled' : '';

        const itemHtml = `
            <div class="list-group-item attendee">
              <div class="form-check cusom-check form-check-reverse">
                <input class="form-check-input user-checkbox"
                       type="checkbox"
                       value="${userIdStr}"
                       id="user-${userIdStr}"
                       ${isChecked}
                       ${disabledAttr}>
                <label class="form-check-label d-flex align-items-center"
                       for="user-${userIdStr}"
                       style="width: 100%; cursor: pointer;">
                  <span class="image me-2">
                    ${getUserAvatarHtml(user)}
                  </span>
                  <span class="name">${user.name}</span>
                </label>
              </div>
            </div>
        `;

        listContainer.append(itemHtml);
    });
}




function confirmUserSelection() {
    const selectedIds = [];
    $('#user-selection-list .user-checkbox:checked').each(function() {
        selectedIds.push(parseInt($(this).val()));
    });

    const selectedUsers = availableUsers.filter(u => selectedIds.includes(u.id));

    if (selectionContext === 'owner') {
        // Allow multiple owners now
        if (selectedUsers.length === 0) {
           // Optional: allow clearing owner? Or warn?
           // For now, let's allow it but maybe warn if trying to save group without owner later.
        }
        tempOwner = selectedUsers;
        renderAvatars('owner-avatars', tempOwner);
    } else {
        tempMembers = selectedUsers;
        renderAvatars('member-avatars', tempMembers);
    }

    $('#attendess-list').modal('hide');
}

// --- Avatar Rendering ---

function renderAvatars(containerId, users) {
    console.log(containerId, users, "containerusersid");

    const container = $(`#${containerId}`);
    container.empty();

    const displayCount = 3;
    const visibleUsers = users?.slice(0, displayCount);
    const remainingCount = users?.length - displayCount || 0;

    visibleUsers.forEach(user => {

        const avatarHtml = `
            <li class="avatar avatar-xs pull-up"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="${user.name}">
                 ${getUserAvatarHtmlownermembers(user)} 
                 
            </li>
        `;

        container.append(avatarHtml);
    });

    if (remainingCount > 0) {

        const btnId = containerId === 'owner-avatars'
            ? 'btn-select-owner'
            : 'btn-select-members';

        container.append(`
            <li class="avatar avatar-xs"
                style="cursor: pointer;"
                onclick="$('#${btnId}').click()">
                <span class="avatar-initial rounded-circle"
                      data-bs-toggle="tooltip"
                      title="${remainingCount} more">
                      +${remainingCount}
                </span>
            </li>
        `);
    }

    const btnId = containerId === 'owner-avatars'
        ? 'btn-select-owner'
        : 'btn-select-members';

    container.append(`
        <li class="avatar avatar-xs"
            id="${btnId}"
            style="cursor: pointer;">
            <span class="avatar-initial rounded-circle bg-light text-primary">
                <i class="fas fa-plus"></i>
            </span>
        </li>
    `);

    if (containerId === 'owner-avatars') {
        $('#btn-select-owner')
            .off('click')
            .on('click', function () {
                openUserSelectionModal('owner');
            });
    } else {
        $('#btn-select-members')
            .off('click')
            .on('click', function () {
                openUserSelectionModal('members');
            });
    }

    var tooltipTriggerList = [].slice.call(
        document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );

    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}


// --- Group Management ---

function saveGroup() {
    const name = $('#group-name').val();
    const desc = $('#group-desc').val();

    if (!name) {
        alert("Please enter a group name.");
        return;
    }

    const groupData = {
        id: currentEditingGroupIndex !== null ? savedGroups[currentEditingGroupIndex].id : Date.now(),
        name: name,
        description: desc,
        owner: tempOwner,
        members: tempMembers
    };

    if (currentEditingGroupIndex !== null) {
        savedGroups[currentEditingGroupIndex] = groupData;
        showGroupToast('Group updated successfully', 'success');
    } else {
        savedGroups.push(groupData);
        showGroupToast('Group created successfully', 'success');
    }

    // Switch to Manage Tab
    const triggerEl = document.querySelector('#manage-tab');
    bootstrap.Tab.getInstance(triggerEl) ? bootstrap.Tab.getInstance(triggerEl).show() : new bootstrap.Tab(triggerEl).show();
    renderGroupList(); // Refresh the list view

    // Clear form for next usage (optional, but good UX if they go back)
    // resetAddGroupModal(); // No, we want to see the list first. Reset when they click "Add More"
    currentEditingGroupIndex = null; // Clear editing state though
    $('#group-name').val('');
    $('#group-desc').val('');
    tempOwner = [];
    tempMembers = [];
    renderAvatars('owner-avatars', []);
    renderAvatars('member-avatars', []);
    $('.modal-title').text('Group Management');
}

function renderGroupList() {
    const container = $('#group-list-container');
    updateGroupSelectDropdown(); // Update the main page dropdown
    
    if (container.length === 0) return;
    
    container.empty();

    if (savedGroups.length === 0) {
        container.html('<div class="text-center text-muted p-3">No groups created yet.</div>');
        return;
    }

    savedGroups.forEach((group, index) => {
        console.log(group, index, "groupindex");
        // Helper to generate avatar HTML string
        const getAvatarHtml = (users, type, groupIndex) => {
            console.log(users, "users");
            if (!users || users.length === 0) return '<span class="text-muted small">None</span>';
            const displayCount = 3;
            let html = '<ul class="list-unstyled d-flex align-items-center avatar-group mb-0">';
            
            users?.slice(0, displayCount).forEach(u => {
                html += `
                    <li class="avatar avatar-xs pull-up" data-bs-toggle="tooltip" data-bs-placement="top" title="${u?.groupValue?.groupName ? u?.groupValue?.groupName : "NA"}">
                         ${getUserAvatarHtml(u)}
                    </li>
                `;
            });
            
            if (users.length > displayCount) {
                // Add click handler to open selection modal
                // We pass index and type to the handler
                html += `
                    <li class="avatar avatar-xs" style="cursor: pointer;" onclick="handleMoreClick(${groupIndex}, '${type}')">
                        <span class="avatar-initial rounded-circle" data-bs-toggle="tooltip" title="${users.length - displayCount} more">+${users.length - displayCount}</span>
                    </li>
                `;
            }
            html += '</ul>';
            return html;
        };

        const ownerAvatars = getAvatarHtml(group?.multipleOwerlist ? group?.multipleOwerlist : [], 'owner', index);
        const memberAvatars = getAvatarHtml(group?.multipleMemberlist ? group?.multipleMemberlist : [], 'members', index);
        
        const itemHtml = `
            <div class="card mb-2 border">
                <div class="card-body p-3 d-flex justify-content-between align-items-center">
                    <div>
                        <h6 class="mb-1 fw-bold">${group?.groupValue?.groupName || 'No Group'}</h6>
                        <small class="text-muted d-block mb-2">${group?.groupValue?.description || 'No description'}</small>
                        <div class="d-flex align-items-center gap-4">
                            <div class="d-flex align-items-center gap-2">
                                <small class="text-muted">Owners:</small>
                                ${ownerAvatars}
                            </div>
                            <div class="d-flex align-items-center gap-2">
                                <small class="text-muted">Members:</small>
                                ${memberAvatars}
                            </div>
                        </div>
                    </div>
                    <div class="dropdown">
                        <button class="btn btn-sm btn-icon btn-text-secondary rounded-pill" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i data-lucide="more-vertical" style="width: 16px; height: 16px;"></i>
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end">
                            <li><a class="dropdown-item edit-group-btn" href="javascript:void(0);" data-index="${index}"><i data-lucide="edit-2" class="me-2" style="width:14px;height:14px;"></i>Edit</a></li>                           
                            <li><a class="dropdown-item text-danger delete-group-btn" href="javascript:void(0);" data-index="${index}"><i data-lucide="trash-2" class="me-2" style="width:14px;height:14px;"></i>Delete</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
        container.append(itemHtml);
    });

    // Re-initialize tooltips for the new content
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    if (window.lucide) lucide.createIcons();

    // Edit Button Listener
    $('.edit-group-btn').on('click', function() {
        const index = $(this).data('index');

        console.log(index, "index");
        editGroup(index);
    });


    $('.delete-group-btn').on('click', function() {
        const index = $(this).data('index');
        console.log(index, "index");
        const getEditObjectData = savedGroups[index];

         $.ajax({
        url: `/stratroom/orgGroup/${getEditObjectData?.id}`,
        type: "DELETE",
        success: function (response) {
            console.log(response, "Group deleted successfully");
            window.location.reload();
        }
    });

    });
}

function editGroup(index) {

    const getEditObjectData = savedGroups[index];
    console.log(getEditObjectData?.id, "getEditObjectData");
    // currentEditingGroupIndex = index;
    // const group = savedGroups[index];

    $("#group-id").val(getEditObjectData?.id || '');
    $('#group-name').val(getEditObjectData?.groupValue?.groupName || '');
    $('#group-desc').val(getEditObjectData?.groupValue?.description || '');
        tempOwner = getEditObjectData?.multipleOwerlist || [];
        tempMembers = getEditObjectData?.multipleMemberlist || [];

    renderAvatars('owner-avatars', tempOwner);
    renderAvatars('member-avatars', tempMembers);


    // renderAvatars('owner-avatars', tempOwner);
    // renderAvatars('member-avatars', tempMembers);

    // // Switch to Create Tab
    const triggerEl = document.querySelector('#create-tab');
    bootstrap.Tab.getInstance(triggerEl) ? bootstrap.Tab.getInstance(triggerEl).show() : new bootstrap.Tab(triggerEl).show();
}

// Handler for clicking +N in the list
window.handleMoreClick = function(index, type) {
    const group = savedGroups[index];
    viewUsers = type === 'owner' ? group.owner : group.members;
    selectionContext = 'view';

    $('#user-search-input').val('');
    $('#btn-save-users').hide(); // Hide Select button
    
    renderUserSelectionList();
    $('#attendess-list').modal('show');
    $('#attendess-list .modal-title').text(type === 'owner' ? 'Owners (View Only)' : 'Members (View Only)');
};

// Update the #group-select dropdown on the main page
function updateGroupSelectDropdown() {
    const select = $('#group-select');
    if (select.length === 0) return;

    // Keep "All" option
    const allOption = '<option value="All">All</option>';
    let optionsHtml = allOption;

    savedGroups.forEach(group => {
        optionsHtml += `<option value="${group.name}">${group.name}</option>`;
    });

    select.html(optionsHtml);
}


//Groupsave get put apis 
function handleGroupSave() {

    let ownerIds = [];
    $('#owner-avatars .user-avatar span[data-userid]').each(function () {
        const id = $(this).data('userid');
        if (id) {
            ownerIds.push(id);
        }
    });

    let memberIds = [];
    $('#member-avatars .user-avatar span[data-userid]').each(function () {
        const id = $(this).data('userid');
        if (id) {
            memberIds.push(id);
        }
    });

    const payload = {
        "id": $("#group-id").val() || "",
        "owner": $("#userPrincipal").val().trim(),
        "createdBy": $("#userPrincipal").val().trim(),
        "groupValue": {
            "groupName": $("#group-name").val(),
            "description": $("#group-desc").val(),
            "multipleOwners": ownerIds.join(','),
            "multipleMembers": memberIds.join(',')
        }
    };

    console.log(payload, "payload");

    $.ajax({
        url: "/stratroom/orgGroup",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(payload),
        success: function (response) {
            console.log(response, "Group saved successfully");
            window.location.reload();
        },
        error: function (xhr, status, error) {
            console.error("Error saving group:", error);
            
        }
    });
}

// function getorgGroups() {
//     $.ajax({
//         url: "/stratroom/orgGroupList",
//         type: "GET",
//         success: function (response) {
//             savedGroups = response || [];
//             console.log(response, "Groups fetched successfully");   
//         },
//         error: function (xhr, status, error) {
//             console.error("Error fetching groups:", error);
//         }
//     });
// }

function getorgGroups() {
    $.ajax({
        url: "/stratroom/orgGroupList",
        type: "GET",
        success: function (response) {
            savedGroups = response || [];

            const gridHtml = renderNodeCard(rendercardData, "initially");
            $("#org-grid").html(gridHtml);
            // renderNodeCard(rendercardData, "initially");

            const $select = $("#group_select");
            $select.empty();
            $select.append('<option value="">Select Group</option>');

            savedGroups.forEach(function(group) {
                if (group.groupValue && group.groupValue.groupName) {
                    $select.append(
                        `<option value="${group.id}">
                            ${group.groupValue.groupName}
                        </option>`
                    );
                }
            });
        }, error: function (xhr, status, error) {
            savedGroups = [];
        console.error("Request failed:", status, error);

        $("#group_select").empty().append(
            '<option value="">Failed to load groups</option>'
        );

        $("#org-grid").html(
            '<div class="text-danger text-center p-3">Unable to load data. Please try again.</div>'
        );
    }
    });
}


// function renderNodeCard(node, depth = 0) {
//     console.log(node, "nodedddd");
//     let html = '';
// 	 var imageHtml = '';

// 	 if (node.profileImage && node.profileImage !== "") {
//             imageHtml = '<div class="image rounded-circle border text-center">'
//                 + '  <img src="' + node.profileImage + '" loading="lazy" width="26" height="26" alt="profile" />'
//                 + '</div>';
//         } else {
//             var initials = (node.ownerName ? node.ownerName.substring(0, 2).toUpperCase() : 'NA');
//             imageHtml = '<div class="image text-avatar rounded-circle border text-center" style="margin-top:0.4rem;width:26px;height:26px;">'
//                 + '  <span>' + initials + '</span>'
//                 + '</div>';
//         }

//     const safe = (v) => v ?? 'N/A';

//     // 🔹 ONE CARD FOR CURRENT NODE
//     html += `
//         <div class="card org-card"
//              data-id="${node.id || ''}"
//              data-depth="${depth}">

//             <div class="card-body p-2 org-card-details d-flex flex-column gap-2">

//                 <!-- HEADER -->
//                 <div class="org-card-header d-flex align-items-center gap-2">

//                     ${imageHtml}

//                     <div class="d-flex flex-column">
//                         <span class="fw-semibold">${safe(node.ownerName)}</span>
//                         <p class="org-label mb-0">
//                             <span>${safe(node?.employee?.designation)}</span>
//                         </p>
//                     </div>
//                 </div>

//                 <!-- CONTENT -->
//                 <div class="content">
//                     <p class="org-label">
//                         <strong>Department</strong> -
//                         <span>${safe(node.deptName)}</span>
//                     </p>

//                     <p class="org-label mb-0">
//                         <strong>Location</strong> -
//                         <span>${safe(node?.employee?.location)}</span>
//                     </p>

//                     <p class="org-label mb-0">
//                         <strong>Reporting To</strong> -
//                         <span>${safe(node?.parent)}</span>
//                     </p>
//                 </div>

//                 <!-- ACTIONS -->
//                 <div class="d-flex justify-content-between gap-1 flex-shrink-0 org-action border-top pt-2">

//                     <div class="action-list">
//                         ${buildCardLink(node.scoreCardLandingUrl, 'S', 'green')}
//                         ${buildCardLink(node.initiativeLandingUrl, 'I', 'red')}
//                         ${buildCardLink(node.kpiLandingUrl, 'K', 'yellow')}
//                         ${buildCardLink(node.riskLandingUrl, 'R', 'green')}
//                     </div>

//                     <div class="action-list justify-content-end">
//                         <a href="#add-org" data-bs-toggle="modal" data-target="#add-org" data-deptid="${node.deptId}">
//                             <span class="icon orgiz_add"><i data-lucide="plus" style="width:12px;height:12px;"></i></span>
//                         </a>

//                         <a href="#edit-org" data-bs-toggle="modal"
//                            data-deptid="${node.deptId}"
// 						   data-target="#edit-org"
//                            data-nodeid="${node.id}"
//                            data-parentid="${node.deptParentId}">
//                             <span class="icon orgiz_edit"><i data-lucide="pencil" style="width:12px;height:12px;"></i></span>
//                         </a>

//                         <a href="#" class="delete-node-btn"
//                            data-node="${encodeURIComponent(JSON.stringify(node))}">
//                             <span class="icon"><i data-lucide="trash-2" style="width:12px;height:12px;"></i></span>
//                         </a>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     `;

//     // 🔁 RECURSIVE: CHILD NODES AS CARDS
//     if (node.children && node.children.length > 0) {
//         node.children.forEach(child => {
//             html += renderNodeCard(child, depth + 1);
//         });
//     }

//     return html;
// }


// function renderNodeCard(node) {
//     console.log(node, "nodeData");
//     if (!node) return;

//     let html = '';

//     const safe = (v) => v ?? 'N/A';

//     // 🔹 Combine Owners + Members
//     const owners = node.multipleOwerlist || [];
//     const members = node.multiplememberlist || [];

//     const combinedList = [...owners, ...members];

//     combinedList.forEach(person => {

//         let imageHtml = '';

//         if (person.image && person.image !== "") {
//             imageHtml = '<div class="image rounded-circle border text-center">'
//                 + '  <img src="' + person.image + '" loading="lazy" width="26" height="26" alt="profile" />'
//                 + '</div>';
//         } else {
//             var initials = (person.name ? person.name.substring(0, 2).toUpperCase() : 'NA');
//             imageHtml = '<div class="image text-avatar rounded-circle border text-center" style="margin-top:0.4rem;width:26px;height:26px;">'
//                 + '  <span>' + initials + '</span>'
//                 + '</div>';
//         }

//         // html += `
//         //     <div class="card org-card">
//         //         <div class="card-body p-2 org-card-details d-flex flex-column gap-2">

//         //             <!-- HEADER -->
//         //             <div class="org-card-header d-flex align-items-center gap-2">
//         //                 ${imageHtml}
//         //                 <div class="d-flex flex-column">
//         //                     <span class="fw-semibold">${safe(person.name)}</span>
//         //                     <p class="org-label mb-0">
//         //                         <span>${safe(person.dept)}</span>
//         //                     </p>
//         //                 </div>
//         //             </div>

//         //             <!-- CONTENT -->
//         //             <div class="content">
//         //                 <p class="org-label mb-0">
//         //                     <strong>Email</strong> -
//         //                     <span>${safe(person.email)}</span>
//         //                 </p>

//         //                 <p class="org-label mb-0">
//         //                     <strong>Location</strong> -
//         //                     <span>${safe(person.location)}</span>
//         //                 </p>

//         //                 <p class="org-label mb-0">
//         //                     <strong>Phone</strong> -
//         //                     <span>${safe(person.phoneNumber)}</span>
//         //                 </p>
//         //             </div>

//         //         </div>
//         //     </div>
//         // `;



//          html += `
//         <div class="card org-card">

//             <div class="card-body p-2 org-card-details d-flex flex-column gap-2">

//                 <!-- HEADER -->
//                 <div class="org-card-header d-flex align-items-center gap-2">

//                     ${imageHtml}

//                     <div class="d-flex flex-column">
//                         <span class="fw-semibold">${safe(person.name)}</span>
//                         <p class="org-label mb-0">
//                             <span>${safe(person.dept)}</span>
//                         </p>
//                     </div>
//                 </div>

//                 <!-- CONTENT -->
//                 <div class="content">
//                     <p class="org-label">
//                         <strong>Department</strong> -
//                         <span>${safe(person.dept)}</span>
//                     </p>

//                     <p class="org-label mb-0">
//                         <strong>Location</strong> -
//                         <span>${safe(person.location)}</span>
//                     </p>

//                     <p class="org-label mb-0">
//                         <strong>Reporting To</strong> -
//                         <span>${safe(person.phoneNumber)}</span>
//                     </p>
//                 </div>

//                 <!-- ACTIONS -->
//                 <div class="d-flex justify-content-between gap-1 flex-shrink-0 org-action border-top pt-2">

//                     <div class="action-list">
                        
//                     </div>

//                     <div class="action-list justify-content-end">
//                         <a href="#add-org" data-bs-toggle="modal" data-target="#add-org">
//                             <span class="icon orgiz_add">
//                               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="plus" aria-hidden="true" style="width:12px;height:12px;" class="lucide lucide-plus"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>
//                             </span>
//                         </a>

//                         <a href="#edit-org" data-bs-toggle="modal">
//                             <span class="icon orgiz_edit">
//                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="pencil" aria-hidden="true" style="width:12px;height:12px;" class="lucide lucide-pencil"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path><path d="m15 5 4 4"></path></svg>
//                             </span>
//                         </a>

//                         <a href="#" class="delete-node-btn">
//                             <span class="icon">
//                             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="trash-2" aria-hidden="true" style="width:12px;height:12px;" class="lucide lucide-trash-2"><path d="M10 11v6"></path><path d="M14 11v6"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path><path d="M3 6h18"></path><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></span>
//                         </a>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     `;
//     });

//     // 🔹 Inject into grid (DO NOT change styles)
//     $(".org-chart-grid").html(html);
// }



function buildCardLink(url, label, color) {
    const icon = `/stratroom/images/buzzer-${color}-i.svg`;

    return url
        ? `<a target="_blank" href="${url}">
                <span class="icon"
                      style="background:url('${icon}') center/cover;
                             color:#fff;font-weight:700">${label}</span>
           </a>`
        : `<a href="javascript:void(0)"
              onclick="$.notify('${label} link not available',{style:'error'})">
                <span class="icon"
                      style="background:url('${icon}') center/cover;
                             color:#fff;font-weight:700">${label}</span>
           </a>`;
}

function renderNodeCard(node , type, depth = 0) {
    console.log(node,type,  "nodeData");

    if(type == "initially"){
            let html = '';
	 var imageHtml = '';

	 if (node.profileImage && node.profileImage !== "") {
            imageHtml = '<div class="image rounded-circle border text-center">'
                + '  <img src="' + node.profileImage + '" loading="lazy" width="26" height="26" alt="profile" />'
                + '</div>';
        } else {
            var initials = (node.ownerName ? node.ownerName.substring(0, 2).toUpperCase() : 'NA');
            imageHtml = '<div class="image text-avatar rounded-circle border text-center" style="margin-top:0.4rem;width:26px;height:26px;">'
                + '  <span>' + initials + '</span>'
                + '</div>';
        }

    const safe = (v) => v ?? 'N/A';

    // 🔹 ONE CARD FOR CURRENT NODE
    html += `
        <div class="card org-card"
             data-id="${node.id || ''}"
             data-depth="${depth}">

            <div class="card-body p-2 org-card-details d-flex flex-column gap-2">

                <!-- HEADER -->
                <div class="org-card-header d-flex align-items-center gap-2">

                    ${imageHtml}

                    <div class="d-flex flex-column">
                        <span class="fw-semibold">${safe(node.ownerName)}</span>
                        <p class="org-label mb-0">
                            <span>${safe(node?.employee?.designation)}</span>
                        </p>
                    </div>
                </div>

                <!-- CONTENT -->
                <div class="content">
                    <p class="org-label">
                        <strong>Department</strong> -
                        <span>${safe(node.deptName)}</span>
                    </p>

                    <p class="org-label mb-0">
                        <strong>Location</strong> -
                        <span>${safe(node?.employee?.location)}</span>
                    </p>

                    <p class="org-label mb-0">
                        <strong>Reporting To</strong> -
                        <span>${safe(node?.parent)}</span>
                    </p>
                </div>

                <!-- ACTIONS -->
                <div class="d-flex justify-content-between gap-1 flex-shrink-0 org-action border-top pt-2">

                    <div class="action-list">
                        ${buildCardLink(node.scoreCardLandingUrl, 'S', 'green')}
                        ${buildCardLink(node.initiativeLandingUrl, 'I', 'red')}
                        ${buildCardLink(node.kpiLandingUrl, 'K', 'yellow')}
                        ${buildCardLink(node.riskLandingUrl, 'R', 'green')}
                    </div>

                    <div class="action-list justify-content-end">
                        <a href="#add-org" data-bs-toggle="modal" data-target="#add-org" data-deptid="${node.deptId}">
                            <span class="icon orgiz_add"><i data-lucide="plus" style="width:12px;height:12px;"></i></span>
                        </a>

                        <a href="#edit-org" data-bs-toggle="modal"
                           data-deptid="${node.deptId}"
						   data-target="#edit-org"
                           data-nodeid="${node.id}"
                           data-parentid="${node.deptParentId}">
                            <span class="icon orgiz_edit"><i data-lucide="pencil" style="width:12px;height:12px;"></i></span>
                        </a>

                        <a href="#" class="delete-node-btn"
                           data-node="${encodeURIComponent(JSON.stringify(node))}">
                            <span class="icon"><i data-lucide="trash-2" style="width:12px;height:12px;"></i></span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;

    // 🔁 RECURSIVE: CHILD NODES AS CARDS
    if (node.children && node.children.length > 0) {
        node.children.forEach(child => {
            html += renderNodeCard(child, "initially", depth + 1);
        });
    }

    return html;
    }
    else if(type == "selected"){
         if (!node) return;

    let html = '';
    const safe = (v) => v ?? 'N/A';

    // 🔹 If response is ARRAY (initial load)
    const groupList = Array.isArray(node) ? node : [node];

    groupList.forEach(group => {

        const owners = group.multipleOwerlist || [];
        const members = group.multipleMemberlist || [];

        const combinedList = [...owners, ...members];

        combinedList.forEach(person => {

            let imageHtml = '';

            if (person.image && person.image !== "") {
                imageHtml = '<div class="image rounded-circle border text-center">'
                    + '  <img src="' + person.image + '" loading="lazy" width="26" height="26" alt="profile" />'
                    + '</div>';
            } else {
                var initials = (person.name ? person.name.substring(0, 2).toUpperCase() : 'NA');
                imageHtml = '<div class="image text-avatar rounded-circle border text-center" style="margin-top:0.4rem;width:26px;height:26px;">'
                    + '  <span>' + initials + '</span>'
                    + '</div>';
            }

            html += `
                <div class="card org-card">
                    <div class="card-body p-2 org-card-details d-flex flex-column gap-2">

                        <div class="org-card-header d-flex align-items-center gap-2">
                            ${imageHtml}
                            <div class="d-flex flex-column">
                                <span class="fw-semibold">${safe(person.name)}</span>
                                <p class="org-label mb-0">
                                    <span>${safe(person.dept)}</span>
                                </p>
                            </div>
                        </div>

                        <div class="content">
                            <p class="org-label">
                                <strong>Department</strong> -
                                <span>${safe(person.dept)}</span>
                            </p>

                            <p class="org-label mb-0">
                                <strong>Location</strong> -
                                <span>${safe(person.location)}</span>
                            </p>

                            <p class="org-label mb-0">
                                <strong>Reporting To</strong> -
                                <span>${safe(person.phoneNumber)}</span>
                            </p>
                        </div>

                        <div class="d-flex justify-content-between gap-1 flex-shrink-0 org-action border-top pt-2">
                            <div class="action-list">
                            ${buildCardLink(node?.scoreCardLandingUrl, 'S', 'green')}
                        ${buildCardLink(node?.initiativeLandingUrl, 'I', 'red')}
                         ${buildCardLink(node?.kpiLandingUrl, 'K', 'yellow')}
                         ${buildCardLink(node?.riskLandingUrl, 'R', 'green')}
                            </div>

                       <div class="action-list justify-content-end">
                        <a href="#add-org" data-bs-toggle="modal" data-target="#add-org">
                             <span class="icon orgiz_add">
                               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="plus" aria-hidden="true" style="width:12px;height:12px;" class="lucide lucide-plus"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>
                            </span>
                        </a>

                        <a href="#edit-org" data-bs-toggle="modal">
                            <span class="icon orgiz_edit">
                             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="pencil" aria-hidden="true" style="width:12px;height:12px;" class="lucide lucide-pencil"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path><path d="m15 5 4 4"></path></svg>
                            </span>
                        </a>

                        <a href="#" class="delete-node-btn">
                            <span class="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="trash-2" aria-hidden="true" style="width:12px;height:12px;" class="lucide lucide-trash-2"><path d="M10 11v6"></path><path d="M14 11v6"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path><path d="M3 6h18"></path><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></span>
                        </a>
                      </div>
                        </div>

                    </div>
                </div>
            `;
        });
    });

    $(".org-chart-grid").html(html);
    }
   
}


$(document).on("change", "#group_select", function () {

    // Selected Group ID
    const selectedGroupId = $(this).val();

    // Selected Group Name
    const selectedGroupName = $("#group_select option:selected").text();

    console.log("Selected Group ID:", selectedGroupId);
    console.log("Selected Group Name:", selectedGroupName);

    // If you want full object from savedGroups
    const selectedGroupObject = savedGroups.find(
        group => group.id == selectedGroupId
    );

    renderNodeCard(selectedGroupObject, "selected");

    console.log("Full Selected Group Object:", selectedGroupObject);

});




getorgGroups();













        