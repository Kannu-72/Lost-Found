function showForm(type) {
    document.getElementById('formContainer').style.display = 'block';
    document.getElementById('lostForm').style.display = (type === 'lost') ? 'block' : 'none';
    document.getElementById('foundForm').style.display = (type === 'found') ? 'block' : 'none';
}
function validateForm(type) {
    let username = document.getElementById(type + 'Username').value.trim();
    let itemName = document.getElementById(type + 'Item').value.trim();
    let description = document.getElementById(type + 'Description').value.trim();
    let place = document.getElementById(type + 'Place').value.trim();
    if (username === '' || itemName === '' || description === '' || place === '') {
        alert('Please fill in all required fields.');
        return false;
    }
    alert('Form submitted successfully!');
    return true;
}