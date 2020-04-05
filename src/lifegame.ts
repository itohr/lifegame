export default class Lifegame {
    public environment: boolean[][];

    constructor(public column: number, public row: number) {
        this.environment = new Array(column);
        for (let i = 0; i < column; i++) {
            this.environment[i] = new Array(row);
            for (let j = 0; j < row; j++) {
                this.environment[i][j] = Math.random() >= 0.5;
            }
        }
    }

    update() {
        var tmpEnvironment = new Array(this.column);
        for (let i = 0; i < this.column; i++) {
            tmpEnvironment[i] = new Array(this.row);
            for (let j = 0; j < this.row; j++) {
                let numCells = this.countSurroundingCells(i, j);
                console.log("numCells(%d, %d): %d", i, j, numCells);
                switch(true) {
                    case (numCells <= 1):
                        tmpEnvironment[i][j] = false;
                        break;
                    case (numCells == 2):
                        tmpEnvironment[i][j] = this.environment[i][j];
                        break;
                    case (numCells == 3):
                        tmpEnvironment[i][j] = true;
                        break;
                    case (numCells >= 4):
                        tmpEnvironment[i][j] = false;
                        break;
                }
            }
        }
        this.environment = tmpEnvironment;
    }

    countSurroundingCells(i: number, j:number): number {
        let num = 0;
        for (let m = i - 1; m < i + 2; m++) {
            if (m < 0 || m >= this.column) continue;
            for (let n = j - 1; n < j + 2; n++) {
                if (n < 0 || n >= this.row) continue;
                if (m == i && n == j) continue;
                if (this.environment[m][n]) {
                    num++;
                }
            }
        }
        return num;
    }
}