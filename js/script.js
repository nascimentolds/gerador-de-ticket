const userBusca = document.getElementById('user');
const btBusca = document.getElementById('bt-busca');
const userName = document.getElementById('user-name');
const avatar = document.getElementById('avatar');
const erro = document.getElementById('erro');
const form = document.getElementById('form');
const ticketGerado = document.getElementById('ticket-gerado');
const download = document.getElementById('download');

btBusca.addEventListener('click', () => {
  const user = userBusca.value;

  if (user) {
    fetch(`https://api.github.com/users/${user}`)
      .then(response => response.json())
      .then(data => {
        const name = data.name;
        const avatarUrl = data.avatar_url;

        if (name != undefined) {
          userName.innerHTML = name;
          avatar.innerHTML = `
              <img
                    src="${avatarUrl}"
                    alt="${name}'s Avatar"
                    class="img-user"
                  />
            `;
          form.style.display = 'none';
          ticketGerado.style.display = 'block';
          erro.style.display = 'none';
        } else {
          erro.style.display = 'block';
        }
      })
      .catch(error => {
        erro.style.display = 'block';
      });
  }
})

download.addEventListener('click', () => {
  CriaPDF();
})

function CriaPDF() {
  const ticket = document.getElementById('ticket').innerHTML

  const opt = {
    margin: 10,
    filename: 'Ticket.pdf', // Nome do arquivo PDF
    image: { type: 'jpeg', quality: 0.98 }, // Formato da imagem no PDF
    html2canvas: { scale: 2, useCORS: true }, // Configuração do html2canvas
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' } // Configuração do jsPDF
  };

  // Biblioteca html2pdf.js para salvar a div como PDF
  html2pdf().from(ticket).set(opt).save();
}