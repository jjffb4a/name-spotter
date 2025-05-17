import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { htmlSafe } from '@ember/template';
import { action } from '@ember/object';
import type NameSpotterService from 'v07-name-spotter/services/name-spotter';

interface NameItem {
  id: string;
  text: string;
}

export default class NameSpotterUiBox extends Component {
  @service declare nameSpotter: NameSpotterService;
  @tracked query = '';
  @tracked names: NameItem[] = [];

  constructor(owner: unknown, args: unknown) {
    super(owner, args);
    this.loadNamesWithFallback();
  }

  @action
  async loadNamesWithFallback() {
    try {
      await this.nameSpotter.loadNames();
      this.names = this.nameSpotter.names;
      if (this.names.length === 0) throw new Error('No Mirage data');
    } catch (e) {
      console.warn('🔁 Falling back to /names.json:', e);
      try {
        const response = await fetch('/names.json');
        this.names = await response.json();
      } catch (err) {
        console.error('❌ Could not load names from any source:', err);
      }
    }
  }

  get filteredNames() {
    const q = this.query.trim().toLowerCase();
    return this.names.map((item) => {
      let text = item.text;
      if (q && text.toLowerCase().includes(q)) {
        const re = new RegExp(`(${q})`, 'ig');
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
        <li class="p-3 bg-gray-50 rounded border text-sm" {{html-safe item.html}}></li>
      {{/each}}
    </ul>
  </div>
</template>
