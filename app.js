// Theme initialization (runs immediately to prevent flash)
(function () {
  const savedTheme = localStorage.getItem("gota-theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = savedTheme || (prefersDark ? "dark" : "light");
  document.documentElement.setAttribute("data-theme", theme);
})();

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme") || "dark";
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("gota-theme", next);
}

function showToast(msg) {
  const toast = document.getElementById("toast");
  const text = document.getElementById("toast-text");
  text.textContent = msg;
  toast.classList.add("show");
  setTimeout(function () {
    toast.classList.remove("show");
  }, 2400);
}

function copyText(str, msg) {
  navigator.clipboard
    .writeText(str)
    .then(function () {
      showToast(msg || "Copied to clipboard!");
    })
    .catch(function () {
      showToast("Unable to copy");
    });
}

function copyPrompt() {
  const prompt = `You are an expert Go backend engineer. When writing endpoints using the Gota framework (github.com/carlosxfelipe/gota), strictly follow the REPR Design Pattern (Request-Endpoint-Response):
1. Always define a Request struct with tags: param, query, header, form, json, and validate.
2. Handlers have the signature: func(ctx *gota.Context, req Req) (Res, error)
3. Register routes using generic package functions: gota.Get(app, path, handler), gota.Post, gota.Put, etc.
4. Chain metadata fluently: .Summary("...").Description("...").Tags("...").Status(code)
5. Return (ResponseStruct{}, error); Gota automatically serializes JSON.
Refer to https://github.com/carlosxfelipe/gota/blob/main/llms.txt for full details.`;
  copyText(prompt, "AI prompt copied to clipboard!");
}

let activeTab = "req";
function switchTab(tab) {
  activeTab = tab;
  const tabs = ["req", "ep", "res", "doc"];
  tabs.forEach(function (t) {
    const btn = document.getElementById("tab-btn-" + t);
    const pane = document.getElementById("tab-pane-" + t);
    if (t === tab) {
      btn.classList.add("active");
      pane.style.display = "block";
    } else {
      btn.classList.remove("active");
      pane.style.display = "none";
    }
  });
}

function copyCurrentTabCode() {
  const pane = document.getElementById("tab-pane-" + activeTab);
  if (pane) {
    copyText(pane.innerText, "Code snippet copied to clipboard!");
  }
}

function copyQuickstartCode() {
  const el = document.getElementById("quickstart-code");
  if (el) {
    copyText(el.innerText, "Quickstart code copied to clipboard!");
  }
}
