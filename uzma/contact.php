<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $name = $_POST["name"];
  $email = $_POST["email"];
  $phone = $_POST["phone"];
  $description = $_POST["description"];

  $to = "mads1234@live.com";
  $subject = "New Contact Form Submission";
  $headers = "From: $email\r\n";
  $headers .= "Cc: $email\r\n";
  $body = "Navn: $name\n\nE-mail: $email\n\nTelefon: $phone\n\nBeskrivelse: $description";

  if (mail($to, $subject, $body, $headers)) {
    header("Location: succes.html"); // redirect to the succes.html
    exit;
  } else {
    echo "Message failed to send.";
  }
}
?>