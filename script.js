function updateDateTime() {
  const today = new Date();

  const optionsDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const tanggal = today.toLocaleDateString('id-ID', optionsDate);

  const jam = today.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  document.getElementById("todayDate").textContent = `${tanggal}, ${jam}`;
}

updateDateTime();
setInterval(updateDateTime, 1000); // update realtime

// Tambah tugas
function addTask() {
  const taskText = document.getElementById("taskInput").value.trim();
  const deadlineInput = document.getElementById("deadlineInput").value;
  const priority = document.getElementById("prioritySelect").value;

  if (taskText === "" || deadlineInput === "") {
    alert("Silakan isi task dan tanggal deadline!");
    return;
  }

  const deadlineDate = new Date(deadlineInput);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const li = document.createElement("li");

  const topRow = document.createElement("div");
  topRow.style.display = "flex";
  topRow.style.alignItems = "center";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.onchange = function () {
    if (this.checked) {
      li.classList.add("completed");
      document.getElementById("doneList").appendChild(li);
    }
  };

  const span = document.createElement("span");
  span.textContent = taskText;
  span.style.flex = "1";

  const badge = document.createElement("span");
  badge.className = `priority ${priority}`;
  badge.textContent = priority;

  const bottomRow = document.createElement("small");
  bottomRow.textContent = `Deadline: ${deadlineDate.toLocaleDateString('id-ID', {
    year: 'numeric', month: 'short', day: 'numeric'
  })}`;

  topRow.appendChild(checkbox);
  topRow.appendChild(span);
  topRow.appendChild(badge);
  li.appendChild(topRow);
  li.appendChild(bottomRow);

  if (deadlineDate < today) {
    li.classList.add("overdue");
    document.getElementById("overdueList").appendChild(li);
  } else {
    document.getElementById("taskList").appendChild(li);
  }

  // Reset input
  document.getElementById("taskInput").value = "";
  document.getElementById("deadlineInput").value = "";
}

// Hapus semua tugas
function clearTasks() {
  document.getElementById("taskList").innerHTML = "";
  document.getElementById("doneList").innerHTML = "";
  document.getElementById("overdueList").innerHTML = "";
}