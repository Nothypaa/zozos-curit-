<?php
// Check if the form was submitted via POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Retrieve and sanitize form data
    $nom       = strip_tags(trim($_POST["name"]));
    $email     = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $telephone = trim($_POST["phone"]);
    $service   = trim($_POST["service"]);
    $message   = trim($_POST["message"]);

    // Validate required fields: name and email must not be empty and email must be valid
    if (empty($nom) || empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "Veuillez compléter correctement le formulaire et réessayer.";
        exit;
    }

    // Destination email address
    $destinataire = "mirmohammadimahan@yahoo.com";

    // Email subject
    $sujet = "Nouveau contact de $nom";

    // Build the email content
    $contenu_email  = "Nom : $nom\n";
    $contenu_email .= "Email : $email\n";
    $contenu_email .= "Téléphone : $telephone\n";
    $contenu_email .= "Service : $service\n";
    $contenu_email .= "Message :\n$message\n";

    // Email headers
    $entetes = "From: $nom <$email>";

    // Attempt to send the email
    if (mail($destinataire, $sujet, $contenu_email, $entetes)) {
        http_response_code(200);
        echo "Merci ! Votre message a été envoyé.";
    } else {
        http_response_code(500);
        echo "Oups ! Une erreur est survenue, votre message n'a pas pu être envoyé.";
    }
} else {
    // Reject if not a POST request
    http_response_code(403);
    echo "Il y a eu un problème avec votre soumission, veuillez réessayer.";
}
?>
<?php
// Define recipient, subject, and message
$to = 'your_email@example.com'; // Replace with your email address for testing
$subject = 'Test Email from PHP';
$message = 'This is a test email to verify that the PHP mail function is working.';
$headers = 'From: webmaster@yourdomain.com' . "\r\n" .
           'Reply-To: webmaster@yourdomain.com' . "\r\n" .
           'X-Mailer: PHP/' . phpversion();

// Attempt to send the email
if (mail($to, $subject, $message, $headers)) {
    echo 'Test email sent successfully.';
} else {
    echo 'Test email failed to send.';
}
?>
