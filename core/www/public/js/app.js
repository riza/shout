 if(!location.hash.replace('#', '').length) {
 	location.href = location.href.split('#')[0] + '#' + (Math.random() * 100).toString().replace('.', '');
 	location.reload();
 }