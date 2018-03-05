

function sequentialAsyncWithEach() {
  const values = ['www.google.com', 'www.github.com', 'www.example.com'];
  const newValues = [];
  let promise = Promise.resolve(null);
  values.forEach((value) => {
    promise = promise.then(() => fetch(value)).then(resp => resp.text())
      .then((resptext) => { console.log(resptext); return 1; })
      .then((val) => {
        if (val === 1) {
          console.log('');
          break;
        }
      });
  });
  return promise.then(() => newValues);
}
