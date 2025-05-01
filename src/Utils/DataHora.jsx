function dataHora() {
  const agora = new Date();

  const hora = String(agora.getHours()).padStart(2, "0");
  const minutos = String(agora.getMinutes()).padStart(2, "0");

  const dia = String(agora.getDate()).padStart(2, "0");
  const mes = String(agora.getMonth() + 1).padStart(2, "0");
  const ano = agora.getFullYear();

  return `${dia}/${mes}/${ano} - ${hora}:${minutos}`;
}

export default dataHora;
