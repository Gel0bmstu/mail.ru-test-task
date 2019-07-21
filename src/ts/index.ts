export interface Props {
    /**
     * Маска инпута. Значения:
     * "I" - одиночный инпут для ввода одной цифры
     * "X" - серый блок с символом "X"
     * "*" - серый блок с символом "●"
     * <цифра> - серый блок с введенной цифрой
     * <не цифра> - символ отображается "как есть"
     */
    mask: string;
}

export class PhoneValidationComponent extends HTMLElement {
    private _mask : string = '';
    private _correctNumber : string = '+7(985)077-**-**';
    private _inputsMaskArr : number[] = [];

    private _numberSection! : HTMLDivElement;
    private _errorSection! : HTMLDivElement;

    private _template : string;
    constructor() {
        super();

        // Задаем шаблон, в который будет помещен валидируемый номер
        this._template = document.createElement('template').innerHTML = `
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

        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = this._template;
            this._numberSection = this.shadowRoot.querySelector('.phone-module__number-section') as HTMLDivElement;
            this._errorSection = this.shadowRoot.querySelector('.phone-module__error-section') as HTMLDivElement;
        }
    }

    private logic() : void {

        if (this._numberSection) {
            let id = 1;
            
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
                        break;
                    }
                    case 'I': {
                        const cell = document.createElement('input');
                        cell.className = 'phone-module__number-section-input';
                        cell.id = String(id);
                        cell.placeholder = '_';
                        this._numberSection.appendChild(cell);
                        this._inputsMaskArr.push(i);
                        id++;
                        break;
                    }
                    case '*': {
                        const cell = document.createElement('div');
                        cell.className = 'phone-module__number-section-cell';
                        cell.innerText = '•';
                        cell.style.fontSize = '25px';
                        this._numberSection.appendChild(cell);
                        break;
                    }
                    case 'X': {
                        const cell = document.createElement('div');
                        cell.className = 'phone-module__number-section-cell';
                        cell.innerText = this._mask[i];
                        this._numberSection.appendChild(cell);
                        break;
                    }
                    default: {
                        const cell = document.createElement('div');
                        cell.className = 'phone-module__number-section-cell';
                        cell.innerText = this._mask[i];
                        this._numberSection.appendChild(cell);
                        break;
                    }
                }
            }

            const inputsArr : HTMLInputElement[] = [];
            const inputsCol : number = id;
            let input : HTMLInputElement;

            if (this.shadowRoot) {
                for (let i = 1; i <= id; i++) {
                    input = this.shadowRoot.getElementById(String(i)) as HTMLInputElement;
                    if (input) {
                        inputsArr.push(input);
                    }
                }
            }

            const rg = new RegExp('^[0-9]+$');

            for (let i = 0; i < inputsCol; i++) {

                if (inputsArr[i]) {
                    inputsArr[i].addEventListener('input', () => {

                        inputsArr[i].className = 'phone-module__number-section-input';
    
                        if (rg.test(inputsArr[i].value)) {
                            if (inputsArr[i].value.length > 1) {
                                inputsArr[i].value = inputsArr[i].value[inputsArr[i].value.length - 1];
                            }

                            if ((Number(inputsArr[i].id)) < inputsCol - 1) {
                                if (this.shadowRoot) {
                                    inputsArr[i + 1].focus();
                                }
                            }

                            if (inputsArr[i].className === 'phone-module__number-section-input-error') {
                                inputsArr[i].className = 'phone-module__number-section-input';
                            }
                        } else {
                            if (inputsArr[i].value.length >= 2) {
                                if (!isNaN(Number(inputsArr[i].value))) {
                                    inputsArr[i].value = inputsArr[i].value[0];
                                } else {
                                    inputsArr[i].value = inputsArr[i].value[1];
                                }
                            } else {
                                inputsArr[i].value = '';
                            }
                        }
                    });
                }

            }

            if (this.shadowRoot) {
                document.addEventListener('keypress', (event) => {

                    if (event.keyCode === 13) {

                        let errCheck : boolean = false;
                        
                        if (this._errorSection) {

                            this._errorSection.textContent = '';
                            
                            for (let i = 0; i < inputsCol; i++) {
                                
                                if (this.shadowRoot) {
                                    if (inputsArr[i]) {
                                        if (inputsArr[i].value === '') {
                                            this._errorSection.textContent = 'Все поля должны быть заполены';
                                            inputsArr[i].className = 'phone-module__number-section-input-error';
                                            return;
                                        } else if (inputsArr[i].value !== this._correctNumber[this._inputsMaskArr[i]]) {
                                            errCheck = true;
                                        }
                                    }
                                }
                            }
                            if (errCheck) {
                                
                                for (let i = 0; i < inputsCol; i++) {
                                    if (this.shadowRoot) {
                                        if (inputsArr[i]) {
                                            inputsArr[i].className = 'phone-module__number-section-input-error';
                                        }
                                    }
                                }
                                this._errorSection.textContent = 'Неверный номер, попробуйте еще раз';
                            } else {
                                
                                for (let i = 0; i < inputsCol; i++) {
                                    if (this.shadowRoot) {
                                        if (inputsArr[i]) {
                                            inputsArr[i].className = 'phone-module__error-section-input-success';
                                        }
                                    }
                                }
                            }
                        }
                    }
                });
            }
        }
    }
    
    set setMask(prop : Props) {
        this._mask = prop.mask;
        this.logic();
    }
    get getMask() {
        return this._mask;
    }
}
customElements.define("phone-validation", PhoneValidationComponent);
const a = document.getElementById('7') as PhoneValidationComponent;
if (a) {
    const p = {
        mask: '+7(985)0II-**-**',
    };
    a.setMask = p;
    // a.render();
}
