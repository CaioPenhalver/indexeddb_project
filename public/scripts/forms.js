var lista = document.getElementById("curso");

function limparLista() {
	while (lista.firstChild) {
		lista.removeChild(lista.firstChild);
	}
}

function exibirCursos() {
	limparLista();
	for (var i = 0; i < cursos.length; i++) {
		var option = document.createElement("option");
		option.textContent = cursos[i].titulo;
		option.setAttribute("value", cursos[i].id);
		lista.appendChild(option);
	}
}
exibirCursos();


localStorage.setItem("chave", valor);
var item = localStorage.getItem("chave");


sessionStorage.setItem("chave", valor);
var item = sessionStorage.getItem("chave");






