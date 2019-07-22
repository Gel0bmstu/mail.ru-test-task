import { storiesOf } from '@storybook/html';
import { PhoneValidationComponent } from '../src/ts/index';

storiesOf('Button', module)
    .add('allInOne', ()  => {
        const p  = {
            mask : '+7(985)0II-**-**',
        };
        const correctP  = {
            mask : '+7(985)077-**-**',
        };

        const template = `
            <style>
                span {
                    text-align: left;
                    color: #999999;
                    text-size: 20px;

                    margin: 5px 0 0 0;
                }

            </style>

            <span>normal</span>
            <phone-validation id="1v"></phone-validation>
            <span>active</span>
            <phone-validation id="2v"></phone-validation>
            <phone-validation id="3v"></phone-validation>
            <phone-validation id="4v"></phone-validation>
            <span>error</span>
            <phone-validation id="5v"></phone-validation>
            <phone-validation id="6v"></phone-validation>
            <span>success</span>
            <phone-validation id="7v"></phone-validation>
            `

        document.body.innerHTML = template;

        const normal = document.getElementById('1v');

        const activeEmpty = document.getElementById('2v');
        const activeFillFirst = document.getElementById('3v');
        const activeFillSecond = document.getElementById('4v');

        const emptyErr = document.getElementById('5v');
        const validateErr = document.getElementById('6v');

        const success = document.getElementById('7v');

        [normal, activeEmpty, activeFillFirst, activeFillSecond, emptyErr, validateErr, success].forEach(v => {
            v.setMask = p;
            v.setCorrectMask = correctP;
        })

        // const a1 = activeEmpty.shadowRoot.getElementById('0');
        // Устанавляваем курсор на инпут элемента activeEmpty:
        // a1.focus();
        // a1.setSelectionRange(10, 10);

        const aF1 = activeFillFirst.shadowRoot.getElementById('0');
        aF1.value = '4';

        const aF2fst = activeFillSecond.shadowRoot.getElementById('0');
        const aF2sec = activeFillSecond.shadowRoot.getElementById('1');
        aF2fst.value = '4';
        aF2sec.focus();

        const eE2 = emptyErr.shadowRoot.getElementById('1');
        eE2.value = '5';
        emptyErr.performValidation();

        const vE1 = validateErr.shadowRoot.getElementById('0');
        const vE2 = validateErr.shadowRoot.getElementById('1');

        vE1.value = '5';
        vE2.value = '8';
        
        validateErr.performValidation();

        success.setCorrectMask = correctP;

        const s1 = success.shadowRoot.getElementById('0');
        const s2 = success.shadowRoot.getElementById('1');

        s1.value = '7';
        s2.value = '7';

        success.performValidation();
    })
