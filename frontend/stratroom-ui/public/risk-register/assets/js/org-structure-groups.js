/**
 * Org Structure - Group Management Logic
 * Handles checking/unchecking users, rendering avatars, and saving groups.
 */

// Mock Data for Users (can be replaced with API fetch later)
const availableUsers = [
    { id: 1, name: "Kim Karlos", img: "assets/images/user/user9.jpg" },
    { id: 2, name: "John Doe", img: "assets/images/user/user9.jpg" },
    { id: 3, name: "Sarah Smith", img: "assets/images/user/user9.jpg" },
    { id: 4, name: "Michael Zen", img: "assets/images/user/user9.jpg" },
    { id: 5, name: "Emma Watson", img: "assets/images/user/user9.jpg" },
    { id: 6, name: "Richard Roe", img: "assets/images/user/user9.jpg" },
    { id: 7, name: "Emily Clark", img: "assets/images/user/user9.jpg" },
    { id: 8, name: "David Miller", img: "assets/images/user/user9.jpg" }
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
let savedGroups = [
    {
        id: 101,
        name: "Executive Team",
        description: "Top-level management and decision makers.",
        owner: [{ id: 1, name: "Kim Karlos", img: "assets/images/user/user9.jpg" }],
        members: [
            { id: 2, name: "John Doe", img: "assets/images/user/user9.jpg" },
            { id: 3, name: "Sarah Smith", img: "assets/images/user/user9.jpg" }
        ]
    },
    {
        id: 102,
        name: "Product Development",
        description: "Responsible for new product features and roadmap.",
        owner: [{ id: 4, name: "Michael Zen", img: "assets/images/user/user9.jpg" }],
        members: [
            { id: 5, name: "Emma Watson", img: "assets/images/user/user9.jpg" },
            { id: 6, name: "Richard Roe", img: "assets/images/user/user9.jpg" },
            { id: 7, name: "Emily Clark", img: "assets/images/user/user9.jpg" }
        ]
    },
    {
        id: 103,
        name: "Marketing Squad",
        description: "Brand awareness and campaign management.",
        owner: [{ id: 8, name: "David Miller", img: "assets/images/user/user9.jpg" }],
        members: [
            { id: 1, name: "Kim Karlos", img: "assets/images/user/user9.jpg" },
            { id: 3, name: "Sarah Smith", img: "assets/images/user/user9.jpg" }
        ]
    },
    {
        id: 104,
        name: "Sales Force",
        description: "Global sales operations and revenue tracking.",
        owner: [{ id: 2, name: "John Doe", img: "assets/images/user/user9.jpg" }],
        members: [
            { id: 4, name: "Michael Zen", img: "assets/images/user/user9.jpg" },
            { id: 6, name: "Richard Roe", img: "assets/images/user/user9.jpg" },
            { id: 8, name: "David Miller", img: "assets/images/user/user9.jpg" },
            { id: 5, name: "Emma Watson", img: "assets/images/user/user9.jpg" }
        ]
    },
    {
        id: 105,
        name: "Support Team",
        description: "Customer success and technical support.",
        owner: [{ id: 3, name: "Sarah Smith", img: "assets/images/user/user9.jpg" }],
        members: [
            { id: 7, name: "Emily Clark", img: "assets/images/user/user9.jpg" },
            { id: 1, name: "Kim Karlos", img: "assets/images/user/user9.jpg" }
        ]
    }
];
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

function renderUserSelectionList(searchQuery = '') {
    const listContainer = $('#user-selection-list');
    listContainer.empty();

    let currentSelected = [];
    if (selectionContext === 'owner') currentSelected = tempOwner;
    else if (selectionContext === 'members') currentSelected = tempMembers;
    else if (selectionContext === 'view') {
        // In view mode, we expect tempOwner or tempMembers to be set by the caller
        // We will default to empty if not set, but handleMoreClick sets them.
        // Actually, we should probably pass the data or store it in a 'viewData' var?
        // Reuse temp vars is risky if we are editing?
        // Wait, handleMoreClick in "view mode" is for "Manage Groups".
        // Manage Groups is separate from Create Groups now in terms of UI, but data is shared?
        // If we are just viewing, we shouldn't touch tempOwner/Members of the "Create" form.
        // Let's use a separate logic for "View".
        // But renderUserSelectionList relies on *some* list to mark checked.
        // Let's rely on a global 'viewUsers' for view mode.
    }

    // Correct approach:
    // If view mode, we need to know WHICH users to show as checked.
    // handleMoreClick will populate a specific list.
    const selectedIds = (selectionContext === 'view' ? viewUsers : (selectionContext === 'owner' ? tempOwner : tempMembers)).map(u => u.id);

    availableUsers.forEach(user => {
        if (searchQuery && !user.name.toLowerCase().includes(searchQuery)) return;

        const isChecked = selectedIds.includes(user.id) ? 'checked' : '';
        
        // If selecting owner, prevent selecting multiple (radio behavior) - though UI is checklist, we enforce single logic
        // But for better UX, let's keep it checkbox and handle single select logic in "save" or allow radio for owner.
        // For consistency with existing HTML structure, we keep checkboxes.
        
        const disabledAttr = selectionContext === 'view' ? 'disabled' : '';

        const itemHtml = `
            <div class="list-group-item attendee">
              <div class="form-check cusom-check form-check-reverse">
                <input class="form-check-input user-checkbox" type="checkbox" value="${user.id}" id="user-${user.id}" ${isChecked} ${disabledAttr}>
                <label class="form-check-label d-flex align-items-center" for="user-${user.id}" style="width: 100%; cursor: pointer;">
                  <span class="image me-2">
                    <img src="${user.img}" alt="${user.name}" width="24" height="24" class="rounded-circle">
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
    const container = $(`#${containerId}`);
    container.empty();

    // Limit to 3
    const displayCount = 3;
    const visibleUsers = users.slice(0, displayCount);
    const remainingCount = users.length - displayCount;

    visibleUsers.forEach(user => {
        const avatarHtml = `
            <li class="avatar avatar-xs pull-up" data-bs-toggle="tooltip" data-bs-placement="top" title="${user.name}">
                <img src="${user.img}" class="rounded-circle" alt="${user.name}" width="24" height="24">
            </li>
        `;
        container.append(avatarHtml);
    });

    if (remainingCount > 0) {
        // Add special class and data attributes for click handling
        const btnId = containerId === 'owner-avatars' ? 'btn-select-owner' : 'btn-select-members';
        // We reuse the existing button logic which opens the modal
        container.append(`
            <li class="avatar avatar-xs" style="cursor: pointer;" onclick="$('#${btnId}').click()">
                <span class="avatar-initial rounded-circle" data-bs-toggle="tooltip" title="${remainingCount} more">+${remainingCount}</span>
            </li>
        `);
    }

    // Always add the "Add" button at the end
    const btnId = containerId === 'owner-avatars' ? 'btn-select-owner' : 'btn-select-members';
    container.append(`
        <li class="avatar avatar-xs" id="${btnId}" style="cursor: pointer;">
            <span class="avatar-initial rounded-circle bg-light text-primary"><i class="fas fa-plus"></i></span>
        </li>
    `);

    // Re-attach event listeners since we wiped the container
    if (containerId === 'owner-avatars') {
         $('#btn-select-owner').off('click').on('click', function () { openUserSelectionModal('owner'); });
    } else {
         $('#btn-select-members').off('click').on('click', function () { openUserSelectionModal('members'); });
    }
    
    // Refresh Tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl)
    })
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
        // Helper to generate avatar HTML string
        const getAvatarHtml = (users, type, groupIndex) => {
            if (!users || users.length === 0) return '<span class="text-muted small">None</span>';
            const displayCount = 3;
            let html = '<ul class="list-unstyled d-flex align-items-center avatar-group mb-0">';
            
            users.slice(0, displayCount).forEach(u => {
                html += `
                    <li class="avatar avatar-xs pull-up" data-bs-toggle="tooltip" data-bs-placement="top" title="${u.name}">
                        <img src="${u.img}" class="rounded-circle" alt="${u.name}" width="24" height="24">
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

        const ownerAvatars = getAvatarHtml(group.owner, 'owner', index);
        const memberAvatars = getAvatarHtml(group.members, 'members', index);
        
        const itemHtml = `
            <div class="card mb-2 border">
                <div class="card-body p-3 d-flex justify-content-between align-items-center">
                    <div>
                        <h6 class="mb-1 fw-bold">${group.name}</h6>
                        <small class="text-muted d-block mb-2">${group.description || 'No description'}</small>
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
                            <li><a class="dropdown-item text-danger" href="javascript:void(0);"><i data-lucide="trash-2" class="me-2" style="width:14px;height:14px;"></i>Delete</a></li>
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
        editGroup(index);
    });
}

function editGroup(index) {
    currentEditingGroupIndex = index;
    const group = savedGroups[index];

    $('#group-name').val(group.name);
    $('#group-desc').val(group.description);
    tempOwner = group.owner || [];
    tempMembers = group.members || [];

    renderAvatars('owner-avatars', tempOwner);
    renderAvatars('member-avatars', tempMembers);

    renderAvatars('owner-avatars', tempOwner);
    renderAvatars('member-avatars', tempMembers);

    // Switch to Create Tab
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
