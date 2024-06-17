let editIndex = -1; // Variable to keep track of the current edit index

// fetching data
const fetchData = async () => {
    let data = await fetch("https://jsonplaceholder.typicode.com/todos").then((response) => response.json()).then((res) => res)
    console.log("DATA: ", data);
    console.log(typeof(data));
}
fetchData();
// fetching data dompleted


// Function to save input to localStorage
function saveInput() {
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    if (title.trim() === "" || content.trim() === "") {
        alert("Please enter both a title and content.");
        return;
    }

    let inputs = JSON.parse(localStorage.getItem('userInputs')) || [];
    
    if (editIndex === -1) {
        // Add new input
        inputs.push({ title: title, content: content });
    } else {
        // Update existing input
        inputs[editIndex] = { title: title, content: content };
        editIndex = -1; // Reset edit index after updating
    }

    localStorage.setItem('userInputs', JSON.stringify(inputs));
    document.getElementById('title').value = ""; // Clear title field
    document.getElementById('content').value = ""; // Clear content field
    displayStoredInputs();
}

// Function to display stored inputs
function displayStoredInputs() {
    const inputs = JSON.parse(localStorage.getItem('userInputs')) || [];
    const displayArea = document.getElementById('displayArea');
    displayArea.innerHTML = ""; // Clear display area
    inputs.forEach((input, index) => {
        const inputDiv = document.createElement('div');
        inputDiv.className = 'inputItem';

        const titleText = document.createElement('h3');
        titleText.innerText = input.title;
        titleText.className = 'inputTitle';

        const contentText = document.createElement('p');
        contentText.innerText = input.content;
        contentText.className = 'inputContent';

        const editButton = document.createElement('button');
        editButton.innerText = 'Edit';
        editButton.onclick = () => editInput(index);

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.onclick = () => deleteInput(index);

        inputDiv.appendChild(titleText);
        inputDiv.appendChild(contentText);
        inputDiv.appendChild(editButton);
        inputDiv.appendChild(deleteButton);

        displayArea.appendChild(inputDiv);
    });
}

// Function to edit an input
function editInput(index) {
    const inputs = JSON.parse(localStorage.getItem('userInputs')) || [];
    document.getElementById('title').value = inputs[index].title;
    document.getElementById('content').value = inputs[index].content;
    editIndex = index; // Set edit index to the current index
}

// Function to delete an input
function deleteInput(index) {
    let inputs = JSON.parse(localStorage.getItem('userInputs')) || [];
    inputs.splice(index, 1);
    localStorage.setItem('userInputs', JSON.stringify(inputs));
    displayStoredInputs();
}

// Event listener for the save button
document.getElementById('saveButton').addEventListener('click', saveInput);

// Display stored inputs on page load
document.addEventListener('DOMContentLoaded', displayStoredInputs);
