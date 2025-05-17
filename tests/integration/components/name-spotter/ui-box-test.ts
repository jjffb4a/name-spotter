test('loads names from /names.json if Mirage is unavailable', async function (assert) {
  // Simulate empty Mirage dataset
  this.owner.lookup('service:name-spotter').names = [];

  // Temporarily override fetch
  const mockNames = [
    { id: '1', text: 'Test Name from JSON' }
  ];
  const originalFetch = window.fetch;
  window.fetch = () => Promise.resolve({
    json: () => Promise.resolve(mockNames)
  }) as any;

  await render('<NameSpotter::UiBox />');

  assert.dom().includesText('Test Name from JSON');

  // Restore fetch
  window.fetch = originalFetch;
});
