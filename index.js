// object
const atividade = {
  nome: "Almoço",
  data: new Date("2024-07-09 14:00"),
  finalizada: true
  
}
// lista, array, vetor []
const atividades = [
  atividade,
  {
    nome: 'Academia em grupo',
    data: new Date("2024-06-20 12:00"),
    finalizada: false
  },
  {
    nome: 'Game Session',
    data: new Date("2024-06-13 20:00"),
    finalizada: true
  }
]


// arrow function
const criarItemDeAtividade = (atividade) => {
  
  let input = '<input type="checkbox" '
  
  if(atividade.finalizada) {
    input = input + 'checked'
  }

  input = input + '>'
  
  return `
  <section>
    <div>
      ${input}
      <span>${atividade.nome}</span>
      <time>${atividade.data}</time>
    </div>
  </section>
  `
}

const section = document.querySelector('section')

for(let atividade of atividades) {
  section.innerHTML += criarItemDeAtividade(atividade)
}

