const totalPages = 4; // Change this if you add more entries like entry5.txt
let currentPage = 1;

function renderPage() {
  const page = document.getElementById('page-content');
  page.classList.add('turning');

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
      }, 200);
    })
    .catch(error => {
      page.innerText = "Oops! Couldn't load this entry.";
      console.error(error);
      page.classList.remove('turning');
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

renderPage();