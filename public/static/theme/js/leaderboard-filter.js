(() => {
  const params = new URLSearchParams(location.search);
  const selected = params.get('college');
  const table = document.querySelector('table.leaderboard');
  if (!table) return;

  const collegeSelect = document.querySelector('select[name="college"]');
  if (collegeSelect && selected) {
    const matchingOption = [...collegeSelect.options].find(
      (option) => option.value === selected || option.textContent.trim() === selected,
    );
    if (matchingOption) collegeSelect.value = matchingOption.value;
  }

  if (!selected) return;

  const rows = [...table.querySelectorAll('tr')];
  let includeCampus = false;
  for (const row of rows) {
    if (row.classList.contains('leaderboard__campus')) {
      includeCampus = row.textContent.trim() === selected;
    }
    row.hidden = !includeCampus;
  }
})();
