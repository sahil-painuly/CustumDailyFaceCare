const defaultTasksList = [
    "Isotretinoin",
    "VIP-E",
    "Vinc-Lite",
    "Lotion",
    "Retinol"
  ];
  
  const todayDate = new Date();
  const formattedDate = todayDate.toLocaleDateString("en-GB", {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
  document.getElementById("today-date").innerText = `Tasks for ${formattedDate}`;
  
  const todayKey = todayDate.toISOString().split('T')[0];
  
  // Load today's data or set default
  let stored = JSON.parse(localStorage.getItem(todayKey));
  let data = stored && stored.tasks ? stored : {
    tasks: defaultTasksList.map(t => ({ text: t, done: false })),
    sunscreenCount: 0
  };
  
  const taskList = document.getElementById("taskList");
  const sunscreenCountEl = document.getElementById("sunscreenCount");
  
  function renderTasks() {
    taskList.innerHTML = "";
    data.tasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <label>
          <input type="checkbox" ${task.done ? "checked" : ""} onchange="toggleDone(${index})">
          ${task.text}
        </label>
      `;
      taskList.appendChild(li);
    });
  
    sunscreenCountEl.textContent = data.sunscreenCount || 0;
  }
  
  function toggleDone(index) {
    data.tasks[index].done = !data.tasks[index].done;
    renderTasks();
  }
  
  function addTask() {
    const input = document.getElementById("taskInput");
    const text = input.value.trim();
    if (text) {
      data.tasks.push({ text, done: false });
      input.value = "";
      renderTasks();
    }
  }
  
  function changeSunscreen(change) {
    data.sunscreenCount = Math.max(0, (data.sunscreenCount || 0) + change);
    sunscreenCountEl.textContent = data.sunscreenCount;
  }
  
  function saveTasks() {
    localStorage.setItem(todayKey, JSON.stringify(data));
    alert("Saved successfully!");
  }

    function promptNewTask() {
    const taskName = prompt("Enter new task:");
    if (taskName) {
      data.tasks.push({ text: taskName.trim(), done: false });
      renderTasks();
    }
  }
  
  
  // New Feature: View Previous Logs
  function viewLogForDate() {
    const dateInput = document.getElementById("logDateInput").value;
    const logDisplay = document.getElementById("logDetails");
  
    if (!dateInput) {
      logDisplay.innerHTML = "<i>Please select a date.</i>";
      return;
    }
  
    const logData = JSON.parse(localStorage.getItem(dateInput));
    if (!logData) {
      logDisplay.innerHTML = `<b>${dateInput}</b>: No data found.`;
      return;
    }
  
    const taskStatus = logData.tasks.map(t => `${t.text} - ${t.done ? "✅" : "❌"}`).join("<br>");
    const sunscreenText = `Sunscreen applied: ${logData.sunscreenCount || 0} times`;
  
    logDisplay.innerHTML = `<b>${dateInput}</b><br>${taskStatus}<br>${sunscreenText}`;
  }
  
  renderTasks();
