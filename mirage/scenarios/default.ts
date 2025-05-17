import { Server } from 'miragejs';
import names from '../fixtures/names';

export default function(server: Server) {
  server.db.loadData({ names });
}
