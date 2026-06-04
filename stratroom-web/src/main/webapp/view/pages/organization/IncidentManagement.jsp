<!DOCTYPE html>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:set var="contextroot" value="${pageContext.request.contextPath}" />
<link href="assets/css/dataTables.bootstrap5.min.css" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
	
	<script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=Edge">
<meta content="width=device-width, initial-scale=1" name="viewport" />
<title>StratRoom</title>


<style>
  #registryTabs {
  border-bottom: none !important;
  gap: 0 !important;
  margin-bottom: -1px;
}
.bar-wrap {
  height: 5px;
  background: var(--stratroom-secondary-bg);
  border-radius: 3px;
  flex: 1;
  margin: 0 8px;
}
#registryTabs .nav-item .nav-link {
  color: var(--stratroom-secondary-color);
  background: transparent !important;
  border-radius: 0;
  border: none;
  font-weight: 500 !important;
  border-bottom: 2px solid transparent !important;
  transition: all 0.2s ease;
}
#registryTabs .nav-item .nav-link:hover {
  color: var(--stratroom-primary) !important;
  background: rgba(123, 45, 139, 0.02) !important;
}
#registryTabs .nav-item .nav-link.active {
  color: var(--stratroom-primary) !important;
  background: transparent !important;
  border-bottom: 2px solid var(--stratroom-primary) !important;
}
.inc-form-wizard {
  border-radius: 10px;
}
.inc-form-wizard .form-group {
  margin-bottom: 11px;
}
.inc-form-wizard .form-group label {
  display: block;
  font-size: 11px;
  color: rgba(var(--stratroom-body-color-rgb), 0.5);
  margin-bottom: 4px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}
.inc-form-wizard .form-group input,
.inc-form-wizard .form-group select,
.inc-form-wizard .form-group textarea {
  width: 100%;
  padding: 8px 10px;
  border: 1px solid var(--stratroom-border-color);
  border-radius: 8px;
  font-size: 12px;
  color: var(--stratroom-body-color);
  outline: none;
  background: var(--stratroom-body-bg);
}
.inc-form-wizard .form-group input:focus,
.inc-form-wizard .form-group select:focus,
.inc-form-wizard .form-group textarea:focus {
  border-color: var(--stratroom-primary);
}
.inc-form-wizard .form-group textarea {
  resize: vertical;
  min-height: 60px;
}
.inc-form-wizard .form-row2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}
.inc-form-wizard .form-row3 {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
}
.inc-form-wizard .form-actions {
  display: flex;
  gap: 8px;
  justify-content: space-between;
  align-items: center;
  padding-top: 14px;
  border-top: 1px solid var(--stratroom-border-color);
  margin-top: 14px;
}
.inc-form-wizard .form-actions-right {
  display: flex;
  gap: 8px;
}
.inc-form-wizard .form-actions button {
  padding: 7px 16px;
  border-radius: 7px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
}
.inc-form-wizard .btn-cancel-form,
.inc-form-wizard .btn-back-form,
.inc-form-wizard .btn-draft-form {
  background: var(--stratroom-body-bg);
  border: 1px solid var(--stratroom-border-color);
  color: var(--stratroom-secondary-color);
}
.inc-form-wizard .btn-next-form {
  background: var(--stratroom-primary);
  border: none;
  color: var(--stratroom-body-bg);
}
.inc-form-wizard .btn-save-form {
  background: var(--stratroom-success);
  border: none;
  color: var(--stratroom-body-bg);
}
.inc-form-wizard .wizard-progress {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
  margin-top: 10px;
  background-color: transparent;
  padding: 0 10px;
}
@media (max-width: 768px) {
  .inc-form-wizard .wizard-progress {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    padding: 0 15px;
  }
}
.inc-form-wizard .prog-step {
  display: flex;
  align-items: center;
  gap: 12px;
}
.inc-form-wizard .prog-step .prog-dot {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid var(--stratroom-border-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  color: var(--stratroom-secondary-color);
  background: var(--stratroom-body-bg);
  transition: all 0.25s;
}
.inc-form-wizard .prog-step.active .prog-dot {
  background: var(--stratroom-primary);
  color: var(--stratroom-body-bg);
  border-color: var(--stratroom-primary);
}
.inc-form-wizard .prog-step.active .prog-label {
  color: var(--stratroom-primary);
  font-weight: 600;
}
.inc-form-wizard .prog-step.done .prog-dot {
  background: var(--stratroom-body-bg);
  color: var(--stratroom-primary);
  border-color: var(--stratroom-primary);
}
.inc-form-wizard .prog-step.done .prog-label {
  color: var(--stratroom-primary);
  font-weight: 500;
}
.inc-form-wizard .prog-label {
  color: rgba(var(--stratroom-body-color-rgb), 0.6);
  font-size: 12px;
  white-space: nowrap;
}
.inc-form-wizard .prog-line {
  flex: 1;
  height: 1px;
  background: var(--stratroom-border-color);
  margin: 0 16px;
  transition: background 0.25s;
}
.inc-form-wizard .prog-line.done {
  background: var(--stratroom-primary);
}
@media (max-width: 768px) {
  .inc-form-wizard .prog-line {
    display: none;
  }
}
.inc-form-wizard .section-lbl {
  font-size: 10px;
  font-weight: 700;
  color: rgba(var(--stratroom-body-color-rgb), 0.6);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 20px 0 15px;
  padding-bottom: 6px;
  border-bottom: 1px solid var(--stratroom-border-color);
}
.inc-form-wizard .step-panel {
  display: none;
}
.inc-form-wizard .step-panel.active {
  display: block;
}
.inc-form-wizard .field-error {
  border-color: var(--stratroom-danger) !important;
}
.inc-form-wizard .error-msg {
  font-size: 10px;
  color: var(--stratroom-danger);
  margin-top: 3px;
  display: none;
}
.inc-form-wizard .error-msg.show {
  display: block;
}
.inc-form-wizard .assignee-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 6px;
}
.inc-form-wizard .assignee-chip {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 4px 10px;
  background: var(--stratroom-secondary-bg);
  border-radius: 100px;
  font-size: 11px;
  font-weight: 500;
  border: 1px solid var(--stratroom-border-color);
  cursor: pointer;
  transition: all 0.15s;
}
.inc-form-wizard .assignee-chip.selected {
  background: var(--stratroom-primary-bg-subtle);
  color: var(--stratroom-primary-text-emphasis);
  border-color: var(--stratroom-primary-border-subtle);
}
.inc-form-wizard .assignee-chip:hover:not(.selected) {
  border-color: var(--stratroom-primary);
  color: var(--stratroom-primary);
}
.inc-form-wizard .ca-row {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 6px;
}
.inc-form-wizard .ca-row input {
  flex: 1;
  padding: 7px 10px;
  border: 1px solid var(--stratroom-border-color);
  border-radius: 8px;
  font-size: 12px;
  color: var(--stratroom-body-color);
  outline: none;
}
.inc-form-wizard .ca-row input:focus {
  border-color: var(--stratroom-primary);
}
.inc-form-wizard .ca-remove {
  background: none;
  border: none;
  color: var(--stratroom-danger);
  font-size: 16px;
  cursor: pointer;
  padding: 2px 6px;
  border-radius: 5px;
  flex-shrink: 0;
}
.inc-form-wizard .ca-remove:hover {
  background: var(--stratroom-danger-bg-subtle);
}
.inc-form-wizard .add-ca-btn {
  background: none;
  border: 1px dashed var(--stratroom-border-color);
  border-radius: 7px;
  color: var(--stratroom-secondary-color);
  font-size: 11px;
  padding: 6px 12px;
  cursor: pointer;
  width: 100%;
  margin-top: 4px;
  font-weight: 500;
  transition: all 0.15s;
}
.inc-form-wizard .add-ca-btn:hover {
  border-color: var(--stratroom-primary);
  color: var(--stratroom-primary);
}
.inc-form-wizard .notif-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid var(--stratroom-border-color);
}
.inc-form-wizard .notif-row:last-child {
  border-bottom: none;
}
.inc-form-wizard .notif-label {
  font-size: 12px;
  color: var(--stratroom-body-color);
  font-weight: 500;
}
.inc-form-wizard .notif-sub {
  font-size: 10px;
  color: rgba(var(--stratroom-body-color-rgb), 0.6);
  margin-top: 1px;
}
.inc-form-wizard .toggle {
  position: relative;
  width: 36px;
  height: 20px;
  flex-shrink: 0;
}
.inc-form-wizard .toggle input {
  opacity: 0;
  width: 0;
  height: 0;
}
.inc-form-wizard .toggle input:checked + .slider {
  background: var(--stratroom-primary);
}
.inc-form-wizard .toggle input:checked + .slider:before {
  transform: translateX(16px);
}
.inc-form-wizard .slider {
  position: absolute;
  inset: 0;
  background: var(--stratroom-border-color);
  border-radius: 20px;
  cursor: pointer;
  transition: 0.3s;
}
.inc-form-wizard .slider:before {
  content: "";
  position: absolute;
  height: 14px;
  width: 14px;
  left: 3px;
  bottom: 3px;
  background: var(--stratroom-body-bg);
  border-radius: 50%;
  transition: 0.3s;
}
.inc-form-wizard .review-section {
  background: var(--stratroom-secondary-bg);
  border-radius: 10px;
  padding: 12px 14px;
  margin-bottom: 10px;
  border: 1px solid var(--stratroom-border-color);
}
.inc-form-wizard .review-section-title {
  font-size: 10px;
  font-weight: 700;
  color: var(--stratroom-primary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 6px;
}
.inc-form-wizard .review-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}
.inc-form-wizard .rv-label {
  font-size: 10px;
  color: rgba(var(--stratroom-body-color-rgb), 0.6);
  margin-bottom: 2px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}
.inc-form-wizard .rv-val {
  font-size: 12px;
  font-weight: 600;
  color: var(--stratroom-body-color);
}
.inc-form-wizard .rv-val.empty {
  color: #bbb;
  font-style: italic;
  font-weight: 400;
}
.inc-form-wizard .review-confirm {
  background: var(--stratroom-secondary-bg);
  border: 1px solid var(--stratroom-border-color);
  border-radius: 9px;
  padding: 10px 14px;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 14px;
}
.inc-form-wizard .review-confirm input[type=checkbox] {
  width: 15px;
  height: 15px;
  margin-top: 1px;
  accent-color: var(--stratroom-primary);
  flex-shrink: 0;
}
.inc-form-wizard .review-confirm label {
  font-size: 12px;
  color: var(--stratroom-body-color);
  font-weight: 500;
  cursor: pointer;
}
.inc-form-wizard .ca-preview {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 4px;
}
.inc-form-wizard .ca-tag {
  background: var(--stratroom-secondary-bg);
  color: var(--stratroom-primary);
  border-radius: 100px;
  padding: 2px 8px;
  font-size: 10px;
  font-weight: 600;
  border: 1px solid var(--stratroom-border-color);
}
.inc-form-wizard .severity-pill {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 10px;
  border-radius: 100px;
  font-size: 11px;
  font-weight: 700;
}
.inc-form-wizard .success-banner {
  background: var(--stratroom-secondary-bg);
  border: 1px solid var(--stratroom-border-color);
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  display: none;
}
.inc-form-wizard .success-banner.show {
  display: block;
}
.inc-form-wizard .success-banner h3 {
  color: var(--stratroom-primary);
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 6px;
}
.inc-form-wizard .success-banner p {
  color: var(--stratroom-body-color);
  font-size: 12px;
  opacity: 0.8;
}
.inc-form-wizard .impact-btn {
  padding: 6px 14px;
  border-radius: 7px;
  font-size: 11px;
  font-weight: 600;
  border: 1px solid var(--stratroom-border-color);
  cursor: pointer;
  background: var(--stratroom-body-bg);
  color: rgba(var(--stratroom-body-color-rgb), 0.5);
  transition: all 0.15s;
}
.inc-form-wizard .impact-btn.active {
  border-color: var(--stratroom-primary);
  background: var(--stratroom-primary);
  color: var(--stratroom-body-bg);
}
.inc-form-wizard .impact-group {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-top: 4px;
}
.inc-form-wizard .attachment-zone {
  border: 1.5px dashed var(--stratroom-border-color);
  border-radius: 9px;
  padding: 16px;
  text-align: center;
  cursor: pointer;
  transition: all 0.15s;
}
.inc-form-wizard .attachment-zone:hover {
  border-color: var(--stratroom-primary);
  background: var(--stratroom-secondary-bg);
}
.inc-form-wizard .attachment-zone p {
  font-size: 12px;
  color: #aaa;
  margin-top: 4px;
}
.inc-form-wizard .att-list {
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.inc-form-wizard .att-tag {
  display: flex;
  align-items: center;
  gap: 5px;
  background: var(--stratroom-secondary-bg);
  border-radius: 6px;
  padding: 4px 9px;
  font-size: 11px;
  color: var(--stratroom-body-color);
  font-weight: 500;
  border: 1px solid var(--stratroom-border-color);
}
.inc-form-wizard .att-tag button {
  background: none;
  border: none;
  cursor: pointer;
  color: #c0392b;
  font-size: 12px;
  padding: 0;
}
.inc-form-wizard .notif-container {
  background: var(--stratroom-secondary-bg);
  border-radius: 9px;
  padding: 6px 14px;
  border: 1px solid var(--stratroom-border-color);
}
.inc-form-wizard .notif-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid var(--stratroom-border-color);
}
.inc-form-wizard .notif-row:last-child {
  border-bottom: none;
}
.inc-form-wizard .notif-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--stratroom-body-color);
}
.inc-form-wizard .notif-sub {
  font-size: 11px;
  color: black;
  margin-top: 1px;
}
.inc-form-wizard .toggle {
  position: relative;
  display: inline-block;
  width: 32px;
  height: 18px;
}
.inc-form-wizard .toggle input {
  opacity: 0;
  width: 0;
  height: 0;
}
.inc-form-wizard .toggle input:checked + .slider {
  background-color: var(--stratroom-primary);
}
.inc-form-wizard .toggle input:checked + .slider:before {
  transform: translateX(14px);
}
.inc-form-wizard .toggle .slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #cbd5e1;
  transition: 0.4s;
  border-radius: 34px;
}
.inc-form-wizard .toggle .slider:before {
  position: absolute;
  content: "";
  height: 14px;
  width: 14px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}
  .compliance-kpi-card {
  border-radius: 10px;
  padding: 18px 20px;
  border: 1px solid var(--stratroom-border-color);
  background-color: var(--stratroom-body-bg);
  transition: box-shadow 0.2s ease;
}
.compliance-kpi-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}
.compliance-kpi-card .kpi-value {
  font-size: 30px;
  font-weight: 700;
  line-height: 1.1;
}
.compliance-kpi-card .kpi-label {
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: black;
  margin-bottom: 4px;
}
.compliance-kpi-card .kpi-sub {
  font-size: 11px;
  color: black;
}



.frameworks-title {
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: black;
}

.framework-card {
  border-radius: 10px;
  padding: 16px 12px;
  border: 1px solid var(--stratroom-border-color);
  background-color: var(--stratroom-body-bg);
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
}
.framework-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}
.framework-card.active {
  outline: 2px solid var(--fw-color);
  outline-offset: 2px;
  background: rgba(var(--fw-color-rgb), 0.04);
}
.framework-card .fw-name {
  font-weight: 700;
  font-size: 14px;
  color: var(--stratroom-body-color);
}
.framework-card .fw-subtitle {
  font-size: 10px;
  color: black;;
}
.framework-card .fw-controls {
  font-size: 10px;
  margin-top: 4px;
}

.radial-progress {
  position: relative;
  display: inline-block;
}
.radial-progress .pct-label {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 13px;
  font-weight: 700;
  color: var(--stratroom-body-color);
}

.radial-svg {
  transform: rotate(-90deg);
}
.radial-svg .radial-bg {
  fill: none;
  stroke: #e2e8f0;
  stroke-width: 6;
}
.radial-svg .radial-progress-circle {
  fill: none;
  stroke-width: 6;
  stroke-linecap: round;
  transition: stroke-dasharray 0.8s ease;
}
.radial-svg .radial-text {
  text-anchor: middle;
  fill: var(--stratroom-body-color);
  font-size: 12px;
  font-weight: 700;
  transform: rotate(90deg);
}

.gap-3 {
  gap: 1rem !important;
}

.chip {
  padding: 5px 14px;
  border-radius: 100px;
  font-size: 12px;
  border: 1px solid var(--stratroom-border-color);
  cursor: pointer;
  background: var(--stratroom-body-bg);
  color: black;
  white-space: nowrap;
  flex-shrink: 0;
  transition: all 0.15s;
  font-weight: 500;
}
.chip:hover {
  border-color: var(--stratroom-primary);
  color: var(--stratroom-primary);
}
.chip.active {
  background: var(--stratroom-primary);
  color: var(--stratroom-body-bg);
  border-color: var(--stratroom-primary);
}

.inc-card {
  background: var(--stratroom-body-bg);
  border: 1px solid var(--stratroom-border-color);
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.inc-card:hover {
  border-color: rgba(123, 45, 139, 0.3);
  box-shadow: 0 2px 12px rgba(123, 45, 139, 0.08);
}
.inc-card .card-header {
  padding: 9px 13px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--stratroom-border-color);
  background: var(--stratroom-body-bg);
  border-radius: 12px 12px 0 0;
}
.inc-card .inc-id {
  font-size: 12px;
  font-weight: 700;
  padding: 3px 9px;
  border-radius: 5px;
  color: var(--stratroom-white);
}
.inc-card .card-acts {
  display: flex;
  gap: 2px;
}
.inc-card .card-acts button,
.inc-card .card-acts a.action-btn {
  border: none;
  background: none;
  color: rgba(var(--stratroom-body-color-rgb), 0.6);
  font-size: 14px;
  cursor: pointer;
  padding: 3px 6px;
  border-radius: 5px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.inc-card .card-acts button:hover,
.inc-card .card-acts a.action-btn:hover {
  background: var(--stratroom-secondary-bg);
  color: var(--stratroom-primary);
}
.inc-card .card-body {
  padding: 11px 13px;
}
.inc-card .card-title {
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 10px;
  line-height: 1.4;
  color: var(--stratroom-body-color);
}
.inc-card .card-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}
.inc-card .f-label {
  font-size: 10px;
  color: rgba(var(--stratroom-body-color-rgb), 0.6);
  margin-bottom: 2px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}
.inc-card .f-val {
  font-size: 11px;
  font-weight: 600;
  color: var(--stratroom-body-color);
}
.inc-card .card-footer {
  padding: 8px 13px;
  background: var(--stratroom-secondary-bg);
  border-top: 1px solid var(--stratroom-border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 0 0 12px 12px;
}
.inc-card .meta-row {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 10px;
  color: rgba(var(--stratroom-body-color-rgb), 0.5);
}
.inc-card .avatar {
  width: 21px;
  height: 21px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 9px;
  font-weight: 700;
  flex-shrink: 0;
  text-transform: uppercase;
}

.inc-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 2px 8px;
  border-radius: 100px;
  font-size: 10px;
  font-weight: 600;
  margin-bottom: 0;
  line-height: 1.2;
}
.inc-badge.s-new {
  background: var(--stratroom-primary-bg-subtle);
  color: var(--stratroom-primary-text-emphasis);
}
.inc-badge.s-inv {
  background: var(--stratroom-info-bg-subtle);
  color: var(--stratroom-info-text-emphasis);
}
.inc-badge.s-review {
  background: var(--stratroom-warning-bg-subtle);
  color: var(--stratroom-warning-text-emphasis);
}
.inc-badge.s-closed {
  background: var(--stratroom-success-bg-subtle);
  color: var(--stratroom-success-text-emphasis);
}
.inc-badge.s-esc {
  background: var(--stratroom-danger-bg-subtle);
  color: var(--stratroom-danger-text-emphasis);
}
.inc-badge.sv-critical {
  background: var(--stratroom-danger-bg-subtle);
  color: var(--stratroom-danger-text-emphasis);
}
.inc-badge.sv-high {
  background: var(--stratroom-warning-bg-subtle);
  color: var(--stratroom-warning-text-emphasis);
}
.inc-badge.sv-medium {
  background: var(--stratroom-info-bg-subtle);
  color: var(--stratroom-info-text-emphasis);
}
.inc-badge.sv-low {
  background: var(--stratroom-success-bg-subtle);
  color: var(--stratroom-success-text-emphasis);
}

.cat-section {
    margin-bottom: 18px;

    .bar-fill {
        height: 100%;
        border-radius: 3px;
    }
}

.cat-header-row {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 14px;
    border-radius: 10px;
    margin-bottom: 8px;
    border: 1px solid transparent;
}

.cat-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    flex-shrink: 0;
}

.cat-name {
    font-size: 13px;
    font-weight: 600;
    flex: 1;
    color: var(--stratroom-body-color);
}

.cat-count {
    font-size: 11px;
    color: var(--stratroom-secondary-color);
}

.dataTables_wrapper .dataTables_scrollHead .table,
.dataTables_wrapper .dataTables_scrollBody .table {
  margin-bottom: 0;
}
.dataTables_wrapper .dataTables_paginate {
  margin-top: 0.8rem;
}
.dataTables_wrapper .dataTables_paginate.dataTables_paginate_sm {
  margin-top: 0.4rem;
}
.dataTables_wrapper .dataTables_paginate .pagination {
  margin-bottom: 0;
}
.dataTables_wrapper .dataTables_paginate .pagination .page-item .page-link {
  --stratroom-pagination-padding-x: 0.50rem;
  --stratroom-pagination-padding-y: 0.25rem;
  --stratroom-pagination-font-size: 0.75rem;
}
.dataTables_wrapper .dataTables_paginate .pagination.pagination-sm .page-item .page-link {
  --stratroom-pagination-padding-x: 0.25rem;
  --stratroom-pagination-padding-y: 0.125rem;
  --stratroom-pagination-font-size: 0.60rem;
}

  .mb-4 {
    margin-bottom: 1.5rem !important;
  }

  .g-3,
.gx-3 {
  --stratroom-gutter-x: 1rem;
}

.g-3,
.gy-3 {
  --stratroom-gutter-y: 1rem;
};
.row {
  --stratroom-gutter-x: 1.5rem;
  --stratroom-gutter-y: 0;
  display: flex;
  flex-wrap: wrap;
  margin-top: calc(-1 * var(--stratroom-gutter-y));
  margin-right: calc(-0.5 * var(--stratroom-gutter-x));
  margin-left: calc(-0.5 * var(--stratroom-gutter-x));
}
.row > * {
  flex-shrink: 0;
  width: 100%;
  max-width: 100%;
  padding-right: calc(var(--stratroom-gutter-x) * 0.5);
  padding-left: calc(var(--stratroom-gutter-x) * 0.5);
  margin-top: var(--stratroom-gutter-y);
}
  .overall-score-box {
  border-radius: 12px;
  padding: 16px 24px;
  text-align: center;
  min-width: 140px;
  border: 1px solid var(--stratroom-border-color);
  background-color: var(--stratroom-body-bg);
}

.overall-score-v2 {
  background-color: var(--stratroom-body-bg);
  border-radius: 8px;
  padding: 12px 24px;
  text-align: left;
  border: 1px solid var(--stratroom-border-color);
  min-width: 180px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
  align-items: center;
  gap: 16px;
}
.overall-score-v2 .score-label {
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: black;
  font-weight: 600;
  margin-bottom: 2px;
}
.overall-score-v2 .score-percent {
  font-size: 42px;
  font-weight: 700;
  color: var(--stratroom-primary, #0d6efd);
  line-height: 1;
}
.overall-score-v2 .score-detail {
  font-size: 10px;
  letter-spacing: 0.02em;
  color: black;
  text-transform: uppercase;
}

.rounded {
  border-radius: var(--stratroom-border-radius) !important;
}

.rounded-0 {
  border-radius: 0 !important;
}

.rounded-1 {
  border-radius: var(--stratroom-border-radius-sm) !important;
}

.rounded-2 {
  border-radius: var(--stratroom-border-radius) !important;
}

.rounded-3 {
  border-radius: var(--stratroom-border-radius-lg) !important;
}

.rounded-4 {
  border-radius: var(--stratroom-border-radius-xl) !important;
}

.rounded-5 {
  border-radius: var(--stratroom-border-radius-xxl) !important;
}

.rounded-circle {
  border-radius: 50% !important;
}

.rounded-pill {
  border-radius: var(--stratroom-border-radius-pill) !important;
}

.rounded-top {
  border-top-left-radius: var(--stratroom-border-radius) !important;
  border-top-right-radius: var(--stratroom-border-radius) !important;
}

.rounded-top-0 {
  border-top-left-radius: 0 !important;
  border-top-right-radius: 0 !important;
}

.rounded-top-1 {
  border-top-left-radius: var(--stratroom-border-radius-sm) !important;
  border-top-right-radius: var(--stratroom-border-radius-sm) !important;
}

.rounded-top-2 {
  border-top-left-radius: var(--stratroom-border-radius) !important;
  border-top-right-radius: var(--stratroom-border-radius) !important;
}

.rounded-top-3 {
  border-top-left-radius: var(--stratroom-border-radius-lg) !important;
  border-top-right-radius: var(--stratroom-border-radius-lg) !important;
}

.rounded-top-4 {
  border-top-left-radius: var(--stratroom-border-radius-xl) !important;
  border-top-right-radius: var(--stratroom-border-radius-xl) !important;
}

.rounded-top-5 {
  border-top-left-radius: var(--stratroom-border-radius-xxl) !important;
  border-top-right-radius: var(--stratroom-border-radius-xxl) !important;
}

.rounded-top-circle {
  border-top-left-radius: 50% !important;
  border-top-right-radius: 50% !important;
}

.rounded-top-pill {
  border-top-left-radius: var(--stratroom-border-radius-pill) !important;
  border-top-right-radius: var(--stratroom-border-radius-pill) !important;
}

.rounded-end {
  border-top-right-radius: var(--stratroom-border-radius) !important;
  border-bottom-right-radius: var(--stratroom-border-radius) !important;
}

.rounded-end-0 {
  border-top-right-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
}

.rounded-end-1 {
  border-top-right-radius: var(--stratroom-border-radius-sm) !important;
  border-bottom-right-radius: var(--stratroom-border-radius-sm) !important;
}

.rounded-end-2 {
  border-top-right-radius: var(--stratroom-border-radius) !important;
  border-bottom-right-radius: var(--stratroom-border-radius) !important;
}

.rounded-end-3 {
  border-top-right-radius: var(--stratroom-border-radius-lg) !important;
  border-bottom-right-radius: var(--stratroom-border-radius-lg) !important;
}

.rounded-end-4 {
  border-top-right-radius: var(--stratroom-border-radius-xl) !important;
  border-bottom-right-radius: var(--stratroom-border-radius-xl) !important;
}

.rounded-end-5 {
  border-top-right-radius: var(--stratroom-border-radius-xxl) !important;
  border-bottom-right-radius: var(--stratroom-border-radius-xxl) !important;
}

.rounded-end-circle {
  border-top-right-radius: 50% !important;
  border-bottom-right-radius: 50% !important;
}

.rounded-end-pill {
  border-top-right-radius: var(--stratroom-border-radius-pill) !important;
  border-bottom-right-radius: var(--stratroom-border-radius-pill) !important;
}

.rounded-bottom {
  border-bottom-right-radius: var(--stratroom-border-radius) !important;
  border-bottom-left-radius: var(--stratroom-border-radius) !important;
}

.rounded-bottom-0 {
  border-bottom-right-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
}

.rounded-bottom-1 {
  border-bottom-right-radius: var(--stratroom-border-radius-sm) !important;
  border-bottom-left-radius: var(--stratroom-border-radius-sm) !important;
}

.rounded-bottom-2 {
  border-bottom-right-radius: var(--stratroom-border-radius) !important;
  border-bottom-left-radius: var(--stratroom-border-radius) !important;
}

.rounded-bottom-3 {
  border-bottom-right-radius: var(--stratroom-border-radius-lg) !important;
  border-bottom-left-radius: var(--stratroom-border-radius-lg) !important;
}

.rounded-bottom-4 {
  border-bottom-right-radius: var(--stratroom-border-radius-xl) !important;
  border-bottom-left-radius: var(--stratroom-border-radius-xl) !important;
}

.rounded-bottom-5 {
  border-bottom-right-radius: var(--stratroom-border-radius-xxl) !important;
  border-bottom-left-radius: var(--stratroom-border-radius-xxl) !important;
}

.rounded-bottom-circle {
  border-bottom-right-radius: 50% !important;
  border-bottom-left-radius: 50% !important;
}

.rounded-bottom-pill {
  border-bottom-right-radius: var(--stratroom-border-radius-pill) !important;
  border-bottom-left-radius: var(--stratroom-border-radius-pill) !important;
}

.rounded-start {
  border-bottom-left-radius: var(--stratroom-border-radius) !important;
  border-top-left-radius: var(--stratroom-border-radius) !important;
}

.rounded-start-0 {
  border-bottom-left-radius: 0 !important;
  border-top-left-radius: 0 !important;
}

.rounded-start-1 {
  border-bottom-left-radius: var(--stratroom-border-radius-sm) !important;
  border-top-left-radius: var(--stratroom-border-radius-sm) !important;
}

.rounded-start-2 {
  border-bottom-left-radius: var(--stratroom-border-radius) !important;
  border-top-left-radius: var(--stratroom-border-radius) !important;
}

.rounded-start-3 {
  border-bottom-left-radius: var(--stratroom-border-radius-lg) !important;
  border-top-left-radius: var(--stratroom-border-radius-lg) !important;
}

.rounded-start-4 {
  border-bottom-left-radius: var(--stratroom-border-radius-xl) !important;
  border-top-left-radius: var(--stratroom-border-radius-xl) !important;
}

.rounded-start-5 {
  border-bottom-left-radius: var(--stratroom-border-radius-xxl) !important;
  border-top-left-radius: var(--stratroom-border-radius-xxl) !important;
}

.rounded-start-circle {
  border-bottom-left-radius: 50% !important;
  border-top-left-radius: 50% !important;
}

.rounded-start-pill {
  border-bottom-left-radius: var(--stratroom-border-radius-pill) !important;
  border-top-left-radius: var(--stratroom-border-radius-pill) !important;
} 
</style>
</head>

<script type="text/javascript" src="${contextroot}/js/jquery.min.js"></script>
<body class="light">
<input type="hidden" id="userrolename" value="${principal.profile.userRoleName}">
	<!-- Page Loader -->
  
	<!-- #Top Bar -->
	<div>
    

		<!-- <div id="deleteModalswot" class="modal fade">
			<div class="modal-dialog modal-confirm">
				<div class="modal-content">
					<div class="modal-header">
						<h4 class="modal-title">Delete</h4>
						<button type="button" class="close" data-dismiss="modal"
							aria-hidden="true">&times;</button>
					</div>
					<div class="modal-body">
						<h5 class="confirm-modal-content">Do you really want to
							delete?</h5>
						<br>
						<div class="form-line right">
							<input type="hidden" id="deleterecordid" /> <input type="hidden"
								id="deleterecordtype" />
							<button type="button" class="btn-default1 btn"
								data-dismiss="modal" aria-label="Close"  data-i18n="Cancel">Cancel</button>
							<button type="button"
								class="btn btn-danger confirm-modal-deleteBtn"
								onclick="handleswoteventdelete()">Delete</button>
						</div>
					</div>
				</div>
			</div>
		</div> -->
	</div>
	<!--#END View -->

 <div style="display: none;">
      <jsp:include page="../common/right-navigation.jsp"></jsp:include>
    </div>

	<jsp:include page="../common/top-navigation.jsp"></jsp:include>
    <header id="header" class="header shadow-sm">
	  
		<jsp:include page="../common/left-navigation.jsp"></jsp:include>
    </header>

 <main class="pt-2 pb-2">
    <c:if test="${userPrincipal != null}">
      <input id="userPrincipal" type="hidden" name="userPrincipal" value="<c:out value="
            ${userPrincipal.profile.empId}" />">
    </c:if>
    <c:if test="${pagenumber != null}">
      <input id="pagenumber" type="hidden" name="pagenumber" value="<c:out value=" ${pagenumber}" />">
    </c:if>
    <!-- Page Header -->
    <div class="container-lg">
      <div class="page-header grid gap-2">
        <div class="g-col-12 g-col-md-8 d-flex align-items-center">
          <h4 class="title mb-0 fs-5 fw-bold d-flex align-items-center gap-2 text-uppercase"
            style="letter-spacing: 0.05em; color: var(--stratroom-body-color);">
            <span class="icon d-flex align-items-center" style="color: var(--stratroom-body-color);">
              <i data-lucide="clipboard-list" style="width: 20px; height: 20px; stroke-width: 2px;"></i>
            </span>
            <span>UNIVERSAL INCIDENT REGISTRY</span>
          </h4>
        </div>
        <div
          class="g-col-12 g-col-md-4 d-flex justify-content-md-end justify-content-start align-items-center mt-2 mt-md-0">
          <div class="overall-score-v2 d-flex">
            <div>
              <div class="score-label">REGISTRY STATUS</div>
              <div class="score-detail"><span id="cnt-total-header">0</span> incidents logged</div>
            </div>
            <div class="score-percent" style="color: #2980b9; font-size: 16px;">ACTIVE</div>
          </div>
        </div>
      </div>
    </div>

    <div class="container-lg py-3">
      <!-- Navigation -->
      <div class="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4 border px-1 ps-0 rounded">
        <ul class="nav nav-pills gap-2" id="registryTabs" role="tablist">
          <li class="nav-item" role="presentation">
            <button class="nav-link active" id="tab-list" onclick="switchMain('list', this)" type="button"
              role="tab">All Incidents</button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" id="tab-cat" onclick="switchMain('cat', this)" type="button" role="tab">By
              Category</button>
          </li>
        </ul>
       <div class="d-flex gap-1">
          <a href="#" onclick="loadDataAndGeneratePDF()" data-bs-toggle="tooltip" data-bs-placement="bottom"
            data-bs-title="Generate Report" class="btn btn-sm btn-icon">
            <i data-lucide="file-text" style="width: 16px; height: 16px;"></i>
          </a>
         <button class="btn btn-sm btn-primary d-flex align-items-center gap-1"
          onclick="switchMain('form', document.getElementById('tab-list'))"><i data-lucide="plus"
            style="width: 16px; height: 16px;"></i>Create</button>
        </div>
      </div>

      <!-- LIST SCREEN -->
      <div class="screen" id="screen-list" style="display:block;">
        <!-- KPI Cards -->
        <div class="row g-3 mb-4">
          <div class="col-lg-3 col-md-6">
            <div class="compliance-kpi-card">
              <div class="kpi-label text-uppercase">Total Logged</div>
              <div class="kpi-value" id="cnt-all">0</div>
              <div class="kpi-sub">all time incidents</div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6">
            <div class="compliance-kpi-card">
              <div class="kpi-label text-uppercase">Open Incidents</div>
              <div class="kpi-value" style="color:#2980b9;" id="cnt-open">0</div>
              <div class="kpi-sub">awaiting resolution</div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6">
            <div class="compliance-kpi-card">
              <div class="kpi-label text-uppercase">Critical Severity</div>
              <div class="kpi-value" style="color:#e74c3c;" id="cnt-crit">0</div>
              <div class="kpi-sub">requires attention</div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6">
            <div class="compliance-kpi-card">
              <div class="kpi-label text-uppercase">Closed</div>
              <div class="kpi-value" style="color:#27ae60;" id="cnt-closed">0</div>
              <div class="kpi-sub">resolved successfully</div>
            </div>
          </div>
        </div>

        <!-- List Actions -->
        <div class="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-3">
          <div class="d-flex flex-wrap  gap-2" id="cat-chips">
            <!-- JS Generated category chips -->
          </div>
          <div class="d-flex gap-2" style="max-width: 400px; width: 100%;">
            <div class="input-group">
              <span class="input-group-text"><i data-lucide="search"
                  style="width:16px;height:16px;"></i></span>
              <input type="text" class="form-control" id="search-input"
                placeholder="Search by title, ID, department, reporter&hellip;" oninput="renderList()">
            </div>
            <select class="form-select" style="width: auto;" id="sort-sel" onchange="renderList()">
              <option value="date">Latest First</option>
              <option value="sev">By Severity</option>
              <option value="id">By ID</option>
            </select>
          </div>
        </div>

        <!-- Incident Cards Grid JS Container -->
        <div class="row g-3" id="incident-list">
          <!-- Data populated by JS -->
        </div>
      </div>

      <!-- CATEGORY DASHBOARD SCREEN -->
      <div class="screen" id="screen-cat" style="display:none;">
        <div class="mb-4">
          <div class="text-uppercase fw-bold text-muted mb-3" style="font-size:11px; letter-spacing:0.5px;">INCIDENT
            CATEGORY DASHBOARD</div>
          <div class="row g-3" id="cat-dashboard">
            <!-- JS Populated Category Grid -->
          </div>
        </div>
      </div>

      <!-- CREATE NEW INCIDENT SCREEN (WIZARD) -->
      <div class="screen inc-form-wizard border p-3" id="screen-form" style="display:none;">

        <!-- Progress bar -->
        <div class="wizard-progress" id="prog-bar">
          <div class="prog-step active" id="pstep-1">
            <div class="prog-dot" id="pdot-1">1</div>
            <div class="prog-label">Basic Info</div>
          </div>
          <div class="prog-line" id="pline-1"></div>
          <div class="prog-step" id="pstep-2">
            <div class="prog-dot" id="pdot-2">2</div>
            <div class="prog-label">Classification</div>
          </div>
          <div class="prog-line" id="pline-2"></div>
          <div class="prog-step" id="pstep-3">
            <div class="prog-dot" id="pdot-3">3</div>
            <div class="prog-label">Assignment</div>
          </div>
          <div class="prog-line" id="pline-3"></div>
          <div class="prog-step" id="pstep-4">
            <div class="prog-dot" id="pdot-4">4</div>
            <div class="prog-label">Review</div>
          </div>
        </div>

        <!-- STEP 1 &mdash; Basic Info -->
        <div class="step-panel active" id="step-1">
          <div class="section-lbl">Incident Details</div>
          <div class="form-group">
            <input id="incident_unique_id" type="text" hidden />
            <label>Incident ID<span style="color:#c0392b">*</span></label>
            <input id="f-id" type="text" placeholder="Unique identifier for the incident" />
            <div class="error-msg" id="err-id">Please enter an incident ID.</div>
          </div>
          <div class="form-group">
            <label>Incident Title / Summary <span style="color:#c0392b">*</span></label>
            <input id="f-title" type="text" placeholder="Brief description of the incident" />
            <div class="error-msg" id="err-title">Please enter a title.</div>
          </div>
          <div class="form-group">
            <label>Description / Initial Observations</label>
            <textarea id="f-desc"
              placeholder="Describe what happened, who was involved, what was observed immediately&hellip;"
              style="min-height:72px"></textarea>
          </div>
          <div class="row g-3 mb-3">
            <div class="col-md-6">
              <div class="form-group mb-0">
                <label>Incident Date / Time <span style="color:#c0392b">*</span></label>
                <input id="f-idate" class="date-time-picker" type="text" placeholder="Select incident date & time" />
                <div class="error-msg" id="err-idate">Please select incident date.</div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group mb-0">
                <label>Date Reported <span style="color:#c0392b">*</span></label>
                <input id="f-rdate" type="text" placeholder="Select reporting date" />
                <div class="error-msg" id="err-rdate">Please select reporting date.</div>
              </div>
            </div>
          </div>
          <div class="row g-3 mb-3">
            <div class="col-md-6">
              <div class="form-group mb-0">
                <label>Location / Site</label>
                <input id="f-location" type="text" placeholder="e.g. Warehouse B, Floor 2" />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group mb-0">
                <label>Witnesses (optional)</label>
                <input id="f-witnesses" type="text" placeholder="Names or 'None'" />
              </div>
            </div>
          </div>
          <div class="form-actions">
            <button class="btn-cancel-form"
              onclick="switchMain('list', document.getElementById('tab-list'))">Cancel</button>
            <button class="btn-next-form" onclick="goStep(2)">Next: Classification &rarr;</button>
          </div>
        </div>

        <!-- STEP 2 &mdash; Classification -->
        <div class="step-panel" id="step-2">
          <div class="section-lbl">Incident Classification</div>
          <div class="row g-3 mb-3">
            <div class="col-md-6">
              <div class="form-group mb-0">
                <label>Incident Type <span style="color:#c0392b">*</span></label>
                <select id="f-type">
                  <option value="">Select&hellip;</option>
                  <option>Safety</option>
                  <option>IT</option>
                  <option>Security</option>
                  <option>Environmental</option>
                  <option>HR</option>
                  <option>Compliance</option>
                  <option>Quality</option>
                  <option>Facilities</option>
                  <option>Finance</option>
                  <option>Legal</option>
                </select>
                <div class="error-msg" id="err-type">Please select an incident type.</div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group mb-0">
                <label>Severity <span style="color:#c0392b">*</span></label>
                <select id="f-sev">
                  <option value="">Select&hellip;</option>
                  <option>Critical</option>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
                <div class="error-msg" id="err-sev">Please select severity.</div>
              </div>
            </div>
          </div>
          <div class="row g-3 mb-3">
            <div class="col-md-6">
              <div class="form-group mb-0">
                <label>Department / Site <span style="color:#c0392b">*</span></label>
                <select id="f-dept">
                  <option value="">Select</option>
                </select>
                <div class="error-msg" id="err-dept">Please select a department.</div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group mb-0">
                <label>Root Cause Category</label>
                <select id="f-root">
                  <!-- <option value="">Select&hellip;</option>
                  <option>Operational Lapse</option>
                  <option>System Failure</option>
                  <option>Cyber Threat</option>
                  <option>Equipment Failure</option>
                  <option>Human Error</option>
                  <option>Process Gap</option>
                  <option>Policy Violation</option>
                  <option>Third-Party Failure</option>
                  <option>Natural Cause</option> -->
                 <!-- Root Cause Options -->
<option>Process & Controls</option>
<option>Human Error</option>
<option>People & Capacity</option>
<option>Systems & Technology</option>
<option>Cyber Threat & Security</option>
<option>Equipment & Infrastructure Failure</option>
<option>Data & Information</option>
<option>Governance & Oversight</option>
<option>Strategy & Planning</option>
<option>Culture & Ethics</option>
<option>Conduct & Behaviour</option>
<option>Compliance & Regulatory</option>
<option>Legal & Regulatory</option>
<option>Communication & Information Sharing</option>
<option>Change & Project Management</option>
<option>Business Continuity & Resilience</option>
<option>Third Party & External</option>
<option>Physical & Environmental</option>
<option>Natural Causes & Force Majeure</option>
<option>Financial & Market Risk</option>
<option>Customer & Stakeholder</option>
<option>Fraud & Misconduct</option>
                </select>
              </div>
            </div>
          </div>
          <div class="section-lbl">Business Impact</div>
          <div class="form-group">
            <label>Impact Level</label>
            <div class="impact-group" id="impact-group">
              <button type="button" class="impact-btn" onclick="setImpact(this,'No Impact')">No Impact</button>
              <button type="button" class="impact-btn" onclick="setImpact(this,'Minor')">Minor</button>
              <button type="button" class="impact-btn" onclick="setImpact(this,'Moderate')">Moderate</button>
              <button type="button" class="impact-btn" onclick="setImpact(this,'Significant')">Significant</button>
              <button type="button" class="impact-btn" onclick="setImpact(this,'Severe')">Severe</button>
            </div>
          </div>
          <div class="row g-3 mb-3">
            <div class="col-md-6">
              <div class="form-group mb-0">
                <label>Regulatory / Compliance Flag</label>
                <select id="f-regflag">
                  <option value="">None</option>
                  <!-- <option>OSHA Reportable</option>
                  <option>GDPR Notifiable</option>
                  <option>SOX Relevant</option>
                  <option>ISO 45001</option>
                  <option>POSH Act</option>
                  <option>Local Authority</option> -->
                  <!-- Compliance / Regulatory Options -->
                  <option>ISO 9001</option>
                  <option>ISO 14001</option>
                  <option>ISO 22301</option>
                  <option>ISO 27001</option>
                  <option>ISO 27701</option>
                  <option>ISO 31000</option>
                  <option>ISO 37001</option>
                  <option>ISO 37301</option>
                  <option>ISO 45001</option>
                  <option>ISO 55001</option>
                  <option>ISO 21502</option>
                  <option>ISO 10002</option>
                  <option>COSO</option>
                  <option>COSO ERM</option>
                  <option>King IV</option>
                  <option>COBIT</option>
                  <option>ITIL</option>
                  <option>OECD</option>
                  <option>NIST CSF</option>
                  <option>NIST SP 800-34</option>
                  <option>PCI DSS</option>
                  <option>GDPR</option>
                  <option>POPIA</option>
                  <option>Basel III</option>
                  <option>IFRS 9</option>
                  <option>IFRS 17</option>
                  <option>IFRS S1</option>
                  <option>IFRS S2</option>
                  <option>SOX</option>
                  <option>FATF</option>
                  <option>ACFE</option>
                  <option>UN Global Compact</option>
                  <option>GRI</option>
                  <option>TCFD</option>
                  <option>SASB</option>
                  <option>ILO</option>
                  <option>OHSAS 18001</option>
                  <option>PMBoK</option>
                  <option>PRINCE2</option>
                  <option>PROSCI ADKAR</option>
                  <option>BCI GPG</option>
                  <option>UNDRR Sendai</option>
                  <option>UN GPBHR</option>
                </select>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group mb-0">
                <label>Initial Status</label>
                <select id="f-status" onchange="toggleCloseDateField(this.value)">
                  <option>New</option>
                  <option>Under Investigation</option>
                  <option>In Review</option>
                  <option>Escalated</option>
                  <option>Closed</option>
                </select>
              </div>
            </div>

            <div class="col-md-6" id="closed-date-field" style="display:none;">
              <div class="form-group mb-0">
                <label>Incident Closed Date</label>
                <input id="f-closedate" type="text" placeholder="Select closed date" />
              </div>
            </div>
          </div>
          <!-- <div class="form-group">
            <label>Attachments</label>
            <div class="attachment-zone" onclick="fakeAttach()">
              <div style="font-size:22px">&#128206;</div>
              <p>Click to attach files (photos, documents, logs)</p>
            </div>
            <div class="att-list" id="att-list"></div>
          </div> -->
          <div class="form-actions">
            <button class="btn-back-form" onclick="goStep(1)">&larr; Back</button>
            <button class="btn-next-form" onclick="goStep(3)">Next: Assignment &rarr;</button>
          </div>
        </div>

        <!-- STEP 3 &mdash; Assignment -->
        <div class="step-panel" id="step-3">
          <div class="section-lbl">Reporting & Assignment</div>
          <div class="row g-3 mb-3">
            <div class="col-md-6">
              <div class="form-group mb-0">
                <label>Reported By <span style="color:#c0392b">*</span></label>
                <select id="f-rby">
                  <option value="">Select</option>
                 
                </select>
                <div class="error-msg" id="err-rby">Please select who reported this.</div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group mb-0">
                <label>Primary Assignee <span style="color:#c0392b">*</span></label>
                <select id="f-ato">
                  <option value="">Select</option>
                  
                </select>
                <div class="error-msg" id="err-ato">Please select a primary assignee.</div>
              </div>
            </div>
          </div>
          <!-- <div class="form-group">
            <label>Additional Assignees / Team Members</label>
            <div class="assignee-list" id="extra-assignees">
              <div class="assignee-chip" onclick="toggleAssignee(this,'Mark Lewis')">ML &middot; Mark Lewis</div>
              <div class="assignee-chip" onclick="toggleAssignee(this,'Rina Patel')">RP &middot; Rina Patel</div>
              <div class="assignee-chip" onclick="toggleAssignee(this,'Dr. Chen')">DC &middot; Dr. Chen</div>
              <div class="assignee-chip" onclick="toggleAssignee(this,'Arjun Mehta')">AM &middot; Arjun Mehta</div>
              <div class="assignee-chip" onclick="toggleAssignee(this,'Priya Sharma')">PS &middot; Priya Sharma</div>
              <div class="assignee-chip" onclick="toggleAssignee(this,'Tom Wilson')">TW &middot; Tom Wilson</div>
              <div class="assignee-chip" onclick="toggleAssignee(this,'Sarah Okafor')">SO &middot; Sarah Okafor</div>
              <div class="assignee-chip" onclick="toggleAssignee(this,'IT Ops Team')">IO &middot; IT Ops Team</div>
            </div>
          </div> -->
          <div class="row g-3 mb-3">
            <div class="col-md-6">
              <div class="form-group mb-0">
                <label>Due Date for Actions</label>
                <input id="f-due" type="text" placeholder="Select due date" />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group mb-0">
                <label>Escalation Contact</label>
                <select id="f-esc">
                  <option value="">None</option>
                  <option>CEO</option>
                  <option>COO</option>
                  <option>CFO</option>
                  <option>CISO</option>
                  <option>Head of HSE</option>
                  <option>General Counsel</option>
                  <option>Board Secretary</option>
                </select>
              </div>
            </div>
          </div>
          <div class="section-lbl">Corrective Actions</div>
          <div id="ca-items">
            <div class="ca-row"><input type="text" placeholder="Describe corrective action&hellip;" /><button
                class="ca-remove" onclick="removeCA(this)">&times;</button></div>
          </div>
          <button class="add-ca-btn" onclick="addCA()">+ Add Corrective Action</button>
          <div class="section-lbl" style="margin-top:18px">Notifications</div>
          <div class="notif-container">
            <div class="notif-row">
              <div>
                <div class="notif-label">Email assignee on creation</div>
                <div class="notif-sub">Sends immediate alert to primary assignee</div>
              </div>
              <label class="toggle"><input type="checkbox" id="notif-1" checked /><span class="slider"></span></label>
            </div>
            <div class="notif-row">
              <div>
                <div class="notif-label">Notify management on Critical/High</div>
                <div class="notif-sub">Auto-escalate if severity is Critical or High</div>
              </div>
              <label class="toggle"><input type="checkbox" id="notif-2" checked /><span class="slider"></span></label>
            </div>
            <!-- <div class="notif-row">
              <div>
                <div class="notif-label">Daily digest to reporter</div>
                <div class="notif-sub">Send progress updates once daily</div>
              </div>
              <label class="toggle"><input type="checkbox" id="notif-3" /><span class="slider"></span></label>
            </div>
            <div class="notif-row">
              <div>
                <div class="notif-label">Slack / Teams alert</div>
                <div class="notif-sub">Push notification to integrated channels</div>
              </div>
              <label class="toggle"><input type="checkbox" id="notif-4" /><span class="slider"></span></label>
            </div> -->
          </div>
          <div class="form-actions">
            <button class="btn-back-form" onclick="goStep(2)">&larr; Back</button>
            <div class="form-actions-right">
              <button class="btn-draft-form" onclick="saveDraft()">Save Draft</button>
              <button class="btn-next-form" onclick="goStep(4)">Review & Submit &rarr;</button>
            </div>
          </div>
        </div>

        <!-- STEP 4 &mdash; Review & Submit -->
        <div class="step-panel" id="step-4">
          <div id="review-body"></div>
          <div class="review-confirm">
            <input type="checkbox" id="confirm-check"
              onchange="document.getElementById('btn-final-save').disabled=!this.checked" />
            <label for="confirm-check">I confirm that the information provided is accurate and complete to the best of
              my knowledge.</label>
          </div>
          <div class="form-actions">
            <button class="btn-back-form" onclick="goStep(3)">&larr; Back</button>
            <div class="form-actions-right">
              <button class="btn-draft-form" onclick="saveDraft()">Save Draft</button>
              <button class="btn-save-form" id="btn-final-save" onclick="saveIncident()" disabled>&#10003; Submit
                Incident</button>
            </div>
          </div>
          <div class="success-banner" id="success-banner">
            <div style="font-size:32px;margin-bottom:8px">&#10003;…</div>
            <h3>Incident Submitted Successfully</h3>
            <p id="success-id" style="margin-bottom:12px"></p>
            <button class="btn-next-form"
              style="padding:8px 18px;border-radius:7px;font-size:12px;font-weight:600;border:none;cursor:pointer"
              onclick="switchMain('list',document.getElementById('tab-list'))">View All Incidents &rarr;</button>
          </div>
        </div>

      </div>

      <!-- DETAIL SCREEN -->
      <div class="screen" id="screen-detail" style="display:none;">
        <div class="mb-3">
          <button class="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1"
            onclick="switchMain('list', document.getElementById('tab-list'))">
            <i data-lucide="arrow-left" style="width:14px;height:14px;"></i> Back to list
          </button>
        </div>
        <div id="detail-content"></div>
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
	

  <link href="assets/css/pickr.min.css" rel="stylesheet">
  <link href="assets/css/daterangepicker.min.css" rel="stylesheet">
  <link href="assets/css/jquery-ui.min.css" rel="stylesheet">
  <link href="assets/css/select2.min.css" rel="stylesheet" />
	<!-- Plugins Js -->

    <script src="${contextroot}/js/jspdf.umd.min.js"></script>
<script src="${contextroot}/js/jspdf.plugin.autotable.min.js"></script>
	<script src="js/app.min.js"></script>
	<script type="text/javascript" src="${contextroot}/js/jquery.contextMenu.min.js"></script>
	<script type="text/javascript" src="${contextroot}/js/jquery.ui.position.js"></script>
	<!-- Custom Js -->
	<script src="${contextroot}/js/admin.js"></script>
<!-- Knob Js -->
	<script type="text/javascript"
		src="${contextroot}/js/knockout-3.5.0.js"></script>
	<script type="text/javascript"
		src="${contextroot}/js/daterangepicker.min.js"></script>
	
	<!-- Knob Js -->
	<script src="${contextroot}/js/jquery-ui.min.js"></script>
	<script src="${contextroot}/js/moment.js"></script>
	<script src="${contextroot}/js/jquery.editable.min.js"></script>
	<script src="${contextroot}/js/bootstrap.bundle.min.js"></script>
	<script src="${contextroot}/js/datepickerair.js"></script>
	<script src="${contextroot}/js/datepicker.en.js"></script>
	<script src="${contextroot}/js/handlebars.js"></script>
	<script src="${contextroot}/js/widgets.js"></script>
	<script src="${contextroot}/js/notify.js"></script>
	<script src="${contextroot}/js/select2.min.js"></script>
	<!-- <script src="${contextroot}/js/kpidata_form.js"></script> -->
  <script src="${contextroot}/js/incidentManagement.js"></script>
	<script src="${contextroot}/js/initial.js"></script>



<script>
  document.addEventListener("DOMContentLoaded", function () {
    flatpickr("#f-idate", {
      enableTime: true,
      dateFormat: "Y-m-d H:i",
      time_24hr: true
    });
  });
</script>

</body>