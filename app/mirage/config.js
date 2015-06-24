export default function() {
  this.get('/ideas');
  this.post('/ideas');
  this.delete('/ideas/:id');
}

/*
You can optionally export a config that is only loaded during tests
export function testConfig() {

}
*/
