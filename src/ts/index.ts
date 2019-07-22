import { Props } from './mask';
// import NetworkHandler from './NetworkHandler';

export class PhoneValidationComponent extends HTMLElement {
    
    // Шаблон компонента
    private _template : string;

    // Входное значние
    private _mask : string = '+X(XXX)XXX-XX-XX';

    // --------------------------------------------------
    // Данные поля нужны только для теста
    private _correctNumber : string = '+X(XXX)XXX-XX-XX';
    private _inputsMaskArr : number[] = [];
    private _inputsPrevValues : string[] = [];

    // --------------------------------------------------

    // Div, главный
    private _mainDiv! : HTMLDivElement;
    // Div, в котором помещается номер и инпуты
    private _numberSection! : HTMLDivElement;
    // Div, в котором принтится ошибка
    private _errorSection! : HTMLDivElement;

    // Количество инпутов
    private _inputsKol : number;
    // Массив инпутов
    private _inputsArr : HTMLInputElement[];

    // Способ валидации номера (обраблтка входных/выходных данных)
    private _mode : string;
    private _path : string;
    // private _networkHandler : NetworkHandler;

    private _width : number;

    constructor() {
        super();

        console.log('constructor');
        // Задаем шаблон, в который будет помещен валидируемый номер
        // Для простоты укажем стили внутри шаблона
        this._template = `
            <style>
                .phone-module {
                    display: flex;
                    flex-wrap: wrap;

                    width: 370px;
                    height: 50px;

                    font-family: Arial, Helvetica, sans-serif;
                    color: #333333;
                    font-size: 20px;

                    justify-content: space-around;
                }

                .phone-module__number-section {
                    display: flex;
                    flex-wrap: wrap;

                    width: 100%;
                    height: 35px;

                    justify-content: space-around;
                }

                .phone-module__error-section {
                    width: 100%;

                    text-align: left;
                    font-size: 14px;
                    font-family: Arial, Helvetica, sans-serif;
                    color: #ff1100;
                }

                .phone-module__number-section-symbol {
                    text-align: center;
                    line-height: 32px;

                    width: 10px;
                    height: 32px;

                    border: none;
                }

                .phone-module__number-section-cell {
                    width: 25px;
                    height: 32px;

                    text-align: center;
                    line-height: 32px;

                    background-color: #f0f0f0;

                    margin: 2px;
                    border-radius: 2px;
                }

                .phone-module__number-section-input,
                .phone-module__number-section-input-error,
                .phone-module__error-section-input-success {
                    text-align: left;
                    line-height: 32px;

                    width: 17px;
                    height: 28px;

                    margin: 2px;
                    padding-left: 6px;

                    font-family: Arial, Helvetica, sans-serif;
                    color: #333333;
                    font-size: 20px;

                    background-color: #ffffff;

                    outline: none;

                    border: 1px solid #f0f0f0;
                    border-radius: 2px;

                    transition: 0.1s linear;
                }

                .phone-module__number-section-input:hover {
                    border-color: #c2c2c2;
                }

                .phone-module__number-section-input-error {
                    border-color: #ff1100;
                }

                .phone-module__error-section-input-success {
                    border-color: #00ff6a;
                }

                .phone-module__number-section-input:focus {
                    border: 1px solid #858585;
                    border-radius: 2px;

                    transition: 0.1s linear;
                }
            </style>

            <div class="phone-module">
                <div class="phone-module__number-section"></div>
                <div class="phone-module__error-section"></div>
            </div>
        `;

        this.attachShadow({ mode: "open" });

        this._width = 0;
        this._inputsKol = 0;
        this._inputsArr = [];
        this._mode = 'fetch';
        this._path = 'http://localhost:3000/api/fetch';

        // this._networkHandler = new NetworkHandler();

        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = this._template;
            this._mainDiv = this.shadowRoot.querySelector('.phone-module') as HTMLDivElement;            
            this._numberSection = this.shadowRoot.querySelector('.phone-module__number-section') as HTMLDivElement;
            this._errorSection = this.shadowRoot.querySelector('.phone-module__error-section') as HTMLDivElement;
        }

        // this.logic();
    }

    public performValidation() : void | string {
        this._errorSection.innerHTML = '';

        let errCheck : boolean = false;
                    
        if (this._errorSection) {

            this._errorSection.textContent = '';


    //     let body : string = '';
    //     const that = this;
    //     for (let i = 0; i < this._inputsKol; i++) {
    //         body += this._inputsArr[i].value;
    //     }

    //     const req = JSON.stringify({
    //         'result' : body,
    //     });

    //     if (this._path === '') {
    //         this._errorSection.textContent = 'Извините, произошла ошибка сервера'
    //         console.error('Неверно указан путь до эндпоинта!');
    //     } else {
    //         this._networkHandler.send(
    //             that._path,
    //             'POST',
    //             req,
    //             (res : object) => {
    //                 console.log(res);
    //             }
    //         );
    //     }  
            for (let i = 0; i < this._inputsKol; i++) {
                if (this.shadowRoot) {
                    if (this._inputsArr[i]) {
                        if (this._inputsArr[i].value === '') {
                            this._errorSection.textContent = 'Все поля должны быть заполены';
                            this._inputsArr[i].className = 'phone-module__number-section-input-error';
                            return;
                        } else 
                        if (this._inputsArr[i].value !== this._correctNumber[this._inputsMaskArr[i]]) {
                            errCheck = true;
                        }
                    }
                }
            }
            if (errCheck) {
                for (let i = 0; i < this._inputsKol; i++) {
                    if (this.shadowRoot) {
                        if (this._inputsArr[i]) {
                            this._inputsArr[i].className = 'phone-module__number-section-input-error';
                        }
                    }
                }
                this._errorSection.textContent = 'Неверный номер, попробуйте еще раз';
            } else {
                
                for (let i = 0; i < this._inputsKol; i++) {
                    if (this.shadowRoot) {
                        if (this._inputsArr[i]) {
                            this._inputsArr[i].className = 'phone-module__error-section-input-success';
                        }
                    }
                }
            }
        }
    }
    
    public setCurrentState(error : boolean, message : string) {
        if (error) {
            if (this.shadowRoot && this._errorSection) {
                this._errorSection.innerText = message;

                for (let i = 0; i < this._inputsKol; i++) {
                    this._inputsArr[i].className = 'phone-module__number-section-input-error';
                }
            }
        } else {
            if (this.shadowRoot && this._errorSection) {
                this._errorSection.innerText = '';
                for (let i = 0; i < this._inputsKol; i++) {
                    this._inputsArr[i].className = 'phone-module__error-section-input-success';
                }
            }
        }
    } 

    // Функция заполнения секции номера цифрами номера и инпутами
    private fill() : void {
        this._numberSection.innerHTML = '';
        this._width = 0;

        if (this._numberSection) {

            this._numberSection.innerHTML = ``;
            this._errorSection.innerHTML = ``;

            // Добавляем ячейки с символами / инпуты для валидации
            for (let i = 0; i < this._mask.length; i++) {
                switch (this._mask[i]) {
                    case '+':
                    case '(':
                    case ')':
                    case '-': {
                        const cell = document.createElement('div');
                        cell.className = 'phone-module__number-section-symbol';
                        cell.innerText = this._mask[i];
                        this._numberSection.appendChild(cell);
                        this._width += 10;
                        break;
                    }
                    case 'I': {
                        const cell = document.createElement('input');
                        cell.className = 'phone-module__number-section-input';
                        cell.id = String(this._inputsKol++);
                        cell.placeholder = '_';
                        this._inputsMaskArr.push(i);
                        this._inputsPrevValues.push('');
                        this._numberSection.appendChild(cell);
                        if (this.shadowRoot) {
                            const input : HTMLInputElement = this.shadowRoot.getElementById(String(this._inputsKol - 1)) as HTMLInputElement;
                            this._inputsArr.push(input);
                        }
                        this._width += 29;
                        break;
                    }
                    case '*': {
                        const cell = document.createElement('div');
                        cell.className = 'phone-module__number-section-cell';
                        cell.innerText = '•';
                        cell.style.fontSize = '25px';
                        this._numberSection.appendChild(cell);
                        this._width += 29;
                        break;
                    }
                    case 'X': {
                        const cell = document.createElement('div');
                        cell.className = 'phone-module__number-section-cell';
                        cell.innerText = this._mask[i];
                        this._numberSection.appendChild(cell);
                        this._width += 29;
                        break;
                    }
                    default: {
                        const cell = document.createElement('div');
                        cell.className = 'phone-module__number-section-cell';
                        cell.innerText = this._mask[i];
                        this._numberSection.appendChild(cell);
                        this._width += 29;
                        break;
                    }
                }
            }
        }

        this._mainDiv.style.width = String(this._width + 1) + 'px';
    }

    // Подписываемся на событие изменения значения инпута для валидации вводимых
    // пользователем данных
    private inputListener() : void {
        const rg = new RegExp('^[0-9]+$');

        for (let i = 0; i < this._inputsKol; i++) {

            if (this._inputsArr[i]) {
                this._inputsArr[i].addEventListener('input', () => {

                    this._inputsArr[i].className = 'phone-module__number-section-input';

                    // Проверяем вводимое пользователем значние, является ли оно числом
                    // (не использую isNaN на parseInt, тк поьователь может ввести значение
                    // как в начало импута, так и в конец)

                    this._inputsArr[i].value = this._inputsArr[i].value.replace(/[^+\d]/g, '');

                    if (this._inputsArr[i].value !== '') {
                        if (this._inputsArr[i].value.length > 1) {
                            if (this._inputsArr[i].value.length > 1) {
                                if (this._inputsArr[i].value[1] !== this._inputsPrevValues[i]) {
                                    this._inputsPrevValues[i] = this._inputsArr[i].value[1];
                                    this._inputsArr[i].value = this._inputsArr[i].value[1];
                                } else {
                                    this._inputsPrevValues[i] = this._inputsArr[i].value[0];
                                    this._inputsArr[i].value = this._inputsArr[i].value[0];
                                }
                            }
    
                            if (this._inputsArr[i].className === 'phone-module__number-section-input-error') {
                                this._inputsArr[i].className = 'phone-module__number-section-input';
                            }
                        } else {
                            this._inputsPrevValues[i] = this._inputsArr[i].value;
                        }
                        if ((Number(this._inputsArr[i].id)) < this._inputsKol - 1 && this._inputsArr[i].value !== '') {
                            if (this.shadowRoot) {
                                this._inputsArr[i + 1].focus();
                            }
                        }
                    }
                });
            }
        }
    }

    // Подписываемся на событие нажатия enter для работы с выхожными данными
    private enterListener() : void {
        if (this.shadowRoot) {
            document.addEventListener('keypress', (event) => {
                if (event.keyCode === 13) {
                    this.performValidation();
                }
            });
        }
    }

    // Общая функция работы компонента
    private logic() : void {
        this.fill();
        this.inputListener();
        this.enterListener();
    }
    
    // Сеттер маски
    set setMask(prop : Props) {
        this._mask = prop.mask;
        this.logic();
    }

    // Сеттер корректного номера (для прогона тестов)
    // (корректный номер = маска, у которой вместо I стоят верные значения:
    // expl: mask:        +7(985)0II-**-**
    //       correctMask: +7(985)077-**-**)
    set setCorrectMask(corrProp: Props) {
        this._correctNumber = corrProp.mask;
    }

    get getAllComponentValues() : string {
        let result : string = '';
        
        if (this._numberSection) {
            for (let i = 0; i < this._numberSection.children.length; i++) {
                // if (typeof this._numberSection.children[i]) {
                    
                // }
                console.log(typeof this._numberSection.children[i]);
            }
        }

        return result;
    }
    

    // Возвращаем текущую маску
    get getMask() {
        return this._mask;
    }

    // Возвращаем количество инпутов, которые функция добавила в 
    // _numberSection (проще говоря - количество I в маске).
    get getInputsKol() {
        return this._inputsKol;
    }

    get getCurrentState() : string {
        if (this._errorSection) {
            return this._errorSection.innerText;
        }

        return 'none';
    }

    // Возвращаем занчния из инпетов компонета
    get getInputsValues() {
        
        let inputsVals : string = '';

        if (this.shadowRoot) {
            for (let i = 0; i < this._inputsKol; i++) {
                if (this._inputsArr[i]) {
                    inputsVals += this._inputsArr[i].value;
                }
            }
        }

        return inputsVals;
    }

    // private createdCallback() {
    //     this._template = `
    //     <style>
    //         .phone-module {
    //             display: flex;
    //             flex-wrap: wrap;

    //             width: 370px;
    //             height: 50px;

    //             font-family: Arial, Helvetica, sans-serif;
    //             color: #333333;
    //             font-size: 20px;

    //             justify-content: space-around;
    //         }

    //         .phone-module__number-section {
    //             display: flex;
    //             flex-wrap: wrap;

    //             width: 100%;
    //             height: 35px;

    //             justify-content: space-around;
    //         }

    //         .phone-module__error-section {
    //             width: 100%;

    //             text-align: left;
    //             font-size: 14px;
    //             font-family: Arial, Helvetica, sans-serif;
    //             color: #ff1100;
    //         }

    //         .phone-module__number-section-symbol {
    //             text-align: center;
    //             line-height: 32px;

    //             width: 10px;
    //             height: 32px;

    //             border: none;
    //         }

    //         .phone-module__number-section-cell {
    //             width: 25px;
    //             height: 32px;

    //             text-align: center;
    //             line-height: 32px;

    //             background-color: #f0f0f0;

    //             margin: 2px;
    //             border-radius: 2px;
    //         }

    //         .phone-module__number-section-input,
    //         .phone-module__number-section-input-error,
    //         .phone-module__error-section-input-success {
    //             text-align: left;
    //             line-height: 32px;

    //             width: 17px;
    //             height: 28px;

    //             margin: 2px;
    //             padding-left: 6px;

    //             font-family: Arial, Helvetica, sans-serif;
    //             color: #333333;
    //             font-size: 20px;

    //             background-color: #ffffff;

    //             outline: none;

    //             border: 1px solid #f0f0f0;
    //             border-radius: 2px;

    //             transition: 0.1s linear;
    //         }

    //         .phone-module__number-section-input:hover {
    //             border-color: #c2c2c2;
    //         }

    //         .phone-module__number-section-input-error {
    //             border-color: #ff1100;
    //         }

    //         .phone-module__error-section-input-success {
    //             border-color: #00ff6a;
    //         }

    //         .phone-module__number-section-input:focus {
    //             border: 1px solid #858585;
    //             border-radius: 2px;

    //             transition: 0.1s linear;
    //         }
    //     </style>

    //     <div class="phone-module">
    //         <div class="phone-module__number-section"></div>
    //         <div class="phone-module__error-section"></div>
    //     </div>
    // `;

    //     console.log('cycle');


    //     this.attachShadow({ mode: "open" });

    //     this._inputsKol = 0;
    //     this._inputsArr = [];
    //     this._state = 'none';

    //     if (this.shadowRoot) {
    //         this.shadowRoot.innerHTML = this._template;
    //         this._numberSection = this.shadowRoot.querySelector('.phone-module__number-section') as HTMLDivElement;
    //         this._errorSection = this.shadowRoot.querySelector('.phone-module__error-section') as HTMLDivElement;
    //     }

    //     this.logic();
    // }
}

// -----------------------------------------------------------------
// Данные поля нужны только для теста
customElements.define("phone-validation", PhoneValidationComponent);
const a = document.getElementById('7') as PhoneValidationComponent;
if (a) {
    const p = {
        mask: '+7(985)0II-**-**',
    };
    a.setMask = p;
    a.getAllComponentValues
}
// -----------------------------------------------------------------
