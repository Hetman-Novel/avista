document.addEventListener('DOMContentLoaded', function () {
   const inputs = document.querySelectorAll('.wrap-field input');

   inputs.forEach(input => {
      const parent = input.closest('.wrap-field');

      const toggleClass = () => {
         if (input.value.trim() !== '' || document.activeElement === input) {
            parent.classList.add('active');
         } else {
            parent.classList.remove('active');
         }
      };

      toggleClass();

      input.addEventListener('focus', toggleClass);
      input.addEventListener('blur', toggleClass);

      input.addEventListener('input', () => {
         toggleClass();

         if (input.classList.contains('phone')) {
            let raw = input.value;
            let result = '';

            let hasPlus = false;
            let hasOpenParen = false;
            let hasCloseParen = false;
            let lastCharType = ''; // 'digit', '(', ')', '-', 'space', 'plus'

            for (let i = 0; i < raw.length; i++) {
               const char = raw[i];

               if (char === '+') {
                  if (!hasPlus && result.length === 0) {
                     result += '+';
                     hasPlus = true;
                     lastCharType = 'plus';
                  }
               } else if (/\d/.test(char)) {
                  result += char;
                  lastCharType = 'digit';
               } else if (char === '(' && !hasOpenParen) {
                  result += '(';
                  hasOpenParen = true;
                  lastCharType = '(';
               } else if (char === ')' && !hasCloseParen) {
                  result += ')';
                  hasCloseParen = true;
                  lastCharType = ')';
               } else if ((char === ' ' || char === '-') &&
                          (lastCharType === 'digit' || lastCharType === ')')) {
                  // разрешаем пробел или дефис только после цифры или )
                  // исключаем дубликаты подряд
                  if (!(lastCharType === ' ' && char === ' ') && !(lastCharType === '-' && char === '-')) {
                     result += char;
                     lastCharType = char;
                  }
               } else {
                  continue; // все остальные символы игнорируем
               }
            }

            input.value = result;
         }
      });
   });
});