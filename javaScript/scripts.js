// studentModal.open = true // funciona para abrir o dialog
// studentModal.open = false// funciona para fechar o dialog
// studentModal.setAttribute('open', true) // funciona para abrir o dialog
// studentModal.setAttribute('open', false) // não funciona para fechar o dialog
// studentModal.removeAttribute('open') funciona para fechar o dialog
// studentModal.showModal() // funciona para abrir o dialog
// studentModal.close() funciona para fechar o dialog

const studentModal = document.querySelector('#student-modal');
const disciplinaModal = document.querySelector('#disciplina-modal');
const studentForm = document.querySelector('#student-form');
const disciplinaForm = document.querySelector('#disciplina-form');
const studentModalTitle = document.querySelector('#student-modal-title')
const disciplinaModalTitle = document.querySelector('#disciplina-modal-title')
const saveStudentButton = document.querySelector('#save-student')
const saveDisciplinaButton = document.querySelector('#save-disciplina');

/**
 * Função responsável abrir o modal de estudante
 */
const openStudentModal = () => studentModal.showModal();

const openDisciplinaModal = () => disciplinaModal.showModal();

const closeDisciplinaModal = () => disciplinaModal.close();


/**
 * Função responsável fechar o modal de estudante
 */
const closeStudentModal = () => studentModal.close();

/**
 * Função responsável por criar linhas na tabela student-table
 * @param {nome} string
 * @param {matricula} string
 * @param {curso} string
 * @param {id} string
 */
const createStudentTableRow = (nome, matricula, curso, id) => {
  const studentTable = document.querySelector('#student-table tbody')
  const tableTr = document.createElement('tr');
  tableTr.innerHTML = ` 
  <td>${nome}</td>
  <td>${matricula}</td>
  <td>${curso}</td>
  <td align="center">
    <button class="button button--danger" onclick=deleteStudentTable(${id})>Apagar</button>
    <button class="button button--success" onclick="editdStudentModal(${id})">Editar</button>
  </td>`;
  studentTable.appendChild(tableTr);
}

/**
 * Função responsável savar os dados de um estudante
 * @param {url} string
 * @param {method} string
 */
const saveStundentData = (url, method) => {
  studentForm.addEventListener('submit', (event)=> {
    event.preventDefault();
    const formData = new FormData(studentForm);
    const payload = new URLSearchParams(formData);
    fetch(url, {
        method: method,
        body: payload
    })
    .catch(error => {
        closeStudentModal();
        alert('ocorreu um erro tente mais tarde')
        console.error(error);
    })
    // const inputs = document.querySelectorAll('input') // pega todos os iputs
    // console.log(inputs[0].value) // acessa o primeiro indice do array de inputs
  });
}

/**
 * Função responsável abrir o modal de aluno e salvar um novo aluno
 * @param {studentId} string
 */
const createStudent = () => {
  openStudentModal();
  studentModalTitle.textContent = 'Novo Aluno';
  saveStudentButton.textContent = 'Criar';
  debugger;
  saveStundentData('http://localhost:3000/alunos',  'POST');
}

/**
 * Função responsável abrir o modal de edição e carregar os dados de um estudante e salvar os dados da edição
 * @param {studentId} string
 */
 const editdStudentModal = async (studentId)  => {
  const url = `http://localhost:3000/alunos/${studentId}`;
  openStudentModal();
  studentModalTitle.textContent='Editar aluno';
  saveStudentButton.textContent = 'Editar';
  const [name, matricula] = document.querySelectorAll('input');
  const selectCurso =  document.querySelector("#curso");
  fetch(url)
  .then(resp => resp.json())
  .then(data => {
    name.value = data.nome
    matricula.value = data.matricula
    selectCurso.value =  data.curso
  })
  saveStundentData(url,  'PUT');
 };

/**
 * Função responsável por apagar dados de um estutande
 * @param {studentId} string
 */
const deleteStudentTable = async (studentId)  =>  
  fetch(`http://localhost:3000/alunos/${studentId}`, {method : 'DELETE'});


/**
 * Função responsável por carregar os dados da student-table
 */
const loadStudentTable = () => {
  fetch('http://localhost:3000/alunos')
  .then(resp => resp.json())
  .then(data => {
    data.forEach(item => {
      createStudentTableRow(item.nome, item.matricula, item.curso, item.id)
    })
  }).catch((error) => {
    alert('ocorreu um erro tente mais tarde')
    console.error(error);
  });
};

loadStudentTable();


const createDisciplina = () => {
  openDisciplinaModal();
  disciplinaModalTitle.textContent = 'Nova Disciplina';
  saveDisciplinaButton.textContent = 'Criar';
  debugger;
  saveDisciplinaData('http://localhost:3000/disciplinas',  'POST');
}

/**
 * Função responsável savar os dados de uma disciplina
 * @param {url} string
 * @param {method} string
 */

const saveDisciplinaData = (url, method) => {
  disciplinaForm.addEventListener('submit', (event)=> {
    event.preventDefault();
    const formData = new FormData(disciplinaForm);
    const payload = new URLSearchParams(formData);
    fetch(url, {
        method: method,
        body: payload
    })
    .catch(error => {
        closeDisciplinaModal();
        alert('ocorreu um erro tente mais tarde')
        console.error(error);
    })
    // const inputs = document.querySelectorAll('input') // pega todos os iputs
    // console.log(inputs[0].value) // acessa o primeiro indice do array de inputs
  });
}

const loadDisciplinaTable = () => {
  fetch('http://localhost:3000/disciplinas')
  .then(resp => resp.json())
  .then(data => {
    data.forEach(item => {
      createDisciplinaUl(item.nome, item.cargaHoraria, item.professor, item.status, item.observacos, item.id)
    })
  }).catch((error) => {
    alert('ocorreu um erro tente mais tarde')
    console.error(error);
  });
};

/**
 * Função responsável por apagar dados de um estutande
 * @param {studentId} string
 */
 const deleteDisciplinaUl = async (id)  =>  
 fetch(`http://localhost:3000/disciplinas/${id}`, {method : 'DELETE'});

 /**
 * Função responsável abrir o modal de edição e carregar os dados de um estudante e salvar os dados da edição
 * @param {studentId} string
 */
  const editdDisciplinaModal = async (id)  => {
    const url = `http://localhost:3000/disciplinas/${id}`;
    openDisciplinaModal();
    disciplinaModalTitle.textContent = 'Editar Disciplina';
    saveDisciplinaButton.textContent = 'Editar';
    const [nome, cargahoraria, professor] = document.querySelectorAll('input');
    const selectDisciplina =  document.querySelector("#status");
    const obs = document.querySelector('#obs');
    fetch(url)
    .then(resp => resp.json())
    .then(data => {
      nome.value = data.nome
      cargahoraria.value = data.cargaHoraria
      professor.value = data.professor
      selectDisciplina.value = data.status
      obs.value = data.observacos
    })
    saveDisciplinaData(url,  'PUT');
   };

const createDisciplinaUl = (nome, cargahoraria, nomeProfessor, statuss, obs, id) => {
  debugger;
  const disciplinasUl = document.querySelector('#subject-list-disciplina')
  const tagDiv = document.createElement('div');
  tagDiv.id = 'teste';
  tagDiv.classList.add('subject-card');
  const tagH3 = document.createElement('h3');
  tagH3.classList.add('subject-card__title');
  tagH3.innerHTML = nome;
  insertAfter(tagH3, tagDiv);
  const tagHr = document.createElement('hr');
  insertAfter(tagHr, tagH3);
  const tagUl = document.createElement('ul');
  tagUl.classList.add('subject-card__list');
  insertAfter(tagUl, tagHr);
  const tagLi1 = document.createElement('li');
  tagLi1.innerText = "Carga horária: "+cargahoraria;
  insertAfter(tagLi1, tagUl);
  const tagLi2 = document.createElement('li');
  tagLi2.innerText = "Professor: "+nomeProfessor;
  insertAfter(tagLi2, tagLi1);
  const tagLi3 = document.createElement('li');
  tagLi3.innerText = "Status: " + statuss;
  insertAfter(tagLi3, tagLi2);
  const tagP = document.createElement('p');
  tagP.innerText = obs;
  insertAfter(tagP, tagLi3);
  const tagdiv2 = document.createElement('div');
  insertAfter(tagdiv2, tagDiv);
  tagdiv2.innerHTML = `<button class="button button--danger" onclick=deleteDisciplinaUl(${id})>Apagar</button>
  <button class="button button--success" onclick="editdDisciplinaModal(${id})">Editar</button>`;
  disciplinasUl.appendChild(tagDiv);
}

function insertAfter(newElement, reference) {
  reference.appendChild(newElement, reference.nextSibling);
}

loadDisciplinaTable();




