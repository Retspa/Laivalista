const portCalls = [
  {
    name: "Oceanic",
    eta: "Cruise Ship",
    berth: "268m",
  },
  {
    name: "Ever Given",
    eta: "Container Ship",
    berth: "400m",
  },
];

const tableBody = document.querySelector("tbody");

fetch("https://meri.digitraffic.fi/api/port-call/v1/port-calls?locode=FIKOK")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    data.portCalls.forEach((portCalls) => {
      const row = document.createElement("tr");

      const nameCell = document.createElement("td");
      nameCell.textContent = portCalls.vesselName;
      row.appendChild(nameCell);

      const etaCell = document.createElement("td");
      const etaDate = new Date(portCalls.portAreaDetails[0].etaTimestamp);
      etaCell.textContent = `${etaDate.toLocaleDateString()} ${etaDate.toLocaleTimeString(
        [],
        { hour: "2-digit", minute: "2-digit", hourCycle: "h23" }
      )}`;
      row.appendChild(etaCell);

      const berthCell = document.createElement("td");
      berthCell.textContent = portCalls.portAreaDetails[0].berthName;
      row.appendChild(berthCell);

      tableBody.appendChild(row);
    });
  })
  .catch((error) => {
    console.error("Error fetching vessel data:", error);
  });
