<script>
    // ── Data ──────────────────────────────────────────────────────────────────────
    let nextId = 100;
    const COLORS = ['#00C4C4', '#009999', '#E91E8C', '#F59E0B', '#10b981', '#3B82F6', '#7C3AED'];

    let tree = [
      {
        id: 1, name: 'John Smith', owner: 'Chris', department: 'Executive Office', deptId: 'EX-001', email: 'john.smith@stratroom.io', members: '24', designation: 'Chief Executive Officer', location: 'New York', scorecard: '', initiative: '', kpi: '', risk: '', color: '#00C4C4', photo: null, children: [
          {
            id: 2, name: 'Sarah Chen', owner: 'Kevin', department: 'Finance & Strategy', deptId: 'FIN-001', email: 'sarah.chen@stratroom.io', members: '12', designation: 'Chief Financial Officer', location: 'New York', scorecard: '', initiative: '', kpi: '', risk: '', color: '#7C3AED', photo: null, children: [
              { id: 5, name: 'Tom Klein', owner: 'Richard', department: 'Accounting', deptId: 'FIN-002', email: 'tom.klein@stratroom.io', members: '6', designation: 'Head of Accounting', location: 'Chicago', scorecard: '', initiative: '', kpi: '', risk: '', color: '#a78bfa', photo: null, children: [] },
              { id: 6, name: 'Lisa Monroe', owner: 'Andrea', department: 'Treasury', deptId: 'FIN-003', email: 'lisa.monroe@stratroom.io', members: '4', designation: 'Treasury Manager', location: 'Boston', scorecard: '', initiative: '', kpi: '', risk: '', color: '#a78bfa', photo: null, children: [] },
            ]
          },
          {
            id: 3, name: 'Mark Johnson', owner: 'Dhoni', department: 'Operations', deptId: 'OPS-001', email: 'mark.johnson@stratroom.io', members: '18', designation: 'Chief Operating Officer', location: 'Chicago', scorecard: '', initiative: '', kpi: '', risk: '', color: '#3B82F6', photo: null, children: [
              { id: 7, name: 'Alex Rodriguez', owner: 'Warner', department: 'Supply Chain', deptId: 'OPS-002', email: 'alex.r@stratroom.io', members: '8', designation: 'Supply Chain Director', location: 'Dallas', scorecard: '', initiative: '', kpi: '', risk: '', color: '#60a5fa', photo: null, children: [] },
              { id: 8, name: 'Emma Davis', owner: 'Zara', department: 'Logistics', deptId: 'OPS-003', email: 'emma.davis@stratroom.io', members: '7', designation: 'Logistics Manager', location: 'Atlanta', scorecard: '', initiative: '', kpi: '', risk: '', color: '#60a5fa', photo: null, children: [] },
            ]
          },
          {
            id: 4, name: 'Diana Lee', owner: 'Rahul', department: 'Human Resources', deptId: 'HR-001', email: 'diana.lee@stratroom.io', members: '10', designation: 'Chief People Officer', location: 'San Francisco', scorecard: '', initiative: '', kpi: '', risk: '', color: '#10b981', photo: null, children: [
              { id: 9, name: 'Ryan Baker', owner: 'Finch', department: 'Talent Acquisition', deptId: 'HR-002', email: 'ryan.baker@stratroom.io', members: '5', designation: 'Talent Lead', location: 'Austin', scorecard: '', initiative: '', kpi: '', risk: '', color: '#34d399', photo: null, children: [] },
              { id: 10, name: 'Grace Huang', owner: 'Roshan', department: 'Learning & Dev', deptId: 'HR-003', email: 'grace.huang@stratroom.io', members: '4', designation: 'L&D Manager', location: 'Seattle', scorecard: '', initiative: '', kpi: '', risk: '', color: '#34d399', photo: null, children: [] },
            ]
          },
        ]
      }
    ];
    const INIT = JSON.stringify(tree);

    // ── State ─────────────────────────────────────────────────────────────────────
    let currentView = 'tree';
    let cZoom = 1, cPX = 40, cPY = 40, cOffsets = {}, selId = null;
    let panActive = false, panMX, panMY, panPX, panPY;
    let mMode = null, mParent = null, mEditId = null, mPhoto = null, delId = null;

    // ── Utils ─────────────────────────────────────────────────────────────────────
    const $ = id => document.getElementById(id);
    const initials = n => n.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
    const rand = arr => arr[Math.floor(Math.random() * arr.length)];
    const flatten = (ns, acc = []) => { ns.forEach(n => { acc.push(n); flatten(n.children, acc); }); return acc; };

    function find(ns, id) { for (const n of ns) { if (n.id === id) return n; const f = find(n.children, id); if (f) return f; } return null; }

    function remove(ns, id) {
      let gone = null;
      const r = ns.reduce((a, n) => { if (n.id === id) { gone = n; return a; } const [c, g] = remove(n.children, id); if (g) gone = g; a.push({ ...n, children: c }); return a; }, []);
      return [r, gone];
    }

    function insert(ns, tid, node, pos) {
      if (pos === 'inside') return ns.map(n => n.id === tid ? { ...n, children: [...n.children, node] } : { ...n, children: insert(n.children, tid, node, pos) });
      const r = [];
      for (const n of ns) { if (n.id === tid && pos === 'before') r.push(node); r.push({ ...n, children: insert(n.children, tid, node, pos) }); if (n.id === tid && pos === 'after') r.push(node); }
      return r;
    }

    function update(ns, id, data) { return ns.map(n => n.id === id ? { ...n, ...data } : { ...n, children: update(n.children, id, data) }); }
    function addChild(ns, pid, child) { return ns.map(n => n.id === pid ? { ...n, children: [...n.children, child] } : { ...n, children: addChild(n.children, pid, child) }); }

    function avatarHTML(node, size = 'md') {
      const d = size === 'sm' ? 28 : size === 'lg' ? 48 : 36;
      const fs = size === 'sm' ? 10 : size === 'lg' ? 14 : 12;
      const style = `width:${d}px;height:${d}px;flex-shrink:0;border:2px solid rgba(255,255,255,.9);box-shadow:0 1px 4px rgba(0,0,0,.12);`;
      if (node.photo) return `<img src="${node.photo}" class="avatar" style="${style}" alt="${node.name}">`;
      return `<div class="avatar" style="${style}background:${node.color};font-size:${fs}px;">${initials(node.name)}</div>`;
    }

    // ── View switching ─────────────────────────────────────────────────────────────
    function setView(v) {
      currentView = v;
      $('tree-view').style.display = v === 'tree' ? 'block' : 'none';
      $('chart-view').style.display = v === 'chart' ? 'block' : 'none';
      $('grid-view').style.display = v === 'grid' ? 'block' : 'none';
      $('tracker-view').style.display = v === 'tracker' ? 'block' : 'none';
      $('search-view').style.display = 'none';
      ['tree', 'chart', 'grid', 'tracker'].forEach(k => {
        const el = $('icon-' + k);
        if (el) { if (k === v) el.classList.add('active'); else el.classList.remove('active'); }
      });
      if (v === 'chart') renderChart();
      if (v === 'grid') renderGrid();
      if (v === 'tracker') renderTracker(activeTrackerTab);
    }

    // ── Search ─────────────────────────────────────────────────────────────────────
    $('search-input').addEventListener('input', function () {
      const q = this.value.trim().toLowerCase();
      if (!q) {
        $('search-view').style.display = 'none';
        $('tree-view').style.display = currentView === 'tree' ? 'block' : 'none';
        $('chart-view').style.display = currentView === 'chart' ? 'block' : 'none';
        $('grid-view').style.display = currentView === 'grid' ? 'block' : 'none';
        $('tracker-view').style.display = currentView === 'tracker' ? 'block' : 'none';
        return;
      }
      const hits = flatten(tree).filter(n => [n.name, n.owner, n.department, n.email, n.members].some(s => (s || '').toLowerCase().includes(q)));
      $('search-count').textContent = `${hits.length} result${hits.length !== 1 ? 's' : ''} for "${this.value}"`;
      $('search-list').innerHTML = hits.map(n => `
    <div style="display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:10px;background:#fff;border:1.5px solid transparent;cursor:pointer;transition:all .15s;
         onmouseenter="this.style.background='var(--cyan-lt)';this.style.borderColor='rgba(0,196,196,.3)';"
         onmouseleave="this.style.background='#fff';this.style.borderColor='transparent';">
      ${avatarHTML(n, 'sm')}
      <div style="flex:1;min-width:0;">
        <p style="font-size:13px;font-weight:600;color:var(--navy);margin:0;">${n.name}</p>
        <p style="font-size:11px;color:var(--text-sec);margin:2px 0 0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${n.department}${n.deptId ? ' · ' + n.deptId : ''} · <span style="color:var(--cyan-dk);">${n.email || '—'}</span></p>
      </div>
      ${n.members ? `<span style="font-size:10px;font-weight:700;color:var(--cyan-dk);background:var(--cyan-lt);border:1px solid rgba(0,196,196,.22);border-radius:20px;padding:2px 8px;white-space:nowrap;">${n.members} members</span>` : ''}
    </div>`).join('');
      ['tree-view', 'chart-view', 'grid-view', 'tracker-view'].forEach(id => $(id).style.display = 'none');
      $('search-view').style.display = 'block';
    });

    // ── TREE ──────────────────────────────────────────────────────────────────────
    let dragId = null;

    function renderTree() {
      const c = $('tree-container'); c.innerHTML = '';
      if (!tree.length) {
        c.innerHTML = '<div style="display:flex;flex-direction:column;align-items:center;padding:48px 0;color:#CBD5E1;"><svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg><p style="margin:10px 0 0;font-size:12.5px;font-family:var(--font);">No people yet</p></div>';
        return;
      }
      tree.forEach(n => c.appendChild(mkRow(n, 0)));
      hookDnD();
    }

    function mkRow(node, depth) {
      const wrap = document.createElement('div'); wrap.dataset.id = node.id;

      const zb = document.createElement('div'); zb.className = 'drop-zone'; zb.dataset.tid = node.id; zb.dataset.pos = 'before';
      const za = document.createElement('div'); za.className = 'drop-zone'; za.dataset.tid = node.id; za.dataset.pos = 'after';

      const row = document.createElement('div'); row.className = 'tree-row'; row.dataset.id = node.id; row.draggable = true;
      row.innerHTML = `
    <div style="width:4px;border-radius:10px 0 0 10px;flex-shrink:0;background:${node.color};"></div>
    <div class="grip-icon" style="display:flex;align-items:center;padding:0 4px;color:#D0D8E8;cursor:grab;">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="5" r="1.2" fill="currentColor"/><circle cx="9" cy="12" r="1.2" fill="currentColor"/><circle cx="9" cy="19" r="1.2" fill="currentColor"/><circle cx="15" cy="5" r="1.2" fill="currentColor"/><circle cx="15" cy="12" r="1.2" fill="currentColor"/><circle cx="15" cy="19" r="1.2" fill="currentColor"/></svg>
    </div>
    <div style="display:flex;align-items:center;padding:8px 8px 8px 2px;">${avatarHTML(node)}</div>
    <div style="flex:1;padding:6px 4px;min-width:0;display:flex;flex-direction:column;justify-content:center;gap:3px;">
      <div style="display:flex;align-items:center;gap:4px;flex-wrap:wrap;min-width:0;">
        <p style="font-size:12.5px;font-weight:700;color:var(--navy);margin:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;flex-shrink:0;margin-right:2px;">${node.name}</p>
        ${node.designation ? `<span style="display:inline-flex;align-items:center;gap:3px;font-size:9.5px;font-weight:600;color:var(--purple);background:rgba(124,58,237,.08);border:1px solid rgba(124,58,237,.18);border-radius:5px;padding:1px 6px;white-space:nowrap;flex-shrink:0;"><svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>${node.designation}</span>` : ''}
        ${node.department ? `<span style="display:inline-flex;align-items:center;gap:3px;font-size:9.5px;font-weight:600;color:var(--cyan-dk);background:rgba(0,196,196,.08);border:1px solid rgba(0,196,196,.2);border-radius:5px;padding:1px 6px;white-space:nowrap;flex-shrink:0;"><svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>${node.department}</span>` : ''}
        ${node.location ? `<span style="display:inline-flex;align-items:center;gap:3px;font-size:9.5px;font-weight:600;color:#db2777;background:rgba(233,30,140,.07);border:1px solid rgba(233,30,140,.18);border-radius:5px;padding:1px 6px;white-space:nowrap;flex-shrink:0;"><svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>${node.location}</span>` : ''}
        ${node.deptId ? `<span style="display:inline-flex;align-items:center;gap:3px;font-size:9.5px;font-weight:600;color:#64748b;background:#f1f5f9;border:1px solid #e2e8f0;border-radius:5px;padding:1px 6px;white-space:nowrap;flex-shrink:0;"><svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>${node.deptId}</span>` : ''}
      </div>
    </div>
    <div class="tree-actions" style="align-items:center;gap:4px;padding:0 10px 0 6px;flex-shrink:0;">
      ${node.children.length ? `<button onclick="toggleKids(${node.id})" class="action-pill ap-tog" title="Toggle children"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg></button>` : ''}
      <button onclick="openAddModal(${node.id})" class="action-pill ap-add" title="Add subordinate"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>Add</button>
      <button onclick="openEdit(${node.id})" class="action-pill ap-edit" title="Edit"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>Edit</button>
      <button onclick="openDel(${node.id})" class="action-pill ap-del" title="Delete"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>Delete</button>
    </div>`;

      wrap.appendChild(zb); wrap.appendChild(row); wrap.appendChild(za);

      if (node.children.length) {
        const cw = document.createElement('div'); cw.className = 'children-wrap'; cw.dataset.pid = node.id;
        cw.style.maxHeight = '9999px';
        const cs = document.createElement('div'); cs.style.cssText = 'margin-left:20px;padding-left:14px;border-left:1.5px solid rgba(0,196,196,.15);margin-top:3px;display:flex;flex-direction:column;gap:3px;';
        node.children.forEach(c => cs.appendChild(mkRow(c, depth + 1)));
        cw.appendChild(cs); wrap.appendChild(cw);
      }
      return wrap;
    }

    function toggleKids(id) { const el = document.querySelector(`[data-pid="${id}"]`); if (el) el.classList.toggle('collapsed'); }

    function hookDnD() {
      document.querySelectorAll('.tree-row').forEach(row => {
        row.addEventListener('dragstart', e => { dragId = +row.dataset.id; row.classList.add('dragging'); e.dataTransfer.effectAllowed = 'move'; });
        row.addEventListener('dragend', () => { dragId = null; document.querySelectorAll('.tree-row').forEach(r => r.classList.remove('dragging', 'drag-over')); document.querySelectorAll('.drop-zone').forEach(z => z.classList.remove('active')); });
        row.addEventListener('dragover', e => { e.preventDefault(); if (dragId === +row.dataset.id) return; row.classList.add('drag-over'); });
        row.addEventListener('dragleave', () => row.classList.remove('drag-over'));
        row.addEventListener('drop', e => { e.preventDefault(); const tid = +row.dataset.id; if (dragId && dragId !== tid) doDrop(tid, 'inside'); row.classList.remove('drag-over'); });
      });
      document.querySelectorAll('.drop-zone').forEach(z => {
        z.addEventListener('dragover', e => { e.preventDefault(); z.classList.add('active'); });
        z.addEventListener('dragleave', () => z.classList.remove('active'));
        z.addEventListener('drop', e => { e.preventDefault(); const tid = +z.dataset.tid, pos = z.dataset.pos; if (dragId && dragId !== tid) doDrop(tid, pos); z.classList.remove('active'); });
      });
    }

    function doDrop(tid, pos) {
      const src = find(tree, dragId); if (!src) return;
      if (find(src.children, tid)) return;
      const [rem, node] = remove(tree, dragId); if (!node) return;
      tree = insert(rem, tid, node, pos); renderTree();
    }

    function resetTree() { tree = JSON.parse(INIT); cOffsets = {}; renderAll(); }

    // ── CHART ─────────────────────────────────────────────────────────────────────
    const NW = 204, NH = 96, HG = 36, VG = 64;

    function layout(ns, depth = 0, sx = 0) {
      const r = []; let x = sx;
      for (const n of ns) {
        const kids = n.children.length ? layout(n.children, depth + 1, x) : [];
        const sw = kids.length ? kids.reduce((s, k) => s + k.sw + HG, 0) - HG : NW;
        const cx = kids.length ? (kids[0].x + kids[kids.length - 1].x) / 2 : x + sw / 2 - NW / 2;
        r.push({ ...n, x: cx, y: depth * (NH + VG), sw }); r.push(...kids); x += sw + HG;
      }
      return r;
    }

    function edges(ns, lm) {
      const e = [], visit = ns => { ns.forEach(n => { const p = lm.get(n.id); n.children.forEach(c => { const cl = lm.get(c.id); if (p && cl) e.push({ f: p, t: cl, color: n.color }); }); visit(n.children); }); }; visit(ns); return e;
    }

    function renderChart() {
      const base = layout(tree);
      const ln = base.map(n => ({ ...n, x: n.x + (cOffsets[n.id]?.x || 0), y: n.y + (cOffsets[n.id]?.y || 0) }));
      const lm = new Map(ln.map(n => [n.id, n]));
      const ed = edges(tree, lm);
      const cw = Math.max(900, ...ln.map(n => n.x + NW)) + 80;
      const ch = Math.max(500, ...ln.map(n => n.y + NH)) + 80;

      $('canvas-inner').style.transform = `translate(${cPX}px,${cPY}px) scale(${cZoom})`;
      $('zoom-label').textContent = Math.round(cZoom * 100) + '%';

      const svg = $('chart-svg'); svg.style.width = cw + 'px'; svg.style.height = ch + 'px';
      svg.innerHTML = ed.map(({ f, t, color }) => {
        const x1 = f.x + NW / 2, y1 = f.y + NH, x2 = t.x + NW / 2, y2 = t.y, my = (y1 + y2) / 2;
        return `<path d="M${x1},${y1} C${x1},${my} ${x2},${my} ${x2},${y2}" fill="none" stroke="${color || '#CBD5E1'}" stroke-width="1.5" opacity=".5"/>`;
      }).join('');

      const nc = $('chart-nodes'); nc.innerHTML = ''; nc.style.cssText = `position:relative;width:${cw}px;height:${ch}px;`;
      ln.forEach(lay => {
        const node = find(tree, lay.id); if (!node) return;
        const el = document.createElement('div'); el.className = 'chart-node' + (selId === lay.id ? ' selected' : ''); el.dataset.id = lay.id;
        el.style.left = lay.x + 'px'; el.style.top = lay.y + 'px';
        el.innerHTML = `
      <div class="cn-body" style="border-top:3px solid ${node.color};">
        <div style="padding:10px;">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
            ${avatarHTML(node, 'sm')}
            <div style="flex:1;min-width:0;">
              <p style="font-size:12px;font-weight:700;color:var(--navy);margin:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${node.name}</p>
              <p style="font-size:10px;color:var(--text-sec);margin:1px 0 0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${node.deptId || node.department}</p>
            </div>
          </div>
          <div style="border-top:1px solid #F4F7FC;padding-top:6px;">
            <div style="display:flex;align-items:center;gap:3px;flex-wrap:wrap;">
              ${node.designation ? `<span style="display:inline-flex;align-items:center;gap:2px;font-size:8.5px;font-weight:600;color:var(--purple);background:rgba(124,58,237,.08);border:1px solid rgba(124,58,237,.18);border-radius:4px;padding:1px 5px;white-space:nowrap;"><svg width="6" height="6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>${node.designation}</span>` : ''}
              <span style="display:inline-flex;align-items:center;gap:2px;font-size:8.5px;font-weight:600;color:var(--cyan-dk);background:rgba(0,196,196,.08);border:1px solid rgba(0,196,196,.2);border-radius:4px;padding:1px 5px;white-space:nowrap;"><svg width="6" height="6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>${node.department}</span>
              ${node.location ? `<span style="display:inline-flex;align-items:center;gap:2px;font-size:8.5px;font-weight:600;color:#db2777;background:rgba(233,30,140,.07);border:1px solid rgba(233,30,140,.18);border-radius:4px;padding:1px 5px;white-space:nowrap;"><svg width="6" height="6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>${node.location}</span>` : ''}
              ${node.deptId ? `<span style="display:inline-flex;align-items:center;gap:2px;font-size:8.5px;font-weight:600;color:#64748b;background:#f1f5f9;border:1px solid #e2e8f0;border-radius:4px;padding:1px 5px;white-space:nowrap;">#${node.deptId}</span>` : ''}
            </div>
          </div>
        </div>
      </div>
      <div class="cn-actions" style="gap:3px;">
        <button onclick="event.stopPropagation();openAddModal(${node.id})" class="action-pill ap-add" title="Add"><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></button>
        <button onclick="event.stopPropagation();openEdit(${node.id})" class="action-pill ap-edit" title="Edit"><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>
        <button onclick="event.stopPropagation();openDel(${node.id})" class="action-pill ap-del" title="Delete"><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg></button>
      </div>`;
        el.addEventListener('click', () => { selId = lay.id; renderChart(); });
        hookNodeDrag(el, lay.id); nc.appendChild(el);
      });
    }

    function hookNodeDrag(el, id) {
      let sx, sy;
      el.addEventListener('mousedown', e => {
        if (e.target.closest('button')) return; e.preventDefault(); sx = e.clientX; sy = e.clientY;
        const mv = ev => { const dx = (ev.clientX - sx) / cZoom, dy = (ev.clientY - sy) / cZoom; cOffsets[id] = { x: (cOffsets[id]?.x || 0) + dx, y: (cOffsets[id]?.y || 0) + dy }; sx = ev.clientX; sy = ev.clientY; renderChart(); };
        const up = () => { window.removeEventListener('mousemove', mv); window.removeEventListener('mouseup', up); };
        window.addEventListener('mousemove', mv); window.addEventListener('mouseup', up);
      });
    }

    const ca = $('canvas-area');
    ca.addEventListener('mousedown', e => { if (e.target.closest('.chart-node')) return; panActive = true; ca.classList.add('panning'); panMX = e.clientX; panMY = e.clientY; panPX = cPX; panPY = cPY; });
    ca.addEventListener('click', e => { if (!e.target.closest('.chart-node')) { selId = null; renderChart(); } });
    window.addEventListener('mousemove', e => { if (!panActive) return; cPX = panPX + e.clientX - panMX; cPY = panPY + e.clientY - panMY; $('canvas-inner').style.transform = `translate(${cPX}px,${cPY}px) scale(${cZoom})`; });
    window.addEventListener('mouseup', () => { panActive = false; ca.classList.remove('panning'); });

    function zoomIn() { cZoom = Math.min(2, +(cZoom + 0.15).toFixed(2)); renderChart(); }
    function zoomOut() { cZoom = Math.max(0.3, +(cZoom - 0.15).toFixed(2)); renderChart(); }
    function resetChart() { cOffsets = {}; cZoom = 1; cPX = 40; cPY = 40; renderChart(); }

    // ── GRID ──────────────────────────────────────────────────────────────────────
    function renderGrid() {
      const all = flatten(tree);
      $('grid-count').textContent = `${all.length} people`;
      $('grid-container').innerHTML = all.map(node => `
    <div class="grid-card">
      <!-- colour accent strip -->
      <div style="height:2.5px;background:${node.color};"></div>
      <!-- card body -->
      <div style="padding:10px 10px 9px;display:flex;align-items:center;gap:8px;position:relative;">
        ${avatarHTML(node, 'sm')}
        <div style="flex:1;min-width:0;">
          <p style="font-size:12px;font-weight:700;color:var(--navy);margin:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;line-height:1.3;">${node.name}</p>
          <div style="display:flex;align-items:center;gap:3px;flex-wrap:wrap;margin-top:4px;">
            ${node.designation ? `<span style="display:inline-flex;align-items:center;gap:2px;font-size:8.5px;font-weight:600;color:var(--purple);background:rgba(124,58,237,.08);border:1px solid rgba(124,58,237,.18);border-radius:4px;padding:1px 5px;white-space:nowrap;"><svg width="6" height="6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>${node.designation}</span>` : ''}
            <span style="display:inline-flex;align-items:center;gap:2px;font-size:8.5px;font-weight:600;color:var(--cyan-dk);background:rgba(0,196,196,.08);border:1px solid rgba(0,196,196,.2);border-radius:4px;padding:1px 5px;white-space:nowrap;"><svg width="6" height="6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>${node.department}</span>
            ${node.location ? `<span style="display:inline-flex;align-items:center;gap:2px;font-size:8.5px;font-weight:600;color:#db2777;background:rgba(233,30,140,.07);border:1px solid rgba(233,30,140,.18);border-radius:4px;padding:1px 5px;white-space:nowrap;"><svg width="6" height="6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>${node.location}</span>` : ''}
            ${node.deptId ? `<span style="display:inline-flex;align-items:center;gap:2px;font-size:8.5px;font-weight:600;color:#64748b;background:#f1f5f9;border:1px solid #e2e8f0;border-radius:4px;padding:1px 5px;white-space:nowrap;">#${node.deptId}</span>` : ''}
          </div>
        </div>
        <div class="grid-card-actions">
          <button onclick="openEdit(${node.id})" class="action-pill ap-edit" title="Edit" style="padding:3px 6px;font-size:9px;gap:3px;"><svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>Edit</button>
          <button onclick="openDel(${node.id})" class="action-pill ap-del" title="Delete" style="padding:3px 6px;font-size:9px;gap:3px;"><svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>Del</button>
        </div>
      </div>
      <!-- bottom meta row -->
      <div style="padding:0 10px 8px;display:flex;align-items:center;justify-content:space-between;">
        <span style="font-size:9px;color:var(--text-ter);font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:120px;">${node.department}</span>
        ${node.members ? `<span style="font-size:9px;font-weight:700;color:var(--cyan-dk);background:var(--cyan-lt);border:1px solid rgba(0,196,196,.2);border-radius:20px;padding:1px 6px;white-space:nowrap;flex-shrink:0;">${node.members}</span>` : ''}
      </div>
    </div>`).join('');
    }

    // ── MODALS ─────────────────────────────────────────────────────────────────────
    const MODAL_TEXT_FIELDS = ['f-dept', 'f-dept-id', 'f-email', 'f-members', 'f-designation', 'f-location'];
    const MODAL_SEL_FIELDS = ['f-owner', 'f-scorecard', 'f-initiative', 'f-kpi', 'f-risk'];

    function openAddModal(pid) {
      mMode = 'add'; mParent = pid; mEditId = null;
      $('modal-title').textContent = pid === -1 ? 'Create Org' : 'Add Subordinate';
      MODAL_TEXT_FIELDS.forEach(id => { const el = $(id); if (el) el.value = ''; });
      MODAL_SEL_FIELDS.forEach(id => { const el = $(id); if (el) el.selectedIndex = 0; });
      const att = $('f-attachment'); if (att) att.value = '';
      $('modal-overlay').classList.add('open');
    }

    function openEdit(id) {
      const n = find(tree, id); if (!n) return;
      mMode = 'edit'; mEditId = id; mParent = null;
      $('modal-title').textContent = 'Edit Org';
      $('f-dept').value = n.department || '';
      $('f-dept-id').value = n.deptId || '';
      $('f-email').value = n.email || '';
      $('f-members').value = n.members || '';
      if ($('f-designation')) $('f-designation').value = n.designation || '';
      if ($('f-location')) $('f-location').value = n.location || '';
      const ownEl = $('f-owner');
      if (ownEl) { const opt = [...ownEl.options].find(o => o.value === n.owner); if (opt) ownEl.value = n.owner; else ownEl.selectedIndex = 0; }
      $('f-scorecard').selectedIndex = 0; $('f-initiative').selectedIndex = 0;
      $('f-kpi').selectedIndex = 0; $('f-risk').selectedIndex = 0;
      const att = $('f-attachment'); if (att) att.value = '';
      $('modal-overlay').classList.add('open');
    }

    function closeModal() { $('modal-overlay').classList.remove('open'); }

    function saveModal() {
      const owner = $('f-owner').value; if (!owner) return;
      const data = {
        name: owner,
        department: $('f-dept').value.trim(),
        deptId: $('f-dept-id').value.trim(),
        email: $('f-email').value.trim(),
        members: $('f-members').value.trim(),
        designation: $('f-designation') ? $('f-designation').value.trim() : '',
        location: $('f-location') ? $('f-location').value.trim() : '',
        owner,
        scorecard: $('f-scorecard').value || '',
        initiative: $('f-initiative').value || '',
        kpi: $('f-kpi').value || '',
        risk: $('f-risk').value || '',
      };
      if (mMode === 'add') {
        const nn = { id: nextId++, ...data, color: rand(COLORS), children: [] };
        tree = mParent === -1 ? [...tree, nn] : addChild(tree, mParent, nn);
      } else { tree = update(tree, mEditId, data); }
      closeModal(); renderAll();
    }

    function handlePhotoUpload(e) { const f = e.target.files[0]; if (!f) return; const r = new FileReader(); r.onload = ev => { mPhoto = ev.target.result; $('photo-preview').src = mPhoto; $('photo-preview').style.display = 'block'; $('photo-placeholder').style.display = 'none'; $('photo-rm').style.display = 'block'; }; r.readAsDataURL(f); }
    function removePhoto() { mPhoto = null; resetPhotoUI(); }
    function resetPhotoUI() { $('photo-preview').style.display = 'none'; $('photo-placeholder').style.display = 'flex'; $('photo-rm').style.display = 'none'; $('photo-file').value = ''; }

    function openDel(id) { delId = id; $('del-overlay').classList.add('open'); }
    function closeDelete() { $('del-overlay').classList.remove('open'); }
    function confirmDelete() { if (!delId) return; tree = remove(tree, delId)[0]; closeDelete(); renderAll(); }

    function renderAll() { renderTree(); if (currentView === 'chart') renderChart(); if (currentView === 'grid') renderGrid(); }

    // ── GOLDEN AI FLOATERS ────────────────────────────────────────────────────────
    (function () {
      const canvas = document.getElementById('floater-canvas');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      let W, H;
      function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
      resize(); window.addEventListener('resize', resize);

      const GOLD = 'rgba(212,160,23,', AMBER = 'rgba(245,158,11,', WARM = 'rgba(251,191,36,';
      const configs = [
        { type: 'ring', r: 55, lw: 1.2, col: GOLD, alpha: .06, x: .08, y: .15, vx: .12, vy: .08, phase: 0 },
        { type: 'ring', r: 38, lw: 1, col: AMBER, alpha: .05, x: .80, y: .75, vx: -.1, vy: .12, phase: 1.2 },
        { type: 'ring', r: 68, lw: .8, col: WARM, alpha: .04, x: .55, y: .88, vx: .09, vy: -.09, phase: 2.4 },
        { type: 'ring', r: 28, lw: 1.1, col: GOLD, alpha: .07, x: .92, y: .18, vx: -.13, vy: .1, phase: 0.7 },
        { type: 'dring', r: 32, lw: .9, col: GOLD, alpha: .05, x: .06, y: .62, vx: .1, vy: .11, phase: 1.5 },
        { type: 'dring', r: 46, lw: .8, col: WARM, alpha: .04, x: .68, y: .08, vx: -.09, vy: .09, phase: 0.3 },
        { type: 'arc', r: 42, lw: 1.2, col: GOLD, alpha: .07, x: .22, y: .45, vx: .09, vy: .13, phase: 2.0, a0: .4, a1: 2.2 },
        { type: 'arc', r: 30, lw: 1, col: AMBER, alpha: .06, x: .82, y: .48, vx: -.1, vy: -.09, phase: 1.1, a0: 1.0, a1: 3.5 },
        { type: 'arc', r: 58, lw: .8, col: WARM, alpha: .04, x: .42, y: .04, vx: .07, vy: .1, phase: 3.3, a0: .2, a1: 1.8 },
        { type: 'diamond', s: 11, lw: 1, col: GOLD, alpha: .08, x: .18, y: .80, vx: .13, vy: -.1, phase: 1.8 },
        { type: 'diamond', s: 8, lw: .9, col: AMBER, alpha: .07, x: .72, y: .28, vx: -.1, vy: .1, phase: 0.5 },
        { type: 'diamond', s: 10, lw: 1, col: WARM, alpha: .06, x: .48, y: .66, vx: .08, vy: .12, phase: 2.7 },
        { type: 'dotring', r: 35, lw: 1.2, col: GOLD, alpha: .06, x: .35, y: .20, vx: .1, vy: .09, phase: 0.6 },
        { type: 'dotring', r: 50, lw: 1, col: AMBER, alpha: .05, x: .60, y: .55, vx: -.08, vy: .11, phase: 2.2 },
        { type: 'cross', s: 10, lw: 1, col: GOLD, alpha: .08, x: .52, y: .38, vx: .09, vy: .1, phase: 0.2 },
        { type: 'cross', s: 7, lw: .9, col: AMBER, alpha: .07, x: .25, y: .10, vx: -.1, vy: .09, phase: 2.9 },
      ];

      function mkFloaters() {
        return configs.map(c => ({ ...c, cx: c.x * W, cy: c.y * H, ox: c.x * W, oy: c.y * H, t: c.phase * 60, rot: Math.random() * Math.PI * 2, rspeed: (Math.random() - .5) * .003 }));
      }
      let floaters = mkFloaters();
      window.addEventListener('resize', () => { floaters = mkFloaters(); });
      const DRIFT = 34;

      function drawFloater(f) {
        ctx.save(); ctx.translate(f.cx, f.cy); ctx.rotate(f.rot);
        switch (f.type) {
          case 'ring':
            ctx.beginPath(); ctx.arc(0, 0, f.r, 0, Math.PI * 2);
            ctx.strokeStyle = f.col + f.alpha + ')'; ctx.lineWidth = f.lw; ctx.stroke(); break;
          case 'dring':
            [f.r, f.r * 1.45].forEach(r => { ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.strokeStyle = f.col + (f.alpha * .8) + ')'; ctx.lineWidth = f.lw; ctx.stroke(); }); break;
          case 'arc':
            ctx.beginPath(); ctx.arc(0, 0, f.r, f.a0, f.a1); ctx.strokeStyle = f.col + f.alpha + ')'; ctx.lineWidth = f.lw; ctx.stroke(); break;
          case 'dotring':
            ctx.beginPath(); ctx.arc(0, 0, f.r, 0, Math.PI * 2); ctx.strokeStyle = f.col + f.alpha + ')'; ctx.lineWidth = f.lw; ctx.setLineDash([3, 5]); ctx.stroke(); ctx.setLineDash([]); break;
          case 'diamond':
            ctx.beginPath(); ctx.moveTo(0, -f.s); ctx.lineTo(f.s * .6, 0); ctx.lineTo(0, f.s); ctx.lineTo(-f.s * .6, 0); ctx.closePath();
            ctx.strokeStyle = f.col + f.alpha + ')'; ctx.lineWidth = f.lw; ctx.stroke(); break;
          case 'cross':
            ctx.strokeStyle = f.col + f.alpha + ')'; ctx.lineWidth = f.lw;
            ctx.beginPath(); ctx.moveTo(-f.s, 0); ctx.lineTo(f.s, 0); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(0, -f.s); ctx.lineTo(0, f.s); ctx.stroke(); break;
        }
        ctx.restore();
      }

      function tick() {
        ctx.clearRect(0, 0, W, H);
        floaters.forEach(f => { f.t += .4; f.cx = f.ox + Math.sin(f.t * f.vx * .05 + f.phase) * DRIFT; f.cy = f.oy + Math.cos(f.t * f.vy * .05 + f.phase) * DRIFT; f.rot += f.rspeed; drawFloater(f); });
        requestAnimationFrame(tick);
      }
      tick();
    })();

    // ── ORG TRACKER ────────────────────────────────────────────────────────────────
    let activeTrackerTab = 'CEO';

    const TRACKER_DATA = {
      'CEO': [
        { parent: '', owner: 'Raza', dept: 'CEO', email: 'Roman@demo.com', page: 'CEO Scorecard', from: '19/10/2022', to: 'Present' },
        { parent: '', owner: 'Raza', dept: 'CEO', email: 'Roman@demo.com', page: 'My Meetings', from: '08/11/2022', to: 'Present' },
        { parent: '', owner: 'Raza', dept: 'CEO', email: 'Roman@demo.com', page: 'PESTEL', from: '08/11/2022', to: 'Present' },
        { parent: '', owner: 'Raza', dept: 'CEO', email: 'Roman@demo.com', page: 'SWOT', from: '08/11/2022', to: 'Present' },
        { parent: '', owner: 'Raza', dept: 'CEO', email: 'Roman@demo.com', page: 'Raza Page', from: '10/11/2022', to: 'Present' },
        { parent: '', owner: 'Raza', dept: 'CEO', email: 'Roman@demo.com', page: 'Strategy Formulation', from: '28/01/2023', to: 'Present' },
        { parent: '', owner: 'Raza', dept: 'CEO', email: 'Roman@demo.com', page: 'Project Planning', from: '03/02/2023', to: 'Present' },
        { parent: '', owner: 'Raza', dept: 'CEO', email: 'Roman@demo.com', page: 'Risk Plan', from: '08/02/2023', to: 'Present' },
        { parent: '', owner: 'Raza', dept: 'CEO', email: 'Roman@demo.com', page: 'TIMB PESTEL', from: '07/03/2023', to: 'Present' },
        { parent: '', owner: 'Raza', dept: 'CEO', email: 'Roman@demo.com', page: 'TIMB SWOT', from: '07/03/2023', to: 'Present' },
        { parent: '', owner: 'Raza', dept: 'CEO', email: 'Roman@demo.com', page: 'TIMB Initiatives', from: '08/03/2023', to: 'Present' },
        { parent: '', owner: 'Raza', dept: 'CEO', email: 'Roman@demo.com', page: 'TIMB RISK', from: '08/03/2023', to: '13/07/2024' },
        { parent: '', owner: 'Raza', dept: 'CEO', email: 'Roman@demo.com', page: 'Project Trial', from: '13/04/2023', to: 'Present' },
        { parent: '', owner: 'Raza', dept: 'CEO', email: 'Roman@demo.com', page: 'Esg Scorecard', from: '11/05/2023', to: 'Present' },
        { parent: '', owner: 'Raza', dept: 'CEO', email: 'Roman@demo.com', page: 'Esg Initiatives', from: '12/05/2023', to: 'Present' },
        { parent: '', owner: 'Raza', dept: 'CEO', email: 'Roman@demo.com', page: 'Esg Risk', from: '12/05/2023', to: 'Present' },
        { parent: '', owner: 'Raza', dept: 'CEO', email: 'Roman@demo.com', page: 'Esg Cockpit', from: '12/05/2023', to: 'Present' },
        { parent: '', owner: 'Raza', dept: 'CEO', email: 'Roman@demo.com', page: 'Cockpit Layer', from: '15/08/2023', to: 'Present' },
        { parent: '', owner: 'Raza', dept: 'CEO', email: 'Roman@demo.com', page: 'Charts Layer', from: '15/08/2023', to: 'Present' },
        { parent: '', owner: 'Raza', dept: 'CEO', email: 'Roman@demo.com', page: 'Charts test', from: '21/09/2023', to: 'Present' },
        { parent: '', owner: 'Raza', dept: 'CEO', email: 'Roman@demo.com', page: 'Charts new', from: '21/09/2023', to: 'Present' },
        { parent: '', owner: 'Raza', dept: 'CEO', email: 'Roman@demo.com', page: 'Berhan Reports', from: '21/09/2023', to: 'Present' },
        { parent: '', owner: 'Raza', dept: 'CEO', email: 'Roman@demo.com', page: 'Kpi Drilldown Report', from: '01/08/2024', to: 'Present' },
        { parent: '', owner: 'Raza', dept: 'CEO', email: 'Roman@demo.com', page: 'Financial Scorecard', from: '01/08/2024', to: 'Present' },
        { parent: '', owner: 'Raza', dept: 'CEO', email: 'Roman@demo.com', page: 'Raza Approval Page', from: '12/09/2024', to: 'Present' },
        { parent: 'CEO', owner: 'Raza', dept: 'CEO', email: 'Roman@demo.com', page: 'Risk New', from: '11/07/2024', to: 'Present' },
        { parent: '', owner: 'Raza', dept: 'CEO', email: 'Roman@demo.com', page: 'New Risk', from: '12/07/2024', to: 'Present' },
        { parent: '', owner: 'Raza', dept: 'CEO', email: 'Roman@demo.com', page: 'RPO New', from: '12/07/2024', to: 'Present' },
        { parent: '', owner: 'Raza', dept: 'CEO', email: 'Roman@demo.com', page: 'Impact Survey', from: '12/07/2024', to: 'Present' },
        { parent: '', owner: 'Raza', dept: 'CEO', email: 'Roman@demo.com', page: 'Process Enabler', from: '12/07/2024', to: 'Present' },
        { parent: '', owner: 'Raza', dept: 'CEO', email: 'Roman@demo.com', page: 'Performance Cockpit', from: '13/07/2024', to: 'Present' },
        { parent: '', owner: 'Raza', dept: 'CEO', email: 'Roman@demo.com', page: 'KRA Risk', from: '13/07/2024', to: 'Present' },
        { parent: '', owner: 'Raza', dept: 'CEO', email: 'Roman@demo.com', page: 'LTD Scorecard', from: '15/04/2024', to: 'Present' },
        { parent: '', owner: 'Raza', dept: 'CEO', email: 'Roman@demo.com', page: 'VGN Reports', from: '24/05/2024', to: 'Present' },
        { parent: '', owner: 'Raza', dept: 'CEO', email: 'Roman@demo.com', page: 'CEO Strategy Map', from: '17/10/2024', to: 'Present' },
        { parent: '', owner: 'Raza', dept: 'CEO', email: 'Roman@demo.com', page: 'All Initiatives View', from: '17/10/2024', to: 'Present' },
      ],
      'ZIMRA': [
        { parent: 'MOF', owner: 'Chris', dept: 'ZIMRA', email: '', page: 'Sales Scorecard', from: '19/10/2022', to: 'Present' },
        { parent: 'MOF', owner: 'Chris', dept: 'ZIMRA', email: '', page: 'Sales Initiatives', from: '27/10/2022', to: 'Present' },
        { parent: 'MOF', owner: 'Chris', dept: 'ZIMRA', email: '', page: 'Chris Space', from: '24/11/2022', to: 'Present' },
        { parent: 'MOF', owner: 'Chris', dept: 'ZIMRA', email: '', page: 'Charts', from: '19/04/2023', to: 'Present' },
        { parent: 'MOF', owner: 'Chris', dept: 'ZIMRA', email: '', page: 'Cockpit', from: '19/04/2023', to: 'Present' },
        { parent: 'MOF', owner: 'Chris', dept: 'ZIMRA', email: '', page: '', from: '25/07/2024', to: 'Present' },
      ],
      'Customer Service': [
        { parent: 'MOF', owner: 'Kevin', dept: 'Customer Services', email: '', page: 'Customer Services Scorecard', from: '19/10/2022', to: 'Present' },
        { parent: 'MOF', owner: 'Kevin', dept: 'Customer Services', email: '', page: '', from: '19/10/2022', to: 'Present' },
        { parent: 'MOF', owner: 'Kevin', dept: 'Customer Services', email: '', page: 'Customer Initiative', from: '27/10/2022', to: 'Present' },
      ],
      'Marketing': [
        { parent: 'MOF', owner: 'Kevin', dept: 'Customer Services', email: '', page: 'Customer Services Scorecard', from: '19/10/2022', to: 'Present' },
        { parent: 'MOF', owner: 'Kevin', dept: 'Customer Services', email: '', page: '', from: '19/10/2022', to: 'Present' },
        { parent: 'MOF', owner: 'Kevin', dept: 'Customer Services', email: '', page: 'Customer Initiative', from: '27/10/2022', to: 'Present' },
      ],
      'Operations': [
        { parent: 'MOF', owner: 'Dhoni', dept: 'Operations', email: 'Dhoni@demo.com', page: 'Operations Scorecard', from: '19/10/2022', to: 'Present' },
        { parent: 'MOF', owner: 'Dhoni', dept: 'Operations', email: 'Dhoni@demo.com', page: 'Operations Initiative', from: '28/10/2022', to: 'Present' },
        { parent: 'Board of directors', owner: 'Dhoni', dept: 'Operations', email: 'Dhoni@demo.com', page: 'Tobacco Industry Operations Scorecard', from: '30/11/2022', to: 'Present' },
        { parent: 'Ministry of Agriculture', owner: 'Dhoni', dept: 'Operations', email: 'Dhoni@demo.com', page: 'My Space', from: '09/03/2023', to: 'Present' },
        { parent: 'Public Service Commission', owner: 'Zampa', dept: 'Operations', email: 'Dhoni@demo.com', page: '', from: '06/02/2024', to: 'Present' },
      ],
      'Project Services': [
        { parent: 'MOF', owner: 'Zampa', dept: 'Project Services', email: 'Zampa@demo.com', page: 'Project Services Scorecard', from: '19/10/2022', to: 'Present' },
        { parent: 'MOF', owner: 'Zampa', dept: 'Project Services', email: 'Zampa@demo.com', page: 'ScoreCard', from: '06/12/2022', to: 'Present' },
        { parent: 'Digital Sales', owner: 'Zampa', dept: 'Project Services', email: 'Zampa@demo.com', page: '', from: '01/09/2023', to: 'Present' },
      ],
      'Compliance': [
        { parent: 'MOF', owner: 'Stark', dept: 'Compliance', email: '', page: 'Compliance Scorecard', from: '19/10/2022', to: 'Present' },
        { parent: 'MOF', owner: 'Stark', dept: 'Compliance', email: '', page: '', from: '19/10/2022', to: 'Present' },
        { parent: 'MOF', owner: 'Stark', dept: 'Compliance', email: '', page: 'PSOB Compliance Scorecard', from: '06/11/2022', to: 'Present' },
      ],
      'Product': [
        { parent: 'MOF', owner: 'Zara', dept: 'Product', email: '', page: 'Product Scorecard', from: '19/10/2022', to: 'Present' },
        { parent: 'MOF', owner: 'Zara', dept: 'Product', email: '', page: '', from: '19/10/2022', to: 'Present' },
      ],
      'India': [
        { parent: 'Country Sales', owner: 'Roshan', dept: 'India', email: '', page: 'India Sales Scorecard', from: '19/10/2022', to: 'Present' },
        { parent: 'Country Sales', owner: 'Roshan', dept: 'India', email: '', page: '', from: '27/03/2024', to: 'Present' },
        { parent: 'Country Sales', owner: 'Roshan', dept: 'India', email: '', page: 'India Scorecard', from: '24/09/2024', to: '24/09/2024' },
      ],
      'Kenya': [
        { parent: 'Country Sales', owner: 'Andrea', dept: 'Kenya', email: '', page: 'Kenya Sales Scorecard', from: '19/10/2022', to: 'Present' },
        { parent: 'Country Sales', owner: 'Andrea', dept: 'Kenya', email: '', page: '', from: '19/10/2022', to: 'Present' },
      ],
      'South Africa': [
        { parent: 'Country Sales', owner: 'Nevil', dept: 'South Africa', email: '', page: 'South Africa Sales Scorecard', from: '19/10/2022', to: 'Present' },
        { parent: 'Country Sales', owner: 'Nevil', dept: 'South Africa', email: '', page: '', from: '19/10/2022', to: 'Present' },
      ],
    };

    function switchTrackerTab(btn, tab) {
      document.querySelectorAll('.trk-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeTrackerTab = tab;
      renderTracker(tab);
    }

    function renderTracker(tab) {
      const rows = TRACKER_DATA[tab] || [];
      $('trk-dept-label').textContent = tab;
      const countEl = $('trk-row-count');
      if (countEl) countEl.textContent = `${rows.length} record${rows.length !== 1 ? 's' : ''}`;
      $('trk-body').innerHTML = rows.map((r, i) => `
    <tr class="border-b border-[rgba(220,228,245,.4)] transition-colors duration-150 hover:bg-[var(--cyan-lt)] even:bg-[rgba(248,251,255,.6)]">
      <td class="px-3 py-[7px] text-[var(--text-ter)] text-[11px] align-middle whitespace-nowrap">${r.parent || '—'}</td>
      <td class="px-3 py-[7px] font-semibold text-[var(--navy)] text-xs align-middle whitespace-nowrap">${r.owner}</td>
      <td class="px-3 py-[7px] text-[var(--text-sec)] text-xs align-middle whitespace-nowrap">${r.dept}</td>
      <td class="px-3 py-[7px] text-[var(--text-ter)] text-[11px] align-middle whitespace-nowrap">${r.email || '—'}</td>
      <td class="px-3 py-[7px] text-[var(--cyan-dk)] font-medium text-xs align-middle whitespace-nowrap">${r.page || '<span class="text-[var(--text-ter)] italic text-[11px]">—</span>'}</td>
      <td class="px-3 py-[7px] align-middle whitespace-nowrap"><span class="trk-date-past">${r.from}</span></td>
      <td class="px-3 py-[7px] align-middle whitespace-nowrap">${r.to === 'Present' ? '<span class="trk-date-present">● Present</span>' : `<span class="trk-date-past">${r.to}</span>`}</td>
    </tr>`).join('');
    }

    // ── Init ───────────────────────────────────────────────────────────────────────
    const yrEl = document.getElementById('yr'); if (yrEl) yrEl.textContent = new Date().getFullYear();
    renderTree();
  </script>