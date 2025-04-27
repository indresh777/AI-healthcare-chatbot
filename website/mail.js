const firebaseConfig = {
    apiKey: "AIzaSyCwwmY5IoSNkruo0PLYAXDH0XwHKK9qPC8",
    authDomain: "ai-healthcare-chatbot-e9938.firebaseapp.com",
    databaseURL: "https://ai-healthcare-chatbot-e9938-default-rtdb.firebaseio.com",
    projectId: "ai-healthcare-chatbot-e9938",
    storageBucket: "ai-healthcare-chatbot-e9938.appspot.com",
    messagingSenderId: "1026864421629",
    appId: "1:1026864421629:web:a70910ce5c73bf502bbc94"
  };
  
  firebase.initializeApp(firebaseConfig);
  
  var contactFormDB = firebase.database().ref('contactForm');
  
  document.getElementById('contactForm').addEventListener("submit", submitForm);
  
  function submitForm(e) {
    e.preventDefault();
  
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var appointment = document.getElementById("appointment").value;
    var history = document.getElementById("history").value;
  
    saveMessage(name, email, appointment, history);
  
    document.getElementById("contactForm").reset();
  
    alert("Form submitted successfully!");
  }
  
  function saveMessage(name, email, appointment, history) {
    var newContactForm = contactFormDB.push();
    newContactForm.set({
      name: name,
      email: email,
      appointment: appointment,
      history: history
    });
  }
  