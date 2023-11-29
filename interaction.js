const connections = [{
    source: "item1",
    target: ["item3", "item5", "item1_1", "item1_2"]
  },
  {
    source: "item2",
    target: ["item1", "item5", "item2_1", "item2_2"]
  },
  {
    source: "item3",
    target: ["item4", "item5"]
  },
  {
    source: "item4",
    target: ["item2", "item3"]
  },
  {
    source: "item5",
    target: ["item1", "item3"]
  },
  {
    source: "item1_1",
    target: ["item1"]
  },
  {
    source: "item1_2",
    target: ["item1"]
  },
  {
    source: "item2_1",
    target: ["item2"]
  },
  {
    source: "item2_2",
    target: ["item2"]
  },
];

function drawLines() {
  const svg = d3.select("#lines");

  connections.forEach(connection => {
    const source = document.getElementById(connection.source);
    const targetElements = connection.target.map(target => document.getElementById(target));

    targetElements.forEach(target => {
      const line = svg.append("path")
        .attr("d", () => {
          const x1 = source.offsetLeft + source.clientWidth / 2;
          const y1 = source.offsetTop + source.clientHeight / 2;
          const x2 = target.offsetLeft + target.clientWidth / 2;
          const y2 = target.offsetTop + target.clientHeight / 2;

          // Calculate the control point for the quadratic Bezier curve
          const controlX = (x1 + x2) / 2;
          const controlY = y1 - 50; // Adjust the curve height as needed

          return `M${x1},${y1} Q${controlX},${controlY} ${x2},${y2}`;
        })
        .attr("stroke", "#3498db")
        .attr("stroke-width", 2)
        .attr("fill", "none")
        .attr("class", "line");
    });
  });
}


document.querySelectorAll(".menu li").forEach(menuItem => {
  menuItem.addEventListener("click", function() {
    const itemId = this.getAttribute("data-target");

    // Reset styles
    d3.selectAll(".item, .line").attr("class", "item").attr("stroke", "#3498db");

    // Highlight the selected menu item
    this.classList.add("selected");

    // Highlight connected items and lines
    handleItemHover(itemId);
  });
});



function handleItemHover(itemId) {
  d3.select(`#${itemId}`).attr("class", "item hovered");

  connections.forEach(connection => {
    if (connection.source === itemId) {
      connection.target.forEach(target => {
        d3.select(`#${target}`)
          .attr("class", "item connected selected") // Add the "selected" class
          .each(function() {
            d3.select(this).selectAll(".line") // Select all lines within the connected item
              .attr("stroke", "#e74c3c"); // Update stroke color for selected items
          });
      });
    }
  });
}


// Initial setup
drawLines();