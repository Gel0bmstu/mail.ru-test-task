import { expect } from 'chai';
import { PhoneValidationComponent } from '../ts/index';
import { Props } from '../ts/index';

describe('get mask', () => {
    const phoneValid = new PhoneValidationComponent();

    const p : Props = {
        mask : '+7(999)879-25-**',
    };

    phoneValid.setMask = p;

    expect(phoneValid.getMask).equal(p.mask);
});
