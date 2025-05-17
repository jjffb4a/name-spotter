export default function() {
  this.namespace = '/api';

  this.get('/names', (schema) => {
    return schema.db.names;
  });
}
