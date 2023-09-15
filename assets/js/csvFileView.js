
  // Function to render a column chart
  function renderColumnChart(column, dataRows,headers) {
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(drawChart);
  
    function drawChart() {
      const chartData = new google.visualization.DataTable();
      chartData.addColumn('string', 'Category');
      chartData.addColumn('number', 'Value');
  
      // Find the index of the selected column based on data-column attribute
      const columnIndex = headers.findIndex(header => {
      return header.getAttribute('data-column') === column;
    });
  
      // Prepare the chart data from the selected column
      dataRows.forEach(row => {
        // Use the columnIndex to retrieve the cell data
        const cellData = row.cells[columnIndex].textContent;
  
        // Check if cellData is a valid number before adding it to the chart
        if (!isNaN(parseFloat(cellData))) {
          chartData.addRow([column, parseFloat(cellData)]);
        }
      });
  
      const options = {
        title: `Column Chart for ${column}`,
        bars: 'vertical',
      };
      const chart = new google.visualization.ColumnChart(document.getElementById('chartContainer'));
      chart.draw(chartData, options);
    }
  }
  
  // ...
  
    
     // Function to attach event listeners for sorting and searching
    function attachEventListeners() {
    const table = document.querySelector('table');
    const headers = Array.from(table.querySelectorAll('.sortable-header'));
    const dataRows = Array.from(table.querySelectorAll('tbody tr'));
  
    headers.forEach(header => {
  
      // Attach click event to the chart button
      const chartButton = header.querySelector('.chart-button');
      if (chartButton) {
        const column = header.querySelector('.chart-button').getAttribute('data-column');
        chartButton.addEventListener('click', () => {
          //calling renderColumnChart function 
          renderColumnChart(column,dataRows,headers);
        });
      }
      const sortButton = header.querySelector('.sort-button');
       // Attach click event to the sort button
      sortButton.addEventListener('click', () => {
        const column = header.querySelector('.sort-button').getAttribute('data-column');
  
        // Toggle sorting direction between ascending (1) and descending (-1)
        const direction = header.classList.contains('ascending') ? -1 : 1;
       
         // Update the arrow direction based on the sorting order
         sortButton.innerHTML = direction === 1 ? '&#8593;' : '&#8595;';
  
        // Sort data rows based on the selected column and direction
        dataRows.sort((rowA, rowB) => {
          const cellA = rowA.querySelector(`td[data-column="${column}"]`);
          const cellB = rowB.querySelector(`td[data-column="${column}"]`);
          
  
          if (!cellA || !cellB) {
            return 0; // Treat them as equal
          }
  
          const valueA = cellA.textContent;
          const valueB = cellB.textContent;
        
  
  
          if (valueA < valueB) return -1 * direction;
          if (valueA > valueB) return 1 * direction;
          return 0;
        });
  
        // Remove existing rows from the table
        dataRows.forEach(row => table.tBodies[0].removeChild(row));
  
        // Append sorted rows back to the table
        dataRows.forEach(row => table.tBodies[0].appendChild(row));
  
        // Toggle sorting direction class
        headers.forEach(header => header.classList.remove('ascending', 'descending'));
        header.classList.toggle(direction === 1 ? 'ascending' : 'descending');
      });
    });
  
    // Get references to the input field and table body
    const searchInput = document.getElementById('searchInput');
    const tableBody = document.querySelector('tbody');
  
    // Listen for changes in the input field
    searchInput.addEventListener('input', function () {
      const searchTerm = this.value.toLowerCase(); // Get the search term and convert to lowercase
  
      // Loop through each row in the table
      dataRows.forEach(row => {
        const rowData = Array.from(row.children).map(cell => cell.textContent.toLowerCase()); // Get the text content of each cell in lowercase
  
        // Check if any of the cell content contains the search term
        if (rowData.some(cellContent => cellContent.includes(searchTerm))) {
          row.style.display = ''; // Show the row if it contains the search term
        } else {
          row.style.display = 'none'; // Hide the row if it doesn't contain the search term
        }
      });
    });
  }
  
  // Attach event listeners when the document is ready
  document.addEventListener('DOMContentLoaded', () => {
    attachEventListeners();
  });
