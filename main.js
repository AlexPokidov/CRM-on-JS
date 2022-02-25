(async () => {
  //Массив с клиентами в глобальном поле видимости
  let listClients = [];

  //Глобальные переменные для передачи ответа с сервера об ошибке
  let status = null;
  let message = '';
  let field = '';
  let statusValid = '';

  //Глобальная переменная с актуализированным объектом для редактирования
  let client = '';

  //Создаем DOM элементы основного контента
  function createElementDOM() {
    //Создаем основной контейнер для позиционирования элементов
    const container = document.createElement('div');
    container.classList.add('container');

    //Создаем header
    const header = document.createElement('header');
    const logo = document.createElement('img');
    const formHeader = document.createElement('form');
    const inputHeader = document.createElement('input');

    //Назначаем атрибуты для элементов header
    header.classList.add('header');

    logo.classList.add('logo');
    logo.src = 'img/logo.jpg';

    inputHeader.classList.add('search');
    inputHeader.type = 'search';
    inputHeader.placeholder = 'Введите запрос';

    //Вкладываем элементы header
    header.append(logo, formHeader);
    formHeader.append(inputHeader);
    //Создаем заголовок, его значение и стили
    const heading = document.createElement('h2');
    heading.textContent = 'Клиенты';
    heading.classList.add('heading');

    //Создаем таблицу и ее статичные элементы (заголовки)
    const table = document.createElement('table');
    const headTable = document.createElement('thead');
    const bodyTable = document.createElement('tbody');
    const trTable = document.createElement('tr');
    const trTable2 = document.createElement('tr');
    const tbTable = document.createElement('tb');

    //Добавляем строку и столбцы заголовков
    headTable.append(trTable);
    trTable.classList.add('trTable');
    for (let i = 0; i < 7; i++) {
      const thTable = document.createElement('th');
      thTable.classList.add('thTable');
      trTable.append(thTable);
    }

    //Добавляем заголовки и тело таблицу в саму таблицу + классы
    table.classList.add('table');
    headTable.classList.add('headTable');
    bodyTable.classList.add('bodyTable');
    table.append(headTable, bodyTable);

    //Добавляем один элемент в таблицу чтобы она отрисовалась
    bodyTable.append(trTable2);
    trTable2.append(tbTable);

    //Создаем кнопку создания нового клиента, задаем ей класс и значение
    const btnAddClient = document.createElement('button');
    const imgBtnAddClient = document.createElement('div');
    const spanBtn = document.createElement('span');

    btnAddClient.classList.add('btnAddClient', 'btn');
    spanBtn.textContent = 'Добавить клиента';
    btnAddClient.append(imgBtnAddClient, spanBtn);

    //Добавляем все элементы в DOM, помещая основной контент в main
    const mainEl = document.createElement('main');
    mainEl.classList.add('main');
    mainEl.append(heading, table, btnAddClient);
    container.append(header, mainEl);
    document.body.append(container);

    //Добавляем значения заголовкам таблицы
    const listHeadTable = document.querySelectorAll('.thTable');

    listHeadTable[0].textContent = 'ID';
    listHeadTable[1].textContent = 'Фамилия Имя Отчество';
    listHeadTable[2].textContent = 'Дата и время создания';
    listHeadTable[3].textContent = 'Последние изменения';
    listHeadTable[4].textContent = 'Контакты';
    listHeadTable[5].textContent = 'Действия';

    //Добавляем каждому столбцу отдельный класс для стилизации
    listHeadTable[0].classList.add('thID' , 'thActive', 'thTableHover')
    listHeadTable[1].classList.add('thName', 'thTableHover')
    listHeadTable[2].classList.add('thDateAdd', 'thTableHover')
    listHeadTable[3].classList.add('thDateEdit', 'thTableHover')
    listHeadTable[4].classList.add('thContact')
    listHeadTable[5].classList.add('thAction')

    //Добавляем стрелку сортировки
    for (let i = 0; i < 4; i++) {
      const imgSort = document.createElement('img');
      imgSort.src = 'img/sort.svg'
      if (i === 0) {
        imgSort.classList.add('imgSort', 'imgSortActive')
      }
      imgSort.classList.add('imgSort')
      listHeadTable[i].append(imgSort)
    }

  };

  //Создаем шаблон модального окна
  function createModal() {
    //Создаем основные элементы
    const containerModal = document.createElement('div');
    const contentModal = document.createElement('div');
    const containerInput = document.createElement('div');
    const containerContacts = document.createElement('div');
    const heading = document.createElement('h4');
    const closeModal = document.createElement('button');
    const cancel = document.createElement('button');
    const error = document.createElement('div');

    //Создаем элементы формы
    const form = document.createElement('form');
    const inputSurname = document.createElement('input');
    const inputName = document.createElement('input');
    const inputSecondname = document.createElement('input');
    const addContact = document.createElement('button');
    const saveClient = document.createElement('button');
    const listContacts = document.createElement('ul');

    //Назначаем классы основным элементам
    containerModal.classList.add('containerModal');
    contentModal.classList.add('contentModal');
    containerInput.classList.add('containerInput')
    containerContacts.classList.add('containerContacts');
    heading.classList.add('headingModal');
    closeModal.classList.add('closeModal');
    cancel.classList.add('cancel');
    listContacts.classList.add('listContacts');
    error.classList.add('error');

    //Назначаем классы элементам формы
    form.classList.add('form');
    inputSurname.classList.add('inputModal', 'inputSurname');
    inputName.classList.add('inputModal', 'inputName');
    inputSecondname.classList.add('inputModal', 'inputSecondname');
    addContact.classList.add('addContact');
    saveClient.classList.add('saveClient', 'btn');

    //Назначаем типы для input и кнопок
    inputSurname.type = 'text';
    inputName.type = 'text';
    inputSecondname.type = 'text';
    addContact.type = 'button';

    //Задаем значения общим элементам
    const imgClose = document.createElement('img');
    imgClose.src = 'img/close.svg';
    closeModal.append(imgClose);
    addContact.textContent = 'Добавить контакт';
    cancel.textContent = 'Отмена';
    saveClient.textContent = 'Сохранить';

    //Группируем элементы модального окна
    containerModal.append(contentModal);
    contentModal.append(heading, closeModal, form, cancel);
    //Группируем элементы формы
    containerInput.append(inputSurname, inputName, inputSecondname);
    containerContacts.append(listContacts, addContact);
    form.append(containerInput, containerContacts, error, saveClient);

    //Добавляем модальное окно в DOM
    document.body.append(containerModal);

    //Стираем данные формы при ее отправке и закрываем модальное окно
    function closeWindow() {
      containerModal.querySelector('.inputSurname').value = '';
      containerModal.querySelector('.inputName').value = '';
      containerModal.querySelector('.inputSecondname').value = '';
      //обнуляем стили кнопок
      if(document.querySelector('.btnChangeActive')) {
        document.querySelector('.btnChangeActive').classList.remove('btnChangeActive');
      };

      if(document.querySelector('.btnDeleteActive')) {
        document.querySelector('.btnDeleteActive').classList.remove('btnDeleteActive');
      };

      //Изменяем hash часть страницы
      window.location.hash = '';

      //обнуляем ошибки
      error.classList.remove('errorActive');
      error.innerHTML = '';

      containerModal.querySelector('.inputName').classList.remove('errorInput')
      containerModal.querySelector('.inputSurname').classList.remove('errorInput')

      const list = containerModal.querySelector('.listContacts');
      list.querySelectorAll('.itemList').forEach(el => {
        el.querySelector('.inputContact').addEventListener('input', () => {
          el.classList.remove('errorInput')
        })
      })

      if (containerModal.querySelector('.listContactsActive')) {
        containerModal.querySelectorAll('.itemList').forEach(el => {
          el.remove();
        });
        const btn = document.querySelector('.addContactActive');
        btn.classList.remove('addContactActive');
        const listContacts = document.querySelector('.listContactsActive');
        listContacts.classList.remove('listContactsActive');
        };
        containerModal.classList.remove('containerModalActive');
    };

    cancel.addEventListener('click', () => {
      closeWindow();
    })

    closeModal.addEventListener('click', () => {
      closeWindow();
    })

    containerModal.addEventListener('click', el => {
      const target = el.target
      if(target.className === 'containerModal containerModalActive' ) {
        closeWindow();
      }
    });
  }

  //Создаем модальное окно с формой создания клиента
  async function createModalAddClient() {
    //Запускаем функцию шаблона модального окна
    createModal();

    //Задаем модалке и кнопке сохранить уникальный id
    const container = document.querySelector('.containerModal');
    container.id = 'modalAddClient';
    const containerModal = document.querySelector('#modalAddClient');

    const saveClient = document.querySelector('.saveClient');
    saveClient.id = 'saveClient';

    //Задаем значения элементам
    containerModal.querySelector('.headingModal').textContent = 'Новый клиент';
    containerModal.querySelector('.inputSurname').placeholder = 'Фамилия*';
    containerModal.querySelector('.inputName').placeholder = 'Имя*';
    containerModal.querySelector('.inputSecondname').placeholder = 'Отчество';

    //Слушаем событие клик на кнопке и показываем модальное окно "Создания клиента"
    const btnAddClient = document.querySelector('.btnAddClient');
    btnAddClient.addEventListener('click', async () => {
      containerModal.classList.add('containerModalActive');
    })

    //Слушаем клик по кнопке добавить контакт и добавляем контакт
    const btn = containerModal.querySelector('.addContact');
    btn.addEventListener('click', () => {
      //создание нового контакта
      createAddNewContact('#modalAddClient');

      //Скрываем кнопку "Добавить контакт" если уже добавлено 10 контактов
      if (containerModal.querySelectorAll('.itemList').length === 10) {
        btn.classList.add('removeAddContact');
      };
    });

    //Слушаем событие ввода в поле и прекращаем подсветку ошибочных полей
    containerModal.querySelector('.inputName').addEventListener('input', () => {
      containerModal.querySelector('.inputName').classList.remove('errorInput')
    })

    containerModal.querySelector('.inputSurname').addEventListener('input', () => {
      containerModal.querySelector('.inputSurname').classList.remove('errorInput')
    })

    //Отправляем данные на сервер, после чего обнуляем  форму
    saveClient.addEventListener('click', async () => {
      //Обнуляем стили контактов
      const list = containerModal.querySelector('.listContacts');
      list.querySelectorAll('.itemList').forEach(el => {
        el.addEventListener('click', () => {
          el.classList.remove('errorInput');
        })
      })

      //Привязываемся к элементу с сообщением об ошибке
      const error = containerModal.querySelector('.error');
      error.classList.remove('errorActive');
      error.innerHTML = '';

      //Блокируем ввод данных пока ждем ответ с сервера
      containerModal.querySelectorAll('.inputModal').forEach( el => {
        el.disabled = true;
      })

      //Запускаем валидацию
      await validation('#modalAddClient');

      if (statusValid) {
        //открываем ввод
        containerModal.querySelectorAll('.inputModal').forEach( el => {
          el.disabled = false;
        })
        return
      }

      //открываем ввод
      containerModal.querySelectorAll('.inputModal').forEach( el => {
        el.disabled = false;
      })

      //Активируем сообщение об ошибке
      if (status > 205) {
        error.classList.add('errorActive');
        error.innerHTML = `Ошибка: </br>`  + message;

        //Подсвечиваем строку, которая не прошла валидацию сервером
        for(let i of field) {
          if (i === 'name') {
            containerModal.querySelector('.inputName').classList.add('errorInput')
          }
          if (i === 'surname') {
            containerModal.querySelector('.inputSurname').classList.add('errorInput')
          }
          if (i === 'contacts') {
            list.querySelectorAll('.itemList').forEach(el => {
              if (!el.querySelector('.inputContact').value) {
                el.classList.add('errorInput')
              }
            })
          }
        }

        return
      }
      containerModal.querySelector('.inputSurname').value = '';
      containerModal.querySelector('.inputName').value = '';
      containerModal.querySelector('.inputSecondname').value = '';

      if (containerModal.querySelector('.listContactsActive')) {
        containerModal.querySelectorAll('.itemList').forEach(el => {
          el.remove();
        });
        const btn = document.querySelector('.addContactActive');
        btn.classList.remove('addContactActive');
        const listContacts = document.querySelector('.listContactsActive');
        listContacts.classList.remove('listContactsActive');
        };
        containerModal.classList.remove('containerModalActive');
    });
  }

  //Создаем модальное окно с формой изменения клиента
  function createModalChangeClient() {
    //Запускаем шаблон модального окна
    createModal();

    //Задаем модальному окну и кнопке уникальный id
    const container = document.querySelectorAll('.containerModal')[1];
    container.id = 'modalChangeClient';
    const containerModal = document.querySelector('#modalChangeClient');

    const heading = containerModal.querySelector('.headingModal');
    const saveClient = containerModal.querySelector('.saveClient');
    saveClient.id = 'saveClient';

    //Создаем дополнительные элементы
    const idText = document.createElement('p');
    const surnameText = document.createElement('p');
    const nameText = document.createElement('p');
    const secondnameText = document.createElement('p');

    //Назначаем классы этим элементам
    heading.classList.add('headingModalChange');
    idText.classList.add('idText');
    surnameText.classList.add('surnameText');
    nameText.classList.add('nameText');
    secondnameText.classList.add('secondnameText');

    //Задаем значения элементам
    heading.textContent = 'Изменить данные';
    surnameText.textContent = 'Фамилия*';
    nameText.textContent = 'Имя*';
    secondnameText.textContent = 'Отчество';

    //Добавляем элементы в модальное окно
    const content = containerModal.querySelector('.contentModal');
    const input = content.querySelector('.containerInput');
    content.insertBefore(idText, content.querySelector('.closeModal'));
    input.insertBefore(surnameText, input.querySelector('.inputSurname'));
    input.insertBefore(nameText, input.querySelector('.inputName'));
    input.insertBefore(secondnameText, input.querySelector('.inputSecondname'));

    //Находим поля формы
    const inputSurname = input.querySelector('.inputSurname');
    const inputName = input.querySelector('.inputName');
    const inputSecondname = input.querySelector('.inputSecondname');

    //Слушаем клик по кнопке добавить контакт и добавляем контакт
    const btn = containerModal.querySelector('.addContact');
    btn.addEventListener('click', () => {
      //создание нового контакта
      createAddNewContact('#modalChangeClient');
      //Скрываем кнопку "Добавить контакт" если уже добавлено 10 контактов
      if (containerModal.querySelectorAll('.itemList').length === 10) {
        btn.classList.add('removeAddContact');
      };
    })

    //Создаем функцию отслеживания мутаций DOM, потому что запускать модальное окно мы должно по кнопке "изменить"
    //И привязываемся к этой кнопке, чтобы получить именно те данные, которые нам нужны
    //Создаем переменную где будет хранится id клиента
    let idClient = 0;
    const tbody = document.querySelector('.bodyTable');

    const config = {
      childList: true,
    };

    const callback = () => {
      document.querySelectorAll('.itemListClient').forEach((el, index) => {
        const btnChange = el.querySelector('.btnChange');

        //Слушаем событие клика по кнопке и открываем модальное окно
        btnChange.addEventListener('click', async () => {
          containerModal.classList.add('containerModalActive');

          //Меняем стили кнопки
          btnChange.classList.add('btnChangeActive')

          //Получаем id клиента и показываем его
          idClient = el.querySelector('.id').textContent;
          idText.textContent = 'ID: ' + idClient;

          //Изменяем hash часть страницы
          window.location.hash = idClient;

          //Блокируем поля ввода пока данные с сервера не загрузились
          containerModal.querySelectorAll('.inputModal').forEach( el => {
            el.disabled = true;
          })

           //После открытия окна редактирования, чтобы убедиться в актуальности данных, обновляем конкретного клиента
          await getOneClient(idClient);

          //Включаем поля ввода
          containerModal.querySelectorAll('.inputModal').forEach( el => {
            el.disabled = false;
          })

          //Отображаем данные клиента из списка по индексу
          inputSurname.value = client.surname;
          inputName.value = client.name;
          inputSecondname.value = client.lastName;

          //Получаем список контактов
          const listcontact = client.contacts;

          //Если есть контакты, то отрисовываем их
          if (listcontact.length > 0) {
            for (let i = 0; i < listcontact.length; i++) {
              btn.click();
              document.querySelectorAll('.selectContact')[i].value = listcontact[i].type;
              document.querySelectorAll('.inputContact')[i].value = listcontact[i].value;
            }
          }

        });

        //Проверяем hash страницы, и если он совпадает, открываем модальное окно
        const hash = window.location.hash;
        if (String(hash) === ('#' + el.querySelector('.id').textContent)) {
          btnChange.click();
        }

      });
    };

    //Создаем экземпляр наблюдателя
    const observer = new MutationObserver(callback);
    //Активируем наблюдатель
    observer.observe(tbody, config);

    //Отправляем данные на сервер, после чего обнуляем  форму
    saveClient.addEventListener('click', async () => {
      //Обнуляем стили контактов
      const list = containerModal.querySelector('.listContacts');

      //Изменяем hash часть страницы
      window.location.hash = '';

      list.querySelectorAll('.itemList').forEach(el => {
        el.addEventListener('click', () => {
          el.classList.remove('errorInput');
        })
      });

      //Блокируем поля ввода пока данные с сервера не загрузились
      containerModal.querySelectorAll('.inputModal').forEach( el => {
        el.disabled = true;
      })

        //Запускаем валидацию
      await validation('#modalChangeClient', idClient);

      if (statusValid) {
        //Открываем ввод
        containerModal.querySelectorAll('.inputModal').forEach( el => {
          el.disabled = false;
        })
        return
      }

      //Открываем ввод
      containerModal.querySelectorAll('.inputModal').forEach( el => {
        el.disabled = false;
      })

      //Привязываемся к элементу с сообщением об ошибке
      const error = containerModal.querySelector('.error');
      error.classList.remove('errorActive');
      error.innerHTML = '';

      //Активируем сообщение об ошибке
      if (status > 205) {
        error.classList.add('errorActive');
        error.innerHTML = `Ошибка: </br>`  + message;

        //Подсвечиваем строку, которая не прошла валидацию сервером
        for(let i of field) {
          if (i === 'name') {
            containerModal.querySelector('.inputName').classList.add('errorInput')
          }
          if (i === 'surname') {
            containerModal.querySelector('.inputSurname').classList.add('errorInput')
          }
          if (i === 'contacts') {
            list.querySelectorAll('.itemList').forEach(el => {
              if (!el.querySelector('.inputContact').value) {
                el.classList.add('errorInput')
              }
            })
          }
        }

        return
      }

      containerModal.querySelector('.inputSurname').value = '';
      containerModal.querySelector('.inputName').value = '';
      containerModal.querySelector('.inputSecondname').value = '';

      if (containerModal.querySelector('.listContactsActive')) {
        containerModal.querySelectorAll('.itemList').forEach(el => {
          el.remove();
        });
        const btn = document.querySelector('.addContactActive');
        btn.classList.remove('addContactActive');
        const listContacts = document.querySelector('.listContactsActive');
        listContacts.classList.remove('listContactsActive');
        };
        containerModal.classList.remove('containerModalActive');
    });
  }

  //Создаем модальное окно для подтверждения удаление клиента
  async function createModalDeleteClient() {
    //Cоздаем элементы модального окна
    const containerModal = document.createElement('div');
    const contentModal = document.createElement('div');
    const heading = document.createElement('h4');
    const closeModal = document.createElement('button');
    const cancel = document.createElement('button');
    const text = document.createElement('p');
    const btnModalDelete = document.createElement('button');


    //Задаем классы
    containerModal.classList.add('containerModalDelete');
    contentModal.classList.add('contentModal', 'contentModalDelete');
    heading.classList.add('headingModal', 'headingModalDelete');
    closeModal.classList.add('closeModal');
    cancel.classList.add('cancel');
    text.classList.add('textModalDelete');
    btnModalDelete.classList.add('btnModalDelete', 'btn');

    heading.textContent = 'Удалить клиента';
    text.textContent = 'Вы действительно хотите удалить данного клиента?';
    const imgClose = document.createElement('img');
    imgClose.src = 'img/close.svg';
    cancel.textContent = 'Отмена';
    btnModalDelete.textContent = 'Удалить';

    closeModal.append(imgClose);

    //Группируем элементы
    containerModal.append(contentModal);
    contentModal.append(heading, closeModal, text, btnModalDelete, cancel);

    //Добавляем элементы в DOM
    document.body.append(containerModal);

    //Слушаем событие клик на кнопке и показываем/скрываем модальное окно
    document.querySelectorAll('.btnDelete').forEach(el => {
      el.addEventListener('click', () => {
        if(document.querySelector('.btnDeleteActive')) {
          document.querySelector('.btnDeleteActive').classList.remove('btnDeleteActive');
        };
        containerModal.classList.add('containerModalDeleteActive');
      })
    })

    cancel.addEventListener('click', () => {
      if(document.querySelector('.btnDeleteActive')) {
        document.querySelector('.btnDeleteActive').classList.remove('btnDeleteActive');
      };
      containerModal.classList.remove('containerModalDeleteActive');
    })

    closeModal.addEventListener('click', () => {
      if(document.querySelector('.btnDeleteActive')) {
        document.querySelector('.btnDeleteActive').classList.remove('btnDeleteActive');
      };
      containerModal.classList.remove('containerModalDeleteActive');
    })

    containerModal.addEventListener('click', (el) => {
      if(document.querySelector('.btnDeleteActive')) {
        document.querySelector('.btnDeleteActive').classList.remove('btnDeleteActive');
      };
      const target = el.target
      if(target.className === 'containerModalDelete containerModalDeleteActive' ) {
        containerModal.classList.remove('containerModalDeleteActive');
      }
    });
  }

  //Отрисовываем элементы для добавления нового контакта в модальном окне
  function createAddNewContact(id) {
      const containerModal = document.querySelector(id);
      const listContacts = containerModal.querySelector('.listContacts');
      const btn = containerModal.querySelector('.addContact');
      // Появляется таблица и дополнительный отспут у кнопки
      listContacts.classList.add('listContactsActive');
      btn.classList.add('addContactActive');

      const itemList = document.createElement('li');
      const inputContact = document.createElement('input');
      const btnCancel = document.createElement('button');
      const containerSelect = document.createElement('div');

      //Создаем собственный селект
      const selectContact = document.createElement('input');
      const listSelect = document.createElement('ul');
      const imgSelect = document.createElement('img');

      imgSelect.src = 'img/img-select.svg';
      imgSelect.classList.add('imgSelect');

      selectContact.readOnly = true;


      //Устанавливаем начальное состояние селекта
      selectContact.value = 'Телефон';


      //Вкладываем элементы
      containerSelect.append(selectContact, imgSelect, listSelect);
      itemList.append(containerSelect, inputContact, btnCancel);

      //Задаем значения для элементов кастомного селекта
      for (let i = 0; i < 4; i++) {
        const itemSelect = document.createElement('li');
        itemSelect.classList.add('itemSelect');
        listSelect.append(itemSelect);
        if (i === 0) {
          itemSelect.textContent = 'Email';
        }
        if (i === 1) {
          itemSelect.textContent = 'Facebook';
        }
        if (i === 2) {
          itemSelect.textContent = 'Vk';
        }
        if (i === 3) {
          itemSelect.textContent = 'Другое';
        }
      };

      inputContact.placeholder = 'Введите данные контакта';

      //Задаем классы и атрибуты
      itemList.classList.add('itemList');
      containerSelect.classList.add('containerSelect');
      listSelect.classList.add('listSelect');
      selectContact.classList.add('selectContact');
      inputContact.classList.add('inputContact');
      btnCancel.classList.add('btnCancel');

      btnCancel.type = 'button';

      //Добавляем элемент списка в список
      listContacts.append(itemList)

      //Обработчик события для клика на селект


        const selectValue = containerSelect.querySelector('.selectContact');
        containerSelect.querySelectorAll('.itemSelect').forEach(el => {
          el.addEventListener('click', () => {
            let valueSelect = selectValue.value;
            selectValue.value = el.textContent;
            //Делаем замену списка
            el.textContent = valueSelect;
          });
        });

      //Задаем интерактивность селекту
      //Добавляем обработчик события клик на селект, будет появляться список элементов для выбора
      containerSelect.addEventListener('click', () => {
        //Закрываем активные селекты
        if (document.querySelector('.activeList')) {
          document.querySelector('.activeList').classList.remove('activeList');
          document.querySelector('.activeImg').classList.remove('activeImg');
        }

        listSelect.classList.add('activeList');
        imgSelect.classList.add('activeImg');
      });

      //Вешаем обработчик события на любой элемент в дом, чтобы скрывать фокус с селекта
      document.querySelectorAll('.contentModal').forEach(el => {
        el.addEventListener('click', el => {
          const target = el.target;
          if (target.className  === 'selectContact' || target.className  === 'imgSelect activeImg') {
            return
          };
          listSelect.classList.remove('activeList');
          imgSelect.classList.remove('activeImg');
        });
      })

      //Удаляем элемент контакта при клике на кнопку удалить
      document.querySelectorAll('.itemList').forEach(el => {
        el.querySelector('.btnCancel').addEventListener('click', () => {
          el.remove();
          if (document.querySelectorAll('.itemList').length === 0) {
            listContacts.classList.remove('listContactsActive');
            btn.classList.remove('addContactActive');
          }
          if (document.querySelectorAll('.itemList').length < 10) {
            btn.classList.remove('removeAddContact');
          };
        })
      });
  };

  //Создаем функцию добавления и изменения клиента на сервер
  async function addClient(method, url, form) {
    let client = {
      // ID клиента, заполняется сервером автоматически, после создания нельзя изменить
      id: '',
      // дата и время создания клиента, заполняется сервером автоматически, после создания нельзя изменить
      createdAt: '',
      // дата и время изменения клиента, заполняется сервером автоматически при изменении клиента
      updatedAt: '',
      // * обязательное поле, имя клиента
      name: '',
      // * обязательное поле, фамилия клиента
      surname: '',
      // необязательное поле, отчество клиента
      lastName: '',
      // контакты - необязательное поле, массив контактов
      // каждый объект в массиве (если он передан) должен содержать непустые свойства type и value
      contacts: [],
    };
    //Идентифицируем форму и ссылаемся по элементам этой формы
    const container = document.querySelector(form);

    const surnameClient = container.querySelector('.inputSurname');
    const nameClient = container.querySelector('.inputName');
    const secondnameClient = container.querySelector('.inputSecondname');

    client.surname = surnameClient.value;
    client.name = nameClient.value;
    client.lastName = secondnameClient.value;

    //Проверяем наличие хотя бы одного контакта, и добавляем его в объект клиента
    let arrayContacts = []
    if (container.querySelectorAll('.itemList')) {
      container.querySelectorAll('.itemList').forEach(el => {
        let contact = {
          type: '',
          value: '',
        };

        const typeContact = el.querySelector('.selectContact');
        const valueContact = el.querySelector('.inputContact');

        contact.type = typeContact.value;
        contact.value = valueContact.value;
        arrayContacts.push(contact);
      });
    };

    client.contacts = arrayContacts;

    //Запрещаем перезагрузку страницы после отправки формы
    const formAdd = document.querySelectorAll('.form')[0];
    const formChange = document.querySelectorAll('.form')[1];

    formAdd.addEventListener('submit', async (el) => {
      el.preventDefault();
    }, false)

    formChange.addEventListener('submit', async (el) => {
      el.preventDefault();
    }, false)

    //Отправляем данные на сервер
    let responce = await fetch(url, {

    method: method,

    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },

    body: JSON.stringify(client),
    });
    //Назначаем глобальным перменным статус и тело ответа с сервера, но сначала обнуляем
    status = '';
    message = '';
    field = [];
    status = responce.status;
    let error = null;
    if (Number(status) > 205) {
      error = await responce.json()
      error = error.errors;
      for (let i of error) {
        message = message + i.message + `</br>`;
        field.push(i.field);
      }

      if (Number(status) > 499) {
        message = 'Что-то пошло не так...'
      }

      return {
        status,
        message,
        field
      }
    }

    //обновляем таблицу после добавления клиента
    await getClients();
  }

  //Функция получения данных для конкретного клиента
  async function getOneClient(id) {
    //Отправляем GET запрос на сервер
    let get = await fetch(`http://localhost:3000/api/clients/${id}`);

    //Получаем данные из JSON
    get = await get.json();

    client = get;

    return client;
  }

  //Функция получения данных с сервера
  async function getClients() {
    //Показываем индикатор загрузки, если он был скрыт
    if (document.querySelector('.indicatorOff')) {
      document.querySelector('.indicatorOff').classList.remove('indicatorOff');
    }

    //Отправляем GET запрос на сервер
    let get = await fetch('http://localhost:3000/api/clients')

    //Получаем данные из JSON
    get = await get.json();

    //Записываем данные клиентов в наш список клиентов, перебирая ответ с сервера
    //Обнуляем список клиентов, если там уже есть элементы
    listClients = [];
    for (i of get) {
      listClients.push(i)
    }

    //Скрываем индикатор загрузки, после загрузки данных с сервера
    document.querySelector('.indicator').classList.add('indicatorOff');

    //Отрисовываем элементы списка
    createItemClient();
  };

  //Функция удаления клиента с сервера
  async function deleteClients() {
    let idClient = 0
    const containerModal = document.querySelector('.containerModalDelete');

    //Создаем констукцию для отслеживания мутаций таблицы
    const tbody = document.querySelector('.bodyTable');
    //Параметры, которые хотим отслеживать
    const config = {
      childList: true,
    }
    //Функция, которая будет выполняться, после того как произойдет мутация
    const callback = () => {
      document.querySelectorAll('.itemListClient').forEach(el => {
        const containerModal = document.querySelector('.containerModalDelete');
        const btnDelete = el.querySelector('.btnDelete');

        btnDelete.addEventListener('click', () => {
          //Меняем стиль кнопки
          btnDelete.classList.add('btnDeleteActive');

          containerModal.classList.add('containerModalDeleteActive');
          idClient = el.querySelector('.id').textContent;
        })
      })
    }
    //Функция должна изначально быть выполнена
    callback();

    const observer = new MutationObserver(callback);
    //Отслеживаем мутацию
    observer.observe(tbody, config);


    const btnDelConfirm = document.querySelector('.btnModalDelete')
    btnDelConfirm.addEventListener('click', async () => {

      await fetch(`http://localhost:3000/api/clients/${idClient}`, {

      method: 'DELETE',
      });

      containerModal.classList.remove('containerModalDeleteActive');

      //Обновляем таблицу
      await getClients();
    })

  }


  //Отрисовываем список клиентов в DOM
  function createItemClient() {
    //Обнуляем таблицу перед отрисовкой
    document.querySelectorAll('.itemListClient').forEach(el => {
      el.remove();
    })

    //Проверяем наличие элементов в списке
    if (listClients) {
      //Находим тело таблицы куда и будем добавлять элементы
      const tbody = document.querySelector('.bodyTable');

      //Перебираем всех клиентов и добавляем в таблицу
      for (let client of listClients) {
        const id = client.id;
        const name = client.surname + ' ' + client.name + ' ' + client.lastName;
        const dateCreate = client.createdAt;
        const dateUpdated = client.updatedAt;
        const contacts = client.contacts;

        //Создаем элементы DOM
        const trTable = document.createElement('tr');
        trTable.classList.add('itemListClient');
        //Генерируем шесть столбцов таблицы, в которые сразу будем помещать значение
        for (let i = 0; i < 6; i++) {
          const tbTable = document.createElement('tb');

          //Создаем функцию для модицикации отображения даты
          function modificateDate(x) {
            //Разбиваем строку время создания
            const date = new Date(x);
            const year = date.getFullYear();
            let month = Number(date.getMonth() + 1);
            let day = date.getDate();
            let hour = date.getHours();
            let min = date.getMinutes();

            //Модицируем отображение даты
            if (String(month).length === 1) {
              month = '0' + month;
            }

            if (String(day).length === 1) {
              day = '0' + day;
            }

            if (String(hour).length === 1) {
              hour = '0' + hour;
            }

            if (String(min).length === 1) {
              min = '0' + min;
            }

            //Собираем дату
            tbTable.textContent = day + '.' + month + '.' + year;

            //Создаем элемент для стилизации время (часы и минуты)
            const spanTime = document.createElement('span');
            spanTime.textContent = hour + ':' + min;
            spanTime.classList.add('spanTime');

            tbTable.append(spanTime);
          };

          //Каждому элементу присваиваем значение и класс для стилизации
          if (i === 0) {
            tbTable.textContent = id;
            tbTable.classList.add('id', 'tbTable');
          }

          if (i === 1) {
            tbTable.textContent = name;
            tbTable.classList.add('name', 'tbTable');
          }

          if (i === 2) {
            modificateDate(dateCreate);
            tbTable.classList.add('dateCreate', 'tbTable');
          }

          if (i === 3) {
            modificateDate(dateUpdated);
            tbTable.classList.add('dateUpdated', 'tbTable');
          }

          if (i === 4) {
            //Стилизуем отображение контактов
            const containerContact = document.createElement('div');
            for (item of contacts) {
              //Элемент,который будет отображаться
              const divContact = document.createElement('div');
              divContact.classList.add('divContact');

              //Элемент тултипа
              const toolContact = document.createElement('div');
              toolContact.classList.add('toolContact');

              if (item.type === 'Телефон') {
                divContact.classList.add('contactTel');

                toolContact.textContent = 'Телефон: ' + item.value;
              }

              if (item.type === 'Facebook') {
                divContact.classList.add('contactFace');

                toolContact.textContent = 'Facebook: ' + item.value;
              }

              if (item.type === 'Email') {
                divContact.classList.add('contactMail');

                toolContact.textContent = 'Email: ' + item.value;
              }

              if (item.type === 'Vk') {
                divContact.classList.add('contactVk');

                toolContact.textContent = 'Vk: ' + item.value;
              }

              if (item.type === 'Другое') {
                divContact.classList.add('contactOther');

                toolContact.textContent = item.value;
              }

              //Добавление элемент контакта в ячейку таблицы
              divContact.append(toolContact);
              containerContact.append(divContact);
            }
            tbTable.append(containerContact);
            containerContact.classList.add('containerContact');
            tbTable.classList.add('contacts', 'tbTable');
          }

          if (i === 5) {
            //Добавляем кнопки
            const btnChange = document.createElement('button');
            const btnDelete = document.createElement('button');

            btnChange.classList.add('btnChange');
            btnDelete.classList.add('btnDelete');

            btnChange.textContent = 'Изменить';
            btnDelete.textContent = 'Удалить';

            tbTable.append(btnChange, btnDelete);
            tbTable.classList.add('actions', 'tbTable');
          };

          //Добавляем столбец в строку
          trTable.append(tbTable);
        }

        //Добавляем строку в таблицу
        tbody.append(trTable);
      }
    }
  }

  //Функция фильтрации таблицы клиентов
  function filterClients() {
    //Привязываемся к кнопкам (колонкам) таблицы для фильтрации
    const btnId = document.querySelector('.thID');
    const btnName = document.querySelector('.thName');
    const btnDateAdd = document.querySelector('.thDateAdd');
    const btnDateChange = document.querySelector('.thDateEdit');

    //Функция обнуляет класс активного столбца
    function deleteActive() {
      document.querySelector('.thActive').classList.remove('thActive');

      if (document.querySelector('.imgSortActive')) {
        document.querySelector('.imgSortActive').classList.remove('imgSortActive');
      }
    }

    //Фильтруем таблицу изначально по id
    function filterId() {
      //Проверяем статус активного фильтра и меняем направление сортировки
      if (btnId.querySelector('.imgSort').classList.contains('imgSortActive')) {
        listClients.sort((a, b) => {
          if (Number(a.id) < Number(b.id)) {
            return -1;
          }

          if (Number(a.id) > Number(b.id)) {
            return 1;
          }

          return 0;
        });

      }

      if (!btnId.querySelector('.imgSort').classList.contains('imgSortActive')) {
        listClients.sort((a, b) => {
          if (Number(a.id) > Number(b.id)) {
            return -1;
          }

          if (Number(a.id) < Number(b.id)) {
            return 1;
          }

          return 0;
        });

      };

      //Отрисовываем таблицу заново
      createItemClient();
    }

    filterId();

    //Слушаем клик на кнопке id и фильтруем
    btnId.addEventListener('click', () => {
      //Проверяем активность фильтра и разворачиваем стрелку фильтрации
      if(btnId.querySelector('.imgSort').classList.contains('imgSortActive')) {
        deleteActive();
        filterId();
        btnId.classList.add('thActive');
        return;
      }

      //Добавляем класс для стилизации активного столбца фильтрации, но сперва обнуляем уже имеющиеся
      deleteActive();

      btnId.classList.add('thActive');
      btnId.querySelector('.imgSort').classList.add('imgSortActive');

      filterId();
    });

    //Слушаем событие клика на кнопке ФИО и фильтруем таблицу
    btnName.addEventListener('click', () => {
      listClients.sort((a, b) => {
        //Преобразуем имя в одну строку
        const nameA = a.surname + ' ' + a.name + ' ' + a.lastName;
        const nameB = b.surname + ' ' + b.name + ' ' + b.lastName;

        //Проверяем активность фильтра, если фильтр уже был активен, то разворачиваем стрелку и фильтр
        if(!btnName.querySelector('.imgSort').classList.contains('imgSortActive')) {
          if (nameA < nameB) {
            return -1;
          }

          if (nameA > nameB) {
            return 1;
          }

          return 0;
        }

        if(btnName.querySelector('.imgSort').classList.contains('imgSortActive')) {
          if (nameA > nameB) {
            return -1;
          }

          if (nameA < nameB) {
            return 1;
          }

          return 0;
        }

      });

      if(btnName.querySelector('.imgSort').classList.contains('imgSortActive')) {
        deleteActive();

        btnName.classList.add('thActive');

        //Отрисовываем таблицу заново
        createItemClient();

        return;
      }

      //Добавляем класс для стилизации активного столбца фильтрации, но сперва обнуляем уже имеющиеся
      deleteActive();

      btnName.classList.add('thActive');
      btnName.querySelector('.imgSort').classList.add('imgSortActive');

      //Отрисовываем таблицу заново
      createItemClient();
    });

    //Слушаем событие клика на дате создания и фильтруем таблицу
    btnDateAdd.addEventListener('click', () => {
      listClients.sort((a, b) => {
        //Проверяем активность фильтра, если фильтр уже был активен, то разворачиваем стрелку и фильтр
        if(!btnDateAdd.querySelector('.imgSort').classList.contains('imgSortActive')) {
          if (a.createdAt < b.createdAt) {
            return -1;
          }

          if (a.createdAt > b.createdAt) {
            return 1;
          }

          return 0;
        }

        if(btnDateAdd.querySelector('.imgSort').classList.contains('imgSortActive')) {
          if (a.createdAt > b.createdAt) {
            return -1;
          }

          if (a.createdAt < b.createdAt) {
            return 1;
          }

          return 0;
        }

      });

      if(btnDateAdd.querySelector('.imgSort').classList.contains('imgSortActive')) {
        deleteActive();

        btnDateAdd.classList.add('thActive');
        //Отрисовываем таблицу заново
        createItemClient();

        return
      }

      //Добавляем класс для стилизации активного столбца фильтрации, но сначал обнуляем уже имеющиеся
      deleteActive();

      btnDateAdd.classList.add('thActive');
      btnDateAdd.querySelector('.imgSort').classList.add('imgSortActive');

      //Отрисовываем таблицу заново
      createItemClient();
    });

    //Фильтруем по дате изменения клиента
    btnDateChange.addEventListener('click', () => {
      listClients.sort((a, b) => {
        //Проверяем активность фильтра, если фильтр уже был активен, то разворачиваем стрелку и фильтр
        if(!btnDateChange.querySelector('.imgSort').classList.contains('imgSortActive')) {
          if (a.updatedAt < b.updatedAt) {
            return -1;
          }

          if (a.updatedAt > b.updatedAt) {
            return 1;
          }

          return 0;
        }

        if(btnDateChange.querySelector('.imgSort').classList.contains('imgSortActive')) {
          if (a.updatedAt > b.updatedAt) {
            return -1;
          }

          if (a.updatedAt < b.updatedAt) {
            return 1;
          }

          return 0;
        }

      });

      if(btnDateChange.querySelector('.imgSort').classList.contains('imgSortActive')) {
        deleteActive();

        btnDateChange.classList.add('thActive');
        //Отрисовываем таблицу заново
        createItemClient();

        return
      }

      //Добавляем класс для стилизации активного столбца фильтрации, но сначал обнуляем уже имеющиеся
      deleteActive();

      btnDateChange.classList.add('thActive');
      btnDateChange.querySelector('.imgSort').classList.add('imgSortActive');

      //Отрисовываем таблицу заново
      createItemClient();
    })
  }

  //Функция поиска с запросом данных с сервера
  function searchClients() {
    //Привязываемся к строке поиска
    const inputSearch = document.querySelector('.search');
    let inputSearchValue = '';
    let time = null;

    function getData() {
      clearInterval(time);

      async function getDataClient() {
          //Читаем введенные данные из поисковой строки
        let inputSearchValue = document.querySelector('.search').value;

        //Делаем запрос на сервер
        let get = await fetch(`http://localhost:3000/api/clients?search=${inputSearchValue}`)

        //Расшифровываем данные
        get = await get.json();

        //Записываем данные клиентов в наш список клиентов, перебирая ответ с сервера
        //Обнуляем список клиентов, если там уже есть элементы
        listClients = [];
        for (i of get) {
          listClients.push(i)
        };

        //Отрисовываем элементы списка
        createItemClient();
      };

      time = setTimeout(getDataClient, 300);
    }

    //Слушаем событие ввода в поиск, ждем 300мс и запрашиваем данные
    inputSearch.addEventListener('input', getData);

  }

  //Создаем индикатор загрузки
  function loadingIndicator() {
    //Привязываемся к элементу тела таблицы, в котором будет индикатор
    const tbody = document.querySelector('.bodyTable');

    //Создаем элемент индикатора
    const indicator = document.createElement('div');

    //Назначаем класс индикатору
    indicator.classList.add('indicator');

    //Вкладываем элемент
    tbody.append(indicator);
  }

  //Функция валидации
  async function validation(IdForm, idClient) {
    //Привязываемся к форме, которую будем валидировать
    const form = document.querySelector(IdForm);

    //Привязываемся к области, в которой будем показывать ошибку (изначально скрыта)
    const error = form.querySelector('.error');
    let errorValue = '';

    //Привязываемся к основным полям
    const inputSurname = form.querySelector('.inputSurname').value;
    const inputName = form.querySelector('.inputName').value;
    const inputSecondName = form.querySelector('.inputSecondname').value;

    //Номера ошибок
    const NumberError = [];

    //Проверяем основные поля на количество символов
    if (inputSurname.length < 3 || inputName.length < 3) {
      const numError = 5
      form.querySelector('.inputSurname').classList.add('errorInput');
      form.querySelector('.inputName').classList.add('errorInput');

      if (NumberError.includes(numError)) {
        return
      }

      NumberError.push(numError);
      errorValue = 'Фамилия и имя должны состоять хотя бы из двух букв </br>';
    }

    //Проверяем строку на вхождение запрещенных симоволов (Разрешены )
    if (String(inputSurname).match(/[^A-Za-zА-Яа-яЁё]/)) {
      const numError = 6
      form.querySelector('.inputSurname').classList.add('errorInput');

      if (NumberError.includes(numError)) {
        return
      }

      NumberError.push(numError);
      errorValue += 'Недопустимые символы в строке фамилия </br>';
    }

    //Проверяем строку на вхождение запрещенных симоволов (Разрешены )
    if (String(inputName).match(/[^A-Za-zА-Яа-яЁё]/)) {
      const numError = 7
      form.querySelector('.inputName').classList.add('errorInput');

      if (NumberError.includes(numError)) {
        return
      }

      NumberError.push(numError);
      errorValue += 'Недопустимые символы в строке имя </br>';
    }

    //Проверяем строку на вхождение запрещенных симоволов (Разрешены )
    if (String(inputSecondName).match(/[^A-Za-zА-Яа-яЁё]/)) {
      const numError = 8
      form.querySelector('.inputSecondName').classList.add('errorInput');

      if (NumberError.includes(numError)) {
        return
      }

      NumberError.push(numError);
      errorValue += 'Недопустимые символы в строке отчество </br>';
    }

    //Если есть хотя бы один контакт, проверяем их
    if (form.querySelector('.itemList')) {
      //Находим все контакты и валидируем каждый
      form.querySelectorAll('.itemList').forEach(el => {
        const typeContact = el.querySelector('.selectContact').value;
        let valueContact = el.querySelector('.inputContact').value;

        if (valueContact.length === 0) {
          const numError = 1

          if (NumberError.includes(numError)) {
            return
          }

          NumberError.push(numError);
          errorValue += 'Все контакты должны быть заполнены </br>'
          return
        }

        //Валидируем Телефон
        if (typeContact === 'Телефон') {
          //Телефон должен быть только из цифр

          valueContact = String(valueContact).split('(').join('0');
          valueContact = String(valueContact).split(')').join('0');
          valueContact = String(valueContact).split('-').join('0');
          valueContact = String(valueContact).split('+').join('0');
          valueContact = String(valueContact).split(' ').join('0');

          valueContact = +valueContact
          if(!valueContact) {
            const numError = 2

            if (NumberError.includes(numError)) {
              return
            }

            NumberError.push(numError);
            errorValue += 'Телефон должен состоять только из цифр </br>';
          }

          if(String(valueContact).length < 17) {
            const numError = 3

            if (NumberError.includes(numError)) {
              return
            }

            NumberError.push(numError);
            errorValue += 'Телефон должен быть указан полностью </br>';
          }
        }

        //Валидируем Email
        if (typeContact === 'Email') {
          //В почте должен быть символ "@"
          if(!String(valueContact).includes('@')) {
            const numError = 4

            if (NumberError.includes(numError)) {
              return
            }

            NumberError.push(numError);
            errorValue += 'Некорректный Email </br>';
          }
        }
      });
    };

    //Если поля не прошли валидацию показываем ошибку
    if (errorValue.length !== 0) {
      error.innerHTML = 'Ошибка: </br>' + errorValue;
      error.classList.add('errorActive');
      statusValid = true;
      return statusValid
    }
    statusValid = false;

    if (IdForm === '#modalAddClient') {
      await addClient('POST', 'http://localhost:3000/api/clients', IdForm);

      return statusValid;
    }

    await addClient('PATCH', `http://localhost:3000/api/clients/${idClient}`, IdForm);

    return statusValid;

  }

  //Создаем маску ввода телефона
  function muskTel() {
    //Слушаем клик на кнопке добавить контакт и активируем маску
    const btnAddContact = document.querySelectorAll('.addContact')[0]; //Из формы добавить контакт
    const btnChangeContact = document.querySelectorAll('.addContact')[1]; //Из формы изменить контакт

    //Функция маски
    function musk(idForm) {
      const form = document.querySelector(idForm);

      form.querySelectorAll('.itemList').forEach(el => {
        const type = el.querySelector('.selectContact').value;
        let value = el.querySelector('.inputContact');

        const muskValue = '+7 (';

        if (type === 'Телефон' && !value.value) {
          value.value = muskValue;
        }

        //Слушаем событие изменения типа контакта и обнуляем маску
        el.querySelectorAll('.itemSelect').forEach(i => {
          i.addEventListener('click', () => {
            if (el.querySelector('.selectContact').value !== 'Телефон') {
              value.value = '';
              el.querySelector('.inputContact').removeEventListener('input', changeValue)
            }

            if (el.querySelector('.selectContact').value === 'Телефон') {
              value.value = muskValue;
              el.querySelector('.inputContact').addEventListener('input', changeValue)
            };
          });
        });

        el.querySelector('.inputContact').addEventListener('input', changeValue)

        //Слушаем событие клик и готовим форму для ввода
        let tel = '+7 ('

        //Счетчик ввода и варианта удаления
        let index = null;

        let i = 0

        function changeValue(event) {

          index = (value.value).length - i;

          if (event.data === null) {
            if (index === 2) {
              value.value = tel;
              return
            }

            if (index === 3 && i === 0) {
              value.value = tel;
              return
            }

            i = 1
            tel = value.value;
            return
          }

          if (index  === 19) {
            value.value = tel;
            return
          }

          if (i === 1 && index === 8) {
            value.value = (value.value).slice(0, -1) + ' ' + event.data;
            return
          }

          //если введено 3 цифры, добавляем скобочку + модицикация если было удаление элемента
          if (index === 7 || (index  === 6 && i ===1)) {
            if (i === 1 && index !== 6) {
              value.value = (value.value).slice(0, -1) + ') ' + event.data;
              return
            }
            value.value = value.value + ') ';
          }

          //если введено 6 цифры, добавляем скобочку + модицикация если было удаление элемента
          if (index === 12 || (index  === 11 && i ===1)) {
            if (i === 1 && index !== 11) {
              value.value = (value.value).slice(0, -1) + '-' + event.data;
              return
            }
            value.value = value.value + '-';
          }

          //если введено 8 цифры, добавляем скобочку + модицикация если было удаление элемента
          if (index  === 15 || (index  === 14 && i ===1)) {
            if (i === 1 && index !== 14) {
              value.value = (value.value).slice(0, -1) + '-' + event.data;
              return
            }
            value.value = value.value + '-';
          }

          //Запоминаем значение, если вдруг убирали фокус с ввода
          tel = value.value;
          i = 0
        };

      });
    };

    //Слушаем событие ввода и подставляем значения в поле


    //Активируем маску для формы добавления контакта
    btnAddContact.addEventListener('click', () => {
      musk('#modalAddClient');
    })

    btnChangeContact.addEventListener('click', () => {
      musk('#modalChangeClient');
    })

  }

  //Запускаем функции
  createElementDOM();

  createModalAddClient();

  createModalDeleteClient();

  loadingIndicator();

  await getClients();

  createModalChangeClient()

  deleteClients();

  filterClients();

  searchClients();

  muskTel();

})();
