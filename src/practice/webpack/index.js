'use strict';

import BusinessMember from './BusinessMember';

let pro = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('ok');
  }, 500)
});

pro.then(response => {
  let user = new BusinessMember('suzu', 'Nagano', 'maxmouse');
  console.log(user.getName());
});