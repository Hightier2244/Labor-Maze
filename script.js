window.addEventListener('load', () => maze.init());

const maze = {
    init() {
        const body = document.body;
        const header = this.generateHeader('Maze', 'by Simon Raichle');
        const main = this.generateMain();
        const footer = this.generateFooter('&copy; 2023 by Simon Raichle');
        body.appendChild(header);
        body.appendChild(main);
        body.appendChild(footer);
        this.generateField(7,7);
    },
    generateHeader(title, subtitle) {
        var header = document.createElement('header');
        const limiter = this.elementWithClasses('div', 'header limiter');
        const h1 = document.createElement('h1');
        h1.innerText = title;
        const h2 = document.createElement('h2');
        h2.innerText = subtitle;
        limiter.appendChild(h1);
        limiter.appendChild(h2);
        header.appendChild(limiter);
        return header;
    },
    generateMain() {
        var main = document.createElement('main');
        const limiter = this.elementWithClasses('div', 'main limiter');
        const cellfieldset = this.generateMazeFieldset();
        const controlfieldset = this.generateControlFieldset();
        limiter.appendChild(cellfieldset);
        limiter.appendChild(controlfieldset);
        main.appendChild(limiter);
        return main;
    },
    generateFooter(title) {
        var footer = document.createElement('footer');
        var limiter = this.elementWithClasses('div', 'footer limiter');
        limiter.innerHTML= title;
        footer.appendChild(limiter);
        return footer;
    },
    generateField(width, heigth){
        const oldField = document.querySelector('.field');
        const newField = this.elementWithClasses('div', 'field');
        for(var row=0; row < heigth; row++){
            newField.appendChild(this.generateRow(width));
        }
        oldField.replaceWith(newField);
        document.querySelectorAll('.row').forEach(element => {element.style.width = `calc(100% / ${width})`; });
    },
    generateRow(width){
        const row = this.elementWithClasses('div', 'row');
        for(var column = 0; column < width; column++){
            row.appendChild(this.generateCell());
        }
        return row;
    },
    generateCell(){
        const squareHolder = this.elementWithClasses('div', 'square-holder');
        const squareSizer = this.elementWithClasses('div', 'square-sizer');
        const cell = this.elementWithClasses('div', 'square-content cell');
        squareHolder.appendChild(squareSizer);
        squareSizer.appendChild(cell);
        return squareHolder;
    },
    generateMazeFieldset(){
        const fieldset = this.makeFieldset('Maze');
        const field = this.elementWithClasses('div', 'field');
        fieldset.appendChild(field);
        const sizebar = this.generateSizebar();
        fieldset.appendChild(sizebar);
        return fieldset;
    },
    generateSizebar(){
        const sizebar = this.elementWithClasses('div', 'sizebar');
        const btsmall = this.generateButton('small', 'btsmall');
        btsmall.addEventListener('click', () => this.newMaze(7,7));
        sizebar.appendChild(btsmall);
        const btmedium = this.generateButton('medium', 'btmedium');
        btmedium.addEventListener('click', () => this.newMaze(13,13));
        sizebar.appendChild(btmedium);
        const btlarge = this.generateButton('large', 'btlarge');
        btlarge.addEventListener('click', () => this.newMaze(25,25));
        sizebar.appendChild(btlarge);
        return sizebar;
    },
    generateButton(text, id){
        const button = document.createElement('button');
        button.text = text;
        if(id != null) button.id = id;
        return button;
    },
    generateControlFieldset(){
        const fieldset = this.makeFieldset('Controls');
        const controls = this.generateControls();
        fieldset.appendChild(controls);
        const communications = this.makeFieldset('Communications');
        const p = document.createElement('p');
        communications.appendChild(p);
        fieldset.appendChild(communications);
        return fieldset;
    },
    generateControls(){
        const controls = this.elementWithClasses('div', 'contol-holder square-holder');
        const sizer = this.elementWithClasses('div', 'square-sizer');
        controls.appendChild(sizer);
        const content = this.elementWithClasses('div', 'controle-content square-content');
        sizer.appendChild(content);
        const arrowup = this.elementWithClasses('div', 'direction-arrow up');
        const arrowleft = this.elementWithClasses('div', 'direction-arrow left');
        const player = this.elementWithClasses('div', 'direction-arrow player');
        const arrowright = this.elementWithClasses('div', 'direction-arrow right');
        const arrowdown = this.elementWithClasses('div', 'direction-arrow down');
        arrowup.addEventListener('click', () => this.mazeMove(0,-1));
        arrowdown.addEventListener('click', () => this.mazeMove(0,1));
        arrowleft.addEventListener('click', () => this.mazeMove(-1,0));
        arrowright.addEventListener('click', () => this.mazeMove(1,0));
        content.appendChild(this.elementWithClasses('div','direction-spacer top-left'))
        content.appendChild(arrowup);
        content.appendChild(this.elementWithClasses('div','direction-spacer top-right'))
        content.appendChild(arrowleft);
        content.appendChild(player);
        content.appendChild(arrowright);
        content.appendChild(this.elementWithClasses('div','direction-spacer bottom-left'))
        content.appendChild(arrowdown);
        content.appendChild(this.elementWithClasses('div','direction-spacer bottom-right'))
        return controls;
    },
    makeFieldset(title){
        const fieldset = document.createElement('fieldset');
        const legend = document.createElement('legend');
        legend.innerText = title;
        fieldset.appendChild(legend);
        return fieldset;
    },
    newMaze(width,heigth){
        this.generateField(width,heigth);
        this.width = width;
        this.heigth = heigth;
    },
    mazeMove(dx, dy){
        alert(`Moving by ${dx},${dy}`);
    },
    elementWithClasses(elementType, classNames){
        const element = document.createElement(elementType);
        for (var className of classNames.split(" "))
            element.classList.add(className);
        return element;
    },
}