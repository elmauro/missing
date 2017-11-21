const logic = { };
logic.scope = { };

logic.search = (n, A, m, B) => {
  if (logic.validateBefore(n, A, m, B)) {
    let limit = Math.pow(10, 4);
    let invalid;
    let min = limit;
    let max = 0;
      
    A = A.reduce((p, c) => {
      invalid = (c < 1 || c > limit || isNaN(c) ) ? c : invalid;
      (p[c] = p[c] ? p[c] : []).push(c);
      return p
    }, []);

    B = B.reduce((p, c) => {
      invalid = (c < 1 || c > limit || isNaN(c)) ? c : invalid;
      min = c <= min ? c : min;
      max = c >= max ? c : max;
      (p[c] = p[c] ? p[c] : []).push(c);
      return p
    }, []);

    if (logic.validateAfter(min, max, limit, invalid)) {
      let missings = B.filter((o) => {
        if(!A[o[0]] || A[o[0]].length < B[o[0]].length) {
          return o;
        }
      }).map((e) => {
        return e[0];
      });

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

logic.validateBefore = (n, A, m, B) => {
  if (m < 1 || n < 1) {
    logic.scope.errorMessage = 'M and N should be greater than 1!';
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

logic.validateAfter = (min, max, limit, invalid) => {
  if (invalid !== undefined) {
    invalid = isNaN(invalid) ? '' : invalid;
    logic.scope.errorMessage = `${invalid} ... please add valid numbers to the list!`;
    return false;
  }

  if (min < 1 || min > limit || max < 1 || max > limit) {
    logic.scope.errorMessage = `min or max Number is greater than 10⁴!`;
    return false;
  }
    
  if (max - min >= 101) {
    logic.scope.errorMessage = `max value minus min value is greater or equal to 101!`;
    return false;
  }

  return true;
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = logic;
}
