async function converter() {
  const valor = parseFloat(document.getElementById("valor").value);
  const de = document.getElementById("de").value.toLowerCase();
  const para = document.getElementById("para").value.toLowerCase();
  const resultado = document.getElementById("resultado");

  if (isNaN(valor)) {
    resultado.textContent = "Insira um valor válido.";
    return;
  }

  if (de === para) {
    resultado.textContent = `${valor} ${de.toUpperCase()} = ${valor} ${para.toUpperCase()}`;
    return;
  }

  try {
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${de}&vs_currencies=${para}`;
    const res = await fetch(url);
    const data = await res.json();

    if (!data[de] || !data[de][para]) {
      resultado.textContent = "Conversão não suportada.";
      return;
    }

    const taxa = data[de][para];
    const convertido = valor * taxa;
    resultado.textContent = `${valor} ${de.toUpperCase()} = ${convertido.toFixed(6)} ${para.toUpperCase()}`;
  } catch (error) {
    resultado.textContent = "Erro ao converter. Verifique sua conexão.";
    console.error(error);
  }
}

