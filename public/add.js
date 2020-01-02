const storeForm = document.getElementById('store-form');
const storeId = document.getElementById('store-id');
const storeAddress = document.getElementById('store-address');

storeForm.addEventListener('submit', addStore);

async function addStore(e) {
  e.preventDefault();

  if (storeId.value === '' || storeAddress === '') {
    alert('please fill the form');
  }

  const sendBody = {
    storeID: storeId.value,
    address: storeAddress.value
  };
  try {
    const res = await fetch('/api/v1/stores', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sendBody)
    });
    if (res.status === 400) {
      throw Error('store already exists!');
    }
    alert('store added');
    window.location.href = '/index.html';
  } catch (error) {
    alert(error);
    return;
  }
}
