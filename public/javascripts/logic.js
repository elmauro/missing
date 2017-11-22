const logic = { };
logic.scope = { };

/**
 * This is a description of the function search.
 * @function search
 * @param {integer} n - The size of the A list.
 * @param {array} A - The A list of numbers.
 * @param {integer} m - The size of the A list.
 * @param {array} B - The A list of numbers.
 */
logic.search = (n, A, m, B) => {
  if (logic.validateBefore(n, A, m, B)) {
    const limit = Math.pow(10, 4);
    let invalid;
    let min = limit;
    let max = 0;
    let notInB;

    A = A.reduce((p, c) => {
      invalid = (c < 1 || c > limit || isNaN(c)) ? c : invalid;
      notInB = (B.indexOf(c) === -1) ? c : notInB;
      (p[c] = p[c] ? p[c] : []).push(c);
      return p;
    }, []);

    B = B.reduce((p, c) => {
      invalid = (c < 1 || c > limit || isNaN(c)) ? c : invalid;
      min = c <= min ? c : min;
      max = c >= max ? c : max;
      (p[c] = p[c] ? p[c] : []).push(c);
      return p;
    }, []);

    if (logic.validateAfter(min, max, limit, invalid, notInB)) {
      const missings = B.filter(o =>
        !A[o[0]] || A[o[0]].length < B[o[0]].length
      ).map(e => e[0]);

      logic.scope.show = true;
      logic.scope.missings = missings.join(' ');
      logic.scope.errorMessage = undefined;
    } else {
      logic.scope.show = false;
    }
  } else {
    logic.scope.show = false;
  }
};

/**
 * This is a description of the function validate before.
 * @function validateBefore
 * @param {integer} n - The size of the A list.
 * @param {array} A - The A list of numbers.
 * @param {integer} m - The size of the A list.
 * @param {array} B - The A list of numbers.
 */
logic.validateBefore = (n, A, m, B) => {
  if (m < 1 || n < 1) {
    logic.scope.errorMessage = 'M and N should be greater than 0!';
    return false;
  }

  if (m > (2 * Math.pow(10, 5))) {
    logic.scope.errorMessage = 'M is greater than 2 X 10⁵!';
    return false;
  }

  if (n > m) {
    logic.scope.errorMessage = 'N is greater than M!';
    return false;
  }

  if (n !== A.length) {
    logic.scope.errorMessage = 'N is different to A length!';
    return false;
  }

  if (m !== B.length) {
    logic.scope.errorMessage = 'M is different to B length!';
    return false;
  }

  return true;
};

/**
 * This is a description of the function validate after.
 * @function validateAfter
 * @param {integer} min - The minimun value of the B list.
 * @param {integer} max - The maximum value of the B list.
 * @param {integer} limit - The maximum value of a number in the B list.
 * @param {integer} invalid - An invalid number < 1 or number > limit.
 */
logic.validateAfter = (min, max, limit, invalid, notInB) => {
  if (invalid !== undefined) {
    invalid = isNaN(invalid) ? '' : `invalid number ${invalid}`;
    logic.scope.errorMessage = `${invalid} ... please add valid numbers to the list!`;
    return false;
  }

  if (notInB !== undefined) {
    notInB = isNaN(notInB) ? '' : `the number ${notInB}`;
    logic.scope.errorMessage = `${notInB} ... does not exists in B list!`;
    return false;
  }

  if (min < 1 || min > limit || max < 1 || max > limit) {
    logic.scope.errorMessage = 'min or max Number is greater than 10⁴!';
    return false;
  }

  if (max - min >= 101) {
    logic.scope.errorMessage = 'max value minus min value is greater or equal to 101!';
    return false;
  }

  return true;
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = logic;
}
