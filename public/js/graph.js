document.addEventListener("DOMContentLoaded", function () {
    // Mock data for the graph
    var data = {
      labels: [
        "Math",
        "Science",
        "History",
        "English",
        "Art",
        "Music",
        "Physical Education",
      ],
      datasets: [
        {
          label: "Number of Students",
          data: [20, 30, 15, 25, 10, 8, 12],
          backgroundColor: "rgba(54, 162, 235, 0.6)", // Blue color
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    };
  
    // Get the canvas element
    var ctx = document.getElementById("myChart").getContext("2d");
  
    // Create the bar chart
    var myChart = new Chart(ctx, {
      type: "bar",
      data: data,
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    const buttons = document.querySelectorAll('.btn[data-class]');

    buttons.forEach(button => {
      button.addEventListener('mouseover', () => {
        const className = button.getAttribute('data-class');
        button.innerText = `Period ${button.getAttribute('data-period')}: ${className}`;
      });
  
      button.addEventListener('mouseout', () => {
        button.innerText = `Period ${button.getAttribute('data-period')}`;
      });
    });
  
});