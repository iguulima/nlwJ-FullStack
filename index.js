// bibliotecas e codigos de terceiros
const formatador = (data) => {
  return {
    dia:{
      numerico: dayjs(data).format('DD'),
      semana: {
        curto: dayjs(data).format('ddd'),
        longo: dayjs(data).format('dddd'),
      }
    },
    

    mes: dayjs(data).format('MMMM'),

    hora: dayjs(data).format('HH:mm')
  }
}

formatador(new Date('2024-04-01'))


// object
const atividade = {
  nome: "Almoço",
  data: new Date("2024-07-09 14:00"),
  finalizada: true
  
}
// lista, array, vetor []
let atividades = [
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

// atividades = []





// arrow function
const criarItemDeAtividade = (atividade) => {
  
  let input = `<input onchange="concluirAtividade(event)" value="${atividade.data}" type="checkbox" `

  



  if(atividade.finalizada) {
    input = input + 'checked'
  }

  input = input + '>'
  

  const formatar = formatador(atividade.data);


  return `
  <section>
    <div>
      ${input}
      <span>${atividade.nome}</span>
      <time>
        ${formatar.dia.semana.longo},
        dia ${formatar.dia.numerico}
        de ${formatar.mes}
        as ${formatar.hora}h
      </time>
    </div>
  </section>
  `
}

const atualizarListaAtividades = () => {
  const section = document.querySelector('section')
  section.innerHTML = ''

  // verificar se a lista esta vazia
  if(atividades.length == 0){
    section.innerHTML = '<p>Nenhuma atividade foi cadastrada.</p>'
    return
  }





  for(let atividade of atividades) {
    section.innerHTML += criarItemDeAtividade(atividade)
  }
}


atualizarListaAtividades()



const salvarAtividade = (event) => {
  event.preventDefault()
  const dadosDoFormulario = new FormData(event.target)

  const nome = dadosDoFormulario.get('atividade')
  const dia = dadosDoFormulario.get('data')
  const hora = dadosDoFormulario.get('hora')
  const data = `${dia} ${hora}`
  
  const novaAtividade = {
    nome,
    data,
    finalizada: false
  }

  const atividadeExiste = atividades.find((atividade) => {
    return atividade.data == novaAtividade.data
  })

  if(atividadeExiste)
  {
    return alert('Dia/Hora nao disponivel')
  }

  atividades = [novaAtividade, ...atividades]
  atualizarListaAtividades()
}

const criarDiasSelecao = () => {
  const dias =[
    "2024-02-23",
    "2024-05-18",
    "2024-02-12",
    "2024-01-30",
    "2024-08-24",
  ]

  let diasSelecao = ''

  for(let dia of dias) {
    const formatar = formatador(dia)
    const diaFormatado = `${formatar.dia.numerico} de ${formatar.mes}`

    diasSelecao += `<option value="${dia}">${diaFormatado}</option>`
    
  }

  
  document.querySelector('select[name="data"').innerHTML = diasSelecao
}

criarDiasSelecao()


const criarHorasSelecao = () => {
  let horasDisponiveis = [];

  for(let i = 6; i <= 22; i++) {
    const hora = String(i).padStart(2,'0')
    horasDisponiveis.push(`<option value="${hora}:00">${hora}:00</option>`);
    horasDisponiveis.push(`<option value="${hora}:30">${hora}:30</option>`);
  }

  document.querySelector('select[name="hora"]').innerHTML = horasDisponiveis.join('');
}

criarHorasSelecao();


const concluirAtividade = (event) => {
  const input = event.target
  const dataDesteInput = input.value

  const atividade = atividades.find((atividade) => {
    return atividade.data == dataDesteInput
  })

  if(!atividade) {
    return
  }


  atividade.finalizada = !atividade.finalizada

}