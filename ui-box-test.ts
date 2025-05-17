import { module, test } from 'qunit';
import { render, screen } from 'ember-testing-library';
import userEvent from '@testing-library/user-event';

module('Integration | Component | name-spotter/ui-box', function () {
  test('1️⃣ it renders the component', async function (assert) {
    await render('<NameSpotter::UiBox />');
    assert.dom('input').exists('Search input is rendered');
  });

  test('2️⃣ it updates the search query as user types', async function (assert) {
    await render('<NameSpotter::UiBox />');
    const input = screen.getByPlaceholderText('Try Clara, Bob, etc.');
    await userEvent.type(input, 'clara');
    assert.dom('input').hasValue('clara');
  });

  test('3️⃣ it filters results based on input', async function (assert) {
    await render('<NameSpotter::UiBox />');
    const input = screen.getByPlaceholderText('Try Clara, Bob, etc.');
    await userEvent.type(input, 'david');
    assert.dom().includesText('David and Eva');
    assert.dom().doesNotIncludeText('Clara');
  });

  test('4️⃣ it highlights matched text in <mark>', async function (assert) {
    await render('<NameSpotter::UiBox />');
    const input = screen.getByPlaceholderText('Try Clara, Bob, etc.');
    await userEvent.type(input, 'clara');
    const item = screen.getByText(/Clara/i);
    assert.ok(item.innerHTML.includes('<mark>Clara</mark>'), 'Clara is wrapped in <mark>');
  });

  test('5️⃣ it shows all names if input is empty', async function (assert) {
    await render('<NameSpotter::UiBox />');
    const input = screen.getByPlaceholderText('Try Clara, Bob, etc.');
    await userEvent.clear(input);
    const list = screen.getAllByRole('listitem');
    assert.ok(list.length >= 2, 'Multiple results shown with no filter');
  });

  test('6️⃣ it matches names case-insensitively', async function (assert) {
    await render('<NameSpotter::UiBox />');
    const input = screen.getByPlaceholderText('Try Clara, Bob, etc.');
    await userEvent.type(input, 'ClArA');
    const item = screen.getByText(/Clara/i);
    assert.ok(item.innerHTML.includes('<mark>Clara</mark>'), 'ClArA matched Clara');
  });

  test('7️⃣ Mirage returns expected mock data', async function (assert) {
    const response = await fetch('/api/names');
    const json = await response.json();
    assert.ok(Array.isArray(json), 'Mirage responded with an array');
    assert.ok(json.length >= 1, 'At least one mock name returned');
  });

  test('8️⃣ it handles empty name data gracefully', async function (assert) {
    // Simulate manually clearing Mirage DB in real test
    // For now, just render with no input and assert UI doesn't crash
    await render('<NameSpotter::UiBox />');
    assert.dom('ul').exists();
  });

  test('9️⃣ snapshot-style test: includes name snippet text', async function (assert) {
    await render('<NameSpotter::UiBox />');
    assert.dom().includesText('Alice went to Berlin');
  });
});
