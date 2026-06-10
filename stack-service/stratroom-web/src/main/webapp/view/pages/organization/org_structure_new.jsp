	<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
		<c:set var="contextroot" value="${pageContext.request.contextPath}" />
		<!DOCTYPE html>
		<html lang="en">

		<head>
			<meta charset="UTF-8">
			<meta http-equiv="X-UA-Compatible" content="IE=Edge">
			<meta content="width=device-width, initial-scale=1" name="viewport" />
			<title>StratRoom</title>
			<link href="assets/css/file-upload.css" rel="stylesheet">
			<link href="assets/css/orgchartnewbasic.css" rel="stylesheet">





		</head>

		<style>

			.user-avatargrid {
				width: 32px;
				/* height: 32px; */
				font-size: 12px;
				font-weight: 600;
				/* border: 1px solid #ddd; */
			}

			.text-avatargrid {
				background-color: #fff;
				color: #0a0a0a;
			}

			
			/* .highlight-node {
				background-color: #fff3cd;
				border: 2px solid #ffc107;
			} */

			.highlight-label {
				background: #ffe58f;
				padding: 2px 4px;
				border-radius: 4px;
			}

			.org-section .org-action {
			    flex-direction: column;
			}

			.org-section .org-content {
				display: flex;
				flex: 1;
				gap: .5rem;
				padding: .5rem;
				align-items: center;
			}



			.nested-area {
				list-style-type: none;
				margin: 0;
				padding: 0;
				position: relative;
				padding-left: 35px;
			}

			.nested-area.nested {
				display: none;
			}

			.nested-area.active {
				display: block;
			}

			.nested-area.sortable-empty::before,
			.nested-area.sortable-empty::after {
				display: none;
			}

			.nested-area::before,
			.nested-area::after {
				content: "";
				position: absolute;
				background-color: var(--primary-color);
			}

			.nested-area::before {
				width: 1px;
				height: 100%;
				top: 0;
				left: 18px;
				bottom: 0;
				min-height: 55px;
			}

			.nested-area::after {
				width: 5px;
				height: 5px;
				border-radius: 50%;
				left: 16px;
				bottom: 0;
			}

			.nested-area .nested-item {
				padding-top: 12px;
			}

			.nested-area .nested-item:first-child,
			.nested-area .nested-item.non-draggable,
			.nested-area .nested-item.nested-item-parent {
				padding-top: 20px;
			}

			.nested-area .nested-item.dragging-highlight {
				opacity: 0.7;
			}

			.nested-area .nested-item.dragging-highlight::before,
			.nested-area .nested-item.dragging-highlight::after {
				display: none;
			}

			.nested-area .nested-item.dragging-highlight .org-box {
				border-style: dashed;
			}

			.nested-area .nested-item .caret {
				position: absolute;
				width: 20px;
				height: 20px;
				left: -27px;
				top: 10px;
				text-align: center;
				border-radius: 50%;
				background-color: #FFF;
				display: flex;
				justify-content: center;
				align-items: center;
				border: 1px solid rgba(0, 0, 0, 0.3);
				cursor: pointer;
				user-select: none;
			}

			.nested-area .nested-item .caret::before {
				content: "";
				color: #85798c;
				font-size: 12px;
				display: flex;
				align-items: center;
				justify-content: center;
				background-image: url(images/carat-i.svg);
				background-position: center center;
				background-repeat: no-repeat;
				background-size: 6px;
				width: 20px;
				height: 20px;
				position: relative;
				transform: rotate(180deg);
				transition: 0.15s ease-in-out;
			}

			.nested-area .nested-item .caret.caret-down::before {
				transform: rotate(360deg);
			}

			.nested-area.nested {
				padding-left: 35px;
			}

			.nested-area.nested::before {
				left: 18px;
			}

			.nested-area .nested-item {
				position: relative;
			}

			.nested-area .nested-item:first-child::before {
				content: "";
				position: absolute;
				width: 5px;
				height: 5px;
				border-radius: 50%;
				background-color: var(--primary-color);
				left: -19px;
				top: 0;
			}

			.nested-area .nested-item .parent::before,
			.nested-area .nested-item .child::before {
				content: "";
				position: absolute;
				width: 5px;
				height: 5px;
				border-radius: 50%;
				background-color: var(--primary-color);
				left: -20px;
				top: 16px;
			}

			.nested-area .nested-item .parent::after,
			.nested-area .nested-item .child::after {
				content: "";
				width: 15px;
				height: 1px;
				background-color: var(--primary-color);
				top: 18px;
				position: absolute;
				left: -15px;
				bottom: 0;
			}

			/* Placeholder styling */
			.ui-sortable-placeholder {
				padding-top: 12px;
			}

			.ui-sortable-placeholder::before {
				content: 'drag & drop here';
				display: flex;
				height: 48px;
				width: 100%;
				border: 1px dashed var(--card-border-color);
				border-radius: var(--border-radius);
				text-align: center;
				justify-content: center;
				align-items: center;
			}

			.sortable-empty {
				padding-top: 12px;
			}

			.sortable-empty::before {
				content: 'drag & drop here';
				display: flex;
				height: 48px;
				width: 100%;
				border: 1px dashed var(--card-border-color);
				border-radius: var(--border-radius);
				text-align: center;
				justify-content: center;
				align-items: center;
			}

			.select2-container--open {
				z-index: 99999 !important;
				/* Ensure this is higher than the modal's z-index */
			}

			.org-tree-container .drag-point {
				display: flex;
				align-items: center;
				justify-content: center;
				padding: .5rem;
				cursor: move;
				background: rgba(var(--stratroom-black-rgb), 0.01);
				color: rgba(var(--stratroom-black-rgb), 0.5);
				border-bottom-left-radius: 10px;
				border-top-right-radius: 10px;
			}

			.org-section .org-content .org-label {
				font-size: clamp(12px, 5vw, 13px);
				margin-bottom: 0;
				line-height: 1.2;
			}

			.org-section .org-content .content {
				display: grid;
				grid-template-columns: repeat(auto-fill, minmax(min(200px, 100%), 1fr));
				gap: .2rem;
				flex: 1;
				align-items: center;
			}
		</style>

		  <style>
    /* Custom Tab Styling for Add Group Modal */
    #add-group .nav-tabs {
      border-bottom: 2px solid #e9ecef;
      gap: 1rem;
    }

    #add-group .nav-tabs .nav-link {
      border: none;
      color: #8c9097;
      font-weight: 500;
      padding: 0.75rem 1rem;
      background: transparent;
      margin-bottom: -2px;
      transition: all 0.2s ease;
    }

    #add-group .nav-tabs .nav-link:hover {
      color: var(--stratroom-primary);
    }

    #add-group .nav-tabs .nav-link.active {
      color: var(--stratroom-primary);
      border-bottom: 2px solid var(--stratroom-primary);
      background: transparent;
    }


	

.custom-card .card-header {
  --stratroom-card-border-color: var(--stratroom-primary);
  --stratroom-accordion-border-color: var(--stratroom-primary);
  --stratroom-card-cap-bg: var(--stratroom-primary);

}


[dir=rtl] .org-tree-container .tree,
[dir=rtl] .org-tree-container .children {
  border-right: 1px solid var(--primary-color);
  border-left: 0;
  margin-left: 0 !important;
  padding-left: 0 !important;
  padding-right: 20px !important;
  margin-right: 20px !important;
}
[dir=rtl] .org-tree-container .tree::before,
[dir=rtl] .org-tree-container .children:before {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  right: -3px;
  top: 0;
}
[dir=rtl] .org-tree-container .tree:after,
[dir=rtl] .org-tree-container .children:after {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  right: -3px;
  bottom: 0;
}
[dir=rtl] .org-tree-container .tree::before,
[dir=rtl] .org-tree-container .tree::after,
[dir=rtl] .org-tree-container .children::before,
[dir=rtl] .org-tree-container .children::after {
  content: "";
  position: absolute;
  background-color: var(--primary-color);
}
[dir=rtl] .org-tree-container .empty-ul {
  border-right: 0 !important;
}
[dir=rtl] .org-tree-container .collapsed > ul {
  border-right: 0;
  min-height: 12px;
  padding-top: 0;
}
[dir=rtl] .org-tree-container .collapsed > ul::before, [dir=rtl] .org-tree-container .collapsed > ul::after {
  display: none;
}
[dir=rtl] .org-tree-container .tree li::after {
  left: auto;
  right: -20px;
}
[dir=rtl] .org-tree-container .tree li::before {
  left: auto;
  right: -23px;
}
[dir=rtl] .org-tree-container .toggle {
  left: auto;
  right: -30px;
}
[dir=rtl] .org-tree-container .nested-area {
  padding-left: 0;
  padding-right: 35px;
}
[dir=rtl] .org-tree-container .nested-area:before {
  left: auto;
  right: 18px;
}
[dir=rtl] .org-tree-container .nested-area:after {
  left: auto;
  right: 16px;
}
[dir=rtl] .org-tree-container .nested-area .nested-item .parent:before,
[dir=rtl] .org-tree-container .nested-area .nested-item .child:before {
  left: auto;
  right: -20px;
}
[dir=rtl] .org-tree-container .nested-area .nested-item .parent:after,
[dir=rtl] .org-tree-container .nested-area .nested-item .child:after {
  left: auto;
  right: -15px;
}
[dir=rtl] .org-tree-container .nested-item .caret {
  left: auto;
  right: -27px;
}
[dir=rtl] .org-tree-container .nested-item .caret::before {
  transform: rotate(0deg);
}
[dir=rtl] .org-tree-container .nested-item .caret.caret-down::before {
  transform: rotate(180deg);
}

.org-tree-container .card-body {
  --stratroom-card-spacer-y: 1.5rem;
  --stratroom-card-spacer-x: 1.5rem;
  padding-left: 0.5rem;
}
@media (max-width: 575.98px) {
  .org-tree-container .org-content {
    flex-wrap: wrap;
  }
  .org-tree-container .org-section .org-action {
    width: 100%;
    justify-content: center;
    padding-bottom: 0;
    border-top: 1px solid var(--stratroom-card-border-color);
  }
}
.org-tree-container .tree,
.org-tree-container .tree ul {
  list-style: none;
  padding-left: 18px;
  margin: 0;
}
.org-tree-container .tree li {
  margin: 8px 0;
  position: relative;
}
.org-tree-container .tree li > div {
  min-width: 230px;
}
.org-tree-container .drag-point {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  cursor: move;
  background: rgba(var(--stratroom-black-rgb), 0.01);
  color: rgba(var(--stratroom-black-rgb), 0.5);
  border-bottom-left-radius: 10px;
  border-top-right-radius: 10px;
}
.org-tree-container .drag-point:active {
  cursor: move;
}
.org-tree-container .placeholder {
  background: #f0f4ff;
  border: 2px dashed rgba(var(--stratroom-primary-rgb), 1);
  height: 36px;
  border-radius: 6px;
  margin: 6px 0;
}
.org-tree-container .drop-inside {
  border: 2px dashed rgba(var(--stratroom-primary-rgb), 1) !important;
  background: #eef5ff !important;
}
.org-tree-container .children {
  margin-top: 8px;
  padding-left: 14px;
}
.org-tree-container .toggle {
  cursor: pointer;
  font-size: 12px;
  color: #666;
}
.org-tree-container .collapsed > ul {
  border-left: 0;
  min-height: 12px;
  padding-top: 0;
}
.org-tree-container .collapsed > ul::before, .org-tree-container .collapsed > ul::after {
  display: none;
}
.org-tree-container .collapsed > ul > li {
  display: none;
}
.org-tree-container .actions {
  margin-top: 20px;
  display: flex;
  gap: 12px;
}
.org-tree-container button {
  padding: 10px 16px;
  border-radius: 6px;
  border: none;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
}
.org-tree-container .export {
  background: rgba(var(--stratroom-primary-rgb), 1);
}
.org-tree-container .reset {
  background: #ff6b6b;
}
.org-tree-container .ui-sortable {
  min-height: 12px;
}
.org-tree-container .tree,
.org-tree-container .children {
  list-style-type: none;
  margin: 0;
  padding: 0;
  position: relative;
  border-left: 1px solid var(--primary-color);
  margin-left: 20px !important;
  padding-left: 20px !important;
  padding-top: 10px !important;
}
.org-tree-container .tree::before,
.org-tree-container .children:before {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  left: -3px;
  top: 0;
}
.org-tree-container .tree:after,
.org-tree-container .children:after {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  left: -3px;
  bottom: 0;
}
.org-tree-container .tree::before,
.org-tree-container .tree::after,
.org-tree-container .children::before,
.org-tree-container .children::after {
  content: "";
  position: absolute;
  background-color: var(--primary-color);
}
.org-tree-container .empty-ul {
  border-left: 0 !important;
  padding-top: 0 !important;
}
.org-tree-container .empty-ul::before,
.org-tree-container .empty-ul::after {
  display: none;
}
.org-tree-container .tree li::before {
  content: "";
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: var(--primary-color);
  left: -23px;
  top: 16px;
}
.org-tree-container .tree li::after {
  content: "";
  width: 20px;
  height: 1px;
  background-color: var(--primary-color);
  top: 18px;
  position: absolute;
  left: -20px;
  bottom: 0;
}
.org-tree-container .toggle {
  position: absolute;
  width: 18px;
  height: 18px;
  left: -30px;
  top: -8px;
  text-align: center;
  border-radius: 50%;
  background-color: #FFF;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.3);
  cursor: pointer;
  user-select: none;
}


.org-card {
  border-top: 3px solid var(--stratroom-primary);
}
.org-card .org-action {
  display: flex;
  align-items: center;
  gap: 0.3rem;
}
.org-card .org-action .action-list {
  display: flex;
  gap: 0.3rem;
}
.org-card .org-action .action-list > a {
  cursor: pointer;
  display: inline-flex;
  text-decoration: none;
}
.org-card .org-action .action-list > a .icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 3px 3px;
  background-color: #e9ecef;
  color: #000;
  border-radius: 50rem;
  width: 20px;
  height: 20px;
  border: 1px solid rgba(var(--stratroom-contrast-border), 0.1);
  font-size: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 10px;
}
.org-card .org-action .action-list > a img {
  width: 100%;
}
.org-card .org-action .action-list li a {
  cursor: pointer;
  display: inline-flex;
  text-decoration: none;
}
.org-card .org-action .action-list li a .icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 3px 3px;
  background-color: #fff;
  color: rgba(0, 0, 0, 0.3);
  border-radius: 50rem;
  width: 20px;
  height: 20px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  font-size: 8px;
  text-decoration: none;
}
.org-card .org-action .action-list li a:hover {
  background-color: var(--gray-100);
}
.org-card .org-action .action-list li a img {
  width: 100%;
}
.org-card .org-card-header .org-label {
  display: flex;
  flex-wrap: wrap;
  gap: 0.1rem;
  font-size: clamp(12px, 2.5vw, 13px);
  margin-bottom: 0;
  line-height: 1.2;
}
.org-card .org-card-header .org-label strong {
  font-weight: 500;
}
.org-card .org-card-header .org-label span {
  display: inline-block;
}
.org-card .org-card-details {
  gap: 0.3rem;
  padding: 0.5rem;
}
.org-card .org-card-details .content {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(200px, 100%), 1fr));
  gap: 0.3rem;
  flex: 1;
  align-items: center;
}
.org-card .org-card-details .org-label {
  display: flex;
  flex-wrap: wrap;
  gap: 0.1rem;
  font-size: clamp(12px, 2.5vw, 13px);
  margin-bottom: 0;
  line-height: 1.2;
}
.org-card .org-card-details .org-label strong {
  font-weight: 500;
}
.org-card .org-card-details .org-label span {
  display: inline-block;
} /*# sourceMappingURL=basic.css.map */

.gap-2 {
    gap: 0.5rem !important;
}

/*# sourceMappingURL=basic.css.map */


/* new css */
[dir="rtl"] .org-tree-container .tree,
[dir="rtl"] .org-tree-container .children {
  border-right: 1px solid var(--primary-color);
  border-left: 0;
  margin-left: 0 !important;
  padding-left: 0 !important;
  padding-right: 20px !important;
  margin-right: 20px !important;
}
[dir="rtl"] .org-tree-container .tree::before,
[dir="rtl"] .org-tree-container .children:before {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  right: -3px;
  top: 0;
}
[dir="rtl"] .org-tree-container .tree:after,
[dir="rtl"] .org-tree-container .children:after {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  right: -3px;
  bottom: 0;
}
[dir="rtl"] .org-tree-container .tree::before,
[dir="rtl"] .org-tree-container .tree::after,
[dir="rtl"] .org-tree-container .children::before,
[dir="rtl"] .org-tree-container .children::after {
  content: "";
  position: absolute;
  background-color: var(--primary-color);
}
[dir="rtl"] .org-tree-container .empty-ul {
  border-right: 0 !important;
}
[dir="rtl"] .org-tree-container .collapsed > ul {
  border-right: 0;
  min-height: 12px;
  padding-top: 0;
}
[dir="rtl"] .org-tree-container .collapsed > ul::before,
[dir="rtl"] .org-tree-container .collapsed > ul::after {
  display: none;
}
[dir="rtl"] .org-tree-container .tree li::after {
  left: auto;
  right: -20px;
}
[dir="rtl"] .org-tree-container .tree li::before {
  left: auto;
  right: -23px;
}
[dir="rtl"] .org-tree-container .toggle {
  left: auto;
  right: -30px;
}
[dir="rtl"] .org-tree-container .nested-area {
  padding-left: 0;
  padding-right: 35px;
}
[dir="rtl"] .org-tree-container .nested-area:before {
  left: auto;
  right: 18px;
}
[dir="rtl"] .org-tree-container .nested-area:after {
  left: auto;
  right: 16px;
}
[dir="rtl"] .org-tree-container .nested-area .nested-item .parent:before,
[dir="rtl"] .org-tree-container .nested-area .nested-item .child:before {
  left: auto;
  right: -20px;
}
[dir="rtl"] .org-tree-container .nested-area .nested-item .parent:after,
[dir="rtl"] .org-tree-container .nested-area .nested-item .child:after {
  left: auto;
  right: -15px;
}
[dir="rtl"] .org-tree-container .nested-item .caret {
  left: auto;
  right: -27px;
}
[dir="rtl"] .org-tree-container .nested-item .caret::before {
  transform: rotate(0deg);
}
[dir="rtl"] .org-tree-container .nested-item .caret.caret-down::before {
  transform: rotate(180deg);
}
.org-tree-container .card-body {
  --stratroom-card-spacer-y: 1.5rem;
  --stratroom-card-spacer-x: 1.5rem;
}
@media (max-width: 575.98px) {
  .org-tree-container .org-content {
    flex-wrap: wrap;
  }
  .org-tree-container .org-section .org-action {
    width: 100%;
    justify-content: space-between;
    padding-top: 0.5rem;
    border-top: 1px solid var(--stratroom-card-border-color);
  }
}
.org-tree-container .tree,
.org-tree-container .tree ul {
  list-style: none;
  padding-left: 18px;
  margin: 0;
}
.org-tree-container .tree li {
  margin: 8px 0;
  position: relative;
}
.org-tree-container .tree li > div {
  min-width: 230px;
}
.org-tree-container .drag-point {
  display: flex;
  justify-content: center;
  padding: 0.5rem;
  padding-right: 0;
  cursor: move;
  background: rgba(var(--stratroom-body-color-rgb), 0.01);
  color: rgba(var(--stratroom-body-color-rgb), 0.5);
  border-bottom-left-radius: 10px;
  border-top-right-radius: 10px;
}
@media (min-width: 576px) {
  .org-tree-container .drag-point {
    align-items: center;
  }
}
.org-tree-container .drag-point:active {
  cursor: move;
}
.org-tree-container .placeholder {
  background: #f0f4ff;
  border: 2px dashed rgba(var(--stratroom-primary-rgb), 1);
  height: 36px;
  border-radius: 6px;
  margin: 6px 0;
}
.org-tree-container .drop-inside {
  border: 2px dashed rgba(var(--stratroom-primary-rgb), 1) !important;
  background: #eef5ff !important;
}
.org-tree-container .children {
  margin-top: 8px;
  padding-left: 14px;
}
.org-tree-container .toggle {
  cursor: pointer;
  font-size: 12px;
  color: #666;
}
.org-tree-container .collapsed > ul {
  border-left: 0;
  min-height: 12px;
  padding-top: 0;
}
.org-tree-container .collapsed > ul::before,
.org-tree-container .collapsed > ul::after {
  display: none;
}
.org-tree-container .collapsed > ul > li {
  display: none;
}
.org-tree-container .actions {
  margin-top: 20px;
  display: flex;
  gap: 12px;
}
.org-tree-container .export {
  background: rgba(var(--stratroom-primary-rgb), 1);
}
.org-tree-container .reset {
  background: #ff6b6b;
}
.org-tree-container .ui-sortable {
  min-height: 12px;
}
.org-tree-container .tree,
.org-tree-container .children {
  list-style-type: none;
  margin: 0;
  padding: 0;
  position: relative;
  border-left: 1px solid var(--primary-color);
  margin-left: 20px !important;
  padding-left: 20px !important;
  padding-top: 10px !important;
}
.org-tree-container .tree::before,
.org-tree-container .children:before {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  left: -3px;
  top: 0;
}
.org-tree-container .tree:after,
.org-tree-container .children:after {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  left: -3px;
  bottom: 0;
}
.org-tree-container .tree::before,
.org-tree-container .tree::after,
.org-tree-container .children::before,
.org-tree-container .children::after {
  content: "";
  position: absolute;
  background-color: var(--primary-color);
}
.org-tree-container .empty-ul {
  border-left: 0 !important;
  padding-top: 0 !important;
}
.org-tree-container .empty-ul::before,
.org-tree-container .empty-ul::after {
  display: none;
}
.org-tree-container .tree li::before {
  content: "";
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: var(--primary-color);
  left: -23px;
  top: 16px;
}
.org-tree-container .tree li::after {
  content: "";
  width: 20px;
  height: 1px;
  background-color: var(--primary-color);
  top: 18px;
  position: absolute;
  left: -20px;
  bottom: 0;
}
.org-tree-container .toggle {
  position: absolute;
  width: 18px;
  height: 18px;
  left: -30px;
  top: -8px;
  text-align: center;
  border-radius: 50%;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.3);
  cursor: pointer;
  user-select: none;
}


  </style>
		<script type="text/javascript" src="${contextroot}/js/jquery.min.js"></script>

		<body class="light" data-page="org-structure-new">
			<!-- <input type="hidden" id="userrolename" value="${principal.profile.userRoleName}"> -->


			<div style="display: none;">
				<jsp:include page="../common/right-navigation.jsp"></jsp:include>
			</div>

			<jsp:include page="../common/top-navigation.jsp"></jsp:include>
			<header id="header" class="header shadow-sm">

				<jsp:include page="../common/left-navigation.jsp"></jsp:include>
			</header>
			<main class="pt-2 pb-2">

				<div class="container-lg">
					<div class="page-header grid gap-2 pb-1">
						<div class="g-col-8 d-flex align-items-center">
							<h4 class="title">
								<span class="icon">
									<img src="/stratroom/images/org-structure-i.svg" alt="org-structure"
										title="org-structure" width="16" height="16">
								</span>
								<span data-translate="page.orgstructure.title">Org Structure</span>
							</h4>
						</div>
						<div class="load-page page-actions g-col-4">
							<div class="input-group input-group-sm">
								<input type="text" class="form-control" placeholder="Search" aria-label="Search"
									aria-describedby="button-search" id="orgSearch">
								<button class="btn btn-outline-secondary" type="button" id="orgSearchBtn"><i
										class="fas fa-search"></i></button>
							</div>


							<select class="form-select form-select-sm">
								<option>Current</option>
								<option>Feb 2025</option>
							</select>

							<div class="page-icons">
								<ul>
									<li>
										<a href="#add-group" data-bs-toggle="modal">
											<span data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Create Group"
												title="Create Group">

												<i data-lucide="user-plus" class="org-view-icon" style="width:16px;height:16px;"></i>
											</span>
										</a>
									</li>
									<li>
									   <a href="javascript:void(0)" class="toggle-org-view" data-view="tree">
											<span data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Switch to Grid View" title="Switch to Grid View">
												<i data-lucide="list-tree" class="org-view-icon" style="width:16px;height:16px;"></i>
											</span>
									    </a>

								    </li>
									<li>
										<a onclick="handleOrgView()">
											<span data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="View">
												<img src="/stratroom/images/view-i.svg" width="12" height="12" />
											</span>
										</a>
									</li>
									<li>
										<a href="#org-import" data-bs-toggle="modal">
											<span data-bs-toggle="tooltip" data-bs-placement="bottom"
												data-bs-title="Import">
												<img src="/stratroom/images/import-i.svg" width="12" height="12"
													alt="import" title="import">
											</span>
										</a>
									</li>
								</ul>
							</div>

						</div>
					</div>
				</div>

				


					<div id="chart-container"></div>

					 <div id="grid-view-container" class="d-none">
        <div class="card custom-card org-structure-card org-tree-container w-100">
          <div class="card-header">
            <div class="c-header-left">
              <h5 class="card-title me-auto">

                <strong editable="true" contenteditable="true" onkeypress="return (this.innerText.length <= 36)">Org
                  Structure
                  Grid View</strong>
              </h5>
            </div>

          </div>
          <div class="card-body">
            <div class="grid gap-2" style="grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));" id="org-grid">
            </div>
          </div>
        </div>
                     </div>




				
			</main>
			<footer class="col-12 text-center py-2 copyright" 
			style="position:fixed; bottom:0; left:0; width:100%; margin:0; padding:8px;">
				<p class="mb-0" style="margin:0;">Copyright &copy; 
				<span id="year"></span> <strong>StratRoom</strong>
				</p>

				<script>
				document.getElementById("year").textContent = new Date().getFullYear();
				</script>
			</footer>

			<div class="floating-box shadow-sm">
				<a class="control-link" href="#"><span class="icon"><img src="/stratroom/images/organization-i.svg"
							width="18" height="18" alt="organization"></span></a>
				<a class="control-link" href="#"><span class="icon"><img src="/stratroom/images/template.svg" width="18"
							height="18" alt="organization"></span></a>
			</div>


						<div class="modal custom-modal fade" id="add-group" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
		role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
		<div
		class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
		<div class="modal-content" style="min-height: 320px;">
			<div class="modal-header pb-0">
			<!-- <h4 class="modal-title" data-translate="page.orgstructure.create_group">Group Management</h4> -->
			<!-- Nav tabs -->
			<ul class="nav nav-tabs" id="groupTabs" role="tablist">
				<li class="nav-item" role="presentation">
				<button class="nav-link active" id="create-tab" data-bs-toggle="tab" data-bs-target="#create-group-pane"
					type="button" role="tab" aria-controls="create-group-pane" aria-selected="true">Create Group</button>
				</li>
				<li class="nav-item" role="presentation">
				<button class="nav-link" id="manage-tab" data-bs-toggle="tab" data-bs-target="#manage-group-pane"
					type="button" role="tab" aria-controls="manage-group-pane" aria-selected="false">Manage Groups</button>
				</li>
			</ul>
			<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body">


			<!-- Tab panes -->
			<div class="tab-content" id="groupTabsContent">
				<div class="tab-pane fade show active" id="create-group-pane" role="tabpanel" aria-labelledby="create-tab">

				<form class="card custom-card border-0">
					<div class="card-body">
					<div class="grid gap-3">

                        <input type="hidden" class="form-control browser-default" name="" id="group-id" data-translate="page.orgstructure.form_items.group_name" placeholder="Group Name" >
						<div class="g-col-12 g-col-md-6">
							<div class="form-group">
								<label for="sub_initative_progress" class="form-label"
								data-translate="page.orgstructure.form_items.group_name">Group Name</label>
								<input type="text" class="form-control browser-default" name="" id="group-name"
								data-translate="page.orgstructure.form_items.group_name" placeholder="Group Name">
							</div>
						</div>
						<div class="g-col-12">
						<label for="page.orgstructure.form_items.description" class="form-label"
							data-translate="page.orgstructure.form_items.description">Description</label>
						<textarea class="form-control" id="group-desc" placeholder="Description" rows="3"></textarea>
						</div>

						<div class="g-col-12 g-col-md-6">
						<label class="form-label">Owner</label>

						<div class="d-flex align-items-start">
							<ul class="list-unstyled d-flex align-items-center avatar-group mb-0" id="owner-avatars">
							
							<li class="avatar avatar-xs" id="btn-select-owner" style="cursor: pointer;">
								<span class="avatar-initial rounded-circle bg-light text-primary"><i
									class="fas fa-plus"></i></span>
							</li>
							</ul>
						</div>

						</div>
						<div class="g-col-12 g-col-md-6">
						<label class="form-label">Members</label>

						<div class="d-flex align-items-start">
							<ul class="list-unstyled d-flex align-items-center avatar-group mb-0" id="member-avatars">
							
							<li class="avatar avatar-xs" id="btn-select-members" style="cursor: pointer;">
								<span class="avatar-initial rounded-circle bg-light text-primary"><i
									class="fas fa-plus"></i></span>
							</li>
							</ul>
						</div>

						</div>

					</div>
					</div>
				</form>
				<div class="mt-3 text-end">
					<button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close"
					data-translate="actions.cancel">Cancel</button>
					<button class="btn btn-primary" value="Save"
					data-translate="actions.save" onclick="handleGroupSave()">Save</button>
				</div>
				</div>
				<div class="tab-pane fade" id="manage-group-pane" role="tabpanel" aria-labelledby="manage-tab">
				<div id="group-list-container">
					<!-- Groups will be rendered here -->
				</div>
				<div class="mt-3 text-center">
					<button type="button" class="btn btn-outline-primary" id="btn-add-more-group">
					<i class="fas fa-plus me-1"></i> Add More Group
					</button>
				</div>
				</div>
			</div>
			</div>
		</div>
		</div>
						</div>

						<div class="modal custom-modal fade" id="attendess-list" data-bs-backdrop="static" data-bs-keyboard="false"
    tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Edit Users</h4>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <div class="modal-body d-grid gap-3">
          <div class="attendees-search">
            <div>
              <div class="form-check cusom-check">
                <input class="form-check-input" type="checkbox" value="" id="allusers">
                <label class="form-check-label" for="allusers">
                  All Users
                </label>
              </div>
            </div>
            <div class="search">
              <div class="input-group input-group-sm">
                <input type="text" class="form-control" id="user-search-input" placeholder="Search Users"
                  aria-label="Recipient's username" aria-describedby="button-addon2">
                <button class="btn btn-outline-secondary" type="button" id="button-addon2">
                  <i class="fas fa-search" data-toggle="tooltip" data-placement="bottom" title=""
                    data-original-title="Files"></i>
                </button>
              </div>
            </div>
          </div>
          <div class="list-group add-attendees" id="user-selection-list">
            <!-- Users will be rendered here by JS -->
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-primary" id="btn-save-users">Select</button>
        </div>
      </div>
    </div>
  </div>

			             
						

    

			<!--  org-add modal :::::::::::::::::::::::::::::::::::::::: -->

			<!-- Modal Structure -->
			<div class="modal custom-modal fade" id="add-org" data-backdrop="static" data-keyboard="false" tabindex="-1"
				role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
				<div
					class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
					<div class="modal-content">
						<div class="modal-header">
							<h4 class="modal-title" data-translate="page.orgstructure.create_orgstructure">Create Org</h4>
							<button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
						</div>
						<div class="modal-body">
							<form class="card custom-card border-0">
								<div class="card-body">
									<div class="grid gap-3">

										<input type="hidden" name="dept_new_id1" id="dept_new_id1" />
										<input type="hidden" name="dept_parentid" id="dept_parentid" />
										<input type="hidden" name="deptmode" id="deptmode" />
										<div class="g-col-12 g-col-md-6">
											<div class="form-group">
												<label for="sub_initative_progress" class="form-label">Employee Id</label>
												<input type="text" class="form-control browser-default" name="orgempId"
													id="orgempId" placeholder="Employee Id">
											</div>
										</div>
										<div class="g-col-12 g-col-md-6">
											<div class="form-group">
												<label for="sub_initative_progress" class="form-label" data-translate="page.orgstructure.form_items.department">Department</label>
												<input type="text" class="form-control browser-default" name="orgdept"
													id="orgdept" placeholder="Department">
											</div>
										</div>
										<div class="g-col-12 g-col-md-6">
											<div class="form-group">
												<label for="sub_initative_progress" class="form-label" data-translate="page.orgstructure.form_items.department_id">Department ID</label>
												<input type="text" class="form-control browser-default" name="editorgdeptid"
													id="editorgdeptid" placeholder="Department ID">
											</div>
										</div>
										<div class="g-col-12 g-col-md-6">
											<div class="form-group">
												<label for="boardTypeEdit" class="form-label" data-translate="page.orgstructure.form_items.owner">Owner</label>
												<select class="form-select select-dropdown-edit-org w-100 select2"
													name="ownernamemapping" id="ownername" data-placeholder="Select Owner"
													style="width: 100%;">
												</select>
											</div>
										</div>
										<div class="g-col-12 g-col-md-6">
											<div class="form-group">
												<label for="sub_initative_progress" class="form-label" data-translate="page.orgstructure.form_items.email">Email</label>
												<input type="text" class="form-control browser-default" name="deptemailadd"
													id="deptemailadd" placeholder="Email">
											</div>
										</div>
										<div class="g-col-12 g-col-md-6">
											<div class="form-group">
												<label for="boardTypeEdit" class="form-label" data-translate="page.orgstructure.form_items.members">Members</label>
												<select
													class="userdept-name-multi-selectadd form-select select-dropdown-add-org w-100 select2"
													style="width: 100%;" name="boardTypeCreate" id="boardTypeEdit"
													data-placeholder="Select Member" multiple="multiple"
													name="namemapping[]">

												</select>
											</div>
										</div>

										<div class="g-col-12 g-col-md-6">
											<div class="form-group">
												<label for="ScorecardEdit" class="form-label" data-translate="page.orgstructure.form_items.scorecard">Scorecard</label>
												<select class="form-select select-dropdown-edit-org w-100"
													id="deptuserscorecard" name="deptuserscorecard"
													data-placeholder="Select Scorecard">
													<option value="" disabled selected hidden>
														Select Scorecard
													</option>

												</select>
											</div>
										</div>
										<div class="g-col-12 g-col-md-6">
											<div class="form-group">
												<label for="InitiativeEdit" class="form-label" data-translate="page.orgstructure.form_items.initiative">Initiative</label>
												<select class="form-select select-dropdown-edit-org w-100"
													id="deptuserinitiative" name="deptuserinitiative"
													data-placeholder="Select Initiative">
													<option value="" disabled selected hidden>
														Select Initiative
													</option>
												</select>
											</div>
										</div>
										<div class="g-col-12 g-col-md-6">
											<div class="form-group">
												<label for="KPIEdit" class="form-label" data-translate="page.orgstructure.form_items.kpi">KPI</label>
												<select class="form-select select-dropdown-edit-org w-100" id="deptuserkpi"
													name="deptuserkpi" data-placeholder="Select KPI">
													<option value="" disabled selected hidden>
														Select KPI
													</option>
												</select>

											</div>
										</div>
										<div class="g-col-12 g-col-md-6">
											<div class="form-group">
												<label for="RiskEdit" class="form-label" data-translate="page.orgstructure.form_items.risk">Risk</label>
												<select class="form-select select-dropdown-edit-org w-100" id="deptuserrisk"
													name="deptuserrisk" data-placeholder="Select Risk">
													<option value="" disabled selected hidden>
														Select Risk
													</option>
												</select>
											</div>
										</div>
									</div>
								</div>
							</form>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-label-secondary" data-dismiss="modal" aria-label="Close" data-translate="page.orgstructure.cancel">
								Cancel
							</button>
							<button class="btn btn-primary" value="Save" onclick="return createdeptEmployee()" data-translate="page.orgstructure.save">Save</button>
						</div>
					</div>
				</div>
			</div>


			<!--  org-add modal :::::::::::::::::::::::::::::::::::::::: -->

			<!--  org-edit modal :::::::::::::::::::::::::::::::::::::::: -->

			<div class="modal custom-modal fade" id="edit-org" data-backdrop="static" data-bs-keyboard="false" tabindex="-1"
				role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
				<div
					class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
					<div class="modal-content">
						<div class="modal-header">
							<h4 class="modal-title" data-translate="page.orgstructure.edit_orgstructure">Edit Org</h4>
							<button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
						</div>
						<div class="modal-body">
							<form class="card custom-card border-0">
								<div class="card-body">
									<div class="grid gap-3">

										<input type="hidden" name="dept_new_id1" id="dept_new_id1" />
										<input type="hidden" name="dept_parentid" id="dept_parentid" />
										<input type="hidden" name="deptmode" id="deptmode" />
										<input type="hidden" id="updatedeptId">
										<div class="g-col-12 g-col-md-6">
											<div class="form-group">
												<label for="sub_initative_progress" class="form-label">Employee Id</label>
												<input type="text" class="form-control browser-default" name="editorgempId"
													id="editorgempId" placeholder="Employee Id">
											</div>
										</div>
										<div class="g-col-12 g-col-md-6">
											<div class="form-group">
												<label for="sub_initative_progress" class="form-label" data-translate="page.orgstructure.form_items.department">Department</label>
												<input type="text" class="form-control browser-default" name="editorgdept"
													id="editorgdept" placeholder="Department">
											</div>
										</div>

										<div class="g-col-12 g-col-md-6">
											<div class="form-group">
												<label for="sub_initative_progress" class="form-label" data-translate="page.orgstructure.form_items.department_id">Department ID</label>
												<input type="text" class="form-control browser-default"
													name="editorgdeptidValue" id="editorgdeptidValue"
													placeholder="Department ID" readonly>
											</div>
										</div>

										<div class="g-col-12 g-col-md-6">
											<div class="form-group">
												<label for="boardTypeEdit" class="form-label" data-translate="page.orgstructure.form_items.owner">Owner</label>
												<select class="form-select select-dropdown-edit-org w-100"
													name="ownernamemapping" id="ownernameValue"
													data-placeholder="Select Owner" style="width: 100%;">


												</select>
											</div>
										</div>

										<div class="g-col-12 g-col-md-6">
											<div class="form-group">
												<label for="" class="form-label" data-translate="page.orgstructure.form_items.email">Email</label>
												<input type="text" class="form-control browser-default" id="emialIdValue"
													placeholder="Email" readonly>
											</div>
										</div>

										<div class="g-col-12 g-col-md-6">
											<div class="form-group">
												<label for="boardTypeEdit" class="form-label" data-translate="page.orgstructure.form_items.members">Members</label>
												<select
													class="userdept-name-multi-select form-select select-dropdown-edit-org w-100 select2"
													style="width: 100%;" name="boardTypeCreate" id="boardTypeEdit"
													data-placeholder="Select Member" multiple="multiple"
													name="namemapping[]">

												</select>
											</div>
										</div>

										<div class="g-col-12 g-col-md-6">
											<div class="form-group">
												<label for="ScorecardEdit" class="form-label" data-translate="page.orgstructure.form_items.scorecard">Scorecard</label>
												<select class="form-select select-dropdown-edit-org w-100"
													name="deptuserscorecardValue" id="deptuserscorecardValue"
													data-placeholder="Select Scorecard" style="width: 100%;">
													<option value="" disabled selected hidden>
														Select Scorecard
													</option>

												</select>
											</div>
										</div>
										<div class="g-col-12 g-col-md-6">
											<div class="form-group">
												<label for="InitiativeEdit" class="form-label" data-translate="page.orgstructure.form_items.initiative">Initiative</label>
												<select class="form-select select-dropdown-edit-org w-100"
													name="deptuserinitiativeValue" id="deptuserinitiativeValue"
													data-placeholder="Select Initiative" style="width: 100%;">
													<option value="" disabled selected hidden>
														Select Initiative
													</option>
												</select>
											</div>
										</div>
										<div class="g-col-12 g-col-md-6">
											<div class="form-group">
												<label for="KPIEdit" class="form-label" data-translate="page.orgstructure.form_items.kpi">KPI</label>
												<select class="form-select select-dropdown-edit-org w-100"
													name="deptuserkpiValue" id="deptuserkpiValue"
													data-placeholder="Select KPI" style="width: 100%;">
													<option value="" disabled selected hidden>
														Select KPI
													</option>
												</select>

											</div>
										</div>
										<div class="g-col-12 g-col-md-6">
											<div class="form-group">
												<label for="RiskEdit" class="form-label" data-translate="page.orgstructure.form_items.risk">Risk</label>
												<select class="form-select select-dropdown-edit-org w-100"
													name="deptuserriskValue" id="deptuserriskValue"
													data-placeholder="Select Risk" style="width: 100%;">
													<option value="" disabled selected hidden>
														Select Risk
													</option>
												</select>

											</div>
										</div>
									</div>
								</div>
							</form>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-label-secondary" data-dismiss="modal" aria-label="Close" data-translate="page.orgstructure.cancel">
								Cancel
							</button>
							<button class="btn btn-primary" value="Save" onclick="updateEmployeeDept()" data-translate="page.orgstructure.save">Save</button>
						</div>
					</div>
				</div>
			</div>

			<!--  org-edit modal :::::::::::::::::::::::::::::::::::::::: -->

			<!--  delete modal :::::::::::::::::::::::::::::::::::::::: -->

			<div class="modal custom-modal custom-delete-modal fade" id="delete-modal" data-backdrop="static"
				data-bs-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1"
				aria-hidden="true">
				<div class="modal-dialog modal-dialog-centered" style="--stratroom-modal-width:320px">
					<div class="modal-content">
						<div class="modal-body">
							<div class="card custom-card delete-card border-0">
								<div class="card-body">

									<div class="delete-box">
										<h4 class="title" data-translate="page.orgstructure.delete_confirmation">Do you really want to delete?</h4>
										<div class="btn-wrap">
											<button type="button" class="btn btn-sm btn-label-secondary rounded-pill"
												data-bs-dismiss="modal" aria-label="Close" data-translate="page.orgstructure.cancel">
												Cancel
											</button>
											<button class="btn btn-sm btn-danger rounded-pill orgDeleteconfirm"
												value="Yes" data-translate="page.orgstructure.delete">Delete</button>
										</div>
									</div>
								</div>
							</div>
						</div>

					</div>
				</div>
			</div>


			<div class="modal custom-modal custom-delete-modal fade" id="dragmap-modal" data-backdrop="static"
				data-bs-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1"
				aria-hidden="true">
				<div class="modal-dialog modal-dialog-centered" style="--stratroom-modal-width:320px">
					<div class="modal-content">
						<div class="modal-body">
							<div class="card custom-card delete-card border-0">
								<div class="card-body">

									<div class="delete-box">
										<h4 class="title" >Do you really want to save the changes?</h4>
										<div class="btn-wrap">
											<button type="button" class="btn btn-sm btn-label-secondary rounded-pill"
												data-bs-dismiss="modal" aria-label="Close" data-translate="page.orgstructure.cancel">
												Cancel
											</button>
											<button class="btn btn-sm btn-primary rounded-pill dragMapconfirm"
												value="Yes" data-translate="page.orgstructure.save">Save</button>
										</div>
									</div>
								</div>
							</div>
						</div>

					</div>
				</div>
			</div>


			

			<!--  delete modal :::::::::::::::::::::::::::::::::::::::: -->


			<!--  org-view modal :::::::::::::::::::::::::::::::::::::::: -->

			<div class="modal custom-modal fade" id="org-view" tabindex="-1" role="dialog"
				aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
				<div class="modal-dialog modal-dialog-scrollable modal-xl modal-fullscreen-xl-down">
					<div class="modal-content">
						<div class="modal-header">
							<h4 class="modal-title" data-translate="page.orgstructure.organisation_tracker">Organisation Tracker</h4>
							<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div class="modal-body">
							<div class="card controlpanel-container org-structure-tab-container">
								<div class="grid gap-0 control-panel-tabs org-structure-tabs">
									<div id="org-tracker-tabs" class="dropdown control-panel-wrap  g-col-12 g-col-lg-3"></div>


									<!-- data displyed here -->
									<div class="tab-content g-col-12 g-col-lg-9" id="v-pills-tabContent">
										<div class="tab-pane fade show active" id="v-pills-general" role="tabpanel"
											aria-labelledby="v-pills-general-tab" tabindex="0">
											
												<div id="org-tracker-tab-section-data"></div>
											
										</div>
									</div>
								</div>
							</div>
						</div>

					</div>
				</div>
			</div>

			<!-- org-view END -->

			<!-- File Validate Form -->
			<div class="modal custom-modal fade" id="org-import" tabindex="-1" role="dialog"
				aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
				<div
					class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
					<div class="modal-content">
						<div class="modal-header">
							<h4 class="modal-title" data-translate="page.orgstructure.file_upload">File Upload</h4>
							<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div class="modal-body">
							<div class="card-header-progress">
								<ul class="form-progressbar w-100">
									<li data-translate="page.orgstructure.form_items.upload">Upload</li>
									<li data-translate="page.orgstructure.form_items.validation">Validation</li>
									<li data-translate="page.orgstructure.form_items.import">Import</li>
								</ul>
							</div>

							<input type="hidden" id="orgimportmethodtype">


							<div id="file-upload" class="card custom-card">
								<div class="card-body grid gap-3">

									<div class="g-col-12">
										<div class="form-group">
											<label for="importCategory" class="form-label" data-translate="page.orgstructure.form_items.import_category">Import Category</label>
											<select class="form-select select-dropdown-file-upload w-100"
												name="importCategory" id="uploadcategory"
												data-placeholder="Select Import Category">
												<option value="" disabled selected hidden>
													Select Import Category
												</option>
												<option value="Organisation Import">Organisation</option>
												<option value="ETLUpload">Data Upload</option>
												<option value="XLSUpload">Excel File Upload</option>
												<option value="Scorecard Import">Scorecard</option>
												<option value="Budget Import">Budget</option>
												<option value="InitiativeDataLoad">Initiatives Data Load</option>
												<option value="InitiativeBudgetLoad">Initiatives Budget Load</option>
												<option value="Initiative Import">Initiatives & Projects</option>
												<option value="Risk Import">Risk</option>
												<option value="Compliance">Compliance</option>
											</select>
										</div>
									</div>
									<div class="g-col-12 dropzone-wrapper">
										<div class="form-group dropzone-desc">
											<label for="" class="form-label" data-translate="page.orgstructure.form_items.upload_file">Upload File</label>
											<label for="login" class="upload-label upload-box">
												<div class="upload">Choose a file or drag it here.</div>
												<input type="file" id="login" class="dropzone">
											</label>
										</div>


									</div>
								</div>
								<div class="card-footer">
									<div class="d-flex justify-content-between form-line">
										<button type="button" class="btn btn-primary initative_save_btn ms-auto" data-translate="page.orgstructure.next"
											id="next-btn-1">
											Next
										</button>
									</div>
								</div>
							</div>

							<div class="card custom-card" id="file-validate" style="display: none">
								<div class="card-body grid gap-3">
									<div class="g-col-12 img-center">

										<img src="/stratroom/images/not-verified.png" alt="not-verified" />
										<div class="error-div">
											<table class="error-table">
												<thead>
													<tr>
														<th style="width: 150px" data-translate="page.orgstructure.form_items.row">Row</th>
														<th data-translate="page.orgstructure.form_items.error">Error</th>
													</tr>
												</thead>
												<tbody>

												</tbody>
											</table>
										</div>
									</div>
									<div class="card-footer">
										<div class="d-flex justify-content-between form-line">
											<button type="button" class="btn btn-label-secondary btn-default1"
												id="prev-btnerror" data-translate="page.orgstructure.previous">
												Previous
											</button>
											<!-- <button class="btn btn-primary initative_save_btn" id="next-btn-2">
					Next
				</button> -->
										</div>
									</div>


								</div>

							</div>

							<div class="card custom-card" id="file-next-btn" style="display: none">
								<div class="card-body grid gap-3">
									<div class="g-col-12">
										<div class="text-center">
											<img src="/stratroom/images/success.png" alt="Verified" width="140" />
										</div>
									</div>
								</div>
								<div class="card-footer">
									<div class="d-flex justify-content-between form-line">
										<button type="button" class="btn btn-label-secondary btn-default1" id="prev-btnone" data-translate="page.orgstructure.previous">
											Previous
										</button>
										<button class="btn btn-primary initative_save_btn" id="next-btn-2" data-translate="page.orgstructure.next">
											Next
										</button>
									</div>
								</div>
							</div>

							<div class="card custom-card" id="file-save" style="display: none">
								<div class="card-body grid gap-3">
									<div class="g-col-12">
										<div class="text-center">
											<img src="/stratroom/images/success.png" alt="Verified" width="140" />
										</div>
									</div>
								</div>

								<div class="card-footer">
									<div class="d-flex justify-content-between form-line">
										<button type="button" class="btn btn-label-secondary" id="prev-btn2" data-translate="page.orgstructure.previous">
											Previous
										</button>
										<button class="btn btn-primary initative_save_btn" id="done-btn"
											data-bs-dismiss="modal" aria-label="Close" data-translate="page.orgstructure.done">
											Done
										</button>
									</div>
								</div>
							</div>

						</div>
					</div>
				</div>
			</div>

			<!--  delete modal :::::::::::::::::::::::::::::::::::::::: -->

			<link href="assets/css/pickr.min.css" rel="stylesheet">
			<link href="assets/css/daterangepicker.min.css" rel="stylesheet">
			<link href="assets/css/jquery-ui.min.css" rel="stylesheet">
			<link href="assets/css/select2.min.css" rel="stylesheet" />

			<!-- Plugins Js -->
			<script src="js/app.min.js"></script>
			<!-- Custom Js -->
			<script type="text/javascript" src="${contextroot}/js/jquery.contextMenu.min.js"></script>
			<script type="text/javascript" src="${contextroot}/js/jquery.ui.position.js"></script>
			<script src="js/admin.js"></script>
			<script src="js/file-preview.js"></script>
			<script type="text/javascript" src="${contextroot}/js/knockout-3.5.0.js"></script>
			<script type="text/javascript" src="${contextroot}/js/daterangepicker.min.js"></script>
			<!-- Knob Js -->
			<script src="${contextroot}/js/jquery-ui.min.js"></script>
			<script src="js/moment.js"></script>
			<script src="js/pages/animated.js"></script>
			<script src="js/jquery.editable.min.js"></script>
			<script src="${contextroot}/js/bootstrap.bundle.min.js"></script>
			<script src="js/jquery-resize.js"></script>
			<script src="js/datepickerair.js"></script>
			<script src="js/datepicker.en.js"></script>
			<script src="${contextroot}/js/widgets.js"></script>
			<script src="${contextroot}/js/notify.js"></script>
			<script src="js/initial.js"></script>
			<script src="js/custom/jquery.orgchart.js"></script>
			<script src="js/custom/org_structure.js"></script>
			  <script src="js/custom/org-structure-groups.js"></script>
			<script src="${contextroot}/js/select2.min.js"></script>






			<script type="text/javascript">
				$(document).ready(function () {

					$('#org-import').on('show.bs.modal', function () {
						console.log('Modal is opening - clear data now');

						$('#uploadcategory').val('');


						$('#login').val('');

						$('#file-validate').hide();
						$("#file-save").hide();
						$("#file-next-btn").hide();
						$("#file-upload").show();

					});

					if ($("#userrolename").val() == "Super User" || $("#userrolename").val() == "Admin") {
						if ($("#userPrincipal").val() != $("#userPrincipalnavigate").val()) {
							$(".subusermenuname").text('Organization');
							$(".subuserlink").addClass("homepageHighlight");
							if ($(".topmenubreadcrumb").length) {
								$(".topmenubreadcrumb").show();
							}
							if ($(".sidebarNavigate").length) {
								$(".sidebarNavigate").show();
							}
						}
					}
					$('.orgchartuserimage').initial({ charCount: 2, height: 30, width: 30, fontSize: 18 });
					var currZoom = $("#chart-container").css("zoom");
					if (currZoom == "normal") currZoom = 1;

					$(".zoomIn").click(function () {
						currZoom *= 1.2;
						$("#chart-container").css("zoom", currZoom);
						$("#chart-container").css(
							"-moz-transform",
							"Scale(" + currZoom + ")"
						);
						$("#chart-container").css("-moz-transform-origin", "0 0");
					});
					$(".zoomOff").click(function () {
						$("#chart-container").css("zoom", 1);
						$("#chart-container").css(
							"-moz-transform",
							"Scale(" + currZoom + ")"
						);
						$("#chart-container").css("-moz-transform-origin", "0 0");
					});
					$(".zoomOut").click(function () {
						currZoom *= 0.8;
						$("#chart-container").css("zoom", currZoom);
						$("#chart-container").css(
							"-moz-transform",
							"Scale(" + currZoom + ")"
						);
						$("#chart-container").css("-moz-transform-origin", "0 0");
					});
				});

				$(document).on("keypress", ".required", function () {
					var elementVal = $(this).val();
					var currentElement = $(this);
					var spanerrorMsg = "This field is required";
					var attrID = $(currentElement).attr("id");
					var checkexistspan = $(currentElement).next().length;
					var minchar = 1;
					var maxchar = 200;
					if (attrID != undefined && attrID != "" && attrID == "email_add") {
						minchar = 6;
						maxchar = 200;
					}
					if (checkexistspan == 1) {
						$(currentElement).next().remove();
					}
					if (elementVal == undefined || elementVal == "" || elementVal == " " || elementVal == 0) {
						$(currentElement).after('<span style="color: red">' + spanerrorMsg + '</span>');
					}
					/*else if (elementVal.length != 0 && elementVal != undefined && elementVal != "" && (elementVal.length < minchar || elementVal.length >= maxchar)) {
						spanerrorMsg = "This field length should be greater than " + minchar + " and less than " + maxchar;
						$(currentElement).after('<span style="color: red">' + spanerrorMsg + '</span>');
					}*/
					else {
						if (checkexistspan == 1 && attrID != "email_add") {
							var currenttext = $(currentElement).next().text();
							$(currentElement).next().remove();
						}
					}

				}).on("keyup", ".required", function () {
					var elementVal = $(this).val();
					var currentElement = $(this);
					var spanerrorMsg = "This field is required";
					var attrID = $(currentElement).attr("id");
					var checkexistspan = $(currentElement).next().length;
					var minchar = 1;
					var maxchar = 200;
					if (attrID != undefined && attrID != "" && attrID == "email_add") {
						minchar = 6;
						maxchar = 200;
					}
					if (checkexistspan == 1) {
						$(currentElement).next().remove();
					}
					if (elementVal == undefined || elementVal == "" || elementVal == " " || elementVal == 0) {
						$(currentElement).after('<span style="color: red">' + spanerrorMsg + '</span>');
					} else if (elementVal.length != 0 && elementVal != undefined && elementVal != "" && (elementVal.length < minchar || elementVal.length >= maxchar)) {
						spanerrorMsg = "This field length should be greater than " + minchar + " and less than " + maxchar;
						$(currentElement).after('<span style="color: red">' + spanerrorMsg + '</span>');
					} else {
						if (checkexistspan == 1) {
							var currenttext = $(currentElement).next().text();
							$(currentElement).next().remove();
						}
					}
				});

				function getEmployeeObj() {
					var curr = $("#currency").find(':selected').attr('data-currency');
					var imageUpdate = $("#upload_link1").attr("src");
					if (imageUpdate == "/stratroom/images/media.png") {
						imageUpdate = "";
					}
					if ($("#upload_link1").attr("data-imageset") == "notset") {
						imageUpdate = "";
					}
					var employeeObj = {
						"id": $("#org_new_id").val(),
						"name": $("#name_add").val(),
						"title": $('#desg_add').val(),
						"dept": $("#dept_add").val(),
						"email": $("#email_add").val(),
						"phoneNumber": $("#org_phone").val(),
						//	"kpiname": $("#org_kpiname").val(),
						"location": $("#location_add").val(),
						"currency": $("#currency").val(),
						"currencySymbol": curr,
						"image": imageUpdate,
						"deptUniqueId": $("#deptuniqueid").val()
					}
					return employeeObj;
				}

				function getdeptEmployeePagesObj() {

					var employeeObj = [];

					if ($("#deptuserscorecard").val() != "") {
						employeeObj.push({
							"active": 0,
							"pageId": $("#deptuserscorecard").val(),
							"type": "SCORECARD",
							"typeName": "SCORECARD",
							"typeId": $("#deptuserscorecard").val(),
							"empId": $("#dept_emp_show_id").val()
						});
					}

					if ($("#deptuserinitiative").val() != "") {
						employeeObj.push({
							"active": 0,
							"pageId": $("#deptuserinitiative").val(),//$("#userinitiative").find(':selected').data('pageid')
							"type": "INITIATIVE",
							"typeName": "INITIATIVE",
							"typeId": $("#deptuserinitiative").val(),
							"empId": $("#dept_emp_show_id").val()
						});
					}

					if ($("#deptuserkpi").val() != "") {
						employeeObj.push({
							"active": 0,
							"pageId": $("#deptuserkpi").find(':selected').data('pageid'),
							"type": "KPI",
							"typeName": "KPI",
							"typeId": $("#deptuserkpi").val(),
							"empId": $("#dept_emp_show_id").val()
						});
					}

					if ($("#deptuserrisk").val() != "") {
						employeeObj.push({
							"active": 0,
							"pageId": $("#deptuserrisk").val(),
							"type": "RISK",
							"typeName": "RISK",
							"typeId": $("#deptuserrisk").val(),
							"empId": $("#dept_emp_show_id").val()
						});
					}

					return employeeObj;
				}


				function getNewEmployeeObj() {
					var imagesrc = $("#upload_link2").attr("src");
					if (imagesrc == "/stratroom/images/media.png") {
						imagesrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABABAMAAABYR2ztAAAAIVBMVEXMzMyWlpbFxcWjo6O+vr63t7ecnJyqqqqbm5uxsbGampoKZyAaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAU0lEQVRIiWNgGAWjYBQMd8Bk7KCITGMAZqeAQgZ2zwAwjQ2wmYU6ArVDaGyA0aWTkYHBFEpjM0FpoaABUzGExqaAJdmBkYFdNQBMj4JRMAoGOwAAPNIL2qWeApgAAAAASUVORK5CYII=";
						imagesrc = "";
					}
					if ($("#upload_link2").attr("data-imageset") == "notset") {
						imageUpdate = "";
					}
					var employeeObj = {
						"name": $("#name_add1").val(),
						"title": $('#desg_add1').val(),
						"dept": $("#dept_add1").val(),
						"deptUniqueId": $("#dept_id_add1").val(),
						//"kpiname": $("#kpi_name_add1").val(),
						"kpiname": "",
						"email": $("#email_add1").val(),
						"location": $("#location_add1").val(),
						"image": imagesrc

					}
					return employeeObj;
				}

				function updateformvalidationerrorreset() {
					$("#edit_org_structure_form span[style='color: red']").each(function () {
						$(this).not("#emailerrorshow").remove();
					});
					$("#emailerrorshow").hide();
				}

				function updateEmployee() {
					//console.log($("#upload_link1").attr("src"));
					updateformvalidationerrorreset();
					var employeeObj = getEmployeeObj();
					var validationFlag = formvalidationorg("#edit_org_structure_form");
					var emailaddress = $("#email_add").val();
					if (emailaddress == "" || emailaddress == undefined || emailaddress == " " || emailaddress == 0) {
						$("#emailerrorshow").css('display', 'block').html("This field is required");
						validationFlag = true;
					} else {
						$("#emailerrorshow").css('display', 'none').html("");
					}

					if (validationFlag == true) {
						return false;
					}
					/*var drogdropid 	=	$("#currentimgdivid").val();
					if(drogdropid !=	undefined && drogdropid !=	""){
						$("div #"+drogdropid).find(".org_box_top img").attr('src',employeeObj.image);
					}*/
					var emailaddress = $("#email_add").val();
					if (emailaddress != "" && emailaddress != undefined && emailaddress != " " && emailaddress != 0) {
						if (!validateEmail(emailaddress)) {
							$("#emailerrorshow").css('display', 'block').html("Please enter valid emailAddress");
							return false;
						} else {
							$("#emailerrorshow").css('display', 'none').html("");
						}
					}

					var methodType = 'post';
					$.ajax({
						url: "/stratroom/editEmployee/",
						type: methodType,
						contentType: "application/json",
						data: JSON.stringify(employeeObj),
						success: function (data, status) {
							location.reload(true);
							//updateemployeeaftercall(employeeObj.image,employeeObj.id);
							$("#close-org-aside").click();
						},
						error: readErrorMsg
					});
				}

				function getEmployeePagesObj() {

					var employeeObj = [];

					if ($("#userscorecard").val() != "") {
						employeeObj.push({
							"active": 0,
							"pageId": $("#userscorecard").val(),
							"type": "SCORECARD",
							"typeName": "SCORECARD",
							"typeId": $("#userscorecard").val(),
							"empId": $("#emp_show_id").val()
						});
					}

					if ($("#userinitiative").val() != "") {
						employeeObj.push({
							"active": 0,
							"pageId": $("#userinitiative").val(),//$("#userinitiative").find(':selected').data('pageid')
							"type": "INITIATIVE",
							"typeName": "INITIATIVE",
							"typeId": $("#userinitiative").val(),
							"empId": $("#emp_show_id").val()
						});
					}

					if ($("#userkpi").val() != "") {
						employeeObj.push({
							"active": 0,
							"pageId": $("#userkpi").find(':selected').data('pageid'),
							"type": "KPI",
							"typeName": "KPI",
							"typeId": $("#userkpi").val(),
							"empId": $("#emp_show_id").val()
						});
					}

					if ($("#userrisk").val() != "") {
						employeeObj.push({
							"active": 0,
							"pageId": $("#userrisk").val(),
							"type": "RISK",
							"typeName": "RISK",
							"typeId": $("#userrisk").val(),
							"empId": $("#emp_show_id").val()
						});
					}

					return employeeObj;
				}

				function updatePageEmployee() {
					//updateformvalidationerrorreset();
					var employeeObj = getEmployeePagesObj();

					var methodType = 'post';
					$.ajax({
						url: "/stratroom/pageLink/",
						type: methodType,
						contentType: "application/json",
						data: JSON.stringify(employeeObj),
						success: function (data, status) {
							location.reload(true);
							//updateemployeeaftercall(employeeObj.image,employeeObj.id);
							$("#close-org-aside").click();
						},
						error: readErrorMsg
					});
				}


				$(document).on('keydown', function (e) {
					if (e.keyCode == 27) { // ESC
						$("#close-org-aside").click();
					}
				});

				$("#editorgdeptid").on('keypress focusout blur', function () {
					$("#deptiduniqeueerrorshow").hide();
					if ($(this).prop("readonly")) {
						return false;
					}
					var deptuniname = $(this).val();
					var currentElement = $(this);
					var checkexistspan = $(currentElement).next().length;
					if (checkexistspan == 1 && (deptuniname == "" || deptuniname == undefined || deptuniname == " " || deptuniname == 0)) {
						$(currentElement).next().text('');
					}

					if (deptuniname != "" && deptuniname != undefined) {
						var addBtn = $(".dept_struct_add_btn");
						$(addBtn).attr("disabled", true).css("cursor", "not-allowed");

						$.ajax({
							url: "findByDeptUniqueId?deptUniqueId=" + deptuniname,
							contentType: "application/json",
							async: false,
							success: function (data) {
								if (data.status != "Active" && data.status != "") {
									$(addBtn).removeAttr("disabled").css("cursor", "pointer");
									$("#deptiduniqeueerrorshow").hide();
									//$("#editorgdeptid").next().append('<span id="deptiduniqeueerrorshow" style="color: red; display: none"></span>');
									//$("#deptiduniqeueerrorshow").css('display', 'none').html("");
								} else {
									$(".editdeptidSelect").append('<p id="deptiduniqeueerrorshow" style="color:red">Dept Id is already taken</p>');
								}
							}
						});
					}
				});

				/*$("#dept_id_add1").on('keypress focusout blur', function () {
					$("#employeedepterrorshow1").hide();
					
					var deptuniname = $(this).val();
					var currentElement = $(this);
					var checkexistspan = $(currentElement).next().length;
					if (checkexistspan == 1 && (deptuniname == "" || deptuniname == undefined || deptuniname == " " || deptuniname == 0)) {
						$(currentElement).next().text('');
					}
		
					if (deptuniname != "" && deptuniname != undefined) {
						var addBtn = $("#add-org-object");
						$(addBtn).attr("disabled", true).css("cursor", "not-allowed");
						$("#employeedepterrorshow1").show();
						$.ajax({
							url: "findByDeptUniqueId?deptUniqueId=" + deptuniname,
							contentType: "application/json",
							async: false,
							success: function (data) {
								if (data.status != "Active" && data.status != "") {
									$(addBtn).removeAttr("disabled").css("cursor", "pointer");
									$("#employeedepterrorshow1").css('display', 'none').html("");
								} else {
									$("#employeedepterrorshow1").html("Dept Id is already taken");
								}
							}
						});
					}
				});*/


				$(document).on('blur', "#email_add", function () {
					var emailAddredd = $(this).val();
					var currentElement = $(this);
					var empId = $("#org_new_id").val();
					var checkexistspan = $(currentElement).next().length;
					if (checkexistspan == 1 && (emailAddredd == "" || emailAddredd == undefined || emailAddredd == " " || emailAddredd == 0)) {
						$(currentElement).next().text('');
					}

					if (emailAddredd != "" && emailAddredd != undefined) {
						var addBtn = $("#edit-org-object");
						$(addBtn).attr("disabled", true).css("cursor", "not-allowed");
						$("#emailerrorshow").css('display', 'block');
						$.ajax({
							url: "checkEmail?email=" + emailAddredd + "&empId=" + empId,
							contentType: "application/json",
							async: false,
							success: function (data) {
								if (data.success != undefined && data.success != "") {
									$(addBtn).removeAttr("disabled").css("cursor", "pointer");
									$("#emailerrorshow").css('display', 'none').html("");
								} else {
									$("#emailerrorshow").css('display', 'block').html("Email address is already taken");
								}
							}
						});
					}
				});

				$(document).on('blur', "#email_add1", function () {
					var emailAddredd = $(this).val();
					var currentElement = $(this);
					var empId = $("#org_new_id1").val();
					var checkexistspan = $(currentElement).next().length;
					if (checkexistspan == 1 && (emailAddredd == "" || emailAddredd == undefined || emailAddredd == " " || emailAddredd == 0)) {
						$(currentElement).next().text('');
					}

					if (emailAddredd != "" && emailAddredd != undefined) {
						var addBtn = $("#add-org-object");
						$(addBtn).attr("disabled", true).css("cursor", "not-allowed");
						$("#emailerrorshow1").css('display', 'block');
						$.ajax({
							url: "checkEmail?email=" + emailAddredd + "&empId=" + empId,
							contentType: "application/json",
							async: false,
							success: function (data) {
								if (data.success != undefined && data.success != "") {
									$(addBtn).removeAttr("disabled").css("cursor", "pointer");
									$("#emailerrorshow1").css('display', 'none').html("");
								} else {
									$("#emailerrorshow1").css('display', 'block').html("Email address is already taken");
								}
							}
						});
					}
				});

				$(".dept_struct_add_btn").mouseover(function () {
					if ($("#orgdept").is(":focus")) {
						$("#orgdept").trigger("blur");
					}
					if ($("#editorgdeptid").is(":focus")) {
						$("#editorgdeptid").trigger("blur");
					}
					if ($("#deptiduniqeueerrorshow").css('display') == "none") {
						$(".dept_struct_add_btn").attr("disabled", true).css("cursor", "not-allowed");
					}
				});

				/*$(document).on('blur', "#orgdept", function () {
					var emailAddredd = $(this).val();
					var currentElement = $(this);
					//var empId = $("#org_new_id1").val();
					var checkexistspan = $(currentElement).next().length;
					if (checkexistspan == 1 && (emailAddredd == "" || emailAddredd == undefined || emailAddredd == " " || emailAddredd == 0)) {
						$(currentElement).next().text('');
					}
		
					if (emailAddredd != "" && emailAddredd != undefined) {
						var addBtn = $(".dept_struct_add_btn");
						$(addBtn).attr("disabled", true).css("cursor", "not-allowed");
						$.ajax({
							url: "checkDept?deptName=" + emailAddredd,
							contentType: "application/json",
							async: false,
							success: function (data) {
								if (data.success != undefined && data.success != "") {
									$(addBtn).removeAttr("disabled").css("cursor", "pointer");
									$(this).next().remove();
								} else {
									$("#orgdept").after('<span style="color: red">Department is already taken</span>');
								}
							}
						});
					}
				});*/

				$("#edit-org-object").mouseover(function () {
					if ($("#email_add").is(":focus")) {
						$("#email_add").trigger("blur");
					}
				});

				$("#add-org-object").mouseover(function () {
					if ($("#email_add1").is(":focus")) {
						$("#email_add1").trigger("blur");
					}
					if ($("#dept_id_add1").is(":focus")) {
						$("#dept_id_add1").trigger("blur");
					}
					if ($("#employeedepterrorshow1").css('display') != "none") {
						$("#add-org-object").attr("disabled", true).css("cursor", "not-allowed");
					}
				});

				/*$("#email_add").blur(function(){
					if($("#email_add").val().length >= 6){
						if($("#email_add").is(":focus")){
							$("#email_add").trigger("blur");
						}
					}
				});*/

				function formvalidationorg(formElement) {
					var validationFlag = false;
					$(formElement + " .required").each(function (index, value) {
						var spanerrorMsg = "This field is required";
						var elementVal = $(this).val();
						var currentElement = $(this);
						var attrID = $(currentElement).attr("id");
						var checkexistspan = $(currentElement).next().length;
						var minchar = 3;
						var maxchar = 200;
						/*if(checkexistspan 	==	1){
							$(currentElement).next().remove();
						}*/

						if (attrID != undefined && attrID != "" && attrID == "email_add") {
							minchar = 6;
							maxchar = 200;
						}

						if (elementVal == undefined || elementVal == "" || elementVal == " " || elementVal == 0) {
							$(currentElement).after('<span style="color: red">' + spanerrorMsg + '</span>');
							validationFlag = true;
						}
						/*else if (elementVal.length != 0 && elementVal != undefined && elementVal != "" && (elementVal.length < minchar || elementVal.length >= maxchar)) {
							spanerrorMsg = "This field length should be greater than " + minchar + " and less than " + maxchar;
							$(currentElement).after('<span style="color: red">' + spanerrorMsg + '</span>');
							validationFlag = true;
						}*/
						else {
							if (checkexistspan == 1 && attrID != "email_add") {
								$(currentElement).next().remove();
							}
						}

					});
					return validationFlag;
				}

				function addformvalidationerrorreset() {
					$("#add_org_structure_form span[style='color: red']").each(function () {
						$(this).not("#emailerrorshow1").remove();
					});
					$("#emailerrorshow1").hide();
				}


				function getNewdeptEmployeeObj() {
					var imagesrc = $("#upload_link_dept").attr("src");
					if (imagesrc == "/stratroom/images/media.png") {
						imagesrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABABAMAAABYR2ztAAAAIVBMVEXMzMyWlpbFxcWjo6O+vr63t7ecnJyqqqqbm5uxsbGampoKZyAaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAU0lEQVRIiWNgGAWjYBQMd8Bk7KCITGMAZqeAQgZ2zwAwjQ2wmYU6ArVDaGyA0aWTkYHBFEpjM0FpoaABUzGExqaAJdmBkYFdNQBMj4JRMAoGOwAAPNIL2qWeApgAAAAASUVORK5CYII=";
						imagesrc = "";
					}
					if ($("#upload_link_dept").attr("data-imageset") == "notset") {
						imagesrc = "";
					}
					var dept = "";
					if ($("#deptmode").val() == "add") {
						dept = $("#orgdept").val();
					} else {
						//dept	=	$("#editorgdept option:selected").text();
						dept = $("#editorgdept").val();
					}

					var employeeObj = {
						"owner": $("#ownername").val(),
						"empIdList": $(".userdept-name-multi-selectadd").val(),
						"scorecardPageId": $('#deptuserscorecard').val(),
						"initiativePageId": $("#deptuserinitiative").val(),
						"kpiId": $("#deptuserkpi").val(),
						"riskPageId": $("#deptuserrisk").val(),
						"emailAddress": $("#deptemailadd").val(),
						"deptParentId": $("#dept_parentid").val() ? $("#dept_parentid").val() : 0,
						"deptUniqueId": $("#editorgdeptid").val(),
						"deptName": dept,
						"deptImage": imagesrc

					}
					return employeeObj;
				}

				function createEmployee() {
					addformvalidationerrorreset();
					var validationFlag = formvalidationorg("#add_org_structure_form");
					var emailaddress = $("#email_add1").val();
					if (emailaddress == "" || emailaddress == undefined || emailaddress == " " || emailaddress == 0) {
						$("#emailerrorshow1").css('display', 'block').html("This field is required");
						validationFlag = true;
					} else {
						$("#emailerrorshow1").css('display', 'none').html("");
					}

					if (validationFlag == true) {
						return false;
					}

					var emailaddress = $("#email_add1").val();
					if (emailaddress != "" && emailaddress != undefined && emailaddress != " " && emailaddress != 0) {
						if (!validateEmail(emailaddress)) {
							$("#emailerrorshow1").css('display', 'block').html("Please enter valid emailAddress");
							return false;
						} else {
							$("#emailerrorshow1").css('display', 'none').html("");
						}
					}

					var employeeObj = getNewEmployeeObj();
					employeeObj.pid = $("#org_new_id").val();
					var methodType = 'post';

					$.ajax({
						url: "/stratroom/createEmployee/",
						type: methodType,
						contentType: "application/json",
						data: JSON.stringify(employeeObj),
						success: function (data, status) {
							//console.log("employee hass been created..");
							location.reload(true);
							//callaftercreatedemployee(employeeObj.image, data.employeeId);
							//$("#close-org-aside1").click();
						},
						error: readErrorMsg
					});
				}

				function adddeptformvalidationerrorreset() {
					$("#add_dept_structure_form span[style='color: red']").each(function () {
						$(this).remove();
					});
					$("#deptemailerrorshow1").hide();
				}

				function deptformvalidationorg(formElement) {
					var validationFlag = false;
					$(formElement + " .required").each(function (index, value) {
						var spanerrorMsg = "This field is required";
						var elementVal = $(this).val();
						var currentElement = $(this);
						var attrID = $(currentElement).attr("id");
						var checkexistspan = $(currentElement).next().length;
						var minchar = 3;
						var maxchar = 200;

						if (attrID != undefined && attrID != "" && attrID == "deptemailadd") {
							minchar = 6;
							maxchar = 200;
						}

						if ((elementVal == undefined || elementVal == "" || elementVal == " " || elementVal == 0) && (!$(this).hasClass("owner-name") && !$(this).hasClass("userdept-name-multi-select"))) {
							$(currentElement).after('<span style="color: red">' + spanerrorMsg + '</span>');
							validationFlag = true;
						}
						/*else if (elementVal.length != 0 && elementVal != undefined && elementVal != "" && (elementVal.length < minchar || elementVal.length >= maxchar)) {
							spanerrorMsg = "This field length should be greater than " + minchar + " and less than " + maxchar;
							$(currentElement).after('<span style="color: red">' + spanerrorMsg + '</span>');
							validationFlag = true;
						}*/

						if ((elementVal == undefined || elementVal == "" || elementVal == " " || elementVal == 0) && ($(this).hasClass("owner-name"))) {
							$(currentElement).next().after('<span style="color: red">' + spanerrorMsg + '</span>');
							validationFlag = true;
						}

						if ((elementVal == undefined || elementVal == "" || elementVal == " " || elementVal == 0) && $(this).hasClass("editdeptelem")) {
							$(currentElement).next().after('<span style="color: red">' + spanerrorMsg + '</span>');
							validationFlag = true;
						}

						if ((elementVal == undefined || elementVal == "" || elementVal == " " || elementVal == 0) && $(this).hasClass("userdept-name-multi-select")) {
							$(currentElement).next().after('<span style="color: red">' + spanerrorMsg + '</span>');
							validationFlag = true;
						}


						/*if((elementVal == undefined || elementVal == "" || elementVal == " " || elementVal == 0) && $(this).hasClass("userdept-name-multi-select")){
							$(".userdept-name-multi-select").next().after('<span style="color: red">' + spanerrorMsg + '</span>');
							validationFlag = true;
						}*/
					});
					return validationFlag;
				}

				function createdeptEmployee() {
					adddeptformvalidationerrorreset();
					if ($("#orgdept").is(":visible") == true) {
						$("#deptmode").val('add');
					} else {
						$("#deptmode").val('edit');
					}
					var validationFlag = deptformvalidationorg("#add_dept_structure_form");

					/*var emailaddress = $("#deptemailadd").val();
					if (emailaddress == "" || emailaddress == undefined || emailaddress == " " || emailaddress == 0) {
						$("#deptemailerrorshow1").css('display', 'block').html("This field is required");
						validationFlag = true;
					} else {
						$("#deptemailerrorshow1").css('display', 'none').html("");
					}*/

					if (validationFlag == true) {
						return false;
					}

					var employeeObj = getNewdeptEmployeeObj();
					if ($("#deptmode").val() == "add") {
						if (employeeObj.deptParentId == undefined || employeeObj.deptParentId == "" || employeeObj.deptParentId == null) {
							$.notify("Department Parent id is missing", {
								style: 'success',
								className: 'graynotify'
							});
							return false;
						}
					}


					var methodType = 'post';
					/*if($("#dept_new_id1").val() !=	""){
						methodType = 'put';
					}*/

					if ($("#deptmode").val() == "edit") {
						methodType = 'put';
						employeeObj.deptId = $("#updatedeptId").val();
					}

					console.log(employeeObj, "employeeObj");

					$.ajax({
						url: "/stratroom/addDepartmentMapping",
						type: methodType,
						contentType: "application/json",
						data: JSON.stringify(employeeObj),
						success: function (data, status) {
							console.log(JSON.stringify(employeeObj));
							console.log("dept hass been created..");
							//	location.reload(true);
							/*if($("#deptmode") == "add"){
								callafterdeptcreatedemployee(employeeObj.image, data.deptId);
							}else{
								updatedeptaftercall(employeeObj.image, data.deptId);
							}*/
							$("#close-dept-aside1").click();
							location.reload(true);
						},
						error: readErrorMsg
					});
				}

				function validateEmail(email) {
					var regexPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
					return regexPattern.test(String(email).toLowerCase());
				}

			</script>
			<script src="${contextroot}/js/chosen.jquery.min.js"></script>
			<script type="text/javascript" src="${contextroot}/js/notify.js"></script>

			<script src="${contextroot}/js/initial.js"></script>
			<script src="js/custom/file_upload_new.js"></script>


			<script type="text/javascript">

				var script = document.createElement("script");
				script.type = "text/javascript";
				script.src = "https://api.ipify.org?format=jsonp&callback=DisplayIP";
				//script.src = "http://jsonip.com?callback=DisplayIP";
				script.crossorigin = "anonymous";
				document.getElementsByTagName("head")[0].appendChild(script);

				function DisplayIP(response) {
					localStorage.setItem('systemip', response.ip)
				}



				// var toggler = document.getElementsByClassName("caret");
				// var i;

				// for (i = 0; i < toggler.length; i++) {
				//   toggler[i].addEventListener("click", function () {
				//     this.parentElement.querySelector(".nested").classList.toggle("active");
				//     this.classList.toggle("caret-down");
				//   });
				// }

			</script>

			<script>
					var parentHeader = "Parent";
					var ownerHeader = "Owner";
					var deptHeader = "Department";
					var emailHeader = "Email";
					var pagesHeader = "Pages";
					var fromDateHeader = "From Date";
					var toDateHeader = "To Date";
				$(function () {
					function updateSortableEmptyState() {
						$(".nested-area").each(function () {
							if ($(this).children(".nested-item").length == 0) {
								if ($(this).find("li.sortable-empty").length == 0) {
									$(this).prepend('<li class="sortable-empty"></li>'); // Change append → prepend
								}
							}
						});
					}

					// Initial check for empty lists
					updateSortableEmptyState();

					$(".nested-area").sortable({
						items: "> .nested-item:not(.non-draggable-parent)", // Allow sorting for draggable items only
						handle: ".org-box", // Handle for dragging
						connectWith: ".nested-area", // Allow connected sorting between nested areas
						placeholder: "ui-sortable-placeholder", // Placeholder during sorting

						start: function (event, ui) {
							ui.item.addClass("dragging-highlight");

							// Check and update sortable-empty class for the source list
							updateSortableEmptyState();
						},

						stop: function (event, ui) {
							ui.item.removeClass("dragging-highlight");

							// Check and update sortable-empty class for the target list
							updateSortableEmptyState();
						},

						receive: function (event, ui) {
							$(this).find("li.sortable-empty").remove();
						},

						update: function () {
							updateSortableEmptyState();
						},

						over: function (event, ui) {
							let $parent = ui.placeholder.parent();
							if ($parent.children(".nested-item:not(.ui-sortable-placeholder)").length == 0) {
								if ($parent.find("li.sortable-empty").length == 0) {
									$parent.prepend('<li class="sortable-empty"></li>'); // Change append → prepend
								}

							}
						},

						out: function (event, ui) {
							let $parent = ui.placeholder.parent();
							if ($parent.children(".nested-item:not(.ui-sortable-placeholder)").length == 0) {
								$parent.find("li.sortable-empty").remove();
							}
						}
					});

					// Prevent dragging for non-draggable items explicitly
					// $(".nested-item.non-draggable").on("mousedown", function (e) {
					//   e.stopPropagation(); // Prevent dragging
					// });
				});


				$("#boardTypeEdit").select2({
					width: '100%',
					placeholder: "Select Department",
					// //allowClear: true,
					// dropdownParent: $('#add-user')
				});



				//Update Employee Dept
				function updateEmployeeDept() {
					
					const payload = {
						owner: $("#ownernameValue").val(),
						empIdList: $(".userdept-name-multi-select").val(),
						scorecardPageId: $('#deptuserscorecardValue').val(),
						initiativePageId: $("#deptuserinitiativeValue").val(),
						kpiId: $("#deptuserkpiValue").val(),
						riskPageId: $("#deptuserriskValue").val(),
						emailAddress: $("#emialIdValue").val(),
						deptParentId: $("#dept_parentid").val() ? $("#dept_parentid").val() : 0,
						deptUniqueId: $("#editorgdeptidValue").val(),
						deptName: $("#editorgdept").val(),
						deptImage: "",
						deptId: $("#updatedeptId").val()
					}

					console.log(payload, "payload");

					$.ajax({
						url: "/stratroom/addDepartmentMapping",
						type: "put",
						contentType: "application/json",
						data: JSON.stringify(payload),
						success: function (data, status) {
							console.log("dept hass been created..");

							$("#close-dept-aside1").click();
							location.reload(true);
						},
						error: readErrorMsg
					});
				}


				$(document).on('click', '#done-btn', function () {
					location.reload(true);
				});


				function handleOrgView() {
					
					console.log("function clicked");
					var daterange2 = $("#datePeriod").val();

					$.ajax({
						url: "/stratroom/allDepartmentListByLoginUser",
						type: "GET",
						data: { datePeriod: daterange2 },
						success: function (data) {
							console.log(data, "dataggggg");

							if (data.length > 0) {

								var html = '';

								html += '<div id="dropdownMenuButtonWrap" >';
								html += '<ul class="dropdown-menu" id="v-pills-tab" role="tablist" aria-orientation="vertical">';

								for (var i = 0; i < data.length; i++) {
									var deptName = data[i].name;
									var deptId = data[i].deptID;
									var safeId = "v-pills-" + deptName.replace(/[^a-zA-Z0-9]/g, '').toLowerCase() + "-tab"; // Sanitize for ID
									var targetId = "#v-pills-" + deptName.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

									console.log(deptName, deptId, "deptIdData");

									html += '<button class="card nav-link" id="' + safeId + '" data-bs-toggle="pill" ';
									html += 'data-bs-target="' + targetId + '" type="button" role="tab" aria-controls="' + targetId.substring(1) + '" ';
									html += 'aria-selected="false" ';
									html += 'onclick="handleDepartmentClick(\'' + deptName.replace(/'/g, "\\'") + '\', \'' + deptId + '\')">';
									html += '<span class="nav-text">' + deptName + '</span>';
									html += '</button>';
								}

								html += '</ul>';
								html += '</div>';


								$("#org-tracker-tabs").empty().append(html);


								var orgModal = new bootstrap.Modal(document.getElementById('org-view'));
								orgModal.show();
							}
						},
						error: function (xhr, status, err) {
							console.error("Error fetching department list:", err);
							$("#v-pills-tab").html('<div class="text-danger px-3">Failed to load data</div>');

							openOrgModalWithContent([]);
						}
					});
				}





			</script>


<script>
	 // Simple standalone toggle button handler
    $(document).on('click', '.toggle-org-view', function () {
        // Get current view from data attribute or default to 'tree'
        let currentViewState = $(this).data('view') || 'tree';

        // Toggle the view
        currentViewState = currentViewState === 'tree' ? 'grid' : 'tree';

		console.log(currentViewState, "currentViewState");

        // Update the data attribute
        $(this).data('view', currentViewState);
        currentView = currentViewState;

        if (currentViewState === 'tree') {
          // Show tree view, hide grid view
          $('#tree-view-container').removeClass('d-none');
          $('#grid-view-container').addClass('d-none');

          // Update tooltip
          $(this).find('span')
            .attr('data-bs-title', 'Switch to Grid View')
            .attr('title', 'Switch to Grid View');

          // Update icon
          $(this).find('.org-view-icon')
            .attr('data-lucide', 'list-tree');

        } else {
          // Show grid view, hide tree view
          $('#grid-view-container').removeClass('d-none');
          $('#tree-view-container').addClass('d-none');

          // Update tooltip
          $(this).find('span')
            .attr('data-bs-title', 'Switch to Tree View')
            .attr('title', 'Switch to Tree View');

          // Update icon
          $(this).find('.org-view-icon')
            .attr('data-lucide', 'layout-grid');
        }

        // Reinitialize Lucide icons
        if (window.lucide) {
          lucide.createIcons();
        }

        // Reinitialize Bootstrap tooltips
        $(this).find('span').each(function () {
          const tooltip = bootstrap.Tooltip.getInstance(this);
          if (tooltip) {
            tooltip.dispose();
          }
          new bootstrap.Tooltip(this);
        });

        // If you have filter logic, apply it
        if (typeof applyCurrentFilter === 'function') {
          applyCurrentFilter();
        }
      });


	function applyCurrentFilter() {
        // let filteredData = orgData;
        // const searchText = currentFilter.searchText;

        // if (searchText) {
        //   filteredData = filterTreeData(orgData, searchText, currentFilter.field);
        // }

        // if (currentView === 'tree') {
        //   loadTreeView(filteredData, searchText);
        // } else {
        //   loadGridView(filteredData, searchText);
        // }

        // updateSearchResultsCount(filteredData, searchText);
      }



	function filterTreeData(data, searchText, field) {
        if (!searchText) return data;

        const searchLower = searchText.toLowerCase();

        function filterNode(node) {
          // Check if node matches search criteria
          const matches =
            (field === 'all' || field === 'name') && node.name.toLowerCase().includes(searchLower) ||
            (field === 'all' || field === 'department') && node.department.toLowerCase().includes(searchLower) ||
            (field === 'all' || field === 'designation') && node.designation.toLowerCase().includes(searchLower) ||
            (field === 'all' || field === 'location') && node.location.toLowerCase().includes(searchLower);

          // Filter children
          let filteredChildren = [];
          if (node.children && node.children.length > 0) {
            node.children.forEach(child => {
              const filteredChild = filterNode(child);
              if (filteredChild) {
                filteredChildren.push(filteredChild);
              }
            });
          }

          // Include node if it matches or has matching children
          if (matches || filteredChildren.length > 0) {
            return {
              ...node,
              children: filteredChildren
            };
          }

          return null;
        }

        return data.map(node => filterNode(node)).filter(node => node !== null);
      }
</script>





<script>
	$(document).ready(function () {

    // Modal open అయినప్పుడు
    $('#add-group').on('shown.bs.modal', function () {
        $('#groupTabsContent').show();   // display:none remove
    });

    // Modal close అయినప్పుడు
    $('#add-group').on('hidden.bs.modal', function () {
        $('#groupTabsContent').hide();   // display:none apply
    });

});

</script>
		</body>
