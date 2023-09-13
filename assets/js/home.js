document.getElementById('uploadForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const fileInput = document.getElementById('csvFile');
    const file = fileInput.files[0];
  
    if (!file) {
      alert('Please select a CSV file.');
      return;
    }
  
    if (file.type !== 'text/csv') {
      alert('Please select a valid CSV file.');
      return;
    }
  
    // Continue with form submission
    this.submit();
  });
  