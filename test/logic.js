const expect = require('chai').expect;
const logic = require('../public/javascripts/logic');

logic.scope = {};
let A;
let n;
let B;
let m;

function setValues() {
  A = logic.scope.LA.split(' ').map(i => parseInt(i));
  n = logic.scope.N;
  B = logic.scope.LB.split(' ').map(i => parseInt(i));
  m = logic.scope.M;
};

describe('Bussiness Logic', () => {
  beforeEach((done) => {
    logic.scope.N = 10;
    logic.scope.M = 13;
    logic.scope.LA = '203 204 205 206 207 208 203 204 205 206';
    logic.scope.LB = '203 204 204 205 206 207 205 208 203 206 205 206 204';
    logic.scope.show = false;

    done();
  });

  describe('Validate Missing Numbers', () => {
    it('founds valid mising numbers', () => {
      setValues();
      logic.search(n, A, m, B);
      expect(logic.scope.missings).to.equal('204 205 206');
    });

    it('validates n and m greater than 1', () => {
      logic.scope.N = 0;
      logic.scope.M = 0;
      setValues();
      const valid = logic.validateBefore(n, A, m, B);
      expect(valid).to.equal(false);
      expect(logic.scope.errorMessage).to.equal('M and N should be greater than 1!');
    });

    it('validates M is greater than 2 X 10⁵', () => {
      logic.scope.N = 1000001;
      logic.scope.M = 1000001;
      setValues();
      const valid = logic.validateBefore(n, A, m, B);
      expect(valid).to.equal(false);
      expect(logic.scope.errorMessage).to.equal('M is greater than 2 X 10⁵!');
    });

    it('validates N is greater than M', () => {
      logic.scope.N = 13;
      logic.scope.M = 10;
      setValues();
      const valid = logic.validateBefore(n, A, m, B);
      expect(valid).to.equal(false);
      expect(logic.scope.errorMessage).to.equal('N is greater than M!');
    });

    it('validates N is different to A length', () => {
      logic.scope.N = 11;
      logic.scope.M = 13;
      setValues();
      const valid = logic.validateBefore(n, A, m, B);
      expect(valid).to.equal(false);
      expect(logic.scope.errorMessage).to.equal('N is different to A length!');
    });

    it('validates M is different to B length', () => {
      logic.scope.N = 10;
      logic.scope.M = 14;
      setValues();
      const valid = logic.validateBefore(n, A, m, B);
      expect(valid).to.equal(false);
      expect(logic.scope.errorMessage).to.equal('M is different to B length!');
    });

    it('validates not valid number', () => {
      logic.scope.N = 10;
      logic.scope.M = 13;
      logic.scope.LB = '203 204 204000 205 206 207 205 208 203 206 205 206 204';
      setValues();
      logic.search(n, A, m, B);
      expect(logic.scope.errorMessage).to.equal('204000 ... please add valid numbers to the list!');
    });

    it('validates max value minus min value is greater or equal to 101', () => {
      logic.scope.N = 10;
      logic.scope.M = 13;
      logic.scope.LB = '203 204 204 205 206 207 205 208 203 206 205 206 404';
      setValues();
      logic.search(n, A, m, B);
      expect(logic.scope.errorMessage).to.equal('max value minus min value is greater or equal to 101!');
    });
  });
});
