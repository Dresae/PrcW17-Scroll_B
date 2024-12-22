let nodeId = 1;

function addChild(level, button) {
    const parentNode = button.closest('.node');
    const childrenContainer = getOrCreateChildrenContainer(parentNode);
    const node = document.createElement('div');
    node.className = 'node';
    node.id = `node-${nodeId++}`;
    node.dataset.level = level;

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
    
    const toggleButton = document.createElement('span');
    toggleButton.className = 'toggle-button';
    toggleButton.innerText = '▼';
    toggleButton.onclick = () => toggleChildren(toggleButton);
    node.appendChild(toggleButton);

    childrenContainer.appendChild(node);
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
        case 'first': return '#291358';
        case 'second': return '#34495e';
        case 'third': return '#85929e';
        case 'fourth': return '#aab7b8';
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

    const height = childRect.top - parentRect.bottom - 10;

    line.style.height = `${height}px`;
    line.style.top = `${top}px`;
    line.style.left = `${left}px`;
    document.getElementById('tree').appendChild(line);
}