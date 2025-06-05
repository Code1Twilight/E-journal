const totalPages = 4; // Update this as you add more entries
let currentPage = 1;

function renderPage() {
  const page = document.getElementById('page-content');
  page.classList.add('turning');
  page.scrollTop = 0;

  fetch(`entries/entry${currentPage}.txt`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Entry ${currentPage} not found.`);
      }
      return response.text();
    })
    .then(text => {
      setTimeout(() => {
        page.innerText = text;
        document.getElementById('page-number').innerText = `Page ${currentPage}`;
        page.classList.remove('turning');
        updateButtons();
        localStorage.setItem('journalPage', currentPage); // Save page
      }, 200);
    })
    .catch(error => {
      page.innerText = "Oops! Couldn't load this entry.";
      console.error(error);
      page.classList.remove('turning');
      updateButtons();
    });
}

function nextPage() {
  if (currentPage < totalPages) {
    currentPage++;
    renderPage();
  }
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    renderPage();
  }
}

function updateButtons() {
  document.querySelector('button[onclick="prevPage()"]').disabled = currentPage === 1;
  document.querySelector('button[onclick="nextPage()"]').disabled = currentPage === totalPages;
}

// Restore saved page
const saved = localStorage.getItem('journalPage');
if (saved) currentPage = parseInt(saved);

renderPage();
