
// Constants
const itemsPerPage = 10;
let currentPage = 1;
let filteredUsers = [];

// DOM elements
const userTableBody = document.getElementById("userTableBody");
const genderFilter = document.getElementById("genderFilter");
const ageFilter = document.getElementById("ageFilter");
const emailFilter = document.getElementById("emailFilter");
const verifyFilter = document.getElementById('verified');
const notVerifyFilter = document.getElementById('notverified');
let timer;

// Functions
function updatePagination() {
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    document.getElementById('currentPage').textContent = `Page ${currentPage} of ${totalPages}`;
}

function populateUserTable() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    userTableBody.innerHTML = "";

    for (let i = startIndex; i < endIndex && i < filteredUsers.length; i++) {
        const user = filteredUsers[i];
        const row = document.createElement("tr");
        row.className = 'visible'; 
        row.style.opacity = 0; 
        
        row.innerHTML = `
            <td>${user.id["$oid"]}</td>
            <td>${user.first_name}</td>
            <td>${user.last_name}</td>
            <td>${user.gender}</td>
            <td>${user.age}</td>
            <td>${user.email}</td>
            <td>${user.isVerified ? "Yes" : "No"}</td>
        `;
        userTableBody.appendChild(row);


        setTimeout(() => {
            row.style.opacity = 1;
        }, 100 * (i - startIndex));
    }

    updatePagination();
}

document.getElementById('prevPage').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        populateUserTable();
    }
});

document.getElementById('nextPage').addEventListener('click', () => {
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        populateUserTable();
    }
});

async function fetchUserData() {
    try {
        const response = await fetch('users.json');
        const userData = await response.json();
        return userData;
    } catch (error) {
        console.error('Error fetching user data:', error);
        return [];
    }
}

async function filterUsers() {
    const selectedGender = genderFilter.value;
    const ageFilterValue = ageFilter.value;
    const selectedAge = isNaN(ageFilterValue) ? null : parseInt(ageFilterValue);
    const selectedEmail = emailFilter.value.toLowerCase();
    const selectedVerify = verifyFilter.checked ? 'true' : null;
    const notSelectedVerify = notVerifyFilter.checked ? 'false' : null;

    const allConditionsMet = (user) => {
        const genderMatches = selectedGender === 'all' || user.gender === selectedGender;
        const emailMatches = selectedEmail === '' || user.email.toLowerCase().includes(selectedEmail);
        const verifyMatches = (
            (selectedVerify === null && notSelectedVerify === null) ||
            (selectedVerify === 'true' && user.isVerified === true) ||
            (notSelectedVerify === 'false' && user.isVerified === false)
        );
        const ageMatches = selectedAge === null || user.age.toString().includes(ageFilterValue);
        return genderMatches && emailMatches && verifyMatches && ageMatches;
    };

    filteredUsers = (await fetchUserData()).filter(allConditionsMet);
    currentPage = 1;
    populateUserTable();
}

// Add event listeners for filter controls
genderFilter.addEventListener("change", filterUsers);
ageFilter.addEventListener("input", filterUsers);
emailFilter.addEventListener("input", filterUsers);
verifyFilter.addEventListener('click', filterUsers);
notVerifyFilter.addEventListener('click', filterUsers);

const clearFiltersButton = document.getElementById('clearFilters');
clearFiltersButton.addEventListener('click', clearFilters);

function clearFilters() {
  genderFilter.value = 'all';
  ageFilter.value = '';
  emailFilter.value = '';
  verifyFilter.checked = false;
  notVerifyFilter.checked = false;
  initialize();
}

async function initialize() {
    await filterUsers(); 
}

initialize();
