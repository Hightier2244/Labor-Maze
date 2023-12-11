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
        document.querySelectorAll('.row div').forEach(element => {element.style.width = 'calc(100% / width)'});
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
        const cell = this.elementWithClasses('div', 'square-content Cell');
        squareHolder.appendChild(squareSizer);
        squareSizer.appendChild(cell);
        return squareHolder;
    },
    generateMazeFieldset(){
        const fieldset = this.makeFieldset('Maze');
        const field = this.elementWithClasses('div', 'field');
        fieldset.appendChild(field);
        return fieldset;
    },
    generateControlFieldset(){
        const fieldset = this.makeFieldset('Controls');
        const communications = this.makeFieldset('Communications');
        const p = document.createElement('p');
        communications.appendChild(p);
        fieldset.appendChild(communications);
        return fieldset;
    },
    makeFieldset(title){
        const fieldset = document.createElement('fieldset');
        const legend = document.createElement('legend');
        legend.innerText = title;
        fieldset.appendChild(legend);
        return fieldset;
    },
    elementWithClasses(elementType, classNames){
        const element = document.createElement(elementType);
        for (var className of classNames.split(" "))
            element.classList.add(className);
        return element;
    },
}