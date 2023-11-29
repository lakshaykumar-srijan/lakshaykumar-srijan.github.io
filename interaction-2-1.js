const connections = [{
    source: "item1",
    target: ["item3", "item5"]
  },
  {
    source: "item2",
    target: ["item1", "item5"]
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
      const lineId = `line-${connection.source}-${target.id}`;
      const line = svg.append("path")
        .attr("id", lineId)
        .attr("class", "line") // Add a class to the line
        .attr("d", () => {
          const x1 = source.offsetLeft + source.clientWidth / 2;
          const y1 = source.offsetTop + source.clientHeight / 2;
          const x2 = target.offsetLeft + target.clientWidth / 2;
          const y2 = target.offsetTop + target.clientHeight / 2;

          const controlX = (x1 + x2) / 2;
          const controlY = y1 - 50;

          return `M${x1},${y1} Q${controlX},${controlY} ${x2},${y2}`;
        })
        .attr("stroke", "#B3DBCC")
        .attr("stroke-width", 2)
        .attr("fill", "none")
        .attr("class", "line");
    });
  });
}

function handleItemHover(itemId) {
  // Reset styles
  d3.selectAll(".item, .line").attr("class", "item").attr("stroke", "#B3DBCC");

  // Highlight the selected menu item
  d3.select(`#${itemId}`).attr("class", "item selected");

  // Highlight connected items and lines
  connections.forEach(connection => {
    if (connection.source === itemId) {
      connection.target.forEach(target => {
        d3.select(`#${target}`)
          .attr("class", "item connected selected"); // Add the "selected" class to the connected item

        // Select the lines within the connected item and update the stroke color
        d3.select(`#line-${itemId}-${target}`)
          .attr("stroke", "#ECE81A"); // Update stroke color for selected items
      });
    }
  });
}


// Initial call
drawLines();

document.querySelectorAll(".graph-container .item").forEach(graphItem => {
  graphItem.addEventListener("click", function () {
    const itemId = this.id;
    d3.selectAll(".item, .line").attr("class", "item").attr("stroke", "#3498db");
    document.querySelector(`[data-target="${itemId}"]`).classList.add("selected");
    handleItemHover(itemId);
    updateMenuInteractions(itemId);
  });
});

function updateMenuInteractions(itemId) {
    d3.selectAll(".menu li").attr("class", "");
    d3.select(`[data-target="${itemId}"]`).attr("class", "selected");
    connections.forEach(connection => {
      if (connection.source === itemId) {
        connection.target.forEach(target => {
          d3.select(`[data-target="${target}"]`).attr("class", "connected");
        });
      }
    });
  }
  
  document.querySelectorAll(".menu li").forEach(menuItem => {
    menuItem.addEventListener("click", function () {
      const itemId = this.getAttribute("data-target");
      d3.selectAll(".item, .line").attr("class", "item").attr("stroke", "#3498db");
      this.classList.add("selected");
      handleItemHover(itemId);
      updateMenuInteractions(itemId);
    });
  });
  