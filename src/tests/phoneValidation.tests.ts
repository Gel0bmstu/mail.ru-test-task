// import { PhoneValidationComponent } from '../ts/index';

// // Не взлетело ;^(

// // Проверка правильности заполенения numberSection'a
// describe("Getting number of inputs of current mask: ", () => {
//     it('getInputsKol getter', () => {
//         const v = new PhoneValidationComponent();
//         const p  = {
//             mask : '+7(999)879-II-**',
//         };

//         v.setMask = p;

//         expect(2).toBe(v.getInputsKol);
//     });

//     it('getInputsKol getter', () => {
//         const v = new PhoneValidationComponent();
//         const p  = {
//             mask : '+7(999)879-*I-*I',
//         };

//         v.setMask = p;

//         expect(2).toBe(v.getInputsKol);
//     });

//     it('getInputsKol getter', () => {
//         const v = new PhoneValidationComponent();
//         const p  = {
//             mask : '+7(999)879-II-XX',
//         };

//         v.setMask = p;

//         expect(0).toBe(v.getInputsKol);
//     });
// });

// // Проверка правильности валидации данных, вводимых пользователем
// describe("Check inputs values: ", () => {
//     it('symbol', () => {
//         const v = new PhoneValidationComponent();

//         expect('none').toBe(v.getCurrentState);
//     });
// });

// // Проверка правильности работы компонента
// describe("Check initialize status: ", () => {
//     // Символы
//     it('s', () => {
//         const v = new PhoneValidationComponent();
//         const p  = {
//             mask : '+7(999)879-II-XX',
//         };

//         v.setMask = p;

//         if (v.shadowRoot) {
//             const input = v.shadowRoot.getElementById('0') as HTMLInputElement;
//             input.value = 's';
//         }

//         expect('').toBe(v.getCurrentState);
//     });

//     it('4s', () => {
//         const v = new PhoneValidationComponent();
//         const p  = {
//             mask : '+7(999)879-II-XX',
//         };

//         v.setMask = p;

//         if (v.shadowRoot) {
//             const input = v.shadowRoot.getElementById('0') as HTMLInputElement;
//             input.value = '4s';
//         }

//         expect('4').toBe(v.getCurrentState);
//     });

//     it('s7', () => {
//         const v = new PhoneValidationComponent();
//         const p  = {
//             mask : '+7(999)879-II-XX',
//         };

//         v.setMask = p;

//         if (v.shadowRoot) {
//             const input = v.shadowRoot.getElementById('0') as HTMLInputElement;
//             input.value = 's7';
//         }

//         expect('7').toBe(v.getCurrentState);
//     });

//     // Обновление значения
//     it('16', () => {
//         const v = new PhoneValidationComponent();
//         const p  = {
//             mask : '+7(999)879-II-XX',
//         };

//         v.setMask = p;

//         let input : HTMLInputElement;

//         if (v.shadowRoot) {
//             input = v.shadowRoot.getElementById('0') as HTMLInputElement;
//             input.value = '16';
//             expect('6').toBe(input.value);
//         }
//     });

//     it('72', () => {
//         const v = new PhoneValidationComponent();
//         const p  = {
//             mask : '+7(999)879-II-XX',
//         };

//         v.setMask = p;

//         let input : HTMLInputElement;

//         if (v.shadowRoot) {
//             input = v.shadowRoot.getElementById('0') as HTMLInputElement;
//             input.value = '72';
//             expect('2').toBe(input.value);
//         }
//     });
// });

// // Ошибка незаполненого поля
// describe("Check empty inputs err status: ", () => {
//     it('Все поля должны быть заполены', () => {
//         const v = new PhoneValidationComponent();
//         const p  = {
//             mask : '+7(999)879-II-XX',
//         };

//         v.setMask = p;

//         expect('Все поля должны быть заполены').toBe(v.getCurrentState);
//     });

//     it('Все поля должны быть заполены', () => {
//         const v = new PhoneValidationComponent();
//         const p  = {
//             mask : '+7(999)879-II-XX',
//         };

//         v.setMask = p;

//         if (v.shadowRoot) {
//             const input = v.shadowRoot.getElementById('0') as HTMLInputElement;
//             input.value = '5';
//         }

//         expect('Все поля должны быть заполены').toBe(v.getCurrentState);
//     });

//     it('Все поля должны быть заполены', () => {
//         const v = new PhoneValidationComponent();
//         const p  = {
//             mask : '+7(999)879-II-XX',
//         };

//         v.setMask = p;

//         if (v.shadowRoot) {
//             const input = v.shadowRoot.getElementById('1') as HTMLInputElement;
//             input.value = '5';
//         }

//         expect('Все поля должны быть заполены').toBe(v.getCurrentState);
//     });
// });

// // Ошибка ввода неверных значений
// describe("Check ivalid inputs values: ", () => {
//     it('Неверный номер, попробуйте еще раз', () => {
//         const v = new PhoneValidationComponent();
//         const p  = {
//             mask : '+7(999)879-II-XX',
//         };

//         const correctP = {
//             mask : '+7(999)879-25-XX',
//         };

//         v.setMask = p;
//         v.setCorrectMask = correctP;

//         if (v.shadowRoot) {
//             const input1 = v.shadowRoot.getElementById('0') as HTMLInputElement;
//             const input2 = v.shadowRoot.getElementById('1') as HTMLInputElement;

//             input1.value = '7';
//             input2.value = '8';

//             v.performValidation();
//         }

//         expect('Все поля должны быть заполены').toBe(v.getCurrentState);
//     });

//     it('Неверный номер, попробуйте еще раз', () => {
//         const v = new PhoneValidationComponent();
//         const p  = {
//             mask : '+7(999)879-II-XX',
//         };

//         const correctP = {
//             mask : '+7(999)879-25-XX',
//         };

//         v.setMask = p;
//         v.setCorrectMask = correctP;

//         if (v.shadowRoot) {
//             const input1 = v.shadowRoot.getElementById('0') as HTMLInputElement;
//             const input2 = v.shadowRoot.getElementById('1') as HTMLInputElement;

//             input1.value = '2';
//             input2.value = '8';

//             v.performValidation();
//         }

//         expect('Все поля должны быть заполены').toBe(v.getCurrentState);
//     });

    
//     it('Неверный номер, попробуйте еще раз', () => {
//         const v = new PhoneValidationComponent();
//         const p  = {
//             mask : '+7(999)879-II-XX',
//         };

//         const correctP = {
//             mask : '+7(999)879-25-XX',
//         };

//         v.setMask = p;
//         v.setCorrectMask = correctP;

//         if (v.shadowRoot) {
//             const input1 = v.shadowRoot.getElementById('0') as HTMLInputElement;
//             const input2 = v.shadowRoot.getElementById('1') as HTMLInputElement;

//             input1.value = '7';
//             input2.value = '5';

//             v.performValidation();
//         }

//         expect('Все поля должны быть заполены').toBe(v.getCurrentState);
//     });
// });

// // Верные значения (нет ошибок)
// describe("Check success state (empty err section): ", () => {
//     it('Неверный номер, попробуйте еще раз', () => {
//         const v = new PhoneValidationComponent();
//         const p  = {
//             mask : '+7(999)879-II-XX',
//         };

//         const correctP = {
//             mask : '+7(999)879-25-XX',
//         };

//         v.setMask = p;
//         v.setCorrectMask = correctP;

//         if (v.shadowRoot) {
//             const input1 = v.shadowRoot.getElementById('0') as HTMLInputElement;
//             const input2 = v.shadowRoot.getElementById('1') as HTMLInputElement;

//             input1.value = '2';
//             input2.value = '5';

//             v.performValidation();
//         }

//         expect('').toBe(v.getCurrentState);
//     });
// });
