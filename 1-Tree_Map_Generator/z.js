let nodeId = 1;

function addChild(level, button) {
    const parentNode = button.closest('.node');
    const childrenContainer = getOrCreateChildrenContainer(parentNode);
    const node = document.createElement('div');
    node.className = 'node';
    node.id = `node-${nodeId++}`;

    // Set fixed background color based on level
    node.style.backgroundColor = getBackgroundColor(level);

    const input = document.createElement('input');
    input.type = 'text';
    input.value = `Child ${level} ${node.id}`;
    input.onchange = function() { updateNodeTitle(this); };

    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';

    const addChildButton = document.createElement('button');
    addChildButton.innerText = `Add ${level === 'first' ? 'Second' : (level === 'second' ? 'Third' : 'Fourth')} Level Child`;
    addChildButton.onclick = () => addChild(level === 'first' ? 'second' : (level === 'second' ? 'third' : 'fourth'), addChildButton);

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.onclick = () => deleteNode(node);

    buttonContainer.appendChild(addChildButton);
    buttonContainer.appendChild(deleteButton);
    node.appendChild(input);
    node.appendChild(buttonContainer);
    
    // Create toggle button for expanding/collapsing children
    const toggleButton = document.createElement('span');
    toggleButton.className = 'toggle-button';
    toggleButton.innerText = '▼';
    toggleButton.onclick = () => toggleChildren(toggleButton);
    node.appendChild(toggleButton);

    childrenContainer.appendChild(node);

    // Draw line connecting to parent
    drawLine(parentNode, node);
}


function getOrCreateChildrenContainer(parentNode) {
    let childrenContainer = parentNode.querySelector('.children-container');
    if (!childrenContainer) {
        childrenContainer = document.createElement('div');
        childrenContainer.className = 'children-container';
        parentNode.appendChild(childrenContainer);
    }
    return childrenContainer;
}

function getBackgroundColor(level) {
    switch (level) {
        case 'first': return '#291358'; // Dark 
        case 'second': return '#34495e'; // Medium
        case 'third': return '#85929e';  // Light
        case 'fourth': return '#aab7b8'; // Very Light
        default: return '#4e4376';
    }
}

function drawLine(parent, child) {
    const line = document.createElement('div');
    line.className = 'line';
    
    const parentRect = parent.getBoundingClientRect();
    const childRect = child.getBoundingClientRect();

    const top = parentRect.bottom;
    const left = parentRect.left + parentRect.width / 2;

    const height = childRect.top - parentRect.bottom - 10; // 10px margin

    line.style.height = `${height}px`;
    line.style.top = `${top}px`;
    line.style.left = `${left}px`;
    document.getElementById('tree').appendChild(line);
}
