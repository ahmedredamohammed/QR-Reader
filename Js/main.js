const card = document.querySelector(".card"),
  form = card.querySelector("form"),
  inputFile = form.querySelector("input"),
  image = card.querySelector("img"),
  textarea = card.querySelector("textarea"),
  closeBtn = document.querySelector(".close"),
  copyBtn = document.querySelector(".copy"),
  qrText = card.querySelector(".qr-text");


form.addEventListener('click', () => inputFile.click());

inputFile.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if(!file) return;
  let formData = new FormData();
  formData.append('file', file);
  fetchData(file, formData);
});
async function fetchData(file, formData) {
  qrText.innerText = "Please wait a second ..."
  try{
    const res = await fetch("http://api.qrserver.com/v1/read-qr-code/", {
      method: "POST",
      body: formData,
    });
    const result = await res.json();
    const data = result[0].symbol[0].data;
    if(data) {
      textarea.innerText = data;
      image.src = URL.createObjectURL(file);
      card.classList.add("active");
    } else {
      qrText.innerText = "Are you kidding me ?! 🤨"
    }
  }catch (err) {
    console.log(err);
  }
}
// Copy
copyBtn.addEventListener('click', () => {
  let text = textarea.textContent;
  navigator.clipboard.writeText(text);
});

// Close
closeBtn.addEventListener("click", () => {
  card.classList.remove("active");
  qrText.innerText = "Let's see what you have 😉!";
})
