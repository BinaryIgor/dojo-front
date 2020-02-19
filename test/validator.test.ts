import { expect } from 'chai';
import { isNameValid, isEmailValid, isPasswordValid } from '../src/core/validator';

describe('Validator tests', () => {
  for (const name of ['Igor', 'Ala', 'Tosia']) {
    it(`Validates proper ${name} name`, () => {
      expect(isNameValid(name)).to.equal(true);
    });
  }

  for (const name of ['12', 'Al', 'x21x']) {
    it(`Invalidates improper ${name} name`, () => {
      expect(isNameValid(name)).to.equal(false);
    });
  }

  for (const email of ['igor@gmail.com', 'ol@o2.pl']) {
    it(`Validates proper ${email} email`, () => {
        expect(isEmailValid(email)).to.equal(true);
    });
  }

  for (const email of ['i@gmail.com', '@o2.pl', 'bleble', 'ala.com']) {
    it(`Invalidates improper ${email} email`, () => {
        expect(isEmailValid(email)).to.equal(false);
    });
  }

  for (const password of ['Hard12one', 'Enough1!', 'Not88baD', 'rogi123R']) {
    it(`Validates proper ${password} password`, () => {
      expect(isPasswordValid(password)).to.equal(true);
    });
  }

  for (const password of ['tooeasyone', 'AlmostEnough', 'bad', 'WRONGG122', '122xxlopp']) {
    it(`Invalidates improper ${password} password`, () => {
      expect(isPasswordValid(password)).to.equal(false);
    });
  }
})