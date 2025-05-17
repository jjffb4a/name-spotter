import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { htmlSafe } from '@ember/template';
import type NameSpotterService from 'v07-name-spotter/services/name-spotter';

export default class NameSpotterUiBox extends Component {
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
      return { id: item.id, html: htmlSafe(text) };
    });
  }
}

<template>
  <div class="p-4 bg-white rounded shadow-md space-y-4">
    <label class="block text-sm font-medium text-gray-700">🔎 Search for a name:</label>
    <input
      type="text"
      class="w-full border rounded px-3 py-2"
      placeholder="Try Clara, Bob, etc."
      value={{this.query}}
      {{on "input" (pick "target.value" (fn (mut this.query)))}}
    />

    <ul class="space-y-2">
      {{#each this.filteredNames as |item|}}
        <li class="p-3 bg-gray-50 rounded border text-sm leading-relaxed" {{html-safe item.html}}></li>
      {{/each}}
    </ul>
  </div>
</template>
