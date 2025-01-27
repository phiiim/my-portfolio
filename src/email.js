import emailjs from 'emailjs-com';

export const sendEmail = (e) => {
  e.preventDefault();

  emailjs.sendForm('service_8oxe8ie', 'template_8rhcygp', e.target, 'LikxvNcwYQ4AowRnq')
    .then((result) => {
      console.log(result.text);
      alert('Message sent successfully!');
    }, (error) => {
      console.log(error.text);
      alert('Failed to send message, please try again.');
    });

  e.target.reset();
};