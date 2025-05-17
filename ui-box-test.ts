import { module, test } from 'qunit';
import { render, screen } from 'ember-testing-library';
import userEvent from '@testing-library/user-event';

module('Integration | Component | name-spotter/ui-box', function () {
  test('it highlights matched name', async function (assert) {
    await render('<NameSpotter::UiBox />');

    const input = screen.getByPlaceholderText('Try Clara, Bob, etc.');
    await userEvent.type(input, 'clara');

    const result = screen.getByText(/Clara/i);
    assert.ok(result.innerHTML.includes('<mark>Clara</mark>'), 'Highlights Clara');
  });
});
