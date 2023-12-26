const mengetik = new Typed(".mengetik", {
  strings: ["JUNIOR WEB DEVELOPER", "JUNIOR NETWORK ADMINISTRATOR"],
  typeSpeed: 100,
  backSpeed: 20,
  loop: true,
});
    document.addEventListener("DOMContentLoaded", function () {
      const colectionContainers = document.querySelectorAll(
        ".colection-container"
      );
      const modal = document.getElementById("myModal");
      const modalImg = document.getElementById("modalImg");

      colectionContainers.forEach(function (container) {
        container.addEventListener("click", function (event) {
          event.stopPropagation(); // Stop the click event from propagating to the container
          const imgSrc = container.querySelector("img").src;
          modal.style.display = "block";
          modalImg.innerHTML = `<img src="${imgSrc}" alt="enlarged image">`;
        });
      });

      modal.addEventListener("click", function () {
        modal.style.display = "none";
      });
    });

    const sendgrid = require("@sendgrid/mail");

    exports.handler = async function (event, context) {
      try {
        const { name, email, message } = JSON.parse(event.body);

        sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

        const msg = {
          to: "pekkamax697@gmail.com",
          from: email,
          subject: "New Contact Form Submission",
          text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        };

        await sendgrid.send(msg);

        return {
          statusCode: 200,
          body: JSON.stringify({ message: "Message sent successfully!" }),
        };
      } catch (error) {
        return {
          statusCode: 500,
          body: JSON.stringify({ message: "Error sending message." }),
        };
      }
    };
