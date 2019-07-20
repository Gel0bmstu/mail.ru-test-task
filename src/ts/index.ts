interface Props {
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

class phoneValidationComponent extends HTMLElement {
    constructor() {
        super();

        // Задаем шаблон, в который будет помещен валидируемый номер
        this.template = document.createElement('template').innerHTML = `
            <div class="phone-module">
                <div class="phone-module__number-section"></div>
                <div class="phone-module__error-section"></div>
            </div>
        `;

        this.attachShadow({ mode: "open" });

        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = this.template;
            
            this._numberSection = this.shadowRoot.querySelector('.phone-module__number-section');
            this._errorSection = this.shadowRoot.querySelector('.phone-module__error-section');
        }
    }

    private _mask : string = '';
    private _correctNumber : string = '+7(985)077-**-**';
    private _inputsMaskArr : number[] = [];

    private _numberSection : any;
    private _errorSection : any;

    private template : string;

    private logic() : void {

        console.log('step 2');
        if (this.shadowRoot) {
            this._numberSection = this.shadowRoot.querySelector('.phone-module__number-section');
            this._errorSection = this.shadowRoot.querySelector('.phone-module__error-section');
        }

        if (this._numberSection) {
            let id = 1;
            console.log('step 3');
            
            // Добавляем ячейки с символами / инпуты для валидации
            for (let i = 0; i < this._mask.length; i++) {
                switch (this._mask[i]) {
                    case '+':
                    case '(':
                    case ')':
                    case '-': {
                        let cell = document.createElement('div');
                        cell.className = 'phone-module__number-section-symbol';
                        cell.innerText = this._mask[i];
                        this._numberSection.appendChild(cell);
                        break;
                    }
                    case 'I': {
                        let cell = document.createElement('input');
                        cell.className = 'phone-module__number-section-input';
                        cell.id = String(id);
                        cell.placeholder = '_';
                        this._numberSection.appendChild(cell);
                        this._inputsMaskArr.push(i);
                        id++;
                        break;
                    }
                    case '*': {
                        let cell = document.createElement('div');
                        cell.className = 'phone-module__number-section-cell';
                        cell.innerText = '•';
                        cell.style.fontSize = '25px';
                        this._numberSection.appendChild(cell);
                        break;
                    }
                    case 'X': {
                        let cell = document.createElement('div');
                        cell.className = 'phone-module__number-section-cell';
                        cell.innerText = this._mask[i];
                        this._numberSection.appendChild(cell);
                        break;
                    }
                    default: {
                        let cell = document.createElement('div');
                        cell.className = 'phone-module__number-section-cell';
                        cell.innerText = this._mask[i];
                        this._numberSection.appendChild(cell);
                        break;
                    }
                }
            }

            let inputsArr : Array<HTMLInputElement> = [];
            let inputsCol : number = id;
            for (let i = 1; i <= id; i++) {
                let input = <HTMLInputElement>document.getElementById(String(i));
                if (input) {
                    inputsArr.push(input);
                }
            }
            
            let rg = new RegExp('^[0-9]+$');
            console.log(this._mask);

            for (let i = 0; i < inputsArr.length; i++) {

                inputsArr[i].addEventListener('input', () => {

                    inputsArr[i].className = 'phone-module__number-section-input';

                    if (rg.test(inputsArr[i].value)) {
                        if (inputsArr[i].value.length > 1) {
                            inputsArr[i].value = inputsArr[i].value[inputsArr[i].value.length - 1];
                        }
                        if ((Number(inputsArr[i].id)) < inputsCol) {
                            let nextInput = document.getElementById(String(Number(inputsArr[i].id) + 1));
                            if (nextInput) {
                                nextInput.focus();
                            }
                        }
                        if (inputsArr[i].className == 'phone-module__number-section-input-error') {
                            inputsArr[i].className = 'phone-module__number-section-input';
                        }
                    } else {
                        console.log(inputsArr[i].value, parseInt(inputsArr[i].value));
                        if (inputsArr[i].value.length >= 2) {
                            if (!isNaN(Number(inputsArr[i].value))) {
                                console.log('da');
                                inputsArr[i].value = inputsArr[i].value[0];
                            }
                            else {
                                console.log(inputsArr[i].value);
                                inputsArr[i].value = inputsArr[i].value[1];
                            }
                        }
                        else {
                            inputsArr[i].value = '';
                        }
                    }
                });
            }

            console.log('step 4');
            document.addEventListener('keypress', (event) => {
                console.log('step 5:', event.keyCode);
                if (event.keyCode == 13) {
                    console.log('da');
                    let errCheck : boolean = false;
                    if (this._errorSection) {
                        this._errorSection.textContent = '';
                        for (let i = 0; i < inputsCol; i++) {
                            let input = <HTMLInputElement>document.getElementById(String(i + 1));
                            if (input) {
                                if (input.value == '') {
                                    this._errorSection.textContent = 'Все поля должны быть заполены';
                                    input.className = 'phone-module__number-section-input-error';
                                    return;
                                }
                                if (input.value != this._correctNumber[this._inputsMaskArr[i]]) {
                                    console.log(input, 'cur: ', input.value, 'ist: ', this._correctNumber[this._inputsMaskArr[i]]);
                                    errCheck = true;
                                }
                            }
                        }
                        if (errCheck) {
                            for (let i = 0; i < inputsCol; i++) {
                                let input = <HTMLInputElement>document.getElementById(String(i + 1));
                                if (input) {
                                    input.className = 'phone-module__number-section-input-error';
                                }
                            }
                            this._errorSection.textContent = 'Неверный номер, попробуйте еще раз';
                        }
                        else {
                            for (let i = 0; i < inputsCol; i++) {
                                let input = <HTMLInputElement>document.getElementById(String(i + 1));
                                if (input) {
                                    input.className = 'phone-module__error-section-input-success';
                                }
                            }
                        }
                    }
                }
            });
        }
        else {
            console.log("root", this.shadowRoot, "elem", this._numberSection);
        }
    }
    set setMask(prop : Props) {
        this._mask = prop.mask;
        console.log("step1");
        this.logic();
    }
    get getMask() {
        return this._mask;
    }
}
customElements.define("phone-validation", phoneValidationComponent);
var a = <phoneValidationComponent>document.getElementById('7');
if (a) {
    let p = {
        mask: '+7(985)0II-**-**'
    };
    a.setMask = p;
    console.log('wtf');
    // a.render();
}
else {
    console.log('err');
}