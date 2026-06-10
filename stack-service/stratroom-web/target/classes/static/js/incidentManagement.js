// var pageNo =  $('#pagenumber').val();
let params = new URLSearchParams(window.location.search);
let pageNo = params.get("pageId");
var INCIDENTS = [];
var commentsData = [];
var taskData = [];
var attachmentsData = [];
var attachment = {
  kpiAttachment: [] 
};


    function getIncidentList() {
      
      $.ajax({
          url: "/stratroom/universalIncidentList?pageId=" + pageNo,
          type: "GET", 
          contentType: "application/json",
          success: function (data) {
              console.log(data, "incident list");
              INCIDENTS = data;
             
          },
          error: function (err) {
              console.error("Error fetching incident list:", err);
          }
      });
    }

    getIncidentList();

console.log("Page No from hidden input:", pageNo);
    $('.modal-custom-select').each(function () {
      let $this = $(this);
      $this.select2({
        width: "100%",
        dropdownParent: $this.closest('.modal')
      });
    });

    document.querySelectorAll('.date-range-picker').forEach(function (el) {
      const pickerId = el.getAttribute('id'); // Find the element's ID
      flatpickr(`#${pickerId}`, {
        mode: "range",
        dateFormat: "M j, Y",
        // defaultDate: ["2025-08-12", "2025-08-13"],
        onClose: function (selectedDates, dateStr, instance) {
          if (selectedDates.length == 2) {
            const start = instance.formatDate(selectedDates[0], "M j, Y");
            const end = instance.formatDate(selectedDates[1], "M j, Y");
            el.value = `${start} to ${end}`; // Set formatted value in input
          }
        }
      });
    });
    document.querySelectorAll('.date-time-picker').forEach(function (el) {
      const pickerId = el.getAttribute('id'); // Find the element's ID
      flatpickr(`#${pickerId}`, {
        enableTime: true,       // enable time selection
        dateFormat: "M j, Y h:i K", // date + time format
        allowInput: true,           // let user type too
        onReady: function (selectedDates, dateStr, instance) {
          const okButton = document.createElement("button");
          okButton.textContent = "OK";
          okButton.type = "button";
          okButton.className = "flatpickr-ok-btn btn btn-sm btn-primary mt-2 w-100";
          instance.calendarContainer.appendChild(okButton);
          okButton.addEventListener("click", function () {
            instance.close();
          });
        },
        // defaultDate: "2025-08-31 14:30", // optional: default datetime
        onClose: function (selectedDates, dateStr, instance) {
          if (selectedDates.length == 1) {
            const formatted = instance.formatDate(selectedDates[0], "M j, Y h:i K");
            el.value = formatted; // Set formatted value in input
          }
        }
      });
    });
    document.querySelectorAll('.date-picker').forEach(function (el) {
      const pickerId = el.getAttribute('id'); // Get the elementâ€™s ID
      flatpickr(`#${pickerId}`, {
        dateFormat: "M j, Y",  // Example: Oct 23, 2025
        allowInput: true
      });
    });
  

    const ProjectCategories = [
      "Operational Lapse", "System Failure", "Cyber Threat", "Equipment Failure"
    ];

    const initiativeCategoryPopoverTrigger = document.getElementById('popoverFilterProjectPlanningCategory');

    let initiativeCategoryPopover;

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
        <div class="d-flex flex-column gap-2 pageViewOption" style="max-height: 300px; overflow-y: auto;">
          ${ProjectCategories.map(category => `
            <div class="form-check">
              <input class="form-check-input filter-risk" id="rc-${category.replace(/\s+/g, '')}" type="checkbox" value="${category}" checked>
              <label class="form-check-label" for="rc-${category.replace(/\s+/g, '')}">${category}</label>
            </div>
          `).join('')}
        </div>
      </div>
    `;
      return content;
    };

    if (initiativeCategoryPopoverTrigger) {
      initiativeCategoryPopover = new bootstrap.Popover(initiativeCategoryPopoverTrigger, {
        html: true,
        placement: 'bottom',
        content: createRiskCategoryContent,
        sanitize: false,
        container: 'body',
        trigger: 'manual'
      });
    }

    // Open popover on button click
    if (initiativeCategoryPopoverTrigger) initiativeCategoryPopoverTrigger.addEventListener('click', () => {
      initiativeCategoryPopover.toggle();
    });

    function filterKpiCardsByInitiative() {
      const checked = Array.from(document.querySelectorAll('.filter-risk:checked')).map(cb => cb.value);
      const allChecked = checked.length == ProjectCategories.length;
      const cards = document.querySelectorAll('.card.meeting-card');

      cards.forEach(card => {
        const riskText = card.querySelector('.rootCauseCategory')?.textContent.trim();
        card.style.display = (allChecked || checked.includes(riskText)) ? '' : 'none';
      });
    }
    // Bind events

    // filterKpiCardsByInitiative();
    // Delegate interactions
    document.addEventListener('click', function (e) {
      if (e.target.closest('.btn-close')) {
        initiativeCategoryPopover.hide();
      }
      document.querySelectorAll('.filter-risk').forEach(cb => {
        cb.addEventListener('change', filterKpiCardsByInitiative);
      });
      if (e.target.classList.contains('select-all-risk')) {
        document.querySelectorAll('.filter-risk').forEach(cb => cb.checked = true);
        filterKpiCardsByInitiative();
      }
      if (e.target.classList.contains('deselect-all-risk')) {
        document.querySelectorAll('.filter-risk').forEach(cb => cb.checked = false);
        filterKpiCardsByInitiative();
      }
    });
  






    // == CATEGORIES (10) ==
    const CATEGORIES = [
      { id: 'safety', label: 'Safety', color: '#c0392b', bg: '#ffedd5' },
      { id: 'it', label: 'IT', color: '#1a56a0', bg: '#dbeafe' },
      { id: 'security', label: 'Security', color: '#4c1d95', bg: '#ede9fe' },
      { id: 'environmental', label: 'Environmental', color: '#14532d', bg: '#dcfce7' },
      { id: 'hr', label: 'HR', color: '#9c2863', bg: '#fce7f3' },
      { id: 'compliance', label: 'Compliance', color: '#78350f', bg: '#fef3c7' },
      { id: 'quality', label: 'Quality', color: '#0f4e47', bg: '#ccfbf1' },
      { id: 'facilities', label: 'Facilities', color: '#374151', bg: '#f3f4f6' },
      { id: 'finance', label: 'Finance', color: '#1e3a8a', bg: '#dbeafe' },
      { id: 'legal', label: 'Legal', color: '#701a75', bg: '#fae8ff' }
    ];


    // == INCIDENTS (25) ==
    // const INCIDENTS = [
    //   { id: 'INC-2025-0012', cat: 'safety', title: 'Forklift collision in Warehouse B', sev: 'High', status: 'Under Investigation', dept: 'Plant A – Warehouse B', root: 'Operational Lapse', rby: 'Mark Lewis', ato: 'John Smith', idate: '2025-10-29T15:15', rdate: '2025-10-29' },
    //   { id: 'INC-2025-0013', cat: 'it', title: 'Server downtime – HRMS system outage', sev: 'Medium', status: 'Closed', dept: 'HQ – Data Center', root: 'System Failure', rby: 'Rina Patel', ato: 'IT Ops Team', idate: '2025-10-30T09:20', rdate: '2025-10-30' },
    //   { id: 'INC-2025-0014', cat: 'security', title: 'Unauthorized access attempt on server room', sev: 'Critical', status: 'Escalated', dept: 'HQ – Server Room', root: 'Cyber Threat', rby: 'Security Bot', ato: '&mdash;', idate: '2025-10-31T01:40', rdate: '2025-10-31' },
    //   { id: 'INC-2025-0015', cat: 'environmental', title: 'Chemical spill in Lab C – dilute acid leak', sev: 'Medium', status: 'In Review', dept: 'Plant B – Lab C', root: 'Equipment Failure', rby: 'Dr. Chen', ato: 'HSE Officer', idate: '2025-10-31T11:10', rdate: '2025-10-31' },
    //   { id: 'INC-2025-0016', cat: 'hr', title: 'Workplace harassment complaint – Floor 3', sev: 'High', status: 'Under Investigation', dept: 'HR – HQ Floor 3', root: 'Policy Violation', rby: 'Priya Sharma', ato: 'HR Manager', idate: '2025-11-01T10:00', rdate: '2025-11-01' },
    //   { id: 'INC-2025-0017', cat: 'it', title: 'Ransomware attack on finance workstations', sev: 'Critical', status: 'Escalated', dept: 'Finance – HQ Floor 5', root: 'Cyber Threat', rby: 'IT Ops Team', ato: 'CISO', idate: '2025-11-01T14:30', rdate: '2025-11-01' },
    //   { id: 'INC-2025-0018', cat: 'safety', title: 'Slip and fall near loading dock – Site D', sev: 'Low', status: 'Closed', dept: 'Facilities – Site D', root: 'Operational Lapse', rby: 'Tom Wilson', ato: 'Safety Officer', idate: '2025-11-02T08:45', rdate: '2025-11-02' },
    //   { id: 'INC-2025-0019', cat: 'quality', title: 'Batch defect – Product line QX-7 substandard coating', sev: 'High', status: 'In Review', dept: 'Quality – Plant C', root: 'Process Gap', rby: 'Arjun Mehta', ato: 'QA Lead', idate: '2025-11-02T12:00', rdate: '2025-11-02' },
    //   { id: 'INC-2025-0020', cat: 'compliance', title: 'GDPR data breach – customer PII exposed', sev: 'Critical', status: 'Escalated', dept: 'HQ – Data Center', root: 'System Failure', rby: 'System Auto Log', ato: 'DPO', idate: '2025-11-02T23:55', rdate: '2025-11-03' },
    //   { id: 'INC-2025-0021', cat: 'facilities', title: 'HVAC system failure – Plant A Block 2', sev: 'Medium', status: 'Under Investigation', dept: 'Plant A – Warehouse B', root: 'Equipment Failure', rby: 'Tom Wilson', ato: 'Facilities Manager', idate: '2025-11-03T07:00', rdate: '2025-11-03' },
    //   { id: 'INC-2025-0022', cat: 'environmental', title: 'Effluent discharge exceeding permissible limits', sev: 'High', status: 'In Review', dept: 'Plant B – Lab C', root: 'Process Gap', rby: 'Dr. Chen', ato: 'HSE Officer', idate: '2025-11-03T15:00', rdate: '2025-11-03' },
    //   { id: 'INC-2025-0023', cat: 'legal', title: 'Contractual breach – Vendor non-delivery', sev: 'Medium', status: 'New', dept: 'Legal – HQ Floor 6', root: 'Third-Party Failure', rby: 'Sarah Okafor', ato: 'Legal Counsel', idate: '2025-11-04T09:00', rdate: '2025-11-04' },
    //   { id: 'INC-2025-0024', cat: 'finance', title: 'Duplicate payment processing error – ERP glitch', sev: 'High', status: 'Under Investigation', dept: 'Finance – HQ Floor 5', root: 'System Failure', rby: 'Rina Patel', ato: 'Finance Controller', idate: '2025-11-04T11:30', rdate: '2025-11-04' },
    //   { id: 'INC-2025-0025', cat: 'safety', title: 'Electrical arc flash – Switchgear Room 1', sev: 'Critical', status: 'Escalated', dept: 'Facilities – Site D', root: 'Equipment Failure', rby: 'Tom Wilson', ato: 'Safety Officer', idate: '2025-11-04T16:15', rdate: '2025-11-04' },
    //   { id: 'INC-2025-0026', cat: 'hr', title: 'Unauthorized overtime approvals – Ops team', sev: 'Low', status: 'Closed', dept: 'Operations – Distribution', root: 'Policy Violation', rby: 'Mark Lewis', ato: 'HR Manager', idate: '2025-11-05T09:00', rdate: '2025-11-05' },
    //   { id: 'INC-2025-0027', cat: 'it', title: 'Phishing campaign – 14 employees clicked malicious link', sev: 'High', status: 'Under Investigation', dept: 'HQ – Server Room', root: 'Human Error', rby: 'IT Ops Team', ato: 'CISO', idate: '2025-11-05T10:45', rdate: '2025-11-05' },
    //   { id: 'INC-2025-0028', cat: 'quality', title: 'Customer complaint – contamination in Batch QX-9', sev: 'Critical', status: 'Escalated', dept: 'Quality – Plant C', root: 'Process Gap', rby: 'Arjun Mehta', ato: 'QA Lead', idate: '2025-11-05T14:00', rdate: '2025-11-05' },
    //   { id: 'INC-2025-0029', cat: 'security', title: 'Tailgating incident – R&D restricted access zone', sev: 'Medium', status: 'New', dept: 'HQ – Server Room', root: 'Operational Lapse', rby: 'Security Bot', ato: 'Security Manager', idate: '2025-11-06T08:15', rdate: '2025-11-06' },
    //   { id: 'INC-2025-0030', cat: 'compliance', title: 'SOX audit finding – missing approval trail', sev: 'High', status: 'In Review', dept: 'Finance – HQ Floor 5', root: 'Process Gap', rby: 'Sarah Okafor', ato: 'Compliance Officer', idate: '2025-11-06T11:00', rdate: '2025-11-06' },
    //   { id: 'INC-2025-0031', cat: 'environmental', title: 'Asbestos discovered during Building C renovation', sev: 'Critical', status: 'New', dept: 'Facilities – Site D', root: 'Natural Cause', rby: 'Tom Wilson', ato: 'HSE Officer', idate: '2025-11-06T13:30', rdate: '2025-11-06' },
    //   { id: 'INC-2025-0032', cat: 'facilities', title: 'Roof leak causing archive room damage', sev: 'Low', status: 'Closed', dept: 'Facilities – Site D', root: 'Equipment Failure', rby: 'Tom Wilson', ato: 'Facilities Manager', idate: '2025-11-06T15:00', rdate: '2025-11-06' },
    //   { id: 'INC-2025-0033', cat: 'legal', title: 'IP infringement claim filed by competitor', sev: 'High', status: 'Under Investigation', dept: 'Legal – HQ Floor 6', root: 'Third-Party Failure', rby: 'Sarah Okafor', ato: 'Legal Counsel', idate: '2025-11-07T10:00', rdate: '2025-11-07' },
    //   { id: 'INC-2025-0034', cat: 'hr', title: 'Data privacy breach – employee health records accessed', sev: 'Critical', status: 'Escalated', dept: 'HR – HQ Floor 3', root: 'Human Error', rby: 'Priya Sharma', ato: 'DPO', idate: '2025-11-07T14:00', rdate: '2025-11-07' },
    //   { id: 'INC-2025-0035', cat: 'finance', title: 'Petty cash discrepancy – Operations site', sev: 'Low', status: 'Closed', dept: 'Operations – Distribution', root: 'Human Error', rby: 'Rina Patel', ato: 'Finance Controller', idate: '2025-11-07T16:00', rdate: '2025-11-07' },
    //   { id: 'INC-2025-0036', cat: 'it', title: 'Cloud storage misconfiguration – public bucket exposed', sev: 'Critical', status: 'Under Investigation', dept: 'HQ – Data Center', root: 'Human Error', rby: 'System Auto Log', ato: 'CISO', idate: '2025-11-08T06:00', rdate: '2025-11-08' }
    // ];

    let currentFilter = '';

    // == helpers ==
    function getRandomColor() {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
    // function getCat(id) { return CATEGORIES.find(c => c.id == id) || { label: id, color: '#888', bg: '#f0f0f0' }; }
    function getCat(id) {
      const found = CATEGORIES.find(c => c.id == id);

      if (found) return found;

      return {
        label: id,
        color: getRandomColor(),
        bg: getRandomColor()
      };
    }

    function getSevBadge(sv) {
      const cls = sv == 'Critical' ? 'sv-critical' : sv == 'High' ? 'sv-high' : sv == 'Medium' ? 'sv-medium' : 'sv-low';
      return `<span class="inc-badge ${cls}">${sv}</span>`;
    }
    function getStatusBadge(st) {
      let cls = 's-new';
      if (st == 'Under Investigation') cls = 's-inv';
      else if (st == 'In Review') cls = 's-review';
      else if (st == 'Closed') cls = 's-closed';
      else if (st == 'Escalated') cls = 's-esc';
      return `<span class="inc-badge ${cls}">${st}</span>`;
    }
    function initials(n) { return n?.split(' ').filter(Boolean).map(w => w[0]).join('').slice(0, 2).toUpperCase(); }
    function fmtDate(d) { try { return new Date(d).toLocaleString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }).replace(',', ''); } catch (e) { return d; } }
    function fmtDateTime(d) { try { return new Date(d).toLocaleString('en-US', { day: '2-digit', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit' }).replace(',', ', '); } catch (e) { return d; } }

    // == switchMain ==
    function switchMain(t, navEl) {
      document.querySelectorAll('.screen').forEach(s => s.style.display = 'none');
      document.querySelectorAll('#registryTabs .nav-link').forEach(n => n.classList.remove('active'));
      document.getElementById('screen-' + t).style.display = 'block';
      if (navEl) navEl.classList.add('active');
      if (t == 'list') renderList();
      if (t == 'cat') renderCatDashboard();
      console.log(t, navEl, "navEl");
      if (window.lucide) lucide.createIcons();
    }

    // == filterType ==
    function filterType(t) { currentFilter = t; renderList(); }

    // == renderList ==
    function renderList() {
      // Stats
      document.getElementById('cnt-total-header').innerText = INCIDENTS.length;
      document.getElementById('cnt-all').innerText = INCIDENTS.length;
      document.getElementById('cnt-open').innerText = INCIDENTS.filter(i => i.incidentValue.classification.initialStatus !== 'Closed').length;
      document.getElementById('cnt-crit').innerText = INCIDENTS.filter(i => i.incidentValue.classification.severity == 'Critical').length;
      document.getElementById('cnt-closed').innerText = INCIDENTS.filter(i => i.incidentValue.classification.initialStatus == 'Closed').length;

      // Chips
      const allChip = `<div class="chip ${currentFilter == '' ? 'active' : ''}" onclick="filterType('')">All</div>`;
      const catChips = CATEGORIES.map(c => {
        const cnt = INCIDENTS.filter(i => i.cat == c.id).length;
        if (!cnt) return '';
        return `<div class="chip ${currentFilter == c.id ? 'active' : ''}" onclick="filterType('${c.id}')">${c.label} <span style="opacity:.65">${cnt}</span></div>`;
      }).join('');
      document.getElementById('cat-chips').innerHTML = allChip + catChips;

      const term = document.getElementById('search-input').value.toLowerCase();
      const sort = document.getElementById('sort-sel').value;

      let arr = INCIDENTS.filter(i =>
        (currentFilter == '' || i.cat == currentFilter) &&
        (!term || i.incidentValue.incidentDetails.incidentTitle.toLowerCase().includes(term) || i.id || i.incidentValue.classification.department.toLowerCase().includes(term) || i.incidentValue.createdByName.toLowerCase().includes(term))
      ); 

      if (sort == 'sev') { const o = { Critical: 0, High: 1, Medium: 2, Low: 3 }; arr.sort((a, b) => o[a.incidentValue.classification.severity] - o[b.incidentValue.classification.severity]); }
      else if (sort == 'id') { arr.sort((a, b) => b.id); }
      else { arr.sort((a, b) => new Date(b.idate) - new Date(a.idate)); }

      if (!arr.length) {
        document.getElementById('incident-list').innerHTML = '<div class="col-12"><div class="empty" style="text-align:center;padding:36px 20px;color:#aaa;font-size:13px;">No incidents match your search.</div></div>';
        if (window.lucide) lucide.createIcons();
        return;
      }

      let html = '';
      arr.forEach(i => {
        console.log(i, "iData");
        const cat = getCat(i.cat);
        const abbr = initials(i?.incidentValue?.createdByName);
        const diffDays = Math.ceil(Math.abs(new Date() - new Date(i.incidentValue.incidentDetails.reportedDate)) / (1000 * 60 * 60 * 24));
        const unassigned = i.ato == '&mdash;';
        const openText = i.incidentValue.classification.initialStatus == 'Closed' ? 'Closed' : unassigned ? '&#9888; Unassigned' : diffDays + ' days open';
        const openColor = i.incidentValue.classification.initialStatus == 'Closed' ? '#1e6e36' : unassigned ? '#c0392b' : diffDays > 2 ? '#9c6200' : '#1e6e36';

        const svClass = i.sev == 'Critical' ? 'sv-critical' : i.sev == 'High' ? 'sv-high' : i.sev == 'Medium' ? 'sv-medium' : 'sv-low';
        const stClass = i.incidentValue.classification.initialStatus == 'Under Investigation' ? 's-inv' : i.incidentValue.classification.initialStatus == 'In Review' ? 's-review' : i.incidentValue.classification.initialStatus == 'Closed' ? 's-closed' : i.incidentValue.classification.initialStatus == 'Escalated' ? 's-esc' : 's-new';

        html += `
        <div class="col-lg-4">
          <div class="inc-card" onclick="openDetail('${i.id}')">
            <div class="card-header">
              <div class="inc-id" style="background:${cat.color}">${i.incidentValue.incidentDetails.incidentId ||i.id}</div>
              <div class="card-acts">
                <a href="#" class="action-btn" onclick="event.stopPropagation(); openDetail('${i.id}')" title="View"><i data-lucide="eye" style="width:14px;height:14px;"></i></a>
                <a href="#" class="action-btn" onclick="event.stopPropagation()" title="Attach"><i data-lucide="paperclip" style="width:14px;height:14px;"></i></a>
                <div class="dropdown m-0 p-0" style="display:inline-flex;">
                  <a class="action-btn" data-bs-toggle="dropdown" onclick="event.stopPropagation()" title="More"><i data-lucide="more-horizontal" style="width:14px;height:14px;"></i></a>
                  <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                    <li><a class="dropdown-item" href="#">View</a></li>
                    <li><a class="dropdown-item" onclick="event.stopPropagation(); updateForm('${i.id}')">Edit</a></li>
                    <li><a class="dropdown-item" href="#">Delete</a></li>  
                  </ul> 
                </div>
              </div>
            </div>
            <div class="card-body">
              <div class="card-title">${i?.incidentValue?.incidentDetails?.incidentTitle ? i.incidentValue.incidentDetails.incidentTitle : 'N/A'}</div>
              <div class="card-grid">
                <div><div class="f-label">STATUS</div><div class="f-val"><span class="inc-badge ${stClass}">${i?.incidentValue?.classification?.initialStatus ? i?.incidentValue?.classification?.initialStatus : 'N/A'}</span></div></div>
                <div><div class="f-label">SEVERITY</div><div class="f-val"><span class="inc-badge ${svClass}">${i?.incidentValue?.classification?.severity ? i?.incidentValue?.classification?.severity : 'N/A'}</span></div></div>
                <div><div class="f-label">DEPARTMENT</div><div class="f-val">${i?.incidentValue?.classification?.department ? i?.incidentValue?.classification?.department : 'N/A'}</div></div>
                <div><div class="f-label">ROOT CAUSE</div><div class="f-val">${i?.incidentValue?.classification?.rootCause ? i?.incidentValue?.classification?.rootCause : '-'}</div></div>
                <div><div class="f-label">DATE REPORTED</div><div class="f-val">${fmtDate(i?.incidentValue?.incidentDetails?.reportedDate ? i.incidentValue.incidentDetails.reportedDate : "")}</div></div>
                <div><div class="f-label">INCIDENT DATE</div><div class="f-val">${fmtDateTime(i?.incidentValue?.incidentDetails?.incidentDateTime ? i.incidentValue.incidentDetails.incidentDateTime : "")}</div></div>

                <div>
  <div class="f-label">CORRECTIVE ACTIONS</div>

  <div class="f-val d-flex flex-wrap gap-1">
    ${
      i?.incidentValue?.assignment?.correctiveActions?.length
        ? i.incidentValue.assignment.correctiveActions
            .map(a => `<span class="ca-tag">&#10003; ${a}</span>`)
            .join('')
        : `<span class="fw-semibold" style="font-size:13px; color:var(--stratroom-body-color);">0</span>`
    }
  </div>
</div>
                <div><div class="f-label">INCIDENT CLOSED DATE</div><div class="f-val">${fmtDateTime(i?.incidentValue?.classification?.incidentClosedDate ? i.incidentValue.classification.incidentClosedDate : "")}</div></div>

              </div>
            </div>
            <div class="card-footer">
              <div class="meta-row">
                <div class="avatar" style="background:${cat.bg};color:${cat.color};">${abbr}</div>
                <span>${i?.incidentValue?.createdByName ? i?.incidentValue?.createdByName : "N/A"}</span>
              </div>
              <div class="meta-row gap-2">
                <span class="d-flex align-items-center gap-1"><i data-lucide="paperclip" style="width:12px;height:12px;"></i>${i?.incidentValue?.incidentAttachment?.length || 0}</span>
                <span class="d-flex align-items-center gap-1"><i data-lucide="message-square" style="width:12px;height:12px;"></i> ${i?.incidentValue?.comments?.length || 0}</span>
                <span class="d-flex align-items-center gap-1" style="color:#1e6e36;"><i data-lucide="check-square" style="width:12px;height:12px;"></i> ${i?.incidentValue?.tasks?.length || 0}</span>
              
              </div>
              <div class="meta-row" style="gap:10px;">               
                <span style="color:${openColor};font-weight:600;margin-left:5px;">${openText}</span>
              </div>
            </div>
          </div>
        </div>`;
      });

      document.getElementById('incident-list').innerHTML = html;
      if (window.lucide) lucide.createIcons();
    }

    // == renderCatDashboard ==
    function renderCatDashboard() {
      const total = INCIDENTS.length;
      const hexToRgba = (hex, alpha) => {
        let r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r},${g},${b},${alpha})`;
      };

      document.getElementById('cat-dashboard').innerHTML = CATEGORIES.map(c => {
        const items = INCIDENTS.filter(i => i.incidentValue.classification.incidentType == c.label);
        if (!items.length) return '';
        const crit = items.filter(i => i.incidentValue.classification.severity == 'Critical').length;
        const pct = Math.round(items.length / total * 100);

        const rows = items.map(i => `<tr onclick="openDetail('${i.id}')" style="cursor:pointer">
          <td><span style="color:${c.color};font-weight:600">${i.id}</span></td>
          <td style="max-width:170px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${i.incidentValue.incidentDetails.incidentTitle}</td>
          <td>${getSevBadge(i.incidentValue.classification.severity)}</td>
          <td>${getStatusBadge(i.incidentValue.classification.initialStatus)}</td>
        </tr>`).join('');

        return `<div class="col-12"><div class="cat-section">
          <div class="cat-header-row" style="background:${hexToRgba(c.color, 0.08)};border-color:${hexToRgba(c.color, 0.18)}">
            <div class="cat-dot" style="background:${c.color}"></div>
            <span class="cat-name">${c.label}</span>
            <div class="bar-wrap"><div class="bar-fill" style="width:${pct}%;background:${c.color}"></div></div>
            <span class="cat-count">${items.length} incidents</span>
            ${crit ? `<span class="inc-badge sv-critical" style="margin-left:4px;font-size:10px;">${crit} critical</span>` : ''}
          </div>
          <div class="mini-table-wrap mt-0">
            <table class="mini-table table table-hover w-100 nowrap">
              <thead><tr><th>ID</th><th>Title</th><th>Severity</th><th>Status</th></tr></thead>
              <tbody>${rows}</tbody>
            </table>
          </div>
        </div></div>`;
      }).join('');

      setTimeout(() => {
        if ($.fn.DataTable) {
          $('.mini-table').DataTable({
            // destroy: true,
            // lengthChange: false,
            // autoWidth: false,
            responsive: true,
            scrollX: true,
            info: false,
            dom: 't'
          });
        }
      }, 0);
    }


    function renderTasks(tasks) {
      console.log(tasks, "tasks")
  const tbody = $('#detail-tasks-body');
  tbody.empty(); // clear existing rows

  if (!tasks || tasks.length == 0) {
    // optional: add empty row if no data
    addDetailTask();
    return;
  }

  tasks.forEach((t, index) => {
    const row = `
      <tr>
        <td>
          <textarea class="form-control" rows="3">${t.task || ''}</textarea>
        </td>
        <td class="text-center">
          <div class="table-actions justify-content-center">
            ${
              index == tasks.length - 1
                ? `<a class="btn btn-sm btn-icon" onclick="addDetailTask()">
                     <i data-lucide="plus" style="width:16px;height:16px;"></i>
                   </a>`
                : ''
            }
            <a class="btn btn-sm btn-icon" onclick="removeDetailTask(this)">
              <i data-lucide="trash-2" style="width:14px;height:14px;"></i>
            </a>
          </div>
        </td>
      </tr>
    `;

    tbody.append(row);
  });

  // refresh icons if using lucide
  if (window.lucide) lucide.createIcons();
}

function renderComments(comments) {
  const tbody = $('#detail-comments-body');
  tbody.empty();

  if (!comments || comments.length == 0) {
    addDetailComment();
    return;
  }

  comments.forEach((c, index) => {
    const row = `
      <tr>
        <td>
          <textarea class="form-control" rows="3">${c.comment || ''}</textarea>
        </td>
        <td class="text-center">
          <div class="table-actions justify-content-center">
            ${
              index == comments.length - 1
                ? `<a class="btn btn-sm btn-icon" onclick="addDetailComment()">
                     <i data-lucide="plus" style="width:16px;height:16px;"></i>
                   </a>`
                : ''
            }
            <a class="btn btn-sm btn-icon" onclick="removeDetailComment(this)">
              <i data-lucide="trash-2" style="width:14px;height:14px;"></i>
            </a>
          </div>
        </td>
      </tr>
    `;

    tbody.append(row);
  });

  if (window.lucide) lucide.createIcons();
}


function renderAttachments(apiData = []) {
    const tbody = $('#detail-attachments-body');
    tbody.empty();

    // If NO data → show one empty row
    if (!apiData || apiData.length == 0) {
        tbody.append(getAttachmentRow());
        return;
    }

    // If data exists → map rows
    apiData.forEach((item, index) => {
        tbody.append(getAttachmentRow(item, index));
    });
};

function getAttachmentRow(data = null, index = null) {

    let fileNameDisplay = data ? data.name : "";

    return `
        <tr>
            <td>
                <div class="w-100">
                    <input type="file" class="form-control"
                        accept=".pdf,.ppt,.pptx,.jpeg,.jpg,.png,.xlsx,.doc,.docx"
                        onchange="handleFileSelect(event)">

                    <small class="file-name text-muted ${fileNameDisplay ? '' : 'd-none'}">
                        ${fileNameDisplay}
                    </small>
                </div>
            </td>
            <td class="text-center">
                <div class="table-actions justify-content-center">
                    <a class="btn btn-sm btn-icon" onclick="addDetailAttachment()">
                        <i data-lucide="plus" style="width:16px;height:16px;"></i>
                    </a>
                    <a class="btn btn-sm btn-icon" onclick="removeDetailAttachment(this)">
                        <i data-lucide="trash-2" style="width:14px;height:14px;"></i>
                    </a>
                </div>
            </td>
        </tr>
    `;
};

    // == openDetail ==
    function openDetail(id) {
      const i = INCIDENTS.find(x => x.id == id);
      console.log(i, "idatttt");
      // renderTasks(i.incidentValue.tasks || []);
      if (!i) return;
      const cat = getCat(i.cat);
      const rdateFmt = fmtDate(i?.incidentValue?.incidentDetails?.reportedDate ? i.incidentValue.incidentDetails.reportedDate : "");
      const diffDays = Math.ceil(Math.abs(new Date() - new Date(i.incidentValue.incidentDetails.reportedDate)) / (1000 * 60 * 60 * 24));
      const openText = i.incidentValue.classification.initialStatus == 'Closed' ? 'Closed' : diffDays + ' days open';

      document.getElementById('detail-content').innerHTML = `
    <div class="detail-header mb-4 p-4 rounded text-white shadow-sm" style="background: var(--stratroom-primary, #7B2D8B);">
      <div class="d-flex align-items-start justify-content-between gap-3">
        <div>
          <div class="text-white-50 small mb-1" style="font-size:11px; font-weight:600; letter-spacing:0.5px;">
            ${getSevBadge(i.incidentValue.incidentDetails.incidentId || i.id)}
          </div>
          <h3 class="mb-0 text-white fw-bold" style="font-size: 20px;">${i?.incidentValue?.incidentDetails?.incidentTitle ? i.incidentValue.incidentDetails.incidentTitle : 'N/A'}</h3>
        </div>
        ${getSevBadge(i?.incidentValue?.classification?.severity ? i?.incidentValue?.classification?.severity : 'N/A')}
      </div>
      <div class="d-flex gap-3 flex-wrap mt-3 align-items-center">
        ${getStatusBadge(i?.incidentValue?.classification?.initialStatus ? i?.incidentValue?.classification?.initialStatus : 'N/A')}
        <span class="text-white-50 d-flex align-items-center gap-1" style="font-size:12px;">
          <i data-lucide="clock" style="width:14px;height:14px;"></i> Reported ${rdateFmt}
        </span>
        <span class="text-white-50" style="font-size:12px;">&middot;</span>
        <span class="text-white-50" style="font-size:12px;">${openText}</span>
      </div>
    </div>
    

    <ul class="nav nav-tabs gap-2 mb-4 border-bottom" id="dtab-nav">
      <li class="nav-item">
        <button class="nav-link active px-4 fw-medium" data-dtab="tab-overview" onclick="setDtab(this)" style="color: var(--stratroom-primary, #7B2D8B); background: transparent; border-bottom: 2px solid var(--stratroom-primary, #7B2D8B); border-color: transparent transparent var(--stratroom-primary, #7B2D8B) transparent;">Overview</button>
      </li>
      <li class="nav-item">
        <button class="nav-link px-4 fw-medium text-muted border-0" data-dtab="tab-actions" onclick="setDtab(this)" style="background: transparent;">Actions / Tasks</button>
      </li>
      <li class="nav-item">
        <button class="nav-link px-4 fw-medium text-muted border-0" data-dtab="tab-attachments" onclick="setDtab(this)" style="background: transparent;">Attachments</button>
      </li>
      <li class="nav-item">
        <button class="nav-link px-4 fw-medium text-muted border-0" data-dtab="tab-comments" onclick="setDtab(this)" style="background: transparent;">Comments</button>
      </li>
    </ul>

    <div class="row g-4 mb-4">
      <div class="col-lg-8">
      <div class="dtab-panel" id="tab-overview">
        <div class="card custom-card h-100">
          <div class="card-body p-4">
            <h6 class="card-title text-uppercase fw-bold mb-4" style="font-size:12px; letter-spacing:0.5px; color: var(--stratroom-primary, #7B2D8B);">
               Incident Details
            </h6>
            <div class="row g-4">
              <div class="col-sm-6">
                <div class="text-uppercase text-muted mb-1" style="font-size:10px; letter-spacing:0.3px;">Incident Type</div>
                <div class="fw-semibold" style="font-size:13px; color:var(--stratroom-body-color);">${i?.incidentValue?.classification?.incidentType ? i?.incidentValue?.classification?.incidentType : 'N/A'}</div>
              </div>
              <div class="col-sm-6">
                <div class="text-uppercase text-muted mb-1" style="font-size:10px; letter-spacing:0.3px;">Severity</div>
                <div>${getSevBadge(i?.incidentValue?.classification?.severity ? i?.incidentValue?.classification?.severity : 'N/A')}</div>
              </div>
              <div class="col-sm-6">
                <div class="text-uppercase text-muted mb-1" style="font-size:10px; letter-spacing:0.3px;">Department / Site</div>
                <div class="fw-semibold" style="font-size:13px; color:var(--stratroom-body-color);">${i?.incidentValue?.classification?.department ? i?.incidentValue?.classification?.department : 'N/A'}</div>
              </div>
              <div class="col-sm-6">
                <div class="text-uppercase text-muted mb-1" style="font-size:10px; letter-spacing:0.3px;">Root Cause Category</div>
                <div class="fw-semibold" style="font-size:13px; color:var(--stratroom-body-color);">${i?.incidentValue?.classification?.rootCause ? i?.incidentValue?.classification?.rootCause : 'N/A'}</div>
              </div>
              <div class="col-sm-6">
                <div class="text-uppercase text-muted mb-1" style="font-size:10px; letter-spacing:0.3px;">Incident Date / Time</div>
                <div class="fw-semibold" style="font-size:13px; color:var(--stratroom-body-color);">${fmtDateTime(i?.incidentValue?.incidentDetails?.incidentDateTime ? i?.incidentValue?.incidentDetails?.incidentDateTime : '')}</div>
              </div>
              <div class="col-sm-6">
                <div class="text-uppercase text-muted mb-1" style="font-size:10px; letter-spacing:0.3px;">Date Reported</div>
                <div class="fw-semibold" style="font-size:13px; color:var(--stratroom-body-color);">${rdateFmt}</div>
              </div>
                         </div>
          </div>
        </div>
        </div>

        <div class="dtab-panel" id="tab-actions" style="display:none;">
            <div class="card custom-card">
              <div class="card-body p-4">
                <div class="d-flex align-items-center justify-content-between mb-2">
                  <h6 class="card-title text-uppercase fw-bold mb-0" style="font-size:12px; letter-spacing:0.5px; color: var(--stratroom-primary, #7B2D8B);">Actions / Tasks</h6>
                  <button class="btn btn-sm btn-primary d-flex align-items-center gap-1" onclick="addDetailTask()"><i data-lucide="plus" style="width:14px;height:14px;"></i> Add Task</button>
                </div>
                <div class="table-responsive">
                  <table class="table table-sm table-bordered align-middle" id="detail-tasks-table">
                    <thead>
                      <tr>
                        <th class="text-center text-uppercase" style="font-size:11px; letter-spacing:0.5px;">Actions / Tasks</th>
                        <th class="text-center text-uppercase" style="font-size:11px; letter-spacing:0.5px; width:120px;">Actions</th>
                      </tr>
                    </thead>
                    <tbody id="detail-tasks-body">
                     
                    </tbody>
                  </table>
                </div>
                <div class="d-flex justify-content-end gap-2 mt-3">
                  <button class="btn btn-sm btn-label-secondary" onclick="switchMain('detail')">Cancel</button>
                  <button class="btn btn-sm btn-primary" onclick="saveActionsTasks(${id})">Save</button>
                </div>
              </div>
            </div>
          </div>

          <!-- ==== TAB: Attachments ==== -->
          <div class="dtab-panel" id="tab-attachments" style="display:none;">
            <div class="card custom-card">
              <div class="card-body p-4">
                <div class="d-flex align-items-center justify-content-between mb-2">
                  <h6 class="card-title text-uppercase fw-bold mb-0" style="font-size:12px; letter-spacing:0.5px; color: var(--stratroom-primary, #7B2D8B);">Attachments</h6>
                  <button class="btn btn-sm btn-primary d-flex align-items-center gap-1" onclick="addDetailAttachment()"><i data-lucide="plus" style="width:14px;height:14px;"></i> Add Attachment</button>
                </div>
                <div class="table-responsive">
                  <table class="table table-sm table-bordered align-middle" id="detail-attachments-table">
                    <thead>
                      <tr>
                        <th class="text-center text-uppercase" style="font-size:11px; letter-spacing:0.5px;">Attachments</th>
                        <th class="text-center text-uppercase" style="font-size:11px; letter-spacing:0.5px; width:120px;">Actions</th>
                      </tr>
                    </thead>
                    <tbody id="detail-attachments-body">
                      
                    </tbody>
                  </table>
                </div>
                <div class="d-flex justify-content-end gap-2 mt-3">
                  <button class="btn btn-sm btn-label-secondary" onclick="switchMain('detail')">Cancel</button>
                  <button class="btn btn-sm btn-primary" onclick="saveAttachments(${id})">Save</button>
                </div>
              </div>
            </div>
          </div>

          <!-- ==== TAB: Comments ==== -->
          <div class="dtab-panel" id="tab-comments" style="display:none;">
            <div class="card custom-card">
              <div class="card-body p-4">
                <div class="d-flex align-items-center justify-content-between mb-2">
                  <h6 class="card-title text-uppercase fw-bold mb-0" style="font-size:12px; letter-spacing:0.5px; color: var(--stratroom-primary, #7B2D8B);">Comments</h6>
                  <button class="btn btn-sm btn-primary d-flex align-items-center gap-1" onclick="addDetailComment()"><i data-lucide="plus" style="width:14px;height:14px;"></i> Add Comment</button>
                </div>
                <div class="table-responsive">
                  <table class="table table-sm table-bordered align-middle" id="detail-comments-table">
                    <thead>
                      <tr>
                        <th class="text-center text-uppercase" style="font-size:11px; letter-spacing:0.5px;">Comments</th>
                        <th class="text-center text-uppercase" style="font-size:11px; letter-spacing:0.5px; width:120px;">Actions</th>
                      </tr>
                    </thead>
                    <tbody id="detail-comments-body">
                      
                    </tbody>
                  </table>
                </div>
                <div class="d-flex justify-content-end gap-2 mt-3">
                  <button class="btn btn-sm btn-label-secondary" onclick="switchMain('detail')">Cancel</button>
                  <button class="btn btn-sm btn-primary" onclick="saveComments(${id})">Save</button>
                </div>
              </div>
            </div>
          </div>
      </div>

      <div class="col-lg-4 d-flex flex-column gap-4">
        <div class="card custom-card">
          <div class="card-body p-4">
            <h6 class="card-title text-uppercase fw-bold mb-4" style="font-size:12px; letter-spacing:0.5px; color: var(--stratroom-primary, #7B2D8B);">
              People
            </h6>
            <div class="d-flex flex-column gap-4">
              <div>
                <div class="text-uppercase text-muted mb-2" style="font-size:10px; letter-spacing:0.3px;">Reported By</div>
                <div class="d-flex align-items-center gap-2">
                  <div class="avatar avatar-sm d-flex align-items-center justify-content-center rounded-circle" style="background:${cat.bg};color:${cat.color};width:28px;height:28px;font-size:11px;font-weight:600;">${initials(i?.incidentValue?.createdByName ? i?.incidentValue?.createdByName : 'N/A')}</div>
                  <span class="fw-semibold" style="font-size:13px; color:var(--stratroom-body-color);">${i?.incidentValue?.createdByName ? i?.incidentValue?.createdByName : 'N/A'}</span>
                </div>
              </div>
              <div>
                <div class="text-uppercase text-muted mb-1" style="font-size:10px; letter-spacing:0.3px;">Assigned To</div>
                <div class="fw-semibold" style="font-size:13px; color:var(--stratroom-body-color);">${i?.incidentValue?.assignment?.primaryAssignee ? i?.incidentValue?.assignment?.primaryAssignee  : 'N/A  '}</div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="card custom-card flex-fill">
          <div class="card-body p-4">
            <h6 class="card-title text-uppercase fw-bold mb-4" style="font-size:12px; letter-spacing:0.5px; color: var(--stratroom-primary, #7B2D8B);">
              Activity Timeline
            </h6>
            
            <div class="d-flex gap-3 mb-0 position-relative">
              <div class="d-flex flex-column align-items-center">
                <div class="rounded-circle d-flex align-items-center justify-content-center z-1" style="width:28px;height:28px;background:#fee2e2;color:#ef4444;"><i data-lucide="alert-triangle" style="width:14px;height:14px;"></i></div>
                <div style="width:1.5px; min-height:40px; background:#e5e7eb; margin-top:-4px; margin-bottom:-4px;"></div>
              </div>
              <div class="pb-4">
                <div class="fw-semibold" style="font-size:13px; color:var(--stratroom-body-color); margin-top:4px;">Incident reported</div>
                <div class="text-muted mt-1" style="font-size:11px;">${i?.incidentValue?.createdByName ? i?.incidentValue?.createdByName : 'N/A'} &middot; ${rdateFmt}</div>
              </div>
            </div>

            ${i.ato && i.ato !== '&mdash;' ? `
            <div class="d-flex gap-3 mb-0 position-relative">
              <div class="d-flex flex-column align-items-center">
                <div class="rounded-circle d-flex align-items-center justify-content-center z-1" style="width:28px;height:28px;background:#f3f4f6;color:#6b7280;"><i data-lucide="user" style="width:14px;height:14px;"></i></div>
                <div style="width:1.5px; min-height:40px; background:#e5e7eb; margin-top:-4px; margin-bottom:-4px;"></div>
              </div>
              <div class="pb-4">
                <div class="fw-semibold" style="font-size:13px; color:var(--stratroom-body-color); margin-top:4px;">Assigned to ${i.ato}</div>
                <div class="text-muted mt-1" style="font-size:11px;">System &middot; ${rdateFmt}</div>
              </div>
            </div>
            ` : ''}

            ${i.status !== 'New' ? `
            <div class="d-flex gap-3 position-relative">
              <div class="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 z-1" style="width:28px;height:28px;background:#ede9fe;color:#8b5cf6;"><i data-lucide="check-circle" style="width:14px;height:14px;"></i></div>
              <div class="pb-1">
                <div class="fw-semibold" style="font-size:13px; color:var(--stratroom-body-color); margin-top:4px;">Status changed to ${i.incidentValue.classification.initialStatus || ""}</div>
                <div class="text-muted mt-1" style="font-size:11px;">System &middot; ${rdateFmt}</div>
              </div>
            </div>
            ` : ''}
          </div>
        </div>
      </div>
    </div>`;

      if (window.lucide) { lucide.createIcons(); }
      switchMain('detail');

      const tasks = i?.incidentValue?.tasks || [];
      renderTasks(tasks);

      renderComments(i?.incidentValue?.comments || []);
      renderAttachments(i.incidentAttachment || []);

      attachment.kpiAttachment = [...i.incidentAttachment];
    }


       function addDetailTask() {
      const tbody = document.getElementById('detail-tasks-body');
      const newRow = document.createElement('tr');
      newRow.innerHTML = `<td><textarea class="form-control" placeholder="Tasks" rows="3" style="resize:vertical;"></textarea></td>
        <td class="text-center"><div class="table-actions justify-content-center">
          <a class="btn btn-sm btn-icon" onclick="addDetailTask()"><span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Add"><i data-lucide="plus" style="width:16px;height:16px;"></i></span></a>
          <a class="btn btn-sm btn-icon" onclick="removeDetailTask(this)"><span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Delete"><i data-lucide="trash-2" style="width:14px;height:14px;"></i></span></a>
        </div></td>`;
      tbody.appendChild(newRow);
      if (window.lucide) lucide.createIcons();
    }
    function removeDetailTask(btn) {
      const row = btn.closest('tr');
      const tbody = document.getElementById('detail-tasks-body');
      if (tbody.rows.length > 1) row.remove();
      else row.querySelector('textarea').value = '';
    }

    function addDetailAttachment() {
      const tbody = document.getElementById('detail-attachments-body');
      const newRow = document.createElement('tr');
      newRow.innerHTML = `<td><input type="file" class="form-control" accept=".pdf,.ppt,.pptx,.jpeg,.jpg,.png,.xlsx,.doc,.docx" onchange="handleFileSelect(event)"></td>
        <td class="text-center"><div class="table-actions justify-content-center">
          <a class="btn btn-sm btn-icon" onclick="addDetailAttachment()"><span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Add"><i data-lucide="plus" style="width:16px;height:16px;"></i></span></a>
          <a class="btn btn-sm btn-icon" onclick="removeDetailAttachment(this)"><span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Delete"><i data-lucide="trash-2" style="width:14px;height:14px;"></i></span></a>
        </div></td>`;
      tbody.appendChild(newRow);
      if (window.lucide) lucide.createIcons();
    }
    // function removeDetailAttachment(btn) {
    //   const row = btn.closest('tr');
    //   const tbody = document.getElementById('detail-attachments-body');
    //   if (tbody.rows.length > 1) row.remove();
    //   else row.querySelector('input[type="file"]').value = '';
    // }

    function removeDetailAttachment(el) {
        const row = $(el).closest('tr');
        const rowIndex = row.index();

        // Remove from UI
        row.remove();

        // Remove from array
        if (attachment.kpiAttachment[rowIndex]) {
            attachment.kpiAttachment.splice(rowIndex, 1);
        }

        console.log("After delete:", attachment.kpiAttachment);
    }

    function addDetailComment() {
      const tbody = document.getElementById('detail-comments-body');
      const newRow = document.createElement('tr');
      newRow.innerHTML = `<td><textarea class="form-control" placeholder="Comments" rows="3" style="resize:vertical;"></textarea></td>
        <td class="text-center"><div class="table-actions justify-content-center">
          <a class="btn btn-sm btn-icon" onclick="addDetailComment()"><span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Add"><i data-lucide="plus" style="width:16px;height:16px;"></i></span></a>
          <a class="btn btn-sm btn-icon" onclick="removeDetailComment(this)"><span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Delete"><i data-lucide="trash-2" style="width:14px;height:14px;"></i></span></a>
        </div></td>`;
      tbody.appendChild(newRow);
      if (window.lucide) lucide.createIcons();
    }
    function removeDetailComment(btn) {
      const row = btn.closest('tr');
      const tbody = document.getElementById('detail-comments-body');
      if (tbody.rows.length > 1) row.remove();
      else row.querySelector('textarea').value = '';
    }


    function setDtab(el) {
      // Remove active styling from all tabs
      document.querySelectorAll('#dtab-nav .nav-link').forEach(t => {
        t.classList.remove('active');
        t.classList.add('text-muted');
        t.style.color = '';
        t.style.borderBottom = '';
        t.style.borderColor = 'transparent';
      });
      // Set active styling on clicked tab
      el.classList.add('active');
      el.classList.remove('text-muted');
      el.style.color = 'var(--stratroom-primary, #7B2D8B)';
      el.style.borderBottom = '2px solid var(--stratroom-primary, #7B2D8B)';
      el.style.borderColor = 'transparent transparent var(--stratroom-primary, #7B2D8B) transparent';
      // Show/hide tab panels
      const targetId = el.getAttribute('data-dtab');
      document.querySelectorAll('.dtab-panel').forEach(p => p.style.display = 'none');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) targetPanel.style.display = 'block';
      if (window.lucide) lucide.createIcons();
    }

    function closeInc(id) {
      const i = INCIDENTS.find(x => x.id == id);
      if (i) { i.status = 'Closed'; }
      renderList();
      switchMain('list', document.getElementById('tab-list'));
    }

    // == Form wizard methods ==
    let currentStep = 1;
    let selectedImpact = '';
    let extraAssignees = [];
    let fakeAttachments = [];
    const FAKE_FILES = ['incident_photo.jpg', 'CCTV_clip.mp4', 'initial_report.pdf', 'equipment_log.xlsx', 'witness_statement.docx'];

    function openForm() {
      currentStep = 1;
      selectedImpact = '';
      extraAssignees = [];
      fakeAttachments = [];
      document.getElementById('att-list').innerHTML = '';
      document.querySelectorAll('#extra-assignees .assignee-chip').forEach(c => c.classList.remove('selected'));
      ['f-title', 'f-desc', 'f-idate', 'f-rdate', 'f-location', 'f-witnesses', 'f-type', 'f-sev', 'f-dept', 'f-root', 'f-status', 'f-regflag', 'f-rby', 'f-ato', 'f-esc', 'f-due'].forEach(id => {
        const el = document.getElementById(id);
        if (el) { el.value = el.tagName == 'SELECT' && el.options[0] ? el.options[0].value : ''; }
      });
      document.getElementById('f-status').value = 'New';
      document.getElementById('ca-items').innerHTML = '<div class="ca-row"><input type="text" placeholder="Describe corrective action&hellip;"/><button class="ca-remove" onclick="removeCA(this)">&times;</button></div>';
      ['notif-1', 'notif-2'].forEach(id => { const el = document.getElementById(id); if (el) el.checked = true; });
      ['notif-3', 'notif-4'].forEach(id => { const el = document.getElementById(id); if (el) el.checked = false; });
      document.getElementById('confirm-check').checked = false;
      document.getElementById('btn-final-save').disabled = true;
      document.getElementById('success-banner').classList.remove('show');
      document.querySelectorAll('.prog-step').forEach(s => { s.classList.remove('active', 'done'); });
      document.querySelectorAll('.prog-line').forEach(l => l.classList.remove('done'));
      document.querySelectorAll('.step-panel').forEach(p => p.classList.remove('active'));
      document.getElementById('pstep-1').classList.add('active');
      document.getElementById('step-1').classList.add('active');
      switchMain('form', document.getElementById('tab-form'));
    }

    function setImpact(btn, val) {
      selectedImpact = val;
      document.querySelectorAll('.impact-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    }

    function toggleAssignee(el, name) {
      el.classList.toggle('selected');
      if (el.classList.contains('selected')) { if (!extraAssignees.includes(name)) extraAssignees.push(name); }
      else { extraAssignees = extraAssignees.filter(n => n !== name); }
    }

    function fakeAttach() {
      if (fakeAttachments.length >= 3) return;
      const f = FAKE_FILES[fakeAttachments.length];
      fakeAttachments.push(f);
      const list = document.getElementById('att-list');
      const tag = document.createElement('div'); tag.className = 'att-tag';
      tag.innerHTML = `&#128196; ${f} <button onclick="removeAtt(this,'${f}')">&times;</button>`;
      list.appendChild(tag);
    }
    function removeAtt(btn, name) {
      fakeAttachments = fakeAttachments.filter(f => f !== name);
      btn.parentElement.remove();
    }

    function addCA() {
      const row = document.createElement('div'); row.className = 'ca-row';
      row.innerHTML = '<input type="text" placeholder="Describe corrective action&hellip;"/><button class="ca-remove" onclick="removeCA(this)">&times;</button>';
      document.getElementById('ca-items').appendChild(row);
    }
    function removeCA(btn) {
      const rows = document.querySelectorAll('#ca-items .ca-row');
      if (rows.length > 1) btn.parentElement.remove();
      else btn.parentElement.querySelector('input').value = '';
    }

    function saveDraft() {
      const title = document.getElementById('f-title').value.trim() || 'Untitled Incident';
      alert('Draft saved: "' + title + '"');
    }
    function cancelForm() { switchMain('list', document.getElementById('tab-list')); }

    function showError(id, show) {
      const el = document.getElementById(id);
      if (el) { el.classList.toggle('show', show); }
    }
    function markField(id, err) {
      const el = document.getElementById(id);
      if (el) { el.classList.toggle('field-error', err); }
    }

    function validateStep(s) {
      let ok = true;
      if (s == 1) {
        const t = document.getElementById('f-title').value.trim();
        const id = document.getElementById('f-idate').value;
        const rd = document.getElementById('f-rdate').value;
        showError('err-title', !t); markField('f-title', !t);
        showError('err-idate', !id); markField('f-idate', !id);
        showError('err-rdate', !rd); markField('f-rdate', !rd);
        ok = t && id && rd;
      } else if (s == 2) {
        const ty = document.getElementById('f-type').value;
        const sv = document.getElementById('f-sev').value;
        const dp = document.getElementById('f-dept').value;
        showError('err-type', !ty); markField('f-type', !ty);
        showError('err-sev', !sv); markField('f-sev', !sv);
        showError('err-dept', !dp); markField('f-dept', !dp);
        ok = ty && sv && dp;
      } else if (s == 3) {
        const rb = document.getElementById('f-rby').value;
        const at = document.getElementById('f-ato').value;
        showError('err-rby', !rb); markField('f-rby', !rb);
        showError('err-ato', !at); markField('f-ato', !at);
        ok = rb && at;
      }
      return ok;
    }

    function goStep(to) {
      if (to > currentStep && !validateStep(currentStep)) return;
      document.getElementById('step-' + currentStep).classList.remove('active');
      document.getElementById('pstep-' + currentStep).classList.remove('active');
      if (to > currentStep) {
        document.getElementById('pstep-' + currentStep).classList.add('done');
        let dot = document.getElementById('pdot-' + currentStep);
        if (dot) dot.innerHTML = '&#10003;';
        for (let i = currentStep; i < to; i++) {
          const line = document.getElementById('pline-' + i);
          if (line) line.classList.add('done');
        }
      } else {
        document.getElementById('pstep-' + currentStep).classList.remove('done');
        let dot = document.getElementById('pdot-' + currentStep);
        if (dot) dot.textContent = currentStep;
        for (let i = to; i < currentStep; i++) {
          const line = document.getElementById('pline-' + i);
          if (line) line.classList.remove('done');
        }
      }
      currentStep = to;
      document.getElementById('pstep-' + currentStep).classList.add('active');
      document.getElementById('pstep-' + currentStep).classList.remove('done');
      let ndot = document.getElementById('pdot-' + currentStep);
      if (ndot) ndot.textContent = currentStep;
      document.getElementById('step-' + currentStep).classList.add('active');
      if (to == 4) buildReview();
      try { document.getElementById('screen-form').scrollTop = 0; } catch (e) { }
    }

    function buildReview() {
      const v = id => document.getElementById(id)?.value || '';
      const title = v('f-title');
      const desc = v('f-desc');
      const idate = v('f-idate').replace('T', ' ');
      const rdate = v('f-rdate');
      const location = v('f-location');
      const witnesses = v('f-witnesses');
      const type = v('f-type');
      const sev = v('f-sev');
      const dept = v('f-dept');
      const root = v('f-root');
      const regflag = v('f-regflag') || 'None';
      const status = v('f-status');
      const rby = v('f-rby');
      const ato = v('f-ato');
      const due = v('f-due');
      const esc = v('f-esc') || 'None';

      const eln1 = document.getElementById('notif-1');
      const n1 = eln1 ? eln1.checked : false;
      const eln2 = document.getElementById('notif-2');
      const n2 = eln2 ? eln2.checked : false;
      const eln3 = document.getElementById('notif-3');
      const n3 = eln3 ? eln3.checked : false;
      const eln4 = document.getElementById('notif-4');
      const n4 = eln4 ? eln4.checked : false;

      const caActions = [...document.querySelectorAll('#ca-items input')].map(i => i.value.trim()).filter(Boolean);
      const sevColors = { Critical: '#c0392b', High: '#9c3400', Medium: '#78350f', Low: '#1e6e36' };
      const sevBg = { Critical: '#fee2e2', High: '#ffedd5', Medium: '#fef3c7', Low: '#dcfce7' };
      const em = t => `<span class="rv-val empty">${t || 'Not specified'}</span>`;
      const rv = (label, val) => `<div><div class="rv-label">${label}</div>${val ? `<div class="rv-val">${val}</div>` : em('')}</div>`;
      document.getElementById('review-body').innerHTML = `
        <div class="review-section">
          <div class="review-section-title">Basic Information</div>
          <div style="margin-bottom:8px"><div class="rv-label">Incident Title</div>${title ? `<div class="rv-val" style="font-size:13px">${title}</div>` : em('')}</div>
          ${desc ? `<div style="margin-bottom:8px"><div class="rv-label">Description</div><div class="rv-val" style="font-weight:400;line-height:1.5;color:#444">${desc}</div></div>` : ''}
          <div class="review-grid">
            ${rv('Incident Date / Time', idate)}
            ${rv('Date Reported', rdate)}
            ${rv('Location', location)}
            ${rv('Witnesses', witnesses)}
          </div>
        </div>
        <div class="review-section">
          <div class="review-section-title">Classification</div>
          <div class="review-grid">
            ${rv('Incident Type', type)}
            <div><div class="rv-label">Severity</div>${sev ? `<span class="badge" style="background:${sevBg[sev]};color:${sevColors[sev]};font-size:11px">${sev}</span>` : em('')}</div>
            ${rv('Department / Site', dept)}
            ${rv('Root Cause', root)}
            ${rv('Impact Level', selectedImpact)}
            ${rv('Regulatory Flag', regflag)}
            ${rv('Initial Status', status)}
            <div><div class="rv-label">Attachments</div><div class="rv-val">${fakeAttachments.length ? fakeAttachments.length + ' file(s)' : 'None'}</div></div>
          </div>
          ${fakeAttachments.length ? `<div class="ca-preview">${fakeAttachments.map(f => `<span class="ca-tag">&#128196; ${f}</span>`).join('')}</div>` : ''}
        </div>
        <div class="review-section">
          <div class="review-section-title">Assignment</div>
          <div class="review-grid">
            ${rv('Reported By', rby)}
            ${rv('Primary Assignee', ato)}
            ${rv('Due Date', due)}
            ${rv('Escalation Contact', esc)}
          </div>
          ${extraAssignees.length ? `<div style="margin-top:8px"><div class="rv-label">Additional Assignees</div><div class="ca-preview">${extraAssignees.map(a => `<span class="ca-tag">&#128100; ${a}</span>`).join('')}</div></div>` : ''}
          ${caActions.length ? `<div style="margin-top:8px"><div class="rv-label">Corrective Actions (${caActions.length})</div><div class="ca-preview">${caActions.map(a => `<span class="ca-tag">&#10003;… ${a}</span>`).join('')}</div></div>` : ''}
          <div style="margin-top:10px"><div class="rv-label">Notifications Enabled</div><div style="display:flex;flex-wrap:wrap;gap:4px;margin-top:4px">
            ${n1 ? '<span class="ca-tag" style="background:#dbeafe;color:#1e40af">&#128231; Email assignee</span>' : ''}
            ${n2 ? '<span class="ca-tag" style="background:#fef3c7;color:#78350f">&#9888; Mgmt alert</span>' : ''}
            ${n3 ? '<span class="ca-tag" style="background:#dcfce7;color:#14532d">&#128203; Daily digest</span>' : ''}
            ${n4 ? '<span class="ca-tag" style="background:#ede9fe;color:#4c1d95">&#128172; Slack/Teams</span>' : ''}
            ${!n1 && !n2 && !n3 && !n4 ? '<span class="rv-val empty">None enabled</span>' : ''}
          </div></div>
        </div>`;
    }

    // function saveIncident() {
    //   const catMap = { Safety: 'safety', IT: 'it', Security: 'security', Environmental: 'environmental', HR: 'hr', Compliance: 'compliance', Quality: 'quality', Facilities: 'facilities', Finance: 'finance', Legal: 'legal' };
    //   const type = document.getElementById('f-type').value;
    //   const title = document.getElementById('f-title').value.trim();
    //   const sev = document.getElementById('f-sev').value;
    //   const newId = 'INC-2025-' + (37 + INCIDENTS.filter(i => i.id.startsWith('INC-2025')).length).toString().padStart(4, '0');
    //   INCIDENTS.unshift({
    //     id: newId, cat: catMap[type] || 'safety', title, sev,
    //     status: document.getElementById('f-status').value || 'New',
    //     dept: document.getElementById('f-dept').value || '&mdash;',
    //     root: document.getElementById('f-root').value || '&mdash;',
    //     rby: document.getElementById('f-rby').value || 'Unknown',
    //     ato: document.getElementById('f-ato').value || '&mdash;',
    //     idate: document.getElementById('f-idate').value || new Date().toISOString(),
    //     rdate: document.getElementById('f-rdate').value || new Date().toISOString().slice(0, 10)
    //   });
    //   renderList();
    //   try { renderCatDashboard(); } catch (e) { }
    //   document.getElementById('success-banner').classList.add('show');
    //   document.getElementById('success-id').textContent = 'Incident ID: ' + newId + ' has been created and assigned.';
    //   const act = document.querySelector('#step-4 .form-actions');
    //   if (act) act.style.display = 'none';
    //   if (document.getElementById('review-body')) document.getElementById('review-body').style.display = 'none';
    //   const conf = document.querySelector('.review-confirm');
    //   if (conf) conf.style.display = 'none';
    //   document.getElementById('pstep-4').classList.add('done');
    //   document.getElementById('pstep-4').classList.remove('active');
    //   let pdot = document.getElementById('pdot-4');
    //   if (pdot) pdot.innerHTML = '&#10003;';
    // }

    window.onload = function () {
      renderList();

      // Initialize Select2 for form wizard
      $('#screen-form select').select2({
        width: '100%',
        minimumResultsForSearch: 6,
        dropdownParent: $('#screen-form')
      });

      // Initialize Flatpickr for form wizard
      if (typeof flatpickr !== 'undefined') {
        flatpickr('#f-idate', { enableTime: true, dateFormat: "M j, Y h:i K" });
        flatpickr('#f-rdate, #f-due, #f-closedate', { dateFormat: "M j, Y" });
      }
    };

    var empDeptId = null;
    function getUserDetails (){
      var currentEmp = $("#userPrincipal").val().trim()
        $.ajax({
            url: "/stratroom/userRole/" + currentEmp,
            type: "get",
            contentType: "application/json",
            success: function (data) { 
              empDeptId = data.departmentList[0].id;
            }
        });
    }

    getUserDetails();





function getDepartment() {
  $.ajax({
    type: "GET",
    url: "/stratroom/departmentReportees",
    success: function (data) {

      let deptDropdown = $('#f-dept');

      // Keep first option, remove others
      deptDropdown.find('option:not(:first)').remove();

      // Loop and append
      data.forEach(function (dept) {
        let option = `<option value="${dept.name}">${dept.name}</option>`;
        deptDropdown.append(option);
      });

    },
    error: function (err) {
      console.error("Error fetching departments:", err);
    }
  });
};

getDepartment();

function getUserList() {
  $.ajax({
    type: "GET",
    url: "/stratroom/userList",
    success: function (data) {
      console.log(data, "userlisttt");
      let reportedBy = $("#f-rby");
      let assignedTo = $("#f-ato");

      // Reset options
      reportedBy.html('<option value="">Select</option>');
      assignedTo.html('<option value="">Select</option>');

      // Filter only ACTIVE users
      let activeUsers = data.filter(user => user.status == "Active");

      // Map users into dropdown
      activeUsers.forEach(user => {
        let option = `<option value="${user.name}">${user.name}</option>`;
        
        reportedBy.append(option);
        assignedTo.append(option);
      });

    },
    error: function (err) {
      console.error("Error fetching user list:", err);
    }
  });
}

getUserList();


    function saveIncident() {
      var currentEmp = $("#userPrincipal").val().trim()
    
      const payload = {
          "owner": currentEmp,
          id: $("#incident_unique_id").val() || "",
          "incidentAttachment" : attachmentsData,
          "incidentValue": {
            "comments" : commentsData,
            tasks : taskData,
            "incidentDetails": {
              "incidentId" : $("#f-id").val(),
              "incidentTitle" : $("#f-title").val(),
              "incidentDescription" : $("#f-desc").val(),
              "incidentDateTime" : $("#f-idate").val(),
              "reportedDate" : $("#f-rdate").val(),
              "location" : $("#f-location").val(),
              "witnesses" : $("#f-witnesses").val()
             },
             "classification": {
              "incidentType" : $("#f-type").val(),
              "severity" : $("#f-sev").val(),
              "department" : $("#f-dept").val(),
              "rootCause" : $("#f-root").val(),
              "regulatoryFlag" : $("#f-regflag").val(),
              "initialStatus" : $("#f-status").val(),
              "impactLevel" : selectedImpact,
              "incidentClosedDate" : $("#f-closedate").val(),
             },
             "assignment": {
              "reportedBy" : $("#f-rby").val(),
              "primaryAssignee" : $("#f-ato").val(),
              "dueDate" : $("#f-due").val(),
              "escalationContact" : $("#f-esc").val(),
              "correctiveActions" : [...document.querySelectorAll('#ca-items input')].map(i => i.value.trim()).filter(Boolean),
              "notifications": {
                "emailAssignee": document.getElementById('notif-1') ? document.getElementById('notif-1').checked : false,
                "mgmtAlert": document.getElementById('notif-2') ? document.getElementById('notif-2').checked : false,
                "dailyDigest": document.getElementById('notif-3') ? document.getElementById('notif-3').checked : false,
                "slackTeams": document.getElementById('notif-4') ? document.getElementById('notif-4').checked : false
             },
            },

          },
          "active": 0,
          "departmentId": empDeptId,
          "pageId": pageNo
      }

      console.log(payload, "payload");

      $.ajax({
          url: "/stratroom/universalIncident",
          type: "POST",
          contentType: "application/json",
          data: JSON.stringify(payload),
          success: function (data) {
              console.log(data, "response after saving incident");
              // Optionally, you can redirect or reset the form here
              window.location.reload(); 
          },
          error: function (err) {
              console.error("Error saving incident:", err); 
              alert('Failed to save incident. Please try again.');
          }
      });
    }


    function getTasksFromTable() {
  const tasks = [];

  $('#detail-tasks-body tr').each(function () {
    const taskText = $(this).find('textarea').val().trim();

    if (taskText) {
      tasks.push({
        task: taskText
      });
    }
  });

  return tasks;
}

function saveActionsTasks(id) {
  const incident = INCIDENTS.find(x => x.id == id);

  const tasks = getTasksFromTable();

// Build payload
 incident.incidentValue.tasks = tasks;
const payload = incident; 
  console.log("Payload:", payload); // debug

  $.ajax({
    url: "/stratroom/universalIncident",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(payload),
    success: function (data) {
      console.log(data, "response after saving incident");
      window.location.reload();
    },
    error: function (err) {
      console.error("Error saving incident:", err);
      alert('Failed to save incident. Please try again.');
    }
  });
}



function getCommentsFromTable() {
  const comments = [];

  $('#detail-comments-body tr').each(function () {
    const commentText = $(this).find('textarea').val().trim();

    if (commentText) {
      comments.push({
        comment: commentText
      });
    }
  });

  return comments;
}


function saveComments(id) {
  const incident = INCIDENTS.find(x => x.id == id);

  const comments = getCommentsFromTable();

  // const payload = {
  //   incidentId: id,
  //   comments: comments
  // };
 incident.incidentValue.comments = comments;
const payload = incident; 
  console.log("Comments Payload:", payload);

  $.ajax({
    url: "/stratroom/universalIncident", 
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(payload),
    success: function (data) {
      console.log(data, "response after saving comments");
      window.location.reload();
    },
    error: function (err) {
      console.error("Error saving comments:", err);
      alert('Failed to save comments. Please try again.');
    }
  });
}



function saveAttachments(id) {
  console.log(attachment, "attachments");
  const incident = INCIDENTS.find(x => x.id == id);

    incident.incidentAttachment = attachment.kpiAttachment;

    const payload = incident; 

    console.log(payload,  "payload");

    $.ajax({
    url: "/stratroom/universalIncident", 
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(payload),
    success: function (data) {
      console.log(data, "response after saving comments");
      window.location.reload();
    },
    error: function (err) {
      console.error("Error saving comments:", err);
      alert('Failed to save comments. Please try again.');
    }
  });
}



    

    function handleFileSelect(event) {
        console.log(event, "event");
        var file = event.target.files[0];
        if (file) {
            var fileType = file.type || getFileExtension(file.name);
            var fileIcon = getFileIcon(fileType);
    
            $(event.target).siblings('.btn-document').find('i').attr('class', fileIcon);
            $(event.target).siblings('.file-name').text(file.name).show();
    
            var reader = new FileReader();
            reader.onload = function(e) {
              var uniqueFileReference = generateUniqueFileReference();

                var fileDetail = {
                    "name": file.name,
                    "size": file.size + " bytes",
                    "type": fileType,
                    "file": e.target.result.split(',')[1], 
                    "uniqueFileReference": uniqueFileReference

                };
                attachment.kpiAttachment.push(fileDetail);
                console.log(attachment.kpiAttachment);
            };
            reader.readAsDataURL(file);
        } else {
            $(event.target).siblings('.btn-document').find('i').attr('class', 'fas fa-paperclip');
        }
    }

    function getFileExtension(filename) {
      return filename.split('.').pop();
    }


    function generateUniqueFileReference() {
        var timestamp = new Date().getTime();
        var random = Math.random().toString(36).substring(2, 15);
        return timestamp + '_' + random;
    }

    function getFileIcon(fileType) {
        var iconClass = "fas fa-paperclip";
        if (fileType == "image/jpeg") {
            iconClass = "fas fa-file-image";
        } else if (fileType == "application/pdf") {
            iconClass = "fas fa-file-pdf";
        } else if (fileType == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
            iconClass = "fas fa-file-excel";
        } else if (fileType == "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
            iconClass = "fas fa-file-word";
        } else if (fileType == "text/html") {
            iconClass = "fas fa-file-code";
        }
        return iconClass;
    };


    function setSelectedImpact(impactLevel) {

      // Remove active class from all buttons
      document.querySelectorAll('#impact-group .impact-btn')
        .forEach(btn => btn.classList.remove('active'));

      // Add active class to matching button
      document.querySelectorAll('#impact-group .impact-btn')
        .forEach(btn => {
          if (btn.innerText.trim() == impactLevel) {
            btn.classList.add('active');
          }
        });

    }


    function setCorrectiveActions(actions = []) {

  const container = document.getElementById("ca-items");

  // Clear existing rows
  container.innerHTML = "";

  // If no actions
  if (!actions.length) {
    container.innerHTML = `
      <div class="ca-row">
        <input type="text" placeholder="Describe corrective action…" />
        <button class="ca-remove" onclick="removeCA(this)">&times;</button>
      </div>
    `;
    return;
  }

  // Add rows dynamically
  actions.forEach(action => {
    container.innerHTML += `
      <div class="ca-row">
        <input 
          type="text" 
          value="${action}" 
          placeholder="Describe corrective action…" 
        />
        <button class="ca-remove" onclick="removeCA(this)">&times;</button>
      </div>
    `;
  });

}

    //Update Form Functions
    function updateForm(id) {
      console.log(id, "Selected Incident ID");

      // Open form page
      switchMain('form', document.getElementById('tab-list'));

      const findData = INCIDENTS.find(x => x.id == id);
      console.log(findData, "Data to update");
      
      $('#f-id').val(findData.incidentValue.incidentDetails.incidentId || "");
      $('#f-title').val(findData.incidentValue.incidentDetails.incidentTitle || "");
      $('#f-desc').val(findData.incidentValue.incidentDetails.incidentDescription || "");
      $('#f-idate').val(findData.incidentValue.incidentDetails.incidentDateTime || "");
      $('#f-rdate').val(findData.incidentValue.incidentDetails.reportedDate || "");
      $('#f-location').val(findData.incidentValue.incidentDetails.location || "");
      $('#f-witnesses').val(findData.incidentValue.incidentDetails.witnesses || "");
      $('#f-type').val(findData.incidentValue.classification.incidentType || "").trigger('change');
      $('#f-sev').val(findData.incidentValue.classification.severity || "").trigger('change');
      $('#f-dept').val(findData.incidentValue.classification.department || "").trigger('change');
      $('#f-root').val(findData.incidentValue.classification.rootCause || "");
      $('#f-regflag').val(findData.incidentValue.classification.regulatoryFlag || "");
      $('#f-status').val(findData.incidentValue.classification.initialStatus || "").trigger('change');
      $('#f-rby').val(findData.incidentValue.assignment.reportedBy || "").trigger('change');
      $('#f-ato').val(findData.incidentValue.assignment.primaryAssignee || "").trigger('change');
      $('#f-due').val(findData.incidentValue.assignment.dueDate || "");
      $('#f-esc').val(findData.incidentValue.assignment.escalationContact || "").trigger('change');
      $("#incident_unique_id").val(findData.id || "");
      $('#f-closedate').val(findData.incidentValue.classification.incidentClosedDate || "");
      const impactLevel = findData.incidentValue.classification.impactLevel || "";
      setSelectedImpact(impactLevel);

      setCorrectiveActions(findData.incidentValue.assignment.correctiveActions || []);
      commentsData = findData.incidentValue.comments || [];
      attachmentsData = findData.incidentAttachment || [];
      taskData = findData.incidentValue.tasks || [];

   
      
    }


function toggleCloseDateField(status) {

  const closeDateField = document.getElementById("closed-date-field");

  if (status == "Closed") {
    closeDateField.style.display = "block";
  } else {
    closeDateField.style.display = "none";
    document.getElementById("f-closedate").value = "";
  }

}




// pdf

let pdfData = [];         
let pdfGenerationCallback = null;

// ==========================================
// CONFIGURATION
// ==========================================
let LOGO_URL = "/stratroom/images/logo.png";
let COVER_URL = "/stratroom/images/initiative-bg.jpg";
const ICONS_PATH = "/stratroom/images/";  // <-- ADDED: Define icon path
const BRAND_COLOR = [120, 45, 90];

// ==========================================
// URL PARAMS HELPER
// ==========================================
function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        get: (key) => params.get(key)
    };
}

// Initialize pageNo from URL on script load
(function init() {
    const params = getUrlParams();
    pageNo = params.get("pageId");
    console.log("Initialized pageNo from URL:", pageNo);
})();

// ==========================================
// HELPER FUNCTIONS
// ==========================================
function fmtDateTime(dStr) {
    if (!dStr) return '-';
    const d = new Date(dStr);
    if (isNaN(d.getTime())) return dStr;
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const day = String(d.getDate()).padStart(2, '0');
    let hrs = d.getHours();
    const ampm = hrs >= 12 ? 'PM' : 'AM';
    hrs = hrs % 12 || 12;
    const mins = String(d.getMinutes()).padStart(2, '0');
    return `${months[d.getMonth()]} ${day} ${d.getFullYear()} ${hrs}:${mins} ${ampm}`;
}

function fmtDate(dStr) {
    if (!dStr) return '-';
    const d = new Date(dStr);
    if (isNaN(d.getTime())) return dStr;
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const day = String(d.getDate()).padStart(2, '0');
    return `${months[d.getMonth()]} ${day} ${d.getFullYear()}`;
}

function getBase64Image(url) {
    return new Promise((resolve) => {
        let img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = function () {
            let canvas = document.createElement("canvas");
            canvas.width = this.width;
            canvas.height = this.height;
            let ctx = canvas.getContext("2d");
            ctx.drawImage(this, 0, 0);
            resolve(canvas.toDataURL("image/png"));
        };
        img.onerror = function () { 
            console.warn(`Failed to load image: ${url}`);
            resolve(null); 
        };
        img.src = url;
    });
}

function getFullUrl(path) {
    return window.location.origin + window.location.pathname.replace(/\/[^/]*$/, '/') + path;
}

// ==========================================
// IMAGE PRELOADING
// ==========================================
const riskImageUrls = {
    green: ICONS_PATH + "buzzer-green-i.svg",
    yellow: ICONS_PATH + "buzzer-yellow-i.svg",
    red: ICONS_PATH + "buzzer-red-i.svg"
};
const flagImageUrls = {
    green: ICONS_PATH + "flag-green-i.svg",
    yellow: ICONS_PATH + "flag-yellow-i.svg",
    red: ICONS_PATH + "flag-red-i.svg"
};
const trendImageUrls = {
    up: ICONS_PATH + "up-i.png",
    down: ICONS_PATH + "down-i.png",
};
const riskImages = {}, flagImages = {}, trendImages = {};

async function preloadImages() {
    await Promise.all(Object.entries(riskImageUrls).map(async ([key, url]) => {
        riskImages[key] = await getBase64Image(url);
    }));
    await Promise.all(Object.entries(flagImageUrls).map(async ([key, url]) => {
        flagImages[key] = await getBase64Image(url);
    }));
    await Promise.all(Object.entries(trendImageUrls).map(async ([key, url]) => {
        trendImages[key] = await getBase64Image(url);
    }));
}

// ==========================================
// 🔄 API RESPONSE MAPPER
// ==========================================
function mapApiResponse(apiData) {
    if (!Array.isArray(apiData)) return [];
    
    return apiData.map(item => {
        const iv = item.incidentValue || {};
        const details = iv.incidentDetails || {};
        const assign = iv.assignment || {};
        const classif = iv.classification || {};
        
        return {
            id: item.id,
            pageId: item.pageId,
            cat: classif.incidentType || "Unknown",
            sev: classif.severity || "Unknown",
            title: details.incidentTitle || "Untitled Incident",
            desc: details.incidentDescription || "No description provided.",
            location: details.location || "-",
            witnesses: details.witnesses || "None reported",
            root: classif.rootCause || "-",
            impact: classif.impactLevel || "-",
            regflag: classif.regulatoryFlag || "None",
            status: classif.initialStatus || "New",
            rdate: details.reportedDate || "",
            idate: details.incidentDateTime || "",
            dueDate: assign.dueDate || "",
            closedDate: classif.incidentClosedDate || "",
            rby: assign.reportedBy || "-",
            ato: assign.primaryAssignee || "-",
            owner: iv.ownerName || "-",
            createdBy: iv.createdByName || "-",
            team: [],
            esc: assign.escalationContact || "None",
            tasks: (iv.tasks || []).map(t => ({
                title: t.task || "Unnamed Task",
                taskId: t.taskId,
                status: "Pending",
                owner: assign.primaryAssignee || "-"
            })),
            comments: (iv.comments || []).map(c => ({
                text: c.comment || "",
                user: iv.createdByName || "User",
                time: ""
            })),
            correctiveActions: assign.correctiveActions || []
        };
    });
}

// ==========================================
//  FETCH INCIDENT LIST
// ==========================================
function getIncidentLists(callback) {
    if (typeof callback === 'function') {
        pdfGenerationCallback = callback;
    }
    
    // Validate pageNo
    if (!pageNo) {
        console.error("pageId is required. Set via URL ?pageId=XXX or pass to loadDataAndGeneratePDF()");
        alert("Missing pageId parameter. Please provide a valid pageId.");
        return;
    }
    
    $.ajax({
        url: "/stratroom/universalIncidentList?pageId=" + pageNo,
        type: "GET",
        contentType: "application/json",
        success: function (apiResponse) {
            console.log("Incident list loaded:", apiResponse);
            INCIDENTS = apiResponse;  // Store raw API response
            pdfData = mapApiResponse(apiResponse);  // Map for PDF rendering
            console.log("Mapped data for PDF:", pdfData);
            
            if (typeof pdfGenerationCallback === 'function') {
                pdfGenerationCallback();
            }
        },
        error: function (err) {
            console.error("Error fetching incident list:", err);
            alert("Failed to load incident data. Please check your connection or try again.");
        }
    });
}

// ==========================================
// ️ LOAD DATA & GENERATE PDF (Entry Point)
// ==========================================
function loadDataAndGeneratePDF(pageId) {
    // Allow optional pageId override (takes precedence over URL param)
    if (pageId) {
        pageNo = pageId;
    }
    
    // Fallback: try to get from URL if not set
    if (!pageNo) {
        const params = getUrlParams();
        pageNo = params.get("pageId");
    }
    
    if (!pageNo) {
        console.error("pageId is required");
        alert("Please provide a pageId via URL (?pageId=XXX) or as function argument");
        return;
    }
    
    console.log("Loading incidents for pageId:", pageNo);
    
    getIncidentLists(function() {
        console.log("Data ready, generating PDF...");
        generatePDF();
    });
}

// ==========================================
// 📄 PDF GENERATION (jsPDF + autoTable)
// ==========================================
const { jsPDF } = window.jspdf;

async function generatePDF() {
    await preloadImages();
    let pdf = new jsPDF();
    let pageWidth = pdf.internal.pageSize.width;
    let pageHeight = pdf.internal.pageSize.height;
    var submissionDate = new Date().toLocaleDateString();
    const logoUrl = LOGO_URL;
    const coverImage = COVER_URL;
    const marginLeft = 10;
    const marginRight = pageWidth - marginLeft;

    function addCoverPage(section) {
        const imgX = 10, imgY = 5, imgWidth = 50, imgHeight = 10;
        let cfh = 20, cfhs = 10, bgColor = BRAND_COLOR;
        const domPeriod = $('#datePeriod').val();
        let periodText = domPeriod ? `Period: ${domPeriod}` : "-";
        let titleText = section?.pageTitle ? section.pageTitle : "INCIDENT REGISTRY";
        
        pdf.addImage(coverImage, 'JPEG', 0, 0, pageWidth, pageHeight);
        pdf.addImage(logoUrl, "PNG", marginRight - imgWidth, imgY, imgWidth, imgHeight, { align: "right" });
        pdf.setTextColor(171, 80, 103);
        pdf.setFontSize(32);
        pdf.setFont("helvetica", "bold");
        pdf.text(titleText.toUpperCase(), pageWidth / 2, 57, { align: "center" });
        pdf.text("Report".toUpperCase(), pageWidth / 2, 70, { align: "center" });
        pdf.setTextColor(0, 0, 0);
        pdf.setFontSize(14);
        pdf.setFont("helvetica", "bold");
        pdf.text(periodText, pageWidth / 2, 85, { align: "center" });
        pdf.setFillColor(...bgColor);
        pdf.rect(0, pageHeight - cfhs, pageWidth, cfhs, 'F');
        pdf.setFillColor(...bgColor);
        pdf.lines([[pageWidth / 2, 0], [20, cfh], [-90, 0]], -20, pageHeight - cfh, [1, 1], 'F');
        pdf.setFillColor(...bgColor);
        pdf.lines([[15, 0], [0, pageHeight / 3], [-15, 15], [0, -(pageHeight / 2 - 15)]], 0, 0, [1, 1], 'F');
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(10);
        pdf.setFont("helvetica", "bold");
        pdf.text(`Generated Date:  ${submissionDate} `, 10, pageHeight - 12);
        pdf.text(periodText, 10, pageHeight - 6);
        pdf.addPage();
    }

    function header(section) {
        const imgX = 10, imgY = 5, imgWidth = 50, imgHeight = 10;
        const textStartY = imgY + 5;
        let title = section?.pageTitle ? section.pageTitle : "Incident Details";
        let name = section?.userName ? `${section.userName}` : "";
        let period = section?.period ? `${section.period}` : "";
        pdf.addImage(logoUrl, "PNG", imgX, imgY, imgWidth, imgHeight);
        pdf.setTextColor(0, 0, 0);
        pdf.setFontSize(13);
        pdf.setFont("helvetica", "bold");
        pdf.text(title, marginRight, textStartY - 3, { align: "right" });
        pdf.setTextColor(0, 0, 0);
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(9);
        pdf.text(`Generated Date: ${submissionDate}`, marginRight, textStartY + 1, { align: "right" });
        if (name) pdf.text(`Name: ${name}`, marginRight, textStartY + 6, { align: "right" });
        if (period) pdf.text(`Period: ${period}`, marginRight, textStartY + 10, { align: "right" });
        pdf.line(10, imgHeight + 12, pageWidth - 10, imgHeight + 12);
        return imgHeight + 20;
    }

    function footer(pageNumber, totalPages) {
        let footerHeight = 20, footerHeightsm = 10, bgColor = BRAND_COLOR;
        pdf.setFillColor(...bgColor);
        pdf.rect(0, pageHeight - footerHeightsm, pageWidth, footerHeightsm, 'F');
        pdf.setFillColor(...bgColor);
        pdf.lines([[pageWidth / 2, 0], [20, footerHeight], [-90, 0]], -20, pageHeight - footerHeight, [1, 1], 'F');
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(12);
        pdf.setFont("helvetica", "bold");
        pdf.text("Incident Registry Report", 10, pageHeight - 10);
        pdf.setFontSize(10);
        pdf.setFont("helvetica", "bold");
        pdf.text(`Page ${pageNumber} of ${totalPages}`, marginRight, pageHeight - 4, { align: "right" });
    }

    // Extract report structure
    let reportData = (pdfData.length > 0 && pdfData[0].incidents) ? pdfData[0] : null;
    let incidentsList = reportData ? reportData.incidents : pdfData;

    // DEBUG: Log data state
    console.log("=== PDF GENERATION DEBUG ===");
    console.log("pdfData length:", pdfData.length);
    console.log("INCIDENTS length:", INCIDENTS.length);
    console.log("reportData:", reportData);
    console.log("incidentsList length:", incidentsList.length);
    console.log("============================");

    // Add Cover Page
    if (reportData || incidentsList.length > 0) {
        addCoverPage(reportData || incidentsList[0]);
    }

    let reportStartPage = pdf.internal.getNumberOfPages() + 1;
    let pageColors = {};

    // KPIs Dashboard
    let kpiY = header({ pageTitle: "Incident Registry Dashboard", userName: reportData?.userName, period: reportData?.period });
    let kpiData = reportData && reportData.kpis ? reportData.kpis : [];

    // FIX: Calculate KPIs from raw INCIDENTS array (matches your DOM logic)
    if (!kpiData || kpiData.length === 0) {
        const totalLogged = INCIDENTS.length;
        const openIncidents = INCIDENTS.filter(i => 
            i.incidentValue?.classification?.initialStatus !== 'Closed'
        ).length;
        const criticalSev = INCIDENTS.filter(i => 
            i.incidentValue?.classification?.severity === 'Critical'
        ).length;
        const closed = INCIDENTS.filter(i => 
            i.incidentValue?.classification?.initialStatus === 'Closed'
        ).length;

        kpiData = [
            { label: "TOTAL LOGGED", value: totalLogged, sub: "all time incidents" },
            { label: "OPEN INCIDENTS", value: openIncidents, sub: "awaiting resolution" },
            { label: "CRITICAL SEVERITY", value: criticalSev, sub: "requires attention" },
            { label: "CLOSED", value: closed, sub: "resolved successfully" }
        ];
        
        console.log("Calculated KPIs from INCIDENTS:", kpiData);
    }

    kpiData.forEach(k => {
        if (!k.valColor) {
            if (k.label.toUpperCase().includes('TOTAL')) k.valColor = [0, 0, 0];
            else if (k.label.toUpperCase().includes('OPEN')) k.valColor = [41, 128, 185];
            else if (k.label.toUpperCase().includes('CRITICAL')) k.valColor = [231, 76, 60];
            else if (k.label.toUpperCase().includes('CLOSED')) k.valColor = [39, 174, 96];
            else k.valColor = [0, 0, 0];
        }
    });

    let cardW = 80, cardH = 30, gap = 5;
    let totalKpiWidth = (cardW * 2) + gap;
    let totalKpiHeight = (cardH * 2) + gap;
    let startX = (pageWidth - totalKpiWidth) / 2;
    let kpiCenterY = (pageHeight - totalKpiHeight) / 2;

    pdf.setFontSize(16);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(120, 45, 90);
    pdf.text("INCIDENT REGISTRY SUMMARY", pageWidth / 2, kpiCenterY - 15, { align: "center" });

    for (let k = 0; k < 4; k++) {
        let row = Math.floor(k / 2), col = k % 2;
        let x = startX + col * (cardW + gap);
        let y = kpiCenterY + row * (cardH + gap);
        pdf.setDrawColor(220, 220, 220);
        pdf.setFillColor(255, 255, 255);
        pdf.roundedRect(x, y, cardW, cardH, 3, 3, 'FD');
        pdf.setTextColor(100, 100, 100);
        pdf.setFontSize(9);
        pdf.setFont("helvetica", "bold");
        pdf.text(kpiData[k].label, x + 5, y + 8);
        pdf.setTextColor(...kpiData[k].valColor);
        pdf.setFontSize(18);
        pdf.setFont("helvetica", "bold");
        pdf.text(kpiData[k].value.toString(), x + 5, y + 18);
        pdf.setTextColor(150, 150, 150);
        pdf.setFontSize(8);
        pdf.setFont("helvetica", "normal");
        pdf.text(kpiData[k].sub, x + 5, y + 25);
    }

    // Iterate Through Incidents
    for (let i = 0; i < incidentsList.length; i++) {
        let initiative = incidentsList[i];
        pdf.addPage();
        const currentStartPage = pdf.internal.getNumberOfPages();
        let currentY = header(initiative);

        // List View Header
        let boxY = currentY, boxHeight = 28, catColor = BRAND_COLOR;
        pdf.setFillColor(...catColor);
        pdf.roundedRect(10, boxY, pageWidth - 20, boxHeight, 3, 3, 'F');
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(9);
        pdf.setFont("helvetica", "normal");
        let catLabel = initiative.cat ? initiative.cat.toUpperCase() : "UNKNOWN";
        pdf.text(`${initiative.id} - ${catLabel}`, 15, boxY + 7);

        let sevText = initiative.sev || "Unknown";
        let sevBg = [220, 252, 231], sevCol = [30, 110, 54];
        if (sevText === 'Critical') { sevBg = [254, 226, 226]; sevCol = [192, 57, 43]; }
        else if (sevText === 'High') { sevBg = [255, 237, 213]; sevCol = [156, 52, 0]; }
        else if (sevText === 'Medium') { sevBg = [254, 243, 199]; sevCol = [120, 53, 15]; }
        pdf.setFillColor(...sevBg);
        let badgeW = 20, badgeH = 7, badgeX = pageWidth - 15 - badgeW, badgeY = boxY + 4;
        pdf.roundedRect(badgeX, badgeY, badgeW, badgeH, 3.5, 3.5, 'F');
        pdf.setTextColor(...sevCol);
        pdf.setFontSize(7.5);
        pdf.setFont("helvetica", "bold");
        pdf.text(sevText, badgeX + badgeW / 2, badgeY + 4.5, { align: 'center' });

        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(12);
        pdf.setFont("helvetica", "bold");
        let titleLines = pdf.splitTextToSize(initiative.title || "No Title", pageWidth - 30);
        pdf.text(titleLines, 15, boxY + 14);

        let sBadgeW = 32, sBadgeH = 6, sBadgeY = boxY + 19;
        pdf.setFillColor(255, 255, 255);
        pdf.roundedRect(15, sBadgeY, sBadgeW, sBadgeH, 3, 3, 'F');
        pdf.setTextColor(...catColor);
        pdf.setFontSize(8);
        pdf.setFont("helvetica", "bold");
        pdf.text(initiative.status || "New", 15 + sBadgeW / 2, sBadgeY + 4.1, { align: 'center' });

        pdf.setTextColor(230, 230, 230);
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(8);
        const diffDays = initiative.closedDate ? 0 : Math.ceil(Math.abs(new Date() - new Date(initiative.idate)) / (1000 * 60 * 60 * 24));
        const openStatus = initiative.status === 'Closed' ? 'Closed' : diffDays + ' days open';
        pdf.text(`Reported ${fmtDateTime(initiative.rdate)}  -  ${openStatus}`, 15 + sBadgeW + 5, sBadgeY + 4.1);
        currentY = boxY + boxHeight + 12;

        // Table 1: Incident Summary
        pdf.setFontSize(11);
        pdf.setFont("helvetica", "bold");
        pdf.setTextColor(BRAND_COLOR[0], BRAND_COLOR[1], BRAND_COLOR[2]);
        pdf.text("Incident Summary Details", 10, currentY);
        currentY += 4;
        const summaryBody = [
            ["Description", initiative.desc || 'No detailed description provided.'],
            ["Location", initiative.location || '-'],
            ["Witnesses", initiative.witnesses || 'None reported'],
            ["Root Cause", initiative.root || '-'],
            ["Impact Level", initiative.impact || '-'],
            ["Regulatory Flag", initiative.regflag || 'None'],
            ["Reported By", initiative.rby || '-'],
            ["Reported Date", fmtDate(initiative.rdate)],
            ["Assigned To", initiative.ato || '-'],
            ["Team Members", initiative.team?.join(', ') || 'None'],
            ["Escalation Path", initiative.esc || 'None']
        ];
        pdf.autoTable({ startY: currentY, body: summaryBody, theme: 'grid', styles: { fontSize: 8, cellPadding: 3, lineHeight: 1.3 }, columnStyles: { 0: { fillColor: [245, 245, 245], fontStyle: 'bold', cellWidth: 50 }, 1: { cellWidth: 'auto' } }, margin: { left: 10, right: 10 } });
        currentY = pdf.lastAutoTable.finalY + 12;

        // Table 2: Corrective Actions
        if (currentY > pageHeight - 40) { pdf.addPage(); currentY = header(initiative); }
        pdf.setFontSize(11);
        pdf.setFont("helvetica", "bold");
        pdf.text("Corrective Actions", 10, currentY);
        currentY += 4;
        let correctiveRows = (initiative.correctiveActions?.length > 0) ? initiative.correctiveActions.map(ca => [ca]) : [["No corrective actions recorded."]];
        pdf.autoTable({ startY: currentY, head: [["Action Items"]], body: correctiveRows, theme: 'grid', styles: { fontSize: 8, cellPadding: 3 }, headStyles: { fillColor: BRAND_COLOR, textColor: [255, 255, 255] }, margin: { left: 10, right: 10 } });
        currentY = pdf.lastAutoTable.finalY + 10;

        // Table 3: Tasks
        if (currentY > pageHeight - 60) { pdf.addPage(); currentY = header(initiative); }
        pdf.setFontSize(11);
        pdf.setFont("helvetica", "bold");
        pdf.text("Actions / Tasks", 10, currentY);
        currentY += 4;
        let taskRows = initiative.tasks?.length > 0 ? initiative.tasks.map(t => [t.title || t.text || t, t.status || "", t.owner || initiative.ato || "-"]) : [["No actions / tasks recorded.", "-", "-"]];
        pdf.autoTable({ startY: currentY, head: [["Action / Task", "Status", "Owner"]], body: taskRows, theme: 'grid', styles: { fontSize: 8, cellPadding: 3, lineHeight: 1.3 }, headStyles: { fillColor: BRAND_COLOR, textColor: [255, 255, 255] }, margin: { left: 10, right: 10, bottom: 20 } });
        currentY = pdf.lastAutoTable.finalY + 10;

        // Table 4: Comments
        if (currentY > pageHeight - 40) { pdf.addPage(); currentY = header(initiative); }
        pdf.setFontSize(11);
        pdf.setFont("helvetica", "bold");
        pdf.text("Comments", 10, currentY);
        currentY += 4;
        let commentRows = initiative.comments?.length > 0 ? initiative.comments.map(c => [`${c.user || "User"}`, c.text || c]) : [["-", "No comments recorded."]];
        pdf.autoTable({ startY: currentY, head: [["User / Time", "Comment"]], body: commentRows, theme: 'grid', styles: { fontSize: 8, cellPadding: 3, lineHeight: 1.3 }, headStyles: { fillColor: BRAND_COLOR, textColor: [255, 255, 255] }, columnStyles: { 0: { cellWidth: 50 }, 1: { cellWidth: 'auto' } }, margin: { left: 10, right: 10, bottom: 20 } });
        currentY = pdf.lastAutoTable.finalY + 10;

        const currentEndPage = pdf.internal.getNumberOfPages();
        for (let p = currentStartPage; p <= currentEndPage; p++) { pageColors[p] = catColor; }
    }

    // Finalize
    const totalPages = pdf.internal.getNumberOfPages();
    let reportPageCount = totalPages - (reportStartPage - 1);
    for (let i = reportStartPage; i <= totalPages; i++) {
        pdf.setPage(i);
        footer(i - (reportStartPage - 1), reportPageCount);
    }
    pdf.save("universal_incident_registry_report.pdf");
}

// ==========================================
//  AUTO-INIT (Optional)
// ==========================================
(function autoStart() {
    const params = new URLSearchParams(window.location.search);
    if (params.get("pageId") && params.get("autoPdf") === "true") {
        console.log("Auto-starting PDF generation...");
        loadDataAndGeneratePDF();
    }
})();