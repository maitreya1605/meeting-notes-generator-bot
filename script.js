const API_KEY = "AIzaSyASI-lW5b4O4fILI5A5K0WjqXfUfGS5WQg"; // Your Gemini API Key

function sendMessage() {
  const userInput = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");
  const userMessage = userInput.value.trim();

  if (userMessage === "") return;

  // Display user's message
  chatBox.innerHTML += `<p class="message user"><strong>You:</strong> ${userMessage}</p>`;
  chatBox.scrollTop = chatBox.scrollHeight;

  // Clear input
  userInput.value = "";

  // Call Gemini API
  fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro-002:generateContent?key=${API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: "Please give a detailed answer to: " + userMessage }] }]
    })
  })
  .then(response => response.json())
  .then(data => {
    let botReply = "Sorry, I couldn't generate a response.";
    if (data && data.candidates && data.candidates.length > 0) {
      botReply = data.candidates[0].content.parts[0].text;
    }

    // Display bot's response
    chatBox.innerHTML += `<p class="message bot"><strong>Bot:</strong> ${botReply}</p>`;
    chatBox.scrollTop = chatBox.scrollHeight;
  })
  .catch(error => {
    console.error("Error:", error);
    chatBox.innerHTML += `<p class="message bot"><strong>Bot:</strong> An error occurred while fetching the response.</p>`;
    chatBox.scrollTop = chatBox.scrollHeight;
  });
}

// Dark/Light mode toggle
document.getElementById("mode-toggle").addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  
  const isLight = document.body.classList.contains("light-mode");
  document.getElementById("mode-toggle").innerText = isLight
    ? "Switch to Dark Mode"
    : "Switch to Light Mode";
});
