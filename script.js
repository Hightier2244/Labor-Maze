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
        this.maze = localMaze;
        this.newMaze(7,7);
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
    generateField(width, heigth) {
        const oldField = document.querySelector('.field');
        const newField = this.elementWithClasses('div', 'field');
        for(var row=0; row < heigth; row++){
            newField.appendChild(this.generateRow(width, row));
        }
        oldField.replaceWith(newField);
        document.querySelectorAll('.row').forEach(element => {element.style.width = `calc(100% / ${width})`; });
    },
    generateRow(width, rowIndex) {
        const row = this.elementWithClasses('div', 'row');
        for(var column = 0; column < width; column++) row.appendChild(this.generateCell(rowIndex, column));
        return row;
    },
    generateCell(row, column) {
        const squareHolder = this.elementWithClasses('div', 'square-holder');
        const squareSizer = this.elementWithClasses('div', 'square-sizer');
        const cell = this.elementWithClasses('div', 'square-content cell');
        cell.dataset.x = row;
        cell.dataset.y = column;
        squareHolder.appendChild(squareSizer);
        squareSizer.appendChild(cell);
        return squareHolder;
    },
    generateMazeFieldset() {
        const fieldset = this.makeFieldset('Maze');
        const field = this.elementWithClasses('div', 'field');
        fieldset.appendChild(field);
        const sizebar = this.generateSizebar();
        fieldset.appendChild(sizebar);
        return fieldset;
    },
    generateSizebar() {
        const sizebar = this.elementWithClasses('div', 'sizebar');
        const btsmall = this.generateButton('small', 'btSmall');
        btsmall.addEventListener('click', () => this.newMaze(7,7));
        sizebar.appendChild(btsmall);
        const btmedium = this.generateButton('medium', 'btMedium');
        btmedium.addEventListener('click', () => this.newMaze(13,13));
        sizebar.appendChild(btmedium);
        const btlarge = this.generateButton('large', 'btLarge');
        btlarge.addEventListener('click', () => this.newMaze(25,25));
        sizebar.appendChild(btlarge);
        return sizebar;
    },
    generateControlFieldset() {
        const fieldset = this.makeFieldset('Controls');
        const controls = this.generateControls();
        fieldset.appendChild(controls);
        const communications = this.makeFieldset('Communications');
        const p = document.createElement('p');
        communications.appendChild(p);
        fieldset.appendChild(communications);
        return fieldset;
    },
    generateControls() {
        const controls = this.elementWithClasses('div', 'contol-holder square-holder');
        const sizer = this.elementWithClasses('div', 'square-sizer');
        controls.appendChild(sizer);
        const content = this.elementWithClasses('div', 'controle-content square-content');
        sizer.appendChild(content);
        const arrowup = this.elementWithClasses('div', 'direction-arrow up');
        const arrowleft = this.elementWithClasses('div', 'direction-arrow left');
        const autoSolve = this.elementWithClasses('div', 'direction-arrow autoSolve');
        const arrowright = this.elementWithClasses('div', 'direction-arrow right');
        const arrowdown = this.elementWithClasses('div', 'direction-arrow down');
        arrowup.addEventListener('click', () => this.mazeMove(0,-1));
        arrowdown.addEventListener('click', () => this.mazeMove(0,1));
        autoSolve.addEventListener('click', () => this.solve(0,0));
        arrowleft.addEventListener('click', () => this.mazeMove(-1,0));
        arrowright.addEventListener('click', () => this.mazeMove(1,0));
        content.appendChild(this.elementWithClasses('div','direction-spacer top-left'))
        content.appendChild(arrowup);
        content.appendChild(this.elementWithClasses('div','direction-spacer top-right'))
        content.appendChild(arrowleft);
        content.appendChild(autoSolve);
        content.appendChild(arrowright);
        content.appendChild(this.elementWithClasses('div','direction-spacer bottom-left'))
        content.appendChild(arrowdown);
        content.appendChild(this.elementWithClasses('div','direction-spacer bottom-right'))
        return controls;
    },
    makeFieldset(title) {
        const fieldset = document.createElement('fieldset');
        const legend = document.createElement('legend');
        legend.innerText = title;
        fieldset.appendChild(legend);
        return fieldset;
    },
    async newMaze(width,heigth) {
        this.generateField(width,heigth);
        this.width = width;
        this.heigth = heigth;
        const { playerX, playerY} = await this.maze.generate(width,heigth);
        this.positionPlayer(playerX, playerY);
    },
    positionPlayer(X,Y) {
        this.playerX = X,
        this.playerY = Y;
        playerCell = document.querySelector('.cell[data-x="' + X + '"][data-y="' + Y + '"]');
        if(playerCell == null) playerCell = document.querySelector('.floor[data-x="' + X + '"][data-y="' + Y + '"]');
        if(playerCell != null){
            playerCell.classList.remove('cell');
            playerCell.classList.add('floor');
            const oldPlayer = document.querySelector('.square-content.player');
            if(oldPlayer) oldPlayer.classList.remove('player');
            playerCell.classList.add('player');
        }
    },
    async mazeMove(dx, dy) {
        const newX = this.playerX + dx;
        const newY = this.playerY + dy;
        const {cell} = await this.maze.move(dx, dy);

        switch (cell) {
            case 0:
                this.positionPlayer(newX, newY);
                break;
            case 1:
                this.positionPlayer(newX, newY);
                this.showPopup('You Won!');
                break;
            case 2:
                this.markAsWall(newX, newY);
                break;
            default: alert('Impossible move value');
        }
    },
    markAsWall(X, Y) {
        const wallCell = document.querySelector('.cell[data-x="' + X + '"][data-y="' + Y + '"]');
        if(wallCell != null){ 
            wallCell.classList.remove('cell');
            wallCell.classList.add('wall');
        }
    },
    showPopup(text) {
        const popup = this.elementWithClasses('div', 'popup');
        const div = document.createElement('div');
        const divText = document.createElement('div');
        divText.innerText = text;
        const button = this.generateButton('Replay', 'btReplay');
        button.addEventListener('click', () => this.replay());
        div.appendChild(divText);
        div.appendChild(button);
        popup.appendChild(div);
        document.body.appendChild(popup);
    },
    replay() {
        this.newMaze(7,7);
        this.hidePopup();
    },
    hidePopup() {
        this.finished = false;
        const popup = document.querySelector('.popup');
        popup.remove();
    },
    directions: [
        { dx: 1, dy: 0 }, // right
        { dx: -1, dy: 0 }, // left
        { dx: 0, dy: 1 }, // down
        { dx: 0, dy: -1 } // up
    ],
    finished: false,
    async solve(fromDx, fromDy) {
        if (this.finished == false) {
            const oldX = this.playerX;
            const oldY = this.playerY;
            for(const dir of this.directions){
                if(dir.dx == -fromDx && dir.dy == -fromDy || this.finished == true) continue;
                const newX = oldX + dir.dx;
                const newY = oldY + dir.dy;
                const {cell} = await this.maze.move(dir.dx, dir.dy);
                switch(cell){
                    case 0:
                        this.positionPlayer(newX, newY);
                        const solved = await this.solve(dir.dx, dir.dy);
                        if(solved) Promise.resolve(true);
                        if(this.finished) break;
                        await this.maze.move(-dir.dx, -dir.dy);
                        this.positionPlayer(oldX, oldY);
                        break;
                    case 1:
                        this.positionPlayer(newX, newY);
                        this.finished = true;
                        this.showPopup('You Won!');
                        break;
                    case 2:
                        this.markAsWall(newX, newY);
                        break;
                }
            }
        }
        Promise.resolve(false);
    },
    generateButton(text, id) {
        const button = document.createElement('button');
        button.innerText = text;
        if(id != null) button.id = id;
        return button;
    },
    elementWithClasses(elementType, classNames) {
        const element = document.createElement(elementType);
        for (var className of classNames.split(" "))
            element.classList.add(className);
        return element;
    },
}

const localMaze = {
    playerX: 1,
    playerY: 1,
    // 0: ways
    // 1: target
    // 2: walls
    maze: [
        [ 2, 2, 2, 2, 2, 2, 2],
        [ 2, 0, 0, 0, 2, 0, 2],
        [ 2, 0, 2, 0, 2, 0, 2],
        [ 2, 0, 2, 0, 0, 0, 2],
        [ 2, 0, 2, 2, 2, 0, 2],
        [ 2, 0, 0, 1, 2, 0, 2],
        [ 2, 2, 2, 2, 2, 2, 2],
    ],
    async generate(width, heigth) {
        this.playerX = 1;
        this.playerY = 1;
        return new Promise(resolve => {
            window.setTimeout(() => {
                resolve({playerX: this.playerX, playerY: this.playerY});
            }, 500);
        });
    },
    async move(dx, dy) {
        if(dx < -1 || dx > 1 || dy < -1 || dy > 1) alert('too big move');
        const newX = this.playerX + dx;
        const newY = this.playerY + dy;
        const cell = this.maze[newY][newX];
        if (cell == 0 || cell == 1) {
            this.playerX = newX;
            this.playerY = newY;
        }
        return new Promise(resolve => {
            window.setTimeout(() => {
                resolve({cell, playerX: this.playerX, playerY: this.playerY});
            }, 500);
        });
    }
}