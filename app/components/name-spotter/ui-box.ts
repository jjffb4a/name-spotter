import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { NameSpotterService } from 'v07-name-spotter/services/name-spotter';
import { htmlSafe } from '@ember/template';

export default class NameSpotterUiBoxComponent extends Component {
  @service declare nameSpotter: NameSpotterService;

  @tracked query = '';

  get filteredNames() {
    const query = this.query.trim().toLowerCase();
    return this.nameSpotter.names.map((item) => {
      let text = item.text;
      if (query && text.toLowerCase().includes(query)) {
        const re = new RegExp(`(${query})`, 'ig');
        text = text.replace(re, '<mark>$1</mark>');
      }
      return {
        id: item.id,
        html: htmlSafe(text),
      };
    });
  }
}
